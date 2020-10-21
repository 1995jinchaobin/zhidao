<template>
  <div class="xiugai">
    <div v-if="xiugai!=1" class="biaoti">素材信息</div>
    <div v-if="xiugai==1" class="biaoti">修改素材</div>
    <hr class="hr" />
    <div class="kuai">
      <div class="title">标题</div>
      <input v-model="message.name" />
    </div>
    <div class="kuai" style="position: absolute;top: 93px;left: 534px;">
      <div class="title">价格</div>
      <input v-model="message.price"   type="number" @input="oninput1" />
    </div>
    <div class="kuai">
      <div class="title">作品尺寸</div>
      <input placeholder="长"  type="number" @input="oninput2" v-model="message.height" style />
      <span style="font-size:15px;margin-left:13px">px</span>
      <input placeholder="宽"  type="number" @input="oninput3" v-model="message.width" style="margin-left:13px" />
      <span style="font-size:15px;margin-left:10px">px</span>
      
    </div>
    <!-- <div class="kuai" style="position: absolute;top: 136px;left: 480px;">
      <div class="title" oninput = "value=value.replace(/[^\d]/g,'')">分辨率</div>
      <input  oninput = "value=value.replace(/[^\d]/g,'')" v-model="message.dpi"  />
      <span style="font-size:15px;margin-left:10px">dpi</span>
    </div> -->
    <div class="kuai">
      <div class="title">素材类别</div>
      <select class="select" v-model="message.printing_or_embroider">
        <option v-for="item in hualist1" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
      <select class="select" v-model="message.genre1" style="top: -40px;left: 600px;">
        <option v-for="item in hualist2" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
      <select class="select" v-model="message.genre2" style="position:absolute;top: 292px; position: absolute;left: 477px;">
        <option v-for="item in hualist2[message.genre1-1].list" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
      <select class="select2" v-model="message.style_type">
        <option v-for="item in hualist4" :value="item.id" :key="item.id">{{item.name}}</option>
      </select>
    </div>
    <button v-if="false" @click="ceshi"></button>
    <div class="biaoti">上传图片</div>
    <hr class="hr" />
    <div class="kuai">
      <div class="title">作品图片</div>
    </div>
    <div class="flowerimage">
      <div class="upload">
        <div class="img-container">
          <img v-if="!src1==''" :src="src1" width="294px" height="140px" alt />
          <img class="sf1" v-if="src1==''" src="../../assets/image/studio/newtu.png" alt />
          <div class="sf2" v-if="src1==''">请上传一张高清png或jpg格式图片20M以内</div>
        </div>
        <input type="file"  accept="image/png" style="display:none" @change="getFile1" ref="file" id="file1" />
        <label class="zhezhao" for="file1"></label>
      </div>
    </div>
    <button v-if="xiugai!=1" class="fabu" @click="fabu">发布</button>
    <button v-if="xiugai==1" class="fabu" @click="fabu2">发布</button>
    <Jump v-if="showJump" :title="err" :change="change"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump2";
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
      path: "/newstudio/sucai1",
      change:"",
      showJump: false,
      xiugai: this.$route.query.xiugai,
      message2: this.$route.query.message,
      err: "",
      showLoading: false,
      src1: "",
      src2: "",
      src1h: 0,
      src2h: 0,
      file1: "",
      file2: "",
      hualist1: [{ id: 0, name: "印花" }, { id: 1, name: "绣花" }],
      hualist2: "",
      hualist3: "",
      hualist4: "",
      message: {
        genre1: "",
        genre2: "1",
        style_type: "",
        printing_or_embroider: 2,
        width: "",
        height: "",
        size: "",
        name: "",
        price: "",
        dpi:"",
        picture: "",
      }
    };
  },
  methods: {
    ceshi(){
    },
    oninput1(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.message.price=e.target.value;        
    },
    oninput2(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.message.height=e.target.value;        
    },
    oninput3(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.message.width=e.target.value;        
    },
    xiugaif() {
        console.log(this.xiugai)
      if (this.xiugai == 1) {
        this.message = this.message2;
        console.log(this.message.genre1)
          console.log(this.message.genre2)
        this.src1 = this.message2.picture;
        this.src1h = 1;
        this.src2h = 1;
      }
    },
    fabu2() {
      let self = this;
      // this.message.width == "" ||
      //   this.message.name == "" ||
      //   this.message.price == "" ||
      //   this.message.genre1 == "" ||
      //   this.message.genre2 == "" ||
      //   this.message.style_type == "" ||
      //   this.message.printing_or_embroider == 2 
      if(this.message.name == ""){
        this.showJump = true;
        this.err = "标题未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.name == "null"||this.message.name == "undefined"){
        this.showJump = true;
        this.err = "标题为非法字符";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.price == ""){
        this.showJump = true;
        this.err = "价格未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if (
        this.message.height == ""         
      ) {
        this.showJump = true;
        this.err = "作品尺寸长度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } 
      else if(this.message.width == ""){
        this.showJump = true;
        this.err = "作品尺寸宽度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      
      
      else if(this.message.genre1 == ""){
        this.showJump = true;
        this.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.genre2 == ""){
        this.showJump = true;
        this.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.style_type == ""){
        this.showJump = true;
        this.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.printing_or_embroider == 2 ){
        this.showJump = true;
        this.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else {
        //传图片
        this.showLoading = true;
        let pictrueCount = 0;
        if (self.src1h == 0) {
          let formData = new FormData();
          formData.append("file", self.file1);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            self.message.picture = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }


        //传图片结束
      }
    },
    RegisterStudio2(e) {
      let self = this;
      let num = 1;
      if (e == num) {
        let formData = new FormData();
        formData.append("height", self.message.height);
        formData.append("width", self.message.width);
        formData.append("name", self.message.name);
        formData.append("price", self.message.price);
        formData.append("genre1", self.message.genre1);
        formData.append("genre2", self.message.genre2);
        formData.append("style_type", self.message.style_type);
        formData.append("printing_or_embroider", self.message.printing_or_embroider);
        formData.append("picture", self.message.picture);
        formData.append("size", self.message.size);
        formData.append("id", self.message.id);
        //
        let obj = {
          url: self.all.baseUrl + "/new/materialLibrary/updateMaterialLibrary",
          formdata: formData
        };
        self.getData(obj).then(res => {
          this.showLoading = false;
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "修改素材成功";
            this.change="duihao";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";this.change="";
            }, 2000);
            this.$router.push({
              path: "/newstudio/sucai2",
              query: {}
            });
          } else if (res.data.status == -95) {
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
            }, 2000);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 2000);
          }
        });
        //上传接口结束
      }
    },
    changeEnglish() {
      this.$router.go(0);
    },

    qiehuan(e) {
      this.type = e;
    },
    //e是id r是索引

    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      let self = this;
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        self.add0(m) +
        "-" +
        self.add0(d) +
        " " +
        self.add0(h) +
        ":" +
        self.add0(mm) +
        ":" +
        self.add0(s)
      );
    },
    //e是时间限制有没有 f=1出售中 f=2已下架 g是页码
    tablesucai(e, f, g) {
      let self = this;
      let formData = new FormData();
      this.showLoading = true;
      formData.append("pageSize", 10);
      formData.append("sellerUserId", localStorage.getItem("userId"));
      if (e == 1) {
        formData.append("startTime", self.message2.time1);
        formData.append("endTime", self.message2.time2);
      } //时间限制参数0代表没限制1代表限制
      if (f == 1) {
        formData.append("status", 0);
      } //出售中
      if (f == 2) {
        formData.append("status", -10);
      } //已下架

      if (g) {
        formData.append("page", g);
      } else {
        formData.append("page", 1);
      }
      let obj = {
        url: self.all.baseUrl + "/app3dPatternsSoldByMallSellersJyg/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
        }, 2000);
        if (!res.data.status) {
          this.pageNumber = res.data.result.pages;
          this.pageAuto();
          this.$forceUpdate();
          for (let i = 0; i < this.message2.table.list.length; i++) {
            self.message2.table.list[i].g1 =
              self.hualist1[self.message2.table.list[i].genre1].id;
            self.message2.table.list[i].g2 =
              self.hualist2[self.message2.table.list[i].styleType].id;
            self.message2.table.list[i].genre1 =
              self.hualist1[self.message2.table.list[i].genre1].name +
              "/" +
              self.hualist2[self.message2.table.list[i].styleType].name;
            // self.message2.table.list[i].styleType;

            self.message2.table.list[i].createTime = self.format(
              self.message2.table.list[i].createTime
            );
            if (self.message2.table.list[i].status == 0) {
              self.message2.table.list[i].status = "出售中";
            } else {
              self.message2.table.list[i].status = "已下架";
            }
          }
        } else if (res.data.status == -95) {
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
          }, 2000);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 2000);
        }
      });
    },

    fabu() {
      let self = this;
      if(self.message.name == ""){
          self.showJump = true;
          self.err = "标题未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.price == ""){
          self.showJump = true;
          self.err = "价格未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if (
          self.message.height == ""
      ) {
          self.showJump = true;
          self.err = "作品尺寸长度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } 
      else if(self.message.width == ""){
          self.showJump = true;
          self.err = "作品尺寸宽度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      
      
      else if(self.message.genre1==""||self.message.genre1==undefined){
          self.showJump = true;
          self.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.genre2 == ""||self.message.genre2==undefined){
          self.showJump = true;
          self.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.style_type == "" || self.message.style_type == undefined){
          self.showJump = true;
          self.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.printing_or_embroider == 2 ){
          self.showJump = true;
          self.err = "有素材类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }else if(self.file1 == "" || self.file1 == null ){
          self.showJump = true;
          self.err = "文件未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        //传图片
          self.showLoading = true;
        let pictrueCount = 0;
        let formData = new FormData();
        formData.append("file", self.file1);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.message.picture = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        //传图片结束
      }
    },
    RegisterStudio(e) {
      let self = this;
      let num = 1;
      if (e == num) {
        let formData = new FormData();
        formData.append("height", self.message.height);
        formData.append("width", self.message.width);
        formData.append("name", self.message.name);
        formData.append("price", self.message.price);
        formData.append("genre1", self.message.genre1);
        formData.append("genre2", self.message.genre2);
        formData.append("style_type", self.message.style_type);
        formData.append("printing_or_embroider", self.message.printing_or_embroider);
        formData.append("picture", self.message.picture);
        formData.append("size", self.message.size);
        //
        let obj = {
          url: self.all.baseUrl + "/new/materialLibrary/addMaterialLibraryToShop",
          formdata: formData
        };
        self.getData(obj).then(res => {
            self.showLoading = false;
          if (res.data.status == 0) {
              self.showJump = true;
              self.err = "上传素材成功";
              self.change="duihao";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";self.change="";
            }, 2000);
          } else if (res.data.status == -95) {
              self.showJump = true;
              self.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 2000);
          } else {
              self.showJump = true;
              self.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 2000);
          }
        });
        //上传接口结束
      }
    },
    colortype(e) {
      this.colornum = e;
      this.message.color = e;
    },
    bjcolortype(e) {
      this.message3.colourType = e;
      this.$forceUpdate();
    },
    getFile1(e) {
      var files = e.target.files[0];
      let self = this;
      let filetype = files.name.substring(
        files.name.indexOf(".") + 1,
        files.name.length
      );
      let psd = "png";
      var location = psd.indexOf(filetype);
      if (files.size > 20971520) {
        this.showJump = true;
        this.err = "文件大小超过20MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }else if(location <= -1) {
        this.showJump = true;
        this.err = "请选择png格式文件";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        self.file1 = files;
       self.message.size = files.size  + "";
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.src1 = this.result;
          self.src1h = 0;
          
        };
      }
    },
    getFile2(e) {
      let self = this;
      var files = e.target.files[0];

      let filetype = files.name.substring(
        files.name.indexOf(".") + 1,
        files.name.length
      );
      let psd = "psd";
      var location = psd.indexOf(filetype);
      if (location > -1) {
        this.file2 = files;
        this.message.size = files.size / 8 / 1024 / 1024 + "";
        let self = this;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //self.src = this.result;
          self.src2h = 0;
        };
      }else if(files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.showJump = true;
        this.err = "请选择psd格式文件";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
    },
    getselect() {
      let formData = new FormData();
      let self = this;
      formData.append("id", 4);
      let obj = {
        url: this.all.baseUrl + "/config/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          let result1 = JSON.parse(res.data.result.json1).pdMenu;
          let result2 = JSON.parse(res.data.result.json2).pdStyle;
          result1.map(function(item) {});
          result2.map(function(item) {});
          self.hualist2=result1;
          self.hualist4=result2;
          self.message.genre1=1;
          //   this.message.category3id = result2[0].id;
        } else if (res.data.status == -95) {
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
          }, 2000);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      });
    },

    baocuntupian() {
      let self = this;
      let num = 0; //判断几张图片要传
      this.showLoading = true;
      if (self.message3c.imgurl1 != "") {
        let formData = new FormData();
        formData.append("file", self.message3c.imgurl1);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.message3c.imgurl1 = res.data.result;
          self.baocun(++num);
        });
      }
      if (self.message3c.imgurl2 != "") {
        let formData = new FormData();
        formData.append("file", self.message3c.imgurl2);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.message3c.imgurl2 = res.data.result;
          self.baocun(++num);
        });
      }
      if (self.message3c.imgurl3 != "") {
        let formData = new FormData();
        formData.append("file", self.message3c.imgurl3);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.message3c.imgurl3 = res.data.result;
          self.baocun(++num);
        });
      }
      if (self.message3c.imgurl4 != "") {
        let formData = new FormData();
        formData.append("file", self.message3c.imgurl4);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.message3c.imgurl4 = res.data.result;
          self.baocun(++num);
        });
      }
      //传图片结束
    },
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },
  mounted() {
    this.xiugaif();
    this.getselect();
    // localStorage.setItem("path", this.path);
    
    
    this.xuanzhongf(1);
  }
};
</script>

