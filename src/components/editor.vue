<template>
  <div id="editor">
    <editor-comps 
      v-bind:elements="edrawComponents"
      v-on:initCompsState="initComponentState" 
      v-on:selectComp="selectComp"></editor-comps>
    <editor-canvas 
      v-bind:configs="configs"
      v-bind:edrawComps="edrawComponents"
      v-bind:currentActiveIndex="eStates.currentActiveIndex"
      v-bind:multipleActiveBool="eStates.multipleActiveBool"
      v-on:initCompsState="initComponentState" 
      v-on:dragComp="dragCurrentComp"></editor-canvas>
    <editor-settings
      v-bind:currentActiveIndex="eStates.currentActiveIndex"
      v-bind:currentElement="edrawComponents[eStates.currentActiveIndex]"
      v-bind:multipleActiveArr="eStates.multipleActiveArr"
      v-bind:configs="configs"
      v-on:delComp="delComp"
      v-on:delMultipComp="delMultipComp"
      v-on:setMultipleState="setMultipleState"
      v-on:changeConfig="changeConfig"></editor-settings>
  </div>
</template>

<script>
import EditorComps from './editor-comps';
import EditorCanvas from './editor-canvas';
import EditorSettings from './editor-settings';

export default {
  name: 'Editor',
  created:function() {
    document.addEventListener('keydown', this.kaydownFun);
    document.addEventListener('mousedown', this.mousedownFun)
  },
  data(){
     return {
        eStates:{
          currentActiveIndex:-1,
          copyByKeyBool:false,
          multipleActiveArr:[],
        },
        edrawComponents:[],
        configs:{
          bg:"grid",
          pageName:'底图',
          spacing:10,
          dowloadImgType:'png'
        }
     }
  },
  components: {
    'editor-comps':EditorComps,
    'editor-canvas':EditorCanvas,
    'editor-settings':EditorSettings
  },
  methods: {
    
    // 组件选择
    selectComp(event, comp) {
      let item = JSON.parse(JSON.stringify(comp));
      if(!item) return;
      this.initCompState();
      item.isActive = true;
      item.multipleActiveBool=false;
      let {width, height, borderRadius} = item.defStyle;
      let {clientX , clientY} = event;
      let _style = {
          width:width || 100,
          height:height || 100,
          top: clientY ||100,
          left:clientX || 100,
          drag_start_x: 0, //拖拽相对
          drag_start_y :0,
          position:'absolute',
          isApplyShadow:'true',
          borderRadius:borderRadius || 0
      }
      item.style = _style;
      this.edrawComponents.push(item);
      this.eStates.currentActiveIndex = this.edrawComponents.length -1;
    },
    initComponentState(current, event) {
      if(current === undefined || current === null || current === -1) return;
      if(event && event.ctrlKey && event.button === 0 ) {
        this.edrawComponents[current].isActive = false;
        if(this.eStates.currentActiveIndex > -1) {
          this.eStates.currentActiveIndex = -1;
        }

        // 多选操作缓存数组
        const _multipActiveIndex = this.eStates.multipleActiveArr.indexOf(this.edrawComponents[current]);
        if( _multipActiveIndex === -1) {
          this.eStates.multipleActiveArr.push(this.edrawComponents[current])
        }

        if(this.edrawComponents[current].multipleActiveBool) {
          this.edrawComponents[current].multipleActiveBool = false;
          this.eStates.multipleActiveArr.splice(_multipActiveIndex, 1);
        } else {
          this.edrawComponents[current].multipleActiveBool = true;
        }
      }else {
        this.initCompState();     
        this.eStates.currentActiveIndex = current;
        this.edrawComponents[current].isActive = true;
      }

    },
    // 初始化画布内组件状态
    initCompState() {
      let len = this.edrawComponents.length;
      this.eStates.multipleActiveArr = [];
      for(let i=0;i<len;i++) {
        this.edrawComponents[i].isActive = false;
        this.edrawComponents[i].multipleActiveBool = false;
      }
      this.eStates.copyByKeyBool = false;
    },
    // 组件拖拽：ctrlkey === true 处理多选
    dragCurrentComp(event, comp, state, currentIndex, canvesRect) {
      if(event && event.ctrlKey) {
        console.log('多选处理')
      } else {
        this.eStates.copyByKeyBool = false;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = event.clientX - comp.style.left;
          comp.style.drag_start_y = event.clientY - comp.style.top;
        }else if(state === 'drag'){
          let _left = event.clientX - comp.style.drag_start_x; 
          let _top = event.clientY - comp.style.drag_start_y;
          if(_left <0 || _top < 0) return;
          let left = (_left - canvesRect.x) >= 0 ? _left : canvesRect.x; // 处理left编辑问题
          let top = (_top - canvesRect.y) >= 0 ? _top : canvesRect.y; // 处理top边界问题
          comp.style.left = left;
          comp.style.top = top;
        }
      }
    },
    // 组件删除
    delComp(index, state) {
      if(state === 'multipleDel') {
        let len = this.edrawComponents.length;
        this.eStates.multipleActiveArr = [];
        for(let i=len;i--;i >0) {
          let multipBool = this.edrawComponents[i].multipleActiveBool;
          if(multipBool) {
            this.edrawComponents.splice(i,1)
          }
        }
      } else {
        if(this.eStates.currentActiveIndex > -1 &&this.edrawComponents.length > 0) {
          this.edrawComponents.splice(this.eStates.currentActiveIndex,1)
          this.eStates.currentActiveIndex = -1;
        }
      }
    },
    // 键盘拷贝事件
    kaydownFun(event) {
      if(this.eStates.currentActiveIndex === -1) return; 
      if(event.key === 'c') {
        this.eStates.copyByKeyBool = true;
      }else if(this.eStates.copyByKeyBool && event.key === 'v') {
        this.copyCurrentComp();
      }
      if(event.key === 'Delete' || this.isMac() && event.key === 'Backspace')  {
        this.delComp();
      }
    },
    // 多选事件
    mousedownFun(event) {
      if(!event.ctrlKey && event.button === 0 
        && event.target.id==='canvas' 
        && !event.target.classList.contains('comp-element')) {
        this.eStates.copyByKeyBool = false;
        this.initCompState();
      } 
    },
    // 创建当前组件
    copyCurrentComp:function() {
      let _currComp = this.edrawComponents[this.eStates.currentActiveIndex];
      if(!_currComp) return;
      _currComp.isActive = false;
      let _copy = JSON.parse(JSON.stringify(_currComp));
      let _style = _currComp.style;
      _copy.style.top = _style.height + _style.top + 1;
      _copy.isActive = true;
      this.edrawComponents.push(_copy);
      this.eStates.currentActiveIndex = this.edrawComponents.length - 1; //更新激活组件的下标
    },
    // 多选操作:反选/清空多选/属性应用
    setMultipleState:function(state, value) {
      if(state === 'reSel') {
        let len = this.edrawComponents.length;
        this.eStates.multipleActiveArr = [];
        for(let i=len;i--;i >0) {
          let item = this.edrawComponents[i];
          if(!item.multipleActiveBool) {  
            this.eStates.multipleActiveArr.push(item);
          }
          item.multipleActiveBool = !item.multipleActiveBool;
        }
      } else if(state === 'clear'){
        let len = this.edrawComponents.length;
        this.eStates.multipleActiveArr = [];
        for(let i=len;i--;i >0) {
          this.edrawComponents[i].multipleActiveBool = false;
        }
      }else if(['isApplyShadow', 'borderRadius'].indexOf(state) > -1) {
        let len = this.eStates.multipleActiveArr.length;
        for(let i=len;i--;i >0) {
          this.eStates.multipleActiveArr[i].style[state] = value;
        }
      }
    },
    // 删除多选元素
    delMultipComp(comp, index) {
      this.eStates.multipleActiveArr.splice(index, 1);
      let _index = this.edrawComponents.indexOf(comp);
      if(_index > -1) {
        this.edrawComponents[_index].multipleActiveBool = false;
      }
    },
    changeConfig(state, value){
      if(!this.configs[state]) return;
      this.configs[state] = value;
    },
    isMac:function() {
      return /macintosh|mac os x/i.test(navigator.userAgent)
    }
  }
}
</script>

<style>

#editor {
  margin-top: 60px;
  padding: 0;
  position: relative;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 205px auto 205px;
}
</style>
