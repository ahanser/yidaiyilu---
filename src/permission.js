import router from './router'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  Message
} from 'element-ui'
// import {
//   getUser
// } from '@/utils/auth' // getToken from cookie

NProgress.configure({
  showSpinner: false
}) // NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {




  //alert(user)
  // NProgress.start()
  if (window.sessionStorage.getItem('userInfor')) {
    next()


  } else {



    // next("/login")

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next("/login") // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
