<template>
  <div class="login">
    <div class="loginBg"></div>
    <!--登录部分-->
    <div class="loginBox">
      <!--logo-->
      <img class="logo" src="../../assets/image/searchPicturePC/logop.png" />
      <div class="title">以图识图</div>
      <!--账号输入-->
      <div class="accountArea">
        <img src="../../assets/image/searchPicturePC/accountImg.png" />
        <input v-model="userName" placeholder="账号" />
      </div>
      <!--密码输入-->
      <div class="passwordArea">
        <img src="../../assets/image/searchPicturePC/passwordImg.png" />
        <input v-model="password" placeholder="密码" type="password" />
      </div>
      <!--<div class="tipArea">-->
      <!--<el-checkbox v-model="rember" class="loginAuto">自动登录</el-checkbox>-->
      <!--<label class="forgetPassword">忘记密码</label>-->
      <!--</div>-->
      <!--登录按钮-->
      <div class="loginBtn" @click="login">登&nbsp;&nbsp;录</div>
    </div>
    <Loading v-if="showLoading"></Loading>
    <InfoBox v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import InfoBox from "../../components/common/InfoBox";
export default {
  name: "KnowledgePcLogin",
  data() {
    return {
      userName: "",
      password: "",
      //是否记住密码
      rember: false,
      showLoading: false,
      showInfo: -1,
      errMsg: "",
      succMsg: ""
    };
  },
  components: {
    Loading,
    InfoBox
  },
  methods: {
    //登录
    login(event) {
      // 阻止页面刷新
      event.preventDefault();
      let self = this;
      //验证
      if (!self.userName) {
        self.$message.error("请输入账号");
        return;
      }
      if (!self.password) {
        self.$message.error("请输入密码");
        return;
      } else {
        self.showLoading = true;
        let formData = new FormData();
        formData.append("phone", self.userName);
        formData.append("password", self.password);
        let obj = {
          url: this.all.baseUrl + "/appuser/login",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            // 设置全局变量
            // let ipobj = {
            //   url: "https://pv.sohu.com/cityjson?ie=utf-8"
            // };
            // self.getData(ipobj).then(res => {
            //   console.log(returnCitySN);
            //   var ip = returnCitySN["cip"];
            //   localStorage.setItem("IP", ip);
            // });
            // returnCitySN---来自首页全局引入，用于用户登录时获取ip地址
            var ip = returnCitySN["cip"];
            localStorage.setItem("IP", ip);

            this.all.token = res.data.result.token;
            this.all.userMessage = res.data.result.user;
            localStorage.setItem("token", res.data.result.token);
            localStorage.setItem("userId", res.data.result.user.id);
            localStorage.setItem("phone", this.phoneNumber);
            localStorage.setItem("suitIndex", 1);
            localStorage.removeItem("ssoSign");
            let user = JSON.stringify(res.data.result.user);
            localStorage.setItem("user", user);
            localStorage.setItem("nickname", res.data.result.user.nickname);
            localStorage.setItem("headPhoto", res.data.result.user.headPhoto);
            localStorage.setItem(
              "expirationTime",
              res.data.result.user.expirationTime
            );
            localStorage.setItem(
              "expirationTimePlus",
              res.data.result.user.expirationTimePlus
            );
            //  _czc.push(["_setCustomVar","用户来源",res.data.result.user.userFrom,1]);
            //this.getOrderNum();
            // loginName identity身份设计师 phone
            // 页面跳转
            setTimeout(function() {
              self.showLoading = false;
              self.$router.push({
                path: "/knowledge/Pc"
              });
            }, 1000);
          } else {
            self.showLoading = false;
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            setTimeout(function() {
              self.errMsg = "";
              self.showInfo = -1;
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #f0f3f7;
  text-align: center;
  background-image: url("../../assets/image/searchPicturePC/loginBg.png");
}
.loginBg {
  width: 100%;
  height: 100%;
  opacity: 0.79;
  background: #000000;
  position: absolute;
}
.login .loginBox {
  width: 368px;
  margin: 0 auto;
  position: relative;
  top: calc(50vh - 170px);
  text-align: center;
}
.login .logo {
  width: 120px;
  height: auto;
  margin-bottom: 9px;
}
.login .title {
  font-family: PingFangSC-Medium;
  font-size: 40px;
  color: #ffffff;
  letter-spacing: 0;
}
.login .accountArea,
.login .passwordArea {
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-top: 40px;
  text-align: left;
}
.login .accountArea img,
.login .passwordArea img {
  width: 10.4px;
  margin-left: 14.8px;
}
.login .accountArea input,
.login .passwordArea input {
  width: 320px;
  text-indent: 10px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.25);
}
.login .passwordArea {
  margin-top: 24px;
}
.login .tipArea {
  margin-top: 27px;
  text-align: left;
}
.login .tipArea .forgetPassword {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #1890ff;
  position: relative;
  left: 192px;
  cursor: pointer;
}
.el-checkbox {
  font-weight: normal !important;
  font-family: PingFangSC-Regular !important;
  font-size: 14px !important;
  color: rgba(0, 0, 0, 0.65) !important;
}
.login .loginBtn {
  background: #1890ff;
  border-radius: 4px;
  margin-top: 24px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: #fff;
}
.login .copyright {
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  position: fixed;
  bottom: 27px;
  width: 230px;
  left: calc(50% - 110px);
}
input {
  outline: none;
  border: none;
  background: none;
}
</style>
