<template>
  <div id="comps">
    <p>vue</p>
    {{msg}}
  {{name}}

  </div>
</template>

<script>

export default {
  name: 'EditorComps',
  props: {
    msg: String
  },
  data() {
    return {
      name:"age"
    }
  }
}


</script>

<style scoped>
#comps {
  width: 200px;
  height: 800px;
  background: red;
}
</style>
