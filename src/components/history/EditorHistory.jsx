import React, { useEffect, useRef, useState } from 'react';
import { Button, Empty, SideSheet } from '@douyinfe/semi-ui';
import { IconDelete } from '@douyinfe/semi-icons';
import dayjs from 'dayjs';
import CanvasElement from '../canvas/CanvasElement';
import './editor-history.css';

const PREVIEW_WIDTH = 1920;
const PREVIEW_HEIGHT = 1080;

export default function EditorHistory({ visible, list, onClose, onApply, onDelete }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentData, setCurrentData] = useState([]);
  const [previewScale, setPreviewScale] = useState(0.27);
  const previewRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(-1);
      setCurrentData([]);
    }
  }, [visible]);

  // 预览区域随抽屉尺寸等比缩放
  useEffect(() => {
    if (!visible) return undefined;
    const dom = previewRef.current;
    if (!dom) return undefined;
    const update = () => {
      const { width, height } = dom.getBoundingClientRect();
      if (!width || !height) return;
      setPreviewScale(
        Math.min(width / PREVIEW_WIDTH, height / PREVIEW_HEIGHT, 1) * 0.94,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(dom);
    return () => observer.disconnect();
  }, [visible, currentData]);

  const selectData = (data, index) => {
    setCurrentIndex(index);
    setCurrentData(data.data || []);
  };

  const deleteCurrentData = () => {
    if (currentIndex < 0) return;
    onDelete(currentIndex);
    setCurrentIndex(-1);
    setCurrentData([]);
  };

  const current = currentIndex > -1 ? list[currentIndex] : null;
  const roomCount = currentData.filter((item) => item.type === 'room').length;
  const deviceCount = currentData.filter((item) => item.type === 'device').length;
  const textCount = currentData.filter((item) => item.type === 'text').length;

  const footer = (
    <div className="history-footer">
      <div className="history-footer-left">
        <Button theme="light" onClick={onClose}>
          关闭
        </Button>
        <Button
          type="primary"
          disabled={currentData.length === 0}
          onClick={() => onApply(currentData)}
        >
          应用
        </Button>
      </div>
      <Button
        type="danger"
        theme="light"
        icon={<IconDelete />}
        disabled={currentIndex < 0}
        onClick={deleteCurrentData}
      >
        删除
      </Button>
    </div>
  );

  return (
    <SideSheet
      className="history-drawer"
      title="历史记录"
      visible={visible}
      placement="right"
      width={760}
      onCancel={onClose}
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
      footer={footer}
    >
      <div className="history-body">
        <div className="history-list">
          <div className="title">
            <span>历史列表</span>
            <span className="nums">{list.length}</span>
          </div>
          <div className="uls">
            {list.map((item, index) => (
              <div
                key={item.id ?? index}
                className={`item${currentIndex === index ? ' isActive' : ''}`}
                title={`${item.name ? `${item.name} · ` : ''}${
                  item.type === 'custom' ? '用户保存于' : '自动保存于'
                } ${dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}`}
                onClick={() => selectData(item, index)}
              >
                <span className="name">
                  {item.name || dayjs(item.updateTime).format('MM-DD HH:mm:ss')}
                </span>
                {item.name && (
                  <span className="time">
                    {dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                )}
                <span
                  className={`state${item.type === 'custom' ? ' custom' : ''}`}
                />
              </div>
            ))}
            {list.length === 0 && (
              <Empty title="暂无历史记录" description="保存后会生成历史记录" />
            )}
          </div>
        </div>

        <div className="history-content">
          <div className="preview-header">
            {current ? (
              <>
                <div className="preview-name">{current.name || '未命名记录'}</div>
                <div className="preview-meta">
                  <span>
                    {dayjs(current.updateTime).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <span className="dot" />
                  <span>{currentData.length} 个元素</span>
                </div>
              </>
            ) : (
              <div className="preview-name empty">请选择左侧的历史记录</div>
            )}
          </div>

          <div className="preview" ref={previewRef}>
            {currentData.length > 0 && (
              <div
                className="preview-stage"
                style={{
                  width: `${PREVIEW_WIDTH * previewScale}px`,
                  height: `${PREVIEW_HEIGHT * previewScale}px`,
                }}
              >
                <div
                  className="preview-inner"
                  style={{ transform: `scale(${previewScale})` }}
                >
                  {currentData.map((item, index) => (
                    <div
                      className="comp-item"
                      key={`${item._uid || 'history'}-${index}`}
                      style={{
                        width: `${item.style.width}px`,
                        height: `${item.style.height}px`,
                        top: `${item.style.top}px`,
                        left: `${item.style.left}px`,
                        position: item.style.position,
                        borderWidth: `${item.style.borderWidth}px`,
                        transform: `rotate(${item.style.rotate}deg)`,
                        zIndex: item.type === 'room' ? -1 : undefined,
                      }}
                    >
                      <CanvasElement item={item} readOnly onChangeTextVal={() => {}} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentData.length === 0 && (
              <div className="onData">
                {currentIndex === -1 ? '请选择记录' : '当前记录没有数据'}
              </div>
            )}
          </div>

          {current && (
            <div className="preview-stats">
              <div className="stat">
                <span className="stat-value">{currentData.length}</span>
                <span className="stat-label">元素</span>
              </div>
              <div className="stat">
                <span className="stat-value">{roomCount}</span>
                <span className="stat-label">机房区域</span>
              </div>
              <div className="stat">
                <span className="stat-value">{deviceCount}</span>
                <span className="stat-label">设备</span>
              </div>
              <div className="stat">
                <span className="stat-value">{textCount}</span>
                <span className="stat-label">文字</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SideSheet>
  );
}
