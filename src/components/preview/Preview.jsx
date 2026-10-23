import React, { useEffect, useState } from 'react';
import CanvasElement from '../canvas/CanvasElement';
import '../canvas/editor-canvas.css';
import './preview.css';

const STORAGE_KEY = 'bm_preview_payload';

export default function Preview() {
  const [payload] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (error) {
      return null;
    }
  });
  const [scale, setScale] = useState(0);

  const configs = payload?.configs || {};
  const components = payload?.components || [];
  const width = configs.width || 1920;
  const height = configs.height || 1080;

  useEffect(() => {
    const fit = () => {
      setScale(Math.min(window.innerWidth / width, window.innerHeight / height));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [width, height]);

  if (!payload) {
    return (
      <div className="preview-empty">
        暂无预览数据，请回到编辑器点击「预览」重新打开
      </div>
    );
  }

  const bgClass =
    configs.bg === 'grey'
      ? 'other'
      : configs.bg === 'grid'
        ? 'grid'
        : configs.bg === 'floor'
          ? 'floor'
          : '';

  return (
    <div className="preview-root">
      <div
        className="preview-stage"
        style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
      >
        <div
          className={`preview-canvas ${bgClass}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            backgroundImage: configs.backgroundUrl
              ? `url(${configs.backgroundUrl})`
              : undefined,
            backgroundRepeat: configs.backgroundUrl ? 'no-repeat' : undefined,
            backgroundSize: configs.backgroundUrl ? 'contain' : undefined,
          }}
        >
          {components.map((item) => (
            <div
              key={item._uid}
              className="preview-comp"
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
              <CanvasElement item={item} readOnly />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
