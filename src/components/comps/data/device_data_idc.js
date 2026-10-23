import { asset } from "@/utils/assets";

const Devices_idc = [
    {
      id: 1,
      type: "device",
      name: "机柜-橙",
      icon: asset("comps/device.webp"),
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
      icon: asset("comps/device.webp"),
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
      icon: asset("comps/device.webp"),
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
      icon: asset("comps/device.webp"),
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
      icon: asset("comps/device.webp"),
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
      icon: asset("comps/lengji.webp"),
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
      icon: asset("comps/lengji.webp"),
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
      icon: asset("comps/chaifa.webp"),
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
      icon: asset("comps/chaifa2.webp"),
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
      icon: asset("comps/shuibang.webp"),
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
      icon: asset("comps/ercibeng.webp"),
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
      icon: asset("comps/fengji.webp"),
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
      icon: asset("comps/dianchizu_duohang.webp"),
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
      icon: asset("comps/dianchizu.webp"),
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
      icon: asset("comps/shiwaiji.webp"),
      defStyle: {
        width: 80,
        height: 80
      }
    },
     {
      id: 2,
      type: "img",
      name: "闸机",
      icon: asset("comps/zhaji.webp"),
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
     icon: asset("comps/xulengguan.webp"),
     defStyle: {
       width: 50,
       height: 50,
       isApplyShadow:'false'
     }
    }
  ]

  export default Devices_idc