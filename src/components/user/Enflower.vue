<template>
    <div class="flower">
        <!-- 我的花型 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <Enusertab v-on:setUserIndex="getUserIndex" :arr="arr"></Enusertab>
        <div class="myFlower">
            <div class="topBox" v-if="usertab==0">
                <div class="classify"><span @click="classSelect(index)" :class="item.isOnly?'only':''" v-for="(item,index) in classify" :key="index">{{item.name}}</span></div>
                <div v-if="!showBig" class="imageBox">
                    <img class="delImage" @click="allClick" src="../../assets/image/user/icon_del.png" alt="">
                </div>
                <div v-else class="delBox">
                    <img @click="allSelected" :src="isClick?allUrl:allnewUrl" alt="">
                    <span>All election</span>
                    <button @click="del" class="delBtn">Delete</button>
                    <button @click="cancel" class="delBtn">Cancel</button>
                </div>
            </div>
            <div class="content">
                <div v-if="!proList.length" class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>Absolutely empty</span>
                </div>
                <ul class="productBox" v-else>
                    <li @click="toDetail(index)" v-for="(item,index) in proList" :key="index">
                        <div v-if="showBig" @click="selectPro(index,$event)" class="clickBox">
                            <input :checked="item.show" type="checkbox">
                            <span></span>
                        </div>
                        <img v-if="usertab==0" class="productImg" :src="item.app3dFlowerTypeJygModel.preview" alt="">
                        <img v-if="usertab==1" class="productImg" :src="item.indentSubsidiaryModels[0].picture1" alt="">
                        <div v-if="usertab==0" @click="download($event,index)" class="download">
                            <span></span>
                        </div>
                        <div v-if="usertab==1" @click="download($event,index)" class="downloadBox">
                            <span @click="downpsd($event,index)">Download PSD</span>
                            <span @click="download($event,index)">Download HD picture</span>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="pageBox" v-if="pageNumber!=0">
                <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
            </ul>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Jump from '../../components/Jump';
