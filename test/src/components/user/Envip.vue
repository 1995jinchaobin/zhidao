<template>
    <div class="vip">
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div v-if="!showQfc">
            <!-- vip页面 -->
            <div class="content">
                <div class="messageBox">
                    <img class="topImage" src="http://youchaikj.com/pc-img/vip_back.png" alt="">
                    <div class="message">
                        <h4>Opening up VIP members of efficient enterprises</h4>
                        <div class="lineBox"><span class="line"></span><span>Multiuser Dynamic Binding</span><span class="line"></span></div>
                        <button class="rightnow" @click="nowBuy(enterprise[0].id,enterprise[0].price)">Access at once</button>
                    </div>
                </div>
                <h1>Choose a VIP package that suits you</h1>
                <ul class="listBox">
                    <li v-for="(item,index) in enterprise" :key="'bussiness'+index" class="bussiness">
                        <div class="icon">
                            <img src="../../assets/image/user/bussiness.png" alt="">
                        </div>
                        <div  class="frash" v-if="item.activityType==2">
                            <span>Taste Fresh</span>
                            <img src="../../assets/image/user/icon_present.png" alt="">
                        </div>
                        <span class="month">{{item.duration}} months</span>
                        <span class="price">{{item.currentPrice}}</span>
                        <span class="oldPrice">Original price￥{{item.originalCost}}</span>
                        <button class="btn" @click="nowBuy(item.id,item.price)">Grab at once</button>
                        <span class="extra">Can bind {{item.memberNum}} additional people</span>
                        <span class="allLine" style="color: #333;font-size: 1.125rem;">Infinite use of AI design</span>
                        <span class="allLine">Free Model+VIP Model</span>
                        <span class="allLine">Infinite Export of HD Pictures</span>
                        <span class="allLine">Infinite use pattern design</span>
                        <span class="allLine">Infinite Use of Intelligent Matting</span>
                    </li>
                    <li class="bussiness" v-for="(item,index) in arr" :key="'people'+index">
                        <div class="icon">
                            <img src="../../assets/image/user/people.png" alt="">
                        </div>
                        <div  class="frash" v-if="item.activityType==2">
                            <span>Taste Fresh</span>
                            <img src="../../assets/image/user/icon_present.png" alt="">
                        </div>
                        <span class="month">{{item.duration}} months</span>
                        <span class="price">{{item.currentPrice}}</span>
                        <span class="oldPrice">Original price￥{{item.originalCost}}</span>
                        <button class="btn" @click="nowBuy(item.id,item.price)">Grab at once</button>
                        <span class="oneLine allLine">Free Model+VIP Model</span>
                        <span class="allLine">Infinite Export of HD Pictures</span>
                        <span class="allLine">Infinite use pattern design</span>
                        <span class="allLine">Infinite Use of Intelligent Matting</span>
                    </li>
                </ul>
            </div>
            <!-- 弹窗 -->
            <div class="model" v-if="showModel">
                <!-- 立即抢购弹窗 -->
                <div class="grabBox" v-if="showGrab">
                    <h3>Tigs</h3>
                    <p class="del" @click="delBind">
                        <img src="../../assets/image/login/close.png" alt="">
                    </p>
                    <!-- <span>Choose payment method</span> -->
                    <label for="">
                        <span>Extension Code</span>
                        <input v-model="codeNumber" type="text" maxlength="6">
                    </label>
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
            <div v-if="showTig" class="tig"><span>{{tig}}</span></div>
        </div>
        <iframe v-if="showQfc" width="100%" height="1481px" :src="src" frameborder="0"></iframe>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Scroll from '../../assets/js/scroll.js';
