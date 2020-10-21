<template>
    <div class="cutout">
        <!--顶部导航栏-->
        <Tab @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <!--顶部操作栏-->
        <div class="header">
            <div class="headerContent">
                <!--返回按钮-->
                <img class="headerBack" :src="headerBackImg" @mouseover="mouseoverHeaderBack" @mouseleave="mouseleaveHeaderBack"/>
                <img class="headerNext" :src="headerNextImg" @mouseover="mouseoverHeaderNext" @mouseleave="mouseleaveHeaderNext" />
                <!--分割线-->
                <div class="splitLine"></div>
                <!--缩放-->
                <img class="zoom" :src="zoomSmallImg" @mouseover="mouseoverZoomSmall" @mouseleave="mouseleaveZoomSmall" @click="zoomSmall"/>
                <div class="zoomNum">{{zoom}}%</div>
                <img class="zoom zoomBig" :src="zoomBigImg" @mouseover="mouseoverZoomBig" @mouseleave="mouseleaveZoomBig" @click="zoomBig"/>
                <!--分割线-->
                <div class="splitLine mouseTipSplitLine"></div>
                <!--手势-->
                <img class="handBtn" :src="headerHandImg" @mouseover="mouseoverHeaderHand" @mouseleave="mouseleaveHeaderHand" @click="move"/>
                <div class="headerBtn">
                    <!--取消按钮-->
                    <div class="headerCancel">取消{{isStartMove}}</div>
                    <!--保存按钮-->
                    <div class="headerSave">保存</div>
                </div>
            </div>
        </div>
        <!--图片部分-->
        <div class="imgTip">
            <div class="oldImgArea">
                <div class="oleImgTip">原图</div>
            </div>
            <div class="oldImgArea newImgArea">
                <div class="oleImgTip newImgTip">效果</div>
            </div>
        </div>
        <div :class="{imgContent:true,headerMouseMove:isMove}" id="imgContent"  :style="{cursor:isMove==true?'url('+headerHandImg+')':'default'}">
            <!--原图-->
            <div class="oldImg" id="oldImgBg"  :style="{width: 'calc(50vw)',height: 'calc( 100vh - 297px)'}">
                <!--<img style="width:auto;height:auto;max-width: 521px;max-height: 500px" :src="imgPath"/>-->
                <canvas id="mycanvas"
                    @mousedown="startMove($event)" @mousemove="moveCanvas($event)" @mouseup="endMove($event)"></canvas>
            </div>
            <div class="oldImg" id="imgResult"   :style="{width: 'calc(50vw)',height: 'calc( 100vh - 297px)'}">
                <canvas id="mycanvasResult"></canvas>
            </div>
        </div>
        <!--底部按钮-->
        <div class="bottomArea">
            <!--保留按钮-->
            <div class="reserved"  @mouseover="mouseoverReserved" @mouseleave="mouseleaveReserved" @click="chooseReserved" :style="{background: isChooseReserved||isHoverReserved?'#FFE300':'#fff'}">
                <div class="reservedText">保留</div><div class="reservedLogoBg" :style="{borderColor:isHoverReserved?'#fff':'#0057FF'}"></div>
            </div>
            <!--祛除按钮-->
            <div class="reserved noeReserved"   @mouseover="mouseoverNotReserved" @mouseleave="mouseleaveNotReserved"  @click="chooseNotReserved"  :style="{background: isChooseNotReserved||isHoverNotReserved?'#FFE300':'#fff'}">
                <div class="reservedText">祛除</div><div class="notReservedLogoBg" :style="{backgroundColor:isHoverNotReserved?'#fff':'#F30202'}"></div>
            </div>
            <!--笔刷大小按钮-->
            <div class="penArea">
                <div class="penText">笔刷大小</div>
                <div class="penLengthBg"></div>
                <div class="penLengthBg penLength" :style="{width: 224/50*penSize+'px'}"></div>
                <img class="penBtn" src="../../assets/image/cut/Group.png" @mouseDown="startChangePenSize($event)"  @mouseUp="endChangePenSize"  @mousemove="changePenSize($event)"/>
                <div class="penNum">{{penSize}}px</div>
            </div>
            <!--橡皮按钮-->
            <div class="reserved clear" @mouseover="mouseoverClear" @mouseleave="mouseleaveClear"   @click="chooseClear"  :style="{background: isChooseClear||isHoverClear?'#FFE300':'#fff'}">
                <div class="reservedText">橡皮</div><img class="clearBtn" :src="clearImg"/>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import Loading from "@/components/Loading";
    import Scroll from "@/assets/js/scroll.js";
    export default {
        name: "Cutout",
        components: {
            Tab,
            Loading
        },
        data(){
            return{
                showLoading:false,
                tabIndex:8,
                headerBackImg:require('../../assets/image/cut/back.png'),
                headerNextImg:require('../../assets/image/cut/back.png'),
                zoomSmallImg:require('../../assets/image/cut/zoomSmall.png'),
                zoomBigImg:require('../../assets/image/cut/zoomBig.png'),
                headerHandImg:require('../../assets/image/cut/headerHand.png'),
                clearImg:require('../../assets/image/cut/clear.png'),
                //鼠标是否停留在保留按钮上
                isHoverReserved:false,
                //鼠标点击了保留按钮
                isChooseReserved:false,
                //是否开始画线
                isStartReserved:false,
                //鼠标是否停留在祛除按钮上
                isHoverNotReserved:false,
                //鼠标点击了保留按钮
                isChooseNotReserved:false,
                //鼠标是否停留在橡皮擦按钮上
                isHoverClear:false,
                //鼠标点击了橡皮擦按钮
                isChooseClear:false,
                imgPath:'',
                defaultWidth:'',
                defaultHeight:'',
                //缩放
                zoom:50,
                //是否选中移动
                isMove:false,
                canvasOld:null,
                canvasOldContext:null,
                canvasLeft:0,
                canvasTop:0,
                img:null,
                isStartMove:false,
                oldClientX:0,
                oldClientY:0,
                penSize:1,
                //是否开始调整画笔大小
                isStartChangePenSize:false,
                oldPenX:0,
                oldPenY:0
            }
        },
        methods:{
            //去掉所有选中效果
            clearChoose(){
                this.isHoverReserved = false;
                this.isChooseReserved = false;
                this.isChooseNotReserved = false;
                this.isHoverNotReserved = false;
                this.isChooseClear = false;
                this.isHoverClear = false;
                this.isMove = false;
                this.isStartMove = false;
                this.isStartReserved = false;
            },
            // 刷新
            changeEnglish() {
                this.$router.go(0);
            },
            mouseoverHeaderBack(){
                this.headerBackImg = require('../../assets/image/cut/backHover.png')
            },
            mouseleaveHeaderBack(){
                this.headerBackImg = require('../../assets/image/cut/back.png')
            },
            mouseoverHeaderNext(){
                this.headerNextImg = require('../../assets/image/cut/backHover.png')
            },
            mouseleaveHeaderNext(){
                this.headerNextImg = require('../../assets/image/cut/back.png')
            },
            mouseoverZoomSmall(){
                this.zoomSmallImg = require('../../assets/image/cut/zoomSmallHover.png')
            },
            mouseleaveZoomSmall(){
                this.zoomSmallImg = require('../../assets/image/cut/zoomSmall.png')
            },
            mouseoverZoomBig(){
                this.zoomBigImg = require('../../assets/image/cut/zoomBigHover.png')
            },
            mouseleaveZoomBig(){
                this.zoomBigImg = require('../../assets/image/cut/zoomBig.png')
            },
            mouseoverHeaderHand(){
                this.headerHandImg = require('../../assets/image/cut/headerHandHover.png')
            },
            mouseleaveHeaderHand(){
                if(!this.isMove){
                    this.headerHandImg = require('../../assets/image/cut/headerHand.png')
                }
            },
            mouseoverClear(){
                this.isHoverClear = true;
                this.clearImg = require('../../assets/image/cut/clearHover.png')
            },
            mouseleaveClear(){
                if(!this.isChooseClear){
                    this.isHoverClear = false;
                    this.clearImg = require('../../assets/image/cut/clear.png')
                }
            },
            mouseoverReserved(){
                this.isHoverReserved = true;
            },
            mouseleaveReserved(){
                if(!this.isChooseReserved){
                    this.isHoverReserved = false;
                }
            },
            mouseoverNotReserved(){
                this.isHoverNotReserved = true;
            },
            mouseleaveNotReserved(){
                if(!this.isChooseNotReserved){
                    this.isHoverNotReserved = false;
                }
            },
            chooseReserved(){
                this.clearChoose();
                this.isChooseReserved = true;
            },
            chooseNotReserved(){
                this.clearChoose();
                this.isChooseNotReserved = true;
            },
            chooseClear(){
                this.clearChoose();
                this.isChooseClear = true;
            },
            doDraw(){
                let self = this;
                //  获取canvas
                var canvas = document.getElementById("mycanvas")
                //  由于弹窗，确保已获取到
                var a = setInterval(() =>{
                    //  重复获取
                    canvas = document.getElementById("mycanvas")
                    if(!canvas){
                        return false
                    } else {
                        clearInterval(a)
                        //  可以理解为一个画笔，可画路径、矩形、文字、图像
                        var context = canvas.getContext('2d')
                        var img = new Image()
                        img.src = this.imgPath
                        var bg = document.getElementById('oldImgBg')
                        //  加载图片
                        img.onload = function(){
                            if(img.complete){
                                //  根据图像重新设定了canvas的长宽
                                canvas.setAttribute("width",bg.offsetWidth)
                                canvas.setAttribute("height",bg.offsetHeight)
                                if(img.width>img.height){
                                    self.zoom = Math.floor(521/img.width*100)
                                }else{
                                    self.zoom = Math.floor(521/img.height*100)
                                }
                                //  绘制图片
                                self.canvasLeft = (bg.offsetWidth-img.width*self.zoom/100)/2;
                                self.canvasTop = 0;
                                context.drawImage(img,self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                                self.canvasOld = canvas;
                                self.canvasOldContext = context;
                                self.img = img;
                            }
                        }
                    }
                },1)
            },
            doDrawResult(){
                //  获取canvas
                var canvas = document.getElementById("mycanvasResult")
                //  由于弹窗，确保已获取到
                var a = setInterval(() =>{
                    //  重复获取
                    canvas = document.getElementById("mycanvasResult")
                    if(!canvas){
                        return false
                    } else {
                        clearInterval(a)
                        //  可以理解为一个画笔，可画路径、矩形、文字、图像
                        var context = canvas.getContext('2d')
                        var img = new Image()
                        img.src = this.imgPath
                        var bg = document.getElementById('imgResult')
                        //  加载图片
                        img.onload = function(){
                            if(img.complete){
                                //  根据图像重新设定了canvas的长宽
                                canvas.setAttribute("width",bg.offsetWidth)
                                canvas.setAttribute("height",bg.offsetHeight)
                                if(img.width>img.height){
                                    self.zoom = Math.floor(521/img.width*100)
                                }else{
                                    self.zoom = Math.floor(521/img.height*100)
                                }
                                //  绘制图片
                                self.canvasLeft = (bg.offsetWidth-img.width*self.zoom/100)/2;
                                self.canvasTop = 0;
                                context.drawImage(img,self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                                self.canvasOld = canvas;
                                self.canvasOldContext = context;
                                self.img = img;
                            }
                        }
                    }
                },1)
            },
            //放大
            zoomBig(){
                var canvas = document.getElementById("mycanvas");
                var canvasResult = document.getElementById("mycanvasResult");
                //获取上下文
                var context = canvas.getContext("2d");
                var contextResult = canvasResult.getContext("2d");
                var bg = document.getElementById('oldImgBg')
                context.clearRect(this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                contextResult.clearRect(this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                this.zoom+=15;
                context.scale(1,1);
                contextResult.scale(1,1);
                // this.canvasLeft = (bg.offsetWidth-img.width*this.zoom/100)/2;
                // this.canvasTop = 0;
                 context.drawImage(this.img,this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                contextResult.drawImage(this.img,this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
            },
            //缩小
            zoomSmall(){
                var canvas = document.getElementById("mycanvas");
                var canvasResult = document.getElementById("mycanvasResult");
                //获取上下文
                var context = canvas.getContext("2d");
                var contextResult = canvasResult.getContext("2d");
                var bg = document.getElementById('oldImgBg')
                context.clearRect(this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                contextResult.clearRect(this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                if(this.zoom-15>=0){
                    this.zoom-=15
                } else if(this.zoom>1 && this.zoom-15<1){
                    this.zoom=1
                }
                context.scale(1,1);
                contextResult.scale(1,1);
                // this.canvasLeft = (bg.offsetWidth-img.width*this.zoom/100)/2;
                // this.canvasTop = 0;
                context.drawImage(this.img,this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
                contextResult.drawImage(this.img,this.canvasLeft,this.canvasTop,img.width*this.zoom/100,img.height*this.zoom/100);
            },
            //点击移动手势
            move(){
                this.isMove = !this.isMove;
            },
            startMove(e){
                this.oldClientX = e.clientX;
                this.oldClientY =e.clientY;
                if(this.isMove){
                    this.isStartMove = true;
                }else if(this.isChooseReserved){
                    this.isStartReserved = true
                }
            },
            moveCanvas(e){
                var canvas = document.getElementById("mycanvas");
                var canvasResult = document.getElementById("mycanvasResult");
                //获取上下文
                var context = canvas.getContext("2d");
                var contextResult = canvasResult.getContext("2d");
                var bg = document.getElementById('oldImgBg')
                let self = this;
                if(self.isStartMove){
                    context.clearRect(self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                    contextResult.clearRect(self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                    let x= e.clientX;
                    let y=e.clientY;
                    let moveX = e.clientX - self.oldClientX;
                    let moveY = e.clientY - self.oldClientY;
                    //  绘制图片
                    self.canvasLeft = self.canvasLeft+moveX;
                    self.canvasTop = self.canvasTop+moveY
                    context.drawImage(self.img,self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                    contextResult.drawImage(self.img,self.canvasLeft,self.canvasTop,img.width*self.zoom/100,img.height*self.zoom/100);
                    self.oldClientX = e.clientX;
                    self.oldClientY = e.clientY;
                } else if(self.isStartReserved){
                    let x= e.clientX;
                    let y=e.clientY;
                    //由于clientX是相对于浏览器，所以要减去顶部的高度
                    context.moveTo(self.oldClientX,self.oldClientY-297)
                    context.lineTo(e.clientX,e.clientY-297)
                    context.strokeStyle = "red"
                    context.lineWidth = 3;
                    context.stroke()
                    self.oldClientX = e.clientX;
                    self.oldClientY = e.clientY;
                }
            },
            endMove(e){
                if(this.isMove){
                    this.isStartMove = false;
                }else if(this.isChooseReserved){
                    this.isStartReserved = false
                }
            },
            startChangePenSize(e){
                this.isStartChangePenSize = true;
                this.oldPenX = e.clientX;
            },
            endChangePenSize(){
                this.isStartChangePenSize = false;
            },
            changePenSize(e){
                console.log(this.isStartChangePenSize)
                let self = this
                if(self.isStartChangePenSize){
                    let x= e.clientX;
                    let moveX = e.clientX - self.oldPenX;
                    self.penSize = (224/50*self.penSize+moveX)*50/224
                }
            }
        },
        mounted(){
            this.imgPath = localStorage.getItem('ktImgPath')
            this.doDraw();
            this.doDrawResult();
        }
    }
</script>

<style scoped>
    .headerMouseMove{
        /*cursor: url('../../assets/image/cut/headerHand.png'),auto !important;*/
        cursor: -webkit-grab !important;
    }
    .cutout{
        background: #E7E8E9;
        width: 100%;
        min-width: 1200px;
        height: calc(100vh);
        position: relative;
    }
    .header{
        width: 100%;
        height: 85px;
        background-color: #fff;
        text-align: center;
    }
    .headerContent{
        display: flex;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
    }
    .headerBack{
        width: 24.1px;
        height: auto;
        position: relative;
        margin-left: 29px;
        cursor: pointer;
    }
    .headerNext{
        width: 24.1px;
        height: auto;
        position: relative;
        transform: rotateY(180deg);
        margin-left: 63.6px;
        cursor: pointer;
    }
    .splitLine{
        width: 1px;
        height: 40px;
        position: relative;
        background-color: #CAC9C9;
        margin-left: 49.6px;
    }
    .zoom{
        width: 20px;
        height: auto;
        margin-left: 50px;
        cursor: pointer;
    }
    .zoomBig{
        margin-left: 0px !important;
    }
    .zoomNum{
        width: 162px;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333
    }
    .mouseTipSplitLine{
        margin-left: 60px !important;
    }
    .handBtn{
        width: 18px;
        height: auto;
        position: relative;
        margin-left: 162px;
        cursor: pointer;
    }
    .headerBtn{
        display: flex;
        margin-left: 165.5px;
    }
    .headerCancel{
        width: 163.5px;
        height: 100%;
        line-height: 85px;
        border-left:1px solid #CBCBCB;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        cursor: pointer;
    }
    .headerCancel:hover{
        background-color: #eee;
    }
    .headerSave{
        width: 183px;
        height: 100%;
        line-height: 85px;
        background: #FFE300;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        cursor: pointer;
    }
    .headerSave:hover{
        background-color: #ffd000;
    }
    .headerSave img{
        width: 16px;
        height: 11px;
        margin-right: 16px;
    }
    .imgTip{
        display: flex;
        margin: 58px auto 50px;
        text-align: center;
        align-items: center;
        vertical-align: middle;
        width: 100%;
        min-width: 1200px;
    }
    .oleImgTip{
        background: #5C5D5D;
        width: 60px;
        height: 34px;
        line-height: 34px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: rgba(255,255,255,0.85);
        margin: 0 auto;
    }
    .oldImgArea{
        width: 50%;
        height: auto;
    }
    .newImgArea{
        /*margin-left: 9.94rem;*/
    }
    .imgContent{
        width: 100%;
        min-width: 1200px;
        margin: 40px auto 0px;
        display: flex;
    }
    .oldImg{
        width: 521px;
        height: 521px;
        display: flex;
        align-items: center;
        vertical-align: middle;
        overflow: hidden;
    }
    .newImg{
        margin-left: 9.94rem;
        /*background-image: url("../../assets/image/cut/newImgBg.png");*/
    }
    .oldImg canvas{
        margin: 0 auto;
    }
    .bottomArea{
        width: 1200px;
        margin-left: calc(100vw / 2 - 600px) ;
        position:fixed;
        bottom: 20px;
        display: flex;
        /*margin: 0 auto;*/
    }
    .reserved{
        width: 122px;
        height: 76px;
        line-height: 76px;
        text-align: center;
        background: #FFFFFF;
        border-radius: 4px;
        display: flex;
        align-items: center;
        vertical-align: middle;
        cursor: pointer;
    }
    .reservedText{
        margin-left: 16px;
        font-size: 20px;
    }
    .reservedLogoBg{
        width: 12px;
        height: 12px;
        border-radius: 50px;
        border: 7px solid #0057FF;
        margin-left: 18px;
    }
    .noeReserved{
        margin-left: 129px;
    }
    .notReservedLogoBg{
        width: 30px;
        height: 10px;
        background: #F30202;
        border-radius: 9px;
        margin-left: 21px;
    }
    .penArea{
        width: 434px;
        height: 76px;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 4px;
        margin-left: 129px;
        position: relative;
    }
    .penArea img{
        cursor: pointer;
    }
    .penText{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        margin-left: 22px;
    }
    .penLengthBg{
        width: 224px;
        height: 4px;
        background: #BEBEBE;
        border-radius: 6px;
        margin-left: 20px;
    }
    .penLength{
        position: relative;
        margin-left: -224px;
        background: #FFE300;
    }
    .penBtn {
        width: 16px;
    }
    .penNum{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        position: absolute;
        right: 21px;
    }
    .clear{
        margin-left: 113px;
    }
    .clearBtn{
        margin-left: 24px;
        width: 26px;
        height: auto;
    }

</style>