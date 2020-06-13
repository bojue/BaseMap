<template>
    <div class="comp-element line comp-pillar comp-pillar-shadow "
        v-bind:style="{
        height:item.style.height +'px',
        width:item.style.width +'px',
        border:item.style.border,
        opacity:item.style.opacity,
        background:item.style.background,
        isShadow:item.style.isApplyShadow ==='true',
        }"
        v-bind:class="{
        active:item.isActive, 
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