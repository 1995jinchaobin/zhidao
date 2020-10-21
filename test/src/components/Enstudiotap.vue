<template>
  <div class="nav">
    <div class="logoBox">
      <img src="../assets/logo.png" alt />
      <img v-if="showQfc" class="qfc" src="../assets/image/qfclogo.png" alt />
    </div>
    <ul class="navBox">
      <li
        v-for="(item,index) in arr"
        :key="'list'+index"
        @click="change(index)"
        :class="showBack[index]?'hoverLi':''"
      >{{item.name}}</li>
      <li :class="{show: lang}">
        <span @click="langClick">{{langName}}</span>
      </li>
    </ul>
    <div class="rightBox">
      <!--            <div class="vipBox">
                <img @click="toVip" :src="vipImg" alt="">
      </div>-->
      <div class="avator" @mouseenter="downChange" @mouseleave="topChange">
        <img @click="toUser" class="avatorImg" :src="user.headPhoto" alt />
        <ul v-if="showChange">
          <li @click="changeClick(index)" v-for="(item,index) in peopleList" :key="index">{{item}}</li>
        </ul>
        <img v-if="showChange" class="avatorBox" src="../assets/image/cut/change_pass.png" alt />
      </div>
      <div class="down" @mouseleave="upDown" @mouseenter="toDown">
        <img class="downImg" src="../assets/image/cut/more.png" alt />
        <ul @mouseleave="leaveLink" class="downList" v-if="showList">
          <li v-for="(item,index) in navList" :key="index" @click="toLink(index)">{{item}}</li>
        </ul>
        <img class="image" v-if="showList" src="../assets/image/cut/tangle.png" alt />
        <div class="custom" v-if="showService">
          <div>Customer service hotline：{{number}}</div>
        </div>
      </div>
    </div>
    <div class="model" v-if="showDebunk">
      <div class="debunkBox">
        <span @click="delDebunk" class="delBox"></span>
        <img class="debunkimg" src="../assets/image/debunk.png" alt />
        <div class="debunk">
          <p>We value every feedback you receive</p>
          <p>Please describe the problems or suggestions you encounter accurately, and we will strive to improve them</p>
          <form action>
            <label class="round" for>
              <div v-for="(item,index) in debunkArr" :key="index">
                <input
                  type="radio"
                  class="radioBox"
                  name="select"
                  @click="changeInput(index)"
                  :checked="item.isCheck"
                />
                <div class="backImg"></div>
                <span>{{item.name}}</span>
              </div>
            </label>
            <label for>
              <textarea
                v-model="textValue"
                class="advice"
                placeholder="Please leave your valuable comments or suggestions. We will try our best to improve them"
              ></textarea>
            </label>
            <label for class="upBox">
              <div class="addBox" v-if="!showPicture">
                <input
                  class="file"
                  id="uploaderInput"
                  accept="image/*"
                  multiple
                  type="file"
                  @change="add"
                />
                <img class="addPic" src="../assets/image/user/up.png" alt />
                <span>Upload pictures</span>
              </div>
              <div class="picBox" v-if="showPicture">
                <img class="picture" :src="localUrl" alt />
                <span @click="del" class="del"></span>
              </div>
            </label>
            <label for>
              <button class="btn" @click="toSubmit">Submission</button>
            </label>
          </form>
        </div>
      </div>
    </div>
    <div class="aboutUs" v-if="showAbout">
      <div class="aboutBox">
        <img src="../assets/image/login/close.png" class="aboutDel" @click="aboutDel" />
        <h3>About us</h3>
        <p v-for="(item,index) in aboutDescript" :key="index">{{item}}</p>
        <ul>
          <li v-for="(item,index) in aboutArr" :key="index">{{item.name}}: {{item.descript}}</li>
        </ul>
      </div>
    </div>
    <div v-if="showPassword" class="passwordModel">
      <div v-if="showFirst" class="passwordBox">
        <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
        <h5>Change Password</h5>
        <label for>
          <span class="passSpan">Phone number:</span>
          <input :value="phone" type="text" readonly />
        </label>
        <label for>
          <span class="passSpan">Verification Code:</span>
          <input v-model="code" maxlength="4" type="text" placeholder="Code" />
          <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
          <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
        </label>
        <button @click="passNext" class="passBtn">Next step</button>
      </div>
      <div v-if="showSecond" class="passwordBox">
        <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
        <h5>Change Password</h5>
        <label for>
          <span class="passSpan">Enter a new password:</span>
          <input v-model="password" type="password" placeholder="New password" />
        </label>
        <label for>
          <span class="passSpan">Confirm password:</span>
          <input v-model="surePassword" type="password" placeholder="Enter password again" />
        </label>
        <button @click="passSuccess" class="passBtn">Complete</button>
      </div>
    </div>
    <div v-if="showBind" class="passwordModel">
      <div class="passwordBox">
        <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
        <h5>Bind Phone</h5>
        <label for>
          <span class="passSpan">Phone:</span>
          <input placeholder="Phone" v-model="myphone" maxlength="11" type="text" />
        </label>
        <label for>
          <span class="passSpan">Code:</span>
          <input v-model="mycode" maxlength="4" type="text" placeholder="Code" />
          <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
          <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
        </label>
        <button @click="bindPhone" class="passBtn">Determine</button>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>
  </div>
