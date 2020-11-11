<template>
  <div class="money">
    <!-- 提现 -->
    <!-- <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab> -->
    <!-- <span class="line"></span> -->
    <div class="content" :style="{height: height}">
      <!-- <h2>提现记录</h2> -->
      <div class="titleBox">
        <div>我的分色</div>
        <div class="tips">( 您的免费分色次数为：{{ColorSeparationNum}}次 )</div>
      </div>
      <div class="orderClass">
        <span>分色名</span>
        <input type="text" class="ColorSeparationname" v-model="searchParams.getCutouts.name" />
        <span>时间</span>
        <el-date-picker
          size="mini"
          v-model="searchParams.getCutouts.startTime"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <span>至</span>
        <el-date-picker
          size="mini"
          v-model="searchParams.getCutouts.endTime"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd 23:59:59"
          type="date"
          default-time="23:59:59"
        ></el-date-picker>
        <button class="search" @click="search">搜索</button>
      </div>
      <table class="order">
        <tr class="orderHeader">
          <td  style="width:50px">
            <div :class="{checkBox:true,checkedBox:checkedAllFlag==true}" @click="checkAll()"></div>
          </td>
          <td>分色名</td>
          <td>时间</td>
          <td>操作</td>
        </tr>
        <tr class="orderItem" v-for="(item,index) in list" v-bind:key="index">
          <td style="width:50px">
            <div
              :class="{checkBox:true,checkedBox:checkedList.includes(item.id)}"
              @click="check(index)"
            ></div>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.create_time}}</td>
          <td class="download">下载</td>
        </tr>
      </table>
      <div v-if="list.length<=0" class="noData">
        <img src="../../assets/image/user/Emoji.png" alt />
        <div>空空如也</div>
      </div>
      <!--分页-->
      <ul class="pageBox" v-if="pageNumber!=0">
        <li @click="prev">
          <img src="../../assets/image/cut/left.png" alt />
        </li>
        <li
          @click="btnClick(index)"
          :class="index==pageIndex-1?'click':''"
          v-for="(item,index) in page"
          :key="index"
        >{{item.name}}</li>
        <li @click="next">
          <img src="../../assets/image/cut/right.png" alt />
        </li>
      </ul>
    </div>
    <Jump v-if="showJump" :title="err" :urlChange="false"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
