
import Devices_idc from './data/device_data_idc'
import Devices_other from './data/device_data_other'
import Devices_base from './data/device_data_base'

export default {
    name: "EditorComps",
    props: {
      elements: Array,
      webConfig:Object
    },
    data() {
      return {
        currentCategory: "tools",
        compTits: [
          {
            id: 1,
            name: "组件库",
            type: "tools",
            isActive: true
          },
          {
            id: 2,
            name: "元素",
            type: "elements",
            isActive: false
          }
        ],
        
        devices: [
          {
            name: "基础",
            isShow: true,
            list: Devices_base
          },
          {
            name: "设备",
            isShow: true,
            list: Devices_idc
          },
          {
            name: "其他",
            isShow: true,
            list: Devices_other
          }
        ]
      };
    },
    methods: {
      // 开始拖拽组件
      dragStart: function(event, comp) {
        let { clientX, clientY } = event;
        comp.defStyle.startX = clientX;
        comp.defStyle.startY = clientY;
        this.$emit("selectComp", event, comp);
      },
      drag:function(event) {
        this.$emit("showSelectCompByDray", event);
      },
      // Tab切换，目前只有一个组件库:tools
      selCategory: function(categroy) {
        if(categroy === 'setConfig') {
          this.currentCategory = categroy;
        }else {
          this.currentCategory = categroy.type;
        }
        if (categroy.isActive) return;
        let len = this.compTits.length;
        for (let i = 0; i < len; i++) {
          this.compTits[i].isActive = false;
        }
        if(Object.prototype.hasOwnProperty.call(categroy,'isActive')) {
          categroy.isActive = true;
        }
  
      },
  
      // 元素选择
      selectElement: function(index) {
        this.$emit("initCompsState", index);
      },

      // 展示隐藏按钮
      changeShowStatus: function(index) {
        this.devices[index].isShow = !this.devices[index].isShow
      },
    }
  };