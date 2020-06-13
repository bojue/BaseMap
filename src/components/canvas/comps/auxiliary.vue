<template>
   <span class="assist"	>	
        <span class="adR" 	
        v-if="['line_colu'].indexOf(item.type) === -1"	
        draggable="true"	
        v-bind:style="{	
            left:(item.style.width -  configs.dragIconSize + item.style.borderWidth * 2) +'px',	
            top:(item.style.height /2 -  configs.dragIconSize)+'px',	
            width: (configs.dragIconSize * 2)+ 'px',
            height: (configs.dragIconSize * 2) +'px'
        }"	
        @dragstart.stop="resizeByDragComp($event, item, 'start','r', index)"	
        @drag.stop="resizeByDragComp($event, item, 'drag','r', index)"	
        @dragend.stop="resizeByDragComp($event, item,'end', 'r', index)"></span>	

        <span class="adL"	
        v-if="['line_colu'].indexOf(item.type) === -1"	
        draggable="true"	
        v-bind:style="{	
            left:(- configs.dragIconSize) +'px',	
            top:(item.style.height /2 -  configs.dragIconSize)+'px',	
            width: (configs.dragIconSize * 2)+ 'px',
            height: (configs.dragIconSize * 2) +'px'
        }"	
        @dragstart.stop="resizeByDragComp($event, item, 'start','l', index)"	
        @drag.stop="resizeByDragComp($event, item, 'drag','l', index)"	
        @dragend.stop="resizeByDragComp($event, item,'end', 'l', index)"></span>	

        <span class="adT"	
        v-if="['line_row'].indexOf(item.type) === -1"	
        draggable="true"	
        v-bind:style="{	
            left:(item.style.width /2 - configs.dragIconSize) +'px',	
            top:(- configs.dragIconSize)+'px',	
            width: (configs.dragIconSize * 2)+ 'px',
            height: (configs.dragIconSize * 2) +'px'
        }"	
        @dragstart.stop="resizeByDragComp($event, item, 'start','t', index)"	
        @drag.stop="resizeByDragComp($event, item, 'drag','t', index)"	
        @dragend.stop="resizeByDragComp($event, item,'end', 't', index)"></span>	

        <span class="adB"	
        v-if="['line_row'].indexOf(item.type) === -1"	
        draggable="true"	
        v-bind:style="{	
            left:(item.style.width /2 - configs.dragIconSize) +'px',	
            top:(item.style.height -  configs.dragIconSize + item.style.borderWidth * 2) +'px',	
            width: (configs.dragIconSize * 2)+ 'px',
            height: (configs.dragIconSize * 2) +'px'
        }"	
        @dragstart.stop="resizeByDragComp($event, item, 'start','b', index)"	
        @drag.stop="resizeByDragComp($event, item, 'drag','b', index)"	
        @dragend.stop="resizeByDragComp($event, item,'end', 'b', index)"></span>	

        <span class="trans" 	
        draggable="true"	
        v-bind:style="{	
            left:(item.style.width + 25) +'px',	
            top:(item.style.height / 2 - 11)+'px',	
        }"	
        @dragstart.stop="trans($event, item, 'start', index)"	
        @drag.stop="trans($event, item, 'drag', index)"	
        @dragend.stop="trans($event, item,'end', index)">	
        <img src="./../../../assets/icon/translate.svg" alt="">	
        </span>	
    </span>	
</template>
<script>
export default {
  components: {
  },
  props: {
      item:Object,
      configs:Object,
      index:Number
  }, 
  methods: {
    resizeByDragComp:function(event, comp, arrow, state, index) {	
        if(event && !event.clientX && !event.clientY) return;	
        if(state === 'start') {	
            this.$emit('resizeByDragComp',event, comp, arrow, state, index)	
        } else {	
            this.$emit('resizeByDragComp',event, comp, arrow, state, index)	
        }	
    },	
    trans:function(event, comp, state, index) {	
        if(event && !event.clientX && !event.clientY) return;	
        this.$emit('trans',event, comp, state, index)	
    },
  }
}
</script>
<style scoped>
    .assist span {	
        position: absolute;	
        width: 6px;	
        height: 6px;	
        border:1px solid red;	
        display: inline;	
        background: #fff;	
    }	
    .assist .trans {	
        width: 22px;	
        height: 22px;	
        border:none;	
        background: transparent;	
        border-radius: 50%;	
        cursor: pointer;	
    }	
    .assist .trans img {	
        width: 22px;	
        height: 22px;	
    }	
    .adR, .adL {	
        cursor: ew-resize;	
    }	
    .adT, .adB {	
        cursor: ns-resize;	
    }
</style>