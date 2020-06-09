<template>
    <div class="comp-element line comp-line_row"
        v-bind:style="{
            with:item.style.width +'px'
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