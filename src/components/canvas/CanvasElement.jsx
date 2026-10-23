import React from 'react';
import { resolveAssetUrl } from '@/utils/assets';

function CanvasElement({ item, onChangeTextVal, readOnly = false }) {
  const { style = {} } = item;
  const activeClass = item.isActive ? ' active' : '';
  const shadowClass = style.isApplyShadow === 'true' ? ' isShadow' : '';
  const multipleClass = item.multipleActiveBool ? ' multipleActive' : '';
  const iconUrl = resolveAssetUrl(item.icon);
  const backgroundImageUrl = resolveAssetUrl(item.backgroundImage);

  switch (item.type) {
    case 'img':
      return (
        <img
          className={`comp-element comp-img icon${activeClass}${shadowClass}${multipleClass}`}
          src={iconUrl}
          title={item.name}
          alt={item.name}
          style={{
            width: `${style.width}px`,
            height: `${style.height}px`,
            borderRadius: `${style.borderRadius}%`,
          }}
        />
      );

    case 'line_colu':
      return (
        <div
          className={`comp-element line comp-line_colu${activeClass}${shadowClass}${multipleClass}`}
          style={{ height: `${style.height}px` }}
        />
      );

    case 'line_row':
      return (
        <div
          className={`comp-element line comp-line_row${activeClass}${shadowClass}${multipleClass}`}
          style={{ width: `${style.width}px` }}
        />
      );

    case 'pillar':
      return (
        <div
          className={`comp-element line comp-pillar comp-pillar-shadow${activeClass}${shadowClass}${multipleClass}`}
          style={{
            height: `${style.height}px`,
            width: `${style.width}px`,
            opacity: style.opacity,
          }}
        />
      );

    case 'room':
      return (
        <div
          className={`comp-element line comp-room${activeClass}${shadowClass}${multipleClass}`}
          style={{ width: `${style.width}px`, height: `${style.height}px` }}
        >
          <span
            className="comp-room-inset"
            style={{
              opacity: style.opacity,
              width: `${style.width}px`,
              height: `${style.height}px`,
              background:
                style.bgiBool === 'true' || style.bgiBool === true
                  ? `url(${backgroundImageUrl})`
                  : undefined,
            }}
          />
        </div>
      );

    case 'device':
      return (
        <div
          className={`comp-element device comp-device${activeClass}${shadowClass}${multipleClass}`}
          style={{
            width: `${style.width}px`,
            height: `${style.height}px`,
            opacity: style.opacity,
            background: style.background,
            borderRadius: `${style.borderRadius}px`,
          }}
        />
      );

    case 'text':
      return (
        <div
          className={`comp-element device comp-text${activeClass}${shadowClass}${multipleClass}`}
          style={{
            width: `${style.width}px`,
            height: `${style.height}px`,
            background: style.background,
          }}
        >
          <div
            className="comp-text-inner"
            contentEditable={!readOnly && style.isApplyShadow === 'true'}
            suppressContentEditableWarning
            onBlur={(event) => onChangeTextVal(event, item)}
            style={{
              width: `${style.width}px`,
              height: `${style.height}px`,
              fontSize: `${style.fontSize}px`,
              background: style.background,
              color: style.color,
            }}
          >
            {item.value}
          </div>
        </div>
      );

    case 'aisle':
      return (
        <div
          className={`comp-element line comp-pillar comp-aisle${activeClass}${multipleClass}`}
          style={{
            height: `${style.height}px`,
            width: `${style.width}px`,
            border: style.border,
            opacity: style.opacity,
            background: style.background,
          }}
        />
      );

    default:
      return null;
  }
}

// 拖拽时只有被操作组件的 item 引用变化，其余元素直接跳过重渲染
export default React.memo(CanvasElement);
