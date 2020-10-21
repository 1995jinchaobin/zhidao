<template>
    <div class="money">
        <!-- 提现 -->
        <!-- <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab> -->
        <!-- <span class="line"></span> -->
        <div class="content" :style="{height: height}">
            <!-- <h2>提现记录</h2> -->
            <div class="titleBox">
                <div>我的钱包</div>
            </div>
            <div class="header">
                <div>
                    <div class="hraderItem">
                    <div class="itemTitle">可提现金额</div>
                    <div class="itemCount">
                        <span>{{Money.money}}</span>元
                    </div>
                    </div>
                    <div class="hraderBtn" @click="judgeUserType">提现</div>
                </div>
                <div>
                    <div class="hraderItem">
                    <div class="itemTitle">可用花花币</div>
                    <div class="itemCount">
                        <span>{{Money.store_money}}</span>元
                    </div>
                    </div>
                    <div class="hraderBtn" @click="clickRecharge($event)">充值</div>
                </div>
            </div>
            <div class="orderClass">
                <span @click="changeList(0)" :class="{active:orderType==0}" id="all">全部</span>
                <span @click="changeList(1)" :class="{active:orderType==1}" id="sell">出售记录</span>
                <span @click="changeList(2)" :class="{active:orderType==2}" id="buy">购买记录</span>
                <span @click="changeList(3)" :class="{active:orderType==3}" id="quit">提现记录</span>
                <span @click="changeList(5)" :class="{active:orderType==5}" id="reload">充值记录</span>
                <span @click="changeList(4)" :class="{active:orderType==4}" id="quit">VIP记录</span>
                <span @click="changeList(6)" :class="{active:orderType==6}" id="reload">版权记录</span>
            </div>
            <table class="order">
                <tr class="orderHeader">
                    <td>订单号{{pageIndex}}</td>
                    <td>服务</td>
                    <td>金额</td>
                    <td>支付方式</td>
                    <td>时间</td>
                </tr>
                <tr class="orderItem" v-if="list.length>0"   v-for="(item,index) in list" v-bind:key="index">
                    <td>{{item.order_code}}</td>
                    <td>{{item.buy_type}}</td>
                    <td>{{item.rmb}}元</td>
                    <td>{{item.origin_type}}</td>
                    <td>{{item.pay_time}}</td>
                </tr>
            </table>
            <div v-if="list.length<=0" class="noData">
                <img src="../../assets/image/user/Emoji.png" alt="">
                <div>空空如也</div>
            </div>
            <!--分页-->
            <ul class="pageBox" v-if="pageNumber!=0">
                <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
            </ul>
        </div>
        <div class="model" v-if="showModel">
            <form action="" v-if="showFirst == '充值'" class="rechargeBox">
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
                    <div class="balance">可用余额：{{Money.money}}</div>
                </div>
                <div class="clear"></div>
                <!--确认支付按钮-->
                <div v-if="payType==4" class="surePay" @click="surePay" :disable="needDisable">确认支付</div>
                <div v-if="payType==3 || payType==5" class="surePay" @click="surePay">我已支付</div>
            </form>
            <form action="" v-else-if="showFirst == '提现'" :class="{bankInfo:hasBind&&getMoneyState}">
                <div v-if="showRegain == 1" class="bankInfoBox">
                    <div class="modelHeader">
                        <img @click="closeClick" class="close" src="../../assets/image/banquan/guanbi.png" alt="">
                    </div>
                    <div class="callImg">
                        <div @click="updateBindInfo">修改</div>
                        <div>
                            <img src="../../assets/image/user/xinPian.png">
                            <span>
                                <p>{{open_bank}}</p><br/><p>{{card_num.substring(0,4)}}*****{{card_num.substring(card_num.length-4,card_num.length)}}</p>
                            </span>
                        </div>
                    </div>
                    <div class="callSum">
                        <div>提现金额</div><input type="text" placeholder="请输入提现金额" v-model="price">
                    </div>
                    <div class="callVerify">
                        <div>验证码</div>
                        <div>
                            <input type="text" placeholder="输入验证码" v-model="yzm">
                            <div v-if="showCode" class="code specialCode">{{codeNumber}}</div>
                            <div @click="getCheckCode" style="cursor: default;" v-show="!showCode">获取验证码</div>
                        </div>
                    </div>
                    <p class="callPoint">温馨提示：<br>验证码发送到您所绑定的{{phone.substring(0,4)}}****{{phone.substring(7,11)}}手机上</p>
                    <div class="callBtn" @click="sureGetMoney">确定提现</div>
                    <div class="bottomTips">
                        <img src="../../assets/image/user/fill.png"/>
                        <p>平台收取提现金额2%作为手续费</p>
                    </div>
                </div>
                <div v-else-if="showRegain == -1">
                    <div class="modelHeader">
                        <div>绑定银行卡</div>
                        <img @click="closeClick" class="close" src="../../assets/image/banquan/guanbi.png" alt="">
                    </div>
                    <div class="bindName">
                        <div>姓名</div><input placeholder="输入开户人姓名" type="text" v-model="real_name"><div></div>
                    </div>
                    <div class="bindNum">
                        <div>银行卡号</div><input @blur="isNum($event)" placeholder="输入银行卡号" type="text" v-model="card_num"><div></div>
                    </div>
                    <div class="bindAddr">
                        <div>开户行</div><input type="text" :readonly="isUpdate" id="bankName"  placeholder="输入开户行" v-model="open_bank">
                    </div>
                    <div class="bindCode">
                        <div>验证码</div>
                        <div>
                            <input placeholder="输入验证码" type="text" v-model="yzm2">
                            <div v-if="showCode2" class="code specialCode">{{codeNumber2}}</div>
                            <div @click="getCheckCode2" style="cursor: default;" v-show="!showCode2">获取验证码</div>
                        </div>
                        <div></div>
                    </div>
                    <p class="callPoint">温馨提示：<br>验证码发送到您所绑定的{{phone.substring(0,4)}}****{{phone.substring(7,11)}}手机上</p>
                    <div class="callBtn" @click="sureBind">确定绑定</div>
                </div>
            </form>
            <div class="alert" id="alert" style="height: 0;">
                <div @click="alertShow()"><span></span></div>
                <div>
                    <img :src="code ? succImg : errImg" alt=""><span>{{code ? '订单交易成功！' : errInfo}}</span>
                </div>
            </div>
            <div v-if="showSecond" class="successBox">
                <img class="successClose" @click="closeClick" src="../../assets/image/login/close.png" alt="">
                <img class="successImg" src="../../assets/image/user/success.png" alt="">
                <h5>申请成功</h5>
                <span>我们将在三个工作日为处理您的提现申请</span>
            </div>
        </div>
        <div class="model" v-if="showSureBind">
            <div class="sureBind">
                <div class="tips">您还没绑定银行卡，请绑定您的银行卡</div>
                <div class="bottomArea">
                    <div class="no" @click="hideBindBox">否</div>
                    <div class="yes" @click="applyClick">是</div>
                </div>
            </div>
        </div>
        <div class="model bindUser" v-if="showBindUserBox">
            <form action="" class="bankInfo">
                <div  class="bankInfoBox">
                    <div class="modelHeader">
                        <img @click="closeUserBindBox" class="close" src="../../assets/image/banquan/guanbi.png" alt="">
                    </div>
                    <div class="bindUserTips">
                        您还未绑定手机号码，请先绑定
                    </div>
                    <div class="line"></div>
                    <div class="lineYellow"></div>
                    <div class="callSum">
                        <div>手机号码</div><input type="text" placeholder="请输入手机号码" v-model="bindPhone">
                    </div>
                    <div class="callVerify">
                        <div>验证码</div>
                        <div>
                            <input type="text" placeholder="输入验证码" v-model="yzmPhone">
                            <div v-if="showCodePhone" class="code specialCode">{{codeNumberPhone}}</div>
                            <div @click="getCheckCodePhone" style="cursor: default;" v-show="!showCodePhone">获取验证码</div>
                        </div>
                    </div>
                    <div class="callBtn" @click="sureBindPhone">确定绑定</div>
                </div>
            </form>
        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <Jump v-if="showJump" :title="err" :urlChange="false"></Jump>
        <PageJump  v-if="showPageJump" :title="err" :urlChange="false"></PageJump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '@/components/Tab';
