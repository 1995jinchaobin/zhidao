<template>
    <div class="flowerdesign">
        <!-- 花型设计 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="source" v-if="navIndex==0">
                <ul class="topNav">
                    <li @click="changeNav(index)" :style="{color: item.show?'#333':'#8d8d8d'}" v-for="(item,index) in tabNav" :key="index">{{item.name}}</li>
                </ul>
                <div class="smallBox">
                    <div class="classify">
                        <h4>Type：</h4>
                        <ul v-if="count" class="classBox">
                            <li @mouseenter="downType(index)" @mouseleave="upType(index)" :class="typeItem.active?'click':''" v-for="(typeItem,index) in classifyList.type" :key="'type-'+index">
                                <span :style="{'z-index': 99-index}" @click="clickType(index)">{{typeItem.english}}</span>
                                <div v-if="typeItem.list.length" :style="{display: typeItem.show?'block':'none','z-index': 98-index}" class="listBox">
                                    <span :class="listItem.active?'click':''" @click="updateMessage(index,listIndex)" v-for="(listItem,listIndex) in typeItem.list" :key="'list'+listIndex">{{listItem.english}}</span>
                                </div>
                            </li>
                        </ul>
                        <span v-else style="margin-bottom: 1.25rem;">Nothing</span>
                    </div>
                    <div class="classify">
                        <h4>Style：</h4>
                        <ul v-if="count" class="classBox">
                            <li :class="item.active?'click':''" v-for="(item,index) in classifyList.style" :key="'style-'+index">
                                <span @click="clickStyle(index)" style="z-index: 6;">{{item.english}}</span>
                            </li>
                        </ul>
                        <span v-else style="margin-bottom: 1.25rem;">Nothing</span>
                    </div>
                    <div class="classify" style="margin-bottom: 1.25rem;">
                        <ul class="sourceBox">
                            <li @click="clickSource(index)" :style="{color: item.show?'#333':'#8d8d8d'}" v-for="(item,index) in classifyList.source" :key="'source-'+index">{{item.name}}</li>
                        </ul>
                    </div>
                    <div v-if="count" class="btnBox">
                        <button @click="clickBtn(index)" :class="item.show?'click':''" v-for="(item,index) in classifyList.btn" :key="'btn-'+index">{{item.name}}</button>
                    </div>
                </div>
                <div v-if="count" class="shareBox">
                    <ul v-if="proList.length" class="proBox">
                        <li v-for="(item,index) in proList" :key="'product'+index">
                            <img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.pictureThumbnail" alt="">
                            <input @click="seleThis(index)" type="checkbox" :checked="item.show">
                            <span class="backLine"></span>
                            <div class="sizeBox">
                                <span>Size：{{item.width}}px*{{item.height}}px</span>
                                <span>Stock：{{item.size}}MB</span>
                            </div>
                        </li>
                    </ul>
                    <div style="color: #333;font-size: 1.8rem;line-height: 16;" v-else>There is no such style for the time being</div>
                    <ul class="pageBox" v-if="pageNumber!=0">
                        <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                        <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                        <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                        <li class="sureList" @click="sureClick">Determine</li>
                    </ul>
                </div>
                <div class="mineBox" v-if="!count">
                    <!-- 滚动加载数据 -->
                    <ul class="proBox">
                        <li>
                            <div class="notExist">
                                <div class="existImg">
                                    <img src="../../assets/image/user/icon_add.png" alt="">
                                    <span>Upload local material</span>
                                    <span style="display: block;font-size: .75rem;">（png format only）</span>
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
                    <span class="sureBtn" @click="sureClick">Determine</span>
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
    name: 'Enflowerdesign',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            specialType: 0,
            path: '/Enflowerdesign',
            tabIndex: 3,
            showJump: false,
            err: '',
            height: '',
            showLoading: false,
            // 左侧按钮内容
            leftNav: [{name: 'Adding material',show: true},{name: 'Pattern',show: false},{name: 'Adding undertone',show: false},{name: 'AI Colour',show: false}],
            navIndex: 0,
            // 右侧顶部选项按钮
            tabNav: [{name: "Printing",show: true},{name: 'Embroidery',show: false}],
            classifyList: {
                type: [],
                style: [],
                source: [{name: 'Sharing material',show: true},{name: 'My material',show: false},{name: 'Shopping Mall Material',show: false}],
                btn: [{name: 'Hot',show: true},{name: 'New',show: false}]
            },
            ourMessage: [],
            // 存储请求共享素材和商城素材的需要传入后台的信息
            message: {},
            // 控制分类的显示隐藏
            count: true,
            // 页数
            cnt: 1,
            pageIndex: 1,
            flag: 0,
            // 商品数据
            proList: [],
            // 分页数
            pageNumber: 0,
            page: [],
            // 添加素材的路径
            url: '',
            mineList: [],
            mineFlag: false,
            mineCnt: 1,
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
            // this.getShare()
            if(this.count){
                this.getShare(this.message);
            }else{
                this.mineList = [];
                this.getMine();
                this.loadData();
            }
        },
        // 鼠标移入移出点击效果
        downType(index){
            this.classifyList.type.map(function(item){
                item.show = false;
            });
            this.classifyList.type[index].show = true;
            this.$set(this.classifyList.type,index,this.classifyList.type[index]);
        },
        upType(index){
            this.classifyList.type.map(function(item){
                item.show = false;
            });
            this.$set(this.classifyList.type,index,this.classifyList.type[index]);
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
                this.loadData();
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
            formData.append('page',this.cnt);
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
                formData.append('orderBy',1);
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
            }
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                this.showLoading = false;
                Scroll.move();
                if(res.data.status==0){
                    let result = res.data.result;
                    this.pageNumber = result.pages;
                    this.pageAuto();
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
            formData.append('pageSize',20);
            formData.append('page',this.mineCnt);
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
                    let result = res.data.result;
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
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 50;
                if(bottomOfWindow && this.mineFlag){
                    this.mineFlag = false;
                    this.mineCnt+=1;
                    this.getMine();
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
                    this.getShare(this.message);
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
                    this.getShare(this.message);
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
                                self.ourMessage.splice(arrIndex,1);
                            }
                        });
                    }
                });
            }
            this.arr = Array.from(new Set(self.arr));
            localStorage.setItem('indexArr',self.arr);
            this.ourMessage = Array.from(new Set(self.ourMessage));
            this.$forceUpdate();
            localStorage.setItem('ourMessage',JSON.stringify(this.ourMessage));
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
            // 页面跳转
            localStorage.setItem('operateList',JSON.stringify(msg));
            localStorage.setItem('specialType',self.specialType);
            // 页面跳转
            self.$router.push({
                path: '/Ennewoperate'
            });
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
                    this.err = 'Upload Success';
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
                    self.err = 'Only upload PNG format pictures';
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
        this.getClassifyList();
        this.getShare();
        this.arr = [];
        localStorage.removeItem('indexArr');
        localStorage.removeItem('ourMessage');
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enflowerdesign'
            });
        }else{
            this.$router.push({
                path: '/Flowerdesign'
            });
        }
    }
}
</script>
<style scoped>
    .flowerdesign{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: flex-start;
        width: 1200px;
        margin: 0 auto;
    }
    ul.topNav{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.4375rem 0;
    }
    ul.topNav li{
        font-size: 1.875rem;
        color: #8d8d8d;
        padding: 0 1.625rem;
        cursor: default;
        position: relative;
    }
    ul.topNav li:nth-child(1):after{
        content: '';
        width: 1px;
        height: 1.875rem;
        position: absolute;
        top: calc(50% - .9375rem);
        right: 0;
        background: #8d8d8d;
    }
    .smallBox{
        margin-bottom: .625rem;
        box-sizing: border-box;
        padding: 0 2.5rem;
    }
    .classify{
        position: relative;
        display: flex;
        justify-content: flex-start;
    }
    .classify h4{
        color: #333;
        font-size: 1.125rem;
        font-weight: normal;
        padding-top: .25rem;
        word-wrap: none;
        white-space: normal;
        width: 5rem;
        text-align: left;
        flex-shrink: 0;
    }
    .classify ul.classBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    ul.classBox li{
        margin-right: 1.25rem;
        position: relative;
        cursor: default;
        margin-bottom: 1.25rem;
    }
    .classify>span{
        font-size: 1rem;
        border: 1px solid #eee;
        padding: .3125rem 1rem;
        color: #333;
    }
    ul.classBox li>span{
        display: block;
        position: relative;
        z-index: 2223;
        color: #8d8d8d;
        font-size: 1rem;
        border: 1px solid #8d8d8d;
        padding: .125rem .5rem;
        border-radius: 1.875rem;
        background: #eee;
    }
    ul.classBox li.click>span{
        background: #133ffc;
        color: #fff;
        border: 1px solid #133ffc;
    }
    ul.classBox li:last-child{
        margin-right: 0;
    }
    ul.classBox .listBox{
        position: absolute;
        padding-top: 1.5rem;
        width: 100%;
        background: #fff;
        border-radius: 0 0 .625rem .625rem;
        top: 50%;
        left: 0;
        z-index: 2222;
    }
    .listBox>span{
        font-size: .875rem;
        color: #8d8d8d;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: .6875rem;
    }
    .listBox>span.click,.listBox>span:hover{
        color: #333;
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
        font-size: 1.125rem;
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
        margin-bottom: .625rem;
    }
    .btnBox button{
        display: block;
        margin-right: 1.25rem;
        outline: none;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
        background: #fff;
        border-radius: .8125rem;
        font-size: .875rem;
        width: 3.125rem;
        height: 1.625rem;
        line-height: 1.625rem;
        text-align: center;
    }
    .btnBox button.click{
        color: #fff;
        background: #133ffc;
        border: 1px solid #133ffc;
    } 
    ul.proBox{
        box-sizing: border-box;
        padding: 0 2.5rem;
        overflow: hidden;
    }
    ul.proBox li{
        float: left;
        width: 204px;
        height: 204px;
        overflow: hidden;
        background: #fff;
        border-radius: .3125rem;
        margin-right: 1.25rem;
        margin-bottom: 1.25rem;
        display: flex;
        justify-content: center;
        flex-shrink: 1;
        position: relative;
        align-items: center;
        box-shadow: .125rem .125rem .125rem #ddd;
    }
    ul.proBox li.noSee{
        opacity: 0;
    }
    ul.proBox input[type="checkbox"]{
        position: absolute;
        width: 204px;
        height: 204px;
        top: 0;
        left: 0;
        z-index: 10;
        opacity: 0;
        right: .625rem;
    }
    .backLine{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        top: .625rem;
        right: .625rem;
        z-index: 9;
        background: url('../../assets/image/user/tgb-20px.png') no-repeat center;
        background-size: 100%;
    }
    ul.proBox input[type="checkbox"]:checked + .backLine{
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
        background: black;
        color: #fff;
    }
    ul.pageBox li.sureList{
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        font-size: .625rem;
        margin-left: 11.25rem;
        text-align: center;
        font-size: 1.25rem;
        border-radius: 1.25rem;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    /* 我的素材 */
    .notExist{
        width: 11rem;
        height: 11rem;
        border: .0625rem dashed rgba(51, 51, 51, 1);
        position: relative;
    }
    .existImg{
        color: rgba(51, 51, 51, 0.6);
        top: 3.5rem;
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
</style>