
<template>
  <div class="side-nav" :class="layout">
    <el-menu
      default-active="2"
      ref="navbar"
      router
      class="el-menu-vertical"
      menu-trigger="click"
      background-color="#242c44"
      active-text-color="#ffd04b"
      text-color="#fff"
      :default-openeds="openeds"
    >
      
      <nav-bar-item v-for="(item, n) in navList " :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
        
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import obj from '@/views/data/mock.js'
import obj1 from '@/views/data/mock1.js'
import obj11 from '@/views/data/mock11.js'
//import obj2 from '@/views/data/mock2.js'
import obj22 from '@/views/data/mock22.js'
import obj3 from '@/views/data/mock3.js'
import NavBarItem from './SidebarItem'

export default {
  data() {
    return {
      navBgShow: false,
      //active:'/business',
      openeds: ['0'],
      uniqueOpened: false,
      activeIndex:0
    }
  },
  watch:{
    navList(){
        // this.$store.state.user.sibarArr = this.nav[0].child
        // this.$store.state.user.defaultPath = this.$router.path
        //  console.log("TCL: navList -> this.navList[0].child[0].path", this.navList[0].child[0].path)
    },
     
   
  },
  props: ['layout'],
  computed: {
    // defActive() {
    //   // if (this.active == "") {
    //   //   this.active = this.navList[0].path;
    //   //   alert(this.active);
    //   //   return this.active;
    //   // } else {
        
    //   return this.$router.path
			
    //   }
    // },
 defaultActive() {
            return this.$route.path 
            // return '/' + this.$route.path.split('/').reverse()[0];
        },

    navList() {   
      console.log("TCL: navList -> this.$store.state.user.sibarArr", this.$store.state.user.sibarArr)
      return this.$store.state.user.sibarArr
		  //:default-openeds="openeds"
    }
  },
  mounted() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      if (user == '李欣') {
        this.$store.state.user.menuArr = obj
        //this.$router.push(this.navList[0].child[0].path)
        this.$store.state.app.tips  =false 
      }
      if (user == '王安') {
        this.$store.state.user.menuArr = obj11
        //this.$router.push(this.navList[0].child[0].path)
      }
       if (user == '常伟') {
        this.$store.state.user.menuArr = obj22
        //this.$router.push(this.navList[0].child[0].path)
      }
       if (user == '刘瑞') {
        this.$store.state.user.menuArr = obj3
        //this.$router.push(this.navList[0].child[0].path)
        this.$store.state.app.tips  =false
      }
      if (user == 'admin') {
        this.$store.state.user.menuArr = obj1
       // this.$router.push(this.navList[0].child[0].path)
        this.$store.state.app.tips =false 
      }
   
      // this.activeNav=window.location.href.split('/root/')[1]
  },
  // methods: {
  
  //   selectMenu(index, indexPath) {
  //     /**
    
  //                        * 在选择父级菜单时自动关闭其下所有子菜单
    
  //                        * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
    
  //                        * 关闭位于当前打开菜单中该索引值之后的全部菜单
    
  //                        */
  //     let openedMenus = this.$refs.navbar.openedMenus
  //     let openMenuList
  //     // 如果点击的是二级菜单，则获取其后已经打开的菜单
  //     if (indexPath.length > 1) {
  //       let parentPath = indexPath[indexPath.length - 2]
  //       openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1)
  //     } else {
  //       openMenuList = openedMenus
  //     }
  //     // 关闭菜单
  //     openMenuList = openMenuList.reverse()
  //     openMenuList.forEach(ele => {
  //       this.$refs.navbar.closeMenu(ele)
  //     })
  //     if (this.navMode == 'horizontal') {
  //       this.navBgShow = false
  //     }
  //   },
  //   openMenu() {
  //     if (this.navMode == 'horizontal') {
  //       this.navBgShow = true
  //     }
  //   },

  //   closeMenu() {
  //     if (this.navMode == 'horizontal') {
  //       this.navBgShow = false
  //     }
  //   },

  //   closeAll() {
  //     let openMenu = this.$refs.navbar.openedMenus.concat([])
  //     openMenu = openMenu.reverse()
  //     openMenu.forEach(ele => {
  //       this.$refs.navbar.closeMenu(ele)
  //     })
  //     if (this.navMode == 'horizontal') {
  //       this.navBgShow = false
  //     }
  //   }
  // },
  components: {
    NavBarItem: NavBarItem
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >

.el-submenu__title {
  font-size: 16.5px;
}
.el-menu-item.is-active {
  background-color: #000 !important;
}
.el-menu-item {
  font-size: 13.5px;
}
.el-submenu .el-menu-item {
  font-size: 16px;
}
</style>

