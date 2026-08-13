import type { LocalStorageProvider } from "./local";

export type UploadResult = {
  url: string; // public URL path
  path: string; // internal stored path relative to uploads dir
};

export interface StorageProvider {
  uploadFile: (buffer: Buffer, destPath: string) => Promise<UploadResult>;
  getUrl: (path: string) => string; // path relative to uploads dir or returned by uploadFile
  deleteFile: (path: string) => Promise<void>;
}

// Default export will be lazily replaced by a concrete provider in runtime.
// For now, we export a helper to create the local provider.
export { LocalStorageProvider } from "./local";

let _provider: StorageProvider | null = null;

export function setStorageProvider(provider: StorageProvider) {
  _provider = provider;
}

export function getStorageProvider(): StorageProvider {
  if (!_provider) {
    // lazy import local provider to avoid circular issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { LocalStorageProvider: Local } = require("./local");
    _provider = Local() as StorageProvider;
  }
  return _provider as StorageProvider;
}
