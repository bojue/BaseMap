<template>
    <div class="comp-element line comp-room"
        v-bind:style="{
        width:item.style.width +'px',
        height:item.style.height +'px',
        }"
        v-bind:class="{
        active:item.isActive, 
        isShadow:item.style.isApplyShadow ==='true',
        multipleActive:item.multipleActiveBool}">
        <span class="comp-room-inset"
        v-bind:style="{
            opacity:item.style.opacity,
            width:item.style.width +'px',
            height:item.style.height +'px',
            background:item.style.bgiBool === 'true' ? 'url('+ item.backgroundImage +')' :null
        }"></span>
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