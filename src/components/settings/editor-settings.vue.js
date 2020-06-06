export default {
    props: {
      currentElement:Object, //当前组件
      currentActiveIndex:Number, // 编辑状态管理
      configs:Object, //页面对象
      multipleActiveArr:Array
    },
    data() {
      return {
        imgUrlPre:'',
        multipleApplyShadow:'true',
        multipleApplyBorderRadius:'0',
        colors:[
          '#d81e06', 
          '#ff7f00',
          '#ffff00',
          '#00ca98', 
          '#0007ff',
          '#13227a',
          '#ffffff',
          '#dbdbdb',
          '#bfbfbf',
          '#4f4f4f',
          '#2c2c2c',
          '#000000'],
        backgrounds:[
          '#FF8c00', 
          '#2f3035',
          '#5e8ad1',
          '#d1cfd0', 
          '#ffffff',
          '#d81e06',
          '#ffff00',
          '#7fff00',
          '#00ca98',
          '#26c9ff',
          '#13227A',
          "#000"],
        img: {
          l:require('./../../assets/icon/align/l.png'),
          l_def:require('./../../assets/icon/align/l.png'),
          l_hover:require('./../../assets/icon/align/l_h.png'),
          r:require('./../../assets/icon/align/r.png'),
          r_def:require('./../../assets/icon/align/r.png'),
          r_hover:require('./../../assets/icon/align/r_h.png'),
          t:require('./../../assets/icon/align/t.png'),
          t_def:require('./../../assets/icon/align/t.png'),
          t_hover:require('./../../assets/icon/align/t_h.png'),
          b:require('./../../assets/icon/align/b.png'),
          b_def:require('./../../assets/icon/align/b.png'),
          b_hover:require('./../../assets/icon/align/b_h.png'),
          dispersion_l:require('./../../assets/icon/align/dispersion_l.png'),
          dispersion_l_def:require('./../../assets/icon/align/dispersion_l.png'),
          dispersion_l_hover:require('./../../assets/icon/align/dispersion_l_h.png'),
          dispersion_v:require('./../../assets/icon/align/dispersion_v.png'),
          dispersion_v_def:require('./../../assets/icon/align/dispersion_v.png'),
          dispersion_v_hover:require('./../../assets/icon/align/dispersion_v_h.png'),
          save:require('./../../assets/icon/save.png'),
          save_def:require('./../../assets/icon/save.png'),
          save_hover:require('./../../assets/icon/save_h.png'),
          history:require('./../../assets/icon/history.png'),
          history_def:require('./../../assets/icon/history.png'),
          history_hover:require('./../../assets/icon/history_h.png'),
          region:require('./../../assets/icon/align/region.png'),
          region_def:require('./../../assets/icon/align/region.png'),
          region_hover:require('./../../assets/icon/align/region_h.png'),
          output:require('./../../assets/icon/contr/output.png'),
          output_def:require('./../../assets/icon/contr/output.png'),
          output_hover:require('./../../assets/icon/contr/output_h.png'),
        }
      }
    },
    mounted:function() {
  
    },
    methods: {
      selColor:function(color) {
        this.$emit('selColor',this.currentElement, color);
      },
      selBackground:function(bgColor) {
        this.$emit('selBackground', this.currentElement, bgColor)
      },
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
        this.$emit('screen');
      },
      getHistory:function() {
        this.$emit('getHistory')
      },
      saveData:function() {
        this.$emit('saveDateToStorage', null , 'custom');
      },
      downloadJSON:function() {
        this.$emit('downloadJSON')
      },
      changeFile:function() {
        let that = this;
        let fileInput = document.getElementById("filePicker").files[0];
        if(!fileInput) {
          return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(fileInput);
        reader.onload = function() 
        {
          that.$emit('changeBgImg', this.result)
        }
      }
    }
  }