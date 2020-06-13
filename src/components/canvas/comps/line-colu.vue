<template>
    <div class="comp-element line comp-line_colu"
    v-bind:style="{
        height:item.style.height +'px'
    }"
    v-bind:class="{
    active:item.isActive, 
    isShadow:item.style.isApplyShadow ==='true',
    multipleActive:item.multipleActiveBool}">
</div>

</template>
<script>
export default {
  components: {
  },
  props: {
      item:Object,
  }, 
  methods: {
  
  }
}
</script>