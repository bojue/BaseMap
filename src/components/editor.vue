<template>
  <div id="editor">
    <editor-comps 
      msg="EditorComps" 
      v-on:selectComp="selectComp"></editor-comps>
    <editor-canvas 
      v-bind:edrawComps="edrawComponents"
      v-bind:currentActiveIndex="eStates.currentActiveIndex"
      v-on:initCompsState="initComponentState" 
      v-on:dragComp="dragCurrentComp"
      v-on:delComp="delCompByIndex"></editor-canvas>
  </div>
</template>

<script>
import EditorComps from './editor-comps'
import EditorCanvas from './editor-canvas';

export default {
  name: 'Editor',
  data(){
     return {
        eStates:{
          currentActiveIndex:-1
        },
        edrawComponents:[],
     }
  },
  components: {
    'editor-comps':EditorComps,
    'editor-canvas':EditorCanvas,
  },
  methods: {
    // 组件选择
    selectComp(data) {
      let {event, comp} = data;
      let item = JSON.parse(JSON.stringify(comp));
      if(!item) return;
      this.initCompState();
      item.isActive = true;
      let {width, height} = item.defStyle;
      let {clientX , clientY} = event;
      let _style = {
          width:width || 100,
          height:height || 100,
          top: clientY ||100,
          left:clientX || 100,
          drag_start_x: 0, //拖拽相对
          drag_start_y :0,
          position:'absolute'
      }
      item.style = _style;
      this.edrawComponents.push(item);
      this.eStates.currentActiveIndex = this.edrawComponents.length -1;
    },

    initComponentState(currnent) {
      this.eStates.currentActiveIndex = currnent;
      this.initCompState();
    },
    // 初始化画布内组件状态
    initCompState() {
      let len = this.edrawComponents.length;
      for(let i=0;i<len;i++) {
        this.edrawComponents[i].isActive = false;
      }
    },

    // 组件拖拽
    dragCurrentComp(event, comp, state, currentIndex, canvesRect) {
      if(state === 'start') {
        this.eStates.currentActiveIndex = currentIndex;
        comp.style.drag_start_x = event.clientX - comp.style.left;
        comp.style.drag_start_y = event.clientY - comp.style.top;
      }else{
        let _left = event.clientX - comp.style.drag_start_x; 
        let _top = event.clientY - comp.style.drag_start_y;
        if(_left <0 || _top < 0) return;
        let left = (_left - canvesRect.x) >= 0 ? _left : canvesRect.x; // 处理left编辑问题
        let top = (_top - canvesRect.y) >= 0 ? _top : canvesRect.y; // 处理top边界问题
        comp.style.left = left;
        comp.style.top = top;
      }
    },

    // 组件删除
    delCompByIndex() {
      if(this.eStates.currentActiveIndex > -1 &&this.edrawComponents.length > 0) {
        this.edrawComponents.splice(this.eStates.currentActiveIndex,1)
        this.eStates.currentActiveIndex = -1;
      }
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
