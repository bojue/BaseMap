import React from 'react';
import { Button, InputNumber, Popconfirm, Select, Tooltip, Upload } from '@douyinfe/semi-ui';
import {
  IconClear,
  IconDelete,
  IconEyeOpenedStroked,
  IconHistory,
  IconSaveStroked,
} from '@douyinfe/semi-icons';
import { asset } from '@/utils/assets';
import CommAttrNumber from './comps/CommAttrNumber';
import CommAttrColor from './comps/CommAttrColor';
import CommAttrCheckbox from './comps/CommAttrCheckbox';
import AttrOpacity from './comps/AttrOpacity';
import MultiSettings from './multip/MultiSettings';
import MultiDelete from './multip/MultiDelete';
import MultiList from './multip/MultiList';
import './editor-settings.css';

const ALIGN_PATHS = {
  // 左对齐
  l: (
    <>
      <path d="M3 2.5v15" />
      <rect x="5.5" y="4" width="11" height="4" rx="1.2" />
      <rect x="5.5" y="12" width="7" height="4" rx="1.2" />
    </>
  ),
  // 上对齐
  t: (
    <>
      <path d="M2.5 3h15" />
      <rect x="4" y="5.5" width="4" height="11" rx="1.2" />
      <rect x="12" y="5.5" width="4" height="7" rx="1.2" />
    </>
  ),
  // 下对齐
  b: (
    <>
      <path d="M2.5 17h15" />
      <rect x="4" y="3.5" width="4" height="11" rx="1.2" />
      <rect x="12" y="7.5" width="4" height="7" rx="1.2" />
    </>
  ),
  // 右对齐
  r: (
    <>
      <path d="M17 2.5v15" />
      <rect x="3.5" y="4" width="11" height="4" rx="1.2" />
      <rect x="7.5" y="12" width="7" height="4" rx="1.2" />
    </>
  ),
  // 垂直等距
  'iso-colu': (
    <>
      <rect x="3" y="2.5" width="14" height="3.2" rx="1.2" />
      <rect x="3" y="14.3" width="14" height="3.2" rx="1.2" />
      <path d="M10 7.3v5.4" />
      <path d="M8.5 8.8L10 7.3l1.5 1.5" />
      <path d="M8.5 11.2L10 12.7l1.5-1.5" />
    </>
  ),
  // 水平等距
  'iso-row': (
    <>
      <rect x="2.5" y="3" width="3.2" height="14" rx="1.2" />
      <rect x="14.3" y="3" width="3.2" height="14" rx="1.2" />
      <path d="M7.3 10h5.4" />
      <path d="M8.8 8.5L7.3 10l1.5 1.5" />
      <path d="M11.2 8.5L12.7 10l-1.5 1.5" />
    </>
  ),
};

function AlignIcon({ type }) {
  return (
    <svg
      className="align-icon"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ALIGN_PATHS[type]}
    </svg>
  );
}

const ALIGN_ICONS = [
  { key: 'l', label: '左对齐', state: 'align', value: 'l' },
  { key: 't', label: '上对齐', state: 'align', value: 't' },
  { key: 'b', label: '下对齐', state: 'align', value: 'b' },
  { key: 'r', label: '右对齐', state: 'align', value: 'r' },
];

