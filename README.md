# BaseMap

基于Vue开发的底图配置工具, [开源最新版本](https://bojue.github.io/BaseMap)

[持续迭代（欢迎提交issue）](https://github.com/bojue/BaseMap/issues)

```diff
!  数据存储在IndexedDB，不要清除本地缓存:cookie及其他网站数据 
```

## 预览

![截屏2022-03-06 上午11 48 00](https://user-images.githubusercontent.com/14350577/156908397-84dae84b-0141-4910-80ef-f56eed170307.png)

![demo](https://user-images.githubusercontent.com/14350577/156908201-c62eed78-f316-485f-8cc5-f4c32cbceef4.png)


## 底图说明

业务需要已经重构到 `2980x1440`像素大小的底图支持

## 下载
```
git clone https://github.com/bojue/BaseMap.git
```

### 启动项目
```
npm install
npm run dev 
```

### 打包
```
npm run build
```

## 功能点

- 组件创建：拖拽/拷贝
- 样式属性绑定：大小/位置/圆角/阴影/材质
- 组件拖拽:大小/位置/旋转()
- 多选操作:样式设置/间距/对齐/删除
- 设置背景：图片/颜色/网格
- 快捷键:复制粘贴/创建/删除
- IndexDB缓存:手动保存
- 历史记录:查看/应用
- 预览:全屏/缩放

## 更新历史

- 2020/11/09 本地缓存方案更新：localstorage -> indexDB
- 2022/03/03 优化拖拽创建组件卡顿问题，由拖拽监听dragEnd修改成drag

