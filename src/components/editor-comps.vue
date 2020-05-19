<template>
  <div id="comps">
    <div class="flexed">
      <div class="tits">
        <span
          class="title"
          v-for="(tit, index) in compTits"
          :key="index"
          @click="selCategory(tit)"
          v-bind:class="{active: tit['isActive']}"
        >
        {{tit.name}}
        </span>
        <!-- <span class="title setconfig"   
          @click="selCategory('setConfig')"
          v-bind:class="{active: currentCategory === 'setConfig'}" title="全局设置">
          <img src="./../assets/icon/setting.svg" alt="设置">
        </span> -->
    </div>
    <div class="comps" v-if="currentCategory === 'tools'">
      <div class="sub-comps" v-for="(sub, index) in devices" :key="index">
        <p class="title">{{sub.name}}</p>
        <div class="subComp">
          <span
            class="item item-comp"
            draggable="true"
            v-for="(item, index) in sub.list"
            :key="index"
            @dragstart="dragStart($event, item)"
            @dragend="dragEnd($event, item)"
          >
            <img  v-if="!item.bgBool" class="icon" v-bind:src="item.icon" v-bind:style="item.styleObject" alt />
            <span v-if="item.bgBool" class="icon" v-bind:style="{
              background:item.styleObject.background
            }"></span>
            <span class="name">{{item.name}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="elements" v-if="currentCategory === 'elements'">
      <span
        class="item item-element"
        draggable="false"
        v-for="(item, index) in elements"
        :key="index"
        v-bind:class="{active:item.isActive}"
        @click="selectElement(index)"
      >
        <span class="index">{{index + 1}}</span>
        <img class="icon" v-bind:src="item.icon" alt />
        <span class="name">{{item.name}}</span>
        <span v-if="item.isActive" class="activeState"></span>
      </span>
      <span v-if="!elements.length" class="item item-element noElement">当前页面没有元素</span>
    </div>
    <div class="setConfigs" v-if="currentCategory === 'setConfig' && webConfig">
      <div class="set-item">
        <div class="title">
          历史存储
        </div>
        <div class="uls">
          <div class="sub-item">
            <label for="">自动存储个数</label>
            <input type="number" v-model="webConfig.auto">
          </div>
          <div class="sub-item">
            <label for="">手动存储个数</label>
            <input type="number" v-model="webConfig.custom">
          </div>
        </div>
        
      </div>
    </div>
    </div>
  </div>
</template>

<script>
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
          list: [
            {
              id: 1,
              type: "room",
              name: "房间",
              icon: require("./../assets/comps/room.png"),
              backgroundImage:require("./../assets/comps/floor.jpg"),
              bgiBool:false,
              defStyle: {
                width: 120,
                height: 120,
                borderWidth: 4
              }
            },
            {
              id: 1,
              type: "line_row",
              name: "水平墙",
              icon: require("./../assets/comps/line_row.png"),
              defStyle: {
                width: 100,
                height: 5,
                borderWidth: 0
              }
            },
            {
              id: 1,
              type: "line_colu",
              name: "垂直墙",
              icon: require("./../assets/comps/line_colu.png"),
              defStyle: {
                width: 5,
                height: 100
              }
            },
            {
              id: 1,
              type: "pillar",
              name: "柱子",
              icon: require("./../assets/comps/room.png"),
              defStyle: {
                width: 15,
                height: 15
              },
              styleObject: {
                width: "16px",
                height: "16px",
                marginTop: "16px"
              }
            },{
              id: 2,
              type: "text",
              name: "文本",
              value:"",
              icon: require("./../assets/comps/text.png"),
              defStyle: {
                width: 100,
                height: 40,
                color:"#4f4f4f"
              }
            },
          ]
        },
        {
          name: "设备",
          list: [
            {
              id: 1,
              type: "device",
              name: "机柜-橙",
              icon: require("./../assets/comps/device.png"),
              bgBool:true,
              defStyle: {
                width: 25,
                height: 25,
                background:'#ff8c00'
              },
              styleObject: {
                background:'#ff8c00',
                width: "22px",
                height: "22px",
                marginTop: "10px"
              }
            }, {
              id: 1,
              type: "device",
              name: "机柜-蓝",
              icon: require("./../assets/comps/device.png"),
              bgBool:true,
              defStyle: {
                width: 25,
                height: 25,
                background:'#5a8eda'
              },
              styleObject: {
                background:'#5a8eda',
                width: "22px",
                height: "22px",
                marginTop: "10px"
              }
            }, {
              id: 1,
              type: "device",
              name: "机柜-灰白",
              icon: require("./../assets/comps/device.png"),
              bgBool:true,
              defStyle: {
                width: 25,
                height: 25,
                background:'#d1cfd0'
              },
              styleObject: {
                background:'#d1cfd0',
                width: "22px",
                height: "22px",
                marginTop: "10px"
              }
            }, {
              id: 1,
              type: "device",
              name: "机柜-黑",
              icon: require("./../assets/comps/device.png"),
              bgBool:true,
              defStyle: {
                width: 25,
                height: 25,
                background:'#2f3c35'
              },
              styleObject: {
                background:'#2f3c35',
                width: "22px",
                height: "22px",
                marginTop: "10px"
              }
            },
            {
              id: 3,
              type: "img",
              name: "冷机",
              icon: require("./../assets/comps/lengji.png"),
              defStyle: {
                width: 50,
                height: 64
              },
              styleObject: {
                width: "25px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "柴发",
              icon: require("./../assets/comps/chaifa.png"),
              defStyle: {
                width: 100,
                height: 35
              },
              styleObject: {
                width: "55px",
                height: "20px",
                marginTop: "10px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "柴发2",
              icon: require("./../assets/comps/chaifa2.jpg"),
              defStyle: {
                width: 60,
                height: 120
              },
              styleObject: {
                width: "20px",
                height: "35px",
                marginTop: "0px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "水泵",
              icon: require("./../assets/comps/shuibang.png"),
              defStyle: {
                width: 30,
                height: 50
              },
              styleObject: {
                width: "20px",
                height: "35px",
                marginTop: "0px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "二次泵",
              icon: require("./../assets/comps/ercibeng.jpg"),
              defStyle: {
                width: 110,
                height: 40
              },
              styleObject: {
                width: "45px",
                height: "20px",
                marginTop: "10px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "风机",
              icon: require("./../assets/comps/fengji.jpg"),
              defStyle: {
                width: 30,
                height: 50
              },
              styleObject: {
                width: "20px",
                height: "35px",
                marginTop: "0px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "冷机",
              icon: require("./../assets/comps/lengji.jpg"),
              defStyle: {
                width: 30,
                height: 50
              },
              styleObject: {
                width: "20px",
                height: "35px",
                marginTop: "0px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "电池组",
              icon: require("./../assets/comps/dianchizu_duohang.png"),
              defStyle: {
                width: 110,
                height: 40
              },
              styleObject: {
                width: "60px",
                height: "25px",
                marginTop: "5px"
              }
            },
            {
              id: 4,
              type: "img",
              name: "单行电池组",
              icon: require("./../assets/comps/dianchizu.png"),
              defStyle: {
                width: 110,
                height: 40
              },
              styleObject: {
                width: "60px",
                height: "20px",
                marginTop: "10px"
              }
            }
          ]
        },
        {
          name: "其他",
          list: [
            {
              id: 1,
              type: "img",
              name: "灭火器",
              icon: require("./../assets/comps/miehuoqi.png"),
              defStyle: {
                width: 30,
                height: 30,
                borderRadius: "50",
                isApplyShadow:'false'
              }
            },
            {
              id: 2,
              type: "img",
              name: "办公桌1",
              icon: require("./../assets/comps/bangongzhuo.png"),
              defStyle: {
                width: 120,
                height: 70,
                isApplyShadow:'false'
              }
            },
            {
              id: 2,
              type: "img",
              name: "办公桌2",
              icon: require("./../assets/comps/bangongzhuo2.png"),
              defStyle: {
                width: 160,
                height: 240,
                isApplyShadow:'false'
              }
            },
            {
              id: 2,
              type: "img",
              name: "办公桌3",
              icon: require("./../assets/comps/bangongzhuo3.png"),
              defStyle: {
                width: 120,
                height: 120,
                isApplyShadow:'false'
              }
            },
             {
              id: 2,
              type: "img",
              name: "楼梯",
              icon: require("./../assets/comps/luti.png"),
              defStyle: {
                width: 100,
                height: 40
              }
            }, 
          ]
        }
      ]
    };
  },
  methods: {
    // 组件拖拽完成
    dragEnd: function(event, comp) {
      this.$emit("selectComp", event, comp);
    },

    // 开始拖拽组件
    dragStart: function(event, comp) {
      let { clientX, clientY } = event;
      comp.defStyle.startX = clientX;
      comp.defStyle.startY = clientY;
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
    }
  }
};
</script>

<style scoped>
#comps {
  width: 200px;
  background: #ffffff;
  user-select: none;
  border: 1px solid #eeeeee;
}
.flexed {
  position: fixed;
  width: 200px;
}
.tits {
  font-size: 14px;
  border-bottom: 1px dashed #cccccc;
}
.tits .title {
  width: 60px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  margin-bottom: -1px;
}
.tits .title.active {
  color: #ffffff;
  background: #cccccc;
  border-bottom: 1px solid #cccccc;
}
.tits .setconfig {
  position: absolute;
  right: 0px;
  height: 19px;
  text-align: center;
  width: 20px;
}
.setconfig img {
  width: 20px;
  height: 20px;
}

/* 组件库 */
.comps {
  margin: 5px 2px;
}
.subComp {
  display: inline-grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
}
.sub-comps {
  margin-bottom: 15px;
}
.sub-comps .title {
  margin: 1px;
  font-size: 14px;
  font-weight: 600;
  padding: 2px 10px;
  background: #eeeeee;
}
.item-comp {
  cursor: pointer;
  border: 1px solid #cccccc;
  margin-left: 1px;
  margin-top: 1px;
  text-align: center;
  background: #f4f5f5;
}
.item-comp:hover {
  background: antiquewhite;
}
.item-comp:hover .name {
  color: #000 !important;
}
.item-comp .icon {
  position: relative;
  height: 32px;
  width: 32px;
  padding: 2px;
  display: inline-block;
}
.item-comp span.icon {
  background: rgb(209, 207, 208);
  width: 30px;
  height: 30px;
  margin-top: 2px;
}

.item-comp .name {
  display: inline-block;
  width: 100%;
  font-size: 12px;
  color: #666;
}

/* 元素列表 */
.elements {
  position: relative;
  margin: 5px 2px;
  background: #fff;
  font-size: 12px;
  height: 878px;
  overflow-y: auto;
}

.elements .item-element {
  cursor: pointer;
  padding: 3px 10px;
  display: inline-block;
  position: relative;
  width: 90%;
  height: 26px;
  line-height: 26px;
  border-bottom: 1px solid rgba(200, 205, 208, 0.3);
}
.item-element.active {
  background: bisque;
}
.item-element .index {
  display: inline-block;
  width: 20px;
}
.item-element .icon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
}
.item-element .name {
  margin-left: 25px;
}
.item-element:hover {
  background: bisque;
}
.item-element:hover .name {
  color: red !important;
}
.activeState {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 10px;
  right: 10px;
  background: green;
  border-radius: 50%;
}
.noElement {
  text-align: center;
  color: #000;
}

.setConfigs {
  margin: 10px;
}
.set-item .title{
  font-size: 16px;
  color: #777777;
  height: 40px;
  line-height: 40px;
}
.uls .sub-item {
  display: inline-grid;
  grid-template-columns: 110px 70px;
}
.sub-item label {
  text-align: center;
  font-size: 14px;
  display: inline-block;
  color: #aaa;
  text-align: left;
  margin-left: 5px;
}
</style>
