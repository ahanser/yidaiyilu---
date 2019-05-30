let obj1= [
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
        child: [{
            path: "/knowledge",
            name: "资料管理",
            icon: "el-icon-tickets",
            child: [{
                path: "/knowledge",
                name: "知识库管理"
              },
              {
                path: "/contract",
                name: "合同管理"
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
            }, {
              path: "/capital",
              name: "资金管理"
            },
          ]
        }
  
      ]
    },
    {
      path: "/business",
  
      name: "业务管理",
      icon: "el-icon-printer",
      child: [{
          path: "/business",
          name: "业务管理",
          icon: "el-icon-printer",
          child: [{
              path: "/business",
              name: "任务管理"
            },
            {
              path: "/statused",
              name: "任务审核"
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
    }
  ]
  export default obj1