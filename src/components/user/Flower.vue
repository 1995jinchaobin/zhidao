<template>
    <div class="flower">
        <!-- 我的花型 -->
        <div class="myFlower">
            <div class="titleBox">
                <div :class="pageType=='flower'?'only':''" @click="chageTab(1)">我的花型</div>
                <div :class="pageType=='myUpload'?'only':''" @click="chageTab(2)">我上传的花型</div>
            </div>
            <div class="topBox" v-if="usertab==0">
                <div v-if="pageType=='flower'" class="classify"><span @click="classType(index)" :class="item.isOnly?'only':''" v-for="(item,index) in classify" :key="index">{{item.name}}</span></div>
                <div v-if="pageType=='flower'">
                    <div class="delAll">
                        <div @click="allSelected(),delAll()">
                            <div id="delAll" style="display: none;"></div>
                        </div>
                        <div>全选</div>
                    </div>
                    <div @click="del" class="del">删除</div>
                </div>
            </div>
            <div class="content">
                <div v-if="!proList.length" class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <div>空空如也</div>
                </div>
                <!--我的花型-->
                <ul class="productBox" v-else-if="pageType=='flower'">
                    <li @mousemove="disHidd($event,index)" @mouseout="disNone($event,index)" v-for="(item,index) in proList" :key="index" @click="iconNoneImg(index,$event)">
                        <!-- <div v-if="showBig" @click="selectPro(index,$event)" class="clickBox">
                            <input :checked="item.show" type="checkbox">
                            <span></span>
                        </div> -->
                        <div v-if="item.type!=3 &&proList.length>0" :id="'checkBox'+index" class="checkBox" @click="disChange($event),selectPro(index,$event)"></div>
                        <img v-if="item.type==3" class="productImg" :src="item.storeIndentSubsidiary.picture1" alt="">
                        <img v-if="item.type==1||item.type==2" class="productImg" :src="item.flowerType.preview" alt="">
                        <div v-if="item.type!=3" :id="index" class="downloadBody" style="height:0;">
                            <div class="download">
                                <div></div>
                                <div>
                                    <span @click.stop="download($event,index)"></span>
                                    <span @click.stop="delOne(index)"></span>
                                </div>
                            </div>
                        </div>
                        <div @click="iconNone(index,$event)" style="display:none;" :data-delShow=0 :data-delId="item.id" :isMoney="item.type==3?1:0" class="itemActive"></div>
                        <div v-if="item.type==3" :id="index" @click="download($event,index)" class="downloadBox" style="height: 0;">
                            <span @click="downpsd($event,index)">下载PSD</span>
                            <!--<span @click="download($event,index)">下载大图</span>-->
                        </div>
                    </li>
                </ul>
                <ul class="productBox" v-else-if="pageType=='myUpload'">
                    <li @mousemove="disHidd($event,index)" @mouseout="disNone($event,index)" v-for="(item,index) in proList" :key="index">
                        <div v-if="proList.length>0" :id="'checkBox'+index" class="checkBox" ></div>
                        <img class="productImg" :src="item.preview" alt=""  @click="test">
                        <div  :id="index" class="downloadBody" style="height:0;"  @click="test">
                            <div class="download">
                                <div></div>
                                <div>
                                    <span @click.stop="download($event,index)"></span>
                                    <span @click.stop="delOne(index)"></span>
                                </div>
                            </div>
                        </div>
                        <div @click="iconNone(index,$event)" style="display:none;" :data-delShow=0 :data-delId="item.id" :isMoney="item.type==3?1:0" class="itemActive"></div>
                    </li>
                </ul>
            </div>
            <ul class="pageBox" v-if="proList.length>0">
                <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
            </ul>
        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <PageJump  v-if="showPageJump" :title="err" :urlChange="false"></PageJump>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
        <ProgressBar v-if="showProgressBar" :hasFinshed="hasFinshed"></ProgressBar>
    </div>
