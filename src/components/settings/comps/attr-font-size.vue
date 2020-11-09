<template>
    <div class="subs-item">
        <label class="lab" for="">大小</label>
        <input 
            max="50"
            min="12"
            class="val" type="number"  v-model="currentElement.style.fontSize">
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