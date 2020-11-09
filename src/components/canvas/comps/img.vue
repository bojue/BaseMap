<template>
    <img class="comp-element comp-img icon"
        v-bind:src="item.icon" 
        v-bind:style="{
            width:item.style.width +'px',
            height:item.style.height +'px',
            borderRadius:item.style.borderRadius +'%'
        }" 
        v-bind:title="item.name"
        v-bind:alt="item.name" 
        v-bind:class="{
        active:item.isActive, 
        opacity:item.style.opacity,
        isShadow:item.style.isApplyShadow ==='true',
        multipleActive:item.multipleActiveBool}">

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