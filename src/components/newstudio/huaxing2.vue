<template>
  <div class="xiugai">
    <div class="header">管理花型</div>
    <hr class="hr" />
    <div class="header2">
      <div class="kuai1">
        花型名称
        <input type="text" style="margin-left:18px;border-radius:2px" v-model="message2.name" />
      </div>
      <div class="kuai2">
        时间
        <input class="time1" type="date"  style="border-radius:2px" v-model="message2.startTime" />
      </div>
      <div class="kuai3">
        至
        <input class="time2" type="date" style="border-radius:2px" v-model="message2.endTime" />
      </div>
      <button @click="sousuo0chaxun" class="b1">搜索</button>
      <!-- <input type="radio" class="r1" /> -->
      <button @click="shangjia0quanbu(1)" class="b2">批量上架</button>
      <button @click="shangjia0quanbu(0)" class="b3">批量下架</button>
    </div>
    <div class="tableheader">
      <div @click="quanxuan0chaxun" :class="{s1:true,checkedTab:tabIndex==0}">全部</div>
      <div @click="xiajia0chaxun"  :class="{s2:true,checkedTab:tabIndex==1}">已下架</div>
      <div @click="shangjia0chaxun"  :class="{s3:true,checkedTab:tabIndex==2}">已上架</div>
      <div @click="shenhe0chaxun"  :class="{s4:true,checkedTab:tabIndex==3}">审核中</div>
      <div @click="shenheerr0chaxun"  :class="{s5:true,checkedTab:tabIndex==4}">审核失败</div>
    </div>
    <div class="count">
      <div>
        
        <ul class="productBox1">
          <div class="hbox">
            <div class="hbox2">
              <div style="width: 60px;position: relative;">
                <div :class="{checkBox:true,checkedBox:checkedAllFlag==true}" @click="checkAll()"></div>
              </div>
            </div>
            <div class="hbox1">花型图</div>
            <div class="hbox1 sourceName">花型名称</div>
            <div class="hbox1 priceTitle">价格</div>
            <div class="hbox1 createTime">发布时间</div>
            <div class="hbox1 stateTitle" >状态</div>
            <div class="hbox1 operate">操作</div>
          </div>
          <div v-if="message==''" class="noData">
          
          <div style="margin-top:104px; font-size:16px;text-aligh:center;font-size:16px;color:#D4CFCF">您还未上传作品哦！快上传作品拿第一桶金</div>
          <button @click="tianjiazuopin" style="margin-top:30px;width:94px;background-color:#FFE135;color:#666666">+ 添加作品</button>
        </div>
          <li
            v-for="(item, index) in message"
            :key="index"
            style="position:relative;height:132px;background: #F6F6F6;margin-bottom:40px;border-radius:15px;width:911px"
          >
            <div style="width: 60px;position: relative;top: 59.5px;">
              <div :class="{checkBox:true,checkedBox:checkedList.includes(item.id)}" @click="check(index)"></div>
            </div>
            <div class="productli1">
              <div class="imgjuzhong">
              <img style="border-radius:4px" :src="item.picture1" alt />
              </div>
            </div>
            <div class="productli2">{{item.name}}</div>
            <div class="productli3">￥{{item.price}}</div>
            <div class="productli4">{{item.create_time}}</div>
            <div class="productli5" :title="item.reason">{{item.state}}</div>
            <div class="productli6">
              <button @click="bianji(index)" v-if="item.state!='审核中'" class="b4">编辑</button>
              <!-- <button v-if="item.state=='审核中'" class="b5">编辑</button> -->
              <button @click="shangjia0xiugai(item.id,1)" v-if="item.state=='已下架'" class="b5">上架</button>
              <button @click="shangjia0xiugai(item.id,0)" v-if="item.state=='已上架'" class="b5">下架</button>
            </div>
          </li>
        </ul>
        <ul class="pageBox" v-if="pageNumber!=0">
          <li @click="prev" style="cursor:pointer;">
            <img src="../../assets/image/cut/left.png" alt />
          </li>
          <li  style="cursor:pointer;"
            @click="btnClick(index)"
            :class="index==pageIndex-1?'click':''"
            v-for="(item,index) in page"
            :key="index"
          >{{item.name}}</li>
          <li @click="next" style="cursor:pointer;">
            <img src="../../assets/image/cut/right.png" alt />
          </li>
        </ul>
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
  name: "transactionManagement",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      path:"/newstudio/huaxing2",
      showJump: false,
      tabIndex: 2,
      showLoading: false,
      type: 0,
      err: "",
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      isShow: false,
      iconUrl: require("../../assets/image/user/dagou-2.png"),
      message: {}, //显示数据
      message2: {
        page: 1,
        pageSize: 5,
        name: "",
        startTime: "",
        endTime: "",
        state1: "",
        state2: ""
      }, //查询数据
      shuzu: [],
      shuzuall: false,
      tabIndex:0,
      checkedAllFlag:false,
      checkedList:[]
    };
  },
  methods: {
    //全选
    checkAll(){
        this.checkedAllFlag=!this.checkedAllFlag;
        let checkedList=[];
        //如果全选
        if(this.checkedAllFlag){
            for(var i = 0; i< this.message.length;i++){
                checkedList.push(this.message[i].id)
            }
            this.checkedList = checkedList;
        }else{
            this.checkedList = [];
        }
    },
    //单选
    check(index){
        let checkedList= this.checkedList;
        //如果之前是被选中状态，则取消选中
        if(checkedList.indexOf(this.message[index].id)>-1){
            checkedList.splice(checkedList.indexOf(this.message[index].id), 1)
        }else{
            checkedList.push(this.message[index].id)
        }
        this.checkedList = checkedList;
        if(this.checkedList.length<this.message.length){
            this.checkedAllFlag=false
        }else{
            this.checkedAllFlag=true
        }
    },
    tianjiazuopin(){
      this.$router.push({
        path: "/newstudio/huaxing1",
        query: {
          
        }
      });
    },
    bianji(e) {
      let self = this;
      console.log(self.message[e]);
      this.$router.push({
        path: "/newstudio/huaxing3",
        query: {
          xiugai: 1,
          message: self.message[e]
        }
      });
    },
    shuzuf(e) {
      console.log(e);
      let idindex = this.shuzu.indexOf(e);
      console.log(idindex);
      if (idindex >= 0) {
        //如果以包含了该id,则去除(变为非选中状态)
        this.shuzu.splice(idindex, 1);
        console.log(this.shuzu);
      } else {
        this.shuzu.push(e);
        console.log(this.shuzu);
      }
    }, //数组
    quanxuan0shuzu() {
      this.shuzuall = !this.shuzuall;
      if (this.shuzuall) {
        this.shuzu = [];
        for (var i = 0; i < this.message.length; i++) {
          this.shuzu.push(this.message[i].id);
        }
        console.log(this.shuzu);
      } else {
        this.shuzu = [];
        console.log(this.shuzu);
      }
    }, //全选
    sousuo0chaxun() {
      this.cnt = 1;
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.state1 = "";
      this.message2.state2 = "";
      this.message2.page = 1;
      this.shuzu = [];
      this.shuzuall = false;
      this.tablesucai();
    },
    quanxuan0chaxun() {
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.page = 1;
      this.message2.state1 = "";
      this.message2.state2 = "";
      this.shuzu = [];
      this.shuzuall = false;
      this.tabIndex=0;
      this.tablesucai();
    },
    shangjia0chaxun() {
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.page = 1;
      this.message2.state1 = 2;
      this.message2.state2 = 1;
      this.shuzu = [];
      this.shuzuall = false;
      this.tabIndex=2;
      this.tablesucai();
    },
    xiajia0chaxun() {
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.page = 1;
      this.message2.state1 = 2;
      this.message2.state2 = 0;
      this.shuzu = [];
      this.shuzuall = false;
      this.tabIndex=1;
      this.tablesucai();
    },
    shenhe0chaxun() {
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.page = 1;
      this.message2.state1 = 0;
      this.message2.state2 = "";
      this.shuzu = [];
      this.shuzuall = false;
      this.tabIndex=3;
      this.tablesucai();
    },
    shenheerr0chaxun() {
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      this.message2.page = 1;
      this.message2.state1 = 1;
      this.message2.state2 = "";
      this.shuzu = [];
      this.shuzuall = false;
      this.tabIndex=4;
      this.tablesucai();
    },
    //e是id f是上传的值
    shangjia0xiugai(e, f) {
      let self = this;
      let formData = new FormData();
      formData.append("ids", e);
      formData.append("state2", f);
      let obj = {
        url: self.all.baseUrl + "/new/patternsSold/upOrLowPatternsSold",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          self.tablesucai();
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 2000);
          self.$forceUpdate();
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
    },

    shangjia0quanbu(e) {
      let self = this;
      if (this.checkedList == "") {
        this.showJump = true;
        this.err = "您没选中任何值";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        let formData = new FormData();
        formData.append("ids", self.checkedList.toString());
        formData.append("state2", e);
        let obj = {
          url: self.all.baseUrl + "/new/patternsSold/upOrLowPatternsSold",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            self.tablesucai();
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 2000);
            self.$forceUpdate();
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
      }
    }, //批量上架

    changeEnglish() {
      this.$router.go(0);
    },

    qiehuan(e) {
      this.type = e;
    },
    //e是id r是索引
    b3(e) {
      let self = this;
      this.xianzhi2 = e;
      this.cnt = 1;
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
      self.tablesucai();
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
      this.shuzu = [];
      this.shuzuall = false;
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        this.cnt = index + 1;
        this.message2.page = this.cnt;
        self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            this.message2.page = this.cnt;
            self.tablesucai();
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              this.message2.page = this.cnt;
              self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
              this.message2.page = this.cnt;
              self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
          }
        }
      }
    },
    prev() {
      let self = this;
      this.shuzu = [];
      this.shuzuall = false;
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
          this.message2.page = this.cnt;
          self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
          this.message2.page = this.cnt;
          self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
            this.message2.page = this.cnt;
            self.tablesucai();
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
    tablesucai() {
      let self = this;
      let formData = new FormData();
      this.showLoading = true;
      this.shuzu = [];
      this.shuzuall = false;
      formData.append("page", self.message2.page);
      formData.append("pageSize", self.message2.pageSize);
      formData.append("name", self.message2.name);
      if(self.message2.startTime!=""){
        formData.append("startTime", self.message2.startTime+" 00:00:00");
      }
      if(self.message2.endTime!=""){
        formData.append("endTime", self.message2.endTime+" 23:59:59");
      }
      formData.append("state1", self.message2.state1);
      formData.append("state2", self.message2.state2);
      let obj = {
        url: self.all.baseUrl + "/new/patternsSold/getPatternsSoldByUserId",
        formdata: formData
      };
      self.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
        }, 2000);
        if (res.data.status == 0) {
          console.log(res.data.result.list);
          this.message = res.data.result.list;
          for (let i = 0; i < self.message.length; i++) {
            self.message[i].create_time = self.format(
              self.message[i].create_time
            );
            if (self.message[i].state1 == 2 && self.message[i].state2 == 0) {
              self.message[i].state = "已下架";
            } else if (
              self.message[i].state1 == 2 &&
              self.message[i].state2 == 1
            ) {
              self.message[i].state = "已上架";
            } else if (self.message[i].state1 == 1) {
              self.message[i].state = "审核不通过";
            } else if (self.message[i].state1 == 0) {
              self.message[i].state = "审核中";
            }
          }
          console.log(res.data.result);
          this.pageNumber = res.data.result.pages;
          this.pageAuto();
          this.$forceUpdate();
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
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },

  mounted() {
    this.tablesucai();
    // localStorage.setItem("path", this.path);
    this.xuanzhongf(4);
  }
};
</script>
<style scoped>
.checkBox{
  cursor:pointer;
}
.time1{
  cursor:pointer;
}
.time2{
  cursor:pointer;
}
button{
  cursor:pointer;
}
label{
  cursor:pointer;
}
li>div{
  font-weight: bold;
}
input[type=checkbox]{
     cursor: pointer;
     position: relative;
     width: 15px;
     height: 15px;
     font-size: 14px;
}
input:focus{outline-color: #ffe300;}
input[type=checkbox]::after{
     position: absolute;
     top: 0;
     background-color: #ffffff;
     border:1px #C4C4C4 solid;
     
     width: 14px;
     height: 14px;
     display: inline-block;
     visibility: visible;
     padding-left: 0px;
     text-align: center;
     content: ' ';
     border-radius: 3px
}
        
input[type=checkbox]:checked::after{
     content: "✓";
     font-size: 12px;
     font-weight: bold;
     color: #ffffff;
     background: #ffe300;
     border:0;
     width: 16px;
     height: 16px;
     line-height: 16px;
}
li{
  color: #333333;
}
.hbox {
  width: 900px;
  height: 40px;
  line-height: 40px;
  
  text-align: center;
  margin-top: 0;
  font-size: 14px;
}
.hbox1 {
  width: 150px;
  float: left;
}
.hbox2 {
  width: 60px;
  float: left;
}
.tableheader {
  width: 103.275%;
  height: 33px;
  position: relative;
  left: -30px;
  background: #f6f6f6;
  margin-top:10px; 
}
.tableheader>div{
  cursor: pointer;
}
.s1 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 90px;
  color: #a0a0a0;
}
.s2 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 150px;
  color: #a0a0a0;
}
.s3 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 220px;
  color: #a0a0a0;
}
.s4 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 290px;
  color: #a0a0a0;
}
.s5 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 70px;
  position: absolute;
  top: 0;
  left: 360px;
  color: #a0a0a0;
}
.sxuanzhong {
  color: #333333 !important;
}
button {
  width: 66px;
  height: 28px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
}
.b4 {
  background: #ffe300;
  color: #666666;
  position: relative;
  margin-right: 19px;
}
.b4:hover{
  background:#ffd000;
}
.b5 {
  background: white;
  border: 1px solid #979797;
  width: 64px;
  height: 26px;
  position: relative;
  margin-right: 5px;
}
.b5:hover{
  background:#eee;
}
.b1:hover{
  background: black;
}
.b3:hover{
  background: black;
}
.b1 {
  background: #6f6c6c;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 608px;
}
.b2 {
  background: #ffe300;
  color: #666666;
  position: absolute;
  top: 0;
  left: 706px;
}
.b2:hover{
  background:#ffd000;
}
.b3 {
  background: #a2a2a2;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 784px;
}
.header {
  width: 810px;
  margin: auto;
  text-align: left;
  font-size: 20px;font-weight: bold;
}
.header2 {
  width: 810px;
  margin-left: 60px;
  position: relative;
  margin-top: 10px;
}
.kuai1 {
  width: 200px;
}
.kuai1 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;
}
.kuai2 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;
  margin-left: 13px;
  
}
.kuai3 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;margin-left: 13px;
}
.kuai2 {
  width: 190px;
  position: absolute;
  left: 200px;text-align: left;
  top: 0;margin-left:40px; 
}
.kuai3 {
  width: 170px;
  position: absolute;
  left: 425px;
  top: 0;
  text-align: left;
}
.hr {
  width: 760px;
  position: relative;
  top: -15px;
  left: 160px;
  *margin: 0;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
  margin-bottom: 20px;
}
.xiugai {
  width: 930px;
  height: 1130px;
  padding-top: 38px;
  padding-left: 30px;
  background: white;
  border: 0;
  position: relative;font-size: 14px;
  font-weight: bold;
}
.pageBox {
  /* width: 550px; */
  height: 30px;
  background-color: white;
  margin: auto;
  display: table;
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
.zuosanjiao {
  /* width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-right: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  left: 0px; */
  width: 30px !important;
  height: 30px !important;
}
.yousanjiao {
  /* width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-left: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  right: 0px; */
  width: 30px !important;
  height: 30px !important;
}
#copyright {
  height: 100vh;
  background: #f5f5f5;
}
.copyright {
  width: 988px;
  min-height: 100vh;
  background: #fff;
}
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 3rem 0;
}
.classify {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #8d8d8d;
  font-size: 14.04px;
}
.classify span {
  padding: 0 0.625rem;
  height: 1.75rem;
  line-height: 1.75rem;
  color: rgb(173, 173, 147);
}
.classify span.only {
  color: rgb(26, 24, 24);
}
.titleBox {
  height: 48px;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  background: #fff;
  justify-content: space-between;
}
.titleBox > div:first-child {
  margin-top: 24px;
  font-size: 14px;
  margin-left: 5%;
}
.titleBox > div:last-child {
  display: flex;
  margin-top: 24px;
  margin-right: 22px;
}
.delBox {
  border-top: 1px solid #cdcdcd;
  display: flex;
  justify-content: space-between;
}
.delAll {
  width: 100px;
  display: flex;
  line-height: 30px;
  margin-top: 8px;
  margin-left: 30px;
}
.delAll > div:first-child {
  width: 18px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  margin: auto 14px;
  background-size: 100%;
}
#delAll {
  width: 9px;
  height: 9px;
  background: #000;
  margin: 1px auto;
}
.del {
  width: 70px;
  height: 27px;
  font-size: 14.04px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  text-align: center;
  line-height: 27px;
  margin-top: 8px;
  margin-right: 35px;
}
.del:hover {
  background: #ffe135;
  border: 1px solid #fff;
}
.productli1 {
  width: 70px;
  height: 105px;
  line-height: 105px;
 
  position: absolute;
  left: 60px;
  top: 13.5px;
  /* text-align: left;
  background-size: 150px 106px;
  display:flex;
  align-items:center; */
  overflow: hidden;
}
.imgjuzhong{
  width: 350px;
  height: 105px;
  position: relative;
  left: -140px;
}
.imgjuzhong>img{
  height: 105px;
  min-width: 70px;
  margin: auto;
}
.productli2 {
  height: 106px;
  line-height: 106px;
  position: absolute;
  left: 176px;
  top: 13.5px;
  width: 100px;
}
.productli3 {
  height: 106px;
  line-height: 106px;
  position: absolute;
  left: 283px;
  top: 13.5px;
  width: 100px;
  text-align: center;
}
.productli4 {
  width: 150px;
  height: 106px;
  line-height: 106px;
  position: absolute;
  left: 397px;
  top: 13.5px;
}
.productli5 {
  width: 120px;
  height: 106px;
  line-height: 106px;
  position: absolute;
  left: 553px;
  top: 13.5px;
  color: #ACACAC;
}
.productli6 {

  height: 106px;
  line-height: 106px;
  position: absolute;
  left: 715px;
  top: 13.5px;
}
.productli1 > img {
  width: 70px;
  max-height: 105px;
}
.productBox {
  /* margin-top: 32px; */
}
.productBox li {
  display: flex;
  line-height: 93px;
  /* margin-bottom: 36px; */
}
.productBox li > div:first-child {
  width: 17px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  margin: auto 0;
  /* margin-left: 40px;
  margin-right: 33px; */
}
.icon {
  width: 17px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  position: absolute;
  top: 42.5px;
  left: 20.5px;
}
.productBox li img {
  width: 185px;
  height: 93px;
}
.productBox .productTitle {
  width: 182px;
  font-size: 14px;
}
.productBox .productNum {
  width: 173px;
  font-size: 14px;
  margin-right: 133px;
}
.productBox .productType {
  width: 70px;
  height: 27px;
  font-size: 14px;
  color: #040404;
  background: #ffffff;
  border: 1px solid #070706;
  line-height: 27px;
  border-radius: 4px;
  margin: auto 0;
  margin-right: 29px;
}
.productBox .productOpe {
  width: 73px;
  height: 26px;
  border: 1px solid #000;
  background: #ffffff;
  border: 1px solid #070706;
  line-height: 26px;
  margin: auto 0;
  border-radius: 4px;
}
.productType:hover,
.productOpe:hover {
  background: #ffe135;
  border: 1px solid #ffe135;
}
/* 分页器 */
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
.checkBox{
  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  margin-left: 22px;
  margin-top: 12px;
}
.checkedBox{
  background-image: url("../../assets/image/studio/checked-logo.png");
  width: 16px !important;
  height: 16px !important;
  background-size: 100%;
  border:none;
}
input[type=checkbox]{
     cursor: pointer;
     position: relative;
     width: 15px;
     height: 15px;
     font-size: 14px;
}
input[type=checkbox]::after{
     position: absolute;
     top: 0;
     background-color: #ffffff;
     border:1px #C4C4C4 solid;
     
     width: 14px;
     height: 14px;
     display: inline-block;
     visibility: visible;
     padding-left: 0px;
     text-align: center;
     content: ' ';
     border-radius: 3px
}
        
