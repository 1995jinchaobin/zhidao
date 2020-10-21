<template>
  <div class="xiugai">
    <div class="biaoti">免责声明</div>
    <hr class="hr" />
    <div style="line-height:1.8em">
      <br />1. 织道花型设计平台不能对用户发布的任何内容（包括但不限于文章、评论、回答）的准确性进行保证。
      <br />2. 用户在织道花型设计平台发表的内容仅表明其个人的立场和观点，并不代表织道花型设计平台的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。织道花型设计平台不承担任何法律及连带责任。
      <br />3. 对于因不可抗力或织道花型设计平台不能控制的原因造成的网络服务中断或其它缺陷，织道花型设计平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。

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
      path: "/newstudio/guanli3"
    };
  },
  methods: {
    xuanzhongf(e) {
      this.$emit("xuanzhongf", e);
    }
  },
  mounted() {
    localStorage.setItem("path", this.path);
    this.xuanzhongf(9);
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