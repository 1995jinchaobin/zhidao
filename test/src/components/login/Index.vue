<template>
    <div class="login">
        <div class="content">
            <div class="logoBox">
                <div class="navList">
                    <img src="../../assets/image/login/preLogo.png" alt="">
                </div>
                <p class="nameBox">让设计<span>变得更简单</span></p>
            </div>
            <div class="formBox">
                <form action="" v-if="showArr">
                    <ul class="btnList">
                        <li @click="toOther(index)" v-for="(item,index) in newArr" :class="item.show?'btnLi':''" :key="index">{{item.name}}</li>
                    </ul>
                    <div class="hBox">
                        <h2>登录</h2>
                        <p>没有账号？立即<router-link to="/Register">注册</router-link></p>
                    </div>
                    <label for="">
                        <img src="../../assets/image/login/phone.png" alt="">
                        <input v-model="phoneNumber" placeholder="手机号" type="text">
                    </label>
                    <label for="">
                        <img src="../../assets/image/login/password.png" alt="">
                        <input v-model="pass" placeholder="密码" type="password">
                    </label>
                    <div class="changeBox">
                        <!-- <p><span @click="langChange(0)">中</span><span>|</span><span @click="langChange(1)">EN</span></p> -->
                        <router-link :to='{path: "/Forget",query: {number: phoneNumber}}'>忘记密码</router-link>
                    </div>  
                    <button @click="toSubmit" class="btn">登录</button>
                </form>
                <form action="" v-if="!showArr">
                    <ul class="btnList">
                        <li @click="toOther(index)" v-for="(item,index) in newArr" :class="item.show?'btnLi':''" :key="index">{{item.name}}</li>
                    </ul>
                    <iframe width="100%" height="375px" src="https://www.tnc.com.cn/service/zdy/login.html" frameborder="0"></iframe>
                </form>
                <p class="patnerBox">技术支持<span @click="toYouchai">浙江有柴科技有限公司</span><span @click="toQfc">浙江中国轻纺城网络有限公司</span></p>
            </div>
        </div>
        <div class="model" v-if="tigShow">
            <div class="content">
                <div class="tigBox">
                    <img src="../../assets/image/login/error.png" alt="">
                    <p>{{tig}}</p>
                </div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>    
