<template>
    <div class="masks">
        <Tab :path="path" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="title">
                织道云口罩在线申购
                <span class="phoneArea">（ 团购请致电：400-777-0198 ）</span>
                <img class="toMyOrderImg" @click="goToOrderList" src="../../assets/image/masks/toRight.png"/>
                <div class="toMyOrder" @click="goToOrderList">查看我的订单</div>
            </div>
            <div class="clear"></div>
            <div class="mainContent" v-if="!hasOrdered&&!showCertificate">
                <!--左侧表单-->
                <div class="mainContentLeft">
                    <!--步骤-->
                    <div class="steps">
                        <div class="step">1</div>
                        <div class="stepText">填写</div>
                        <hr class="stepLine"/>
                        <div class="step stepNext">2</div>
                        <div class="stepText stepNextText">付款</div>
                        <hr class="stepLine"/>
                        <div class="step stepNext">3</div>
                        <div class="stepText stepNextText">发货</div>
                    </div>
                    <!--表单-->
                    <div class="formArea">
                        <div class="formTitle">姓名：</div>
                        <div class="formInput">
                            <input placeholder="请输入您的姓名" v-model="masks.name"/>
                        </div>
                        <div class="formTitle">电话：</div>
                        <div class="formInput">
                            <input placeholder="请输入您的手机号码" v-model="masks.phone"/>
                        </div>
                        <div class="formTitle">地址：</div>
                        <div class="formInput">
                            <input placeholder="请输入您的详细收货地址" v-model="masks.address"/>
                        </div>
                        <div class="formTitle">类型：</div>
                        <div class="formSelect">
                            <el-select  v-model="selectType">
                                <el-option v-for="(item,index) in typeList" :key="'type'+index" :value="index" :label="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!--预约按钮-->
                    <div class="orderBtn" @click="submitOrder">立即申购</div>
                </div>
                <!--右侧信息-->
                <div class="mainContentRight">
                    <div style="display: flex">
                        <!--口罩图片-->
                        <img class="masksImg" src="../../assets/image/masks/mask.png"/>
                        <!--致敬英雄-->
                        <img class="rightImg" src="../../assets/image/masks/respect.png"/>
                    </div>
                    <div class="rightTitle">共抗疫情 穗岁平安</div>
                    <div class="certificateBtn" @click="showCertificate=true">点击查看医用资质</div>
                    <div class="rightText">口罩每日发放1万个</div>
                    <div class="rightText">每人每天限购1盒50只一次性防护口罩（99.9元/盒）</div>
                    <div class="rightText">50只一次性医用口罩（140元）</div>
                    <div class="rightText">72小时内广州发货，顺丰到付</div>
                    <div class="showDetail rightText" @click="showDetail">点击查看口罩详情介绍</div>
                </div>
            </div>
            <div class="mainContentResult" v-if="hasOrdered && !showCertificate">
                <!--打勾图标-->
                <img class="successImg" :src="resultImgPath1[type]"/>
                <!--提示-->
                <div class="resultTitle">{{(type==0||type==3)?'提交成功，等待摇号结果':type==1?'非常抱歉，您本次未能摇中':'恭喜您申购成功'}}</div>
                <div class="resultTip">{{(type==0||type==3)?'12:30之后可以查询摇号结果，请耐心等待':type==1?'明日9:00-12:00还可以预约摇号购买':'点击我的订单可以查看订单状态，口罩72小时内发货，顺丰到付'}}</div>
                <!--按钮-->
                <div class="btns">
                    <div v-if="type==0||type==3||type==1||payType!=0" class="backHomeBtn" @click="goToHome">返回首页</div>
                    <div v-else class="backHomeBtn" @click="toPay">立即付款</div>
                    <div class="myOrdersBtn" @click="goToOrderList">我的订单</div>
                </div>
            </div>
            <div  class="mainContent" v-if="showCertificate">
                <div>
                    <img class="ceImg" src="../../assets/image/masks/ce2.png"/>
                    <div class="ceTitle">医疗器械备案证</div>
                </div>
                <div>
                    <img class="ceImg1" src="../../assets/image/masks/ce1.png"/>
                    <div class="ceTitle">医疗器械生产备案凭证</div>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
        <InfoBox  v-if="showInfo=='1' || showInfo=='0'" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg" @cancel="cancel"></InfoBox>
        <!--支付弹窗-->
        <div class="payBoxBg" v-show="showPayBox">
            <div class="payBoxArea">
                <img class="closeBtn" src="../../assets/image/masks/closeBox.png" @click="showPayBox=false">
                <div class="title">扫一扫付款（元）</div>
                <div class="payMoney">{{price}}</div>
                <div class="QRCodeArea">
                    <div class="payArea">
                        <img class="payImg" :src="alipayUrl"/>
                        <div class="payBottomArea">
                            <img class="payLogo" src="../../assets/image/masks/AlipayLogo.png"/>
                            <div class="payIntroduction">
                                <div>打开手机支付宝</div>
                                <div>扫一扫继续付款</div>
                            </div>
                        </div>
                    </div>
                    <div class="wxpayArea">
                        <img class="payImg" :src="wxpayUrl"/>
                        <div class="payBottomArea">
                            <img class="payLogo" src="../../assets/image/masks/wxPayLogo.png"/>
                            <div class="payIntroduction">
                                <div>打开手机微信</div>
                                <div>扫一扫继续付款</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sureHavePay" @click="sureHavePay">确认已付款</div>
            </div>
        </div>
    </div>
