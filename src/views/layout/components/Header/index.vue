<template>
  <div class="wrapper">
    <el-header height="80px" style="background:#242c44">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <div class="title">
            <div>一带一路地震监测台网项目管理平台</div>
            <h5>A project management platform for seismis moonitoring network</h5>
          </div>
        </el-col>
        <el-col :span="8" id="navList">
          <span v-for="(item,index)   in  nav" :key="index" @click="goNav(item)">{{item.name}}</span>
        </el-col>
        <el-col :span="4">
          <img
            src="@/assets/images/info.png"
            alt
            style="width:30px;position:relative; top:10px;cursor:pointer;margin-right:20px"
            @click="showInfor()"
          >

          <el-dropdown>
            <span class="el-dropdown-link">
              {{ originName}}：{{ users}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="z-index:2300">
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item @click.native="go()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
export default {
  name: 'app',

  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    users() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      return user
    },
    originName() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      let origin = ''
      if (user == '李欣') {
        origin = '法人单位管理员'
      }
      if (user == '王安') {
        origin = '法人单位领导 '
      }
      return origin
    },
    nav() {
      return this.$store.state.user.menuArr
    }
  },
  methods: {
    go() {
      // alert(1);
      window.sessionStorage.clear()
      this.$router.push({ path: '/login' })
    },
    showInfor() {
      // console.log( this.$store.state.app )
      this.$store.state.app.tips = true
    },
    goNav(item) {
      this.$store.state.user.sibarArr = item.child
      this.$router.push(item.path)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.wrapper {
  #navList {
    span {
      color: #fff;
      display: inline-block;
      height: 78px;
      line-height: 78px;
      margin: 0 10px;
    }
    span:hover {
      cursor: pointer;
    }
  }
  .v-modal {
    //display: none;
    background: transparent !important;
  }
  .el-dropdown {
    height: 80px;
    line-height: 80px;
  }
  .el-dropdown:hover {
    cursor: pointer;
  }
  .exit {
    color: #fff;
    margin-left: 10px;
  }
  .exit:hover {
    cursor: pointer;
  }
  .el-color-picker--small .el-color-picker__trigger {
    top: 10px;
  }
  .el-dropdown-link {
    color: #fff;
  }
  .thema {
    color: #fff;
  }
  position: fixed;
  .title {
    div {
      color: #fff;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      margin-top: 10px;
    }
    h5 {
      margin: 0;
      height: 13px;

      line-height: 13px;

      font-size: 12px;
      color: #ffff;
      font-weight: normal;
    }
  }
  h4 {
    font-size: 15px;

    height: 20px;

    line-height: 20px;

    margin: 0;

    color: #fff;
    width: 40%;
  }

  width: 100%;
  height: 80px;
  line-height: 60px;
  z-index: 1001;
  overflow: hidden;
  .header-operations {
    margin: 0;
    position: absolute;
    right: 0;
    top: 5px;
    list-style: none;
    li {
      margin: 0;
      width: 200px;
    }
  }
}
</style>
