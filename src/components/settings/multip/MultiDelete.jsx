import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconDelete } from '@douyinfe/semi-icons';

export default function MultiDelete({ onDelComp }) {
  return (
    <div className="item del-item">
      <Button
        className="delete-btn"
        theme="light"
        type="danger"
        icon={<IconDelete />}
        onClick={() => onDelComp(undefined, 'multipleDel')}
      >
        删除选中组件
      </Button>
    </div>
  );
}
