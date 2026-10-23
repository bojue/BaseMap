import React from 'react';
import { asset } from '@/utils/assets';
import './auxiliary.css';

export default function Auxiliary({ item, configs, index, onResize, onTrans }) {
  const { style } = item;
  const { dragIconSize } = configs;

  const resize = (event, arrow, state) => {
    if (event && !event.clientX && !event.clientY) return;
    onResize(event, item, arrow, state, index);
  };

  const trans = (event, state) => {
    if (event && !event.clientX && !event.clientY) return;
    onTrans(event, item, state, index);
  };

  const handleProps = (arrow) => ({
    draggable: true,
    onDragStart: (event) => {
      event.stopPropagation();
      resize(event, arrow, 'start');
    },
    onDrag: (event) => {
      event.stopPropagation();
      resize(event, arrow, 'drag');
    },
    onDragEnd: (event) => {
      event.stopPropagation();
      resize(event, arrow, 'end');
    },
  });

  return (
    <span className="assist">
      {['line_colu'].indexOf(item.type) === -1 && (
        <span
          className="adR"
          {...handleProps('r')}
          style={{
            left: `${style.width - dragIconSize + style.borderWidth * 2}px`,
            top: `${style.height / 2 - dragIconSize}px`,
            width: `${dragIconSize * 2}px`,
            height: `${dragIconSize * 2}px`,
          }}
        />
      )}
      {['line_colu'].indexOf(item.type) === -1 && (
        <span
          className="adL"
          {...handleProps('l')}
          style={{
            left: `${-dragIconSize}px`,
            top: `${style.height / 2 - dragIconSize}px`,
            width: `${dragIconSize * 2}px`,
            height: `${dragIconSize * 2}px`,
          }}
        />
      )}
      {['line_row'].indexOf(item.type) === -1 && (
        <span
          className="adT"
          {...handleProps('t')}
          style={{
            left: `${style.width / 2 - dragIconSize}px`,
            top: `${-dragIconSize}px`,
            width: `${dragIconSize * 2}px`,
            height: `${dragIconSize * 2}px`,
          }}
        />
      )}
      {['line_row'].indexOf(item.type) === -1 && (
        <span
          className="adB"
          {...handleProps('b')}
          style={{
            left: `${style.width / 2 - dragIconSize}px`,
            top: `${style.height - dragIconSize + style.borderWidth * 2}px`,
            width: `${dragIconSize * 2}px`,
            height: `${dragIconSize * 2}px`,
          }}
        />
      )}

      <span
        className="trans"
        draggable
        style={{
          left: `${style.width + 25}px`,
          top: `${style.height / 2 - 11}px`,
        }}
        onDragStart={(event) => {
          event.stopPropagation();
          trans(event, 'start');
        }}
        onDrag={(event) => {
          event.stopPropagation();
          trans(event, 'drag');
        }}
        onDragEnd={(event) => {
          event.stopPropagation();
          trans(event, 'end');
        }}
      >
        <img src={asset('icon/translate.svg')} alt="旋转" />
      </span>
    </span>
  );
}
