<template>
 <div id="history"> 
    <div class="list">
        <div class="title">历史列表</div>
        <div class="uls" v-if="list">
            <div class="item" 
                v-for="(item, index) in list " :key="index"
                v-bind:class="{
                    isActive:item.isActive
                }"
                v-bind:title="item.type === 'custom' ? '用户保存于' + item.updateTime : '自动保存于' + item.updateTime"
                @click="selectData(item, index)">
                    <span class="index">{{index+1}}.</span>
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
            }">
        </div>
        </div>
      </div>
      <div class="btns">
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
    }
  }
}


</script>

<style scoped>
#history {
    background: #ffffff;
    width: 1300px;
    height: 750px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-650px) translateY(-430px);
    display: grid;
    grid-template-columns: 20% 80%;
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
.list .uls {
    height: 700px;
    overflow-y: auto;
    scrollbar-color: red yellow;
}
.list .item {
    color: #999999;
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
    border:1px solid #dddddd;
    right: 0;
    top: 45px;
    height: 1080px;
    margin:10px;
    transform: scale(0.54) translate(825.5px, -464px);
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
    background: darkgreen;
    border-radius: 50%;
    top: 9px;
}
.btns {
    position: absolute;
    right: 20px;
    bottom: 20px;
}
.btn {
    width: 60px;
    height: 20px;
    display: inline-block;
    margin: 10px;
    padding: 6px 10px;
    border-radius: 5px;
    text-align: center;
    border:1px solid #cccccc;
    cursor: pointer;
    color: #666666;
}
.apply:hover {
    color:#ffffff;
    background: forestgreen;
}
.close:hover {
    background: #ddd;
}
</style>
