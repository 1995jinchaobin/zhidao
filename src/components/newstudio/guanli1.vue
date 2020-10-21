<template>
  <div class="xiugai">
    <div v-if="page==1">
      <div class="biaoti">规范设计</div>
      <hr class="hr" />
      <div style="line-height:1.8em">
        <b style="font-size:20px;margin-bottom:34px">总则</b>
        <br />
        <br />1.严禁抄袭他人作品
        <br />2.严禁未经授权上传他人作品
      </div>
      <br />
      <div style="text-align:center;">
        
      <img style="   " src="../../assets/image/studio/guifansheji.png" alt />
      </div>
    </div>
    <div v-if="page==2">
      <div class="biaoti">规范设计</div>
      <hr class="hr" />
      <div>
        1. 关于图片：
        <br />1.1所上传的素材和花型图片应清晰、美观，能够完全辨别图片的内容，无水印、无QQ微信手机号码等联系方式，织道会生成平台统一水印以保护工作室权利；
        <br />1.2所上传图片内容须符合中华人民共和国法律法规，不得违法或含有不良信息的内容，例如涉嫌色情、暴力、反动、泄漏国家机密或有与国家法律法规相抵触等内容的，将审核不通过；
        <br />1.3所上传图片不得含有已注册商标或公司名称，以免侵犯他人商标权、名称权；
        <br />1.4所上传的图片不得包含人民币图案；
        <br />1.5所上传的图片不得包含他人享有知识产权的作品，如禁止含有喜羊羊、光头强等知名卡通形象；
        <br />1.6 所上传图片不可添加任何广告信息；
        <br />所上传素材不得与织道平台现在素材重复，否则将审核不通过。
        <br />2. 关于PSD源文件：
        <br />2.1 所上传花型的PSD源文件与详细花型图片内容需统一，否则将审核不通过;
        <br />2.2所上传花型为分层的PSD格式素材，需保证源文件实际像素下的清晰度，不可将尺寸或分辨率故意拉大；
        <br />2.3所上传花型源文件不得是影响图片下载者使用（如源文件出错、读取复合图层、损坏、缺少数据等），否则需要工作室重新上传有效文件或退还交易金，并进行买家协商赔偿。
      </div>
    </div>
    <ul class="pageBox">
      <li @click="prev" style="cursor:pointer;">
        <img src="../../assets/image/cut/left.png" alt />
      </li>
      <li @click="prev" style="cursor:pointer;" :class="page==1?'click':''">1</li>
      <li @click="next" style="cursor:pointer;" :class="page==2?'click':''">2</li>
      <li @click="next" style="cursor:pointer;">
        <img src="../../assets/image/cut/right.png" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
export default {
  name: "guanli1",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab
  },
  data() {
    return {
      path: "/newstudio/guanli1",
      page: 1
    };
  },
  methods: {
    prev() {
      this.page = 1;
    },
    next() {
      this.page = 2;
    },
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },
  mounted() {
    // localStorage.setItem("path", this.path);
    this.xuanzhongf(7);
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
  left: 102px;
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
  background-color: #ffffff;
  margin: auto;
  display: table;
  position: absolute;
  top: 1038px;
  left: 427px;
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