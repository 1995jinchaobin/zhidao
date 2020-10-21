<template>
    <div class="shading">
        <!-- 添加底纹 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <ul class="fixedList">
                <li @click="look">
                    <img class="lookimg" src="../../assets/image/flower/look.png" alt="">
                    <span>Preview</span>
                </li>
                <li @click="save">
                    <img class="saveimg" src="../../assets/image/flower/save.png" alt="">
                    <span>Save</span>
                </li>
                <li @click="clearCanvas">
                    <img class="deleteimg" src="../../assets/image/flower/delete.png" alt="">
                    <span>Clear</span>
                </li>
            </ul>
            <ul class="seleBox" :style="{height: height}">
                <li @click="changeMessage(index)" v-for="(item,index) in leftNav" :key="index" :style="{color: item.show?'#133ffc':'#8d8d8d'}">{{item.name}}<span v-if="item.show"></span></li>
            </ul>
            <div class="canvas">
                <img class="ruleImg" src="../../assets/image/flower/rule.png" alt="">
                <div class="canBigbox">
                    <img class="mould" :src="backImage" alt="">  
                    <div @mousedown="listPull(index,$event)" @mouseup="listPush" @click="proClick(index)" :style="{width: item.width*600/4724+'px',height:item.height*900/7087+'px','z-index': item.cnt,left: item.left,top: item.top,display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}" v-for="(item,index) in list" :key="index" :class="item.show?'specialList':'proList'">
                        <img :style="{width: item.width*600/4724+'px',height: item.height*900/7087+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :src="item.picture" alt="">
                    </div>
                </div>
            </div>
            <div class="backBox">
                <ul class="btnBox">
                    <li @click="backClick(index)" :class="item.show?'special':''" v-for="(item,index) in backList" :key="index">{{item.name}}</li>
                </ul>
                <div v-if="showStyle" class="styleBox">
                    <h4>Style：</h4>
                    <ul class="styleList">
                        <li @click="styleClick(index)" :class="item.show?'special':''" v-for="(item,index) in styleList" :key="index">{{item.english}}</li>
                    </ul>
                </div>
                <ul class="proBox">
                    <li class="specialPro" v-if="!showStyle">
                        <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                        <img src="../../assets/image/user/icon_add.png" alt="">
                        <span>Upload background</span>
                    </li>
                    <li @click="listClick(index)" v-for="(item,index) in proList" :key="index">
                        <img class="proImg" :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'" alt="">
                        <img v-if="item.show" class="trueImg" src="../../assets/image/flower/true.png" alt="">
                    </li>
                </ul>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                    <li class="sureList">
                        <span @click="cancelClick">Cancel</span>    
                        <span @click="sureClick">Determine</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 连晒弹窗 -->
        <div class="bigModel" v-if="showLook">
            <div class="grabBox" v-if="showGrab">
                <h3>Tigs</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>Continuous drying method</span>
                <div class="grabWay">
                    <button @click="wayClick(1)">Position</button>
                    <button @click="wayClick(2)">Preview</button>
                </div>
            </div>
            <div class="picBox" v-if="showPic&&picType==1">
                <h5>{{picName}}</h5>
                <p class="picDel" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <div class="posBox">
                    <ul :style="{background: 'url('+backImage+') no-repeat center','background-size': '100% 100%'}" v-for="(bigItem,bigIndex) in 3" :key="bigIndex">
                        <li :style="{width: item.width*600/4724/2+'px',height:item.height*900/7087/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}" v-for="(item,index) in list" :key="index" :class="item.show?'specialList':'proList'">
                            <img :style="{width: item.width*600/4724/2+'px',height: item.height*900/7087/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :src="item.picture" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="picBox specialPic" v-if="showPic&&picType==2">
                <h5>{{picName}}</h5>
                <p class="picDel" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <div class="linkBox">
                    <ul :style="{background: 'url('+backImage+') no-repeat center','background-size': '100% 100%'}" v-for="(bigItem,bigIndex) in 4" :key="bigIndex">
                        <li :style="{width: item.width*600/4724/2+'px',height:item.height*900/7087/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}" v-for="(item,index) in list" :key="index" :class="item.show?'specialList':'proList'">
                            <img :style="{width: item.width*600/4724/2+'px',height: item.height*900/7087/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :src="item.picture" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bigModel" v-if="showBig">
            <div class="grabBox" style="height: 12rem;">
                <h3>Tigs</h3>
                <p class="del" @click="delBig">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span style="padding: 0 .625rem;">Today's number of times has been exhausted, VIP unlimited use, whether to go to recharge VIP</span>
                <div class="grabWay">
                    <button @click="delBig">Cancel</button>
                    <button @click="bigSure">Determine</button>
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
import { debuglog } from 'util';
export default {
    name: 'Enshading',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            showBig: false,
            path: '/Enflowerdesign',
            tabIndex: 3,
            showJump: false,
            err: '',
            height: '',
            showLoading: false,
            leftNav: [{name: 'Adding material',show: false},{name: 'Pattern',show: false},{name: 'Adding undertone',show: true},{name: 'AI Colour',show: false}],
            navIndex: 0,
            backList: [{name: 'Shared',show: true},{name: 'Mine',show: false}],
            type: 0,
            list: [],
            // 页数
            cnt: 1,
            pageIndex: 1,
            flag: 0,
            // 商品数据
            proList: [],
            // 分页数
            pageNumber: 0,
            page: [],
            styleList: [],
            showStyle: true,
            styleCnt: 0,
            backImage: require('../../assets/image/flower/can.png'),
            backId: '',
            url: '',
            rightList: [],
            // 连晒
            showLook: false,
            showGrab: false,
            showPic: false,
            picType: 0,
            picName: ''
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
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
        upSource(str){
            let formData = new FormData();
            let self = this;
            formData.append('picture',str);
            formData.append('type1',3);
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
                    this.getInfo();
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
        // 获取高度
        getHeight(){
            this.height = document.offsetHeight-74 + 'px';
        },
        // 选择类型
        backClick(index){
            this.pageNumber = 0;
            this.page = [];
            this.cnt = 1;
            this.flag = 0;
            this.proList = [];
            this.type = 0;
            this.pageIndex = 1;
            this.backList.map(function(item){
                item.show = false;
            });
            this.backList[index].show = true;
            if(index==0){
                this.getList();
                this.showStyle = true;
            }else if(index==1){
                this.getInfo();
                this.showStyle = false;
            }
            this.$forceUpdate();
        },
        // 左侧切换 该页面不能点击
        changeMessage(index){
            let self = this;
            this.showJump = true;
            Scroll.stop();
            this.err = 'Please Click to Determine or Cancel first';
            setTimeout(function(){
                self.showJump = false;
                self.err = '';
                Scroll.move();
            },1500);
        },
        // 获取上个页面传递的信息以及列表信息
        getMessage(){
            this.rightList = [];
            this.list = [];
            let self = this;
            this.list = this.$route.query.message;
            // this.rightList
            this.list.map(function(item){
                item.show = false;
                item.isCreate=[false,false,false,false,false,false,false,false];
                item.elements=['','','','','','','',''];
                self.rightList.push(item);
            });
            this.backImage = this.$route.query.backImage;
            this.backId = this.$route.query.backId;
            this.judge(1);
        },
        getToplist(){
            let formData = new FormData();
            let self = this;
            formData.append('id',15);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    this.styleList = JSON.parse(result.json1).background;
                    if(!this.styleCnt){
                        this.styleList.map(function(item){
                            item.show = false;
                        });
                        this.styleList[0].show = true;
                        this.styleCnt++;
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
        styleClick(index){
            this.pageNumber = 0;
            this.page = [];
            this.cnt = 1;
            this.flag = 0;
            this.proList = [];
            this.pageIndex = 1;
            this.styleList.map(function(item){
                item.show = false;
            });
            this.styleList[index].show = true;
            this.$forceUpdate();
            this.type = this.styleList[index].id;
            this.getList();
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            formData.append('pageSize',18);
            formData.append('page',this.cnt);
            if(this.type!=0){
                formData.append('type1',this.type);
            }
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/app3dShadingJyg/list'
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    let result = res.data.result;
                    result.list.map(function(item){
                        item.show = false;
                    });
                    this.proList = result.list;
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.$forceUpdate();
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
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 图片点击
        proClick(index){
            let self = this;
            this.list.map(function(item,i){
                if(i==index||item.order==self.list[index].order){
                    item.show = true;
                }else{
                    item.show = false;
                }
            });
            this.$forceUpdate();
        },
        listPull(index,event){
            var self = this;
            self.list.map(function(item){
                item.show = false;
            });
            self.list[index].show = true;
            var event = event || window.event;
            var _target = event.target;
            var startx = event.clientX;
            var starty = event.clientY;
            var roundX = startx-event.target.offsetLeft;
            var roundY = starty-event.target.offsetTop;
            var width = document.documentElement.clientWidth;
            var height = window.innerHeight;
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue=false;
            };
            var left = parseFloat(self.list[index].left);
            var top = parseFloat(self.list[index].top);
            var disX,disY;
            document.onmousemove = function(ev){
                var event=ev || window.event;
                var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
                var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
                if(event.clientX<0||event.clientY<0||event.clientX>width||event.clientY>height){
                    return false;
                };
                disX= event.clientX-roundX;
                disY=event.clientY-roundY;
                var endx = event.clientX-roundX+left;
                var endy = event.clientY-roundY+top;
                if(endx<(-(self.list[index].width)*600/4724)||endx>600||endy<(-(self.list[index].height)*900/7087)||endy>900){
                    self.listPush();
                }else{
                    self.list.map(function(item,i){
                        if (item.order== self.list[index].order){
                            var left = item.posX-item.width*600/4724/2;
                            var top = item.posY-item.height*900/7087/2;
                            item.left=disX+left+'px';
                            item.top=disY+top+'px';
                            item.show=true;
                        }
                    });
                    self.$forceUpdate();
               }
            }
        },
        listPush(){
            let self =this;
            this.list.map(function(item,index){                 
                item.posX= parseFloat(self.list[index].left)+item.width*600/4724/2;
                item.posY=parseFloat(self.list[index].top)+item.height*900/7087/2;
            });
            this.judge();
            document.onmousemove = null;
        },
        // 点击确定或取消
        sureClick(){
            this.$router.push({
                path: '/Enoperate',
                query: {
                    message: this.rightList,
                    backImage: this.backImage,
                    type: 3,
                    backId: this.backId,
                    specialType: this.$route.query.specialType
                }
            });
        },
        cancelClick(){
            this.sureClick();
        },
        // 点击列表
        listClick(index){
            this.proList.map(function(item){
                item.show = false;
            });
            this.proList[index].show = true;
            this.$forceUpdate();
            this.backImage = this.proList[index].pictureThumbnail;
            this.backId = this.proList[index].id;
        },
        getInfo(){
            let formData = new FormData();
            let self = this;
            formData.append('pageSize',17);
            formData.append('page',this.cnt);
            formData.append('type1',3);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list'
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    result.list.map(function(item){
                        item.show = false;
                    });
                    this.proList = result.list;
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.$forceUpdate();
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
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 判断
        judge(str){
            let self = this;
            let flag = true;
            if(str){
                flag = false;
            }
            this.list.map(function(item,index){
                let posx,posy;
                let order=item.order;
                let cosWidth = Math.abs((item.width/2*600/4724)*Math.cos(item.rotateZ/180.0*Math.PI))+Math.abs((item.height/2*900/7087)*Math.sin(item.rotateZ/180.0*Math.PI));
                let cosHeight = Math.abs((item.height/2*900/7087)*Math.cos(item.rotateZ/180.0*Math.PI))+Math.abs((item.width/2*600/4724)*Math.sin(item.rotateZ/180.0*Math.PI));
                cosWidth*=item.zoom;
                cosHeight*=item.zoom;
                if(item.posX-cosWidth<0&&!item.isCreate[0]){
                    item.isCreate[0]=true;
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[7]){
                            return;
                        }
                        item.elements[3].isCreate[7] = true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[5]){
                            return;
                        }
                        item.elements[2].isCreate[5] = true;
                    }
                    posx = item.posX + 600;
                    posy = item.posY;
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[1]=item;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate: iscreate
                    });
                }
                if(item.posX+cosWidth>600&&!item.isCreate[1]){
                    item.isCreate[1]=true;
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[6]){
                            return;
                        }
                        item.elements[3].isCreate[6] = true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[4]){
                            return;
                        }
                        item.elements[2].isCreate[4] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[0]=true;
                    let elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[0]=item;
                    posx = item.posX- 600;
                    posy = item.posY; ;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY+cosHeight>900&&!item.isCreate[2]){
                    item.isCreate[2]=true;
                    if (item.elements[1]){
                        if(item.elements[1].isCreate[7]){
                            return;
                        }
                        item.elements[1].isCreate[7] = true;
                    }
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[6]){
                            return;
                        }
                        item.elements[0].isCreate[6] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] = false;
                    }
                    iscreate[3] = true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[3] = item;
                    posx = item.posX ;
                    posy = item.posY-900; 
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                
                }
                if(item.posY-cosHeight<0&&!item.isCreate[3]){
                    item.isCreate[3]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[5]){
                            return;
                        }
                        item.elements[1].isCreate[5]=true;
                    }
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[4]){
                            return;
                        }
                        item.elements[0].isCreate[4] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[2]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i] = '';
                    }
                    elements[2] = item;
                    posx = item.posX ;
                    posy = item.posY+900 ;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY-cosHeight<0&&item.posX+cosWidth>600&&!item.isCreate[4]){
                    item.isCreate[4]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[3]){
                            return;
                        }
                        item.elements[1].isCreate[3] = true;
                    }
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[1]){
                            return;
                        }
                        item.elements[3].isCreate[1]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[7]=true;
                    iscreate[2]=true; 
                    iscreate[0]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i] = '';
                    }
                    elements[7] = item;
                    posx = item.posX - 600;
                    posy = item.posY+900;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY-cosHeight<0&&item.posX-cosWidth<0&&!item.isCreate[5]){
                    item.isCreate[5]=true;
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[3]){
                            return;
                        }
                        item.elements[0].isCreate[3] = true;
                    }
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[0]){
                            return;
                        }
                        item.elements[3].isCreate[0]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[6]=true;
                    iscreate[2]=true; 
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[6] = item;
                    posx = item.posX + 600;
                    posy = item.posY+900;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY+cosHeight>900&&item.posX+cosWidth>600&&!item.isCreate[6]){
                    item.isCreate[6]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[2]){
                            return;
                        }
                        item.elements[1].isCreate[2]=true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[1]){
                            return;
                        }
                        item.elements[2].isCreate[1] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[5]=true;
                    iscreate[3]=true; 
                    iscreate[0]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[5] = item;
                    posx = item.posX - 600;
                    posy = item.posY-900;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }else if(item.posY+cosHeight>900&&item.posX-cosWidth<0&&!item.isCreate[7]){
                    item.isCreate[7]=true;
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[2]){
                            return;
                        }
                        item.elements[0].isCreate[2] = true;
                    }
                    if (item.elements[2]){
                        if(item.elements[2].isCreate[0]){
                            return;
                        }
                        item.elements[2].isCreate[0]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[4]=true;
                    iscreate[3]=true; 
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[4] = item;
                    posx = item.posX + 600;
                    posy = item.posY-900 ;
                    self.list.push({
                        width: self.list[index].width,
                        height: self.list[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: self.list[index].picture,
                        showEye: true,
                        show: flag,
                        zoom: self.list[index].zoom,
                        rotateX: self.list[index].rotateX,
                        rotateY: self.list[index].rotateY,
                        rotateZ: self.list[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                self.$forceUpdate();
            });
        },
        // 连晒预览
        look(){
            this.showLook = true;
            this.showGrab = true;
            this.showPic = false;
        },
        delLook(){
            this.showLook = false;
            this.showGrab = false;
            this.showPic = false;
        },
        wayClick(index){
            this.showGrab = false;
            this.showPic = true;
            if(index==1){
                this.picType = 1;
                this.picName = 'Position preview';
            }else if(index==2){
                this.picType = 2;
                this.picName = 'Preview of continuous exposure';
            }
        },
        // 前往vip页面充值
        bigSure(){
            this.$router.push({
                path: '/Envip'
            });
        },
        // 关闭
        delBig(){
            this.showBig = false;
        },
        // 保存
        save(){
            let self = this;
            let forms = new FormData();
            forms.append('opName','hx');
            this.getData({
                url: this.all.baseUrl+'/usageRestriction/canUse',
                formdata: forms
            }).then(res=>{
                if(res.data.status==0){
                    if(res.data.result.res){
                        this.showLoading = true;
                        this.rightList.map(function(item){
                            item.imageUrl = item.picture;
                        });
                        let element = [];
                        let filp = [];
                        this.rightList.map(function(item,i){
                            if(item.rotateX/180%2==1&&item.rotateY/180%2==0){
                                filp[i] = 1;
                            }else if(item.rotateY/180%2==1&&item.rotateX/180%2==0){
                                filp[i] = 2;
                            }else{
                                filp[i] = 0;
                            }
                            let o = {
                                imageUrl: item.picture,
                                flip: filp[i],
                                posX: item.posX,
                                posY: item.posY,
                                id: item.id,
                                order: item.order,
                                width: item.width*600/4724,
                                height: item.height*900/7087,
                                zoom: item.zoom,
                                rotation: item.rotateZ
                            };
                            element.push(o);
                        });
                        let formData = new FormData();
                        let json = {
                            elements: element,
                            backId: this.backId
                        }
                        if(this.backId){
                            json.background = this.backImage;
                        }else{
                            json.background = '';
                        }
                        formData.append("cartStatus",0);
                        formData.append("myStatus",0);
                        formData.append("sourceFile",JSON.stringify(json));
                        formData.append("resolutionRatio",300);
                        formData.append("sizeHeight",60);
                        formData.append("sizeWidth",40);
                        formData.append("format","png");
                        formData.append("hierarchy",0);
                        let obj = {
                            url: this.all.baseUrl + '/app3dFlowerTypeJyg/save',
                            formdata: formData
                        }
                        this.getData(obj).then(res=>{
                            setTimeout(function(){
                                self.showLoading = false;
                            },500);
                            if(res.data.status==0){
                                this.newSave(res.data.result.id);
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
                                },1500);
                            }else{
                                this.showJump = true;
                                this.err = res.data.msg;
                                Scroll.stop();
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    Scroll.move();
                                },1500);
                            }
                        });
                    }else{
                        this.showBig = true;
                    }
                }
            });
            
        },
        newSave(str){
            let self = this;
            let formData = new FormData();
            formData.append('myStatus',1);
            formData.append('targetId',str);
            let arr = [];
            if(this.$route.query.specialType==2){
                this.rightList.map(function(item){
                    arr.push(item.id);
                });
                formData.append('idListJson',arr);
            }
            // 商城花型
            let obj = {
                url: this.all.baseUrl+'/app3dFlowerTypeShoppingCartJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.showJump = true;
                    this.err = 'Saved to my pattern';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
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
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 清空画布
        clearCanvas(){
            this.list = [];
            this.rightList = [];
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.$forceUpdate();
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
                if(this.showStyle){
                    this.getList();
                }else{
                    this.getInfo();
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
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else{
                        this.cnt = this.page[index].name;
                        this.pageIndex = index+1;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
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
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
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
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            if(this.showStyle){
                                this.getList();
                            }else{
                                this.getInfo();
                            }
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
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
                    if(this.showStyle){
                        this.getList();
                    }else{
                        this.getInfo();
                    }
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
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
                    if(this.showStyle){
                        this.getList();
                    }else{
                        this.getInfo();
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
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        if(this.showStyle){
                            this.getList();
                        }else{
                            this.getInfo();
                        }
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
        this.getHeight();
        this.getMessage();
        this.getList();
        this.getToplist();
        localStorage.setItem('path',this.path);
    }
}
</script>
<style scoped>
    .shading{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
    }
    ul.seleBox{
        width: 10rem;
        min-height: calc(100vh - 4.625rem);
        background: #fff;
        color: #8d8d8d;
        font-size: 1.125rem;
        box-sizing: border-box;
        padding-top: .625rem;
        flex-shrink: 0;
    }
    ul.seleBox>li{
        height: 2.375rem;
        line-height: 2.375rem;
        position: relative;
        cursor: default;
    }
    ul.seleBox span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #133ffc;
        width: .25rem;
    }
    ul.fixedList{
        position: fixed;
        z-index: 88;
        width: 10rem;
        left: 0;
        bottom: 4.875rem;
        color: #8d8d8d;
        font-size: .875rem;
    }
    ul.fixedList span{
        display: block;
        margin-top: .375rem;
    }
    ul.fixedList li{
        margin-top: 2.3125rem;
    }
    ul.fixedList img{
        width: 100%;
        display: block;
        margin: 0 auto;
    }
    ul.fixedList .lookimg{
        width: 2.3125rem;
    }
    ul.fixedList .saveimg{
        width: 1.6875rem;
    }
    ul.fixedList .deleteimg{
        width: 1.875rem;
    }
    .canvas{
        width: 620px;
        margin-top: 1.875rem;
        margin-bottom: 2.5rem;
        margin-left: .625rem;
        height: 920px;
        flex-shrink: 0;
        position: relative;
    }
    .ruleImg{
        display: block;
        width: 100%;
        height: 100%;
    }
    .canBigbox{
        width: 600px;
        height: 900px;
        top: 20px;
        left: 20px;
        z-index: 88;
        position: absolute;
        overflow: hidden;
    }
    .mould{
        display: block;
        width: 600px;
        height: 900px;
    }
    .proList{
        position: absolute;
        border-radius: .625rem;
        border: 2px solid transparent;
    }
    .specialList{
        position: absolute;
        border-radius: .625rem;
        border: 2px solid #000;
    }
    .backBox{
        margin-left: 2.1875rem;
    }
    ul.btnBox{
        margin-top: 4.5625rem;
        display: flex;
    }
    ul.btnBox li{
        width: 6.875rem;
        font-size: 1.5rem;
        color: #8d8d8d;
        text-align: left;
        background: inherit;
        margin-right: 2.1875rem;
        cursor: default;
        position: relative;
    }
    ul.btnBox li:first-child::after{
        content: '';
        width: 1px;
        height: 1.25rem;
        background: #8d8d8d;
        position: absolute;
        right: -2.1875rem;
        top: calc(50% - 0.625rem);
    }
    ul.btnBox li:last-child{
        margin-right: 0;
        margin-left: 2.1875rem;
    }
    ul.btnBox li.special{
        color: #333;
    }
    .styleBox{
        margin-top: .75rem;
        display: flex;
    }
    .styleBox h4{
        text-align: left;
        color: #333;
        font-size: 1rem;
        font-weight: normal;
        line-height: 1.875rem;
        flex-shrink: 0;
    }
    ul.styleList{
        margin-left: .3125rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    ul.styleList li{
        margin-right: 1.25rem;
        height: 1.875rem;
        border-radius: .9375rem;
        color: #8d8d8d;
        font-size: 1rem;
        cursor: default;
        line-height: 1.875rem;
        background: inherit;
        padding: 0 .625rem;
        margin-bottom: .625rem;
        border: 1px solid #8d8d8d;
    }
    ul.styleList li:last-child{
        margin-right: 0;
    }
    ul.styleList li.special{
        background: #133ffc;
        border: 1px solid #133ffc;
        color: #fff;
    }
    ul.proBox{
        margin-top: .875rem;
        display: flex;
        flex-wrap: wrap;
    }
    ul.proBox li{
        width: 10rem;
        height: 15rem;
        position: relative;
        background: #fff;
        margin-right: 1.25rem;
        margin-bottom: 1.25rem;
        border-radius: .3125rem;
        box-shadow: 2px 2px 2px #d8d9dc;
        position: relative;
    }
    ul.proBox li.specialPro{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #333;
        font-size: 1rem;
    }
    .specialPro img{
        width: 2.375rem;
        height: 2.375rem;
        display: block;
        margin-bottom: .5rem;
    }
    .specialPro input{
        display: block;
        position: absolute;
        z-index: 222;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 15rem;
    }
    ul.proBox li .proImg{
        display: block;
        width: 100%;
        height: 100%;
    }
    .trueImg{
        position: absolute;
        top: 0;
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
    }
    /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 1.75rem;
        align-items: center;
        flex-wrap: wrap;
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
    ul.pageBox li.sureList{
        display: flex;
        margin-left: auto;
        flex-shrink: 0;
        align-items: center;
        margin-right: 1.25rem;
        width: 18.75rem;
        background: inherit;
        box-shadow: 0 0 0 #eee;
        border: none;
    }
    ul.pageBox li.sureList span{
        width: 6.25rem;
        height: 2.5rem;
        display: block;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        box-sizing: border-box;
        font-size: 1.125rem;
        text-align: center;
        border-radius: 1.25rem;
        border: 1px solid #133ffc;
    }
    ul.pageBox li.sureList span:nth-child(1){
        background: inherit;
        color: #133ffc;
        margin-right: 2.625rem;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    @media screen and (max-width: 1281px){
        ul.pageBox{
            justify-content: center;
        }
        ul.pageBox li.sureList{
            margin: 0 auto;
            margin-top: 1.25rem;
        }
    }
    /* 连晒弹窗 */
    .bigModel{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        overflow-y: scroll;
        width: 100%;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .grabBox{
        width: 22.5rem;
        height: 11.25rem;
        background: #fff;
        border-radius: .625rem;
        margin: 0 auto;
        position: relative;
        margin-top: 25rem;
    }
    .grabBox h3{
        padding-top: .9375rem;
        font-weight: normal;
        font-size: 1.5rem;
        margin: 0;
    }
    .grabBox .del{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        right: .5rem;
        top: .5rem;
        line-height: 1.25rem;
        text-align: cneter;
        cursor: pointer;
    }
    .del img{
        width: 100%;
        display: block;
    }
    .grabBox span{
        display: block;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox .grabWay{
        display: flex;
        justify-content: space-around;
    }
    .grabWay button{
        width: 7.8125rem;
        height: 2.5rem;
        outline: none;
        border: none;
        line-height: 2.5rem;
        color: #fff;
        background: #133ffc;
        font-size: 1.25rem;
        border-radius: .625rem;
    }
    .picBox{
        position: absolute;
        background: #fff;
        top: 50px;
        left: calc(50% - 500px);
        width: 1000px;
        height: 600px;
        margin-bottom: 50px;
        border-radius: .625rem;
    }
    .specialPic{
        width: 700px;
        height: 1000px;
        left: calc(50% - 350px);
    }
    .picBox h5{
        font-size: 1.875rem;
        color: #333;
        font-weight: normal;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .picDel{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 15px;
        top: 15px;
    }
    .picDel img{
        display: block;
        width: 100%;
    }
    .posBox{
        display: flex;
        justify-content: center;
    }
    .posBox ul{
        width: 300px;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .posBox ul li{
        position: absolute;
        border-radius: .625rem;
        border: 2px solid transparent;
    }
    .linkBox{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .linkBox ul{
        width: 300px;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .linkBox ul li{
        position: absolute;
        border-radius: .625rem;
        border: 2px solid transparent;
    }
</style>