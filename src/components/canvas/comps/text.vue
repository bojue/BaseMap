<template>
    <div class="comp-element device comp-text"
          v-bind:style="{
            width:item.style.width +'px',
            height:item.style.height +'px',
            background:item.style.background
          }"
          v-bind:class="{
            active:item.isActive, 
            isShadow:item.style.isApplyShadow ==='true',
            multipleActive:item.multipleActiveBool}">
            <div      
              v-bind:style="{
              width:item.style.width +'px',
              height:item.style.height +'px',
              fontSize:item.style.fontSize+'px',
              background:item.style.background,
              color:item.style.color
            }"
            v-on:blur="changeTextVal($event,item)"
            v-bind:contenteditable='item.style.isApplyShadow'>
              {{item.value}}
            </div>
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
    changeTextVal:function(event,item) {
        this.$emit('changeTextVal',event, item)	
    }
  }
}
</script>