import { registerWebModule, NativeModule } from 'expo';

import { RnWallpaperManagerModuleEvents } from './RnWallpaperManager.types';

class RnWallpaperManagerModule extends NativeModule<RnWallpaperManagerModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(RnWallpaperManagerModule, 'RnWallpaperManagerModule');
