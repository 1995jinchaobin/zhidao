<template>
    <div id="copyright">
        <div class="copyright">
            <div class="titleBox">
                <div>我的版权</div>
            </div>
            <div class="topBox">
                <div class="classify"><span @click="classSelect(index)" :class="item.isOnly?'only':''"
                                            v-for="(item,index) in classify" :key="index">{{item.name}}</span></div>
            </div>
            <div class="count">
                <div>
                    <div v-if="proList.length == 0" class="noData">
                        <img src="../../assets/image/user/Emoji.png" alt="">
                        <div>空空如也</div>
                    </div>
                    <div v-if="proList.length > 0" class="title">
                        <span>图片</span>
                        <!--<span class="productTitle">名称</span>-->
                        <span class="productState">状态</span>
                        <span class="productType">操作</span>
                    </div>
                    <ul class="productBox" v-if="proList.length > 0" v-for="(item,index) in proList" :key="index">
                        <li>
                            <img :src="item.img_url" alt="">
                            <!--<span class="productTitle">名称</span>-->
                            <span class="productNum">{{classify[parseInt(item.state)+1].name}}</span>
                            <span v-if="(item.state+1)==4 ||(item.state+1)==5">物流单号:{{item.logistics_number}}</span>
                            <div v-if="(item.state+1)==1" class="productType" @click="pay(index)">付款</div>
                            <div v-if="(item.state+1)==1"  class="productOpe" @click="cancelOrder(index)">取消订单</div>
                        </li>
                    </ul>
                    <ul class="pageBox" v-if="proList.length>0">
                        <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                        <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page"
                            :key="index">{{item.name}}
                        </li>
                        <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                    </ul>
                    <!--<div class="delBox">-->
                        <!--<div class="delAll">-->
                            <!--<div @click="delAll()"-->
                                 <!--:style="{backgroundImage: 'url(' + (isShow ? iconUrl : '') + ')',backgroundSize:'contain'}"></div>-->
                            <!--<div>全选</div>-->
                        <!--</div>-->
                        <!--<div class="del">删除</div>-->

                    <!--</div>-->
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <div class="model" v-if="showModel">
            <!--支付框-->
            <div class="payBox">
                <div class="payBoxTitle">请选择支付方式</div>
                <div class="payNumTitle">本次消费 <label>{{money}}</label> 元</div>
                <div>
                    <div :class="{payTypeBox:true,zhifubaoType:true, checkedType:payType==3}" @click="changePayType(3)">
                        <img src="../../assets/image/user/zhifubao.png">
                        <div>支付宝</div>
                    </div>
                    <div :class="{payTypeBox:true, checkedType:payType==5}"  @click="changePayType(5)">
                        <img src="../../assets/image/user/weixinzhifu.png">
                        <div>微信</div>
                    </div>
                    <div :class="{payTypeBox:true, checkedType:payType==4}" @click="changePayType(4)">
                        <img src="../../assets/image/user/yue.png">
                        <div>余额</div>
                    </div>
                </div>
                <!--支付宝/微信支付-->
                <div v-if="payType==3 ||payType==5" class="codeArea">
                    <img :src="qrImgSrc">
                    <div>请扫码完成支付</div>
                </div>
                <!--余额支付-->
                <div v-if="payType==4" class="codeArea">
                    <div class="balance">可用余额：{{balance}}</div>
                </div>
                <div class="clear"></div>
                <!--确认支付按钮-->
                <div v-if="payType==4" class="surePay" @click="surePay">确认支付</div>
                <div v-if="payType==3 || payType==5" class="surePay" @click="surePay">我已支付</div>
            </div>
            <!--关闭按钮-->
            <img class="closeBtn" @click="closePayBox" src="../../assets/image/banquan/guanbi.png"/>
            <!--&lt;!&ndash;订单交易成功弹窗&ndash;&gt;-->
            <!--<div v-if="showInfo==1" class="infoBox">-->
                <!--<img src="../../assets/image/user/dagou-2.png"/>-->
                <!--<div>订单交易成功！</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;订单交易失败，显示错误信息窗口&ndash;&gt;-->
            <!--<div v-if="showInfo==2" class="infoBox">-->
                <!--<img src="../../assets/image/user/cuowu-2.png"/>-->
                <!--<div>{{infoError}}</div>-->
            <!--</div>-->
        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <PageJump  v-if="showPageJump" :title="err" :urlChange="false"></PageJump>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>