</template>
<script>
let date = new Date();
import Jump from "../components/Jump";
import Scroll from "../assets/js/scroll.js";
export default {
  name: "Ennav",
  components: {
    Jump
  },
  props: {
    tabIndex: Number,
    studio: "",
    headPicture: {
      type: String,
      default: ""
    },
    path: String
  },
  data() {
    return {
      showJump: false,
      err: "",
      // 导航栏内容
      // ,{name: "Personal Center",link: "/Enuser"}
      arr: [
        { name: "Studio management", link: "/Enstudio" },
        { name: "Material Management", link: "/EnMaterialManagement" },
        { name: "Flower management", link: "/EnFlowerManagement" },
        { name: "Transaction management", link: "/EnTransactionManagement" },
        { name: "My ledger", link: "/EnMyLeader" },
        { name: "Regulations", link: "/EnRegulations" }
      ],
      // 控制导航栏颜色变化
      showBack: [],
      // 存储用户信息
      user: {},
      // 右侧下拉列表内容
      peopleList: ["Password", "Exit"],
      navList: ["Switching", "Feedback", "Contact us", "About us"],
      // 修改密码退出登陆等按钮
      showChange: false,
      // 控制个人中心等内容显示
      showList: false,
      // 客服内容
      showService: false,
      phone: localStorage.getItem("phone"),
      // vip图片路径
      vipImg: "",
      showDebunk: false,
      // 关于我们弹窗相关
      showAbout: false,
      aboutDescript: [
        "Zhejiang Youchai Technology Co., Ltd. is an Internet enterprise dedicated to intelligent design of textile and garment patterns. Companies rely on cloud computing, big data, artificial intelligence and other innovative technologies, through the industrial Internet model to empower traditional industries, to achieve the re-enhancement of the efficiency of traditional industries.",
        "In the future, Youchai Technology will continue to explore and innovate in the pattern intelligent design of professional flexible fabrics to provide better service to customers.",
        "Zhidao, make design simpler, strive to be a pioneer in pattern design industry."
      ],
      aboutArr: [
        {
          name: "Address：",
          descript:
            "Room 1703,Yinyin International Building,Keqiao District,Shaoxing City"
        },
        { name: "Official website：", descript: "http://www.youchaikj.com/" },
        { name: "Contact us：", descript: "0570-89985016/13429536658" }
      ],
      number: "0570-89985016",
      langName: "中文",
      // 选择语言
      lang: false,
      showLang: false,
      langList: [
        { name: "中文", show: false },
        { name: "English", show: true }
      ],
      // 反馈
      textValue: "",
      url: "",
      // 选择问题
      debunkArr: [
        { name: "Use recommendations", isCheck: false },
        { name: "Fault Error", isCheck: false },
        { name: "Content omission", isCheck: false },
        { name: "Other", isCheck: false }
      ],
      localUrl: "",
      showPicture: false,
      showPassword: false,
      showFirst: false,
      showSecond: false,
      codeNumber: "Get Code",
      clock: null,
      showCode: true,
      code: "",
      password: "",
      surePassword: "",
      showQfc: false,
      showBind: false,
      myphone: "",
      mycode: ""
    };
  },
  methods: {
    // 绑定手机号
    bindPhone(e) {
      let self = this;
      e.preventDefault();
      let formData = new FormData();
      if (this.myphone == "" || this.mycode == "") {
        this.showJump = true;
        this.err = "Input cannot be empty";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (!/^1[3456789]\d{9}$/.test(this.myphone)) {
        this.showJump = true;
        this.err = "Incorrect format of mobile phone number";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.myphone);
        formData.append("code", this.mycode);
        let obj = {
          url: this.all.baseUrl + "/appuser/phoneBind",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "Binding success";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showBind = false;
              localStorage.setItem("phone", this.myphone);
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "Your account has landed elsewhere";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    // 点击语言
    langChange(index) {
      this.langList.map(function(item) {
        item.show = false;
      });
      this.langList[index].show = true;
      this.lang = false;
      if (index == 0) {
        localStorage.removeItem("English");
        this.$emit("showEnglish", this.path);
      } else if (index == 1) {
        localStorage.setItem("English", true);
      }
    },
    // 密码关闭
    passClose() {
      this.showBind = false;
      this.showPassword = false;
      this.showFirst = false;
      this.showSecond = false;
      window.clearInterval(this.clock);
      this.showCode = true;
      this.codeNumber = "Get Code";
    },
    passNext(e) {
      e.preventDefault();
      let self = this;
      let formData = new FormData();
      if (this.code == "") {
        this.showJump = true;
        this.err = "Verification code cannot be empty";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.phone);
        formData.append("code", this.code);
        let obj = {
          url: this.all.baseUrl + "/userverify/check",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showFirst = false;
            this.showSecond = true;
            this.showCode = true;
            this.codeNumber = "Get Code";
            window.clearInterval(this.clock);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "Your account has landed elsewhere";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    // 获取验证码
    getCode() {
      let self = this;
      let formData = new FormData();
      if (this.showQfc) {
        formData.append("phone", this.myphone);
      } else {
        formData.append("phone", this.phone);
      }
      let obj = {
        url: this.all.baseUrl + "/userverify/send",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showCode = false;
          this.codeNumber = 59 + "s";
          this.clock = setInterval(function() {
            if (parseInt(self.codeNumber) == 0) {
              clearInterval(self.clock);
              self.showCode = true;
              self.codeNumber = "Get Code";
            } else {
              self.codeNumber = parseInt(self.codeNumber) - 1 + "s";
            }
          }, 1000);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = "Your account has landed elsewhere";
          localStorage.clear();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.$router.push({
              path: "/Login"
            });
          }, 1500);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        }
      });
    },
    passSuccess(e) {
      let self = this;
      e.preventDefault();
      let formData = new FormData();
      if (this.password == "" || this.surePassword == "") {
        this.showJump = true;
        this.err = "Input cannot be empty";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (this.password != this.surePassword) {
        this.showJump = true;
        this.err = "Two inconsistencies in password input";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.phone);
        formData.append("code", this.code);
        formData.append("password", this.password);
        let obj = {
          url: this.all.baseUrl + "/appuser/resetPassByCode",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "Successful revision";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showPassword = false;
              self.showFirst = false;
              self.showSecond = false;
              localStorage.setItem("password", this.password);
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "Your account has landed elsewhere";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    toUser() {
      this.$router.push({
        path: "/Enuser"
      });
    },
    // 切换语言
    langClick() {
      // this.lang = !this.lang;
      if (this.langName == "EN") {
        localStorage.setItem("English", true);
        this.langName = "中文";
      } else if (this.langName == "中文") {
        localStorage.removeItem("English");
        this.langName = "EN";
        this.$emit("showEnglish", this.path);
      }
    },
    // 点击左上角返回首页
    toBack() {
      this.$router.push({
        path: "/Enselect"
      });
    },
    // 去开通会员或查看会员信息
    toVip() {
      this.$router.push({
        path: "Envip"
      });
    },
    // 点击右侧nav按钮
    toDown() {
      this.showList = true;
      this.showService = false;
    },
    upDown() {
      this.showList = false;
    },
    leaveLink() {
      this.showService = false;
    },
    // 头像移入移出效果
    downChange() {
      this.showChange = true;
    },
    topChange() {
      this.showChange = false;
    },
    // 点击修改密码以及退出登陆
    changeClick(index) {
      if (index == 0 && !this.showQfc) {
        // 弹窗
        this.showPassword = true;
        this.showFirst = true;
        this.showSecond = false;
      } else if (index == 0 && this.showQfc) {
        this.showBind = true;
      } else if (index == 1) {
        localStorage.clear();
        this.$router.push({
          path: "/Login"
        });
      }
      this.$forceUpdate();
    },
    // 点击最右侧导航的标志
    toLink(index) {
      let self = this;
      switch (index) {
        // 切换频道未开放
        case 0:
          this.$router.push({
            path: "/Enselect"
          });
          break;
        // 反馈页面
        case 1:
          this.showDebunk = true;
          Scroll.stop();
          break;
        case 2:
          this.showService = true;
          break;
        // 关于我们弹窗
        case 3:
          this.showAbout = true;
          break;
      }
    },
    auto() {
      // 改变颜色
      for (var i = 0; i < this.arr.length; i++) {
        this.showBack.push(false);
      }
      this.showBack[this.tabIndex] = true;
    },
    // 切换
    change(index) {
      
      let self=this;
      if (this.studio == 2) {
        // this.showJump = true;
        // this.err = "没获取到工作室信息";
        // setTimeout(function() {
        //   self.showJump = false;
        //   self.err = "";
        // }, 1000);
        alert("未获取到工作室信息即将跳转");
        setTimeout(function() {
          self.$router.push({
            path: "/Studio"
          });
        }, 1000);
      }
      if (index == 5) {
        let newJson = {
          type: 5
        };
        localStorage.setItem("threedNewjson", JSON.stringify(newJson));
      }
      this.$router.push({
        path: this.arr[index].link
      });
    },
    // 获取信息
    getMessage() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (!this.user.headPhoto) {
        this.user.headPhoto = require("../assets/image/user/avator.png");
      }
      // 判断企业会员或者个人会员
      if (date.getTime() < parseInt(this.user.expirationTimePlus)) {
        this.vipImg = require("../assets/image/cut/bussiness.png");
      } else if (date.getTime() < parseInt(this.user.expirationTime)) {
        this.vipImg = require("../assets/image/cut/people.png");
      } else {
        this.vipImg = require("../assets/image/cut/owner.png");
      }
    },
    // 删除关于我们
    aboutDel() {
      this.showAbout = false;
    },
    // 提交反馈获取后台图片
    toSubmit(event) {
      event.stopPropagation();
      event.preventDefault();
      let self = this;
      // 判断文本框内是否有内容
      if (this.textValue == "") {
        this.showJump = true;
        Scroll.stop();
        this.err = "Please describe a specific point";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          Scroll.move();
        }, 2000);
      } else {
        let formData = new FormData();
        formData.append("file", this.url);
        let obj = {
          url: this.all.baseUrl + "/file/upload",
          formdata: formData
        };
        this.getData(obj).then(res => {
          this.func(res.data.result);
        });
      }
    },
    // 进行真正的反馈
    func(string) {
      let obj = new FormData();
      let temp;
      for (let i = 0; i < this.debunkArr.length; i++) {
        if (this.debunkArr[i].isCheck == true) {
          switch (i) {
            case 0:
              temp = 1;
              break;
            case 1:
              temp = 2;
              break;
            case 2:
              temp = 3;
              break;
            case 3:
              temp = 0;
              break;
          }
        } else {
          temp = 0;
        }
      }
      // 参数 token userId feedbackType反馈类型 content内容 picUrl图片路径 phone电话 name用户昵称 appType 1
      // 反馈类型：0其他，1使用建议，2故障错误，3内容漏缺
      obj.append("appType", 1);
      obj.append("picUrl", string);
      obj.append("content", this.textValue);
      obj.append("feedbackType", temp);
      obj.append("phone", localStorage.getItem("phone"));
      obj.append("name", localStorage.getItem("name"));
      let data = {
        url: this.all.baseUrl + "/feedBack/save",
        formdata: obj
      };
      this.getData(data).then(res => {
        // 反馈成功
        this.showJump = true;
        Scroll.stop();
        let self = this;
        if (res.data.status == 0) {
          this.err = "Thank you very much for your feedback!";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        } else {
          this.err = "Feedback failure!";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      });
    },
    // 用来记录单选框checked值
    changeInput(index) {
      for (let i = 0; i < this.debunkArr.length; i++) {
        if (i == index) {
          this.debunkArr[i].isCheck = true;
        } else {
          this.debunkArr[i].isCheck = false;
        }
      }
    },
    delDebunk() {
      this.showDebunk = false;
      Scroll.move();
    },
    // 添加图片
    add(e) {
      let self = this;
      if (e.target.files.length > 1) {
        this.showJump = true;
        this.err = "Cannot select multiple pictures";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let files = e.target.files[0];
        this.url = files;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.localUrl = this.result;
          self.showPicture = true;
        };
      }
    },
    // 删除图片
    del() {
      this.showPicture = false;
    }
  },
  mounted() {
    if (localStorage.getItem("qfc")) {
      this.showQfc = true;
      this.aboutDescript = [
        "This pattern design product is jointly developed by Zhejiang China Textile City Network Co., Ltd. and Zhejiang Youchai Technology Co., Ltd.",
        "Zhejiang China Textile City Network Co., Ltd. is a high-tech enterprise devoted to textile industry informationization, e-commerce research and product development. It was founded in June 2000 and was jointly invested by China Textile City Group Co., Ltd. and Zhejiang University. It is now a listed company with shares in Zhejiang China Textile City Group. The subsidiary company of Limited Company."
      ];
      this.aboutArr = [
        {
          name: "Address：",
          descript:
            "3rd Floor of Zhongfang Building, Keqiao District, Shaoxing City, Zhejiang Province"
        },
        {
          name: "Official website：",
          descript:
            "Global Textile Network https://www.tnc.com.cn/ Online Textile City https://www.qfc.cn/"
        },
        { name: "Contact us：", descript: "400-119-0123" },
        { name: "Technical support：", descript: "Zhejiang Youchai Technology" }
      ];
      this.number = "400-119-0123";
      this.peopleList = ["Binding", "Exit"];
    }
    if (localStorage.getItem("English")) {
      this.langName = "中文";
    } else {
      this.langName = "EN";
    }
    this.auto();
    this.getMessage();
  },
  watch: {
    headPicture(newValue, oldValue) {
      this.user.headPhoto = newValue;
      this.$forceUpdate();
    }
  },
  beforeDestroy() {
    window.clearInterval(this.clock);
  }
};
</script>
<style scoped>
.nav {
  height: 60px;
  background: #fff;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
  border-bottom: 1px solid #eee;
}
.logoBox {
  float: left;
  overflow: hidden;
  margin: 13px 215px 0 122px;
}
.logoBox img {
  width: 81px;
  height: auto;
  float: left;
  display: block;
}
.logoBox img.qfc {
  width: 100px;
  margin-left: 10px;
  padding-top: 5px;
}
ul.navBox {
  float: left;
  height: 60px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
  box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  /* margin-left: 20px; */
}
ul.navBox li {
  float: left;
  padding: 0 0;
  margin-right: 52px;
  box-sizing: border-box;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  position: relative;
}
ul.navBox li.hoverLi,
ul.navBox li:hover {
  color: #133ffc;
}
ul.navBox li:last-child {
  text-align: center;
}
ul.navBox li:last-child:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 16px;
  top: 0.125rem;
  left: 0.3125rem;
  background: #ddd;
}
.rightBox {
  float: right;
}
.vipBox {
  float: left;
}
.vipBox img {
  display: block;
  width: 70px;
  margin: 17px 35px 0 0;
}
.avator {
  float: left;
  position: relative;
  height: 60px;
  box-sizing: border-box;
  padding-top: 15px;
}
.avatorImg {
  display: block;
  width: 30px;
  height: 30px;
  background: #eee;
  border-radius: 50%;
  margin-right: 48px;
}
.avatorBox {
  position: absolute;
  z-index: 88;
  left: 0;
  top: 60px;
  width: 6.4375rem;
  height: 5rem;
}
.avator ul {
  position: absolute;
  z-index: 3333;
  left: 0;
  top: 60px;
  width: 6.4375rem;
}
.avator ul li {
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.875rem;
  text-align: center;
  cursor: default;
  color: rgba(51, 51, 51, 0.8);
}
.avator ul li:hover {
  color: #333;
}
.down {
  float: left;
  height: 60px;
  margin-right: 73px;
  position: relative;
}
.downImg {
  display: block;
  width: 20px;
  padding: 28px 0 0 0;
}
.down .image {
  position: absolute;
  z-index: 4445;
  top: 60px;
  left: -1.5rem;
  width: 6.625rem;
  height: 8.75rem;
}
.downList {
  position: absolute;
  z-index: 4446;
  left: -1.5rem;
  top: 60px;
}
.downList li {
  width: 6.625rem;
  height: 2.1875rem;
  line-height: 2.1875rem;
  font-size: 0.875rem;
  color: rgba(51, 51, 51, 0.8);
  cursor: default;
}
.downList li:hover {
  color: #333;
}
.aboutUs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(187, 187, 187, 0.6);
  z-index: 9999;
}
.aboutBox {
  width: 65.25rem;
  height: 39.875rem;
  position: absolute;
  top: calc(50vh - 19.9375rem);
  left: calc(50% - 32.625rem);
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0 2.9375rem;
  box-sizing: border-box;
}
.aboutDel {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: default;
  font-size: 1.875rem;
  width: 1.625rem;
  height: 1.625rem;
}
.aboutBox h3 {
  padding-top: 1.8125rem;
  font-size: 1.875rem;
  text-align: center;
  color: #333;
  margin-bottom: 2.1875rem;
  font-weight: normal;
}
.aboutBox p {
  text-align: left;
  font-size: 1rem;
  color: #333;
  margin-bottom: 2.1875rem;
}
.aboutBox ul {
  margin-top: 0.25rem;
  text-align: left;
  font-size: 1rem;
  color: #333;
}
.custom {
  position: absolute;
  width: 22.5rem;
  height: 10rem;
  border-radius: 0.625rem;
  background: #fff;
  z-index: 999;
  border: 1px solid #b9b9b9;
  right: 4rem;
  top: 80px;
  color: #2c2e30;
  font-weight: normal;
  font-size: 1.25rem;
  box-sizing: border-box;
  line-height: 10rem;
}
.model {
  position: fixed;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.debunkBox {
  position: absolute;
  display: flex;
  background: #fff;
  width: 62.5rem;
  height: 42.5rem;
  box-sizing: border-box;
  padding-top: 2.5rem;
  left: calc(50% - 31.25rem);
  top: 3.125rem;
  border-radius: 0.625rem;
}
.debunkimg {
  width: 27.0625rem;
  height: 21.5625rem;
  display: block;
  margin-left: 2.0625rem;
  margin-top: 7.5625rem;
}
.debunk {
  margin-left: 3.4375rem;
  text-align: left;
  padding-top: 4.875rem;
  width: 25rem;
}
.debunk p {
  color: #333;
  font-size: 1.125rem;
}
.debunk form {
  display: block;
  margin-top: 0.625rem;
}
form label {
  display: block;
}
label.round {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.round div {
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.875rem;
}
.round input {
  display: block;
  position: absolute;
  left: 0;
  top: calc(50% - 0.5625rem);
  width: 1.125rem;
  height: 1.125rem;
  opacity: 0;
  z-index: 999;
}
.backImg {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  overflow: hidden;
  background: url("../assets/image/login/noselect.png") no-repeat center center;
  background-size: 100%;
  margin-right: 0.3125rem;
}
.round input:checked + .backImg {
  background: url("../assets/image/login/hasselect.png") no-repeat center center;
  background-size: 100%;
}
.advice {
  display: block;
  width: 100%;
  height: 11.0625rem;
  margin-bottom: 0.625rem;
  box-sizing: border-box;
  padding: 0.625rem;
}
label.upBox {
  position: relative;
}
.addBox,
.picBox {
  position: relative;
  width: 4.375rem;
  height: 4.375rem;
  border: 1px solid #cacaca;
  color: #333;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 0.3125rem;
  justify-content: center;
}
.addBox input {
  display: block;
  width: 4.375rem;
  height: 4.375rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 222;
  opacity: 0;
}
.addPic {
  display: block;
  width: 1.5rem;
  margin-bottom: 0.3125rem;
}
label .btn {
  display: block;
  width: 7.375rem;
  height: 2.125rem;
  text-align: center;
  border: none;
  background: #133ffc;
  border-radius: 0.3125rem;
  line-height: 2.125rem;
  color: #fff;
  outline: none;
  margin-top: 1.25rem;
}
.picBox img {
  display: block;
  width: 4.375rem;
  height: 4.375rem;
}
.picBox .del {
  position: absolute;
  width: 0.875rem;
  height: 0.875rem;
  top: 0.25rem;
  right: 0.125rem;
  background: url("../assets/image/login/close.png") no-repeat center;
  background-size: 100%;
}
.delBox {
  position: absolute;
  background: url("../assets/image/login/close.png") no-repeat center;
  background-size: 100%;
  width: 1.5625rem;
  height: 1.5625rem;
  right: 1.25rem;
  top: 1.25rem;
}
.passwordModel {
  position: fixed;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
}
.passClose {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;
}
.passwordBox {
  position: absolute;
  background: #fff;
  z-index: 9999;
  width: 25rem;
  height: 17.5rem;
  left: calc(50% - 12.5rem);
  box-sizing: border-box;
  border-radius: 0.625rem;
  top: calc(50% - 8.725rem);
  padding: 1rem 1rem;
}
.passwordBox h5 {
  font-weight: normal;
  text-align: left;
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.875rem;
}
.passwordBox label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
}
.passSpan {
  font-size: 1rem;
  width: 6.25rem;
  text-align: left;
  color: #333;
  margin-right: 0.3125rem;
}
.passwordBox input {
  border: 1px solid #d8d8d8;
  border-radius: 0.5rem;
  box-sizing: border-box;
  outline: none;
  width: 12.5rem;
  height: 2.5rem;
  padding-left: 0.5rem;
}
.passBtn {
  width: 7.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  border: none;
  outline: none;
  background: #133ffc;
  color: #fff;
  position: absolute;
  left: calc(50% - 3.75rem);
  bottom: 1rem;
}
.codeNumber {
  position: absolute;
  color: #133ffc;
  right: 3rem;
  top: 0;
  font-size: 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
</style>