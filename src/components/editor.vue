<template>
  <div id="editor">
    <!-- 组件库 -->
    <editor-comps 
      v-bind:elements="edrawComponents"
      v-on:initCompsState="initComponentState" 
      v-on:selectComp="selectComp"></editor-comps>
    
    <!-- 画布 -->
    <editor-canvas 
      v-bind:configs="configs"
      v-bind:edrawComps="edrawComponents"
      v-bind:currentActiveIndex="eStates.currentActiveIndex"
      v-bind:multipleActiveBool="eStates.multipleActiveBool"
      v-on:initCompsState="initComponentState" 
      v-on:dragComp="dragCurrentComp"
      v-on:resizeByDragComp="resizeByDragComp"
      v-on:screen="screen"></editor-canvas>

    <!-- 组件设置 -->
    <editor-settings
      v-bind:currentActiveIndex="eStates.currentActiveIndex"
      v-bind:currentElement="edrawComponents[eStates.currentActiveIndex]"
      v-bind:multipleActiveArr="eStates.multipleActiveArr"
      v-bind:configs="configs"
      v-on:delComp="delComp"
      v-on:delMultipComp="delMultipComp"
      v-on:setMultipleState="setMultipleState"
      v-on:changeConfig="changeConfig"
      v-on:download="download"
      v-on:screen="screen"></editor-settings>
    
    <!-- 帮助 -->
    <editor-help/>
  </div>
</template>