import Enusertab from '../../components/Enusertab';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Enflower',
    components: {
        Entab,
        Loading,
        Jump,
        Enusertab
    },
    data(){
        return {
            path: '/Enflower',
            showJump: false,
            err: '',
            tabIndex: null,
            showLoading: false,
            arr: [{name: 'My pattern',color: "#2f2f2f",showTangle: true},{name: 'Shopping Mall Flower Style',color: "#8d8d8d",showTangle: false}],
            classify: [{name: 'Whole',isOnly: true},{name: 'Not purchased',isOnly: false},{name: 'Purchased',isOnly: false}],
            proList: [],
            // 全选点击
            isClick: false,
            // 点击批量删除
            showBig: false,
            allUrl: require('../../assets/image/user/selected.png'),
            allnewUrl: require('../../assets/image/user/select.png'),
            // nav
            usertab: 0,
            payStatus: '',
            // 分页器
            page: [],
            cnt: 1,
            pageNumber: '',
            flag: 0,
            pageIndex: 1
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        getUserIndex(e){
            this.usertab = e;
            this.cnt = 1;
            this.pageNumber = '';
            this.page  = [];
            this.flag = 0;
            this.proList = [];
            this.pageIndex = 1;
            this.getMessage();
        },
        // 去详情页
        toDetail(index){
            localStorage.setItem('detailList',JSON.stringify(this.proList[index]));
            localStorage.setItem('detailType',this.usertab);
            this.$router.push({
                path: '/Endetail',
                query: {
                    message: this.proList[index],
                    type: this.usertab
                }
            });
        },
        // 全部，已付和未付点击
        classSelect(index){
            if(index==0){
                this.payStatus = '';
            }else if(index==1){
                this.payStatus = 0;
            }else if(index==2){
                this.payStatus = 1;
            }
            this.cnt = 1;
            this.pageNumber = '';
            this.page  = [];
            this.flag = 0;
            this.pageIndex = 1; 
            this.getMessage();
            this.classify.map(function(item){
                item.isOnly = false;
            });
            this.classify[index].isOnly = true;
        },
        // 点击删除图片
        allClick(){
            this.showBig = true;
        },
        // 删除
        del(){
            let self = this;
            let message = false;
            let idArr = [];
            this.proList.map(function(item){
                if(item.show){
                    message = true;
                }
            });
            if(message){
                let formData = new FormData();
                this.proList.map(function(item){
                    if(item.show){
                        idArr.push(item.id);
                    }
                });
                let obj = {};
                if(this.usertab==0){
                    idArr.map(function(item){
                        self.getNew(item)
                    });
                }
            }else{
                Scroll.stop();
                this.showJump = true;
                this.err = 'Please select the picture first';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        },
        getNew(str){
            let formData = new FormData();
            formData.append('cartStatus',0);
            formData.append('id',str);
            formData.append('myStatus',0);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/update',
                formdata: formData
            }
            let self = this;
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.cnt = 1;
                    self.pageNumber = '';
                    self.page  = [];
                    self.flag = 0;
                    self.isClick = false;
                    self.pageIndex = 1;
                    self.err = 'Successful deletion';
                    self.showJump = true;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        self.getMessage();
                    },1500);
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = 'Your account has landed elsewhere';
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
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    });
                }
            });

        },
        // 取消
        cancel(){
            this.showBig = false;
        },
        // 点击全选框
        allSelected(){
            this.isClick = !this.isClick;
            this.proList.map((item)=>{
                if(this.isClick){
                    item.show = true
                }else{
                    item.show = false;
                }
            });
        },
        // 点击单个花型选择
        selectPro(index,ev){
            if(ev && ev.stopPropagation) {
                //非IE浏览器
                ev.stopPropagation();
            } else {
                //IE浏览器(IE11以下)
                ev.cancelBubble = true;
            }
            this.proList[index].show = !this.proList[index].show;
        },
        // 下载PSD
        downpsd(e,index){
            if(e.stopPropagation){       
                e.stopPropagation();          
            }else{     
                e.cancelBubble=true;      
            }
            window.location.href=this.all.baseUrl+"/file/download?url="+this.proList[index].indentSubsidiaryModels[0].sourceFile;
        },
        // 下载
        download(e,index){
            if(e.stopPropagation){       
                e.stopPropagation();          
            }else{     
                e.cancelBubble=true;      
            }  
            if(e.stopPropagation){       
                e.stopPropagation();          
            }else{     
                e.cancelBubble=true;      
            }  
            this.showLoading = true;
            let self = this;
            let id;
            let formData = new FormData();
            if(this.usertab==0){
                id = this.proList[index].app3dFlowerTypeJygModel.id;
            }else{
                id = this.proList[index].indentSubsidiaryModels[0].id;
            }
            formData.append('id',id);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeJyg/hd',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    // window.location.href=this.all.baseUrl+"/file/download?url="+res.data.result;
                    setTimeout(function(){
                        self.showLoading = false;
                    },5000);
                    window.location.href = this.all.baseUrl+'/file/flower?id='+id;
                }else if(res.data.result==-95){
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
        },
        getMessage(){
            let self = this;
            let formData = new FormData();
            let obj = {}
            this.showLoading = true;
            Scroll.stop();
            if(this.usertab==0){
                formData.append('pageSize',10);
                formData.append('page',this.cnt);
                formData.append('myStatus',1);
                if(this.payStatus!==''){
                    formData.append('payStatus',this.payStatus);
                }
                obj.url = this.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/list';
                obj.formdata = formData;
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                        Scroll.move();
                    },500);
                    let result;
                    if(res.data.status==0){
                        result = res.data.result;
                        result.list.map(function(item){
                            item.show = false;
                        });
                        this.proList = result.list;
                        this.pageNumber = result.pages;
                        this.pageAuto();
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
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
                        this.showJump = true;
                        this.err = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        });
                    }
                });
            }else if(this.usertab==1){
                formData.append('pageSize',10);
                formData.append('page',this.cnt);
                formData.append('whetherPayment',1);
                obj.url = this.all.baseUrl + '/app3dStoreIndentMainJyg/list';
                obj.formdata = formData;
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                        Scroll.move();
                    },500);
                    let result;
                    if(res.data.status==0){
                        result = res.data.result;
                        this.proList = result.list;
                        this.pageNumber = result.pages;
                        this.pageAuto();
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        this.err = 'Your account has landed elsewhere';
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
                        this.showJump = true;
                        this.err = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        });
                    }
                });
            }
        },
        // 初始化分页器
        pageAuto(){
            if(!this.page.length){
                if(this.pageNumber<=7){
                    for(let i=0;i<this.pageNumber;i++){
                        this.page.push({name: i+1});
                    }
                }else{
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4}
                    ,{name: 5},{name: '···'},{name: this.pageNumber}];
                }
            }
        },
        // 分页器每个点击
        btnClick(index){
            if(this.pageNumber<=7){
                this.flag = 0;
                this.cnt = index+1;
                this.getMessage();
                this.pageIndex = index+1;
            }else{
                // 状态0
                if(this.flag==0){
                    if(index==5){

                    }else if(index==4){
                        this.cnt = this.page[index].name;
                        if(this.pageNumber-this.cnt<=3){
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.getMessage();
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getMessage();
                            this.pageIndex = 4;
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getMessage();
                        this.pageIndex = 7;
                    }else{
                        this.cnt = this.page[index].name;
                        this.getMessage();
                        this.pageIndex = index+1;
                    }
                }else if(this.flag==1){
                    if(index==1||index==5){

                    }else{
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            // 点击首页
                            this.pageIndex = this.cnt;
                            this.flag = 0;
                            this.getMessage();
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getMessage();
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getMessage();
                        }
                    }
                }else if(this.flag==2){
                    if(index==1){

                    }else if(index==2){
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            this.flag = 0;
                            this.pageIndex = this.cnt;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.getMessage();
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getMessage();
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getMessage();
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getMessage();
                    }
                }
            }
        },
        // 上一页
        prev(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt==1){
                    this.showJump = true;
                    this.err = "It's the first page";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }else{
                    this.cnt-=1;
                    this.pageIndex-=1;
                    this.getMessage();
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);this.getMessage();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getMessage();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getMessage();
                    }
                }else{
                    this.showJump = true;
                    this.err = "It's the first page";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt<this.pageNumber){
                    this.cnt+=1;
                    this.pageIndex+=1;
                    this.getMessage();
                }else{
                    this.showJump = true;
                    this.err = "It's the last page";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }else{
                if(this.cnt<this.pageNumber){
                    this.cnt++;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getMessage();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getMessage();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getMessage();
                    }
                }else{
                    this.showJump = true;
                    this.err = "It's the last page";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        }
    },
    mounted(){
        this.getMessage();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enflower'
            });
        }else{
            this.$router.push({
                path: '/Flower'
            });
        }
    }
}
</script>
<style scoped>
    .flower{
        min-height: 100vh;
        background: #eee;
        height: 100%;
    }
    .myFlower{
        margin-top: 1rem;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 14.375rem;
    }
    .classify{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #8d8d8d;
        font-size: 1rem;
    }
    .classify span{
        padding: 0 .625rem;
        height: 1.75rem;
        line-height: 1.75rem;
        background: inherit;
        color: #8d8d8d;
        display: block;
        margin-right: 1.25rem;
        cursor: default;
        border-radius: .875rem;
        font-size: 1rem;
        border: 1px solid #8d8d8d;
    }
    .classify span.only{
        color: #fff;
        border: 1px solid #133ffc;
        background: #133ffc;
    }
    .imageBox{
        height: 2.5rem;
    }
    .delImage{
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin-right: 4.125rem;
    }
    .delBox{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 1.2rem;
        margin-right: 4.125rem;
    }
    .delBox img{
        width: 1rem;
        height: 1rem;
        display: block;
        margin-right: .75rem;
        margin-top: .125rem;
    }
    .delBtn{
        width: 5.625rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border: none;
        outline: none;
        margin-left: 1.25rem;
        border-radius: 1.25rem;
        color: #fff;
        background: #133ffc;
        cursor: default;
        font-size: 1rem;
    }
    /* 没有数据 */
    .noData{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 15rem;
    }
    .noData img{
        margin-right: 1.25rem;
    }
    .noData span{
        margin-top: 1.25rem;
    }
    .content{
        margin: 0 14.375rem;
    }
    .productBox{
        margin-top: 1.6875rem;
        padding-bottom: 6.25rem;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
    }
    .productBox li{
        background: #fff;
        border-radius: .5rem;
        box-shadow: 2px 2px 2px #d5d6da;
        overflow: hidden;
        width: 17.5rem;
        height: 25.9375rem;
        margin-right: .75rem;
        margin-bottom: 1.25rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .productImg{
        max-width: 17.5rem;
        max-height: 25.9375rem;
        display: block;
        width: 100%;
    }
    .download{
        position: absolute;
        z-index: 77;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid #eee;
        border-radius: .3125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        top: .625rem;
        right: .625rem;
    }
    .download:hover{
        background: #133ffc;
        border-color: #133ffc;
    }
    .download span{
        background: url('../../assets/image/user/download.png') no-repeat center center;
        background-size: 100%;
        display: block;
        width: 1.375rem;
        height: 1.375rem;
    }
    .download:hover span{
        background: url('../../assets/image/user/whitedown.png') no-repeat center center;
        background-size: 100%;
    }
    .clickBox{
        position: absolute;
        z-index: 78;
        width: 2.1875rem;
        height: 2.1875rem;
        border-radius: 50%;
        top: .75rem;
        left: .75rem;
    }
    .clickBox input{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        z-index: 222;
        left: 0;
        display: block;
    }
    .clickBox span{
        width: 2.1875rem;
        height: 2.1875rem;
        display: block;
        margin: 0 auto;
        background: url('../../assets/image/user/tgb-20px.png') no-repeat center center;
        background-size: 100%;
    }
    .clickBox input:checked + span{      
        background: url('../../assets/image/user/tg-20px.png') no-repeat center center;
        background-size: 100%;
    }
    .downloadBox{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: .625rem;
        left: 0;
        width: 100%;
    }
    .downloadBox span{
        display: block;
        width: 7.5rem;
        height: 2.5rem;
        border-radius: .625rem;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        margin: 0 .3125rem;
        font-size: 1rem;
    }
    /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 1.625rem;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        box-shadow: .125rem .125rem .125rem #ddd;
        border-radius: 50%;
        margin: 0 .3125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    ul.pageBox li.click{
        background: #133ffc;
        color: #fff;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
</style>