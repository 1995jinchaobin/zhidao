<template>
  <div class="xiugai">
    <div v-if="xiugai!=1" class="biaoti">上传花型</div>
    <div v-if="xiugai==1" class="biaoti">修改花型</div>
    <hr class="hr" />
    <div class="kuai">
      <div class="title">标题</div>
      <input v-model="message.name" />
    </div>
    <div class="kuai" style="position: absolute;top: 93px;left: 534px;">
      <div class="title" type="number">价格</div>
      <input v-model="message.price"  @input="oninput1"/>
    </div>

    <div class="kuai">
      <div class="title">作品尺寸</div>
      <input placeholder="长"  type="number" @input="oninput2" v-model="message.size_height" style />
      <span style="font-size:15px;margin-left:10px">px</span>
      <input placeholder="宽" type="number"  @input="oninput3" v-model="message.size_width" style="margin-left:10px" />
      <span style="font-size:15px;margin-left:10px">px</span>
    </div>
    <div class="kuai" style="position:absolute;top: 178px;left: 534px;">
      <div class="title"   >分辨率</div>
      <input v-model="message.resolution_ratio" maxlength="9" type="number" @input="oninput4"  />
    </div>
    <div class="kuai">
      <div class="title">花型类别</div>
      <select class="select" v-model="message.genre1">
        <option v-for="item in hualist2" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
      <select class="select" v-model="message.style_type" style="top: -40px;
      left: 600px;">
        <option v-for="item in hualist1" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>
      
    </div>
    <div class="kuai">
      <div class="title">连接方式</div>
      <select class="select2" v-model="message.connect">
        <option v-for="item in hualist3" :value="item.id" :key="item.id">{{item.name}}</option>
      </select>
    </div>
    <div class="biaoti">上传图片</div>
    <hr class="hr">
    <div class="kuai">
      <div class="title">作品尺寸</div>
    </div>
    <div class="flowerimage">
      <div class="upload">
        <div class="img-container">
          <img :src="src1" width="294" height="140" alt />
          <img class="sf1" v-if="src1==''" src="../../assets/image/studio/newtu.png" alt />
          <div class="sf2" v-if="src1==''">请上传一张高清png或jpg格式图片5M以内</div>
        </div>
        <input type="file" style="display:none" @change="getFile1" ref="file" id="file1" />
        <label class="zhezhao" for="file1"></label>
      </div>
      <div class="upload2">
        <div class="img-container">
          <img v-if="src2!=''" :src="src2" width="300" height="200" alt />
          <img class="sf1" v-if="src2==''" src="../../assets/image/studio/newfile.png" alt />
          <div class="sf2" v-if="src2==''">{{src2text}} </div>
        </div>
        <input
          type="file"
          style="display:none"
          @change="getFile2"
          
          ref="file"
          id="file2"
        />
        <label class="zhezhao2" for="file2"></label>
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
      path: "/newstudio/huaxing1",
      showJump: false,
      xiugai: this.$route.query.xiugai,
      message2: this.$route.query.message,
      change: "",
      err: "",
      showLoading: false,
      src1: "",
      src2: "",
      src1h: 0,
      src2h: 0,
      src2text:'请上传一张PSD格式的源文件',
      file1: "",
      file2: "",
      hualist1: "",
      hualist2: "",
      hualist3: [
        { id: 1, name: "独幅" },
        { id: 2, name: "四方连续" },
        { id: 3, name: "二方连续" }
      ],
      message: {
        change:"",
        size_height: "",
        size_width: "",
        resolution_ratio: "",
        source_file: "",
        name: "",
        price: "",
        genre1: -1,
        style_type: -1,
        colour_type: "",
        connect: "",
        picture1: "",
        size: ""
      }
    };
  },
  methods: {
    oninput1(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      if(e.target.value<0){
        e=null
      }
      this.message.price=e.target.value;
    },
    oninput2(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      if(e.target.value<0){
        e=null
      }
      this.message.size_height=e.target.value;        
    },
    oninput3(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      if(e.target.value<0){
        e=null
      }
      this.message.size_width=e.target.value;        
    },
    oninput4(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      if(e.target.value<0){
        e=null
      }
      this.message.resolution_ratio=e.target.value;
    },
    priceCheck(){
        e.target.value = (e.target.value.match(/^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/)) || null;
        if(e.target.value<0){
            e=null
        }
        this.message.price=e.target.value;
    },
    xiugaif() {
      if (this.xiugai == 1) {
        this.message = this.message2;
        this.src1 = this.message2.picture1;
        this.src1h = 1;
        this.src2h = 1;
      }
    },
    fabu2() {
      let self = this;
      if(this.message.name == ""||this.message.name == "null"||this.message.name == "undefined"){
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
        this.message.size_height == ""         
      ) {
        this.showJump = true;
        this.err = "作品尺寸长度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } 
      else if(this.message.size_width == ""){
        this.showJump = true;
        this.err = "作品尺寸宽度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.resolution_ratio == ""){
        this.showJump = true;
        this.err = "分辨率";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      
      else if(this.message.genre1 == ""){
        this.showJump = true;
        this.err = "花型类别第一个下拉框未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.style_type == ""){
        this.showJump = true;
        this.err = "花型类别第二个下拉框未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(this.message.connect == ""){
        this.showJump = true;
        this.err = "连接方式未选";
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
            console.log(res.data.result);
            self.message.picture1 = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }
        
        if (self.src2h == 0) {
          if (this.message.connect != "") {
            let formData = new FormData();
            formData.append("file", self.file2);
            let obj = {
              url: self.all.baseUrl + "/file/uploadOss",
              formdata: formData
            };
            self.getData(obj).then(res => {
              console.log(res.data.result);
              self.message.source_file = res.data.result;
              self.RegisterStudio2(++pictrueCount);
            });
          }
        } else {
          self.RegisterStudio2(++pictrueCount);
        }
        
        //传图片结束
      }
    },
    RegisterStudio2(e) {
      let self = this;
      let num = 2;
      console.log(this.message);
      if (e == num) {
        let formData = new FormData();
        formData.append("id", self.message.id);
        formData.append("size_height", self.message.size_height);
        formData.append("size_width", self.message.size_width);
        formData.append("resolution_ratio", self.message.resolution_ratio);
        formData.append("source_file", self.message.source_file);
        formData.append("name", self.message.name);
        formData.append("price", self.message.price);
        formData.append("genre1", self.message.genre1);
        formData.append("style_type", self.message.style_type);
        formData.append("connect", self.message.connect);
        formData.append("picture1", self.message.picture1);
        formData.append("size", self.message.size);
        //
        let obj = {
          url: self.all.baseUrl + "/new/patternsSold/updatePatternsSold",
          formdata: formData
        };
        self.getData(obj).then(res => {
          console.log(res);
          this.showLoading = false;
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "修改花型成功";
            self.change="duihao";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.change="";
            }, 2000);
            this.$router.push({
              path: "/newstudio/huaxing2",
              query: {}
            });
          }else if (res.data.status == -95) {
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
          }  else {
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
    bianji(e, r) {
      let self = this;
      this.message3 = this.message2.table.list[r];
      this.message3c.id = e;
      this.type = 2;
      if (this.message3.connect == 1) {
        this.message3.connect = "独幅";
      } else if (this.message3.connect == 2) {
        this.message3.connect = "二方连续";
      } else {
        this.message3.connect = "四方连续";
      }
      this.$forceUpdate();
      console.log(this.message3);
    },

    pageAuto() {
      let self = this;
      this.$forceUpdate();
      if (!this.page.length) {
        if (this.pageNumber <= 7) {
          for (let i = 0; i < this.pageNumber; i++) {
            this.page.push({ name: i + 1 });
          }
        } else {
          this.page = [
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: "···" },
            { name: this.pageNumber }
          ];
        }
      }
    },
    // 分页器每个点击
    btnClick(index) {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        this.cnt = index + 1;

        self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
        this.$forceUpdate();
        this.pageIndex = index + 1;
      } else {
        // 状态0
        if (this.flag == 0) {
          if (index == 5) {
          } else if (index == 4) {
            this.cnt = this.page[index].name;
            if (this.pageNumber - this.cnt <= 3) {
              this.flag = 2;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              this.pageIndex = 4;
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            }
          } else if (index == 6) {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7;
            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
            } else if (this.pageNumber - this.cnt <= 4) {
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              this.flag = 2;
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            }
          }
        } else if (this.flag == 2) {
          if (index == 1) {
          } else if (index == 2) {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              this.flag = 0;
              this.pageIndex = this.cnt;
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            } else {
              this.flag = 1;
              this.pageIndex = 4;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            }
          } else if (index == 0) {
            this.cnt = this.page[index].name;
            this.flag = 0;
            this.pageIndex = 1;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          }
        }
      }
    },
    prev() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt == 1) {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        } else {
          this.cnt -= 1;
          this.pageIndex -= 1;
          self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
        }
      } else {
        if (this.cnt != 1) {
          this.cnt--;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];

            this.pageIndex = this.cnt;

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            this.pageIndex = 4;

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          }
        } else {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      }
    },
    // 下一页
    next() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt < this.pageNumber) {
          this.cnt += 1;
          this.pageIndex += 1;

          self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      } else {
        if (this.cnt < this.pageNumber) {
          this.cnt++;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];

            this.pageIndex = this.cnt;

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];

            this.pageIndex = 4;

            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      }
    },
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
      console.log(g);
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
        if (res.data.status == 0) {
          console.log(res.data);
          // this.message2.table = res.data.result;
          console.log(res.data.result.pages);
          // console.log(this.message2.table.list.length);
          this.pageNumber = res.data.result.pages;
          this.pageAuto();
          this.$forceUpdate();
          for (let i = 0; i < this.message2.table.list.length; i++) {
            // console.log(
            //   self.category2[self.message2.table.list[i].genre1].name
            // );
            // console.log(
            //   self.category3[self.message2.table.list[i].styleType].name
            // );
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
        }else if (res.data.status == -95) {
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
          }  else {
          console.log(res.data);
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
      else if(self.message.price <0){
          self.showJump = true;
          self.err = "价格必须大于0";
          setTimeout(function() {
              self.showJump = false;
              self.err = "";
          }, 2000);
      }else if (
          self.message.size_height == ""
      ) {
          self.showJump = true;
          self.err = "作品尺寸长度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.size_width == ""){
          self.showJump = true;
          self.err = "作品尺寸宽度未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.resolution_ratio == ""){
          self.showJump = true;
          self.err = "分辨率未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      
      
      else if(self.message.genre1 == -1){
          self.showJump = true;
          self.err = "有花型类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.style_type == -1){
          self.showJump = true;
          self.err = "有花型类别未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.message.connect == ""){
          self.showJump = true;
          self.err = "连接方式未选";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.file1 == ""){
          self.showJump = true;
          self.err = "png文件未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
      else if(self.file2 == ""){
          self.showJump = true;
          self.err = "psd文件未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
       else {
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
          console.log(res.data.result);
          self.message.picture1 = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        if (self.file2 != "") {
          let formData = new FormData();
          formData.append("file", self.file2);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.source_file = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        //传图片结束
      }
    },
    RegisterStudio(e) {
      let self = this;
      let num = 2;
      console.log(this.message);
      if (e == num) {
        let formData = new FormData();
        formData.append("size_height", self.message.size_height);
        formData.append("size_width", self.message.size_width);
        formData.append("resolution_ratio", self.message.resolution_ratio);
        formData.append("source_file", self.message.source_file);
        formData.append("name", self.message.name);
        formData.append("price", self.message.price);
        formData.append("genre1", self.message.genre1);
        formData.append("style_type", self.message.style_type);
        formData.append("connect", self.message.connect);
        formData.append("picture1", self.message.picture1);
        formData.append("size", self.message.size);
        //
        let obj = {
          url: self.all.baseUrl + "/new/patternsSold/addPatternsSold",
          formdata: formData
        };
        self.getData(obj).then(res => {
          console.log(res);
          this.showLoading = false;
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "上传花型成功";
            self.change="duihao";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.change="";
              self.$router.push({
                  path: "/newstudio/huaxing2",
                  query: {}
              });
            }, 2000);
          }else if (res.data.status == -95) {
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
          }  else {
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
      let self=this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.file1 = files;
        let self = this;
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

        this.message.size = files.size  + "";
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //self.src = this.result;
          self.src2h = 0;
          self.src2text=files.name;
        };
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
      formData.append("id", 11);
      let obj = {
        url: this.all.baseUrl + "/config/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          let result = JSON.parse(res.data.result.json1).dcStyle;
          //   let result2 = JSON.parse(res.data.result.json2).pdStyle;
          result.map(function(item) {});
          //   result2.map(function(item) {});
          this.hualist1 = result;
          //   this.category3 = result2;
          this.message.huatype1 = result[0].id;
          //   this.message.category3 = result2[0].name;
          //   this.message.category2id = result[0].id;
          //   this.message.category3id = result2[0].id;
        }else if (res.data.status == -95) {
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
          }  else {
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
    getselect2() {
      let formData = new FormData();
      let self = this;
      formData.append("id", 12);
      let obj = {
        url: this.all.baseUrl + "/config/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        console.log(res.data);
        if (res.data.status == 0) {
          let result = JSON.parse(res.data.result.json1).dcStyle;
          //   let result2 = JSON.parse(res.data.result.json2).pdStyle;
          result.map(function(item) {});
          //   result2.map(function(item) {});
          this.hualist2 = result;
          //   this.category3 = result2;
          this.message.huatype2 = result[0].id;
        }else if (res.data.status == -95) {
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
          }  else {
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
    bjgetFile(e) {
      let self = this;
      var files = e.target.files[0];

      let filetype = files.name.substring(
        files.name.indexOf(".") + 1,
        files.name.length
      );

      let psd = "psd";
      var location = psd.indexOf(filetype);
      if (location > -1) {
        this.message3c.file = files;

        this.message3c.filesize = files.size / 8 / 1024 / 1024 + "";
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          // self.src = this.result
        };
      } else {
        this.showJump = true;
        this.err = "请选择psd格式文件";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      }
    },
    bjgetFile1(e) {
      var files = e.target.files[0];
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.message3c.imgurl1 = files;
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.message3.picture1 = this.result;
        };
      }
    },
    bjgetFile2(e) {
      var files = e.target.files[0];
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.message3c.imgurl2 = files;
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.message3.picture2 = this.result;
        };
      }
    },
    bjgetFile3(e) {
      var files = e.target.files[0];
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.message3c.imgurl3 = files;
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.message3.picture3 = this.result;
        };
      }
    },
    bjgetFile4(e) {
      var files = e.target.files[0];
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.message3c.imgurl4 = files;
        let self = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.message3.picture4 = this.result;
        };
      }
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
          console.log(res.data.result);
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
          console.log(res.data.result);
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
          console.log(res.data.result);
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
          console.log(res.data.result);
          self.message3c.imgurl4 = res.data.result;
          self.baocun(++num);
        });
      }
      //传图片结束
    },
    baocun(e) {
      console.log(this.message3, this.message3c);
      let self = this;
      let formData = new FormData();
      let num2 = 0; //传了几张图片
      if (self.message3c.imgurl1 != "") {
        num2++;
      }
      if (self.message3c.imgurl2 != "") {
        num2++;
      }
      if (self.message3c.imgurl3 != "") {
        num2++;
      }
      if (self.message3c.imgurl4 != "") {
        num2++;
      }
      if (num2 == e) {
        formData.append("sizeHeight", self.message3.sizeHeight);
        formData.append("sizeWidth", self.message3.sizeWidth);
        formData.append("resolutionRatio", self.message3.resolutionRatio);
        if (self.message3c.file != "") {
          formData.append("sourceFile", self.message3c.file);
          formData.append("size", self.message3c.filesize);
        }
        formData.append("name", self.message3.name);
        formData.append("price", self.message3.price);
        formData.append("genre1", self.message3.g1);
        formData.append("styleType", self.message3.g2);
        formData.append("colourType", self.message3.colourType);
        if (self.message3.connect == "独幅") {
          formData.append("connect", 1);
        } else if (self.message3.connect == "四方连续") {
          formData.append("connect", 2);
        } else {
          formData.append("connect", 3);
        }
        if (self.message3c.imgurl1 != "") {
          formData.append("picture1", self.message3c.imgurl1);
        }
        if (self.message3c.imgurl2 != "") {
          formData.append("picture2", self.message3c.imgurl2);
        }
        if (self.message3c.imgurl3 != "") {
          formData.append("picture3", self.message3c.imgurl3);
        }
        if (self.message3c.imgurl4 != "") {
          formData.append("picture4", self.message3c.imgurl4);
        }
        formData.append("id", self.message3c.id);
        let obj = {
          url: self.all.baseUrl + "/app3dPatternsSoldByMallSellersJyg/update",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            console.log(res.data);
            this.showJump = true;
            this.err = "修改成功即将跳转";
            this.showLoading = false;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.tablesucai(self.xianzhi1, self.xianzhi2);
              self.type = 1;
            }, 2000);
          }else if (res.data.status == -95) {
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
          }  else {
            console.log(res.data);
            this.showJump = true;
            this.err = res.data.msg;
            this.showLoading = false;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 2000);
          }
        });
      }
    }
  },
  mounted() {
    // localStorage.setItem("path", this.path);
    this.xiugaif();
    this.getselect();
    this.getselect2();
    
  }
};
</script>

<style scoped>

.flowerimage{
  position: relative;
  left:60px ;
}
input::-webkit-input-placeholder{text-indent: 8px;color: #979797}
input {
  
  font-size: 14px;
  
}
input:focus{
  outline-color: #ffe300;
}
textarea{
  outline-color: #ffe300;
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
  position: relative;
  left: -55px;
}
.fabu:hover{
  background: #ffd000;
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
  border-radius: 4px;
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
  margin-right: 36px;
}
.select2 {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 240px;
  height: 38px;
}
input {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 150px;
  padding-left:8px; 
  height: 38px;
}
.kuai {
  height: 85px;
    text-align: left;
    width: 400px;
}
.title {
  height: 20px;
    width: 160px;
    margin-bottom: 9px;
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