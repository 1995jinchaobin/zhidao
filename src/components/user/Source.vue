<template>
    <div class="source">
        <!-- 我的素材 -->
        <div v-if="showIndex==0" class="upSource">
            <div class="titleBox">
                <div>我的素材</div>
            </div>
            <div class="topBox">
                <div class="classify"><span :class="item.diff==true?'special':''" @click="classSelect(index)" v-for="(item,index) in classify" :key="index">{{item.name}}</span></div>
                <div style="margin-right: 45px">
                    <div class="delAll">
                        <div @click="delAll()">
                            <div id="delAll" style="display: none;"></div>
                        </div>
                        <div>全选</div>
                    </div>
                    <div class="del" @click="delAllClick">删除</div>
                </div>
            </div>
            <div class="content">
                <ul class="productBox">
                    <li @mousemove="disHidd($event,index)" @mouseout="disNone($event,index)" v-for="(item,index) in proList" :key="index" @mouseenter="toEnter" @mouseleave="toLeave" @click.stop="disChangeImg($event,index)">
                        <div  v-if="item.type2 == 0 && item.origin == 0" :id="'checkBox'+index" class="checkBox"  @click="disChange($event,index)"  v-show="item.type2 == 0 && item.origin == 0"></div>
                        <img class="proImg" :src="item.picture" alt="">
                        <!-- <input @click="changeSelect(index)" type="checkbox" :checked="item.check">
                        <span v-if="showRound" class="selectBox"></span>
                        <div @click="download(index)" v-if="type==1" class="download">下载</div> -->
                        <div :id="index" class="downloadBody" style="height:0;">
                            <div class="download1">
                                <div></div>
                                <div  v-if="item.type2 == 0 && item.origin == 0">
                                    <span @click="download(index)"></span>
                                    <span  @click="delClick(index)"></span>
                                </div>
                                <div class="onlyDownload" v-else>
                                    <span @click="download(index)"></span>
                                    <span style="display: none;"></span>
                                </div>
                            </div>
                        </div>
                        <div  @click="iconNone(index,$event)" style="display:none;" :data-delShow=0 :data-delId="item.id" :origin="item.origin" :type2="item.type2" class="itemActive"></div>
                    </li>
                </ul>
                <div v-if="!proList.length" class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <div>空空如也</div>
                </div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <div v-if="showIndex==1" class="pictureBox">
            <div class="content">
                <div class="noData">暂未开放，敬请期待</div>
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
                <div v-if="!proList.length" class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>空空如也</span>
                </div>
                <ul class="productBox">
                    <li>
                        <div class="notExist">
                            <div class="existImg">
                                <img src="../../assets/image/user/icon_add.png" alt="">
                                <span>上传底纹</span>
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
                <ul class="pageBox" v-if="proList.length>0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <div v-if="showIndex==3" class="matchColor">
            <div class="content">
                <div class="noData">暂未开放，敬请期待</div>
            </div>
        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <PageJump  v-if="showPageJump" :title="err" :urlChange="false"></PageJump>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
    // import Tab from '../../components/Tab';
    import Usertab from '../../components/Usertab';
    import Loading from '../../components/Loading';
    import Jump from '../../components/Jump';
    import Scroll from '../../assets/js/scroll.js';
    import InfoBox from '@/components/common/InfoBox';
    import PageJump from '@/components/common/PageJump';
    export default {
        name: 'Source',
        components: {
            // Tab,
            Usertab,
            Loading,
            Jump,
            PageJump,
            InfoBox
        },
        data(){
            return {
                path: '/Source',
                tabIndex: null,
                // 弹窗
                showJump: false,
                showLoading: false,
                err: "",
                count: 8,
                arr: [{name: '素材',color: "#2f2f2f",showTangle: true},{name: '构图',color: "#8d8d8d",showTangle: false},{name: '底纹',color: "#8d8d8d",showTangle: false},{name: '配色',color: "#8d8d8d",showTangle: false}],
                showIndex: 0,
                type: '',
                showRound: true,
                // 分类
                classify: [{name:'全部',diff:true},{name:'已购买',diff: false},{name: '我上传的素材',diff: false},{name: '我的抠图素材',diff: false},{name: '我的商城素材',diff: false}],
                url: [],
                proList: [],
                page: [],
                cnt: 1,
                pageNumber: '',
                flag: 0,
                pageIndex: 1,
                // 显示切换,表示是否全选，0：否，1：是
                isShow:0,
                //是否是我的抠图素材，默认为空，表示不是
                type2:'',
                //来源，0本地上传1商城购买的素材2工作室上传自动转换，默认为空，表示全部
                origin:'',
                //是否显示提示框-1不显示，0:显示成功，1：显示警告
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                showPageJump:''
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
                //全部选项卡
                if(index==0){
                    this.type2 = '';
                    this.origin = '';
                }else if(index==1){
                    //已购买
                    this.type2 = '';
                    this.origin = 1;
                }else if(index==2){
                    //本地上传
                    this.type2 = '';
                    this.origin = 0;
                }else if(index==3){
                    //抠图素材
                    this.type2 = 1;
                    this.origin = '';
                }else {
                    //商城素材
                    this.type2 = '';
                    this.origin = 2;
                }
                this.classify.map(function(item){
                    item.diff = false;
                });
                this.classify[index].diff = true;
                let delAll = document.getElementById("delAll");
                delAll.style.cssText = "display: none;";
                this.isShow = 0;
                this.getMessage();
            },
            // 选中删除
            select(index){
                let isActive = this.list[index].isActive;
                this.list[index].isActive = !isActive;
            },
            // 全选后，删除
            delAllClick(){
                let message = false;
                let self = this;
                let ids = '';
                let iconList = document.getElementsByClassName('itemActive');
                for(let i = 0;i < this.proList.length;i++){
                    console.log(this.proList[i].check)
                    console.log(this.proList[i].origin)
                    console.log(this.proList[i].type2)
                    console.log(iconList[i].dataset.delshow )
                    if(this.proList[i].check && this.proList[i].origin == 0 && this.proList[i].type2 == 0 && iconList[i].dataset.delshow == 1){
                        message = true;
                        ids += this.proList[i].id + ',';
                    }
                }
                ids = ids.substring(0,ids.length-1);
                if(message){
                    self.showLoading = true;
                    Scroll.stop();
                    let formData = new FormData();
                    formData.append('ids',ids);
                    let obj = {
                        url: self.all.baseUrl + '/new/materialLibraryMe/delUserMaterialLibraryMes',
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
                            self.isShow = 0;
                            let iconList = document.getElementsByClassName("itemActive");
                            for(let i=0;i < iconList.length;i++){
                                iconList[i].style.cssText = "display: none;";
                                iconList[i].dataset.delshow = 0;
                            }
                            self.showInfo = 0;
                            self.succMsg = '删除成功';
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                self.getMessage();
                                Scroll.move();
                            },1000);
                        }else if(res.data.status==-95){
                            self.showJump = true;
                            Scroll.stop();
                            self.err = res.data.msg;
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = res.data.msg;
                                Scroll.move();
                                localStorage.clear();
                                self.$router.push({
                                    path: '/Login'
                                });
                            },1000);
                        }else{
                            self.showInfo = 1;
                            self.errMsg = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }else{
                    self.showInfo = 1;
                    self.errMsg = '请先选择图片';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1000);
                }
            },
            delClick(index){
                let self = this;
                self.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                formData.append('ids',this.proList[index].id);
                let obj = {
                    url: self.all.baseUrl + '/new/materialLibraryMe/delUserMaterialLibraryMes',
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
                        self.showInfo = 0;
                        self.succMsg = '删除成功';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            self.getMessage();
                            Scroll.move();
                        },1000);
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        Scroll.stop();
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = res.data.msg;
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },1000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                    }
                });
            },
            // 鼠标移入移出
            toEnter(index){
                this.showRound = true;
            },
            toLeave(index){
                this.showRound = true;
            },
            disHidd(e,index){
                let body = document.getElementById(`${index}`);
                body.style.cssText = "height: 30px;"
                let checkBoxId = 'checkBox'+index
                let checkBox = document.getElementById(`${checkBoxId}`);
                checkBox.style.cssText = "display: block;"
            },
            disNone(e,index){
                let body = document.getElementById(`${index}`);
                body.style.cssText = "height: 0;"
                let checkBoxId = 'checkBox'+index
                let checkBox = document.getElementById(`${checkBoxId}`);
                checkBox.style.cssText = "display: none;"
            },
            disChange(e,index){
                // let icon = e.currentTarget.parentElement.parentElement.nextElementSibling;

                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let icon = iconList[index]
                let num = 0;
                this.changeSelect(index)
                if(icon.dataset.delshow == 0){
                    icon.style.cssText = "display: hidden;";
                    icon.dataset.delshow = 1;
                }
                for(let i = 0;i < iconList.length;i++){
                    if(iconList[i].dataset.delshow == 1){
                        num++
                    }
                    if(num == iconList.length){
                        delAll.style.cssText = "display: hidden;"
                        this.isShow = 1;
                    }
                }
            },
            disChangeImg(e,index){
                if(e.target.previousElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.dataset.delshow==0){
                    this.disChange(e.target.previousElementSibling,index);
                }else{
                    this.iconNoneImg(index,e.target.previousElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
                }
            },
            iconNoneImg(index,e){
                let icon = e;
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
                icon.style.cssText = "display: none;";
                icon.dataset.delshow = 0;
                this.proList[index].show = !this.proList[index].show;
                iconList[index].dataset.delshow = 0
                this.changeSelect(index)
                for(let i = 0;i < iconList.length;i++){
                    if(iconList[i].dataset.delshow == 1){
                        num++
                    }
                    if(num < iconList.length){
                        delAll.style.cssText = "display: none;"
                        this.isShow = 0;
                    }
                }
            },
            iconNone(index,e){
                let icon = e.target;
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
                icon.style.cssText = "display: none;";
                icon.dataset.delshow = 0;
                this.proList[index].show = !this.proList[index].show;
                iconList[index].dataset.delshow = 0
                this.changeSelect(index)
                for(let i = 0;i < iconList.length;i++){
                    if(iconList[i].dataset.delshow == 1){
                        num++
                    }
                    if(num < iconList.length){
                        delAll.style.cssText = "display: none;"
                        this.isShow = 0;
                    }
                }
            },
            delAll(){
                let delAll = document.getElementById("delAll");
                //每个图片的左上角的全选图表
                let iconList = document.getElementsByClassName("itemActive");
                console.log(this.isShow+'====')
                if(this.isShow == 0){
                    //显示右上角选中效果
                    delAll.style.cssText = "display: hidden;";
                    for(let i=0;i < iconList.length;i++){
                        //只能删除本地上传的素材
                        if (iconList[i].getAttribute('origin')=='0' && iconList[i].getAttribute('type2')=='0'){
                            iconList[i].style.cssText = "display: hidden;";
                            iconList[i].dataset.delshow = 1;
                            this.changeSelect(i)
                        }
                    }
                    this.isShow = 1;
                }else if(this.isShow == 1){
                    delAll.style.cssText = "display: none;";
                    for(let i = 0;i < this.proList.length;i++){
                        this.proList[i].show = !this.proList[i].show;
                        // this.changeSelect(i)
                        this.proList[i].check=false;
                    }
                    for(let i=0;i < iconList.length;i++){
                        iconList[i].style.cssText = "display: none;";
                        iconList[i].dataset.delshow = 0;
                    }
                    this.isShow = 0;
                }

            },
            // 下载
            download(index){
                window.location.href = this.proList[index].picture+'?response-content-type=application%2Foctet-stream';
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
                            self.showInfo = 1;
                            self.errMsg = '只支持上传png格式图片';
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
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
                });
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
                        this.proList = [];
                        this.cnt = 1;
                        this.pageNumber = 1;
                        this.page = [];
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.getMessage();
                        self.showInfo = 0;
                        self.succMsg = '新增成功';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                        return;
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = res.data.msg;
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },1000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                        return;
                    }
                });
            },
            getMessage(){
                this.proList = [];
                this.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                let self = this;
                formData.append('pageSize',this.count);
                formData.append('page',this.cnt);
                formData.append('type1',1);
                formData.append('type2',this.type2);
                formData.append('origin',this.origin);
                let obj = {
                    url: this.all.baseUrl + '/new/materialLibraryMe/getUserMaterialLibraryMes',
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
                        self.proList = result.list;
                        self.pageNumber = result.pages;
                        self.pageAuto();
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        Scroll.stop();
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = res.data.msg;
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },1000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                        return;
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
                            console.log(index)
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
                        this.showPageJump = true;
                        this.err = '已经是第一页了!';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
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
                        this.showPageJump = true;
                        this.err = '已经是第一页了!';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
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
                        this.showPageJump = true;
                        this.err = '最后一页了';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
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
                        this.showPageJump = true;
                        this.err = '最后一页了';
                        setTimeout(function(){
                            self.showPageJump = false;
                            self.err = '';
                        },1500);
                    }
                }
            }
        },
        mounted(){
            this.getMessage();
            // localStorage.setItem('path',this.path);
            // if(localStorage.getItem('English')){
            //     this.$router.push({
            //         path: '/Ensource'
            //     });
            // }else{
            //     this.$router.push({
            //         path: '/Source'
            //     });
            // }
        }
    }