<script>
    import Tab from '@/components/Tab';
    import Jump from '@/components/Jump';
    import Usertab from '../../components/Usertab';
    import Loading from '@/components/Loading';
    import Scroll from '@/assets/js/scroll.js';
    import InfoBox from '@/components/common/InfoBox';
    import PageJump from '@/components/common/PageJump';

    export default {
        name: 'copyright',
        components: {
            Tab,
            Loading,
            Jump,
            Usertab,
            PageJump,
            InfoBox
        },
        data() {
            return {
                path: '/copyright',
                tabIndex: null,
                showJump: false,
                err: '',
                showLoading: false,
                showIndex: '',
                type: '',
                cnt: 1,
                proList: [],
                pageNumber: 1,
                pagr: [],
                flag: '',
                pageIndex: 1,
                count: 6,
                arr: null,
                page: [],
                isShow: false,
                iconUrl: require('../../assets/image/user/dagou-2.png'),
                classify: [{name: '全部', isOnly: true}, {name: '待付款', isOnly: false}, {
                    name: '已支付',
                    isOnly: false
                }, {name: '审核中', isOnly: false}, {name: '审核完成', isOnly: false}, {
                    name: '已寄出',
                    isOnly: false
                }, {name: '已送达', isOnly: false}],
                // 物流单号
                shipmentNumber:'',
                // 支付方式,默认支付宝支付方式
                payType:3,
                showModel:false,
                showGrab:false,
                showPay:false,
                order_id:'',
                order_code:'',
                qrImgSrc:'',
                balance:'',
                //是否显示交易结果信息，0不显示，1显示交易成功，2显示交易失败原因
                // showInfo:0,
                money:0,
                //是否显示提示框-1不显示，0:显示成功，1：显示警告
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                showPageJump:''
            }
        },
        methods: {
            //取消订单
            cancelOrder(index){
                this.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                let self = this;
                formData.append('ids', self.proList[index].id);
                let obj = {
                    url: this.all.baseUrl + '/new/copyright/delCopyrightByIds',
                    formdata: formData
                }
                this.getData(obj).then(res => {
                    setTimeout(function () {
                        self.showLoading = false;
                        Scroll.move();
                    }, 500);
                    if (res.data.status == 0) {
                        self.showInfo = 0;
                        self.succMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                        self.cnt=1;
                        self.pageIndex=1;
                        self.getMessage()
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function () {
                            self.showJump = false;
                            self.err = res.data.msg;
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        }, 1000);
                    } else {
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                    }
                });
            },
            //关闭支付窗口
            closePayBox(){
                this.showModel = false;
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
                            self.succMsg = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                //关闭支付窗口
                                self.showModel = false;
                                self.getMessage();
                                Scroll.move();
                            },1000);
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
                            },1000);
                        }
                    });
                } else if(self.payType==4){
                    //如果是余额支付
                    let formData = new FormData();
                    formData.append('id',self.order_id);
                    formData.append('payType',self.payType);
                    let obj = {
                        url: this.all.baseUrl + '/new/copyright/payForCopyright',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.showInfo = 0;
                            self.succMsg = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                //关闭支付窗口
                                self.showModel = false;
                                self.getMessage();
                                Scroll.move();
                            },1000);
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
                            },1000);
                        }
                    });
                }
            },
            //显示支付框
            alertShow(){
                this.showModel = true
            },
            //点击付款按钮
            pay(index){
                this.order_id=this.proList[index].id;
                this.changePayType(3);
                this.money = this.proList[index].price
                this.alertShow();
            },
            changePayType(payType){
                this.payType = payType;
                let self = this;
                //请求接口
                let formData = new FormData();
                formData.append('id',self.order_id);
                formData.append('payType',self.payType);
                let obj = {
                    url: this.all.baseUrl + '/new/copyright/payForCopyright',
                    formdata: formData
                }
                //如果是支付宝/微信直接请求接口
                if (self.payType==3 || self.payType==5){
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.flag = 0;
                            self.isClick = false;
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = '';
                                //请求完成
                                self.order_id = res.data.result.id;
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
                            },1000);
                        }
                    });
                } else if(self.payType==4 && self.balance == ''){
                    //请求接口
                    this.getBalance();
                }
            },
            changeEnglish() {
                this.$router.go(0);
            },
            getUserIndex(e) {
                this.showIndex = e;
                this.type = '';
                this.cnt = 1;
                this.proList = [];
                this.pageNumber = 1;
                this.page = [];
                this.flag = 0;
                this.pageIndex = 1;
                if (e == 2) {
                    this.count = 9;
                }
                this.getMessage();
            },
            getMessage() {
                this.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                let self = this;
                formData.append('pageSize', this.count);
                formData.append('page', this.cnt);
                formData.append('state', this.type);
                let obj = {
                    url: this.all.baseUrl + '/new/copyright/getCopyrightsByUserId',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    setTimeout(function () {
                        self.showLoading = false;
                        Scroll.move();
                    }, 500);
                    let result;
                    if (res.data.status == 0) {
                        result = res.data.result;
                        result.list.map(function (item) {
                            item.check = false;
                        });
                        self.proList = result.list;
                        self.pageNumber = result.pages;
                        self.page=[]
                        self.pageAuto();
                    } else if (res.data.status == -95) {
                        self.showJump = true;
                        Scroll.stop();
                        self.err = res.data.msg;
                        setTimeout(function () {
                            self.showJump = false;
                            self.err = res.data.msg;
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        }, 1000);
                    } else {
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                    }
                });
            },
            // 初始化分页器
            pageAuto() {
                if (!this.page.length) {
                    if (this.pageNumber <= 7) {
                        for (let i = 0; i < this.pageNumber; i++) {
                            this.page.push({name: i + 1});
                        }
                    } else {
                        this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}
                            , {name: 5}, {name: '···'}, {name: this.pageNumber}];
                    }
                }
            },
            // 分页器每个点击
            btnClick(index) {
                if (this.pageNumber <= 7) {
                    this.flag = 0;
                    this.cnt = index + 1;
                    this.getMessage();
                    this.pageIndex = index + 1;
                } else {
                    // 状态0
                    if (this.flag == 0) {
                        if (index == 5) {

                        } else if (index == 4) {
                            this.cnt = this.page[index].name;
                            if (this.pageNumber - this.cnt <= 3) {
                                this.flag = 2;
                                this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                                this.pageIndex = 7 - (this.pageNumber - this.cnt);
                                this.getMessage();
                            } else {
                                this.flag = 1;
                                this.page = [{name: 1}, {name: '···'}, {name: this.cnt - 1}, {name: this.cnt}, {name: this.cnt + 1}, {name: '···'}, {name: this.pageNumber}];
                                this.getMessage();
                                this.pageIndex = 4;
                            }
                        } else if (index == 6) {
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                            this.getMessage();
                            this.pageIndex = 7;
                        } else {
                            this.cnt = this.page[index].name;
                            this.getMessage();
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
                                this.getMessage();
                                this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: '···'}, {name: this.pageNumber}];
                            } else if ((this.pageNumber - this.cnt) <= 4) {
                                this.pageIndex = 7 - (this.pageNumber - this.cnt);
                                this.flag = 2;
                                this.getMessage();
                                this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                            } else {
                                this.flag = 1;
                                this.page = [{name: 1}, {name: '···'}, {name: this.cnt - 1}, {name: this.cnt}, {name: this.cnt + 1}, {name: '···'}, {name: this.pageNumber}];
                                this.getMessage();
                            }
                        }
                    } else if (this.flag == 2) {
                        if (index == 1) {

                        } else if (index == 2) {
                            this.cnt = this.page[index].name;
                            if (this.cnt <= 4) {
                                this.flag = 0;
                                this.pageIndex = this.cnt;
                                this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: '···'}, {name: this.pageNumber}];
                                this.getMessage();
                            } else {
                                this.flag = 1;
                                this.pageIndex = 4;
                                this.page = [{name: 1}, {name: '···'}, {name: this.cnt - 1}, {name: this.cnt}, {name: this.cnt + 1}, {name: '···'}, {name: this.pageNumber}];
                                this.getMessage();
                            }
                        } else if (index == 0) {
                            this.cnt = this.page[index].name;
                            this.flag = 0;
                            this.pageIndex = 1;
                            this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: '···'}, {name: this.pageNumber}];
                            this.getMessage();
                        } else {
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.pageIndex = 7 - (this.pageNumber - this.cnt);
                            this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                            this.getMessage();
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
                        this.err = '已经是第一页了!';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
                    } else {
                        this.cnt -= 1;
                        this.pageIndex -= 1;
                        this.getMessage();
                    }
                } else {
                    if (this.cnt != 1) {
                        this.cnt--;
                        if (this.pageNumber - this.cnt <= 3) {
                            this.flag = 2;
                            this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                            this.pageIndex = 7 - (this.pageNumber - this.cnt);
                            this.getMessage();
                        } else if (this.cnt <= 4) {
                            this.flag = 0;
                            this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: '···'}, {name: this.pageNumber}];
                            this.pageIndex = this.cnt;
                            this.getMessage();
                        } else {
                            this.flag = 1;
                            this.page = [{name: 1}, {name: '···'}, {name: this.cnt - 1}, {name: this.cnt}, {name: this.cnt + 1}, {name: '···'}, {name: this.pageNumber}];
                            this.pageIndex = 4;
                            this.getMessage();
                        }
                    } else {
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
            next() {
                let self = this;
                if (this.pageNumber <= 7) {
                    this.flag = 0;
                    if (this.cnt < this.pageNumber) {
                        this.cnt += 1;
                        this.pageIndex += 1;
                        this.getMessage();
                    } else {
                        this.showPageJump = true;
                        this.err = '最后一页了';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
                    }
                } else {
                    if (this.cnt < this.pageNumber) {
                        this.cnt++;
                        if (this.pageNumber - this.cnt <= 3) {
                            this.flag = 2;
                            this.page = [{name: 1}, {name: '···'}, {name: this.pageNumber - 4}, {name: this.pageNumber - 3}, {name: this.pageNumber - 2}, {name: this.pageNumber - 1}, {name: this.pageNumber}];
                            this.pageIndex = 7 - (this.pageNumber - this.cnt);
                            this.getMessage();
                        } else if (this.cnt <= 4) {
                            this.flag = 0;
                            this.page = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: '···'}, {name: this.pageNumber}];
                            this.pageIndex = this.cnt;
                            this.getMessage();
                        } else {
                            this.flag = 1;
                            this.page = [{name: 1}, {name: '···'}, {name: this.cnt - 1}, {name: this.cnt}, {name: this.cnt + 1}, {name: '···'}, {name: this.pageNumber}];
                            this.pageIndex = 4;
                            this.getMessage();
                        }
                    } else {
                        this.showPageJump = true;
                        this.err = '最后一页了';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
                    }
                }
            },
            // 点击切换选择状态
            classSelect(index) {
                this.proList = [];
                this.cnt = 1;
                this.pageNumber = 1;
                this.page = [];
                this.flag = 0;
                this.pageIndex = 1;
                if (index == 0) {
                    this.type = '';
                } else {
                    this.type = index - 1;
                }
                this.classify.map(function (item) {
                    item.isOnly = false;
                });
                this.classify[index].isOnly = true;
                this.getMessage();
            },
            delClick(e) {
                let icon = e.target;
                let iconList = document.getElementsByClassName("icon");
                let num = 0;
                if (icon.dataset.icon == 0) {
                    icon.style.cssText = `background: url('${this.iconUrl}') no-repeat center;background-size: 100%;`;
                    icon.dataset.icon = 1;
                    for (let i = 0; i < iconList.length; i++) {
                        if (iconList[i].dataset.icon == 1) {
                            num++;
                        }
                        if (num == iconList.length) {
                            this.isShow = true;
                        } else {
                            this.isShow = false;
                        }
                    }
                } else if (icon.dataset.icon == 1) {
                    icon.style.cssText = "";
                    icon.dataset.icon = 0;
                    for (let i = 0; i < iconList.length; i++) {
                        if (iconList[i].dataset.icon == 1) {
                            num++;
                        }
                        if (num == iconList.length) {
                            this.isShow = true;
                        } else {
                            this.isShow = false;
                        }
                    }
                }
            },
            delAll() {
                this.isShow = !this.isShow;
                let iconList = document.getElementsByClassName("icon");
                if (!this.isShow) {
                    for (let i = 0; i < iconList.length; i++) {
                        iconList[i].style.cssText = "";
                        iconList[i].dataset.icon = 0;
                    }
                } else {
                    for (let i = 0; i < iconList.length; i++) {
                        iconList[i].style.cssText = `background: url('${this.iconUrl}') no-repeat center;background-size: 100%;`;
                        iconList[i].dataset.icon = 1;
                    }
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
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                    }
                });
            }
        },
        mounted() {
            this.getMessage();
            this.getBalance();
        }
    }
