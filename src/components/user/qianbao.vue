<template>
  <div class="xiugai">
    <div class="header">我的钱包</div>
    
    <button class="upload" @click="submit()">确认修改</button>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
export default {
  name: "xiugaimima",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab
  },
  data() {
    return {
      path: "/xiugaimima",
      phone: localStorage.getItem("phone"),
      yanzhengma: "",
      pass: "",
      newpass: "",
      img1: require("../../assets/image/user/手机.png"),
      img2: require("../../assets/image/user/验证码.png"),
      img3: require("../../assets/image/user/eye1.png"),
      img4: require("../../assets/image/user/eye2.png"),
      img5: require("../../assets/image/user/dui.png"),
      img6: require("../../assets/image/user/cuo.png"),
      err1: "",
      err2: "",
      err3: "",
      clock: null,
      codeNumber: "获取验证码",
      showCode: true
    };
  },
  methods: {
    submit(e) {
      let self = this;
      
      let formData = new FormData();
      if (this.yanzhengma == "" ) {
        this.showJump = true;
        this.err1 = "验证码不能为空";
      } else if (this.pass != this.newpass) {
        this.err3 = "两次密码不同";
      }else if(this.pass.length<6) {
        this.err2 = "密码不能小于6位";
      }
      else {
          this.err1='';
          this.err2='';
          this.err3='';
        formData.append("phone", this.phone);
        formData.append("code", this.yanzhengma);
        formData.append("password", this.pass);
        let obj = {
          url: this.all.baseUrl + "/appuser/resetPassByCode",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "修改成功";
            setTimeout(function() {
              localStorage.setItem("password", this.password);
            }, 1500);
          } else if (res.data.status == -95) {
            
            this.err = "您的账户已在其它地方登陆";
            localStorage.clear();
            setTimeout(function() {
              
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            alert(res.data.msg);          
          }
        });
      }
    },
    getCode() {
      let self = this;
      let formData = new FormData();
      formData.append("phone", this.phone);
      let obj = {
        url: this.all.baseUrl + "/userverify/send",
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
          alert("您的账户已在其它地方登陆");
          localStorage.clear();
          setTimeout(function() {
            self.$router.push({
              path: "/Login"
            });
          }, 1500);
        } else {
          alert(res.data.msg);

          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        }
      });
    }
  },
  mounted: {}
};
</script>

<style scoped>
.xiugai {
  width: 960px;
  height: 1170px;
  background: #f5f5f5;
  border: 0;
}
.yellow1 {
  background-color: yellow;
  position: absolute;
  left: 750px;
  top: 4px;
  width: 76px;
  height: 22px;
  border: 0;
  border-radius: 3px;
}
.header {
  height: 50px;
  width: 100%;
  text-align: left;
  text-indent: 20px;
  line-height: 50px;
  border-bottom: 4px solid gray;
}
input {
  width: 319px;
  height: 19px;
  border-radius: 5px;
  border: 1px solid;
  position: absolute;
  left: 400px;
  padding: 5px;
}
.box1 {
  height: 50px;
  text-align: left;
  text-indent: 300px;
  position: relative;
  margin-top: 20px;
}
.box2 {
  height: 50px;
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.box3 {
  height: 50px;
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.box4 {
  height: 50px;
  text-align: left;
  text-indent: 300px;
  position: relative;
}
.tishi {
  position: absolute;
  top: 5px;
  text-align: left;
  text-indent: 20px;
  left: 740px;
  line-height: 20px;
  width: 200px;
  height: 30px;
}
.imgb {
  position: absolute;
  left: 0;
  top: 0;
}
.imga {
  position: absolute;
  top: 4px;
  left: 708px;
}
.upload {
  width: 195px;
  height: 28px;
  border: 0;
  border-radius: 5px;
  background-color: yellow;
  margin-top: 49px;
      position: absolute;
    left: 465px;

}
</style>