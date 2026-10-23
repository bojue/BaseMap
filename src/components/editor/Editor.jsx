import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import removeGhosting from 'remove-drag-ghosting';
import EditorComps from '../comps/EditorComps';
import EditorCanvas from '../canvas/EditorCanvas';
import EditorSettings from '../settings/EditorSettings';
import EditorHistory from '../history/EditorHistory';
import EditorHelp from '../help/EditorHelp';
import { createDefaultTemplate } from '../comps/data/default_template';
import { createUid } from '@/utils/uid';
import { resolveAssetUrl } from '@/utils/assets';
import './editor.css';

const DEFAULT_CONFIGS = {
  bg: 'floor',
  pageName: '底图',
  spacing: 10,
  scale: 1,
  dragIconSize: 2,
  Isometric_row: 10,
  Isometric_colu: 10,
  dowloadImgType: 'png',
  bgAllBool: false,
  width: 1920,
  height: 1080,
  maxWidth: 1920,
  maxHieght: 1080,
  backgroundUrl: '',
  window_w: 0,
  window_h: 0,
};

const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

const DEFAULT_TEMPLATE_NAME = '默认IDC机房';

const PREVIEW_STORAGE_KEY = 'bm_preview_payload';

const eliminateGhosting = (event) => {
  if (!event || !event.dataTransfer) return;
  const dragIcon = document.createElement('img');
  dragIcon.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  dragIcon.width = 0;
  dragIcon.height = 0;
  event.dataTransfer.setDragImage(dragIcon, 0, 0);
};

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

/**
 * BaseMap 编辑器：状态与交互逻辑
 */