</script>

<style scoped>
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
        /*margin: 1rem 3rem 0;*/
        height: 33px;
        line-height: 33px;
        padding-left: 5%;
        background: #F6F6F6;
        margin-top: 8px;
    }

    .classify {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #8a8888;
        font-size: 14px;
        cursor: pointer;
    }

    .classify span {
        padding-right: 1.3rem;
        height: 1.75rem;
        line-height: 1.75rem;
        color: #8a8888;
        font-size: 14px;
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
        color: #333333;
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
        border-top: 1px solid #CDCDCD;
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
        margin-top: 6px;
    }
    .productBox li:first-child {
        margin-left: 115.5px;
    }

    .productBox li {
        display: flex;
        line-height: 93px;
        margin-bottom: 36px;
    }

    .productBox li img {
        width: 185px;
        height: 93px;
    }

    .productBox .productTitle {
        width: 58px;
        font-size: 14px;
        margin-left: 54px;
        margin-right: 77px;
    }

    .productBox .productNum {
        width: 400px;
        font-size: 14px;
    }

    .productBox .productType {
        width: 70px;
        height: 27px;
        font-size: 14px;
        color: #040404;
        background: #FFFFFF;
        border: 1px solid #070706;
        line-height: 27px;
        border-radius: 4px;
        margin: auto 0;
        margin-right: 29px;
        font-size: 14px;
        cursor: pointer;
    }

    .productBox .productOpe {
        width: 73px;
        height: 26px;
        border: 1px solid #000;
        background: #FFFFFF;
        border: 1px solid #070706;
        line-height: 26px;
        margin: auto 0;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
    }

    .productType:hover, .productOpe:hover {
        background: #ffe135;
        border: 1px solid #ffe135;
        font-weight: bold;
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

    ul.pageBox li.click {
        background: #000;
        color: #fff;
    }

    ul.pageBox li img {
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    .title{
        height: 44px;
        line-height: 44px;
        text-align: left;
        font-size: 14px;
        color: #ACACAC;
        font-family: SourceHanSansCN-Medium;
    }
    .title:first-child{
        margin-left: 193.5px;
    }
    .title .productTitle{
        margin-left: 145px;
    }
    .title .productState{
        margin-left: 260px;
    }
    .title .productType{
        margin-left: 257px;
    }
    /*弹窗样式*/
    .model{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100%;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .payBox{
        background-color: #F9F9F9;
        width: 503px;
        height: 343px;
        position: relative;
        margin: 0 auto;
        margin-top: 100px;
        text-align: left;
        padding-top: 13px;
    }
    .payBoxTitle{
        margin-left: 24px;
        font-size: 0.88rem;
    }
    .payNumTitle{
        text-align: center;
        position: relative;
        top: 0px;
    }
    .payNumTitle label{
        font-size: 1.13rem;
        color: #FB6413;
        letter-spacing: 0.32px;
    }
    .payTypeBox{
        width: 106px;
        height: 31px;
        background: #FFFFFF;
        border: 1px solid #BEBCBC;
        box-shadow: none;
        line-height: 31px;
        float: left;
        margin-left: 20px;
        margin-top: 15.2px;
    }
    .zhifubaoType{
        margin-left: 57px;
    }
    .checkedType{
        border: 1px solid #02A9F2;
        box-shadow: 2px 2px 4px 0 rgba(2,169,242,0.28);
    }
    .payTypeBox img{
        height: 19px;
        width: 19px;
        float: left;
        margin-top: 6px;
        margin-left:9px;
    }
    .payTypeBox div{
        float: left;
        margin-left: 20px;
    }
    .codeArea{
        background: #FFFFFF;
        border-radius: 13px;
        width: 364px;
        height: 148px;
        float: left;
        margin-top: 21px;
        margin-left: 57px;
        text-align: center;
    }
    .codeArea img{
        width: 90px;
        height: 90px;
        margin-top: 17px;
    }
    .codeArea div{
        color: #9D9C9C;
        margin-top: 12px;
    }
    .surePay{
        width: 135px;
        height: 29px;
        text-align: center;
        background: #FFE135;
        margin: 0 auto;
        margin-top: 35px;
        line-height: 29px;
    }
    .balance{
        margin: 0 auto;
        margin-top: 62px !important;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #020202;
        letter-spacing: 0.29px;
    }
    .infoBox{
        background: #ffffff;
        width: 442px;
        height: 130px;
        top: 0px;
        position: relative;
        margin: 0 auto;
        top: -230px;
        text-align: left;
        padding-top: 13px;
        z-index: 999;
    }
    .infoBox img{
        width: 43px;
        height: 43px;
        margin-top: 41px;
        margin-left: 104px;
        float: left;
    }
    .infoBox div{
        color: #9D9C9C;
        margin-top: 55px;
        margin-left: 25px;
        float: left;
        color: #020202;
        font-size: 14px;
    }
    .model .closeBtn{
        width: 30px;
        height: 30px;
        position: relative;
        top: -355px;
        left: 272px;
    }
    .clear{ clear:both; height:0; overflow:hidden;}
    .noData{
        align-items: center;
        font-size: 1rem;
        margin-top: 15rem;
    }
    .balance img{
        width: 20px;
        height: 20px;
        margin-top: 0px !important;
    }
</style>