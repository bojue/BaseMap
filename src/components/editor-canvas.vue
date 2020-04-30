<template>
 <div id="content">
    <div id="canvas" ref='cont'>
      <img class="icon" 
        v-for="(item, index) in edrawComps" :key="index" 
        v-bind:src="item.icon" 
        v-bind:style="{
            width:item.style.width +'px',
            height:item.style.height +'px',
            top:(item.style.top - rect.y) +'px',
            left:(item.style.left - rect.x) +'px',
            position:item.style.position
        }" 
        v-bind:title="item.name"
        v-bind:alt="item.name" 
        v-bind:class="{active:item.isActive}"
        v-bind:draggable="item.active"
        @click="selectItem($event, item, index)"
        @dragstart="dragComp($event, item, 'start', index)"
        @drag="dragComp($event, item, 'drag', index)"
        @dragend="dragComp($event, item,'end', index)">
  </div>
  <div class="control">
      <img class="del"  
        v-bind:class="{
          delDef:currentActiveIndex === -1
        }"
        @click="delComp($event)" src="./../assets/icon/delete.svg" alt="">
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
    selectItem:function(event, comp, index) {
      this.$emit('initCompsState',index);
      comp.isActive = true;
      event.preventDefault()
    },
    delComp:function() {
      this.$emit('delComp', this.currentActiveIndex);
    },

    // 拖拽图片，注释了节流优化
    dragComp:function(event, comp, state, index) {
      if(state === 'start') {
        this.$emit('initCompsState',index);
        this.$emit('dragComp',event, comp, state, index, this.rect)
        comp.isActive = true;
      } else {
        this.$emit('dragComp',event, comp, state, index, this.rect)
        // let _now = new Date().getTime();
        // if(!this.timerState.lastTime || _now - this.timerState.lastTime > this.timerState.waitTime) {
        //   console.log(_now)
        // this.$emit('dragComp',event, comp, state, index, this.rect)
        // this.timerState.lastTime = _now;
        // }
      }
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
  cursor: move;
  border:1px solid transparent;
}
.active {
  border:1px solid rgba(225,00,00,0.8)
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
</style>
