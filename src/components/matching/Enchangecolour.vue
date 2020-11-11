<template>
    <div class="changecolour">
        <!-- 花型构图 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">   
            <div class="leftBox">
                <div @click="back" class="turnBox">
                    <img src="../../assets/image/3d/backicon.png" alt="">
                    <span>Back</span>
                </div>
                <div class="imgBox">
                    <img :src="imgMsg.preview" alt="">
                </div>
            </div>
            <div class="backBox">
                <h4>New colour</h4>
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
                        <span>Hue</span>
                    </div>
                    <div class="lineBox">
                        <img src="../../assets/image/flower/color2.png" alt="">
                        <div class="line">
                            <span :style="{left: (message.saturation*463)+'px'}" @mousedown="pull($event,2)" @mouseup="push"></span>
                        </div>
                        <span>Saturation</span>
                    </div>
                    <div class="lineBox">
                        <img src="../../assets/image/flower/color3.png" alt="">
                        <div class="line">
                            <span :style="{left: (message.lightness*463)+'px'}" @mousedown="pull($event,3)" @mouseup="push"></span>
                        </div>
                        <span>Lightness</span>
                    </div>
                    <div class="specialLine">
                        <span>Original colour</span>
                        <div class="line">
                            <div :style="{width: whiteWidth}"></div>
                            <span @mousedown="thresholdPull($event)" @mouseup="thresholdPush"></span>
                        </div>
                        <span>Threshold：{{message.threshold}}</span>
                    </div>
                </div>
                <ul v-if="colorList.length" class="colorList">
                    <li @click="changeColor(index)" v-for="(item,index) in colorList" :key="index" :class="item.show?'special':''" :style="{background: 'rgba('+item.r+','+item.g+','+item.b+','+item.alpha}"></li>
                </ul>
                <div class="btnBox">
                    <button id="tihuantongji" @click="exchange">Replace</button>
                    <button id="zidongpeisetongji" @click="modelClick">Automatic</button>
                    <button @click="threedLook">3D Preview</button>
                    <button @click="download">Download</button>
                </div>
            </div>
        </div>
        <div class="model" v-if="showModel">
            <div class="modelBox">
                <img @click="modelClose" class="modelClose" src="../../assets/image/3d/close.png" alt="">
                <ul class="modelList">
                    <li v-for="(item,index) in modelList" :key="index">
                        <img class="proImg" :style="{filter: 'hue-rotate('+item.rotate+'deg)'}" :src="item.imgUrl" alt="">
                        <input @click="changeList(index)" :checked="showList[index]" type="radio" name="" id="">
                        <span></span>
                    </li>
                </ul>
                <div class="modelBtn">
                    <button @click="fresh">Refresh</button>
                    <button @click="downAll">Download</button>
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
    name: 'Enchangecolour',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            tabIndex: 4,
            showJump: false,
            err: '',
            showLoading: false,
            path: '/Enchangecolour',
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
            colorList: [],
            imgMsg: {},
            // 弹窗
            showModel: false,
            modelList: [],
            showList: [],
            count: 1
        }
    },
    methods: {
        // 返回
        back(){
            this.$router.push({
                path: '/Enmatching'
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
            for(let n=0;n<8;n++){
                this.modelList.push({
                    imgUrl: this.imgMsg.preview,
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
                this.err = 'Please select the picture first';
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
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            formData.append('images',this.imgMsg.preview);
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
                    this.err = 'Your account has been logged in elsewhere';
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
            localStorage.setItem('backImg',this.imgMsg.preview);
            localStorage.setItem('newType',2);
            localStorage.setItem('selectType',1);
            this.$router.push({
                path: '/Enshopselect'
            });
        },
        // 下载
        download(){
            window.location.href= this.all.baseUrl+"/file/download?url="+this.imgMsg.preview;
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
                formData.append('images',this.imgMsg.preview);
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
                    // _czc.push(["_trackEvent","替换","操作","","","tihuantongji"]);
                    setTimeout(function(){
                        self.showLoading = false;
                    },500);
                    if(res.data.status==0){
                        this.imgMsg.preview = res.data.result.images[0];
                        this.getList();
                        this.$forceUpdate();
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        this.err = 'Your account has been logged in elsewhere';
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
                this.err = 'Please select the color to replace first';
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
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enchangecolour'
            });
        }else{
            this.$router.push({
                path: '/Changecolour'
            });
        }
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
        font-size: 1rem;
        margin-bottom: 1rem;
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
        margin-bottom: .75rem;
        font-weight: normal;
        text-align: left;
        margin-top: 8rem;
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
        justify-content: flex-start;
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
    .btnBox{
        margin-top: 1rem;
        display: flex;
        justify-content: flex-start;
    }
    .btnBox button{
        color: #133ffc;
        background: inherit;
        border: 1px solid #133ffc;
        margin-right: 1.25rem;
    }
    .btnBox button:first-child{
        color: #fff;
        background: #133ffc;
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
        /* overflow-y: scroll; */
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
</style>