input[type=checkbox]:checked::after{
     content: "✓";
     font-size: 12px;
     font-weight: bold;
     color: #ffffff;
     background: #ffe300;
     border:0;
     width: 16px;
     height: 16px;
     line-height: 16px;
}

.hbox {
  width: 930px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  text-align: center;
  margin-top: 0;
  font-size: 14px;
  color: #d4cfcf;
}
.hbox1 {
  float: left;
  width: 70px;
  text-align: center;
  font-weight: bold;
}
.hbox2 {
  width: 60px;
  float: left;
}
.tableheader {
  width: 987px;
  height: 33px;
  position: relative;
  left: -30px;
  background: #f6f6f6;
  margin-top:10px; 
}
.s1 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 90px;
  color: #a0a0a0;
}
.s2 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 150px;
  color: #a0a0a0;
}
.s3 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 220px;
  color: #a0a0a0;
}
.s4 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 290px;
  color: #a0a0a0;
}
.s5 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 70px;
  position: absolute;
  top: 0;
  left: 360px;
  color: #a0a0a0;
}
.sxuanzhong {
  color: #333333 !important;
}
button {
  width: 66px;
  height: 28px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
}
.b5 {
  background: white;
  border: 1px solid #979797;
  width: 64px;
  height: 26px;
  position: relative;
  margin-right: 5px;
}
.b1 {
  background: #6f6c6c;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 608px;
}
.b2 {
  background: #ffe135;
  color: #666666;
  position: absolute;
  top: 0;
  left: 706px;
}
.b3 {
  background: #a2a2a2;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 784px;
}
.header {
  width: 810px;
  margin: auto;
  text-align: left;
  font-size: 20px;font-weight: bold;
}
.header2 {
  width: 810px;
  margin-left: 60px;
  position: relative;
  margin-top: 10px;
}
.kuai1 {
  width: 200px;
  
}
.kuai1 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;
}
.kuai2 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;
  margin-left: 13px;
  
}
.kuai3 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;margin-left: 13px;
}
.kuai2 {
  width: 190px;
  position: absolute;
  left: 200px;text-align: left;
  top: 0;margin-left:40px; 
}
.kuai3 {
  width: 170px;
  position: absolute;
  left: 425px;
  top: 0;
  text-align: left;
}
.hr {
  width: 760px;
  position: relative;
  top: -15px;
  left: 160px;
  *margin: 0;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
  margin-bottom: 20px;
}
.xiugai {
  width: 930px;
  height: 1130px;
  padding-top: 43px;
  padding-left: 30px;
  background: white;
  border: 0;
  position: relative;
  font-size: 14px;
}
.pageBox {
  /* width: 550px; */
  height: 30px;
  background-color: white;
  margin: auto;
  display: table;
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
.zuosanjiao {
  /* width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-right: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  left: 0px; */
  width: 30px !important;
  height: 30px !important;
}
.yousanjiao {
  /* width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-left: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  right: 0px; */
  width: 30px !important;
  height: 30px !important;
}
#copyright {
  height: 100vh;
  background: #f5f5f5;
}
.copyright {
  width: 988px;
  min-height: 100vh;
  background: #fff;
}
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 3rem 0;
}
.classify {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #8d8d8d;
  font-size: 14.04px;
}
.classify span {
  padding: 0 0.625rem;
  height: 1.75rem;
  line-height: 1.75rem;
  color: rgb(173, 173, 147);
}
.classify span.only {
  color: rgb(26, 24, 24);
}
.titleBox {
  height: 48px;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  background: #fff;
  justify-content: space-between;
}
.titleBox > div:first-child {
  margin-top: 24px;
  font-size: 14px;
  margin-left: 5%;
}
.titleBox > div:last-child {
  display: flex;
  margin-top: 24px;
  margin-right: 22px;
}
.delBox {
  border-top: 1px solid #cdcdcd;
  display: flex;
  justify-content: space-between;
}
.delAll {
  width: 100px;
  display: flex;
  line-height: 30px;
  margin-top: 8px;
  margin-left: 30px;
}
.delAll > div:first-child {
  width: 18px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  margin: auto 14px;
  background-size: 100%;
}
#delAll {
  width: 9px;
  height: 9px;
  background: #000;
  margin: 1px auto;
}
.del {
  width: 70px;
  height: 27px;
  font-size: 14.04px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  text-align: center;
  line-height: 27px;
  margin-top: 8px;
  margin-right: 35px;
}
.del:hover {
  background: #ffe135;
  border: 1px solid #fff;
}

