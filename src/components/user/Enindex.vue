<template>
    <div class="user">
        <!-- 个人中心首页 -->
        <Entab :path="path" @showEnglish="changeEnglish" :headPicture="headPhoto" :tabIndex="tabIndex"></Entab>
        <div class="messageBox">
            <img src="http://youchaikj.com/pc-img/vip_banner.png" alt="">
            <div class="vipDesc" v-if="showPic">
                <span>{{descript0}}</span>
                <span>{{descript}}</span>
                <span v-if="showRelevance" @click="relevance">Binding Associated Accounts</span>
            </div>
            <div class="bigBox">
                <ul class="leftBox">
                    <li @click="toLink(index,1)" v-for="(item,index) in arrOne" :key="index">
                        <img :src="item.src" alt="">
                        <h5>{{item.name}}</h5>
                    </li>
                </ul>
                <ul class="rightBox">
                    <li @click="toLink(index,2)" v-for="(item,index) in arrTwo" :key="index">
                        <img :src="item.src" alt="">
                        <h5>{{item.name}}</h5>
                    </li>
                </ul>
            </div>
        </div>
        <div class="topMessage">
            <div class="imageBox">
                <div class="avator">
                    <img :src="headPhoto" alt="">
                </div>
                <input class="file" accept="image/*" multiple type="file" @change="addImage">
            </div>
            <div class="your">
                <span v-if="showInput">{{message.nickname}}</span>
                <input @blur="changeName" v-else max-length="6" v-model="message.nickname" type="text">
                <img v-if="showInput" @click="edit" src="../../assets/image/user/edit.png" alt="">
            </div>
            <div class="identityBox">{{identity}}<span @click="changeIdentity">Modify</span></div>
            <div v-if="codeValue" class="codeBox">推广码<span>{{codeValue}}</span></div>
        </div>
        <div class="bindModel" v-if="showBind">
            <div class="bindBox">
                <div class="firstBind" v-if="!showSecond">
                    <h3>Binding List</h3>
                    <span @click="delBind" class="bindDel">
                        <img src="../../assets/image/login/close.png" alt="">
                    </span>
                    <ul class="bindList">
                        <li>
                            <div>
                                <span v-for="(item,index) in  bindName" :key="index">{{item}}</span>
                            </div>
                        </li>
                        <li>
                            <div v-for="(item,index) in  bindArr" :key="index">
                                <span>{{item.relationId}}</span>
                                <span>{{item.phone}}</span>
                                <span @click="delUser(index)">{{item.operate}}</span>
                            </div>
                        </li>
                    </ul>
                    <button class="add" @click="add">Add</button>
                </div>
                <div class="secondBind" v-if="showSecond">
                    <h3>Adding bindings</h3>
                    <label for="">
                        <span>Associate Account</span>
                        <input v-model="number" placeholder="Please enter the account" type="text">
                    </label>
                    <label for="" class="btnBox">
                        <button @click="sure">Determine</button>
                        <button @click="back">Back</button>
                    </label>
                </div>
            </div>
        </div>
        <div class="changeModel" v-if="showChange">
            <div class="identityBig">
                <div class="identityTop">
                    <h6>Modify</h6>
                    <span @click="closeIdentity" class="close"></span>
                </div>
                <ul class="identityList">
                    <li v-for="(item,index) in identityList" :key="index">
                        <input type="radio" class="radioBox" name="select" :value="index" v-model="checkValue">
                        <div class="backImg"></div>
                        <span>{{item}}</span>
                    </li>
                </ul>
                <div class="identityBtn">
                    <button @click="closeIdentity">Cancel</button>
                    <button @click="sureIdentity">Determine</button>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
