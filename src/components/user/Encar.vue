<template>
    <div class="car">
        <!-- 我的订单 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <Enusertab v-on:setUserIndex="getUserIndex" :arr="arr"></Enusertab>
        <div class="content">
            <div class="flower">
                <ul class="proList" v-if="list.length">
                    <li @click="listClick(index)" v-for="(item,index) in list" :key="index">
                        <div class="main">
                            <div class="leftBox">
                                <input :checked="item.show" type="checkbox">
                                <span class="backImg"></span>
                            </div>
                            <div v-if="userIndex==1" class="imgBox"><img :src="item.app3dPatternsSoldByMallSellersJygModel.picture1" alt=""></div>
                            <div v-if="userIndex==0" class="imgBox"><img :src="item.app3dFlowerTypeJygModel.preview" alt=""></div>
                            <div class="descriptBox">
                                <label v-if="userIndex==1" for="">
                                    <span>Office</span>
                                    <span class="special">{{item.app3dPatternsSoldByMallSellersJygModel.shopName}}</span>
                                </label>
                                <label v-if="userIndex==0" for="">
                                    <span>Number</span>
                                    <span>{{item.app3dFlowerTypeJygModel.id}}</span>
                                </label>
                                <label v-if="userIndex==1" for="">
                                    <span>Number</span>
                                    <span>{{item.app3dPatternsSoldByMallSellersJygModel.id}}</span>
                                </label>
                                <label for="">
                                    <span>Format</span>
                                    <span v-if="userIndex==1">psd</span>
                                    <span v-if="userIndex==0">{{item.app3dFlowerTypeJygModel.format}}</span>
                                </label>
                                <label v-if="userIndex==0" for="">
                                    <span>Size</span>
                                    <span>{{item.app3dFlowerTypeJygModel.sizeWidth}}×{{item.app3dFlowerTypeJygModel.sizeHeight}}</span>
                                </label>
                                <label v-if="userIndex==1" for="">
                                    <span>Size</span>
                                    <span>{{item.app3dPatternsSoldByMallSellersJygModel.sizeWidth}}×{{item.app3dPatternsSoldByMallSellersJygModel.sizeHeight}}</span>
                                </label>
                                <label v-if="userIndex==0" for="">
                                    <span>Resolving power</span>
                                    <span>{{item.app3dFlowerTypeJygModel.resolutionRatio}}</span>
                                </label>
                                <label v-if="userIndex==1" for="">
                                    <span>Resolving power</span>
                                    <span>{{item.app3dPatternsSoldByMallSellersJygModel.resolutionRatio}}</span>
                                </label>
                                <label for="">
                                    <span>Layered</span>
                                    <span v-if="userIndex==1">true</span>
                                    <span v-if="userIndex==0">false</span>
                                </label>
                            </div>
                            <div class="price">￥{{item.price}}</div>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty">Absolutely empty</div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump> 
        <!-- 弹窗 -->
        <div class="model" v-if="showModel">
            <!-- 立即抢购弹窗 -->
            <div class="grabBox" v-if="showGrab">
                <h3>Tigs</h3>
                <p class="del" @click="delBind">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>Choose payment method</span>
                <div class="grabWay">
                    <button @click="showBuy('Wechat')">Wechat</button>
                    <button @click="showBuy('Alipay')">Alipay</button>
                </div>
            </div>
            <div class="payBox" v-if="showPay">
                <span @click="delPay" class="payDel">
                    <img src="../../assets/image/login/close.png" alt="">
                </span>
                <div class="smallBox">
                    <img src="../../assets/image/shopping/pay.png" alt="">
                    <div class="code">
                        <h5>Please open {{type}} Sweep Payment</h5>
                        <div class="codeBox"><img :src="codeSrc" alt=""></div>
                        <button @click="hasPay" class="hasPay">I have paid</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomBox" v-if="showBottom">
            <div class="selectBox">
                <div @click="allClick" class="selectBtn">
                    <input type="checkBox" :checked="check">
                    <span class="allBack"></span>
                    <span>All election</span>
                </div>
                <button @click="delOrder" class="delBtn">Detele</button>
            </div>
            <div class="endBox">
                <span class="allPrice">￥{{amount}}</span>
                <button @click="toPay" class="endBtn">Settlement</button>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Enusertab from '../../components/Enusertab';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
