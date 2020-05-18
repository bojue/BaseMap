<template>
 <div id="keyboard"> 
     <img 
        src="./../assets/icon/keyborder.svg" 
        class="icon" 
        @click="showKeyBoadrInfoBool= !showKeyBoadrInfoBool" 
        alt="快捷键"
        title="快捷键">
     <div class="info" v-if="showKeyBoadrInfoBool">
         <div class="title">
             快捷操作(<code>Window/Mac</code>)
         </div>
         <div class="datas" >
             <div class="item">
                 <span class="name">复制</span>
                 <span class="val"><code>Ctrl</code>+<code>c</code></span>
             </div>
            <div class="item">
                 <span class="name">粘贴</span>
                 <span class="val"><code>Ctrl</code>+<code>v</code></span>
            </div>
            <div class="item">
                <span class="name"><code>win</code>多选</span>
                <span class="val"><code>Shift</code>+点击</span>
            </div>
            <div class="item">
                <span class="name"><code>win</code>取消多选</span>
                <span class="val"><code>Shift</code>+点击</span>
             </div>
             <div class="item">
                <span class="name"><code>mac</code>多选</span>
                <span class="val"><code>Comm</code>+点击</span>
            </div>
            <div class="item">
                <span class="name"><code>mac</code>取消多选</span>
                <span class="val"><code>Comm</code>+点击</span>
            </div>
            <div class="item">
                 <span class="name">删除</span>
                 <span class="val"><code>Delete</code></span>
            </div>
         </div>
     </div>
 </div>
</template>
       
<script>

export default {
  props: {

  },
  data(){
      return {
        showKeyBoadrInfoBool:false
      }
  },
  mounted:function() {
    
  },
  methods: {
  
  }
}


</script>

<style scoped>
#keyboard {
    position: fixed;
    right: 30px;
    bottom: 30px;
    cursor: pointer;
}
#keyboard .icon {
    opacity: 0.6;
    width: 22px;
    height: 22px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(255,0,0,0.2);
    background: #ffffff;
}
#keyboard  .icon:hover {
    padding: 11px;
    opacity: 1;
    box-shadow: 0px 0px 5px rgba(255,0,0,0.6);
}
.info {
    position: fixed;
    right: 10px;
    bottom: 120px;
    background: #f4f5f5;
    width: 180px;
    padding: 10px;
}
.title {
    margin: 10px 3px;
}
.datas {
    color: #666666;
    font-size: 14px;
    margin: 3px;
}

.datas .item {
    height: 30px;
    line-height: 30px;
}
code {
    color:dodgerblue;
    padding: 2px;
}
.github img {
    position: fixed;
    width: 100px;
    height: 100px;
    left: 10px;
    bottom: 50px;
}
</style>
