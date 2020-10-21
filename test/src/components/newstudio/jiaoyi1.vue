<template>
  <div class="xiugai">
    <div class="header">交易管理</div>
    <hr class="hr" />
    <div class="shouyi">
      <span class="shouyi1">
        <span class="shouyia"></span>
        <span class="shouyib">累计收益</span>
        <span class="shouyic" v-if="tongjiz.total_all<20000">￥{{tongjiz.total_all}}</span>
        <span
          class="shouyic"
          v-if="tongjiz.total_all>20000"
        >￥{{Math.round(tongjiz.total_all/20000)}}万</span>
      </span>
      <span class="shouyi2">
        <span class="shouyia" style="background:#F1AC43"></span>
        <span class="shouyib">今日收益</span>
        <span class="shouyic" v-if="tongjiz.total_today<20000">￥{{tongjiz.total_today}}</span>
        <span
          class="shouyic"
          v-if="tongjiz.total_today>20000"
        >￥{{Math.round(tongjiz.total_today/20000)}}万</span>
      </span>
      <span class="shouyi3">
        <span class="shouyia" style="background:#71B34F"></span>
        <span class="shouyib">昨日收益</span>
        <span class="shouyic" v-if="tongjiz.total_yesterday<20000">￥{{tongjiz.total_yesterday}}</span>
        <span
          class="shouyic"
          v-if="tongjiz.total_yesterday>20000"
        >￥{{Math.round(tongjiz.total_yesterday/20000)}}万</span>
      </span>
    </div>
    <div class="charttitle">您的收益</div>
    <div id="chart"></div>
    <div class="tableheader">
      <!-- <div class="kuai1">
        名称
        <input type="text" style="border-radius:2px" v-model="message2.name" />
      </div>-->
      <div class="kuai2">
        时间
        <input class="time1" style="border-radius:2px" type="date" v-model="message2.startTime" />
      </div>
      <div class="kuai3">
        至
        <input class="time2" style="border-radius:2px" type="date" v-model="message2.endTime" />
      </div>
      <button @click="sousuo0chaxun" class="b1">搜索</button>
      <!-- <input type="radio" class="r1" /> -->
    </div>
    <div class="count">
      <div>
        <ul class="productBox1">
          <div class="hbox">
            <div class="hbox2">
              <div style="width: 30px;position: relative;">
                <!-- <input type="checkbox" @click="quanxuan0shuzu()" /> -->
              </div>
            </div>
            <div class="hbox1" style="width:162px">缩略图</div>
            <div class="hbox1" style="width:278px">名称</div>
            <div class="hbox1">价格</div>
            <div class="hbox1">交易时间</div>
          </div>
          <div v-if="message==''" class="noData">
            <div
              style="margin-top:104px;color:#666666 ;font-size:16px;text-aligh:center;font-size:16px;color:#D4CFCF"
            >您还没有记录</div>
          </div>
          <li
            v-for="(item, index) in message"
            :key="index"
            style="position:relative;height:132px;background: #F6F6F6;margin-bottom:40px;border-radius:15px;width:910px;"
          >
            <div class="productli1">
              <!--如果出售的是花型-->
              <div class="imgjuzhong"  v-if="item.buy_type==1">
                <img
                
                  style="border-radius:4px"
                  :src="item.patternsSoldByMallSellers.picture1"
                  alt
                />
              </div>
              <!--如果出售的是素材-->
              <div class="imgjuzhong"  v-if="item.buy_type==2">
                <img
                
                  style="border-radius:4px"
                  :src="item.materialLibrary.picture_thumbnail"
                  alt
                />
              </div>
            </div>
            <div class="productli2">
              <!--如果出售的是花型-->
              <span v-if="item.buy_type==1">{{item.patternsSoldByMallSellers.name}}</span>
              <!--如果出售的是素材-->
              <span v-if="item.buy_type==2">{{item.materialLibrary.name}}</span>
            </div>
            <div class="productli3">￥{{item.money_change}}</div>
            <div class="productli4">{{item.create_time}}</div>
          </li>
        </ul>
        <ul class="pageBox" style="cursor:pointer;" v-if="pageNumber!=0">
          <li @click="prev">
            <img src="../../assets/image/cut/left.png" alt />
          </li>
          <li  style="cursor:pointer;"
            @click="btnClick(index)"
            :class="index==pageIndex-1?'click':''"
            v-for="(item,index) in page"
            :key="index"
          >{{item.name}}</li>
          <li @click="next"  style="cursor:pointer;">
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
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
export default {
  name: "transactionManagement",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      path: "/newstudio/jiaoyi1",
      tongjiz: "",
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
      shuzuall: false
    };
  },
  methods: {
    drawline() {
      let mychart = echarts.init(document.getElementById("chart"));
      let self = this;
      var xzhou = [];

      for (var i = 0; i < self.tongjiz.year_list.length; i++) {
        xzhou.push(self.tongjiz.year_list[i].total);
      }
      for (var i = 0; i < xzhou.length; i++) {
        if (xzhou[i] == 0) {
          xzhou[i] = "";
        }
      }
      mychart.setOption({
        color: ["#FF9D4D"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: "#A0A4AA"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#A0A4AA"
              }
            }
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: "60%",
            data: xzhou,
            label: {
              show: true,
              position: "top",
              color: "#666666"
            }
          }
        ]
      });
    },
    tongji() {
      let self = this;
      let formData = new FormData();
      let obj = {
        url: self.all.baseUrl + "/new/userPurse/getUserStudioStatistics",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data);
          self.tongjiz = res.data.result;
          this.drawline();
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
    tianjiazuopin() {
      this.$router.push({
        path: "/newstudio/sucai1",
        query: {}
      });
    },
    bianji(e) {
      let self = this;

      this.$router.push({
        path: "/newstudio/sucai1",
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
      this.tablesucai();
    },
    //e是id f是上传的值
    shangjia0xiugai(e, f) {
      let self = this;
      let formData = new FormData();
      formData.append("ids", e);
      formData.append("state2", f);
      let obj = {
        url: self.all.baseUrl + "/new/materialLibrary/upOrLowMaterialLibrary",
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

    shangjia0quanbu(e) {
      let self = this;
      if (this.shuzu == "") {
        this.showJump = true;
        this.err = "您没选中任何值";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        let formData = new FormData();
        formData.append("ids", self.shuzu);
        formData.append("state2", e);
        let obj = {
          url: self.all.baseUrl + "/new/materialLibrary/upOrLowMaterialLibrary",
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
      formData.append("page", self.message2.page);
      formData.append("pageSize", self.message2.pageSize);
      formData.append("name", self.message2.name);
      if (self.message2.startTime != "") {
        formData.append("startTime", self.message2.startTime + " 00:00:00");
      }
      if (self.message2.endTime != "") {
        formData.append("endTime", self.message2.endTime + " 23:59:59");
      }
      // formData.append("startTime", self.message2.startTime);
      // formData.append("endTime", self.message2.endTime);
      formData.append("type", 1);
      let obj = {
        url: self.all.baseUrl + "/new/userPurse/getUserPurseDetailsByUserId",
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
          console.log(res.data.result.pages);
          this.pageNumber = res.data.result.pages;
          this.pageAuto();
          this.$forceUpdate();
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
        // console.log(res.data);
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
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },

  mounted() {
    this.tablesucai();
    this.tongji();
    localStorage.setItem("path", this.path);
    this.xuanzhongf(6);
  }
};
</script>
<style scoped>
.b1:hover{
  background: black;
}

button{
  cursor:pointer;
}
.time1{
  cursor:pointer;
}
.time2{
  cursor:pointer;
}
.charttitle {
  text-align: left;
  width: 757px;
  position: relative;
  left: 0px;
  font-size: 14px;
  color: #666666;
  margin: auto;
  font-weight: bold;
}
#chart {
  width: 757px;
  height: 224px;
  margin: auto;
}

.shouyi {
  width: 950px;
  height: 100px;

  left: 85px;
  margin: auto;
  position: relative;
}
.shouyi1 {
  padding: 25px;
  border: 1px solid rgba(151, 151, 151, 0.29);
  float: left;
}
.shouyi2 {
  padding: 25px;
  border: 1px solid rgba(151, 151, 151, 0.29);
  float: left;
  margin-left: 61px;
}
.shouyi3 {
  padding: 25px;
  border: 1px solid rgba(151, 151, 151, 0.29);
  margin-left: 61px;
  float: left;
}
.shouyia {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #eb5455;
  margin-left: -11px;
}
.shouyib {
  font-size: 14px;
  /* position: absolute; */
  position: relative;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 15px;
}
.shouyic {
  font-size: 14px;
  color: #ffab67;
  /* position: absolute; */
  top: 0;
  width: 130px;
  margin-left: 22px;
  position: relative;
  top: 2px;
  font-weight: bold;
}
.center {
  position: relative;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  text-align: left;
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
  width: 220px;
  float: left;
}
.hbox2 {
  width: 50px;
  float: left;
}
.tableheader {
  width: 960px;
  height: 44px;
  position: relative;
  left: -30px;
  margin-top: 32px;
  background: #f6f6f6;
}
.s1 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 30px;
  color: #a0a0a0;
}
.s2 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 75px;
  color: #a0a0a0;
}
.s3 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 140px;
  color: #a0a0a0;
}
.s4 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 45px;
  position: absolute;
  top: 0;
  left: 205px;
  color: #a0a0a0;
}
.s5 {
  height: 33px;
  line-height: 33px;
  text-align: left;
  width: 70px;
  position: absolute;
  top: 0;
  left: 270px;
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
  background: #ffcd35;
  color: #666666;
  position: relative;
  margin-right: 5px;
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
  top: 7px;
  left: 399px;
}
.b2 {
  background: #ffcd35;
  color: #666666;
  position: absolute;
  top: 0;
  left: 664px;
}
.b3 {
  background: #6f6c6c;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 750px;
}
.header {
  width: 810px;
  margin: auto;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.header2 {
  width: 810px;
  margin: auto;
  position: relative;
  margin-top: 10px;
}
input {
  outline: none;
}
.kuai1 {
  width: 200px;
  position: relative;
  top: 7px;
  left: 43px;
}
.kuai1 > input {
  width: 118px;
  height: 28px;
  border: 1px solid #acabab;
  margin-left: 13px;
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
  border: 1px solid #acabab;
  margin-left: 13px;
}
.kuai2 {
  width: 190px;
  position: absolute;
  left: -9px;
  text-align: left;
  top: 7px;
  margin-left: 40px;
}
.kuai3 {
  width: 170px;
  position: absolute;
  left: 216px;
  top: 7px;
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
.productli1 {
  width: 70px;
  height: 105px;
  line-height: 105px;
  position: absolute;
  left: 46px;
  top: 13.5px;
  overflow: hidden;
}
/* .productli1 > img {
  max-width: 150px;
} */
.imgjuzhong{
width: 350px!important;
  height: 105px!important;
  position: relative;
  left: -140px!important;
}
.imgjuzhong>img{
height: 105px!important;
  min-width: 70px!important;
  margin: auto!important;text-align: center;
}
.productli2 {
  width: 278px;
    height: 105px;
    text-align: left;
    position: absolute;
    left: 162px;
    top: 13.5px;
    text-align: center;
}
.productli2 > span {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.productli3 {
  width: 220px;
  height: 105px;
  line-height: 105px;
  position: absolute;
  left: 440px;
  top: 13.5px;
}
.productli4 {
  width: 220px;
  height: 105px;
  line-height: 105px;
  position: absolute;
  left: 660px;
  top: 13.5px;
}
.productli5 {
  width: 150px;
  height: 105px;
  line-height: 105px;
  position: absolute;
  left: 930px;
  top: 13.5px;
}
.productli6 {
  width: 150px;
  height: 105px;
  line-height: 105px;
  position: absolute;
  left: 780px;
  top: 13.5px;
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
/* li div img {
  width: 70px;
}
.productli1 {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
} */
</style>
