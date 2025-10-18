import * as React from 'react';

import { RnExpoWallpaperManagerViewProps } from './RnExpoWallpaperManager.types';

export default function RnExpoWallpaperManagerView(props: RnExpoWallpaperManagerViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