<script>
import EditorComps from './editor-comps';
import EditorCanvas from './editor-canvas';
import EditorSettings from './editor-settings';
import EditorHelp from './editor-help'
import html2canvas from 'html2canvas';

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
          scale:1,
          Isometric_row:10,
          Isometric_colu:10,
          dowloadImgType:'png',
          bgAllBool:false,
          window_w:1920,
          window_h:900
        }
     }
  },
  components: {
    'editor-comps':EditorComps,
    'editor-canvas':EditorCanvas,
    'editor-settings':EditorSettings,
    'editor-help':EditorHelp
  },
  methods: {
    download:function() {
      html2canvas(document.getElementById('canvas'),{
        letterRendering: true, allowTaint: false, useCORS: true, 
        scale: 1920*2/window.innerWidth, 
        backgroundColor: 'red' 
      }).then(canvas => {
        this.saveAs( canvas.toDataURL('image/png'))
      }).catch((error) => {
        console.log("ERROR SAVING FESTIVAL IMAGE", error)
      });
    },
    saveAs:function(img) {
      let _dom = window.document.createElement('a');
        _dom.href = img
        _dom.dataset.downloadurl = ['image/png', 'IMG_DOWNLOAD_NAME', _dom.href].join(':');
        document.body.appendChild(_dom);
        _dom.click();
        document.body.removeChild(_dom);
    },
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
      if(event && (event.ctrlKey || event.metaKey && this.isMac()) && event.button === 0 ) {
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
      if(event && (event.ctrlKey || event.metaKey && this.isMac())  ){
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
    resizeByDragComp(event, comp, state, arrow,currentIndex) {
      if(event && (event.ctrlKey || event.metaKey && this.isMac())  ){
        console.log('多选处理')
      } else {
        this.eStates.copyByKeyBool = false;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = arrow === 'r' ? comp.style.left :
                                    arrow === 'l' ?comp.style.left + comp.style.width :
                                    10;
          comp.style.drag_start_y = arrow === 'b' ? comp.style.top :
                                    arrow === 't' ?comp.style.top + comp.style.height :
                                    10;
        }else if(state === 'drag'){
          let _width = 0;
          let _top = 0;
          let _height = 0;
          switch(arrow) {
            case 'r':
              _width = event.clientX - comp.style.drag_start_x; 
              comp.style.width = _width >= 10 ? _width: 10;
              break;
            case 'l':
              comp.style.left = event.clientX;
              _width = comp.style.drag_start_x - event.clientX ; 
              comp.style.width = _width >= 10 ? _width: 10;
              break;
            case 't':
              comp.style.top = event.clientY;
              _height = comp.style.drag_start_y - event.clientY;
              comp.style.height = _height >= 10 ? _height : 10;
              break;
            case 'b':
              _top = event.clientY - comp.style.drag_start_y;
              comp.style.height = _top >= 10 ? _top: 10;
              break;
            default:
              break
          }

        }else {
          let _width = 0;
          let _top = 0;
          let _height = 0;
          switch(arrow) {
            case 'r':
              _width = event.clientX - comp.style.drag_start_x; 
              comp.style.width = _width > 10 ? _width: 10;
              break;
            case 'l':
              comp.style.left = event.clientX;
              _width = comp.style.drag_start_x - event.clientX ; 
              comp.style.width = _width >= 10 ? _width: 10;
              break;
            case 't':
              comp.style.top = event.clientY;
              _height = comp.style.drag_start_y - event.clientY;
              comp.style.height = _height >= 10 ? _height : 10;
              break;
            case 'b':
               _top = event.clientY - comp.style.drag_start_y;
              comp.style.height = _top >= 10 ? _top: 10;
              break;
            default:
              break
          }
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
    // 键盘事件
    kaydownFun(event) {
      if(event.key === 'c') {
        this.eStates.copyByKeyBool = true;
      }else if(this.eStates.copyByKeyBool && event.key === 'v') {
        this.copyCurrentComp();
      }else {
        if(['ArrowUp','ArrowDown','ArrowLeft',"ArrowRight"].indexOf(event['code'])> -1) {
          if(this.eStates.currentActiveIndex > -1 && this.eStates.multipleActiveArr.length === 0) {
            this.arrowItem(event['code'], this.edrawComponents[this.eStates.currentActiveIndex])
          }else if(this.eStates.multipleActiveArr.length > 0){
            let len = this.eStates.multipleActiveArr.length;
            for(let i=0;i<len;i++){
               this.arrowItem(event['code'], this.eStates.multipleActiveArr[i])
            }
          }
        }
      }
      if(event.key === 'Delete' || this.isMac() && event.key === 'Backspace')  {
        this.delComp();
      }
    },
    arrowItem(arrow, obj) {
      if(arrow && obj) {
        switch (arrow) {
          case 'ArrowUp' :
            obj.style.top = (obj.style.top - 1) > 0 ? ( obj.style.top - 1) : 0;
            break;
          case 'ArrowDown' :
            obj.style.top = obj.style.top + 1;
            break;
          case 'ArrowLeft' :
            obj.style.left = (obj.style.left -1 )> 0? (obj.style.left -1) : 0;
            break;
          case 'ArrowRight':
            obj.style.left =  obj.style.left +1;
            break;
          default:
            break;
        }
      }
    },
    // 多选事件
    mousedownFun(event) {
      if((!event.ctrlKey || !event.metaKey && this.isMac()) && event.button === 0 
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
      let _h = this.configs.Isometric_colu > 1? this.configs.Isometric_colu : 1;
      _copy.style.top = _style.height + _style.top + _h;
      _copy.isActive = true;
      this.edrawComponents.push(_copy);
      this.eStates.currentActiveIndex = this.edrawComponents.length - 1; //更新激活组件的下标
    },
    // 多选操作:反选/清空多选/属性应用
    setMultipleState:function(state, value) {
      if(state === 'Isometric') {
        for(let i = this.eStates.multipleActiveArr.length-1;i>=0;i--) {
          let obj = this.eStates.multipleActiveArr[i];
          let bool = obj['multipleActiveBool'];
          if(!bool) {
            this.eStates.multipleActiveArr.splice(i,1);
          }
        }
        let len = this.eStates.multipleActiveArr.length;
        let val = 0;
        if(value === 'row') {
          this.eStates.multipleActiveArr =  this.eStates.multipleActiveArr.sort(function(a,b){
            return a.style.left - b.style.left;
          })
          for(let i=0;i< len;i++) {
            let item = this.eStates.multipleActiveArr[i];
            if(i>0) {
              item.style.left = val;
            }
            val = item.style.left + item.style.width + parseInt(this.configs.Isometric_row);
          }
        } else {
          this.eStates.multipleActiveArr =  this.eStates.multipleActiveArr.sort(function(a,b){
            return a.style.top - b.style.top ;
          })
          for(let i=0;i< len;i++) {
            let item = this.eStates.multipleActiveArr[i];
            if(i>0) {
              item.style.top = val;
            }
            val = item.style.height + item.style.top + parseInt(this.configs.Isometric_colu);
            console.log(i,  this.configs.Isometric_colu, val)
          }
        }     
      }else if(state === 'reSel') {
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
      }else if(state === 'align') {
        switch(value) {
          case 't' :
            this.multipArray('top');
            break;
          case 'l' :
            this.multipArray('left');
            break;
          case 'b' :
            this.multipArray('bottom');
            break;
          case 'r' :
            this.multipArray('right');
            break;
          default:
            break;
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
    multipArray(param) {
      let list = JSON.parse(JSON.stringify(this.eStates.multipleActiveArr));
      list.sort(function(a, b) {
        return ['top', 'left'].indexOf(param) > -1 ? a.style[param] - b.style[param]:
          param === 'bottom' ?  b.style.top + b.style.height - (a.style.top + a.style.height) :
          b.style.left + b.style.width - (a.style.left + a.style.width) 
      });
      let len = this.eStates.multipleActiveArr.length;
      let resObj = list[0];
      if(['top', 'left'].indexOf(param) > -1) {
        for(let i=0;i<len;i++) {
          this.eStates.multipleActiveArr[i].style[param] = resObj.style[param];
        }
      }else if(param === 'bottom') {
        let _bottom = resObj.style.top + resObj.style.height;
        for(let i=0;i<len;i++) {
          this.eStates.multipleActiveArr[i].style.top = _bottom - this.eStates.multipleActiveArr[i].style.height;
        }
      }else if(param === 'right') {
        console.log(param, resObj)
        let _right = resObj.style.left + resObj.style.width;
        for(let i=0;i<len;i++) {
          this.eStates.multipleActiveArr[i].style.left = _right - this.eStates.multipleActiveArr[i].style.width;
        }
      }
    },
    isMac:function() {
      return /macintosh|mac os x/i.test(navigator.userAgent)
    },
    screen:function() {
      this.configs.bgAllBool = !this.configs.bgAllBool;
      if(this.configs.bgAllBool) {
        this.configs.window_w = window.screen.width > 1500 ? window.screen.width : 1500;
        this.configs.window_h = window.screen.height > 800 ? window.screen.height : 800;
        this.configs.scale = 1;
      }

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