</template>

<script>
    import InfoBox from '../../components/common/InfoBox';
    import Tab from '@/components/Tab';
    import Loading from '../../components/Loading';
    import Scroll from "@/assets/js/scroll.js";
    export default {
        name: "OrderMasks",
        components:{
            Tab,
            InfoBox,
            Loading
        },
        data(){
            return{
                path: '/orderMasks',
                tabIndex: null,
                masks:{
                    name:'',
                    phone:'',
                    address:''
                },
                showLoading:false,
                //-1不显示提示框，0，显示成功提示框，1显示错误提示框
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                hasOrdered:false,
                orderList:[],
                pageSize:3,
                page:0,
                //0等待摇号，1未摇中，2摇中(申请)(摇号) ,
                type:0,
                resultImgPath: {
                    1: require('../../assets/image/masks/success.png'),
                    2: require('../../assets/image/masks/failImg.png'),
                    3: require('../../assets/image/masks/success.png'),
                },
                resultImgPath1: [
                    require('../../assets/image/masks/success.png'),
                    require('../../assets/image/masks/failImg.png'),
                    require('../../assets/image/masks/success.png'),
                    require('../../assets/image/masks/success.png'),
                ],
                //是否显示支付弹框
                showPayBox:false,
                alipayUrl:'',
                wxpayUrl:'',
                orderId:0,
                formToken:null,
                payType:0,
                typeList:['50个防护口罩', '50个医用口罩', '50个医用+50个防护'],
                selectType:2,
                price:0,
                //是否显示资质证书
                showCertificate:false
            }
        },
        methods:{
            //查询今日是否已经申请过
            judgeToday(){
                let self = this;
                let formData = new FormData();
                let obj = {};
                obj = {
                    url: self.all.baseUrl + '/new/apply/judgeTodayApply',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        self.hasOrdered = res.data.result;
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                });
            },
            //查询上一次提交的结果
            getList(){
                let self = this;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('pageSize',self.pageSize);
                formData.append('page',self.page);
                obj = {
                    url: self.all.baseUrl + '/new/apply/getOwnApply',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        if(res.data.result){
                            self.orderList = res.data.result.list;
                            if(self.orderList.length>0){
                                self.masks.name = self.orderList[0].name;
                                self.masks.phone = self.orderList[0].phone;
                                self.masks.address = self.orderList[0].address;
                                self.type = self.orderList[0].type;
                                self.payType = self.orderList[0].pay_type;
                                self.price = self.orderList[0].price;
                            }
                        }
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                    self.showLoading = false;
                });
            },
            //获取token
            getFormToken(){
                let self = this;
                let formData = new FormData();
                let obj = {};
                obj = {
                    url: self.all.baseUrl + '/new/resubmit/getFormToken',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        self.formToken = res.data.result;
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }

                });
            },
            //关闭提示
            cancel(){
                this.showInfo = -1;
                this.succMsg = '';
                this.errMsg = '';
            },
            //点击提交预约
            submitOrder(){
                let self = this;
                //验证
                if(!self.masks.name) {
                    self.showInfo = 1;
                    self.errMsg = '请填写姓名'
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },2000);
                } else if(!self.masks.phone){
                    self.showInfo = 1;
                    self.errMsg = '请填写手机号码'
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },2000);
                } else if(!Scroll.isPoneAvailable(self.masks.phone)){
                    self.showInfo = 1;
                    self.errMsg = '请填写正确的手机号码'
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },2000);
                } else if(!self.masks.address){
                    self.showInfo = 1;
                    self.errMsg = '请填写详细收货地址'
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },2000);
                } else{
                    self.showLoading = true;
                    let formData = new FormData();
                    let obj = {};
                    formData.append('name',this.masks.name);
                    formData.append('phone',this.masks.phone);
                    formData.append('address',this.masks.address);
                    formData.append('formToken',this.formToken);
                    formData.append('goods_type',this.selectType);
                    obj = {
                        url: self.all.baseUrl + '/new/apply/addApply',
                        formdata: formData
                    }
                    self.getData(obj).then(res => {
                        self.showLoading = false;
                        if(res.data.status == 0){
                            // self.showInfo = 0;
                            // self.succMsg = res.data.msg;
                            setTimeout(function(){
                                // self.showInfo = -1;
                                // self.succMsg = '';
                                self.judgeToday();
                                self.getList();
                            },2000);
                        }else if(res.data.status == -95){
                            self.showInfo = 1;
                            self.errMsg = res.data.msg;
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                localStorage.clear();
                                self.$router.push({
                                    path: '/Login'
                                });
                            },2000);
                        }else{
                            self.getFormToken();
                            self.showInfo = 1;
                            self.errMsg = res.data.msg;
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                            },2000);
                        }
                    });
                }
            },
            //点击我的订单，进入订单页
            goToOrderList(){
                this.$router.push('/maskOrderList')
            },
            //点击返回首页，回到网站首页
            goToHome(){
                this.$router.push('/Select')
            },
            //点击立即支付，获取支付二维码，显示支付弹框
            toPay(){
                let self = this;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('pageSize',self.pageSize);
                formData.append('page',self.page);
                obj = {
                    url: self.all.baseUrl + '/new/apply/getOwnApply',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        if(res.data.result){
                            self.orderList = res.data.result.list;
                            if(self.orderList.length>0){
                                self.masks.name = self.orderList[0].name;
                                self.masks.phone = self.orderList[0].phone;
                                self.masks.address = self.orderList[0].address;
                                self.type = self.orderList[0].type;
                                self.payType = self.orderList[0].pay_type;
                                self.price = self.orderList[0].price;
                                self.orderId = self.orderList[0].id;
                                self.showLoading = true;
                                let formData1 = new FormData();
                                let obj = {};
                                formData1.append('id',self.orderId);
                                obj = {
                                    url: self.all.baseUrl + '/new/apply/getKZPayQRcode',
                                    formdata: formData1
                                }
                                self.getData(obj).then(res => {
                                    self.alipayUrl = res.data.result.zfbQrImgSrc;
                                    self.wxpayUrl = res.data.result.wxQrImgSrc;
                                    self.showLoading = false;
                                    self.showPayBox = true;
                                });
                            }
                        }
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                    self.showLoading = false;
                });
            },
            //点击确认已付款
            sureHavePay(){
                let self = this;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('id',self.orderId);
                obj = {
                    url: self.all.baseUrl + '/new/apply/judgePay',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    self.showLoading = false;
                    if(res.data.status == 0){
                        self.showInfo = 0;
                        self.succMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.succMsg = '';
                            self.showPayBox = false;
                            self.selectTypeIndex = 1;
                            self.$router.push('/maskOrderList')
                        },2000);
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                });
            },
            showDetail(){
                //let routeData = this.$router.resolve({ path: '/test' });
                window.open('https://mp.weixin.qq.com/s/3h4LjO8bBnxQWh89CBh1aw', '_blank');
            }
        },
        beforeMount: function () {
            this.judgeToday();
            this.getList();
            this.getFormToken();
        }
    }
