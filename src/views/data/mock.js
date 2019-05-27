let obj = [

  {
    path: "/dashboard",
    parentId:null,
    name: "项目管理",
    id:1,
    icon: "el-icon-date",
    child: [{
        parentId:1,
        id:2,
        path: "/dashboard",
        icon: "el-icon-date",
        name: "项目管理",
        child: [{
            parentId:2,
            id:3,
            path: "/dashboard",
            name: "建设任务"
          },
          {
            parentId:2,
            id:4,
            path: "/process",
            name: "建设过程"
          },
          {
            parentId:2,
            id:5,
            path: "/construction",
            name: "建设项目"
          },
        ]
      }

    ]
  },
  {
    path: "/knowledge",
    name: "资料管理",
    icon: "el-icon-tickets",
    parentId:null,
    id:1,
    child: [{
        parentId:1,
        id:2,
        path: "/knowledge",
        name: "资料管理",
        icon: "el-icon-tickets",
        child: [{
          parentId:2,
          id:6,
            path: "/knowledge",
            name: "知识库管理"
          },
          {
            parentId:2,
            id:7,
            path: "/contract",
            name: "合同管理"
          },
        ]
      }

    ]
  },
  {
    path: "/units",

    name: "权限管理",
    icon: "el-icon-edit-outline",
    parentId:null,
    id:1,
    child: [{
      parentId:1,
      id:2,
      path: "/units",
      name: "权限管理",
      icon: "el-icon-edit-outline",
        child: [{
          parentId:2,
          id:8,
            path: "/units",
            name: "参与单位"
          },
          {
            parentId:2,
          id:8,
            path: "/participants",
            name: "参与人员"
          },
          {
            parentId:2,
          id:8,
            path: "/role",
            name: "参与角色"
          },
        ]
      }

    ]
  },
  {
    path: "/Financial",

    name: "统计管理",
    icon: "el-icon-mobile-phone",
    child: [{
        path: "/Financial",
        name: "统计管理",
        icon: "el-icon-mobile-phone",
        child: [{
            path: "/Financial",
            name: "财务明细统计"
          },
          {
            path: "/progress",
            name: "分项目进度统计"
          },
        ]
      }

    ]
  },
]
export default obj
