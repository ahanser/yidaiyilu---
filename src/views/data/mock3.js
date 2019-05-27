let obj3= [

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
              }
              
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
                name: "财务明细统计",
               
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
  export default obj3