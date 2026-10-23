import React from 'react';
import { Tooltip } from '@douyinfe/semi-ui';

const COLOR_LIST = [
  '#d81e06',
  '#ff7f00',
  '#ffff00',
  '#00ca98',
  '#0007ff',
  '#13227a',
  '#ffffff',
  '#dbdbdb',
  '#bfbfbf',
  '#4f4f4f',
  '#2c2c2c',
  '#000000',
];

const BACKGROUND_LIST = [
  '#FF8c00',
  '#2f3035',
  '#5e8ad1',
  '#d1cfd0',
  '#ffffff',
  '#d81e06',
  '#ffff00',
  '#7fff00',
  '#00ca98',
  '#26c9ff',
  '#13227A',
  '#000',
];

export default function CommAttrColor({
  currentElement,
  attribute,
  colors,
  name,
  onSelect,
}) {
  const list = colors || (attribute === 'background' ? BACKGROUND_LIST : COLOR_LIST);
  const currentValue = currentElement?.style?.[attribute];

  return (
    <div className="subs-item full">
      <label className="lab">{name}</label>
      <div className="cols">
        {list.map((color) => (
          <Tooltip content={color} key={color}>
            <span
              className={`col-item${currentValue === color ? ' active' : ''}`}
              style={{ background: color }}
              onClick={() => onSelect(color, attribute)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
