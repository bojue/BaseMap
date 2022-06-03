import Vue from 'vue';
import EditorComps from './../../components/comps/editor-comps'
import EditorCanvas from './../../components/canvas/editor-canvas';
import EditorSettings from './../../components/settings/editor-settings';
import EditorHelp from './../../components/help/editor-help';
import EditorHistory from './../../components/history/editor-history';
import * as _ from 'lodash';  
import removeGhosting from 'remove-drag-ghosting';

export default {
  name: 'Editor',
  created:function() {
    this.initStorageData();
    this.initBindingEvent();
    this.initData
  },
  mounted:function() {

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
          bg:"floor",
          pageName:'底图',
          spacing:10,
          scale:1,
          dragIconSize:2,
          Isometric_row:10,
          Isometric_colu:10,
          dowloadImgType:'png',
          bgAllBool:false,
          width: 2945,
          height: 1445,
          maxWidth:3445,
          maxHieght:1505,
          backgroundUrl:"",
        },
        webConfig: {
          custom: 25,
          auto:5,
        },
        historyCurrnetData:[],
        currentHistoryIndex:-1,
        activeHistoryBool:false,
        bd:IDBDatabase ,
        objectStore:IDBObjectStore 
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
      // this.saveDateToStorage();
      // console.log(event.returnValue)
      let message = "内容更改，注意截图缓存"; 
      event.returnValue = message;
      return message;
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
      removeGhosting(event);
      let item = JSON.parse(JSON.stringify(comp));
      if(!item) return;
      this.initCompState();
      item.isActive = true;
      item.multipleActiveBool=false;
      let rect = document.getElementById('canvas').getClientRects()[0];
      let {
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
        opacity } = item.defStyle;
      let {clientX , clientY} = event;
      let _style = {
          width:width || 100,
          height:height || 100,
          top: (clientY  - rect.top + 60 || 100)/ this.configs.scale,
          left:(clientX +213 - rect.left || 100) / this.configs.scale,
          rotate: rotate || 0,
          drag_start_x: 0, //拖拽相对
          drag_start_y :0,
          borderWidth:borderWidth || 0,
          background:background,
          isApplyShadow:isApplyShadow  === undefined || isApplyShadow === null ? 'true' : 'false',
          position:'absolute',
          isFixed:"false",
          bgiBool:bgiBool || false, //材质
          borderRadius:borderRadius || 0,
          border:border ,
          fontSize: 14,
          opacity:opacity || 1,
          color: color
      }
      _style.left =Math.max(0,  Math.min(_style.left, this.configs.maxWidth));
      _style.top =Math.max(0,  Math.min(_style.top, this.configs.maxHieght));
      item.style = _style;
      this.edrawComponents.push(item);
      this.eStates.currentActiveIndex = this.edrawComponents.length -1;
    },
    showSelectCompByDray(event) {
      removeGhosting(event);
      const currItem = this.edrawComponents[this.eStates.currentActiveIndex]
      let rect = document.getElementById('canvas').getClientRects()[0];
      let {clientX , clientY} = event;
      if(clientX && clientY) {
        let _style = {
          top: (clientY  - rect.top + 60 || 100)/ this.configs.scale,
          left:(clientX +213 - rect.left || 100) / this.configs.scale,
        }
        currItem.style.left = _style.left
        currItem.style.top = _style.top
      }
  
    },
    initComponentState(current, event) {
      removeGhosting(event);
      if(current === undefined || current === null || current === -1) return;
      if(event && (event.shiftKey || event.metaKey && this.isMac()) && event.button === 0 ) {
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
    // 组件拖拽：shiftKey === true 处理多选
    dragCurrentComp(event, comp, state, currentIndex) {
      if(event && (event.shiftKey || event.metaKey && this.isMac())  ){
        console.log('多选处理')
      } else {
        this.eStates.copyByKeyBool = false;
        let _rect = document.getElementById('canvas').getClientRects()[0]
        let _l =_rect.left;
        let _t =_rect.left;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = (event.clientX - _l )/this.configs.scale - comp.style.left + 213;
          comp.style.drag_start_y = (event.clientY -_t)/this.configs.scale  - comp.style.top + 60;
        }else if(state === 'drag'){
          let _left = (event.clientX   - _l)/this.configs.scale  - comp.style.drag_start_x + 213; 
          let _top = (event.clientY - _t)/this.configs.scale - comp.style.drag_start_y  + 60;
          if(_left <0 || _top < 0) return;
          _left =Math.max(0,  Math.min(_left, this.configs.maxWidth));
          _top = Math.max(0, Math.min(_top, this.configs.maxHieght));
          comp.style.left = _left;
          comp.style.top = _top ;
        }
        if(['start', 'drag'].indexOf(state) > -1) {
          this.eliminateGhosting(event); // 消除拖拽鬼影
        } 
        
      }
    },
    resizeByDragComp(event, comp, state, arrow,currentIndex) {
      removeGhosting(event)
      if(event && (event.shiftKey || event.metaKey && this.isMac())  ){
        console.log('多选处理')
      } else {
        this.eStates.copyByKeyBool = false;
        let _l = document.getElementById('canvas').getClientRects()[0].left;
        let _t = document.getElementById('canvas').getClientRects()[0].top;
        if(state === 'start') {
          this.eStates.currentActiveIndex = currentIndex;
          comp.style.drag_start_x = arrow === 'r' ? comp.style.left:
                                    arrow === 'l' ? comp.style.left + comp.style.width:
                                    10;
          comp.style.drag_start_y = arrow === 'b' ? comp.style.top  :
                                    arrow === 't' ? comp.style.top + comp.style.height  :
                                    10;
        }else if(state === 'drag'){
          let _width = 0;
          let _top = 0;
          let _height = 0;
     
          switch(arrow) {
            case 'r':
              _width = parseInt((event.clientX- _l) /this.configs.scale) - comp.style.drag_start_x  + 213; 
              comp.style.width = Math.max(Math.min(_width, this.configs.width), 10);
              break;
            case 'b':
              _top = parseInt((event.clientY - _t) / this.configs.scale) - comp.style.drag_start_y + 60;
              comp.style.height = Math.max(Math.min(_top, this.configs.maxWidth), 10);
              break;
            case 'l':
              comp.style.left = parseInt((event.clientX - _l)/this.configs.scale + 213) ; 
              _width = parseInt(comp.style.drag_start_x - comp.style.left ) ;
              _width =Math.max(0,  Math.min(_width, this.configs.maxWidth));
              comp.style.width = Math.max(_width, 10);
              break;
            case 't':
              comp.style.top = (event.clientY -_t )/ this.configs.scale + 60;
              _height = parseInt(comp.style.drag_start_y - comp.style.top)
              _height =Math.max(10,  Math.min(_height, this.configs.maxWidth));
              comp.style.height = Math.max(_height, 10);
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
    changeTextVal(event, item) {
      let val = event.target.innerText;
      if(event && item) {
        item.value = val;
        event.target.innerText = item.value;
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
      if(event.key === 'v' && document.activeElement.nodeName === 'INPUT') {
        return;
      }else if(event.key === 'c' &&  document.activeElement.nodeName === 'INPUT') {
        document.activeElement.blur();
      }
      if(event.target.nodeName === 'INPUT' && this.eStates.copyByKeyBool) {
         this.eStates.copyByKeyBool = false;
      }
      if(event.key === 'c') {
        this.eStates.copyByKeyBool = true;
      }else if(this.eStates.copyByKeyBool && event.key === 'v') {
        this.copyCurrentComp();
      }else if(event.target.nodeName !== 'INPUT'){
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
        if(!(event.target.innerHTML && event.target.contentEditable) || event.target.contentEditable === 'inherit') {
          this.delComp();
        }
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
      this.eliminateGhosting(event); // 消除拖拽鬼影
      if(event && event.shiftKey && this.eStates.currentActiveIndex > -1) {
        this.edrawComponents[this.eStates.currentActiveIndex].isActive = false;
        this.eStates.currentActiveIndex = -1;
      }
      if((!event.shiftKey || !event.metaKey && this.isMac()) && event.button === 0 
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
      let _val = 10;
      let _h = _val;
      _copy.style.top = parseInt(_style.height) + parseInt(_style.top) + parseInt(_h);
      _copy.style.top = Math.max(0, Math.min(_copy.style.top, this.configs.maxHieght));
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
            return parseInt(a.style.left) - parseInt(b.style.left);
          })
          for(let i=0;i< len;i++) {
            let item = this.eStates.multipleActiveArr[i];
            if(i>0) {
              item.style.left = val;
            }
            val = parseInt(item.style.left) + parseInt(item.style.width) + parseInt(this.configs.Isometric_row);
            val = Math.max(0, Math.min(val, this.configs.maxWidth));
          }
        } else {
          this.eStates.multipleActiveArr =  this.eStates.multipleActiveArr.sort(function(a,b){
            return parseInt(a.style.top) - parseInt(b.style.top) ;
          })
          for(let i=0;i< len;i++) {
            let item = this.eStates.multipleActiveArr[i];
            if(i>0) {
              item.style.top = val;
            }
            val = parseInt(item.style.height) + parseInt(item.style.top) + parseInt(this.configs.Isometric_colu);
            val = Math.max(0,  Math.min(val, this.configs.maxHieght));
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
        return ['top', 'left'].indexOf(param) > -1 ? parseInt(a.style[param]) - parseInt(b.style[param]):
          param === 'bottom' ? parseInt(b.style.top) + parseInt(b.style.height) - (parseInt(a.style.top) + parseInt(a.style.height)) :
          parseInt(b.style.left) + parseInt(b.style.width) - (parseInt(a.style.left) + parseInt(a.style.width)) 
      });
      let len = this.eStates.multipleActiveArr.length;
      let resObj = list[0];
      if(['top', 'left'].indexOf(param) > -1) {
        for(let i=0;i<len;i++) {
          this.eStates.multipleActiveArr[i].style[param] = resObj.style[param];
        }
      }else if(param === 'bottom') {
        let _bottom = parseInt( resObj.style.top )+ parseInt(resObj.style.height);
        for(let i=0;i<len;i++) {
          console.log(_bottom, this.eStates.multipleActiveArr[i].style.height, _bottom- this.eStates.multipleActiveArr[i].style.height)
          this.eStates.multipleActiveArr[i].style.top = _bottom - this.eStates.multipleActiveArr[i].style.height;
        }
      }else if(param === 'right') {
        let _right = parseInt(resObj.style.left) + parseInt(resObj.style.width);
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
    selColor(comp, color) {
      if(this.eStates.currentActiveIndex > -1 && this.edrawComponents[this.eStates.currentActiveIndex]) {
        this.edrawComponents[this.eStates.currentActiveIndex].style.color = color;
      }
    },
    selBackground(comp, bgColor) {
      if(this.eStates.currentActiveIndex > -1 && this.edrawComponents[this.eStates.currentActiveIndex]) {
        this.edrawComponents[this.eStates.currentActiveIndex].style.background = bgColor;
      }
    },
    screen:function() {
      this.configs.bgAllBool = !this.configs.bgAllBool;
      if(this.configs.bgAllBool) {
        // this.configs.window_w = window.screen.width > 1500 ? window.screen.width : 1500;
        // this.configs.window_h = window.screen.height > 800 ? window.screen.height : 800;
        this.configs.window_w = 2985;
        this.configs.window_h = 1445
        this.configs.scale = 1;
      }
    },
    async initStorageData(clearBool) {
      this.db = await this.getIndexDB();
    },
    async getIndexDB() {
      return new Promise((resolve, reject)=> {
        if (!window.indexedDB) {
          console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
          return;
        }
        let dbName = 'bm_DBDataBase';
        let request =  window.indexedDB.open(dbName,1);
        request.onerror  = function(error) {
          console.error("数据库 ", dbName, "打开失败:", error);
        }
        request.onsuccess  = function(event) {
          console.info("数据库连接成功！");
          resolve(event.target.result);
        }
        request.onupgradeneeded = function(event) {
          let db = event.target.result;
          console.log(db.objectStoreNames.contains('save_data_custom'))
          if(!db.objectStoreNames.contains('save_data_custom')){
            this.objectStore = db.createObjectStore('save_data_custom',  { keyPath: 'id', autoIncrement: true });
            this.objectStore.createIndex('id', 'id', { unique: false })
          }

        }
      })
    },
    async saveDateToStorage(data, state) {
      let item = data || this.edrawComponents;
      if(!item || Array.isArray(item) && item.length === 0) {
        return;
      }

      console.log('data',item)
      let obj = {
        data: item,
        type: state || 'auto',
        updateTime:new Date()
      };
      await this.addDateToDb(obj);
      let list = await this.getStorageData(true);
      this.historyCurrnetData = _.orderBy(list, 'updateTime', "desc");
      this.currentHistoryIndex = -1;
    },
    addDateToDb(item) {
      return new Promise((resolve, reject) => {
        let store = this.db.transaction(['save_data_custom'], 'readwrite').objectStore('save_data_custom');
        let request = store.add(item);
        request.onerror = error => {
          let errMessage = "保存失败";
          this.saveDataInfo('error',errMessage)
          reject(error);
        }
        request.onsuccess = event => {
          let seccMessage = '保存成功！';
          this.saveDataInfo("success",seccMessage);
          resolve();
        }
      });
    },
    async getHostoryList() {
      let list = await this.getStorageData(true);
      this.historyCurrnetData = _.orderBy(list, 'updateTime', "desc");
      this.activeHistoryBool = true;
    },
    async getStorageData(reloadBool)  {
      return new Promise((resolve, reject) => {
        var objectStore = this.db.transaction('save_data_custom').objectStore('save_data_custom');
        let res = [];
        let request = objectStore.openCursor();
        request.onerror = error => { reject(error)}
        request.onsuccess = function (event) {
          let cursor = event.target.result;
          if (cursor) {
              res.push(cursor.value);
              cursor.continue();
          }else {
              resolve(res);
          }
        }
      });

    },
    async deleteHistoryData(index) {
      let currentData = this.historyCurrnetData[index];
      if(!currentData) return;
      this.currentIndex = -1;
      if(currentData) {
        delete currentData.isActive;
      }
      let key = currentData['id'];
      await this.deleteData(key)
      let list = await this.getStorageData(true);
      this.historyCurrnetData = _.orderBy(list, 'updateTime', "desc");
    },
    async deleteData(key) {
      let api = 'save_data_custom';
      return new Promise((resolve, reject) => {
          let objectStore = this.db.transaction([api], 'readwrite').objectStore(api);
          let request = objectStore.delete(key);
          request.onerror = error => {
              let errMessage = "删除失败";
              this.saveDataInfo('error',errMessage)
              reject(error);
          }
          request.onsuccess = event => {
              let seccMessage =  "删除成功";
              this.saveDataInfo("success",seccMessage);
              resolve();
          }
      })
    },
    changeBgImg(url) {
      this.configs.backgroundUrl = url;
    },
    initHistoryListState(index) {
      this.currentHistoryIndex = index > -1 ? index : -1;
      if(Array.isArray(this.historyCurrnetData)) {
        let len = this.historyCurrnetData.length;
        for(let i=0;i<len;i++) {
            if(this.historyCurrnetData && this.historyCurrnetData[i]) {
             this.historyCurrnetData[i].isActive = false;
           }
        }
      }
    },
    applyHistory(list) {
      this.edrawComponents = list;
      this.initCompState();
      this.closeHistory();
    },
    closeHistory() {
      this.activeHistoryBool = false;
    },
    clerarHistoryData(){
      this.initStorageData(true);
    },
    eliminateGhosting(event) {
      let dragIcon = document.createElement('img');
      dragIcon.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      dragIcon.width = 0;
      dragIcon.height = 0;
      dragIcon.opacity = 0;
      if(event && event.dataTransfer) {
        event.dataTransfer.setDragImage(dragIcon,0, 0);
      }

    },
    saveDataInfo:function(state, msgs) {
      let type = state || 'success';
      let msg = msgs || '数据保存成功！';
      Vue.$toast.open({
        type:type,
        message:msg,
        position:'top-right'
      });
    },
    zoom:function(state) {
      if(state === 'zoomout') {
        this.configs.scale = Math.max(this.configs.scale - 0.1, 0.7);
      }else {
        this.configs.scale = Math.min(this.configs.scale + 0.1, 1.5);
      }
    }
  }
}