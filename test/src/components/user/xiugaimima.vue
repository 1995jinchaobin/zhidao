<template>
  <div class="xiugai">
    <div class="header">
      <div class="headerTitle">修改密码</div>
    </div>
    <div class="box1">
      <div>手机号：</div>
      <input v-model="phone" readonly type="text" />
      <img class="imga" :src="img1" alt />
      <button v-if="showCode" @click="getCode()" class="yellow1">{{codeNumber}}</button>
      <button v-if="!showCode" class="yellow1">{{codeNumber}}s</button>
    </div>
    <div class="box2">
      <div>验证码：</div>
      <input v-model="yanzhengma" placeholder="输入验证码" type="text" />
      <img class="imga imgCode" :src="img2" alt />
      <div class="tishi" v-if="isTrueCode">
        <img class="imgb" :src="img5" alt />
      </div>
      <div class="tishi" style="color:#D81E06" v-if="err1!=''">
        <img class="imgb" :src="img6" alt />
        <span>{{err1}}</span>
      </div>
    </div>
    <div class="box3">
      <div>新密码：</div>
      <input v-model="pass" placeholder="输入新密码" :type="needShowPass?'text':'password'" />
      <img class="imga imgPas" @click="changePassShow(1)" :src="needShowPass?img3:img4" alt />
      <div class="tishi" v-if="isTruePass">
        <img class="imgb" :src="img5" alt />
      </div>
      <div class="tishi" style="color:#D81E06" v-else-if="err2!=''">
        <img class="imgb" :src="img6" alt />
        <span>{{err2}}</span>
      </div>
    </div>
    <div class="box4">
      <div>确认新密码：</div>
      <input v-model="newpass" placeholder="确认新密码" :type="needShowSurePass?'text':'password'"/>
      <img class="imga imgSurePass" @click="changePassShow(2)" :src="needShowSurePass?img3:img4" alt />
      <div class="tishi" v-if="isTrueSurePass">
        <img class="imgb" :src="img5" alt />
      </div>
      <div class="tishi" style="color:#D81E06" v-if="err3!=''">
        <img class="imgb" :src="img6" alt />
        <span>{{err3}}</span>
      </div>
    </div>
    <button class="upload" @click="submit()">确认修改</button>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
import InfoBox from '@/components/common/InfoBox';
export default {
  name: "xiugaimima",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab,
    InfoBox
  },
  data() {
    return {
      path: "/xiugaimima",
      phone: localStorage.getItem("phone"),
      yanzhengma: "",
      pass: "",
      newpass: "",
      img1: require("../../assets/image/user/手机.png"),
      img2: require("../../assets/image/user/clock.png"),
      img3: require("../../assets/image/user/eye1.png"),
      img4: require("../../assets/image/user/eye2.png"),
      img5: require("../../assets/image/user/dagou-2.png"),
      img6: require("../../assets/image/user/cuo.png"),
      err1: '',
      err2: '',
      err3: '',
      isTrueCode:false,
      isTruePass:false,
      isTrueSurePass:false,
      clock: null,
      codeNumber: "获取验证码",
      showCode: true,
      //是否显示提示框-1不显示，0:显示成功，1：显示警告
      showInfo:-1,
      errMsg:'',
      succMsg:'',
      //是否显示密码
        needShowPass:false,
        needShowSurePass:false
    };
  },
  methods: {
    submit(e) {
      let self = this;
      
      let formData = new FormData();
      if (this.yanzhengma == "" ) {
        this.err1 = "验证码不能为空";
      } else {
        this.err1 = '';
        this.isTrueCode=true;
      }
      if (this.pass=='') {
          this.err2 = "密码不能为空";
      } else if(this.pass.length<6) {
          this.err2 = "密码不能小于6位";
      } else {
          this.err2 = '';
          this.isTruePass=true;
      }
      if (this.newpass=='') {
          this.err3 = "确认密码不能为空";
      }  else if (this.pass != this.newpass) {
          this.err3 = "密码与确认密码不一致";
      } else {
          this.err1='';
          this.err2='';
          this.err3='';
          this.isTrueSurePass=true
        formData.append("phone", this.phone);
        formData.append("code", this.yanzhengma);
        formData.append("password", this.pass);
        let obj = {
          url: this.all.baseUrl + "/appuser/resetPassByCode",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
              self.succMsg = res.data.msg;
              self.showInfo = 0;
              //清空数据
              self.yanzhengma=''
              self.pass='';
              self.newpass='';
              Scroll.stop();
              setTimeout(function(){
                  self.showInfo = -1;
                  self.succMsg = '';
                  Scroll.move();
                  self.$router.push({
                      path: "/Login"
                  });
              },1000);
          } else if (res.data.status == -95) {
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
                self.$router.push({
                    path: "/Login"
                });
            },1000);
          } else {
              self.errMsg = res.data.msg;
              self.showInfo = 1;
              Scroll.stop();
              setTimeout(function(){
                  self.showInfo = -1;
                  self.errMsg = '';
                  Scroll.move();
              },1000);
          }
        });
      }
    },
    getCode() {
      let self = this;
      let formData = new FormData();
      formData.append("phone", this.phone);
      let obj = {
        url: this.all.baseUrl + "/new/verify/sendVerifyOfMG",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showCode = false;
          this.codeNumber = 59;
          this.clock = setInterval(function() {
            if (parseInt(self.codeNumber) == 0) {
              clearInterval(self.clock);
              self.showCode = true;
              self.codeNumber = "验证码";
            } else {
              self.codeNumber = self.codeNumber - 1;
              self.$forceUpdate();
            }
          }, 1000);
        } else if (res.data.status == -95) {
            self.showJump = true;
            self.err = res.data.msg;
            Scroll.stop();
            setTimeout(function(){
                self.showJump = false;
                self.err = '';
                localStorage.clear();
                Scroll.move();
                self.$router.push({
                    path: '/Login'
                });
            },1500);
        } else {
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
        }
      });
    },
    //切换密码显示方式
    changePassShow(type){
      if(type==1){
          this.needShowPass= !this.needShowPass;
      } else if(type==2){
          this.needShowSurePass = !this.needShowSurePass;
      }
    }
  },
  mounted: {}
};
</script>

