<template>
  <div id="comps">
    <div class="tits">
      <span class="title" v-for="(tit, index) in compTits" :key="index"  @click="selCategory(tit)" v-bind:class="{active: tit['isActive']}">
        {{tit.name}}
      </span>
    </div>
    <div class="comps">
      <span class="item item-comp" draggable="true" v-for="(item, index) in devices" :key="index" @click="selComp(item)">
        <img class="icon" v-bind:src="item.icon"  v-bind:style="item.styleObject" alt="">
        <span class="name"> {{item.name}}</span>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditorComps',
  props: {
    msg: String
  },
  data() {
    return {
      compTits:[{
        id:1,
        name:"组件库",
        type:"tools",
        isActive:true
      }],
      devices: [{
        id:1,
        type:"miehuoqi",
        name:"灭火器",
        icon:require('./../assets/comps/miehuoqi.png'),
        defStyle:{
          width:32,
          height:32
        },
      },{
        id:2,
        type:"bangongzhuo",
        name:"办公桌",
        icon:require('./../assets/comps/bangongzhuo.png'),
        defStyle:{
          width:32,
          height:32
        },
      },{
        id:3,
        type:"lengji",
        name:"冷机",
        icon:require('./../assets/comps/lengji.png'),
        defStyle:{
          width:25,
          height:32
        },
        styleObject:{
          width:'25px'
        }
      },{
        id:4,
        type:"chaifa",
        name:"柴发",
        icon:require('./../assets/comps/chaifa.png'),
        defStyle:{
          width:110,
          height:40
        },
        styleObject:{
          width:'55px',
          height:'20px',
          marginTop:'10px'
        }
      }]
    }
  },
  methods: {
    // 选择组件
    selComp: function(event) {
      this.$emit('selectComp', event);
    },

    // Tab切换，目前只有一个组件库:tools
    selCategory: function(categroy) {
      if(categroy.isActive) return;
      let len = this.compTits.length;
      for(let i=0;i< len;i++) {
        this.compTits[i].isActive = false;
      }
      categroy.isActive = true;
    }
  }
}


</script>

<style scoped>
#comps {
  width: 200px;
  height: 820px;
  background:#eee;
  user-select: none;
  border:1px solid #eeeeee;
}
.tits {
  font-size: 14px;
  border-bottom: 1px dashed #cccccc;
}
.tits .title {
  width: 60px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  margin-bottom: -1px;
}
.tits .title.active {
  color:red;
  background: #fff;
  border-bottom: 1px solid red;
}

.comps {
  margin: 5px 2px;
  display: inline-grid;
  grid-template-columns: 33.3% 33.3% 33.3% ;
}
.item-comp {
  cursor: pointer;
  border:1px solid #f5f5f5;
  margin-left: 1px;
  margin-top: 1px;
  text-align: center;
  background: #fff;
}
.item-comp .icon {
  position: relative;
  /* width: 32px; */
  height: 32px;
  padding: 2px;
}

.item-comp .name {
  display: inline-block;
  width: 100%;
  font-size: 12px;
  color: #666;
}


</style>
