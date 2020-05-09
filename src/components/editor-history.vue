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
                @click="selectData(item, index)">
                    <span class="index">{{index+1}}.</span>
                    <span class="name">{{item.updateTime | bm_time}}</span>
                </div>
        </div>
    </div>
    <div class="content">
      <div id="history-content">    
        <div class="comp-item"
            v-for="(item, index) in currentData" :key="index"
            v-bind:style="{
                width:item.style.width +'px',
                height:item.style.height +'px',
                top:(item.style.top) +'px',
                left:(item.style.left) +'px',
                top:(item.style.top - rect.y) +'px',
                left:(item.style.left - rect.x) +'px',
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
    </div>
 </div>
</template>
       
<script>


export default {
  components:{

  },
  props: {
      historyData:Object,
      list:Array, //当前历史记录列表
      rect:Object
  },
  data(){
      return {
        activeTheme:'save_data_custom', //选择主题
        currentIndex:Number, // 当前下标
        currentData:[]
      }
  },
  mounted:function() {

  },
  methods: {
    selectData:function(data, index) {
        this.currentIndex = index;
        data.isActive = true;
        this.currentData = data.data;
    },
    initData:function() {
        let len = this.list;
        for(let i=0;i<len;i++) {
            this.list[i].isActive = false;
        }
    }
  }
}


</script>

<style scoped>
#history {
    background: #ffffff;
    width: 1300px;
    height: 800px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-650px) translateY(-450px);
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
.list .item {
    color: #999999;
    cursor: pointer;
    padding: 4px 10px 4px 5px;
    border-left: 3px solid transparent;
}
.item:hover {
    color: #666666;
    background: #f5f5f5;
    border-left: 3px solid green;
}
.item.isActive {
    background: #f5f5f5;
}
.index {
    padding-right: 10px;
}

.content {
    /* background: red; */
}
#history-content {
    width: 960px;
    background: #cccccc;
}

</style>