</script>
<style>
    .masks .el-select{
        width: 100% !important;
    }
</style>
<style scoped>
    /*预定页面*/
    .masks{
        width: 100vw;
        min-width: 1200px;
        background-color: #f9f9fb;
        padding-bottom: 100px;
    }
    .content{
        width: 1200px;
        align-items:center;
        margin: 0 auto;
    }
    .title{
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #1C2226;
        line-height: 60px;
        margin-top: 50px;
        width: 100%;
        text-align: left;
    }
    .mainContent{
        background-color: #fff;
        padding-left: 87px;
        display: flex;
        margin-top: 13px;
        padding-bottom: 66px;
    }
    .mainContentLeft{
        margin-top: 99px;
        width: 518px;
        margin-right: 123px;
    }
    .steps{
        display: flex;
        align-items:center;
        width: 530px;
    }
    .clear{
        clear:both; height:0; overflow:hidden;
    }
    .step{
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 50px;
        margin-right:9px;
        background-color: #000;
        color:#fff;
        font-size: 16px;
        text-align: center;
    }
    .stepNext{
        margin-left: 9px;
        color:rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.15);
        background-color: #fff;
    }
    .stepLine{
        width: 130px;
        height: 1px;
        border:none; border-bottom:1px solid #ddd;
    }
    .stepText{
        font-size: 16px;
        color: rgba(0,0,0,0.85);
        text-align: left;
        line-height: 24px;
        font-weight: bold;
        margin-right: 8px;
    }
    .stepNextText{
        color: rgba(0,0,0,0.45);
        font-weight: normal;
    }
    .formArea{
        margin-top: 70px;
        text-align: left;
    }
    .formTitle{
        font-size: 14px;
        color: rgba(0,0,0,0.85);
    }
    .formInput{
        width: 100%;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 4px;
        height: 32px;
        margin-top: 7px;
        margin-bottom: 21px;
    }
    .formInput input{
        border: none;
        height: 100%;
        width: 100%;
        outline:none;
        font-size: 14px;
        color: rgba(0,0,0,0.25);
        text-indent: 12px;
        border-radius: 4px;
    }
    .orderBtn{
        width: 100%;
        height: 60px;
        background: #FFE300;
        border-radius: 6px;
        font-size: 20px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 60px;
        font-weight: 400;
        margin-top: 48px;
        cursor: pointer;
    }
    .mainContentRight{
        width: 470px;
    }
    .masksImg{
        width: 407px;
        height: 319px;
        margin-top: 45px;
    }
    .rightImg{
        width: 29px;
        height: 107px;
        margin-left: 8px;
        margin-top: 71px;
    }
    .rightTitle{
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #1C2226;
        line-height: 60px;
        margin-top: 11px;
        text-align: left;
        margin-left: 52px;
    }
    .rightText{
        font-size: 17px;
        color: #999999;
        line-height: 25px;
        margin-left: 52px;
        text-align: left;
    }
    /*预定结果页*/
    .successImg{
        width: 72px;
        height: 72px;
        margin: 0 auto;
        margin-top: 140px;
    }
    .mainContentResult{
        background-color: #fff;
        margin-top: 13px;
        padding-bottom: 66px;
    }
    .resultTitle{
        font-size: 24px;
        color: rgba(0,0,0,0.85);
        text-align: center;
        line-height: 32px;
        margin-top: 23px;
    }
    .resultTip{
        font-size: 14px;
        color: rgba(0,0,0,0.45);
        text-align: center;
        line-height: 22px;
        margin-top: 12px;
    }
    .btns{
        display: flex;
        margin-top: 86px;
        align-items:center;
        justify-content:center;
        margin-bottom: 174px;
    }
    .backHomeBtn{
        background: #FFE300;
        border-radius: 4px;
        font-size: 14px;
        color: #333333;
        text-align: center;
        width: 78px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
    }
    .myOrdersBtn{
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        font-size: 14px;
        color: rgba(0,0,0,0.65);
        text-align: center;
        width: 78px;
        height: 32px;
        line-height: 32px;
        margin-left: 8px;
        cursor: pointer;
    }
    .masks .payBoxArea{
        width: 630px;
        height: 523px;
        background: #FFFFFF;
        border-radius: 4px;
        overflow:hidden;
        position:fixed;
        top: calc(50vh - 261px);
        left: calc(50vw - 315px);
    }
    .masks .payBoxArea .title{
        font-size: 24px;
        color: rgba(0,0,0,0.85);
        text-align: center !important;
        line-height: 32px;
        margin-top: 38px;
        position: relative;
    }
    .masks .payBoxArea .payMoney{
        font-size: 36px;
        color: #FE6500;
        text-align: center;
        line-height: 32px;
        margin-top: 14px;
        font-weight: bold;
    }
    .masks .payBoxArea .closeBtn{
        position: absolute;
        width: 30px;
        height: 30px;
        left: 572px;
        top: 33px;
        cursor: pointer;
        z-index: 11;
    }
    .masks .payBoxArea .QRCodeArea{
        margin-top: 56px;
        display: flex;
        width: 100%;
    }
    .masks .payBoxArea .payArea{
        margin-left:  104px;
    }
    .masks .payBoxArea .wxpayArea{
        margin-left:  87px !important;
    }
    .masks .payBoxArea .payImg{
        width: 167px;
        height: 167px;
    }
    .masks .payBoxArea .payBottomArea{
        display: flex;
        margin-top: 16px;
    }
    .masks .payBoxArea .payLogo{
        width: 40px;
        height: 40px;
        margin-left: 10px;
    }
    .masks .payBoxArea .payIntroduction{
        font-size: 14px;
        color: rgba(0,0,0,0.45);
        text-align: left;
        line-height: 22px;
        margin-left: 8px;
    }
    .masks .payBoxBg{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100vw;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .masks .payBoxArea .sureHavePay{
        width: 223px;
        height: 32px;
        line-height: 32px;;
        margin: 62px auto 0px;
        cursor: pointer;
        background: #1890FF;
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
    }
    .toMyOrder{
        font-size: 24px;
        color: #1C2226;
        line-height: 60px;
        float: right;
        margin-right: 5px;
        cursor: pointer;
    }
    .toMyOrderImg{
        width: 12px;
        height: 19px;
        float: right;
        margin-top: 20px;
        cursor: pointer;
    }
    .phoneArea{
        font-family: PingFangSC-Regular;
        font-size: 36px;
        color: #999999;
    }
    .formSelect{
        margin-top: 7px;
        margin-bottom: 21px;
        width: 100%;
    }
    .certificateBtn{
        width: 143px;
        height: 32px;
        background: #1890FF;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: #FFFFFF;
        float: right;
        margin-top: -46px;
        margin-right: 63px;
        cursor: pointer;
    }
    .ceImg{
        width: 404px;
        height: 520px;
        margin-top: 13px;
    }
    .ceImg1{
        width: 658px;
        height: 474px;
        margin-top: 44px;
        margin-bottom: 16px;
    }
    .ceTitle{
        font-size: 24px;
        color: #000000;
    }
    .showDetail{
        color: #000;
        text-decoration:underline;
        cursor: pointer;
        text-align: left;
    }




</style>