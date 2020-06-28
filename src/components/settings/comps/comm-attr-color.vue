<template>
    <div class="subs-item full">
    <label class="lab" for="">{{name}}</label>
    <div class="cols">
        <span class="col-item" 
            v-bind:class="{active: currentElement.style && currentElement.style.color === color}" 
            v-for="(color, index) in 
                (colors || (attribute === 'background' ? color:background))" :key="index" 
            v-bind:style="{
                background:color
            }"
        v-bind:title="color"
        @click="selColor(color, attribute)"></span>
    </div>
    </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
        color:[
            '#d81e06', 
            '#ff7f00',
            '#ffff00',
            '#00ca98', 
            '#0007ff',
            '#13227a',
            '#ffffff',
            '#dbdbdb',
            '#bfbfbf',
            '#4f4f4f',
            '#2c2c2c',
            '#000000'],
        background:[
          '#FF8c00', 
          '#2f3035',
          '#5e8ad1',
          '#d1cfd0', 
          '#ffffff',
          '#d81e06',
          '#ffff00',
          '#7fff00',
          '#00ca98',
          '#26c9ff',
          '#13227A',
          "#000"],
    }
  },
  props: {
    currentElement:Object,
    attribute:String,
    colors:Array,
    name:String
  }, 
  methods: {
    selColor:function(color, attr) {
        this.$emit('selColor', color, attr);    
    }
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>