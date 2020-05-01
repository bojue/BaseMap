<template>
 <div id="content" @click="clickContent">
    <div id="canvas">
      <!--遍历组件数组:图片-img,横线-lien_row,竖线-line_colu,柱子-pillar -->
      <div class="comp-item"
        v-for="(item, index) in edrawComps" :key="index"
        @click="selectItem(index)"
        @dragstart="dragComp($event, item, 'start', index)"
        @drag="dragComp($event, item, 'drag', index)"
        @dragend="dragComp($event, item,'end', index)"
        v-bind:style="{
            width:item.style.width +'px',
            height:item.style.height +'px',
            top:(item.style.top - rect.y) +'px',
            left:(item.style.left - rect.x) +'px',
            position:item.style.position,
        }"
        v-bind:draggable="item.isActive">
        <!-- 1.img -->
        <img class="comp-img icon"
          v-if="item.type === 'img'" 
          v-bind:src="item.icon" 
          v-bind:style="{
              height:item.style.height +'px',
              borderRadius:item.style.borderRadius +'%'
          }" 
          v-bind:title="item.name"
          v-bind:alt="item.name" 
          v-bind:class="{active:item.isActive, isShadow:item.style.isApplyShadow ==='true'}">

        <!-- 2.line_colu  -->
        <div class="line comp-line_colu"
          v-if="item.type === 'line_colu'"
          v-bind:style="{
            height:item.style.height +'px'
          }"
          v-bind:class="{active:item.isActive,isShadow:item.style.isApplyShadow ==='true'}">
        </div>

        <!-- 3.line_row  -->
        <div class="line comp-line_row"
          v-if="item.type === 'line_row'"
          v-bind:style="{
            with:item.style.width +'px'
          }"
          v-bind:class="{active:item.isActive,isShadow:item.style.isApplyShadow ==='true'}">
        </div>

        <!-- 4.柱子 -->
        <div class="line comp-pillar comp-pillar-shadow "
          v-if="item.type === 'pillar'"
          v-bind:style="{
            height:item.style.height +'px',
            with:item.style.width +'px'
          }"
          v-bind:class="{active:item.isActive,isShadow:item.style.isApplyShadow ==='true'}">

        </div>

        <!-- 5.盒子 -->
        <div class="line comp-room"
          v-if="item.type === 'room'"
          v-bind:style="{
            width:item.style.width +'px',
            height:item.style.height +'px',
          }"
          v-bind:class="{active:item.isActive, isShadow:item.style.isApplyShadow ==='true'}">
          <span class="comp-room-inset"
            v-bind:style="{
              width:item.style.width +'px',
              height:item.style.height +'px',
            }"></span>
        </div>
      </div>

  </div>
 </div>
</template>
       
<script>

export default {
  name: 'EditorCanvas',
  props: {
    currentActiveIndex:Number, // 编辑状态管理
    edrawComps: Array //绘制组件（图片）列表
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
    selectItem:function(index) {
      this.$emit('initCompsState',index);
    },
    // 拖拽图片，注释了节流优化
    dragComp:function(event, comp, state, index) {
      if(state === 'start') {
        this.$emit('initCompsState',index);
        this.$emit('dragComp',event, comp, state, index, this.rect)
        comp.isActive = true;
      } else {
        this.$emit('dragComp',event, comp, state, index, this.rect)
      }
    },
    clickContent:function(event) {
       console.log(event)
    }
  }
}


</script>

<style scoped>
#content, #canvas {
  position: relative;
  width: 100%;
  height: 822px;
  background: whitesmoke;
  overflow: auto;
}

img {
  border:1px solid transparent;
}
.comp-item {
  user-select: none;
  cursor: move;
  z-index: 1000;
}
.comp-item .active {
  border:1px solid rgba(225,0,00,0.8)
}
.comp-item .comp-room.active {
  border:4px solid white;
  box-shadow: 1px 0px 8px 0px rgba(255,0,0,0.6);
}

#canvas {
    width: 1500px;
    height: 802px;
    background-image: linear-gradient(rgba(200,205,208,.3) 1px,transparent 0),
                      linear-gradient(90deg,rgba(200,205,208,.3),1px,transparent 0),
                      linear-gradient(#c8cdd0 1px,transparent 0),
                      linear-gradient(90deg,#c8cdd0 1px,transparent 0);
    background-size: 20px 20px,20px 20px,100px 100px,100px 100px;
}
.control {
  position: fixed;
  bottom: 100px;
  right: 30px;
}
.control .del {
  cursor: pointer;
  width: 30px;
  height: 30px;
  opacity: 0.7;
  padding: 5px;
  border-radius: 50%;
  background: #dddddd;
}
.control .del:hover {
  opacity: 1;
  box-shadow: 0px 0px 10px red;
}
.delDef {
  opacity: 0.3;
}
.comp-img.isShadow {
  box-shadow: -1px 1px 10px 5px rgba(0,0,0,0.3);
}
.comp-line_colu {
  width: 5px;
  background: #ffffff;

}
.comp-line_colu.isShadow {
  box-shadow: 0px 0px 14px -1px rgba(0,0,0,1);
}
.comp-line_row {
  height: 5px;
  background: #ffffff;
}
.comp-line_row.isShadow {
  box-shadow: 0px 0px 14px -1px rgba(0,0,0,1);
}
.comp-pillar {
  width: 15px;
  height: 15px;
  background: #fff;
}
.comp-pillar-shadow.isShadow {
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.4);
}
.comp-room {
  border: 4px solid #ffffff;
}
.comp-room.isShadow {
  box-shadow: 1px 0px 8px 0px rgba(0,0,0,0.6);
}
.comp-room-inset {
  display: inline-block;
}
.comp-room-inset.isShadow {
  box-shadow: inset 0px 0px 26px -11px rgba(13,13,13,0.8);
}
</style>
