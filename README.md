<div align="center">

# 🖼️ React Native Wallpaper Manager

### A powerful React Native Expo module for setting wallpapers on Android devices

[![npm version](https://img.shields.io/npm/v/rn-expo-wallpaper-manager.svg?style=flat-square)](https://www.npmjs.com/package/rn-expo-wallpaper-manager)
[![npm downloads](https://img.shields.io/npm/dm/rn-expo-wallpaper-manager.svg?style=flat-square)](https://www.npmjs.com/package/rn-expo-wallpaper-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-android-green.svg?style=flat-square)](https://www.android.com/)
[![Expo](https://img.shields.io/badge/Expo-Ready-000020.svg?style=flat-square&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-61DAFB.svg?style=flat-square&logo=react)](https://reactnative.dev/)

</div>

---

## ✨ Features

- 🌐 Set wallpaper from remote URL
- 📁 Set wallpaper from local file path
- 📱 Support for different wallpaper types (home screen, lock screen, or both)
- ✅ Check device wallpaper support capabilities
- 🔔 Event notifications when wallpaper changes
- ⚡ Fast and lightweight
- 🎯 Simple and intuitive API

## 📋 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
  - [Basic Usage](#basic-usage)
  - [Event Listening](#event-listening)
- [API Reference](#-api-reference)
  - [Methods](#methods)
  - [Types](#types)
- [Permissions](#-permissions)
- [Platform Support](#-platform-support)
- [Example](#-example)
- [Contributing](#-contributing)
- [License](#-license)

## 📦 Installation

```bash
npm install rn-expo-wallpaper-manager
```

**Or using yarn:**

```bash
yarn add rn-expo-wallpaper-manager
```

## ⚡ Quick Start

Get up and running in seconds:

```typescript
import RnExpoWallpaperManager from 'rn-expo-wallpaper-manager';

// Check if supported
if (RnExpoWallpaperManager.isWallpaperSettingSupported()) {
  // Set wallpaper from URL
  await RnExpoWallpaperManager.setWallpaperFromUrl(
    'https://example.com/image.jpg',
    'both'
  );
}
```

## 🚀 Usage

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

---

## 📖 API Reference

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

---

## 🔐 Permissions

The module requires the following Android permissions (automatically included):

- ✅ `android.permission.SET_WALLPAPER`
- ✅ `android.permission.READ_EXTERNAL_STORAGE`
- ✅ `android.permission.WRITE_EXTERNAL_STORAGE`

---

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| ✅ Android | Fully Supported | All features available |
| ❌ iOS | Not Supported | iOS doesn't allow apps to set wallpapers |
| ❌ Web | Not Supported | Web browsers can't set system wallpapers |

---

## 💡 Example

Check out the complete working example in the [`example/`](./example) directory to see the module in action!

```typescript
// Quick example
import RnExpoWallpaperManager from 'rn-expo-wallpaper-manager';

async function setMyWallpaper() {
  try {
    const result = await RnExpoWallpaperManager.setWallpaperFromUrl(
      'https://picsum.photos/1080/1920',
      'both'
    );
    console.log('Success:', result.message);
  } catch (error) {
    console.error('Error setting wallpaper:', error);
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT © Ali Aref

---

<div align="center">

**Made with ❤️ for React Native developers**

If you find this package helpful, please give it a ⭐ on [GitHub](https://github.com/yourusername/rn-wallpaper-manager)!

</div>