</script>
<style scoped>
    .source{
        width: 988px;
        min-height: 100vh;
        box-sizing: border-box;
        padding-bottom: 1.5rem;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .classify{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #8d8d8d;
        font-size: 14px;
        margin-left: 43px;
        cursor: pointer;
    }
    .classify span{
        padding: 0 .625rem;
        height: 1.75rem;
        line-height: 1.75rem;
        background: inherit;
        display: block;
        margin-right: 16px;
        cursor: default;
        font-size: 14px;
        color: #8a8888;
        cursor: pointer;
    }
    .classify span.special{
        color: #000;
    }
    .operate{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 5.375rem;
    }
    .operate img{
        display: block;
        width: 1.5rem;
    }
    /* 没有数据 */
    .noData{
        align-items: center;
        font-size: 1rem;
        margin-top: 15rem;
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
        background: #fff;
        box-shadow: 2px 2px 5px #0003;
        overflow: hidden;
        width: 173px;
        height: 222px;
        margin-top: 42px;
        position: relative;
        display: flex;
        justify-content: center;
        cursor:pointer;
    }
    .productBox li+li{
        margin-left: 60px;
    }
    .productBox li:nth-child(5),.productBox li:nth-child(1){
        margin-left: 56px;
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
        margin: 0 .7125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    ul.pageBox li.click{
        background: #000;
        color: #fff;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    .titleBox{
        height: 48px;
        border-bottom: 1px solid #cdcdcd;
        display: flex;
        background: #fff;
        justify-content: space-between;
        color: #333333;
    }
    .titleBox>div:first-child{
        margin-top: 24px;
        font-size: 14px;
        margin-left: 5%;
    }
    .titleBox>div:last-child{
        display: flex;
        margin-top: 24px;
        margin-right: 22px;
    }
    .delAll{
        width: 100px;
        display: flex;
        float: left;
        font-size: 14px;
    }
    .delAll>div:first-child{
        width: 12px;
        height: 12px;
        border: 1px solid #000;
        margin: auto 14px;
        border-radius: 16px;
        margin-top: 2px
    }
    #delAll{
        width: 10px;
        height: 10px;
        background: #000;
        margin: 1px auto;
        border-radius: 16px;
    }
    .del{
        width: 70px;
        height: 30px;
        font-size: 14.04px;
        background: #ffe135;
        text-align: center;
        line-height: 30px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        float: left;
        margin-top: -5px;
        cursor: pointer;
    }
    .del:hover{
        background-color: #ffd000;
    }
    .downloadBody{
        position: absolute;
        z-index: 77;
        bottom: 0;
        width: 100%;
        background: #F6F6F6;
        transition: all 0.5s;
        overflow: hidden;
    }
    .download1{
        border-radius: .3125rem;
        display: flex;
        align-items: center;
        margin-top: 3%;
    }
    .download1>div:first-child{
        width: 118px;
        height: 20px;
        position: relative;
        left: 0;
    }
    .download1>div:last-child{
        display: flex;
    }
    .download1>div:last-child>span:first-child{
        background: url('../../assets/image/user/flower-download.png') no-repeat center center;
        background-size: 100%;
        display: block;
        width: 13px;
        height: 17px;
        margin-right: 14.4px;
    }
    .download1>div:last-child>span:last-child{
        background: url('../../assets/image/user/flower-delete.png') no-repeat center center;
        background-size: 100%;
        display: block;
        width: 17.3px;
        height: 18px;
    }
    .download1:hover span{
        background: url('../../assets/image/user/whitedown.png') no-repeat center center;
        background-size: 100%;
    }
    .itemActive{
        width: 16px;
        height: 16px;
        /*border-radius: 50%;*/
        /*border: 1px solid #000;*/
        background: url('../../assets/image/user/flower-checked.png') no-repeat center center;
        background-size: 100%;
        position: absolute;
        top: 7px;
        left: 10px;
        z-index: 99;
        /*display: none;*/
    }
    .onlyDownload span {
        float: right !important;
        margin-left: 140px !important;
    }
    .upSource{
        background: #fff;
    }
    .checkBox{
        width: 16px;
        height: 16px;
        background-image: url("../../assets/image/user/flower-uncheck.png");
        background-size: 100%;
        position: absolute;
        top: 7px;
        left: 10px;
        display: none;
    }
</style>