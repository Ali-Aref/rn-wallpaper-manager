# React Native Wallpaper Manager

A React Native Expo module for setting wallpapers on Android devices.

## Features

- Set wallpaper from URL
- Set wallpaper from local file path
- Support for different wallpaper types (home screen, lock screen, or both)
- Check device wallpaper support capabilities
- Event notifications when wallpaper changes

## Installation

```bash
npm install rn-expo-wallpaper-manager
```

## Usage

### Basic Usage

```typescript
import RnExpoWallpaperManager from 'rn-expo-wallpaper-manager';

// Check if wallpaper setting is supported
const isSupported = RnExpoWallpaperManager.isWallpaperSettingSupported();

// Set wallpaper from URL
const result = await RnExpoWallpaperManager.setWallpaperFromUrl(
  'https://example.com/image.jpg',
  'both' // 'home', 'lock', or 'both'
);

// Set wallpaper from local file
const result = await RnExpoWallpaperManager.setWallpaperFromFile(
  '/path/to/local/image.jpg',
  'home'
);

// Get wallpaper capabilities
const info = await RnExpoWallpaperManager.getCurrentWallpaperInfo();
```

### Event Listening

```typescript
import { useEvent } from 'expo';

const onWallpaperChanged = useEvent(RnExpoWallpaperManager, 'onWallpaperChanged');

// The event will be triggered when wallpaper is successfully set
console.log('Wallpaper changed:', onWallpaperChanged);
```

## API Reference

### Methods

#### `setWallpaperFromUrl(url: string, wallpaperType: WallpaperType): Promise<WallpaperResult>`

Sets wallpaper from a remote URL.

- `url`: The URL of the image to set as wallpaper
- `wallpaperType`: 'home', 'lock', or 'both'
- Returns: Promise with success status and message

#### `setWallpaperFromFile(filePath: string, wallpaperType: WallpaperType): Promise<WallpaperResult>`

Sets wallpaper from a local file path.

- `filePath`: The local file path of the image
- `wallpaperType`: 'home', 'lock', or 'both'
- Returns: Promise with success status and message

#### `isWallpaperSettingSupported(): boolean`

Checks if wallpaper setting is supported on the current device.

- Returns: boolean indicating support

#### `getCurrentWallpaperInfo(): Promise<WallpaperInfo>`

Gets information about wallpaper capabilities.

- Returns: Promise with wallpaper support information

### Types

```typescript
type WallpaperType = 'home' | 'lock' | 'both';

type WallpaperResult = {
  success: boolean;
  message: string;
};

type WallpaperInfo = {
  homeScreenSupported: boolean;
  lockScreenSupported: boolean;
};

type WallpaperChangedEventPayload = {
  success: boolean;
  url?: string;
  filePath?: string;
  type: string;
};
```

## Permissions

The module requires the following Android permissions (automatically included):

- `android.permission.SET_WALLPAPER`
- `android.permission.READ_EXTERNAL_STORAGE`
- `android.permission.WRITE_EXTERNAL_STORAGE`

## Platform Support

- ✅ Android (fully supported)
- ❌ iOS (not supported - iOS doesn't allow apps to set wallpapers)
- ❌ Web (not supported - web browsers can't set system wallpapers)

## Example

See the `example/` directory for a complete working example.

## License

MIT
