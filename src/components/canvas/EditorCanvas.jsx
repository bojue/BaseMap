import React, { useEffect, useRef } from 'react';
import { Slider, Tooltip } from '@douyinfe/semi-ui';
import { asset } from '@/utils/assets';
import CanvasElement from './CanvasElement';
import Auxiliary from './Auxiliary';
import './editor-canvas.css';

function EditorCanvas({
  configs,
  edrawComps,
  onInitCompsState,
  onDragComp,
  onResizeByDragComp,
  onTrans,
  onChangeTextVal,
  onScreen,
  onZoom,
  onScaleChange,
}) {
  const contentRef = useRef(null);

  // 默认按可视区域自适应缩放，让画布铺满工作区
  useEffect(() => {
    if (configs.bgAllBool) return undefined;
    const fit = () => {
      const dom = contentRef.current;
      if (!dom) return;
      const scale = Math.min(
        dom.clientWidth / configs.width,
        dom.clientHeight / configs.height,
        1,
      );
      onScaleChange(Math.max(0.1, Number(scale.toFixed(3))));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [configs.width, configs.height, configs.bgAllBool, onScaleChange]);

  const displayScale = configs.bgAllBool ? 0.64 : configs.scale;

  const selectItem = (event, index) => {
    onInitCompsState(index, event);
  };

  const dragComp = (event, comp, state, index) => {
    if (event && !event.clientX && !event.clientY) return;
    if (state === 'start') {
      onInitCompsState(index);
    }
    onDragComp(event, comp, state, index);
  };

  return (
    <div
      id="content"
      ref={contentRef}
      className={configs.bgAllBool ? 'content' : ''}
      style={{
        width: configs.bgAllBool ? '100%' : 'calc(100% - 435px)',
        height: configs.bgAllBool ? `${configs.window_h}px` : undefined,
        left: configs.bgAllBool ? 0 : undefined,
      }}
    >
      <div
        className="canvas-stage"
        style={{
          width: `${configs.width * displayScale}px`,
          height: `${configs.height * displayScale}px`,
        }}
      >
        <div
          id="canvas"
          className={
            configs.bg === 'grey'
              ? 'other'
              : configs.bg === 'grid'
                ? 'grid'
                : configs.bg === 'floor'
                  ? 'floor'
                  : ''
          }
          style={{
            width: `${configs.width}px`,
            height: `${configs.height}px`,
            transform: `scale(${displayScale})`,
            backgroundImage: configs.backgroundUrl
              ? `url(${configs.backgroundUrl})`
              : undefined,
            backgroundRepeat: configs.backgroundUrl ? 'no-repeat' : undefined,
            backgroundSize: configs.backgroundUrl ? 'contain' : undefined,
          }}
        >
        {edrawComps.map((item, index) => {
          const canDrag =
            item.style.isFixed !== 'true' && item.style.isFixed !== true;
          return (
            <div
              key={item._uid}
              className={`comp-item${item.isActive ? ' active' : ''}${
                item.type === 'room' ? ' roomActive' : ''
              }`}
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
              draggable={canDrag && item.isActive}
              onClick={(event) => selectItem(event, index)}
              onDragStart={
                canDrag
                  ? (event) => dragComp(event, item, 'start', index)
                  : undefined
              }
              onDrag={
                canDrag ? (event) => dragComp(event, item, 'drag', index) : undefined
              }
              onDragEnd={
                canDrag ? (event) => dragComp(event, item, 'end', index) : undefined
              }
            >
              <CanvasElement item={item} onChangeTextVal={onChangeTextVal} />

              {item.isActive && (
                <Auxiliary
                  item={item}
                  configs={configs}
                  index={index}
                  onResize={onResizeByDragComp}
                  onTrans={onTrans}
                />
              )}
            </div>
          );
        })}
        </div>
      </div>

      {!configs.bgAllBool && (
        <div className="slide">
          <Tooltip content="放大" position="right">
            <img
              className="ctrl zoom"
              src={asset('icon/contr/zoom.svg')}
              alt="增加"
              onClick={() => onZoom('zoom')}
            />
          </Tooltip>
          <Slider
            className="zoom-slider"
            vertical
            value={configs.scale}
            min={0.2}
            max={1.5}
            step={0.01}
            tipFormatter={(value) => `${Math.round(value * 100)}%`}
            onChange={onScaleChange}
          />
          <Tooltip content="缩小" position="right">
            <img
              className="ctrl zoomOut"
              src={asset('icon/contr/zoomOut.svg')}
              alt="减少"
              onClick={() => onZoom('zoomout')}
            />
          </Tooltip>
        </div>
      )}

      {configs.bgAllBool && (
        <div className="screen">
          <Tooltip content="退出预览" position="left">
            <img
              src={asset('icon/screen_cancel.svg')}
              alt="退出全屏"
              onClick={onScreen}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

// 事件回调均由 Editor 以 useCallback 稳定提供，配置/组件变化时才需要重渲染
export default React.memo(EditorCanvas);
