<template>
  <div class="window">
    <Studiotap @showEnglish="changeEnglish" :tabIndex="tabIndex"></Studiotap>
    <div class="studio">
      <div @click="qiehuan(0)" :class="type==0?'click':''">上传花型</div>
      <div @click="qiehuan(1)" :class="type!=0?'click':''">管理花型</div>
    </div>
    <div class="shuru" v-if="type==0">
      <div>
        标题
        <input v-model="message.title" />
      </div>
      <div>
        价格
        <input v-model="message.price" />
        <span style="position:relative;left: 500px;">元</span>
      </div>
      <div>
        PSD源文件
        <input type="file" @change="getFile" accept="image/*" ref="file" id="file" />
        <label class="uploadfile" for="file">上传文件</label>
      </div>
      <div>
        尺寸
        <span style="position:relative;left: 120px;">长</span>
        <input v-model="message.width" style="width:182px;position:relative;left:125px;" />
        <span style="position:relative;left: 130px;">px</span>
        <span style="position:relative;left: 170px;">高</span>
        <input v-model="message.height" style="width:182px;position:relative;left:190px;" />
        <span style="position:relative;left: 200px;">px</span>
      </div>
      <div>
        分辨率
        <input v-model="message.fenbian" />
        <span style="position:relative;left: 480px;">dpl</span>
      </div>
      <div style="height:150px">
        连接方式
        <select class="select" v-model="message.lianjie">
          <option>独幅</option>
          <option>二方连续</option>
          <option>四方连续</option>
        </select>
      </div>
      <div>
        花型类别
        <select class="select" v-model="message.huatype1">
          <option v-for="item in hualist1" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <select class="select" v-model="message.huatype2" style="top: -40px;
      left: 600px;">
          <option v-for="item in hualist2" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <!-- <select class="select2" v-model="message.category2id">
          <option v-for="item in category2" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>-->
      </div>
      <div class="color">
        色系
        <img @click="colortype(11)" src="../../assets/image/studio/color0.png" alt />
        <img @click="colortype(1)" src="../../assets/image/studio/color1.png" alt />
        <img @click="colortype(2)" src="../../assets/image/studio/color2.png" alt />
        <img @click="colortype(3)" src="../../assets/image/studio/color3.png" alt />
        <img @click="colortype(4)" src="../../assets/image/studio/color4.png" alt />
        <img @click="colortype(5)" src="../../assets/image/studio/color5.png" alt />
        <img @click="colortype(6)" src="../../assets/image/studio/color6.png" alt />
        <img @click="colortype(7)" src="../../assets/image/studio/color7.png" alt />
        <img @click="colortype(8)" src="../../assets/image/studio/color8.png" alt />
        <img @click="colortype(9)" src="../../assets/image/studio/color9.png" alt />
        <img @click="colortype(10)" src="../../assets/image/studio/color10.png" alt />
        <br />
        <span v-show="colornum==11" class="correct0"></span>
        <span v-show="colornum==1" class="correct1"></span>
        <span v-show="colornum==2" class="correct2"></span>
        <span v-show="colornum==3" class="correct3"></span>
        <span v-show="colornum==4" class="correct4"></span>
        <span v-show="colornum==5" class="correct5"></span>
        <span v-show="colornum==6" class="correct6"></span>
        <span v-show="colornum==7" class="correct7"></span>
        <span v-show="colornum==8" class="correct8"></span>
        <span v-show="colornum==9" class="correct9"></span>
        <span v-show="colornum==10" class="correct10"></span>
      </div>
      <div class="flowerimage">
        花型图片
        <span style="font-size:12px">您最多可上传4张滑行图片，每张图片不超过5MB</span>
        <div class="upload">
          <div class="img-container">
            <img :src="src" width="300" height="200" alt />
          </div>
          <input type="file" @change="getFile1" ref="file" id="file1" />
          <label class="zhezhao" for="file1"></label>
        </div>
        <div class="upload2">
          <div class="img-container">
            <img :src="src2" width="300" height="200" alt />
          </div>
          <input type="file" @change="getFile2" ref="file" id="file2" />
          <label class="zhezhao" for="file2"></label>
        </div>
        <div class="upload3">
          <div class="img-container">
            <img :src="src3" width="300" height="200" alt />
          </div>
          <input type="file" @change="getFile3" ref="file" id="file3" />
          <label class="zhezhao" for="file3"></label>
        </div>
        <div class="upload4">
          <div class="img-container">
            <img :src="src4" width="300" height="200" alt />
          </div>
          <input type="file" @change="getFile4" ref="file" id="file4" />
          <label class="zhezhao" for="file4"></label>
        </div>
      </div>
      <button class="fabu" @click="fabu">发布</button>
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
        <tr v-for="(item, index) in message2.table.list" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.genre1}}</td>
          <td>{{item.price}}</td>
          <td>{{item.createTime}}</td>
          <td>{{item.status}}</td>
          <td>
            <button
              @click="bianji(item.id,index)"
              style="background-color: black;color: white;border: 1px solid black;width: 40px;margin-right: 15px;"
            >编辑</button>
            <button
              @click="shangjia(item.id,index)"
              v-if="item.status!='出售中'"
              style="background-color: black;color: white;border: 1px solid black;width: 40px;"
            >上架</button>
            <button
              @click="xiajia(item.id,index)"
              v-if="item.status=='出售中'"
              style="background-color: black;color: white;border: 1px solid black;width: 40px;"
            >下架</button>
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
    <div class="shuru" v-if="type==2">
      <div>
        标题
        <input v-model="message3.name" />
      </div>
      <div>
        价格
        <input v-model="message3.price" />
        <span style="position:relative;left: 500px;">元</span>
      </div>
      <div>
        PSD源文件
        <input type="file" @change="bjgetFile" accept="image/*" ref="file" id="bjfile" />
        <label class="uploadfile" for="bjfile">上传文件</label>
      </div>
      <div>
        尺寸
        <span style="position:relative;left: 120px;">长</span>
        <input v-model="message3.sizeWidth" style="width:182px;position:relative;left:125px;" />
        <span style="position:relative;left: 130px;">px</span>
        <span style="position:relative;left: 170px;">高</span>
        <input v-model="message3.sizeHeight" style="width:182px;position:relative;left:190px;" />
        <span style="position:relative;left: 200px;">px</span>
      </div>
      <div>
        分辨率
        <input v-model="message3.resolutionRatio" />
        <span style="position:relative;left: 480px;">dpl</span>
      </div>
      <div style="height:150px">
        连接方式
        <select class="select" v-model="message3.connect">
          <option>独幅</option>
          <option>二方连续</option>
          <option>四方连续</option>
        </select>
      </div>
      <div>
        花型类别
        <select class="select" v-model="message3.g1">
          <option v-for="item in hualist1" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <select class="select" v-model="message3.g2" style="top: -40px;
    left: 600px;">
          <option v-for="item in hualist2" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <!-- <select class="select2" v-model="message.category2id">
          <option v-for="item in category2" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>-->
      </div>
      <div class="color">
        色系
        <img @click="bjcolortype(11)" src="../../assets/image/studio/color0.png" alt />
        <img @click="bjcolortype(1)" src="../../assets/image/studio/color1.png" alt />
        <img @click="bjcolortype(2)" src="../../assets/image/studio/color2.png" alt />
        <img @click="bjcolortype(3)" src="../../assets/image/studio/color3.png" alt />
        <img @click="bjcolortype(4)" src="../../assets/image/studio/color4.png" alt />
        <img @click="bjcolortype(5)" src="../../assets/image/studio/color5.png" alt />
        <img @click="bjcolortype(6)" src="../../assets/image/studio/color6.png" alt />
        <img @click="bjcolortype(7)" src="../../assets/image/studio/color7.png" alt />
        <img @click="bjcolortype(8)" src="../../assets/image/studio/color8.png" alt />
        <img @click="bjcolortype(9)" src="../../assets/image/studio/color9.png" alt />
        <img @click="bjcolortype(10)" src="../../assets/image/studio/color10.png" alt />
        <br />
        <span v-show="message3.colourType==11" class="correct0"></span>
        <span v-show="message3.colourType==1" class="correct1"></span>
        <span v-show="message3.colourType==2" class="correct2"></span>
        <span v-show="message3.colourType==3" class="correct3"></span>
        <span v-show="message3.colourType==4" class="correct4"></span>
        <span v-show="message3.colourType==5" class="correct5"></span>
        <span v-show="message3.colourType==6" class="correct6"></span>
        <span v-show="message3.colourType==7" class="correct7"></span>
        <span v-show="message3.colourType==8" class="correct8"></span>
        <span v-show="message3.colourType==9" class="correct9"></span>
        <span v-show="message3.colourType==10" class="correct10"></span>
      </div>
      <div class="flowerimage">
        花型图片
        <span style="font-size:12px">您最多可上传4张滑行图片，每张图片不超过5MB</span>
        <div class="upload">
          <div class="img-container">
            <img :src="message3.picture1" width="300" height="200" alt />
          </div>
          <input type="file" @change="bjgetFile1" ref="file" id="bjfile1" />
          <label class="zhezhao" for="bjfile1"></label>
        </div>
        <div class="upload2">
          <div class="img-container">
            <img :src="message3.picture2" width="300" height="200" alt />
          </div>
          <input type="file" @change="bjgetFile2" ref="file" id="bjfile2" />
          <label class="zhezhao" for="bjfile2"></label>
        </div>
        <div class="upload3">
          <div class="img-container">
            <img :src="message3.picture3" width="300" height="200" alt />
          </div>
          <input type="file" @change="bjgetFile3" ref="file" id="bjfile3" />
          <label class="zhezhao" for="bjfile3"></label>
        </div>
        <div class="upload4">
          <div class="img-container">
            <img :src="message3.picture4" width="300" height="200" alt />
          </div>
          <input type="file" @change="bjgetFile4" ref="file" id="bjfile4" />
          <label class="zhezhao" for="bjfile4"></label>
        </div>
      </div>
      <button class="fabu" @click="baocuntupian">保存修改</button>
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
  name: "transactionManagement",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      showJump: false,
      tabIndex: 2,
      showLoading: false,
      type: 0,
      err: "",
      hualist1: "", //花下拉框数据集合
      hualist2: "",
      colornum: 11, //选中第几个颜色
      src: "",
      src2: "",
      src3: "",
      src4: "",
      xianzhi1: 0, //时间限制
      xianzhi2: 0, //出售限制
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      message: {
        title: "",
        price: "",
        file: "",
        width: "",
        height: "",
        fenbian: "",
        lianjie: "独幅",
        huatype1: "",
        huatype2: "",
        color: 11,
        huaimage1: "",
        huaimage2: "",
        huaimage3: "",
        huaimage4: "",
        huaimage1url: "",
        huaimage2url: "",
        huaimage3url: "",
        huaimage4url: "",
        fileurl: "",
        filesize: "",
        g1: "",
        g2: ""
      },
      message2: {
        time1: "",
        time2: "",
        table: ""
      },
      //编辑的全局参数
      message3c: {
        id: "",
        file: "",
        filesize: "",
        imgurl1: "",
        imgurl2: "",
        imgurl3: "",
        imgurl4: ""
      },
      message3: {}
    };
  },
  methods: {
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
    shangjia(e, r) {
      let self = this;
      let formData = new FormData();
      formData.append("status", 0);
      formData.append("id", e);
      let obj = {
        url: self.all.baseUrl + "/app3dPatternsSoldByMallSellersJyg/update",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data);
          this.message2.table.list[r].status = "出售中";
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
    xiajia(e, r) {
      console.log(e);
      console.log(e, r);
      let self = this;
      let formData = new FormData();
      formData.append("status", -10);
      formData.append("id", e);
      let obj = {
        url: self.all.baseUrl + "/app3dPatternsSoldByMallSellersJyg/update",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data);
          this.message2.table.list[r].status = "已下架";
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
    b1(e) {
      let self = this;
      this.xianzhi1 = e;

      if (e == 1) {
        if (self.message2.time1 == "" || self.message2.time1 == "") {
          this.showJump = true;
          this.err = "有时间为空";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          this.message2.time1 = "";
          this.message2.time2 = "";
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
      this.cnt = 1;
      this.pageNumber = "";
     
      this.page = [];
      this.pageIndex = 1;
      self.tablesucai(self.xianzhi1, self.xianzhi2);
      // self.pageNumber=1;
      // self.cnt=1;
      console.log(this.pageNumber, this.cnt);
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
          }, 1000);
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

          self.tablesucai(self.xianzhi1, self.xianzhi2, self.cnt);
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
          }, 1000);
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
        }else if(res.data.status ==-95){
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

    fabu() {
      let self = this;
      if (
        this.message.title == "" ||
        this.message.price == "" ||
        this.message.file == "" ||
        this.message.width == "" ||
        this.message.height == "" ||
        this.message.fenbian == "" ||
        this.message.lianjie == "" ||
        this.message.color == ""
      ) {
        this.showJump = true;
        this.err = "有必填项未填";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (
        this.message.huaimage1 == "" 
      ) {
        this.showJump = true;
        this.err = "图片1必须要有";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        //传图片
        this.showLoading = true;
        let pictrueCount = 0;
        if (self.message.file != "") {
          let formData = new FormData();
          formData.append("file", self.message.file);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.fileurl = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        if (self.message.huaimage1 != "") {
          let formData = new FormData();
          formData.append("file", self.message.huaimage1);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.huaimage1url = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        //传图片
        if (self.message.huaimage2 != "") {
          let formData = new FormData();
          formData.append("file", self.message.huaimage2);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.huaimage2url = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        //传图片
        if (self.message.huaimage3 != "") {
          let formData = new FormData();
          formData.append("file", self.message.huaimage3);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.huaimage3url = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        //传图片
        if (self.message.huaimage4 != "") {
          let formData = new FormData();
          formData.append("file", self.message.huaimage4);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            console.log(res.data.result);
            self.message.huaimage4url = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        //传图片结束
      }
    },
    RegisterStudio(e) {
      let self = this;
      let num = 1;
      if (this.message.huaimage1 != "") {
        num++;
      }
      if (this.message.huaimage2 != "") {
        num++;
      }
      if (this.message.huaimage3 != "") {
        num++;
      }
      if (this.message.huaimage4 != "") {
        num++;
      }
      if (e == num) {
        let formData = new FormData();
        formData.append("sizeHeight", self.message.height);
        formData.append("sizeWidth", self.message.width);
        formData.append("resolutionRatio", self.message.fenbian);
        formData.append("sourceFile", self.message.fileurl);
        formData.append("name", self.message.title);
        formData.append("price", self.message.price);
        formData.append("genre1", self.message.huatype1);
        formData.append("styleType", self.message.huatype2);
        formData.append("colourType", self.message.color);
        if (self.message.lianjie == "四方连续") {
          formData.append("connect", 2);
        } else if (self.message.lianjie == "二方连续") {
          formData.append("connect", 3);
        } else {
          formData.append("connect", 1);
        }
        if (this.message.huaimage1 != "") {
          formData.append("picture1", self.message.huaimage1url);
        }
        if (this.message.huaimage2 != "") {
          formData.append("picture2", self.message.huaimage2url);
        }
        if (this.message.huaimage3 != "") {
          formData.append("picture3", self.message.huaimage3url);
        }
        if (this.message.huaimage4 != "") {
          formData.append("picture4", self.message.huaimage4url);
        }
        formData.append("size", self.message.filesize); //
        let obj = {
          url: self.all.baseUrl + "/app3dPatternsSoldByMallSellersJyg/save",
          formdata: formData
        };
        self.getData(obj).then(res => {
          console.log(res);
          this.showLoading = false;
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "上传花型成功";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
            this.tablesucai();
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
            }, 1500);
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

      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        this.message.huaimage1 = files;
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          _this.src = this.result;
        };
      }
    },
    getFile2(e) {
      var files = e.target.files[0];

      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        this.message.huaimage2 = files;
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          _this.src2 = this.result;
        };
      }
    },
    getFile3(e) {
      var files = e.target.files[0];

      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        this.message.huaimage3 = files;
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          _this.src3 = this.result;
        };
      }
    },
    getFile4(e) {
      var files = e.target.files[0];

      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        this.message.huaimage4 = files;
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          _this.src4 = this.result;
        };
      }
    },
    getFile(e) {
      let self = this;
      var files = e.target.files[0];

      let filetype = files.name.substring(
        files.name.indexOf(".") + 1,
        files.name.length
      );

      let psd = "psd";
      var location = psd.indexOf(filetype);
      if (location > -1) {
        this.message.file = files;

        this.message.filesize = files.size / 8 / 1024 / 1024 + "";
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          // _this.src = this.result
        };
      } else {
        this.showJump = true;
        this.err = "请选择psd格式文件";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
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
        let _this = this;

        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          // _this.src = this.result
        };
      } else {
        this.showJump = true;
        this.err = "请选择psd格式文件";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
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
        }, 1500);
      } else {
        this.message3c.imgurl1 = files;
        let _this = this;

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
        }, 1500);
      } else {
        this.message3c.imgurl2 = files;
        let _this = this;

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
        }, 1500);
      } else {
        this.message3c.imgurl3 = files;
        let _this = this;

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
        }, 1500);
      } else {
        this.message3c.imgurl4 = files;
        let _this = this;

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
            }, 1000);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "您的账号已过期";
            this.showLoading = false;
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
            console.log(res.data);
            this.showJump = true;
            this.err = res.data.msg;
            this.showLoading = false;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1000);
          }
        });
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
    this.getselect();
    this.getselect2();
    this.tablesucai();
    localStorage.setItem("path", "/FlowerManagement");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnFlowerManagement"
      });
    } else {
      this.$router.push({
        path: "/FlowerManagement"
      });
    }
  }
};
</script>
<style scoped>
.flowerimage {
  position: absolute !important;
  top: 100px;
  left: 800px;
}
.color {
  position: absolute !important;
  top: 50px;
  left: 800px;
}
.correct0:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 59px;
}
.correct1:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 92px;
}
.correct2:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 125px;
}
.correct3:before {
  content: "\2714";
  color: white;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 158px;
}
.correct4:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 192px;
}
.correct5:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 225px;
}
.correct6:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 260px;
}
.correct7:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 294px;
}
.correct8:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 327px;
}
.correct9:before {
  content: "\2714";
  color: black;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 362px;
}
.correct10:before {
  content: "\2714";
  color: white;
  margin-left: 13px;
  position: relative;
  top: -38px;
  left: 394px;
}
.color img {
  margin-left: 10px;
}
.select {
  width: 365px;
  height: 40px;
  position: relative;
  left: 70px;
  top: 0;
  border-radius: 5px;
  text-align: center;
  -moz-text-align-last: center;
  text-align-last: center;
  border: 0;
  background-color: #ddd;
}
option {
  height: 40px;
  text-align: center;
  background-color: #ddd;
  text-align-last: center;
}
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

