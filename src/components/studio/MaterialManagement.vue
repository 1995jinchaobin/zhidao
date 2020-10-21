<template>
  <div class="window">
    <Studiotap @showEnglish="changeEnglish" :tabIndex="tabIndex"></Studiotap>
    <div class="studio">
      <div @click="qiehuan(0)" :class="type==0?'click':''">上传素材</div>
      <div @click="qiehuan(1)" :class="type==1?'click':''">管理素材</div>
    </div>
    <div class="shuru" v-if="type==0">
      <div>
        标题
        <input v-model="message.title" />
      </div>
      <div>
        价格
        <input v-model="message.price" />
      </div>
      <div>
        尺寸
        <span class="height">长</span>
        <input class="hinput" v-model="message.width" />
        <span class="px1">px</span>
        <span class="width">宽</span>
        <input class="winput" v-model="message.height" />
        <span class="px2">px</span>
      </div>
      <div>
        素材类别
        <select class="select1" v-model="message.category1">
          <option>印花</option>
          <option>绣花</option>
        </select>
        <select class="select2" v-model="message.category2id">
          <option v-for="item in category2" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <select class="select3" v-model="message.category3id">
          <option v-for="item in category3" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
      </div>
      <div>
        素材图片
        <div class="upload">
          <div class="img-container">
            请上传一张高清透明底PNG格式图片最大5MB
            <img class="image1" :src="src" width="800" height="367" alt />
          </div>
          <input type="file" @change="getFile" accept="image/png" ref="file" id="file" />
          <label class="zhezhao" for="file"></label>
        </div>
      </div>
      <button class="fabu" @click="fabu()">发布</button>
    </div>
    <div class="shuru" v-if="type==1">
      <div class="time">发布时间</div>
      <input class="time1" type="date" v-model="message2.time1" />
      <div class="zhi">至</div>
      <input class="time2" type="date" v-model="message2.time2" />
      <button class="b1" @click="b1(1)">搜索</button>
      <button class="b2" @click="b1(0)">全部</button>
      <button class="b3" :class="xianzhi2==0 ? 'b6' : '' " @click="b3(0)">全部</button>
      <button class="b4" :class="xianzhi2==1 ? 'b6' : '' " @click="b3(1)">出售中</button>
      <button class="b5" :class="xianzhi2==2 ? 'b6' : '' " @click="b3(2)">已下架</button>
      <table class="table">
        <tr>
          <th>素材名称</th>
          <th>类别</th>
          <th>价格(元)</th>
          <th>原始发布时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in message2.table.list" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.genre1}}</td>
          <td>{{item.price}}</td>
          <td>{{item.createTime}}</td>
          <td>{{item.status}}</td>
          <td>
            <button>编辑</button>
            <button>上架</button>
          </td>
        </tr>
      </table>
      <!-- <div class="wu"> -->
      <div class="wu" v-if="message2.table.pages==0">
        <img src="../../assets/image/cut/kong.png" alt />
        <div>空空如也~~</div>
      </div>
      <div class="pageBox" v-if="message2.table.pages!=''">
        <div class="zuosanjiao" @click="prev"></div>
        <div
          @click="btnClick(index)"
          :class="index==pageIndex-1?'click1':''"
          v-for="(item,index) in page"
          :key="index"
        >{{item.name}}</div>
        <div class="yousanjiao" @click="next"></div>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Studiotap from "../../components/Studiotap";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";

