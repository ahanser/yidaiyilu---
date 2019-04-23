import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
   
    name: 'Dashboard',
    hidden: true,
    children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      },
      //  建设过程

      {
        path: 'process',
        component: () => import('@/views/dataManger/buildprocess/index')
      },
      // 参与角色
      {
        path: 'role',
        component: () => import('@/views/dataManger/participationrole/index')
      },
      // 参与单位
      {
        path: 'units',
        component: () => import('@/views/dataManger/participatingunits/index')
      },
      // 参与人员

      {
        path: 'participants',
        component: () => import('@/views/dataManger/participant/index')
      },
      //项目建设
      {
        path: 'construction',
        component: () => import('@/views/dataManger/buildproject/index')

      },
      // 项目管理
      {
        path: 'manger',
        component: () => import('@/views/dataManger/buildproject/projectManger')
      },

      // 建设项目  详情
      {
        path: 'constructionDeatils',
        component: () => import('@/views/dataManger/buildproject/projectDetail')
      },

      //合同管理
      {
        path: 'contract',
        component: () => import('@/views/dataManger/contract/index')
      },
      //知识库管理

      {
        path: 'knowledge',
        component: () => import('@/views/dataManger/knowledgebase/index')
      },
      //业务管理
      {
        path: 'business',
        component: () => import('@/views/businessmanager/business/index')
      },
      // 财务统计 
      {
        path: 'Financial',
        component: () => import('@/views/businessmanager/Financial/index')
      }, // 进度统计
      {
        path: 'progress',
        component: () => import('@/views/businessmanager/progress/index')
      }
    ]
  },



  {
    path: '*',
    redirect: '/login',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
