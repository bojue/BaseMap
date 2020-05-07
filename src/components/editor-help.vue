<template>
 <div id="keyboard">
     <img src="./../assets/icon/keyborder.svg" class="icon" @click="showKeyBoadrInfoBool= !showKeyBoadrInfoBool" alt="">
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
                <span class="name">多选</span>
                <span class="val"><code>Ctrl</code>+点击</span>
            </div>
            <div class="item">
                <span class="name">取消多选</span>
                <span class="val"><code>Ctrl</code>+点击+点击</span>
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
    bottom: 80px;
    cursor: pointer;
}
#keyboard .icon {
    width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(255,0,0,0.2);
}
#keyboard  .icon:hover {
    padding: 11px;
    box-shadow: 0px 0px 5px rgba(255,0,0,0.6);
}
.info {
    position: fixed;
    right: 10px;
    bottom: 150px;
    background: #ccc;
    width: 180px;
    padding: 10px;
}
.title {
    margin: 10px 3px;
}
.datas {
    font-size: 14px;
    margin: 3px;
}

.datas .item {
    height: 20px;
    line-height: 20px;
}
code {
    color:green;
    padding: 2px 4px;
}
.github img {
    position: fixed;
    width: 100px;
    height: 100px;
    left: 10px;
    bottom: 50px;
}
</style>
