const Devices_base = [
    {
      id: 1,
      type: "room",
      name: "房间",
      icon: require("@/assets/comps/room.png"),
      backgroundImage:require("@/assets/icon/floor3.png"),
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
      icon: require("@/assets/comps/line_row.png"),
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
      icon: require("@/assets/comps/line_colu.png"),
      defStyle: {
        width: 5,
        height: 100
      }
    },
    {
      id: 1,
      type: "pillar",
      name: "柱子",
      icon: require("@/assets/comps/room.png"),
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
      icon: require("@/assets/comps/text.png"),
      defStyle: {
        width: 100,
        height: 40,
        color:"#4f4f4f"
      }
    },
  ]

  export default Devices_base