<template>
  <div class="user">
    <!-- 个人中心首页 -->
    <Tab :path="path" @showEnglish="changeEnglish" :headPicture="headPhoto" :tabIndex="tabIndex"></Tab>
    <div class="box">
      <div class="leftbox">
        <div class="topbox">
          <div class="topbox1">
            <img :src="headPhoto" style="border-radius:50%;width:80px;height: 80px;" alt />
          </div>
          <div class="topbox2">{{message.nickname}}</div>
          <div class="topbox3">
            <span @click="login3">{{yonghu}}</span>
            <span @click="changeIdentity">{{message.identity}}</span>
          </div>
          <div>
            <button class="topbox4" @click="login1">开始创作</button>
          </div>
          <div>
            <button v-if="studio" class="topbox5" @click="login2">进入工作室</button>
            <button v-else class="topbox5" @click="login2">帮你作品变现</button>
          </div>
        </div>
        <div class="bottombox">
          <div class="bottombox1">
            <div class="first">作品管理</div>

            <div @click="xuanzhongf(1)" :class="xuanzhong==1?'xuanzhong2':''">
              <router-link class="else" to="/User/">我的花型</router-link>
            </div>
            <div @click="xuanzhongf(2)" :class="xuanzhong==2?'xuanzhong2':''">
              <router-link class="else" to="/User/Source">我的素材</router-link>
            </div>
            <div @click="xuanzhongf(3)" :class="xuanzhong==3?'xuanzhong2':''">
              <router-link class="else" to="/User/ColorSeparation">我的分色</router-link>
            </div>
            <div @click="xuanzhongf(4)" :class="xuanzhong==4?'xuanzhong2':''">
              <router-link class="else" to="/User/copyright">我的版权</router-link>
            </div>
          </div>
          <div class="bottombox2">
            <div class="first">订单管理</div>
            <div id="car" class="else" @click="xuanzhongf(6)" :class="xuanzhong==6?'xuanzhong2':''">
              <router-link  class="else" to='/User/Car' >购物车</router-link>
            </div>
          </div>
          <div class="bottombox3">
            <div class="first">财务管理</div>
            <div @click="xuanzhongf(7)" :class="xuanzhong==7?'xuanzhong2':''">
              <router-link class="else" to="/User/Money">我的钱包</router-link>
            </div>
            <div @click="xuanzhongf(8)" :class="xuanzhong == 8 ? 'xuanzhong2' : ''">
              <router-link class="else" to="/User/invoice">我的发票</router-link>
            </div>
          </div>
          <div class="bottombox4">
            <div class="first">个人设置</div>
            <div class="else" @click="xuanzhongf(9)" :class="xuanzhong==9?'xuanzhong2':''">
              <!-- <router-link class="else" :to="{name:'geren',params:{headPhoto}}">个人信息</router-link> -->
              <router-link class="else" to="/User/geren">个人信息</router-link>
              </div>
            <div class="else" @click="xuanzhongf(10)" :class="xuanzhong==10?'xuanzhong2':''">
              <router-link class="else" to="/User/zizhanghao">创建子账号</router-link>
              </div>
            <div class="else" @click="xuanzhongf(11)" :class="xuanzhong==11?'xuanzhong2':''">
              <router-link class="else" to="/User/xiugaimima">修改密码</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <router-view></router-view>
      </div>
    </div>
    <div class="changeModel" v-if="showChange">
      <div class="identityBig">
        <div class="identityTop">
          <h6>修改</h6>
          <span @click="closeIdentity" class="close"></span>
        </div>
        <ul class="identityList">
          <li v-for="(item,index) in identityList" :key="index">
            <input type="radio" class="radioBox" name="select" :value="index" v-model="checkValue" />
            <div class="backImg"></div>
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="identityBtn">
          <button @click="closeIdentity">取消</button>
          <button @click="sureIdentity">确定</button>
        </div>
      </div>
    </div>
    <!-- <div class="messageBox">
      <img src="http://youchaikj.com/pc-img/vip_banner.png" alt />
      <div class="vipDesc" v-if="showPic">
        <span>{{descript0}}</span>
        <span>{{descript}}</span>
        <span v-if="showRelevance" @click="relevance">绑定关联账号</span>
      </div>
      <div class="yellow"></div>
      <div class="bigBox">
        <ul class="leftBox">
          <li @click="toLink(index,1)" v-for="(item,index) in arrOne" :key="index">
            <img :src="item.src" alt />
            <h5 style="color:black">{{item.name}}</h5>
          </li>
        </ul>
        <ul class="rightBox">
          <li @click="toLink(index,2)" v-for="(item,index) in arrTwo" :key="index">
            <img :src="item.src" alt />
            <h5 style="color:black">{{item.name}}</h5>
          </li>
        </ul>
      </div>
    </div>
    <div class="topMessage">
      <div class="imageBox">
        <div class="avator">
          <img :src="headPhoto" alt />
        </div>
        <input class="file" accept="image/*" multiple type="file" @change="addImage" />
      </div>
      <div class="your">
        <span v-if="showInput">{{message.nickname}}</span>
        <input @blur="changeName" v-else max-length="6" v-model="message.nickname" type="text" />
        <img v-if="showInput" @click="edit" src="../../assets/image/user/edit.png" alt />
      </div>
      <div class="identityBox">
        {{message.identity}}
        <span @click="changeIdentity">修改</span>
      </div>
      <div v-if="codeValue" class="codeBox">
        推广码
        <span>{{codeValue}}</span>
      </div>
    </div>
    <div class="bindModel" v-if="showBind">
      <div class="bindBox">
        <div class="firstBind" v-if="!showSecond">
          <h3>绑定列表</h3>
          <span @click="delBind" class="bindDel">
            <img src="../../assets/image/login/close.png" alt />
          </span>
          <ul class="bindList">
            <li>
              <div>
                <span v-for="(item,index) in  bindName" :key="index">{{item}}</span>
              </div>
            </li>
            <li>
              <div v-for="(item,index) in bindArr" :key="index">
                <span>{{item.relationId}}</span>
                <span>{{item.phone}}</span>
                <span @click="delUser(index)">{{item.operate}}</span>
              </div>
            </li>
          </ul>
          <button class="add" @click="add">添加</button>
        </div>
        <div class="secondBind" v-if="showSecond">
          <h3>添加绑定</h3>
          <label for>
            <span>关联者账号</span>
            <input v-model="number" placeholder="请输入要关联的账号" type="text" />
          </label>
          <label for class="btnBox">
            <button @click="sure">确定</button>
            <button @click="back">返回</button>
          </label>
        </div>
      </div>
    </div>
    <div class="changeModel" v-if="showChange">
      <div class="identityBig">
        <div class="identityTop">
          <h6>修改</h6>
          <span @click="closeIdentity" class="close"></span>
        </div>
        <ul class="identityList">
          <li v-for="(item,index) in identityList" :key="index">
            <input type="radio" class="radioBox" name="select" :value="index" v-model="checkValue" />
            <div class="backImg"></div>
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="identityBtn">
          <button @click="closeIdentity">取消</button>
          <button @click="sureIdentity">确定</button>
        </div>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>-->
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Scroll from "../../assets/js/scroll.js";
let date = new Date();
export default {
  name: "User",
  components: {
    Tab,
    Jump
  },
  data() {
    return {
      path: "/User",
      url: "../../assets/image/user/icon_",
      xuanzhong: 1,
      yonghu: "",
      arrOne: [
        {
          name: "我的花型",
          src: require("../../assets/image/user/icon_flower.png"),
          link: "/Flower"
        },
        {
          name: "我的素材",
          src: require("../../assets/image/user/icon_source.png"),
          link: "/Source"
        },
        {
          name: "我的钱包",
          src: require("../../assets/image/user/icon_vip.png"),
          link: "/Vip"
        },
        {
          name: "我的动态",
          src: require("../../assets/image/user/icon_clock.png"),
          link: "/Dongtai"
        }
      ],
      arrTwo: [
        {
          name: "我的订单",
          src: require("../../assets/image/user/icon_order.png"),
          link: "/Order"
        },
        {
          name: "我的购物车",
          src: require("../../assets/image/user/icon_car.png"),
          link: "/Car"
        },
        {
          name: "我的面料",
          src: require("../../assets/image/user/icon_fabric.png"),
          link: "/Fabric"
        },
        {
          name: "版权信息",
          src: require("../../assets/image/user/bq.png"),
          link: "/copyright"
        }
      ],
      // 弹窗
      showJump: false,
      err: "",
      // 个人信息
      message: {},
      tabIndex: 19,
      // 用户是否开通工作室
      studio: false,
      // 到期时间描述
      showPic: false,
      showRelevance: false,
      descript0: "",
      descript: "",
      // 头像
      headPhoto: "",
      // 是否可以更改名字
      showInput: true,
      // 绑定
      // 关联账号的信息
      bindArr: [],
      bindName: ["用户id", "用户手机号", "操作"],
      // 绑定关联账输入的号码
      number: "",
      showBind: false,
      showSecond: false,
      // 修改身份弹窗
      identityList: ["品牌商", "设计师", "面料商", "辅料商", "制造商"],
      checkValue: "",
      showChange: false,
      codeValue: "",
      headUrl: ""
    };
  },
  methods: {
    // 获取用户是否开通工作室
    getStudio(){
      let obj = {
        url: this.all.baseUrl + '/new/studio/getStudioByUserId',
        formdata: new FormData()
      };
      this.getData(obj).then(res=>{
        if (res.data.status == 0) {
          if(res.data.result.examine_state == 2){
            this.studio = true;
          }
        } else if (res.data.status == -95) {
          this.hasLogin("您的账号已在其它地方登陆");
        } else {
          this.hasError(res.data.msg);
        }
      })
    },
    xuanzhongf(e) {
      this.xuanzhong = e;
    },
    login1() {
      this.$router.push({
        path: "/Flowerdesign"
      });
    },
    login2() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/new/studio/getStudioByUserId",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          }
        else if (res.data.result == null) {
          //企业工作室
          self.$router.push({
            path: "/studioshenqing",
            query: {}
          });
        } 
        else if(res.data.result.examine_state==0){
          self.$router.push({
            path: "/studioshenqing",
            query: {
              shenhe:2
            }
          });
        }
        else if(res.data.result.examine_state==1){
          self.$router.push({
            path: "/studioshenqing",
            query: {
              shenhe:3,
              message2:res.data.result,
            }
          });
        }
        else {
          if(localStorage.getItem("shenhechenggong")==1){
              self.$router.push({
            name: "shenhechenggong"
          });
          }else{
          self.$router.push({
            name: "huaxing1"
          });}
        }
      });
    },
    login3() {
      this.$router.push({
        path: "/Vip"
      });
    },
    changeEnglish() {
      this.$router.go(0);
    },
    // 绑定关联账号按钮点击
    relevance() {
      this.showBind = true;
      Scroll.stop();
      this.getList();
    },
    // 点击返回
    back() {
      this.showSecond = false;
      this.getList();
    },
    // 点击右上角×
    delBind() {
      this.showSecond = false;
      this.showBind = false;
      Scroll.move();
    },
    // 点击确定
    sure() {
      if (this.number == "") {
        this.showJump = true;
        this.err = "请输入关联者账号";
        let self = this;
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        let formData = new FormData();
        formData.append("phone", this.number);
        let obj = {
          url: this.all.baseUrl + "/appMemberRelation/save",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showSecond = false;
            this.getList();
          } else if (res.data.status == -95) {
            this.hasLogin("您的账号已在其它地方登陆");
          } else {
            this.hasError(res.data.msg);
          }
        });
      }
    },
    // 获取绑定的信息
    getList() {
      let formData = new FormData();
      // formData.append('phone',localStorage.getItem('phone'));
      formData.append("pageSize", 5);
      formData.append("page", 1);
      let obj = {
        url: this.all.baseUrl + "/appMemberRelation/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          for (var i = 0; i < res.data.result.list.length; i++) {
            res.data.result.list[i].operate = "删除";
          }
          this.bindArr = res.data.result.list;
        } else if (res.data.status == -95) {
          this.hasLogin("您的账号已在其它地方登陆");
        } else {
          this.hasError(res.data.msg);
        }
      });
    },
    // 点击添加
    add() {
      this.showSecond = true;
    },
    // 点击删除
    delUser(index) {
      let formData = new FormData();
      formData.append("id", this.bindArr[index].id);
      let obj = {
        url: this.all.baseUrl + "/appMemberRelation/delete",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          // this.showSecond = false;
          this.hasError("删除成功");
          this.getList();
        } else if (res.data.status == -95) {
          this.hasLogin("您的账号已在其它地方登陆");
        } else {
          this.hasError(res.data.msg);
        }
      });
    },
    hasLogin(str) {
      let self = this;
      Scroll.stop();
      this.showJump = true;
      this.err = str;
      setTimeout(function() {
        Scroll.move();
        localStorage.clear();
        self.showJump = false;
        self.err = "";
        self.$router.push({
          path: "/Login"
        });
      }, 1500);
    },
    hasError(str) {
      let self = this;
      Scroll.stop();
      this.showJump = true;
      this.err = str;
      setTimeout(function() {
        Scroll.move();
        self.showJump = false;
        self.err = "";
      }, 1500);
    },
    // 跳转页面
    toLink(index, num) {
      if (num == 1) {
        this.$router.push({
          path: this.arrOne[index].link
        });
      } else {
        this.$router.push({
          path: this.arrTwo[index].link
        });
      }
    },
    getMessage() {
      this.message = JSON.parse(localStorage.getItem("user"));
      // 企业会员
      let bussiness = Number(this.message.expirationTimePlus);
      let self = this;
      // 个人会员
      let person = Number(this.message.expirationTime);
      if (date.getTime() > bussiness) {
        this.showRelevance = false;
        if (date.getTime() > person) {
          this.showPic = false;
          this.descript = "您还未开通会员";
          this.yonghu = "普通用户";
        } else {
          this.showPic = true;
          this.yonghu = "个人vip";
          this.descript =
            "您的个人版VIP将于" + Scroll.changeTime(person) + "到期";
        }
      } else {
        this.showPic = true;
        this.showRelevance = true;
        this.yonghu = "企业vip";
        this.descript0 =
          "您的个人版VIP将于" + Scroll.changeTime(person) + "到期";
        this.descript =
          "您的企业版VIP将于" + Scroll.changeTime(bussiness) + "到期";
      }
      if (this.message.headPhoto==null) {
        this.headPhoto = require("../../assets/image/user/avator.png");
      } else {
        this.headPhoto = this.message.headPhoto;
      }
      this.identityList.map(function(item, index) {
        if (item == self.message.identity) {
          self.checkValue = index;
        }
      });
    },
    // 点击编辑图标
    edit() {
      this.showInput = false;
    },
    change(str) {
      let formData = new FormData();
      let self = this;
      formData.append("nickname", this.message.nickname);
      this.identityList.map(function(item, index) {
        if (index == self.checkValue) {
          console.log(item);
          formData.append("identity", item);
        }
      });
      if (str) {
        formData.append("headPhoto", str);
      }
      let obj = {
        url: this.all.baseUrl + "/appuser/appUpdate",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showJump = true;
          this.err = "修改成功";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.showChange = false;
            Scroll.move();
            self.showInput = true;
          }, 1500);
          this.message.identity = this.identityList[this.checkValue];
          this.message.headPhoto = this.headPhoto;
          localStorage.setItem("user", JSON.stringify(this.message));
          this.$forceUpdate();
        } else if (res.data.status == -95) {
          this.hasLogin("您的账号已在其它地方登陆");
        } else {
          this.getAlert(res.data.msg);
        }
      });
    },
    // 更换身份
    changeIdentity() {
      this.showChange = true;
    },
    changeName() {
      this.change();
    },
    closeIdentity() {
      this.showChange = false;
    },
    sureIdentity() {
      this.change();
    },
    getCode() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/userExtensionCode/get",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.codeValue = res.data.result.codeValue;
        } else if (res.data.status == -95) {
          this.hasLogin("您的账号已在其它地方登陆");
        } else {
          this.getAlert(res.data.msg);
        }
      });
    },
    addImage(e) {
      let self = this;
      if (e.target.files.length > 1) {
        this.showJump = true;
        this.err = "不能选择多张图片";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let files = e.target.files[0];
        this.headUrl = files;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          // 增加一个
          self.showLoading = true;
          let formData = new FormData();
          formData.append("file", self.headUrl);
          let obj = {
            url: self.all.baseUrl + "/file/upload",
            formdata: formData
          };
          self.getData(obj).then(res => {
            self.headPhoto = res.data.result;
            self.change(res.data.result);
          });
        };
      }
    },
    carJump(){
      if(this.$route.params.xuanzhong){
        this.xuanzhongf(this.$route.params.xuanzhong);
        document.getElementById("car").onclick();
      }
    }
  },
  mounted() {
    if (localStorage.getItem("qfc")) {
      this.arrOne = [
        {
          name: "我的花型",
          src: require("../../assets/image/user/icon_flower.png"),
          link: "/Flower"
        },
        {
          name: "我的素材",
          src: require("../../assets/image/user/icon_source.png"),
          link: "/Source"
        },
        {
          name: "充值中心",
          src: require("../../assets/image/user/icon_vip.png"),
          link: "/Vip"
        }
      ];
      this.arrTwo = [
        {
          name: "我的订单",
          src: require("../../assets/image/user/icon_order.png"),
          link: "/Order"
        },
        {
          name: "我的购物车",
          src: require("../../assets/image/user/icon_car.png"),
          link: "/Car"
        },
        {
          name: "我的面料",
          src: require("../../assets/image/user/icon_fabric.png"),
          link: "/Fabric"
        }
      ];
    }
    this.getStudio();
    this.getMessage();
    this.getCode();
    this.carJump();
    localStorage.setItem("path", this.path);
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Enuser"
      });
    } else {
      this.$router.push({
        path: "/User"
      });
    }
  }
};
</script>
<style scoped>
.topbox1 {
  position: relative;
  top: 10px;
}
.topbox2 {
  margin-top: 10px;
  font-size: 14px !important;
}
.topbox4 {
  width: 180px;
  height: 27px;
  border: 0;
  margin-top: 15px;
  background-color: #ffe135;
}
.topbox5 {
  width: 180px;
  height: 27px;
  border: 0;
  margin-top: 10px;
  background: #FFFFFF;
  border: 1px solid #E3E3E3;
}
.box {
  width: 1200px;
  height: 1200px;
  margin: auto;
  margin-top: 50px;
  background-color: #eee;
  position: relative;
}

