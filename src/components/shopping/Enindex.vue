<template>
    <div class="shopping">
        <!-- 花型商城 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="searchBox" for="">
                <div class="selectBox">
                    <span @click="downList">{{name}}</span>
                    <div class="hiddenBox" v-if="showDown"> 
                        <span v-for="(item,index) in arr" :key="index" @click="downClick(index)" :style="{background: item.show?'#e8e8e8':'#fff'}">{{item.name}}</span>
                    </div>
                    <img :class="showDown?'rotate':''" @click="downList" src="../../assets/image/shopping/select.png" alt="">
                </div>
                <div class="inputBox">
                    <img @click="searchClick" src="../../assets/image/shopping/search.png" alt="">
                    <input v-model="inputValue" type="text" placeholder="search">
                </div>
            </div>
            <div v-if="!showBus" class="classifyBox">
                <div class="classify">
                    <h4>Style：</h4>
                    <ul class="navList">
                        <li @click="styleClick('all')" :class="showStyle?'selected':''">Whole</li>
                        <li @click="styleClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.style" :key="'style'+index">{{item.english}}</li>
                    </ul>
                </div>
                <div class="classify">
                    <h4>Element：</h4>
                    <ul class="navList">
                        <li @click="elementClick('all')" :class="showElement?'selected':''">Whole</li>
                        <li @click="elementClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.element" :key="'element'+index">{{item.english}}</li>
                    </ul>
                </div>
                <div class="classify">
                    <h4>Return position：</h4>
                    <ul class="navList">
                        <li :class="item.show?'selected':''" @click="aftertasteClick(index)" v-for="(item,index) in classifyList.aftertaste" :key="'aftertaste'+index">{{item.name}}</li>
                    </ul>
                </div>
                <div class="classify">
                    <h4>Color system：</h4>
                    <ul class="colorList">
                        <li @click="colorClick(index)" v-for="(item,index) in classifyList.colorList" :key="'color'+index">
                            <img class="colorImg" :src="item.src" alt="">
                            <span v-if="item.show" :class="index==3||index==10?'white':''"></span>
                        </li>
                    </ul>
                </div>
                <div v-if="!showZong" class="hotBox">
                    <ul class="hotList">
                        <li @click="hotClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.hotList" :key="'hot'+index">{{item.name}}</li>
                    </ul>
                </div>
                <div class="allBox" v-if="showZong">
                    <img v-if="officeList.length" :src="officeList[officeIndex].studioLogo" alt="">
                    <img v-if="!officeList.length" :src="proMessage.picture1" alt="">
                    <span v-if="officeList.length">{{officeList[officeIndex].studioName}}</span>
                    <span v-if="!officeList.length">{{proMessage.shopName}}</span>
                    <ul class="hotList">
                        <li @click="allClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.allList" :key="'all'+index">{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div v-if="!showBus" class="proBox">
                <ul v-if="proList.length" class="proList">
                    <li  @click="toDetail(index,1)" v-for="(item,index) in proList" :key="'pro'+index">
                        <div class="proImg">
                            <img :src="item.picture1+'?x-oss-process=image/resize,l_300'" alt="">
                        </div>
                        <div class="contentBox">
                            <span class="price">￥{{item.price}}</span>
                            <span class="title">{{item.name}}</span>
                            <span class="name">{{item.shopName}}</span>
                        </div>
                    </li>
                </ul>
                <div v-if="!proList.length" class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>No data</span>
                </div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
            <div class="bussinessBox" v-if="showBus">
                <div class="busList" v-for="(item,index) in officeList" :key="'office'+index">
                    <div class="officeMessage">
                        <img :src="item.studioLogo" alt="">
                        <div style="cursor: default;" @click="toFlower(index)">
                            <h4>{{item.studioName}}</h4>
                            <span>Flower patterns on sale：{{item.total}}</span>
                        </div>
                    </div>
                    <ul v-if="showList[index]" class="officeList">
                        <li @click="toDetail(index,2,listIndex)" v-show="listIndex<=4" v-for="(listItem,listIndex) in item.list" :key="'pro'+listIndex">
                            <div class="imageBox">
                                <img :src="listItem.picture1+'?x-oss-process=image/resize,l_300'" alt="">
                            </div>
                            <span>￥{{listItem.price}}</span>
                        </li>
                    </ul>
                    <div v-if="!showList[index]" class="noData">
                        <img src="../../assets/image/user/Emoji.png" alt="">
                        <span>No data</span>
                    </div>
                </div>
            </div>
        </div>
        <p>All patterns purchased have only the right to use, not the copyright. This platform is not responsible for copyright disputes.</p>
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
    name: 'Enshopping',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Enshopping',
            showJump: false,
            err: '',
            tabIndex: 7,
            showLoading: false,
            // 搜索处的下拉
            showDown: false,
            showZong: false,
            name: 'Pattern',
            classifyList: {
                // 风格
                style: [],
                // 元素
                element: [],
                // 回味
                aftertaste: [{name: 'Whole',show: true},{name: 'Single',show: false},{name: 'Tetragonal continuity',show: false},{name: 'Bipartite continuity',show: false}],
                // 色系
                colorList: [{id: 11,show: false,src: require('../../assets/image/shopping/color1.png')},{id: 1,show: false,src: require('../../assets/image/shopping/color2.png')},{id: 2,show: false,src: require('../../assets/image/shopping/color3.png')},{id: 3,show: false,src: require('../../assets/image/shopping/color4.png')},{id: 4,show: false,src: require('../../assets/image/shopping/color5.png')},{id: 5,show: false,src: require('../../assets/image/shopping/color6.png')},{id: 6,show: false,src: require('../../assets/image/shopping/color7.png')},{id: 7,show: false,src: require('../../assets/image/shopping/color8.png')},{id: 8,show: false,src: require('../../assets/image/shopping/color9.png')},{id: 9,show: false,src: require('../../assets/image/shopping/color10.png')},{id: 10,show: false,src: require('../../assets/image/shopping/color11.png')}],
                // 热门和最新
                hotList: [{name: 'New',show: true},{name: 'Hot',show: false}],
                allList: [{name: 'Comprehensive Sorting',show: true},{name: 'Sales volume',show: false},{name: 'New',show: false},{name: 'Price',show: false}]
            },
            showList: [],
            // 风格的全部按钮
            showStyle: true,
            showElement: true,
            arr: [{name: 'Pattern',show: true},{name: 'Office',show: false}],
            // type 1花型 2工作室
            type: 1,
            // 数据参数
            canMessage: {
                // 热门或最新
                orderBy: 1,
                colourType: 11,
                connect: '',
                genre1: '',
                styleType: '',
                // 搜索关键字
                name: '',
                searchKey: '',
                sellerUserId: ''
            },
            showBus: false,
            inputValue: '',
            // 页数
            cnt: 1,
            pageIndex: 1,
            flag: 0,
            // 商品数据
            proList: [],
            // 分页数
            pageNumber: 0,
            page: [],
            // 工作室
            officeList: [],
            // 花型数量
            i: 0,
            officeIndex: 0,
            proMessage: {}
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 去详情页
        toDetail(index,type,listIndex){
            if(type==1){
                localStorage.setItem('shopList',JSON.stringify(this.proList[index]));
                this.$router.push({
                    path: '/Enshopdetail',
                    query: {
                        message: this.proList[index]
                    }
                });
            }else if(type==2){
                localStorage.setItem('shopList',JSON.stringify(this.officeList[index].list[listIndex]));
                this.$router.push({
                    path: '/Enshopdetail',
                    query: {
                        message: this.officeList[index].list[listIndex]
                    }
                });
            }
        },
        // 搜索点击
        searchClick(){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.i = 0;
            if(this.type==2){
                this.canMessage.name = '';
                this.canMessage.searchKey = this.inputValue;
                this.showBus = true;
                this.getOffice();
                // this.canMessage.sellerUserId = 
            }else if(this.type==1){
                this.canMessage.name = this.inputValue;
                this.canMessage.searchKey = '';
                this.showBus = false;
                this.canMessage.sellerUserId = '';
                this.getList();
            }
        },
        // 点击公司名称或者在线花型按钮
        toFlower(index){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.i = 0;
            this.type = 1;
            this.canMessage.name = '';
            this.canMessage.searchKey = '';
            this.showBus = false;
            this.showZong = true;
            this.officeIndex = index;
            this.inputValue = '';
            this.canMessage.orderBy = 3;
            this.getList();
            this.arr.map(function(item){
                item.show = false;
            });
            this.arr[0].show = true;
            this.name = 'Pattern';
        },
        downList(){
            this.showDown = !this.showDown;
        },
        downClick(index){
            this.name = this.arr[index].name;
            this.arr.map(function(item){
                item.show = false;
            });
            this.showDown = !this.showDown;
            this.arr[index].show = true;
            if(index==0){
                this.type = 1;
            }else{
                this.type = 2;
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
                            this.getList();
                            this.pageIndex = 4;
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getList();
                        this.pageIndex = 7;
                    }else{
                        this.cnt = this.page[index].name;
                        this.getList();
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
        // 获取分类列表
        styleClick(str){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            if(str=='all'){
                this.classifyList.style.map(function(item){
                    item.show = false;
                });
                this.showStyle = true;
                this.canMessage.styleType = '';
            }else{
                this.classifyList.style.map(function(item){
                    item.show = false;
                });
                this.classifyList.style[str].show = true;
                this.showStyle = false;
                this.canMessage.styleType = this.classifyList.style[str].id;
            }
            this.getList();
        },
        elementClick(str){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            if(str=='all'){
                this.classifyList.element.map(function(item){
                    item.show = false;
                });
                this.canMessage.genre1 = '';
                this.showElement = true;
            }else{
                this.classifyList.element.map(function(item){
                    item.show = false;
                });
                this.classifyList.element[str].show = true;
                this.showElement = false;
                this.canMessage.genre1 = this.classifyList.element[str].id;
            }
            this.getList();
        },
        aftertasteClick(str){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.classifyList.aftertaste.map(function(item){
                item.show = false;
            });
            this.classifyList.aftertaste[str].show = true;
            if(str==0){
                this.canMessage.connect = '';
            }else{
                this.canMessage.connect = str-1;
            }
            this.getList();
        },
        colorClick(index){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.classifyList.colorList.map(function(item){
                item.show = false;
            });
            this.classifyList.colorList[index].show = true;
            this.canMessage.colourType = this.classifyList.colorList[index].id;
            this.getList();
        },
        hotClick(index){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.classifyList.hotList.map(function(item){
                item.show = false;
            });
            this.classifyList.hotList[index].show = true;
            if(index==0){
                this.canMessage.orderBy = 1;
            }else if(index==1){
                this.canMessage.orderBy = 2;
            }
            this.getList();
        },
        allClick(index){
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.classifyList.allList.map(function(item){
                item.show = false;
            });
            this.classifyList.allList[index].show = true;
            if(index==0){
                this.canMessage.orderBy = 3;
            }else if(index==1){
                this.canMessage.orderBy = 4;
            }else if(index==2){
                this.canMessage.orderBy = 2;
            }else if(index==3){
                this.canMessage.orderBy = 5;
            }
            this.getList();
        },
        // 获取头部信息
        // 风格
        getStyle(){
            let formData = new FormData();
            let self = this;
            formData.append('id',11);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = JSON.parse(res.data.result.json1).dcStyle;
                    result.map(function(item){
                        item.show = false;
                    });
                    this.classifyList.style = result;
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
        // 元素
        getElement(){
            let formData = new FormData();
            let self = this;
            formData.append('id',12);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = JSON.parse(res.data.result.json1).dcStyle;
                    result.map(function(item){
                        item.show = false;
                    });
                    this.classifyList.element = result;
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
        // 获取数据
        getList(){
            // this.showLoading = true;
            let formData = new FormData();
            let self = this;
            Scroll.stop();
            // return
            formData.append('pageSize',10);
            formData.append('page',this.cnt);
            formData.append('status',0);
            formData.append('colourType',this.canMessage.colourType);
            formData.append('orderBy',this.canMessage.orderBy);
            if(this.canMessage.connect){
                formData.append('connect',this.canMessage.connect);
            }
            if(this.canMessage.genre1){
                formData.append('genre1',this.canMessage.genre1);
            }
            if(this.canMessage.styleType){
                formData.append('styleType',this.canMessage.styleType);
            }
            if(this.canMessage.name){
                formData.append('name',this.canMessage.name);
            }
            if(this.canMessage.sellerUserId){
                formData.append('sellerUserId',this.canMessage.sellerUserId);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dPatternsSoldByMallSellersJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                Scroll.move();
                if(res.data.status==0){
                    let result = res.data.result;
                    result.list.map(function(item){
                        item.picture1 = item.picture1;
                    });
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.proList = result.list;
                    if(this.type==2){
                        this.officeList[this.i].list = result.list;
                        this.officeList[this.i].total = result.total;
                        if(result.list.length){
                            this.showList[this.i] = true;
                            this.$forceUpdate();
                        }
                        this.i++;
                    }
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
        getOffice(){
            this.officeList = [];
            this.showLoading = true;
            let formData = new FormData();
            let self = this;
            Scroll.stop();
            if(this.canMessage.searchKey){
                formData.append('searchKey',this.canMessage.searchKey);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dDesignersAndStudiosJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                Scroll.move();
                if(res.data.status==0){
                    let result = res.data.result;
                    // this.pageNumber = result.pages;
                    // this.pageAuto();
                    this.officeList = result;
                    this.officeList.map(function(item,index){
                        self.canMessage.sellerUserId = item.id;
                        self.showList[index] = false;
                        self.getList();
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
        }
    },
    mounted(){
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('shopType')&&localStorage.getItem('shopType')==1){
            let message = JSON.parse(localStorage.getItem('shopList'));
            this.canMessage.colourType = message.colourType;
            this.canMessage.sellerUserId = message.sellerUserId;
            this.proMessage = message;
            this.getStyle();
            this.getElement();
            this.cnt = 1;
            this.pageNumber = "";
            this.proList = [];
            this.page = [];
            this.pageIndex = 1;
            this.i = 0;
            this.type = 1;
            this.canMessage.name = '';
            this.canMessage.searchKey = '';
            this.showBus = false;
            this.showZong = true;
            this.officeIndex = 0;
            this.inputValue = '';
            this.canMessage.orderBy = 3;
            this.getList();
            this.arr.map(function(item){
                item.show = false;
            });
            this.arr[0].show = true;
            this.name = 'Pattern';
        }else{
            this.getStyle();
            this.getElement();
            this.getList();
        }
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enshopping'
            });
        }else{
            this.$router.push({
                path: '/Shopping'
            });
        }
    }
}
</script>
<style scoped>
    .shopping{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        padding: .75rem 12.3125rem;
    }
    .searchBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .inputBox{
        position: relative;
        height: 2.5rem;
        width: 23.625rem;
        margin-left: .9375rem;
    }
    .inputBox img{
        width: 1.1875rem;
        height: 1.1875rem;
        position: absolute;
        top: calc(50% - 0.59375rem);
        right: 1rem;
        cursor: default;
    }
    .inputBox input{
        height: 2.5rem;
        box-sizing: border-box;
        padding-left: 1.6875rem;
        padding-right: 1rem;
        outline: none;
        border: 1px solid #999;
        border-radius: 1.25rem;
        width: 23.625rem;
    }
    .selectBox{
        position: relative;
        width: 4.5rem;
        text-align: left;
        height: 2.5rem;
        font-size: 1.125rem;
        color: #333;
        cursor: default;
        line-height: 2.5rem;
    }
    .selectBox img{
        position: absolute;
        top: calc(1.25rem - .3rem);
        width: .9375rem;
        height: .5rem;
        right: -0.25rem;
    }
    .selectBox span{
        display: block;
        width: 100%;
    }
    .selectBox img.rotate{
        transform: rotate(180deg);
        margin-top: .25rem;
    }
    .hiddenBox{
        position: absolute;
        bottom: -5rem;
        background: #fff;
        border: 1px solid #999;
        border-radius: .5rem;
        width: 100%;
        text-align: center;
        left: 0;
        overflow: hidden;
    }
    .hiddenBox span:hover{
        background: #e8e8e8;
    }
    .selectBox .specialSpan{
        letter-spacing: .625rem;
    }
    .classifyBox{
        margin-top: 1.25rem;
    }
    .classify{
        display: flex;
    }
    .allBox{
        display: flex;
        align-items: center;
    }
    .allBox img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: .3125rem;
        display: block;
    }
    .allBox>span{
        display: block;
        color: #1362b2;
        font-size: .875rem;
        margin-right: 2.8rem;
    }
    .classify h4{
        font-size: 1.125rem;
        color: #585858;
        font-weight: normal;
        flex-shrink: 0;
        line-height: 1.875rem;
    }
    .classify ul.navList{
        display: flex;
        align-items: center;
        margin-left: .625rem;
        flex-wrap: wrap;
    }
    .classify ul.navList li{
        margin-right: 1.125rem;
        padding: .3125rem .625rem;
        border-radius: 1.25rem;
        border: 1px solid #8d8d8d;
        background: inherit;
        min-width: 3.25rem;
        cursor: default;
        box-sizing: border-box;
        margin-bottom: .875rem;
        color: #8d8d8d;
        font-size: 1rem;
    }
    .classify ul.navList li.selected{
        border: 1px solid #133ffc;
        background: #133ffc;
        color: #fff;
    }
    ul.colorList{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-left: .625rem;
    }
    ul.colorList li{
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1.25rem;
        position: relative;
        margin-bottom: 1.25rem;
    }
    .colorImg{
        display: block;
        width: 100%;
        height: 100%;
    }
    .colorList span{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('../../assets/image/shopping/black_select.png') no-repeat center;
        background-size: .875rem .5625rem;
    }
    .colorList span.white{
        background: url('../../assets/image/shopping/white_select.png') no-repeat center;
        background-size: .875rem .5625rem;
    }
    .hotBox{
        display: flex;
    }
    .hotList{
        display: flex;
        align-items: center;
    }
    .hotList li{
        min-width: 2.125rem;
        height: 1.625rem;
        line-height: 1.6rem;
        cursor: default;
        border-radius: .8125rem;
        background: inherit;
        font-size: 1rem;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
        /* box-sizing: border-box; */
        padding: 0 .5rem;
        text-align: center;
        margin-right: 1.25rem;
    }
    .hotList li.selected{
        background: #133ffc;
        border: 1px solid #133ffc;
        color: #fff;
    }
    /* 商品列表 */
    ul.proList{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 1.875rem;
    }
    ul.proList li{
        width: 18.4375rem;
        height: 23.125rem;
        background: #fff;
        margin-right: .625rem;
        box-shadow: 2px 2px 2px #d1d2d7;
        border-radius: .625rem;
        margin-bottom: 1.25rem;
        overflow: hidden;
    }
    .contentBox{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 1rem;
        text-align: left;
        margin-top: .4rem;
    }
    span.price{
        color: #f15246;
        font-size: 1.5rem;
    }
    span.title{
        color: #2c2e30;
        font-size: 1.125rem;
    }
    span.name{
        font-size: .875rem;
        color: #666;
    }
    .proImg{
        width: 18.4375rem;
        height: 17.5rem;
        display: flex;
        justify-content: center;
        overflow: hidden;
        background: #b3b3b3;
    }
    .proImg img{
        display: block;
        max-width: 80%;
        max-height: 90%;
        margin-top: 10%;
    }
    .noData{
        display: flex;
        flex-direction: column;
        margin-top: 3.125rem;
        justify-content: flex-start;
        align-items: center;
    }
    .noData img{
        width: 8rem;
        height: 8rem;
    }
    .noData span{
        display: block;
        font-size: 1.25rem;
        margin-top: .375rem;
        color: #333;
    }
    /* 搜索工作室样式 */
    .bussinessBox{
        margin-top: 2.5rem;
    }
    .busList{
        margin-bottom: 3.125rem;
        display: flex;
        justify-content: space-between;
    }
    .officeMessage{
        display: flex;
        justify-content: flex-start;
    }
    .officeMessage img{
        display: block;
        flex-shrink: 0;
        width: 4.375rem;
        height: 4.375rem;
        margin-right: 1.25rem;
    }
    .officeMessage h4{
        font-size: 1.125rem;
        color: #1362b2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-shrink: 0;
        font-weight: normal;
        margin-top: .625rem;
        text-align: left;
    }
    .officeMessage span{
        display: block;
        text-align: left;
        flex-shrink: 0;
        margin-top: .625rem;
        font-size: .875rem;
        color: #333;
    }
    ul.officeList{
        display: flex;
        justify-content: space-around;
    }
    ul.officeList li{
        width: 11.25rem;
        height: 13.125rem;
        flex-shrink: 0;
        margin: .625rem;
        background: #fff;
    }
    ul.officeList li img{
        max-width: 11.25rem;
        max-height: 11.25rem;
        flex-shrink: 0;
    }
    .imageBox{
        background: #b3b3b3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .busList .noData{
        align-items: center;
        margin-top: 0;
        width: 100%;
    }
    .officeList span{
        color: #2c2e30;
        font-size: .875rem;
        text-align: left;
        margin-left: .5rem;
        line-height: 1.875rem;
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
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
</style>