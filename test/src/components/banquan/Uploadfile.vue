<template>
  <div>
    <div class="page">
      <div class="kuangy">上传文件</div>
      <div class="upload">
        <div class="img-container">
          <img :src="src" width="250" height="185" alt />
        </div>
        <input type="file" style="display:none" @change="getFile" ref="file" id="file" />
        <label class="zhezhao" for="file">
          <div class="zhezhao1">点击上传文件</div>
        </label>
      </div>
      <div class="kuangy">收件信息</div>
      <div class="kuang">
        收件地址
        <input class="input1" type="text" />
      </div>
      <div class="kuang">
        收件电话
        <input class="input1" type="text" />
      </div>
      <div class="kuangy">发票信息</div>
      <div class="kuang">1.发票信息会根据您提供信息进行提取</div>
      <div class="kuang">2.您签署完合同并且该合同下的案件全部已经支付后，发票信息会自动生成</div>
    </div>
    <hr>
    <div class="yingfu">应付总金额：<span style="font-size:40px;color:red;">￥{{this.money}}</span> </div>
    <button class="anniu">支付</button>
    <div style="height:200px"></div>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
import Footer from "../../components/Footer";
export default {
  name: "Uploadfile",
  components: {
    Tab,
    Loading,
    Jump,
    Footer
  },
  data() {
    return {
      path: "/Uploadfile",
      src: "",
      money:this.$route.query.money,
      type:this.$route.query.type,
      shuju: {
        file: "",
        address: "",
        phone: ""
      },
      err: "",
      showLoading: false,
      showJump: false
    };
  },
  methods: {
    getFile(e) {
      var files = e.target.files[0];
      // console.log(files);
      this.shuju.file = files;
      let _this = this;

      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src = this.result;
      };
    }
  }
};
</script>
<style scoped>

.yingfu{
  width: 1300px;
  margin: auto;
  text-align: right;
   margin-top: 50px;
}
.anniu{
  width: 250px;
    height: 50px;
    border-radius: 10px;
   margin: auto;
   font-size: 20px;
    background-color: black;
    color: yellow;
     margin-top: 50px;
}
.zhezhao {
  width: 250px;
  height: 175px;
  position: relative;
  top: -212px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0);
}
.zhezhao1 {
  width: 250px;
  height: 187px;
  text-align: center;
  line-height: 187px;
  color: gray;
  background-color: rgba(255, 255, 255, 0);
}
.upload {
  width: 250px;
  border-radius: 10px;
  height: 185px;
  
  /* background-size: 365px 185px; */
}
.img-container {
  width: 250px;
  height: 185px;
  border: 1px solid grey;
  border-radius: 5px;
      position: relative;
    left: 10px;
    top: -25px;
}

.input1 {
  margin-left: 30px;
  width: 250px;
  height: 41px;
  border-radius: 10px;
  background-color: #ddd;
  border: 1px solid #ddd;
  text-indent: 10px;
}
.page {
  width: 1300px;
  margin: auto;
  height: 600px;
  margin-top: 100px;
  position: relative;
}
.kuang {
  width: 990px;
  text-align: left;
  margin-bottom: 20px;
  padding-left: 10px;
}
.kuangy {
  width: 990px;
  text-align: left;
  border-left: 8px solid orange;
  margin-bottom: 50px;
  padding-left: 10px;
}
</style>