.image1 {
  position: absolute;
  left: 0;
}

.upload {
  border-radius: 10px;
  width: 300px;
  height: 200px;
  position: absolute;
  left: 0px;
  top: 40px;
  /* background-size: 365px 185px; */
}
.upload2 {
  border-radius: 10px;
  width: 300px;
  height: 200px;
  position: absolute;
  left: 320px;
  top: 40px;
  /* background-size: 365px 185px; */
}
.upload3 {
  border-radius: 10px;
  width: 300px;
  height: 200px;
  position: absolute;
  left: 0px;
  top: 260px;
  /* background-size: 365px 185px; */
}
.upload4 {
  border-radius: 10px;
  width: 300px;
  height: 200px;
  position: absolute;
  left: 320px;
  top: 260px;
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
  left: 650px;
  top: 700px;
  border: 0;
}

.img-container {
  width: 300px;
  height: 200px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: #c7c5c5;
  text-align: center;
  line-height: 367px;
}
.zhezhao {
  width: 300px;
  height: 200px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(255, 255, 255, 0);
}
input[type="file"] {
  display: none;
  z-index: 10;
  width: 120px;
  font-size: 0;
  height: 30px;
}
.uploadfile {
  text-align: center;
  position: absolute;
  left: 180px;
  top: 0;
  width: 165px;
  height: 40px;
  color: white;
  background-color: #485765;
  border-radius: 5px;
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
