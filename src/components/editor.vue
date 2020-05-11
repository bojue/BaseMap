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
      v-on:trans="transComp"
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
      v-on:screen="screen"
      v-on:saveDateToStorage="saveDateToStorage"
      v-on:getHistory="getStorageData"
      v-on:changeBgImg="changeBgImg"></editor-settings>
    
    <editor-history
      v-if="activeHistoryBool"
      v-bind:list="historyCurrnetData"
      v-bind:currentIndex="currentHistoryIndex"
      v-on:initState="initHistoryListState"
      v-on:applyHistory="applyHistory"
      v-on:closeHistory="closeHistory"></editor-history>
    <!-- 帮助 -->
    <editor-help/>
  </div>
</template>

<script>
import EditorComps from './editor-comps';
import EditorCanvas from './editor-canvas';
import EditorSettings from './editor-settings';
import EditorHelp from './editor-help';
import EditorHistory from './editor-history';
import _ from 'lodash';  

export default {
  name: 'Editor',
  created:function() {
    this.initStorageData();
    this.initBindingEvent();
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
          window_h:900,
          backgroundUrl:""
        },
        historyCurrnetData:[],
        currentHistoryIndex:-1,
        activeHistoryBool:false
     }
  },
  components: {
    'editor-comps':EditorComps,
    'editor-canvas':EditorCanvas,
    'editor-settings':EditorSettings,
    'editor-help':EditorHelp,
    'editor-history':EditorHistory
  },
  methods: {
    initData() {
      this.activeHistoryBool = false;
    },
    initBindingEvent() {
      document.addEventListener('keydown', this.kaydownFun, false);
      document.addEventListener('mousedown', this.mousedownFun);
      window.addEventListener('beforeunload', this.leaving);
    },
    leaving(event) {
      this.saveDateToStorage();
      console.log(event.returnValue)
      // let message = "内容更改，注意截图缓存"; 
      // event.returnValue = message;
      // return message;
    },
    download:function() {
      //TODO:页面下载
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
      let rect = document.getElementById('canvas').getClientRects()[0];
      let {width, height, borderRadius, rotate, borderWidth, background} = item.defStyle;
      let {clientX , clientY} = event;
      let _style = {
          width:width || 100,
          height:height || 100,
          top: clientY  - rect.top + 60 || 100,
          left:clientX + 213 - rect.left || 100,
          rotate: rotate || 0,
          drag_start_x: 0, //拖拽相对
          drag_start_y :0,
          borderWidth:borderWidth || 0,
          background:background,
          position:'absolute',
          isApplyShadow:'true',
          isFixed:"false",
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
        let _rect = document.getElementById('canvas').getClientRects()[0]
        let _l =_rect.left;
        let _t =_rect.left;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = event.clientX - comp.style.left - _l + canvesRect.x;
          comp.style.drag_start_y = event.clientY - comp.style.top - _t + canvesRect.y;
        }else if(state === 'drag'){
          let _left = event.clientX - comp.style.drag_start_x  - _l + canvesRect.x; 
          let _top = event.clientY - comp.style.drag_start_y - _t + canvesRect.y ;
          if(_left <0 || _top < 0) return;
          comp.style.left = _left;
          comp.style.top = _top ;
        }
        var dragIcon = document.createElement('img');
        dragIcon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        dragIcon.width = 0;
        dragIcon.height = 0;
        dragIcon.opacity = 0;
        event.dataTransfer.setDragImage(dragIcon,0, 0);
      }
    },
    resizeByDragComp(event, comp, state, arrow,currentIndex) {
      if(event && (event.ctrlKey || event.metaKey && this.isMac())  ){
        console.log('多选处理')
      } else {
        this.eStates.copyByKeyBool = false;
        let _l = document.getElementById('canvas').getClientRects()[0].left;
        let _t = document.getElementById('canvas').getClientRects()[0].top;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = arrow === 'r' ? comp.style.left:
                                    arrow === 'l' ?comp.style.left + comp.style.width + _l - 213 :
                                    10;
          comp.style.drag_start_y = arrow === 'b' ? comp.style.top  :
                                    arrow === 't' ?comp.style.top + comp.style.height  :
                                    10;
        }else if(state === 'drag'){
          let _width = 0;
          let _top = 0;
          let _height = 0;
     
          switch(arrow) {
            case 'r':
              _width = event.clientX - comp.style.drag_start_x + 213 - _l ; 
              comp.style.width = _width >= 10 ? _width: 10;
              break;
            case 'l':
              comp.style.left = event.clientX  + 213 - _l; 
              _width = comp.style.drag_start_x - event.clientX;
              comp.style.width = _width >= 10 ? _width: 10;
              break;
            case 't':
              console.log(_t, 60)
              comp.style.top = event.clientY;
              _height = comp.style.drag_start_y - event.clientY 
              comp.style.height = _height >= 10 ? _height : 10;
              break;
            case 'b':
              _top = _t >=0 ? (event.clientY - comp.style.drag_start_y) :event.clientY - comp.style.drag_start_y - _t  + 60;
              console.log("t ==> ",_t, _top, comp.style.drag_start_y)
              comp.style.height = _top >= 10 ? _top: 10;
              break;
            default:
              break
          }
        }
      }
    },
    transComp(event, comp){
        let _x = event.clientX - comp.style.left - comp.style.width / 2;
        let _y = event.clientY - comp.style.top - comp.style.height / 2;
        comp.style.rotate = this.calcAngleDegrees(_x, _y);
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
          event.preventDefault();
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
      if(state === 'bg') {
        this.changeBgImg()
      }
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
        let _right = resObj.style.left + resObj.style.width;
        for(let i=0;i<len;i++) {
          this.eStates.multipleActiveArr[i].style.left = _right - this.eStates.multipleActiveArr[i].style.width;
        }
      }
    },
    isMac:function() {
      return /macintosh|mac os x/i.test(navigator.userAgent)
    },
    calcAngleDegrees(x, y) {
      let val =  Math.atan2(y, x) * 180 / Math.PI;
      return Math.ceil(val);
    },
    screen:function() {
      this.configs.bgAllBool = !this.configs.bgAllBool;
      if(this.configs.bgAllBool) {
        this.configs.window_w = window.screen.width > 1500 ? window.screen.width : 1500;
        this.configs.window_h = window.screen.height > 800 ? window.screen.height : 800;
        this.configs.scale = 1;
      }
    },
    initStorageData(clearBool) {
      if(!clearBool && window.localStorage.getItem('bm_datas')) return;
      let params = {
          save_data_auto:[],
          save_data_custom:[]
      }
      window.localStorage.setItem('bm_datas', JSON.stringify(params))
    },
    saveDateToStorage(data, state) {
      let saveData = data || this.edrawComponents;
      //存储优化，没有内容的页面不需要存储
      if(!saveData || Array.isArray(saveData) && saveData.length === 0) {
        return;
      }
      let obj = {
        data: saveData,
        type: state || 'auto',
        updateTime:new Date()
      };
      if(!window.localStorage.getItem('bm_datas')) {
        this.initStorageData();
      }
      let params = window.localStorage.getItem('bm_datas');
      if(params && typeof params === 'string') {
        params = JSON.parse(params)
      }
      if(state === 'custom') {
        params.save_data_custom.unshift(obj);
        if(params.save_data_custom.length > 50) {
          params.save_data_custom = params.save_data_custom.slice(0, 50);
        }
      } else {
        params.save_data_auto.unshift(obj);
        if(params.save_data_auto.length > 50) {
          params.save_data_auto = params.save_data_auto.slice(0, 50);
        }
      }

      window.localStorage.setItem('bm_datas', JSON.stringify(params));
    },
    getStorageData() {
      this.activeHistoryBool = !this.activeHistoryBool;
      this.currentHistoryIndex = -1;
      let params = window.localStorage.getItem('bm_datas');
      if(params && typeof params === 'string') {
        params = JSON.parse(params)
      }
      let list = [].concat(params.save_data_custom, params.save_data_auto)
      this.historyCurrnetData = _.orderBy(list, 'updateTime', "desc");
    },
    changeBgImg(url) {
      this.configs.backgroundUrl = url;
    },
    clearStorageData() {
      this.initStorageData(true);
    },
    initHistoryListState(index) {
      this.currentHistoryIndex = index > -1 ? index : -1;
      if(Array.isArray(this.historyCurrnetData)) {
        let len = this.historyCurrnetData.length;
        for(let i=0;i<len;i++) {
          this.historyCurrnetData[i].isActive = false;
        }
      }
    },
    applyHistory(list) {
      this.saveDateToStorage()
      this.edrawComponents = list;
      this.initCompState();
      this.closeHistory();
    },
    closeHistory() {
      this.activeHistoryBool = false;
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
