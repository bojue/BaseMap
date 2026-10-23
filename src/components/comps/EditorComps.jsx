import React from 'react';
import { Button, Collapse, Empty, InputNumber, List, Tabs } from '@douyinfe/semi-ui';
import Devices_idc from './data/device_data_idc';
import Devices_other from './data/device_data_other';
import Devices_base from './data/device_data_base';
import './editor-comps.css';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const GROUPS = [
  { key: 'base', name: '基础', list: Devices_base },
  { key: 'device', name: '设备', list: Devices_idc },
  { key: 'other', name: '其他', list: Devices_other },
];

export default function EditorComps({
  elements,
  configs,
  onChangeConfig,
  onInitCompsState,
  onSelectComp,
  onShowSelectCompByDray,
}) {
  const dragStart = (event, comp) => {
    const { clientX, clientY } = event;
    onSelectComp(event, {
      ...comp,
      defStyle: { ...comp.defStyle, startX: clientX, startY: clientY },
    });
  };

  return (
    <div id="comps">
      <Tabs
        className="comps-tabs"
        type="line"
        size="small"
        defaultActiveKey="tools"
      >
        <TabPane itemKey="tools" tab="组件库">
          <div className="comps">
            <Collapse defaultActiveKey={GROUPS.map((group) => group.key)}>
              {GROUPS.map((group) => (
                <Panel key={group.key} itemKey={group.key} header={group.name}>
                  <div className="subComp">
                    {group.list.map((item, index) => (
                      <span
                        key={`${group.key}-${index}`}
                        className="item item-comp"
                        draggable
                        onDragStart={(event) => dragStart(event, item)}
                        onDrag={(event) => onShowSelectCompByDray(event)}
                      >
                        {!item.bgBool && item.icon && (
                          <img
                            className="icon"
                            src={item.icon}
                            style={item.styleObject}
                            alt={item.name}
                            loading="lazy"
                          />
                        )}
                        {item.bgBool && (
                          <span
                            className="icon"
                            style={{
                              background: item.styleObject?.background,
                              border: item.styleObject?.border,
                              width:
                                item.type === 'aisle'
                                  ? item.styleObject?.width
                                  : undefined,
                              height:
                                item.type === 'aisle'
                                  ? item.styleObject?.height
                                  : undefined,
                            }}
                          />
                        )}
                        <span className="name">{item.name}</span>
                      </span>
                    ))}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </TabPane>

        <TabPane
          itemKey="elements"
          tab={
            <span className="outline-tab">
              大纲
              <span className="outline-count">({elements.length})</span>
            </span>
          }
        >
          <div className="elements">
            <List
              dataSource={elements}
              emptyContent={<Empty title="大纲中暂无元素" />}
              renderItem={(item, index) => (
                <List.Item
                  className={`item-element${item.isActive ? ' active' : ''}`}
                  onClick={() => onInitCompsState(index)}
                >
                  <span className="index">{index + 1}</span>
                  {item.icon && (
                    <img
                      className="icon"
                      src={item.icon}
                      alt={item.name}
                      loading="lazy"
                    />
                  )}
                  <span className="name">{item.name}</span>
                  {item.isActive && <span className="activeState" />}
                </List.Item>
              )}
            />
          </div>
        </TabPane>

        <TabPane itemKey="page" tab="页面">
          <div className="page-panel">
            <div className="page-panel-title">页面尺寸</div>

            <div className="page-size-row">
              <label>宽度</label>
              <InputNumber
                size="small"
                min={200}
                max={5000}
                step={10}
                value={configs.width}
                onChange={(value) => onChangeConfig('width', Number(value) || 0)}
              />
              <span className="page-size-unit">px</span>
            </div>

            <div className="page-size-row">
              <label>高度</label>
              <InputNumber
                size="small"
                min={200}
                max={5000}
                step={10}
                value={configs.height}
                onChange={(value) => onChangeConfig('height', Number(value) || 0)}
              />
              <span className="page-size-unit">px</span>
            </div>

            <div className="page-size-tip">默认尺寸：1920 × 1080</div>

            <Button
              block
              theme="light"
              size="small"
              onClick={() => {
                onChangeConfig('width', 1920);
                onChangeConfig('height', 1080);
              }}
            >
              恢复默认尺寸
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
