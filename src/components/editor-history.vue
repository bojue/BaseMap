<template>
 <div id="history"> 
    <div class="list">
        <div class="title">历史列表 <span class="nums">{{list.length}}条</span></div>
        <div class="uls" v-if="list">
            <div class="item" 
                v-for="(item, index) in list " :key="item.updateTime "
                v-bind:class="{
                    isActive:item.isActive
                }"
                v-bind:title="item.type === 'custom' ? '用户保存于' + item.updateTime : '自动保存于' + item.updateTime"
                @click="selectData(item, index)">
                    <span class="name">{{item.updateTime | bm_time}}</span>
                    <span class="state" v-bind:class="{
                        custom:item.type === 'custom'
                        }"></span>
                </div>
        </div>
    </div>
    <div class="content">
      <p class="current-name" v-if="currentIndex > -1">
        {{"数据记录：" + list[currentIndex].updateTime }}</p>
      <img class="closeIcon"  @click="close()" src="./../assets/icon/close.svg" alt="">
      <div id="history-content">    
        <div class="onData" v-if="currentData.length ===0">
            {{currentIndex === -1 ? '请选择记录' :'当前记录没有数据'}}</div>
        <div class="comp-item"
            v-for="(item, index) in currentData" :key="index"
            v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                top:(item.style.top) +'px',
                left:(item.style.left) +'px',
                position:item.style.position,
                borderWidth:item.style.borderWidth + 'px',
                transform: 'rotate('+ item.style.rotate +'deg)'
            }">
            <!-- 1.img -->
            <img class="comp-element comp-img icon"
            v-if="item.type === 'img'" 
            v-bind:src="item.icon" 
            v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                borderRadius:item.style.borderRadius +'%'
            }">

            <!-- 2.line_colu  -->
            <div class="comp-element line comp-line_colu"
            v-if="item.type === 'line_colu'"
            v-bind:style="{
                height:item.style.height +'px'
            }">
            </div>

            <!-- 3.line_row  -->
            <div class="comp-element line comp-line_row"
            v-if="item.type === 'line_row'"
            v-bind:style="{
                with:item.style.width +'px'
            }">
            </div>

            <!-- 4.柱子 -->
            <div class="comp-element line comp-pillar comp-pillar-shadow "
            v-if="item.type === 'pillar'"
            v-bind:style="{
                height:item.style.height +'px',
                with:item.style.width +'px'
            }">

            </div>

            <!-- 5.盒子 -->
            <div class="comp-element line comp-room"
            v-if="item.type === 'room'"
            v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
            }">
            <span class="comp-room-inset"
                v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                }"></span>
            </div>
            
            <!-- 6.设备 -->
            <div class="comp-element device comp-device"
            v-if="item.type === 'device'"
            v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                background:item.style.background
            }">
            </div>

            <!-- 7.文本 -->
            <div class="comp-element device comp-text"
              v-if="item.type === 'text'"
              v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                background:item.style.background
              }"
              v-bind:class="{
                isShadow:item.style.isApplyShadow ==='true',
                multipleActive:item.multipleActiveBool}">
                <div      
                  v-bind:style="{
                  width:item.style.width +'px',
                  height:item.style.height +'px',
                  fontSize:item.style.fontSize+'px',
                  background:item.style.background,
                  color:item.style.color || '#4f4f4f'
                }">{{item.value}}</div>
            </div>
        </div>
      </div>
      <div class="btns">
          <div class="btn clerar"
            @click="clerarHistoryData()">全部清除</div>
          <div class="btn delete"
            @click="deleteCurrnetData()">删除</div>
          <div class="btn apply"
            @click="applyCurrentData()">应用</div>
          <div class="btn close"
            @click="close()">关闭</div>
      </div>
    </div>
 </div>
</template>
       
<script>


export default {
  components:{

  },
  props: {
      list:Array, //当前历史记录列表
      currentIndex:Number,
  },
  data(){
      return {
        activeTheme:'save_data_custom', //选择主题
        currentData:[]
      }
  },
  mounted:function() {

  },
  methods: {
    selectData:function(data, index) {
      this.$emit('initState', index)
      data.isActive = true;
      this.currentData = data.data;
    },
    applyCurrentData:function() {
      this.$emit('applyHistory', this.currentData)
    },
    close:function() {
      this.$emit('closeHistory')
    },
    deleteCurrnetData:function() {
      this.$emit("deleteHistoryData", this.currentIndex)
    },
    clerarHistoryData:function() {
      this.$emit('clerarHistoryData')
    }
  }
}


