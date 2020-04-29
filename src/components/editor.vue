<template>
  <div id="editor">
    <editor-comps msg="EditorComps" v-on:selectComp="selectComp"></editor-comps>
    <editor-content v-bind:edrawComps="edrawComponents"></editor-content>
  </div>
</template>

<script>
import EditorComps from './editor-comps'
import EditorContent from './editor-content';

export default {
  name: 'Editor',
  data(){
     return {
        edrawComponents:[]
     }
  },
  components: {
    'editor-comps':EditorComps,
    'editor-content':EditorContent,
  },
  methods: {
    // 组件选择
    selectComp(data) {
      let {event, comp} = data;
      let item = JSON.parse(JSON.stringify(comp));
      if(!item) return;
      this.initEdrawComponents();
      item.isActive = true;
      let {width, height, startX, startY} = item.defStyle;
      let {clientX , clientY} = event;
      let _style = {
          width:width || 100,
          height:height || 100,
          top: clientY ||100,
          left:clientX || 100,
          startX: startX,
          startY :startY,
          position:'absolute'
      }
      item.style = _style;
      this.edrawComponents.push(item)
    },

    // 初始化画布内组件状态
    initEdrawComponents() {
      console.log('initEdrawComponents')
      let len = this.edrawComponents.length;
      for(let i=0;i<len;i++) {
        this.edrawComponents[i].isActive = false;
      }
    },

    // 组件拖拽
    dragCurrentComp(comp) {
      console.log("拖拽控件", comp)
    }
  }
}
</script>

<style>
#editor {
  padding: 0;
  position: relative;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 205px auto;
}
</style>
