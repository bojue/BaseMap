import AuxiliaryComponent from './comps/auxiliary';
import ImgComponent from './comps/img';
import TextComponent from './comps/text';
import PillarComponent from './comps/pillar';
import RoomComponent from './comps/room';
import DeivceComponent from './comps/device';
import AisleComponent from './comps/aisle';
import LineRowComponent from './comps/line-row';
import LineColuComponent from './comps/line-colu';

export default {
    name: 'EditorCanvas',
    components: {
      'comp-auxiliary':AuxiliaryComponent,
      'comp-img': ImgComponent,
      'comp-text': TextComponent,
      'comp-pillar': PillarComponent,
      'comp-room': RoomComponent,
      'comp-device': DeivceComponent,
      'comp-aisle': AisleComponent,
      'comp-line-row': LineRowComponent,
      'comp-line-colu': LineColuComponent
    },
    props: {
      currentActiveIndex:Number, // 编辑状态管理
      edrawComps: Array, //绘制组件（图片）列表
      configs:Object
    },
    data() {
      return {
        name:"age",
        timerState:{
          lastTime:0,
          waitTime:10
        },
        rect:{
          x:0,
          y:0
        }
      }
    },
    mounted:function() {
      let dom = document.querySelector('#content');
      this.rect = dom && dom.getBoundingClientRect();
    },
    methods: {
      selectItem:function(event, index) {
        this.$emit('initCompsState',index, event);
      },
      // 拖拽图片，注释了节流优化
      dragComp:function(event, comp, state, index) {
        if(event && !event.clientX && !event.clientY) return;	
        if(state === 'start') {
          this.$emit('initCompsState',index);
          this.$emit('dragComp',event, comp, state, index, this.rect)
          comp.isActive = true;
        } else {
          this.$emit('dragComp',event, comp, state, index, this.rect)
        }
      },
      resizeByDragComp:function(event, comp, arrow, state, index) {	
        if(event && !event.clientX && !event.clientY) return;	
        if(state === 'start') {	
          this.$emit('resizeByDragComp',event, comp, arrow, state, index)	
        } else {	
          this.$emit('resizeByDragComp',event, comp, arrow, state, index)	
        }	
      },	
      trans:function(event, comp, state, index) {	
        if(event && !event.clientX && !event.clientY) return;	
        this.$emit('trans',event, comp, state, index)	
      },
      screen:function() {
        this.$emit('screen')
      },
      changeTextVal:function(event,item) {
        this.$emit('changeTextVal',event, item)	
      },
      zoom:function(state) {
        this.$emit('zoom',state)	
      }
    }
  }
  
  