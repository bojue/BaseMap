<template>
  <div id="app">
    <EditorComps msg="EditorComps"/>
    <EditorContent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import EditorComps from './components/editor-comps'
import EditorContent from './components/editor-content';

export default {
  name: 'App',
  components: {
    EditorComps,
    EditorContent,
  }
}
</script>

<style>
#app {
  padding: 0;
  position: relative;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 205px auto;
}
</style>