export default function Editor() {
  const [components, setComponents] = useState(() => createDefaultTemplate());
  const [configs, setConfigs] = useState({ ...DEFAULT_CONFIGS });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [multipleActiveArr, setMultipleActiveArr] = useState([]); // 保存多选组件的 uid
  const [historyList, setHistoryList] = useState([]);
  const [historyVisible, setHistoryVisible] = useState(false);

  const dbRef = useRef(null);
  const copyFlagRef = useRef(false);
  const stateRef = useRef({});
  const canvasRectRef = useRef(null);
  const rafRef = useRef(0);
  const pendingPatchRef = useRef(null);

  stateRef.current = { components, configs, activeIndex, multipleActiveArr };

  const multipleComponents = components.filter((item) =>
    multipleActiveArr.includes(item._uid),
  );
  const currentElement = components[activeIndex];

  const getCanvasRect = () =>
    document.getElementById('canvas')?.getBoundingClientRect() || { left: 0, top: 0 };

  const patchComponent = useCallback((uid, updater) => {
    setComponents((prev) =>
      prev.map((item) => (item._uid === uid ? updater(item) : item)),
    );
  }, []);

  const patchStyle = useCallback(
    (uid, stylePatch) => {
      patchComponent(uid, (item) => ({
        ...item,
        style: { ...item.style, ...stylePatch },
      }));
    },
    [patchComponent],
  );

  // 拖拽/旋转等高频事件按帧合并，避免每次 drag 事件都触发一次整树渲染
  const schedulePatchStyle = useCallback(
    (uid, stylePatch) => {
      pendingPatchRef.current = { uid, patch: stylePatch };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const pending = pendingPatchRef.current;
        pendingPatchRef.current = null;
        if (pending) patchStyle(pending.uid, pending.patch);
      });
    },
    [patchStyle],
  );

  // 交互结束时立即提交最后一帧，避免位置停在上一帧
  const flushPatchStyle = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const pending = pendingPatchRef.current;
    pendingPatchRef.current = null;
    if (pending) patchStyle(pending.uid, pending.patch);
  }, [patchStyle]);

  const resetSelection = useCallback(() => {
    copyFlagRef.current = false;
    setComponents((prev) => {
      let changed = false;
      const next = prev.map((item) => {
        if (!item.isActive && !item.multipleActiveBool) return item;
        changed = true;
        return { ...item, isActive: false, multipleActiveBool: false };
      });
      return changed ? next : prev;
    });
    setMultipleActiveArr((prev) => (prev.length ? [] : prev));
  }, []);

  const clearSelection = useCallback(() => {
    resetSelection();
    setActiveIndex(-1);
  }, [resetSelection]);

  // 组件选择
  const selectComp = useCallback((event, comp) => {
    if (event) removeGhosting(event);
    if (!comp) return;
    const item = cloneDeep(comp);
    const rect = getCanvasRect();
    canvasRectRef.current = rect;
    const { clientX = 0, clientY = 0 } = event || {};
    const { scale, maxWidth, maxHieght } = stateRef.current.configs;
    const {
      width,
      height,
      borderRadius,
      rotate,
      borderWidth,
      background,
      isApplyShadow,
      bgiBool,
      color,
      border,
      opacity,
    } = item.defStyle || {};

    const style = {
      width: width || 100,
      height: height || 100,
      top: clamp((clientY - rect.top) / scale, 0, maxHieght),
      left: clamp((clientX - rect.left) / scale, 0, maxWidth),
      rotate: rotate || 0,
      drag_start_x: 0,
      drag_start_y: 0,
      borderWidth: borderWidth || 0,
      background,
      isApplyShadow:
        isApplyShadow === undefined || isApplyShadow === null ? 'true' : isApplyShadow,
      position: 'absolute',
      isFixed: 'false',
      bgiBool: bgiBool || false,
      borderRadius: borderRadius || 0,
      border,
      fontSize: 14,
      opacity: opacity || 1,
      color,
    };

    item._uid = createUid();
    item.isActive = true;
    item.multipleActiveBool = false;
    item.style = style;

    setComponents((prev) => [
      ...prev.map((compItem) => ({
        ...compItem,
        isActive: false,
        multipleActiveBool: false,
      })),
      item,
    ]);
    setActiveIndex(stateRef.current.components.length);
    setMultipleActiveArr([]);
  }, []);

  // 拖拽创建组件时跟随鼠标
  const showSelectCompByDray = useCallback((event) => {
    if (!event || (!event.clientX && !event.clientY)) return;
    const { components: list, configs: conf } = stateRef.current;
    const current = list[list.length - 1];
    if (!current) return;
    const rect = canvasRectRef.current || getCanvasRect();
    schedulePatchStyle(current._uid, {
      top: clamp((event.clientY - rect.top) / conf.scale, 0, conf.maxHieght),
      left: clamp((event.clientX - rect.left) / conf.scale, 0, conf.maxWidth),
    });
  }, [schedulePatchStyle]);

  // 组件选中状态（支持 Shift / Command 多选）
  const initComponentState = useCallback((index, event) => {
    if (index === undefined || index === null || index === -1) return;
    if (event) removeGhosting(event);
    const { components: list } = stateRef.current;
    const comp = list[index];
    if (!comp) return;

    const isMulti =
      event && (event.shiftKey || (event.metaKey && isMac())) && event.button === 0;

    if (isMulti) {
      const nextBool = !comp.multipleActiveBool;
      setActiveIndex(-1);
      patchComponent(comp._uid, (item) => ({
        ...item,
        isActive: false,
        multipleActiveBool: nextBool,
      }));
      setMultipleActiveArr((prev) =>
        nextBool
          ? [...prev.filter((uid) => uid !== comp._uid), comp._uid]
          : prev.filter((uid) => uid !== comp._uid),
      );
    } else {
      resetSelection();
      setActiveIndex(index);
      setComponents((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, isActive: true, multipleActiveBool: false }
            : item,
        ),
      );
    }
  }, [patchComponent, resetSelection]);

  // 组件拖拽
  const dragCurrentComp = useCallback(
    (event, comp, state) => {
      if (!event) return;
      if (event.shiftKey || (event.metaKey && isMac())) return;
      copyFlagRef.current = false;
      const { components: list, configs: conf } = stateRef.current;
      const latest = list.find((item) => item._uid === comp._uid) || comp;
      if (!latest) return;

      if (state === 'start') {
        setActiveIndex(list.findIndex((item) => item._uid === comp._uid));
        patchStyle(latest._uid, {
          drag_start_x: event.clientX,
          drag_start_y: event.clientY,
          drag_start_left: latest.style.left,
          drag_start_top: latest.style.top,
        });
        eliminateGhosting(event);
      } else if (state === 'drag') {
        const startLeft =
          latest.style.drag_start_left === undefined
            ? latest.style.left
            : latest.style.drag_start_left;
        const startTop =
          latest.style.drag_start_top === undefined
            ? latest.style.top
            : latest.style.drag_start_top;
        const dx = (event.clientX - latest.style.drag_start_x) / conf.scale;
        const dy = (event.clientY - latest.style.drag_start_y) / conf.scale;
        schedulePatchStyle(latest._uid, {
          left: clamp(startLeft + dx, 0, conf.maxWidth),
          top: clamp(startTop + dy, 0, conf.maxHieght),
        });
      } else if (state === 'end') {
        flushPatchStyle();
      }
    },
    [flushPatchStyle, patchStyle, schedulePatchStyle],
  );

  // 通过拖拽控制点调整大小
  const resizeByDragComp = useCallback(
    (event, comp, arrow, state) => {
      if (!event) return;
      if (event.shiftKey || (event.metaKey && isMac())) return;
      copyFlagRef.current = false;
      const { components: list, configs: conf } = stateRef.current;
      const latest = list.find((item) => item._uid === comp._uid) || comp;
      if (!latest) return;

      if (state === 'start') {
        setActiveIndex(list.findIndex((item) => item._uid === comp._uid));
        patchStyle(latest._uid, {
          drag_start_x: event.clientX,
          drag_start_y: event.clientY,
          drag_start_left: latest.style.left,
          drag_start_top: latest.style.top,
          drag_start_width: latest.style.width,
          drag_start_height: latest.style.height,
        });
        return;
      }

      if (state === 'end') {
        flushPatchStyle();
        return;
      }

      if (state !== 'drag') return;

      const startLeft =
        latest.style.drag_start_left === undefined
          ? latest.style.left
          : latest.style.drag_start_left;
      const startTop =
        latest.style.drag_start_top === undefined
          ? latest.style.top
          : latest.style.drag_start_top;
      const startWidth =
        Number(latest.style.drag_start_width) || Number(latest.style.width);
      const startHeight =
        Number(latest.style.drag_start_height) || Number(latest.style.height);
      const dx = (event.clientX - latest.style.drag_start_x) / conf.scale;
      const dy = (event.clientY - latest.style.drag_start_y) / conf.scale;

      switch (arrow) {
        case 'r': {
          const width = clamp(startWidth + dx, 10, conf.width);
          schedulePatchStyle(latest._uid, { width });
          break;
        }
        case 'b': {
          const height = clamp(startHeight + dy, 10, conf.height);
          schedulePatchStyle(latest._uid, { height });
          break;
        }
        case 'l': {
          const coordLeft = clamp(
            startLeft + dx,
            0,
            startLeft + startWidth - 10,
          );
          schedulePatchStyle(latest._uid, {
            left: coordLeft,
            width: startLeft + startWidth - coordLeft,
          });
          break;
        }
        case 't': {
          const coordTop = clamp(
            startTop + dy,
            0,
            startTop + startHeight - 10,
          );
          schedulePatchStyle(latest._uid, {
            top: coordTop,
            height: startTop + startHeight - coordTop,
          });
          break;
        }
        default:
          break;
      }
    },
    [flushPatchStyle, patchStyle, schedulePatchStyle],
  );

  // 旋转
  const transComp = useCallback(
    (event, comp, state) => {
      if (!event) return;
      if (state === 'end') {
        flushPatchStyle();
        return;
      }
      const { components: list, configs: conf } = stateRef.current;
      const latest = list.find((item) => item._uid === comp._uid) || comp;
      if (state === 'start' || !canvasRectRef.current) {
        canvasRectRef.current = getCanvasRect();
      }
      const rect = canvasRectRef.current;
      const centerX =
        rect.left +
        (Number(latest.style.left) + Number(latest.style.width) / 2) * conf.scale;
      const centerY =
        rect.top +
        (Number(latest.style.top) + Number(latest.style.height) / 2) * conf.scale;
      const x = event.clientX - centerX;
      const y = event.clientY - centerY;
      schedulePatchStyle(latest._uid, {
        rotate: Math.ceil((Math.atan2(y, x) * 180) / Math.PI),
      });
    },
    [flushPatchStyle, schedulePatchStyle],
  );

  const changeTextVal = useCallback(
    (event, item) => {
      if (!event || !item) return;
      const value = event.target.innerText;
      patchComponent(item._uid, (comp) => ({ ...comp, value }));
    },
    [patchComponent],
  );

  // 删除组件
  const delComp = useCallback(
    (index, state) => {
      const {
        components: list,
        activeIndex: currentActive,
        multipleActiveArr: multiUids,
      } = stateRef.current;

      if (state === 'multipleDel') {
        const uidSet = new Set(multiUids);
        setComponents((prev) =>
          prev.filter(
            (item) => !(item.multipleActiveBool || uidSet.has(item._uid)),
          ),
        );
        setMultipleActiveArr([]);
        setActiveIndex(-1);
        return;
      }

      const target = typeof index === 'number' ? index : currentActive;
      if (target > -1 && list.length > 0) {
        const targetUid = list[target]?._uid;
        setComponents((prev) => prev.filter((item) => item._uid !== targetUid));
        setActiveIndex(-1);
      }
    },
    [],
  );

  // 多选元素删除
  const delMultipComp = useCallback(
    (uid) => {
      setMultipleActiveArr((prev) => prev.filter((item) => item !== uid));
      patchComponent(uid, (item) => ({ ...item, multipleActiveBool: false }));
    },
    [patchComponent],
  );

  // 复制当前组件
  const copyCurrentComp = useCallback(() => {
    const { components: list, activeIndex: currentActive, configs: conf } =
      stateRef.current;
    const current = list[currentActive];
    if (!current) return;

    const copy = cloneDeep(current);
    copy._uid = createUid();
    copy.isActive = true;
    copy.multipleActiveBool = false;
    copy.style.top = clamp(
      parseInt(current.style.height, 10) +
        parseInt(current.style.top, 10) +
        conf.spacing,
      0,
      conf.maxHieght,
    );

    setComponents((prev) => [
      ...prev.map((item) => ({ ...item, isActive: false })),
      copy,
    ]);
    setActiveIndex(list.length);
    setMultipleActiveArr([]);
  }, []);

  // 方向键微调
  const arrowItem = useCallback(
    (arrow, item) => {
      const style = item.style;
      switch (arrow) {
        case 'ArrowUp':
          return { top: style.top - 1 > 0 ? style.top - 1 : 0 };
        case 'ArrowDown':
          return { top: style.top + 1 };
        case 'ArrowLeft':
          return { left: style.left - 1 > 0 ? style.left - 1 : 0 };
        case 'ArrowRight':
          return { left: style.left + 1 };
        default:
          return null;
      }
    },
    [],
  );

  // 多选操作：等距 / 反选 / 清空 / 属性应用 / 对齐
  const setMultipleState = useCallback(
    (state, value) => {
      const { components: list, multipleActiveArr: multiUids, configs: conf } =
        stateRef.current;
      const uidSet = new Set(multiUids);

      if (state === 'Isometric') {
        const selected = list.filter((item) => uidSet.has(item._uid));
        if (!selected.length) return;
        const updates = {};
        let val = 0;

        if (value === 'row') {
          selected
            .sort((a, b) => parseInt(a.style.left, 10) - parseInt(b.style.left, 10))
            .forEach((item, index) => {
              let left = parseInt(item.style.left, 10);
              if (index > 0) {
                left = val;
                updates[item._uid] = { ...updates[item._uid], left };
              }
              val = clamp(
                left + parseInt(item.style.width, 10) + parseInt(conf.Isometric_row, 10),
                0,
                conf.maxWidth,
              );
            });
        } else {
          selected
            .sort((a, b) => parseInt(a.style.top, 10) - parseInt(b.style.top, 10))
            .forEach((item, index) => {
              let top = parseInt(item.style.top, 10);
              if (index > 0) {
                top = val;
                updates[item._uid] = { ...updates[item._uid], top };
              }
              val = clamp(
                top + parseInt(item.style.height, 10) + parseInt(conf.Isometric_colu, 10),
                0,
                conf.maxHieght,
              );
            });
        }

        setComponents((prev) =>
          prev.map((item) =>
            updates[item._uid]
              ? { ...item, style: { ...item.style, ...updates[item._uid] } }
              : item,
          ),
        );
        return;
      }

      if (state === 'reSel') {
        setComponents((prev) =>
          prev.map((item) => ({
            ...item,
            isActive: false,
            multipleActiveBool: !item.multipleActiveBool,
          })),
        );
        setMultipleActiveArr(
          list.filter((item) => !item.multipleActiveBool).map((item) => item._uid),
        );
        setActiveIndex(-1);
        return;
      }

      if (state === 'clear') {
        resetSelection();
        setActiveIndex(-1);
        return;
      }

      if (state === 'isApplyShadow' || state === 'borderRadius') {
        setComponents((prev) =>
          prev.map((item) =>
            uidSet.has(item._uid)
              ? { ...item, style: { ...item.style, [state]: value } }
              : item,
          ),
        );
        return;
      }

      if (state === 'align') {
        const selected = list.filter((item) => uidSet.has(item._uid));
        if (!selected.length) return;
        let updates = {};

        if (value === 't') {
          const top = Math.min(...selected.map((item) => parseInt(item.style.top, 10)));
          selected.forEach((item) => {
            updates[item._uid] = { top };
          });
        } else if (value === 'l') {
          const left = Math.min(...selected.map((item) => parseInt(item.style.left, 10)));
          selected.forEach((item) => {
            updates[item._uid] = { left };
          });
        } else if (value === 'b') {
          const bottom = Math.max(
            ...selected.map(
              (item) => parseInt(item.style.top, 10) + parseInt(item.style.height, 10),
            ),
          );
          selected.forEach((item) => {
            updates[item._uid] = {
              top: bottom - parseInt(item.style.height, 10),
            };
          });
        } else if (value === 'r') {
          const right = Math.max(
            ...selected.map(
              (item) => parseInt(item.style.left, 10) + parseInt(item.style.width, 10),
            ),
          );
          selected.forEach((item) => {
            updates[item._uid] = {
              left: right - parseInt(item.style.width, 10),
            };
          });
        }

        setComponents((prev) =>
          prev.map((item) =>
            updates[item._uid]
              ? { ...item, style: { ...item.style, ...updates[item._uid] } }
              : item,
          ),
        );
      }
    },
    [resetSelection],
  );

  const changeConfig = useCallback((state, value) => {
    setConfigs((prev) => {
      if (!(state in prev)) return prev;
      const next = { ...prev, [state]: value };
      if (state === 'bg') next.backgroundUrl = '';
      if (state === 'width') next.maxWidth = value;
      if (state === 'height') next.maxHieght = value;
      return next;
    });
  }, []);

  const changeBgImg = useCallback((url) => {
    setConfigs((prev) => ({ ...prev, backgroundUrl: url }));
  }, []);

  const updateActiveStyle = useCallback(
    (attribute, value) => {
      const { components: list, activeIndex: currentActive } = stateRef.current;
      const current = list[currentActive];
      if (!current) return;
      patchStyle(current._uid, { [attribute]: value });
    },
    [patchStyle],
  );

  const selColor = useCallback(
    (color) => {
      const { components: list, activeIndex: currentActive } = stateRef.current;
      const current = list[currentActive];
      if (current) patchStyle(current._uid, { color });
    },
    [patchStyle],
  );

  const selBackground = useCallback(
    (bgColor) => {
      const { components: list, activeIndex: currentActive } = stateRef.current;
      const current = list[currentActive];
      if (current) patchStyle(current._uid, { background: bgColor });
    },
    [patchStyle],
  );

  const screen = useCallback(() => {
    setConfigs((prev) => {
      const nextBool = !prev.bgAllBool;
      if (!nextBool) return { ...prev, bgAllBool: false };
      return {
        ...prev,
        bgAllBool: true,
        window_w: 2985,
        window_h: 1445,
        scale: 1,
      };
    });
  }, []);

  // 把当前画布数据写入本地，并在新页面打开只读预览
  const openPreview = useCallback(() => {
    const { configs: conf, components: list } = stateRef.current;
    try {
      localStorage.setItem(
        PREVIEW_STORAGE_KEY,
        JSON.stringify({ configs: conf, components: list }),
      );
    } catch (error) {
      Toast.error('预览数据过大，无法打开预览页');
      return;
    }
    window.open(`${window.location.href.split('#')[0]}#preview`, '_blank');
  }, []);

  const zoom = useCallback((state) => {
    setConfigs((prev) => ({
      ...prev,
      scale:
        state === 'zoomout'
          ? Math.max(prev.scale - 0.1, 0.2)
          : Math.min(prev.scale + 0.1, 1.5),
    }));
  }, []);

  const setScale = useCallback((value) => {
    setConfigs((prev) => ({ ...prev, scale: value }));
  }, []);

  // 清空画布
  const clearAllComps = useCallback(() => {
    copyFlagRef.current = false;
    setComponents([]);
    setActiveIndex(-1);
    setMultipleActiveArr([]);
    Toast.success('画布已清空');
  }, []);

  // IndexedDB
  const openDB = useCallback(
    () =>
      new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error('当前浏览器不支持 IndexedDB'));
          return;
        }
        const request = window.indexedDB.open('bm_DBDataBase', 1);
        request.onerror = (error) => reject(error);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('save_data_custom')) {
            const store = db.createObjectStore('save_data_custom', {
              keyPath: 'id',
              autoIncrement: true,
            });
            store.createIndex('id', 'id', { unique: false });
          }
        };
      }),
    [],
  );

  const getStorageData = useCallback(() => {
    return new Promise((resolve, reject) => {
      const objectStore = dbRef.current
        .transaction('save_data_custom')
        .objectStore('save_data_custom');
      const res = [];
      const request = objectStore.openCursor();
      request.onerror = (error) => reject(error);
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res);
        }
      };
    });
  }, []);

  const refreshHistory = useCallback(async () => {
    const list = await getStorageData();
    setHistoryList(orderBy(list, 'updateTime', 'desc'));
  }, [getStorageData]);

  const addDateToDb = useCallback((item, silent = false) => {
    return new Promise((resolve, reject) => {
      const store = dbRef.current
        .transaction(['save_data_custom'], 'readwrite')
        .objectStore('save_data_custom');
      const request = store.add(item);
      request.onerror = (error) => {
        Toast.error('保存失败');
        reject(error);
      };
      request.onsuccess = () => {
        if (!silent) Toast.success('保存成功！');
        resolve();
      };
    });
  }, []);

  const saveDateToStorage = useCallback(
    async (data, state) => {
      const list = data || stateRef.current.components;
      if (!list || (Array.isArray(list) && list.length === 0)) return;
      if (!dbRef.current) dbRef.current = await openDB();
      await addDateToDb({
        data: cloneDeep(list),
        type: state || 'auto',
        updateTime: new Date(),
      });
      await refreshHistory();
    },
    [addDateToDb, openDB, refreshHistory],
  );

  const getHostoryList = useCallback(async () => {
    if (!dbRef.current) dbRef.current = await openDB();
    await refreshHistory();
    setHistoryVisible(true);
  }, [openDB, refreshHistory]);

  const deleteHistoryData = useCallback(
    async (index) => {
      const current = historyList[index];
      if (!current) return;
      const deleted = await new Promise((resolve, reject) => {
        const store = dbRef.current
          .transaction(['save_data_custom'], 'readwrite')
          .objectStore('save_data_custom');
        const request = store.delete(current.id);
        request.onerror = (error) => {
          Toast.error('删除失败');
          reject(error);
        };
        request.onsuccess = () => resolve(true);
      });
      if (deleted) {
        Toast.success('删除成功');
        await refreshHistory();
      }
    },
    [historyList, refreshHistory],
  );

  const applyHistory = useCallback(
    (list) => {
      setComponents(
        (list || []).map((item) => ({
          ...cloneDeep(item),
          icon: resolveAssetUrl(item.icon),
          backgroundImage: resolveAssetUrl(item.backgroundImage),
          _uid: item._uid || createUid(),
          isActive: false,
          multipleActiveBool: false,
        })),
      );
      setActiveIndex(-1);
      setMultipleActiveArr([]);
      setHistoryVisible(false);
    },
    [],
  );

  const closeHistory = useCallback(() => setHistoryVisible(false), []);

  // 键盘事件
  const handleKeyDown = useCallback(
    (event) => {
      const target = event.target;
      // 正在编辑文本组件时，保留浏览器默认的输入、删除与方向键行为
      if (target?.isContentEditable) return;

      const isInput = target?.nodeName === 'INPUT' || target?.nodeName === 'TEXTAREA';

      if (event.key === 'v' && isInput) return;
      if (event.key === 'c' && isInput) document.activeElement?.blur();
      if (event.target?.nodeName === 'INPUT' && copyFlagRef.current) {
        copyFlagRef.current = false;
      }

      if (event.key === 'c') {
        copyFlagRef.current = true;
      } else if (copyFlagRef.current && event.key === 'v') {
        copyCurrentComp();
      } else if (event.target?.nodeName !== 'INPUT') {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
          event.preventDefault();
          const { components: list, activeIndex: currentActive } = stateRef.current;
          const selected = list.filter((item) => item.multipleActiveBool);
          const targets = selected.length
            ? selected
            : currentActive > -1
              ? [list[currentActive]]
              : [];
          const patches = targets
            .map((item) => ({ item, patch: arrowItem(event.code, item) }))
            .filter((entry) => entry.patch);

          if (patches.length) {
            const patchMap = new Map(
              patches.map((entry) => [entry.item._uid, entry.patch]),
            );
            setComponents((prev) => {
              let changed = false;
              const next = prev.map((item) => {
                const patch = patchMap.get(item._uid);
                if (!patch) return item;
                changed = true;
                return { ...item, style: { ...item.style, ...patch } };
              });
              return changed ? next : prev;
            });
          }
        }
      }

      if (event.key === 'Delete' || (isMac() && event.key === 'Backspace')) {
        const el = event.target;
        const isEditing =
          el?.contentEditable === 'true' && Boolean(el?.innerHTML);
        if (!isEditing) delComp();
      }
    },
    [arrowItem, copyCurrentComp, delComp],
  );

  // 点击画布空白处清空选中
  const handleMouseDown = useCallback(
    (event) => {
      eliminateGhosting(event);
      if (event.shiftKey && stateRef.current.activeIndex > -1) {
        setComponents((prev) =>
          prev.map((item) => (item.isActive ? { ...item, isActive: false } : item)),
        );
        setActiveIndex(-1);
      }
      const isMultiKey = event.shiftKey || (event.metaKey && isMac());
      if (
        !isMultiKey &&
        event.button === 0 &&
        event.target.id === 'canvas' &&
        !event.target.classList.contains('comp-element')
      ) {
        copyFlagRef.current = false;
        clearSelection();
      }
    },
    [clearSelection],
  );

  const leaving = useCallback((event) => {
    const message = '内容更改，注意截图缓存';
    event.returnValue = message;
    return message;
  }, []);

  useEffect(() => {
    openDB()
      .then((db) => {
        dbRef.current = db;
      })
      .catch((error) => console.error('数据库打开失败:', error));

    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('beforeunload', leaving);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('beforeunload', leaving);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleKeyDown, handleMouseDown, leaving, openDB]);

  // 首次进入时，把 IDC 默认模板写入历史记录（同名记录只存一次）
  useEffect(() => {
    let canceled = false;
    const seedDefaultHistory = async () => {
      try {
        if (!dbRef.current) dbRef.current = await openDB();
        const list = await getStorageData();
        if (list.some((item) => item.name === DEFAULT_TEMPLATE_NAME)) return;
        await addDateToDb(
          {
            name: DEFAULT_TEMPLATE_NAME,
            data: createDefaultTemplate(),
            type: 'custom',
            updateTime: new Date(),
          },
          true,
        );
        if (!canceled) await refreshHistory();
      } catch (error) {
        console.error('默认模板写入历史记录失败:', error);
      }
    };
    seedDefaultHistory();
    return () => {
      canceled = true;
    };
  }, [addDateToDb, getStorageData, openDB, refreshHistory]);

  return (
    <div id="editor">
      <EditorComps
        elements={components}
        configs={configs}
        onChangeConfig={changeConfig}
        onInitCompsState={initComponentState}
        onSelectComp={selectComp}
        onShowSelectCompByDray={showSelectCompByDray}
      />

      <EditorCanvas
        configs={configs}
        edrawComps={components}
        onInitCompsState={initComponentState}
        onDragComp={dragCurrentComp}
        onResizeByDragComp={resizeByDragComp}
        onTrans={transComp}
        onChangeTextVal={changeTextVal}
        onScreen={screen}
        onZoom={zoom}
        onScaleChange={setScale}
      />

      <EditorSettings
        currentActiveIndex={activeIndex}
        currentElement={currentElement}
        multipleActiveArr={multipleComponents}
        configs={configs}
        onDelComp={delComp}
        onDelMultipComp={delMultipComp}
        onSetMultipleState={setMultipleState}
        onChangeConfig={changeConfig}
        onPreview={openPreview}
        hasComponents={components.length > 0}
        onClearComps={clearAllComps}
        onSaveDateToStorage={saveDateToStorage}
        onGetHistory={getHostoryList}
        onChangeBgImg={changeBgImg}
        onSelColor={selColor}
        onSelBackground={selBackground}
        onUpdateStyle={updateActiveStyle}
      />

      <EditorHistory
        visible={historyVisible}
        list={historyList}
        onClose={closeHistory}
        onApply={applyHistory}
        onDelete={deleteHistoryData}
      />

      <EditorHelp />
    </div>
  );
}