// import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
// import InfoBox from "@/components/common/InfoBox";
// import PageJump from "@/components/common/PageJump";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
import axios from "axios";
export default {
  name: "Money",
  components: {
    // Tab,
    Loading,
    Jump,
    // PageJump,
    // InfoBox
  },
  data() {
    return {
      //查询参数
      searchParams: {
        getCutouts: {
          name: "",
          startTime: "",
          endTime: ""
        }
      },
      ColorSeparationNum: 0,
      showJump: false,
      err: "",
      height: "",
      tabIndex: null,
      showLoading: false,
      path: "/ColorSeparation",
      list: [],
      cnt: 1,
      count: 10,
      pageNumber: "",
      // 页数
      pageIndex: 1,
      flag: 0,
      page: [],
      payType: 0,
      checkedAllFlag:false,
      checkedList:[],
    };
  },
  methods: {
    // 初始化分页器
    pageAuto() {
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
      if (this.pageNumber <= 7) {
        this.flag = 0;
        this.cnt = index + 1;
        this.getCutouts();
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
              this.getCutouts();
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
              this.getCutouts();
              this.pageIndex = 4;
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
            this.getCutouts();
            this.pageIndex = 7;
          } else {
            this.cnt = this.page[index].name;
            this.getCutouts();
            this.pageIndex = index + 1;
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              this.getCutouts();
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
              this.getCutouts();
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
              this.getCutouts();
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
              this.getCutouts();
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
              this.getCutouts();
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
            this.getCutouts();
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
            this.getCutouts();
          }
        }
      }
    },
    // 上一页
    prev() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt == 1) {
          this.showPageJump = true;
          this.err = "已经是第一页了!";
          setTimeout(function() {
            self.showPageJump = false;
            self.err = "";
          }, 1500);
        } else {
          this.cnt -= 1;
          this.pageIndex -= 1;
          this.getCutouts();
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
            this.getCutouts();
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
            this.getCutouts();
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
            this.getCutouts();
          }
        } else {
          this.showPageJump = true;
          this.err = "已经是第一页了!";
          setTimeout(function() {
            self.showPageJump = false;
            self.err = "";
          }, 1500);
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
          this.getCutouts();
        } else {
          this.showPageJump = true;
          this.err = "最后一页了";
          setTimeout(function() {
            self.showPageJump = false;
            self.err = "";
          }, 1500);
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
            this.getCutouts();
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
            this.getCutouts();
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
            this.getCutouts();
          }
        } else {
          this.showPageJump = true;
          this.err = "最后一页了";
          setTimeout(function() {
            self.showPageJump = false;
            self.err = "";
          }, 1500);
        }
      }
    },
    search() {
      this.getCutouts();
    },
    //全选
    checkAll(){
        this.checkedAllFlag=!this.checkedAllFlag;
        let checkedList=[];
        //如果全选
        if(this.checkedAllFlag){
            for(var i = 0; i< this.list.length;i++){
                checkedList.push(this.list[i].id)
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
        if(checkedList.indexOf(this.list[index].id)>-1){
            checkedList.splice(checkedList.indexOf(this.list[index].id), 1)
        }else{
            checkedList.push(this.list[index].id)
        }
        this.checkedList = checkedList;
        if(this.checkedList.length<this.list.length){
            this.checkedAllFlag=false
        }else{
            this.checkedAllFlag=true
        }
    },
    //查询分色列表
    getCutouts() {
      let self = this;
      //请求接口
      let formData = new FormData();
      formData.append("pageSize", self.count);
      formData.append("page", self.cnt);
      formData.append("name", self.searchParams.getCutouts.name);
      let obj = {
        url: this.all.baseUrl + "/new/cutout/getCutouts",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          // console.log(res.data);
          // console.log(res.data.result.list[0].create_time);
          self.list = res.data.result.list;
          for (let i = 0; i < self.list.length; i++) {
            self.list[i].create_time = Scroll.changeDate(
              self.list[i].create_time
            );
          }
        } else if (res.data.status == -95) {
          self.showJump = true;
          self.err = res.data.msg;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            localStorage.clear();
            Scroll.move();
            self.$router.push({
              path: "/Login"
            });
          });
        } else {
          self.showJump = true;
          self.err = res.data.msg;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2500);
        }
      });
    },
    // /new/cutout/getUserColorSeparation
    getUserColorSeparation() {
      let self = this;
      //请求接口
      let formData = new FormData();
      let obj = {
        url: this.all.baseUrl + "/new/cutout/getUserColorSeparation",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data);
          if(res.data.result&&res.data.result.num){
            self.ColorSeparationNum = res.data.result.num;
          }
        } else if (res.data.status == -95) {
          self.showJump = true;
          self.err = res.data.msg;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            localStorage.clear();
            Scroll.move();
            self.$router.push({
              path: "/Login"
            });
          });
        } else {
          self.showJump = true;
          self.err = res.data.msg;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2500);
        }
      });
    }
  },
  mounted() {
    this.getCutouts();
    this.getUserColorSeparation();
  }
};
</script>
<style scoped>
input {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
}
.notes {
  min-height: 100vh;
  background: #eee;
  position: relative;
}
/* 弹窗 */
.model {
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
}
/* 申请成功 */
.successBox {
  position: absolute;
  width: 36.75rem;
  height: 20rem;
  top: calc(50vh - 10rem);
  left: calc(50% - 18.375rem);
  border-radius: 0.5rem;
  background: #fff;
  box-sizing: border-box;
  padding-top: 2.75rem;
}
.successClose {
  position: absolute;
  right: 1.25rem;
  top: 1rem;
  display: block;
  width: 1.5625rem;
}
.successImg {
  display: block;
  width: 7.25rem;
  margin: 0 auto;
}
.successBox h5 {
  margin-top: 1.6875rem;
  color: #333;
  font-size: 1.5rem;
}
.successBox span {
  margin-top: 0.625rem;
  display: block;
  color: #999;
  font-size: 1.125rem;
}
/* 绑定提现 */
.callImg {
  width: 301px;
  height: 136px;
  color: #fff;
  background: #000;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 6px;
}
.callSum {
  margin-top: 24px !important;
}
.callImg div:first-child {
  text-align: right;
  position: relative;
  top: 6px;
  right: 15px;
  cursor: pointer; 
}
.callImg div:last-child {
  display: flex;
  text-align: left;
  /*justify-content: center;*/
  margin-top: 33px;
}
.callImg img {
  width: 43px;
  height: 40px;
  margin-right: 10px;
  margin-left: 24px;
}
.callImg p {
  display: inline-block;
}
.callSum,
.callVerify {
  width: 301px;
  display: flex;
  height: 50px;
  margin: 5px auto 5px;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  align-items: center;
}
.callVerify {
  justify-content: space-between;
}
.callSum input,
.callVerify > div:last-child {
  width: 230px;
  height: 39px;
  margin-left: 8px;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  text-indent: 24px;
  font-size: 14px;
}
.callVerify > div:last-child {
  width: 234px;
  display: flex;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  background-color: #fff;
  font-size: 14px;
}
.callVerify > div:last-child input {
  width: 140px;
  height: 37px;
  border: none;
  text-indent: 24px;
  font-size: 14px;
}
.callVerify > div:last-child div {
  width: 74px;
  height: 22px;
  font-size: 10px;
  line-height: 22px;
  text-align: center;
  background: #ffe135;
  margin: auto 5px;
  text-indent: 0;
  border-radius: 4px;
  font-family: AlibabaPuHuiTiR;
  font-size: 12px;
  color: #000000;
}
.callPoint {
  width: 243px;
  height: 36px;
  margin: 10px auto 0;
  font-size: 12px;
  color: #acacac;
  text-align: left;
}
.callBtn {
  width: 310px;
  height: 32px;
  font-size: 14px;
  color: #333333;
  line-height: 30px;
  text-align: center;
  background: #ffe135;
  margin: 40px auto 11px;
  border-radius: 3px;
}
.bindName,
.bindNum,
.bindAddr,
.bindCode {
  height: 39px;
  margin: 0 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#bankName {
  color: #5f5f5f;
  background: rgba(120, 120, 128, 0.16);
}
.bindCode {
  margin-bottom: 11px;
}
.bindName > div:first-child,
.bindNum > div:first-child,
.bindAddr > div:first-child,
.bindCode > div:first-child {
  width: 60px;
  font-size: 14px;
  text-align: right;
  margin-right: 32px;
  font-weight: bold;
}
.bindName input,
.bindNum input,
.bindAddr input,
.bindCode > div:nth-child(2) {
  width: 237px;
  height: 39px;
  border-radius: 3px;
  border: 1px solid #e9e9e9;
  text-indent: 21px;
  font-size: 14px;
  background-color: #fff;
}
.bindCode > div:nth-child(2) {
  display: flex;
  text-indent: 0px;
}
.bindCode > div:nth-child(2) input {
  width: 150px;
  border: none;
  text-indent: 21px;
  font-size: 14px;
}
.bindCode > div:nth-child(2) div {
  width: 74px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  margin: auto 0;
  background: #ffe135;
  border-radius: 4px;
  font-size: 12px;
}
/* 申请成功结束 */
.model form {
  position: absolute;
  display: block;
  left: calc(50% - 18.375rem);
  top: calc(50vh - 15rem);
  background: #f9f9f9;
  width: 503px;
  box-sizing: border-box;
}
form .modelHeader {
  /*height: 35px;*/
  margin-bottom: 18px;
}
form .modelHeader img {
  margin-left: 510px;
}
form .close {
  position: absolute;
  right: -40px;
  top: 5px;
  display: block;
  width: 30px;
  height: 30px;
}
.modelHeader > span {
  position: absolute;
  left: 24px;
  top: 13px;
  font-size: 14px;
}
.modelHeader > div {
  margin: 16px auto 0;
  font-size: 14px;
  font-weight: bold;
}
.modelType {
  display: flex;
  margin-top: 21px;
  /*justify-content: space-evenly;*/
  font-size: 14px;
  padding-left: 41px;
}
.modelType > div {
  width: 92px;
  height: 32px;
  border: 1px solid #bebcbc;
  display: flex;
  align-items: center;
  text-align: left;
  margin-left: 21px;
}
.modelType img {
  width: 19px;
  height: 19px;
  margin: auto 0;
  margin-left: 9px;
}
.modelType span {
  position: relative;
  left: 15px;
}
.modelInput {
  font-size: 14px;
  margin-bottom: 21px;
}
.modelInput input {
  width: 299px;
  height: 39px;
  margin-left: 32px;
}
form > img {
  width: 117px;
  height: 117px;
  margin: 24px auto 15px;
  display: block;
}
.boxActive {
  background: #ffffff;
  border: 1px solid #fb6413 !important;
  box-shadow: 0 2px 4px 0 rgba(254, 100, 0, 0.32);
}
form label {
  display: flex;
  padding: 0 2rem;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9375rem;
}
label span {
  color: #333;
  font-size: 1.125rem;
}
label input,
label textarea {
  width: 25.25rem;
  outline: none;
  border: 1px solid #cecece;
  box-sizing: border-box;
  border-radius: 0.3125rem;
  padding: 0 0.5rem;
}
label input {
  height: 2.5rem;
}
label textarea {
  padding-top: 0.5rem;
  height: 10rem;
}
label.sureBox {
  border-top: 1px solid #c3c3c3;
  height: 3.75rem;
  margin: 0;
}
label.sureBox span {
  color: #b4b4b4;
  font-size: 1rem;
}
label button {
  width: 7.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  background: #133ffc;
  color: #fff;
  font-size: 1.25rem;
  outline: none;
  border: none;
}
.line {
  display: block;
  width: 100%;
  height: 0.125rem;
  background: #d6d7de;
}
.content {
  width: 988px;
  background: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  min-height: calc(100vh - 4.75rem);
}
.content h2 {
  font-weight: normal;
  font-size: 1.875rem;
  color: #333;
  text-align: left;
  margin-bottom: 0.9375rem;
}
p.moneyBox {
  width: 15.125rem;
  height: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: #133ffc;
  border-radius: 0.3125rem;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}
