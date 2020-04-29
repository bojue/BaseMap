<template>
  <div id="content">
    <div id="drawingBoard">
        {{edrawComps}}
    </div>

  </div>
</template>

<script>

export default {
  name: 'EditorContent',
  props: {
    edrawComps: Array
  },
  data() {
    return {
      name:"age"
    }
  }
}


</script>

<style scoped>
#content {
    width: 1502px;
    height: 902px;
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
