<template>
    <div class="threed">
        <!-- 3D展示 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <ul v-if="showLeft" class="seleBox" :style="{height: height}">
                <li @click="changeMessage(index)" v-for="(item,index) in select" :key="index" :style="{color: item.show?'#133ffc':'#8d8d8d'}">{{item.name}}<span v-if="item.show"></span></li>
            </ul>
            <div v-if="!showLeft" class="seleBox" :style="{width: '10rem',height: height,background: '#eee'}"></div>
            <div class="proBox">
                <ul class="btnBox">
                    <li @click="seleClick(index)" :style="{color: item.show?'#333':'#888'}" v-for="(item,index) in btnArr" :key="index">{{item.name}}</li>
                </ul>
                <div v-if="!showOnly&&!showSuit" class="topBox">
                    <h4>Hot Categories：</h4>
                    <ul class="classifyBox">
                        <li @click="changeClassify(index)" :key="index" :class="item.show==true?'special':''" v-for="(item,index) in classify">{{item.english}}</li>
                    </ul>
                </div>
                <div class="topBox" style="justify-content: space-between;" v-if="showSuit">
                    <ul class="classifyBox">
                        <li @click="indexClick(index)" :key="index" :class="item.show==true?'special':''" v-for="(item,index) in newSelect">{{item.name}}</li>
                    </ul>
                    <div class="onlyBtn">
                        <div class="downBox" v-if="showSuit">
                            <span @click="download">Download</span>
                        </div>
                        <input id="uploaderInput" accept="image/*" multiple type="file" @change="add"/>
                        <span>Selection</span>
                    </div>
                </div>
                <div class="onlyBtn" v-if="showOnly">
                    <span @click="modelClick">Made Model</span>
                </div>
                <ul v-if="proList.length" class="proList" id="prolisttongji">
                    <li v-for="(item,index) in proList" :key="index" @click="toDetail(index)"><img height="100%" width="100%" :src="item.backgroudImage" alt=""></li>
                </ul>
                <div class="nodata" v-if="!proList.length&&!showOnly">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>No data available for the time being</span>
                </div>
                <div style="display: flex;margin-left: 28.5rem;line-height: 20;font-size: 1.875rem;color: #333;" v-if="!proList.length&&showOnly">Click on the top right corner to customize the model</div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <div class="model" v-if="showModel">
            <div class="modelBox">
                <h4>Private Wardrobe</h4>
                <img @click="modelClose" src="../../assets/image/login/close.png" alt="">
                <h5>Contact informationQQ:3501256100</h5>
                <p>1.Users need to make models, upload pictures should be free of charge commercially available or its users have legal commercial rights. All disputes and losses arising from the content and copyright of the picture shall be directly or indirectly (jointly) liable by the uploader of the picture, and the weaver shall not bear any legal liability.</p>
                <p>2.Pictures and processed models are for uploaders only, and the weaver promises not to sell them to the outside world.</p>
                <p>3.Because of the quality, copyright, content and difficulty of the pictures provided by users, the Weaver has the right to refuse to make models.</p>
                <p>4.Users should actively contact the weaving staff to provide model pictures, and pay 6 yuan per model manual fee. After payment is completed, the staff will upload the model to the user's private wardrobe within a specified time, and only for the user to upload.</p>
                <p>5.Users have permanent access to private wardrobe models. If the models and pictures violate national laws, administrative regulations, departmental rules and other acts, the Weaver has the right to deal with the pictures and models.</p>
                <p>6.Private wardrobe working hours: Monday to Friday, 9 a.m. to 5 p.m., except holidays.<span>Modeling time: within three working days after the user pays.</span></p>
            </div>
        </div>
        <div class="model" v-if="showSuit&&showFlower">
            <div class="backFlower">
                <span>Selection</span>
            </div>
            <img class="flowerImg" src="../../assets/image/cut/flower.png" alt="">
            <img @click="closeFlower" class="konwImg" src="../../assets/image/cut/know.png" alt="">
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
    name: 'Threed',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Enthreed',
            showJump: false,
            type:this.$route.query.type,
            typeindex:this.$route.query.index,
            err: '',
            height: '',
            tabIndex: 6,
            showLoading: false,
            // 左侧分类
            select: [{name: "Men's",show: true},{name: "Women's",show: false},{name: "Children's",shohw: false},{name: 'Textiles',show: false},{name: 'Other',show: false}],
            newSelect: [{name: "Women's",show: true},{name: "Men's",show: false},{name: "Children's",show: false},{name: 'Textiles',show: false},{name: 'Other',show: false}],
            classIndex: 1,
            classFlag: 0,
            // 商品列表
            proList: [],
            // 右侧分类
            classify: [],
            pageNumber: null,
            flag: 0,
            cnt: 1,
            pageIndex: 1,
            page: [],
            id: 11,
            showModel: false,
            showOnly: false,
            showSuit: false,
            url: [],
            btnArr: [{name: 'Default Clothing',show: true},{name: 'Private Wardrobe',show: false},{name: 'Series show',show: false}],
            showLeft: true,
            suitIndex: 0,
            showFlower: false,
            backImg: '',
            ourMsg: {},
            proNew: true
        }
    },
    methods: {
        // 下载
        download(){
            let self = this;
            if(this.backImg){
                let arr = [];
                this.showLoading = true;
                this.proList.map(function(item){
                    // arr.push(item.backgroudImage);
                    arr.push(item.id);
                });
                let str = arr.join(',');
                let formData = new FormData();
                formData.append('templateIds',str);
                formData.append('imageUrl',this.backImg);
                let obj = {
                    url: this.all.baseUrl + '/template2d/composeHDs',
                    formdata: formData
                }
                this.getData(obj).then(res=>{
                    setTimeout(function(){
                        self.showLoading = false;
                    },5000);
                    if(res.data.status==0){
                        window.location.href = this.all.baseUrl+'/file/multiDown3D?images='+res.data.result;
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        this.err = 'Your account has been registered elsewhere';
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
            }else{
                this.showJump = true;
                this.err = 'Please choose the pattern first';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 套装展示
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
                this.showLoading = true;
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
                        self.backImg = res.data.result;
                        self.proList.map(function(item,index){
                            self.compose(index,item.id);
                        });
                    });
                }
            }
        },
        compose(index,id){
            this.showLoading = true;
            let self = this;
            Scroll.stop();
            let formData = new FormData();
            formData.append('imageUrl',self.backImg);
            formData.append('templateId',id);
            formData.append('ratio',1);
            let obj = {
                url: self.all.baseUrl + '/template2d/compose',
                formdata: formData
            }
            self.getData(obj).then( res => {
                if(index==self.proList.length-1){
                    setTimeout(function(){
                        self.showLoading = false;
                    },500);
                }
                Scroll.move();
                if(res.data.status==0){
                    this.proList[index].backgroudImage = res.data.result;
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
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
                    Scroll.stop();
                    self.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        seleClick(index){
            this.btnArr.map(function(item){
                item.show = false;
            });
            this.btnArr[index].show = true;
            this.proList = [];
            if(index==0){
                this.showLeft = true;
                this.select.map(function(item){
                    item.show = false;
                });
                this.cnt = 1;
                this.proNew = false;
                this.page = [];
                this.proList = [];
                this.flag = 0;
                this.pageIndex = 1;
                this.pageNumber= 0;
                this.showSuit = false;
                this.backImg = '';
                this.showOnly = false;
                this.select[0].show = true;
                this.id = 11;
                this.classIndex = 1;
                this.getList(0);
                this.getProlist();
            }else if(index==1){
                this.showLeft = false;
                this.select.map(function(item){
                    item.show = false;
                });
                this.cnt = 1;
                this.page = [];
                this.flag = 0;
                this.backImg = '';
                this.pageIndex = 1;
                this.proNew = false;
                this.pageNumber= 0;
                this.proList = [];
                this.showSuit = false;
                this.showOnly = true;
                this.getOnlylist();
            }else{
                this.showLeft = false;
                this.suitClick();    
            }
            this.$forceUpdate();
        },
        // 关闭弹窗
        closeFlower(){
            this.showFlower = false;
            localStorage.removeItem('suitIndex');
        },
        indexClick(index){
            this.proList = [];
            this.newSelect.map(function(item){
                item.show = false;
            });
            this.newSelect[index].show = true;
            this.proNew = false;
            this.suitIndex = index;
            this.getSuit();
        },
        getSuit(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('suittype',this.suitIndex);
            let obj = {
                url: this.all.baseUrl + '/template2d/suittype',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.proList = result;
                    if(this.proList.length&&this.ourMsg.id&&this.proNew){
                        this.proList = this.ourMsg.proList;
                    }else{
                        if(this.backImg){
                            this.proList.map(function(item,index){
                                self.compose(index,item.id);
                            });
                        }
                    }
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'Your account has landed elsewhere';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        suitClick(){
            this.select.map(function(item){
                item.show = false;
            });
            this.cnt = 1;
            this.page = [];
            this.flag = 0;
            this.pageIndex = 1;
            this.pageNumber= 0;
            this.proList = [];
            this.showSuit = true;
            this.showOnly = false;
            if(localStorage.getItem('suitIndex')){
                this.showFlower = true;
            }
            this.getSuit();
        },
        changeEnglish(){
            this.$router.go(0);
        },
        // 私人衣橱
        getOnlylist(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',10);
            formData.append('page',this.cnt);
            let obj = {
                url: this.all.baseUrl + '/template2dUserOwn/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.$forceUpdate();
                    this.proList = result.list;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'Your account has landed elsewhere';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 点击定制模型
        modelClick(){
            this.showModel = true;
        },
        // 点击关闭图片
        modelClose(){
            this.showModel = false;
        },
        // 获取高度
        getHeight(){
            this.height = document.offsetHeight-74 + 'px';
        },
        // 左边分类
        changeMessage(index){
            this.classify = [];
            this.page = [];
            this.cnt = 1;
            this.showSuit = false;
            this.showOnly = false;
            this.flag = 0;
            this.pageIndex = 1;
            this.pageNumber= 0;
            this.select.map(function(item){
                item.show = false;
            });
            switch(index){
                case 0: 
                    this.classIndex = 1;
                    this.id = 11;
                    break;
                case 1:
                    this.classIndex = 0;
                    this.id = 0;
                    break;
                case 2:
                    this.classIndex = index;
                    this.id = 21;
                    break;
                case 3:
                    this.classIndex = index;
                    this.id = 19;
                    break;
                default:
                    this.classIndex = index;
                    this.id = 17;
                    break;
            }
            this.select[index].show = true;
            this.classFlag = 0;
            this.getList();
            this.getProlist();
        },
        // 去查看细节
        toDetail(index){
            //  _czc.push(["_trackEvent","3D展示","查看细节","","","prolisttongji"]);
            let self = this;
            if(this.showSuit){
                if(this.backImg==''){
                    this.showJump = true;
                    this.err = 'Please choose the pattern first';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }else{
                    let classifyIndex = 0;
                    this.newSelect.map(function(item,index){
                        if(item.show){
                            classifyIndex = index
                        }
                    });
                    let json = {
                        id: this.proList[index].id,
                        index: index,
                        picture: this.proList[index].backgroudImage,
                        backImg: this.backImg,
                        proList: this.proList,
                        type: 3,
                        classifyIndex: classifyIndex,
                        cnt: this.cnt
                    }
                    localStorage.setItem('threedList',JSON.stringify(json));
                    this.$router.push({
                        path: '/Encontent'
                    });
                }
            }else if(this.showOnly){
                let json = {
                    id: this.proList[index].id,
                    picture: this.proList[index].backgroudImage,
                    type: 2,
                    cnt: this.cnt
                }
                localStorage.setItem('threedList',JSON.stringify(json));
                this.$router.push({
                    path: '/Encontent'
                });
            }else{
                let leftIndex = 0;
                let classifyIndex = 0;
                this.select.map(function(item,index){
                    if(item.show){
                        leftIndex = index;
                    }
                });
                this.classify.map(function(item,index){
                    if(item.show){
                        classifyIndex = index;
                    }
                });
                let json = {
                    id: this.proList[index].id,
                    picture: this.proList[index].backgroudImage,
                    type: 1,
                    leftIndex: leftIndex,
                    classifyIndex: classifyIndex,
                    cnt: this.cnt
                }
                localStorage.setItem('threedList',JSON.stringify(json));
                this.$router.push({
                    path: '/Encontent'
                });
            }
        },
        // 选择热门分类
        changeClassify(index){
            this.page = [];
            this.cnt = 1;
            this.flag = 0;
            this.pageIndex = 1;
            this.classify = this.classify;
            this.classify.map(function(item){
                item.show = false;
            });
            this.id = this.classify[index].id;
            this.classify[index].show = true;
            this.$forceUpdate();
            this.id = this.classify[index].id;
            this.getProlist();
        },
        // 初始化分页器
        pageAuto(){
            this.$forceUpdate();
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
                if(this.showOnly){
                    this.getOnlylist();
                }else{
                    this.getProlist();
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
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7;
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }else{
                        this.cnt = this.page[index].name;
                        this.pageIndex = index+1;
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }
                }else if(this.flag==1){
                    if(index==1||index==5){

                    }else{
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            // 点击首页
                            this.pageIndex = this.cnt;
                            this.flag = 0;
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
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
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            if(this.showOnly){
                                this.getOnlylist();
                            }else{
                                this.getProlist();
                            }
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }
                }
            }
        },
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
                    if(this.showOnly){
                        this.getOnlylist();
                    }else{
                        this.getProlist();
                    }
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
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
                    if(this.showOnly){
                        this.getOnlylist();
                    }else{
                        this.getProlist();
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
            }else{
                if(this.cnt<this.pageNumber){
                    this.cnt++;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                            this.getOnlylist();
                        }else{
                            this.getProlist();
                        }
                        this.pageIndex = 4;
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
        // 获取商品列表
        getProlist(){
            this.showLoading = true;
            let self = this;
            Scroll.stop();
            let formData = new FormData();
            formData.append('page',this.cnt);
            formData.append('pageSize',10);
            formData.append('genre1',this.classIndex);
            formData.append('genre2',this.id);
            let obj = {
                url: this.all.baseUrl + '/template2d/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.$forceUpdate();
                    this.proList = result.list;if(this.typeindex){this.toDetail(this.typeindex);}
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'Your account has landed elsewhere';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 获取头部列表
        getList(index){
            this.classify = [];
            let formData = new FormData();
            this.showLoading = true;
            Scroll.stop();
            let self = this;
            formData.append('id',14);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                let result;
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                if(res.data.status==0){
                    result = JSON.parse(res.data.result.json1);
                    result.category.map(function(item){
                        if(item.categType==self.classIndex){
                            self.classify.push(item);
                        }
                    });
                    if(!this.classFlag){
                        this.classify.map(function(item){
                            item.show = false;
                        });
                        this.classify[0].show = true;
                        this.classFlag = 1;
                    }else{
                        this.classify.map(function(item){
                            item.show = false;
                        });
                        this.classify[index].show = true;
                    }
                    if(this.ourMsg.type==1){
                        this.id = this.classify[this.ourMsg.classifyIndex].id;
                        this.getProlist();
                    }
                    // categType 0女 1男 2童 3家纺 4其它
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'Your account has landed elsewhere';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        getMessage(){
            let self = this;
            this.ourMsg = JSON.parse(localStorage.getItem('threedNewjson'));
            if(this.ourMsg.type==1||this.ourMsg.type==2||this.ourMsg.type==3){
                this.cnt = this.ourMsg.cnt;
                this.pageIndex = this.ourMsg.cnt;
                if(this.ourMsg.type==3){
                    this.backImg = this.ourMsg.backImg;
                    this.seleClick(2);
                    this.newSelect.map(function(item,index){
                        item.show = false;
                    });
                    this.newSelect[this.ourMsg.classifyIndex].show = true;
                }else if(this.ourMsg.type==1){
                    switch(this.ourMsg.leftIndex){
                        case 0: 
                            this.classIndex = 1;
                            this.id = 11;
                            break;
                        case 1:
                            this.classIndex = 0;
                            this.id = 0;
                            break;
                        case 2:
                            this.classIndex = this.ourMsg.leftIndex;
                            this.id = 21;
                            break;
                        case 3:
                            this.classIndex = this.ourMsg.leftIndex;
                            this.id = 19;
                            break;
                        default:
                            this.classIndex = this.ourMsg.leftIndex;
                            this.id = 17;
                            break;
                    }
                    this.select.map(function(item){
                        item.show = false;
                    });
                    this.select[this.ourMsg.leftIndex].show = true;
                    this.classFlag = 1;
                    if(this.type==1||this.type==2){
                        this.seleClick(this.type);
                    }
                    else{
                        this.getList(this.ourMsg.classifyIndex);
                    }
                }else if(this.ourMsg.type==2){
                    this.seleClick(1);
                }
            }else{
                this.getList();
                this.getProlist();
            }
        }
    },
    mounted(){
        this.getHeight();
        this.getMessage();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enthreed'
            });
        }else{
            this.$router.push({
                path: '/Threed'
            });
        }
    }
}
</script>
<style scoped>
    .backFlower{
        position: absolute;
        right: 10rem;
        width: 8rem;
        background: #fff;
        height: 2.5rem;
        border-radius: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 10.4rem;
    }
    .backFlower span{
        width: 6.5rem;
        height: 1.75rem;
        display: flex;
        border: 1px solid #133ffc;
        color: #133ffc;
        font-size: 1rem;
        border-radius: .875rem;
        justify-content: center;
        align-items: center;
    }
    .flowerImg{
        position: absolute;
        width: 27.1875rem;
        height: 10rem;
        top: 12rem;
        right: 7rem;
    }
    .konwImg{
        position: absolute;
        width: 9.125rem;
        height: 5rem;
        left: calc(50% - 4.5625rem);
        top: calc(50vh - 2.5rem);
    }
    .btnBox{
        display: flex;
        margin-bottom: 1.6875rem;
        margin-left: 22rem;
    }
    .btnBox li{
        color: #888;
        font-size: 1.875rem;
        padding: 0 2.625rem;
        cursor: default;
        position: relative;
    }
    .btnBox li:after{
        content: '';
        position: absolute;
        width: 1px;
        height: 1.25rem;
        right: 0;
        top: calc(50% - .625rem);
        background: #888;
    }
    .btnBox li:last-child:after{
        display: none;
    }
    /* 没有数据 */
    .nodata{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #333;
        font-size: 1.25rem;
    }
    .nodata img{
        display: block;
        width: 8rem;
        margin-top: 6.25rem;
        margin-bottom: 1.25rem;
    }
    .suit{
        height: 2.375rem;
        line-height: 2.375rem;
        position: fixed;
        bottom: 12.625rem;
        width: 10rem;
        left: 0;
        cursor: default;
        color: #8d8d8d;
        font-size: 1.125rem;
    }
    .suit span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #133ffc;
        width: .25rem;
    }
    /* 私人衣橱弹窗 */
    .onlyMe{
        height: 2.375rem;
        line-height: 2.375rem;
        position: fixed;
        bottom: 15.625rem;
        width: 10rem;
        left: 0;
        cursor: default;
        color: #8d8d8d;
        font-size: 1.5rem;
    }
    .onlyMe span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #133ffc;
        width: .25rem;
    }
    .onlyBtn{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.6rem;
        position: relative;
    }
    .onlyBtn input{
        position: absolute;
        width: 7rem;
        height: 1.75rem;
        z-index: 222;
        right: 9rem;
        opacity: 0;
        top: 0;
    }
    .onlyBtn span{
        margin-right: 9rem;
        width: 7rem;
        height: 1.75rem;
        box-sizing: border-box;
        cursor: default;
        display: flex;
        border: 1px solid #133ffc;
        color: #133ffc;
        font-size: 1rem;
        border-radius: .875rem;
        justify-content: center;
        align-items: center;
    }
    .downBox span{
        margin-right: 2rem;
        width: 5.625rem;
        height: 1.75rem;
        box-sizing: border-box;
        cursor: default;
        display: flex;
        border: 1px solid #133ffc;
        color: #fff;
        background: #133ffc;
        font-size: 1rem;
        border-radius: .875rem;
        justify-content: center;
        align-items: center;
    }
    .model{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.6);
        z-index: 9999;
    }
    .modelBox{
        width: 80rem;
        height: 50rem;
        position: absolute;
        left: calc(50% - 40rem);
        top: calc(50vh - 25rem);
        background: #fff;
        border-radius: .3125rem;
        box-sizing: border-box;
        padding: 0 4.0625rem;
    }
    .modelBox img{
        position: absolute;
        right: 1.25rem;
        top: 1.25rem;
        width: 1.25rem;
    }
    .modelBox h4{
        font-size: 1.5rem;
        color: #333;
        font-weight: normal;
        padding-top: 1.1875rem;
        margin-bottom: 2rem;
    }
    .modelBox h5{
        font-size: 1.5rem;
        color: #333;
        font-weight: normal;
        text-align: left;
        margin-bottom: 1.5rem;
    }
    .modelBox p{
        color: #333;
        font-size: 1.125rem;
        text-align: left;
        margin-bottom: 1.5rem;
        line-height: 1.75rem;
    }
    .modelBox p span{
        display: block;
    }
    .threed{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: flex-start;
    }
    ul.seleBox{
        width: 10rem;
        min-height: calc(100vh - 4.625rem);
        background: #fff;
        color: #8d8d8d;
        font-size: 1.125rem;
        box-sizing: border-box;
        padding-top: .625rem
    }
    ul.seleBox li{
        height: 2.375rem;
        line-height: 2.375rem;
        position: relative;
        cursor: default;
        margin-bottom: .625rem;
    }
    ul.seleBox span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #133ffc;
        width: .25rem;
    }
    .proBox{
        width: calc(100% - 10rem);
        padding: 2.375rem; 
    }
    .topBox{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
    }
    .topBox h4{
        font-size: 1.125rem;
        color: #333;
        font-weight: normal;
        width: 9rem;
        margin-top: .1rem;
        text-align: left;
        flex-shrink: 0;
    }
    ul.classifyBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }
    ul.classifyBox li{
        color: #8d8d8d;
        margin-right: 1.125rem;
        font-size: 1rem;
        padding: .3125rem 1rem;
        border-radius: 1.875rem;
        background: inherit;
        color: #8d8d8d;
        border: 1px solid #8d8d8d;
        margin-bottom: .625rem;
        cursor: default;
    }
    ul.classifyBox li.special{
        background: #133ffc;
        border: 1px solid #133ffc;
        color: #fff;
    }
    ul.classifyBox li:last-child{
        margin-right: 0;
    }
    ul.proList{
        display: flex;
        flex-wrap: wrap;
    }
    ul.proList li{
        width: 18.4375rem;
        height: 22.5625rem;
        background: #fff;
        margin-bottom: 1.25rem;
        margin-right: 1.25rem;
        box-shadow: 2px 2px 2px #cbccd2;
        border-radius: .5rem;
    }
    /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 5.5rem;
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
</style>