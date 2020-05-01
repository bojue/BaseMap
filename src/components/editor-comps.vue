<template>
  <div id="comps">
    <div class="tits">
      <span class="title" 
        v-for="(tit, index) in compTits" :key="index"  
        @click="selCategory(tit)" 
        v-bind:class="{active: tit['isActive']}">
        {{tit.name}}
      </span>
    </div>
    <div class="comps" v-if="currentCategory === 'tools'">
      <span 
        class="item item-comp" 
        draggable="true" 
        v-for="(item, index) in devices" :key="index" 
        @dragstart="dragStart($event, item)"
        @dragend="dragEnd($event, item)">
        <img class="icon" 
          v-bind:src="item.icon"  
          v-bind:style="item.styleObject" alt="">
        <span class="name"> {{item.name}}</span>
      </span>
    </div>
    <div class="elements" v-if="currentCategory === 'elements'">
      <span 
        class="item item-element" 
        v-for="(item, index) in elements" :key="index"
        v-bind:class="{active:item.isActive}"
        @click="selectElement(index)"
        >
        <span class="index">{{index + 1}}</span>
        <img class="icon" 
          v-bind:src="item.icon" 
          alt="">
        <span class="name"> {{item.name}}</span>
        <span v-if="item.isActive" class="activeState"></span>
      </span> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditorComps',
  props: {
    elements:Array
  },
  data() {
    return {
      currentCategory:'tools',
      compTits:[{
        id:1,
        name:"组件库",
        type:"tools",
        isActive:true
      },{
        id:1,
        name:"元素",
        type:"elements",
        isActive:false
      }],
      devices: [{
        id:1,
        type:"room",
        name:"房间",
        icon:require('./../assets/comps/room.png'),
        defStyle:{
          width:120,
          height:120
        },
      },{
        id:1,
        type:"line_row",
        name:"格挡1",
        icon:require('./../assets/comps/line_row.png'),
        defStyle:{
          width:100,
          height:5
        },
      },{
        id:1,
        type:"line_colu",
        name:"格挡2",
        icon:require('./../assets/comps/line_colu.png'),
        defStyle:{
          width:5,
          height:100
        },
      },{
        id:1,
        type:"pillar",
        name:"柱子",
        icon:require('./../assets/comps/room.png'),
        defStyle:{
          width:15,
          height:15
        },
        styleObject:{
          width:'16px',
          height:'16px',
          marginTop:'16px'
        }
      },{
        id:1,
        type:"img",
        name:"灭火器",
        icon:require('./../assets/comps/miehuoqi.png'),
        defStyle:{
          width:64,
          height:64
        },
      },{
        id:2,
        type:"img",
        name:"办公桌",
        icon:require('./../assets/comps/bangongzhuo.png'),
        defStyle:{
          width:64,
          height:64
        },
      },{
        id:3,
        type:"img",
        name:"冷机",
        icon:require('./../assets/comps/lengji.png'),
        defStyle:{
          width:50,
          height:64
        },
        styleObject:{
          width:'25px'
        }
      },{
        id:4,
        type:"img",
        name:"柴发",
        icon:require('./../assets/comps/chaifa.png'),
        defStyle:{
          width:110,
          height:40
        },
        styleObject:{
          width:'55px',
          height:'20px',
          marginTop:'10px'
        }
      }]
    }
  },
  methods: {
    // 组件拖拽完成
    dragEnd: function(event, comp) {
      let data = {
        event:event, 
        comp:comp
      }
      this.$emit('selectComp', data);
    },

    // 开始拖拽组件
    dragStart:function(event, comp) {
      let {clientX, clientY} = event;
      comp.defStyle.startX = clientX;
      comp.defStyle.startY  = clientY;
    },

    // Tab切换，目前只有一个组件库:tools
    selCategory: function(categroy) {
      if(categroy.isActive) return;
      this.currentCategory= categroy.type;
      let len = this.compTits.length;
      for(let i=0;i< len;i++) {
        this.compTits[i].isActive = false;
      }
      categroy.isActive = true;
    },

    // 元素选择
    selectElement:function(index) {
      this.$emit('initCompsState',index);
    },
  }
}


</script>

<style scoped>
#comps {
  width: 200px;
  height: 820px;
  background:#eee;
  user-select: none;
  border:1px solid #eeeeee;
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
  color:red;
  background: #fff;
  border-bottom: 1px solid red;
}

/* 组件库 */
.comps {
  margin: 5px 2px;
  display: inline-grid;
  grid-template-columns: 33.3% 33.3% 33.3% ;
}
.item-comp {
  cursor: pointer;
  border:1px solid #f5f5f5;
  margin-left: 1px;
  margin-top: 1px;
  text-align: center;
  background: #fff;
}
.item-comp:hover {
  background: bisque;
}
.item-comp:hover .name{
  color:red !important;
}
.item-comp .icon {
  position: relative;
  height: 32px;
  padding: 2px;
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
}

.elements .item-element{
  cursor: pointer;
  padding: 3px 10px;
  display: inline-block;
  position: relative;
  width: 90%;
  height: 26px;
  line-height: 26px;
  border-bottom: 1px solid rgba(200,205,208,.3);
}
.item-element.active {
  background: bisque;
}
.item-element .index {
  display: inline-block;
  width: 15px;
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
.item-element:hover .name{
  color:red !important;
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
</style>