export default function EditorSettings({
  currentActiveIndex,
  currentElement,
  multipleActiveArr,
  configs,
  onDelComp,
  onDelMultipComp,
  onSetMultipleState,
  onChangeConfig,
  onPreview,
  hasComponents,
  onClearComps,
  onSaveDateToStorage,
  onGetHistory,
  onChangeBgImg,
  onSelColor,
  onSelBackground,
  onUpdateStyle,
}) {
  const hasMultiple = multipleActiveArr.length > 0;

  const saveData = () => onSaveDateToStorage(null, 'custom');
  const getHistory = () => onGetHistory();
  const changeBg = (state, value) => onChangeConfig(state, value);

  const handleBeforeUpload = ({ file }) => {
    const raw = file?.fileInstance;
    if (!raw) return false;
    const reader = new FileReader();
    reader.onload = () => onChangeBgImg(reader.result);
    reader.readAsDataURL(raw);
    return false;
  };

  const changeAttrColor = (color, attribute) => {
    if (attribute === 'background') {
      onSelBackground(color);
    } else {
      onSelColor(color);
    }
  };

  return (
    <div id="settings">
      <div className="setting-config config">
        <div className="toolbar-brand">
          <img className="brand-icon" src={asset('icon/3D.svg')} alt="" />
          <span className="brand-name">BaseMap</span>
        </div>

        <div className="toolbar-group">
          <span className="toolbar-label">背景</span>
          <div className="bgs">
            <Tooltip content="灰色背景">
              <button
                type="button"
                className={`bg-swatch${configs.bg === 'grey' ? ' active' : ''}`}
                onClick={() => changeBg('bg', 'grey')}
              >
                <img src={asset('icon/bg-gray.svg')} alt="灰色背景" />
              </button>
            </Tooltip>
            <Tooltip content="网格背景">
              <button
                type="button"
                className={`bg-swatch${configs.bg === 'grid' ? ' active' : ''}`}
                onClick={() => changeBg('bg', 'grid')}
              >
                <img src={asset('icon/bg-grid.svg')} alt="网格背景" />
              </button>
            </Tooltip>
            <Tooltip content="底图">
              <button
                type="button"
                className={`bg-swatch${configs.bg === 'floor' ? ' active' : ''}`}
                onClick={() => changeBg('bg', 'floor')}
              >
                <img src={asset('icon/floor3.webp')} alt="底图" />
              </button>
            </Tooltip>
            <Upload
              action=""
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
            >
              <Button className="upload-btn" size="small" theme="light">
                上传底图
              </Button>
            </Upload>
          </div>
        </div>

        <div className="toolbar-group align-group">
          <div className="align-spacing">
            <div className="align-spacing-item">
              <span className="align-label">垂直间距</span>
              <InputNumber
                className="space-num"
                size="small"
                min={0}
                max={500}
                value={configs.Isometric_colu}
                onChange={(value) => onChangeConfig('Isometric_colu', Number(value) || 0)}
              />
              <Tooltip content="垂直等距">
                <button
                  type="button"
                  className="align-btn"
                  onClick={() => hasMultiple && onSetMultipleState('Isometric', 'colu')}
                >
                  <AlignIcon type="iso-colu" />
                </button>
              </Tooltip>
            </div>

            <div className="align-spacing-item">
              <span className="align-label">水平间距</span>
              <InputNumber
                className="space-num"
                size="small"
                min={0}
                max={500}
                value={configs.Isometric_row}
                onChange={(value) => onChangeConfig('Isometric_row', Number(value) || 0)}
              />
              <Tooltip content="水平等距">
                <button
                  type="button"
                  className="align-btn"
                  onClick={() => hasMultiple && onSetMultipleState('Isometric', 'row')}
                >
                  <AlignIcon type="iso-row" />
                </button>
              </Tooltip>
            </div>
          </div>

          <span className="toolbar-sep" />

          <div className="align-actions">
            {ALIGN_ICONS.map((icon) => (
              <Tooltip content={icon.label} key={icon.key}>
                <button
                  type="button"
                  className="align-btn"
                  onClick={() =>
                    hasMultiple && onSetMultipleState(icon.state, icon.value)
                  }
                >
                  <AlignIcon type={icon.key} />
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="toolbar-actions">
          <Tooltip content="预览">
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconEyeOpenedStroked />}
              onClick={onPreview}
            />
          </Tooltip>
          <Tooltip content="保存">
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconSaveStroked />}
              onClick={saveData}
            />
          </Tooltip>
          <Tooltip content="历史记录">
            <Button
              theme="borderless"
              type="tertiary"
              icon={<IconHistory />}
              onClick={getHistory}
            />
          </Tooltip>
          {hasComponents && (
            <Tooltip content="清空画布" position="bottomRight">
              <span className="clear-btn-wrap">
                <Popconfirm
                  title="清空画布"
                  content="画布上的所有元素将被删除，且无法恢复。"
                  okText="清空"
                  cancelText="取消"
                  position="bottomRight"
                  onConfirm={onClearComps}
                >
                  <Button
                    theme="borderless"
                    type="danger"
                    icon={<IconClear />}
                    aria-label="清空画布"
                  />
                </Popconfirm>
              </span>
            </Tooltip>
          )}
        </div>
      </div>

      {currentElement && multipleActiveArr.length === 0 && (
        <div className="setting-element element">
          <div className="element-header">
            {currentElement.icon && (
              <img className="element-icon" src={currentElement.icon} alt="" />
            )}
            <span className="element-name">{currentElement.name}</span>
          </div>

          <CommAttrCheckbox
            name="固定位置"
            attribute="isFixed"
            currentElement={currentElement}
            onUpdateStyle={onUpdateStyle}
          />

          <div className="item">
            <label className="title">位置</label>
            <div className="subs grid grid-2">
              <CommAttrNumber
                name="上"
                attribute="top"
                max={3200}
                min={0}
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
              <CommAttrNumber
                name="左"
                attribute="left"
                max={2200}
                min={0}
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
            </div>
          </div>

          <div className="item">
            <label className="title">大小</label>
            <div className="subs grid grid-2">
              <CommAttrNumber
                name="长"
                attribute="width"
                max={3200}
                min={0}
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
              <CommAttrNumber
                name="宽"
                attribute="height"
                max={1200}
                min={0}
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
            </div>
          </div>

          {currentElement.type === 'text' && (
            <div className="item">
              <label className="title">字体</label>
              <div className="subs grid grid-1">
                <CommAttrNumber
                  name="大小"
                  attribute="fontSize"
                  max={50}
                  min={12}
                  currentElement={currentElement}
                  onUpdateStyle={onUpdateStyle}
                />
                <CommAttrColor
                  currentElement={currentElement}
                  name="颜色"
                  attribute="color"
                  onSelect={changeAttrColor}
                />
              </div>
            </div>
          )}

          {currentElement.type === 'device' && (
            <div className="item">
              <div className="subs grid grid-1">
                <CommAttrColor
                  currentElement={currentElement}
                  name="背景"
                  attribute="background"
                  onSelect={changeAttrColor}
                />
              </div>
            </div>
          )}

          {['aisle', 'pillar', 'device'].includes(currentElement.type) && (
            <div className="item">
              <AttrOpacity
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
            </div>
          )}

          <div className="item">
            <label className="title">旋转</label>
            <div className="subs grid grid-1">
              <CommAttrNumber
                name="角度"
                attribute="rotate"
                max={360}
                min={-360}
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
            </div>
          </div>

          <div className="item">
            <CommAttrCheckbox
              label="阴影"
              name="应用阴影"
              attribute="isApplyShadow"
              currentElement={currentElement}
              onUpdateStyle={onUpdateStyle}
            />
          </div>

          {currentElement.type === 'room' && (
            <div className="item">
              <CommAttrCheckbox
                label="材质"
                name="应用材质"
                attribute="bgiBool"
                currentElement={currentElement}
                onUpdateStyle={onUpdateStyle}
              />
            </div>
          )}

          <div className="item">
            <label className="title">圆角</label>
            <div className="subs">
              <div className="subs-item">
                <Select
                  className="val-s"
                  value={Number(currentElement.style.borderRadius) || 0}
                  optionList={[
                    { value: 0, label: '无' },
                    { value: 50, label: '圆角' },
                  ]}
                  onChange={(value) => onUpdateStyle('borderRadius', value)}
                />
              </div>
            </div>
          </div>

          <div className="item del-item">
            <Button
              className="delete-btn"
              theme="light"
              type="danger"
              icon={<IconDelete />}
              onClick={() => onDelComp(currentActiveIndex)}
            >
              删除组件
            </Button>
          </div>
        </div>
      )}

      {currentActiveIndex === -1 && (
        <div className="setting-element element">
          <MultiSettings onSetMultipleState={onSetMultipleState} />
          <MultiDelete onDelComp={onDelComp} />
          <MultiList
            multipleActiveArr={multipleActiveArr}
            onDelMultipComp={onDelMultipComp}
          />
        </div>
      )}
    </div>
  );
}