export default {
  name: "materialManagement",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      type: 1,
      showJump: false,
      tabIndex: 1,
      showLoading: false,
      file: "",
      src: "",
      category2: "",
      category3: "",
      xianzhi1: 0, //时间限制
      xianzhi2: 0, //出售限制
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      message: {
        title: "测试", //标题
        price: "10",
        width: "300",
        height: "450",
        category1: "印花",
        category2: "",
        category2id: "",
        category3: "",
        category3id: "",
        image: ""
      },
      message2: {
        time1: "",
        time2: "",
        table: ""
      }
    };
  },
  methods: {
    b1(e) {
      let self = this;
      this.xianzhi1 = e;
      console.log(self.message2);
      if (e == 1) {
        if (self.message2.time1 == "" || self.message2.time1 == "") {
          this.showJump = true;
          this.err = "有时间为空";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          this.xianzhi1 = e;
          self.tablesucai(self.xianzhi1, self.xianzhi2);
        }
      } else {
        self.tablesucai(self.xianzhi1, self.xianzhi2);
      }
    },
    b3(e) {
      let self = this;
      this.xianzhi2 = e;
      self.tablesucai(self.xianzhi1, self.xianzhi2);
    },
    // 初始化分页器
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
              console.log(1);
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
              console.log(1);
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
            console.log(1);
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
            console.log(1);
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
          }, 1000);
        } else {
          this.cnt -= 1;
          this.pageIndex -= 1;
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
          }
        } else {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
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
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
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
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      }
    },
    changeEnglish() {
      this.$router.go(0);
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
    qiehuan(e) {
      this.type = e;
    },
    tablesucai(e, f, g) {
      let self = this;
      let formData = new FormData();
      this.showLoading = true;
      console.log(g);
      formData.append("type", 2); //0共享素材，1VIP素材，2商城素材
      formData.append("pageSize", 2);
      formData.append("page", 1);
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
      let obj = {
        url: self.all.baseUrl + "/app3dMaterialLibraryJyg/list",
        formdata: formData
      };
      if (g) {
        formData.append("page", g);
      }
      self.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
        }, 1000);
        if (res.data.status == 0) {
          console.log(res.data);
          this.message2.table = res.data.result;
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
            self.message2.table.list[i].genre1 =
              self.category2[self.message2.table.list[i].genre1].name +
              "/" +
              self.category3[self.message2.table.list[i].styleType].name;
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
        } else {
          console.log(res.data);
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        }
      });
    },
    weikaitong() {
      let self=this;
      this.showJump = true;
      this.err = "暂未开通";
      setTimeout(function() {
        self.showJump = false;
        self.err = "";
        self.$router.push({
        path: "/Studio",
      });
      }, 1500);
      
    },
    fabu() {
      let self = this;
      this.showLoading = true;
      if (
        this.message.title == "" ||
        this.message.price == "" ||
        this.message.width == "" ||
        this.message.height == "" ||
        this.file == "" ||
        this.message.category2id == "" ||
        this.message.category3id == ""
      ) {
        console.log(this.message);
        console.log(this.file);
        this.showJump = true;
        this.err = "有选项未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        //传图片
        let self = this;
        let pictrueCount = 0;
        console.log(1);
        let formData = new FormData();
        formData.append("file", self.file);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          console.log(res.data.result);
          self.message.image = res.data.result;
          self.upload(++pictrueCount);
        });
      }
    },
    upload(e) {
      if ((e = 1)) {
        let self = this;
        let formData = new FormData();

        formData.append("type", 2); //0共享素材，1VIP素材，2商城素材
        formData.append("name", self.message.title);
        formData.append("picture", self.message.image);
        formData.append("price", self.message.price);
        formData.append("width", self.message.width);
        formData.append("height", self.message.height);
        formData.append("genre1", self.message.category2id);
        formData.append("styleType", self.message.category3id);
        if (self.message.category1 == "绣花") {
          formData.append("printingOrEmbroider", 1);
        } else {
          formData.append("printingOrEmbroider", 0);
        }

        let obj = {
          url: self.all.baseUrl + "/app3dMaterialLibraryJyg/save",
          formdata: formData
        };

        self.getData(obj).then(res => {
          setTimeout(function() {
            self.showLoading = false;
          }, 1000);
          this.showJump = true;
          this.err = "上传成功";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
          this.tablesucai();
        });
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
          let result = JSON.parse(res.data.result.json1).pdMenu;
          let result2 = JSON.parse(res.data.result.json2).pdStyle;
          result.map(function(item) {});
          result2.map(function(item) {});

          this.category2 = result;
          this.category3 = result2;
          this.message.category2 = result[0].name;
          this.message.category3 = result2[0].name;
          this.message.category2id = result[0].id;
          this.message.category3id = result2[0].id;
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = "您的账号已过期";
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
    },
    getFile(e) {
      let self = this;
      var files = e.target.files[0];
      console.log(files.size);
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        this.file = files;
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          _this.src = this.result;
        };
      }
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
    //暂未开通
    this.weikaitong();
    // this.getselect();
    // this.tablesucai();
    localStorage.setItem("path", "/MaterialManagement");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnmaterialManagement"
      });
    } else {
      this.$router.push({
        path: "/MaterialManagement"
      });
    }
  }
};
</script>
<style scoped>
.wu {
  position: absolute;
  width: 600px;
  height: 700px;
  left: 400px;
  text-align: center;
}
.wu img {
  width: auto;
  height: 600px;
}
.wu div {
  width: 600px;
  height: 100px;
  font-size: 48px;
  color: #c1bfbf;
  text-align: center;
}
.table {
  width: 1400px;
  position: absolute;
  top: 200px;
  text-align: center;
  border-collapse: collapse;
}
th {
  height: 66px;
  border: 1px solid #050505;
}
td {
  height: 66px;
  border: 1px solid #050505;
}
.time1 {
  top: 50px;
}

