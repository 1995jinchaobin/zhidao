<template>
  <div class="window">
    <Studiotap @showEnglish="changeEnglish" :tabIndex="tabIndex"></Studiotap>
    <div class="studio">
      <div class="click">收支明细</div>
    </div>
    <div class="shuru">
      <div class="hello">
        <chart ref="chart1" id="echart1" :auto-resize="true"></chart>
      </div>
      <button class="b1" @click="tanchuang(1)">绑定银行卡</button>
      <button class="b2" @click="tanchuang(2)">提现</button>
      <button class="b3" @click="xianzhi(0)" :class="xianzhi1==0?'xuanzhong':''">全部</button>
      <button class="b4" @click="xianzhi(1)" :class="xianzhi1==1?'xuanzhong':''">交易收入</button>
      <button class="b5" @click="xianzhi(-1)" :class="xianzhi1==-1?'xuanzhong':''">交易支出</button>
      <div class="ul1">
        <div>时间</div>
        <div v-for="item in message1c.list" :key="item.id">{{item.createTime}}</div>
      </div>
      <div class="ul2">
        <div>事项</div>
        <div v-for="item in message1c.list" :key="item.id">{{item.type}}</div>
      </div>
      <div class="ul3">
        <div>金额（元）</div>
        <div v-for="item in message1c.list" :key="item.id">{{item.pay}}</div>
      </div>
      <div class="pageBox" v-if="message1.pages!=''">
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
    <div class="tanchuang" v-if="tan==1">
      <div>
        <span>户名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.name" />
      </div>
      <div>
        <span>银行卡号：</span>
        <input type="text" v-model="message2.creditCardNumbers" />
      </div>
      <div>
        <span>开户行：&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.bankOfDeposit" />
      </div>
      <div>
        <span>手机号：&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.phone" />
      </div>
      <button @click="bdyh()">绑定银行卡</button>
      <button @click="tanchuang(0)">关闭</button>
    </div>
    <div class="tanchuang" v-if="tan==2">
      <div>
        <span>户名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.name" />
      </div>
      <div>
        <span>银行卡号：</span>
        <input type="text" v-model="message2.creditCardNumbers" />
      </div>
      <div>
        <span>开户行：&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.bankOfDeposit" />
      </div>
      <div>
        <span>手机号：&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="text" v-model="message2.phone" />
      </div>
      <div>
        <span>提现金额：</span>
        <input type="text" v-model="money" />
      </div>
      <button @click="tixian()">提现</button>
      <button @click="tanchuang(0)">关闭</button>
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
// import Echart from '../..'
let echarts = require("echarts/lib/echarts");
export default {
  name: "studioManagement",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      money: 0, //提现金额
      tan: 0,
      yinhangka: "", //是否有银行卡
      chart: "",
      showJump: false,
      tabIndex: 4,
      showLoading: false,
      xianzhi1: 0, //限制
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      message1: {},
      message1c: {},
      enum1: 0, //echart数据
      enum2: 0,
      enum3: 0,
      enum4: 0,
      message2: {} //银行卡数据
    };
  },
  methods: {
    tanchuang(e) {
      this.tan = e;
    },
    changeEnglish() {
      this.$router.go(0);
    },
    xianzhi(e) {
      this.xianzhi1 = e;
      this.getqianbao(e);
      this.cnt = 1;
      this.pageNumber = "";
      this.page = [];
      this.pageIndex = 1;
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

        self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
            self.getqianbao(self.xianzhi1, self.cnt);
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            self.getqianbao(self.xianzhi1, self.cnt);
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
              self.getqianbao(self.xianzhi1, self.cnt);
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
            self.getqianbao(self.xianzhi1, self.cnt);
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
            self.getqianbao(self.xianzhi1, self.cnt);
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
          self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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

          self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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

            self.getqianbao(self.xianzhi1, self.cnt);
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
    //e限制 g页码
    getqianbao(e, g) {
      let self = this;
      let formData = new FormData();
      formData.append("pageSize", 7);
      if (g) {
        formData.append("page", g);
      } else {
        formData.append("page", 1);
      }
      if (e) {
        console.log(e);
        formData.append("tp", e);
      } else {
        formData.append("tp", 0);
      }
      let obj = {
        url: self.all.baseUrl + "/app3dUsersPurseDetailJyg/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          self.message1 = res.data.result;
          self.message1c = res.data.result;
          this.pageNumber = res.data.result.pages;
          for (let i = 0; i < self.message1c.list.length; i++) {
            self.message1c.list[i].createTime = self.format(
              self.message1c.list[i].createTime
            );
            if (self.message1c.list[i].type == 1) {
              self.message1c.list[i].type = "充值";
            }
            if (self.message1c.list[i].type == 2) {
              self.message1c.list[i].type = "消费";
            }
            if (self.message1c.list[i].type == 3) {
              self.message1c.list[i].type = "直接消费";
            }
            if (self.message1c.list[i].type == 4) {
              if (self.message1c.list[i].detailStatus == 0) {
                var a4 = "进行中";
              }
              if (self.message1c.list[i].detailStatus == 1) {
                var a4 = "已完成";
              }
              if (self.message1c.list[i].detailStatus == -1) {
                var a4 = "已取消";
              }
              self.message1c.list[i].type =
                "买素材NO." + self.message1c.list[i].indentId + "  " + a4;
            }
            if (self.message1c.list[i].type == 5) {
              if (self.message1c.list[i].detailStatus == 0) {
                var a5 = "进行中";
              }
              if (self.message1c.list[i].detailStatus == 1) {
                var a5 = "已完成";
              }
              if (self.message1c.list[i].detailStatus == -1) {
                var a5 = "已取消";
              }
              self.message1c.list[i].type =
                "卖素材NO." + self.message1c.list[i].indentId + "  " + a5;
            }
            if (self.message1c.list[i].type == 6) {
              if (self.message1c.list[i].detailStatus == 0) {
                var a6 = "进行中";
              }
              if (self.message1c.list[i].detailStatus == 1) {
                var a6 = "已完成";
              }
              if (self.message1c.list[i].detailStatus == -1) {
                var a6 = "已取消";
              }
              self.message1c.list[i].type =
                "买花型NO." + self.message1c.list[i].indentId + "  " + a6;
            }
            if (self.message1c.list[i].type == 7) {
              if (self.message1c.list[i].detailStatus == 0) {
                var a7 = "进行中";
              }
              if (self.message1c.list[i].detailStatus == 1) {
                var a7 = "已完成";
              }
              if (self.message1c.list[i].detailStatus == -1) {
                var a7 = "已取消";
              }
              self.message1c.list[i].type =
                "卖花型NO." + self.message1c.list[i].indentId + "  " + a7;
            }
            if (self.message1c.list[i].type == 8) {
              self.message1c.list[i].type = "交个人工作室押金";
            }
            if (self.message1c.list[i].type == 9) {
              self.message1c.list[i].type = "退个人工作室押金";
            }
            if (self.message1c.list[i].type == 10) {
              self.message1c.list[i].type = "交企业工作室押金";
            }
            if (self.message1c.list[i].type == 11) {
              self.message1c.list[i].type = "退企业工作室押金";
            }
            if (self.message1c.list[i].type == 12) {
              self.message1c.list[i].type = "提现";
            }
          }
          // console.log(self.message1c.list.createTime);
          // self.message1c.list.createTime=self.format(self.message1c.list.createTime);
          // console.log(self.message1c.list.createTime);
          this.pageAuto();
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
          console.log(res.data);
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
    gettoday() {
      let self = this;
      let formData = new FormData();
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      let day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      let hour =
        nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
      let minute =
        nowDate.getMinutes() < 10
          ? "0" + nowDate.getMinutes()
          : nowDate.getMinutes();
      let second =
        nowDate.getSeconds() < 10
          ? "0" + nowDate.getSeconds()
          : nowDate.getSeconds();
      let dateStr = year + "-" + month + "-" + day;
      let startTime = dateStr + "00:00:00";
      let endTime = dateStr + " " + hour + ":" + minute + ":" + second;
      formData.append("startTime", startTime);
      //  formData.append("startTime", "2019-09-02 00:00:00");
      formData.append("endTime", endTime);
      formData.append("tp", 1);
      formData.append("detailStatus", 1);
      let obj = {
        url: self.all.baseUrl + "/app3dUsersPurseDetailJyg/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data.result);

          for (let i = 0; i < res.data.result.length; i++) {
            self.enum1 += res.data.result[i].pay;
          }
          this.getyinhangka();
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
    getyinhangka() {
      let self = this;
      let formData = new FormData();
      let obj = {
        url: self.all.baseUrl + "/app3dUsersPurseJyg/info",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.result);
          if (res.data.result.storeMoney == null) {
            res.data.result.storeMoney = 0;
          }
          if (res.data.result.txdz == null) {
            res.data.result.txdz = 0;
          }
          if (res.data.result.txz == null) {
            res.data.result.txz = 0;
          }
          // storeMoney: 0.05 现有资产
          // txdz: null 提现到账
          // txz: null 提现中

          //今日收益
          console.log("............." + self.enum1);
          self.enum1 = self.enum1;
          self.enum2 =
            res.data.result.storeMoney +
            res.data.result.txz +
            res.data.result.txdz; //总收益
          self.enum3 = res.data.result.txz; //提现中
          self.enum4 = res.data.result.storeMoney; //现有总资产

          // self.myChart.setOption(option);orgOptions
          // let myChart = self.$echarts.init(document.getElementById('myChart'))
          //var myChart = echarts.init(document.getElementById('echart1'));
          let barChartBox = echarts.init(document.getElementById("echart1"));
          console.log(self.enum1);
          barChartBox.setOption({
            xAxis: {
              type: "category",
              data: ["今日收益", "总收益", "提现中", "现有总资产"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [self.enum1, self.enum2, self.enum3, self.enum4],
                type: "bar",
                smooth: true,
                label: {
                  normal: {
                    show: true, //显示数字
                    position: "top", //这里可以自己选择位置
                    color: "black"
                  }
                },
                itemStyle: { normal: { color: "rgb(137,242,246)" } }
              }
            ]
          });
          this.$forceUpdate();
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
    //获取银行卡信息
    getyh1() {
      let self = this;
      let formData = new FormData();

      let obj = {
        url: self.all.baseUrl + "/bindBankCard/info",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.result);
          if (res.data.result.creditCardNumbers != "") {
            self.yinhangka = true;
            self.message2 = res.data.result;
          } else {
            self.yinhangka = false;
            self.message2 = {
              name: "",
              bankOfDeposit: "",
              phone: "",
              creditCardNumbers: ""
            };
          }
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
    //绑定银行卡
    tanchuang1() {},
    tanchuang2() {},
    bdyh() {
      let self = this;
      if ((self.yinhangka = true)) {
        //有银行卡
        let self = this;
        let formData = new FormData();
        formData.append("status", 0);
        formData.append("name", self.message2.name);
        formData.append("creditCardNumbers", self.message2.creditCardNumbers);
        formData.append("bankOfDeposit", self.message2.bankOfDeposit);
        formData.append("phone", self.message2.phone);
        let obj = {
          url: self.all.baseUrl + "/bindBankCard/update",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            console.log(res.data);
            this.showJump = true;
            this.err = "上传成功";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1000);
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
      } else {
        //无银行卡
        let self = this;
        let formData = new FormData();
        formData.append("status", 0);
        formData.append("name", self.message2.name);
        formData.append("creditCardNumbers", self.message2.creditCardNumbers);
        formData.append("bankOfDeposit", self.message2.bankOfDeposit);
        formData.append("phone", self.message2.phone);
        let obj = {
          url: self.all.baseUrl + "/bindBankCard/save",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            console.log(res.data.result);
            this.showJump = true;
            this.err = "上传成功";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1000);
            self.getyh1();
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
      }
    },
    tixian() {
      let self = this;
      let formData = new FormData();
      console.log(1);
      if (self.message2.name == ""||self.message2.creditCardNumbers == ""||self.message2.bankOfDeposit == ""||self.message2.phone == "") {
        this.showJump = true;
        this.err = "有银行卡信息为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1000);
      }
      if (self.money < 100) {
        this.showJump = true;
        this.err = "提款金额不得小于100元";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1000);
      } else {
        formData.append("name", self.message2.name);
        formData.append("creditCardNumbers", self.message2.creditCardNumbers);
        formData.append("bankOfDeposit", self.message2.bankOfDeposit);
        formData.append("phone", self.message2.phone);
        formData.append("money", self.money);
        let obj = {
          url: self.all.baseUrl + "/applicationForWithdrawal/save",
          formdata: formData
        };
        self.getData(obj).then(res => {
          
          if (res.data.status == 0) {            
            console.log(res.data);
            if(res.data.result==null){
              this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "提现申请提交成功";
              Scroll.move();
            }, 1000);}
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
    this.gettoday();
    this.getqianbao();
    this.getyh1();
    localStorage.setItem("path", "/MyLeader");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/EnMyLeader"
      });
    } else {
      this.$router.push({
        path: "/MyLeader"
      });
    }
  }
};
</script>
<style scoped>
.tanchuang {
  position: fixed;
  background: #fff;
  z-index: 9999;
  width: 500px;
  height: 350px;
  left: calc(50% - 250px);
  box-sizing: border-box;
  /* background-color: green; */
  top: calc(50% - 175px);
  padding: 20px 20px;
}
.tanchuang > div {
  width: 500px;
  height: 50px;
}
.tanchuang > button {
  width: 130px;
  height: 30px;
  background-color: #485765;
  border: 0;
  border-radius: 5px;
  color: white;
  margin-right: 15px;
}
.hello {
  width: 800px !important;
  position: relative;
}
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
.ul1 > div {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.ul2 > div {
  width: 250px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
}
.ul3 > div {
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.ul1 {
  width: 250px;
  height: 400px;
  background-color: rgb(215, 214, 219);

  position: absolute;
  top: 550px;
  left: 50px;
}
.ul2 {
  width: 250px;
  height: 400px;
  background-color: rgb(215, 214, 219);

  position: absolute;
  top: 550px;
  left: 350px;
}
.ul3 {
  width: 250px;
  height: 400px;
  background-color: rgb(215, 214, 219);
  position: absolute;
  top: 550px;
  left: 650px;
}
.b1 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  left: 800px;
  top: 200px;
}
.b2 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #485765;
  color: white;
  position: absolute;
  left: 800px;
  top: 270px;
}
.b3 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  left: 50px;
  top: 480px;
}
.b4 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  left: 200px;
  top: 480px;
}
.b5 {
  width: 114px;
  height: 40px;
  border-radius: 10px;
  background-color: #828181;
  color: white;
  position: absolute;
  left: 350px;
  top: 480px;
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

input {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid black;
  text-indent: 10px;
  margin-right: 50px;
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
  width: 1000px;
  height: 1249px;

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

/* .shuru > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
} */

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
  left: 225px;
  top: 1050px;
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
  left: 0px;top: 5px;
}
.yousanjiao {
  width: 0 !important;
  height: 0 !important;
  border-radius: 0 !important;
  border-top: 22.5px solid transparent;
  border-left: 45px solid #485765;
  border-bottom: 22.5px solid transparent;
  position: absolute;
  right: 0px;top: 5px;
}
@media screen and (max-width: 1800px) {
  /* .shuru {
    width: 1400px;
    left: 50px;
  }
  .studio {
    display: none;
  } */
}
</style>
