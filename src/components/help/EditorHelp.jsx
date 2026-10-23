import React from 'react';
import { Button, Popover } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import './editor-help.css';

const SHORTCUTS = [
  { name: '复制', value: 'Ctrl + c' },
  { name: '粘贴', value: 'Ctrl + v' },
  { name: '删除', value: 'Delete' },
  { name: '位置', value: '↑ ↓ ← →' },
  { name: '多选', value: 'Shift / Comm + 点击' },
  { name: '取消', value: 'Shift / Comm + 点击' },
];

const content = (
  <div className="help-info">
    <div className="title">快捷操作（Window/Mac）</div>
    <div className="datas">
      {SHORTCUTS.map((item) => (
        <div className="item" key={item.name}>
          <span className="name">{item.name}</span>
          <span className="val">
            {item.value.split(' ').map((part) => (
              <code key={part}>{part}</code>
            ))}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function EditorHelp() {
  return (
    <div id="keyboard">
      <Popover content={content} trigger="click" position="topRight">
        <Button
          className="help-btn"
          theme="borderless"
          icon={<IconHelpCircle size="large" />}
          aria-label="快捷键"
        />
      </Popover>
    </div>
  );
}
