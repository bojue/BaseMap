<template>
 <div id="settings">
  <div class="setting-config config">
    <div class="config-item name">
      <span class="baseMap">BaseMap</span>
    </div>
    <div class="config-item aligins">
        <div class="aligin">
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('Isometric', 'colu')">
            <label for="">垂直间距:</label>
            <input type="number" min="0" max="20" v-model="configs.Isometric_colu">
            <img class="img" src="./../assets/icon/lsometric_colu.svg" alt="垂直等距" title="垂直等距">
          </div>
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('Isometric', 'row')">
            <label for="">水平间距:</label>
            <input type="number" min="0" max="20" v-model="configs.Isometric_row">
            <img class="img" src="./../assets/icon/lsometric_row.svg" alt="水平等距" title="水平等距">
          </div>
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('align', 'l')"><img src="./../assets/icon/align-l.svg" alt="左对齐" title="左对齐"></div>
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('align', 't')"><img src="./../assets/icon/align-t.svg" alt="上对齐" title="上对齐"></div>
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('align', 'b')"><img src="./../assets/icon/align-b.svg" alt="下对齐" title="下对齐"></div>
          <div class="aligin-item" @click="multipleActiveArr.length > 0 && setMultipleState('align', 'r')"><img src="./../assets/icon/align-r.svg" alt="右对齐" title="右对齐"></div>
          <div class="aligin-item screen" @click="screen()"><img src="./../assets/icon/screen_full.svg" alt="右对齐" title="右对齐"></div>
        </div>
    </div>
    <!-- <div class="download">
      <span class="title" @click="download">下载</span>
    </div> -->
    <div class="config-item bg">
      <div class="name">背景</div>
      <div class="bgs">
        <img class="bg-item" src="./../assets/icon/bg-gray.svg"  @click="changeBg('bg', 'gray')" alt="">
        <img class="bg-item" src="./../assets/icon/bg-grid.svg"   @click="changeBg('bg', 'grid')" alt="">
      </div>
    </div>
  </div>
  <div class="setting-element element" v-if="currentElement && multipleActiveArr.length === 0">
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
      @click="delComp()" src="./../assets/icon/delete.svg" alt="">
  </div>
  </div>

   <div class="setting-element element" v-if="currentActiveIndex === -1">
    <div class="item">
      <span class="name">{{'多选操作'}}</span>
    </div>
    <div class="item">
      <label for="" class="title">阴影</label>
      <div class="subs">
        <div class="subs-item">
          <input class="val-cb"
            type="checkbox"
            v-model="multipleApplyShadow"
            true-value=true
            false-value=false
            @change="setMultipleState('isApplyShadow', multipleApplyShadow)"
          >
          <span class="val">应用阴影</span>
        </div>
      </div>
    </div>
    <div class="item">
        <label for="" class="title">圆角</label>
        <div class="subs">
          <div class="subs-item">
          <select class="val-s" 
            v-model="multipleApplyBorderRadius"
             @change="setMultipleState('borderRadius', multipleApplyBorderRadius)">
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
      @click="setMultipleState('reSel')" src="./../assets/icon/reSel.svg" alt="反选" title="反选">
  </div>
  <div class="item del-item">
    <img class="del"  
      v-bind:class="{
        delDef:currentActiveIndex === -1
      }"
      @click="setMultipleState('clear')" src="./../assets/icon/clear.svg" alt="清空多选" title="清空多选">
  </div>
  <div class="item del-item">
    <img class="del"  
      v-bind:class="{
        delDef:currentActiveIndex === -1
      }"
      @click="delComp('multipleDel')" src="./../assets/icon/delete.svg" alt="多选删除" title="多选删除">
  </div>
  <div class="item">
      <div class="muls-list">
        <label for="" class="title">多选列表</label>      
        <span class="nums">选中
          <span class="val">{{multipleActiveArr.length}}</span>个组件
        </span>
      </div>
      <div class="muls">
        <div class="muls-item" v-for="(ele, index) in multipleActiveArr" :key="index">
          <span class="ele-index">{{index+1}}</span>
          <img  class="ele-icon" v-bind:src="ele.icon" alt="">
          <span class="ele-name">{{ele.name}}</span>
          <img class="ele-del" @click="delMultipComp(ele, index)" src="./../assets/icon/del_sub.svg" alt="">
        </div>
      </div>
    </div>
  </div>
 </div>
