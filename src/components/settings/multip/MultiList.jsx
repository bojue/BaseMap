import React from 'react';
import { Button, Empty, Tooltip } from '@douyinfe/semi-ui';
import { IconClose } from '@douyinfe/semi-icons';

export default function MultiList({ multipleActiveArr, onDelMultipComp }) {
  return (
    <div className="item">
      <div className="muls-list">
        <label className="title">多选列表</label>
        <span className="nums">
          选中 <span className="val">{multipleActiveArr.length}</span>个组件
        </span>
      </div>
      <div className="muls">
        {multipleActiveArr.map((ele, index) => (
          <div className="muls-item" key={ele._uid}>
            <span className="ele-index">{index + 1}</span>
            {ele.icon && <img className="ele-icon" src={ele.icon} alt="" />}
            <span className="ele-name">{ele.name}</span>
            <Tooltip content="移出多选">
              <Button
                className="ele-del"
                theme="borderless"
                size="small"
                icon={<IconClose size="small" />}
                onClick={() => onDelMultipComp(ele._uid)}
              />
            </Tooltip>
          </div>
        ))}
        {multipleActiveArr.length === 0 && (
          <Empty title="暂无多选组件" description="按住 Shift 或 Command 点击组件进行多选" />
        )}
      </div>
    </div>
  );
}
