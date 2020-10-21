<template>
    <div class="cutout"  @mouseup="endMove($event)">
        <!--顶部导航栏-->
        <Tab @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <!--顶部操作栏-->
        <div class="header">
            <div class="headerContent">
                <!--返回按钮-->
                <img class="headerBack" :src="headerBackImg" @mouseover="mouseoverHeaderBack" @mouseleave="mouseleaveHeaderBack" @click="headerBack"/>
                <img class="headerNext" :src="headerNextImg" @mouseover="mouseoverHeaderNext" @mouseleave="mouseleaveHeaderNext" @click="headerNext"/>
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
                <div class="oleImgTip" @click="countPoints">原图</div>
            </div>
            <div class="oldImgArea newImgArea">
                <div class="oleImgTip newImgTip">效果</div>
            </div>
        </div>
        <div :class="{imgContent:true,headerMouseMove:isMove}" id="imgContent"  :style="{cursor:isMove==true?'url('+headerHandImg+')':'default'}">
            <!--原图-->
            <div class="oldImg" id="oldImgBg"  :style="{width: 'calc(50vw)',height: 'calc( 100vh - 297px)'}" @mousedown="startMove($event)" @mousemove="moveCanvas($event)">
                <!--<img style="width:auto;height:auto;max-width: 521px;max-height: 500px" :src="imgPath"/>-->
                <canvas id="mycanvas"></canvas>
                <canvas id="mycanvaspen" ></canvas>
            </div>
            <div class="oldImg" id="imgResult"   :style="{width: 'calc(50vw)',height: 'calc( 100vh - 297px)'}">
                <canvas id="mycanvasResult"></canvas>
            </div>
        </div>
        <!--底部按钮-->
        <div class="bottomArea">
            <!--保留按钮-->
            <div class="reserved"  @mouseover="mouseoverReserved" @mouseleave="mouseleaveReserved" @click="chooseReserved" :style="{background: isChooseReserved||isHoverReserved?'#FFE300':'#fff'}">
                <div class="reservedText">保留</div><div class="reservedLogoBg" :style="{borderColor:isHoverReserved||isChooseReserved?'#fff':'#0057FF'}"></div>
            </div>
            <!--祛除按钮-->
            <div class="reserved noeReserved"   @mouseover="mouseoverNotReserved" @mouseleave="mouseleaveNotReserved"  @click="chooseNotReserved"  :style="{background: isChooseNotReserved||isHoverNotReserved?'#FFE300':'#fff'}">
                <div class="reservedText">祛除</div><div class="notReservedLogoBg" :style="{backgroundColor:isHoverNotReserved||isChooseNotReserved?'#fff':'#F30202'}"></div>
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
                //是否开始擦除
                isStartClear:false,
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
                penSize:3,
                //是否开始调整画笔大小
                isStartChangePenSize:false,
                oldPenX:0,
                oldPenY:0,
                //画笔的点
                penPoints:[],
                //撤回的线
                penBackPoints:[],
                //橡皮擦的点
                clearPoints:[],
                //第几次画橡皮擦
                clearNum:-1,
                //第几次画线
                penNum:-1,
                //每次画的是线还是橡皮
                penType:[],
                //每次撤回的是线还是橡皮
                penBackType:[],
                resultPenPoints:[]
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
                this.isStartClear = false;
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
                this.mouseleaveClear();
            },
            chooseNotReserved(){
                this.clearChoose();
                this.isChooseNotReserved = true;
                this.mouseleaveClear();
            },
            chooseClear(){
                this.clearChoose();
                this.isChooseClear = true;
            },
            doDraw(){
                let self = this;
                //  获取canvas
                var canvas = document.getElementById("mycanvas")
                var canvaspen = document.getElementById("mycanvaspen")
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
                                canvas.width = bg.offsetWidth;
                                canvas.height = bg.offsetHeight;
                                canvaspen.setAttribute("width",bg.offsetWidth)
                                canvaspen.setAttribute("height",bg.offsetHeight)
                                canvaspen.width = bg.offsetWidth;
                                canvaspen.height = bg.offsetHeight;
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
                                self.penSize = Math.floor(3/self.zoom*100);
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
            draw(){
                //清除画布
                var canvas = document.getElementById("mycanvas");
                var canvaspen = document.getElementById("mycanvaspen");
                //清除画上去的线
                canvas.width=canvas.width;
                canvaspen.width=canvaspen.width;
                var canvasResult = document.getElementById("mycanvasResult");
                //获取上下文
                var context = canvas.getContext("2d");
                var contextpen = canvaspen.getContext("2d");
                var contextResult = canvasResult.getContext("2d");
                var bg = document.getElementById('oldImgBg')
                context.clearRect(0,0,bg.offsetWidth,bg.offsetHeight);
                contextpen.clearRect(0,0,bg.offsetWidth,bg.offsetHeight);
                contextResult.clearRect(0,0,bg.offsetWidth,bg.offsetHeight);
                context.scale(1,1);
                contextpen.scale(1,1);
                contextResult.scale(1,1);
                // this.canvasLeft = (bg.offsetWidth-img.width*this.zoom/100)/2;
                // this.canvasTop = 0;
                context.drawImage(this.img,this.canvasLeft,this.canvasTop,this.img.width*this.zoom/100,this.img.height*this.zoom/100);
                contextResult.drawImage(this.img,this.canvasLeft,this.canvasTop,this.img.width*this.zoom/100,this.img.height*this.zoom/100);
                //把线和橡皮擦按顺序画回去
                let penNum=0;
                let clearNum=0;
                if(this.penType.length>0){
                    this.penType.forEach(list => {
                        //如果是画笔
                        if(list=='pen'){
                            let penDetail = this.penPoints[penNum];
                            if(penDetail!=undefined){
                                contextpen.beginPath();
                                contextpen.moveTo(this.canvasLeft+penDetail[0].x*this.zoom/100, this.canvasTop+penDetail[0].y*this.zoom/100);
                                for (let i = 1; i < penDetail.length; i++) {
                                    let item = penDetail[i];
                                    contextpen.lineTo(this.canvasLeft+item.x*this.zoom/100, this.canvasTop+item.y*this.zoom/100);
                                }
                                contextpen.strokeStyle = "#0057FF"
                                contextpen.lineWidth = Math.floor(this.penSize * this.zoom/100);
                                contextpen.stroke();
                            }
                            penNum+=1;
                        }else{
                            let clearDetail = this.clearPoints[clearNum];
                            contextpen.beginPath();
                            contextpen.moveTo(this.canvasLeft+clearDetail[0].x*this.zoom/100, this.canvasTop+clearDetail[0].y*this.zoom/100);
                            for (let i = 1; i < clearDetail.length; i++) {
                                let item = clearDetail[i];
                                // contextpen.clearRect(this.canvasLeft+item.x*this.zoom/100,this.canvasTop+item.y*this.zoom/100,Math.floor(this.penSize*this.zoom/100),Math.floor(this.penSize*this.zoom/100));
                                contextpen.save()
                                contextpen.beginPath();
                                contextpen.arc(this.canvasLeft+item.x*this.zoom/100,this.canvasTop+item.y*this.zoom/100,Math.floor(this.penSize * this.zoom/100)/2,0,2*Math.PI);
                                contextpen.clip()
                                contextpen.clearRect(0,0,canvaspen.width,canvaspen.height);
                                contextpen.restore();
                                clearNum+=1;
                            }
                        }
                    })
                }
            },
            //放大
            zoomBig(){
                this.zoom+=15;
                this.draw();
            },
            //缩小
            zoomSmall(){
                if(this.zoom-15>=0){
                    this.zoom-=15
                } else if(this.zoom>1 && this.zoom-15<1){
                    this.zoom=1
                }
                // var bg = document.getElementById('oldImgBg')
                // this.canvasLeft = (bg.offsetWidth-this.img.width*this.zoom/100)/2;
                // this.canvasTop = 0;
                this.draw();
            },
            //点击移动手势
            move(){
                this.clearChoose();
                this.isMove = !this.isMove;
                this.mouseleaveClear()
            },
            startMove(e){
                this.oldClientX = e.clientX;
                this.oldClientY =e.clientY;
                if(this.isMove){
                    this.isStartMove = true;
                }else if(this.isChooseReserved){
                    this.isStartReserved = true
                    this.penNum+=1;
                    this.penType[this.penType.length] = 'pen';
                    var canvas = document.getElementById("mycanvaspen");
                    //获取上下文
                    var context = canvas.getContext("2d");
                    let self = this;
                    let x= e.clientX;
                    let y=e.clientY;
                    if((e.clientX >= self.canvasLeft && e.clientX <= self.canvasLeft+self.img.width*self.zoom/100)
                        && (e.clientY-297 >= self.canvasTop && e.clientY-297 <= self.canvasTop+self.img.height*self.zoom/100)){
                        //由于clientX是相对于浏览器，所以要减去顶部的高度
                        context.beginPath();
                        context.moveTo(self.oldClientX,self.oldClientY-297)
                    }
                }else if(this.isChooseClear){
                    this.isStartClear=true
                    this.clearNum+=1;
                    this.penType[this.penType.length] = 'clear';
                    var canvas = document.getElementById("mycanvaspen");
                    //获取上下文
                    var context = canvas.getContext("2d");
                    let self = this;
                    let x= e.clientX;
                    let y=e.clientY;
                    if((e.clientX >= self.canvasLeft && e.clientX <= self.canvasLeft+self.img.width*self.zoom/100)
                        && (e.clientY-297 >= self.canvasTop && e.clientY-297 <= self.canvasTop+self.img.height*self.zoom/100)){
                        //由于clientX是相对于浏览器，所以要减去顶部的高度
                        context.beginPath();
                        context.moveTo(self.oldClientX,self.oldClientY-297)
                    }
                }
            },
            moveCanvas(e){
                var canvas = document.getElementById("mycanvas");
                var canvaspen = document.getElementById("mycanvaspen");
                var canvasResult = document.getElementById("mycanvasResult");
                //获取上下文
                var context = canvas.getContext("2d");
                var contextpen = canvaspen.getContext("2d");
                var contextResult = canvasResult.getContext("2d");
                var bg = document.getElementById('oldImgBg')
                let self = this;
                //移动画布
                if(self.isStartMove){
                    context.clearRect(0,0,bg.offsetWidth,bg.offsetHeight);
                    //清除画上去的线
                    canvas.width=canvas.width;
                    canvaspen.width=canvaspen.width;
                    contextResult.clearRect(0,0,bg.offsetWidth,bg.offsetHeight);
                    let x= e.clientX;
                    let y=e.clientY;
                    let moveX = e.clientX - self.oldClientX;
                    let moveY = e.clientY - self.oldClientY;
                    //  绘制图片
                    self.canvasLeft = self.canvasLeft+moveX;
                    self.canvasTop = self.canvasTop+moveY
                    context.drawImage(self.img,self.canvasLeft,self.canvasTop,self.img.width*self.zoom/100,self.img.height*self.zoom/100);
                    contextResult.drawImage(self.img,self.canvasLeft,self.canvasTop,self.img.width*self.zoom/100,self.img.height*self.zoom/100);
                    //把线和橡皮擦按顺序画回去
                    let penNum=0;
                    let clearNum=0;
                    if(self.penType.length>0){
                        self.penType.forEach(list => {
                            //如果是画笔
                            if(list=='pen'){
                                let penDetail = self.penPoints[penNum];
                                if(penDetail!=undefined){
                                    contextpen.beginPath();
                                    contextpen.moveTo(self.canvasLeft+penDetail[0].x*self.zoom/100, self.canvasTop+penDetail[0].y*self.zoom/100);
                                    for (let i = 1; i < penDetail.length; i++) {
                                        let item = penDetail[i];
                                        contextpen.lineTo(self.canvasLeft+item.x*self.zoom/100, self.canvasTop+item.y*self.zoom/100);
                                    }
                                    contextpen.strokeStyle = "#0057FF"
                                    contextpen.lineWidth = Math.floor(self.penSize * self.zoom/100);
                                    contextpen.stroke();
                                }
                                penNum+=1;
                            }else{
                                let clearDetail = self.clearPoints[clearNum];
                                contextpen.beginPath();
                                contextpen.moveTo(self.canvasLeft+clearDetail[0].x*self.zoom/100, self.canvasTop+clearDetail[0].y*self.zoom/100);
                                for (let i = 1; i < clearDetail.length; i++) {
                                    let item = clearDetail[i];
                                    // contextpen.clearRect(self.canvasLeft+item.x*self.zoom/100,self.canvasTop+item.y*self.zoom/100,Math.floor(self.penSize*self.zoom/100),Math.floor(self.penSize*self.zoom/100));
                                    contextpen.save()
                                    contextpen.beginPath();
                                    contextpen.arc(self.canvasLeft+item.x*self.zoom/100,self.canvasTop+item.y*self.zoom/100,Math.floor(self.penSize * self.zoom/100)/2,0,2*Math.PI);
                                    contextpen.clip()
                                    contextpen.clearRect(0,0,canvaspen.width,canvaspen.height);
                                    contextpen.restore();
                                    clearNum+=1;
                                }
                            }
                        })
                    }
                    self.oldClientX = e.clientX;
                    self.oldClientY = e.clientY;
                } else if(self.isStartReserved){
                    //画线
                    let x= e.clientX;
                    let y=e.clientY;
                    if((e.clientX >= self.canvasLeft && e.clientX <= self.canvasLeft+self.img.width*self.zoom/100)
                        && (e.clientY-297 >= self.canvasTop && e.clientY-297 <= self.canvasTop+self.img.height*self.zoom/100)){

                        if((self.oldClientX < self.canvasLeft || self.oldClientX > self.canvasLeft+self.img.width*self.zoom/100)
                            || (self.oldClientY-297 < self.canvasTop || self.oldClientY-297 > self.canvasTop+self.img.height*self.zoom/100)){
                            contextpen.beginPath();
                            contextpen.moveTo(e.clientX,e.clientY-297)
                            self.penNum+=1;
                            self.penType[self.penType.length] = 'pen';
                        }
                        self.oldClientX = e.clientX;
                        self.oldClientY = e.clientY;
                        //由于clientX是相对于浏览器，所以要减去顶部的高度
                        contextpen.lineTo(e.clientX,e.clientY-297)
                        contextpen.strokeStyle = "#0057FF"
                        contextpen.lineWidth = Math.floor(self.penSize*self.zoom/100);
                        contextpen.stroke()
                        let pointX = self.oldClientX - self.canvasLeft;
                        let pointY = self.oldClientY - self.canvasTop-297;
                        //记录点
                        let penPoint=[]
                        let pointDetail={}
                        pointDetail.x = Math.floor(pointX/self.zoom*100)
                        pointDetail.y = Math.floor(pointY/self.zoom*100);
                        if(self.penPoints[self.penNum]){
                            penPoint = self.penPoints[self.penNum];
                        }
                        penPoint.push(pointDetail)
                        self.penPoints[self.penNum] = penPoint
                        //清掉撤销过的线
                        self.penBackPoints=[]
                    }
                    self.oldClientX = e.clientX;
                    self.oldClientY = e.clientY;
                } else if(self.isStartClear){
                    //画橡皮擦线
                    let x= e.clientX;
                    let y=e.clientY;
                    let length = Math.sqrt((x-self.oldClientX)*(x-self.oldClientX)+(y-self.oldClientY)*(y-self.oldClientY))
                    //如果两个点超过了画笔宽度，则把中间的点也画上
                    if(length>Math.floor(self.penSize)/3*zoom/100){
                        let sin = (y-self.oldClientY)/length;
                        let cos = (x-self.oldClientX)/length;
                        for(var i=1;i<=length;i++){
                            let pointDetail ={}
                            pointDetail.x = self.oldClientX  + i*cos;
                            pointDetail.y = self.oldClientY  + i*sin;
                            if((pointDetail.x >= self.canvasLeft && pointDetail.x <= self.canvasLeft+self.img.width*self.zoom/100)
                                && (pointDetail.y-297 >= self.canvasTop && pointDetail.y-297 <= self.canvasTop+self.img.height*self.zoom/100)){
                                if((pointDetail.x < self.canvasLeft || pointDetail.x > self.canvasLeft+self.img.width*self.zoom/100)
                                    || (pointDetail.y-297 < self.canvasTop || pointDetail.y-297 > self.canvasTop+self.img.height*self.zoom/100)){
                                    contextpen.moveTo(pointDetail.x,pointDetail.y-297)
                                    self.clearNum+=1;
                                    self.penType[self.penType.length] = 'clear';
                                }
                                //由于clientX是相对于浏览器，所以要减去顶部的高度
                                contextpen.save()
                                contextpen.beginPath();
                                contextpen.arc(pointDetail.x,pointDetail.y-297,Math.floor(self.penSize * self.zoom/100)/2,0,2*Math.PI);
                                contextpen.clip()
                                contextpen.clearRect(0,0,canvaspen.width,canvaspen.height);
                                contextpen.restore();
                                let pointX = pointDetail.x - self.canvasLeft;
                                let pointY = pointDetail.y - self.canvasTop-297;
                                //记录点
                                let clearPoint=[]
                                let pointDetailChange={}
                                pointDetailChange.x = Math.floor(pointX/self.zoom*100)
                                pointDetailChange.y = Math.floor(pointY/self.zoom*100);
                                if(self.clearPoints[self.clearNum]){
                                    clearPoint = self.clearPoints[self.clearNum];
                                }
                                clearPoint.push(pointDetailChange)
                                self.clearPoints[self.clearNum] = clearPoint
                                //清掉撤销过的线
                                //self.penBackPoints=[]
                            }
                        }

                    }
                    if((e.clientX >= self.canvasLeft && e.clientX <= self.canvasLeft+self.img.width*self.zoom/100)
                        && (e.clientY-297 >= self.canvasTop && e.clientY-297 <= self.canvasTop+self.img.height*self.zoom/100)){
                        if((self.oldClientX < self.canvasLeft || self.oldClientX > self.canvasLeft+self.img.width*self.zoom/100)
                            || (self.oldClientY-297 < self.canvasTop || self.oldClientY-297 > self.canvasTop+self.img.height*self.zoom/100)){
                            contextpen.moveTo(e.clientX,e.clientY-297)
                            self.clearNum+=1;
                            self.penType[self.penType.length] = 'clear';
                        }
                        //由于clientX是相对于浏览器，所以要减去顶部的高度
                        contextpen.save()
                        contextpen.beginPath();
                        contextpen.arc(e.clientX,e.clientY-297,Math.floor(self.penSize*self.zoom/100)/2,0,2*Math.PI);
                        contextpen.clip()
                        contextpen.clearRect(0,0,canvaspen.width,canvaspen.height);
                        contextpen.restore();
                        let pointX = self.oldClientX - self.canvasLeft;
                        let pointY = self.oldClientY - self.canvasTop-297;
                        //记录点
                        let clearPoint=[]
                        let pointDetail={}
                        pointDetail.x = Math.floor(pointX/self.zoom*100)
                        pointDetail.y = Math.floor(pointY/self.zoom*100);
                        if(self.clearPoints[self.clearNum]){
                            clearPoint = self.clearPoints[self.clearNum];
                        }
                        clearPoint.push(pointDetail)
                        self.clearPoints[self.clearNum] = clearPoint
                        //清掉撤销过的线
                        self.penBackPoints=[]
                    }

                    self.oldClientX = e.clientX;
                    self.oldClientY = e.clientY;
                }
            },
            endMove(e){
                if(this.isMove){
                    this.isStartMove = false;
                }else if(this.isChooseReserved){
                    this.isStartReserved = false
                }else if(this.isChooseClear){
                    this.isStartClear=false
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
                let self = this
                if(self.isStartChangePenSize){
                    let x= e.clientX;
                    let moveX = e.clientX - self.oldPenX;
                    self.penSize = (224/50*self.penSize+moveX)*50/224
                }
            },
            headerBack(){
                let penPoints=[]
                if(this.penType.length>0){
                    if(this.penType[this.penType.length-1]=='pen'){
                        for(var i=0;i<this.penPoints.length-1;i++){
                            penPoints.push(this.penPoints[i])
                        }
                        this.penBackPoints.push(this.penPoints[this.penPoints.length-1])
                        this.penNum-=1;
                        this.penPoints = penPoints;
                    }else{
                        for(var i=0;i<this.clearPoints.length-1;i++){
                            penPoints.push(this.clearPoints[i])
                        }
                        this.penBackPoints.push(this.clearPoints[this.clearPoints.length-1])
                        this.clearNum-=1;
                        this.clearPoints = penPoints;
                    }
                    this.penBackType.push(this.penType[this.penType.length-1])
                    this.penType.pop();
                    this.draw();
                }
            },
            headerNext(){
                let penBackPoints=[];
                if(this.penBackType.length>0){
                    if(this.penBackType[this.penBackType.length-1]=='pen'){
                        for(var i=0;i<this.penBackPoints.length-1;i++){
                            penBackPoints.push(this.penBackPoints[i])
                        }
                        this.penPoints.push(this.penBackPoints[this.penBackPoints.length-1])
                        this.penBackPoints = penBackPoints;
                        this.penNum+=1;
                    }else{
                        for(var i=0;i<this.penBackPoints.length-1;i++){
                            penBackPoints.push(this.penBackPoints[i])
                        }
                        this.clearPoints.push(this.penBackPoints[this.penBackPoints.length-1])
                        this.penBackPoints = penBackPoints;
                        this.clearNum+=1;
                    }
                    this.penType.push(this.penBackType[this.penBackType.length-1])
                    this.penBackType.pop();
                    this.draw();
                }
            },
            clearLine(){
                //判断橡皮擦的点是否擦到了画的线
                let pointX = self.oldClientX - self.canvasLeft;
                let pointY = self.oldClientY - self.canvasTop-297;
                //记录点
                let penPoint=[]
                let pointDetail={}
                pointDetail.x = Math.floor(pointX/self.zoom*100)
                pointDetail.y = Math.floor(pointY/self.zoom*100);
                let index = JSON.stringify(self.penPoints).indexOf(JSON.stringify(pointDetail))
                if(index>-1){
                    let size = 0
                    for (var i=0;i<self.penPoints.length;i++){
                        size+=self.penPoints[i].length;
                        if(size>=index){
                            size-=self.penPoints[i].length;
                            let penDetail=[]
                            for(var j=0;j<self.penPoints[i].length;j++){
                                if(j!=index-size){
                                    penDetail   .push(self.penPoints[i][j])
                                }
                            }
                            self.penPoints[i] = penDetail;
                            break;
                        }
                    }
                }
            },
            //计算最后的点
            countPoints(){
                this.resultPenPoints = this.penPoints;
                console.log(this.resultPenPoints);
                console.log(this.clearPoints)
                let clearNum=-1;
                this.penType.forEach((item,index) => {
                    let penNum=-1;
                    if(item=='clear'){
                        clearNum+=1;
                        let typeIndex = index;
                        let penIndex = typeIndex;
                        //如果橡皮擦不在第一位，则把前面的画笔中的点擦掉
                        while(typeIndex>0){
                            if(this.penType[penIndex-typeIndex]=='pen' && this.resultPenPoints.length>0){
                                console.log(this.resultPenPoints)
                                penNum+=1;
                                let penDetail=[]
                                for(var i=0;i<this.resultPenPoints[penNum].length;i++){
                                    let item = this.resultPenPoints[penNum][i];
                                    if(item!=undefined){
                                        let num = 0;
                                        this.clearPoints[clearNum].forEach(clearItem => {
                                            if(Math.sqrt((item.x-clearItem.x)*(item.x-clearItem.x)+(item.y-clearItem.y)*(item.y-clearItem.y))<=Math.floor(this.penSize * this.zoom/100)/2){
                                                num+=1;
                                                return;
                                            }
                                        })
                                        if(num==0){
                                            penDetail.push(item)
                                        }
                                    }
                                }
                                // this.resultPenPoints[penNum].forEach(item => {
                                //
                                // })
                                console.log(penDetail)
                                if(penDetail!=[] && penDetail !=undefined){
                                    this.resultPenPoints[penNum] = penDetail;
                                }else{
                                    this.resultPenPoints.splice(penNum,1)
                                }
                            }
                            typeIndex-=1;
                        }
                    }
                })
                console.log('---')
                console.log(this.resultPenPoints);
                console.log(this.clearPoints)
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
        background-image: url("../../assets/image/cut/newImgBg.png");
        position: relative;
    }
    .newImg{
        margin-left: 9.94rem;
        /*background-image: url("../../assets/image/cut/newImgBg.png");*/
    }
    .oldImg canvas{
        position: absolute;
        top:0px;
        left: 0px;
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