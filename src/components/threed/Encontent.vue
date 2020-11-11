<template>
    <div class="threedcontent">
        <!-- 3D展示详情页 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div :class="['content',showLeft==false?'newContent':'']">
            <ul v-if="showLeft" class="seleBox" :style="{height: height}">
                <li @click="changeMessage(index)" v-for="(item,index) in select" :key="index" :style="{color: item.show?'#133ffc':'#8d8d8d'}">{{item.name}}<span v-if="item.show"></span></li>
            </ul>
            <ul v-if="showLeft" class="pageBox">
                <li @click="prev" class="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                <li :style="{display: navIndex==0?'flex':'none'}" class="upFabric">
                    <img src="../../assets/image/3d/cloud.png" alt="">
                    <span>Upload</span>
                    <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                </li>
                <li @click="next" class="next"><img src="../../assets/image/cut/right.png" alt=""></li>
            </ul>
            <div v-if="showLeft" class="proBox">
                <ul :class="['classifyBox',showAlllist?'downClassify':'']" v-if="navIndex==0">
                    <li @click="downClick" class="downBtn"><img src="../../assets/image/3d/top.png" alt=""></li>
                    <li :class="showAll?'selected':''" @click="classifyClick('all')">Whole</li>
                    <li :class="item.show?'selected':''" @click="classifyClick(index)" v-for="(item,index) in classifyList" :key="index">{{item.typeName}}</li>
                    <li @click="addClassify" class="specialLi"><img src="../../assets/image/3d/add.png" alt=""></li>
                </ul>
                <ul class="proList">
                    <li class="specialPro" v-if="!list.length">
                        <img width="100%" src="../../assets/image/user/Emoji.png" alt="">
                        <span>No data available for the time being</span>
                    </li>
                    <li v-else @click="listClick(index)" v-for="(item,index) in list" :key="index">
                        <img width="100%" v-if="navIndex==0" :src="item.preview" alt="">
                        <img width="100%" v-if="navIndex==1" :src="item.app3dFlowerTypeJygModel.preview" alt="">
                        <img width="100%" v-if="navIndex==2" :src="item.indentSubsidiaryModels[0].picture1" alt="">
                        <input name="select" type="radio" class="listSele">
                        <span class="listImg"></span>
                    </li>
                </ul>
            </div>
            <div class="operateBox">
                <div @click="back" class="backBox">
                    <img src="../../assets/image/3d/backicon.png" alt="">
                    <span>Back</span>
                </div>
                <div class="inputBox">
                    <label for="">
                        <span>Upper-lower offset：</span>
                        <input @blur="inputClicky" @keyup.enter="inputClicky" v-model="rotateY" type="text">
                    </label>
                    <label for="">
                        <span>Left-right offset：</span>
                        <input @blur="inputClickx" @keyup.enter="inputClickx" v-model="rotateX" type="text">
                    </label>
                </div>
                <div class="pointBox">
                    <span @click="directionClick('top')" class="top"></span>
                    <div class="infeed">
                        <span @click="directionClick('left')" class="left"></span>
                        <span @click="directionClick('right')" class="right"></span>
                    </div>
                    <span @click="directionClick('bottom')" class="bottom"></span>
                </div>
                <div class="btnBox">
                    <div class="btn" @click="down">
                        <img src="../../assets/image/3d/download.png" alt="">
                        <span>Export</span>
                    </div>
                    <div @click="downHD" class="btn pictureBtn">
                        <img src="../../assets/image/3d/queen.png" alt="">
                        <span>Get a HD map</span>
                    </div>
                </div>
            </div>
            <div class="imgBox">
                <img :src="picture" alt="">
            </div>
            <div class="upBox">
                <span>Enlarge</span>
                <div class="line">
                    <span @mousedown="pull($event)" @mouseup="push($event)">
                        <span class="case">{{ratio}}</span>
                    </span>
                </div>
                <span>Narrow</span>
            </div>
        </div>
        <!-- 新建弹窗 -->
        <div class="editModel" v-if="showEdit">
            <div class="editBox">
                <div class="closeBox"><img @click="closeEdit" class="close" src="../../assets/image/user/close.png" alt=""></div>
                <h5>Establish</h5>
                <div class="editTitle">
                    <span>Title</span>
                    <input type="text" v-model="addTitle">
                </div>
                <div class="editBtn">
                    <div class="sureBox">
                        <button @click="closeEdit" class="cancel">Cancel</button>
                        <button @click="sureEdit">Determine</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bigModel" v-if="showGrab">
            <div class="grabBox">
                <h3>Tips</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>Personal VIP access rights, whether to recharge VIP?</span>
                <div class="grabWay">
                    <button @click="wayClick(1)">Cancel</button>
                    <button @click="wayClick(2)">Determine</button>
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
let date = new Date();
export default {
    name: 'Encontent',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Enontent',
            showJump: false,
            err: '',
            height: '',
            tabIndex: 6,
            showLoading: false,
            navIndex: 0,
            user: {},
            url: '',
            id: '',
            str: '',
            showAlllist: false,
            // 操作的图片
            picture: '',
            select: [{name: 'Fabric',show: true},{name: 'Design Pattern',show: false},{name: 'Shopping Pattern',shohw: false}],
            // 面料编辑弹窗
            showEdit: false,
            classifyList: [],
            list: [],
            addTitle: '',
            cnt: 1,
            pageNumber: '',
            showAll: true,
            // 图片显示
            flag: 0,
            backImg: '',
            rotateX: '',
            rotateY: '',
            ratio: 1,
            pictureHD: '',
            showGrab: false,
            showBussiness: false,
            // 左边面料的显示与否
            showLeft: true,
            backIndex: ''
        }
    },
    methods: {
        inputClicky(){
            let self = this;
            if(this.flag){
                if(parseFloat(this.rotateY)>1||parseFloat(this.rotateY)<0){
                    this.showJump = true;
                    this.err = 'Migration ranges from 0 to 1';
                    this.rotateY = 0;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }else{
                    let o = {};
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }else{
                this.showJump = true;
                this.err = 'Please select the picture first'
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        inputClickx(){
            let self = this;
            if(this.flag){
                if(parseFloat(this.rotateX)>1||parseFloat(this.rotateX)<0){
                    this.showJump = true;
                    this.err = 'Migration ranges from 0 to 1';
                    this.rotateX = 0;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }else{
                    let o = {};
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }else{
                this.showJump = true;
                this.err = 'Please select the picture first'
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        changeEnglish(){
            this.$router.go(0);
        },
        pull(e){
            var prevent;
            var self = this;
            if(self.backImg){
                var event=e || window.event;
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
                document.onmousemove = function(ev){
                    var event=ev || window.event;
                    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
                    if(event.clientY<0||event.clientX<0||event.clientY>height){
                        return false;
                    };
                    var endx = event.clientX-roundX;
                    var endy = event.clientY-roundY;
                    if(endy<0||endy>376){
                        if(endy<0){
                            self.ratio = 2;
                        }else{
                            self.ratio = 0;
                        }
                        self.push();
                    }else{
                        _target.style.top = endy+'px';
                        prevent = 1-(endy)/376;
                        self.ratio = (prevent*2).toFixed(2);
                    }
                    if(endx<-13&&endx>13){
                        document.onmousemove = null;
                        document.onmouseup = null;
                        var o = {};
                        o.ratio = self.ratio;
                        o.rotateX = self.rotateX;
                        o.rotateY = self.rotateY;
                        self.compose(o);
                    }
                }
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    let self = this;
                    var o = {};
                    o.ratio = self.ratio;
                    o.rotateX = self.rotateX;
                    o.rotateY = self.rotateY;
                    self.compose(o);
                };
            }else{
                this.showJump = true;
                Scroll.stop();
                this.err = 'Please select the picture first';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        },
        move(event){

        },
        push(){
            
        },
        delLook(){
            this.showGrab = false;
        },
        wayClick(index){
            if(index==1){
                this.showGrab = false;
            }else if(index==2){
                this.$router.push({
                    path: '/Envip'
                });
            }
        },
        // 展开列表
        downClick(){
            this.showAlllist = !this.showAlllist;
        },
        // 方向键点击
        directionClick(direction){
            let self = this;
            let o = {};
            if(this.flag){
                let speed = 0.2;
                if(!this.rotateX){
                    this.rotateX = 0.00;
                }
                if(!this.rotateY){
                    this.rotateY = 0.00;
                }
                this.rotateX = parseFloat(this.rotateX);
                this.rotateY = parseFloat(this.rotateY);
                if(direction=='top'){
                    let num = parseFloat(this.rotateY - speed).toFixed(2);
                    if(num<0){
                        this.rotateY = (this.rotateY).toFixed(2);
                        this.showJump = true;
                        this.err = 'Migration ranges from 0 to 1';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        },1500);
                    }else{
                        this.rotateY = num;
                        o.rotateY = this.rotateY;
                        o.rotateX = this.rotateX;
                        o.ratio = this.ratio;
                        this.compose(o);
                    }
                }else if(direction=='left'){
                    let num = parseFloat(this.rotateX - speed).toFixed(2);
                    if(num<0){
                        this.rotateY = (this.rotateX).toFixed(2);
                        this.showJump = true;
                        this.err = 'Migration ranges from 0 to 1';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        },1500);
                    }else{
                        this.rotateX = num;
                        o.rotateY = this.rotateY;
                        o.rotateX = this.rotateX;
                        o.ratio = this.ratio;
                        this.compose(o);
                    }
                }else if(direction=='right'){
                    let num = parseFloat(this.rotateX + speed).toFixed(2);
                    if(num>1){
                        this.rotateX = (this.rotateX).toFixed(2);
                        this.showJump = true;
                        this.err = 'Migration ranges from 0 to 1';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        },1500);
                    }else{
                        this.rotateX = num;
                        o.rotateY = this.rotateY;
                        o.rotateX = this.rotateX;
                        o.ratio = this.ratio;
                        this.compose(o);
                    }
                }else if(direction=='bottom'){
                    let num = parseFloat(this.rotateY + speed).toFixed(2);
                    if(num>1){
                        this.rotateY = (this.rotateY).toFixed(2);
                        this.showJump = true;
                        this.err = 'Migration ranges from 0 to 1';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        },1500);
                    }else{
                        this.rotateY = num;
                        o.rotateY = this.rotateY;
                        o.rotateX = this.rotateX;
                        o.ratio = this.ratio;
                        this.compose(o);
                    }
                }
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
        // 图片点击
        listClick(index){
            this.flag = 1;
            if(this.navIndex==0){
                this.backImg = this.list[index].preview;
            }else if(this.navIndex==1){
                this.backImg = this.list[index].app3dFlowerTypeJygModel.preview;
            }else if(this.navIndex==2){
                this.backImg = this.list[index].indentSubsidiaryModels[0].picture1;
            }
            let o = {};
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
        },
        // 图片合成接口
        compose(o){
            this.showLoading = true;
            let self = this;
            Scroll.stop();
            let formData = new FormData();
            if(o){
                // 缩放
                if(o.ratio){
                    formData.append('ratio',o.ratio);
                }
                // 左右偏移
                if(o.rotateX){
                    formData.append('rotateX',o.rotateX);
                }
                // 上下偏移
                if(o.rotateY){
                    formData.append('rotateY',o.rotateY);
                }
            }
            formData.append('imageUrl',this.backImg);
            formData.append('templateId',this.json.id);
            let obj;
            if(this.json.type==2){
                obj = {
                    url: this.all.baseUrl + '/template2d/composeOwn',
                    formdata: formData
                }
            }else{
                obj = {
                    url: this.all.baseUrl + '/template2d/compose',
                    formdata: formData
                }
            }
            this.getData(obj).then( res => {
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                Scroll.move();
                if(res.data.status==0){
                    this.picture = res.data.result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
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
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 保存图片到本地
        down(){
            let self = this;
            if(this.backImg){
                window.location.href= this.all.baseUrl+"/file/download?url="+this.picture;
            }else{
                this.showJump = true;
                this.err = 'Please synthesize the pictures first';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        },
        // 保存高清图
        downHD(){
            let self = this;
            if(this.backImg){
                if(!this.showBussiness){
                    this.showGrab = true;
                }else{
                    this.showLoading = true;
                    let formData = new FormData();
                    if(!this.rotateX){
                        this.rotateX = 0;
                    }
                    if(!this.rotateY){
                        this.rotateY = 0;
                    }
                    let obj={
                        url:  this.all.baseUrl+'/template2d/composeHD?imageUrl='+this.backImg+'&templateId='+this.json.id+'&ratio='+this.ratio+'&rotateX='+this.rotateX+'&rotateY='+this.rotateY,
                        formdata: formData
                    };
                    this.getData(obj).then(function(result){
                        if(result.status==200){
                            self.showLoading = false;
                            window.location.href= self.all.baseUrl+"/file/download?url="+result.data.result;
                        }
                    });
                }
            }else{
                this.showJump = true;
                this.err = 'Please synthesize the pictures first';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        },
        // 点击分类
        classifyClick(str){
            this.str = str;
            if(str=='all'){
                this.showAll = true;
                this.classifyList.map(function(item){
                    item.show = false;
                });
                this.id = '';
            }else{
                this.showAll = false;
                this.classifyList.map(function(item){
                    item.show = false;
                });
                this.classifyList[str].show = true;
                this.id = this.classifyList[str].id;
            }
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',8);
            formData.append('page',this.cnt);
            if(str!='all'){
                formData.append('flowerTyoe',this.classifyList[str].id);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUpload/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    let result = res.data.result.list;
                    this.pageNumber = res.data.result.pages;
                    this.list = result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
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
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 设计花型列表
        getDesign(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',8);
            formData.append('page',this.cnt);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    let result = res.data.result.list;
                    this.pageNumber = res.data.result.pages;
                    this.list = result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
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
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 商城花型列表
        getShop(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',8);
            formData.append('page',this.cnt);
            formData.append('whetherPayment',1);
            let obj = {
                url: this.all.baseUrl + '/app3dStoreIndentMainJyg/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    let result = res.data.result.list;
                    this.pageNumber = res.data.result.pages;
                    this.list = result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
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
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
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
        // 返回
        back(){
            let newJson = {};
            if(this.showLeft){
                let leftIndex=0,
                    classifyIndex=0;
                if(this.json.leftIndex){
                    leftIndex = this.json.leftIndex;
                }
                if(this.json.classifyIndex){
                    classifyIndex = this.json.classifyIndex;
                }
                newJson = {
                    type: this.json.type,
                    classifyIndex: classifyIndex,
                    leftIndex: leftIndex,
                    cnt: this.json.cnt
                }
                localStorage.setItem('threedNewjson',JSON.stringify(newJson));
                this.$router.push({
                    path: '/Enthreed'
                });
            }else{
                let classifyIndex = 0;
                if(this.json.classifyIndex){
                    classifyIndex = this.json.classifyIndex;
                }
                this.json.proList[this.backIndex].backgroudImage = this.picture;
                newJson = {
                    picture: this.picture,
                    backImg: this.backImg,
                    index: this.backIndex,
                    id: this.json.id,
                    proList: this.json.proList,
                    type: 3,
                    cnt: this.json.cnt,
                    classifyIndex: classifyIndex
                }
                localStorage.setItem('threedNewjson',JSON.stringify(newJson));
                this.$router.push({
                    path: '/Enthreed'
                });
            }
        },
        // 创建分类
        addClassify(){
            this.showEdit = true;
            Scroll.stop();
        },
        // 获取面料
        getFabric(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            // formData.append('pageSize',8);
            // formData.append('page',this.cnt);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUploadType/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    let result = res.data.result;
                    this.classifyList = result;
                    this.classifyList.map(function(item){
                        item.show = false;
                    });
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
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
        // 上传面料
        add(e){
            let self = this;
            let files = e.target.files[0];
            this.url = files;
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            let reader = new FileReader();
            reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
            reader.onloadend = function(){
                // 增加一个
                self.showLoading = true;
                let formData = new FormData();
                formData.append('file',self.url);
                let obj = {
                    url: self.all.baseUrl + '/file/upload',
                    formdata: formData
                }
                self.getData(obj).then(res=>{
                    self.upFabric(res.data.result);
                });
            }
        },
        upFabric(str){
            let formData = new FormData();
            let self = this;
            formData.append('preview',str);
            if(this.id){
                formData.append('flowerTyoe',this.id);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUpload/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                self.showLoading = false;
                if(res.data.status == 0){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'New Success';
                    this.cnt = 1;
                    this.classifyClick(this.str);
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
        // 点击确定
        sureEdit(){
            let self = this;
            // 新增一个
            let formData = new FormData();
            formData.append('typeName',this.addTitle);
            let obj ={
                url: this.all.baseUrl + '/app3dFlowerMyUploadType/save',
                formdata: formData
            }
            if(this.addTitle){
                this.getData(obj).then(res=>{
                    if(res.data.status==0){
                        this.showJump = true;
                        this.err = 'Successful new construction';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                            self.showEdit = false;
                            self.getFabric();
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
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            Scroll.move();
                            self.err = '';
                        },1000);
                    }
                }); 
            }else{
                this.showJump = true;
                this.err = 'The title should not be blank';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 上一页
        prev(){
            let self = this;
            if(this.cnt>1){
                this.cnt--;
                if(this.navIndex==0){ 
                    this.classifyClick(this.str);
                }else if(this.navIndex==1){
                    this.getDesign();
                }else if(this.navIndex==2){
                    this.getShop();
                }
            }else{
                this.showJump = true;
                this.err = "It's the first page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.cnt<this.pageNumber){
                this.cnt++;
                if(this.navIndex==0){ 
                    this.classifyClick(this.str);
                }else if(this.navIndex==1){
                    this.getDesign();
                }else if(this.navIndex==2){
                    this.getShop();
                }
            }else{
                this.showJump = true;
                this.err = "It's the last page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 关闭编辑弹窗
        closeEdit(){
            this.showEdit = false;
            Scroll.move();
        },
        changeMessage(index){
            this.navIndex = index;
            this.cnt = 1;
            this.list = [];
            this.pageNumber = "";
            this.select.map(function(item){
                item.show = false;
            });
            this.select[index].show = true;
            if(index==0){
                this.getFabric();
                this.classifyClick('all');
            }else if(index==1){
                this.getDesign();
            }else if(index==2){
                this.getShop();
            }
        },
        getMessage(){
            this.user = JSON.parse(localStorage.getItem('user'));
            // 企业会员
            let person = Number(this.user.expirationTime);
            let bussiness = Number(this.user.expirationTimePlus);
            let self = this;
            if(date.getTime()>bussiness){
                if(date.getTime()>person){
                    this.showBussiness = false;
                }else{
                    this.showBussiness = true;
                }
            }else{
                this.showBussiness = true;
            }
            this.json = JSON.parse(localStorage.getItem('threedList'));
            this.picture = this.json.picture;
            if(this.json.type==3){
                this.showLeft = false;
                this.backImg = this.json.backImg;
                this.backIndex = this.json.index;
                this.picture = this.json.proList[this.backIndex].backgroudImage;
                this.flag = 1;
            }else{
                this.backImg = this.json.backImg;
                this.backIndex = this.json.index;
            }
        }
    },
    mounted(){
        this.getHeight();
        // 获取面料信息
        this.getFabric();
        this.classifyClick('all');
        this.getMessage();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Encontent'
            });
        }else{
            this.$router.push({
                path: '/Content'
            });
        }
    }
}
</script>
<style scoped>
    .newContent{
        padding-left: 19.1875rem;
    }
    /* 编辑弹窗 */
    .editModel{
        position: fixed;
        top: 0;
        height: 100vh;
        left: 0;
        right: 0;
        z-index: 9998;
        background: rgba(51, 51, 51, 0.6);
    }
    .editBox{
        width: 36.75rem;
        height: 14rem;
        position: fixed;
        z-index: 9999;
        top: calc(50vh - 7rem);
        left: 50%;
        margin-left: -18.725rem;
        background: #fff;
        border-radius: .3125rem;
        text-align: left;
    }
    .closeBox{
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 1.625rem;
        height: 1.625rem;
        z-index: 99999;
    }
    .editBox .close{
        width: 1.625rem;
        height: 1.625rem;
        display: block;
    }
    .editBox h5{
        font-size: 1.5rem;
        color: #333;
        padding: 1.1875rem 1.875rem;
        font-weight: normal;
        position: relative;
    }
    .editBox h5:after{
        content: '';
        width: 36.75rem;
        height: .0625rem;
        background: #b4b4b4;
        bottom: 0;
        left: 0;
        position: absolute;
    }
    .editTitle{
        padding: 1.25rem 0;
        padding-left: 1.875rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.25rem;
        color: #2c2e30;
        position: relative;
    }
    .editTitle:after{
        position: absolute;
        width: 36.75rem;
        height: .0625rem;
        background: #b4b4b4;
        bottom: 0;
        left: 0;
        content: '';
    }
    .editTitle input{
        width: 27.875rem;
        display: block;
        margin-left: .875rem;
        height: 2.5rem;
        box-sizing: border-box;
        padding-left: .625rem;
        outline: none;
    }
    .editBtn{
        padding: 0 1.875rem;
        overflow: hidden;
    }
    .sureBox{
        float: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .sureBox button{
        margin-top: .9375rem;
        display: block;
        margin-left: 1.25rem;
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        border-radius: 1.25rem;
        color: #fff;
        font-size: 1.25rem;
        text-align: center;
        outline: none;
        border: none;
    }
    .sureBox button.cancel{
        background: #fff;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
    }
    .threedcontent{
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
        margin-bottom: .625rem;
        display: flex;
        align-items: center;
        justify-content: center;
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
    .proBox{
        margin-top: 1.875rem;
        margin-left: 2.375rem;
        width: 17.5rem;
        position: relative;
    }
    ul.classifyBox{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        height: 2rem;
        overflow: hidden;
        flex-shrink: 0;
        padding-bottom: .3125rem;
    }
    ul.downClassify{
        height: auto;
        overflow: auto;
    }
    ul.classifyBox li{
        margin-top: .3125rem;
        width: 3.75rem;
        height: 1.75rem;
        line-height: 1.75rem;
        border-radius: .875rem;
        margin-right: 1.25rem;
        color: #8d8d8d;
        text-align: center;
        flex-shrink: 0;
        overflow: hidden;
        cursor: default;
        padding: 0 .3125rem;
        box-sizing: border-box;
        font-size: 1.125rem;
        background: inherit;
        margin-bottom: .625rem;
        border: 1px solid #8d8d8d;
    }
    ul.classifyBox li.downBtn{
        position: absolute;
        width: 1.4375rem;
        border: none;
        top: 0;
        height: 1.75rem;
        right: 0;
        display: flex;
        align-items: center;
        transform: rotate(180deg);
    }
    ul.downClassify li.downBtn{
        transform: rotate(0deg);
    }
    .downBtn img{
        display: block;
        width: 100%;
    }
    ul.classifyBox li.selected{
        background: #133ffc;
        color: #fff;
        border: 1px solid #133ffc;
    }
    ul.classifyBox li.specialLi{
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .specialLi img{
        display: block;
        width: 1rem;
        height: 1rem;
    }
    ul.proList{
        margin-top: 3.5rem;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 6.625rem;
    }
    ul.proList li{
        width: 7.8125rem;
        height: 11.75rem;
        margin-right: .75rem;
        margin-bottom: .75rem;
        background: #fff;
        box-shadow: 2px 2px 2px #d0d0d0;
        border-radius: .5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
    }
    .listSele{
        position: absolute;
        top: 0;
        left: 0;
        width: 7.8125rem;
        height: 11.75rem;
        z-index: 9;
        opacity: 0;
    }
    .listImg{
        position: absolute;
        top: .375rem;
        right: .375rem;
        width: 1.125rem;
        height: 1.125rem;
        z-index: 8;
        border-radius: 50%;
        background: url('../../assets/image/3d/noselect.png') no-repeat center;
        background-size: 100%;
    }
    .listSele:checked + .listImg{
        background: url('../../assets/image/3d/hasselect.png') no-repeat center;
        background-size: 100%;
    }
    ul.proList .specialPro{
        width: 100%;
        background: inherit;
        box-shadow: 0 0 0 #eee;
        text-align: center;
        color: #333;
        display: block;
        height: 25rem;
        margin-top: 2.5rem;
    } 
    ul.proList .specialPro img{
        display: block;
        width: 8rem;
        height: 8rem;
        margin: 0 auto;
        margin-bottom: .625rem;
    }
    ul.proList .specialPro span{
        display: block;
        width: 100%;
        text-align: center;
    }
    ul.pageBox{
        position: fixed;
        z-index: 888;
        width: 17.5rem;
        background: #eee;
        display: flex;
        justify-content: space-around;
        bottom: 0rem;
        left: 12.375rem;
        height: 4rem;
    }
    .prev,.next{
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 2px 2px 2px #d0d0d0;
    }
    .prev img,.next img{
        display: block;
        margin: 0 auto;
        width: .5rem;
        height: 1rem;
        margin-top: .625rem;
    }
    .upFabric{
        margin-top: .25rem;
        width: 6.875rem;
        height: 2rem;
        border-radius: 1.125rem;
        border: 1px solid #585858;
        color: #585858;
        font-size: 1rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 2rem;
        box-sizing: border-box;
        position: relative;
    }
    .file{
        position: absolute;
        width: 6.875rem;
        height: 2rem;
        top: 0;
        left: 0;
        opacity: 0;
    }
    .upFabric img{
        display: block;
        width: 1.1875rem;
        margin-right: .3125rem;
    }
    .backBox{
        margin-top: 1.875rem;
        display: flex;
        align-items: center;
        margin-left: 1.25rem;
        font-size: 1rem;
        color: #585858;
        cursor: default;
    }
    .backBox img{
        display: block;
        width: .625rem;
        margin-right: .5rem
    }
    .inputBox{
        margin-top: 16.25rem;
        margin-left: 5.625rem;
    }
    .inputBox span{
        display: block;
        width: 6.25rem;
    }
    .inputBox label{
        display: block;
        font-size: 1.125rem;
        color: #333;
        margin-bottom: .875rem;
        display: flex;
        align-items: center;
    }
    .inputBox input{
        width: 14rem;
        height: 1.875rem;
        margin-left: 1rem;
        background: #fff;
        border: none;
        outline: none;
        border-radius: .9375rem;
        box-sizing: border-box;
        padding-left: 1.4rem;
    }
    .pointBox{
        margin-top: 3.875rem;
        margin-left: 9.375rem;
    }
    .pointBox span{
        background: #fff url('../../assets/image/3d/top.png') no-repeat center;
        background-size: 1.4375rem .875rem;
        width: 3.375rem;
        border-radius: 50%;
        display: block;
        height: 3.375rem;
        margin-bottom: .875rem;
    }
    .pointBox span:hover{
        background: #133ffc url('../../assets/image/3d/whitetop.png') no-repeat center;
        background-size: 1.4375rem .875rem;
    }
    .pointBox span.top,
    .pointBox span.bottom{
        margin-left: 4.3125rem;
    }
    .pointBox span.left{
        transform: rotate(-90deg);
    }
    .pointBox span.right{
        transform: rotate(90deg);
        margin-left: 5.125rem;
    }
    .pointBox span.bottom{
        transform: rotate(180deg);
    }
    .infeed{
        display: flex;
    }
    .btnBox{
        display: flex;
        margin-top: 4.5625rem;
        margin-left: 5.625rem;
    }
    .btn{
        display: flex;
        cursor: default;
        align-items: center;
        justify-content: center;
        width: 7.75rem;
        height: 2.25rem;
        color: #333;
        font-size: 1.125rem;
        border: 1px solid #333;
        border-radius: 1.125rem;
        margin-right: 1.25rem;
    }
    .pictureBtn{
        width: 11.25rem;
        background: #ffc46c;
        color: #5f3b01;
        border: 1px solid #ffc46c;
    }
    .btn img{
        display: block;
        width: 1rem;
        margin-right: .625rem;
    }
    .imgBox{
        position: relative;
        margin-left: 4.375rem;
        margin-top: 6.875rem;
        background: #fff;
        height: 49.25rem;
        width: 32.6875rem;
        border-radius: .625rem;
        overflow: hidden;
    }
    .imgBox img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .upBox{
        margin-left: 13.5625rem;
        font-size: .75rem;
        color: #8d8d8d;
        margin-top: 13.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .upBox>span{
        margin: .5rem;
        display: block;
    }
    .line{
        width: 4px;
        height: 400px;
        position: relative;
        background: #ff9d4c;
    }
    .line>span{
        position: absolute;
        width: 24px;
        height: 24px;
        top: 188px;
        left: calc(50% - 12px);
        border-radius: 50%;
        background: #ff9d4c;
    }
    .line>span:after{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        top: 2px;
        left: 2px;
    }
    .line>span:hover .case{
        display: block;
    }
    .case{
        position: absolute;
        width: 4rem;
        top: 0;
        right: -5rem;
        display: none;
        background: #fff;
        height: 1.5rem;
        border-radius: .75rem;
        color: #333;
        font-size: .75rem;
        text-align: center;
        line-height: 1.5rem;
    }
    .case:after{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: .3rem;
        left: -.2rem;
        border-width: 0 .625rem .625rem;
        border-style: solid;
        transform: rotate(-45deg);
        border-color: transparent transparent transparent #fff;
    }
    .bigModel{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100%;
        overflow-y: scroll;
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
</style>