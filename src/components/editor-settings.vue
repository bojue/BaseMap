<template>
 <div id="settings">
  <div class="element" v-if="currentElement">
    <div class="item">
      <span class="name">{{currentElement.name}}</span>
    </div>
    <div class="item">
      <label for="" class="title">位置</label>
      <div class="subs grid grid-2">
        <div class="subs-item">
          <label for="" class="lab">上</label>
          <input type="number" class="val"  v-model="currentElement.style.top">
        </div>
         <div class="subs-item">
          <label for="" class="lab">左</label>
          <input type="number" class="val" v-model="currentElement.style.left"> 
        </div>
      </div>
    </div>
    <div class="item">
      <label for="" class="title">大小</label>
      <div class="subs grid grid-2">
        <div class="subs-item">
          <label class="lab" for="">长</label>
          <input class="val" type="number"  v-model="currentElement.style.width">
        </div>
         <div class="subs-item">
          <label class="lab" for="">宽</label>
          <input class="val" type="number"  v-model="currentElement.style.height"> 
        </div>
      </div>
    </div>
    <div class="item">
      <label for="" class="title">阴影</label>
      <div class="subs">
        <div class="subs-item">
          <input class="val-cb"
            type="checkbox"
            v-model="currentElement.style.isApplyShadow"
            true-value=true
            false-value=false
          >
          <span class="val">应用阴影</span>
        </div>
      </div>
    </div>
    <div class="item">
      <label for="" class="title">圆角</label>
      <div class="subs">
        <div class="subs-item">
        <select class="val-s" v-model="currentElement.style.borderRadius">
          <option v-bind:value="0">无</option>
          <option v-bind:value="50">圆角</option>
        </select>
      </div>
    </div>
  </div>
  <div class="item del-item">
    <img class="del"  
      v-bind:class="{
        delDef:currentActiveIndex === -1
      }"
      @click="delComp($event)" src="./../assets/icon/delete.svg" alt="">
  </div>
  </div>
 </div>
</template>
       
<script>

export default {
  props: {
    currentElement:Object,
    currentActiveIndex:Number, // 编辑状态管理
  },
  data() {
    return {
     
    }
  },
  mounted:function() {

  },
  methods: {
    delComp:function() {
      this.$emit('delComp', this.currentActiveIndex);
    },

  }
}


</script>

<style scoped>
#settings {
  position: relative;
  background: #eee;
  min-height: 800px;
  height: 60px;
  padding: 0px;
}
.item {
  margin: 10px;
  margin-bottom: 10px;
  min-height: 40px;
}
.item .name {
  border-left: 5px solid red;
  padding: 10px;
  position: absolute;
  left: 0px;
  top:0px;
  width: 100%;
  border-bottom: 1px dashed #cccccc;
}
.title {
  font-size: 16px;
  color: #777777;
  height: 40px;
  line-height: 40px;
}
.sub {
  margin: 50px;
}
.grid {
  display: grid;
}
.grid-2 {
  grid-template-columns: 50% 50%;
}
.grid-2 .lab {
  text-align: center;
  width: 25px;
  font-size: 14px;
  display: inline-block;
  color:#aaa;
}
.grid-2 .val {
  width: 50px;
  padding: 2px 4px;
}
.val-cb {
  margin: 10px;
}
.val-s {
  width: 170px;
  padding: 5px 10px;
  margin: 5px;
}
.del-item {
  text-align: center;
}
.del {
    position: relative;
    top: 10px;
    width: 25px;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0px 0px 5px rgba(255,0,0,0.3);
}
.del:hover {
  box-shadow: 0px 0px 10px red;
}
</style>
