<template>
    <div class="source">
        <!-- 我的素材 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <Enusertab v-on:setUserIndex="getUserIndex" :arr="arr"></Enusertab>
        <div v-if="showIndex==0" class="upSource">
            <div class="topBox">
                <div class="classify"><span :class="item.diff==true?'special':''" @click="classSelect(index)" v-for="(item,index) in classify" :key="index">{{item.name}}</span></div>
                <div class="operate">
                    <img @click="del" src="../../assets/image/user/icon_del.png" alt="">
                </div>
            </div>
            <div class="content">
                <ul class="productBox">
                    <li v-if="type!=1">
                        <div class="notExist">
                            <div class="existImg">
                                <img src="../../assets/image/user/icon_add.png" alt="">
                                <span>Upload material</span>
                            </div>
                            <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                        </div>
                    </li>
                    <li v-for="(item,index) in proList" :key="index" @mouseenter="toEnter" @mouseleave="toLeave">
                        <img class="proImg" :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'" alt="">
                        <input @click="changeSelect(index)" type="checkbox" :checked="item.check">
                        <span v-if="showRound" class="selectBox"></span>
                        <div @click="download(index)" v-if="type==1" class="download">Download</div>
                    </li>
                </ul>
                <div v-if="!proList.length&&type==1" class="noData">No material for the time being</div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <div v-if="showIndex==1" class="pictureBox">
            <div class="content">
                <div class="noData">We are not open yet. Please look forward to it</div>
            </div>
        </div>
        <div v-if="showIndex==2" class="bottomColor">
            <div class="topBox">
                <div class="classify"><span style="opacity: 0;"></span></div>
                <div class="operate">
                    <img @click="del" src="../../assets/image/user/icon_del.png" alt="">
                </div>
            </div>
            <div class="content">
                <ul class="productBox">
                    <li>
                        <div class="notExist">
                            <div class="existImg">
                                <img src="../../assets/image/user/icon_add.png" alt="">
                                <span>Upload background</span>
                            </div>
                            <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                        </div>
                    </li>
                    <li v-for="(item,index) in proList" :key="index" @mouseenter="toEnter" @mouseleave="toLeave">
                        <img class="proImg" :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'" alt="">
                        <input @click="changeSelect(index)" type="checkbox" :checked="item.check">
                        <span v-if="showRound" class="selectBox"></span>
                    </li>
                </ul>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <div v-if="showIndex==3" class="matchColor">
            <div class="content">
                <div class="noData">We are not open yet. Please look forward to it</div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Enusertab from '../../components/Enusertab';
