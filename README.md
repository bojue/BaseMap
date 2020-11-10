# BaseMap

基于Vue开发的底图配置工具, [开源最新版本（持续迭代）](https://bojue.github.io/BaseMap)

[稳定版](https://h5-editor.github.io/baseMap/)

## 预览

![DEMO](https://github.com/bojue/BaseMap/blob/master/src/assets/demo.png)

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
- 组件拖拽:大小/位置/旋转
- 多选操作:样式设置/间距/对齐/删除
- 设置背景：图片/颜色/网格
- 快捷键:复制粘贴/创建/删除
- IndexDB缓存:手动保存
- 历史记录:查看/应用
- 预览:全屏/缩放

## 更新历史

- 2020/11/09 本地缓存方案更新：localstorage -> indexDB

