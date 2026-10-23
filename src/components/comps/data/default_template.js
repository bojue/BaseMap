import { asset } from '@/utils/assets';
import { createUid } from '@/utils/uid';

const ICONS = {
  room: asset('comps/room.webp'),
  text: asset('comps/text.webp'),
  device: asset('comps/device.webp'),
  chiller: asset('comps/lengji.webp'),
  battery: asset('comps/dianchizu_duohang.webp'),
  generator: asset('comps/chaifa.webp'),
  monitoring: asset('comps/jiankongzhongxin.webp'),
};

const FLOOR_TEXTURE = asset('icon/floor3.webp');

const baseStyle = (extra = {}) => ({
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  rotate: 0,
  drag_start_x: 0,
  drag_start_y: 0,
  borderWidth: 0,
  background: undefined,
  border: undefined,
  isApplyShadow: 'false',
  position: 'absolute',
  isFixed: 'false',
  bgiBool: false,
  borderRadius: 0,
  fontSize: 14,
  opacity: 1,
  color: undefined,
  ...extra,
});

const createItem = (type, name, icon, style, extra = {}) => ({
  _uid: createUid(),
  type,
  name,
  icon,
  isActive: false,
  multipleActiveBool: false,
  style: baseStyle(style),
  ...extra,
});

const room = (name, left, top, width, height) =>
  createItem(
    'room',
    name,
    ICONS.room,
    {
      left,
      top,
      width,
      height,
      borderWidth: 4,
      bgiBool: 'true',
      opacity: 0.16,
    },
    { backgroundImage: FLOOR_TEXTURE },
  );

const text = (value, left, top, width, height, fontSize, color) =>
  createItem(
    'text',
    value,
    ICONS.text,
    {
      left,
      top,
      width,
      height,
      fontSize,
      color,
      background: 'transparent',
      isApplyShadow: 'true',
    },
    { value },
  );

const rack = (name, left, top, background) =>
  createItem('device', name, ICONS.device, {
    left,
    top,
    width: 20,
    height: 42,
    background,
    borderRadius: 2,
    isApplyShadow: 'false',
  });

const aisle = (left, top, width) =>
  createItem('aisle', '冷通道', ICONS.device, {
    left,
    top,
    width,
    height: 26,
    background: '#26c9ff',
    border: '1px solid #63d7ff',
    opacity: 0.22,
  });

const image = (name, icon, left, top, width, height) =>
  createItem('img', name, icon, {
    left,
    top,
    width,
    height,
    isApplyShadow: 'false',
  });

/**
 * IDC 机房默认平面模板（画布 1920 × 1080）
 */