</template>
       
<script>
export default {
  props: {
    currentElement:Object, //当前组件
    currentActiveIndex:Number, // 编辑状态管理
    configs:Object, //页面对象
    multipleActiveArr:Array
  },
  data() {
    return {
      multipleApplyShadow:'true',
      multipleApplyBorderRadius:'0',
    }
  },
  mounted:function() {

  },
  methods: {
    delMultipComp:function(comp, index) {
      this.$emit('delMultipComp', comp, index);
    },
    delComp:function(state) {
      this.$emit('delComp', this.currentActiveIndex, state);
    },
    setMultipleState:function(state, val) {
      this.$emit('setMultipleState',state, val)
    },
    changeBg:function(state, val) {
      this.$emit('changeConfig', state, val);
    },
    screen:function() {
      this.$emit('screen')
    },
    download:function() {
      this.$emit('download')
    }

  }
}


</script>

<style scoped>
#settings {
  position: relative;
  background: #eee;
  min-height: 820px;
  padding: 0px;
}
.setting-config {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    margin-left: 10px;
    font-size: 16px;
    height: 60px;
    border-left: 10px solid red;
    background: #fff;
    z-index: 1000;
    border-bottom: 1px solid #cccccc;
}
.baseMap {
  margin: 14px;
  position: relative;
  display: block;
  color: #999;
  font-size: 25px;
}
.config-item{
  height: 60px;
  width: 300px;
}
.config-item.bg {
  position: absolute;
  right: -12px;
  top:0px;
  width: 130px;
}
.bg .name {
  position: absolute;
  right: 120px;
  top: 19px;
  color:#ccc;
  width: 50px;
}
.bg .bgs {
  width: 130px;
  display: inline-block;
  height: 60px;
}
.bg .bg-item {
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 13px 5px;
}
.aligins {
  position: absolute;
  right: 610px;
  top:0px;
  cursor: pointer;
}
.aligin {
  width: 610px;
  margin-top: 15px;
  display: grid;
  margin-left: 40px;
  text-align: center;
  grid-template-columns:160px 160px 50px 50px 50px 50px 50px 50px;
}
.aligin-item  {
  position: relative;
}
.aligin-item.screen {
  z-index: 9999;
}
.aligin-item label {
    padding: 2px 4px;
    font-size: 12px;
    position: absolute;
    top: 6px;
    left: 0;
}
.aligin-item  input {
  width: 30px;
  padding: 2px 4px;
  margin: 4px 12px;
}
.aligin-item img {
  width: 30px;
  height: 30px;
}
.aligin-item .img {
  position: absolute;
  right: 10px;
}
.item {
  padding: 10px;
  min-height: 30px;
  line-height: 30px;
  position: relative;
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
.muls-list{
  font-size: 14px;
  padding-left: 10px;
  border-left: 2px solid red;
  border-bottom:1px dashed #cccccc;
}
.item .nums { 
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 14px;
  color:#aaa;
  overflow-y: auto;
  height: 479px;

}
.nums .val {
  color: red;
  padding: 5px;
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
#download {
  position: absolute;
  right: 50px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  top: 15px;
}
.muls-item {
  display: inline-block;
  width: 100%;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.ele-index {
  display: inline-block;
  width: 40px;
  text-align: center;
}
.ele-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 15px;
}
.ele-name {
  width: 100px;
  height: 30px;
  color: #888;
}
.ele-name:hover {
  color: #555;
}
.ele-del {
  opacity: 0.5;
  width: 25px;
  position: absolute;
  right: 10px;
  top: 6px;
}


</style>
