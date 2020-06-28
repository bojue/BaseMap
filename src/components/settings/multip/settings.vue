<template>
  <div>
    <div class="item">
      <span class="name">{{'多选操作'}}</span>
    </div>
    <div class="item">
      <label for="" class="title">阴影</label>
      <div class="subs">
        <div class="subs-item">
          <input class="val-cb"
            type="checkbox"
            v-model="multipleApplyShadow"
            true-value=true
            false-value=false
            @change="setMultipleState('isApplyShadow', multipleApplyShadow)"
          >
          <span class="val">应用阴影</span>
        </div>
      </div>
    </div>
    <div class="item">
        <label for="" class="title">圆角</label>
        <div class="subs">
          <div class="subs-item">
            <select class="val-s" 
              v-model="multipleApplyBorderRadius"
              @change="setMultipleState('borderRadius', multipleApplyBorderRadius)">
              <option v-bind:value="0">无</option>
              <option v-bind:value="50">圆角</option>
            </select>
        </div>
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
    multipleApplyBorderRadius:String,
    multipleApplyShadow:String
  }, 
  methods: {
    setMultipleState:function(state, value) {
      this.$emit('setMultipleState', state, value);
    },
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>