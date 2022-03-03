<template>
    <div class="item">
        <div class="muls-list">
          <label for="" class="title">多选列表</label>      
          <span class="nums">选中
            <span class="val">{{multipleActiveArr.length}}</span>个组件
          </span>
        </div>
        <div class="muls">
          <div class="muls-item" v-for="(ele, index) in multipleActiveArr" :key="index">
            <span class="ele-index">{{index+1}}</span>
            <img  class="ele-icon" v-bind:src="ele.icon" alt="">
            <span class="ele-name">{{ele.name}}</span>
            <img class="ele-del" @click="delMultipComp(ele, index)" src="@/assets/icon/del_sub.svg" alt="">
          </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  props: {
    multipleActiveArr:Array
  }, 
  methods: {
    delMultipComp:function(comp, index) {
        this.$emit('delMultipComp', comp, index);
    },
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>