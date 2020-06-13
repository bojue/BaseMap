<template>
    <div class="comp-element device comp-device"
        v-bind:style="{
        width:item.style.width +'px',
        height:item.style.height +'px',
        background:item.style.background
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