</script>

<style scoped>
#history {
      background: #ffffff;
    width: 1000px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-500px) translateY(-355px);
    display: grid;
    grid-template-columns: 20% 80%;
    border: 1px solid #cccccc;
    border-radius: 5px;
    z-index: 999;
}

.list {
  border-right:1px solid #cccccc;
  margin: 10px;
}
.list .title {
  font-size: 16px;
  border-bottom: 1px solid #cccccc;
  padding: 10px;
}
.list .title .nums {
  font-size: 12px;
  color: #aaa;
  padding: 0 10px;
  position: absolute;
  left: 127px;
  top: 23px;
}
.list .uls {
    height: 530px;
    overflow-y: auto;
    scrollbar-color: red yellow;
}
.list .item {
    color: #999999;
    font-size:13px;
    cursor: pointer;
    padding: 4px 10px 4px 5px;
    position: relative;
    border-left: 3px solid transparent;
}
.item:hover {
    color: #666666;
    background: #f5f5f5;
    border-left: 3px solid green;
}
.item.isActive {
    background: #f5f5f5;
    border-left: 3px solid green;   
}
.index {
    padding-right: 10px;
}

.current-name {
    height: 30px;
    color: #999;
    display: block;
    font-size: 14px;
    margin-top: 20px;
}
#history-content {
    width: 1920px;
    position: absolute;
    border: 1px solid #dddddd;
    right: 0;
    top: 45px;
    height: 1080px;
    overflow: hidden;
    margin: 10px;
    transform: scale(0.42) translate(1348px, -755px);
    background: whitesmoke;

}
.closeIcon {
  width: 32px;
  height: 32px;
  position: absolute;
  right: 10px;
  top: 8px;
  padding: 2px;
  border: 1px solid #cccccc;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.5;
}
.closeIcon:hover {
  opacity: 1;
}
.onData {
    text-align: center;
    font-size: 40px;
    color: #ddd;
    margin-top: 450px
}
.state.custom {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 14px;
    background: darkseagreen;
    border-radius: 50%;
    top: 9px;
}
.btns {
    position: absolute;
    right: 20px;
    bottom: 10px;
}
.btn {
  width: 60px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  margin: 10px;
  padding: 4px 2px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #cccccc;
  cursor: pointer;
  color: #666666;
}
.delete , .clerar {
  position: absolute;
  left: -600px;
  width: 90px;
  color:rgba(255,0,0,.4)
}
.delete:hover, .clerar:hover {
  color: #ffffff;
  background: rgba(255,0,0);
}
.delete {
  left: -114px;
}
.apply:hover {
    color:#ffffff;
    background: forestgreen;
}
.close:hover {
    background: #ddd;
}
.comp-img.isShadow {
  box-shadow: -1px 1px 10px 5px rgba(0,0,0,0.3);
}
.comp-line_colu {
  width: 5px;
  background: #ffffff;

}
.comp-line_colu.isShadow {
  box-shadow: 0px 0px 14px -1px rgba(0,0,0,1);
}
.comp-line_row {
  height: 5px;
  background: #ffffff;
}
.comp-line_row.isShadow {
  box-shadow: 0px 0px 14px -1px rgba(0,0,0,1);
}
.comp-pillar {
  width: 15px;
  height: 15px;
  background: #fff;
}
.comp-pillar-shadow.isShadow {
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.4);
}
.comp-room {
  border: 4px solid #ffffff;
}
.comp-room.isShadow {
  box-shadow: 1px 0px 8px 0px rgba(0,0,0,0.6);
}
.comp-room-inset {
  display: inline-block;
}
.comp-room-inset.isShadow {
  box-shadow: inset 0px 0px 26px -11px rgba(13,13,13,0.8);
}
.comp-text {
  text-align: center;
  font-size: 14px;
  columns: #4f4f4f;
}
</style>
