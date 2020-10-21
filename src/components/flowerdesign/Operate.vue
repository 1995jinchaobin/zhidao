<template>
    <div class="operate">
        <!-- 花型设计操作 -->
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
            <div class="operateBox" :style="{height: height}">
                <ul class="bBox">
                    <li>
                        <img @click="backStep" src="../../assets/image/flower/back.png" alt="">
                        <span class="bOperate">退一步</span>
                    </li>
                    <li>
                        <img @click="levelClick" src="../../assets/image/flower/top.png" alt="">
                        <span class="bOperate">水平翻转</span>
                    </li>
                    <li>
                        <img @click="verticalClick" src="../../assets/image/flower/left.png" alt="">
                        <span class="bOperate">垂直翻转</span>
                    </li>
                    <li>
                        <img @click="smallClick" src="../../assets/image/flower/small.png" alt="">
                        <span class="bOperate">缩放</span>
                        <div :style="{display: showSmall}" class="bScroll">
                            <div class="bigScroll">
                                <div :style="{width: smallLeft}" class="white"></div>
                                <input @keyup="inputScale" v-model="zoom" type="text">
                                <span :style="{left: smallLeft}" @mousedown="pull" @mouseup="push"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img @click="rotateClick" src="../../assets/image/flower/rotate.png" alt="">
                        <span class="bOperate">旋转</span>
                        <input v-model="rotateDeg" @keyup="trueRotate" type="text" :style="{display: showRotate}" class="bInput" placeholder="输入旋转角度">
                    </li>
                    <li>
                        <img @click="copy" src="../../assets/image/flower/copy.png" alt="">
                        <span class="bOperate">拷贝</span>
                    </li>
                    <li>
                        <img @click="deleteCeng" src="../../assets/image/flower/cendel.png" alt="">
                        <span class="bOperate">删除</span>
                    </li>
                </ul>
                <div class="oBox">
                    <h4>画布尺寸<span>40*60CM 300DPI</span></h4>
                    <div class="backBox">
                        <div>
                            <span>背景色</span>
                            <img :src="backImg" alt="">
                        </div>
                        <img @click="delBack" src="../../assets/image/flower/cendel.png" alt="">
                    </div>
                    <ul class="levelBox">
                        <li>
                            <div @click="seeAll" class="eyeBox">
                                <img v-if="showAll" class="eye" src="../../assets/image/flower/show.png" alt="">
                                <img v-else class="eye" src="../../assets/image/flower/hidden.png" alt="">
                            </div>
                            <div @click="downList" class="rightBox">
                                <div class="proBox">
                                    <img :style="{transform: showDown?'':'rotate(180deg)'}" class="downNav" src="../../assets/image/flower/down.png" alt="">
                                    <span>主花组</span>
                                </div>
                                <img @click="deleteAll" class="delImg" src="../../assets/image/flower/cendel.png" alt="">
                            </div>
                        </li>
                        <li v-if="showDown" @click="listClick(index)" :style="{background: item.show?'#84c2e6':''}" v-for="(item,index) in rightList" :key="index">
                            <div @click="eyeClick(index,$event)" class="eyeBox">
                                <img v-if="item.showEye" class="eye" src="../../assets/image/flower/show.png" alt="">
                                <img v-else class="eye" src="../../assets/image/flower/hidden.png" alt="">
                            </div>
                            <div class="rightBox">
                                <div class="proBox">
                                    <img width="100%" class="proImg" :src="item.picture" alt="">
                                </div>
                                <div class="imgBox">
                                    <img @click="copyOne(index,$event)" class="delImg" src="../../assets/image/flower/copy.png" alt="">
                                    <img @click="deleteOne(index,$event)" class="delImg" src="../../assets/image/flower/cendel.png" alt="">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
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
            <div class="picBox" style="height: 600px;width: 1000px" v-if="showPic&&picType==1">
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
    name: 'Operate',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Flowerdesign',
            tabIndex: 3,
            showJump: false,
            err: '',
            height: '',
            bigHeight: '',
            backImg: require('../../assets/image/flower/backcolor.png'),
            showLoading: false,
            // 左侧按钮内容
            leftNav: [{name: '添加素材',show: false},{name: '花型构图',show: false},{name: '添加底纹',show: false},{name: 'AI配色',show: false}],
            navIndex: 0,
            list: [],
            rightList: [],
            // 判断是否点击
            isClick: false,
            // 选择
            showSmall: 'none',
            showRotate: 'none',
            // 旋转角度
            rotateDeg: '',
            count: 0,
            showDown: true,
            showAll: true,
            // 缩放
            zoom: '100%',
            smallLeft: '95px',
            // 用来记录操作
            operateList: [],
            backImage: require('../../assets/image/flower/can.png'),
            backId: '',
            // 连晒
            showLook: false,
            showGrab: false,
            showPic: false,
            picType: 0,
            picName: '',
            showBig: false
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
        // 左侧切换 该页面不能点击
        changeMessage(index){
            this.list.map(function(item){
                item.show = false;
            });
            this.leftNav.map(function(item){
                item.show = false;
            });
            this.leftNav[index].show = true;
            this.navIndex = index;
            if(index==0){
                this.$router.push({
                    path: '/Flowerdesign'
                });
            }else if(index==1){
                this.$router.push({
                    path: '/Patterns',
                    query: {
                        message: this.rightList,
                        backImage: this.backImage,
                        backId: this.backId,
                        specialType: this.$route.query.specialType
                    }
                });
            }else if(index==2){
                this.$router.push({
                    path: '/Shading',
                    query: {
                        message: this.rightList,
                        backImage: this.backImage,
                        backId: this.backId,
                        specialType: this.$route.query.specialType
                    }
                });
            }else if(index==3){
                this.$router.push({
                    path: '/Colour',
                    query: {
                        message: this.rightList,
                        backImage: this.backImage,
                        backId: this.backId,
                        specialType: this.$route.query.specialType
                    }
                });
            }
        },
        // 退一步操作
        backStep(){
            let self =this;
            if(this.operateList.length==0){
                this.showJump = true;
                this.err = '已经是第一步操作了！';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }else{
                this.rightList=[];
                this.list=[];
                this.rightList=this.operateList[this.operateList.length-1];
                this.operateList.splice(this.operateList.length-1,1);
                for(let i=0;i<this.rightList.length;i++){
                    this.list.push(this.rightList[i]);
                }
                this.$forceUpdate();
                this.judge();
            }
        },
        // 删除底纹
        delBack(){  
            this.undo();
            this.backImg = require('../../assets/image/flower/backcolor.png');
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.$forceUpdate();
        },
        // 图片点击
        proClick(index){
            this.isClick = true;
            let self = this;
            this.list.map(function(item,i){
                if(item.order==self.list[index].order){
                    self.list[i].show = true;
                }else{
                    item.show = false;
                }
            });
            this.$forceUpdate();
        },
        // 列表点击
        listClick(index){
            let self = this;
            self.isClick=false;
            this.list.map(function(item){
                if(item.order==self.rightList[index].order){
                    item.show = !item.show;
                }
                if(item.show){
                    self.isClick = true;
                }
            });
            this.$forceUpdate();
        },
        // 主花组眼睛点击
        seeAll(){
            let self = this;
            this.undo();
            this.showAll = !this.showAll;
            this.list.map(function(item){
                item.showEye = self.showAll;
            });
            this.$forceUpdate();
        },
        // 眼睛点击
        eyeClick(index,event){
            let self = this;
            // 阻止事件冒泡
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
            this.undo();
            self.list.map(function(item){
                if(item.order==self.list[index].order){
                    item.showEye = !item.showEye; 
                }
            });
            self.$forceUpdate();
        },
        // 水平翻转
        levelClick(){
            let self = this;
            self.count++;
            if(this.isClick){
                this.undo();
                this.list.map(function(item,index){
                    if(item.show){
                        item.rotateY+=180;
                        self.$forceUpdate();
                    }
                });
                self.judge();
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        verticalClick(){
            let self = this;
            self.count++;
            if(this.isClick){
                this.undo();
                this.list.map(function(item,index){
                    if(item.show){
                        item.rotateX+=180;
                        self.$forceUpdate();
                    }
                });
                self.judge();
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 垂直翻转
        // 拷贝
        copy(){
            let self = this;
            let newTop,newLeft;
            if(this.isClick){
                this.undo();
                this.rightList.map(function(item,index){
                    if(item.show){
                        newTop = parseFloat(item.top) + 50 + 'px';
                        newLeft = parseFloat(item.left) + 50 + 'px';
                        let newitem;
                        newitem={
                            width: item.width,
                            height: item.height,
                            top: newTop,
                            left: newLeft,
                            picture: item.picture,
                            showEye: true,
                            show: false,
                            id: item.id,
                            posX: parseFloat(newLeft)+item.width*600/4724/2,
                            posY: parseFloat(newTop)+item.height*900/7087/2,
                            zoom: item.zoom,
                            isCreate: [false,false,false,false,false,false,false,false],
                            elements: ['','','','','','','',''],
                            order: self.list.length+1,
                            rotateX: item.rotateX,
                            rotateY: item.rotateY,
                            rotateZ: item.rotateZ
                        }
                        self.list.push(newitem);
                        self.rightList.push(newitem);
                        self.judge(1);
                        self.$forceUpdate();
                    }
                });
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 右侧拷贝一个
        copyOne(index,event){
            // 阻止事件冒泡
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
            let self = this;
            this.undo();
            let newTop,newLeft;
            newTop = parseFloat(this.rightList[index].top) + 50 + 'px';
            newLeft = parseFloat(this.rightList[index].left) + 50 + 'px';
            let obj = {
                width: this.rightList[index].width,
                height: this.rightList[index].height,
                top: newTop,
                left: newLeft,
                picture: this.rightList[index].picture,
                showEye: true,
                id: this.rightList[index].id,
                show: false,
                posX: parseFloat(newLeft)+this.rightList[index].width*600/4724/2,
                posY: parseFloat(newTop)+this.rightList[index].height*900/7087/2,
                zoom: this.rightList[index].zoom,
                isCreate: [false,false,false,false,false,false,false,false],
                elements: ['','','','','','','',''],
                order: self.list.length+1,
                rotateX: this.rightList[index].rotateX,
                rotateY: this.rightList[index].rotateY,
                rotateZ: this.rightList[index].rotateZ
            }
            self.list.push(obj);
            self.judge(1);
            self.rightList.push(obj);
            self.$forceUpdate();
        },
        // 删除
        deleteCeng(){
            let self = this;
            let newList = [];
            let rightNew = [];
            if(this.isClick){
                this.undo();
                this.list.map(function(item,index){
                    if(item.show){
                        
                    }else{
                        newList.push(item);
                    }
                });
                this.rightList.map(function(item,index){
                    if(item.show){
                        
                    }else{
                        rightNew.push(item);
                    }
                });
                self.list = newList;
                self.rightList = rightNew;
                self.isClick = false;
                self.$forceUpdate();
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        deleteOne(index,event){
            // 阻止事件冒泡
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
            this.undo();
            let order = this.rightList[index].order;
            let self = this;
            let newList = [];
            this.rightList.splice(index,1);
            this.list.map(function(item,i){
                if(order==item.order){
                    
                }else{
                    newList.push(item);
                }
            });
            this.list = newList;
            this.isClick = false;
            this.$forceUpdate();
        },
        // 删除所有
        deleteAll(event){
            // 阻止事件冒泡
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
            this.undo();
            this.list = [];
            this.rightList = [];
            this.$forceUpdate();
        },
        downList(){
            this.showDown = !this.showDown;
            this.$forceUpdate();
        },
        // 缩放点击
        smallClick(){
            let self = this;
            if(this.isClick){
                if(this.showSmall=='none'){
                    this.showSmall = 'block';
                }else{
                    this.showSmall = 'none';
                }
                this.$forceUpdate();
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        inputScale(){
            let newZoom = parseFloat(this.zoom);
            let self = this;
            if(newZoom==''){
                newZoom = 0;
            }else if(newZoom<=0){
                this.smallLeft = 0;
            }else if(newZoom>=200){
                this.smallLeft = '190px';
            }else{
                this.smallLeft = newZoom/200*190+'px';
            }
            this.undo();
            this.list.map(function(item){
                if(item.show){
                    item.zoom = newZoom/100;
                }
            });
            self.judge();
        },
        pull(event){
            var prevent;
            var self = this;
            var event=event || window.event;
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
            this.undo();
            document.onmousemove = function(ev){
                var event=ev || window.event;
                var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
                if(event.clientX<0||event.clientX<0||event.clientX>width){
                    return false;
                };
                var endx = event.clientX-roundX;
                var endy = event.clientY-roundY;
                if(endy<-15||endy>15){
                    self.push();
                }
                if(endx<0||endx>190){
                    self.push();
                }else{
                    self.smallLeft = endx + 'px';
                    _target.style.left = endx + 'px';
                    self.zoom = ((endx/190)*200).toFixed(2)+'%';
                    self.list.map(function(item){
                        if(item.show){
                            item.zoom = (endx/190)*2;
                        }
                    });
                    self.judge();
                }
            }
        },
        push(){
            document.onmousemove = null;
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
            this.undo();
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
                        if(item.order== self.list[index].order){
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
            // setTimeout(function(){
            //     self.list.map(function(item){
            //         item.show = false;
            //     });
            // },1000);
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
        // 旋转点击
        rotateClick(){
            let self = this;
            if(this.isClick){
                if(this.showRotate=='none'){
                    this.showRotate = 'block';
                }else{
                    this.showRotate = 'none';
                }
            }else{
                this.showJump = true;
                this.err = "请先选择图层";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        trueRotate(){
            let self = this;
            let rotate;
            if(this.isClick){
                this.undo();
                this.list.map(function(item,index){
                    if(item.show){
                        if(self.rotateDeg==''){
                            rotate  = 0;
                        }else{
                            rotate = self.rotateDeg;
                        }
                        if(self.count%2){
                            item.rotateZ = -rotate;
                        }else{
                            item.rotateZ = rotate;
                        }
                        self.$forceUpdate();
                    }
                });
            }
            self.judge();
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
            this.rightList = [];
            this.operateList = [];
            this.backImg = require('../../assets/image/flower/can.png');
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.$forceUpdate();
        },
        //保存退一步数据
        undo(){
            let tempList=[];
            for(let i=0;i<this.rightList.length;i++){
                tempList.push({
                    width: this.rightList[i].width,
                    height:this.rightList[i].height,
                    top: this.rightList[i].top,
                    left: this.rightList[i].left,
                    picture:  this.rightList[i].picture,
                    showEye:  this.rightList[i].showEye,
                    show:  this.rightList[i].show,
                    posX: this.rightList[i].posX,
                    posY:  this.rightList[i].posY,
                    zoom:  this.rightList[i].zoom,
                    isCreate:  this.rightList[i].isCreate,
                    elements: this.rightList[i].elements,
                    order:  this.rightList[i].order,
                    rotateX:  this.rightList[i].rotateX,
                    rotateY:  this.rightList[i].rotateY,
                    rotateZ:  this.rightList[i].rotateZ
                });
            }
            this.operateList.push(tempList);
        },
        // 获取参数并设置初始位置
        getParameter(){
            let self = this;
            this.list = this.$route.query.message;
            this.list.map(function(item){
               item.show = false;
               item.showEye = true; 
               self.rightList.push(item);
            });
            if(this.list.length){
                this.list.map(function(item,index){
                    item.cnt = index;
                    item.show = false;
                    item.showEye = true;
                    item.isCreate = [];
                    item.order=index;
                    for(let i=0;i<8;i++){
                        item.isCreate[i] =false;
                    }
                    item.elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    if(item.pictureThumbnail){
                        item.picture = item.pictureThumbnail;
                    }
                    if(item.top||item.left){
                        item.posX = parseFloat(item.left) + item.width*600/4724/2;
                        item.posY = parseFloat(item.top) + item.height*900/7087/2;
                    }else{
                        item.rotateX = 0;
                        item.rotateY = 0;
                        item.rotateZ = 0;
                        item.zoom = 1;
                        switch(index%6){
                            case 0:
                                item.left = '250px';
                                item.top = '400px';
                                break;
                            case 1:
                                item.left = '50px';
                                item.top = '2px';
                                break;
                            case 2:
                                item.left = '300px';
                                item.top = '100px';
                                break;
                            case 3:
                                item.left = '200px';
                                item.top = '600px';
                                break;
                            case 4:
                                item.left = '50px';
                                item.top = '550px';
                                break;
                            case 5:
                                item.left = '500px';
                                item.top = '300px';
                                break;
                        }
                        item.height = 900*item.height/item.width;
                        item.width = 900;
                        item.posX = parseFloat(item.left) + item.width*600/4724/2;
                        item.posY = parseFloat(item.top) + item.height*900/7087/2;
                    }
                    self.judge(1);
                });
            }
        }
    },
    mounted(){
        let self = this;
        this.rightList=[];
        this.list=[];
        if(this.$route.query.type==1){
            this.getParameter();
            this.backId = '';
        }else if(this.$route.query.type==2){
            this.rightList = [];
            this.list = this.$route.query.message;
            this.list.map(function(item){
                item.show = false;
                item.isCreate=[false,false,false,false,false,false,false,false];
                item.elements=['','','','','','','',''];
                self.rightList.push(item);
            });
            this.backImage = this.$route.query.backImage;
            this.backImg = this.$route.query.backImage;
            this.backId = this.$route.query.backId;
            this.judge(1);
        }else if(this.$route.query.type==3){
            this.rightList = [];
            this.list = this.$route.query.message;
            this.list.map(function(item){
                item.show = false;
                item.isCreate=[false,false,false,false,false,false,false,false];
                item.elements=['','','','','','','',''];
                self.rightList.push(item);
            });
            this.backImage = this.$route.query.backImage;
            this.backImg = this.$route.query.backImage;
            this.backId = this.$route.query.backId;
            this.judge(1);
        }else if(this.$route.query.type==4){
            this.rightList = [];
            this.list = this.$route.query.message;
            this.list.map(function(item){
                item.show = false;
                item.isCreate=[false,false,false,false,false,false,false,false];
                item.elements=['','','','','','','',''];
                self.rightList.push(item);
            });
            this.backImage = this.$route.query.backImage;
            this.backImg = this.$route.query.backImage;
            this.backId = this.$route.query.backId;
            this.judge(1);
        }
        this.$forceUpdate();
        this.getHeight();
        // localStorage.setItem('path',this.path);
    }
}
</script>
<style scoped>
    .operate{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: space-between;
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
        height: 920px;
        position: relative;
        flex-shrink: 0;
    }
    .ruleImg{
        width: 100%;
        height: 100%;
        display: block;
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
        width: 100%;
        height: 100%;
        display: block;
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
    .operateBox{
        width: 21.25rem;
        background: #fff;
        padding-top: 3.0625rem;
        display: flex;
        justify-content: start;
    }
    ul.bBox{
        width: 2.5rem;
    }
    ul.bBox li{
        height: 2.5rem;
        margin-bottom: 1.25rem;
        display: flex;
        position: relative;
        align-items: center;
    }
    .bOperate{
        position: absolute;
        color: #8d8d8d;
        z-index: 8;
        font-size: .875rem;
        width: 7.5rem;
        height: 2.5rem;
        top: 0;
        line-height: 2.5rem;
        left: -7.5rem;
        background: #fff;
        display: none;
        border-radius: 1.25rem 0 0 1.25rem;
    }
    .bInput{
        position: absolute;
        color: #8d8d8d;
        z-index: 9;
        font-size: .875rem;
        width: 7.5rem;
        height: 2.5rem;
        top: 0;
        outline: none;
        line-height: 2.5rem;
        left: -7.5rem;
        background: #fff;
        border: none;
        text-align: center;
        display: none;
        border-radius: 1.25rem 0 0 1.25rem;
    }
    .bScroll{
        position: absolute;
        left: -210px;
        z-index: 9;
        border-radius: .3125rem;
        width: 210px;
        top: 0;
        background: #eee;
        height: 40px;
    }
    .bScroll .bigScroll{
        width: 100%;
        position: absolute;
        top: 15px;
        background: #dcdcdc;
        height: 10px;
        border-radius: 5px 0 0 5px; 
    }
    .white{
        background: #fff;
        height: 10px;
        border-radius: 5px 0 0 5px; 
        position: absolute;
        left: 0;
        top: 0;
    }
    .bigScroll input{
        position: absolute;
        z-index: 11;
        outline: none;
        width: 80px;
        height: 25px;
        line-height: 25px;
        padding-left: 5px;
        text-align: center;
        border: 1px solid #d6d6d6;
        bottom: -35px;
    }
    .bigScroll span{
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: 10;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
        border-radius: 50%;
        background: #fff;
    }
    ul.bBox li img:hover +.bOperate{
        display: block;
    }
    ul.bBox img{
        display: block;
        margin: 0 auto;
    }
    .oBox{
        width: 16.25rem;
        padding-bottom: 2.5rem;
        box-sizing: border-box;
        border-left: 1px solid #d0d0d0;
    }
    .oBox h4{
        font-weight: normal;
        color: #fff;
        background: #2c2e30;
        box-sizing: border-box;
        padding: 0 .625rem;
        font-size: .875rem;
        height: 2.5rem;
        line-height: 2.5rem;
        display: flex;
        justify-content: space-between;
    }
    .backBox{
        padding: 0 .625rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.625rem;
        line-height: 2.625rem;
        border-bottom: 1px solid #d0d0d0;
    }
    .backBox div{
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .backBox div img{
        width: 2.5rem;
        height: 1.5rem;
    }
    .backBox span{
        margin-right: 1.25rem;
    }
    .backBox>img{
        width: 1.125rem;
    }
    ul.levelBox li{
        display: flex;
        color: #2c2e30;
        font-size: .875rem;
        justify-content: start;  
        height: 2.625rem;
        align-items: center; 
        border-bottom: 1px solid #d0d0d0;
    }
    .eyeBox{
        width: 2.625rem;
        height: 2.625rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-right: 1px solid #d0d0d0;
    }
    .eye{
        display: block;
        margin: 0 auto;
        width: 1.1875rem;
    }
    .rightBox{
        width: 13.625rem;
        box-sizing: border-box;
        padding: 0 .625rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .delImg{
        width: 1.125rem;
        display: block;
        margin-left: 1.5625rem;
    }
    .proBox{
        display: flex;
        justify-content: start;
        align-items: center;
        cursor: default;
    }
    .downNav{
        display: block;
        margin-right: .625rem;
        width: .75rem;
    }
    .imgBox{
        display: flex;
        justify-content: end;
        align-items: center;
    }
    .proImg{
        width: 2rem;
        height: 2rem;
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