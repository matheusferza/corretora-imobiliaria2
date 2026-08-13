<#
Reseta a senha local do usuário postgres no PostgreSQL 17.

Execute em um PowerShell aberto como Administrador:
  .\tools\reset-postgres-password.ps1

O script libera autenticação apenas para localhost durante alguns segundos,
altera a senha e restaura a configuração original automaticamente.
#>

[CmdletBinding()]
param()

$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]::new($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw "Abra o PowerShell como Administrador antes de executar este script."
}

$hbaPath = "C:\Program Files\PostgreSQL\17\data\pg_hba.conf"
$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$serviceName = "postgresql-x64-17"

if (-not (Test-Path -LiteralPath $hbaPath) -or -not (Test-Path -LiteralPath $psqlPath)) {
  throw "A instalação padrão do PostgreSQL 17 não foi encontrada."
}

$newPassword = Read-Host "Digite a nova senha forte do usuário postgres" -AsSecureString
$confirmPassword = Read-Host "Confirme a nova senha" -AsSecureString

$passwordToText = {
  param([securestring]$value)
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($value)
  try {
    [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
}

$plainPassword = & $passwordToText $newPassword
$plainConfirmation = & $passwordToText $confirmPassword
if ($plainPassword -ne $plainConfirmation) {
  throw "As senhas não conferem. Nenhuma alteração foi feita."
}

$backupPath = Join-Path $env:TEMP "pg_hba.conf.$([guid]::NewGuid().ToString('N')).bak"
Copy-Item -LiteralPath $hbaPath -Destination $backupPath -Force

try {
  $content = Get-Content -LiteralPath $hbaPath -Raw
  $content = $content -replace '(?m)^(host\s+all\s+all\s+127\.0\.0\.1/32\s+)scram-sha-256\s*$', '$1trust'
  $content = $content -replace '(?m)^(host\s+all\s+all\s+::1/128\s+)scram-sha-256\s*$', '$1trust'
  Set-Content -LiteralPath $hbaPath -Value $content -NoNewline
  Restart-Service -Name $serviceName -Force

  $escapedPassword = $plainPassword.Replace("'", "''")
  & $psqlPath -h 127.0.0.1 -U postgres -d postgres -v ON_ERROR_STOP=1 -c "ALTER ROLE postgres WITH PASSWORD '$escapedPassword';"
  if ($LASTEXITCODE -ne 0) {
    throw "Não foi possível alterar a senha do PostgreSQL."
  }
} finally {
  Copy-Item -LiteralPath $backupPath -Destination $hbaPath -Force
  Restart-Service -Name $serviceName -Force
  Remove-Item -LiteralPath $backupPath -Force -ErrorAction SilentlyContinue
  $plainPassword = $null
  $plainConfirmation = $null
}

Write-Host "Senha alterada e autenticação segura restaurada."
