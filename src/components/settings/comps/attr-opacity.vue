<template>
    <div>
        <label for="" class="title">透明度</label>
        <div class="subs grid grid-1 grid-1-1">
            <div class="subs-item">
            <label class="lab" for="">{{currentElement.style.opacity}}</label>
            <input type="range" min="0.2" max="1.0" step="0.1" v-model="currentElement.style.opacity">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    currentElement:Object,
  }, 

  methods: {
  
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>