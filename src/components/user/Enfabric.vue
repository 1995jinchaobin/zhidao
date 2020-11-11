<template>
    <div class="fabric">
        <!-- 我的面料 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="fabricBox">
            <div class="topBox">
                <div @click="backClick" class="backBox">
                    <img src="../../assets/image/user/icon_back.png" alt="">
                    <span>Back</span>
                </div>
            </div>
            <div class="content">
                <ul class="productBox">
                    <li>
                        <div class="notExist" @click="addClassify">
                            <div class="existImg">
                                <img src="../../assets/image/user/icon_add.png" alt="">
                                <span>Creating Categories</span>
                            </div>
                        </div>
                    </li>
                    <li v-for="(item,index) in list" :key="index">
                        <img @click="toDetail(index)" width="100%" class="proImg" :src="item.typeImage" alt="">
                        <span class="name">{{item.typeName}}</span>
                        <div class="edit" @click="editClick(index)">Edit</div>
                    </li>
                    <li class="opacLi" :key="'info'+index" v-for="(item,index) in seize" ></li>
                </ul>
            </div>
        </div>
        <div class="editModel" v-if="showEdit">
            <div class="editBox">
                <div class="closeBox"><img @click="closeEdit" class="close" src="../../assets/image/user/close.png" alt=""></div>
                <h5>{{title}}</h5>
                <div class="editTitle">
                    <span>Title</span>
                    <input v-if="showDel" v-model="youTitle" type="text">
                    <input v-else type="text" v-model="addTitle">
                </div>
                <div class="editBtn">
                    <span class="editDel" @click="delClassify" v-if="showDel">Delete Categories</span>
                    <div class="sureBox">
                        <button @click="closeEdit" class="cancel">Cancel</button>
                        <button @click="sureEdit">Determine</button>
                    </div>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Enfabric',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Enfabric',
            tabIndex: null,
            // 提示弹窗
            showJump: false,
            err: '',
            // 数据加载
            showLoading: false,
            // 类别
            list: [],
            // 用来控制样式
            seize: [],
            // 分页
            cnt: 1,
            flag: false,
            // 编辑弹窗
            showEdit: false,
            title: '',
            showDel: true,
            youTitle: '',
            addTitle: '',
            // 记录编辑的是哪个
            tangle: ''
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 创建分类
        addClassify(){
            this.showEdit = true;
            this.title = "Establish";
            this.showDel = false;
            this.tangle = -1;
            Scroll.stop();
        },
        editClick(index){
            this.showEdit = true;
            this.title = 'Edit';
            this.showDel = true;
            this.tangle = index;
            this.youTitle = this.list[index].typeName;
            Scroll.stop();
        },
        // 返回个人中心页面
        backClick(){
            this.$router.push({
                path: '/Enuser'
            });
        },
        // 关闭编辑弹窗
        closeEdit(){
            this.showEdit = false;
            Scroll.move();
        },
        // 删除分类
        delClassify(){
            let formData = new FormData();
            let self = this;
            formData.append('id',this.list[this.tangle].id);
            formData.append('status',-10);
            let obj ={
                url: this.all.baseUrl + '/app3dFlowerMyUploadType/update',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.showEdit = false;
                    this.showJump = true;
                    this.err = 'Successful deletion';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                    Scroll.move();
                    this.cnt = 1;
                    this.list = [];
                    this.getMessage();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },1000);
                }
            });
        },
        // 点击确定
        sureEdit(){
            let self = this;
            if(this.tangle == -1){
                // 新增一个
                // /app3dFlowerMyUploadType/save
                let formData = new FormData();
                formData.append('typeName',this.addTitle);
                let obj ={
                    url: this.all.baseUrl + '/app3dFlowerMyUploadType/save',
                    formdata: formData
                }
                if(this.addTitle){
                    this.getData(obj).then(res=>{
                        if(res.data.status==0){
                            this.showJump = true;
                            this.err = 'Successful new construction';
                            Scroll.stop();
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = '';
                                Scroll.move();
                                self.showEdit = false;
                                self.cnt = 1;
                                self.list = [];
                                self.getMessage();
                            },1000);
                        }else if(res.data.status==-95){
                            this.showJump = true;
                            this.err = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = 'Your account has landed elsewhere';
                                Scroll.move();
                                localStorage.clear();
                                self.$router.push({
                                    path: '/Login'
                                });
                            },1000);
                        }else{
                            this.showJump = true;
                            Scroll.stop();
                            this.err = res.data.msg;
                            setTimeout(function(){
                                self.showJump = false;
                                Scroll.move();
                                self.err = '';
                            },1000);
                        }
                    }); 
                }else{
                    this.showJump = true;
                    this.err = 'The title should not be blank';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }else{
                // 修改
                let formData = new FormData();
                formData.append('id',this.list[this.tangle].id);
                formData.append('status',0);
                formData.append('typeName',this.youTitle);
                let obj ={
                    url: this.all.baseUrl + '/app3dFlowerMyUploadType/update',
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
                            Scroll.move();
                            self.showEdit = false;
                            self.cnt = 1;
                            self.list = [];
                            self.getMessage();
                        },1000);
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = 'Your account has landed elsewhere';
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },1000);
                    }else{
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        },1000);
                    }
                });
            }
        },
        auto(){
            if((this.list.length+1)%5==2){
                this.seize = [true,true,true];
            }else if((this.list.length+1)%5==3){
                this.seize=[true,true];
            }else if((this.list.length+1)%5==4){
                this.seize=[true];
            }else{
                this.seize = [];
            }
        },
        getMessage(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',14);
            formData.append('page',this.cnt);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUploadType/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    if(res.data.result.hasNextPage){
                        this.flag = true;
                    }
                    let result = res.data.result.list;
                    for(let i=0;i<result.length;i++){
                        this.list.push(result[i]);
                    }
                    this.list.map(function(item){
                        if(!item.typeImage){
                            item.typeImage = require('../../assets/image/user/fabric_back.png');
                        }
                    });
                    this.auto();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 滚动加载数据
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 50;
                if(bottomOfWindow && this.flag){
                    this.flag = false;
                    this.cnt+=1;
                    this.getMessage();
                }
            }
        },
        toDetail(index){
            localStorage.setItem('fabricId',this.list[index].id);
            this.$router.push({
                path: '/Enupfabric',
                query: {
                    id: this.list[index].id
                }
            });
        }
    },
    mounted(){
        this.getMessage();
        this.loadData();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enfabric'
            });
        }else{
            this.$router.push({
                path: '/Fabric'
            });
        }
    }
}
</script>
<style scoped>
    /* 编辑弹窗 */
    .editModel{
        position: fixed;
        top: 0;
        height: 100vh;
        left: 0;
        right: 0;
        z-index: 9998;
        background: rgba(51, 51, 51, 0.6);
    }
    .editBox{
        width: 36.75rem;
        height: 14rem;
        position: fixed;
        z-index: 9999;
        top: calc(50vh - 7rem);
        left: 50%;
        margin-left: -18.725rem;
        background: #fff;
        border-radius: .3125rem;
        text-align: left;
    }
    .closeBox{
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 1.625rem;
        height: 1.625rem;
        z-index: 99999;
    }
    .editBox .close{
        width: 1.625rem;
        height: 1.625rem;
        display: block;
    }
    .editBox h5{
        font-size: 1.5rem;
        color: #333;
        padding: 1.1875rem 1.875rem;
        font-weight: normal;
        position: relative;
    }
    .editBox h5:after{
        content: '';
        width: 36.75rem;
        height: .0625rem;
        background: #b4b4b4;
        bottom: 0;
        left: 0;
        position: absolute;
    }
    .editTitle{
        padding: 1.25rem 0;
        padding-left: 1.875rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.25rem;
        color: #2c2e30;
        position: relative;
    }
    .editTitle:after{
        position: absolute;
        width: 36.75rem;
        height: .0625rem;
        background: #b4b4b4;
        bottom: 0;
        left: 0;
        content: '';
    }
    .editTitle input{
        width: 27.875rem;
        display: block;
        margin-left: .875rem;
        height: 2.5rem;
        box-sizing: border-box;
        padding-left: .625rem;
        outline: none;
    }
    .editBtn{
        padding: 0 1.875rem;
        overflow: hidden;
    }
    .editDel{
        float: left;
        font-size: 1.25rem;
        color: #333;
        cursor: pointer;
        margin-top: 1.375rem;
    }
    .sureBox{
        float: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .sureBox button{
        margin-top: .9375rem;
        display: block;
        margin-left: 1.25rem;
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        border-radius: 1.25rem;
        color: #fff;
        font-size: 1.25rem;
        text-align: center;
        outline: none;
        border: none;
    }
    .sureBox button.cancel{
        background: #fff;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
    }
    .fabric{
        min-height: 100vh;
        background: #eee;
        box-sizing: border-box;
    }
    .fabricBox{
        padding: 0 14.375rem;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1.375rem auto 0;
    }
    .backBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1rem;
        color: #585858;
        cursor: default;
    }
    .backBox img{
        width: .625rem;
        height: 1rem;
        display: block;
        margin-right: .5rem;
    }
    .delBox img{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
    }
    .noData{
        font-size: 1.75rem;
        margin-top: 18rem;
        color: #8d8d8d;
    }
    .productBox{
        overflow: hidden;
        margin: 0 auto;
        margin-top: 1.25rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 1.25rem;
    }
    .productBox li{
        overflow: hidden;
        width: 17.5rem;
        height: 25.9375rem;
        background: #fff;
        border-radius: .3125rem;
        margin-bottom: .9375rem;
        position: relative;
        box-sizing: border-box;
        padding: 1.125rem;
        display: flex;
        align-items: center;
        box-shadow: 1px 1px 1px #ddd;
    }
    .productBox li.opacLi{
        opacity: 0;
    }
    .notExist{
        width: 15.3125rem;
        height: 23.75rem;
        border: .0625rem dashed rgba(51, 51, 51, 1);
        position: relative;
    }
    .existImg{
        color: rgba(51, 51, 51, 0.6);
        font-size: 1.125rem;
        top: 8.75rem;
        position: absolute;
        width: 100%;
    }
    .notExist img{
        width: 2.375rem;
        height: 2.375rem;
        display: block;
        margin: 0 auto;
        margin-bottom: .3125rem;
    }
    .proImg{
        display: block;
        max-height: 23.75rem;
    }
    .productBox .name{
        color: #fefefe;
        width: 100%;
        position: absolute;
        top: 1.375rem;
        left: 1.375rem;
        font-size: 1.5rem;
        text-align: left;
    }
    .productBox .edit{
        position: absolute;
        bottom: 1.125rem;
        left: 1.125rem;
        background: #6d7272;
        color: #fff;
        font-size: 1.5rem;
        height: 3.25rem;
        width: 15.25rem;
        line-height: 3.25rem;
        cursor: default;
    }
</style>