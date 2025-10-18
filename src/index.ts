// Reexport the native module. On web, it will be resolved to RnExpoWallpaperManagerModule.web.ts
// and on native platforms to RnExpoWallpaperManagerModule.ts
export { default } from './RnExpoWallpaperManagerModule';
export { default as RnExpoWallpaperManagerView } from './RnExpoWallpaperManagerView';
export * from  './RnExpoWallpaperManager.types';
