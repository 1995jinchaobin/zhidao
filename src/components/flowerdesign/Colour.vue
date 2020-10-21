<template>
    <div class="colour">
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
                <ul class="buttonBox">
                    <li @click="buttonClick(index)" :class="item.show?'btnList':''" v-for="(item,index) in btnList" :key="index">{{item.name}}</li>
                </ul>
                <h4>新颜色</h4>
                <div class="inputBox">
                    <span :style="{background: '#'+message.color}" class="colorBack"></span>
                    <div class="rightInput">
                        <div class="rightBox">
                            <label for="">
                                <span>C:</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[0]" type="text">
                            </label>
                            <label for="">
                                <span>M:</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[1]" type="text">
                            </label>
                            <label for="">
                                <span>Y:</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[2]" type="text">
                            </label>
                            <label for="">
                                <span>K:</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[3]" type="text">
                            </label>
                        </div>
                        <div class="rightBox">
                            <label for="">
                                <span>H:</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[0]" type="text">
                            </label>
                            <label for="">
                                <span>S:</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[1]" type="text">
                            </label>
                            <label for="">
                                <span>V:</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[2]" type="text">
                            </label>
                        </div>
                        <div class="rightBox">
                            <label for="">
                                <span>R:</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[0]" type="text">
                            </label>
                            <label for="">
                                <span>G:</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[1]" type="text">
                            </label>
                            <label for="">
                                <span>B:</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[2]" type="text">
                            </label>
                        </div>
                        <div class="rightBox signBox">
                            <label for="">
                                <span>#:</span>
                                <input  @blur="colortoRgb" v-on:keyup.enter="colortoRgb" v-model="message.color" type="text">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="pullBox">
                    <div class="lineBox">
                        <img src="../../assets/image/flower/color1.png" alt="">
                        <div class="line">
                            <span :style="{left: (message.hue*463)+'px'}" @mousedown="pull($event,1)" @mouseup="push"></span>
                        </div>
                        <span>色相</span>
                    </div>
                    <div class="lineBox">
                        <img src="../../assets/image/flower/color2.png" alt="">
                        <div class="line">
                            <span :style="{left: (message.saturation*463)+'px'}" @mousedown="pull($event,2)" @mouseup="push"></span>
                        </div>
                        <span>饱和度</span>
                    </div>
                    <div class="lineBox">
                        <img src="../../assets/image/flower/color3.png" alt="">
                        <div class="line">
                            <span :style="{left: (message.lightness*463)+'px'}" @mousedown="pull($event,3)" @mouseup="push"></span>
                        </div>
                        <span>明度</span>
                    </div>
                    <div class="specialLine">
                        <span>原来颜色</span>
                        <div class="line">
                            <div :style="{width: whiteWidth}"></div>
                            <span @mousedown="thresholdPull($event)" @mouseup="thresholdPush"></span>
                        </div>
                        <span>阈值：{{message.threshold}}</span>
                    </div>
                </div>
                <ul v-if="colorList.length" class="colorList">
                    <li @click="changeColor(index)" v-for="(item,index) in colorList" :key="index" :class="item.show?'special':''" :style="{background: 'rgba('+item.r+','+item.g+','+item.b+','+item.alpha}"></li>
                </ul>
                <button @click="exchange" class="exchange">替换</button>
                <div class="btnBox">
                    <button @click="cancelClick">取消</button>
                    <button @click="sureClick">确定</button>
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
                            <img :style="{transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :width="item.width*600/4724/2+'px'" :height="item.height*900/7087/2+'px'" :src="item.picture" alt="">
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
    name: 'Colour',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            showBig: false,
            tabIndex: 3,
            showJump: false,
            err: '',
            height: '',
            showLoading: false,
            leftNav: [{name: '添加素材',show: false},{name: '花型构图',show: false},{name: '添加底纹',show: false},{name: 'AI配色',show: true}],
            navIndex: 0,
            list: [],
            rightList: [],
            // 商品数据
            colorList: [],
            backImage: require('../../assets/image/flower/can.png'),
            backId: '',
            // 信息存储
            message: {
                cmyk: [0,100,100,0],
                hsv: [0,1,255],
                rgb: [255,0,0],
                color: 'ff0000',
                hue: 0,
                saturation: 1,
                lightness: 1,
                threshold: 50
            },  
            whiteWidth: '20px',
            prevent: [],
            // 连晒
            showLook: false,
            showGrab: false,
            showPic: false,
            picType: 0,
            picName: '',
            btnList: [{name: '元素',show: true},{name: '底纹',show: false}],
            btnIndex: 0,
            path: '/Flowerdesign'
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
        buttonClick(index){
            this.btnList.map(function(item){
                item.show = false;
            });
            this.btnList[index].show = true;
            this.btnIndex = index;
            this.getList();
            this.$forceUpdate();
        },
        // 获取上个页面传递的信息以及列表信息
        getMessage(){
            this.rightList = [];
            this.list = [];
            let self = this;
            this.list = this.$route.query.message;
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
        thresholdPull(event){
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
            document.onmousemove = function(ev){
                var event=ev || window.event;
                var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
                if(event.clientX<0||event.clientX<0||event.clientX>width){
                    return false;
                };
                var endx = event.clientX-roundX;
                var endy = event.clientY-roundY;
                if(endy<-10||endy>10){
                    self.getList();
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                if(endx<0||endx>375){
                    if(endx<0){
                        prevent = 0.008;
                    }else{
                        prevent = 0.1;
                    }
                    self.thresholdPush();
                }else{
                    prevent = endx/375;
                    // self.pullLeft = endx + 'px';
                    self.whiteWidth = endx + 'px';
                    _target.style.left = endx + 'px';
                    if(endx<20){
                        prevent = 0.008;
                    }else{
                        prevent = (endx/375/10);
                    }
                }
                // prevent.toFixed(3)
                self.message.threshold = ((prevent)*5000).toFixed(1);
                self.$forceUpdate();
            }
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                let self = this;
                self.getList();
            };
        },
        thresholdPush(){
            let self = this;
            self.getList();
            document.onmousemove = null;
        },
        // 色相饱和度明度滚动条
        pull(event,type){
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
            document.onmousemove = function(ev){
                var event=ev || window.event;
                var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
                if(event.clientX<0||event.clientX<0||event.clientX>width){
                    return false;
                };
                var endx = event.clientX-roundX;
                var endy = event.clientY-roundY;
                if(endy<-10||endy>10){
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                if(endx<0||endx>463){
                    if(endx<0){
                        prevent = 0;
                    }else{
                        prevent = 1;
                    }
                    self.push();
                }else{
                    prevent = endx/463;
                    _target.style.left = endx + 'px';
                }
                if(type==1){
                    self.message.hue = prevent;
                    self.message.hsv[0] = parseInt(self.message.hue*360);
                }else if(type==2){
                    self.message.saturation = prevent;
                    self.message.hsv[1] = (self.message.saturation).toFixed(2);
                }else if(type==3){
                    self.message.lightness = prevent;
                    self.message.hsv[2] = parseInt(self.message.lightness*255);
                }
                self.hsvtoRgb(prevent);
                self.$forceUpdate();
            }
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        push(){
            document.onmousemove = null;
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            let arr = [];
            if(!this.rightList.length&&this.btnIndex==0){
                this.showLoading = false;
                this.showJump = true;
                this.err = '没有选择素材';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
                return;
            }
            this.rightList.map(function(item){
                arr.push(item.picture);
            });
            let str = arr.join(',');
            if(this.btnIndex==0){
                formData.append('images',str);
            }else if(this.btnIndex==1){
                if(this.backId==''){
                    this.showLoading = false;
                    this.colorList = [];
                    this.$forceUpdate();
                    this.showJump = true;
                    this.err = '请先添加底纹';
                    this.showLoading = false;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                    return;
                }else{
                    formData.append('images',this.backImage);
                }
            }
            formData.append('threshhold',this.message.threshold);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/color/getColors'
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    this.colorList = res.data.result.colors;
                    this.colorList.map(function(item){
                        item.show = false;
                    });
                    this.colorList[0].show = true;
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
        changeColor(index){
            this.colorList.map(function(item){
                item.show = false;
            });
            this.colorList[index].show = true;
            this.$forceUpdate();
        },
        rgbKey(){
            if(this.message.rgb[0]==''||this.message.rgb[0]<0){
                this.message.rgb[0] = 0;
            }
            if(this.message.rgb[0]>255){
                this.message.rgb[0] = 255;
            }
            if(this.message.rgb[1]==''||this.message.rgb[1]<0){
                this.message.rgb[1] = 0;
            }
            if(this.message.rgb[1]>255){
                this.message.rgb[1] = 255;
            }
            if(this.message.rgb[2]==''||this.message.rgb[2]<0){
                this.message.rgb[2] = 0;
            }
            if(this.message.rgb[2]>255){
                this.message.rgb[2] = 255;
            }
            if(this.message.cmyk[0]==''||this.message.cmyk[0]<0){
                this.message.cmyk[0] = 0;
            }
            if(this.message.cmyk[0]>100){
                this.message.cmyk[0] = 100;
            }
            if(this.message.cmyk[1]==''||this.message.cmyk[1]<0){
                this.message.cmyk[1] = 0;
            }
            if(this.message.cmyk[1]>100){
                this.message.cmyk[1] = 100;
            }
            if(this.message.cmyk[2]==''||this.message.cmyk[2]<0){
                this.message.cmyk[2] = 0;
            }
            if(this.message.cmyk[2]>100){
                this.message.cmyk[2] = 100;
            }
            if(this.message.cmyk[3]==''||this.message.cmyk[3]<0){
                this.message.cmyk[3] = 0;
            }
            if(this.message.cmyk[3]>1){
                this.message.cmyk[3] = 1;
            }
            if(this.message.hsv[0]==''||this.message.hsv[0]<0){
                this.message.hsv[0] = 0;
            }
            if(this.message.hsv[0]>360){
                this.message.hsv[0] = 360;
            }
            if(this.message.hsv[1]==''||this.message.hsv[1]<0){
                this.message.hsv[1] = 0;
            }
            if(this.message.hsv[1]>1){
                this.message.hsv[1] = 1;
            }
            if(this.message.hsv[2]==''||this.message.hsv[2]<0){
                this.message.hsv[2] = 0;
            }
            if(this.message.hsv[2]>255){
                this.message.hsv[2] = 255;
            }
            this.$forceUpdate();
        },
        enterRgb(){
            this.message.rgb.map(function(item){
                if(item==""){
                    item = 0;
                }
                if(item>255){
                    item = 255;
                }
            });
            this.$forceUpdate();
            this.rgbtoHsv();
            this.rgbtoCmyk();
            this.rgbtoColor();
        },
        // rgb转化为cmyk
        rgbtoCmyk(){
            let c,m,y,k;
            c = (255 - this.message.rgb[0])/255;
            m = (255 - this.message.rgb[1])/255;
            y = (255 - this.message.rgb[2])/255;
            k = this.min(c,m,y);
            if(k==1){
                this.message.cmyk[0] = 0;
                this.message.cmyk[1] = 0;
                this.message.cmyk[2] = 0;
            }else{
                this.message.cmyk[0] = parseInt((c - k)/(1 - k)*100);
                this.message.cmyk[1] = parseInt((m - k)/(1 - k)*100);
                this.message.cmyk[2] = parseInt((y - k)/(1 - k)*100);
            }
            this.message.cmyk[3] = k;
            this.$forceUpdate();
        },
        // 比较大小
        max(r,g,b){
            let result;
            result = Math.max(Math.max(r,g),b);
            return result;
        },
        min(r,g,b){
            let result;
            result = Math.min(Math.min(r,g),b);
            return result;
        },
        // rgb转化为hsv
        // h 0-360 s 0-1 v 0-255
        rgbtoHsv(){
            let max = this.max(this.message.rgb[0],this.message.rgb[1],this.message.rgb[2]);
            let min = this.min(this.message.rgb[0],this.message.rgb[1],this.message.rgb[2]);
            if(this.message.rgb[0]==this.message.rgb[1]&&this.message.rgb[1]==this.message.rgb[2]){
                this.message.hsv[0] = 0;
            }else if(max==this.message.rgb[0]&&this.message.rgb[1]>=this.message.rgb[2]){
                this.message.hsv[0] = 60*((this.message.rgb[1]-this.message.rgb[2])/(max-min));
            }else if(max==this.message.rgb[0]&&this.message.rgb[1]<this.message.rgb[2]){
                this.message.hsv[0] = 60*((this.message.rgb[1]-this.message.rgb[2])/(max-min))+360;
            }else if(this.message.rgb[1]==max){
                this.message.hsv[0] = 60*((this.message.rgb[1]-this.message.rgb[2])/(max-min))+120;
            }else if(this.message.rgb[2]==max){
                this.message.hsv[0] = 60*((this.message.rgb[1]-this.message.rgb[2])/(max-min))+240;
            }
            this.message.hsv[0] = parseInt(this.message.hsv[0]);
            if(max==0){
                this.message.hsv[1] = 0;
            }else{
                this.message.hsv[1] = parseInt((max-min)/max);
            }
            this.message.hsv[2] = parseInt(max);
            this.message.hue = (this.message.hsv[0]/360).toFixed(2);
            this.message.saturation = (this.message.hsv[1]/1).toFixed(2);
            this.message.lightness = (this.message.hsv[2]/255).toFixed(2);
            this.$forceUpdate();
        },
        // rgb转化为16进制
        rgbtoColor(){
            this.message.color = ((this.message.rgb[0]<<16)|(this.message.rgb[1]<<8)|this.message.rgb[2]).toString(16);
            // 不足六位补0
            this.message.color = (Array(6).join('0') + this.message.color).slice(-6);
            this.$forceUpdate();
        },
        // cmyk转化为rgb
        cmyktoRgb(){
            this.message.rgb[0] = parseInt(255*(100-this.message.cmyk[0])*(1-this.message.cmyk[3])/100);
            this.message.rgb[1] = parseInt(255*(100-this.message.cmyk[1])*(1-this.message.cmyk[3])/100);
            this.message.rgb[2] = parseInt(255*(100-this.message.cmyk[2])*(1-this.message.cmyk[3])/100);
            this.rgbtoColor();
            this.rgbtoHsv();
            this.$forceUpdate();
        },
        // hsv转化为rgb
        hsvtoRgb(prevent){
            let h = this.message.hsv[0];
            let s = this.message.hsv[1];
            let v = this.message.hsv[2];
            let hi = parseInt(h/60)%6;
            let f = h/60-hi,
                p = v*(1-s),
                q = v*(1-f*s),
                t = v*(1-(1-f)*s);
            if(hi===0){
                this.message.rgb[0] = parseInt(v);
                this.message.rgb[1] = parseInt(t);
                this.message.rgb[2] = parseInt(p);
            }else if(hi==1){
                this.message.rgb[0] = parseInt(q);
                this.message.rgb[1] = parseInt(v);
                this.message.rgb[2] = parseInt(p);
            }else if(hi==2){
                this.message.rgb[0] = parseInt(p);
                this.message.rgb[1] = parseInt(v);
                this.message.rgb[2] = parseInt(t);
            }else if(hi==3){
                this.message.rgb[0] = parseInt(p);
                this.message.rgb[1] = parseInt(q);
                this.message.rgb[2] = parseInt(v);
            }else if(hi==4){
                this.message.rgb[0] = parseInt(t);
                this.message.rgb[1] = parseInt(p);
                this.message.rgb[2] = parseInt(v);
            }else if(hi==5){
                this.message.rgb[0] = parseInt(v);
                this.message.rgb[1] = parseInt(p);
                this.message.rgb[2] = parseInt(q);
            }
            if(this.message.rgb[1]>255||prevent==1){
                this.message.rgb[1] = 0;
            }
            this.rgbtoCmyk();
            this.rgbtoColor();
            this.$forceUpdate();
        },
        // 16进制转化为rgb
        colortoRgb(){
            let color = this.message.color;
            if(this.message.color.length>6){
                this.message.color = this.message.color.substring(0,6);
            }
            if(this.message.color.length==3){
                color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
            }
            if(/^[0-9a-fA-F]{6}$/.test(color)){
                this.message.rgb[0] = parseInt(color.substr(0,2),16);
                this.message.rgb[1] = parseInt(color.substr(2,2),16);
                this.message.rgb[2] = parseInt(color.substr(4,2),16);
                this.rgbtoHsv();
                this.rgbtoCmyk();
            }
            this.$forceUpdate();
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
                    type: 4,
                    backImage: this.backImage,
                    backId: this.backId,
                    specialType: this.$route.query.specialType
                }
            });
        },
        cancelClick(){
            this.sureClick();
        },
        // 替换按钮点击
        exchange(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            let arr = [];
            if(!this.colorList.length){
                this.showLoading = false;
                this.showJump = true;
                this.err = '请先选择需要替换的颜色';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
                return;
            }
            this.rightList.map(function(item){
                arr.push(item.picture);
            });
            let str = arr.join(',');
            let i;
            this.colorList.map(function(item,index){
                if(item.show){
                    i = index;
                }
            });
            if(this.btnIndex==0){
                formData.append('images',str);
            }else if(this.btnIndex==1){
                if(this.backId==""){
                    this.showJump = true;
                    this.err = '请先选择底纹';
                    this.showLoading = false;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                    return;
                }else{
                    formData.append('images',this.backImage);
                }
            }
            formData.append('threshhold',this.message.threshold);
            formData.append('colorR',this.colorList[i].r);
            formData.append('colorG',this.colorList[i].g);
            formData.append('colorB',this.colorList[i].b);
            formData.append('AimColorR',this.message.rgb[0]);
            formData.append('AimColorG',this.message.rgb[1]);
            formData.append('AimColorB',this.message.rgb[2]);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/color/changeColor'
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    this.getList();
                    if(this.btnIndex==0){
                        this.rightList.map(function(item,i){
                            item.picture = res.data.result.images[i];
                        });
                        this.$forceUpdate();
                        self.judge(1);
                    }else if(this.btnIndex==1){
                        this.backImage = res.data.result.images[0];
                        this.$forceUpdate();
                    }
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
            this.rightList = [];
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.$forceUpdate();
        }
    },
    mounted(){
        this.getHeight();
        this.getMessage();
        this.getList();
        // localStorage.setItem('path',this.path);
        // if(localStorage.getItem('English')){
        //     this.$router.push({
        //         path: '/Encolour',
        //         query: {
        //             message: this.rightList,
        //             backImage: this.backImage,
        //             backId: this.backId
        //         }
        //     });
        // }else{
        //     this.$router.push({
        //         path: '/Colour',
        //         query: {
        //             message: this.rightList,
        //             backImage: this.backImage,
        //             backId: this.backId
        //         }
        //     });
        // }
    }
}
</script>
<style scoped>
    .colour{
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
        margin-left: 6.6875rem;
    }
    .backBox>h4{
        font-size: 1.125rem;
        color: #333;
        margin-bottom: .75rem;
        font-weight: normal;
        text-align: left;
        margin-top: 1.25rem;
    }
    .inputBox{
        display: flex;
    }
    .colorBack{
        flex-shrink: 0;
        width: 9.6875rem;
        height: 9.6875rem;
        background: red;
        display: block;
    }
    .rightInput{
        margin-left: 1.125rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
    .rightBox{
        display: flex;
        align-items: center;
    }
    .rightBox label{
        display: flex;
        align-items: center;
        margin-right: 1rem;
        color: #333;
        font-size: 1rem;
        font-weight: normal;
    }
    .rightBox span{
        display: block;
        width: 1.875rem;
        text-align: left;
        flex-shrink: 0;
        font-family: '微软雅黑';
    }
    .rightBox input{
        width: 3.125rem;
        height: 1.625rem;
        outline: none;
        border: 1px solid #333;
        border-radius: .3125rem;
        display: block;
        box-sizing: border-box;
        padding: 0 .5rem;
    }
    .signBox input{
        width: 10.625rem;
    }
    /* 滚动条样式 */
    .pullBox{
        display: flex;
        flex-direction: column;
        margin-top: 3rem;
    }
    .lineBox{
        position: relative;
        display: flex;
        color: #333;
        font-size: 1rem;
        margin-bottom: 2rem;
        align-items: center;
    }
    .lineBox img{
        width: 483px;
        height: 8px;
        display: block;
        flex-shrink: 0;
        margin-right: 1.25rem;
    }
    .lineBox .line{
        width: 483px;
        height: 8px;
        position: absolute;
        top: calc(50% - 4px);
        left: 0;
    }
    .lineBox .line span{
        position: absolute;
        top: -6px;
        left: 0;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        border: 1px solid #333;
        box-sizing: border-box;
    }
    .specialLine{
        display: flex;
        align-items: center;
        color: #333;
        font-size: 1rem;
    }
    .specialLine .line{
        margin: 0 16px;
        position: relative;
        background: #d8d8d8;
        width: 395px;
        height: 8px;
        border: 1px solid #333;
        box-sizing: border-box;
        border-radius: 4px;
    }
    .specialLine .line div{
        position: absolute;
        left: 0;
        width: 20px;
        height: 6px;
        top: 0;
        background: #fff;
        border-radius: 4px 0 0 4px;
    }
    .specialLine .line span{
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 50%;
        border: 1px solid #333;
        top: -6px;
        left: 20px;
    }
    ul.colorList{
        display: flex;
        max-width: 41.875rem;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        margin-top: 2.5rem;
    }
    ul.colorList li{
        width: 3.8125rem;
        height: 3.8125rem;
        background: red;
        border: 1px solid inherit; 
        margin-right: 1.25rem;
        margin-bottom: 1.25rem;
    }
    ul.colorList li.special{
        border: 1px solid #333;
    }
    button{
        border: none;
        outline: none;
        width: 7.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        display: block;
        border-radius: 1.25rem;
        color: #fff;
        font-size: 1rem;
        box-sizing: border-box;
    }
    .exchange{
        margin-top: 1rem;
        background: #133ffc;
    }
    .btnBox{
        display: flex;
        margin-top: 7.5rem;
        padding-bottom: 2.5rem;
        justify-content: flex-end;
    }
    .btnBox button{
        color: #133ffc;
        background: inherit;
        border: 1px solid #133ffc;
    }
    .btnBox button:last-child{
        margin-left: 2.5rem;
        color: #fff;
        background: #133ffc;
    }
    ul.buttonBox{
        display: flex;
        margin-top: 5.625rem;
    }
    ul.buttonBox li{
        cursor: pointer;
        color: #888;
        font-size: 1.375rem;
        position: relative;
        padding: 0 1.6875rem;
        text-align: left;
    }
    ul.buttonBox li:first-child{
        padding-left: 0;
    }
    ul.buttonBox li:first-child:after{
        position: absolute;
        content: "";
        width: 1px;
        right: 0;
        top: calc(50% - .5rem);
        background: #888;
        height: 1.25rem;
    }
    ul.buttonBox li.btnList{
        color: #333;
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