<style scoped>
.xiugai {
  height: 1170px;
  background: #fff;
  border: 0;
}
.yellow1 {
  background-color: #ffe300;
  position: relative;
  margin-left: 38px;
  top: 4px;
  width: 90px;
  height: 34px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.header {
  width: 100%;
  text-align: left;
  text-indent: 5%;
  border-bottom: 1px solid #cdcdcd;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: #040404;
  padding-top: 24px;
  padding-bottom: 3px;
}
input {
  width: 330px;
  height: 44px;
  border-radius: 5px;
  border: 1px solid #a5a5a5;
  margin-left: 24px;
  text-indent: 26px;
  font-size: 14px;
}
.box1 {
  text-align: left;
  text-indent: 300px;
  position: relative;
  margin-top: 26px;
}
.box2 {
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.box3 {
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.box4 {
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.box1,.box2,.box3,.box4{
  margin-bottom: 18px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #b0b0b0;
  display: flex;
}
.box1,.box2,.box3,.box4 div{
  margin-bottom: 18px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #b0b0b0;
  text-indent: 250px!important;
}
.box4 div{
  text-indent: 222px!important;
}
.tishi {
  margin-left: 38px;
  float: left;
  display: flex;
  text-align: left !important;
}
.imgb {
  width: 20px;
  height: 20px;
  margin-top: 11px;
}
.imgPas{
  width: 20px !important;
  height: 13px !important;
  margin-top: 16px !important;
  margin-left: -34px!important;
}
.imga {
  margin-top: 10px;
  width: 16px;
  height: 23px;
  margin-left: -30px;
}
.upload {
  width: 334px;
  height: 46px;
  border: 0;
  border-radius: 4px;
  margin-top: 28px;
  color: #333333;
  background: #FFE300;
  font-size: 14px;
  cursor: pointer;
}
.upload:hover,.yellow1:hover{
  background-color:  #ffd000;
}
.imgCode{
  height: 20px;
  width: 16px;
  margin-top: 11px !important;
}
  .imgSurePass{
    width: 20px;
    height: 13px;
    margin-top: 16px;
    margin-left: -34px!important;
  }
  .tishi span{
    text-align: left;
    text-indent: 0px!important;
    margin-left: 6px !important;
  }
</style>