.leftbox {
  width: 234px;
  height: 1200px;
  background-color: #eee;
}
.rightbox {
  width: 988px;
  height: 1170px;
  position: absolute;
  top: 0;
  left: 240px;
  background-color: white;
}
.topbox {
  width: 234px;
  height: 294px;
  background-color: white;
  padding-top: 36px;
}
.bottombox {
  margin-top: 10px;
  width: 234px;
  height: 830px;
  background-color: white;
  text-align: left;
  text-indent: 80px;
}
.bottombox1 {
  margin-top: 10px;
}
.bottombox2 {
  margin-top: 50px;
}
.bottombox3 {
  margin-top: 50px;
}
.bottombox4 {
  margin-top: 50px;
}
.first {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  height: 44px;
  line-height: 44px;
}
.else {
  background: rgba(255, 255, 255, 0.08);
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  height: 44px;
  line-height: 44px;
  display: block;
}
.xuanzhong2 {
  background: rgba(255, 227, 0, 0.08);
  border-left: 4px solid #ffe300;
  box-sizing: border-box;
  text-indent: 76px;
}
.yellow {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 5rem;
  background-color: #ffde18;
}
.user {
  background: #eee;
  min-height: 100vh;
}
.messageBox {
  position: relative;
}
.messageBox > img {
  display: block;
  width: 100%;
  height: 38.625rem;
}
.vipDesc {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 9.375rem;
  color: #fff;
  font-size: 1.875rem;
}
.vipDesc span {
  display: block;
  margin-bottom: 1.5625rem;
}
.vipDesc span:nth-child(3) {
  width: 11.875rem;
  height: 3.5rem;
  margin: 0 auto;
  line-height: 3.5rem;
  text-align: center;
  border-radius: 1.75rem;
  background: #ffffff;
  color: #333;
  font-size: 1.25rem;
  cursor: default;
}
/* 绑定关联账号 */
.bindModel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.bindBox {
  width: 43.75rem;
  height: 26.25rem;
  margin: 12.5rem auto 0;
}
.bindBox h3 {
  font-size: 1.625rem;
  padding-top: 0.3125rem;
  color: #494949;
  font-weight: normal;
}
.bindDel {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}
.bindDel img {
  display: block;
  width: 100%;
}
.bindList {
  margin-top: 0.9375rem;
  color: #4d4d4d;
}
.bindList li:first-child {
  font-weight: bold;
}
.bindList div {
  display: flex;
  margin-bottom: 0.25rem;
  justify-content: space-around;
}
.bindList span {
  display: block;
  width: 30%;
}
.add {
  width: 7.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #2c2e30;
  color: #fff;
  border-radius: 0.625rem;
  border: none;
  font-size: 1.25rem;
  outline: none;
  position: absolute;
  bottom: 2.1875rem;
  left: calc(50% - 3.75rem);
}
.firstBind {
  height: 100%;
  background: #fff;
  position: relative;
  border-radius: 0.625rem;
}
.secondBind {
  height: 100%;
  background: #fff;
  position: relative;
  border-radius: 0.625rem;
}
.secondBind h3 {
  padding-top: 2.8125rem;
  margin-bottom: 3.75rem;
}
.secondBind label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #4d4d4d;
}
.secondBind input {
  width: 20.625rem;
  height: 4.6875rem;
  color: #2c2e30;
  margin-left: 2.5rem;
}
:-ms-input-placeholder {
  font-style: italic;
  font-size: 1.5rem;
}
::-webkit-input-placeholder {
  font-size: 1.5rem;
  font-style: italic;
}
:-moz-placeholder {
  font-size: 1.5rem;
  font-style: italic;
}
.btnBox {
  position: absolute;
  bottom: 2.1875rem;
  width: 100%;
}
.btnBox button {
  display: block;
  margin: 1.5625rem;
  font-size: 1.25rem;
  width: 7.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #2c2e30;
  color: #fff;
  border-radius: 0.625rem;
  border: none;
  outline: none;
}
.bigBox {
  width: 100%;
  position: absolute;
  display: flex;
  z-index: 11;
  /* bottom: 1.75rem; */
  bottom: 6rem;
  left: 0;
  justify-content: space-between;
}
.bigBox ul {
  width: calc(50% - 4.625rem);
  display: flex;
  position: relative;
  z-index: 666;
  justify-content: space-around;
}
.bigBox ul.leftBox {
  float: left;
}
.bigBox ul.rightBox {
  float: right;
}
.bigBox li {
  box-sizing: border-box;
  color: #fff;
  font-size: 1.25rem;
  font-weight: normal;
  cursor: default;
}
.bigBox img {
  display: block;
  margin: 0 auto 0.5rem;
  width: 48px;
  height: 48px;
}
.topMessage {
  width: 100%;
}
.imageBox {
  margin-top: -10rem;
  position: relative;
}
.imageBox input {
  position: absolute;
  z-index: 12;
  width: 9.25rem;
  height: 9.25rem;
  left: calc(50% - 4.625rem);
  top: 0;
  opacity: 0;
}
.avator {
  width: 9.25rem;
  height: 9.25rem;
  border-radius: 50%;
  box-shadow: 2px 2px 2px #d8d8d8;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  background: #fff;
  justify-content: center;
  align-items: center;
}
.avator img {
  display: block;
  width: 100%;
  height: 100%;
}
.your {
  color: #333;
  margin-top: 0.625rem;
  font-size: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.your img {
  display: block;
  width: 1.75rem;
  height: 1.6875rem;
}
.your span {
  display: block;
  padding-top: 0.25rem;
  margin-right: 0.5625rem;
}
.your input {
  display: block;
  max-width: 11.8rem;
  margin-right: 0.5625rem;
  background: inherit;
  outline: none;
  text-align: center;
  border: none;
  font-size: 1.875rem;
}
.identityBox {
  font-size: 1.125rem;
  color: rgba(51, 51, 51, 0.6);
}
.identityBox span {
  font-size: 1.125rem;
  color: #133ffc;
  margin-right: 0.3125rem;
  margin-left: 0.3125rem;
  cursor: default;
}
/* 推广码 */
.codeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8d8d8d;
  font-size: 1rem;
  margin-top: 0.25rem;
}
.codeBox span {
  display: block;
  margin-left: 0.9375rem;
}
/* 修改身份弹窗 */
.changeModel {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  height: 100vh;
  left: 0;
  z-index: 999;
}
.identityBig {
  position: absolute;
  width: 34.875rem;
  height: 14rem;
  top: calc(50vh - 7rem);
  left: calc(50% - 17.4375rem);
  background: #fff;
  border-radius: 0.3125rem;
}
.identityTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.875rem;
  height: 3.8125rem;
  padding-right: 1rem;
  border-bottom: 1px solid #8d8d8d;
}
.identityTop h6 {
  font-weight: normal;
  color: #333;
  font-size: 1.5rem;
}
.identityTop span {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
  background: url("../../assets/image/login/close.png") no-repeat center center;
  background-size: 100%;
}
.identityList {
  display: flex;
  height: 5.0625rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #8d8d8d;
}
.identityList li {
  display: flex;
  position: relative;
  align-items: center;
  margin: 1rem;
}
.identityList input {
  position: absolute;
  left: 0;
  width: 100%;
  top: calc(50% - 0.5625rem);
  opacity: 0;
  height: 1.125rem;
  z-index: 222;
}
.backImg {
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.3125rem;
  background: url("../../assets/image/login/noselect.png") no-repeat center
    center;
  background-size: 100%;
}
.identityList input:checked + .backImg {
  background: url("../../assets/image/login/hasselect.png") no-repeat center
    center;
  background-size: 100%;
}
.identityBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.identityBtn button {
  width: 6.3125rem;
  height: 2.5rem;
  display: block;
  background: inherit;
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
  line-height: 2.5rem;
  text-align: center;
  border-radius: 1.25rem;
  background: inherit;
  outline: none;
  font-size: 1rem;
  margin-top: 1.3125rem;
  margin-left: 1.25rem;
}
.identityBtn button:last-child {
  background: #133ffc;
  border-color: #133ffc;
  color: #fff;
  margin-right: 3.125rem;
}
.bottombox1:first-child{
  padding-top: 40px;
}
.topbox3 span{
  font-size: 14px !important;
}
/* 页面上所有按钮在鼠标悬浮时的状态 */
button:hover{
  cursor: pointer;
}
.topbox4:hover{
  background: #ffd000 !important;
}
.topbox5:hover{
  background: #eee !important;
}
.bottombox1>div:hover,.bottombox2>div:hover,.bottombox3>div:hover,.bottombox4>div:hover{
  background: rgba(255, 227, 0, 0.08);
}
.bottombox1>div:first-child:hover,.bottombox2>div:first-child:hover,.bottombox3>div:first-child:hover,.bottombox4>div:first-child:hover{
  background: rgba(255, 255, 255, 0.08);
}
</style>