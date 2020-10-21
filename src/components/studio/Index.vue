<template>
  <div class="window">
    <Studiotap @showEnglish="changeEnglish" :studio="2" :tabIndex="tabIndex"></Studiotap>
    <div class="background">
      <div class="personal" @click="jump(0)">
        <div class="img1"></div>
        <div class="text">个人工作室</div>
        <div class="text2">个人实名认证开通的工作室</div>
      </div>
      <div class="enterprise" @click="jump(1)">
        <div class="img2"></div>
        <div class="text">企业工作室</div>
        <div class="text2">企业实名开通的工作室</div>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>
  </div>
</template>

<script>
import Studiotap from "../../components/Studiotap";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";

export default {
  name: "studio",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      showJump: false,
      tabIndex: 0,
      showLoading: false
    };
  },
  methods: {
    changeEnglish() {
      this.$router.go(0);
    },
    jump(e) {
      this.$router.push({
        path: "/StudioManagement",
        query: {
          type: e,
          studio:2,
        }
      });
    },
    getinfo() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/app3dDesignersAndStudiosJyg/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        console.log(res.data.result);
        console.log(res.data.result.corporateStudioYn);
        console.log(res.data.result.personalStudioYn);
        if (res.data.result.corporateStudioYn == 1) {
          //企业工作室
          self.$router.push({
            path: "/StudioManagement",
            query: {
              type: 1,
              studio:1,
              studioshuju:res.data.result
            }
          });
          
        } else if (res.data.result.personalStudioYn == 1) {
          self.$router.push({
            path: "/StudioManagement",
            query: {
              type: 0,
              studio:0,
              studioshuju:res.data.result
            }
          });
          
        }
      });
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //     this.drawPie('canBox')
    // });
    // let createTime = JSON.parse(localStorage.getItem('user')).createTime;
    // if(date.getTime()<createTime+1*60*60*1000){
    //     this.all.newTime = true;
    // }
    // if(this.all.newTime){
    //     this.showModel = false;
    // }
    this.getinfo();
    localStorage.setItem("path", "/Studio");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Enstudio"
      });
    } else {
      this.$router.push({
        path: "/Studio"
      });
    }
  }
};
</script>
<style scoped>
.window {
  width: 1920px;
  height: 100vh;
}

.background {
  width: 100vw;
  height: 100vh;
  background: #eee;
  position: absolute;
  top: 0px;
  left: 0rem;
  background-image: url(../../assets/image/studio/设计师2.png);
}

.personal {
  width: 700px;
  height: 700px;
  position: absolute;
  left: 208px;
  top: 100px;
  background-image: url(../../assets/image/studio/图层15.png);
}

.enterprise {
  width: 700px;
  height: 700px;
  left: 1058px;
  top: 100px;
  position: absolute;
  background-image: url(../../assets/image/studio/图层15.png);
}

.img1 {
  width: 130px;
  height: 130px;
  background-image: url(../../assets/image/studio/gerenyonghutouxiang2.png);
  background-size: 130px 130px;
  position: absolute;
  left: 285px;
  top: 150px;
}

.img2 {
  width: 130px;
  height: 130px;
  background-image: url(../../assets/image/studio/jianzhu.png);
  background-size: 130px 130px;
  position: absolute;
  left: 285px;
  top: 150px;
}

.text {
  width: 700px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 310px;
  color: white;
}

.text2 {
  width: 700px;
  height: 30px;
  font-size: 15px;
  text-align: center;
  position: absolute;
  top: 400px;
  color: white;
}
</style>
