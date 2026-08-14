import { LocalStorageProvider } from "./local";

export type UploadResult = {
  url: string; // public URL path
  path: string; // internal stored path relative to uploads dir
};

export interface StorageProvider {
  uploadFile: (buffer: Buffer, destPath: string) => Promise<UploadResult>;
  getUrl: (path: string) => string; // path relative to uploads dir or returned by uploadFile
  deleteFile: (path: string) => Promise<void>;
}

let _provider: StorageProvider | null = null;

function setStorageProvider(provider: StorageProvider) {
  _provider = provider;
}

export function getStorageProvider(): StorageProvider {
  if (!_provider) {
    setStorageProvider(LocalStorageProvider());
  }
  return _provider as StorageProvider;
}
