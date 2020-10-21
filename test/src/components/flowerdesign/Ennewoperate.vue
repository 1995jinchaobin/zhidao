<template>
    <div class="newoperate">
        <!-- 花型设计 -->
        <Entab @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="leftNav">
                <ul class="seleBox">
                    <li @click="changeMessage(index)" v-for="(item,index) in select" :key="index"><img class="seleImg" :src="item.image" alt=""><span class="seleName">{{item.name}}</span><span v-if="item.show&&showLeft" class="line"></span></li>
                </ul>
                <ul class="fixedList">
                    <li @click="look">
                        <img class="lookimg" src="../../assets/image/flower/icon_look.png" alt="">
                        <span>Preview</span>
                    </li>
                    <li @click="save" id="savetongji">
                        <img class="saveimg" src="../../assets/image/flower/icon_save.png" alt="">
                        <span>Save</span>
                    </li>
                    <li @click="clearCanvas">
                        <img class="deleteimg" src="../../assets/image/flower/icon_delete.png" alt="">
                        <span>Clearcanvas</span>
                    </li>
                </ul>
            </div>
            <div class="addBox" :style="{left: moveLeft}" v-if="showLeft">
                <div v-if="leftNav==0">
                    <ul class="topbtnList">
                        <li @click="topClick(index)" v-for="(item,index) in topBtn" :key="'btn'+index" :class="item.show?'click':''">{{item.name}}</li>
                    </ul>
                    <div v-if="showHot" class="classifyBox">
                        <div class="classify">
                            <span>Type</span>
                            <img src="../../assets/image/flower/icon_down.png" alt="">
                            <ul class="bigList">
                                <li v-for="(item,index) in classifyList.type" :key="'style'+index">
                                    <span :class="['specialSpan',item.active?'hoverSpan':'']" @click="clickType(index)">{{item.english}}</span>
                                    <p v-if="item.list.length" class="childBox">
                                        <span :class="listItem.active?'hoverSpan':''" @click="updateMessage(index,listIndex)" v-for="(listItem,listIndex) in item.list" :key="'list'+listIndex">{{listItem.english}}</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="classify">
                            <span>Style</span>
                            <img src="../../assets/image/flower/icon_down.png" alt="">
                            <ul class="bigList">
                                <li :class="item.active?'hoverSpan':''" @click="clickStyle(index)" v-for="(item,index) in classifyList.style" :key="'style'+index">{{item.english}}</li>
                            </ul>
                        </div>
                        <div class="classify special">
                            <span>{{hotName}}</span>
                            <img src="../../assets/image/flower/icon_down.png" alt="">
                            <ul class="bigList">
                                <li :class="item.show?'hoverSpan':''" @click="clickBtn(index)" v-for="(item,index) in classifyList.btn" :key="'btn'+index">{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <ul class="leftList" v-if="showHot&&proList.length">
                        <li @click="addList(index)" v-for="(item,index) in proList" :key="'pro'+index"><img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.pictureThumbnail" alt=""></li>
                    </ul>
                    <p class="noData" v-if="showHot&&!proList.length">No data</p>
                    <ul class="leftList" v-if="!showHot">
                        <li class="fileBox">
                            <input type="file" accept="image/*" multiple @change="add">
                            <img src="../../assets/image/flower/icon_add.png" alt="">
                            <span>Upload</span>
                        </li>
                        <li @click="addList(index)" v-for="(item,index) in mineList" :key="'pro'+index"><img :src="item.pictureThumbnail" alt=""></li>
                    </ul>
                </div>
                <div v-if="leftNav==1">
                    <ul class="topbtnList">
                        <li @click="topClick(index)" v-for="(item,index) in topBtn" :key="'btn'+index" :class="item.show?'click':''">{{item.name}}</li>
                    </ul>
                    <ul v-if="proList.length" class="backList" id="pattern">
                        <li @click="backClick(index)" v-for="(item,index) in proList" :key="'pro'+index"><img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.ossUrl+'?x-oss-process=image/resize,l_300'" alt=""><img v-if="item.show" class="trueImg" src="../../assets/image/flower/true.png" alt=""></li>
                    </ul>
                    <p class="noData" v-if="!proList.length">No data</p>
                </div>
                <div v-if="leftNav==2">
                    <ul class="topbtnList">
                        <li @click="topClick(index)" v-for="(item,index) in topBtn" :key="'btn'+index" :class="item.show?'click':''">{{item.name}}</li>
                    </ul>
                    <div v-if="!showMore">
                        <div class="bigmoreBox" v-for="(topItem,topIndex) in classifyList.styleList" :key="'more'+topIndex">
                            <div class="moreBox">
                                <span>{{topItem.name}}</span>
                                <p @click="moreClick(topIndex)"><span>More</span><img src="../../assets/image/flower/icon_left.png" alt=""></p>
                            </div>
                            <ul class="backList">
                                <li @click="bottomClick(topIndex,index)" v-for="(item,index) in topItem.list" :key="'pro'+index"><img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'" alt=""><img v-if="item.show" class="trueImg" src="../../assets/image/flower/true.png" alt=""></li>
                            </ul>
                        </div>
                    </div>
                    <div class="smallmoreBox" v-if="showMore">
                        <div class="moreBox">
                            <p v-if="showMine" @click="back"><img src="../../assets/image/flower/icon_left.png" alt=""><span>{{styleName}}</span></p>
                        </div>
                        <ul class="backList">
                            <li class="fileBox" v-if="!showMine">
                                <input type="file" accept="image/*" multiple @change="add">
                                <img src="../../assets/image/flower/icon_add.png" alt="">
                                <span>Upload</span>
                            </li>
                            <li @click="bottomClick(index)" v-for="(item,index) in mineList" :key="'pro'+index"><img :height="item.width<=item.height?'80%':'auto'" :width="item.width>item.height?'80%':'auto'" :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'" alt=""><img v-if="item.show" class="trueImg" src="../../assets/image/flower/true.png" alt=""></li>
                        </ul>
                        <p class="noData" v-if="showMine&&!mineList.length">No data</p>
                    </div>
                </div>
                <div v-if="leftNav==3">
                    <ul class="topbtnList">
                        <li @click="topClick(index)" v-for="(item,index) in topBtn" :key="'btn'+index" :class="item.show?'click':''">{{item.name}}</li>
                    </ul>
                    <div class="inputBox">
                        <span :style="{background: '#'+message.color}" class="colorBack"></span>
                        <div class="rightInput">
                            <div class="rightinputBox">
                                <label for="">
                                    <span>R:</span>
                                    <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[0]" type="text">
                                </label>
                                <label for="">
                                    <span>C:</span>
                                    <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[0]" type="text">
                                </label>
                                <label for="">
                                    <span>H:</span>
                                    <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[0]" type="text">
                                </label>
                            </div>
                            <div class="rightinputBox">
                                <label for="">
                                    <span>G:</span>
                                    <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[1]" type="text">
                                </label>
                                <label for="">
                                    <span>M:</span>
                                    <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[1]" type="text">
                                </label>
                                <label for="">
                                    <span>S:</span>
                                    <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[1]" type="text">
                                </label>
                            </div>
                            <div class="rightinputBox">
                                <label for="">
                                    <span>B:</span>
                                    <input @keyup="rgbKey" @blur="enterRgb" v-on:keyup.enter="enterRgb" v-model="message.rgb[2]" type="text">
                                </label>
                                <label for="">
                                    <span>Y:</span>
                                    <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[2]" type="text">
                                </label>
                                <label for="">
                                    <span>V:</span>
                                    <input @blur="hsvtoRgb" v-on:keyup.enter="hsvtoRgb" @keyup="rgbKey" v-model="message.hsv[2]" type="text">
                                </label>
                            </div>
                            <div class="rightinputBox signBox">
                                <label for="">
                                    <span>#:</span>
                                    <input class="spelial" @blur="colortoRgb" v-on:keyup.enter="colortoRgb" v-model="message.color" type="text">
                                </label>
                                <label for="">
                                    <span>K:</span>
                                    <input @keyup="rgbKey" @blur="cmyktoRgb" v-on:keyup.enter="cmyktoRgb" v-model="message.cmyk[3]" type="text">
                                </label>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="pullBox">
                            <div class="lineBox">
                                <span>Hue</span>
                                <img src="../../assets/image/flower/icon_rgb.png" alt="">
                                <div class="line">
                                    <span :style="{left: (message.hue*310)+'px'}" @mousedown="colourPull($event,1)" @mouseup="colourPush"></span>
                                </div>
                            </div>
                            <div class="lineBox">
                                <span>Saturation</span>
                                <img src="../../assets/image/flower/icon_cmyk.png" alt="">
                                <div class="line">
                                    <span :style="{left: (message.saturation*310)+'px'}" @mousedown="colourPull($event,2)" @mouseup="colourPush"></span>
                                </div>
                            </div>
                            <div class="lineBox">
                                <span>Lightness</span>
                                <img src="../../assets/image/flower/icon_hsv.png" alt="">
                                <div class="line">
                                    <span :style="{left: (message.lightness*310)+'px'}" @mousedown="colourPull($event,3)" @mouseup="colourPush"></span>
                                </div>
                            </div>
                            <div class="specialLine">
                                <span>Threshold：{{message.threshold}}</span>
                                <div class="line">
                                    <div :style="{width: whiteWidth}"></div>
                                    <span @mousedown="thresholdPull($event)" @mouseup="thresholdPush"></span>
                                </div>
                            </div>
                        </div>
                        <button @click="exchange" class="exchange">Determine</button>
                        <ul v-if="colorList.length" class="colorList">
                            <li @click="changeColor(index)" v-for="(item,index) in colorList" :key="index" :class="item.show?'special':''" :style="{background: 'rgba('+item.r+','+item.g+','+item.b+','+item.alpha}"></li>
                        </ul>
                    </div>
                </div>
                <span class="loadSpan" v-if="showSpan">Data loading...</span>
                <p class="toTop" @click="toTop" v-if="showTop"><img src="../../assets/image/flower/icon_totop.png" alt=""></p>
                <p :style="{left: btnLeft}" @click="hiddenLeft(0)" class="hiddenBtn"><img src="../../assets/image/flower/icon_show.png" alt=""></p>
            </div>
            <div class="canvas">
                <img class="ruleImg" src="../../assets/image/flower/rule.png" alt="">
                <div class="canBigbox">
                    <img class="mould" :src="backImage" alt="">  
                    <div @mousedown="listPull(index,$event)" @mouseup="listPush" @click="proClick(index)" :style="{width: item.width*600/4724+'px',height:item.height*900/7087+'px','z-index': item.cnt,left: item.left,top: item.top,display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}" v-for="(item,index) in list" :key="index" :class="item.show?'specialList':'proList'">
                        <img :style="{width: item.width*600/4724+'px',height: item.height*900/7087+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :src="item.picture" alt="">
                    </div>
                </div>
            </div>
            <div class="operateBox">
                <ul class="bBox">
                    <li>
                        <img style="width: 1.25rem;" @click="backStep" src="../../assets/image/flower/back.png" alt="">
                        <span class="bOperate">Back step</span>
                    </li>
                    <li>
                        <img style="width: 1rem;" @click="levelClick" src="../../assets/image/flower/top.png" alt="">
                        <span class="bOperate">Horizontal</span>
                    </li>
                    <li>
                        <img style="width: 1.375rem;" @click="verticalClick" src="../../assets/image/flower/left.png" alt="">
                        <span class="bOperate">Vertical</span>
                    </li>
                    <li>
                        <img style="width: 1.125rem;" @click="smallClick" src="../../assets/image/flower/small.png" alt="">
                        <span class="bOperate">Zoom</span>
                        <div :style="{display: showSmall}" class="bScroll">
                            <div class="bigScroll">
                                <div :style="{width: smallLeft}" class="white"></div>
                                <input @keyup="inputScale" v-model="zoom" type="text">
                                <span :style="{left: smallLeft}" @mousedown="pull" @mouseup="push"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img style="width: 1.25rem;" @click="rotateClick" src="../../assets/image/flower/rotate.png" alt="">
                        <span class="bOperate">Rotate</span>
                        <input v-model="rotateDeg" @keyup="trueRotate" type="text" :style="{display: showRotate}" class="bInput" placeholder="Rotation">
                    </li>
                    <li>
                        <img style="width: 1.25rem;" @click="copy" src="../../assets/image/flower/copy.png" alt="">
                        <span class="bOperate">Copy</span>
                    </li>
                    <li>
                        <img style="width: 1.375rem;" @click="deleteCeng" src="../../assets/image/flower/cendel.png" alt="">
                        <span class="bOperate">Delete</span>
                    </li>
                </ul>
                <div class="oBox">
                    <p class="backWrite"></p>
                    <h4>Size<span>40*60CM 300DPI</span></h4>
                    <div class="backBox">
                        <div>
                            <span>Backcolor</span>
                            <img :src="backImg" alt="">
                        </div>
                        <img @click="delBack" src="../../assets/image/flower/cendel.png" alt="">
                    </div>
                    <ul class="levelBox" id="levelBox">
                        <li>
                            <div @click="seeAll" class="eyeBox">
                                <img v-if="showAll" class="eye" src="../../assets/image/flower/show.png" alt="">
                                <img v-else class="eye" src="../../assets/image/flower/hidden.png" alt="">
                            </div>
                            <div @click="downList" class="rightBox">
                                <div class="proBox">
                                    <img :style="{transform: showDown?'':'rotate(180deg)'}" class="downNav" src="../../assets/image/flower/down.png" alt="">
                                    <span>Group</span>
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
                <h3>Tigs</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>See way</span>
                <ul class="grabWay">
                    <li><button @click="wayClick(1)">Position</button></li>
                    <li><button @click="wayClick(2)">Step</button></li>
                </ul>
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
            <div class="grabBox">
                <h3>Tigs</h3>
                <p class="del" @click="delBig">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span class="specialSpan">Today's number of times has been exhausted,VIP unlimited use,whether to go to recharge VIP.</span>
                <ul class="grabWay">
                    <li><button @click="delBig">Cancel</button></li>
                    <li><button @click="bigSure">Determine</button></li>
                </ul>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '@/components/Entab';
import Jump from '@/components/Jump';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
export default {
    name: 'Threed',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            showJump: false,
            err: '',
            tabIndex: 2,
            showLoading: false,
            // 路径
            path: '/Ennewoperate',
            // 选择样式
            select: [{name: "Add",image: require('../../assets/image/flower/icon_source.png'),show: false},{name: "Pattern",image: require('../../assets/image/flower/icon_pattern.png'),show: false},{name: "Shading",image: require('../../assets/image/flower/icon_back.png'),show: false},{name: "Colour",image: require('../../assets/image/flower/icon_colour.png'),show: false}],
            list: [],
            rightList: [],
            firstList: [],
            // 存储每次操作保存的数据
            operateList: [],
            // 背景图
            backImg: require('../../assets/image/flower/backcolor.png'),
            backImage: require('../../assets/image/flower/can.png'),
            backId: '',
            // 连晒预览
            showLook: false,
            showGrab: false,
            showPic: false,
            picType: 0,
            picName: '',
            // 判断是否点击
            isClick: false,
            // 每日免费次数
            showBig: false,
            // 选择缩放以及旋转
            showSmall: 'none',
            showRotate: 'none',
            // 缩放
            zoom: '100%',
            smallLeft: '95px',
            // 旋转角度
            rotateDeg: '',
            count: 0,
            // 列表显示
            showDown: true,
            // 眼睛显示
            showAll: true,
            topBtn: [{name: 'Printing',show: true},{name: 'Embroidery',show: false},{name: 'Material',show: false}],
            classifyList: {
                type: [],
                style: [],
                btn: [{name: 'New',show: true},{name: 'Hot',show: false}],
                styleList: []
            },
            cnt: 1,
            mineCnt: 1,
            // 存储请求素材需要传入后台的信息
            // message: {},
            proList: [],
            mineList: [],
            // 点击左侧后操作列表
            showLeft: false,
            showHot: true,
            // 左侧按钮下标
            leftNav: -1,
            leftCnt: 1,
            // 上传图片列表
            url: [],
            // 背景头部信息
            styleCnt: 0,
            // 显示更多
            showMore: false,
            styleName: '',
            showMine: true,
            // 配色信息
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
            // 移动动画
            moveLeft: '100px',
            btnLeft: '472px',
            showSpan: false,
            whiteWidth: '20px',
            prevent: [],
            colorList: [],
            btnIndex: 0,
            hotName: 'New',
            // 页数
            pageNumber: '',
            rightNum: 0,
            moreIndex: 0,
            // 返回顶部按钮
            showTop: false,
            clock: null,
            classifyIndex: 1
        }
    },
    methods: {
        // 刷新
        changeEnglish(){
            this.$router.go(0);
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
        // 关闭弹窗
        delLook(){
            this.showLook = false;
            this.showGrab = false;
            this.showPic = false;
        },
        wayClick(index){
            var self = this;
            if(this.list.length){
                this.showGrab = false;
                this.showPic = true;
                if(index==1){
                    this.picType = 1;
                    this.picName = 'Position';
                }else if(index==2){
                    this.picType = 2;
                    this.picName = 'Step';
                }
            }else{
                this.delLook();
                this.showJump = true;
                this.err = 'Please add the material first';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
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
                // _czc.push(["_trackEvent","花型设计","保存","","","savetongji"]);
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
                            }
                        });
                    }else{
                        this.showBig = true;
                    }
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        newSave(str){
            let self = this;
            let formData = new FormData();
            formData.append('myStatus',1);
            formData.append('targetId',str);
            let arr = [];
            if(localStorage.getItem('specialType')==2){
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
                    this.err = 'Your account has been registered elsewhere';
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
            this.hiddenLeft(0);
            this.backImg = require('../../assets/image/flower/can.png');
            this.backImage = require('../../assets/image/flower/can.png');
            localStorage.removeItem('operateList');
            this.backId = '';
            this.$forceUpdate();
        },
        // 获取参数并设置初始位置
        getParameter(){
            let self = this;
            if(JSON.parse(localStorage.getItem('operateList'))){
                this.list = JSON.parse(localStorage.getItem('operateList'));
            }else{
                this.list = [];
            }
            let img = new Image();
            if(this.list.length){
                this.list.map(function(item){
                    item.show = false;
                    item.showEye = true; 
                    self.rightList.push(item);
                    self.firstList.push(item);
                });
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
                        if(item.width<=100){
                            item.width = 10*item.width;
                            item.height = 10*item.height;
                        }
                        if(item.height<=100){
                            item.width = 10*item.width;
                            item.height = 10*item.height;
                        }
                        img.src = item.picture;
                        item.posX = parseFloat(item.left) + item.width*600/4724/2;
                        item.posY = parseFloat(item.top) + item.height*900/7087/2;
                    }
                    self.judge(1);
                });
            }
        },
        // 左侧选择点击
        changeMessage(index){
            clearInterval(this.clock);
            this.colorList = [];
            this.moveLeft = '100px';
            this.btnLeft = '472px';
            this.select.map(function(item){
                item.show = false;
            });
            this.select[index].show = true;
            if(this.leftNav==index){
                this.leftCnt++;
            }else{
                this.leftCnt = 1;
            }
            if(this.leftCnt%2==0){
                this.hiddenLeft(0);
                return;
            }else{
                this.moveLeft = '0';
                this.btnLeft = '372px';
                this.showLeft = true;
                this.hiddenLeft(1);
            }
            this.showSpan = false;
            this.leftNav = index;
            this.cnt = 1;
            this.mineCnt = 1;
            this.mineList = [];
            this.pageNumber = '';
            this.proList = [];
            if(index==0){
                this.topClick(0);
                this.topBtn = [{name: 'Printing',show: true},{name: 'Embroidery',show: false},{name: 'Material',show: false}];
            }else if(index==1){
                this.topBtn = [{name: 'Template',show: true},{name: 'Pattern',show: false}];
                this.getPattern(0);
            }else if(index==2){
                this.showMore = false;
                this.showMine = true;
                this.styleName = '';
                this.topBtn = [{name: 'Shared',show: true},{name: 'Mine',show: false}];
                this.topClick(0);
            }else{
                this.topBtn = [{name: 'Material',show: true},{name: 'Shading',show: false}];
                this.topClick(0);
                this.btnIndex = 0;
            }
            this.$forceUpdate();
        },
        // 返回顶部
        toTop(e){
            document.querySelector('.addBox').scrollTop = 0;
            this.showTop = false;
        },
        // 收起
        hiddenLeft(index){
            let speed;
            if(index==0){
                speed = 10;
            }else{
                speed = -10;
            }
            let self = this;
            this.clock = setInterval(function(){
                if(index==0&&parseInt(self.moveLeft)<=-272){
                    self.showLeft = false;
                    self.select.map(function(item){
                        item.show = false;
                    });
                    self.leftNav = -1;
                    self.proList = [];
                    self.mineList = [];
                    clearInterval(self.clock);
                }else if(index==1&&parseInt(self.moveLeft)>=100){
                    clearInterval(self.clock);
                }else{
                    self.moveLeft = parseInt(self.moveLeft) - speed + 'px';
                    self.btnLeft = parseInt(self.btnLeft) - speed + 'px';
                }
            },10);
        },
        // 按钮点击
        topClick(index){
            this.rightNum = index;
            this.topBtn.map(function(item){
                item.show = false;
            });
            this.showTop = false;
            this.colorList = [];
            this.topBtn[index].show = true;
            this.proList = [];
            this.mineCnt = 1;
            this.mineList = [];
            this.cnt = 1;
            this.pageNumber = '';
            if(this.leftNav==0){
                if(index==2){
                    this.showHot = false;
                    this.getMine(1);
                }else{
                    this.showHot = true;
                    this.getClassifyList();
                    this.message.printingOrEmbroider = index;
                    this.getShare(this.message);
                }
            }else if(this.leftNav==1){
                this.getPattern(index);
            }else if(this.leftNav==2){
                if(index==0){
                    this.showMine = true;
                    this.showMore = false;
                    this.getToplist();
                }else{
                    this.showMine = false;
                    this.showMore = true;
                    this.getMine(3);
                }
            }else{
                this.btnIndex = index;
                this.getColour();
            }   
            this.$forceUpdate();
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
                if(self.leftNav==0){
                    if(self.url[index].name.substring(self.url[index].name.length-3,self.url[index].name.length)!='png'){
                        self.showJump = true;
                        self.err = 'Only upload PNG format pictures';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }
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
            formData.append('type1',this.leftNav+1);
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
                    this.mineCnt = 1;
                    this.mineList = [];
                    this.getMine(this.leftNav+1);
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
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
        // 添加素材数据
        // 我的素材
        getMine(type){
            if(this.mineCnt==1){
                this.showLoading = true;
            }else{
                this.showSpan = true;
            }
            Scroll.stop();
            var self = this;
            var formData = new FormData();
            formData.append('pageSize',50);
            formData.append('page',this.mineCnt);
            formData.append('type1',type);
            var obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    self.showSpan = false;
                    Scroll.move();
                },1000);
                if(res.data.status==0){
                    var result = res.data.result;
                    var list = result.list;
                    this.pageNumber = result.pages;
                    this.mineList = this.mineList.concat(list);
                    this.hanleScroll();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        // 共享素材和商城素材请求数据
        getShare(message){
            // this.showLoading = true;
            if(this.cnt==1){
                this.showLoading = true;
            }else{
                this.showSpan = true;
            }
            Scroll.stop();
            var formData = new FormData();
            var self = this;
            formData.append('pageSize',50);
            formData.append('page',this.cnt);
            // 选择印花或者绣花
            if(message && message.printingOrEmbroider){
                formData.append('printingOrEmbroider',message.printingOrEmbroider);
            }else{
                formData.append('printingOrEmbroider',0);
            }
            // 选择热门或者最新
            if(message && message.orderBy){
                formData.append('orderBy',message.orderBy);
            }else{
                formData.append('orderBy',1);
            }
            // 选择大类型
            if(message && message.genre1){
                formData.append('genre1',message.genre1);
            }else{
                formData.append('genre1',1);
            }
            // 选择小类型
            if(message && message.genre2){
                formData.append('genre2',message.genre2);
            }
            // 选择风格
            if(message && message.styleType){
                formData.append('styleType',message.styleType);
            }
            // 选择共享素材或者商城素材
            if(message && message.type){
                formData.append('type',message.type);
            }
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryJyg/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    self.showSpan = false;
                },1000);
                Scroll.move();
                if(res.data.status==0){
                    var result = res.data.result;
                    this.pageNumber = result.pages;
                    var n = true;
                    var str = '';
                    var arr = [];
                    if(localStorage.getItem('indexArr')){
                        str = localStorage.getItem('indexArr');
                        arr = str.split(',');
                    }
                    this.proList = this.proList.concat(result.list);
                    this.proList.map(function(item,index){
                        item.size = (item.size/1024/1024).toFixed(2);
                        item.show = false;
                        if(arr.length){
                            arr.map(function(arrItem,arrIndex){
                                if(arrItem==item.id){
                                    item.show = true;
                                }
                            });
                        }
                    });
                    this.hanleScroll();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        // 获取头部分页的json数据
        getClassifyList(){
            var formData = new FormData();
            var self = this;
            formData.append('id',4);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    if(this.classifyIndex==1){
                        this.classifyList.type = JSON.parse(result.json1).pdMenu;
                        this.classifyList.style = JSON.parse(result.json2).pdStyle;
                        this.classifyList.type.map(function(item){
                            item.active = false;
                            item.show = false;
                            item.list.map(function(listItem){
                                listItem.active = false;
                            });
                        });
                        this.classifyList.type[0].active = true;
                        this.classifyList.style.map(function(item){
                            item.active = false;
                        });
                    }
                    this.classifyIndex++;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        // 增加素材
        addList(index){
            let self = this;
            this.undo();
            let newList = [];
            let img = new Image();
            let pWidth,pHeight;
            if(this.showHot){
                newList = this.proList;
            }else{
                newList = this.mineList;
            }
            img.src = newList[index].pictureThumbnail;
            pWidth = img.width;
            pHeight = img.height;
            if(this.rightNum==2){
                if(pWidth<=100){
                    pWidth*=10;
                    pHeight*=10;
                }
                if(pHeight<=100){
                    pWidth*=10;
                    pHeight*=10;
                }
            }else{
                pWidth*=1.5;
                pHeight*=1.5;
            }
            let obj = {
                width: pWidth,
                height: pHeight,
                top: '400px',
                left: '250px',
                picture: newList[index].pictureThumbnail,
                showEye: true,
                id: newList[index].id,
                posX: 250+pWidth*600/4724/2,
                posY: 400+pHeight*900/7087/2,
                show: false,
                zoom: 1,
                isCreate: [false,false,false,false,false,false,false,false],
                elements: ['','','','','','','',''],
                order: self.list.length+1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0
            }
            self.list.push(obj);
            self.judge(1);
            self.rightList.push(obj);
            self.firstList.push(obj);
            self.$forceUpdate();
        },
        // 类型点击
        clickType(index){
            let self = this;
            this.page = [];
            this.proList = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.type.map(function(item){
                item.active = false;
            });
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list.map(function(item){
                item.active = false;
            });
            this.message.genre1 = this.classifyList.type[index].id;
            delete this.message.genre2;
            this.getShare(this.message);
        },
        // 点击每个下拉列表里的内容
        updateMessage(index,listIndex){
            let self = this;
            this.page = [];
            this.proList = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.type.map(function(item){
                item.active = false;
                item.list.map(function(listItem){
                    listItem.active = false;
                });
            });
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list.map(function(item){
                item.active = false;
            });
            this.classifyList.type[index].list[listIndex].active = true;
            this.message.genre1 = this.classifyList.type[index].id;
            this.message.genre2 = this.classifyList.type[index].list[listIndex].id;
            this.getShare(this.message);
        },
        // 风格点击
        clickStyle(index){
            let self = this;
            this.page = [];
            this.proList = [];
            this.cnt = 1;
            this.pageIndex = 1;
            this.classifyList.style.map(function(item,mapIndex){
                if(mapIndex!=index){
                    item.active = false;
                }
            });
            this.classifyList.style[index].active = !this.classifyList.style[index].active;
            if(this.classifyList.style[index].active==true){
                this.message.styleType = this.classifyList.style[index].id;
            }else{
                this.message.styleType = '';
            }
            this.getShare(this.message);
        },
        // 按钮点击
        clickBtn(index){
            let self = this;
            this.cnt = 1;
            this.proList = [];
            this.classifyList.btn.map(function(item){
                item.show = false;
            });
            this.classifyList.btn[index].show = true;
            if(index==0){
                this.message.orderBy = 1;
            }else if(index==1){
                this.message.orderBy = 2;
            }
            this.hotName = this.classifyList.btn[index].name;
            this.getShare(this.message);
        },
        // 花型构图
        getPattern(index){
            let formData = new FormData();
            let self = this;
            if(this.cnt==1){
                this.showLoading = true;
            }else{
                this.showSpan = true;
            }
            formData.append('pageSize',18);
            formData.append('page',this.cnt);
            formData.append('genre1',index+1);
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/flowerTemplate/list'
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    self.showSpan = false;
                },1000);
                if(res.data.status==0){
                    let result = res.data.result;
                    result.list.map(function(item){
                        item.show = false;
                    });
                    this.pageNumber = result.pages;
                    this.proList = this.proList.concat(result.list);
                    this.$forceUpdate();
                    this.hanleScroll();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        // 背景图片点击
        backClick(index){
            let self = this;
            if(this.list.length){
                this.undo();
                this.proList.map(function(item){
                    item.show = false;
                });
                this.proList[index].show = true;
                this.$forceUpdate();
                this.getInfo(this.proList[index].id);
            }else{
                this.showJump = true;
                this.err = 'Please add the material first';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
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
                    this.err = 'Your account has been registered elsewhere';
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
        // 背景底纹
        getShading(id,index){
            let formData = new FormData();
            let self = this;
            if(this.cnt==1){
                this.showLoading = true;
            }else{
                this.showSpan = true;
            }
            formData.append('pageSize',18);
            formData.append('page',this.cnt);
            if(id!=0){
                formData.append('type1',id);
            }
            let obj = {
                formdata: formData,
                url: this.all.baseUrl + '/app3dShadingJyg/list'
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    self.showSpan = false;
                },1000);
                if(res.data.status==0){
                    let result = res.data.result;
                    this.pageNumber = result.pages;
                    let newList = [];
                    result.list.map(function(item,newIndex){
                        item.show = false;
                        if(newIndex<2){
                            newList.push(item);
                        }
                    });
                    if(this.showMore){
                        this.mineList = this.mineList.concat(result.list);
                    }else{
                        this.classifyList.styleList[index].list = newList;
                    }
                    this.hanleScroll();
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
                    let data = JSON.parse(result.json1).background;
                    data.map(function(item,index){
                        item.show = false;
                        if(index!=0){
                            self.classifyList.styleList.push(item);
                        }
                    });
                    self.classifyList.styleList.map(function(item,index){
                        self.getShading(item.id,index);
                    });
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has been registered elsewhere';
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
        // 更多点击
        moreClick(index){
            this.moreIndex = index;
            this.cnt = 1;
            this.pageNumber = '';
            this.showMore = true;
            this.mineList = [];
            this.styleName = this.classifyList.styleList[index].name;
            this.getShading(this.classifyList.styleList[index].id);
        },
        bottomClick(index,bigList){
            this.undo();
            if(this.showMore){
                this.mineList.map(function(item){
                    item.show = false;
                });
                this.mineList[index].show = true;
                this.$forceUpdate();
                this.backImage = this.mineList[index].pictureThumbnail;
                this.backImg = this.mineList[index].pictureThumbnail;
                this.backId = this.mineList[index].id;
            }else{
                this.classifyList.styleList.map(function(item){
                    item.list.map(function(child){
                        child.show = false;
                    });
                });
                this.classifyList.styleList[index].list[bigList].show = true;
                this.$forceUpdate();
                this.backImage = this.classifyList.styleList[index].list[bigList].pictureThumbnail;
                this.backImg = this.classifyList.styleList[index].list[bigList].pictureThumbnail;
                this.backId = this.classifyList.styleList[index].list[bigList].id;
            }
        },
        // 返回
        back(){
            this.showMore = false;
            this.styleName = '';
            this.getToplist();
        },
        // 配色
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
        // 色相饱和度明度滚动条
        colourPull(event,type){
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
                if(endy<-14||endy>5){
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                if(endx<0||endx>310){
                    if(endx<0){
                        prevent = 0;
                    }else{
                        prevent = 1;
                    }
                    self.push();
                }else{
                    prevent = endx/310;
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
        colourPush(){
            document.onmousemove = null;
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
                if(endy<-14||endy>10){
                    self.getColour();
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                if(endx<0||endx>310){
                    if(endx<0){
                        prevent = 0.008;
                    }else{
                        prevent = 0.1;
                    }
                    self.thresholdPush();
                }else{
                    prevent = endx/310;
                    self.whiteWidth = endx + 'px';
                    _target.style.left = endx + 'px';
                    if(endx<20){
                        prevent = 0.008;
                    }else{
                        prevent = (endx/310/10);
                    }
                }
                self.message.threshold = ((prevent)*5000).toFixed(1);
                self.$forceUpdate();
            }
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
                let self = this;
                self.getColour();
            };
        },
        thresholdPush(){
            let self = this;
            self.getColour();
            document.onmousemove = null;
        },
        // 颜色点击
        changeColor(index){
            this.colorList.map(function(item){
                item.show = false;
            });
            this.colorList[index].show = true;
            this.$forceUpdate();
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
                this.err = 'Choose the color you want to replace first';
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
                    this.err = 'Please choose the background first';
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
            this.undo();
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
                    this.getColour();
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
                    this.err = 'Your account has been registered elsewhere';
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
        getColour(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            let arr = [];
            if(!this.rightList.length&&this.btnIndex==0){
                this.showLoading = false;
                this.showJump = true;
                this.err = 'No material selected';
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
                    this.err = 'Please add the background first';
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
                    this.err = 'Your account has been registered elsewhere';
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
        // 画布图片点击
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
        // 画布移动
        listPull(index,event){
            var self = this;
            self.list.map(function(item){
                item.show = false;
            });
            self.list[index].show = true;
            var event = event || window.event;
            var _target = event.target;
            var startx = (event.clientX);
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
                if(document.body.clientHeight>850){
                    disX= (event.clientX-roundX)/0.8;
                    disY= (event.clientY-roundY)/0.8;
                }else{
                    disX= (event.clientX-roundX)/0.6;
                    disY= (event.clientY-roundY)/0.6;
                }
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
        },
        // 操作
        //保存退一步数据
        undo(){
            let tempList=[];
            let backImg,backImage;
            if(this.backId){
                backImg = this.backImg;
                backImage = this.backImg;
            }else{
                backImg = require('../../assets/image/flower/backcolor.png');
                backImage = require('../../assets/image/flower/can.png');
            }
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
                    rotateZ:  this.rightList[i].rotateZ,
                    backImg: backImg,
                    backImage: backImage,
                    backId: this.backId
                });
            }
            this.operateList.push(tempList);
        },
        // 退一步操作
        backStep(){
            let self =this;
            if(this.operateList.length==0){
                this.showJump = true;
                this.err = 'This is the first step!';
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }else{
                this.rightList=[];
                this.list=[];
                this.rightList = this.operateList[this.operateList.length-1];
                this.backId = this.operateList[this.operateList.length-1][0].backId;
                this.classifyList.styleList.map(function(item){
                    item.list.map(function(child){
                        if(child.id == self.backId){
                            child.show = true;
                        }else{
                            child.show = false;
                        }
                    });
                });
                this.mineList.map(function(item){
                    if(item.id == self.backId){
                        item.show = true;
                    }else{
                        item.show = false;
                    }
                });
                this.proList.map(function(item){
                    item.show = false;
                });
                if(this.backId){
                    this.backImg = this.operateList[this.operateList.length-1][0].backImg;
                    this.backImage = this.operateList[this.operateList.length-1][0].backImage;
                }else{
                    this.backImg = require('../../assets/image/flower/backcolor.png');;
                    this.backImage = require('../../assets/image/flower/can.png');
                }
                this.operateList.splice(this.operateList.length-1,1);
                for(let i=0;i<this.rightList.length;i++){
                    this.list.push(this.rightList[i]);
                }
                this.$forceUpdate();
                this.judge();
            }
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
                this.err = "Please select the layer first";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 垂直翻转
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
                this.err = "Please select the layer first";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
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
                this.err = "Please select the layer first";
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
                this.err = "Please select the layer first";
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
                this.err = "Please select the layer first";
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
                this.err = "Please select the layer first";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1000);
            }
        },
        // 删除一个
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
        // 删除底纹
        delBack(){  
            this.undo();
            this.backImg = require('../../assets/image/flower/backcolor.png');
            this.backImage = require('../../assets/image/flower/can.png');
            this.backId = '';
            this.$forceUpdate();
        },
        downList(){
            this.showDown = !this.showDown;
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
        // 局部滚动加载
        hanleScroll(){
            let self = this;
            if(this.leftNav==0){
                document.querySelector('.addBox').onscroll = function(e){
                    let multiple = Math.floor(e.target.scrollTop/e.target.offsetHeight);
                    let scTop;
                    if(multiple==0){
                        scTop = Math.abs(e.target.scrollTop-e.target.offsetHeight);
                    }else{
                        scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight*multiple);
                    }
                    if(scTop<50){
                        self.showTop = true;
                        if(self.cnt<self.pageNumber){
                            self.cnt++;
                            self.mineCnt++;
                            if(self.rightNum==2){
                                self.getMine(1);
                            }else{
                                self.getShare(self.message)
                            }
                        }
                    }
                }
            }else if(this.leftNav==1){
                document.querySelector('.addBox').onscroll = function(e){
                    let multiple = Math.floor(e.target.scrollTop/e.target.offsetHeight);
                    let scTop;
                    if(multiple==0){
                        scTop = Math.abs(e.target.scrollTop-e.target.offsetHeight);
                    }else{
                        scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight*multiple);
                    }
                    if(scTop<50){
                        self.showTop = true;
                        if(self.cnt<self.pageNumber){
                            self.cnt++;
                            self.mineCnt++;
                            self.getPattern(self.rightNum);
                        }
                    }
                }
            }else if(this.leftNav==2){
                document.querySelector('.addBox').onscroll = function(e){
                    let multiple = Math.floor(e.target.scrollTop/e.target.offsetHeight);
                    let scTop;
                    if(multiple==0){
                        scTop = Math.abs(e.target.scrollTop-e.target.offsetHeight);
                    }else{
                        scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight*multiple);
                    }
                    if(scTop<50){
                        self.showTop = true;
                        if(self.cnt<self.pageNumber){
                            self.cnt++;
                            self.mineCnt++;
                            if(self.rightNum==1){
                                self.getMine(3);
                            }else if(self.showMore){
                                self.getShading(self.classifyList.styleList[self.moreIndex].id);
                            }
                        }
                    }
                }
            }
        }
    },
    mounted(){
        this.getParameter();
        this.backId = '';
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Ennewoperate'
            });
        }else{
            this.$router.push({
                path: '/Newoperate'
            });
        }
    },
    beforeDestroy(){
        clearInterval(this.clock);
    }
}
</script>
<style scoped>
    .newoperate{
        height: 100vh;
        background: #eee;
        overflow: hidden;
    }
    .content{
        position: relative;
    }
    .noData{
        color: #333;
        font-size: 16px;
        line-height: 300px;
    }
    /* 最左侧各个按钮样式 */
    ul.seleBox{
        width: 100px;
        height: calc(100vh - 60px);
        background: #fff;
        color: #333;
        float: left;
        font-size: 14px;
        position: relative;
        z-index: 77;
        box-sizing: border-box;
        border-right: 1px solid #eee;
    }
    ul.seleBox li{
        position: relative;
        cursor: default;
        padding-top: 2.1875rem;
        background: #fff;
        z-index: 88;
    }
    ul.seleBox span.line{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: 2.1875rem;
        background: #133ffc;
        width: 4px;
    }
    ul.seleBox img.seleImg{
        display: block;
        margin: 0 auto;
        width: 1.625rem;
        height: auto;
    }
    ul.fixedList{
        position: fixed;
        z-index: 77;
        width: 100px;
        left: 0;
        bottom: 4.875rem;
        color: #8d8d8d;
        font-size: 14px;
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
        height: auto;
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
    /* 清浮动 */
    .clear{
        clear: both;
    }
    .addBox{
        background: #fff;
        width: 372px;
        position: absolute;
        top: 0;
        left: 100px;
        z-index: 55;
        height: calc(100vh - 60px);
        -webkit-overflow-scrolling: touch;
        overflow-y:scroll;
        white-space: nowrap;
        padding-left: 20px;
        box-sizing: border-box;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .loadSpan{
        position: fixed;
        z-index: 56;
        width: 372px;
        left: 100px;
        color: #333;
        bottom: 5px;
        font-size: 14px;
    }
    .toTop{
        position: fixed;
        z-index: 56;
        overflow: hidden;
        width: 35px;
        left: 420px;
        border-radius: 50%;
        bottom: 30px;
    }
    .toTop img{
        display: block;
        margin: 0 auto;
        width: 35px;
        height: auto;
    }
    /* 收缩 */
    .hiddenBtn{
        position: fixed;
        z-index: 88;
        top: calc(50vh - 103px);
        left: 472px;
        height: 86px;
        width: 24px;
    }
    .hiddenBtn img{
        display: block;
        width: 24px;
        height: auto;
    }
    /* 改变滚动条样式 */
    .addBox::-webkit-scrollbar {
        width: 0;    
        height: 0;
        border: none;
        background: none;
    }
    .topbtnList{
        overflow: hidden;
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 56;
        left: 0;
        padding-top: 30px;
        padding-bottom: 10px;
    }
    .topbtnList li{
        height: 35px;
        line-height: 35px;
        margin-right: 20px;
        font-size: 18px;
        color: #8d8d8d;
        border: 1px solid #8d8d8d;
        box-sizing: border-box;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 18px;
        float: left;
    }
    .topbtnList li img{
        display: block;
    }
    .topbtnList li:last-child{
        margin-right: 0;
    }
    .topbtnList li.click{
        background: #133ffc;
        border: 1px solid #133ffc;
        color: #fff;
    }
    .classifyBox{
        margin-top: 25px;
        padding-right: 24px;
    }
    .classifyBox .classify{
        cursor: default;
        float: left;
        position: relative;
        font-size: 14px;
        color: #333;
        margin-right: 20px;
    }
    .classifyBox .classify>span{
        height: 22px;
    }
    .classify:hover ul.bigList{
        display: block;
    }
    .classifyBox .classify:last-child{
        margin-right: 0;
    }
    .classifyBox .classify img{
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
    }
    .specialSpan{
        display: block;
    }
    .classifyBox .special{
        float: right;
    }
    .classifyBox ul.bigList{
        display: none;
        position: absolute;
        z-index: 88;
        background: #fff;
        width: 100px;
        top: 18px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 13px;
        color: #8d8d8d;
        font-size: 12px;
        left: 0;
        border-radius: 5px;
        border: 1px solid #f8f8f9;
        box-shadow: 1px 1px 1px #d0d0d0;
    }
    .special ul.bigList{
        width: 65px;
    }
    ul.bigList li{
        margin: 0;
        padding: 4px 0;  
        position: relative;
    }
    ul.bigList li:hover,.hoverSpan{
        color: #133ffc;
    }
    ul.bigList li:hover .childBox{
        display: block;
    }
    ul.bigList:hover + img{
        transform: rotate(180deg);
    }
    .childBox{
        position: absolute;
        left: 84px;
        top: 0;
        display: none;
        z-index: 100;
        background: #fff;
        width: 100px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 13px;
        color: #8d8d8d;
        font-size: 12px;
        border-radius: 5px;
        border: 1px solid #f8f8f9;
        box-shadow: 1px 1px 1px #d0d0d0;
    }
    .childBox span{
        margin: 0;
        padding: 4px 0;  
        color: #8d8d8d;
        display: block;
    }
    .childBox span:hover,.childBox span.hoverSpan{
        color: #133ffc;
    }
    ul.leftList{
        overflow: hidden;
        margin-top: 20px;
    }
    ul.leftList li{
        float: left;
        position: relative;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        box-align: center;
        -moz-box-align: center;
        -webkit-box-align: center;
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        width: 103px;
        height: 103px;
        overflow: hidden;
        margin-right: 5px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    ul.leftList input{
        position: absolute;
        top: 0;
        left: 0;
        width: 103px;
        height: 103px;
        opacity: 0;
    }
    ul.backList input{
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 240px;
        opacity: 0;
    }
    ul.leftList li:nth-child(3n){
        margin-right: 0;
    }
    ul.leftList img{
        display: block;
        margin: 0 auto;
        max-height: 103px;
        max-width: 103px;
    }
    ul.leftList li.fileBox,ul.backList li.fileBox{
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        flex-direction: column;
        -webkit-flex-direction: column;
        -webkit-justify-content: center;
        justify-content: center;
        -moz-box-pack: center;
        -webkit--moz-box-pack: center;
        box-pack: center;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        box-align: center;
        -moz-box-align: center;
        -webkit-box-align: center;
    }
    ul.leftList li.fileBox img,ul.backList li.fileBox img{
        display: block;
        width: 30px;
        height: auto;
        margin: 0 auto;
        margin-bottom: 4px;
    }
    ul.leftList li.fileBox span,ul.backList li.fileBox span{
        display: block;
        margin: 0 auto;
        color: rgba(51,51,51,0.6);
        font-size: 12px;
    }
    ul.backList{
        overflow: hidden;
        margin-top: 20px;
    }
    ul.backList li{
        width: 160px;
        height: 240px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        float: left;    
        border: 1px solid #d0d0d0;
        position: relative;
        overflow: hidden;
    }
    ul.backList li:nth-child(2n){
        margin-right: 0;
    }
    ul.backList li img{
        display: block;
        width: 100%;
        height: 100%;
    }
    ul.backList li img.trueImg{
        position: absolute;
        width: 160px;
        height: 240px;
        top: 0;
        left: 0;
    }
    .bigmoreBox ul.backList{
        margin-top: 10px;
    }
    .bigmoreBox ul.backList li{
        margin-bottom: 0;
    }
    .moreBox{
        overflow: hidden;
        font-size: 14px;
        color: #333;
        text-align: left;
        margin-top: 16px;
    }
    .moreBox p{
        float: right;
        color: #888;
        margin-right: 10px;
        cursor: pointer;
    }
    .smallmoreBox .moreBox p{
        float: left;
        color: #333;
    }
    .moreBox p span{
        display: inline-block;
        vertical-align: middle;
    }
    .moreBox p img{
        display: inline-block;
        vertical-align: middle;
        margin-left: 4px;
        width: 7px;
        height: auto;
    }
    .smallmoreBox .moreBox p img{
        transform: rotate(180deg);
        margin-left: 0;
        margin-right: 4px;
    }
    /* 配色 */
    .inputBox{
        overflow: hidden;
        margin-top: 20px;
    }
    .colorBack{
        width: 80px;
        height: 80px;
        float: left;
        background: red;
    }
    .rightInput{
        float: left;
        width: auto;
        margin-left: 14px;
        overflow: hidden;
    }
    .rightinputBox{
        overflow: hidden;
        padding: 0;
        margin-bottom: 8px;
    }
    .rightinputBox label{
        float: left;
        overflow: hidden;
        margin-right: 18px;
        width: 78px;
        color: #333;
        font-size: 16px;
        font-weight: normal;
    }
    .rightinputBox label:nth-child(2){
        width: 60px;
    }
    .rightinputBox label:last-child{
        margin-right: 0;
        width: 60px;
    }
    .rightinputBox span{
        float: left;
        height: 14px;
        line-height: 14px;
        width: 24px;
        text-align: left;
        font-family: '微软雅黑';
    }
    .rightinputBox input{
        float: left;
        width: 34px;
        height: 14px;
        outline: none;
        border: 1px solid #333;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: center;
        line-height: 14px;
        font-size: 12px;
    }
    .signBox input.spelial{
        width: 54px;
    }
    /* 滚动条样式 */
    .pullBox{
        overflow: hidden;
        margin-top: 30px;
    }
    .lineBox{
        position: relative;
        text-align: left;
        color: #333;
        font-size: 14px;
        margin-bottom: 32px;
    }
    .lineBox img{
        margin-top: 9px;
        width: 330px;
        height: 8px;
        display: block;
        flex-shrink: 0;
        margin-right: 20px;
    }
    .lineBox .line{
        width: 330px;
        height: 8px;
        position: absolute;
        bottom: 0;
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
        text-align: left;
        color: #333;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .specialLine .line{
        margin-top: 9px;
        position: relative;
        background: #d8d8d8;
        width: 330px;
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
        overflow: hidden;
        margin-top: 20px;
    }
    ul.colorList li{
        float: left;
        width: 61px;
        height: 61px;
        background: red;
        border: 1px solid #fff; 
        margin-right: 20px;
        margin-bottom: 20px;
    }
    ul.colorList li.special{
        border: 1px solid #333;
    }
    button{
        border: none;
        outline: none;
        width: 80px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        display: block;
        border-radius: 12px;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
    }
    .exchange{
        margin-top: 16px;
        background: #133ffc;
    }
    /* 画布样式 */
    .canvas{      
        position: absolute;
        width: 620px;
        z-index: 44;
        top: 1.875rem;
        left: calc(50% - 310px);
        margin-bottom: 2.5rem;
        height: 920px;
        zoom: .8;
        -moz-transform: scale(0.8,0.8);
        -moz-transform-origin: top left;  
        -o-transform: scale(0.8,0.8);
        -o-transform-origin: top left; 
    }
    @media screen and (max-height: 850px){
        .canvas{
            zoom: .6;
            -moz-transform: scale(0.6,0.6);
            -moz-transform-origin: top left;
            -o-transform: scale(0.6,0.6);
            -o-transform-origin: top left; 
        }
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
    /* 操作样式 */
    .operateBox{
        height: calc(100vh - 60px);
        float: right;
        background: #fff;
        border-left: 1px solid #d0d0d0;
    }
    ul.bBox{
        width: 2.5rem;
        float: left;
        padding-top: 3.0625rem;
    }
    ul.bBox li{
        height: 2.5rem;
        margin-bottom: 1.25rem;
        position: relative;
    }
    .bOperate{
        position: absolute;
        color: #8d8d8d;
        z-index: 55;
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
        z-index: 56;
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
        z-index: 56;
        border-radius: .3125rem;
        width: 210px;
        top: -0;
        height: 2.5rem;
    }
    .bScroll .bigScroll{
        width: 100%;
        position: absolute;
        top: .9375rem;
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
        height: auto;
        padding-top: .8rem;
    }
    .oBox{
        width: 18rem;
        padding-bottom: 2.5rem;
        box-sizing: border-box;
        float: left;
        height: calc(100vh - 60px);
        background: #fff;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
        overflow-x: hidden;
        white-space: nowrap;
        position: relative;
        border-left: 1px solid #d0d0d0;
    }
    /* 改变滚动条样式 */
    .oBox::-webkit-scrollbar {
        width: 0;    
        height: 0;
        border: none;
        background: none;
    }
    .oBox h4{
        width: 18rem;
        font-weight: normal;
        position: sticky;
        top: 3.0625rem;
        right: 0;
        color: #fff;
        background: #2c2e30;
        box-sizing: border-box;
        padding: 0 .625rem;
        font-size: .875rem;
        height: 2.5rem;
        line-height: 2.5rem;
        overflow: hidden;
        text-align: left;
    }
    .oBox h4 span{
        float: right;
    }
    .backBox{
        position: sticky;
        right: 0;
        top: 5.5625rem;
        padding: 0 .625rem;
        background: #fff;
        width: 17.875rem;
        box-sizing: border-box;
        overflow: hidden;
        height: 2.625rem;
        line-height: 2.625rem;
        border-bottom: 1px solid #d0d0d0;
    }
    .backBox div{
        float: left;
    }
    .backBox div img{
        width: 2.5rem;
        height: 1.5rem;
        float: left;
        margin-top: .48rem;
    }
    .backBox span{
        margin-right: 1.25rem;
        float: left;
    }
    .backBox>img{
        float: right;
        margin-top: .6rem;
        width: 1.125rem;
        height: auto;
        margin-right: 1.75rem;
    }
    .backWrite{
        width: 17.875rem;
        height: 3.0625rem;;
        position: sticky;
        top: 0;
        right: 0;
        background: #fff;
    }
    ul.levelBox li{
        overflow: hidden;
        color: #2c2e30;
        font-size: .875rem;
        height: 2.625rem;
        border-bottom: 1px solid #d0d0d0;
    }
    .eyeBox{
        width: 2.625rem;
        height: 2.625rem;
        float: left;
        box-sizing: border-box;
        border-right: 1px solid #d0d0d0;
    }
    .eye{
        display: block;
        margin: 0 auto;
        width: 1.1875rem;
        padding-top: .6875rem;
        height: auto;
    }
    .rightBox{
        width: 13.525rem;
        box-sizing: border-box;
        padding: 0 .625rem;
        height: 2.625rem;
        float: left;
    }
    .proBox{
        float: left;
        cursor: default;
        line-height: 2.625rem;
    }
    .downNav{
        display: inline-block;
        vertical-align: middle;
        margin-right: .625rem;
        width: .75rem;
    }
    .imgBox{
        float: right;
    }
    .proImg{
        width: 2rem;
        float: left;
        margin-top: .3125rem;
        height: 2rem;
    }
    .delImg{
        width: 1.125rem;
        display: block;
        float: left;
        margin-left: 1.5625rem;
        margin-top: .65rem;
        height: auto;
    }
    .rightBox .delImg{
        float: right;
        height: auto;
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
        width: 360px;
        height: 180px;
        background: #fff;
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        margin-top: calc(50vh - 90px);
    }
    .grabBox h3{
        padding-top: 15px;
        font-weight: normal;
        font-size: 24px;
        margin: 0;
    }
    .grabBox .del{
        position: absolute;
        width: 20px;
        height: 20px;
        right: 8px;
        top: 8px;
        line-height: 20px;
        text-align: cneter;
        cursor: pointer;
    }
    .del img{
        width: 100%;
        display: block;
    }
    .grabBox span{
        display: block;
        margin: 15px 0 30px;
    }
    .grabBox span.specialSpan{
        margin: 24px 0 30px;
    }
    .grabBox .grabWay{
        overflow: hidden;
    }
    .grabWay li{
        width: 50%;
        float: left;
    }
    .grabWay button{
        width: 125px;
        height: 40px;
        outline: none;
        border: none;
        line-height: 40px;
        color: #fff;
        background: #133ffc;
        font-size: 20px;
        border-radius: 10px;
        margin: 0 auto;
        display: block;
    }
    .picBox{
        position: absolute;
        background: #fff;
        top: 50px;
        left: calc(50% - 500px);
        width: 1000px;
        height: 600px;
        margin-bottom: 50px;
        border-radius: 10px;
    }
    .specialPic{
        width: 700px;
        height: 1000px;
        left: calc(50% - 350px);
    }
    .picBox h5{
        font-size: 30px;
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
        width: 900px;
        overflow: hidden;
        margin: 0 auto;
    }
    .posBox ul{
        width: 300px;
        float: left;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .posBox ul li{
        position: absolute;
        border-radius: 10px;
        border: 2px solid transparent;
    }
    .linkBox{
        width: 600px;
        margin: 0 auto;
        overflow: hidden;
    }
    .linkBox ul{
        width: 300px;
        float: left;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .linkBox ul li{
        position: absolute;
        border-radius: 10px;
        border: 2px solid transparent;
    }
</style>