let date = new Date();
function get_num(a) {
    switch (a) {
        case 1:
            window.open("https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14924");
            break;
        case 0:
            window.open("https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14923");
            break;
        case 2:
            window.open("https://www.tnc.com.cn/service/zdy/indexEnterprisePay.html?id=14925");
            break;
        default:
            break;
    }
}
export default {
    name: 'Envip',
    components: {
        Entab
    },
    data(){
        return {
            path: '/Envip',
            tabIndex: null,
            // 个人信息
            message: {},
            // 显示绑定关联账号按钮显示
            // bus: false,
            showModel: false,
            // 显示抢购弹窗
            showGrab: false,
            // 提示
            tig: "",
            showTig: false,
            // 支付类型 Wechat或者Alipay
            type: '',
            showPay: false,
            // 存储哪种类型的会员
            id: '',
            price: '',
            // 会员信息
            enterprise: [],
            arr: [],
            // 二维码图片
            codeSrc: '',
            codeNumber: '',
            src: '',
            showQfc: false
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 点击删除操作
        delUser(index){
            let formData = new FormData();
            formData.append('id',this.bindArr[index].id);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/appMemberRelation/delete'
            }
            this.getData(obj).then(res=>{
                if(res.data.status == 0){
                    this.getList();
                }else if(res.data.status==-95){
                    this.hasLogin();
                }else{
                    this.hasError(res);
                }
            });
        },
        // 点击立即抢购
        nowBuy(id,price){
            this.id = id;
            this.price = price;
            this.showModel = true;
            this.showGrab = true;
            Scroll.stop();
        },
        // 点击Wechat或者Alipay按钮
        showBuy(i){
            this.type = i;
            let payType = "";
            if(i == "Wechat"){
                payType = 5;
            }else if(i == 'Alipay'){
                payType = 3;
            }
            let formData = new FormData();
            formData.append('activityId',this.id);
            formData.append('typeOfActivity',1);
            formData.append('payType',payType);
            formData.append('codeValue',this.codeNumber);
            formData.append('paymentAmount',this.price.toFixed(2));
            let obj = {
                url: this.all.baseUrl + '/appPurchaseTimeJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status == 0){
                    this.codeSrc = res.data.result.result.src;
                    this.showGrab = false;
                    this.showPay = true;
                }else if(res.data.status == -95){
                    this.hasLogin();
                }else{
                    this.hasError(res);
                }
            });
        },
        // 如果被登陆了
        hasLogin(){
            this.showTig = true;
            this.tig = "Your account has landed elsewhere";
            Scroll.stop();
            localStorage.clear();
            var self = this;
            setTimeout(function(){
                self.showTig = false;
                self.tig = '';
                Scroll.move();
                self.$router.push({
                    path: '/Login'
                });
            },2000);
        },
        // 出错
        hasError(res){
            this.showTig = true;
            this.tig = res.data.msg;
            var self = this;
            Scroll.stop();
            setTimeout(function(){
                self.showTig = false;
                Scroll.move();
                self.tig = '';
            },2000);
        },
        // 点击我已支付
        hasPay(){
            let obj = {
                url: this.all.baseUrl + '/appuser/appInfo',
                formdata: new FormData()
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    var self = this;
                    if(res.data.result.expirationTimePlus!=JSON.parse(localStorage.getItem('user')).expirationTimePlus || res.data.result.expirationTime!=JSON.parse(localStorage.getItem('user')).expirationTime){
                        this.showTig = true;
                        this.tig = "Successful recharge";
                        localStorage.setItem('user',res.data.result);
                        setTimeout(function(){
                            self.showTig = false;
                            self.tig = "";
                            self.showModel = false;
                            self.showPay = false;
                            self.setData();
                        },2000);
                    }else{
                        this.showTig = true;
                        this.tig = "You haven't paid yet";
                        setTimeout(function(){
                            self.showTig = false;
                            self.tig = "";
                            self.showModel = false;
                            self.showPay = false;
                            Scroll.move();
                        },2000);
                    }
                }else if(res.data.status == -95){
                    this.hasLogin();
                }else{
                    this.hasError(res);
                }
            });
        },
        // 点击添加
        add(){
            this.showSecond = true;
        },
        // 点击右上角×
        delBind(){
            this.showModel = false;
            this.showGrab = false;
            Scroll.move();
        },
        delPay(){
            this.hasPay();
        },
        // 会员套餐接口请求
        getVip(){
            let formData = new FormData();
            let obj = {
                url: this.all.baseUrl + '/app3dTheMemberPriceJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res =>{
                if(res.data.status == 0){
                    let output = res.data.result;
                    for(var i=0;i<output.length;i++){
                        output[i].price = output[i].currentPrice;
                        output[i].originalCost = this.changePrice(output[i].originalCost)+".00";
                        output[i].currentPrice = this.changePrice(output[i].currentPrice)+".00";
                        if(output[i].memberType==2){
                            this.enterprise.push(output[i]);
                        }else{
                            this.arr.push(output[i]);
                        }
                    }
                    this.enterprise = [this.enterprise[1],this.enterprise[0]];
                    this.arr = [this.arr[1],this.arr[2],this.arr[3],this.arr[0]];
                }else if(res.data.status==-95){
                    this.hasLogin();
                }else{
                    this.hasError(res);
                }
            });
        },
        // 递归实现价格转化
        changePrice(str){
            let res = str.toString();
            if(res.length<=3){
                return res;
            }else{
                return this.changePrice(res.substr(0,res.length-3))+','+res.substr(res.length-3,res.length);
            }
        },
        setData(){
            // 获取信息
            this.message = JSON.parse(localStorage.getItem('user'));
        }
    },
    mounted(){
        if(localStorage.getItem('qfc')){
            this.showQfc = true;
            // var aBox = document.createElement('a');
            // aBox.target = '_blank';
            // aBox.href = 'https://www.tnc.com.cn/service/zdy/indexTemp.html?ssoSign='+localStorage.getItem('ssoSign');
            // aBox.click();
            this.src = 'https://www.tnc.com.cn/service/zdy/indexTemp.html?ssoSign='+localStorage.getItem('ssoSign')+'&isWeb=web';
            // this.$router.go(-1);
        }else{
            this.showQfc = false;
            this.src = '';
        }
        this.setData();
        this.getVip();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Envip'
            });
        }else{
            this.$router.push({
                path: '/Vip'
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
    .tig{
        position: fixed;
        z-index: 99999;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        bottom: 0;
    }
    .tig span{
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
    .vip{
        background: #eee;
        min-height: 100vh;
        box-sizing: border-box;
        padding-bottom: 3.75rem;
        width: 100%;
    }
    .topImage{
        width: 100%;
        display: block;
        height: 30.9375rem;
    }
    .messageBox{
        position: relative;
    }
    .message{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        color: #fff;
    }
    .message h4{
        padding-top: 6.875rem;
        color: #febe64;
        font-size: 3.75rem;
        font-weight: normal;
    }
    .lineBox{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.875rem;
        margin-top: .875rem;
    }
    .lineBox .line{
        width: 6.25rem;
        height: 1px;
        background: #fff;
        position: relative;
        z-index: 100;
        margin: .9375rem;
    }
    .rightnow{
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
    .vip h1{
        margin-top: 1.875rem;
        margin-bottom: 2.5rem;
        font-size: 1.875rem;
        color: #333;
        font-weight: normal;
    }
    .listBox{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .grabBox label{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox label input{
        width: 6.25rem;
        outline: none;
        border: 1px solid #333;
        margin-left: .5rem;
        padding: 0 .25rem;
        border-radius: .25rem;
    }
    .bussiness{
        width: 15.125rem;
        height: 33rem;
        background: #fff;
        box-shadow: 2px 2px 4px #cdcdcd;
        position: relative;
        margin: 0 .625rem;
        margin-bottom: 4.375rem;
        border-radius: .3125rem;
    }
    .bussiness span{
        display: block;
    }
    .bussiness .month{
        color: #333;
        font-size: 1.25rem;
        padding-top: 2.875rem;
    }
    .bussiness .price{
        color: #ff9501;
        font-weight: bold;
        font-size: 2.5rem;
        padding-top: 1.8125rem;
    }
    .bussiness .oldPrice{
        color: #333;
        font-size: 1rem;
        text-decoration: line-through;
        padding-top: 1.1875rem;
    }
    .bussiness .btn{
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
    .bussiness .extra{
        margin-top: 1.5rem;
        font-size: 1.125rem;
        margin-bottom: .875rem;
    }
    .bussiness .oneLine{
        margin-top: 1.5rem;
    }
    .bussiness .allLine{
        margin-bottom: .875rem;
        font-size: 1rem;
        color: rgba(51,51,51,0.7);
    }
    .bussiness .icon{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 4.125rem;
    }
    .icon img{
        display: block;
        margin-top: .625rem;
        margin-left: .625rem;
        width: 5.375rem;
        height: 2rem;
    }
    /* 绑定关联账号按钮样式 */
    .relevance{
        background: #2c2e30;
        color: #fff;
        width: 8.6%;
        height: 3.125rem;
        line-height: 3.125rem;
        outline: none;
        border: none;
        border-radius: .625rem;
        position: absolute;
        top: 6.25rem;
        right: 6%;
    }
    .frash{
        position: absolute;
        top: 0;
        right: 0;
        width: 6.125rem;
        height: 6.125rem;
    }
    .frash span{
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
    .frash img{
        display: block;
        width: 6.125rem;
    }
</style>