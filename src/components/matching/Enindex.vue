<template>
    <div class="matching">
        <!-- 花型构图 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">   
            <div class="imgBox">
                <img class="bigImage" src="http://youchaikj.com/pc-img/aiback.png" alt="">
            </div>
            <h2>AI Colour Matching</h2>
            <div class="fileBox">
                <input id="uploaderInput" accept="image/*" multiple type="file" @change="add"/>
                <button class="localBtn">Local upload</button>
                <span @click="flowerClick" class="flowerBtn">Upload from my pattern</span>
            </div>
        </div>
        <div class="model" v-if="showFlower">
            <div class="modelBox">
                <img @click="modelClose" class="modelClose" src="../../assets/image/login/close.png" alt="">
                <ul class="productBox" v-if="proList.length">
                    <li @click="toDetail(index)" v-for="(item,index) in proList" :key="index">
                        <img class="productImg" :src="item.app3dFlowerTypeJygModel.preview" alt="">
                    </li>
                </ul>
                <div class="noData" v-else>
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>No data available</span>
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
import Entab from '../../components/Entab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Enmatching',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            tabIndex: 4,
            showJump: false,
            err: '',
            showLoading: false,
            path: '/Enmatching',
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
            if(file.length>1){
                this.showJump = true;
                this.err = "Can't upload more than one picture";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else{
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
                        self.$router.push({
                            path: '/Enchangecolour'
                        });
                    });
                }
            }
        },
        toDetail(index){
            localStorage.setItem('matchList',JSON.stringify(this.proList[index].app3dFlowerTypeJygModel));
            this.$router.push({
                path: '/Enchangecolour'
            });
        },
        getList(){
            let self = this;
            let formData = new FormData();
            let obj = {}
            this.showLoading = true;
            Scroll.stop();
            formData.append('pageSize',5);
            formData.append('page',this.cnt);
            formData.append('myStatus',1);
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
                    this.proList = result.list;
                    this.pageNumber = result.pages;
                    this.pageAuto();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = '';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
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
        },// 初始化分页器
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
                    this.getList();
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
                    this.err = "It's the last page";
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
        height: 100vh;
        overflow: hidden;
        width: 100%;
        background: #eee;
    }
    .content{
        padding-top: 2.5rem;
    }
    .imgBox{
        position: relative;
        height: 34.6875rem;
    }
    .bigImage{
        width: 62.5rem;
        height: 34.6875rem;
        display: block;
        position: absolute;
        left: 50%;
        margin-left: -37.5rem;
        top: 0;
    }
    .content h2{
        font-size: 3rem;
        color: #333;
        font-weight: normal;
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
        width: 11.25rem;
        height: 3.75rem;
        top: 0;
        left: calc(50% - 13.125rem);
        opacity: 0;
    }
    .localBtn{
        width: 11.25rem;
        height: 3.75rem;
        line-height: 3.75rem;
        outline: none;
        border: none;
        background: #133ffc;
        color: #f3f8fb;
        font-size: 1.5rem;
        text-align: center;
        display: block;
        margin-right: 1.875rem;
        border-radius: 1.875rem;
    }
    .flowerBtn{
        width: 13.125rem;
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
        align-items: center;
        border: 1px solid #133ffc;
        border-radius: 1.875rem;
        height: 3.75rem;
        color: #133ffc;
        cursor: default;
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
    .modelClose{
        position: absolute;
        right: .625rem;
        top: .625rem;
        width: 1.25rem;
        z-index: 10;
    }
    .modelBox{
        position: absolute;
        height: 31.25rem;
        top: calc(50vh - 15.625rem);
        left: calc(50% - 37.5rem);
        box-sizing: border-box;
        padding-top: 2.5rem;
        background: #fff;
        width: 75rem;
        border-radius: .5rem;
        overflow: hidden;
    }
    .productBox{
        display: flex;
    }
    .productBox li{
        background: #fff;
        border-radius: .5rem;
        box-shadow: 2px 2px 2px #d5d6da,
                    -2px -2px 2px #d5d6da;
        overflow: hidden;
        margin: 0 .625rem;
        width: 13.75rem;
        height: 20.375rem;
        margin-bottom: 1.25rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .productImg{
        max-width: 13.75rem;
        max-height: 20.375rem;
        display: block;
        width: 100%;
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
</style>