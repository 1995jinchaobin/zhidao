<template>
  <div class="xiugai">
    <div class="header">
      <div class="headerTitle">个人信息</div>
    </div>
    <img :src="userInfo.head_photo" style="border-radius:50%;width:100px;height:100px;margin-top:45px;" alt />

    <label for="hfile">
      <div @mousemove="show" @mouseout="hide" class="htouxiang" :style="{opacity:htouxiangTextShow==1?0.8:0}"></div>
      <div v-show="htouxiangTextShow==1"  @mousemove="show" @mouseout="hide"  class="htouxiangText">修改头像</div>
    </label>

    <input
      class="hfile"
      id="hfile"
      style="display:none"
      accept="image/*"
      type="file"
      @change="addImage"
    />
    <div class="box1">
      <div class="boxTitle">用户名：</div>
      <input v-model="userInfo.nickname" type="text" />
    </div>
    <div class="box2">
      <div class="boxTitle">手机号：</div>
      <div>{{userInfo.phone}}</div>
    </div>
    <div class="box3">
      <div class="boxTitle">用户类型：</div>
      <div class="box3a">
        <div v-for="(item,index) in userTypeList" :key="index">
          <img @click="changeIdentity(index)" :class="'userTypeCheck'+index" :src='selectIndex==index?checkedImg:checkImg' />
          <span>{{userTypeList[index]}}</span>
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="boxTitle">会员等级：</div>
      <div class="box3a">
        {{vipTypeList[vipType]}}
        <button class="kaitong1" v-if="vipType=='0'" @click="openVip">开通会员</button>
        <button class="kaitong2" @click="vipf(1)" v-if="vipType=='1'">升级企业VIP</button>
      </div>
    </div>
    <div class="box4"  v-if="vipType=='1' || vipType=='2'">
      <div class="boxTitle">会员到期：</div>
      <div class="box3a">
        {{deadLine}}
        <button class="kaitong4" @click="vipf(1)">续费</button>
      </div>
    </div>
    <button class="upload" @click="submit()">保存</button>
    <div class="model"  v-if="vip==1">
      <div>
        <div class="zhifu">
          <div style="position:relative">
            <div class="boxTitle">会员类别</div>
            <span class="x" @click="closeBox"><img src="../../assets/image/user/vip-close.png"/></span>
            <div class="typeImgArea">
              <div class="vip1"  @click="vipxzf(1)" :class="vipxz==1?'vipxz':''">
                <div class="vipa">企业VIP</div>
                <div class="vipb">12个月</div>
                <div class="vipc" :style="{background:vipxz==1?'#FB6413':'#fff',color:vipxz==1?'#fff':'#FB6413'}">￥3499.00</div>
              </div>
              <div class="vip3" @click="vipxzf(2)" :class="vipxz==2?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">12个月</div>
                <div class="vipc" :style="{background:vipxz==2?'#FB6413':'#fff',color:vipxz==2?'#fff':'#FB6413'}">￥1499.00</div>
              </div>
              <div class="vip5" @click="vipxzf(3)" :class="vipxz==3?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">3个月</div>
                <div class="vipc" :style="{background:vipxz==3?'#FB6413':'#fff',color:vipxz==3?'#fff':'#FB6413'}">￥599.00</div>
              </div>
              <div class="vip6" @click="vipxzf(4)" :class="vipxz==4?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">1个月</div>
                <div class="vipc" :style="{background:vipxz==4?'#FB6413':'#fff',color:vipxz==4?'#fff':'#FB6413'}">￥199.00</div>
                <!--<img class="cx" src="../../assets/image/user/cx.png" alt="">-->
              </div>
            </div>
            <div class="chongzhi">
              <div class="leftTitle">充值方式</div>
              <div :class="{chongzhi1:true,payChecked:payType=='5'}" @click="changePayType(5)">
                <img style="margin-top: 8px;" src="../../assets/image/user/weixinzhifu.png" alt="">
                <span>微信</span>
              </div>
              <div :class="{chongzhi2:true,payChecked:payType=='3'}" @click="changePayType(3)">
                <img style="margin-top: 8px;" src="../../assets/image/user/zhifubao.png" alt="">
                <span>支付宝</span>
              </div>
              <div :class="{chongzhi3:true,payChecked:payType=='4'}" @click="changePayType(4)">
                <img style="margin-top: 8px;" src="../../assets/image/user/yue.png" alt="">
                <span>余额</span>
              </div>
            </div>
            <div class="whitebox" v-if="payType=='3' || payType=='5' || payType==''">
              <div class="whitebox1">请扫二维码完成支付</div>
              <img class="whitebox2" :src="qian" alt="">
            </div>
            <!--余额支付-->
            <div v-if="payType=='4'" class="whitebox">
              <div class="balance">可用余额：{{balance}}</div>
            </div>
            <button @click="surePay" class="whitebox3">{{payType=='4'?'确认开通':'已支付'}}</button>
          </div>
        </div>
      </div>
    </div>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
