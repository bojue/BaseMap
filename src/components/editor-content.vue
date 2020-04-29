<template>
  <div id="content">
    <img class="icon" 
      v-bind:src="item.icon" 
      v-for="(item, index) in edrawComps" :key="index" 
      v-bind:style="{
          width:item.style.width +'px',
          height:item.style.height +'px',
          top:item.style.top +'px',
          left:item.style.left +'px',
          position:item.style.position
      }" 
      v-bind:alt="item.name" >
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
      name:"age"
    }
  },
  methods: {

  }
}


</script>

<style scoped>
#content {
    width: 100%;
    height: 822px;
    background: whitesmoke;
    overflow: auto;
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
