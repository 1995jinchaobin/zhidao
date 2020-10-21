<template>
    <div class="shopping">
        <!-- 花型商城 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="searchBox" for="">
                <div class="selectBox">
                    <span @click="downClick(index)" v-for="(item,index) in arr" :key="index" :class="item.show ? 'actInput' : ''">{{item.name}}</span>
                    <!-- <span :class="name=='花型'?'specialSpan':''" @click="downList">{{name}}</span>
                    <div class="hiddenBox" v-if="showDown"> 
                        <span v-for="(item,index) in arr" :key="index" @click="downClick(index)" :style="{background: item.show?'#e8e8e8':'#fff'}" :class="index==0?'specialSpan':''">{{item.name}}</span>
                    </div>
                    <img :class="showDown?'rotate':''" @click="downList" src="../../assets/image/shopping/select.png" alt=""> -->
                </div>
                <div class="inputBox">
                    <img @click="searchClick" src="../../assets/image/shopping/search.png" alt="">
                    <input class="searchInput" v-model="inputValue" type="text"  @keyup.enter="searchClick">
                </div>
            </div>
            <div  class="classifyBox">
                <div class="classify">
                    <h4>风格：</h4>
                    <ul class="navList">
                        <li @click="styleClick('all')" :class="showStyle?'selected':''">全部</li>
                        <li @click="styleClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.style" :key="'style'+index">{{item.name}}</li>
                    </ul>
                </div>
                <hr style="position: absolute;left:10rem;width: 80%;border: .5px dotted  #DBD6D6;"/>
                <div class="classify">
                    <h4>元素：</h4>
                    <ul class="navList">
                        <li @click="elementClick('all')" :class="showElement?'selected':''">全部</li>
                        <li @click="elementClick(index)" :class="item.show?'selected':''" v-for="(item,index) in classifyList.element" :key="'element'+index">{{item.name}}</li>
                    </ul>
                </div>
                <hr style="position: absolute;left:10rem;width: 80%;border: .5px dotted  #DBD6D6;"/>
                <div class="classify">
                    <h4>回位：</h4>
                    <ul class="navList">
                        <li :class="item.show?'selected':''" @click="aftertasteClick(index)" v-for="(item,index) in classifyList.aftertaste" :key="'aftertaste'+index">{{item.name}}</li>
                    </ul>
                </div>
                <hr style="position: absolute;left:10rem;width: 80%;border: .5px dotted  #DBD6D6;"/>
                <div v-if="!showZong" class="hotBox">
                    <ul class="hotList">
                        <li @click="hotClick(index)" v-for="(item,index) in classifyList.hotList" :key="'hot'+index"> <span class="hotIcon" :class="item.show ? 'hotIconNone' : ''"><span :class="item.show ? 'actIcon' : 'noneIcon'"></span></span>{{item.name}}</li>
                    </ul>
                    <ul class="pageBox" v-if="pageNumber!=0">
                        <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                        <span class="page">{{cnt}}</span>/<span>{{pageNumber}}</span>
                        <!-- <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li> -->
                        <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
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
            <div class="proBox">
                <ul v-if="proList.length" class="proList">
                    <li @click="toDetail(index,1,cnt)" v-for="(item,index) in proList" :key="'pro'+index">
                        <div class="proImg">
                            <div class="imgjuzhong">
                            <img :src="item.picture1+'?x-oss-process=image/resize,l_450'" alt="">
                            </div>
                        </div>
                        <div class="contentBox">
                            <div>
                                <p class="price"><img src="../../assets/image/shopping/jinbi.png">{{item.price}} <span>花花币</span></p>
                            </div>
                            <div>
                                <p class="name" style="min-height: 20px;">{{item.shopName}}</p>
                                
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-if="!proList.length" class="noData">
                    <div>
                        <img src="../../assets/image/user/Emoji.png" alt="">
                        <span>空空如也</span>
                    </div>
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
    name: 'Shopping',
    components: {
        Tab,
        // Loading,
        Jump
    },
    data(){
        return {
            path: '/Shopping',
            showJump: false,
            err: '',
            imgChange:'',
            tabIndex: 4,
            showLoading: false,
            // 搜索处的下拉
            showDown: false,
            showZong: false,
            name: '花型',
            classifyList: {
                // 风格
                style: [],
                // 元素
                element: [],
                // 回味
                aftertaste: [{name: '全部',show: true},{name: '独幅',show: false},{name: '四方连续',show: false},{name: '二方连续',show: false}],
                // 色系
                colorList: [{id: 11,show: false,src: require('../../assets/image/shopping/color1.png')},{id: 1,show: false,src: require('../../assets/image/shopping/color2.png')},{id: 2,show: false,src: require('../../assets/image/shopping/color3.png')},{id: 3,show: false,src: require('../../assets/image/shopping/color4.png')},{id: 4,show: false,src: require('../../assets/image/shopping/color5.png')},{id: 5,show: false,src: require('../../assets/image/shopping/color6.png')},{id: 6,show: false,src: require('../../assets/image/shopping/color7.png')},{id: 7,show: false,src: require('../../assets/image/shopping/color8.png')},{id: 8,show: false,src: require('../../assets/image/shopping/color9.png')},{id: 9,show: false,src: require('../../assets/image/shopping/color10.png')},{id: 10,show: false,src: require('../../assets/image/shopping/color11.png')}],
                // 热门和最新
                hotList: [{name: '最新',show: true},{name: '热门',show: false}],
                allList: [{name: '综合排序',show: true},{name: '销量',show: false},{name: '新品',show: false},{name: '价格',show: false}]
            },
            showList: [],
            // 风格的全部按钮
            showStyle: true,
            showElement: true,
            arr: [{name: '花型',show: true},{name: '工作室',show: false}],
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
            proMessage: {},
            // 选中图标
            actUrl:require('../../assets/image/shopping/Radio.png'),
            noneUrl:require('../../assets/image/shopping/Checkbox.png')
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 去详情页
        toDetail(index,type,listIndex,cnt){
            if(type==1){
                localStorage.setItem('shopList',JSON.stringify(this.proList[index]));
                localStorage.setItem('cnt',this.cnt);
                this.$router.push({
                    path: '/Shopdetail',
                    query: {
                        message: this.proList[index],
                        cnt: cnt
                    }
                });
            }else if(type==2){
                localStorage.setItem('shopList',JSON.stringify(this.officeList[index].list[listIndex]));
                this.$router.push({
                    path: '/Shopdetail',
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
            this.name = '花型';
        },
        downList(){
            this.showDown = !this.showDown;
        },
        downClick(index){
            this.name = this.arr[index].name;
            if(index == 0){
                this.showBus = false;
                this.canMessage.sellerUserId = '';
                this.getList();
            }
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
                    this.getList();
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
                    this.imgChange = 'bottom'
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        self.imgChange = false;
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
                    console.log(res.data.result.json1)
                    result.map(function(item){
                        item.show = false;
                    });
                    this.classifyList.style = result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    this.imgChange = 'gantan';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        this.imgChange = '';
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
            let type = this.$route.params.type;
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
                    if(type){
                        if(type == 11){
                            type = 0;
                        }
                        for(let i = 0;i < this.classifyList.element.length;i++){
                            if(this.classifyList.element[i].id == type){
                                this.classifyList.element.map(function(item){
                                    item.show = false;
                                });
                                this.classifyList.element[i].show = true;
                                this.showElement = false;
                                this.canMessage.genre1 = this.classifyList.element[i].id;
                            }
                        }
                    }
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    this.imgChange = 'gantan';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        this.imgChange = '';
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
        getList(type){
            let formData = new FormData();
            let self = this;
            Scroll.stop();
            this.showLoading = true;

            formData.append('pageSize',10);
            formData.append('page',this.cnt);
            formData.append('status',0);
            // formData.append('colourType',this.canMessage.colourType);
            formData.append('orderBy',this.canMessage.orderBy);
            if(this.canMessage.connect){
                formData.append('connect',this.canMessage.connect);
            }
            if(this.canMessage.genre1){
                formData.append('genre1',this.canMessage.genre1);
            }
            if(type){
                formData.append('genre1',type);
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
                    this.err = res.data.msg;
                    this.imgChange = 'gantan';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        this.imgChange = '';
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
            let formData = new FormData();
            let self = this;
            Scroll.stop();
            this.showLoading = true;
            formData.append('pageSize',10);
            formData.append('page',this.cnt);
            formData.append('status',0);
            // formData.append('colourType',this.canMessage.colourType);
            formData.append('orderBy',this.canMessage.orderBy);
            if(this.canMessage.searchKey){
                formData.append('shopName',this.canMessage.searchKey);
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
                    this.err = res.data.msg;
                    this.imgChange = 'gantan';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        this.imgChange = '';
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
        // 获取首页传参
        gettype(){
            let type = this.$route.params.type;
            if(type){
                if(type == 11){
                    type = 0
                }
                for(let i = 0;i < this.classifyList.element.length;i++){
                    if(this.classifyList.element[i].id == type){
                        this.classifyList.element[i].show = true;
                        this.showElement = false;
                        type = this.classifyList.element[i].id;
                    }
                }
                this.getList(type);
            }

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
            this.name = '花型';
        }else{
            this.getStyle();
            this.getElement();
            if(this.$route.params.type){
                this.gettype();
            }else{
                if(this.$route.params.cnt){
                    this.cnt = this.$route.params.cnt;
                    this.getList();
                }else{
                    this.getList()
                }
            }
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
        background: #fff;
    }
    .content{
        width: 1200px;
        margin: 42px auto 32px;
    }
    .searchBox{
        width: 645px;
        height: 87px;
        margin: 0 auto 32px;
        background: #fff;
    }
    .inputBox{
        width: 645px;
        height: 60px;
        position:relative;
        border: 2px solid #F06D29;
        border-radius: 2px 4px 4px 4px;
    }
    .inputBox img{
        width: 19px;
        height: 19px;
        position: absolute;
        top: calc(50% - 10px);
        right: 16px;
        cursor: default;
    }
    .inputBox input{
        width:  645px;
        height: 57px;
        box-sizing: border-box;
        font-size: 1.25rem;
        outline: none;
        border: none;
        border-radius: 4px;
    }
    .selectBox{
        display: flex;
        font-size: 16px;
        color: #333;
        cursor: default;
        line-height: 40px;
    }
    /* .selectBox img{
        position: absolute;
        top: calc(1.25rem - .46875rem);
        width: .9375rem;
        height: .5rem;
        right: 0;
    } */
    .selectBox span{
        display: block;
        width: 79px;
        height: 35px;
        color: #A8A8A8;
        background: rgba(221, 221, 221, 0.2);;
        position: relative;
        top: 2px;
        z-index: 1;
    }
    .selectBox span.actInput{
        color: #666666;
        background: #fff;
        border: 2px solid #F06D29;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: 0px solid #fff;
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
        margin-top: 20px;
    }
    .classify{
        display: flex;
    }
    .classify ul li:hover{
        color: #F06D29 !important;
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
        font-size: 14px;
        margin-right: 44px;
    }
    .classify h4{
        font-size: 16px;
        color: rgba(51,51,51,0.50);
        font-weight: bold;
        flex-shrink: 0;
        line-height: 20px;
        margin-top: 14px;
    }
    .classify ul.navList{
        display: flex;
        align-items: center;
        margin-left: 10px;
        flex-wrap: wrap;
        font-size: 14px;
        margin-top: 14px;
    }
    .classify ul.navList li{
        margin-right: 16px;
        background: inherit;
        min-width: 51px;
        cursor: default;
        box-sizing: border-box;
        margin-bottom: 12px;
        color: #8d8d8d;
    }

    .classify ul.navList li.selected{
        color: #F06D29;
    }
    ul.colorList{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        height: 3.625rem;
        margin-left: .625rem;
    }
    .classify h4.colorH4{
        line-height: 3.75rem;
    }
    ul.colorList li{
        width: 3.75rem;
        height: .875rem;
        margin: auto 0;
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
        justify-content: space-between;
    }
    .hotList{
        display: flex;
        align-items: center;
    }
    .hotList li{
        min-width: 34px;
        height: 55.5px;
        line-height: 55px;
        cursor: default;
        background: inherit;
        display: flex;
        justify-content: space-evenly;
        font-size: 14px;
        color: #334150;
        /* box-sizing: border-box; */
        text-align: center;
        margin-right: 20px;
    }
    .hotIcon{
        display: block;
        width: 16px;
        height: 16px;
        margin-top: 2px;
        margin-right: 8px;
    }
    .hotIcon>span{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    .hotIcon>span.actIcon{
        width: 16px;
        height: 16px;
        background: url("../../assets/image/shopping/Radio.png") no-repeat center;
        background-size: 100%;
        border: 1px solid #fff;
    }
    .hotIcon>span.noneIcon{
        border: 1px solid #333;
    }
    .hotIconNone{
        margin-top: 5px !important;
    }
    .proBox{
        position: absolute;
        width: 100%;
        left: 0;
        background: #F9F9FB;
        height: 890px;
    }
    /* 商品列表 */
    ul.proList{
        display: flex;
        align-items: center;
        width: 1200px;
        flex-wrap: wrap;
        margin: 1.875rem auto;
    }
    ul.proList li{
        width: 220px;
        background: #fff;
        margin-bottom: 14.3px;
        overflow: hidden;
    }
    ul.proList li+li{
        margin-left: 24px;
    }
    ul.proList li:nth-child(6){
        margin-left: 0;
    }
    .contentBox{
        text-align: left;
        margin-top: 12px;
        overflow: hidden;
        background: #fff;
        padding-left: 9px;
    }
    .contentBox>div:last-child{
        margin-top: 10px;
    }
    .contentBox>div:last-child p{
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }
    .price{
        color: #f15246;
        font-size: 16px;
        margin-top: 2px;
        margin-right: .5rem;
        display: flex;
        align-items: center;
    }
    .price img{
        width: 1.267rem;
        height: 1.267rem;
        margin-right: 3px
    }
    .price span{
        font-size: 12px;
        color: #aaa;
        margin-left: 3px;
    }
    .title{
        font-size: 1.008rem;
        color: #333333;
        margin-left: .3rem;
        margin-bottom: .2rem;
    }
    .name{
        font-size: .756rem;
        color: rgba(86,86,86,0.56);
        margin-left: .3rem;
        margin-bottom: .2rem;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .proImg{
        width: 222px;
        height: 333px;
        display: relative;
        /* justify-content: center; */
        overflow: hidden;
        background: #b3b3b3;
    }
    .proImg img{
        display: block;
        
    }
    .imgjuzhong{
        width: 1110px;
        height: 333px;
        position: relative;
        left: -444px;
    }
    .imgjuzhong>img{
        margin-left: 0;
        height: 333px;
        min-width: 222px;
        margin: auto;
        display: block;
    }
    .noData{
        display: flex;
        flex-direction: column;
        margin-top: 3.125rem;
        justify-content: start;
    }
    .noData>div{
        display: inline-block;
        width: 8rem;
        margin: 0 auto;
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
        justify-content: start;
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
        width: 7.567rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 35px;
        height: 35px;
        font-size: 14px;
        color: #333;
        margin: 0 5px;
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
    .classify ul li:hover,.hotList li:hover,.pageBox li:hover,.selectBox span:hover,.inputBox img:hover{
        cursor: pointer;
    }
	.searchInput{
		text-indent:10px;
	}
</style>