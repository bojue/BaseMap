import { asset } from "@/utils/assets";

const Devices_base = [
    {
      id: 1,
      type: "room",
      name: "房间",
      icon: asset("comps/room.webp"),
      backgroundImage:asset("icon/floor3.webp"),
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
      icon: asset("comps/line_row.webp"),
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
      icon: asset("comps/line_colu.webp"),
      defStyle: {
        width: 5,
        height: 100
      }
    },
    {
      id: 1,
      type: "pillar",
      name: "柱子",
      icon: asset("comps/room.webp"),
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
      icon: asset("comps/text.webp"),
      defStyle: {
        width: 100,
        height: 40,
        color:"#4f4f4f"
      }
    },
  ]

  export default Devices_base