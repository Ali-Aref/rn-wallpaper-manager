// Reexport the native module. On web, it will be resolved to RnWallpaperManagerModule.web.ts
// and on native platforms to RnWallpaperManagerModule.ts
export { default } from './RnWallpaperManagerModule';
export { default as RnWallpaperManagerView } from './RnWallpaperManagerView';
export * from  './RnWallpaperManager.types';
