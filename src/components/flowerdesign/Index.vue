<template>
    <div class="flowerdesign">
        <!-- 花型设计 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="source" v-if="navIndex==0">
                <div class="smallBox">
                    <div class="classify" v-if="count">
                        <h4>分类：</h4>
                        <ul v-if="count" class="classBox">
                            <li v-for="(typeItem,index) in classifyList.type" @mouseenter.stop="downType(typeItem,$event,index)" @mouseleave.stop="upType(typeItem,$event)" :class="typeItem.active?'click':''" class="act"  :key="'type-'+index">
                                <span :style="{'z-index': 99-index}" @click="clickType(index)">{{typeItem.name}}</span> <img v-if="typeItem.list.length" src="../../assets/image/flower/bottom.png">
                            </li>
                            <div id="listBox" style="display: none;" @mouseenter.stop="downList()" @mouseleave.stop="upList()" :data-act="0" class="listBox">
                                <span :class="listItem.active?'click':''" @click="updateMessage(itemNum,listIndex)" v-for="(listItem,listIndex) in itemType.list" :key="'list'+listIndex">{{listItem.name}}</span>
                            </div>
                        </ul>
                        <span v-else style="margin-bottom: 1.25rem;">无</span>
                    </div>
                    <hr v-if="count" style="position: absolute;left:10rem;width: 80%;text-align: center;border: .5px dotted  #DBD6D6;"/>
                    <div class="classify" v-if="count">
                        <h4>风格：</h4>
                        <ul v-if="count" class="classBox">
                            <li :class="item.active?'click':''" v-for="(item,index) in classifyList.style" :key="'style-'+index">
                                <span @click="clickStyle(index)" style="z-index: 6;">{{item.name}}</span>
                            </li>
                        </ul>
                        <span v-else style="margin-bottom: 1.25rem;">无</span>
                    </div>
                    <hr v-if="count" style="position: absolute;left:10rem;width: 80%;text-align: center;border: .5px dotted  #DBD6D6;"/>
                    <div class="classify">
                        <h4>类型：</h4>
                        <ul class="classBox">
                            <li :class="item.show?'click':''" @click="clickSource(index)" :style="{color: item.show?'#333':'#8d8d8d'}" v-for="(item,index) in classifyList.source" :key="'source-'+index">
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                    <div :class="count ? 'topBox' : 'myTop'">
                        <ul class="topNav" v-if="count">
                            <li @click="changeNav(index)" :style="{color: item.show?'#333':'#8d8d8d'}" v-for="(item,index) in tabNav" :key="index">{{item.name}} <hr v-if="item.show" style="background: #F06D29;height:4px;width:60px;margin: 0 auto;border: none;border-radius: 4px;"/></li>
                        </ul>
                        <div>
                            <div v-if="count" class="btnBox">
                                <ul>
                                    <li @click="clickBtn(index)" :class="item.show?'click':''" v-for="(item,index) in classifyList.btn" :key="'btn-'+index">
                                        <div :class="item.show?'':'selected'">
                                            <img :class="item.show ? '' : 'checked'" src="../../assets/image/shopping/Radio.png">
                                        </div>
                                    {{item.name}} 
                                    </li>
                                </ul>
                            </div>
                            <ul class="pageBox" v-if="pageNumber!=0">
                                <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                                <span class="page">{{cnt}}</span>/<span>{{pageNumber}}</span>
                                <!-- <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li> -->
                                <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="count" class="shareBox">
                    <ul v-if="proList.length" class="proBox">
                        <li v-for="(item,index) in proList" :key="'product'+index">
                            <img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.pictureThumbnail" alt="">
                            <input @click="seleThis(index)" type="checkbox" :checked="item.show">
                            <span class="backLine"></span>
                            <!-- <div class="sizeBox">
                                <span>尺寸：{{item.width}}px*{{item.height}}px</span>
                                <span>大小：{{item.size}}MB</span>
                            </div> -->
                        </li>
                    </ul>
                    <div class="shareNone" v-else>
                        <div>
                            <img src="../../assets/image/flower/countNone1.png">
                            <span>空空如也</span>
                        </div>
                    </div>
                </div>
                <div class="modelBox">
                    <div>
                        <span>1.选择素材</span><span>2.排版生成</span>
                    </div>
                    <div>
                        <span class="mouse" @click="sureClick">确定</span>
                        <ul class="pageBox" v-if="pageNumber!=0">
                            <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                            <span class="page">{{cnt}}</span>/<span>{{pageNumber}}</span>
                            <!-- <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li> -->
                            <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                        </ul>
                        <input type="text" class="pageNumber" v-model="jumpPage">
                        <span class="mouse" @click="pageJump">go</span>
                    </div>
                </div>
                <div class="mineBox" v-if="!count">
                    <div style="height: 38px;"></div>
                    <!-- 滚动加载数据 -->
                    <ul class="proBox">
                        <li>
                            <div class="notExist">
                                <div class="existImg">
                                    <img src="../../assets/image/flower/icon_add.png" alt="">
                                    <span>上传本地素材</span>
                                    <span style="display: block;font-size: .75rem;">（只支持png格式）</span>
                                </div>
                                <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                            </div>
                        </li>
                        <li v-for="(item,index) in mineList" :key="'mine'+index">
                            <img class="proImg" alt="" :src="item.picture">
                            <input @click="seleThis(index)" :checked="item.show" type="checkbox">
                            <span class="backLine"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err" :change="imgChange"></Jump>
        <!-- <Loading v-if="showLoading"></Loading> -->
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
// import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Flowerdesign',
    components: {
        Tab,
        // Loading,
        Jump
    },
    data(){
        return {
            path: '/Flowerdesign',
            tabIndex: 1,
            showJump: false,
            err: '',
            imgChange:true,
            height: '',
            showLoading: false,
            // 左侧按钮内容
            leftNav: [{name: '添加素材',show: true},{name: '花型构图',show: false},{name: '添加底纹',show: false},{name: 'AI配色',show: false}],
            navIndex: 0,
            // 右侧顶部选项按钮
            tabNav: [{name: "印花",show: true},{name: '绣花',show: false}],
            classifyList: {
                type: [],
                style: [],
                source: [{name: '共享素材',show: true},{name: '我的素材',show: false},{name: '商城素材',show: false}],
                btn: [{name: '热门',show: true},{name: '最新',show: false}]
            },
            itemType:[],
            itemNum:'',
            // 存储请求共享素材和商城素材的需要传入后台的信息
            message: {},
            // 控制分类的显示隐藏
            count: true,
            // 页数
            cnt: 1,
            pageIndex: 1,
            flag: 0,
            // 将要跳转的页面数
            jumpPage:1,
            // 商品数据
            proList: [],
            // 分页数
            pageNumber: 0,
            page: [],
            // 添加素材的路径
            url: [],
            mineList: [],
            mineFlag: false,
            mineCnt: 1,
            specialType: 0,
            ourMessage: [],
            arr: []
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 获取高度
        getHeight(){
            this.height = document.offsetHeight-74 + 'px';
        },
        // 右侧顶部选项切换
        changeNav(index){
            let self = this;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.tabNav.map(function(item){
                item.show = false;
            });
            this.tabNav[index].show = true;
            this.message.printingOrEmbroider = index;
            if(this.count){
                this.getShare(this.message);
            }else{
                this.mineList = [];
                this.getMine();
                this.loadData();
            }
        },
        // 鼠标移入移出点击效果
        downType(val,e,num){
            if(val.list.length > 0){
                let listBox = document.getElementById("listBox");
                e.target.style.cssText = "z-index:21;border:1px solid #F06D29;border-bottom: 1px solid #fff;";
                if(e.target.firstElementChild.nextElementSibling){
                    e.target.firstElementChild.nextElementSibling.src = require('../../assets/image/flower/top1.png');
                    e.target.firstElementChild.nextElementSibling.style.cssText = "position: relative;top: 3px;"
                }
                this.itemType = val;
                this.itemNum = num;
                this.$forceUpdate();
                listBox.style.cssText = 'display: block;';
            }
        },
        upType(val,e){
            let listBox = document.getElementById("listBox");
            if(listBox.dataset.act == 0){
                e.target.style.cssText = " ";
                if(e.target.firstElementChild.nextElementSibling){
                    e.target.firstElementChild.nextElementSibling.src = require('../../assets/image/flower/bottom.png');
                    e.target.firstElementChild.nextElementSibling.style.cssText = "position: relative;top: 0;";
                }
                listBox.style.cssText = 'display: none;';
            }
        },
        downList(){
            let listBox = document.getElementById("listBox");
            let actList = document.getElementsByClassName("act");
            for(let i = 0;i < actList.length;i++){
                if(actList[i].lastElementChild){
                    if(i == this.itemNum){
                        actList[i].style.cssText = "z-index:21;border:1px solid #F06D29;border-bottom: 1px solid #fff;";
                        actList[i].lastElementChild.src = require('../../assets/image/top.png');
                    }
                }
            }
            listBox.style.cssText = 'display: block;';
            listBox.dataset.act = 1;
        },
        upList(){
            let listBox = document.getElementById("listBox");
            listBox.dataset.act = 0;
            let actList = document.getElementsByClassName("act");
            for(let i = 0;i < actList.length;i++){
                actList[i].style.cssText = "";
                if(actList[i].lastElementChild){
                    actList[i].lastElementChild.src = require('../../assets/image/bottom.png');
                }
            }
            listBox.style.cssText = 'display: none;';
        },
        clickType(index){
            let self = this;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.type.map(function(item){
                item.active = false;
            });
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list.map(function(item){
                item.active = false;
            });
            this.message.genre1 = this.classifyList.type[index].id;
            delete this.message.genre2;
            this.getShare(this.message);
        },
        // 点击每个下拉列表里的内容
        updateMessage(index,listIndex){
            let self = this;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.type.map(function(item){
                item.active = false;
                item.list.map(function(listItem){
                    listItem.active = false;
                });
            });
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list.map(function(item){
                item.active = false;
            });
            this.classifyList.type[index].list[listIndex].active = true;
            this.message.genre1 = this.classifyList.type[index].id;
            this.message.genre2 = this.classifyList.type[index].list[listIndex].id;
            this.getShare(this.message);
        },
        // 风格点击
        clickStyle(index){
            let self = this;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.style.map(function(item,mapIndex){
                if(mapIndex!=index){
                    item.active = false;
                }
            });
            this.classifyList.style[index].active = !this.classifyList.style[index].active;
            if(this.classifyList.style[index].active==true){
                this.message.styleType = this.classifyList.style[index].id;
            }else{
                this.message.styleType = '';
            }
            this.getShare(this.message);
        },
        //素材点击记录
        clickCount(index){
            console.log('11')
            if(this.specialType!=1){
                let formData = new FormData();
                formData.append('tbApp3dMaterialLibraryJygId',this.proList[index].id);
                let obj = {
                    url: this.all.baseUrl + '/app3dMaterialLibraryClickJyg/save',
                    formdata: formData
                }
                this.getData(obj).then(res=> {
                })
            }
        },
        // 素材点击
        clickSource(index){
            let self = this;
            this.specialType = index;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.source.map(function(item){
                item.show = false;
            });
            this.classifyList.source[index].show = true;
            if(index==1){
                this.count = false;
                this.mineList = [];
                this.getMine();
            }else{
                this.count = true;
                this.message.type = index;
                this.getShare(this.message);
            }
        },
        // 按钮点击
        clickBtn(index){
            let self = this;
            this.page = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.btn.map(function(item){
                item.show = false;
            });
            this.classifyList.btn[index].show = true;
            if(index==0){
                this.message.orderBy = 2;
            }else if(index==1){
                this.message.orderBy = 1;
            }
            this.getShare(this.message);
        },
        // 共享素材和商城素材请求数据
        getShare(message){
            this.showLoading = true;
            Scroll.stop();
            let formData = new FormData();
            let self = this;
            formData.append('pageSize',20);
            formData.append('page',this.cnt)
            // 选择印花或者绣花
            if(message && message.printingOrEmbroider){
                formData.append('printingOrEmbroider',message.printingOrEmbroider);
            }else{
                formData.append('printingOrEmbroider',0);
            }
            // 选择热门或者最新
            if(message && message.orderBy){
                formData.append('orderBy',message.orderBy);
            }else{
                formData.append('orderBy',2);
            }
            // 选择大类型
            if(message && message.genre1){
                formData.append('genre1',message.genre1);
            }else{
                formData.append('genre1',1);
            }
            // 选择小类型
            if(message && message.genre2){
                formData.append('genre2',message.genre2);
            }
            // 选择风格
            if(message && message.styleType){
                formData.append('styleType',message.styleType);
            }
            // 选择共享素材或者商城素材
            if(message && message.type){
                formData.append('type',message.type);
            }else{
                formData.append('type',0);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                this.showLoading = false;
                // console.log(res)
                Scroll.move();
                if(res.data.status==0){
                    let result = res.data.result;
                    this.pageNumber = result.pages;
                    // this.pageAuto();
                    let n = true;
                    let str = '';
                    let arr = [];
                    if(localStorage.getItem('indexArr')){
                        str = localStorage.getItem('indexArr');
                        arr = str.split(',');
                    }
                    this.proList = result.list;
                    this.proList.map(function(item,index){
                        item.size = (item.size/1024/1024).toFixed(2);
                        item.show = false;
                        if(arr.length){
                            arr.map(function(arrItem,arrIndex){
                                if(arrItem==item.id){
                                    item.show = true;
                                }
                            });
                        }
                    });
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
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
        // 我的素材
        getMine(){
            this.showLoading = true;
            Scroll.stop();
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',9);
            formData.append('page',this.cnt);
            formData.append('type1',1);
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                if(res.data.status==0){
                    this.mineList = [];
                    let result = res.data.result;
                    this.pageNumber = result.pages;
                    if(result.hasNextPage){
                        this.mineFlag = true;
                    }
                    let list = result.list;
                    let str = '';
                    let arr = [];
                    if(localStorage.getItem('indexArr')){
                        str = localStorage.getItem('indexArr');
                        arr = str.split(',');
                    }
                    for(let i=0;i<list.length;i++){
                        this.mineList.push(list[i]);
                    }
                    this.mineList.map(function(item,index){
                        item.show = false;
                        if(arr.length){
                            arr.map(function(arrItem,arrIndex){
                                if(arrItem==item.id){
                                    item.show = true;
                                }
                            });
                        }
                    });
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
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
        // 获取头部分页的json数据
        getClassifyList(){
            let formData = new FormData();
            let self = this;
            formData.append('id',4);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    this.classifyList.type = JSON.parse(result.json1).pdMenu;
                    this.itemType = JSON.parse(result.json1).pdMenu;
                    this.classifyList.style = JSON.parse(result.json2).pdStyle;
                    this.classifyList.type.map(function(item){
                        item.active = false;
                        item.show = false;
                        item.list.map(function(listItem){
                            listItem.active = false;
                        });
                    });
                    this.classifyList.type[0].active = true;
                    this.classifyList.style.map(function(item){
                        item.active = false;
                    });
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
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
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                this.cnt = index+1;
                this.getShare(this.message);
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
                            this.getShare(this.message);
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getShare(this.message);
                            this.pageIndex = 4;
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getShare(this.message);
                        this.pageIndex = 7;
                    }else{
                        this.cnt = this.page[index].name;
                        this.getShare(this.message);
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
                            this.getShare(this.message);
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getShare(this.message);
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getShare(this.message);
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
                            this.getShare(this.message);
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getShare(this.message);
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getShare(this.message);
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getShare(this.message);
                    }
                }
            }
        },
        // 滚动加载数据
        // loadData(){
        //     window.onscroll = ()=>{
        //         let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 50;
        //         if(bottomOfWindow && this.mineFlag){
        //             this.mineFlag = false;
        //             this.mineCnt+=1;
        //             this.getMine();
        //         }
        //     }
        // },
        // 上一页
        prev(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt==1){
                    this.showJump = true;
                    this.err = "已经是第一页了";
                    this.imgChange = 'top';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }else{
                    this.cnt-=1;
                    this.pageIndex-=1;
                    if(!this.count){
                        this.getMine();
                    }else{
                        this.getShare(this.message);
                    }
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getShare(this.message);
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getShare(this.message);
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getShare(this.message);
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是第一页了";
                    this.imgChange = 'top';
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
                    if(!this.count){
                        this.getMine();
                    }else{
                        this.getShare(this.message);
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
                    this.imgChange = 'bottom';
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
                        this.getShare(this.message);
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getShare(this.message);
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getShare(this.message);
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
                    this.imgChange = 'bottom';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        // 分页跳转
        pageJump(){
            let page = this.jumpPage;
            let _this = this;
            let test = /^[0-9]*$/;
            if(test.test(page)){
                if(page < this.pageNumber){
                    if(page < 1){
                        this.jumpPage = 1;
                        page = 1;
                    };
                    this.cnt = page;
                    this.pageIndex = page;
                    if(!this.count){
                        this.getMine();
                    }else{
                        this.getShare(this.message);
                    }
                }else{
                    this.showJump = true;
                    this.err = "超出最高页数";
                    this.imgChange = 'bottom';
                    Scroll.stop();
                    setTimeout(function(){
                        _this.jumpPage = 1;
                        _this.showJump = false;
                        _this.err = '';
                        Scroll.move();
                    },1000);
                }
            }else{
                this.showJump = true;
                this.err = "请输入正确的页码";
                this.imgChange = 'bottom';
                Scroll.stop();
                setTimeout(function(){
                    _this.jumpPage = 1;
                    _this.showJump = false;
                    _this.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 选中当前的框
        seleThis(index){
            let self = this;
            if(this.count){
                this.proList[index].show = !this.proList[index].show;
                this.proList.map(function(item,index){
                    if(item.show){
                        let isContain=false;
                        self.arr.map(function(arrItem,arrIndex){
                            if(arrItem==item.id){
                                isContain=true;
                            }
                        });
                        if(!isContain){
                            self.arr.push(item.id);
                            self.ourMessage.push(item);
                        }
                    }else{
                        self.arr.map(function(arrItem,arrIndex){
                            if(arrItem==item.id){
                                self.arr.splice(arrIndex,1);
                            }
                        });
                        self.ourMessage.map(function(arrItem,arrIndex){
                            if(arrItem.id==item.id){
                                self.ourMessage.splice(arrIndex,1);
                            }
                        });
                    }
                });
            }else{
                this.mineList[index].show = !this.mineList[index].show;this.mineList.map(function(item,index){
                    if(item.show){
                        let isContain=false;
                        self.arr.map(function(arrItem,arrIndex){
                            if(arrItem==item.id){
                                isContain=true;
                            }
                        });
                        if(!isContain){
                            self.arr.push(item.id);
                            self.ourMessage.push(item);
                        }
                    }else{
                        self.arr.map(function(arrItem,arrIndex){
                            if(arrItem==item.id){
                                self.arr.splice(arrIndex,1);
                            }
                        });
                        self.ourMessage.map(function(arrItem,arrIndex){
                            if(arrItem.id==item.id){
                                self.ourMessage.splice(arrIndex,1);
                            }
                        });
                    }
                });
            }
            if(this.proList[index].show){
                this.clickCount(index)
            }
            this.arr = Array.from(new Set(self.arr));
            localStorage.setItem('indexArr',self.arr);
            this.ourMessage = Array.from(new Set(self.ourMessage));
            localStorage.setItem('ourMessage',JSON.stringify(this.ourMessage));
            this.$forceUpdate();
        },
        // 传id和缩略图
        sureClick(){
            let self = this;
            let msg = JSON.parse(localStorage.getItem('ourMessage'));
            if(msg){
                let img = new Image();
                msg.map(function(item,index){
                    img.src = item.pictureThumbnail;
                    if(!item.width){
                        item.width = img.width;
                        item.height = img.height;
                    }
                });
            }else{
                msg = [];
            }
            localStorage.setItem('operateList',JSON.stringify(msg));
            localStorage.setItem('specialType',self.specialType);
            // 页面跳转
            self.$router.push({
                path: '/Newoperate'
            });
            // self.$router.push({
            //     path: '/Operate',
            //     query: {
            //         message: msg,
            //         type: 1,
            //         specialType: self.specialType
            //     }
            // });
        },
        // 添加素材
        addClassify(str){
            let formData = new FormData();
            let self = this;
            formData.append('type1',1);
            formData.append('picture',str);
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                this.showLoading = false;
                if(res.data.status==0){
                    this.showJump = true;
                    this.err = '上传成功';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        self.mineList = [];
                        self.getMine();
                    },1000);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
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
        add(e){
            this.url = [];
            let self = this;
            let files = e.target.files;
            for(let i=0;i<files.length;i++){
                this.url.push(e.target.files[i]);
            }
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            this.url.map(function(item,index){
                if(self.url[index].name.substring(self.url[index].name.length-3,self.url[index].name.length)!='png'){
                    self.showJump = true;
                    self.err = '只支持上传png格式图片';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                    return;
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
                        self.addClassify(res.data.result);
                        self.url = [];
                    });
                }
            });
        }
    },
    mounted(){
        this.getHeight();
        this.arr = [];
        this.getClassifyList();
        this.getShare();
        localStorage.removeItem('indexArr');
        localStorage.removeItem('ourMessage');
        // localStorage.setItem('path',this.path);
        // if(localStorage.getItem('English')){
        //     this.$router.push({
        //         path: '/Enflowerdesign'
        //     });
        // }else{
        //     this.$router.push({
        //         path: '/Flowerdesign'
        //     });
        // }
    }
}
</script>
<style scoped>
    .flowerdesign{
        min-height: 100vh;
        background: #fff;
    }
    .content{
        width: 100%;
        margin: 3rem auto .5rem;
        display: flex;
        justify-content: flex-start;
    }
    .source{
        width: 100%;
    }
    .mineBox{
        width: 100%;
        height: 750px;
        background: #f6f6f6;
    }
    .topBox{
        display: flex;
        width: 1200px;
        margin: 0 auto;
        justify-content: space-between;
        align-items: flex-end;
        height: 3.657rem;
        line-height: 3.657rem;
    }
    .topBox>div{
        display: flex;
    }
    ul.topNav{
        display: flex;
        align-items: center;
    }
    ul.topNav li{
        width: 5.044rem;
        font-size: 16px;
        /* height: 1.576rem; */
    }
    .smallBox{
        box-sizing: border-box;
        padding: 0 2.5rem;
    }
    .shareBox{
        width: 100%;
        min-height: 610px;
        background: #F6F6F6;
        position: absolute;
        left: 1px;
    }
    .classify{
        position: relative;
        display: flex;
        justify-content: flex-start;
        margin: 0 auto;
        width: 1200px;

    }
    .classify h4{
        font-size: 16px;
        color: rgba(51,51,51,0.50);
        font-weight: bold;
        flex-shrink: 0;
        line-height: 59px;
    }
    .classify ul.classBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        font-size: 16px;
        height: 59px;
        min-width: 1555px;
    }
    ul.classBox li{
        position: relative;
        cursor: default;
        height: 32px;
        text-align: center;
        line-height: 32px;
        margin-right: 4px;
        border: 1px solid #fff;
    }
    .classify>span{
        font-size: 14px;
        border: 1px solid #fff;
        padding: 5px 16px;
        color: #333;
    }
    ul.classBox li>span{
        position: relative;
        z-index: 2223;
        color: #8d8d8d;
        font-size: 14px;
        padding: 8px;
        padding-bottom: 0;
    }
    ul.classBox li>img{
        margin-right: 5px;
        margin-left: -6px;
    }
    ul.classBox li.click>span,ul.classBox li>span:hover{
        color: #F06D29;
    }
    ul.classBox li:last-child{
        margin-right: 0;
    }
    ul.classBox .listBox{
        position: absolute;
        width: 100%;
        height: 2.891rem;
        background: #fff;
        line-height: 2.891rem;
        border: 1px solid #F06D29;
        cursor: default;
        top: 77.5%;
        left: 0;
        text-align: left;
        z-index: 20;
    }
    .listBox>span{
        font-size: 14px;
        color: #666666;
        margin: auto 1rem;
    }
    .listBox>span.click,.listBox>span:hover{
        color: #F06D29;
        font-weight: bold;
    }
    ul.sourceBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: .625rem;
    }
    ul.sourceBox li{
        padding: 0 2.0625rem;
        position: relative;
        color: #8d8d8d;
        font-size: 18px;
        cursor: default;
    }
    ul.sourceBox li:first-child{
        padding-left: 0;
    }
    ul.sourceBox li:after{
        content: '';
        width: 1px;
        height: 1.125rem;
        background: #8d8d8d;
        top: calc(50% - .5625rem);
        right: 0;
        position: absolute;
    }
    ul.sourceBox li:last-child:after{
        display: none;
    }
    .btnBox{
        display: flex;
        justify-content: flex-start;
        /* margin-bottom: .625rem; */
    }
    .btnBox ul{
        display: flex;
    }
    .btnBox ul li{
        min-width: 2.125rem;
        height: 3.5rem;
        line-height: 3.5rem;
        cursor: default;
        background: inherit;
        font-size: 14px;
        color: #334150;
        padding: 0 .5rem;
        text-align: center;
        margin-right: 1.25rem;
    }
    .btnBox ul li div{
        display: inline;
    }
    .btnBox ul li div img{
        width: 18px;
        height: 18px;
        margin-right: 5px;
        position: relative;
        top: 2px;
    }
    .btnBox ul li div.selected{
        display: inline-block;
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
        margin-right: 8px;
        border: 1px solid #333;
        border-radius: 50%;
    }
    .btnBox ul li div img.checked{
        display: none;
    }
    /* 切换为我的素材时 */
    .myTop{
        display: flex;
        justify-content: flex-end;
        width: 1200px;
        margin: 0 auto;
    }
    ul.proBox{
        width: 1200px;
        margin: 38px auto 0;
        box-sizing: border-box;
        overflow: hidden;
    }
    ul.proBox li{
        float: left;
        width: 220px;
        height: 328px;
        overflow: hidden;
        background: #fff;
        margin-right: 24px;
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
        flex-shrink: 1;
        position: relative;
        align-items: center;
    }
    ul.proBox li.noSee{
        opacity: 0;
    }
    ul.proBox li:nth-child(5n+0){
        margin-right: 0;
    }
    ul.proBox input[type="checkbox"]{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        opacity: 0;
        right: .625rem;
    }
    .backLine{
        position: absolute;
        width: 1.0089rem;
        height: 1.0089rem;
        border: 1px solid #33333355;
        border-radius: 4px;
        top: .625rem;
        left: .625rem;
        z-index: 9;
        background: url('../../assets/image/user/tgb-20px.png') no-repeat center;
        background-size: 100%;
    }
    ul.proBox input[type="checkbox"]:checked + .backLine{
        width: 1.1rem;
        height: 1.1rem;
        border: 1px solid #fff;
        background: url('../../assets/image/user/tg-20px.png') no-repeat center;
        background-size: 100%;
    }
    .sizeBox{
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        height: 3.125rem;
        background: rgba(51,51,51,0.4);
        border-radius: 0 0 .3125rem .3125rem;
        text-align: left;
        box-sizing: border-box;
        padding-left: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        display: none;
    }
    .sizeBox span{
        display: block;
    }
    ul.proBox li:hover .sizeBox{
        display: block;
    }
    .modelBox{
        width: 100%;
        height: 6rem;
        position: fixed;
        bottom: 0rem;
        left: 0;
        background: #fff;
        z-index: 10;
        display: flex;
        justify-content: space-around;
    }
    .modelBox>div{
        display: flex;
        align-items: center;
    }
    .modelBox>div span{
        font-size: 14px;
    }
    .modelBox>div:first-child span:first-child{
        color: #E36940;
        margin-right: 1.135rem;
    }
    .modelBox>div:last-child>span{
        width: 88px;
        height: 30px;
        border-radius: 4px;
        line-height: 30px;
        color: #333;
        background: #ffe300;
        margin-right: 3.972rem;
    }
 /* 分页器 */
    ul.pageBox{
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        margin: 0 .3125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    ul.pageBox span{
        font-size: 18px;
    }
    ul.pageBox span.page{
        color: #F06D29;
    }
    ul.pageBox li.click{
        background: black;
        color: #fff;
    }
    ul.pageBox li img{
        display: block;
        width: 8px;
        height: 16px;
        margin: 10px auto;
    }
    /* 我的素材 */
    .notExist{
        width: 100%;
        height: 100%;
    }
    .existImg span{
        font-size: 14px;
        color: #333333;
    }
    .notExist img{
        width: 28.1px;
        height: 28.1px;
        display: block;
        margin: 101.6px 96.3px 25.3px;
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
    .sureBtn{
        position: fixed;
        z-index: 100;
        bottom: 2.5rem;
        right: 30.625rem;
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        font-size: .625rem;
        text-align: center;
        border-radius: 1.25rem;
    }
    .proImg{
        max-width: 204px;
        max-height: 204px;
    }
    .shareNone>div{
        width: 220px;
        height: 250px;
        margin: 100px auto 0;
    }
    .shareNone>div img{
        width: 200px;
        height: 200px;
        color: #fff;
        font-size: 16px;
        line-height: 0;
        padding-top:0;
    }
    .shareNone>div span{
        display: block;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        line-height: 0;
        margin-top: 8px;
    }
    .mouse:hover,.classBox li span:hover,.listBox span:hover,.topNav li:hover,.btnBox ul li div:hover,.pageBox li:hover{
        cursor: pointer;
    }
    .mouse:hover{
        background: #ffd000 !important;
    }
    .pageNumber{
        display: inline-block;
        width: 80px;
        height: 25px;
        margin-right: 20px;
    }
</style>