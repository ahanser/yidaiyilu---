
<template>
  <div class="side-nav" :class="layout">
    <el-menu
      ref="navbar"
      router
      :default-active="defActive"
      menu-trigger="click"
      background-color="#242c44"
      active-text-color="#ffd04b"
      text-color="#fff"
      :default-openeds="openeds"
    >
      >
      <nav-bar-item v-for="(item, n) in    navList " :item="item" :navIndex="String(n)" :key="n"></nav-bar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NavBarItem from "./SidebarItem";

export default {
  data() {
    return {
      navBgShow: false,
      active: "/business",
    
    };
  },

  props: ["layout"],
  computed: {
    defActive() {
      // if (this.active == "") {
      //   this.active = this.navList[0].path;
      //   alert(this.active);
      //   return this.active;
      // } else {
      return this.$route.path;
      // }
    },
    navList() {
      let arr = [];
      let user = JSON.parse(window.sessionStorage.getItem("userInfor"))
        .username;
      if (user == "李欣") {
         setTimeout(() => {
            console.log(11)
         }, 1000);
        arr = [
          {
            path: "/ss",

            name: "数据管理系统",
            icon: "el-icon-tickets",
            child: [
              {
                path: "/dashboard",
                name: "建设任务"
              },
              {
                path: "/process",
                name: "建设过程"
              },
              {
                path: "/role",
                name: "参与角色"
              },
              {
                path: "/units",
                name: "参与单位"
              },
              {
                path: "/participants",
                name: "参与人员"
              },
              {
                path: "/construction",
                name: "建设项目"
              },
              {
                path: "/knowledge",
                name: "知识库管理"
              },
              {
                path: "/contract",
                name: "合同管理"
              }
            ]
          }
        ];
      }

      if (user == "王安") {
           setTimeout(() => {
            console.log(22)
         }, 1000);
       
        arr = [
          {
            path: "/ss",

            name: "业务管理系统",
            icon: "el-icon-document",
            child: [
              {
                path: "/business",
                name: "业务管理"
              },
              {
                path: "/Financial",
                name: "财务明细统计"
              },
              {
                path: "/progress",
                name: "分项目进度统计"
              }
            ]
          }
        ];
      }

      if (arr[0].child) {
        this.$router.push({ path: arr[0].child[0].path });
      } else {
        this.$router.push({ path: arr[0].path });
      }
      // this.defActive = "/business";
      return arr;
    }
  },

  watch: {},
  mounted() {},
  methods: {
    selectMenu(index, indexPath) {
      /**
    
                         * 在选择父级菜单时自动关闭其下所有子菜单
    
                         * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
    
                         * 关闭位于当前打开菜单中该索引值之后的全部菜单
    
                         */
      let openedMenus = this.$refs.navbar.openedMenus;
      let openMenuList;
      // 如果点击的是二级菜单，则获取其后已经打开的菜单
      if (indexPath.length > 1) {
        let parentPath = indexPath[indexPath.length - 2];
        openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1);
      } else {
        openMenuList = openedMenus;
      }
      // 关闭菜单
      openMenuList = openMenuList.reverse();
      openMenuList.forEach(ele => {
        this.$refs.navbar.closeMenu(ele);
      });
      if (this.navMode == "horizontal") {
        this.navBgShow = false;
      }
    },
    openMenu() {
      if (this.navMode == "horizontal") {
        this.navBgShow = true;
      }
    },

    closeMenu() {
      if (this.navMode == "horizontal") {
        this.navBgShow = false;
      }
    },

    closeAll() {
      let openMenu = this.$refs.navbar.openedMenus.concat([]);
      openMenu = openMenu.reverse();
      openMenu.forEach(ele => {
        this.$refs.navbar.closeMenu(ele);
      });
      if (this.navMode == "horizontal") {
        this.navBgShow = false;
      }
    }
  },
  components: {
    NavBarItem: NavBarItem
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.el-submenu__title {
  font-size: 13.5px;
}
.el-menu-item.is-active {
  background-color: #000 !important;
}
.el-menu-item {
  font-size: 13.5px;
}
.el-submenu .el-menu-item {
  font-size: 13px;
}
</style>

