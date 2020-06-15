<template>
    <div class="item del-item">
      <img class="del"  
        v-bind:class="{
          delDef:currentActiveIndex === -1
        }"
        @click="delComp('multipleDel')" src="./../../../assets/icon/delete.svg" alt="多选删除" title="多选删除">
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
    multipleActiveArr:Array,
    currentActiveIndex:Number
  }, 
  methods: {
    delComp:function(state) {
        this.$emit('delComp', state);
    },
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>