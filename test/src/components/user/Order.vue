<template>
    <div class="order">
        <!-- 我的订单 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <Usertab v-on:setUserIndex="getUserIndex" :arr="arr"></Usertab>
        <div class="content">
            <div class="flower">
                <ul v-if="list.length">
                    <li v-for="(item,index) in list" :key="index">
                        <div class="top">
                            <div class="leftBox">
                                <img src="../../assets/image/user/select.png" alt="">
                            </div>
                            <span class="time">{{item.createTime}}</span>
                            <span v-if="list[index].whetherPayment==0" class="status">未支付</span>
                            <span v-else class="status">交易完成</span>
                        </div>
                        <div class="main" v-for="(child,childIndex) in childList[index]" :key="childIndex">
                            <div v-if="userIndex==1" class="imgBox"><img :src="child.picture1" alt=""></div>
                            <div v-if="userIndex==0" class="imgBox"><img :src="child.preview" alt=""></div>
                            <div class="descriptBox">
                                <label v-if="userIndex==1" for="">
                                    <span>工作室</span>
                                    <span class="special">浙江有柴科技有限公司</span>
                                </label>
                                <label for="">
                                    <span>编号</span>
                                    <span>{{child.id}}</span>
                                </label>
                                <label for="">
                                    <span>格式</span>
                                    <span v-if="userIndex==1">psd</span>
                                    <span v-if="userIndex==0">{{child.format}}</span>
                                </label>
                                <label for="">
                                    <span>尺寸</span>
                                    <span>{{child.sizeWidth}}×{{child.sizeHeight}}</span>
                                </label>
                                <label for="">
                                    <span>分辨率</span>
                                    <span>{{child.resolutionRatio}}</span>
                                </label>
                                <label for="">
                                    <span>分层</span>
                                    <span v-if="userIndex==1">是</span>
                                    <span v-if="userIndex==0">否</span>
                                </label>
                            </div>
                            <div class="price">￥{{child.price}}</div>
                        </div>
                        <div class="bottom">
                            <span v-if="list[index].whetherPayment==0" class="allMoney">总额：￥{{item.amount}}</span>
                            <div class="btnBox" v-if="list[index].whetherPayment==0">
                                <button class="btn" @click="toPay(item.id)">去付款</button>
                                <button @click="delOrder(item.id)" class="btn">取消订单</button>
                            </div>
                            <div class="btnBox" v-else><button @click="delOrder(item.id)" class="btn">删除</button></div>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty">空空如也</div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump> 
        <!-- 弹窗 -->
        <div class="model" v-if="showModel">
            <!-- 立即抢购弹窗 -->
            <div class="grabBox" v-if="showGrab">
                <h3>提示</h3>
                <p class="del" @click="delBind">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>选择支付方式</span>
                <div class="grabWay">
                    <button @click="showBuy('微信')">微信</button>
                    <button @click="showBuy('支付宝')">支付宝</button>
                </div>
            </div>
            <div class="payBox" v-if="showPay">
                <span @click="delPay" class="payDel">
                    <img src="../../assets/image/login/close.png" alt="">
                </span>
                <div class="smallBox">
                    <img src="../../assets/image/shopping/pay.png" alt="">
                    <div class="code">
                        <h5>请打开{{type}}扫码支付</h5>
                        <div class="codeBox"><img :src="codeSrc" alt=""></div>
                        <button @click="hasPay" class="hasPay">我已支付</button>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Usertab from '../../components/Usertab';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
