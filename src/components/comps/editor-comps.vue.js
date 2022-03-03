export default {
    name: "EditorComps",
    props: {
      elements: Array,
      webConfig:Object
    },
    data() {
      return {
        currentCategory: "tools",
        compTits: [
          {
            id: 1,
            name: "组件库",
            type: "tools",
            isActive: true
          },
          {
            id: 2,
            name: "元素",
            type: "elements",
            isActive: false
          }
        ],
        devices: [
          {
            name: "基础",
            list: [
              {
                id: 1,
                type: "room",
                name: "房间",
                icon: require("./../../assets/comps/room.png"),
                backgroundImage:require("./../../assets/icon/floor3.png"),
                bgiBool:false,
                defStyle: {
                  width: 120,
                  height: 120,
                  borderWidth: 4
                }
              },
              {
                id: 1,
                type: "line_row",
                name: "水平墙",
                icon: require("./../../assets/comps/line_row.png"),
                defStyle: {
                  width: 100,
                  height: 5,
                  borderWidth: 0
                }
              },
              {
                id: 1,
                type: "line_colu",
                name: "垂直墙",
                icon: require("./../../assets/comps/line_colu.png"),
                defStyle: {
                  width: 5,
                  height: 100
                }
              },
              {
                id: 1,
                type: "pillar",
                name: "柱子",
                icon: require("./../../assets/comps/room.png"),
                defStyle: {
                  width: 15,
                  height: 15
                },
                styleObject: {
                  width: "16px",
                  height: "16px",
                  marginTop: "16px",
                  opacity:1
                }
              },{
                id: 2,
                type: "text",
                name: "文本",
                value:"",
                icon: require("./../../assets/comps/text.png"),
                defStyle: {
                  width: 100,
                  height: 40,
                  color:"#4f4f4f"
                }
              },
            ]
          },
          {
            name: "设备",
            list: [
              {
                id: 1,
                type: "device",
                name: "机柜-橙",
                icon: require("./../../assets/comps/device.png"),
                bgBool:true,
                defStyle: {
                  width: 25,
                  height: 25,
                  background:'#ff8c00'
                },
                styleObject: {
                  background:'#ff8c00',
                  width: "22px",
                  height: "22px",
                  marginTop: "10px",
                  opacity:1,
                }
              }, {
                id: 1,
                type: "device",
                name: "机柜-蓝",
                icon: require("./../../assets/comps/device.png"),
                bgBool:true,
                defStyle: {
                  width: 25,
                  height: 25,
                  background:'#5a8eda'
                },
                styleObject: {
                  background:'#5a8eda',
                  width: "22px",
                  height: "22px",
                  marginTop: "10px"
                }
              }, {
                id: 1,
                type: "device",
                name: "机柜-灰白",
                icon: require("./../../assets/comps/device.png"),
                bgBool:true,
                defStyle: {
                  width: 25,
                  height: 25,
                  background:'#d1cfd0'
                },
                styleObject: {
                  background:'#d1cfd0',
                  width: "22px",
                  height: "22px",
                  marginTop: "10px"
                }
              }, {
                id: 1,
                type: "device",
                name: "机柜-黑",
                icon: require("./../../assets/comps/device.png"),
                bgBool:true,
                defStyle: {
                  width: 25,
                  height: 25,
                  background:'#2f3c35'
                },
                styleObject: {
                  background:'#2f3c35',
                  width: "18px",
                  height: "18px",
                  marginTop: "10px"
                }
              }, {
                id: 1,
                type: "aisle",
                name: "冷通道",
                icon: require("./../../assets/comps/device.png"),
                bgBool:true,
                defStyle: {
                  width: 100,
                  height: 30,
                  border:'2px solid #000000',
                  background:'#007fff',
                  opacity:0.5
                },
                styleObject: {
                  border:'2px solid #000000',
                  background:'#007fff',
                  width: "22px",
                  height: "22px",
                  marginTop: "10px",
                  opacity:0.5
                }
              },
              {
                id: 3,
                type: "img",
                name: "冷机",
                icon: require("./../../assets/comps/lengji.png"),
                defStyle: {
                  width: 40,
                  height: 150
                },
                styleObject: {
                  width: "20px",
                  height:"35px"
                }
              },{
                id: 4,
                type: "img",
                name: "冷机2",
                icon: require("./../../assets/comps/lengji.jpg"),
                defStyle: {
                  width: 40,
                  height: 80
                },
                styleObject: {
                  width: "20px",
                  height: "35px",
                  marginTop: "0px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "柴发",
                icon: require("./../../assets/comps/chaifa.png"),
                defStyle: {
                  width: 100,
                  height: 35
                },
                styleObject: {
                  width: "55px",
                  height: "20px",
                  marginTop: "10px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "柴发2",
                icon: require("./../../assets/comps/chaifa2.jpg"),
                defStyle: {
                  width: 60,
                  height: 120
                },
                styleObject: {
                  width: "20px",
                  height: "35px",
                  marginTop: "0px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "水泵",
                icon: require("./../../assets/comps/shuibang.png"),
                defStyle: {
                  width: 30,
                  height: 50
                },
                styleObject: {
                  width: "20px",
                  height: "35px",
                  marginTop: "0px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "二次泵",
                icon: require("./../../assets/comps/ercibeng.jpg"),
                defStyle: {
                  width: 60,
                  height: 120
                },
                styleObject: {
                  width: "26px",
                  height: "40px",
                  marginTop: "0px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "风机",
                icon: require("./../../assets/comps/fengji.jpg"),
                defStyle: {
                  width: 160,
                  height: 130
                },
                styleObject: {
                  width: "44px",
                  height: "30px",
                  marginTop: "5px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "电池组",
                icon: require("./../../assets/comps/dianchizu_duohang.png"),
                defStyle: {
                  width: 110,
                  height: 40
                },
                styleObject: {
                  width: "60px",
                  height: "25px",
                  marginTop: "5px"
                }
              },
              {
                id: 4,
                type: "img",
                name: "单行电池组",
                icon: require("./../../assets/comps/dianchizu.png"),
                defStyle: {
                  width: 110,
                  height: 40
                },
                styleObject: {
                  width: "60px",
                  height: "20px",
                  marginTop: "10px"
                }
              },
              {
                id: 2,
                type: "img",
                name: "室外机",
                icon: require("./../../assets/comps/shiwaiji.jpg"),
                defStyle: {
                  width: 80,
                  height: 80
                }
              },
               {
                id: 2,
                type: "img",
                name: "闸机",
                icon: require("./../../assets/comps/zhaji.png"),
                defStyle: {
                  width: 100,
                  height: 40,
                  isApplyShadow:'false'
                }
              },
              {
               id: 2,
               type: "img",
               name: "蓄冷罐",
               icon: require("./../../assets/comps/xulengguan.png"),
               defStyle: {
                 width: 50,
                 height: 50,
                 isApplyShadow:'false'
               }
              }
            ]
          },
          {
            name: "其他",
            list: [
              {
                id: 1,
                type: "img",
                name: "灭火器",
                icon: require("./../../assets/comps/miehuoqi.png"),
                defStyle: {
                  width: 30,
                  height: 30,
                  borderRadius: "50",
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "钢瓶",
                icon: require("./../../assets/comps/gangping.png"),
                defStyle: {
                  width: 30,
                  height: 30,
                  borderRadius: "50",
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "办公桌1",
                icon: require("./../../assets/comps/bangongzhuo.png"),
                defStyle: {
                  width: 120,
                  height: 70,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "办公桌2",
                icon: require("./../../assets/comps/bangongzhuo2.png"),
                defStyle: {
                  width: 160,
                  height: 240,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "办公桌3",
                icon: require("./../../assets/comps/bangongzhuo3.png"),
                defStyle: {
                  width: 120,
                  height: 120,
                  isApplyShadow:'false'
                }
              },
               {
                id: 2,
                type: "img",
                name: "楼梯",
                icon: require("./../../assets/comps/luti.png"),
                defStyle: {
                  width: 100,
                  height: 40
                }
              },    {
                id: 2,
                type: "img",
                name: "楼梯2",
                icon: require("./../../assets/comps/louti.jpg"),
                defStyle: {
                  width: 100,
                  height: 80
                }
              },
             
                {
                id: 2,
                type: "img",
                name: "前台",
                icon: require("./../../assets/comps/qiantai.png"),
                defStyle: {
                  width: 130,
                  height: 200,
                  isApplyShadow:'false'
                }
              },
               {
                id: 2,
                type: "img",
                name: "监控中心",
                icon: require("./../../assets/comps/jiankongzhongxin.png"),
                defStyle: {
                  width: 180,
                  height: 80,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "健身器材1",
                icon: require("./../../assets/comps/jianshen1.png"),
                defStyle: {
                  width: 50,
                  height: 100,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "健身器材2",
                icon: require("./../../assets/comps/jianshen2.png"),
                defStyle: {
                  width: 50,
                  height: 100,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "健身器材2",
                icon: require("./../../assets/comps/jianshen3.png"),
                defStyle: {
                  width: 50,
                  height: 100,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "植物1",
                icon: require("./../../assets/comps/zhiwu1.png"),
                defStyle: {
                  width: 50,
                  height: 50,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "植物2",
                icon: require("./../../assets/comps/zhiwu2.png"),
                defStyle: {
                  width: 50,
                  height: 50,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "伞",
                icon: require("./../../assets/comps/san.png"),
                defStyle: {
                  width: 50,
                  height: 50,
                  isApplyShadow:'false'
                }
              },
              {
                id: 2,
                type: "img",
                name: "草坪",
                icon: require("./../../assets/comps/caoping.jpg"),
                defStyle: {
                  width: 250,
                  height: 100,
                  isApplyShadow:'false'
                }
              } ,
              {
                id: 2,
                type: "img",
                name: "圆桌",
                icon: require("./../../assets/comps/yuanzhuo.png"),
                defStyle: {
                  width: 150,
                  height: 150,
                  isApplyShadow:'false'
                }
              }  ,
              {
                id: 2,
                type: "img",
                name: "餐桌",
                icon: require("./../../assets/comps/canzhuo.png"),
                defStyle: {
                  width: 250,
                  height: 100,
                  isApplyShadow:'false'
                }
              }  ,
              {
                id: 2,
                type: "img",
                name: "床",
                icon: require("./../../assets/comps/chuang.png"),
                defStyle: {
                  width: 100,
                  height: 200,
                  isApplyShadow:'false'
                }
              }  ,
              {
                id: 2,
                type: "img",
                name: "沙发",
                icon: require("./../../assets/comps/shafa.png"),
                defStyle: {
                  width: 250,
                  height: 100,
                  isApplyShadow:'false'
                }
              }     
            ]
          }
        ]
      };
    },
    methods: {
      // 开始拖拽组件
      dragStart: function(event, comp) {
        let { clientX, clientY } = event;
        comp.defStyle.startX = clientX;
        comp.defStyle.startY = clientY;
        this.$emit("selectComp", event, comp);
      },
      drag:function(event) {
        this.$emit("showSelectCompByDray", event);
      },
      // Tab切换，目前只有一个组件库:tools
      selCategory: function(categroy) {
        if(categroy === 'setConfig') {
          this.currentCategory = categroy;
        }else {
          this.currentCategory = categroy.type;
        }
        if (categroy.isActive) return;
        let len = this.compTits.length;
        for (let i = 0; i < len; i++) {
          this.compTits[i].isActive = false;
        }
        if(Object.prototype.hasOwnProperty.call(categroy,'isActive')) {
          categroy.isActive = true;
        }
  
      },
  
      // 元素选择
      selectElement: function(index) {
        this.$emit("initCompsState", index);
      }
    }
  };