</template>
<script>
import Loading from '../../components/Loading';
export default {
    name: 'Login',
    components: {
        Loading
    },
    data(){
        return {
            pass: "",
            phoneNumber: '',
            tig: '',
            tigShow: false,
            uuid: '',
            newArr: [{name: '有柴科技',show: true},{name: '网上轻纺城',show: false}],
            showArr: true,
            showLoading: false
        }
    },
    methods: {
        toYouchai(){
            window.location.href = 'http://www.youchaikj.com/';
        },
        toQfc(){
            window.location.href = 'https://www.tnc.com.cn/';
        },
        // 获取用户购物车数量
        getOrderNum(){
            let obj = {
                url: this.all.baseUrl + '/new/shoppingCart/getShoppingCount',
                formdata: new FormData()
            }
            this.getData(obj).then(res=>{
                if(res.data.status == 0){
                    localStorage.removeItem('orderNum');
                    localStorage.setItem("orderNum",res.data.result)
                }
            })
        },
        // 轻纺城登陆
        toOther(index){
            this.newArr.map(function(item){
                item.show = false;
            });
            this.newArr[index].show = true;
            if(index==0){
                this.showArr = true;
            }else{
                this.showArr = false;
            }
        },
        // 唯一标识符
        generateUUID(){
            var d = new Date().getTime();
            if(window.performance && typeof window.performance.now === "function"){
                d += performance.now();
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
                var r = (d+Math.random()*16)%16|0;
                d = Math.floor(d / 16);
                return (c=='x'?r:(r&0x3|0x8)).toString(16);
            });
            uuid="web_"+uuid;
            this.uuid = uuid;
        },
        // 登陆点击
        toSubmit(event){
            // 阻止页面刷新
            event.preventDefault();
            let self = this;
            if(this.phoneNumber == '' || this.pass == ''){
                this.tig = "账号和密码不能是空的";
                this.tigShow = true;
                setTimeout(function(){
                    self.tig = '';
                    self.tigShow = false;
                },1000);
            }else{
                this.showLoading = true;
                let formData = new FormData();
                formData.append('phone',this.phoneNumber);
                formData.append('password',this.pass);
                formData.append('userFrom',4);
                let obj = {
                    url: this.all.baseUrl + '/appuser/login',
                    formdata: formData
                }
                this.getData(obj).then(res =>{
                    if(res.data.status == 0){
                        // 设置全局变量
                        this.all.token = res.data.result.token;
                        this.all.userMessage = res.data.result.user;
                        localStorage.setItem('token',res.data.result.token);
                        localStorage.setItem('userId',res.data.result.user.id);
                        localStorage.setItem('phone',this.phoneNumber);
                        localStorage.setItem('suitIndex',1);
                        localStorage.removeItem('ssoSign');
                        let user = JSON.stringify(res.data.result.user);
                        localStorage.setItem('user',user);
                        localStorage.setItem('nickname',res.data.result.user.nickname);
                        localStorage.setItem('headPhoto',res.data.result.user.headPhoto);
                        localStorage.setItem("expirationTime",res.data.result.user.expirationTime);
                        localStorage.setItem("expirationTimePlus",res.data.result.user.expirationTimePlus);
                        //  _czc.push(["_setCustomVar","用户来源",res.data.result.user.userFrom,1]);
                        this.getOrderNum();
                        // loginName identity身份设计师 phone
                        // 页面跳转
                        // 如果用户是在花型设计二级页面被弹回来的则返回花型设计二级页面
                        if(localStorage.getItem('operateList')){
                            setTimeout(function(){
                                self.showLoading = false;
                                self.$router.push({
                                    path: '/Newoperate'
                                });
                            },1000);
                        }else{
                            setTimeout(function(){
                                self.showLoading = false;
                                self.$router.push({
                                    path: '/Select'
                                });
                            },1000);
                        }
                    }else{
                        this.showLoading = false;
                        this.tig = res.data.msg;
                        this.tigShow = true;
                        setTimeout(function(){
                            self.tig = '';
                            self.tigShow = false;
                        },1000);
                    }
                });
            }
        },
        // 点击选择语言
        langChange(index){
            if(index==0){
                localStorage.removeItem('English');
                this.$router.push({
                    path: '/Login'
                });
            }else if(index==1){
                localStorage.setItem('English',true);
                this.$router.push({
                    path: '/Enlogin'
                });
            }
        }
    },
    mounted(){
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enlogin'
            });
        }else{
            this.$router.push({
                path: '/Login'
            });
        }
    }
}
</script>
<style scoped>
    .login{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: url('../../assets/image/login/back.png') no-repeat center;
        background-size: cover;
    }
    .content{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        height: 100vh;
        box-sizing: border-box;
    }
    .logoBox{
        float: left;
        padding-top: 14.6875rem;
    }
    .navList{
        overflow: hidden;
    }
    .navList img{
        float: left;
        display: block;
        width: 30.5rem;
    }
    .nameBox{
        font-size: 60px;
        color: #fff;
        margin-top: 180px;
        letter-spacing: 4px;
        text-align: left;
        margin-left: 100px;
        position: relative;
    }
    .nameBox:before{
        content: '';
        position: absolute;
        width: 60px;
        height: 48px;
        top: -0;
        left: -100px;
        background: url('../../assets/image/login/left.png') no-repeat center;
        background-size: 100%;
    }
    .nameBox:after{
        content: '';
        position: absolute;
        width: 60px;
        height: 48px;
        bottom: 24px;
        right: -88px;
        background: url('../../assets/image/login/right.png') no-repeat center;
        background-size: 100%;
    }
    .nameBox span{
        display: block;
        margin-left: 86px;
    }
    .formBox{
        float: right;
        overflow: hidden;
    }
    .formBox form{
        display: block;
        width: 400px;
        height: 450px;
        background: #fff;
        margin-right: 108px;
        overflow: hidden;
        margin-top: calc(50vh - 225px);
    }
    /* 按钮选择登陆方式 */
    .btnList{
        width: 354px;
        height: 75px;
        box-sizing: border-box;
        display: flex;
        margin: 0 auto;
        align-items: flex-end;
        justify-content: center;
        border-bottom: 1px solid #eee;
    }
    .btnList li{
        margin: 0 45px;
        color: #666;
        font-size: 18px;
        padding-bottom: 12px;
        cursor: default;
        border-bottom: 2px solid #fff;
    }
    .btnList li.btnLi{
        color: #0261d5;
        border-bottom: 2px solid #0261d5;
    }
    /* 标题 */
    .hBox{
        display: flex;
        justify-content: space-between;
        padding: 0 38px;
        margin-top: 40px;
        align-items: center;
    }
    .hBox h2{
        font-size: 24px;
        text-align: left;
        color: #333;
    }
    .hBox p{
        color: #808080;
        font-size: 14px;
    }
    .hBox p a{
        color: #0261d5;
    }
    /* 输入 */
    form label{
        display: flex;
        margin: 0 auto;
        margin-top: 28px;
        width: 330px;
        height: 50px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        align-items: center;
    }
    form label img{
        width: 22px;
        margin-left: 8px;
        display: block;
        margin-right: 20px;
    }
    form label input{
        font-size: 14px;
        outline: none;
        border: none;
        color: #333;
        width: 250px;
        display: block;
        height: 45px;
        background: #fff;
    }
    .changeBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 38px;
        margin-top: 25px;
    }
    .changeBox p{
        font-size: 12px;
        color: #2870dc;
    }
    .changeBox p span{
        margin-right: 4px;
        cursor: default;
    }
    .changeBox a{
        font-size: 12px;
        color: #333;
    }
    /* 登陆样式 */
    form .btn{
        border: none;
        outline: none;
        width: 330px;
        height: 55px;
        background: #2870dc;
        margin: 0 auto;
        margin-top: 10px;
        font-size: 18px;
        display: block;
        color: #fff;
    }
    /* 战略合作伙伴 */
    .formBox .patnerBox{
        color: #fff;
        margin-top: 10px;
        font-size: 14px;
        text-align: left;
    }
    .patnerBox span{
        display: inline-block;
        margin-left: 8px;
        cursor: pointer;
    }
    .patnerBox span:hover{
        color: #bbb;
    }
    /* 提示弹窗 */
    .model{
        width: 100%;
        left: 0;
        z-index: 99999;
        position: fixed;
        top: 0;
        height: 100vh;
        background: rgba(0,0,0,0.6);
    }
    .tigBox{
        position: absolute;
        width: 400px;
        height: 50px;
        top: calc(50% - 25px);
        right: 108px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #333;
    }
</style>