<template>
    <div class="masksList">
        <Tab :path="path" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="title">
                织道云口罩在线申购
                <span class="phoneArea">（ 团购请致电：400-777-0198 ）</span>
            </div>
            <div class="clear"></div>
            <div class="mainContent">
                <!--标题-->
                <div class="orderTitle">我的订单</div>
                <div class="clear"></div>
                <!--分类-->
                <div class="types">
                    <div v-for="(item,index) in typesList" :key="index" :class="{'typeBtn':true,'selectTypeBtn':selectTypeIndex==index}" @click="changeType(index)">{{item}}</div>
                </div>
                <!--表格-->
                <!--表头-->
                <table cellspacing="0">
                    <thead>
                        <tr>
                            <th>订单时间</th>
                            <th>商品名称</th>
                            <th>订单编号</th>
                            <th>收货地址</th>
                            <th>总金额</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in orderList" :key="'tr'+index" :class="{'hasSendTr':item.express_type==3}">
                            <td>{{item.create_time}}</td>
                            <td>{{item.goods_type==0?'50个防护口罩':item.goods_type==1?'50个医用口罩':'50个防护+50个医用'}}</td>
                            <td>{{item.order_code}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.type==0 || item.type==3"><div class="orderState">等待摇号</div></td>
                            <td v-if="item.type==1"><div class="orderState">未摇中</div></td>
                            <td v-if="item.express_type==4"><div class="orderState">已退款</div></td>
                            <td v-if="item.pay_type==0 && item.type==2"><div class="toPayBtn" @click="toPay(index)">待支付</div></td>
                            <td v-if="(item.express_type==1||item.express_type==2) && item.type==2 && item.pay_type!=0">
                                <div class="expressingArea">
                                    <div class="expressState">待发货</div>
                                    <div class="toRefundBtn" @click="refund(index)">退款</div>
                                </div>
                            </td>
                            <td v-if="item.express_type==3 && item.type==2 && item.pay_type!=0" ><div class="expressState">顺丰：{{item.express_number}}</div></td>
                        </tr>
                    </tbody>
                </table>
                <!--分页-->
                <div class="pageArea">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            layout="total, prev, pager, next, sizes, jumper"
                            :page-sizes="[3, 10, 20, 100]"
                            :page-size="pageSize"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
        <InfoBox  v-if="showInfo=='1' || showInfo=='0'" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg" @cancel="cancel"></InfoBox>
        <SelectBox  @sure="sureRefund" @cancel="cancelRefund"  v-if="showSeledtInfo==1 || showSeledtInfo==0" :code="showSeledtInfo" :errMsg="selectErrMsg" :succMsg="selectSuccMsg" :isSelect="isSelect"></SelectBox>
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
    import SelectBox from '../../components/common/SelectBox';
    export default {
        name: "MaskOrderList",
        components:{
            Tab,
            InfoBox,
            Loading,
            SelectBox
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
                typesList:['全部'],
                selectTypeIndex:0,
                pageSize:3,
                page:1,
                orderList:[],
                total:10,
                //是否显示支付弹框
                showPayBox:false,
                alipayUrl:'',
                wxpayUrl:'',
                orderId:0,
                //是否显示退款确认弹框
                showSeledtInfo:-1,
                //是否需要底部选择按钮0:是，1：否
                isSelect:0,
                selectErrMsg:'',
                selectSuccMsg:'',
            }
        },
        methods:{
            //查询订单数据
            getList(){
                let self = this;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('pageSize',self.pageSize);
                formData.append('page',self.page);
                formData.append('type',self.selectTypeIndex==0?'':self.selectTypeIndex==1?2:1);
                obj = {
                    url: self.all.baseUrl + '/new/apply/getOwnApply',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        if(res.data.result){
                            var orderList = res.data.result.list;
                            self.total = res.data.result.total;
                            for(var i=0;i < orderList.length;i++){
                                orderList[i].create_time = Scroll.changeDateWay(orderList[i].create_time);
                            }
                            self.orderList = orderList;
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
            //关闭提示
            cancel(){
                this.showInfo = -1;
                this.succMsg = '';
                this.errMsg = '';
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            changeType(index){
                this.selectTypeIndex = index;
                this.getList();
            },
            //点击待支付，获取支付二维码，显示支付弹框
            toPay(index){
                let self = this;
                self.orderId = self.orderList[index].id;
                self.price =self.orderList[index].price;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('id',self.orderList[index].id);
                obj = {
                    url: self.all.baseUrl + '/new/apply/getKZPayQRcode',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    self.showLoading = false;
                    if(res.data.status == 0){
                        self.alipayUrl = res.data.result.zfbQrImgSrc;
                        self.wxpayUrl = res.data.result.wxQrImgSrc;
                        self.showLoading = false;
                        self.showPayBox = true;
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
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                });
            },
            //点击退款按钮
            refund(index){
                this.orderId = this.orderList[index].id;
                this.selectErrMsg = '确认要退款吗？'
                this.showSeledtInfo = 1;
            },
            //点击取消退款
            cancelRefund(){
                this.selectErrMsg = ''
                this.showSeledtInfo = -1;
            },
            //点击确认退款
            sureRefund(){
                let self = this;
                self.showLoading = true;
                let formData = new FormData();
                let obj = {};
                formData.append('id',self.orderId);
                obj = {
                    url: self.all.baseUrl + '/new/apply/refund',
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
                            self.showSeledtInfo = -1;
                            self.selectTypeIndex = 1;
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
                        self.showInfo = 1;
                        self.showSeledtInfo = -1;
                        self.errMsg = res.data.msg;
                    }
                });
            }
        },
        beforeMount: function () {
            this.getList();
        }
    }
</script>

<style>
    /*预定页面*/
    .masksList{
        width: 100vw;
        min-width: 1200px;
        background-color: #f9f9fb;
        padding-bottom: 35px;
    }
    .masksList .content{
        width: 1200px;
        align-items:center;
        margin: 0 auto;
    }
    .masksList .title{
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #1C2226;
        line-height: 60px;
        width: 100%;
        text-align: left !important;
        margin-top: 50px;
    }
    .masksList .mainContent{
        background-color: #fff;
        padding-left: 68px;
        margin-top: 13px;
        min-height: 670px;
        overflow:hidden
    }
    .masksList .orderTitle{
        font-size: 24px;
        color: #1C2226;
        line-height: 60px;
        margin-top: 21px;
        width: 1132px;
        text-align: left;
    }
    .masksList .types{
        display: flex;
        width: 1132px;
    }
    .masksList .typeBtn{
        font-size: 16px;
        color: rgba(0,0,0,0.65);
        letter-spacing: 0;
        text-align: center;
        line-height: 24px;
        padding:0 44px 10px;
        cursor: pointer;
    }
    .masksList .selectTypeBtn{
        color: #1890FF;
        border-bottom: 2px solid #1890FF;
        cursor: pointer;
    }
    .masksList table{
        width: 1072px;
    }
    .masksList thead tr th{
        background: #FAFAFA;
        height: 54px;
    }
    .masksList tbody tr td{
        height: 54px;
        border-bottom: 1px solid #E8E8E8;
        text-align: center;
    }
    .masksList .toPayBtn{
        background: #1890FF;
        border-radius: 4px;
        width: 74px;
        height: 32px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 32px;
        margin: 0 auto;
        cursor: pointer;
    }
    .masksList .orderState{
        font-size: 14px;
        color: #595959;
        text-align: center;
    }
    .masksList .expressingArea{
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .masksList .expressState{
        font-size: 14px;
        color: #595959;
        text-align: center;
    }
    .masksList .toRefundBtn{
        width: 74px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        font-size: 14px;
        color: rgba(0,0,0,0.65);
        text-align: left;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
        margin-left: 10px;
    }
    .masksList .hasSendTr{
        background: #E6F7FF;
    }
    .masksList .pageArea{
        margin-top: 35px;
    }
    .masksList .textCenter{
        text-align: center;
    }
    .masksList .el-pagination.is-background .btn-next, .masksList .el-pagination.is-background .btn-prev, .masksList .el-pagination.is-background .el-pager li{
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
    }
    .masksList .payBoxArea{
        width: 630px;
        height: 523px;
        background: #FFFFFF;
        border-radius: 4px;
        overflow:hidden;
        position:fixed;
        top: calc(50vh - 261px);
        left: calc(50vw - 315px);
    }
    .masksList .payBoxArea .title{
        font-size: 24px;
        color: rgba(0,0,0,0.85);
        text-align: center !important;
        line-height: 32px;
        margin-top: 38px;
        position: relative;
    }
    .masksList .payBoxArea .payMoney{
        font-size: 36px;
        color: #FE6500;
        text-align: center;
        line-height: 32px;
        margin-top: 14px;
        font-weight: bold;
     }
    .masksList .payBoxArea .closeBtn{
        position: absolute;
        width: 30px;
        height: 30px;
        left: 572px;
        top: 33px;
        cursor: pointer;
        z-index: 11;
    }
    .masksList .payBoxArea .QRCodeArea{
        margin-top: 56px;
        display: flex;
        width: 100%;
    }
    .masksList .payBoxArea .payArea{
        margin-left:  104px;
    }
    .masksList .payBoxArea .wxpayArea{
        margin-left:  87px !important;
    }
    .masksList .payBoxArea .payImg{
        width: 167px;
        height: 167px;
    }
    .masksList .payBoxArea .payBottomArea{
        display: flex;
        margin-top: 16px;
    }
    .masksList .payBoxArea .payLogo{
        width: 40px;
        height: 40px;
        margin-left: 10px;
    }
    .masksList .payBoxArea .payIntroduction{
        font-size: 14px;
        color: rgba(0,0,0,0.45);
        text-align: left;
        line-height: 22px;
        margin-left: 8px;
    }
    .masksList .payBoxBg{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100vw;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .masksList .payBoxArea .sureHavePay{
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
    .phoneArea{
        font-family: PingFangSC-Regular;
        font-size: 36px;
        color: #999999;
    }

</style>