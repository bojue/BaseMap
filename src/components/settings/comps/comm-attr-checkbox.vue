<template>
    <div class="item">
        <label for="" class="title" v-if="label">{{label}}</label>
        <div class="subs">
            <div class="subs-item">
                <input class="val-cb"
                    type="checkbox"
                    v-model="currentElement.style[attribute]"
                    true-value=true
                    false-value=false
                >
                <span class="val">{{name}}</span>
            </div>
        </div>
    </div>
   
</template>
<script>
export default {
  components: {

  },
  data() {
    return {

    }
  },
  props: {
    currentElement:Object,
    attribute:String,
    name:String,
    label:String
  }, 
  methods: {
   
  }
}
</script>
<style src="./../editor-settings.vue.css" lang="css" scoped></style>