export function createDefaultTemplate() {
  const list = [];

  // 标题
  list.push(
    text('IDC 数据中心 · 机房平面图', 40, 32, 460, 30, 20, '#1c1f23'),
    text('A 区 / 动力区 / 网络区', 40, 60, 300, 20, 12, '#8a919f'),
  );

  // 机房区域
  list.push(
    room('服务器机房', 40, 90, 1080, 840),
    room('动力机房', 1140, 90, 740, 400),
    room('网络机房', 1140, 520, 740, 420),
    text('服务器机房', 64, 102, 180, 26, 15, '#1c1f23'),
    text('动力机房', 1164, 102, 140, 26, 15, '#1c1f23'),
    text('网络机房', 1164, 532, 140, 26, 15, '#1c1f23'),
  );

  // 服务器机房：4 组双排机柜 + 冷通道
  const blockLefts = [80, 440];
  const clusters = [180, 340, 500, 660];
  const rackWidth = 20;
  const rackGap = 4;
  const perRow = 12;
  const blockWidth = perRow * (rackWidth + rackGap) - rackGap;

  blockLefts.forEach((blockLeft, blockIndex) => {
    clusters.forEach((clusterTop, clusterIndex) => {
      const aisleTop = clusterTop + 46;
      const secondRowTop = aisleTop + 32;

      list.push(aisle(blockLeft, aisleTop, blockWidth));

      for (let i = 0; i < perRow; i += 1) {
        const left = blockLeft + i * (rackWidth + rackGap);
        const no = String(i + 1).padStart(2, '0');
        list.push(
          rack(
            `机柜 A${blockIndex + 1}-${clusterIndex + 1}${no}`,
            left,
            clusterTop,
            '#ff8c00',
          ),
          rack(
            `机柜 B${blockIndex + 1}-${clusterIndex + 1}${no}`,
            left,
            secondRowTop,
            '#5a8eda',
          ),
        );
      }
    });
  });

  list.push(
    text('冷通道', 150, 150, 60, 20, 12, '#26a3d9'),
    text('冷通道', 510, 150, 60, 20, 12, '#26a3d9'),
    text('冷水机组', 800, 150, 100, 20, 12, '#646a73'),
    createItem(
      'text',
      '主走道',
      ICONS.text,
      {
        left: 355,
        top: 400,
        width: 110,
        height: 20,
        fontSize: 12,
        color: '#8a919f',
        background: 'transparent',
        rotate: 90,
        isApplyShadow: 'true',
      },
      { value: '主走道' },
    ),
    text('橙色：存储机柜   蓝色：计算 / 网络机柜   浅蓝：冷通道', 80, 850, 560, 22, 12, '#8a919f'),
    text('机柜 192 台 · 冷通道 8 条', 820, 850, 240, 22, 12, '#8a919f'),
  );

  // 服务器机房右侧冷水机组
  [180, 330, 480, 630].forEach((top, index) => {
    list.push(
      image(`冷水机组 ${index * 2 + 1}`, ICONS.chiller, 800, top, 50, 140),
      image(`冷水机组 ${index * 2 + 2}`, ICONS.chiller, 870, top, 50, 140),
    );
  });

  // 动力机房：电池组 / UPS / 柴油发电机
  list.push(
    text('电池组', 1180, 145, 80, 20, 12, '#646a73'),
    text('UPS 配电', 1490, 145, 100, 20, 12, '#646a73'),
    text('柴油发电机', 1640, 145, 120, 20, 12, '#646a73'),
  );

  for (let i = 0; i < 4; i += 1) {
    const top = 170 + i * 60;
    list.push(
      image(`电池组 ${i * 2 + 1}`, ICONS.battery, 1180, top, 110, 40),
      image(`电池组 ${i * 2 + 2}`, ICONS.battery, 1330, top, 110, 40),
      createItem('device', `UPS ${i + 1}`, ICONS.device, {
        left: 1500,
        top,
        width: 60,
        height: 40,
        background: '#2f3c35',
        borderRadius: 2,
        isApplyShadow: 'false',
      }),
    );
  }

  list.push(
    image('柴油发电机 1', ICONS.generator, 1640, 180, 100, 35),
    image('柴油发电机 2', ICONS.generator, 1640, 270, 100, 35),
  );

  // 网络机房：网络机柜 + 冷通道 + 监控中心
  const networkLeft = 1180;
  const networkWidth = perRow * (rackWidth + rackGap) - rackGap;

  list.push(
    text('网络机柜', 1180, 585, 100, 20, 12, '#646a73'),
    text('监控中心', 1600, 585, 100, 20, 12, '#646a73'),
    text('核心交换区', 1180, 775, 160, 20, 12, '#8a919f'),
    text('综合布线区', 1480, 775, 120, 20, 12, '#8a919f'),
    aisle(networkLeft, 656, networkWidth),
    image('监控中心', ICONS.monitoring, 1600, 610, 180, 80),
  );

  for (let i = 0; i < perRow; i += 1) {
    const left = networkLeft + i * (rackWidth + rackGap);
    const no = String(i + 1).padStart(2, '0');
    list.push(
      rack(`网络机柜 N1-${no}`, left, 610, '#5a8eda'),
      rack(`网络机柜 N2-${no}`, left, 686, '#ff8c00'),
    );
  }

  return list;
}
