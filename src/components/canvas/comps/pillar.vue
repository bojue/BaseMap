<template>
    <div class="comp-element line comp-pillar comp-pillar-shadow "
        v-bind:style="{
        height:item.style.height +'px',
        width:item.style.width +'px'
        }"
        v-bind:class="{
        active:item.isActive, 
        height:item.style.height +'px',
        width:item.style.width +'px',
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