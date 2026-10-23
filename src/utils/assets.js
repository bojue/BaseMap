const assetModules = import.meta.glob('../assets/**/*.{webp,svg,ico}', {
  eager: true,
  query: '?url',
  import: 'default',
});

/**
 * 通过相对 src/assets 的路径获取静态资源地址
 * 例：asset('comps/room.webp')
 */
export function asset(path) {
  const url = assetModules[`../assets/${path}`];
  if (!url) {
    console.warn(`[assets] 未找到资源: ${path}`);
    return '';
  }
  return url;
}

// 资源名 -> 当前构建产物地址，用于修复历史记录中的旧地址
const assetUrlByStem = new Map();
Object.entries(assetModules).forEach(([path, url]) => {
  const stem = path.split('/').pop().replace(/\.[^.]+$/, '');
  assetUrlByStem.set(stem, url);
});

/**
 * 把持久化数据中的旧资源地址映射到当前构建地址。
 * 资源文件名带内容哈希，且历史上由 png 迁移为 webp，
 * 直接复用旧地址会导致历史记录预览/应用时图片裂开。
 */
export function resolveAssetUrl(url) {
  if (typeof url !== 'string' || !url || url.startsWith('data:')) return url;
  const file = url.split(/[?#]/)[0].split('/').pop();
  if (!file) return url;
  const stem = file
    .replace(/\.[^.]+$/, '')
    .replace(/-[A-Za-z0-9_-]{8}$/, '');
  return assetUrlByStem.get(stem) || url;
}
