<template>
    <div class="changecolour">
        <!-- 花型构图 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">   
            <div class="leftBox">
                <div @click="back" class="turnBox">
                    <img src="../../assets/image/3d/backicon.png" alt="">
                    <span>返回</span>
                </div>
                <div id="imgBox" class="imgBox">
                    <img v-if="imgMsg.preview" :src="imgMsg.preview" alt="">
                    <img v-else-if="!imgMsg.preview" :src="imgMsg.picture1" alt="">
                </div>
            </div>
            <div class="backBox">
                <h4>新颜色</h4>
                <div class="inputBox">
                    <div>
                        <span :style="{background: '#'+message.color}" class="colorBack"></span>
                        <span :style="{background: imgColor}" class="colorBack"></span>
                        <h4>当前颜色</h4>
                    </div>
                    <div class="rightInput">
                        <div class="rightBox">
                            <label for="">
                                <span>C</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[0]" type="text">
                            </label>
                            <label for="">
                                <span>M</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[1]" type="text">
                            </label>
                            <label for="">
                                <span>Y</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[2]" type="text">
                            </label>
                            <label for="">
                                <span>K</span>
                                <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[3]" type="text">
                            </label>
                        </div>
                        <div class="rightBox">
                            <label for="">
                                <span>H</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[0]" type="text">
                            </label>
                            <label for="">
                                <span>S</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[1]" type="text">
                            </label>
                            <label for="">
                                <span>V</span>
                                <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[2]" type="text">
                            </label>
                        </div>
                        <div class="rightBox">
                            <label for="">
                                <span>R</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[0]" type="text">
                            </label>
                            <label for="">
                                <span>G</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[1]" type="text">
                            </label>
                            <label for="">
                                <span>B</span>
                                <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[2]" type="text">
                            </label>
                        </div>
                        <div class="rightBox signBox">
                            <label for="">
                                <span>#</span>
                                <input  @blur="colortoRgb" v-on:keyup.enter="colortoRgb" v-model="message.color" type="text">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="pullBox">
                    <div class="leftLineBox" id="backColor">
                        <!-- <img src="../../assets/image/flower/color1.png" alt=""> -->
                        <div @click="clickIndex($event,0)" class="line">
                            <span class="colorBox" :style="{top: (message.hue*imgHeight)+'px','pointer-events': message.auto}" @mousedown="pull($event,1)" @mouseup="push"></span>
                        </div>
                    </div>
                    <div class="lineBox">
                        <span>明度 &nbsp;&nbsp;</span>
                        <img src="../../assets/image/flower/color2.png" alt="">
                        <div @click="clickIndex($event,2)" class="line">
                            <span :style="{left: (message.lightness*463)+'px'}" @mousedown="pull($event,3)" @mouseup="push"></span>
                        </div>
                    </div>
                    <div class="lineBox">
                        <span>饱和度</span>
                        <img src="../../assets/image/flower/color2.png" alt="">
                        <div @click="clickIndex($event,1)" class="line">
                            <span :style="{left: (message.saturation*463)+'px'}" @mousedown="pull($event,2)" @mouseup="push"></span>
                        </div>
                    </div>
                    <div class="specialLine">
                        <span>原来颜色</span>
                        <div class="line">
                            <div :style="{width: whiteWidth}"></div>
                            <span @mousedown="thresholdPull($event)" @mouseup="thresholdPush"></span>
                        </div>
                        <span>阈值 {{message.threshold}}</span>
                    </div>
                </div>
                <ul v-if="colorList.length" class="colorList">
                    <li @click="changeColor(index,$event)" v-for="(item,index) in colorList" :key="index" :class="item.show?'special':''" :style="{background: 'rgba('+item.r+','+item.g+','+item.b+','+item.alpha}"></li>
                </ul>
                <div class="btnBox">
                    <button id="tihuantongji" @click="exchange">替换</button>
                    <button id="zidongpeisetongji" @click="modelClick">自动配色</button>
                    <button @click="threedLook">3D预览</button>
                    <button @click="download">下载</button>
                    <button @click="backImg">回到原图</button>
                </div>
            </div>
        </div>
        <div class="model" v-if="showModel">
            <div class="modelBox">
                <img @click="modelClose" class="modelClose" src="../../assets/image/3d/close.png" alt="">
                <ul class="modelList">
                    <li v-for="(item,index) in modelList" :key="index">
                        <!-- <img class="proImg" :src="item" alt=""> -->
                        <img class="proImg" :style="{filter: 'hue-rotate('+item.rotate+'deg)'}" :src="item.imgUrl" alt="">
                        <input @click="changeList(index)" :checked="showList[index]" type="radio" name="" id="">
                        <span></span>
                    </li>
                </ul>
                <div class="modelBtn">
                    <button @click="fresh">刷新</button>
                    <button @click="downAll">下载</button>
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
    name: 'Changecolour',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            tabIndex: 9,
            showJump: false,
            err: '',
            showLoading: false,
            path: '/Changecolour',
            message: {
                cmyk: [0,100,100,0],
                hsv: [0,1,255],
                rgb: [255,0,0],
                color: 'ff0000',
                hue: 0,
                saturation: 1,
                lightness: 1,
                threshold: 50,
                auto: 'auto'
            },  
            whiteWidth: '20px',
            colorList: [],
            imgMsg: {},
            // 弹窗
            showModel: false,
            modelList: [],
            showList: [],
            count: 1,
            imgHeight:'',
            prevent:'',
            imgColor:''
        }
    },
    methods: {
        // 返回
        back(){
            this.$router.push({
                path: '/Matching'
            });
        },
        // 点击自动配色
        modelClick(){
            //  _czc.push(["_trackEvent","AI配色","自动配色","","","zidongpeisetongji"]);
            this.showModel = true;
            this.getAuto();
        },
        getAuto(){
            this.showLoading = true;
            this.modelList = [];
            let self = this;
            let arr = [];
            let one = (Math.floor(Math.random()*360+1)).toFixed(1);
            for(let m=0;m<8;m++){
                arr[m] = 31*m+parseFloat(one);
                if(arr[m]>360){
                    arr[m] -= 360;
                }
            }
            let img;
            if(this.imgMsg.preview){
                img = this.imgMsg.preview;
            }else{
                img = this.imgMsg.picture1;
            }
            for(let n=0;n<8;n++){
                this.modelList.push({
                    imgUrl: img,
                    rotate: arr[n]
                });
            }
            setTimeout(function(){
                self.showLoading = false;
            },500);
        },
        // 选择图片
        changeList(index){
            for(let i=0;i<this.showList.length;i++){
                this.showList[i] = false;
            }
            this.showList[index] = true;
            this.$forceUpdate();
        },
        // 点击返回原图
        backImg(){
            this.getMessage();
            this.thresholdPush();
        },
        // 点击刷新重新加载8张图片
        fresh(){
            this.getAuto();
        },
        // 点击下载
        downAll(){
            let show = false;
            let self = this;
            this.showList.map(function(item,index){
                if(item){
                    show = true;
                }
            });
            if(show){
                this.showList.map(function(item,index){
                    if(item){
                        self.showLoading = true;
                        let formData = new FormData();
                        formData.append('image',self.modelList[index].imgUrl);
                        formData.append('diff',self.modelList[index].rotate);
                        let obj = {
                            url: self.all.baseUrl+'/color/changeColorGradationDown',
                            formdata: formData
                        }
                        self.getData(obj).then(res=>{
                            setTimeout(function(){
                                self.showLoading = false;
                            },500);
                            window.location.href = self.all.baseUrl + "/file/download?url="+res.data
                        });
                    }
                });
            }else{
                this.showJump = true;
                this.err = '请先选择图片';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 关闭弹窗
        modelClose(){
            this.showModel= false;
        },
        changeEnglish(){
            this.$router.go(0);
        },
        getMessage(){
            this.imgMsg = JSON.parse(localStorage.getItem('matchList'));
            this.imgHeight = document.getElementById("backColor").offsetHeight - 20;
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            let img;
            if(this.imgMsg.preview){
                img = this.imgMsg.preview;
            }else{
                img = this.imgMsg.picture1;
            }
            formData.append('images',img);
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
                    if(this.colorList.length){
                        this.colorList.map(function(item){
                            item.show = false;
                        });
                        this.colorList[0].show = true;
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
        changeColor(index,e){
            this.imgColor = e.currentTarget.style.backgroundColor;
            this.colorList.map(function(item){
                item.show = false;
            });
            this.colorList[index].show = true;
            this.$forceUpdate();
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
                if(endx<0||endx>460){
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
                self.getList();
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        thresholdPush(){
            let self = this;
            self.getList();
            document.onmousemove = null;
        },
        clickIndex(event,index){
            if(event&&event.stopPropagation){
                //因此它支持W3C的stopPropagation()方法 
                event.stopPropagation(); 
            }else{
                //否则，我们需要使用IE的方式来取消事件冒泡 
                window.event.cancelBubble = true; 
            }
            // this.message.auto = 'none';
            // if(index==0){
            //     this.message.hue = event.offsetX/483;
            //     this.message.hsv[0] = parseInt(this.message.hue*360);
            // }else if(index==1){
            //     this.message.saturation = event.offsetX/483;
            //     this.message.hsv[1] = (this.message.saturation).toFixed(2);
            // }else if(index==2){
            //     this.message.lightness = event.offsetX/483;
            //     this.message.hsv[2] = parseInt(this.message.lightness*255);
            // }
            // this.hsvtoRgb(this.message.hue);
        },
        // 色相饱和度明度滚动条
        pull(event,type){
            if(event&&event.stopPropagation){
                //因此它支持W3C的stopPropagation()方法 
                event.stopPropagation(); 
            }else{
                //否则，我们需要使用IE的方式来取消事件冒泡 
                window.event.cancelBubble = true; 
            }
            this.message.auto = 'auto';
            this.clickIndex(event,type);
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
            if(type == 1){
                document.onmousemove = function(ev){
                    var event=ev || window.event;
                    var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
                    if(event.clientX<0||event.clientX<0||event.clientX>width){
                        return false;
                    };
                    var endx = event.clientX-roundX;
                    var endy = event.clientY-roundY;
                    // if(endx<-18||endx>10){
                    //     document.onmousemove = null;
                    //     document.onmouseup = null;
                    // }
                    if(endy<0||endy>self.imgHeight){
                        if(endy<0){
                            self.prevent = 0;
                        }else{
                            self.prevent = 1;
                        }
                        self.push();
                    }else{
                        self.prevent = endy/self.imgHeight;
                        _target.style.top = endy + 'px';
                    }
                    if(type==1){
                        self.message.hue = self.prevent;
                        self.message.hsv[0] = parseInt(self.message.hue*360);
                    }else if(type==2){
                        self.message.saturation = self.prevent;
                        self.message.hsv[1] = (self.message.saturation).toFixed(2);
                    }else if(type==3){
                        self.message.lightness = self.prevent;
                        self.message.hsv[2] = parseInt(self.message.lightness*255);
                    }
                    self.hsvtoRgb(self.prevent);
                    self.$forceUpdate();
                }
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }else{
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
                            self.prevent = 0;
                        }else{
                            self.prevent = 1;
                        }
                        self.push();
                    }else{
                        self.prevent = endx/463;
                        _target.style.left = endx + 'px';
                    }
                    if(type==1){
                        self.message.hue = self.prevent;
                        self.message.hsv[0] = parseInt(self.message.hue*360);
                    }else if(type==2){
                        self.message.saturation = self.prevent;
                        self.message.hsv[1] = (self.message.saturation).toFixed(2);
                    }else if(type==3){
                        self.message.lightness = self.prevent;
                        self.message.hsv[2] = parseInt(self.message.lightness*255);
                    }
                    self.hsvtoRgb(self.prevent);
                    self.$forceUpdate();
                }
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        },
        push(){
            document.onmousemove = null;
            document.onmouseup = null;
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
        // 去3D预览
        threedLook(){
            let img;
            if(this.imgMsg.preview){
                img = this.imgMsg.preview;
            }else{
                img = this.imgMsg.picture1;
            }
            localStorage.setItem('backImg',img);
            localStorage.setItem('newType',2);
            localStorage.setItem('selectType',1);
            localStorage.setItem("orderId",this.imgMsg.id);
            localStorage.setItem("imgUrl",img);
            localStorage.setItem("path",'/Threed');
            let routeData = this.$router.resolve({
                name: "Threed",
                // query: {id: this.orderId}
            });
            window.open(routeData.href, '_blank');
        },
        // 下载
        download(){
            let img;
            if(this.imgMsg.preview){
                img = this.imgMsg.preview;
            }else{
                img = this.imgMsg.picture1;
            }
            window.location.href= this.all.baseUrl+"/file/download?url="+img;
        },
        // 替换按钮点击
        exchange(){
            let self = this;
            if(this.colorList.length){
                let formData = new FormData();
                this.showLoading = true;
                let i;
                this.colorList.map(function(item,index){
                    if(item.show){
                        i = index;
                    }
                });
                let img;
                if(this.imgMsg.preview){
                    img = this.imgMsg.preview;
                }else{
                    img = this.imgMsg.picture1;
                }
                formData.append('images',img);
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
                    // _czc.push(["_trackEvent","替换","操作","","","tehuantongji"]);
                    setTimeout(function(){
                        self.showLoading = false;
                    },500);
                    if(res.data.status==0){
                        this.imgMsg.preview = res.data.result.images[0];
                        this.getList();
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
            }else{
                this.showJump = true;
                this.err = '请先选择要替换的颜色';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }
        }
    },
    mounted(){
        this.getMessage();
        this.getList();
        // localStorage.setItem('path',this.path);
        // if(localStorage.getItem('English')){
        //     this.$router.push({
        //         path: '/Enchangecolour'
        //     });
        // }else{
        //     this.$router.push({
        //         path: '/Changecolour'
        //     });
        // }
    }
}
</script>
<style scoped>
    .changecolour{
        min-height: 100vh;
        width: 100%;
        background: #eee;
    }
    .content{
        margin: 0 14.375rem;
        display: flex;
        padding-bottom: 2.5rem;
        box-sizing: border-box;
    }
    .leftBox{
        display: flex;
        flex-direction: column;
        margin-top: 1.875rem;
    }
    .turnBox{
        color: #585858;
        display: flex;
        align-items: center;
        cursor: default;
        font-size: 16px;
        margin-bottom: 16px;
    }
    .turnBox img{
        display: block;
        margin-right: .5rem;
        width: .5625rem;
    }
    .imgBox{
        width: 31.25rem;
        height: 46.6rem;
        display: flex;
        background: #fff;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: .5rem;
    }
    .imgBox img{
        max-width: 31.25rem;
        max-height: 46.6rem;
        display: block;
    }
    .backBox{
        margin-left: 6.6875rem;
    }
    .backBox>h4{
        font-size: 1.125rem;
        color: #333;
        margin-bottom: .55rem;
        font-weight: normal;
        text-align: left;
        margin-top: 8rem;
        margin-left: 3rem;
    }
    h4{
        font-size: 1.125rem;
        color: #7d7d7d !important;
        margin-top: .55rem;
        font-weight: normal !important;
        margin-bottom: 0;
    }
    .inputBox{
        display: flex;
    }
    .inputBox>div:first-child{
        width: 9.6875rem;
        height: 9.6875rem;
    }
    .colorBack{
        flex-shrink: 0;
        width: 9.6875rem;
        height: 4.6875rem;
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
        text-align: left;
        flex-shrink: 0;
        font-family: '微软雅黑';
        font-size: 16px;
        width: 20px;
    }
    .rightBox input{
        width: 42px;
        height: 22px;
        outline: none;
        border: 1px solid #b4b4b4;
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
        font-size: .882rem;
        margin-bottom: 2rem;
        align-items: center;
    }
    .leftLineBox{
        position: absolute;
        display: flex;
        top: 8.8rem;
        left: 47.5rem;
        width: 30px;
        height: 46.6rem;
        background-image: linear-gradient(#ff0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#8B00FF,#ff0000);
    }
    .lineBox img{
        width: 483px;
        height: 8px;
        display: block;
        flex-shrink: 0;
        margin-left: 2.15rem;
    }
    .lineBox .line{
        width: 483px;
        height: 8px;
        position: absolute;
        top: calc(50% - 4px);
        left: 5rem;
    }
    .leftLineBox .line{
        width: 100%;
        height: 100%;
        position: absolute;
        top: calc(50% - 4px);
        top: 0;
    }
    .lineBox .line span{
        position: absolute;
        top: -6px;
        left: 0;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #F06D29;
        box-sizing: border-box;
    }
    .leftLineBox .line>span{
        position: absolute;
        top: -6px;
        left: -22px;
        width: 80px;
        height: 25px;
        background: #ffffff00;
        box-sizing: border-box;
        display: flex;
        padding-bottom: 30px;
    }
    .leftLineBox .line>span img{
        width: 20px;
        height: 20px;
    }
    .leftLineBox .line>span img:first-child{
        margin-right: 33px;
    }
    /* .leftLineBox .line>span>span{
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
    }
    .leftLineBox .line>span>span:first-child{
        border-color:#FFffff00 #ffffff00 #ffffff00 #339933;
    }
    .leftLineBox .line>span>span:last-child{
        border-color:#FFffff00 #339933 #ffffff00 #ffffff00;
    } */
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
        width: 475px;
        height: 8px;
        box-sizing: border-box;
        border-radius: 4px;
    }
    .specialLine .line div{
        position: absolute;
        left: 0;
        width: 20px;
        height: 7px;
        top: 0px;
        background: #F06D29;
        border-radius: 4px 0 0 4px;
    }
    .specialLine .line span{
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #F06D29;
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
        width: 1.765rem;
        height: 1.765rem;
        background: #F8E54A;
        border: 1px solid #fff;
        border-radius: 2px;
        margin-right: 1.25rem;
        margin-bottom: 1.25rem;
    }
    ul.colorList li.special{
        border: 1px solid #161616;
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.56);
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
    .btnBox{
        margin-top: 4.8rem;
        display: flex;
        justify-content: flex-start;
    }
    .btnBox button{
        color: #979797;
        background: inherit;
        width: 94px;
        height: 30px;
        border: 1px solid #979797;
        margin-right: 3.342rem;
        line-height: 30px;
        font-size: 14px;
        border-radius: 2px;
    }
    .btnBox button:first-child{
        color: #fff;
        background: #F06D29;
        border: 1px solid #F06D29;
    }
    .btnBox button:hover{
        cursor: pointer;
    }
    /* 弹窗 */
    .model{
        position: fixed;
        z-index: 9999;
        background: rgba(0,0,0,0.6);
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
    }
    .modelBox{
        width: 84.5rem;
        height: 49.375rem;
        position: absolute;
        top: 0;
        position: relative;
        background: #fff;
        left: calc(50% - 42.25rem);
        top: calc(50vh - 24.6825rem);
        border-radius: .3125rem;
    }
    .modelClose{
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 1.5625rem;
    }
    .modelList{
        padding: 4.125rem 2.75rem 0;
        display: flex;
        flex-wrap: wrap;
    }
    .modelList li{
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 19.75rem;
        height: 19.75rem;
        border: 1px solid #363636;
        box-sizing: border-box;
        overflow: hidden;
        border-right: none;
        border-bottom: none;
        position: relative;
    }
    .modelList li:nth-child(4n){
        border-right: 1px solid #363636;
    }
    .modelList li:nth-child(5),
    .modelList li:nth-child(6),
    .modelList li:nth-child(7),
    .modelList li:nth-child(8){
        border-bottom: 1px solid #363636;
    }
    .modelList li img.proImg{
        max-width: 19.75rem;
        max-height: 19.75rem;
        /* filter: hue-rotate(70deg); */
    }
    .modelList li input{
        position: absolute;
        z-index: 99;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
    }
    .modelList li span{
        display: block;
        position: absolute;
        z-index: 88;
        width: 1.125rem;
        height: 1.125rem;
        right: .6875rem;
        top: .6875rem;
        background: url('../../assets/image/login/noselect.png') no-repeat center;
        background-size: 100% 100%;
    }
    .modelList li input:checked + span{
        background: url('../../assets/image/login/hasselect.png') no-repeat center;
        background-size: 100% 100%;
    }
    .modelBtn{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 2.75rem;
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        margin-bottom: 1.5rem;
    }
    .modelBtn button{
        margin-left: 1.25rem;
        border: 1px solid #133ffc;
        background: #fff;
        color: #133ffc;
    }
    .modelBtn button:first-child{
        background: #133ffc;
        color: #fff;
    }
    .colorBox{
        left: -18px !important;
        width: 66px !important;
        background: url("../../assets/image/ai/icon.png") no-repeat center !important;
        background-size: 100% !important;
    }
    #tihuantongji{
        background: #ffe300 !important;
        color: #333;
        border: none !important;
    }
    .colorBox:hover{
        cursor: pointer;
    }
    #tihuantongji:hover{
        background: #ffd000 !important;
    }
</style>