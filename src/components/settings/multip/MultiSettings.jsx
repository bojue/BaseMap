import React, { useState } from 'react';
import { Checkbox, Select } from '@douyinfe/semi-ui';

export default function MultiSettings({ onSetMultipleState }) {
  const [applyShadow, setApplyShadow] = useState('true');
  const [applyRadius, setApplyRadius] = useState(0);

  return (
    <div>
      <div className="item">
        <span className="name">多选操作</span>
      </div>
      <div className="item">
        <label className="title">阴影</label>
        <div className="subs">
          <div className="subs-item">
            <Checkbox
              className="val-cb"
              checked={applyShadow === 'true'}
              onChange={(event) => {
                const next = event.target.checked ? 'true' : 'false';
                setApplyShadow(next);
                onSetMultipleState('isApplyShadow', next);
              }}
            >
              <span className="val">应用阴影</span>
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="item">
        <label className="title">圆角</label>
        <div className="subs">
          <div className="subs-item">
            <Select
              className="val-s"
              value={applyRadius}
              optionList={[
                { value: 0, label: '无' },
                { value: 50, label: '圆角' },
              ]}
              onChange={(value) => {
                setApplyRadius(value);
                onSetMultipleState('borderRadius', value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
