<template>
    <div class="patterns">
        <!-- 花型构图 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <ul class="fixedList">
                <li @click="look">
                    <img class="lookimg" src="../../assets/image/flower/look.png" alt="">
                    <span>连晒预览</span>
                </li>
                <li @click="save">
                    <img class="saveimg" src="../../assets/image/flower/save.png" alt="">
                    <span>保存</span>
                </li>
                <li @click="clearCanvas">
                    <img class="deleteimg" src="../../assets/image/flower/delete.png" alt="">
                    <span>清空画布</span>
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
                <ul class="proBox">
                    <li @click="listClick(index)" v-for="(item,index) in proList" :key="index">
                        <img class="proImg" :src="item.ossUrl+'?x-oss-process=image/resize,l_300'" alt="">
                        <img v-if="item.show" class="trueImg" src="../../assets/image/flower/true.png" alt="">
                    </li>
                </ul>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                    <li class="sureList">
                        <span @click="cancelClick">取消</span>    
                        <span @click="sureClick">确定</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 连晒弹窗 -->
        <div class="bigModel" v-if="showLook">
            <div class="grabBox" v-if="showGrab">
                <h3>提示</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>连晒方式</span>
                <div class="grabWay">
                    <button @click="wayClick(1)">定位连晒</button>
                    <button @click="wayClick(2)">连晒预览</button>
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
                <h3>提示</h3>
                <p class="del" @click="delBig">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span style="padding: 0 .625rem;">今日次数已用完，VIP无限使用，是否前往充值VIP</span>
                <div class="grabWay">
                    <button @click="delBig">取消</button>
                    <button @click="bigSure">确定</button>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Patterns',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            showBig: false,
            path: '/Flowerdesign',
            tabIndex: 3,
            showJump: false,
            err: '',
            height: '',
            showLoading: false,
            leftNav: [{name: '添加素材',show: false},{name: '花型构图',show: true},{name: '添加底纹',show: false},{name: 'AI配色',show: false}],
            navIndex: 0,
            backList: [{name: '共享模板',show: true},{name: '定位花型',show: false}],
            type: 1,
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
            rightList: [],
            firstList: [],
            backImage: require('../../assets/image/flower/can.png'),
            backId: '',
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
            this.pageIndex = 1;
            this.backList.map(function(item){
                item.show = false;
            });
            this.backList[index].show = true;
            this.type = index+1;
            this.getList();
            this.$forceUpdate();
        },
        // 左侧切换 该页面不能点击
        changeMessage(index){
            let self = this;
            this.showJump = true;
            Scroll.stop();
            this.err = '请先点击确定或取消';
            setTimeout(function(){
                self.showJump = false;
                self.err = '';
                Scroll.move();
            },1500);
        },
        // 获取上个页面传递的信息以及列表信息
        getMessage(){
            this.rightList = [];
            this.firstList = [];
            this.list = [];
            let self = this;
            this.list = this.$route.query.message;
            this.list.map(function(item){
                item.show = false;
                item.isCreate=[false,false,false,false,false,false,false,false];
                item.elements=['','','','','','','',''];
                self.rightList.push(item);
                self.firstList.push(item);
            });
            this.backImage = this.$route.query.backImage;
            this.backId = this.$route.query.backId;
            this.judge(1);
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            formData.append('pageSize',18);
            formData.append('page',this.cnt);
            formData.append('genre1',this.type);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/flowerTemplate/list'
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
                path: '/Operate',
                query: {
                    message: this.rightList,
                    type: 2,
                    backImage: this.backImage,
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
            this.getInfo(this.proList[index].id);
        },
        getInfo(str){
            let formData = new FormData();
            let self = this;
            formData.append('id',str);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/flowerTemplate/info'
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let cnt;
                    let result = JSON.parse(res.data.result.templateData);
                    result.elements.map(function(item,i){
                        cnt = Math.floor((self.firstList.length)*Math.random());
                        item.picture = self.firstList[cnt].picture;
                        item.pictureWidth=self.firstList[cnt].width;
                        item.pictureHeight=self.firstList[cnt].height;
                        item.isCreate = [];
                        item.order=i;
                        for(let i=0;i<8;i++){
                            item.isCreate[i] =false;
                        }
                        item.elements=[];
                        for(let i=0;i<8;i++)
                        {
                            item.elements[i]='';
                        }
                        if(item.flip==0){
                            item.rotateX = 0;
                            item.rotateY = 0;
                        }else if(item.flip==1){
                            item.rotateX = 180;
                            item.rotateY = 0;
                        }else if(item.flip==2){
                            item.rotateX = 0;
                            item.rotateY = 180;
                        }
                        if(item.pictureHeight/item.pictureWidth>item.height/item.width){
                            item.width = item.width*4724/600;
                            item.height =item.pictureHeight/item.pictureWidth*item.width;
                        }else{
                            item.height = item.height*4724/600;
                            item.width =item.pictureWidth/item.pictureHeight*item.height;
                        }
                        item.rotateZ = item.rotation;
                        item.left = item.posX - item.width/2/4724*600 + 'px';
                        item.top = item.posY - item.height/2/7087*900 + 'px';
                        item.show = false;
                        item.showEye = true;
                    });
                    this.list = result.elements;
                    this.rightList=[];
                    this.list.map(function(item){
                        self.rightList.push(item);
                    });
                    this.judge();
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
        judge(){
            let self = this;
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                        show: false,
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
                this.picName = '定位预览';
            }else if(index==2){
                this.picType = 2;
                this.picName = '连晒预览';
            }
        },
        // 前往vip页面充值
        bigSure(){
            this.$router.push({
                path: '/Vip'
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
                    this.err = '已保存至我的花型';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
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
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.rightList = [];
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
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.getList();
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.getList();
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
        // localStorage.setItem('path',this.path);
    }
}
</script>
<style scoped>
    .patterns{
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
        height: 2.125rem;
        border-radius: 1.0625rem;
        font-size: 1.125rem;
        color: #8d8d8d;
        line-height: 2.125rem;
        box-sizing: border-box;
        text-align: center;
        background: inherit;
        margin-right: 1.25rem;
        border: 1px solid #8d8d8d;
        cursor: default;
    }
    ul.btnBox li:last-child{
        margin-right: 0;
    }
    ul.btnBox li.special{
        color: #fff;
        background: #133ffc;
        border: 1px solid #133ffc;
    }
    ul.proBox{
        margin-top: 1.875rem;
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
        flex-shrink: 0;
        margin-left: auto;
        margin-right: 1.25rem;
        align-items: center;
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
        overflow-y: scroll;
        z-index: 9999;
        top: 0;
        height: 100vh;
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