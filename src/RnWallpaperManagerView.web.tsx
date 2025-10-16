import * as React from 'react';

import { RnWallpaperManagerViewProps } from './RnWallpaperManager.types';

export default function RnWallpaperManagerView(props: RnWallpaperManagerViewProps) {
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
