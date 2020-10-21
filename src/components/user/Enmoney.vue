<template>
    <div class="money">
        <!-- 提现 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <span class="line"></span>
        <div class="content" :style="{height: height}">
            <h2>Discount Record</h2>
            <p class="moneyBox">Balance<span>{{canRoyalty}}</span></p>
            <div class="applyBox">
                <span @click="applyClick">Application for cash</span>
                <div class="rightBox">
                    <div @click="changeStatus" class="clickBox">
                        <span>{{statusName}}</span>
                        <img :class="showStatus?'special':''" src="../../assets/image/user/status.png" alt="">
                    </div>
                    <div v-if="showStatus" class="statusBox">
                        <span @click="statusClick(index)" :style="{color: item.show?'#133ffc':'#333'}" v-for="(item,index) in status" :key="index">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <ul class="navList">
                <li v-for="(item,index) in arr" :key="index">{{item}}</li>
            </ul>
            <ul v-if="list.length" class="proList">
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.createTime}}</span>
                    <span>{{item.applyMoney}}</span>
                    <span>{{item.applyStatue}}</span>
                </li>
            </ul>
            <div class="nodataBox" v-if="!list.length">
                <img src="../../assets/image/user/Emoji.png" alt="">
                <span>No record</span>
            </div>
        </div>
        <ul class="pageBox" v-if="list.length">
            <li @click="prev" class="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
            <li @click="next" class="next"><img src="../../assets/image/cut/right.png" alt=""></li>
        </ul>
        <div class="model" v-if="showModel">
            <form action="" v-if="showFirst">
                <h4>Application for cash withdrawal</h4>
                <img @click="closeClick" class="close" src="../../assets/image/login/close.png" alt="">
                <label for="">
                    <span>Realname</span>
                    <input v-model="message.realname" type="text">
                </label>
                <label for="">
                    <span>Alipay</span>
                    <input v-model="message.account" type="text">
                </label>
                <label for="">
                    <span>Cash</span>
                    <input v-model='message.applyMoney' placeholder="No less than 100 yuan" type="text">
                </label>
                <label style="align-items: flex-start;" for="">
                    <span style="margin-top: .625rem;">Remarks</span>
                    <textarea v-model="message.applyCmemo" name="" id="" cols="30" rows="10"></textarea>
                </label>
                <label class="sureBox" for="">
                    <span>Platform charges 2% of cash withdrawal fee</span>
                    <button @click="sureClick">Determine</button>
                </label>
            </form>
            <div v-if="showSecond" class="successBox">
                <img class="successClose" @click="closeClick" src="../../assets/image/login/close.png" alt="">
                <img class="successImg" src="../../assets/image/user/success.png" alt="">
                <h5>Successful application</h5>
                <span>We will process your application for cash in three working days</span>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '@/components/Entab';
import Jump from '@/components/Jump';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
export default {
    name: 'Enmoney',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            showJump: false,
            err: '',
            height: '',
            tabIndex: null,
            showLoading: false,
            path: '/Enmoney',
            arr: ['Discount time','Cash withdrawal','State'],
            list: [],
            cnt: 1,
            pageNumber: '',
            applyStatue: 0,
            showStatus: false,
            statusName: 'Whole',
            canRoyalty: '',
            status: [{name: 'Whole',show: true},{name: 'Arrived',show: false},{name: 'Be audited',show: false},{name: 'Audit failure',show: false}],
            showModel: false,
            showFirst: false,
            showSecond: false,
            // 提交数据信息
            message: {
                realname: '',
                applyMoney: '',
                applyCmemo: '',
                account: ''
            }
        }
    },
    methods: {
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
        // 申请提现按钮点击
        applyClick(){
            this.showModel = true;
            this.showFirst = true;
            this.showSecond = false;
        },
        closeClick(){
            this.showModel = false;
            this.showFirst = false;
            this.showSecond = false;
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
                this.err = 'Please fill in the complete information';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else if(parseFloat(this.message.applyMoney)<100){
                this.showJump = true;
                this.err = 'No less than 100 yuan';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else if(parseFloat(this.message.applyMoney)>parseFloat(this.canRoyalty)){
                this.showJump = true;
                this.err = 'Insufficient amount';
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
                        this.err = 'Your account has landed elsewhere';
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
        getList(){
            // 3 1 -1
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            formData.append('page',this.cnt);
            formData.append('pageSize',8);
            if(this.applyStatue!=0){
                formData.append('applyStatue',this.applyStatue);
            }
            let obj = {
                url: this.all.baseUrl + '/userExtensionRoyaltyApply/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    this.pageNumber = res.data.result.pages;
                    this.list = res.data.result.list;
                    this.list.map(function(item){
                        if(item.applyStatue==-1){
                            item.applyStatue = 'Audit failure';
                        }else if(item.applyStatue==1){
                            item.applyStatue = 'Be audited';
                        }else if(item.applyStatue==3){
                            item.applyStatue = 'Arrived';
                        }
                        item.createTime = self.changeTime(item.createTime);
                    });
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
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
        // 上一页
        prev(){
            let self = this;
            if(this.cnt>1){
                this.cnt--;
                this.getList();
            }else{
                this.showJump = true;
                this.err = "It's the first page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.cnt<this.pageNumber){
                this.cnt++;
                this.getList();
            }else{
                this.showJump = true;
                this.err = "It's the last page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
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
                    this.showJump = true;
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }
            });
        }
    },
    mounted(){
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enmoney'
            });
        }else{
            this.$router.push({
                path: '/Money'
            });
        }
        this.getCode();
        this.getList();
    }
}
</script>
<style scoped>
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
        background: rgba(0,0,0,0.6);
        left: 0;
        top: 0;
        z-index: 9999;
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
    /* 申请成功结束 */
    .model form{
        position: absolute;
        display: block;
        left: calc(50% - 18.375rem);
        top: calc(50vh - 15rem);
        background: #fff;
        border-radius: .5rem;
        width: 36.75rem;
        height: 30rem;
        box-sizing: border-box;
    }
    form h4{
        color: #333;
        font-size: 1.375rem;
        font-weight: normal;
        padding: 1rem 2rem;
        text-align: left;
        border-bottom: 1px solid #c3c3c3;
        margin-bottom: 1.125rem;
    }
    form .close{
        position: absolute;
        right: 1.25rem;
        top: 1rem;
        display: block;
        width: 1.5625rem;
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
        width: 75rem;
        background: #fff;
        padding: 0 2.5625rem;
        box-sizing: border-box;
        margin: 0 auto;
        min-height: calc(100vh - 4.75rem);
    }
    .content h2{
        font-weight: normal;
        font-size: 1.875rem;
        color: #333;
        text-align: left;
        padding-top: 2.625rem;
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
    .pageBox{
        position: absolute;
        width: 100%;
        bottom: 1.25rem;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pageBox li{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #fff;
        display: flex;
        margin: 0 1.25rem;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 2px #ddd,
                    -2px -2px 2px #ddd;
    }
    .pageBox li img{
        display: block;
        width: .5rem;
        height: .9375rem;
    }
</style>