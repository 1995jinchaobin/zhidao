<template>
  <div class="fens">
    <Tab :path="path" :tabIndex="tabIndex"></Tab>
    <div class="fsCount">
      <div class="leftBox">
        <div @click="back()" class="backBtn">返回</div>
        <div class="imgBox" v-for="(item,index) in imgList" :key="index"><img :src="item" alt=""></div>
      </div>
      <div class="rightBox">
        <ul class="layerBox">
          <li  v-for="(item,index) in layerList" :key="index" @click="imgAct(item.id)">
            <span :class="item.act ? 'icon iconActive' : 'icon'"></span>
            <img :src="item.src" >
          </li>
        </ul>
        <div @click="showCheck(1)" class="downBtn"><span class="btnIcon"></span><span>下载分色图层</span></div>
      </div>
    </div>
    <div class="model" v-if="modelShow">
      <!--支付框-->
      <div v-if="payBoxType == 1" class="payBox">
        <div class="payBoxTitle">本次消费</div>
        <div class="payNumTitle">
          免费使用次数1次
        </div>
        <div class="balanceBox">
          <div class="balance">剩余免费使用次数{{free}}次</div>
        </div>
        <div class="bottom">
          <div class="surePayBtn">确认</div>
          <div class="cancelBtn" @click="closepayBox">取消</div>
        </div>
      </div>
      <div v-if="payBoxType == 2" class="payBox">
        <div class="payBoxTitle">本次消费</div>
        <div class="payNumTitle">
          花花币:
          <img src="../../assets/image/user/jinbi-2.png" />
          <label>30个</label>
        </div>
        <div class="balanceBox">
          <div class="balance">账户花花币余额：{{money}}</div>
        </div>
        <div class="bottom">
          <div class="surePayBtn">确认支付</div>
          <div class="cancelBtn" @click="closepayBox">取消</div>
        </div>
      </div>
      <div v-if="payBoxType == 3" class="payBox">
        <div class="payBoxTitle">本次消费</div>
        <div class="payNumTitle">
          花花币:
          <img src="../../assets/image/user/jinbi-2.png" />
          <label>30个</label>
        </div>
        <div class="balanceBox">
          <div class="balance">账户花花币余额：{{money}}，请先充值</div>
        </div>
        <div class="bottom">
          <div class="surePayBtn" @click="showCheck(2)">充值</div>
          <div class="cancelBtn" @click="closepayBox">取消</div>
        </div>
      </div>
      <!--关闭按钮-->
      <img class="closeBtn" @click="closepayBox" src="../../assets/image/banquan/guanbi.png" />
      <form action="" v-if="showFirst" class="rechargeBox">
          <div class="modelHeader">
              <span class="recharge">选择充值方式</span>
              <!--关闭按钮-->
              <img class="closeBtn" @click="closeClick" src="../../assets/image/banquan/guanbi.png"/>
          </div>
          <div class="modelType moneyDetail">
              <div class="tips">充值金额</div>
              <div @click="selectMoney(3000)" :class="{box:true,moneyBoxChecked:price==3000}">
                  <img :src="price==3000?coinImg:garyCoinImg" alt=""><span>3000</span>
              </div>
              <div @click="selectMoney(5000)" :class="{box:true,moneyBoxChecked:price==5000}">
                  <img :src="price==5000?coinImg:garyCoinImg" alt=""><span>5000</span>
              </div>
              <div @click="selectMoney(10000)" :class="{box:true,moneyBoxChecked:price==10000}">
                  <img :src="price==10000?coinImg:garyCoinImg" alt=""><span>10000</span>
              </div>
          </div>
          <div class="modelType">
              <div class="tips">充值方式</div>
              <div @click="changePayType(3)" :class="{box:true,moneyBoxChecked:payType==3}">
                  <img src="../../assets/image/user/zhifubao.png" alt=""><span>支付宝</span>
              </div>
              <div @click="changePayType(5)" :class="{box:true,moneyBoxChecked:payType==5}">
                  <img src="../../assets/image/user/weixinzhifu.png" alt=""><span>微信</span>
              </div>
              <div @click="changePayType(4)" :class="{box:true,moneyBoxChecked:payType==4}">
                  <img src="../../assets/image/user/yue.png" alt=""><span>余额</span>
              </div>
          </div>
          <div v-if="payType==3 || payType==5 || payType==0" class="imgArea">
              <!--支付宝/微信支付-->
              <img :src="qrImgSrc" alt="">
              <div style="font-size: 16px;color: #9D9C9C;">请扫码完成支付</div>
          </div>
          <!--余额支付-->
          <div v-if="payType==4" class="codeArea">
              <div class="balanceTrue">可用余额：{{Money.money}}</div>
          </div>
          <div class="clear"></div>
          <!--确认支付按钮-->
          <div v-if="payType==4" class="surePay" @click="surePay" :disable="needDisable">确认支付</div>
          <div v-if="payType==3 || payType==5" class="surePay" @click="surePay">我已支付</div>
      </form>
    </div>
    <div style="height: 1px;"></div>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Tab from '../../components/Tab';
