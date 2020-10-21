<template>
  <div class="xiugai">
    <div class="biaoti">设计师说明</div>
    <hr class="hr" />
    <div style="line-height:1.8em">
      <br />设计师频道是设计师（工作室）的工作台，包含工作室管理、素材管理、花型管理、交易管理、收支明细等主要功能，聚焦于快捷方便的商品管理。
      <br />个人或企业在织道平台开通工作室是免费的。个人或企业开通工作室后，可以上传原创素材和原创花型，由工作室按照市场价格或者其它标准自行制定价格。期中，原创素材统一放在用户频道花型设计模块的原创素材中，不能单独交易，用户使用了该元素设计花型并购买。工作室获得的收益可以申请提现，100元起步提现，发起提现申请后，3-7个工作日到绑定银行账户。
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
  name: "sucai1",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab
  },
  data() {
    return {
      path: "/newstudio/guanli4"
    };
  },
  methods: {
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },
  mounted(){
    localStorage.setItem("path", this.path);
    this.xuanzhongf(10);
  }
};
</script>

<style scoped>
.xiugai {
  width: 900px;
  height: 1130px;
  padding-top: 43px;
  padding-left: 78px;
  padding-right: 78px;
  background: #ffffff;
  border: 0;
  position: relative;
  text-align: left;
  font-size: 14px;
  color: #151515;
}
.h1 {
  color: #333333;
}
.biaoti {
  font-family: SourceHanSansCN-Medium;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: left;
  width: 900px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.hr {
  width: 760px;
  position: relative;
  top: -15px;
  left: 123px;
  *margin: 0;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
  margin-bottom: 20px;
}
.pageBox {
  /* width: 550px; */
  height: 30px;
  background-color: #f5f5f5;
  margin: auto;
  display: table;
  position: absolute;
  top: 950px;
  left: 330px;
}
.pageBox div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  display: table-cell;
}
.pageBox .click1 {
  background: #333333;
  color: white;
}
ul.pageBox {
  padding-bottom: 3.125rem;
  display: flex;
  margin-top: 1.625rem;
  justify-content: center;
  align-items: center;
}
ul.pageBox li {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.875rem;
  color: #333;
  box-shadow: 0.125rem 0.125rem 0.125rem #ddd;
  border-radius: 50%;
  margin: 0 0.7125rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
ul.pageBox li.click {
  background: #000;
  color: #fff;
}
ul.pageBox li img {
  display: block;
  width: 0.5rem;
  height: 1rem;
  margin: 0.625rem auto;
}
ul.pageBox li.click {
  background: #000;
  color: #fff;
}
</style>