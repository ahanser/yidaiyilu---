let obj = [

  {
    path: "/process",

    name: "资源管理",
    icon: "el-icon-tickets",
    child: [{
        path: "/dashboard",
        name: "数据管理系统",
        child: [{
            path: "/process",
            name: "建设过程"
          },
          {
            path: "/role",
            name: "参与角色"
          },
        ]
      }

    ]
  },
  {
    path: "/ss",

    name: "文件管理",
    icon: "el-icon-tickets",
    child: [{
        path: "/dashboard",
        name: "上传系统",
        child: [{
            path: "/process",
            name: "建设过程"
          },
          {
            path: "/role",
            name: "参与角色"
          },
        ]
      }

    ]
  }
]
export default obj