let date = new Date();
export default {
    name: "Enuser",
    components: {
        Entab,
        Jump
    },
    data(){
        return {
            path: '/Enuser',
            url: '../../assets/image/user/icon_',
            arrOne: [{name: "My pattern",src: require('../../assets/image/user/icon_flower.png'),link: "/Enflower"},{name: "My material",src: require('../../assets/image/user/icon_source.png'),link: "/Ensource"},{name: "Voucher Center",src: require('../../assets/image/user/icon_vip.png'),link: "/Envip"},{name: 'Promotion Records',src: require('../../assets/image/user/icon_clock.png'),link: '/Ennotes'}],
            arrTwo: [{name: "Cash withdrawal",src: require('../../assets/image/user/icon_money.png'),link: "/Enmoney"},{name: "My order",src: require('../../assets/image/user/icon_order.png'),link: "/Enorder"},{name: "My shopping cart",src: require('../../assets/image/user/icon_car.png'),link: "/Encar"},{name: "My fabric",src: require('../../assets/image/user/icon_fabric.png'),link: "/Enfabric"}],
            // 弹窗
            showJump: false,
            err: '',
            // 个人信息
            message: {},
            tabIndex: null,
            // 到期时间描述
            showPic: false,
            showRelevance: false,
            descript0: '',
            descript: '',
            // 头像
            headPhoto: '',
            identity: '',
            // 是否可以更改名字
            showInput: true,
            // 绑定
            // 关联账号的信息
            bindArr: [],
            bindName: ["User ID","User Mobile Number","Operation"],
            // 绑定关联账输入的号码
            number: "",
            showBind: false,
            showSecond: false,
            // 修改身份弹窗
            identityList: ['Brand','Designer','Fabric','Supplier','Manufacturer'],
            checkValue: '',
            showChange: false,
            codeValue: '',
            headUrl: ''
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 绑定关联账号按钮点击
        relevance(){
            this.showBind = true;
            Scroll.stop();
            this.getList();
        },
        // 点击返回
        back(){
            this.showSecond = false;
            this.getList();
        },
        // 点击右上角×
        delBind(){
            this.showSecond = false;
            this.showBind = false;
            Scroll.move();
        },
        // 点击确定
        sure(){
            if(this.number == ""){
                this.showJump = true;
                this.err = "Please enter the relevant person's account number";
                let self = this;
                setTimeout(function(){
                    self.showJump = false;
                    self.err = "";
                },2000);
            }else{
                let formData = new FormData();
                formData.append('phone',this.number);
                let obj = {
                    url: this.all.baseUrl + '/appMemberRelation/save',
                    formdata: formData
                }
                this.getData(obj).then(res => {
                    if(res.data.status==0){
                        this.showSecond = false;
                        this.getList();
                    }else if(res.data.status==-95){
                        this.hasLogin('Your account has landed elsewhere');
                    }else{
                        this.hasError(res.data.msg);
                    }
                });
            }
        },
        // 获取绑定的信息
        getList(){
            let formData = new FormData();
            // formData.append('phone',localStorage.getItem('phone'));
            formData.append('pageSize',5);
            formData.append('page',1);
            let obj = {
                url: this.all.baseUrl + '/appMemberRelation/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    for(var i=0;i<res.data.result.list.length;i++){
                        res.data.result.list[i].operate = "Delete";
                    }
                    this.bindArr = res.data.result.list;
                }else if(res.data.status==-95){
                    this.hasLogin('Your account has landed elsewhere');
                }else{
                    this.hasError(res.data.msg);
                }
            });
        },
        // 点击添加
        add(){
            this.showSecond = true;
        },
        // 点击删除
        delUser(index){
            let formData = new FormData();
            formData.append('id',this.bindArr[index].id);
            let obj = {
                url: this.all.baseUrl + '/appMemberRelation/delete',
                formdata: formData
            }
            this.getData(obj).then(res => {
                if(res.data.status==0){
                    // this.showSecond = false;
                    this.hasError('Successful deletion');
                    this.getList();
                }else if(res.data.status==-95){
                    this.hasLogin('Your account has landed elsewhere');
                }else{
                    this.hasError(res.data.msg);
                }
            });
        },
        hasLogin(str){
            let self = this;
            Scroll.stop();
            this.showJump = true;
            this.err = str;
            setTimeout(function(){
                Scroll.move();
                localStorage.clear();
                self.showJump = false;
                self.err = '';
                self.$router.push({
                    path: '/Login'
                });
            },1500);
        },
        hasError(str){
            let self = this;
            Scroll.stop();
            this.showJump = true;
            this.err = str;
            setTimeout(function(){
                Scroll.move();
                self.showJump = false;
                self.err = '';
            },1500);
        },
        // 跳转页面
        toLink(index,num){
            if(num==1){
                this.$router.push({
                    path: this.arrOne[index].link
                });
            }else{
                this.$router.push({
                    path: this.arrTwo[index].link
                });
            }
        },
        getMessage(){
            this.message = JSON.parse(localStorage.getItem('user'));
            let identity;
            if(this.message.identity=="面料商"){
                identity = 'Brand';
            }else if(this.message.identity=="设计师"){
                identity = 'Designer';
            }else if(this.message.identity=='面料商'){
                identity = 'Fabric';
            }else if(this.message.identity=='辅料商'){
                identity = 'Supplier';
            }else{
                identity = 'Manufacturer';
            }
            this.identity = identity;
            // 企业会员
            let bussiness = Number(this.message.expirationTimePlus);
            let self = this;
            let time,year,month,day;
            // 个人会员
            let person = Number(this.message.expirationTime);
            if(date.getTime()>bussiness){
                this.showRelevance = false;
                if(date.getTime()>person){
                    this.showPic = false;
                    this.descript = 'You have not yet opened a membership';
                }else{
                    this.showPic = true;
                    time = Scroll.changeTime(person);
                    year = time.substring(0,4);
                    month = time.substring(5,7);
                    day = time.substring(8,10);
                    month = this.monthChange(month);
                    this.descript = 'Your Personal VIP will expire on the '+month+' '+day+','+year;
                }
            }else{
                this.showPic = true;
                this.showRelevance = true;
                time = Scroll.changeTime(bussiness);
                year = time.substring(0,4);
                month = time.substring(5,7);
                day = time.substring(8,10);
                month = this.monthChange(month);
                this.descript0 = 'Your Personal VIP will expire on the '+month+' '+day+','+year;
                this.descript = 'Your Enterprise VIP will expire on the '+month+' '+day+','+year;
            }
            if(!this.message.headPhoto){
                this.headPhoto = require('../../assets/image/user/avator.png');
            }else{
                this.headPhoto = this.message.headPhoto;
            }
            this.identityList.map(function(item,index){
                if(item==self.message.identity){
                    self.checkValue = index;
                }
            });
        },
        monthChange(str){
            let month;
            if(str==1){
                month = 'Jan';
            }else if(str==2){
                month = 'Feb';
            }else if(str==3){
                month = 'Mar';
            }else if(str==4){
                month = 'Apr';
            }else if(str==5){
                month = 'May';
            }else if(str==6){
                month = 'June';
            }else if(str==7){
                month = 'July';
            }else if(str==8){
                month = 'Aug';
            }else if(str==9){
                month = 'Sept';
            }else if(str==10){
                month = 'Oct';
            }else if(str==11){
                month = 'Nov';
            }else if(str==12){
                month = 'Dec';
            }
            return month;
        },
        // 点击编辑图标
        edit(){
            this.showInput = false;
        },
        change(str){
            let formData = new FormData();
            let self = this;
            let identity;
            formData.append('nickname',this.message.nickname);
            this.identityList.map(function(item,index){
                if(index==0){
                    identity = '品牌商';
                }else if(index==1){
                    identity = '设计师';
                }else if(index==2){
                    identity = '面料商';
                }else if(index==3){
                    identity = '辅料商';
                }else if(index==4){
                    identity = '制造商';
                }
                if(index==self.checkValue){
                    formData.append('identity',identity);
                }
            });
            if(str){
                formData.append('headPhoto',str);
            }
            let obj = {
                url: this.all.baseUrl + '/appuser/appUpdate',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.showJump = true;
                    this.err = 'Successful revision';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        self.showChange = false;
                        Scroll.move();
                        self.showInput = true;
                    },1500);
                    this.message.identity = this.identityList[this.checkValue];
                    this.message.headPhoto = this.headPhoto;
                    localStorage.setItem('user',JSON.stringify(this.message));
                    this.$forceUpdate(); 
                }else if(res.data.status==-95){
                    this.hasLogin('Your account has landed elsewhere');
                }else{
                    this.getAlert(res.data.msg);
                }
            });
        },
        // 更换身份
        changeIdentity(){
            this.showChange = true;
        },
        changeName(){
            this.change();
        },
        closeIdentity(){
            this.showChange = false;
        },
        sureIdentity(){
            this.change();
        },
        getCode(){
            let formData = new FormData();
            let self = this;
            let obj = {
                url: this.all.baseUrl + '/userExtensionCode/get',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.codeValue = res.data.result.codeValue;
                }else if(res.data.status==-95){
                    this.hasLogin('Your account has landed elsewhere');
                }else{
                    this.getAlert(res.data.msg);
                }
            });
        },
        addImage(e){
            let self = this;
            if(e.target.files.length>1){
                this.showJump = true;
                this.err = 'Cannot select multiple pictures';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else{
                let files = e.target.files[0];
                this.headUrl = files;
                if (!e || !window.FileReader) return; // 看支持不支持FileReader
                let reader = new FileReader();
                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function(){
                    // 增加一个
                    self.showLoading = true;
                    let formData = new FormData();
                    formData.append('file',self.headUrl);
                    let obj = {
                        url: self.all.baseUrl + '/file/upload',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        self.headPhoto = res.data.result;
                        self.change(res.data.result);
                    });
                }
            }
        }
    },
    mounted(){
        if(localStorage.getItem('qfc')){
            this.arrOne = [{name: "My pattern",src: require('../../assets/image/user/icon_flower.png'),link: "/Enflower"},{name: "My material",src: require('../../assets/image/user/icon_source.png'),link: "/Ensource"},{name: "Voucher Center",src: require('../../assets/image/user/icon_vip.png'),link: "/Envip"}];
            this.arrTwo = [{name: "My order",src: require('../../assets/image/user/icon_order.png'),link: "/Enorder"},{name: "My shopping cart",src: require('../../assets/image/user/icon_car.png'),link: "/Encar"},{name: "My fabric",src: require('../../assets/image/user/icon_fabric.png'),link: "/Enfabric"}];
        }
        this.getMessage();
        this.getCode();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enuser'
            });
        }else{
            this.$router.push({
                path: '/User'
            });
        }
    }
}
</script>
<style scoped>
    .user{
        background: #eee;
        min-height: 100vh;
    }
    .messageBox{
        position: relative;
    }
    .messageBox>img{
        display: block;
        width: 100%;
        height: 38.625rem;
    }
    .vipDesc{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 9.375rem;
        color: #fff;
        font-size: 1.875rem
    }
    .vipDesc span{
        display: block;
        margin-bottom: 1.5625rem;
    }
    .vipDesc span:nth-child(2){
        width: 11.875rem;
        height: 3.5rem;
        margin: 0 auto;
        line-height: 3.5rem;
        text-align: center;
        border-radius: 1.75rem;
        background: #ffffff;
        color: #333;
        font-size: 1.25rem;
        cursor: default;
    }
    /* 绑定关联账号 */
    .bindModel{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 9999;
    }
    .bindBox{
        width: 43.75rem;
        height: 26.25rem;
        margin: 12.5rem auto 0;
    }
    .bindBox h3{
        font-size: 1.625rem;
        padding-top: .3125rem;
        color: #494949;
        font-weight: normal;
    }
    .bindDel{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }
    .bindDel img{
        display: block;
        width: 100%;
    }
    .bindList{
        margin-top: .9375rem;
        color: #4d4d4d;
    }
    .bindList li:first-child{
        font-weight: bold;
    }
    .bindList div{
        display: flex;
        margin-bottom: .25rem;
        justify-content: space-around;
    }
    .bindList span{
        display: block;
        width: 30%;
    }
    .add{
        width: 7.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #2c2e30;
        color: #fff;
        border-radius: .625rem;
        border: none;
        font-size: 1.25rem;
        outline: none;
        position: absolute;
        bottom: 2.1875rem;
        left: calc(50% - 3.75rem);
    }
    .firstBind{
        height: 100%;
        background: #fff;
        position: relative;
        border-radius: .625rem;
    }
    .secondBind{
        height: 100%;
        background: #fff;
        position: relative;
        border-radius: .625rem;
    }
    .secondBind h3{
        padding-top: 2.8125rem;
        margin-bottom: 3.75rem;
    }
    .secondBind label{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        color: #4d4d4d;
    }
    .secondBind input{
        width: 20.625rem;
        height: 4.6875rem;
        color: #2c2e30;
        margin-left: 2.5rem;
    }
    :-ms-input-placeholder{
        font-style: italic;
        font-size: 1.5rem;
    }
    ::-webkit-input-placeholder{
        font-size: 1.5rem;
        font-style: italic;
    }
    :-moz-placeholder{
        font-size: 1.5rem;
        font-style: italic;
    }
    .btnBox{
        position: absolute;
        bottom: 2.1875rem;
        width: 100%;
    }
    .btnBox button{
        display: block;
        margin: 1.5625rem;
        font-size: 1.25rem;
        width: 7.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #2c2e30;
        color: #fff;
        border-radius: .625rem;
        border: none;
        outline: none;
    }
    .bigBox{
        width: 100%;
        z-index: 11;
        position: absolute;
        display: flex;
        bottom: 7rem;
        left: 0;
        justify-content: space-between;
    }
    .bigBox ul{
        width: calc(50% - 4.625rem);
        display: flex;
        position: relative;
        z-index: 6666;
        justify-content: space-around;
    }
    .bigBox ul.leftBox{
        float: left;
    }
    .bigBox ul.rightBox{
        float: right;
    }
    .bigBox li{
        box-sizing: border-box;
        color: #fff;
        font-size: 1.25rem;
        font-weight: normal;
        cursor: default;
    }
    .bigBox img{
        display: block;
        margin: 0 auto .5rem;
    }
    .topMessage{
        width: 100%;
    }
    .imageBox{
        margin-top: -10rem;
        position: relative;
    }
    .imageBox input{
        z-index: 12;
        position: absolute;
        width: 9.25rem;
        height: 9.25rem;
        left: calc(50% - 4.625rem);
        top: 0;
        opacity: 0;
    }
    .avator{
        width: 9.25rem;
        height: 9.25rem;
        border-radius: 50%;
        box-shadow: 2px 2px 2px #d8d8d8;
        margin: 0 auto;
        display: flex;
        overflow: hidden;
        background: #fff;
        justify-content: center;
        align-items: center;
    }
    .avator img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .your{
        color: #333;
        margin-top: .625rem;
        font-size: 1.875rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .your img{
        display: block;
        width: 1.75rem;
        height: 1.6875rem;
    }
    .your span{
        display: block;
        padding-top: 0.25rem;
        margin-right: .5625rem;
    }
    .your input{
        display: block;
        max-width: 11.8rem;
        margin-right: .5625rem;
        background: inherit;
        outline: none;
        text-align: center;
        border: none;
        font-size: 1.875rem;
    }
    .identityBox{
        font-size: 1.125rem;
        color: rgba(51,51,51,0.6);
    }
    .identityBox span{
        font-size: 1.125rem;
        color: #133ffc;
        margin-right: .3125rem;
        margin-left: .3125rem;
        cursor: default;
    }
    /* 推广码 */
    .codeBox{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8d8d8d;
        font-size: 1rem;
        margin-top: .25rem;
    }
    .codeBox span{
        display: block;
        margin-left: .9375rem;
    }
    /* 修改身份弹窗 */
    .changeModel{
        position: fixed;
        width: 100%;
        background: rgba(0,0,0,0.6);
        top: 0;
        height: 100vh;
        left: 0;
        z-index: 9999;
    }
    .identityBig{
        position: absolute;
        width: 34.875rem;
        height: 14rem;
        top: calc(50vh - 7rem);
        left: calc(50% - 17.4375rem);
        background: #fff;
        border-radius: .3125rem;
    }
    .identityTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 1.875rem;
        height: 3.8125rem;
        padding-right: 1rem;
        border-bottom: 1px solid #8d8d8d;
    }
    .identityTop h6{
        font-weight: normal;
        color: #333;
        font-size: 1.5rem;
    }
    .identityTop span{
        width: 1.125rem;
        height: 1.125rem;
        display: block;
        background: url('../../assets/image/login/close.png') no-repeat center center;
        background-size: 100%;
    }
    .identityList{
        display: flex;
        height: 5.0625rem;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #8d8d8d;
    }
    .identityList li{
        display: flex;
        position: relative;
        align-items: center;
        margin: 1rem;
    }
    .identityList input{
        position: absolute;
        left: 0;
        width: 100%;
        top: calc(50% - .5625rem);
        opacity: 0;
        height: 1.125rem;
        z-index: 222;
    }
    .backImg{
        width: 1.125rem;
        height: 1.125rem;
        margin-right: .3125rem;
        background: url('../../assets/image/login/noselect.png') no-repeat center center;
        background-size: 100%;
    } 
    .identityList input:checked + .backImg{  
        background: url('../../assets/image/login/hasselect.png') no-repeat center center;
        background-size: 100%;
    }
    .identityBtn{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .identityBtn button{
        width: 6.3125rem;
        height: 2.5rem;
        display: block;
        background: inherit;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 1.25rem;
        background: inherit;
        outline: none;
        font-size: 1rem;
        margin-top: 1.3125rem;
        margin-left: 1.25rem;
    }
    .identityBtn button:last-child{
        background: #133ffc;
        border-color: #133ffc;
        color: #fff;
        margin-right: 3.125rem;
    }
</style>