import Jump from '@/components/Jump';
import InfoBox from '@/components/common/InfoBox';
import PageJump from '@/components/common/PageJump';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
import axios from 'axios';
export default {
    name: 'Money',
    components: {
        Tab,
        Loading,
        Jump,
        PageJump,
        InfoBox
    },
    data(){
        return {
            showJump: false,
            err: '',
            height: '',
            tabIndex: null,
            showLoading: false,
            path: '/newstudio/zhangben1',
            arr: ['提现时间','提现金额','状态'],
            list: [],
            cnt: 1,
            count: 10,
            pageNumber: '',
            applyStatue: 0,
            showStatus: false,
            statusName: '全部',
            canRoyalty: '',
            Money:[],
            status: [{name: '全部',show: true},{name: '已到账',show: false},{name: '待审核',show: false},{name: '审核失败',show: false}],
            //支付方式
            originType:['','','','','支付宝扫码','零钱','微信扫码','花花币'],
            showModel: false,
            showFirst: '',
            showSecond: false,
            showRegain: -1,
            boxShow: true,
            //查询订单类型,默认为0：全部
            orderType: 0,
            // 提交数据信息
            message: {
                realname: '',
                applyMoney: '',
                applyCmemo: '',
                account: ''
            },
            code: 1,
            succImg: require('../../assets/image/user/dagou-2.png'),
            errImg: require('../../assets/image/user/cuowu-2.png'),
            price:'',
            bank:'',
            acount: true,
            // 页数
            pageIndex: 1,
            flag: 0,
            page: [],
            payType:0,
            qrImgSrc:'../../assets/image/user/scanning.png',
            order_code:'',
            showPageJump:false,
            phone:'',
            //是否显示绑定银行卡弹框
            showSureBind:false,
            //是否绑定过银行卡
            hasBind:false,
            //是否是修改银行卡信息
            isUpdate:false,
            //银行卡号
            card_num:'',
            //银行卡姓名
            real_name:'',
            //开户行
            open_bank:'',
            //验证码
            yzm:'',
            showCode:false,
            codeNumber:'',
            // 验证码倒计时定时器
            clock: null,
            clock2:null,
            clockPhone:null,
            //是否显示提示框-1不显示，0:显示成功，1：显示警告
            showInfo:-1,
            errMsg:'',
            succMsg:'',
            //提现金额
            price:'',
            //是否在提现界面
            getMoneyState:false,
            //是否禁用按钮
            needDisable:false,
            coinImg:require('../../assets/image/user/jinbi.png'),
            garyCoinImg:require('../../assets/image/user/jinbi-gray.png'),
            yzm2:'',
            showCode2:false,
            codeNumber2:'',
            showBindUserBox:false,
            bindPhone:'',
            yzmPhone:'',
            showCodePhone:false,
            codeNumberPhone:'',
        }
    },
    methods: {
        //关闭绑定轻纺城用户弹框
        closeUserBindBox(){
           this.showBindUserBox=false
            this.bindPhone=''
            this.yzmPhone=''
            this.showCodePhone=''
            this.codeNumberPhone=''
        },
        //查询用户类型，是否是轻纺城用户
        judgeUserType(){
            let self = this;
            //请求接口
            let formData = new FormData();
            let obj = {
                url: this.all.baseUrl + '/new/common/judgeQFC',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    //如果不是轻纺城用户
                    self.getIsBind();
                }else if(res.data.status==1){
                    self.showBindUserBox = true;
                    return;
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
                        self.alertShow();
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
            } else if(self.payType==4 && self.balance == ''){
                //请求接口
                this.getBalance();
            }
        },
        changeEnglish(){
            this.$router.go(0);
        },
        changeStatus(){
            this.showStatus = !this.showStatus;
        },
        statusClick(index){
            this.status.map(function(item){
                item.show = false;
            });
            this.status[index].show = true;
            this.statusName = this.status[index].name;
            this.showStatus = !this.showStatus;
            if(index==0){
                this.applyStatue = 0;
            }else if(index==1){
                this.applyStatue = 3;
            }else if(index==2){
                this.applyStatue = 1;
            }else{
                this.applyStatue = -1;
            }
            this.getList();
            this.$forceUpdate();
        },
        //点击充值按钮
        clickRecharge(){
            this.showModel = true;
            this.showFirst = '充值'
            //默认3000支付宝充值
            this.price=3000
            this.changePayType(3)
        },
        // 申请提现按钮点击
        applyClick(){
            // let text = e.currentTarget.innerHTML;
            this.hideBindBox()
            this.showModel = true;
            this.showFirst = '提现';
            this.showSecond = false;
            // this.changePayType(3)
        },
        closeClick(){
            this.showModel = false;
            this.showFirst = false;
            this.showSecond = false;
            //清空计时器
            clearInterval(this.clock2);
            clearInterval(this.clock);
            this.showCode = false;
            this.codeNumber = "获取验证码";
            this.showCode2 = false;
            this.codeNumber2 = "获取验证码";
        },
        // 确定点击
        sureClick(e){
            e.preventDefault();
            let formData = new FormData();
            let self = this;
            // this.showLoading = true;
            // 判断
            if(this.message.applyMoney==""||this.message.realname==""||this.message.account==""){
                this.showJump = true;
                this.err = '请填写完整信息';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else if(parseFloat(this.message.applyMoney)<100){
                this.showJump = true;
                this.err = '不得低于100元';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else if(parseFloat(this.message.applyMoney)>parseFloat(this.canRoyalty)){
                this.showJump = true;
                this.err = '金额不足';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else{
                formData.append('applyMoney',this.message.applyMoney);
                formData.append('realname',this.message.realname);
                formData.append('account',this.message.account);
                formData.append('applyCmemo',this.message.applyCmemo);
                let obj = {
                    url: this.all.baseUrl + '/userExtensionRoyaltyApply/apply',
                    formdata: formData
                }
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                    },500);
                    if(res.data.status==0){
                        // 更新数据
                        this.getList();
                        this.getCode();
                        this.showFirst = false;
                        this.showSecond= true;
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
            }
        },
        changeTime(str){
            let date = new Date(str);
            let year,month,day,hour,minute;
            year = date.getFullYear();
            month = date.getMonth()+1;
            day = date.getDay();
            hour = date.getHours();
            minute = date.getMinutes();
            return year+'.'+month+'.'+day+' '+hour+':'+minute;
        },
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
        getList()   {
            let formData = new FormData();
            let self = this;
            self.showLoading = true;
            if(self.applyStatue!=0){
                formData.append('applyStatue',self.applyStatue);
            }
            formData.append('type',self.orderType);
            formData.append('pageSize',self.count);
            formData.append('page',self.cnt);
            let obj = {
                url: self.all.baseUrl + '/new/userPurse/getUserPurseDetailsByUserId',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status == 0){
                    if(res.data.result){
                        let list = res.data.result.list;
                        let resultList = [];
                        list.forEach(historyDetail => {
                            // 处理服务
                            if (historyDetail['type']) {
                                // 如果是出售，则显示'出售花型/素材-花型/素材名称'
                                if (historyDetail['type'] === 1){
                                    //如果是出售花型
                                    if (historyDetail['buy_type'] === 1){
                                        historyDetail['buy_type'] = '出售花型' + '-' + historyDetail['patternsSoldByMallSellers']['name'];
                                    } else if (historyDetail['buy_type'] === 2){
                                        //如果是出售素材
                                        historyDetail['buy_type'] = '出售素材' + '-' + historyDetail['materialLibrary']['name'];
                                    }
                                } else if (historyDetail['type'] === 2){
                                    // 如果是购买，则显示'购买花型/素材-花型/素材名称'
                                    //如果是购买花型
                                    if (historyDetail['buy_type'] === 3){
                                        historyDetail['buy_type'] = '购买花型' + '-' + historyDetail['patternsSoldByMallSellers']['name'];
                                    } else if (historyDetail['buy_type'] === 4){
                                        //如果是购买素材
                                        historyDetail['buy_type'] = '购买素材' + '-' + historyDetail['materialLibrary']['name'];
                                    }
                                } else if (historyDetail['type'] === 3){
                                    // 如果是零钱提现，则显示提现
                                    historyDetail['buy_type'] = '提现';
                                } else if (historyDetail['type'] === 4){
                                    if(historyDetail['vipOrderDetail']==null){
                                        historyDetail['buy_type'] = '充值VIP';
                                    } else {
                                        // 如果是充值VIP，则显示充值多久的VIP
                                        if(historyDetail['vipOrderDetail']['type']==0){
                                            historyDetail['buy_type'] = '充值个人VIP'+historyDetail['vipOrderDetail']['month']+'个月';
                                        } else if(historyDetail['vipOrderDetail']['type']==1){
                                            historyDetail['buy_type'] = '充值企业VIP'+historyDetail['vipOrderDetail']['month']+'个月';
                                        }
                                    }
                                } else if (historyDetail['type'] === 5){
                                    // 如果是充值花花币，则显示充值
                                    historyDetail['buy_type'] = '充值';
                                } else if (historyDetail['type'] === 6){
                                    // 如果是付费版权，则显示申请版权费用
                                    historyDetail['buy_type'] = '申请版权费用';
                                }
                                // 处理支付方式
                                // 如果是出售/购买，则显示花花币
                                if (historyDetail['type'] === 1 || historyDetail['type'] === 2){
                                    historyDetail['origin_type'] = '花花币';
                                } else if (historyDetail['type'] === 3){
                                    // 如果是零钱提现，则显示提现到银行卡
                                    historyDetail['origin_type'] = '提现到银行卡';
                                }
                            }
                            // 处理支付方式
                            if (historyDetail['origin_type']) {
                                // 如果是充值VIP/充值花花币/付费版权，则显示支付宝/微信/余额
                                if (historyDetail['type'] === 4 || historyDetail['type'] === 5 || historyDetail['type'] === 6) {
                                    if (historyDetail['origin_type'] ==3) {
                                        historyDetail['origin_type'] = '支付宝';
                                    } else if (historyDetail['origin_type'] ==5) {
                                        historyDetail['origin_type'] = '微信';
                                    } else if (historyDetail['origin_type'] ==4 || historyDetail['origin_type'] ==6) {
                                        historyDetail['origin_type'] = '余额';
                                    }
                                }
                            }
                            // 处理日期
                            if (historyDetail['pay_time']==null) {
                                historyDetail['pay_time'] = historyDetail['create_time']
                            }
                            if (historyDetail['pay_time']) {
                                historyDetail['pay_time'] = Scroll.changeDate(historyDetail['pay_time'])
                            }
                            resultList.push(historyDetail)
                        })
                        self.list = resultList;
                        //self.page=[];
                        // self.list = res.data.result.list;
                        self.pageNumber = res.data.result.pages;
                        self.pageAuto()
                    }
                }else if(res.data.status == -95){
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
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    });
                }
            })
        },
        // 初始化分页器
        pageAuto(){
            if(!this.page.length){
                if(this.pageNumber<=7){
                    for(let i=0;i<this.pageNumber;i++){
                        this.page.push({name: i+1});
                    }
                }else{
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4}
                        ,{name: 5},{name: '···'},{name: this.pageNumber}];
                }
            }
        },
        // 分页器每个点击
        btnClick(index){
            if(this.pageNumber<=7){
                this.flag = 0;
                this.cnt = index+1;
                this.getList();
                this.pageIndex = index+1;
            }else{
                // 状态0
                if(this.flag==0){
                    if(index==5){

                    }else if(index==4){
                        this.cnt = this.page[index].name;
                        if(this.pageNumber-this.cnt<=3){
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.getList();
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                            this.pageIndex = 4;
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getList();
                        this.pageIndex = 7;
                    }else{
                        this.cnt = this.page[index].name;
                        this.getList();
                        this.pageIndex = index+1;
                    }
                }else if(this.flag==1){
                    if(index==1||index==5){

                    }else{
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            // 点击首页
                            this.pageIndex = this.cnt;
                            this.flag = 0;
                            this.getList();
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getList();
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                        }
                    }
                }else if(this.flag==2){
                    if(index==1){

                    }else if(index==2){
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            this.flag = 0;
                            this.pageIndex = this.cnt;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getList();
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getList();
                    }
                }
            }
        },
        // 上一页
        prev(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt==1){
                    this.showPageJump = true;
                    this.err = '已经是第一页了!';
                    setTimeout(function(){
                        self.showPageJump = false;
                        self.err = '';
                    },1500);
                }else{
                    this.cnt-=1;
                    this.pageIndex-=1;
                    this.getList();
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);this.getList();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getList();
                    }
                }else{
                    this.showPageJump = true;
                    this.err = '已经是第一页了!';
                    setTimeout(function(){
                        self.showPageJump = false;
                        self.err = '';
                    },1500);
                }
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt<this.pageNumber){
                    this.cnt+=1;
                    this.pageIndex+=1;
                    this.getList();
                }else{
                    this.showPageJump = true;
                    this.err = '最后一页了';
                    setTimeout(function(){
                        self.showPageJump = false;
                        self.err = '';
                    },1500);
                }
            }else{
                if(this.cnt<this.pageNumber){
                    this.cnt++;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getList();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getList();
                    }
                }else{
                    this.showPageJump = true;
                    this.err = '最后一页了';
                    setTimeout(function(){
                        self.showPageJump = false;
                        self.err = '';
                    },1500);
                }
            }
        },
        getCode(){
            let self = this;
            let formData = new FormData();
            let obj = {
                url: this.all.baseUrl + '/userExtensionCode/get',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.canRoyalty = res.data.result.canRoyalty.toFixed(2);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }
            });
        },
        boxHidd(e,payType){
            let self = this;
            // if(self.price==''){
            //     self.showInfo = 1;
            //     self.errMsg = '请先输入充值金额';
            //     setTimeout(function(){
            //         self.showInfo = -1;
            //         self.errMsg = '';
            //     },1000);
            //     return;
            // } else if(isNaN(self.price)){
            //     self.showInfo = 1;
            //     self.errMsg = '充值金额只能为数字';
            //     setTimeout(function(){
            //         self.showInfo = -1;
            //         self.errMsg = '';
            //     },1000);
            //     return;
            // } else if(self.price<100){
            //     self.showInfo = 1;
            //     self.errMsg = '充值金额不能小于100';
            //     setTimeout(function(){
            //         self.showInfo = -1;
            //         self.errMsg = '';
            //     },1000);
            //     return;
            // }
            self.payType = payType;
            // let box = e.currentTarget;
            // let boxList = document.getElementsByClassName("box");
            // for(let i = 0;i < boxList.length;i++){
            //     boxList[i].className = 'box';
            //     if(boxList[i] == box){
            //         boxList[i].className = 'box boxActive';
            //     }
            // }
            // console.log(self.price)
            self.changePayType(payType)
        },
        alertHidd(){
            let alert = document.getElementById("alert");
            alert.style.cssText = "height: 130px;"
        },
        alertShow(){
            let alert = document.getElementById("alert");
            alert.style.cssText = "height: 0;";
        },
        listClick(e){
            let img = e.currentTarget;
            let icon = e.currentTarget.dataset.act;
            let delAll = document.getElementById("delAll");
            let iconList = document.getElementsByClassName("switch");
            let num = 0;
            if(icon == 0){
                img.style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                e.currentTarget.dataset.act = 1;
                for(let i = 0;i < iconList.length;i++){
                    if(iconList[i].dataset.act == 1){
                        num++;
                    }
                    if(num == iconList.length){
                        delAll.style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                        delAll.dataset.act = 1;
                    }else{
                        delAll.style.cssText = '';
                        delAll.dataset.act = 0;
                    }
                }
            }else if(icon == 1){
                img.style.cssText = '';
                e.currentTarget.dataset.act = 0;
                for(let i = 0;i < iconList.length;i++){
                    if(iconList[i].dataset.act == 1){
                        num++;
                    }
                    if(num == iconList.length){
                        delAll.style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                        delAll.dataset.act = 1;
                    }else{
                        delAll.style.cssText = '';
                        delAll.dataset.act = 0;
                    }
                }
            }
        },
        delAllClick(e){
            let delAll = e.currentTarget;
            let iconList = document.getElementsByClassName("switch");
            let act = delAll.dataset.act;
            if(act == 0){
                delAll.style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                delAll.dataset.act = 1;
                for(let i = 0;i < iconList.length;i++){
                    iconList[i].dataset.act = 1;
                    iconList[i].style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                }
            }else if(act == 1){
                delAll.style.cssText = '';
                delAll.dataset.act = 0;
                for(let i = 0;i < iconList.length;i++){
                    iconList[i].dataset.act = 0;
                    iconList[i].style.cssText = '';
                }
            }
        },
        priceChange(e){
            let val = e.target.value;
            if(val){
                this.price = val;
            }
        },
        isNum(e){
            let val = e.currentTarget.value;
            let self = this;
            let next = e.currentTarget.nextElementSibling;
            let bankName = document.getElementById("bankName");
            let url = 'https://ccdcapi.alipay.com/validateAndCacheCardInfo.json';
            let bankList = {"CDB":"国家开发银行","ICBC":"中国工商银行","ABC":"中国农业银行","BOC":"中国银行","CCB":"中国建设银行","PSBC":"中国邮政储蓄银行","COMM":"交通银行","CMB":"招商银行","SPDB":"上海浦东发展银行","CIB":"兴业银行","HXBANK":"华夏银行","GDB":"广东发展银行","CMBC":"中国民生银行","CITIC":"中信银行","CEB":"中国光大银行","EGBANK":"恒丰银行","CZBANK":"浙商银行","BOHAIB":"渤海银行","SPABANK":"平安银行","SHRCB":"上海农村商业银行","YXCCB":"玉溪市商业银行","YDRCB":"尧都农商行","BJBANK":"北京银行","SHBANK":"上海银行","JSBANK":"江苏银行","HZCB":"杭州银行","NJCB":"南京银行","NBBANK":"宁波银行","HSBANK":"徽商银行","CSCB":"长沙银行","CDCB":"成都银行","CQBANK":"重庆银行","DLB":"大连银行","NCB":"南昌银行","FJHXBC":"福建海峡银行","HKB":"汉口银行","WZCB":"温州银行","QDCCB":"青岛银行","TZCB":"台州银行","JXBANK":"嘉兴银行","CSRCB":"常熟农村商业银行","NHB":"南海农村信用联社","CZRCB":"常州农村信用联社","H3CB":"内蒙古银行","SXCB":"绍兴银行","SDEB":"顺德农商银行","WJRCB":"吴江农商银行","ZBCB":"齐商银行","GYCB":"贵阳市商业银行","ZYCBANK":"遵义市商业银行","HZCCB":"湖州市商业银行","DAQINGB":"龙江银行","JINCHB":"晋城银行JCBANK","ZJTLCB":"浙江泰隆商业银行","GDRCC":"广东省农村信用社联合社","DRCBCL":"东莞农村商业银行","MTBANK":"浙江民泰商业银行","GCB":"广州银行","LYCB":"辽阳市商业银行","JSRCU":"江苏省农村信用联合社","LANGFB":"廊坊银行","CZCB":"浙江稠州商业银行","DYCB":"德阳商业银行","JZBANK":"晋中市商业银行","BOSZ":"苏州银行","GLBANK":"桂林银行","URMQCCB":"乌鲁木齐市商业银行","CDRCB":"成都农商银行","ZRCBANK":"张家港农村商业银行","BOD":"东莞银行","LSBANK":"莱商银行","BJRCB":"北京农村商业银行","TRCB":"天津农商银行","SRBANK":"上饶银行","FDB":"富滇银行","CRCBANK":"重庆农村商业银行","ASCB":"鞍山银行","NXBANK":"宁夏银行","BHB":"河北银行","HRXJB":"华融湘江银行","ZGCCB":"自贡市商业银行","YNRCC":"云南省农村信用社","JLBANK":"吉林银行","DYCCB":"东营市商业银行","KLB":"昆仑银行","ORBANK":"鄂尔多斯银行","XTB":"邢台银行","JSB":"晋商银行","TCCB":"天津银行","BOYK":"营口银行","JLRCU":"吉林农信","SDRCU":"山东农信","XABANK":"西安银行","HBRCU":"河北省农村信用社","NXRCU":"宁夏黄河农村商业银行","GZRCU":"贵州省农村信用社","FXCB":"阜新银行","HBHSBANK":"湖北银行黄石分行","ZJNX":"浙江省农村信用社联合社","XXBANK":"新乡银行","HBYCBANK":"湖北银行宜昌分行","LSCCB":"乐山市商业银行","TCRCB":"江苏太仓农村商业银行","BZMD":"驻马店银行","GZB":"赣州银行","WRCB":"无锡农村商业银行","BGB":"广西北部湾银行","GRCB":"广州农商银行","JRCB":"江苏江阴农村商业银行","BOP":"平顶山银行","TACCB":"泰安市商业银行","CGNB":"南充市商业银行","CCQTGB":"重庆三峡银行","XLBANK":"中山小榄村镇银行","HDBANK":"邯郸银行","KORLABANK":"库尔勒市商业银行","BOJZ":"锦州银行","QLBANK":"齐鲁银行","BOQH":"青海银行","YQCCB":"阳泉银行","SJBANK":"盛京银行","FSCB":"抚顺银行","ZZBANK":"郑州银行","SRCB":"深圳农村商业银行","BANKWF":"潍坊银行","JJBANK":"九江银行","JXRCU":"江西省农村信用","HNRCU":"河南省农村信用","GSRCU":"甘肃省农村信用","SCRCU":"四川省农村信用","GXRCU":"广西省农村信用","SXRCCU":"陕西信合","WHRCB":"武汉农村商业银行","YBCCB":"宜宾市商业银行","KSRB":"昆山农村商业银行","SZSBK":"石嘴山银行","HSBK":"衡水银行","XYBANK":"信阳银行","NBYZ":"鄞州银行","ZJKCCB":"张家口市商业银行","XCYH":"许昌银行","JNBANK":"济宁银行","CBKF":"开封市商业银行","WHCCB":"威海市商业银行","HBC":"湖北银行","BOCD":"承德银行","BODD":"丹东银行","JHBANK":"金华银行","BOCY":"朝阳银行","LSBC":"临商银行","BSB":"包商银行","LZYH":"兰州银行","BOZK":"周口银行","DZBANK":"德州银行","SCCB":"三门峡银行","AYCB":"安阳银行","ARCU":"安徽省农村信用社","HURCB":"湖北省农村信用社","HNRCC":"湖南省农村信用社","NYNB":"广东南粤银行","LYBANK":"洛阳银行","NHQS":"农信银清算中心","CBBQS":"城市商业银行资金清算中心"};
            axios.get(url,{params:{
                cardNo: val,
                cardBinCheck: true
            }}).then(res=>{
                if(res.data.validated){
                    let bank = res.data.bank;
                    next.style.cssText = `background: url('${this.succImg}') no-repeat center;background-size:100%;`;
                    bankName.value = bankList[bank];
                    this.open_bank = bankName.value;
                }else{
                    next.style.cssText = `background: url('${this.errImg}') no-repeat center;background-size:100%;`;
                    self.showInfo = 1;
                    self.errMsg = '请输入正确的银行卡号';
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },1000);
                }
            })
        },
        changeList (index) {
            this.pageIndex=1
            this.cnt = 1
            this.orderType = index;
            this.page=[]
            this.getList();
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
                            //刷新页面
                            self.getMoney();
                            self.getList();
                            self.showInfo=-1;
                            self.succMsg=''
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
                            //self.alertShow()
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
        //显示确认绑定银行卡弹框
        showBindBox(){
            this.showSureBind = true;
        },
        //隐藏确认绑定银行卡弹框
        hideBindBox(){
            this.showSureBind = false;
        },
        //查询银行卡绑定情况
        getIsBind(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            let obj = {
                url: this.all.baseUrl + '/new/bankcard/getBankCard',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    if(res.data.result==null){
                        //如果没有绑定过
                        self.hasBind=false;
                        self.showRegain=-1;
                        self.showBindBox();
                        self.isUpdate=false;
                    }else{
                        //如果绑定过了
                        self.hasBind=true;
                        self.showRegain=1;
                        self.getMoneyState = true;
                        self.applyClick();
                        self.price='';
                        //将银行卡信息存下来
                        let result = res.data.result;
                        self.card_num = result.card_num;
                        self.real_name= result.real_name;
                        self.open_bank = result.open_bank;
                    }
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
        //确认绑定银行卡
        sureBind(){
            let self = this;
            if(self.real_name==''){
                self.showInfo = 1;
                self.errMsg = '请填写姓名';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1500);
                return;
            } else if(self.card_num==''){
                self.showInfo = 1;
                self.errMsg = '请填写银行卡号';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1500);
                return;
            } else if(isNaN(self.card_num)){
                self.showInfo = 1;
                self.errMsg = '银行卡号只能为数字';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1500);
                return;
            } else if(self.open_bank==''){
                self.showInfo = 1;
                self.errMsg = '请填写正确的银行卡号';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1500);
                return;
            } else if(self.yzm2==''){
                self.showInfo = 1;
                self.errMsg = '请填写验证码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1500);
                return;
            }

            let formData = new FormData();
            formData.append('real_name',self.real_name);
            formData.append('card_num',self.card_num);
            formData.append('open_bank',self.open_bank);
            formData.append('yzm',self.yzm2);
            let url=self.isUpdate?'/new/bankcard/updateBankCard':'/new/bankcard/addBankCard';
            this.showLoading = true;
            let obj = {
                url: this.all.baseUrl + url,
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    self.showInfo = 0;
                    self.succMsg = res.data.msg;
                    self.yzm2='';
                    self.closeClick();
                    //清空计时器
                    clearInterval(self.clock);
                    self.showCode2 = false;
                    self.codeNumber2 = "获取验证码";
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg = '';
                    },1500);
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
                    this.showInfo = 1;
                    this.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        //获取验证码
        getCheckCode(e){
            let self = this;
            e.preventDefault();
            let formData = new FormData();
            let obj = {
                url: this.all.baseUrl + '/new/verify/sendVerifyOfMG',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    self.showCode = true;
                    self.codeNumber = 59 + "秒";
                    self.clock = setInterval(function(){
                        if(parseInt(self.codeNumber)==0){
                            clearInterval(self.clock);
                            self.showCode = false;
                            self.codeNumber = "获取验证码";
                        }else{
                            self.codeNumber = parseInt(self.codeNumber)-1+"秒";
                        }
                    },1500);
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
                    this.showInfo = 1;
                    this.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        //获取验证码
        getCheckCode2(e){
            let self = this;
            e.preventDefault();
            let formData = new FormData();
            let obj = {
                url: this.all.baseUrl + '/new/verify/sendVerifyOfMG',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    self.showCode2 = true;
                    self.codeNumber2 = 59 + "秒";
                    self.clock2 = setInterval(function(){
                        if(parseInt(self.codeNumber2)==0){
                            clearInterval(self.clock2);
                            self.showCode2 = false;
                            self.codeNumber2 = "获取验证码";
                        }else{
                            self.codeNumber2 = parseInt(self.codeNumber2)-1+"秒";
                        }
                    },1000);
                }
            });
        },
        //获取验证码
        getCheckCodePhone(e){
            let self = this;
            if(self.bindPhone==''){
                self.closeClick();
                self.showInfo = 1;
                self.errMsg = '请填写手机号码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            }
            if(!Scroll.isPoneAvailable(self.bindPhone)){
                self.closeClick();
                self.showInfo = 1;
                self.errMsg = '请填写正确的手机号码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            }
            e.preventDefault();
            let formData = new FormData();
            formData.append('phone',self.bindPhone)
            let obj = {
                url: this.all.baseUrl + '/new/verify/sendVerifyOfQFC',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    self.showCodePhone = true;
                    self.codeNumberPhone = 59 + "秒";
                    self.clockPhone = setInterval(function(){
                        if(parseInt(self.codeNumberPhone)==0){
                            clearInterval(self.clockPhone);
                            self.showCodePhone = false;
                            self.codeNumberPhone = "获取验证码";
                        }else{
                            self.codeNumberPhone = parseInt(self.codeNumberPhone)-1+"秒";
                        }
                    },1000);
                }
            });
        },
        //确定提现
        sureGetMoney(){
            let self = this;
            if(self.price==''){
                self.showInfo = 1;
                self.errMsg = '请填写提现金额';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            } else if(isNaN(self.price)){
                self.showInfo = 1;
                self.errMsg = '提现金额只能为数字';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            } else if(self.yzm==''){
                self.showInfo = 1;
                self.errMsg = '请填写验证码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            }

            let formData = new FormData();
            formData.append('real_name',self.real_name);
            formData.append('card_num',self.card_num);
            formData.append('open_bank',self.open_bank);
            formData.append('yzm',self.yzm);
            formData.append('rmb',self.price);
            this.showLoading = true;
            let obj = {
                url: this.all.baseUrl + '/new/business/cash',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    //如果提现成功
                    //隐藏银行卡界面
                    self.closeClick();
                    //显示成功提示
                    self.showInfo = 0;
                    self.succMsg = res.data.msg;
                    self.yzm='';
                    //清空计时器
                    clearInterval(self.clock2);
                    self.showCode = false;
                    self.codeNumber = "获取验证码";
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg = '';
                        //刷新页面
                        self.getMoney();
                        self.getList();
                    },1000);
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
                    this.showInfo = 1;
                    this.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        //确定绑定手机号码
        sureBindPhone(){
            let self = this;
            if(self.bindPhone==''){
                self.showInfo = 1;
                self.errMsg = '请填写手机号码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            } else if(Scroll.isPoneAvailable(self.binePhone)){
                self.showInfo = 1;
                self.errMsg = '请填写正确的手机号码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            } else if(self.yzmPhone==''){
                self.showInfo = 1;
                self.errMsg = '请填写验证码';
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                },1000);
                return;
            }

            let formData = new FormData();
            formData.append('phone',self.bindPhone);
            formData.append('code',self.yzmPhone);
            this.showLoading = true;
            let obj = {
                url: this.all.baseUrl + '/appuser/phoneBind',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    //如果绑定成功
                    //显示成功提示
                    self.showInfo = 0;
                    self.succMsg = '绑定成功';
                    self.yzmPhone='';
                    //清空计时器
                    clearInterval(self.clockPhone);
                    self.showCodePhone = false;
                    self.codeNumberPhone = "获取验证码";
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg = '';
                        //隐藏绑定手机号码界面
                        self.showBindUserBox=false;
                        //显示绑定界面
                        self.getIsBind();
                    },1000);
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
                    this.showInfo = 1;
                    this.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        //点击修改银行卡
        updateBindInfo(){
            this.isUpdate = true;
            this.showRegain=-1;
            this.getMoneyState=false;
            this.yzm='';
            this.applyClick();
        },
        //根据银行卡号获得开户行
        judeBank(){
            this.open_bank = Scroll.bankCardAttribution(this.card_num);
        },
        //选择充值金额
        selectMoney(money){
            this.price = money;
        },
        xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
    },
    mounted(){
        this.getMoney();
        this.getList();
        this.phone = localStorage.getItem('phone');
        this.isUpdate=false;
        localStorage.setItem("path", this.path);
        this.xuanzhongf(5);
        // this.getBalance();
    }
}
</script>
<style scoped>
    input{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        outline: none;
    }
    .notes{
        min-height: 100vh;
        background: #eee;
        position: relative;
    }
    /* 弹窗 */
    .model{
        position: fixed;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.4);
    }
    /* 申请成功 */
    .successBox{
        position: absolute;
        width: 36.75rem;
        height: 20rem;
        top: calc(50vh - 10rem);
        left: calc(50% - 18.375rem);
        border-radius: .5rem;
        background: #fff;
        box-sizing: border-box;
        padding-top: 2.75rem;
    }
    .successClose{
        position: absolute;
        right: 1.25rem;
        top: 1rem;
        display: block;
        width: 1.5625rem;
    }
    .successImg{
        display: block;
        width: 7.25rem;
        margin: 0 auto;
    }
    .successBox h5{
        margin-top: 1.6875rem;
        color: #333;
        font-size: 1.5rem;
    }
    .successBox span{
        margin-top: .625rem;
        display: block;
        color: #999;
        font-size: 1.125rem;
    }
    /* 绑定提现 */
    .callImg{
        width: 301px;
        height: 136px;
        color: #fff;
        background: #000;
        margin: 0 auto;
        font-size: 16px;
        border-radius: 6px;
    }
    .callSum{
        margin-top: 24px !important;
    }
    .callImg div:first-child{
        text-align: right;
        position: relative;
        top: 6px;
        right: 15px;
        cursor: pointer;
    }
    .callImg div:last-child{
        display: flex;
        text-align: left;
        /*justify-content: center;*/
        margin-top: 33px;
    }
    .callImg img{
        width: 43px;
        height: 40px;
        margin-right: 10px;
        margin-left: 24px;
    }
    .callImg p{
        display: inline-block;
    }
    .callSum,.callVerify{
        width: 301px;
        display: flex;
        height: 50px;
        margin: 5px auto 5px;
        justify-content: center;
        font-size: 14px;
        color: #333333;
        align-items: center;
    }
    .callVerify{
        justify-content: space-between;
    }
    .callSum input,.callVerify>div:last-child{
        width: 230px;
        height: 39px;
        margin-left: 8px;
        border-radius: 3px;
        border: 1px solid #e9e9e9;
        text-indent: 24px;
        font-size: 14px;
    }
    .callVerify>div:last-child{
        width: 234px;
        display: flex;
        border-radius: 3px;
        border: 1px solid #e9e9e9;
        background-color: #fff;
        font-size: 14px;
    }
    .callVerify>div:last-child input{
        width: 140px;
        height: 37px;
        border: none;
        text-indent: 24px;
        font-size: 14px;
    }
    .callVerify>div:last-child div{
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
    .callPoint{
        width: 243px;
        height: 36px;
        margin: 10px auto 0;
        font-size: 12px;
        color: #ACACAC;
        text-align: left;
    }
    .callBtn{
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
    .bindName,.bindNum,.bindAddr,.bindCode{
        height: 39px;
        margin: 0 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #bankName{
        color:#5f5f5f;
        background:rgba(120,120,128,0.16);
    }
    .bindCode{
        margin-bottom: 11px;
    }
    .bindName>div:first-child,.bindNum>div:first-child,.bindAddr>div:first-child,.bindCode>div:first-child{
        width: 60px;
        font-size: 14px;
        text-align: right;
        margin-right: 32px;
        font-weight: bold;
    }
    .bindName input,.bindNum input,.bindAddr input,.bindCode>div:nth-child(2){
        width: 237px;
        height: 39px;
        border-radius: 3px;
        border: 1px solid #e9e9e9;
        text-indent: 21px;
        font-size: 14px;
        background-color: #fff;
    }
    .bindCode>div:nth-child(2){
        display: flex;
        text-indent: 0px;
    }
    .bindCode>div:nth-child(2) input{
        width: 150px;
        border: none;
        text-indent: 21px;
        font-size: 14px;
    }
    .bindCode>div:nth-child(2) div{
        width: 74px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        margin: auto 0;
        background: #FFE135;
        border-radius: 4px;
        font-size: 12px;
    }
    /* 申请成功结束 */
    .model form{
        position: absolute;
        display: block;
        left: calc(50% - 18.375rem);
        top: calc(50vh - 15rem);
        background: #F9F9F9;
        width: 503px;
        box-sizing: border-box;
    }
    form .modelHeader{
        /*height: 35px;*/
        margin-bottom: 18px;
    }
    form .modelHeader img{
        margin-left: 510px;
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
    .line{
        display: block;
        width: 100%;
        height: .125rem;
        background: #d6d7de;
    }
    .content{
        width: 988px;
        background: #fff;
        box-sizing: border-box;
        margin: 0 auto;
        min-height: calc(100vh - 4.75rem);
    }
    .content h2{
        font-weight: normal;
        font-size: 1.875rem;
        color: #333;
        text-align: left;
        margin-bottom: .9375rem;
    }
    p.moneyBox{
        width: 15.125rem;
        height: 6.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        background: #133ffc;
        border-radius: .3125rem;
        font-size: 1.125rem;
        margin-bottom: .25rem;
    }
    p.moneyBox span{
        display: block;
        margin-top: .5625rem;
        font-size: 2.25rem;
    }
    .applyBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .applyBox>span{
        display: block;
        width: 15.125rem;
        box-sizing: border-box;
        height: 2.75rem;
        border: 1px solid #133ffc;
        border-radius: .3125rem;
        color: #133ffc;
        font-size: 1.125rem;
        line-height: 2.75rem;
        text-align: center;
        cursor: default;
    }
    /* 状态 */
    .rightBox{
        position: relative;
        width: 6.75rem;
        height: 2.75rem;
        font-size: 1.125rem;
    }
    .clickBox{
        display: flex;
        height: 2.75rem;
        align-items: center;
        cursor: default;
    }
    .clickBox>span{
        color: #133ffc;
        text-align: left;
        margin-right: .3125rem;
    }
    .clickBox img{
        transform: rotate(180deg);
        display: block;
        width: .9375rem;
    }
    .clickBox img.special{
        transform: rotate(360deg);
    }
    .statusBox{
        position: absolute;
        width: 100%;
        height: 7.875rem;
        background: #fff;
        border-radius: .3125rem;
        border: 1px solid #eee;
        box-shadow: 1px 1px 1px #ddd,
                    -1px -1px 1px #ddd;
        left: 0;
        display: flex;
        bottom: -7.875rem;
        flex-direction: column;
    }
    .statusBox span{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        height: 25%;
        cursor: default;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }
    .statusBox span:last-child{
        border: none;
    }
    ul.navList{
        display: flex;
        background: #eee;
        align-items: center;
        color: #333;
        height: 4.375rem;
        justify-content: space-between;
        font-size: 1.25rem;
        padding: 0 1.5rem;
        font-weight: normal;
        border-radius: .3125rem;
        box-sizing: border-box;
    }
    ul.navList li{
        width: 5rem;
        overflow: hidden;
    }
    ul.navList li:first-child{
        text-align: left;
    }
    ul.proList{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size: 1rem;
        color: #333;
    }
    ul.proList li{
        height: 3.5rem;
        display: flex;
        border-bottom: 1px solid #eee;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        font-weight: normal;
    }
    ul.proList li span{
        display: block;
        width: 5rem;
        text-align: center;
    }
    ul.proList li span:first-child{
        text-align: left;
    }
    .nodataBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: #333;
    }
    .nodataBox img{
        display: block;
        margin-top: 6.25rem;
        margin-bottom: 1.25rem;
    }
    .titleBox{
        height: 48px;
        border-bottom: 1px solid #cdcdcd;
        display: flex;
        background: #fff;
        justify-content: space-between;
    }
    .titleBox>div:first-child{
        margin-top: 24px;
        font-size: 14px;
        margin-left: 5%;
    }
    .header{
        width: 894px;
        height: 78px;
        margin: 50px auto 32px;
        display: flex;
        background: #FFFFFF;
        box-shadow: 2px -2px 27px 0 rgba(126,126,129,0.15);
        border-radius: 6px;
    }
    .header>div{
        width: 50%;
        text-align: left;
        display: flex;
    }
    .header>div+div{
        border-left: 1px dashed #00000029;
    }
    .hraderItem{
        margin-left: 40px;
        margin-top: 10px;
    }
    .hraderItem .itemTitle{
        width: 101px;
        height: 20px;
        font-size: 14.04px;
        color: #010002;
        margin-bottom: 10px;
    }
    .hraderItem .itemCount{
        font-size: 12.01px;
        color: #010002;
    }
    .hraderItem .itemCount span{
        width: 91px;
        height: 21px;
        font-size: 26.08px;
        color: #FB6413;
        margin-right: 5px;
    }
    .header .hraderBtn{
        width: 55px;
        height: 25px;
        font-size: 14.04px;
        line-height: 25px;
        text-align: center;
        color: #010002;
        background: #ffe300;
        border-radius: 5px;
        margin: 22px 109px;
        cursor: pointer;
    }
    .header .hraderBtn:hover{
        background: #ffd000;
    }
    .order{
        width: 988px;
        border-collapse:collapse;
        line-height: 34px;
    }
    .order tr td:first-child{
        width: 300px;
    }
    .orderHeader{
        height: 33px;
    }
    .orderClass{
        width: 988px;
        height: 34px;
        line-height: 34px;
        text-align: left;
        margin: 0 auto;
        background: #EEEEEE;
    }
    .orderClass span:first-child{
        margin-left: 37px;
    }
    .orderClass span{
        width: 58px;
        font-size: 14px;
        display: inline-block;
        color: #B2B2B2;
        cursor: pointer;
    }
    .orderClass span+span{
        margin-right: 38px;
    }
    .active{
        color: #000 !important;
    }
    .orderItem{
        border-bottom: 1px solid #CDCDCD;
    }
    .orderItem td{
        line-height: 34px;
        font-size: 14px;
    }
    .switch,.Footer .delAll span:first-child{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #FFFFFF;
        border: 1px solid #000000;
        border-radius: 50%;
        position: relative;
        top: 3px;
        margin-right: 8px;
    }
    .del{
        width: 73px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border: 1px solid #080102;
        border-radius: 4px;
    }
    .orderItem .del{
        margin: 0 auto;
    }
    .Footer{
        width: 816px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin: 118px auto 0;
    }
    .Footer .del{
        margin-right: 50px;
    }
    .alert{
        width: 442px;
        background: #F6F6F6;
        position: absolute;
        top: 354px;
        left: 35%;
        overflow: hidden;
        transition: all 0.5s;
    }
    .alert div:first-child span{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/image/user/close.png') no-repeat center;
        background-size: 100%;
        margin-left: 400px;
        margin-top: 11px;
    }
    .alert div+div{
        margin: auto 0;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    .alert div+div img{
        width: 25px;
        height: 25px;
        margin-left: 105px;
        margin-right: 10px;
    }
    /* 分页器 */
    ul.pageBox{
        display: flex;
        margin-top: 1.625rem;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        box-shadow: .125rem .125rem .125rem #ddd;
        border-radius: 50%;
        margin: 0 .7125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    ul.pageBox li.click{
        background: #000;
        color: #fff;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    .empty{
        width: 100%;
        font-size: 1.875rem;
        color: #2c2e30;
        line-height: calc(100vh - 17.5rem);
        text-align: center;
    }
    .clear{ clear:both; height:0; overflow:hidden;}
    .surePay{
        width: 135px;
        height: 29px;
        text-align: center;
        background: #FFE135;
        margin: 0 auto;
        margin-bottom: 20px;
        line-height: 29px;
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
    .balance{
        margin: 0 auto;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #020202;
        letter-spacing: 0.29px;
        position: relative;
        top: 60px;
    }
    /*确认是否绑定银行卡*/
    .model .sureBind{
        position: absolute;
        display: block;
        left: calc(50% - 145px);
        top: calc(50vh - 77px);
        width: 290px;
        height: 157px;
        box-sizing: border-box;
        background: #F9F9F9;
        border-radius: 6px;
    }
    .sureBind .tips{
        margin: 58px auto 0px;
    }
    .sureBind .bottomArea{
        height: 54px;
        display: flex;
        position: absolute;
        bottom: 0px;
    }
    .sureBind .bottomArea .no{
        height: 38px;
        width: 145px;
        background: #FFFFFF;
        border: 0 solid #979797;
        border-radius: 0 0 0 6px;
        font-size: 14px;
        color: #333333;
        margin: 0 auto;
        padding-top: 16px;
    }
    .sureBind .bottomArea .yes{
        height: 38px;
        width: 145px;
        background: #FFDC24;
        border: 0 solid #979797;
        border-radius: 0 0 6px 0;
        font-size: 14px;
        color: #333333;
        margin: 0 auto;
        padding-top: 16px;
    }
    /* 没有数据 */
    .noData{
        /*display: flex;*/
        /*justify-content: center;*/
        align-items: center;
        font-size: 1rem;
        margin-top: 15rem;
    }
    .noData img{
        margin-right: 1.25rem;
    }
    .noData span{
        margin-top: 1.25rem;
    }
    .specialCode{
        background: inherit;
    }
    /* 验证码样式 */
    .code{
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
    .bankInfo{
        width: 405px !important;
    }
    .bankInfoBox .modelHeader{
        margin-bottom:35px;
    }
    .bottomTips{
        display: flex;
        margin-bottom: 38px;
        margin-left: 48px;
    }
    .bottomTips img{
        width: 12px;
        height: 14px;
        margin-right: 7px;
    }
    .bottomTips p{
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #B2AFAF;
    }
    .recharge{
        font-family: SourceHanSansCN-Normal;
        font-size: 16px !important;
        color: #050505;
        background: #F9F9F9;
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
    .bindUser .close{
        margin-left: -300px !important;
    }
    .bindUser{
        text-align: center;
    }
    .bindUserTips {
        font-size: 16px;
        color: #666666;
    }
    .bindUser .line{
        width: 300px;
        height: 1px;
        background-color: #E0DDDD;
        margin: 10px auto 0;
    }
    .bindUser .lineYellow{
        width: 230px;
        height: 1px;
        background: #FFE300;
        margin: 0 auto;
        margin-top: -1px;
    }
</style>