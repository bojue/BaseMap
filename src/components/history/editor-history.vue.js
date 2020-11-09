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
          currentData:[],
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
        if(this.currentIndex < 0) return;
        this.$emit("deleteHistoryData", this.currentIndex)
      }
    }
  }
  
  