import Scroll from '@/assets/js/scroll.js';
import Loading from '@/components/Loading';
import InfoBox from '@/components/common/InfoBox';
export default {
  name: 'demixing',
    components: {
        Tab,
        Loading,
        Scroll,
        InfoBox
    },
    data(){
      return {
        path:'/Demixing',
        tabIndex: 0,
        showLoading: false,
        //是否显示提示框-1不显示，0:显示成功，1：显示警告
        showInfo:-1,
        errMsg:'',
        succMsg:'',
        // 叠加效果展示
        imgList:[],
        // 图层列表
        layerList:[
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:1},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:2},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:3},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:4},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:5},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:6},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:7},
          {name:'1',src:require('../../assets/image/homepage/wanou1.png'),act: false,id:8}
        ],
        // 支付方式，1---免费试用次数，2---花花币，3---余额不足
        payBoxType: 3,
        payType:0,
        // 账户余额
        money:3000,
        // 账户剩余免费使用次数
        free: 100,
        modelShow: false,
        showFirst: false,
        // 充值弹窗数据
        coinImg:require('../../assets/image/user/jinbi.png'),
        garyCoinImg:require('../../assets/image/user/jinbi-gray.png'),
        qrImgSrc:require('../../assets/image/user/scanning.png'),
        //是否禁用按钮
        needDisable:false,
        price:3000,
        Money:[]
      }
    },
    methods:{
      back(){
        this.$router.push({
          name: 'Paging'
        })
      },
      imgAct(id){
        let _this = this;
        this.imgList = [];
        this.layerList.map(function(item){
          if(item.id == id){
            item.act = !item.act;
          }
          if(item.act){
            _this.imgList.push(item.src)
          }
          _this.$forceUpdate();
        });
      },
      showCheck(type){
        if(type == 1){
          this.modelShow = true;
        }else if(type ==2){
          this.showFirst = true;
          this.changePayType(3)
        }
        Scroll.stop();
      },
      closepayBox() {
        this.modelShow = false;
      },
      //选择充值金额
      selectMoney(money){
          this.price = money;
          this.changePayType(3);
      },
      closeClick(){
        this.showFirst = false;
      },
      //切换支付方式
      changePayType(payType){
          this.payType = payType;
          let self = this;
          //请求接口
          let formData = new FormData();
          formData.append('money',self.price);
          formData.append('payType',self.payType);
          let obj = {
              url: this.all.baseUrl + '/new/business/charge',
              formdata: formData
          }
          //如果是支付宝/微信直接请求接口
          if (self.payType==3 || self.payType==5){
              self.getData(obj).then(res=>{
                  if(res.data.status==0){
                      setTimeout(function(){
                          self.showJump = false;
                          self.err = '';
                          //请求完成
                          self.order_code = res.data.result.order_code;
                          self.qrImgSrc = res.data.result.qrImgSrc;
                      },1500);
                  }else if(res.data.status==-95){
                      self.showJump = true;
                      self.err = res.data.msg;
                      Scroll.stop();
                      setTimeout(function(){
                          self.showJump = false;
                          self.err = '';
                          Scroll.move();
                          localStorage.clear();
                          self.$router.push({
                              path: '/Login'
                          });
                      });
                  }else{
                      self.showInfo = 1;
                      self.errMsg = res.data.msg;
                      setTimeout(function(){
                          self.showInfo = -1;
                          self.errMsg = '';
                      },1000);
                      return;
                  }
              });
          } else if(self.payType==4){
            if(!self.Money.money){
              //请求接口
              self.getMoney();
            }
          }
      },
      //确认支付
      surePay(){
          let self = this;
          self.needDisable = true
          //遮罩层
          self.showLoading=true
          //如果是支付宝/微信支付
          if (self.payType==3||self.payType==5) {
              let formData = new FormData();
              formData.append('orderCode',self.order_code);
              let obj = {
                  url: this.all.baseUrl + '/new/userPurse/getUserPurseDetailByOrderCode',
                  formdata: formData
              }
              self.getData(obj).then(res=>{
                  if(res.data.status==0){
                      //显示支付成功
                      self.showInfo=0;
                      self.succMsg='充值成功';
                      self.showLoading=false;
                      Scroll.stop();
                      setTimeout(function(){
                          //关闭支付窗口
                          self.closeClick();
                          Scroll.move();
                          //将支付方式换成默认
                          self.payType = 0;
                          //将充值金额换成''
                          self.price='';
                      },1500);
                  }else if(res.data.status==-95){
                      self.showJump = true;
                      self.err = res.data.msg;
                      Scroll.stop();
                      setTimeout(function(){
                          self.showJump = false;
                          self.err = '';
                          localStorage.clear();
                          Scroll.move();
                          self.$router.push({
                              path: '/Login'
                          });
                      });
                      self.showLoading=false;
                  }else{
                      self.showLoading=false;
                      self.showInfo = 1;
                      self.errMsg = res.data.msg;
                      console.log(1)
                      setTimeout(function(){
                          self.showInfo = -1;
                          self.errMsg = '';
                      },1000);
                  }
              });
          } else if(self.payType==4){
              //如果是余额支付
              let formData = new FormData();
              formData.append('money',self.price);
              formData.append('payType',self.payType);
              let obj = {
                  url: this.all.baseUrl + '/new/business/charge',
                  formdata: formData
              }
              self.getData(obj).then(res=>{
                  if(res.data.status==0){
                      Scroll.stop();

                      self.showLoading=false;
                      //显示支付成功
                      self.showInfo=0;
                      self.succMsg='充值成功';
                      setTimeout(function(){
                          //关闭支付窗口
                          self.closeClick()
                          self.showInfo=-1;
                          self.succMsg=''
                          Scroll.move();
                          //刷新页面
                          self.getMoney();
                          self.getList();
                          this.needDisable = false;
                      },1500);
                  }else if(res.data.status==-95){
                      self.showJump = true;
                      self.err = res.data.msg;
                      Scroll.stop();
                      setTimeout(function(){
                          self.showJump = false;
                          self.err = '';
                          localStorage.clear();
                          Scroll.move();
                          self.$router.push({
                              path: '/Login'
                          });
                      });
                      self.showLoading=false;
                  }else{
                      self.showLoading=false;
                      self.showInfo=1;
                      self.errMsg = res.data.msg;
                      Scroll.stop();
                      setTimeout(function(){
                          self.showInfo=-1;
                          self.errInfo = '';
                          Scroll.move();
                          this.needDisable=false;
                      },1000);
                  }
              });
          }
      },
      // 获取用户余额
      getMoney(){
          let formData = new FormData();
          let self = this;
          this.showLoading = true;
          if(this.applyStatue!=0){
              formData.append('applyStatue',this.applyStatue);
          }
          let obj = {
              url: this.all.baseUrl + '/new/userPurse/getUserPurseByUserId',
              formdata: formData
          }
          this.getData(obj).then(res=>{
              setTimeout(function(){
                  self.showLoading = false;
              },500);
              if(res.data.status==0){
                  this.Money = res.data.result;
                  this.$forceUpdate();
              }else if(res.data.status==-95){
                  this.showJump = true;
                  this.err = res.data.msg;
                  Scroll.stop();
                  setTimeout(function(){
                      self.showJump = false;
                      self.err = '';
                      Scroll.move();
                      localStorage.clear();
                      self.$router.push({
                          path: '/Login'
                      });
                  },1500);
              }else{
                  this.showJump = true;
                  this.err = res.data.msg;
                  Scroll.stop();
                  setTimeout(function(){
                      self.showJump = false;
                      self.err = '';
                      Scroll.move();
                  },1500);
              }
          });
      },
      
    },
    mounted(){
      // localStorage.setItem('path',this.path)
    }
}
</script>