import InfoBox from '@/components/common/InfoBox';
let date = new Date();
export default {
  name: "xiugaimima",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab,
    InfoBox,
    Loading
  },

  data() {
    return {
      path: "/geren",
      phone: localStorage.getItem("phone"),
      headPhoto: "",
      headUrl: "",
      radio: 1,
      kaitong: 1,
      descript: "",
      yonghu: "",
      vip:0,
      vipxz:'',
      fangshi:'',
      qian:'',
      message: {},
      checkImg:require('../../assets/image/user/select.png'),
      checkedImg:require('../../assets/image/user/selected.png'),
      selectIndex:0,
      userTypeList:['品牌商','设计师','面料商','辅料商','制造商'],
      htouxiangTextShow:0,
      userInfo:{},
      vipType:0,
      vipTypeList:['非会员','个人VIP','企业VIP'],
      deadLine:'',
      //是否显示提示框-1不显示，0:显示成功，1：显示警告
      showInfo:-1,
      errMsg:'',
      succMsg:'',
      //支付方式，''未选，5微信，3支付宝
      payType:'',
      balance:'',
      showLoading:false
    };
  },
  methods: {
    vipf(e){
        let self =this
        self.payType = 5
        self.vipxz = 1
        //请求接口
        let formData = new FormData();
        formData.append('payType',5);
        formData.append('vipType',1);
        let obj = {
            url: this.all.baseUrl + '/new/business/openVip',
            formdata: formData
        }
        self.getData(obj).then(res=>{
            if(res.data.status==0){
                self.qian = res.data.result.qrImgSrc;
                self.order_code = res.data.result.order_code;
                self.vip=e;
            }else if(res.data.status==-95){
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    localStorage.clear();
                    self.$router.push({
                        path: '/Login'
                    });
                });
            }else{
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    },
    fangshif(e){
      this.fangshi=e;
    },
    vipxzf(e){
      this.vipxz=e;
    },
    getData1() {
      this.headPhoto = this.$route.params.headPhoto;
    },
    submit() {
      let formData = new FormData();
      let self = this;
      formData.append("head_photo", self.userInfo.head_photo);
      formData.append("identity", self.userTypeList[self.selectIndex]);
      formData.append("nickname", self.userInfo.nickname);
      let obj = {
        url: this.all.baseUrl + "/new/users/updateUser",
        formdata: formData
      };
      self.showLoading = true;
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
            self.succMsg = res.data.msg;
            self.showInfo = 0;
            Scroll.stop();
            self.showLoading = false;
            setTimeout(function(){
                self.showInfo = -1;
                self.succMsg = '';
                Scroll.move();
                if (self.selectIndex == 0) {
                    self.message.identity = "品牌商";
                } else if (self.selectIndex == 1) {
                    self.message.identity = "设计师";
                } else if (self.selectIndex == 2) {
                    self.message.identity = "面料商";
                } else if (self.selectIndex == 3) {
                    self.message.identity = "辅料商";
                } else if (this.selectIndex == 4) {
                    self.message.identity = "制造商";
                }
                self.getMessage();
                self.$forceUpdate();
                self.$router.go(0)
            },1000);
        } else if (res.data.status == -95) {
            self.showLoading = false;
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
        } else {
            self.showLoading = false;
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
        }
      });
    },
    getMessage() {
        let self = this;
        this.showLoading = true;
        Scroll.stop();
        let formData = new FormData();
        let obj = {};
        obj.url = this.all.baseUrl + '/new/users/getUserById';
        obj.formdata = formData;
        this.getData(obj).then(res=>{
            self.showLoading = false;
            Scroll.move();
            let result;
            if(res.data.status==0){
                self.userInfo = res.data.result.userInfo;
                self.vipType = res.data.result.vipType;
                if (self.userInfo == "品牌商") {
                    self.selectIndex = 0;
                } else if (self.userInfo.identity == "设计师") {
                    self.selectIndex = 1;
                } else if (self.userInfo.identity == "面料商") {
                    self.selectIndex = 2;
                } else if (self.userInfo.identity == "辅料商") {
                    self.selectIndex = 3;
                } else if (self.userInfo.identity == "制造商") {
                    self.selectIndex = 4;
                }
                if (self.userInfo.head_photo==null) {
                    self.userInfo.head_photo= require("../../assets/image/user/avator.png");
                }
                if (self.vipType=='1'){
                    self.deadLine = Scroll.changeTime(self.userInfo.expiration_time)
                } else if (self.vipType=='2'){
                    self.deadLine = Scroll.changeTime(self.userInfo.expiration_time_plus)
                }
                localStorage.removeItem('user');
                localStorage.removeItem('headPhoto');
                localStorage.removeItem('nickname');
                localStorage.removeItem('expirationTime');
                localStorage.removeItem('expirationTimePlus');
                localStorage.setItem('headPhoto',self.userInfo.head_photo);
                localStorage.setItem('nickname',self.userInfo.nickname);
                localStorage.setItem('expirationTime',self.userInfo.expiration_time);
                localStorage.setItem('expirationTimePlus',self.userInfo.expiration_time_plus);
                self.message.expirationTimePlus = self.userInfo.expiration_time_plus;
                self.message.expirationTime=self.userInfo.expiration_time;
                self.message.nickname=self.userInfo.nickname;
                self.message.headPhoto = self.userInfo.head_photo;
                localStorage.setItem("user", JSON.stringify(self.message));
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
            }else{
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    },
    addImage(e) {
      let self = this;
      if (e.target.files.length > 1) {
          self.errMsg = '不能上传多张图片';
          self.showInfo = 1;
          Scroll.stop();
          setTimeout(function(){
              self.showInfo = -1;
              self.errMsg = '';
              Scroll.move();
          },1000);
      } else {
        self.showLoading = true;
        let files = e.target.files[0];
        this.headUrl = files;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          // 增加一个
          let formData = new FormData();
          formData.append("file", self.headUrl);
          let obj = {
            url: self.all.baseUrl + "/file/upload",
            formdata: formData
          };
          self.getData(obj).then(res => {
            self.userInfo.head_photo = res.data.result;
            //个人设置头像图片换了 等点保存再提交
            //self.change(res.data.result);
            self.showLoading = false;
          });
        };
      }
    },
    show(){
        this.htouxiangTextShow=1;
    },
    hide(){
        this.htouxiangTextShow=0;
    },
    //修改用户类型
    changeIdentity(index){
      this.selectIndex = index;
    },
    //切换支付方式
    changePayType(payType){
        this.payType = payType;
        let self = this;
        if(self.vipxz == ''){
            self.errMsg = '请先选择vip类型';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        //请求接口
        let formData = new FormData();
        formData.append('payType',self.payType);
        formData.append('vipType',self.vipxz);
        let obj = {
            url: this.all.baseUrl + '/new/business/openVip',
            formdata: formData
        }
        //如果是支付宝/微信直接请求接口
        if (self.payType==3 || self.payType==5){
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.qian = res.data.result.qrImgSrc;
                    self.order_code = res.data.result.order_code;
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    });
                }else{
                    self.errMsg = res.data.msg;
                    self.showInfo = 1;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1000);
                }
            });
        }  else if(self.payType==4 && self.balance == ''){
            //请求接口
            this.getBalance();
        }
    },
    // 获取用户余额
    getBalance(){
        let self = this;
        //请求接口
        let formDataBalance = new FormData();
        let obj = {
            url: this.all.baseUrl + '/new/userPurse/getUserPurseByUserId',
            formdata: formDataBalance
        }
        self.getData(obj).then(res=>{
            if(res.data.status==0){
                self.flag = 0;
                self.isClick = false;
                setTimeout(function(){
                    //请求完成
                    self.balance = res.data.result.money;
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
            }else{
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    },
    //开通会员
    openVip(){
        this.$router.push({
            path: '/Vip'
        });
    },
    closeBox(){
        this.vip=-1;
        //this.vipType='';
        this.vipxz = 0;
    },
    //确认支付
    surePay(){
        let self = this;
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
                    self.showInfo = 0;
                    self.succMsg=res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg='';
                        //关闭支付窗口
                        self.vip=-1;
                        self.vipType='';
                        self.vipxz = 0;
                        //重新获取用户信息并修改缓存中的用户信息
                        //刷新页面
                        self.getMessage();
                        self.getBalance();
                        // self.$router.go(0)
                        Scroll.move();
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
                }else{
                    self.showInfo = 1;
                    self.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        } else if(self.payType==4){
            //如果是余额支付
            if(self.vipxz == ''){
                self.errMsg = '请先选择vip类型';
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
                return;
            }
            let formData = new FormData();
            formData.append('payType',self.payType);
            formData.append('vipType',self.vipxz);
            let obj = {
                url: this.all.baseUrl + '/new/business/openVip',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.showInfo = 0;
                    self.succMsg=res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg ='';
                        //关闭支付窗口
                        self.vip=-1;
                        self.vipType='';
                        self.vipxz = 0;
                        //刷新页面
                        self.getMessage();
                        self.getBalance();
                        self.$router.go(0)
                        Scroll.move();
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
                    },1500);
                }else{
                    self.showInfo = 1;
                    self.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        }

    },
  },
  mounted() {
    this.getData1();
    this.getMessage();
    this.getBalance();
  }
};
</script>

<style scoped>
.x{
  position: absolute;
  top: -2px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.x img{
  width: 30px;
  height: 30px;
  position: relative;
  top: -5px;
  left: 50px;
}
.whitebox{
  width: 358px;
  height: 142px;
  background: #FFFFFF;
  margin: 7px auto 0;
  border-radius: 3px;
}
.whitebox1{
text-align: center
}
.whitebox3{
  background: #FB6413;
  border-radius: 4px;
  width: 140px;
  height: 42px;
  color: white;
  border: 0;
  margin-top: 5px;
  font-size: 14px;
  cursor: pointer;
}
.wxradio{
  width: 15px;
  height: 15px;
  border-radius: 5px;
  border: 1px solid;
  position: absolute;
  left: 3px;
    top: 11px;
  padding: 0px;
}
.zfradio{
    width: 15px;
  height: 15px;
  border-radius: 5px;
  border: 1px solid;
  position: absolute;
  left: 3px;
    top: 11px;
  padding: 0px;
}
.chongzhi{
  text-align: left;
  font-size: 12px;
  color: #242424;
  display: flex;
  margin-top: 21px;
  position: relative;
  left: 73px;
}
.leftTitle{
  height: 32px;
  line-height: 32px;
}
.chongzhi img{
  width: 13px;
  height: 13px;
  margin: 0 32px 0 8px !important;
  vertical-align: middle;
}
.chongzhi1,.chongzhi2,.chongzhi3{
  width: 97px;
  height: 32px;
  line-height: 32px;
  position: relative;
  left: 12px;
  background-color: white;
  border: 1px solid #fff;
  cursor: pointer;
}
.chongzhi2{
  left: 24px;
}
.chongzhi3{
  left: 36px;
}
.cx{
    position: absolute;
    left: 42px;
    top: -15px;
}
.zhifu{
  width: 517px;
  height: 412px;
  background: #EBEBEF;
  position: absolute;
  top: 30%;
  left: 35%;
  padding-top: 12px;
  border-radius: 3px;
}
/* 修改支付弹窗为自适应居中 */
.model>div{
  position: relative;
  height: 0;
  padding-top: 30%;
}
@media screen and (max-width: 1200px){
  .zhifu{
    left: 30%;
  }
}
.typeImgArea{
  display: flex;
  text-align: center;
}
.vip1,.vip2,.vip3,.vip4,.vip5,.vip6{
  /*width: 565px;*/
  /*height: 424px;*/
  width: 82px;
  height: 108px;
  background-color: #f7f7f7;
  border-radius: 4px;
  position: relative;
  margin-right: 20px;
  box-shadow: 1px 1px 8px 0 rgba(126,126,129,0.31);
  cursor: pointer;
}
.vip1{
  margin-left: 73px;
}
.vipxz{
  background: #FB6413;
  color: white;
}
.vipa{
  text-align: center;
  height: 36px;
  line-height: 48px;
  width: 76px;
  margin: auto;
  margin-top:2px;
  color: black;
  background-color: #f7f7f7;
  font-weight: normal;
  font-size: 12px;
}
.vipb{
  font-size: 20px;
  height: 36px;
  margin: auto;
  background-color: #f7f7f7;
  color: black;
  width: 76px;
  font-size: 20px;
}
.vipc{
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  font-size: 14px;
  color: #FB6413;
}
.hfile {
  position: relative;
  text-align: center;
}
.htouxiang {
  width: 100px;
  height: 100px;
  line-height: 100px;
  color: white;
  border-radius: 50%;
  background-color: #d8d8d8;
  opacity: 0;
  margin: -105.5px auto 0;
  cursor: pointer;
}
.label {
  width: 100px;
  height: 100px;
  position: relative;
  top: -102px;
  left: 430px;
  border-radius: 50%;
}
.kaitong1 {
  width: 86px;
  height: 22px;
  background-color: #fb6413;
  margin-left: 68px;
  border-radius: 5px;
  border: 0;
  color: white;
  cursor: pointer;
}
.kaitong2 {
  width: 99px;
  height: 22px;
  background-color: #fb6413;
  margin-left: 5px;
  border-radius: 5px;
  border: 0;
  color: white;
  cursor: pointer;
}
.kaitong3 {
  width: 99px;
  height: 22px;
  background-color: #fb6413;
  margin-left: 68px;
  border-radius: 5px;
  border: 0;
  color: white;
}
.kaitong4 {
  width: 70px;
  height: 26px;
  background-color: #fb6413;
  margin-left: 89px;
  border: 0;
  border-radius: 5px;
  color: white;
  line-height: 26px;
  font-size: 14px;
  cursor: pointer;
}
.xiugai {
  width: 100%;
  height: 1170px;
  background: #ffffff;
  border: 0;
  font-size: 14px;
  color: #a0a0a0;
  font-weight: bold;
}
.yellow1 {
  background-color: yellow;
  position: absolute;
  left: 750px;
  top: 4px;
  width: 76px;
  height: 22px;
  border: 0;
  border-radius: 3px;
}
.header {
  width: 100%;
  text-align: left;
  text-indent: 5%;
  border-bottom: 1px solid #cdcdcd;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: #040404;
  padding-top: 24px;
  padding-bottom: 3px;
  font-weight: normal !important;
}
input {
  width: 110px !important;
  height: 36px !important;
  border: 1px solid #bfbfbf !important;
  font-size: 14px;
  color: #a0a0a0;
  font-weight: bold;
  text-indent: 6px;
}
.box1,.box2,.box3,.box4{
  padding-left: 205px;
  display: flex;
  margin-bottom: 42px;
}
.box1{
  margin-top: 42px;
}
.box1 .boxTitle{
  line-height: 38px;
}
.boxTitle{
  font-size: 14px;
  text-align: left ;
  vertical-align: middle;
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  color: #242424;
  margin-left: 57px;
  margin-bottom: 16px;
}
.tishi {
  position: absolute;
  top: 5px;
  text-align: left;
  text-indent: 20px;
  left: 740px;
  line-height: 20px;
  width: 200px;
  height: 30px;
}
.imgb {
  position: absolute;
  left: 0;
  top: 0;
}
.imga {
  position: absolute;
  top: 4px;
  left: 708px;
}
.upload {
  width: 245px;
  height: 44px;
  border: 0;
  border-radius: 5px;
  background-color: #ffe300;
  margin-top: 76px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
}
.upload:hover{
  background-color: #ffd000;
}
  .box3a{
    display: flex;
  }
  .box3a img{
    width: 14px;
    height: 14px;
    margin-left: 20px;
    margin-right: 14px;
    position: relative;
    top: 2px;
    cursor: pointer;
  }
  .userTypeCheck0{
    margin-left: 0px!important;
  }
  .htouxiangText{
    color: #fff;
    position: relative;
    top: -60px;
    height: 0px;
    cursor: pointer;
  }
/* 弹窗样式 */
.model{
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0,0,0,0.4);
}
.model .boxTitle{
  text-align: left;
}
.payChecked{
  border: 1px solid #8E8E8E;
}
.whitebox2{
  width: 98px;
  height: 98px;
  margin: 15px auto 0;
  border: none;
}
.whitebox1{
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  color: #242424;
  position: relative;
  top: 10px;
}
.codeArea{
  background: #FFFFFF;
  border-radius: 3px;
  width: 358px;
  height: 142px;
  margin-top: 21px;
  text-align: center;
}
.balance{
  margin: 0 auto;
  position: relative;
  top: 62px !important;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #020202;
  letter-spacing: 0.29px;
}
</style>