</template>
<script>
    // import Tab from '../../components/Tab';
    import Jump from '../../components/Jump';
    import InfoBox from '@/components/common/InfoBox';
    import PageJump from '@/components/common/PageJump';
    // import Usertab from '../../components/Usertab';
    import Loading from '../../components/Loading';
    import Scroll from '../../assets/js/scroll.js';
    import ProgressBar from '@/components/common/ProgressBar';
    export default {
        name: 'Flower',
        components: {
            // Tab,
            Loading,
            Jump,
            // Usertab,
            PageJump,
            InfoBox,
            ProgressBar
        },
        data(){
            return {
                path: '/Flower',
                showJump: false,
                err: '',
                tabIndex: null,
                showLoading: false,
                arr: [{name: '我的花型',color: "#2f2f2f",showTangle: true},{name: '商城花型',color: "#8d8d8d",showTangle: false}],
                classify: [{name: '全部',isOnly: true},{name: '花型设计',isOnly: false},{name: 'AI设计',isOnly: false},{name: '花型商城',isOnly: false}],
                proList: [],
                // 全选点击,1选中，2未选中
                isClick: 1,
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
                pageIndex: 1,
                // 显示切换
                isShow:0,
                //类型，全部，花型设计1，AI设计2，花型设计3,默认为全部''
                type:'',
                //是否显示提示框-1不显示，0:显示成功，1：显示警告
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                showPageJump:'',
                showProgressBar:false,
                hasFinshed:false,
                //页面分类，flower：我的花型，myUpload：我上传的花型
                pageType:'flower'
            }
        },
        methods: {
            test(){
                // console.log('111')
            },
            // changeEnglish(){
            //     this.$router.go(0);
            // },
            getUserIndex(e){
                this.usertab = e;
                this.cnt = 1;
                this.pageNumber = '';
                this.page  = [];
                this.flag = 0;
                this.pageIndex = 1;
                this.proList = [];
                this.getList();
            },
            // 去详情页
            toDetail(index){
                localStorage.setItem('detailList',JSON.stringify(this.proList[index]));
                localStorage.setItem('detailType',this.usertab);
                this.$router.push({
                    path: '/Detail',
                    query: {
                        message: this.proList[index],
                        type: this.usertab
                    }
                });
            },
            //全部，花型设计，AI设计，花型设计点击
            classType(index){
                if(index==0){
                    this.type = ''
                } else {
                    this.type = index
                }
                if(index==2){
                    this.tabIndex=1
                }else{
                    this.tabIndex=0
                }
                this.pageIndex=1;
                this.cnt=1
                this.page=[]
                this.getList();
                this.classify.map(function(item){
                    item.isOnly = false;
                });
                this.classify[index].isOnly = true;
                let delAll = document.getElementById("delAll");
                delAll.style.cssText = "display: none;";
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
                this.getList();
                this.classify.map(function(item){
                    item.isOnly = false;
                });
                this.classify[index].isOnly = true;
            },
            // 点击删除图片
            allClick(){
                this.showBig = true;
            },
            // 删除多个,请求删除接口
            del(){
                let self = this;
                let message = false;
                let idArr = [];
                let idArrs = '';
                this.proList.map(function(item){
                    if(item.show){
                        message = true;
                    }
                });
                if(message){
                    this.proList.map(function(item){
                        if(item.show&&item.type!=3){
                            idArr.push(item.id);
                            idArrs += item.id+','
                        }
                    });
                    idArrs.substring(0,idArrs.length-2)
                    self.getNew(idArrs);
                }else{
                    self.errMsg = '请先选择图片';
                    self.showInfo = 1;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1000);
                    return;
                }
            },
            //点击图片上的删除按钮
            delOne(index){
                let self = this;
                let formData = new FormData();
                let obj = {};
                if(this.type!=3){

                    if(this.pageType=='flower'){
                        obj.url = self.all.baseUrl + '/new/userFlowers/delUserFlowerByIds';
                        formData.append('ids',this.proList[index].id);
                    }else{
                        obj.url = self.all.baseUrl + '/app3dFlowerMyUpload/delete';
                        formData.append('id',this.proList[index].id);
                    }

                    obj.formdata = formData;
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.cnt = 1;
                            self.pageNumber = '';
                            self.page  = [];
                            self.flag = 0;
                            self.pageIndex = 1;
                            self.succMsg = '删除成功';
                            self.showInfo = 0;
                            self.isClick = 2;
                            self.isShow = 1;
                            if(self.pageType=='flower'){
                                self.delAll();
                            }
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.succMsg = '';
                                Scroll.move();
                                if(self.pageType=='flower'){
                                    self.getList();
                                }else{
                                    self.getMyUpload();
                                }
                            },1000);
                        }else if(res.data.status==-95){
                            self.showJump = true;
                            self.err = '';
                            Scroll.stop();
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = res.data.msg;
                                localStorage.clear();
                                Scroll.move();
                                self.$router.push({
                                    path: '/Login'
                                });
                            },1500);
                        }else{
                            self.errMsg = res.data.msg;
                            self.showInfo = 1;
                            if(self.pageType=='flower'){
                                //将全选效果去掉
                                let delAll = document.getElementById("delAll");
                                delAll.style.cssText = "display: none;";
                            }
                            self.isShow=0;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }
            },
            getNew(str){
                let formData = new FormData();
                let iconList = document.getElementsByClassName('itemActive');
                formData.append('ids',str);
                let obj = {
                    url: this.all.baseUrl + '/new/userFlowers/delUserFlowerByIds',
                    formdata: formData
                }
                let self = this;
                if(str.length>0){
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.cnt = 1;
                            self.pageNumber = '';
                            self.page  = [];
                            self.flag = 0;
                            self.pageIndex = 1;
                            self.succMsg = '删除成功';
                            self.showInfo = 0;
                            self.isClick = 2;
                            self.isShow=1;
                            self.delAll();
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                                self.getList();
                            },1000);
                        }else if(res.data.status==-95){
                            self.showJump = true;
                            self.err = res.data.msg;
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
                            self.errMsg = res.data.msg;
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }
            },
            // 取消
            cancel(){
                this.showBig = false;
            },
            // 点击全选框
            allSelected(){
                this.isClick = this.isClick==1?2:1;
                this.proList.map((item)=>{
                    if(this.isClick=1&&item.type!=3){
                        item.show = true
                    }else{
                        item.show = false;
                    }
                });
            },
            // 点击单个花型选择
            selectPro(index,ev){
                if(ev&&ev.stopPropagation){
                    //非IE浏览器
                    ev.stopPropagation();
                }else{
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
                window.location.href=this.proList[index].storeIndentSubsidiary.source_file;
            },
            // 下载
            download(e,index){
                if(e.stopPropagation){
                    e.stopPropagation();
                }else{
                    e.cancelBubble=true;
                }
                let self = this;
                if(this.pageType=='flower'){
                    //如果没有合成过，才显示进度条
                    if(self.proList[index].flowerType.attach == self.proList[index].flowerType.preview){
                        self.showProgressBar = true;
                    }
                    let id;
                    let formData = new FormData();
                    if(self.proList[index].type==3){
                        id = self.proList[index].storeIndentSubsidiary.id;
                    }else{
                        id = self.proList[index].flowerType.id;
                    }
                    formData.append('id',id);
                    let obj = {
                        url: self.all.baseUrl + '/app3dFlowerTypeJyg/hd',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.hasFinshed = true;
                            self.showProgressBar = false;
                            setTimeout(function(){
                                self.hasFinshed=false
                                window.location.href = res.data.result+'?response-content-type=application%2Foctet-stream'
                            },500);
                        }else if(res.data.result==-95){
                            self.showJump = true;
                            self.err = res.data.msg;
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = '';
                                localStorage.clear();
                                self.$router.push({
                                    path: '/Login'
                                });
                            },1500);
                        }else{
                            self.errMsg = res.data.msg;
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }else{
                    if(e.stopPropagation){
                        e.stopPropagation();
                    }else{
                        e.cancelBubble=true;
                    }
                    window.location.href = this.proList[index].preview+'?response-content-type=application%2Foctet-stream'
                    // window.location.href=this.proList[index].preview;
                }

            },
            getMessage(){
                let self = this;
                this.showLoading = true;
                Scroll.stop();
                if(this.usertab==0){
                    let formData = new FormData();
                    let obj = {};
                    formData.append('pageSize',8);
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
                            if(result.length){
                                result.list.map(function(item){
                                    item.show = false;
                                });
                            }
                            this.proList = result.list;
                            this.pageNumber = result.pages;
                            this.pageAuto();
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
                            });
                        }else{
                            self.errMsg = res.data.msg;
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }else if(this.usertab==1){
                    let formData = new FormData();
                    let obj = {};
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
                            });
                        }else{
                            self.errMsg = res.data.msg;
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                                Scroll.move();
                            },1000);
                        }
                    });
                }
            },
            chageTab(type){
                this.page=[];
                this.pageIndex=1;
                this.cnt=1;
                type==1?this.getList():this.getMyUpload()
            },
            //获取我的花型
            getList(){
                let self = this;
                self.pageType='flower';
                this.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                let obj = {};
                formData.append('pageSize',8);
                formData.append('page',this.cnt);
                formData.append('type',this.type);
                obj.url = this.all.baseUrl + '/new/userFlowers/list';
                obj.formdata = formData;
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                        Scroll.move();
                    },500);
                    let result;
                    if(res.data.status==0){
                        result = res.data.result;
                        if(result.length){
                            result.list.map(function(item){
                                item.show = false;
                            });
                        }
                        self.proList = result.list;
                        self.pageNumber = result.pages;
                        self.flag = 0;
                        self.isClick=1;
                        self.isShow = 1;
                        self.allSelected();
                        self.delAll()
                        self.pageAuto();
                        //将全选效果去掉
                        let delAll = document.getElementById("delAll");
                        if(delAll){
                            delAll.style.cssText = "display: none;";
                        }
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        self.err = res.data.msg;
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
                        self.errMsg = res.data.msg;
                        self.showInfo = 1;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            Scroll.move();
                        },1000);
                    }
                });
            },
            //获取我上传的花型
            getMyUpload(){
                let self = this;
                self.pageType='myUpload';
                this.showLoading = true;
                Scroll.stop();
                let formData = new FormData();
                let obj = {};
                formData.append('pageSize',8);
                formData.append('page',this.cnt);
                formData.append('type',this.type);
                obj.url = this.all.baseUrl + '/app3dFlowerMyUpload/list';
                obj.formdata = formData;
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                        Scroll.move();
                    },500);
                    let result;
                    if(res.data.status==0){
                        result = res.data.result;
                        if(result.length){
                            result.list.map(function(item){
                                item.show = false;
                            });
                        }
                        self.proList = result.list;
                        self.pageNumber = Math.ceil(result.total/8);
                        self.flag = 0;
                        self.pageAuto();
                        self.isClick=1;
                        self.allSelected();
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        self.err = res.data.msg;
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
                        self.errMsg = res.data.msg;
                        self.showInfo = 1;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
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
                    if(this.pageType=='flower'){
                        this.getList();
                    }else{
                        this.getMyUpload();
                    }
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
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                            }else{
                                this.flag = 1;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                                this.pageIndex = 4;
                            }
                        }else if(index==6){
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                            this.pageIndex = 7;
                        }else{
                            this.cnt = this.page[index].name;
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
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
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                                this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            }else if((this.pageNumber-this.cnt)<=4){
                                this.pageIndex = 7-(this.pageNumber-this.cnt);
                                this.flag = 2;
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                                this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            }else{
                                this.flag = 1;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
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
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                            }else{
                                this.flag = 1;
                                this.pageIndex = 4;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                if(this.pageType=='flower'){
                                    this.getList();
                                }else{
                                    this.getMyUpload();
                                }
                            }
                        }else if(index==0){
                            this.cnt = this.page[index].name;
                            this.flag = 0;
                            this.pageIndex = 1;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                        }else{
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.pageIndex = 7 - (this.pageNumber - this.cnt);
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
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
                        if(this.pageType=='flower'){
                            this.getList();
                        }else{
                            this.getMyUpload();
                        }
                    }
                }else{
                    if(this.cnt!=1){
                        this.cnt--;
                        if(this.pageNumber-this.cnt<=3){
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                        }else if(this.cnt<=4){
                            this.flag = 0;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = this.cnt;
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
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
                        if(this.pageType=='flower'){
                            this.getList();
                        }else{
                            this.getMyUpload();
                        }
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
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                        }else if(this.cnt<=4){
                            this.flag = 0;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = this.cnt;
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            if(this.pageType=='flower'){
                                this.getList();
                            }else{
                                this.getMyUpload();
                            }
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
            },
            // 显示切换
            disHidd(e,index){
                let body = document.getElementById(`${index}`);
                body.style.cssText = "height: 30px;"
                // body.style.cssText = "cursor: pointer;"
                let checkBoxId = 'checkBox'+index;
                let checkBox = document.getElementById(`${checkBoxId}`);
                if(checkBox){
                    checkBox.style.cssText = "display: block;"
                }

            },
            disNone(e,index){
                if(this.proList[index].type!=3){
                    let checkBoxId = 'checkBox'+index
                    let checkBox = document.getElementById(`${checkBoxId}`);
                    checkBox.style.cssText = "display: none;"
                }
                let body = document.getElementById(`${index}`);
                body.style.cssText = "height: 0;"
            },
            disChange(e){
                let icon = e.currentTarget.nextElementSibling.nextElementSibling.nextElementSibling;
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
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
            disChangeImg(e){
                let icon = e.nextElementSibling.nextElementSibling.nextElementSibling;
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
                if(icon.dataset.delshow == 0){
                    icon.style.cssText = "display: block;";
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
            iconNoneImg(index,e){
                //console.log(e.target.previousElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.dataset.delshow)
                if(e.target.previousElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.dataset.delshow==0){
                    this.disChangeImg(e.target.previousElementSibling);
                    this.selectPro(index,e.target.previousElementSibling)
                }else{
                    this.iconNoneImgImg(index,e.target.previousElementSibling.nextElementSibling.nextElementSibling.nextElementSibling)
                }
            },
            iconNoneImgImg(index,e){
                let icon = e;
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
                // icon.style.cssText = "display: none;";
                // icon.dataset.delshow = icon.dataset.delshow==0?1:0;
                if(icon.dataset.delshow==0){
                    icon.dataset.delshow = 1;
                    icon.style.cssText = "display: block;";
                }else{
                    icon.dataset.delshow = 0;
                    icon.style.cssText = "display: none;";
                }
                this.proList[index].show = !this.proList[index].show;
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
                //console.log(icon)
                let delAll = document.getElementById("delAll");
                let iconList = document.getElementsByClassName('itemActive');
                let num = 0;
                // icon.style.cssText = "display: none;";
                // icon.dataset.delshow = icon.dataset.delshow==0?1:0;
                if(icon.dataset.delshow==0){
                    icon.dataset.delshow = 1;
                    icon.style.cssText = "display: block;";
                }else{
                    icon.dataset.delshow = 0;
                    icon.style.cssText = "display: none;";
                }
                this.proList[index].show = !this.proList[index].show;
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
                let iconList = document.getElementsByClassName("itemActive");
                if(this.isShow == 0){
                    delAll.style.cssText = "display: hidden;";
                    for(let i=0;i < iconList.length;i++){
                        if (iconList[i].getAttribute('isMoney') == '0') {
                            iconList[i].style.cssText = "display: hidden;";
                            iconList[i].dataset.delshow = 1;
                        }
                    }
                    this.isShow = 1;
                }else if(this.isShow == 1){
                    console.log(delAll)
                    if (delAll){
                        delAll.style.cssText = "display: none;";
                    }
                    for(let i = 0;i < this.proList.length;i++){
                        this.proList[i].show = !this.proList[i].show;
                    }
                    for(let i=0;i < iconList.length;i++){
                        iconList[i].style.cssText = "display: none;";
                        iconList[i].dataset.delshow = 0;
                    }
                    this.isShow = 0;
                }
            }
        },
        mounted(){
            this.getList();
            // localStorage.setItem('path',this.path);
            // if(localStorage.getItem('English')){
            //     this.$router.push({
            //         path: '/Enflower'
            //     });
            // }else{
            //     this.$router.push({
            //         path: '/Flower'
            //     });
            // }
        }
    }
</script>
<style scoped>
    .flower{
        width: 984px;
        min-height: 100vh;
        height: 100%;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 42px 0;
    }
    .classify{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #8d8d8d;
        font-size: 14px;
    }
    .classify span{
        padding: 0 .625rem;
        height: 1.75rem;
        line-height: 1.75rem;
        color: #8A8888;
        font-size: 14px;
        cursor: pointer;
    }
    .classify span.only{
        color: rgb(26, 24, 24);
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
        /*display: flex;*/
        /*justify-content: center;*/
        align-items: center;
        font-size: 1rem;
        margin-top: 15rem;
    }
    .noData img{
        margin-right: 1.25rem;
    }
    .noData span{
        margin-top: 1.25rem;
    }
    .productBox{
        margin-top: 0px;
        padding-bottom: 0px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
    }
    .productBox li{
        background: #fff;
        box-shadow: 2px 2px 5px #0003;
        overflow: hidden;
        width: 173px;
        height: 222px;
        margin-top: 36px;
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
    .productImg{
        max-width: 17.5rem;
        max-height: 25.9375rem;
        display: block;
        width: 100%;
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
    .download{
        border-radius: .3125rem;
        display: flex;
        align-items: center;
        margin-top: 3%;
    }
    .download>div:first-child{
        width: 118px;
        height: 20px;
        /*border-radius: 50%;*/
        /*border: 1px solid #000;*/
        position: relative;
        left: 0;
        /*margin-left: 11%;*/
        /*margin-right: 39%;*/
    }
    .download>div:last-child{
        display: flex;
    }
    .download>div:last-child>span:first-child{
        background: url('../../assets/image/user/flower-download.png') no-repeat center center;
        background-size: 100%;
        display: block;
        width: 13px;
        height: 17px;
        margin-right: 14.4px;
    }
    .download>div:last-child>span:last-child{
        background: url('../../assets/image/user/flower-delete.png') no-repeat center center;
        background-size: 100%;
        display: block;
        width: 17.3px;
        height: 18px;
    }
    .download:hover span{
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
    /* .clickBox{
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
    } */
    .downloadBox{
        position: absolute;
        z-index: 77;
        bottom: 0;
        width: 100%;
        background: #F6F6F6;
        transition: all 0.5s;
        overflow: hidden;
    }
    .downloadBox span{
        display: block;
        width: 100%;
        height: 30px;
        /*border-radius: .625rem;*/
        line-height: 30px;
        /*background: #ffe300;*/
        color: #000;
        margin: 0 auto;
        font-size: 14px;
    }
    /* 分页器 */
    ul.pageBox{
        /*padding-bottom: 3.125rem;*/
        display: flex;
        margin-top: 36px;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 1.875rem;
        height: 1.875rem;
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
        /*justify-content: space-between;*/
        color: #333333;
        display: flex;
        color: #8A8888;
    }
    .titleBox .only{
        color: rgb(26, 24, 24);
    }
    .titleBox>div:first-child{
        margin-top: 24px;
        font-size: 14px;
        margin-left: 5%;
        cursor: pointer;
    }
    .titleBox>div:last-child{
        display: flex;
        margin-top: 24px;
        margin-right: 22px;
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
    }
    .delAll{
        width: 100px;
        display: flex;
        float: left;
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
