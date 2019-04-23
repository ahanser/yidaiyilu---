<template>
  <div class="login-container" :style="note">
    <h3 class="title">
      <img src="@/assets/images/logoPic.png" alt>
      一带一路地震监测台网项目管理平台
    </h3>
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h5>登录</h5>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="off"
          placeholder="请输入用户名..."
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="off"
          placeholder="请输入密码..."
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; background:#ffae00;border:none;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
// import bg from ''
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      note: {
        backgroundImage: "url(" + require("../../assets/images/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
        // marginTop: "5px",
      },
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      window.sessionStorage.setItem(
        "userInfor",
        JSON.stringify(this.loginForm)
      );
      this.$router.push({ path: this.redirect || "/" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-form-item__content {
    background: #fff;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 30px;
      line-height: 30px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    text-align: center;
    font-weight: bold;
    position: absolute;
    // margin-top: 30px;
    width: 100%;
    margin: 0 auto;
    top: 12%;
    height: 50px;
    line-height: 50px;
    img {
      width: 40px;
      position: relative;
      top: 12px;
      line-height: 40px;
    }
  }
  position: fixed;
  height: 100%;
  width: 100%;
  // background:url("../../assets/bg.png")
  // background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    max-width: 450px;
    width: 30%;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    background: #fff;
    margin-top: 15%;
    border-radius: 10px;
  }
  h5 {
    color: #000;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