.time2 {
  top: 50px;
  left: 600px;
}
.xuanzhong {
  background-color: #485765;
}
.b1 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #485765;
  color: white;
  position: absolute;
  top: 50px;
  right: 250px;
}
.b2 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  top: 50px;
  right: 50px;
}
.b3 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  top: 100px;
  left: 50px;
}
.b4 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  top: 100px;
  left: 250px;
}
.b5 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  top: 100px;
  left: 450px;
}
.b6 {
  background-color: #485765;
}
input {
  width: 365px;
  height: 41px;
  border-radius: 10px;
  background-color: #ddd;
  border: 1px solid #ddd;
  text-indent: 10px;
  position: absolute;
  left: 180px;
  top: 0px;
}
.zhi {
  position: absolute !important;
  left: 560px;
  top: 50px;
}
.zhezhao {
  width: 800px;
  height: 367px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, 0);
}

.image1 {
  position: absolute;
  left: 0;
}

.upload {
  width: 800px;
  border-radius: 10px;
  height: 367px;
  position: absolute;
  left: 180px;
  top: 10px;
  /* background-size: 365px 185px; */
}

.fabu {
  width: 248px;
  height: 89px;
  color: white;
  background-color: #485765;
  border-radius: 20px;
  font-size: 25px;
  position: absolute;
  left: 500px;
  top: 850px;
  border: 0;
}

.img-container {
  width: 800px;
  height: 367px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: #c7c5c5;
  text-align: center;
  line-height: 367px;
}

input[type="file"] {
  display: none;
  z-index: 10;
  width: 120px;
  font-size: 0;
  height: 30px;
}

.select1 {
  width: 114px;
  height: 40px;
  position: absolute;
  left: 180px;
  top: 0;
  text-align: center;
  text-align-last: center;
  border: 0;
  background-color: #ddd;
}

.select2 {
  width: 365px;
  height: 40px;
  position: absolute;
  left: 334px;
  top: 0;
  text-align: center;
  text-align-last: center;
  border: 0;
  background-color: #ddd;
}

.select3 {
  width: 216px;
  height: 40px;
  position: absolute;
  left: 739px;
  top: 0;
  text-align: center;
  text-align-last: center;
  border: 0;
  background-color: #ddd;
}

.height {
  position: absolute;
  left: 180px;
}

.width {
  position: absolute;
  left: 520px;
}

.px1 {
  position: absolute;
  left: 465px;
}

.px2 {
  position: absolute;
  left: 805px;
}

.hinput {
  width: 240px;
  left: 215px;
}

.winput {
  width: 240px;
  left: 555px;
}

.window {
  width: 1920px;
  height: 1500px;
  background-color: rgb(215, 215, 218);
}

.shuru {
  width: 1400px;
  height: 1249px;
  padding: 50px;
  position: absolute;
  left: 360px;
  top: 110px;
  font-size: 26px;
  color: #050500;
  background-color: rgba(255, 255, 255, 0.85);
}

.studio {
  width: 244px;
  height: 1359px;
  background-color: #485765;
  color: white;
  font-size: 20px;
  text-align: center;
  position: absolute;
  left: 61px;
  top: 100px;
}

.shuru > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
}

.studio > div {
  margin-top: 30px;
  height: 61px;
  line-height: 61px;
  margin-bottom: 90px;
}

.click {
  width: 264px;
  position: relative;
  left: -10px;
  background-color: #0362d7;
}
.pageBox {
  position: absolute;
  width: 550px;
  height: 45px;
  background-color: white;
  left: 475px;
  top: 950px;
  display: table;
}
.pageBox div {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  display: table-cell;
}
.pageBox .click1 {
  background: #133ffc;
  color: white;
}
.zuosanjiao {
  width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-right: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  left: 0px;
}
.yousanjiao {
  width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-left: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  right: 0px;
}
@media screen and (max-width: 1800px) {
  .shuru {
    width: 1400px;
    left: 50px;
  }
  .studio {
    display: none;
  }
}
</style>