import Loading from '../../components/Loading';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Ensource',
    components: {
        Entab,
        Enusertab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Ensource',
            tabIndex: null,
            // 弹窗
            showJump: false,
            showLoading: false,
            err: "",
            count: 9,
            arr: [{name: 'Material',color: "#2f2f2f",showTangle: true},{name: 'Composition',color: "#8d8d8d",showTangle: false},{name: 'Shading',color: "#8d8d8d",showTangle: false},{name: 'Color matching',color: "#8d8d8d",showTangle: false}],
            showIndex: 0,
            type: '',
            showRound: true,
            // 分类
            classify: [{name: 'Uploaded Material',diff: true},{name: 'Matting Material',diff: false}],
            url: [],
            proList: [],
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
        // 获取Usertab的索引
        getUserIndex(e){
            this.showIndex = e;
            this.type = '';
            this.cnt = 1;
            this.proList = [];
            this.pageNumber = 1;
            this.page = [];
            this.flag = 0;
            this.pageIndex = 1;
            if(e==2){
                this.count = 9;
            }
            this.getMessage();
        },
        // 分类里点击上传的素材以及抠图的素材
        classSelect(index){
            this.proList = [];
            this.cnt = 1;
            this.pageNumber = 1;
            this.page = [];
            this.flag = 0;
            this.pageIndex = 1;
            if(index==0){
                this.type = '';
                this.count = 9;
            }else{
                this.type = 1;
                this.count = 10;
            }
            this.classify.map(function(item){
                item.diff = false;
            });
            this.classify[index].diff = true;
            this.getMessage();
        },
        // 选中删除
        select(index){
            let isActive = this.list[index].isActive;
            this.list[index].isActive = !isActive;
        },
        // 删除
        del(){
            let message = false;
            let self = this;
            this.proList.map(function(item){
                if(item.check){
                    message = true;
                }
            });
            if(message){  
                this.proList.map(function(item){  
                    if(item.check){
                        self.showLoading = true;
                        Scroll.stop();
                        let formData = new FormData();
                        formData.append('id',item.id);
                        let obj = {
                            url: self.all.baseUrl + '/app3dMaterialLibraryMyJyg/delete',
                            formdata: formData
                        }
                        self.getData(obj).then(res=>{
                            setTimeout(function(){
                                self.showLoading = false;
                                Scroll.move();
                            },500);
                            let result;
                            if(res.data.status == 0){ 
                                self.cnt = 1;
                                self.pageNumber = 1;
                                self.page = [];
                                self.flag = 0;
                                self.pageIndex = 1;
                                self.showJump = true;
                                self.err = 'Successful deletion';
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    self.getMessage();
                                },1500);
                            }else if(res.data.status==-95){
                                self.showJump = true;
                                Scroll.stop();
                                self.err = res.data.msg;
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
                                self.showJump = true;
                                self.err = res.data.msg;
                                Scroll.stop();
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    Scroll.move();
                                },1000);
                            }
                        });
                    }         
                });  
            }else{
                this.showJump = true;
                this.err = 'Please select the picture first';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        },
        // 鼠标移入移出
        toEnter(index){
            this.showRound = true;
        },
        toLeave(index){
            this.showRound = true;
        },
        // 下载
        download(index){
            window.location.href = this.all.baseUrl+'/file/download?url='+this.proList[index].picture;
        },
        // 上传素材
        add(e){
            this.url = [];
            let self = this;
            let files = e.target.files;
            for(let i=0;i<files.length;i++){
                this.url.push(e.target.files[i]);
            }
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            this.url.map(function(item,index){
                if(self.showIndex==0){
                    if(self.url[index].name.substring(self.url[index].name.length-3,self.url[index].name.length)!='png'){
                        self.showJump = true;
                        self.err = 'Only upload PNG format pictures';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }
                let reader = new FileReader();
                reader.readAsDataURL(item); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function(){
                    // 增加一个
                    self.showLoading = true;
                    let formData = new FormData();
                    formData.append('file',item);
                    let obj = {
                        url: self.all.baseUrl + '/file/upload',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        self.upSource(res.data.result);
                    });
                }
            })
        },
        changeSelect(index){
            this.proList[index].check = !this.proList[index].check;
        },
        upSource(str){
            let formData = new FormData();
            let self = this;
            formData.append('picture',str);
            formData.append('type1',this.showIndex+1);
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                self.showLoading = false;
                if(res.data.status == 0){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'New Success';
                    this.proList = [];
                    this.cnt = 1;
                    this.pageNumber = 1;
                    this.page = [];
                    this.flag = 0;
                    this.pageIndex = 1;
                    this.getMessage();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
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
        getMessage(){
            this.showLoading = true;
            Scroll.stop();
            let formData = new FormData();
            let self = this;
            formData.append('pageSize',this.count);
            formData.append('page',this.cnt);
            formData.append('status',0);
            formData.append('type1',this.showIndex+1);
            if(this.type){
                formData.append('type2',this.type);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status == 0){
                    result = res.data.result;
                    result.list.map(function(item){
                        item.check = false;
                    });
                    this.proList = result.list;
                    this.pageNumber = result.pages;
                    this.pageAuto();
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
                path: '/Ensource'
            });
        }else{
            this.$router.push({
                path: '/Source'
            });
        }
    }
}
</script>
<style scoped>
    .source{
        min-height: 100vh;
        background: #eee;
        box-sizing: border-box;
        padding-bottom: 1.5rem;
    }
    .upSource,
    .bottomColor,
    .pictureColor,
    .matchColor{
        padding: 0 14.375rem;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
    .classify{
        display: flex;
        justify-content: start;
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
    .classify span.special{
        color: #fff;
        border: 1px solid #133ffc;
        background: #133ffc;
    }
    .operate{
        display: flex;
        justify-content: start;
        align-items: center;
        margin-right: 5.375rem;
    }
    .operate img{
        display: block;
        width: 1.5rem;
    }
    /* 没有数据 */
    .noData{
        color: #8d8d8d;
        font-size: 1.5rem;
        position: fixed;
        top: 50vh;
        width: 100%;
        text-align: center;
        left: 0;
        z-index: 88;
    }
    .content{
        position: relative;
        padding-bottom: 2.5rem;
    }
    .productBox{
        overflow: hidden;
        margin: 0 auto;
        margin-top: 1.25rem;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 1.25rem;
    }
    .productBox li{
        width: 17.5rem;
        height: 25.9375rem;
        background: #fff;
        border-radius: .3125rem;
        margin-bottom: .9375rem;
        position: relative;
        box-sizing: border-box;
        padding: 1.125rem;
        overflow: hidden;
        margin-right: .625rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 1px 1px 1px #ddd;
    }
    .notExist{
        width: 15.3125rem;
        height: 23.75rem;
        border: .0625rem dashed rgba(51, 51, 51, 1);
        position: relative;
    }
    .file{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 99;
    }
    .existImg{
        color: rgba(51, 51, 51, 0.6);
        font-size: 1.125rem;
        top: 8.75rem;
        position: absolute;
        width: 100%;
        z-index: 98;
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
        max-width: 15.3125rem;
        max-height: 23.75rem;
    }
    .productBox input[type='checkbox']{
        position: absolute;
        top: 0;
        left: 0;
        width: 17.5rem;
        height: 25.9375rem;
        z-index: 99;
        opacity: 0;
    }
    .selectBox{
        position: absolute;
        width: 1.25rem; 
        z-index: 98;
        top: 1.4rem;
        left: 1.4rem;
        height: 1.25rem;
        background: url('../../assets/image/user/tgb-20px.png') no-repeat center;
        background-size: 100%;
    }
    .productBox input[type='checkbox']:checked + .selectBox{
        position: absolute;
        width: 1.25rem; 
        z-index: 98;
        top: 1.4rem;
        right: 1.4rem;
        height: 1.25rem;
        background: url('../../assets/image/user/tg-20px.png') no-repeat center;
        background-size: 100%;
    }
    .download{
        position: absolute;
        width: 5rem;
        z-index: 222;
        cursor: default;
        height: 1.75rem;
        line-height: 1.75rem;
        background: #637ffc;
        text-align: center;
        left: calc(50% - 2.5rem);
        bottom: 1.25rem;
        color: #fff;
        font-size: .875rem;
        border-radius: .875rem;
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