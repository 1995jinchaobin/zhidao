<template>
  <div class="xiugai">
    <div class="kuai">
      <img width="72" height="72" src="../../assets/image/studio/xingzhuang.png" alt />
      <div class="chenggong1">审核成功</div>
      <div class="chenggong2">上传花型/素材,开始经营您的店铺吧</div>
      <div class="chenggong3">
        <button class="button1" @click="huaxing">上传花型</button>
        <button class="button2" @click="sucai">上传素材</button>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
export default {
  name: "shenhechenggong",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab
  },
  data() {
    return {
      path: "/shenhechenggong",
      page: 1
    };
  },
  methods: {
    huaxing() {
      this.$router.push({
        name: "huaxing1"
      });
    },
    sucai() {
      this.$router.push({
        name: "sucai1"
      });
    },
    change(){
        localStorage.setItem("shenhechenggong",0);
    }
  },
  mounted() {
      this.change();
  }
};
</script>

<style scoped>
button{
  cursor:pointer;
}
.xiugai {
  width: 100vw;
  min-height: 100vh;
  background: #f6f6f6;
}
.kuai {
  width: 280px;
  height: 280px;
  margin: auto;
  position: relative;
  top: 200px;
}
.chenggong1 {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  height: 32px;
  margin-bottom: 16px;
}
.chenggong2 {
  height: 22px;
  margin-bottom: 25px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
.chenggong3 {
  height: 32px;
}
.button1 {
  background: #ffe300;
  border-radius: 4px;
  width: 88px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin-top: 32px;
  border: 0;
}
.button2 {
  background: #ffe300;
  border-radius: 4px;
  width: 88px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin-top: 32px;
  border: 0;
  margin-left: 74px;
}
</style>