<style scoped>
 .fens{
   width: 100%;
   background: #eee;
 }
 .fens div.fsCount{
   width: 1200px;
   height: 907px;
   border: 1px solid #979797;
   margin: 123px auto 140px;
   background:#fff;
   display: flex;
   justify-content: space-between;
 }
 .leftBox,.rightBox{
   margin-top: 48px;
 }
 .leftBox{
   width: 527px;
   height: 807px;
   background: #F6F6F6;
   border: 1px solid #979797;
   margin-left: 48px;
   margin-right: 33px;
   position: relative;
 }
 .imgBox{
   width: 100%;
   height: 100%;
   position: absolute;
   top:0;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .backBtn{
   width: 120px;
   height: 30px;
   text-align: center;
   line-height: 30px;
   font-size: 14px;
   color: #333333;
   background: #FFFFFF;
   border: 0 solid #DDDDDD;
   border-radius: 4px;
   position: absolute;
   top: 34px;
   left: 363px;
   cursor: pointer;
   z-index: 1;
 }
 .backBtn:hover{
   background: #eee;
 }
 .rightBox{
   margin-right: 24px;
 }
 .layerBox{
   width: 576px;
   height: 724px;
   border: 1px solid #979797;
   overflow-x: auto;
 }
 .layerBox li{
   float:left;
   width: 140px;
   height: 214px;
   background: #F6F6F6;
   border: 1px solid #979797;
   overflow: hidden;
   margin-top: 58px;
   margin-right: 40px;
   position: relative;
 }
 .layerBox li:nth-child(3n+1){
   margin-left: 37px;
 }
 .layerBox li:nth-child(3n){
   margin-right: 15px;
 }
 .layerBox li:last-child{
   margin-bottom: 50px;
 }
 .layerBox li img{
   width: 100%;
   height: auto;
 }
 .icon{
   width: 12px;
   height: 12px;
   display: inline-block;
   position: absolute;
   background: #FFFFFF;
   border: 1px solid #DCDCD9;
   border-radius: 50%;
   background-image: none;
   top: 11px;
   left: 11px;
 }
 .iconActive{
   background-image: url('../../assets/image/shopping/Radio.png') !important;
   background-size: 100%;
 }
 .downBtn{
   width: 576px;
   height: 60px;
   line-height: 60px;
   background: #FFE300;
   border-radius: 4px;
   margin-top: 23px;
   cursor: pointer;
 }
 .downBtn:hover{
   background: #ffd000;
 }
 .downBtn span{
   font-size: 14px;
   color: #333333;
   font-weight: bold;
 }
 .btnIcon{
   display: inline-block;
   width: 14.1px;
   height: 12.6px;
   background: #ffe300 url('../../assets/image/homepage/Crown.png') no-repeat center;
   background-size: 100%;
   margin-right: 10px;
 }
/*弹窗样式*/
.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.payBox {
  background-color: #ffffff;
  width: 306px;
  height: 175px;
  position: absolute;
  left: calc(50% - 153px);
  top: calc(50vh - 175px);
  text-align: left;
  padding-top: 15px;
  font-size: 14px;
  border-radius: 4px;
}
.closeBtn {
  width: 30px;
  height: 30px;
  position: relative;
  top: 300px;
  left: 178px;
}
.payNumTitle {
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.32px;
  text-align: center;
}
.payNumTitle img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
  margin-right: 8px;
}
.payNumTitle label {
  font-size: 18px;
  color: #fb6413;
}
.balanceBox {
  text-align: left !important;
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.balance {
  margin-left: 10px;
  font-size: 12px;
  color: #666666;
}
.payBox .bottom {
  width: 100%;
  height: 52px;
  display: flex;
  margin-top: 3px;
  position: absolute;
  bottom: 0px;
}
.payBox .surePayBtn,
.payBox .cancelBtn {
  width: 155px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
}
.payBox .surePayBtn {
  background: #ffe135;
}
.payBox .cancelBtn {
  border-top: 1px solid #979797;
  border-left: 1px solid #979797;
  height: 52px;
  line-height: 52px;
}
button {
  cursor: pointer;
}
.payBox .payBoxTitle {
  margin-bottom: 21px;
  text-align: center;
}
.beforePrice {
  text-decoration: line-through;
  font-family: PingFangSC-Regular;
  font-size: 14px !important;
  color: #9f9c9b !important;
  position: relative;
  margin-left: 8px;
  top: -2px !important;
}
.payBox .vipPrice {
  margin-left: 11px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #fb6413;
}
.btnBox>div,.closeBtn{
  cursor: pointer;
}
.btnBox>div:first-child:hover,.surePayBtn:hover{
  background: #ffd000 !important;
}
.btnBox>div:last-child:hover,.cancelBtn:hover{
  background: #eee !important;
}
/* 充值弹窗 */
form{
    position: absolute;
    display: block;
    left: calc(50% - 18.375rem);
    top: calc(50vh - 15rem);
    background: #F9F9F9;
    width: 503px;
    box-sizing: border-box;
  }
.rechargeBox .rechargeModelInput input{
    background: #FFFFFF;
    border: 1px solid rgba(151,151,151,0.36);
    border-radius: 4px;
    font-size: 14px;
    text-indent: 22px;
    margin-left: 10px !important;
}
.rechargeModelInput{
    text-align: left;
    padding-left: 57px !important;
}
.imgArea{
    width: 365px;
    height: 148px;
    margin: 21px 0 30px 57px;
    background: #FFFFFF;
    border-radius: 13px;
    text-align: center;
}
.imgArea img{
    width: 99px;
    height: 90px;
    margin-top: 24px;
    /*margin-bottom: 10px;*/
}
.modelType .tips{
    border: none;
    font-size: 14px;
    color: #707070;
    width: auto;
    margin-left: 0px;
}
.moneyDetail img{
    width: 16px;
    height: 14px;
}
.moneyDetail span{
    margin-left: 4px;
}
.moneyBoxChecked{
    background: #FFFFFF;
    border: 1px solid #FB6413 !important;
    box-shadow: 0 2px 4px 0 rgba(254,100,0,0.32);
}
form .modelHeader{
    /*height: 35px;*/
    margin-bottom: 18px;
}
form .modelHeader img{
  margin-left: 510px;
  top: 0px;
  left: 4px;
}
form .close{
  position: absolute;
  right: -40px;
  top: 5px;
  display: block;
  width: 30px;
  height: 30px;
}
.modelHeader>span{
  position: absolute;
  left: 24px;
  top: 13px;
  font-size: 14px;
}
.modelHeader>div{
    margin: 16px auto 0;
    font-size: 14px;
    font-weight: bold;
}
.modelType{
    display: flex;
    margin-top: 21px;
    /*justify-content: space-evenly;*/
    font-size: 14px;
    padding-left: 41px;
}
.modelType>div{
    width: 92px;
    height: 32px;
    border: 1px solid #BEBCBC;
    display: flex;
    align-items: center;
    text-align: left;
    margin-left: 21px;
}
.modelType img{
    width: 19px;
    height: 19px;
    margin: auto 0;
    margin-left: 9px;
}
.modelType span{
    position: relative;
    left: 15px;
}
.modelInput{
    font-size: 14px;
    margin-bottom: 21px;
}
.modelInput input{
    width: 299px;
    height: 39px;
    margin-left: 32px;
}
form>img{
    width: 117px;
    height: 117px;
    margin: 24px auto 15px;
    display: block;
}
.boxActive{
    background: #FFFFFF;
    border: 1px solid #FB6413 !important;
    box-shadow: 0 2px 4px 0 rgba(254,100,0,0.32);
}
form label{
    display: flex;
    padding: 0 2rem;
    box-sizing: border-box;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .9375rem;
}
label span{
    color: #333;
    font-size: 1.125rem;
}
label input,
label textarea{
    width: 25.25rem;
    outline: none;
    border: 1px solid #cecece;
    box-sizing: border-box;
    border-radius: .3125rem;
    padding: 0 .5rem;
}
label input{
    height: 2.5rem;
}
label textarea{
    padding-top: .5rem;
    height: 10rem;
}
label.sureBox{
    border-top: 1px solid #c3c3c3;
    height: 3.75rem;
    margin: 0;
}
label.sureBox span{
    color: #b4b4b4;
    font-size: 1rem;
}
label button{
    width: 7.5rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    background: #133ffc;
    color: #fff;
    font-size: 1.25rem;
    outline: none;
    border: none;
}
.surePay{
  width: 135px;
  height: 29px;
  text-align: center;
  background: #FFE135;
  margin: 0 auto;
  margin-bottom: 20px;
  line-height: 29px;
}
.surePay:hover{
  background-color: #ffd000;
}
.codeArea{
  width: 365px;
  height: 148px;
  background: #FFFFFF;
  border-radius: 13px;
  margin: 21px auto 34px;
  position: relative;
  left: -10px;
}
.balanceTrue{
  margin: 0 auto;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #020202;
  letter-spacing: 0.29px;
  position: relative;
  top: 60px;
}
</style>