<template>
  <div id="comps">
    <p class="title">组件库</p>
    <div class="comps">
      <span class="item item-comp"  v-for="item in comps" :key="item.name" @click="selComp(item)">
        <img class="icon" v-bind:src="item.icon" alt="">
       <span> {{item.name}}</span>
      </span>
    </div>
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
      comps: [{
        id:1,
        type:"miehuoqi",
        name:"灭火器",
        icon:require('./../assets/comps/miehuoqi.png')
      }]
    }
  },
  methods: {
    selComp: function(event) {
      this.$emit('selectComp', event);
    }
  }
}


</script>

<style scoped>
#comps {
  width: 200px;
  height: 820px;
  background:thistle;
}
#comps>.title {
  margin: 10px;
  border:1px solid red;
  padding: 2px 5px;
  width: 80px;
}
.comps {
  margin: 10px;
}
.item-comp {
  cursor: pointer;
}

.item-comp .icon {
  width: 50px;
  height: 50px;
}
</style>
