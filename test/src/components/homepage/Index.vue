<template>
  <!-- 新手教程 -->
  <div>
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="block">
      <el-carousel height="494px">
        <el-carousel-item v-for="(item,index) in lunbo" :key="item">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <img :src="item.src" />
          <div v-if="item.time==1" class="time1">{{time1}}</div>
          <div v-if="item.time==1" class="time2">{{time2}}</div>
          <div v-if="item.time==1" class="time3">{{time3}}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="page1">
      <div class="k1">
        <div class="text1">
          <p style="font-size:22px;height: 30px;">/</p>新
          <p style="font-size:22px;height: 30px;line-height: 20px;">/</p>
        </div>
        <div class="text2">3d展示&gt;</div>
      </div>
      <div class="k2">
        <img
          width="300px"
          @click="jump(3)"
          height="200px"
          src="../../assets/image/homepage/shipin1.png"
          alt
        />
      </div>
      <div class="k3">
        <div class="text1">
          <p style="font-size:22px;height: 30px;">/</p>教
          <p style="font-size:22px;height: 30px;line-height: 20px;">/</p>
        </div>
        <div class="text2">AI设计&gt;</div>
      </div>
      <div class="k4">
        <img
          width="300px"
          @click="jump(2)"
          height="200px"
          src="../../assets/image/homepage/shipin2.png"
          alt
        />
      </div>
      <div class="k5">
        <img
          width="300px"
          @click="jump(1)"
          height="200px"
          src="../../assets/image/homepage/shipin3.png"
          alt
        />
      </div>
      <div class="k6">
        <div class="text1">
          <p style="font-size:22px;height: 30px;">/</p>手
          <p style="font-size:22px;height: 30px;line-height: 20px;">/</p>
        </div>
        <div class="text2">&lt;花型设计</div>
      </div>
      <div class="k7">
        <img
          width="300px"
          @click="jump(0)"
          height="200px"
          src="../../assets/image/homepage/shipin4.png"
          alt
        />
      </div>
      <div class="k8">
        <div class="text1">
          <p style="font-size:22px;height: 30px;">/</p>程
          <p style="font-size:22px;height: 30px;line-height: 20px;">/</p>
        </div>
        <div class="text2">&lt;抠图演示</div>
      </div>
    </div>
    <div class="page2">
      <div class="header">
        <div class="D3">
          3D展示
          <div class="yellow"></div>
        </div>
        <div class="fuzhuang3" @click="jump2(2)">系列展示</div>
        <div class="fuzhuang2" @click="jump2(1)">私人衣橱</div>
        <div class="fuzhuang1" @click="jump2(0)">默认服装</div>
      </div>
      <div class="header2">
        <img
          class="fuzhuangimg"
          @click="jump3(index)"
          :src="item.backgroudImage"
          v-for="(item,index) in list"
          :key="item"
        />
      </div>
    </div>
    
    <img @click="mianzejump()"  src="../../assets/image/homepage/wanou1.png" class="wanou" alt />
    <div @click="mianzejump()" class="wanou1">免责声明</div>
    <Footer></Footer>
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
import Footer from "../../components/Footer";
export default {
  name: "Homepage",
  components: {
    Tab,
    Loading,
    Jump,
    Footer
  },
  data() {
    return {
      path: "/Homepage",
      tabIndex: 0,
      err: "",
      showLoading: false,
      showJump: false,
      list: "",
      time1: "00",
      time2: "00",
      time3: "00",
      lunbo: [
        { src: require("../../static/img/lunbo1.png") },
        { src: require("../../static/img/lunbo2.png"), time: 1 },
        { src: require("../../static/img/lunbo3.png") }
      ]
      //    lunbo:[{src:require('../../static/img/lunbo2.png')}]
    };
  },
  methods: {
    changeEnglish() {
      this.$router.go(0);
    },
    addzero(i) {
      return i < 10 ? "0" + i : i + "";
    },
    daojishi() {
      let self=this;
      var nowtime = new Date();
      var endtime = new Date("2019/10/8,10:00:00");
      var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
      var d = parseInt(lefttime / (24 * 60 * 60));
      var h = parseInt((lefttime / (60 * 60)) % 24);
      var m = parseInt((lefttime / 60) % 60);      
      d = this.addzero(d);
      h = this.addzero(h);
      m = this.addzero(m);
      if (lefttime <= 0) {
        self.time1 = 0;
        self.time2 = 0;
        self.time3 = 0;
      } else {
        self.time1 = d;
        self.time2 = h;
        self.time3 = m;
      }
    },
    mianzejump(){
      let self = this;
      self.$router.push({
        path: "/Banquan",
        query: {
          
        }
      });
    },
    jump(e) {
      let self = this;
      self.$router.push({
        path: "/New",
        query: {
          type: e
        }
      });
    },
    jump2(e) {
      let self = this;
      self.$router.push({
        path: "/Threed",
        query: {
          type: e
        }
      });
    },
    jump3(e) {
      let self = this;
      self.$router.push({
        path: "/Threed",
        query: {
          index: e
        }
      });
    },
    get3d() {
      let self = this;
      let formData = new FormData();
      formData.append("page", 1);
      formData.append("pageSize", 8);
      formData.append("genre1", 1);
      formData.append("genre2", 11);
      let obj = {
        url: this.all.baseUrl + "/template2d/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          // console.log(res.data);
          self.list = res.data.result.list;
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = "您的账号已在其它地方登陆";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    }
    // 左侧切换 该页面不能点击
  },
  mounted() {
    this.get3d();
    this.daojishi();
    setInterval(this.daojishi, 15000);
    localStorage.setItem("path", '/Homepage');
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnHomepage"
      });
    } else {
      this.$router.push({
        path: "/Homepage"
      });
    }
  },
  destroy(){
    clearInterval(this.daojishi);
  }
};
</script>
<style scoped>
.wanou {
  position: fixed;
  top: calc(50% - 112px);
  left: calc(100% - 112px);
  z-index: 100;
}
.wanou1 {
  width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: yellow;
    position: fixed;
    top: calc(50% - -20px);
    left: calc(100% - 155px);
    z-index: 100;
}
.D3 {
  width: 200px;
  text-align: left;
  height: 30px;
}
.yellow {
  width: 100px;
  height: 30px;
  position: relative;
  top: 0px;
  left: 0px;
}
.page1 {
  width: 1200px;
  margin: auto;
  height: 400px;
  margin-top: 144px;
}
.page1 > div {
  width: 300px;
  height: 200px;
  background-color: #ffde18;
  float: left;
}
.page2 {
  width: 1200px;
  margin: auto;
  height: 750px;
  margin-top: 144px;
}
.fuzhuangimg {
  width: 300px;
  height: 375px;
  float: left;
}
.header {
  width: 1200px;
  height: 50px;
}
.D3 {
  float: left;
  color: rgba(0, 0, 0, 0.5);
}
.yellow {
  width: 40px;
  height: 15px;
  background-color: yellow;
  position: relative;
  left: 20px;
  top: -15px;
  z-index: -1;
}
.fuzhuang1 {
  width: 80px;
  color: #868686;
  border-right: 1px solid #868686;
  border-left: 1px solid #868686;
  float: right;
}
.fuzhuang2 {
  width: 80px;
  color: #868686;
  float: right;
}
.fuzhuang3 {
  width: 80px;
  color: #868686;
  border-right: 1px solid #868686;
  border-left: 1px solid #868686;
  float: right;
}
.text1 {
  text-align: center;
  width: 300px;
  height: 100px;
  font-size: 52px;
  color: #100f10;
  line-height: 50px;
  position: relative;
  top: 50px;
}
.text2 {
  text-align: center;
  width: 300px;
  height: 70px;
  font-size: 20px;
  color: gray;
  position: relative;
  top: 30px;
  line-height: 80px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.time1 {
  position: absolute;
  top: 325px;
  left: 715px;
  font-size: 80px;
  color: #1f8d8b;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.time2 {
  position: absolute;
  top: 325px;
  left: 915px;
  font-size: 80px;
  color: #1f8d8b;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.time3 {
  position: absolute;
  top: 325px;
  left: 1115px;
  font-size: 80px;
  color: #1f8d8b;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>