import Loading from '../../components/Loading';
export default {
    name: 'Order',
    components: {
        Tab,
        Usertab,
        Jump,
        Loading
    },
    data(){
        return {
            path: '/Order',
            tabIndex: null,
            showJump: false,
            err: '',
            showLoading: false,
            userIndex: 0,
            // 向子组件传值
            arr: [{name: "花型",color: "#2f2f2f",showTangle: true},{name: "商城花型",color: "#8d8d8d",showTangle: false}],
            // 商城花型
            list: [],
            childList: [],
            // 分页选择
            i: 1,
            // 支付弹窗
            id: "",
            showModel: false,
            showGrab: false,
            showPay: false,
            codeSrc: '',
            // 用来标记是否需要在加载数据
            flag: true
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 获取子组件传来的值
        getUserIndex(e){
            this.userIndex = e;
            this.i = 1;
            this.list = [];
            this.childList = [];
            if(this.userIndex==0){
                this.getMine();
            }else{
                this.getDiffData();
            }
        },
        // 获取花型商城数据
        getDiffData(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',4);
            formData.append('page',this.i);
            let obj = {
                url: this.all.baseUrl + '/app3dStoreIndentMainJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                this.flag = true;
                if(res.data.status==0){
                    console.log(res)
                    let list = res.data.result.list;
                    if(res.data.result.hasNextPage==false){
                        this.flag = false;
                    }
                    let amount = [];
                    for(let m=0;m<list.length;m++){
                        amount.push(0);
                        for(let n=0;n<list[m].indentSubsidiaryModels.length;n++){
                            list[m].indentSubsidiaryModels[n].price = list[m].indentSubsidiaryModels[n].price.toFixed(2);
                            amount[m] += parseFloat(list[m].indentSubsidiaryModels[n].price);
                        }
                        this.childList.push(list[m].indentSubsidiaryModels);
                        list[m].createTime = Scroll.changeTime(list[m].createTime);
                        list[m].amount = amount[m];
                    }
                    for(let i=0;i<list.length;i++){
                        this.list.push(list[i]);
                        this.$forceUpdate();
                    }
                    console.log(this.list)
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = '您的账号已在其它地方登陆';
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
        delOrder(str){
            let formData = new FormData();
            let self = this;
            formData.append('id',str);
            let obj = {};
            if(this.userIndex==1){
                obj.url = this.all.baseUrl + '/app3dStoreIndentMainJyg/delete';
                obj.formdata = formData;
                this.getData(obj).then(res => {
                    if(res.data.status == 0){
                        this.getAlert('删除成功');
                        this.list = [];
                        this.childList = [];
                        this.i = 1;
                        this.getDiffData();
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = '您的账号已在其它地方登陆';
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
            }else{
                obj.url = this.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/delete';
                obj.formdata = formData;
                this.getData(obj).then(res => {
                    if(res.data.status == 0){
                        this.getAlert('删除成功');
                        this.list = [];
                        this.childList = [];
                        this.i = 1;
                        this.getMine();
                    }else if(res.data.status == -95){
                        this.showJump = true;
                        this.err = '您的账号已在其它地方登陆';
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
        // 去付款按钮点击
        toPay(id){
            this.id = id;
            this.showModel = true;
            this.showGrab = true;
            this.showPay = false;
            Scroll.stop();
        }, 
        // 点击微信或者支付宝按钮
        showBuy(i){
            this.type = i;
            let self = this;
            let payType = "";
            if(i == "微信"){
                payType = 5;
            }else if(i == '支付宝'){
                payType = 3;
            }
            let formData = new FormData();
            formData.append('id',this.id);
            formData.append('modeOfPayment',payType);
            let obj = {
                url: this.all.baseUrl + '/app3dStoreIndentMainJyg/payment',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status == 0){
                    this.codeSrc = res.data.result.src;
                    this.showGrab = false;
                    this.showPay = true;
                }else if(res.data.status == -95){
                    this.showJump = true;
                    this.err = '您的账号已在其它地方登陆';
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
            formData.append('id',this.id);
            let obj = {
                url: this.all.baseUrl + '/app3dStoreIndentMainJyg/info',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    if(res.data.whetherPayment==1){
                        this.showJump = true;
                        this.err = "支付成功";
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
                        this.err = "您还未支付";
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = "";
                            self.showModel = false;
                            Scroll.move();
                        },2000);
                    }
                }else if(res.data.status == -95){
                    this.showJump = true;
                    this.err = '您的账号已在其它地方登陆';
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
            formData.append('pageSize',4);
            formData.append('page',this.i);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/list',
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
                    let amount = [];
                    for(let m=0;m<list.length;m++){
                        amount.push(0);
                        for(let n=0;n<list[m].indentSubsidiaryModels.length;n++){
                            list[m].indentSubsidiaryModels[n].price = list[m].indentSubsidiaryModels[n].price.toFixed(2);
                            amount[m] += parseFloat(list[m].indentSubsidiaryModels[n].price);
                        }
                        this.childList.push(list[m].indentSubsidiaryModels);
                        list[m].createTime = Scroll.changeTime(list[m].createTime);
                        list[m].amount = amount[m];      
                    }
                    for(let i=0;i<list.length;i++){
                        this.list.push(list[i]);
                        this.$forceUpdate();
                    }
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = '您的账号已在其它地方登陆';
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
    mounted(){
        this.getMine();
        this.loadData();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enorder'
            });
        }else{
            this.$router.push({
                path: '/Order'
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
    .order{
        background: #eee;
        min-height: 100vh;
    }
    .content{
        margin: 0 14.375rem;
        margin-top: 5.625rem;
        padding-bottom: 2.5rem;
    }
    .top{
        height: 3.75rem;
        background: #dcdcdc;
        text-align: left;
        display: flex;
        line-height: 3.75rem;
        align-items: center;
        color: #000;
    }
    .top .leftBox,
    .main .imgBox{
        display: flex;
        align-items: center;
        width: 25%;
        font-size: .875rem;
    }
    .time{
        font-size: .875rem;
    }
    .leftBox img{
        display: block;
        width: 1rem;
        height: 1rem;
        margin-left: .625rem;
    }
    .codeNumber{
        margin-left: 1.25rem;
        font-size: .875rem;
    }
    .status{
        margin-left: auto;
        margin-right: 1.5625rem;
    }
    .main{
        border: 1px solid #b9b9b9;
        border-bottom: none;
        border-top: none;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        background: #fff;
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
    .imgBox img{
        width: 10.5rem;
        height: 13rem;
        display: block;
        margin-left: 2.875rem;
    }
    .descriptBox{
        padding-top: .3125rem;
    }
    span.special{
        color: blue;
    }
    .price{
        height: 13rem;
        line-height: 13rem;
        margin-left: 5.625rem;
        color: #fb581f;
        font-size: 1.5rem;
    }
    .bottom{
        display: flex;
        justify-content: flex-end;
        background: #fff;
        padding-bottom: 1.25rem;
        padding-right: 4.375rem;
        border: 1px solid #b9b9b9;
        border-top: none;
    }
    .allMoney{
        font-size: 1.5rem;
        color: #fb581f;
        height: 6.5rem;
        line-height: 6.5rem;
    }
    .btnBox{
        margin-left: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .btnBox .btn{
        width: 7.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border: none;
        outline: none;
        border-radius: 1.25rem;
        color: #fff;
        background: #133ffc;
        font-size: 1rem;
        margin: .375rem 0;
    }
    .empty{
        width: 100%;
        font-size: 1.875rem;
        color: #2c2e30;
        line-height: calc(100vh - 17.5rem);
    }
</style>