.productBox {
  /* margin-top: 32px; */
}
.productBox li {
  display: flex;
  line-height: 93px;
  /* margin-bottom: 36px; */
}
.productBox li > div:first-child {
  width: 17px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  margin: auto 0;
  /* margin-left: 40px;
  margin-right: 33px; */
}
.icon {
  width: 17px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  position: absolute;
  top: 42.5px;
  left: 20.5px;
}
.productBox li img {
  width: 185px;
  height: 93px;
}
.productBox .productTitle {
  width: 182px;
  font-size: 14px;
}
.productBox .productNum {
  width: 173px;
  font-size: 14px;
  margin-right: 133px;
}
.productBox .productType {
  width: 70px;
  height: 27px;
  font-size: 14px;
  color: #040404;
  background: #ffffff;
  border: 1px solid #070706;
  line-height: 27px;
  border-radius: 4px;
  margin: auto 0;
  margin-right: 29px;
}
.productBox .productOpe {
  width: 73px;
  height: 26px;
  border: 1px solid #000;
  background: #ffffff;
  border: 1px solid #070706;
  line-height: 26px;
  margin: auto 0;
  border-radius: 4px;
}
.productType:hover,
.productOpe:hover {
  background: #ffe135;
  border: 1px solid #ffe135;
}
/* 分页器 */
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
.sourceName{
  margin-left: 55px;
}
.priceTitle{
  width: auto !important;
  margin-left: 65px;
}
.createTime{
  margin-left: 83px;
}
.checkedTab{
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: #333333;
}
.checkedBox{
  background-image: url("../../assets/image/studio/checked-logo.png");
  width: 16px !important;
  height: 16px !important;
  background-size: 100%;
  border:none;
}
.stateTitle{
  width: auto!important;
  margin-left: 100px;
}
.operate{
  width: auto!important;
  margin-left: 144px;
}
</style>