p.moneyBox span {
  display: block;
  margin-top: 0.5625rem;
  font-size: 2.25rem;
}
.applyBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.applyBox > span {
  display: block;
  width: 15.125rem;
  box-sizing: border-box;
  height: 2.75rem;
  border: 1px solid #133ffc;
  border-radius: 0.3125rem;
  color: #133ffc;
  font-size: 1.125rem;
  line-height: 2.75rem;
  text-align: center;
  cursor: default;
}
/* 状态 */
.rightBox {
  position: relative;
  width: 6.75rem;
  height: 2.75rem;
  font-size: 1.125rem;
}
.clickBox {
  display: flex;
  height: 2.75rem;
  align-items: center;
  cursor: default;
}
.clickBox > span {
  color: #133ffc;
  text-align: left;
  margin-right: 0.3125rem;
}
.clickBox img {
  transform: rotate(180deg);
  display: block;
  width: 0.9375rem;
}
.clickBox img.special {
  transform: rotate(360deg);
}
.statusBox {
  position: absolute;
  width: 100%;
  height: 7.875rem;
  background: #fff;
  border-radius: 0.3125rem;
  border: 1px solid #eee;
  box-shadow: 1px 1px 1px #ddd, -1px -1px 1px #ddd;
  left: 0;
  display: flex;
  bottom: -7.875rem;
  flex-direction: column;
}
.statusBox span {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  height: 25%;
  cursor: default;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.statusBox span:last-child {
  border: none;
}
ul.navList {
  display: flex;
  background: #eee;
  align-items: center;
  color: #333;
  height: 4.375rem;
  justify-content: space-between;
  font-size: 1.25rem;
  padding: 0 1.5rem;
  font-weight: normal;
  border-radius: 0.3125rem;
  box-sizing: border-box;
}
ul.navList li {
  width: 5rem;
  overflow: hidden;
}
ul.navList li:first-child {
  text-align: left;
}
ul.proList {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 1rem;
  color: #333;
}
ul.proList li {
  height: 3.5rem;
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  font-weight: normal;
}
ul.proList li span {
  display: block;
  width: 5rem;
  text-align: center;
}
ul.proList li span:first-child {
  text-align: left;
}
.nodataBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #333;
}
.nodataBox img {
  display: block;
  margin-top: 6.25rem;
  margin-bottom: 1.25rem;
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
.header {
  width: 894px;
  height: 78px;
  margin: 50px auto 32px;
  display: flex;
  background: #ffffff;
  box-shadow: 2px -2px 27px 0 rgba(126, 126, 129, 0.15);
  border-radius: 6px;
}
.header > div {
  width: 50%;
  text-align: left;
  display: flex;
}
.header > div + div {
  border-left: 1px dashed #00000029;
}
.hraderItem {
  margin-left: 40px;
  margin-top: 10px;
}
.hraderItem .itemTitle {
  width: 101px;
  height: 20px;
  font-size: 14.04px;
  color: #010002;
  margin-bottom: 10px;
}
.hraderItem .itemCount {
  font-size: 12.01px;
  color: #010002;
}
.hraderItem .itemCount span {
  width: 91px;
  height: 21px;
  font-size: 26.08px;
  color: #fb6413;
  margin-right: 5px;
}
.header .hraderBtn {
  width: 55px;
  height: 25px;
  font-size: 14.04px;
  line-height: 25px;
  text-align: center;
  color: #010002;
  background: #ffde18;
  border-radius: 5px;
  margin: 22px 109px;
  cursor: pointer;
}
.header .hraderBtn:hover,
.etCheckCode:hover,
.callBtn:hover,
.surePay:hover {
  background-color: #ffd000 !important;
}
.order {
  width: 988px;
  border-collapse: collapse;
  line-height: 34px;
}
.order tr td:first-child {
  width: 300px;
}
.orderHeader {
  height: 33px;
}
.orderClass {
  width: 988px;
  height: 34px;
  line-height: 34px;
  text-align: left;
  margin: 0 auto;
  margin-top: 16px;
  background: #eeeeee;
}
.orderClass span:first-child {
  margin-left: 37px;
}
.orderClass span {
  width: 58px;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  color: #333333;
  cursor: pointer;
}
.orderClass span + span {
  margin-right: 38px;
}
.active {
  color: #000 !important;
}
.orderItem {
  border-bottom: 1px solid #cdcdcd;
}
.orderItem td {
  line-height: 34px;
  font-size: 14px;
}
.switch,
.Footer .delAll span:first-child {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 50%;
  position: relative;
  top: 3px;
  margin-right: 8px;
}
.del {
  width: 73px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border: 1px solid #080102;
  border-radius: 4px;
}
.orderItem .del {
  margin: 0 auto;
}
.Footer {
  width: 816px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  margin: 118px auto 0;
}
.Footer .del {
  margin-right: 50px;
}
.alert {
  width: 442px;
  background: #f6f6f6;
  position: absolute;
  top: 354px;
  left: 35%;
  overflow: hidden;
  transition: all 0.5s;
}
.alert div:first-child span {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../assets/image/user/close.png") no-repeat center;
  background-size: 100%;
  margin-left: 400px;
  margin-top: 11px;
}
.alert div + div {
  margin: auto 0;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.alert div + div img {
  width: 25px;
  height: 25px;
  margin-left: 105px;
  margin-right: 10px;
}
/* 分页器 */
ul.pageBox {
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
  cursor: pointer;
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
.empty {
  width: 100%;
  font-size: 1.875rem;
  color: #2c2e30;
  line-height: calc(100vh - 17.5rem);
  text-align: center;
}
.clear {
  clear: both;
  height: 0;
  overflow: hidden;
}
.surePay {
  width: 135px;
  height: 29px;
  text-align: center;
  background: #ffe135;
  margin: 0 auto;
  margin-bottom: 20px;
  line-height: 29px;
}
.surePay:hover {
  background-color: #ffd000;
}
.codeArea {
  width: 365px;
  height: 148px;
  background: #ffffff;
  border-radius: 13px;
  margin: 21px auto 34px;
  position: relative;
  left: -10px;
}
.balance {
  margin: 0 auto;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #020202;
  letter-spacing: 0.29px;
  position: relative;
  top: 60px;
}
/*确认是否绑定银行卡*/
.model .sureBind {
  position: absolute;
  display: block;
  left: calc(50% - 145px);
  top: calc(50vh - 77px);
  width: 290px;
  height: 157px;
  box-sizing: border-box;
  background: #f9f9f9;
  border-radius: 6px;
}
.sureBind .tips {
  margin: 58px auto 0px;
}
.sureBind .bottomArea {
  height: 54px;
  display: flex;
  position: absolute;
  bottom: 0px;
}
.sureBind .bottomArea .no {
  height: 38px;
  width: 145px;
  background: #ffffff;
  border: 0 solid #979797;
  border-radius: 0 0 0 6px;
  font-size: 14px;
  color: #333333;
  margin: 0 auto;
  padding-top: 16px;
}
.sureBind .bottomArea .yes {
  height: 38px;
  width: 145px;
  background: #ffdc24;
  border: 0 solid #979797;
  border-radius: 0 0 6px 0;
  font-size: 14px;
  color: #333333;
  margin: 0 auto;
  padding-top: 16px;
}
/* 没有数据 */
.noData {
  /*display: flex;*/
  /*justify-content: center;*/
  align-items: center;
  font-size: 1rem;
  margin-top: 15rem;
}
.noData img {
  margin-right: 1.25rem;
}
.noData span {
  margin-top: 1.25rem;
}
.specialCode {
  background: inherit;
}
/* 验证码样式 */
.code {
  height: 50px;
  color: #5d78ff;
  background: inherit;
  outline: none;
  border: 0;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  top: 0;
  right: 15px;
  background: #fff !important;
}
.bankInfo {
  width: 405px !important;
}
.bankInfoBox .modelHeader {
  margin-bottom: 35px;
}
.bottomTips {
  display: flex;
  margin-bottom: 38px;
  margin-left: 48px;
}
.bottomTips img {
  width: 12px;
  height: 14px;
  margin-right: 7px;
}
.bottomTips p {
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #b2afaf;
}
.recharge {
  font-family: SourceHanSansCN-Normal;
  font-size: 16px !important;
  color: #050505;
  background: #f9f9f9;
}
.rechargeBox .rechargeModelInput input {
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.36);
  border-radius: 4px;
  font-size: 14px;
  text-indent: 22px;
  margin-left: 10px !important;
}
.rechargeModelInput {
  text-align: left;
  padding-left: 57px !important;
}
.imgArea {
  width: 365px;
  height: 148px;
  margin: 21px 0 30px 57px;
  background: #ffffff;
  border-radius: 13px;
  text-align: center;
}
.imgArea img {
  width: 99px;
  height: 90px;
  margin-top: 24px;
  /*margin-bottom: 10px;*/
}
.modelType .tips {
  border: none;
  font-size: 14px;
  color: #707070;
  width: auto;
  margin-left: 0px;
}
.moneyDetail img {
  width: 16px;
  height: 14px;
}
.moneyDetail span {
  margin-left: 4px;
}
.moneyBoxChecked {
  background: #ffffff;
  border: 1px solid #fb6413 !important;
  box-shadow: 0 2px 4px 0 rgba(254, 100, 0, 0.32);
}
/* 弹窗样式 */
.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.bindUser .close {
  margin-left: -300px !important;
}
.bindUser {
  text-align: center;
}
.bindUserTips {
  font-size: 16px;
  color: #666666;
}
.bindUser .line {
  width: 300px;
  height: 1px;
  background-color: #e0dddd;
  margin: 10px auto 0;
}
.bindUser .lineYellow {
  width: 230px;
  height: 1px;
  background: #ffe300;
  margin: 0 auto;
  margin-top: -1px;
}
.ColorSeparationname {
  width: 132px;
  margin-right: 110px;
}
.search {
  background: #c9c7c7;
  width: 68px !important;
  height: 26px;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  color: #333333;
  cursor: pointer;
  border: 0;
  position: relative;
  top: 2px;
  margin-left: 5px;
}
.download {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #f5a623;
  cursor: pointer;
}
.tips {
  font-size: 12px;
  color: #d0cece;
  position: absolute;
  left: 120px;
  top: 30px;
}
.checkBox {
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  margin-left: 22px;
  margin-top: 12px;
  cursor: pointer;
}
.checkedBox{
    background-image: url("../../assets/image/studio/checked-logo.png");
    width: 16px !important;
    height: 16px !important;
    background-size: 100%;
    border:none;
    cursor: pointer;
  }
</style>