<template>
  <div id="content" ref='cont'>
    <img class="icon" 
      v-bind:src="item.icon" 
      v-for="(item, index) in edrawComps" :key="index" 
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
      @click="selectItem(item)">
  </div>
</template>
       
<script>

export default {
  name: 'EditorContent',
  props: {
    edrawComps: Array //绘制组件（图片）列表
  },
  data() {
    return {
      name:"age",
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
    selectItem:function(comp) {
      this.$emit('initEdrawComponents',null);
      comp.isActive = true;
    }
  }
}


</script>

<style scoped>
#content {
  position: relative;
  width: 100%;
  height: 822px;
  background: whitesmoke;
  overflow: auto;
}

.active {
  border:1px solid rgba(225,00,00,0.8)
}

#drawingBoard {
    width: 1500px;
    height: 802px;
    background-image: linear-gradient(rgba(200,205,208,.3) 1px,transparent 0),
                      linear-gradient(90deg,rgba(200,205,208,.3),1px,transparent 0),
                      linear-gradient(#c8cdd0 1px,transparent 0),
                      linear-gradient(90deg,#c8cdd0 1px,transparent 0);
    background-size: 20px 20px,20px 20px,100px 100px,100px 100px;
}
</style>
