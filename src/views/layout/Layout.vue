<template>
  <div :class="classObj" class="app-wrapper">
  
    <Header/>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
   
      <navbar/>
          <div class="fullScreen" v-show="this.$route.path=='/'?true:false">
            <img src="../../../static/homePage.png" alt="">
          </div>
         
      <app-main/>
  
       <inforTips/>
      
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain, Header,inforTips } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",

  components: {
    Navbar,
    Sidebar,
    AppMain,
    Header,
    inforTips
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    },
   
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  },


 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  //overflow: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
 .fullScreen{
      width: 87%;
      height: 807px;
    img{
    width: 116%;
    height: 100%;
    display: block;
    }
  }
</style>