import Loading from '../../components/Loading';
export default {
    name: 'Encar',
    components: {
        Entab,
        Enusertab,
        Jump,
        Loading
    },
    data(){
        return {
            path: '/Encar',
            tabIndex: null,
            showJump: false,
            err: '',
            showLoading: false,
            userIndex: 0,
            // 向子组件传值
            arr: [{name: "Pattern",color: "#2f2f2f",showTangle: true},{name: "Shopping Mall Flower Style",color: "#8d8d8d",showTangle: false}],
            // 商城花型
            list: [],
            // 分页选择
            i: 1,
            // 支付弹窗
            id: "",
            orderId: '',
            showModel: false,
            showGrab: false,
            showPay: false,
            codeSrc: '',
            // 用来标记是否需要在加载数据
            flag: true,
            // 全选
            check: false,
            // 全选点击次数
            allCnt: 0,
            // 总金额
            amount: 0,
            showBottom: false
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 获取子组件传来的值
        getUserIndex(e){
            this.userIndex = e;
            this.showBottom = false;
            this.check = false;
            this.i = 1;
            this.amount = 0;
            this.list = [];
            this.check = false;
            if(this.userIndex==0){
                this.getMine();
            }else{
                this.getDiffData();
            }
        },
        // 列表点击
        listClick(index){
            this.check = false;
            this.amount = 0;
            let self = this;
            let m = 0;
            this.list[index].show = !this.list[index].show;
            this.$forceUpdate();
            this.list.map(function(item){
                if(item.show){
                    self.showBottom = true;
                    m = 1;
                    self.amount += parseFloat(item.price);
                }
            });
            if(m==0){
                this.showBottom = false;
            }
            self.amount = self.amount.toFixed(2);
        },
        // 获取花型商城数据
        getDiffData(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('pageSize',4);
            formData.append('page',this.i);
            formData.append('cartStatus',1);
            let obj = {
                url: this.all.baseUrl + '/shoppingCartJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                this.flag = true;
                if(res.data.status==0){
                    let list = res.data.result.list;
                    if(res.data.result.hasNextPage==false){
                        this.flag = false;
                    }
                    for(let m=0;m<list.length;m++){
                        if(list[m].price==null){
                            list[m].price = 0;
                        }
                        if(list[m].app3dPatternsSoldByMallSellersJygModel){
                            list[m].price = list[m].app3dPatternsSoldByMallSellersJygModel.price.toFixed(2); 
                            list[m].show = false;
                            this.list.push(list[m]);
                            this.$forceUpdate();
                        }
                    }
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.getAlert(res.data.msg);
                }
            });
        },
        // 提示弹窗
        getAlert(str){
            this.showJump = true;
            this.err = str;
            let self = this;
            setTimeout(function(){
                self.showJump = false;
                self.err = '';
            },2000);
        },
        // 删除订单
        delOrder(){
            let formData = new FormData();
            let obj = {};
            let self = this;
            if(this.userIndex==1){
                this.list.map(function(item){
                    if(item.show){
                        formData.append('id',item.id);
                        formData.append('status',-10);
                        obj.url = self.all.baseUrl + '/shoppingCartJyg/update';
                        obj.formdata = formData;
                        self.getData(obj).then(res => {
                            if(res.data.status == 0){
                                self.getAlert('Successful deletion');
                                self.list = [];
                                self.i = 1;
                                self.getDiffData();
                            }else if(res.data.status == -95){
                                self.showJump = true;
                                self.err = 'Your account has landed elsewhere';
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    localStorage.clear();
                                    self.$router.push({
                                        path: '/Login'
                                    });
                                },1500);
                            }else{
                                self.getAlert(res.data.msg);
                            }
                        });
                    }
                });
            }else{
                this.list.map(function(item){
                    if(item.show){
                        formData.append('id',item.id);
                        formData.append('status',-10);
                        formData.append('cartStatus',0);
                        obj.url = self.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/update';
                        obj.formdata = formData;
                        self.getData(obj).then(res => {
                            if(res.data.status == 0){
                                self.getAlert('Successful deletion');
                                self.list = [];
                                self.i = 1;
                                self.getMine();
                            }else if(res.data.status == -95){
                                self.showJump = true;
                                self.err = 'Your account has landed elsewhere';
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    localStorage.clear();
                                    self.$router.push({
                                        path: '/Login'
                                    });
                                },1500);
                            }else{
                                self.getAlert(res.data.msg);
                            }
                        });
                    }
                });
            }     
        },
        // 去付款按钮点击
        toPay(id){
            this.id = id;
            this.showModel = true;
            this.showGrab = true;
            this.showPay = false;
            Scroll.stop();
        }, 
        // 点击微信或者Alipay按钮
        showBuy(i){
            this.type = i;
            let payType = "";
            let self = this;
            if(i == "Wechat"){
                payType = 5;
            }else if(i == 'Alipay'){
                payType = 3;
            }
            let idArr = [];
            let formData = new FormData();
            let obj = {};
            if(this.userIndex==0){
                this.list.map(function(item){
                    if(item.show){
                        idArr.push(item.id);
                    }
                });
                formData.append('shoppingCart',idArr.join(','));
                formData.append('theAmountActuallyPaid',this.amount);
                formData.append('modeOfPayment',payType);   
                obj = {
                    url: this.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/buy',
                    formdata: formData
                }
                this.getData(obj).then(res => {
                    if(res.data.status == 0){
                        this.codeSrc = res.data.result.src;
                        this.showGrab = false;
                        this.showPay = true;
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
                        let self = this;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        this.getAlert(res.data.msg);
                    }
                });
            }else if(this.userIndex==1){
                this.list.map(function(item){
                    if(item.show){
                        idArr.push(item.id);
                    }
                });
                formData.append('shoppingCart',idArr.join(','));
                formData.append('theAmountActuallyPaid',this.amount);
                formData.append('modeOfPayment',payType);   
                obj = {
                    url: this.all.baseUrl + '/app3dStoreIndentMainJyg/buy',
                    formdata: formData
                }
                this.getData(obj).then(res => {
                    if(res.data.status == 0){
                        this.orderId = res.data.result.indentModel.id;
                        this.codeSrc = res.data.result.src;
                        this.showGrab = false;
                        this.showPay = true;
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
                        let self = this;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        this.getAlert(res.data.msg);
                    }
                });
            }
        },
        // 关闭支付
        delBind(){
            this.showModel = false;
            this.showGrab = false;
            this.showPay = false;
            Scroll.move();
        },
        // 点击我已支付
        hasPay(){
            let self = this;
            let formData = new FormData();
            formData.append('id',this.orderId);
            let obj = {}
            obj.formdata = formData;
            if(this.userIndex==1){
                obj.url = this.all.baseUrl + '/app3dStoreIndentMainJyg/info';
                this.getData(obj).then(res => {
                    if(res.data.status==0){
                        if(res.data.result.whetherPayment==1){
                            this.showJump = true;
                            this.err = "Successful payment";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                self.i = 1;
                                self.list = [];
                                self.getDiffData();
                            },2000);
                        }else{
                            this.showJump = true;
                            this.err = "You haven't paid yet";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                Scroll.move();
                                self.getDiffData();
                            },2000);
                        }
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        this.getAlert(res.data.msg);
                    }
                });
            }else if(this.userIndex==0){
                obj.url = this.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/info';
                this.getData(obj).then(res => {
                    if(res.data.status==0){
                        if(res.data.result.whetherPayment==1){
                            this.showJump = true;
                            this.err = "Successful payment";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                self.i = 1;
                                self.list = [];
                                self.getMine();
                            },2000);
                        }else{
                            this.showJump = true;
                            this.err = "You haven't paid yet";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                Scroll.move();
                                self.getMine();
                            },2000);
                        }
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        this.getAlert(res.data.msg);
                    }
                });
            }
        },
        delPay(){
            this.hasPay();
        },
        // 滚动加载数据
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 50;
                if(bottomOfWindow && this.flag){
                    this.flag = false;
                    this.i+=1;
                    if(this.userIndex==0){
                        this.getMine();
                    }else{
                        this.getDiffData();
                    }
                }
            }
        },
        // 获取花型数据
        getMine(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('pageSize',6);
            formData.append('page',this.i);
            formData.append('cartStatus',1);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                this.flag = true;
                if(res.data.status==0){
                    let list = res.data.result.list;
                    if(res.data.result.hasNextPage==false){
                        this.flag = false;
                    }
                    for(let m=0;m<list.length;m++){
                        if(list[m].price==null){
                            list[m].price = 0;
                        }
                        if(list[m].app3dFlowerTypeJygModel){
                            list[m].price = list[m].price.toFixed(2); 
                            list[m].show = false;
                            this.list.push(list[m]);
                            this.$forceUpdate();
                        }
                    }
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    let self = this;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        self.$router.push({
                            path: '/Login'
                        });
                    },2000);
                }else{
                    this.getAlert(res.data.msg);
                }
            });
        },
        // 全选
        allClick(){
            this.check = true;
            this.allCnt++;
            this.amount = 0;
            let self = this;
            if((this.allCnt)%2){
                this.list.map(function(item){
                    item.show = true;
                    self.amount += parseFloat(item.price);
                });
                self.amount = self.amount.toFixed(2);
                this.check = false;
                this.$forceUpdate();
            }else{
                this.list.map(function(item){
                    item.show = false;
                });
                this.showBottom = false;
            }
        }
    },
    mounted(){
        this.getMine();
        this.loadData();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Encar'
            });
        }else{
            this.$router.push({
                path: '/Car'
            });
        }
    }
}
</script>
<style scoped>
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
    .grabBox{
        width: 22.5rem;
        height: 11.25rem;
        background: #fff;
        border-radius: .625rem;
        margin: 0 auto;
        position: relative;
        margin-top: 25rem;
    }
    .grabBox h3{
        padding-top: .9375rem;
        font-weight: normal;
        font-size: 1.5rem;
        margin: 0;
    }
    .grabBox .del{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        right: .5rem;
        top: .5rem;
        line-height: 1.25rem;
        text-align: cneter;
        cursor: pointer;
    }
    .del img{
        width: 100%;
        display: block;
    }
    .grabBox span{
        display: block;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox .grabWay{
        display: flex;
        justify-content: space-around;
    }
    .grabWay button{
        width: 7.8125rem;
        height: 2.5rem;
        outline: none;
        border: none;
        line-height: 2.5rem;
        color: #fff;
        background: #133ffc;
        font-size: 1.25rem;
        border-radius: .625rem;
    }
    /* 支付弹窗 */
    .payBox{
        width: 56.25rem;
        height: 37.5rem;
        margin: 0 auto;
        margin-top: calc(50vh - 18.75rem);
        border-radius: .625rem;
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
    .payDel{
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1.375rem;
        display: block;
        cursor: pointer;
        font-size: 1.5rem;
        margin-left: auto;
        margin-right: .9375rem;
    }
    .payDel img{
        display: block;
        width: 100%;
    }
    .smallBox{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .smallBox>img{
        width: 22.3125rem;
        height: 29.0625rem;
        display: block;
        flex-shrink: 0;
    }
    .smallBox h5,
    .smallBox .codeBox{
        margin: 0 auto;
    }
    .smallBox h5{
        text-align: center;
        font-size: 1.5rem;
        margin-top: 3.125rem;
        font-weight: normal;
        color: #4d4d4d;
    }
    .smallBox .codeBox{
        width: 18.75rem;
        height: 18.75rem;
        background: #fff;
        margin: 1.5625rem auto;
        box-sizing: border-box;
        padding-top: 1rem;
    }
    .codeBox img{
        display: block;
        width: 15.625rem;
        height: 15.625rem;
        margin: 0 auto;
    }
    .hasPay{
        width: 8.75rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        background: #133ffc;
        border-radius: .625rem;
        color: #fff;
        border: none;
        outline: none;
        display: block;
        cursor: pointer;
        margin: 0 auto;
    }
    .car{
        background: #eee;
        min-height: 100vh;
        box-sizing: border-box;
        padding-bottom: 6.25rem;
    }
    .content{
        margin: 0 14.375rem;
        margin-top: 5.625rem;
        padding-bottom: 2.5rem;
    }
    .proList{
        display: flex;
        flex-direction: column;
    }
    .proList li{
        display: flex;
        width: 100%;
        align-items: center;
        background: #fff;
        border: 1px solid #bababa;
    }
    .proList li:hover{
        background: #f5f5f5;
    }
    .leftBox{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .leftBox input{
        position: absolute;
        z-index: 222;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0
    }
    .backImg{
        display: block;
        width: 1rem;
        height: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        background: url('../../assets/image/user/select.png') no-repeat center center;
        background-size: 100%;
    }
    .leftBox input:checked + .backImg{
        background: url('../../assets/image/user/selected.png') no-repeat center center;
        background-size: 100%;
    }
    .main{
        width: 100%;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        display: flex;
    }
    .main label{
        display: flex;
        text-align: left;
        margin-bottom: .75rem;
        font-size: .875rem;
        height: 1rem;
    }
    .main label span:first-child{
        width: 7.8125rem;
        display: block;
    }
    .main .imgBox{
        display: flex;
        align-items: center;
        width: 10.5rem;
        justify-content: center;
        background: #fff;
        font-size: .875rem;
        margin-right: 12.5rem;
    }
    .imgBox img{
        max-width: 10.5rem;
        max-height: 13rem;
        display: block;
    }
    .descriptBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    span.special{
        color: blue;
    }
    .price{
        display: flex;
        align-items: center;
        margin-left: auto;
        color: #fb581f;
        font-size: 1.5rem;
        margin-right: 2.5rem;
    }
    .empty{
        width: 100%;
        font-size: 1.875rem;
        color: #2c2e30;
        line-height: calc(100vh - 17.5rem);
    }
    .bottomBox{
        position: fixed;
        bottom: 0;
        left: 14.375rem;
        right: 13rem;
        z-index: 888;
        height: 6.25rem;
        background: #eee;
        display: flex;
        justify-content: space-between;
    }
    .selectBox{
        display: flex;
        align-items: center;
    }
    .selectBtn{
        display: flex;
        align-items: center;
        position: relative;
    }
    .selectBtn input{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .allBack{
        display: block;
        width: 1rem;
        height: 1rem;
        margin-left: 1rem;
        margin-right: .3125rem;
        background: url('../../assets/image/user/select.png') no-repeat center center;
        background-size: 100%;
    }
    .selectBtn input:checked + .allBack{
        background: url('../../assets/image/user/selected.png') no-repeat center center;
        background-size: 100%;
    }
    .delBtn,.endBtn{
        width: 7.5rem;
        height: 2.5rem;
        background: #133ffc;
        outline: none;
        border: none;
        color: #fff;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 1.25rem;
        font-size: 1.25rem;
        margin-left: 2.5rem;
    }
    .endBtn{
        margin-left: 3.75rem;
        margin-right: 2rem;
    }
    .endBox{
        display: flex;
        justify-content: end;
        align-items: center;
    }
</style>