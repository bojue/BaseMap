<template>
  <div id="app">
    <Editor/>
  </div>
</template>

<script>
import Editor from './components/editor/editor';
export default {
  components: {
    Editor
  },
  methods: {
  
  }
}

</script>

<style>
#app {
  padding: 0;
  position: relative;
  width: 100%;
}
::-webkit-scrollbar-thumb:horizontal { 
    width: 4px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
    background-color: #fff; 
}
::-webkit-scrollbar {
    width: 10px; 
    height: 8px;
}
::-webkit-scrollbar-thumb:vertical {
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
    height: 50px;
    background-color: #9f9f9f;
    -webkit-border-radius: 4px;
}
</style>
