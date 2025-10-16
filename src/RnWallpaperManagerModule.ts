import { NativeModule, requireNativeModule } from 'expo';

import { 
  RnWallpaperManagerModuleEvents, 
  WallpaperResult, 
  WallpaperInfo 
} from './RnWallpaperManager.types';

declare class RnWallpaperManagerModule extends NativeModule<RnWallpaperManagerModuleEvents> {
  /**
   * Set wallpaper from a URL
   * @param url - The URL of the image to set as wallpaper
   * @param wallpaperType - Type of wallpaper: 'home', 'lock', or 'both'
   * @returns Promise with the result of the operation
   */
  setWallpaperFromUrl(url: string, wallpaperType: 'home' | 'lock' | 'both'): Promise<WallpaperResult>;

  /**
   * Set wallpaper from a local file path
   * @param filePath - The local file path of the image to set as wallpaper
   * @param wallpaperType - Type of wallpaper: 'home', 'lock', or 'both'
   * @returns Promise with the result of the operation
   */
  setWallpaperFromFile(filePath: string, wallpaperType: 'home' | 'lock' | 'both'): Promise<WallpaperResult>;

  /**
   * Check if wallpaper setting is supported on this device
   * @returns boolean indicating if wallpaper setting is supported
   */
  isWallpaperSettingSupported(): boolean;

  /**
   * Get information about current wallpaper capabilities
   * @returns Promise with wallpaper info including supported types
   */
  getCurrentWallpaperInfo(): Promise<WallpaperInfo>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RnWallpaperManagerModule>('RnWallpaperManager');
