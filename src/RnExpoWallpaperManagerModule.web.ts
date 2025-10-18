import { registerWebModule, NativeModule } from 'expo';

import { 
  RnExpoWallpaperManagerModuleEvents, 
  WallpaperResult, 
  WallpaperInfo 
} from './RnExpoWallpaperManager.types';

class RnExpoWallpaperManagerModule extends NativeModule<RnExpoWallpaperManagerModuleEvents> {
  /**
   * Set wallpaper from a URL (web implementation - not supported)
   */
  async setWallpaperFromUrl(url: string, wallpaperType: 'home' | 'lock' | 'both'): Promise<WallpaperResult> {
    throw new Error('Wallpaper setting is not supported on web platform');
  }

  /**
   * Set wallpaper from a local file path (web implementation - not supported)
   */
  async setWallpaperFromFile(filePath: string, wallpaperType: 'home' | 'lock' | 'both'): Promise<WallpaperResult> {
    throw new Error('Wallpaper setting is not supported on web platform');
  }

  /**
   * Check if wallpaper setting is supported (web implementation - always false)
   */
  isWallpaperSettingSupported(): boolean {
    return false;
  }

  /**
   * Get information about current wallpaper capabilities (web implementation - not supported)
   */
  async getCurrentWallpaperInfo(): Promise<WallpaperInfo> {
    throw new Error('Wallpaper info is not available on web platform');
  }
}

export default registerWebModule(RnExpoWallpaperManagerModule, 'RnExpoWallpaperManagerModule');
