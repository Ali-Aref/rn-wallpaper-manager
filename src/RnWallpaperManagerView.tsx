import { requireNativeView } from 'expo';
import * as React from 'react';

import { RnWallpaperManagerViewProps } from './RnWallpaperManager.types';

const NativeView: React.ComponentType<RnWallpaperManagerViewProps> =
  requireNativeView('RnWallpaperManager');

export default function RnWallpaperManagerView(props: RnWallpaperManagerViewProps) {
  return <NativeView {...props} />;
}
