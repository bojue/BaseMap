import React from 'react';
import { Checkbox } from '@douyinfe/semi-ui';

export default function CommAttrCheckbox({
  currentElement,
  attribute,
  name,
  label,
  onUpdateStyle,
}) {
  const checked = currentElement?.style?.[attribute] === 'true';

  return (
    <div className="item">
      {label && <label className="title">{label}</label>}
      <div className="subs">
        <div className="subs-item">
          <Checkbox
            className="val-cb"
            checked={checked}
            onChange={(event) =>
              onUpdateStyle(attribute, event.target.checked ? 'true' : 'false')
            }
          >
            <span className="val">{name}</span>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