<style scoped>
input::-webkit-input-placeholder{text-indent: 8px;color: #979797}
input {
  outline-color: #ffe300;
  font-size: 14px;
  
}
button{
  cursor:pointer;
}
label{
  cursor:pointer;
}
select{
  text-indent: 8px;outline-color: #ffe300;
  font-size: 14px;cursor:pointer;
}
.sf1 {
  position: absolute;
  top: 0;
  left: 0;
  /* margin-top: -27px; */
}
.sf2 {
  position: absolute;
  top: 106px;
  left: 0;
  width: 296px;
  text-align: center;
  color: #bdbbbb;
}
.fabu {
  width: 184px;
  height: 47px;
  border: 0;
  border-radius: 4px;
  background: #ffe300;
  font-size: 16px;
  color: #666666;
  margin-top: 146px;
}
.fabu:hover{
  background:#ffd000;
}
.wenzi {
  position: absolute;
  top: 110px;
  left: 0;
  width: 294px;
  text-align: center;
  z-index: 1;
}
.upload {
  position: relative;
  border-radius: 10px;
  left: 280px;
  width: 294px;
  height: 140px;
  /* background-image: url("../../assets/image/studio/newtu.png"); */
  background-size: 298px 140px;
  /* background-size: 365px 185px; */
}
.upload2 {
  border-radius: 10px;
  width: 294px;
  height: 140px;
  position: relative;
  top: -140px;
  left: 350px;
  /* background-image: url("../../assets/image/studio/newfile.png"); */
  background-size: 298px 140px;
  /* background-size: 365px 185px; */
}
.img-container {
  width: 294px;
  height: 140px;
  border: 1px solid #979797;
  border-radius: 4px;
  text-align: center;
  z-index: 100;
}
.img-container img{
  border-radius: 4px !important;
}
.zhezhao {
  width: 294px;
  height: 140px;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0); */
}
.zhezhao2 {
  width: 294px;
  height: 140px;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0); */
}

.xiugai {
  width: 882px;
  height: 1108px;
  padding-top: 42px;
  padding-left: 78px;
  background: #ffffff;
  border: 0;
  position: relative;font-size: 14px;
}
.select {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 158px;
  height: 38px;
  margin-right: 42px;
}
.select2 {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 158px;
  height: 38px;
  position: absolute;
  top: 292px;
  left: 676px;
}
input {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 150px;
  height: 38px;
  padding-left:8px 
}
.kuai {
  height: 85px;
  text-align: left;
  width: 400px;
  
}
.title {
  height: 20px;
  width: 160px;
  margin-bottom:9px; 
}
.biaoti {
  font-family: SourceHanSansCN-Medium;
  font-weight: bold;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: left;
  width: 900px;
  height: 30px;
  line-height: 30px;
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
</style>