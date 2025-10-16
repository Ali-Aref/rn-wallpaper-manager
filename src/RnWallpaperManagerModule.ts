import { NativeModule, requireNativeModule } from 'expo';

import { RnWallpaperManagerModuleEvents } from './RnWallpaperManager.types';

declare class RnWallpaperManagerModule extends NativeModule<RnWallpaperManagerModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<RnWallpaperManagerModule>('RnWallpaperManager');
