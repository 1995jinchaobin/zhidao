<template>
  <div class="user">
    <!-- 个人中心首页 -->
    <Tab :path="path" @showEnglish="changeEnglish"></Tab>
    <div class="box">
      <div class="leftbox">
        <div class="bottombox">
          <div class="gongzuoshibiaoti">我的工作室</div>
          <div class="bottombox1">
            <div class="first">素材管理</div>
            <div class="else" @click="xuanzhongf(1)" :class="xuanzhong==1?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/sucai1">上传素材</router-link>
            </div>
            <div class="else" @click="xuanzhongf(2)" :class="xuanzhong==2?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/sucai2">管理素材</router-link>
            </div>
          </div>
          <div class="bottombox1">
            <div class="first">花型管理</div>
            <div class="else" @click="xuanzhongf(3)" :class="xuanzhong==3?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/huaxing1">上传花型</router-link>
            </div>
            <div class="else" @click="xuanzhongf(4)" :class="xuanzhong==4?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/huaxing2">管理花型</router-link>
            </div>
          </div>
          <div class="bottombox1">
            <div class="first">我的账本</div>
            <div class="else" @click="xuanzhongf(5)" :class="xuanzhong==5?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/zhangben1">我的钱包</router-link>
            </div>
          </div>
          <div class="bottombox1">
            <div class="first">交易管理</div>
            <div class="else" @click="xuanzhongf(6)" :class="xuanzhong==6?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/jiaoyi1">交易管理</router-link>
            </div>
          </div>
          <div class="bottombox1">
            <div class="first">管理条例</div>
            <div class="else" @click="xuanzhongf(7)" :class="xuanzhong==7?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/guanli1">规范设计</router-link>
            </div>
            <div class="else" @click="xuanzhongf(8)" :class="xuanzhong==8?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/guanli2">工作室管理条例</router-link>
            </div>
            <div class="else" @click="xuanzhongf(9)" :class="xuanzhong==9?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/guanli3">免责说明</router-link>
            </div>
            <div class="else" @click="xuanzhongf(10)" :class="xuanzhong==10?'xuanzhong2':''">
              <router-link class="else" to="/newstudio/guanli4">设计师说明</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <router-view  @xuanzhongf="xuanzhongf"></router-view>
      </div>
    </div>

    <!-- <Jump v-if="showJump" :title="err"></Jump>-->
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Scroll from "../../assets/js/scroll.js";
let date = new Date();
export default {
  name: "newstudio",
  components: {
    Tab,
    Jump
  },
  data() {
    return {
      path: "/newstudio",
      xuanzhong: 3
    };
  },
  methods: {
    xuanzhongf(e) {
      this.xuanzhong = e;
    },
    changeEnglish() {
      this.$router.go(0);
    },
    getinfo() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/app3dDesignersAndStudiosJyg/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        
      });
    }
  },
  mounted() {
    this.getinfo();
    // localStorage.setItem("path", this.path);
    // if (localStorage.getItem("English")) {
    //   this.$router.push({
    //     path: "/newstudio"
    //   });
    // } else {
    //   this.$router.push({
    //     path: "/newstudio"
    //   });
    // }
  }
};
</script>
<style scoped>
.gongzuoshibiaoti{
  font-weight: bold;
  height: 46px;
  font-family: SourceHanSansCN-Medium;
font-size: 26px;
color: #333333;
letter-spacing: 0;
text-align: center;
line-height: 103px;
text-indent: 0;
}
.topbox1 {
  position: relative;
  top: 10px;
}
.topbox2 {
  margin-top: 10px;
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
  background-color: #e3e3e3;
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
  width: 987px;
  height: 1170px;
  position: absolute;
  top: 0;
  left: 240px;
  background-color: white;
}
.topbox {
  width: 234px;
  height: 320px;
  background-color: white;
}
.bottombox {
  margin-top: 10px;
  width: 234px;
  height: 1170px;
  background-color: white;
  text-align: left;
  text-indent: 80px;
}
.bottombox1 {
  margin-top: 50px;
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
  font-weight: bold;
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
</style>