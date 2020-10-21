<template>
    <div class="matching">
        <!-- AI配色 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">   
            <div class="imgBox">
                <img class="bigImage" src="../../assets/image/ai/ai.png" alt="">
            </div>
            <div class="count">
                <img src="../../assets/image/ai/count.png" alt="">
                <div class="fileBox">
                    <input id="uploaderInput" accept="image/*" multiple type="file" @change="add"/>
                    <button class="localBtn">本地上传</button>
                    <span @click="flowerClick" class="flowerBtn">从我的花型上传</span>
                </div>
            </div>
        </div>
        <div class="model" v-if="showFlower">
            <div class="modelBox">
                <img @click="modelClose" class="modelClose" src="../../assets/image/login/close.png" alt="">
                <ul class="productBox" v-if="proList.length">
                    <li @click="toDetail(index)" v-for="(item,index) in proList" :key="index">
                        <img class="productImg" v-if="item.type == 1||item.type == 2" :src="item.flowerType.preview" alt="">
                        <img class="productImg" v-else-if="item.type == 3" :src="item.storeIndentSubsidiary.picture1" alt="">
                    </li>
                </ul>
                <div class="noData" v-else>
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>暂无数据</span>
                </div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Matching',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            tabIndex: 2,
            showJump: false,
            err: '',
            showLoading: false,
            path: '/Matching',
            url: '',
            showFlower: false,
            cnt: 1,
            pageNumber: '',
            proList: [],
            flag: 0,
            page: [],
            pageIndex: 1
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        modelClose(){
            this.showFlower = false;
        },
        add(e){
            let self = this;
            let file = e.target.files;
            if (file[0].size > 20971520) {
                this.showJump = true;
                this.err = "文件大小超过20MB";
                setTimeout(function() {
                    self.showJump = false;
                    self.err = "";
                }, 2000);
            }else{
                if(file.length>1){
                    this.showJump = true;
                    this.err = '不能上传多个图片';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }else{
                    self.showLoading=true;
                    let files = e.target.files[0];
                    this.url = files;
                    if (!e || !window.FileReader) return; // 看支持不支持FileReader
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function(){
                        let formData = new FormData();
                        formData.append('file',self.url);
                        let obj = {
                            url: self.all.baseUrl + '/file/upload',
                            formdata: formData
                        }
                        self.getData(obj).then(res=>{
                            //  _czc.push(["_trackEvent","AI配色","本地上传","","","uploaderInput"]);
                            
                            let json = {
                                preview: res.data.result,
                                id: 0
                            }
                            localStorage.setItem('matchList',JSON.stringify(json));
                            self.showLoading=false;
                            self.$router.push({
                                path: '/Changecolour'
                            });
                        });
                    }
                }
            }
        },
        toDetail(index){
            let json;
            if(this.proList[index].type == 1|| this.proList[index].type == 2){
                json = this.proList[index].flowerType;
            }else{
                json = this.proList[index].storeIndentSubsidiary;
            }
            localStorage.setItem('matchList',JSON.stringify(json));
            this.$router.push({
                path: '/Changecolour'
            });
        },
        getList(){
            let self = this;
            let formData = new FormData();
            let obj = {}
            this.showLoading = true;
            Scroll.stop();
            formData.append('pageSize',99);
            formData.append('page',1);
            obj.url = this.all.baseUrl + '/new/userFlowers/list';
            obj.formdata = formData;
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result.list;
                    this.proList = result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        Scroll.move();
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
                this.getList();
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
                            this.getList();
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            this.getList();
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7;
                        this.getList();
                    }else{
                        this.cnt = this.page[index].name;
                        this.pageIndex = index+1;
                        this.getList();
                    }
                }else if(this.flag==1){
                    if(index==1||index==5){

                    }else{
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            // 点击首页
                            this.pageIndex = this.cnt;
                            this.flag = 0;
                            this.getList();
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getList();
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getList();
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
                            this.getList();
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getList();
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getList();
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
                    this.err = "已经是第一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }else{
                    this.cnt-=1;
                    this.pageIndex-=1;
                    this.getList();
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getList();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getList();
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是第一页了";
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
                    this.getList();
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
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
                        this.getList();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getList();
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        flowerClick(){
            this.showFlower = true;
            this.getList();
        }
    },
    mounted(){
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enmatching'
            });
        }else{
            this.$router.push({
                path: '/Matching'
            });
        }
    }
}
</script>
<style scoped>
    .matching{
        height: 900px;
        overflow: hidden;
        width: 100%;
        background: #fff;
    }
    .content{
        display: flex;
        width: 1200px;
        height: 100%;
        margin: 100px auto 0;
    }
    .imgBox{
        width: 606px;
        height: 636px;
    }
    .bigImage{
        width: 606px;
        height: 636px;
    }
    .content .count img{
        width: 617px;
        height: 289px;
        margin-left: 44px;
        margin-bottom: 118px;
    }
    .fileBox{
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fileBox input{
        position: absolute;
        width: 114px;
        height: 56px;
        top: 0;
        left: calc(50% - 157px);
        opacity: 0;
    }
    .localBtn{
        width: 114px;
        height: 56px;
        line-height: 56px;
        outline: none;
        border: none;
        font-size: 14px;
        color: #333333;
        text-align: center;
        background: #fff;
        display: block;
        margin-right: 1.875rem;
        border: 1px solid #979797;
        border-radius: 6px;
    }
    .flowerBtn{
        width: 172px;
        height: 56px;
        background: #FFE300;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        font-size: 14px;
        color: #333333;
    }
    .model{
        position: fixed;
        z-index: 8888;
        background: rgba(0,0,0,0.6);
        height: 100vh;
        width: 100%;
        top: 0;
        left: 0;
    }
    .modelBox{
        position: absolute;
        width: 1026px;
        height: 700px;
        top: calc(50vh - 300px);
        left: calc(50% - 530px);
        box-sizing: border-box;
        padding-top: 2.5rem;
        background: #fff;
        border-radius: 4px;
    }
    #localBtn:hover,.flowerBtn:hover{
        cursor: pointer;
    }
    .modelClose{
        position: absolute;
        right: -42px;
        top: 0;
        width: 30px;
        z-index: 10;
    }
    .productBox{
        width: 850px;
        height: 580px;
        margin: 0 auto;
        overflow: auto;
    }
    .productBox li{
        display: inline-flex;
        background: #fff;
        border: 1px solid #979797;
        width: 188.6px;
        height: 283.1px;
        margin-right: 16px;
        margin-bottom: 26px;
        float: left;
    }
    .productBox li:nth-child(4n+0){
        margin-right: 16px;
    }
    .productImg{
        width: 100%;
        height: auto;
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
    .noData{
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 8rem;
        height: 31.25rem;
        font-size: 1.25rem;
        color: #333;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 8;
    }
    .noData img{
        display: block;
        width: 8rem;
    }
    .noData span{
        display: block;
        margin-left: 1rem;
        margin-top: .8rem;
    }
    /* 修改鼠标悬浮时按钮的样式 */
    .localBtn:hover,#uploaderInput:hover{
        cursor: pointer;
    }
    .flowerBtn:hover{
        background: #ffd000 !important;
    }
</style>