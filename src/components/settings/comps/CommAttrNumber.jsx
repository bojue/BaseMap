import React from 'react';
import { InputNumber } from '@douyinfe/semi-ui';

export default function CommAttrNumber({
  currentElement,
  attribute,
  name,
  min,
  max,
  onUpdateStyle,
}) {
  const value = Number(currentElement?.style?.[attribute]) || 0;
  return (
    <div className="subs-item">
      <label className="lab">{name}</label>
      <InputNumber
        className="val"
        size="small"
        min={min}
        max={max}
        value={value}
        onChange={(next) => onUpdateStyle(attribute, Number(next) || 0)}
      />
    </div>
  );
}
