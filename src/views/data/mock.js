let obj = [

  {
    path: "/dashboard",
    parentId:null,
    name: "项目管理",
    isExpend: false,
    id:0,
    icon: "el-icon-date",
    child: [{
        parentId:0,
        isExpend: false,
        id:1,
        path: "/dashboard",
        icon: "el-icon-date",
        name: "建设管理",
        child: [{
            parentId:1,
            isExpend: false,
            id:2,
            path: "/dashboard",
            name: "建设任务"
          },
          {
            parentId:1,
            isExpend: false,
            id:3,
            path: "/process",
            name: "建设过程"
          },
       
          
        ]
      },{
        parentId:0,
        isExpend: false,
        id:1,
        path: "/dashboard",
        icon: "el-icon-message",
        name: "项目管理",
        child:[
          {
            parentId:1,
            isExpend: false,
            id:4,
            path: "/manger",
            name: "建设项目",
          },
          {
            parentId:1,
            isExpend: false,
            id:5,
            path: "/projectinfo",
            name: "项目任务",
          },{
            parentId:1,
            isExpend: false,
            id:6,
            path: "/projectoverview",
            name: "项目总览",
          },
          {
            parentId:1,
            isExpend: false,
            id:6,
            path: "/projectdoc",
            name: "项目文档",
          }
        ]
      },{
        parentId:0,
        isExpend: false,
        id:1,
        path: "/dashboard",
        icon: "el-icon-sold-out",
        name: "资金管理",
        child:[
          {
            path: "/capital",
            name: "资金管理"
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
    isExpend: false,
    id:0,
    child: [{
        parentId:0,
        isExpend: false,
        id:1,
        path: "/knowledge",
        name: "资料管理",
        icon: "el-icon-tickets",
        child: [{
          parentId:1,
          isExpend: false,
          id:2,
            path: "/knowledge",
            name: "知识库管理"
          },
          {
            parentId:1,
            isExpend: false,
            id:3,
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
    isExpend: false,
    id:0,
    child: [{
      parentId:0,
      isExpend: false,
      id:1,
      path: "/units",
      name: "权限管理",
      icon: "el-icon-edit-outline",
        child: [{
          parentId:1,
          isExpend: false,
          id:2,
            path: "/units",
            name: "参与单位"
          },
          {
            parentId:1,
            isExpend: false,
            id:2,
            path: "/participants",
            name: "参与人员"
          },
          {
            parentId:1,
            id:3,
            path: "/role",
            isExpend: false,
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
