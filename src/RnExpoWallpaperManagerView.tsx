import { requireNativeView } from 'expo';
import * as React from 'react';

import { RnExpoWallpaperManagerViewProps } from './RnExpoWallpaperManager.types';

const NativeView: React.ComponentType<RnExpoWallpaperManagerViewProps> =
  requireNativeView('RnExpoWallpaperManager');

export default function RnExpoWallpaperManagerView(props: RnExpoWallpaperManagerViewProps) {
  return <NativeView {...props} />;
}
