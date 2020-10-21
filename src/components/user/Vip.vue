<template>
  <div class="vip">
    <!-- vip页面 -->
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="vipBg">
      <div class="tipsTop">开通会员畅享9大特权</div>
      <div class="tipsBottom">7大区域免费</div>
      <div class="contentArea">
        <img src="../../assets/image/user/1.png">
        <img src="../../assets/image/user/2.png">
        <img src="../../assets/image/user/3.png">
        <img src="../../assets/image/user/4.png">
        <img src="../../assets/image/user/5.png">
        <img class="lastImg" src="../../assets/image/user/6.png">
      </div>
      <div class="openVip"  @click="Vipon(0)">开通会员</div>
    </div>
    <div class="vipType">
      <div class="typeTitle">
        <span>Privilege contrast</span>
        <h4>特殊对比</h4>
      </div>
      <div class="tab">
        <div>
          <ul>
            <li>功能特权</li>
            <li>尊贵身份标识</li>
            <li>花型设计</li>
            <li>AI设计</li>
            <li>AI配色</li>
            <li>分色</li>
            <li>3D展示</li>
            <li>花型商城</li>
            <li>智能抠图</li>
            <li>上传素材/花型</li>
          </ul>
        </div>
        <div @mousemove="tabAct(1)" @mouseout="tabNone(1)" :class="tabFirmCheck ? 'avtTab' : ''">
          <ul>
            <li>
              <img class="falg" src="../../assets/image/user/flag.png" alt="">
              <div class="firnBox">
                <p class="itemfirm">企业会员</p>
                <p class="itemPrice">3499元/3人/年</p>
                <span @click="Vipon(1)" class="itemBtn">开通会员</span>
              </div>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText1">
              <span>20元/次<br>赠送30次</span>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <span>公开区免费<br>VIP  9.5折</span>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
          </ul>
        </div>
        <div @mousemove="tabAct(2)" @mouseout="tabNone(2)" :class="tabIndiYCheck ? 'avtTab' : ''">
          <ul>
            <li>
              <div class="firnBox">
                <p class="indiYFirm">个人会员</p>
                <p class="indiYPrice">1499元/人/年</p>
                <span @click="Vipon(2)" class="indiYbtn">开通会员</span>
              </div>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
              <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <p>使用3次</p>
            </li>
          
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText1">
              <span>
                25元/次<br>赠送8次
              </span>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <p>公开区免费</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
          </ul>
        </div>
        <div v-if="0" @mousemove="tabAct(3)" @mouseout="tabNone(3)" :class="tabIndiQCheck ? 'avtTab' : ''">
          <ul>
            <li>
              <div class="firnBox">
                <p class="itemfirm">个人会员</p>
                <p class="itemPrice">599元/人/季</p>
                <span @click="Vipon(3)" class="itemBtn">开通会员</span>
              </div>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText1">
              <span>
                20元/次<br>赠送3次
              </span>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <p>公开区免费</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
          </ul>
        </div>
        <div v-if="0" @mousemove="tabAct(4)" @mouseout="tabNone(4)" :class="tabIndiMCheck ? 'avtTab' : ''">
          <ul>
            <li>
              <div class="firnBox">
                <p class="itemfirm">个人会员</p>
                <p class="itemPrice">199元/人/月</p>
                <span @click="Vipon(4)" class="itemBtn">开通会员</span>
              </div>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText1">
              <p>25元/次</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <p>公开区免费</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
          </ul>
        </div>
        <div @mousemove="tabAct(5)" @mouseout="tabNone(5)" :class="tabVipoutCheck ? 'avtTab' : ''">
          <ul>
            <li>
              <div class="firnBox">
                <p class="itemfirm">非会员</p>
              </div>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/vipBtn.png" alt="">
            </li>
            <li class="tabText">
              <p>使用3次</p>
            </li>
            <li class="tabText">
              <p>使用3次</p>
            </li>
            <li class="tabText">
              <p>使用3次</p>
            </li>
            <li class="tabText1">
              <p>30元/次</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/yes.png" alt="">
            </li>
            <li class="tabText">
              <p>全部收费</p>
            </li>
            <li class="tabText">
              <p>使用3次</p>
            </li>
            <li class="tabImg">
              <img src="../../assets/image/user/vipBtn.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div style="height: 240px;"></div>
    </div>
    <div class="model"  v-if="vip==1">
      <div>
        <div class="zhifu">
          <div style="position:relative">
            <div class="boxTitle">会员类别</div>
            <span class="x" @click="vipf(0)"><img src="../../assets/image/user/carClose.png"/></span>
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
              <div v-if="0" class="vip5" @click="vipxzf(3)" :class="vipxz==3?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">3个月</div>
                <div class="vipc" :style="{background:vipxz==3?'#FB6413':'#fff',color:vipxz==3?'#fff':'#FB6413'}">￥599.00</div>
              </div>
              <div v-if="0" class="vip6" @click="vipxzf(4)" :class="vipxz==4?'vipxz':''">
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
    <div class="vipOn">
      <div>
        <div><h3>织道会员</h3><span>尊享九大特权</span></div>
        <div>
          <h2 @click="Vipon(0)">开通会员</h2>
          <img src="../../assets/image/user/vipRight.png">
        </div>
      </div>
    </div>
    <!-- <div v-if="!showQfc"> -->
      <!-- <div class="content">
        <div class="messageBox">
          <img class="topImage" src="http://youchaikj.com/pc-img/vip_back.png" alt />
          <div class="message">
            <h4>开启高效企业VIP会员</h4>
            <div class="lineBox">
              <span class="line"></span>
              <span>多用户动态绑定</span>
              <span class="line"></span>
            </div>
            <button class="rightnow" @click="nowBuy(enterprise[0].id,enterprise[0].price)">立即获得</button>
          </div>
        </div>
        <div class="zhidaobi">
          <div class="zhidaobitixian">
            <div class="zhidao1">可提现余额</div>
            <p class="zhidao2">{{tixian}}<span class="zhidao4">元</span></p>
            
            <button class="zhidao3" @click="tanchuang1f()">提现</button>
            
          </div>
          <div class="zhidaobichongzhi">
              <div class="zhidao1">可用花花币</div>
            <p class="zhidao2">{{zhidaobi}}<span class="zhidao4">元</span></p>
            <button class="zhidao3" @click="tanchuang2f()">充值</button>
            
          </div>
          <div class="tishi">1个花花币=1人民币</div>
        </div>
        <div v-if="tanchuang1" class="tanchuang">
          <div class="t11">
            <p class="p1">申请提现</p>
            <p class="p2" @click="close()">X</p>
          </div>
          <div class="t12">
            <p class="p3">真实姓名</p>
            <p class="p4">支付宝账号</p>
            <p class="p5">提现金额</p>
            <p class="p6">备注</p>
            <input v-model="t1.i1" class="i3" type="text">
            <input v-model="t1.i2" class="i4" type="text">
            <input v-model="t1.i3" class="i5" type="text">
            <textarea v-model="t1.i4" class="i6" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="t13">
            <button class="b1" @click="tixianq()">确定</button>
          </div>
        </div>
        <div v-if="tanchuang2" class="tanchuang">
          <p class="p7">请扫二维码完成支付</p>
          <p class="p2" @click="close()">X</p>
          <img class="simg1" src="../../assets/image/homepage/saoyisao.png" alt="">
          <img class="simg2" :src="t2.src" alt="">
          <button class="b2" @click="zhifu()">我已支付</button>
        </div>

        <h1>选择适合您的VIP套餐</h1>
        <ul class="listBox">
          <li v-for="(item,index) in enterprise" :key="'bussiness'+index" class="bussiness">
            <div class="icon">
              <img src="../../assets/image/user/bussiness.png" alt />
            </div>
            <div class="frash" v-if="item.activityType==2">
              <span>尝鲜版</span>
              <img src="../../assets/image/user/icon_present.png" alt />
            </div>
            <span class="month">{{item.duration}}个月</span>
            <span class="price">{{item.currentPrice}}</span>
            <span class="oldPrice">原价￥{{item.originalCost}}</span>
            <button class="btn" @click="nowBuy(item.id,item.price)">立即抢购</button>
            <span class="extra">可额外绑定{{item.memberNum}}人</span>
            <span class="allLine" style="color: #333;font-size: 1.125rem;">无限使用AI设计</span>
            <span class="allLine">免费模型+VIP模型</span>
            <span class="allLine">无限导出高清图片</span>
            <span class="allLine">无限使用花型设计</span>
            <span class="allLine">无限使用智能抠图</span>
          </li>
          <li class="bussiness" v-for="(item,index) in arr" :key="'people'+index">
            <div class="icon">
              <img src="../../assets/image/user/people.png" alt />
            </div>
            <div class="frash" v-if="item.activityType==2">
              <span>尝鲜版</span>
              <img src="../../assets/image/user/icon_present.png" alt />
            </div>
            <span class="month">{{item.duration}}个月</span>
            <span class="price">{{item.currentPrice}}</span>
            <span class="oldPrice">原价￥{{item.originalCost}}</span>
            <button class="btn" @click="nowBuy(item.id,item.price)">立即抢购</button>
            <span class="oneLine allLine">免费模型+VIP模型</span>
            <span class="allLine">无限导出高清图片</span>
            <span class="allLine">无限使用花型设计</span>
            <span class="allLine">无限使用智能抠图</span>
          </li>
        </ul>
      </div> -->
      <!-- 弹窗 -->
      <!-- <div class="model" v-if="showModel"> -->
        <!-- 立即抢购弹窗 -->
        <!-- <div class="grabBox" v-if="showGrab"> -->
          <!-- <h3>提示</h3>
          <p class="del" @click="delBind">
            <img src="../../assets/image/login/close.png" alt />
          </p> -->
          <!-- <span>选择支付方式</span> -->
          <!-- <label for>
            <span>推广码</span>
            <input v-model="codeNumber" type="text" maxlength="6" />
          </label> -->
          <!-- <div class="grabWay">
            <button @click="showBuy('微信')">微信</button>
            <button @click="showBuy('支付宝')">支付宝</button>
          </div> -->
        <!-- </div> -->
        <!-- <div class="payBox" v-if="showPay">
          <span @click="delPay" class="payDel">
            <img src="../../assets/image/login/close.png" alt />
          </span>
          <div class="smallBox">
            <img src="../../assets/image/shopping/pay.png" alt />
            <div class="code">
              <h5>请打开{{type}}扫码支付</h5>
              <div class="codeBox">
                <img :src="codeSrc" alt />
              </div>
              <button @click="hasPay" class="hasPay">我已支付</button>
            </div>
          </div>
        </div> -->
      <!-- </div>
      <div v-if="showTig" class="tig">
        <span>{{tig}}</span>
      </div>
    </div> -->

    <!-- <iframe v-if="showQfc" width="100%" height="1481px" :src="src" frameborder="0"></iframe> -->
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Scroll from "../../assets/js/scroll.js";
import InfoBox from '@/components/common/InfoBox';
let date = new Date();
function get_num(a) {
  switch (a) {
    case 1:
      window.open(
        "https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14924"
      );
      break;
    case 0:
      window.open(
        "https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14923"
      );
      break;
    case 2:
      window.open(
        "https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14925"
      );
      break;
    default:
      break;
  }
}
export default {
  name: "Vip",
  components: {
    Tab,
    InfoBox
  },
  data() {
    return {
      path: "/Vip",
      tabIndex: null,
      tanchuang1:false,
      tanchuang2:false,
      showInfo: -1,
      errMsg:'',
      succMsg:'',
      t1:{i1:'',i2:'',i3:'',i4:''},
      t2:{src2:''},
      // 个人信息
      message: {},
      zhidaobi: '20.00',
      tixian: '0.00',
      // 显示绑定关联账号按钮显示
      // bus: false,
      showModel: false,
      // 显示抢购弹窗
      showGrab: false,
      // 提示
      tig: "",
      showTig: false,
      // 支付类型 微信或者支付宝
      type: "",
      showPay: false,
      // 存储哪种类型的会员
      id: "",
      price: "",
      // 会员信息
      enterprise: [],
      arr: [],
      // 二维码图片
      codeSrc: "",
      codeNumber: "",
      showQfc: false,
      // 鼠标悬浮是改变表格样式
      tabFirmCheck: false,
      tabIndiYCheck: true,
      tabIndiQCheck: false,
      tabIndiMCheck: false,
      tabVipoutCheck: false,
      // 支付界面
      vip:0,
      vipxz:'',
      fangshi:'',
      qian:'',
      payType:'',
      order_code:'',
      qrImgSrc:'../../assets/image/user/scanning.png',
      balance:'',
      qian:''
    };
  },
  methods: {
    changeEnglish() {
      this.$router.go(0);
    },
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
                    self.err = '您的账号已在其它地方登陆';
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
                    self.showJump = false;
                    self.err = '';
                    //请求完成
                    self.balance = res.data.result.money;
                },1500);
                // self.alertShow();
            }else if(res.data.status==-95){
                self.showJump = true;
                self.err = '您的账号已在其它地方登陆';
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
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },500);
            }
        });
    },
    // 鼠标悬浮时修改表格样式
    tabAct(type){
      switch (type) {
        case 1:
          this.tabFirmCheck = true;
          this.tabIndiYCheck = false;
          this.tabIndiQCheck = false;
          this.tabIndiMCheck = false;
          this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 2:
          this.tabIndiYCheck = true;
          this.tabFirmCheck = false;
          this.tabIndiQCheck = false;
          this.tabIndiMCheck = false;
          this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 3:
          this.tabIndiQCheck = true;
          this.tabFirmCheck = false;
          this.tabIndiYCheck = false;
          this.tabIndiMCheck = false;
          this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 4:
          this.tabIndiMCheck = true;
          this.tabFirmCheck = false;
          this.tabIndiYCheck = false;
          this.tabIndiQCheck = false;
          this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 5:
          this.tabVipoutCheck = true;
          this.tabFirmCheck = false;
          this.tabIndiYCheck = false;
          this.tabIndiQCheck = false;
          this.tabIndiMCheck = false;
          this.$forceUpdate();
          break;
      
        default:
          break;
      }
    },
    tabNone(type){
      switch (type) {
        case 1:
          this.tabFirmCheck = false;
          this.tabIndiYCheck = false;
          this.tabIndiQCheck = false;
          this.tabIndiMCheck = false;
          this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 2:
            this.tabFirmCheck = false;
            this.tabIndiYCheck = false;
            this.tabIndiQCheck = false;
            this.tabIndiMCheck = false;
            this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 3:
            this.tabFirmCheck = false;
            this.tabIndiYCheck = false;
            this.tabIndiQCheck = false;
            this.tabIndiMCheck = false;
            this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 4:
            this.tabFirmCheck = false;
            this.tabIndiYCheck = false;
            this.tabIndiQCheck = false;
            this.tabIndiMCheck = false;
            this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
        case 5:
            this.tabFirmCheck = false;
            this.tabIndiYCheck = false;
            this.tabIndiQCheck = false;
            this.tabIndiMCheck = false;
            this.tabVipoutCheck = false;
          this.$forceUpdate();
          break;
      
        default:
          break;
      }
    },
    // 开通vip
    Vipon(type){
      if(type != 0){
        this.vipxz = type;
        this.changePayType(5);
      }
      this.vip = 1;
      // 1 --- 企业会员包年
      // 2 --- 个人会员包年
      // 3 --- 个人会员包季
      // 4 --- 个人会员包月
    },
    vipxzf(e){
      this.vipxz=e;
      this.changePayType(5)
    },
    vipf(e){
      if(e == 0){
        this.vipxz = '';
      }
      this.vip=e;
    },
    fangshif(e){
      this.fangshi=e;
    },
    tanchuang1f(){
      this.tanchuang2=false;
      this.tanchuang1=!this.tanchuang1;
    },
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
                        //刷新页面
                        self.getMessage();
                        self.getBalance();
                        Scroll.move();
                    },1500);
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = '您的账号已在其它地方登陆';
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
                        Scroll.move();
                    },1500);
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = '您的账号已在其它地方登陆';
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
    close(){
      this.tanchuang2=false;
      this.tanchuang1=false;
    },
    tanchuang2f(){
      this.tanchuang1=false;
      this.tanchuang2=!this.tanchuang2;
    },
    tixianq(){
      alert('提现接口暂未开通')
    },
    zhifu(){
      alert('支付接口暂未开通')
    },
    // 点击删除操作
    delUser(index) {
      let formData = new FormData();
      formData.append("id", this.bindArr[index].id);
      let obj = {
        formdata: formData,
        url: this.all.baseUrl + "/appMemberRelation/delete"
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.getList();
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 点击立即抢购
    nowBuy(id, price) {
      this.id = id;
      this.price = price;
      this.showModel = true;
      this.showGrab = true;
      Scroll.stop();
    },
    // 点击微信或者支付宝按钮
    showBuy(i) {
      this.type = i;
      let payType = "";
      if (i == "微信") {
        payType = 5;
      } else if (i == "支付宝") {
        payType = 3;
      }
      let formData = new FormData();
      formData.append("activityId", this.id);
      formData.append("typeOfActivity", 1);
      formData.append("payType", payType);
      formData.append("codeValue", this.codeNumber);
      formData.append("paymentAmount", this.price.toFixed(2));
      let obj = {
        url: this.all.baseUrl + "/appPurchaseTimeJyg/save",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.codeSrc = res.data.result.result.src;
          this.showGrab = false;
          this.showPay = true;
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 如果被登陆了
    hasLogin() {
      this.showTig = true;
      this.tig = "您的账号已在其它地方登陆";
      Scroll.stop();
      localStorage.clear();
      var self = this;
      setTimeout(function() {
        self.showTig = false;
        self.tig = "";
        Scroll.move();
        self.$router.push({
          path: "/Login"
        });
      }, 2000);
    },
    // 出错
    hasError(res) {
      this.showTig = true;
      this.tig = res.data.msg;
      var self = this;
      Scroll.stop();
      setTimeout(function() {
        self.showTig = false;
        Scroll.move();
        self.tig = "";
      }, 2000);
    },
    // 点击我已支付
    hasPay() {
      let obj = {
        url: this.all.baseUrl + "/appuser/appInfo",
        formdata: new FormData()
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          var self = this;
          if (
            res.data.result.expirationTimePlus !=
              JSON.parse(localStorage.getItem("user")).expirationTimePlus ||
            res.data.result.expirationTime !=
              JSON.parse(localStorage.getItem("user")).expirationTime
          ) {
            this.showTig = true;
            this.tig = "充值成功";
            localStorage.setItem("user", res.data.result);
            this.getMessage()
            setTimeout(function() {
              self.showTig = false;
              self.tig = "";
              self.showModel = false;
              self.showPay = false;
              self.setData();
            }, 2000);
          } else {
            this.showTig = true;
            this.tig = "您还未支付";
            setTimeout(function() {
              self.showTig = false;
              self.tig = "";
              self.showModel = false;
              self.showPay = false;
              Scroll.move();
            }, 2000);
          }
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 点击添加
    add() {
      this.showSecond = true;
    },
    // 点击右上角×
    delBind() {
      this.showModel = false;
      this.showGrab = false;
      Scroll.move();
    },
    delPay() {
      this.hasPay();
    },
    // 会员套餐接口请求
    getVip() {
      let formData = new FormData();
      let obj = {
        url: this.all.baseUrl + "/app3dTheMemberPriceJyg/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          let output = res.data.result;
          for (var i = 0; i < output.length; i++) {
            output[i].price = output[i].currentPrice;
            output[i].originalCost =
              this.changePrice(output[i].originalCost) + ".00";
            output[i].currentPrice =
              this.changePrice(output[i].currentPrice) + ".00";
            if (output[i].memberType == 2) {
              this.enterprise.push(output[i]);
            } else {
              this.arr.push(output[i]);
            }
          }
          this.enterprise = [this.enterprise[1], this.enterprise[0]];
          this.arr = [this.arr[1], this.arr[2], this.arr[3], this.arr[0]];
          // this.arr.unshift(output[output.length-1])
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 递归实现价格转化
    changePrice(str) {
      let res = str.toString();
      if (res.length <= 3) {
        return res;
      } else {
        return (
          this.changePrice(res.substr(0, res.length - 3)) +
          "," +
          res.substr(res.length - 3, res.length)
        );
      }
    },
    setData() {
      // 获取信息
      this.message = JSON.parse(localStorage.getItem("user"));
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
              result = res.data.result;
              localStorage.removeItem('expirationTime');
              localStorage.removeItem('expirationTimePlus');
              localStorage.setItem('expirationTime',result.userInfo.expiration_time);
              localStorage.setItem('expirationTimePlus',result.userInfo.expiration_time_plus);
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
  },
  mounted() {
    // localStorage.setItem('qfc',true);
    if (localStorage.getItem("qfc")) {
      this.showQfc = true;
      // var aBox = document.createElement('a');
      // aBox.target = '_blank';
      // aBox.href = 'https://www.tnc.com.cn/service/zdy/indexTemp.html?ssoSign='+localStorage.getItem('ssoSign');
      // aBox.click();
      // this.$router.go(-1);
      this.src =
        "https://www.tnc.com.cn/service/zdy/indexTemp.html?ssoSign=" +
        localStorage.getItem("ssoSign") +
        "&isWeb=web";
    } else {
      this.showQfc = false;
      this.src = "";
    }
    this.setData();
    this.getVip();
    // localStorage.setItem("path", this.path);
    // if (localStorage.getItem("English")) {
    //   this.$router.push({
    //     path: "/Envip"
    //   });
    // } else {
    //   this.$router.push({
    //     path: "/Vip"
    //   });
    // }
  }
};
</script>
<style scoped>
.tipsTop{
  position:relative;
  padding-top: 117px;
  margin-bottom: 18px;
  font-size: 36px;
  color: #fff;
}
.tipsBottom{
  font-size: 36px;
  color: #fff;
  margin-left: -145px;
}
.vip{
  background: #fff;
}
.contentArea{
  margin-top: 18px;
}
.contentArea img{
  margin-right: 30px;
  width: 122px;
  height: 192px;
}
.contentArea .lastImg{
  margin-right: 0px !important;
}
.vipBg{
  width: 100%;
  min-width: 1200px;
  height: 621px;
  position: relative;
  left: -8px;
  background-image: url("../../assets/image/user/vipBg.png");
  text-align: center;
}
.vipBg .openVip{
  width: 239px;
  height: 64px;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #fff;
  font-size: 20px;
  display: flex;
  align-items:center;
  justify-content: center;
  margin: 70px auto 0;
}
.vipType{
  width: 1200px;
  margin: 69px auto 0;
}
.typeTitle{
  margin-bottom: 60px;
}
.vipType .typeTitle span{
  font-size: 48px;
  color: #E3E3E3;
  letter-spacing: 0;
  text-align: center;
}
.vipType .typeTitle h4{
  position: relative;
  top: -24px;
  font-size: 24px;
  color: #343240;
  letter-spacing: 0;
  text-align: center;
}
.vipType>img{
  width: 983px;
  height: 658px;
  margin-bottom: 156px;
}
.vipType .tab{
  width: 554px;
  height: 615px;
  display: flex;
  border: 1px solid #EFEEEB;
  margin: 0 auto;
}
.vipType .tab>div>ul li:first-child{
  width: 153px;
  height: 92px;
}
.vipType .tab>div:first-child>ul li:first-child{
  line-height: 92px;
}
.vipType .tab>div:first-child>ul li{
  line-height: 57px;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}
.vipType .tab>div>ul li{
  width: 153px;
  height: 57px;
  border-left:1px solid #efefeb;
  border-bottom: 1px solid #efefeb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666666;
}
.vipType .tab>div>ul li img{
  width: 21px;
  height: 21px;
}
.vipType .tab>div>ul li img.falg{
  width: 29px;
  height: 58px;
  margin-top: -36px;
}
.vipType .tab>div+div>ul li:first-child>div{
  display: inline-block;
  margin-left: 8px;
}
.tab>div>ul li:nth-child(even){
  background: #F7F5F2;
}
.itemBtn{
  display: inline-block;
  width: 95px;
  height: 29px;
  font-size: 14px;
  color: #3C1A00;
  background: #F6D588;
  border-radius: 14.5px;
  line-height: 29px;
  text-align: center;
}
.itemfirm{
  font-size: 14px;
  color: #D5B385;
}
.itemPrice{
  font-size: 14px;
  color: #EF9509;
}
.indiYFirm{
  font-size: 14px;
  color: #FD8C86;
}
.indiYPrice{
  font-size: 14px;
  color: #CC6570
}
.indiYbtn{
  display: inline-block;
  width: 95px;
  height: 29px;
  background: #fff;
  border: 1px solid  #CC6570;
  border-radius: 14.5px;
  line-height: 29px;
  text-align: center;
  font-size: 14px;
  color: #CC6570;
}
.itemBtn,.indiYbtn{
  cursor: pointer;
}
.vipType .tab>div>ul li.tabText{
  font-size: 14px;
  color: #EF9509;
}
/* 鼠标悬浮时表格的样式 */
.avtTab{
  position: relative;
  width: 153px;
}
.avtTab ul{
  position: relative !important;
  top: -20px !important;
  width: 217px !important;
  height: 649px !important;
  background: #FFFAE5 !important;
  box-shadow: -1px 0 4px 0 #FFDA82 !important;
}
.avtTab ul li{
  width: 215px !important;
  height: 60px !important;
}
.avtTab ul li:first-child{
  height: 104px !important;
}
.avtTab ul li:nth-child(even){
  background: #F8EAC9 !important;
}
.avtTab ul li.tabText,.avtTab ul li.tabText1{
  font-size: 14px;
  color: #EF9509 !important;
}
.avtTab ul li:first-child{
  margin-top: -5px;
}
.actTabA{
  position: absolute !important;
  width: 205px !important;
  height: 58px !important;
  background: #FFFAE5 !important;
  box-shadow: -1px 0 4px 0 #FFDA82 !important;
}
.actText{
  line-height: 104px !important;
}
.actTabN{
  position: absolute !important;
  width: 205px !important;
  height: 58px !important;
  background: #F8EAC9 !important;
  color: #EF9509 !important;
  text-align: center;
  align-items: center;
  box-shadow: -1px 0 4px 0 #F8EAC9 !important;
}
.noneTab{
  position: relative !important;
  border:none !important;
}
.vipOn{
  min-width: 1200px;
  width: 100%;
  height: 76px;
  background: #494949;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* 常驻底部shj2019113 */
  position: fixed;
  bottom: 0;
}
.vipOn>div{
  min-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vipOn>div>div:first-child>h3{
  display: inline;
  font-size: 32px;
  color: #E6C88C;
  letter-spacing: 0;
  text-align: center;
}
.vipOn>div>div:first-child>span{
  font-size: 20px;
  color: #E6C88C;
  letter-spacing: 0;
  text-align: center;
  position: relative;
  left: 30px;
  top: 2px;
}
.vipOn>div>div:last-child{
  width: 184px;
  height: 100%;
  display: flex;
  margin-right: 20px;
  justify-content: space-around;
  background: #DC595D;
  align-items: center;
}
.vipOn>div>div:last-child>h2{
  font-size: 30px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  margin-left: 16px;
}
.vipOn>div>div:last-child>img{
  width: 24px;
  height: 34px;
}
/* 会员支付 */
.x{
  position: absolute;
  top: -2px;
  right: 10px;
  font-size: 20px;
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
.payChecked{
  border: 1px solid #8E8E8E !important;
}
.chongzhi1,.chongzhi2,.chongzhi3{
  width: 97px;
  height: 32px;
  line-height: 32px;
  position: relative;
  left: 12px;
  background-color: white;
  border: 1px solid #fff;
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
  font-weight: bold;
}
.model>div{
  position: relative;
  height: 0;
  padding-top: 30%;
}
@media screen and (max-width:1200px){
    .zhifu{
      left: 30%;
    }
}
.typeImgArea{
  display: flex;
  text-align: center;
  justify-content: center;
}
.vip1,.vip2,.vip3,.vip4,.vip5,.vip6{
  /*width: 565px;*/
  /*height: 424px;*/
  width: 180px;
  height: 108px;
  background-color: #f7f7f7;
  border-radius: 4px;
  position: relative;
  margin-right: 20px;
  box-shadow: 1px 1px 8px 0 rgba(126,126,129,0.31);
}
.vip1{
  margin-left: 25px;
}
.vipxz{
  background: #FB6413;
  color: white;
}
.vipa{
  text-align: center;
  height: 36px;
  line-height: 48px;
  width: 176px;
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
  width: 176px;
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
.balance{
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #020202;
    letter-spacing: 0.29px;
    position: relative;
    top: 60px;
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
.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.whitebox2{
  width: 98px;
  height: 98px;
  margin: 15px auto 0;
  border: none;
}
.openVip:hover,.vipOn>div>div:last-child{
  cursor: pointer;
}
/* 织道币
.zhidaobi {
  margin: auto;
  margin-top: 50px;
  width: 1000px;
  height: 126px;
  
  box-shadow: 0px 0px 10px 3px #7e7e81;
  position: relative;
}
.zhidaobitixian {
  width: 500px;
  height: 126px;
  border-right: 1px dotted black;
}
.zhidaobichongzhi{
    position: absolute;
    left: 500px;
    top: 0;
}
.tishi{
    position: absolute;
    left: 520px;
    top: -12px;
    width: 150px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #d3d3d3;
    border: 1px solid black;
    border-radius: 5px;

}
.zhidao1 {
  position: absolute;
    left: 20px;
    top: 10px;
    width: 80px;
    height: 20px;
}
.zhidao2 {
  position: relative;
  top: 50px;
  left: 10px;
  font-size: 44px;
  color: #fb6413;
    text-align: left
}
.zhidaokuang{
  position: absolute;
  top: 40px;
  width: 500px;
  height: 100px;
}
.zhidao4 {
      color: black;
      font-size: 12px;

}
.zhidao3 {
  position: absolute;
    left: 320px;
    top: 50px;
    width: 80px;
    height: 30px;
    border: 0;
    background-color: yellow;
}

/* 弹窗样式 */
/* .model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.tig {
  position: fixed;
  z-index: 99999;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
}
.tig span {
  width: 55%;
  height: 6rem;
  display: block;
  margin: 0 auto;
  margin-top: calc(50vh - 3rem);
  background: #fff;
  line-height: 6rem;
  border-radius: 1.25rem;
  font-size: 2rem;
}
.grabBox {
  width: 22.5rem;
  height: 11.25rem;
  background: #fff;
  border-radius: 0.625rem;
  margin: 0 auto;
  position: relative;
  margin-top: 25rem;
}
.grabBox h3 {
  padding-top: 0.9375rem;
  font-weight: normal;
  font-size: 1.5rem;
  margin: 0;
}
.grabBox .del {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  right: 0.5rem;
  top: 0.5rem;
  line-height: 1.25rem;
  text-align: cneter;
  cursor: pointer;
}
.del img {
  width: 100%;
  display: block;
}
.grabBox label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.9375rem 0 1.875rem;
}
.grabBox label input {
  width: 6.25rem;
  outline: none;
  border: 1px solid #333;
  margin-left: 0.5rem;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
.grabBox .grabWay {
  display: flex;
  justify-content: space-around;
}
.grabWay button {
  width: 7.8125rem;
  height: 2.5rem;
  outline: none;
  border: none;
  line-height: 2.5rem;
  color: #fff;
  background: #133ffc;
  font-size: 1.25rem;
  border-radius: 0.625rem;
} */
/* 支付弹窗 */
/* .payBox {
  width: 56.25rem;
  height: 37.5rem;
  margin: 0 auto;
  margin-top: calc(50vh - 18.75rem);
  border-radius: 0.625rem;
  overflow: hidden;
  position: relative;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-top: 1.25rem;
}
.payDel {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  text-align: center;
  line-height: 1.375rem;
  display: block;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
  margin-right: 0.9375rem;
}
.payDel img {
  display: block;
  width: 100%;
}
.smallBox {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.smallBox > img {
  width: 22.3125rem;
  height: 29.0625rem;
  display: block;
  flex-shrink: 0;
}
.smallBox h5,
.smallBox .codeBox {
  margin: 0 auto;
}
.smallBox h5 {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 3.125rem;
  font-weight: normal;
  color: #4d4d4d;
}
.smallBox .codeBox {
  width: 18.75rem;
  height: 18.75rem;
  background: #fff;
  margin: 1.5625rem auto;
  box-sizing: border-box;
  padding-top: 1rem;
}
.codeBox img {
  display: block;
  width: 15.625rem;
  height: 15.625rem;
  margin: 0 auto;
}
.hasPay {
  width: 8.75rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  background: #133ffc;
  border-radius: 0.625rem;
  color: #fff;
  border: none;
  outline: none;
  display: block;
  cursor: pointer;
  margin: 0 auto;
}
.vip {
  background: #eee;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
}
.topImage {
  width: 100%;
  display: block;
  height: 30.9375rem;
}
.messageBox {
  position: relative;
}
.message {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
}
.message h4 {
  padding-top: 6.875rem;
  color: #febe64;
  font-size: 3.75rem;
  font-weight: normal;
}
.lineBox {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.875rem;
  margin-top: 0.875rem;
}
.lineBox .line {
  width: 6.25rem;
  height: 1px;
  background: #fff;
  position: relative;
  z-index: 100;
  margin: 0.9375rem;
}
.rightnow {
  outline: none;
  border: none;
  width: 15rem;
  height: 3.75rem;
  color: #5f3b01;
  border-radius: 1.875rem;
  background: #febe64;
  font-size: 1.875rem;
  line-height: 3.74rem;
  margin: 0 auto;
  margin-top: 4.8125rem;
  display: block;
}
.vip h1 {
  margin-top: 1.875rem;
  margin-bottom: 2.5rem;
  font-size: 1.875rem;
  color: #333;
  font-weight: normal;
}
.listBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.bussiness {
  width: 15.125rem;
  height: 33rem;
  background: #fff;
  box-shadow: 2px 2px 4px #cdcdcd;
  position: relative;
  margin: 0 0.625rem;
  margin-bottom: 4.375rem;
  border-radius: 0.3125rem;
}
.bussiness span {
  display: block;
}
.bussiness .month {
  color: #333;
  font-size: 1.25rem;
  padding-top: 2.875rem;
}
.bussiness .price {
  color: #ff9501;
  font-weight: bold;
  font-size: 2.5rem;
  padding-top: 1.8125rem;
}
.bussiness .oldPrice {
  color: #333;
  font-size: 1rem;
  text-decoration: line-through;
  padding-top: 1.1875rem;
}
.bussiness .btn {
  width: 9.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
  background: #febe64;
  color: #5f3b01;
  font-size: 1.375rem;
  margin-top: 2rem;
  border-radius: 1.125rem;
  border: none;
  outline: none;
  font-weight: normal;
}
.bussiness .extra {
  margin-top: 1.5rem;
  font-size: 1.125rem;
  margin-bottom: 0.875rem;
}
.bussiness .oneLine {
  margin-top: 1.5rem;
}
.bussiness .allLine {
  margin-bottom: 0.875rem;
  font-size: 1rem;
  color: rgba(51, 51, 51, 0.7);
}
.bussiness .icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4.125rem;
}
.icon img {
  display: block;
  margin-top: 0.625rem;
  margin-left: 0.625rem;
  width: 5.375rem;
  height: 2rem;
} */
/* 绑定关联账号按钮样式 */
/* .relevance {
  background: #2c2e30;
  color: #fff;
  width: 8.6%;
  height: 3.125rem;
  line-height: 3.125rem;
  outline: none;
  border: none;
  border-radius: 0.625rem;
  position: absolute;
  top: 6.25rem;
  right: 6%;
}
.frash {
  position: absolute;
  top: 0;
  right: 0;
  width: 6.125rem;
  height: 6.125rem;
}
.frash span {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  font-size: 1rem;
  color: #333;
  text-align: center;
  line-height: 4.5rem;
  transform: rotate(45deg);
  z-index: 222;
}
.frash img {
  display: block;
  width: 6.125rem;
}
.tanchuang {
position: fixed;
    background: #fff;
    z-index: 9999;
    width: 500px;
    height: 350px;
    left: calc(50% - 250px);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: calc(50% - 175px);
    border: 1px solid black;
    border-radius: 5px;
}
.t11{
      height: 50px;
    position: relative;
}
.t12{position: relative;
    height: 250px;
    border-bottom: 1px dotted;
    border-top: 1px dotted;}
.p1{    line-height: 50px;
    text-align: left;
    text-indent: 2em;}
.p2{    position: relative;
    top: -50px;
    line-height: 50px;
    text-indent: 15em;
    font-size: 30px;} */
/* .p3{    width: 200px;
    height: 40px;
    line-height: 40px;}
.p4{    width: 200px;
    height: 40px;
    line-height: 40px;}
.p5{width: 200px;
    height: 40px;
    line-height: 40px;}
.p6{width: 200px;
    height: 50px;
    line-height: 50px;}
.p7{height: 50px;
    line-height: 50px;}
.i3{
  width: 200px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 200px;
}
.i4{
  width: 200px;
    height: 20px;
    position: absolute;
    top: 50px;
    left: 200px;
}
.i5{
  width: 200px;
    height: 20px;
    position: absolute;
    top: 90px;
    left: 200px;
}
.i6{
  width: 200px;
    height: 100px;
    position: absolute;
    top: 130px;
    left: 200px;
}
.b1{    background-color: yellow;
    border: 0;
    width: 70px;
    height: 25px;
    position: relative;
    left: 40px;
    top: 10px;}
.b2{
      background-color: yellow;
    border: 0;
    width: 70px;
    height: 25px;
    position: absolute;
    top: 250px;
}
.simg1{
      position: absolute;
    top: 120px;
    left: 70px;
    width: 57px;
}  */
</style>