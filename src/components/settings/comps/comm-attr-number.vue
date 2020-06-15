<template>
    <div class="subs-item">
        <label class="lab" for="">{{name}}</label>
        <input 
            v-bind:max="max"
            v-bind:min="min"
            class="val" type="number"  v-model="currentElement.style[attribute]">
    </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    currentElement:Object,
    attribute:String,
    name:String,
    min:Number,
    max:Number
  }, 

  methods: {
  
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>