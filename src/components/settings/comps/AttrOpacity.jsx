import React from 'react';
import { Slider } from '@douyinfe/semi-ui';

export default function AttrOpacity({ currentElement, onUpdateStyle }) {
  const value = Number(currentElement?.style?.opacity) || 1;
  return (
    <div>
      <label className="title">透明度</label>
      <div className="subs grid grid-1 grid-1-1">
        <div className="subs-item">
          <label className="lab">{value.toFixed(1)}</label>
          <Slider
            min={0.2}
            max={1}
            step={0.1}
            value={value}
            onChange={(next) => onUpdateStyle('opacity', next)}
          />
        </div>
      </div>
    </div>
  );
}
