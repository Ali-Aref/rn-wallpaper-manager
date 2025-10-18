import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type WallpaperChangedEventPayload = {
  success: boolean;
  url?: string;
  filePath?: string;
  type: string;
};

export type RnExpoWallpaperManagerModuleEvents = {
  onWallpaperChanged: (params: WallpaperChangedEventPayload) => void;
};

export type WallpaperType = 'home' | 'lock' | 'both';

export type WallpaperResult = {
  success: boolean;
  message: string;
};

export type WallpaperInfo = {
  homeScreenSupported: boolean;
  lockScreenSupported: boolean;
};

export type RnExpoWallpaperManagerViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
