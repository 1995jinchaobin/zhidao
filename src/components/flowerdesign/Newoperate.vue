<template>
    <div
            class="newoperate"
            @click.stop="none"
            :class="{cursorClassRightTop:changeSizePosition=='rightTop',cursorClassRightBottom:changeSizePosition=='rightBottom',cursorClassRotate:isRotate}"
    >
        <!-- 花型设计 -->
        <Tab @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="leftNav">
                <ul class="seleBox">
                    <li
                            :class="item.show ? 'seleLine' : ''"
                            @click="changeMessage(index)"
                            v-for="(item,index) in select"
                            :key="index"
                    >
                        <div>
                            <img class="seleImg" :src="item.image" alt />
                            <span class="seleName">{{item.name}}</span>
                        </div>
                    </li>
                </ul>
                <ul class="fixedList">
                    <li @click="look">
                        <img class="lookimg" src="../../assets/image/flower/icon_look.png" alt />
                        <span>连晒预览</span>
                    </li>
                    <li @click="save" id="savetongji">
                        <img class="saveimg" src="../../assets/image/flower/icon_save.png" alt />
                        <span>保存</span>
                    </li>
                    <li @click="clearCanvas">
                        <img class="deleteimg" src="../../assets/image/flower/icon_delete.png" alt />
                        <span>清空画布</span>
                    </li>
                </ul>
            </div>
            <div class="addBox" :style="{left: moveLeft}" v-if="showLeft">
                <div v-if="leftNav==0">
                    <div v-if="showHot" class="classifyBox">
                        <ul class="topbtnList">
                            <li
                                    @click="topClick(index)"
                                    v-for="(item,index) in topBtn"
                                    :key="'btn'+index"
                                    :class="item.show?'click':''"
                            >{{item.name}}</li>
                        </ul>
                        <div class="classify">
                            <span>类型</span>
                            <img src="../../assets/image/flower/icon_down.png" alt />
                            <ul class="bigList">
                                <li v-for="(item,index) in classifyList.type" :key="'style'+index">
                  <span
                          :class="['specialSpan',item.active?'hoverSpan':'']"
                          @click="clickType(index)"
                  >{{item.name}}</span>
                                    <p v-if="item.list.length" class="childBox">
                    <span
                            :class="listItem.active?'hoverSpan':''"
                            @click="updateMessage(index,listIndex)"
                            v-for="(listItem,listIndex) in item.list"
                            :key="'list'+listIndex"
                    >{{listItem.name}}</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="classify">
                            <span>风格</span>
                            <img src="../../assets/image/flower/icon_down.png" alt />
                            <ul class="bigList">
                                <li
                                        :class="item.active?'hoverSpan':''"
                                        @click="clickStyle(index)"
                                        v-for="(item,index) in classifyList.style"
                                        :key="'style'+index"
                                >{{item.name}}</li>
                            </ul>
                        </div>
                        <div class="classify special">
                            <ul class="typeList">
                                <li
                                        @click="clickBtn(index)"
                                        v-for="(item,index) in classifyList.btn"
                                        :key="'btn'+index"
                                >
                                    <img :src="item.show ? actUrl : url" />
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <ul class="leftList" v-if="showHot&&proList.length">

                        <li @click="addList(index)" v-for="(item,index) in proList" :key="'pro'+index">
                            <img
                                    :height="item.width<=item.height?'80%':'auto'"
                                    :width="item.width>item.height?'80%':'auto'"
                                    :src="item.pictureThumbnail"
                                    alt
                            />
                        </li>
                    </ul>
                    <p class="noData" v-if="showHot&&!proList.length">暂无数据</p>
                    <ul class="leftList" v-if="!showHot">
                        <li class="fileBox">
                            <input type="file" accept="image/*" multiple @change="add" />
                            <img src="../../assets/image/flower/icon_add.png" alt />
                            <span>上传素材</span>
                        </li>
                        <li @click="addList(index)" v-for="(item,index) in mineList" :key="'pro'+index">
                            <img :src="item.pictureThumbnail" alt />
                        </li>
                    </ul>
                </div>
                <div v-if="leftNav==1">
                    <ul class="topbtnList">
                        <li
                                @click="topClick(index)"
                                v-for="(item,index) in topBtn"
                                :key="'btn'+index"
                                :class="item.show?'click':''"
                        >{{item.name}}</li>
                    </ul>
                    <ul v-if="proList.length" class="backList" id="pattern">
                        <li
                                :class="item.show ? 'actPat' : ''"
                                @click="backClick(index)"
                                v-for="(item,index) in proList"
                                :key="'pro'+index"
                        >
                            <img
                                    :height="item.width<=item.height?'80%':'auto'"
                                    :width="item.width>item.height?'80%':'auto'"
                                    :src="item.ossUrl+'?x-oss-process=image/resize,l_300'"
                                    alt
                            />
                        </li>
                    </ul>
                    <p class="noData" v-if="!proList.length">暂无数据</p>
                </div>
                <div v-if="leftNav==2">
                    <ul class="topbtnList">
                        <li
                                @click="topClick(index)"
                                v-for="(item,index) in topBtn"
                                :key="'btn'+index"
                                :class="item.show?'click':''"
                        >{{item.name}}</li>
                    </ul>
                    <div v-if="!showMore">
                        <div class="bigmoreBox">
                            <div class="moreBox">
                                <span>素色</span>
                            </div>
                            <div class="bigImgList">
                <span v-for="item in bigImgList" :key="item.id">
                  <img @click="backSet(item.id)" :src="item.url" />
                </span>
                            </div>
                            <div class="bigBtn">
                                <img src="../../assets/image/flower/xise.png" alt />
                                <el-color-picker @active-change="colorCheck" color-format="hex" v-model="colorValue"></el-color-picker>
                            </div>
                        </div>
                        <div
                                class="bigmoreBox"
                                v-for="(topItem,topIndex) in classifyList.styleList"
                                :key="'more'+topIndex"
                        >
                            <div class="moreBox" v-if="topItem.name != '素色'">
                                <span>{{topItem.name}}</span>
                                <p @click="moreClick(topIndex)">
                                    <span>更多</span>
                                    <img src="../../assets/image/flower/icon_left.png" alt />
                                </p>
                            </div>
                            <ul class="backList" v-if="topItem.name != '素色'">
                                <li
                                        @click="bottomClick(topIndex,index,$event)"
                                        v-for="(item,index) in topItem.list"
                                        :key="'pro'+index"
                                >
                                    <img
                                            :height="item.width<=item.height?'80%':'auto'"
                                            :width="item.width>item.height?'80%':'auto'"
                                            :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'"
                                            alt
                                    />
                                    <img
                                            style="display: none;"
                                            class="trueImg"
                                            src="../../assets/image/flower/true.png"
                                            alt
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="smallmoreBox" v-if="showMore">
                        <div class="moreBox">
                            <p v-if="showMine" @click="back">
                                <img src="../../assets/image/flower/icon_left.png" alt />
                                <span>{{styleName}}</span>
                            </p>
                        </div>
                        <ul class="backList">
                            <li class="fileBox" v-if="!showMine">
                                <input type="file" accept="image/*" multiple @change="add" />
                                <img src="../../assets/image/flower/icon_add.png" alt />
                                <span>上传底纹</span>
                            </li>
                            <li
                                    @click="bottomClick(index,$event)"
                                    v-for="(item,index) in mineList"
                                    :key="'pro'+index"
                            >
                                <img
                                        :height="item.width<=item.height?'80%':'auto'"
                                        :width="item.width>item.height?'80%':'auto'"
                                        :src="item.pictureThumbnail+'?x-oss-process=image/resize,l_300'"
                                        alt
                                />
                                <img
                                        style="display: none;"
                                        class="trueImg"
                                        src="../../assets/image/flower/true.png"
                                        alt
                                />
                            </li>
                        </ul>
                        <p class="noData" v-if="showMine&&!mineList.length">暂无数据</p>
                    </div>
                </div>
                <div v-if="leftNav==3">
                    <ul class="topbtnList">
                        <li
                                @click="topClick(index)"
                                v-for="(item,index) in topBtn"
                                :key="'btn'+index"
                                :class="item.show?'click':''"
                        >{{item.name}}</li>
                    </ul>
                    <div class="inputBox">
                        <div class="colorBackBox">
                            <div class="colorBack">
                                <p>新颜色</p>
                                <span :style="{background: '#'+message.color}" class="colorBackItem"></span>
                                <span :style="{background: imgColor}" class="colorBackItem"></span>
                                <p>当前颜色</p>
                            </div>
                            <div class="rightInput">
                                <div class="rightinputBox">
                                    <label for>
                                        <span>C:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="cmyktoRgb"
                                                v-on:keyup.enter="cmyktoRgb"
                                                v-model="message.cmyk[0]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>M:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="cmyktoRgb"
                                                v-on:keyup.enter="cmyktoRgb"
                                                v-model="message.cmyk[1]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>Y:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="cmyktoRgb"
                                                v-on:keyup.enter="cmyktoRgb"
                                                v-model="message.cmyk[2]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>K:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="cmyktoRgb"
                                                v-on:keyup.enter="cmyktoRgb"
                                                v-model="message.cmyk[3]"
                                                type="text"
                                        />
                                    </label>
                                </div>
                                <div class="rightinputBox">
                                    <label for>
                                        <span>H:</span>
                                        <input
                                                @blur="hsvtoRgb"
                                                v-on:keyup.enter="hsvtoRgb"
                                                @keyup="rgbKey"
                                                v-model="message.hsv[0]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>S:</span>
                                        <input
                                                @blur="hsvtoRgb"
                                                v-on:keyup.enter="hsvtoRgb"
                                                @keyup="rgbKey"
                                                v-model="message.hsv[1]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>V:</span>
                                        <input
                                                @blur="hsvtoRgb"
                                                v-on:keyup.enter="hsvtoRgb"
                                                @keyup="rgbKey"
                                                v-model="message.hsv[2]"
                                                type="text"
                                        />
                                    </label>
                                </div>
                                <div class="rightinputBox">
                                    <label for>
                                        <span>R:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="enterRgb"
                                                v-on:keyup.enter="enterRgb"
                                                v-model="message.rgb[0]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>G:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="enterRgb"
                                                v-on:keyup.enter="enterRgb"
                                                v-model="message.rgb[1]"
                                                type="text"
                                        />
                                    </label>
                                    <label for>
                                        <span>B:</span>
                                        <input
                                                @keyup="rgbKey"
                                                @blur="enterRgb"
                                                v-on:keyup.enter="enterRgb"
                                                v-model="message.rgb[2]"
                                                type="text"
                                        />
                                    </label>
                                </div>
                                <div class="rightinputBox signBox">
                                    <label for>
                                        <span>#:</span>
                                        <input
                                                class="spelial"
                                                @blur="colortoRgb"
                                                v-on:keyup.enter="colortoRgb"
                                                v-model="message.color"
                                                type="text"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="pullBox">
                            <div class="lineBox">
                                <span>色相</span>
                                <img src="../../assets/image/flower/icon_rgb.png" alt />
                                <div class="line">
                  <span
                          :style="{left: (message.hue*310)+'px'}"
                          @mousedown="colourPull($event,1)"
                          @mouseup="colourPush"
                  ></span>
                                </div>
                            </div>
                            <div class="lineBox">
                                <span>饱和度</span>
                                <img src="../../assets/image/flower/icon_cmyk.png" alt />
                                <div class="line">
                  <span
                          :style="{left: (message.saturation*310)+'px'}"
                          @mousedown="colourPull($event,2)"
                          @mouseup="colourPush"
                  ></span>
                                </div>
                            </div>
                            <div class="lineBox">
                                <span>明度</span>
                                <img src="../../assets/image/flower/icon_hsv.png" alt />
                                <div class="line">
                  <span
                          :style="{left: (message.lightness*310)+'px'}"
                          @mousedown="colourPull($event,3)"
                          @mouseup="colourPush"
                  ></span>
                                </div>
                            </div>
                            <div class="specialLine">
                                <span>阈值：{{message.threshold}}</span>
                                <div class="line">
                                    <div :style="{width: whiteWidth}"></div>
                                    <span @mousedown="thresholdPull($event)" @mouseup="thresholdPush"></span>
                                </div>
                            </div>
                        </div>
                        <ul v-if="colorList.length" class="colorList">
                            <li
                                    @click="changeColor(index,$event)"
                                    v-for="(item,index) in colorList"
                                    :key="index"
                                    :class="item.show?'special':''"
                                    :style="{background: 'rgba('+item.r+','+item.g+','+item.b+','+item.alpha}"
                            ></li>
                        </ul>
                        <button @click="exchange" class="exchange">替换</button>
                    </div>
                </div>
                <span class="loadSpan" v-if="showSpan">数据加载中...</span>
                <p class="toTop" @click="toTop" v-if="showTop">
                    <img src="../../assets/image/flower/icon_totop.png" alt />
                </p>
                <p :style="{left: btnLeft}" @click="hiddenLeft(0)" class="hiddenBtn">
                    <img src="../../assets/image/flower/icon_show.png" alt />
                </p>
            </div>
            <div class="canvas">
                <img class="ruleImg" src="../../assets/image/flower/rule.png" alt />
                <div class="canBigbox" v-if="AIjson==''" @mouseenter="mouseInDiv" @mouseleave="mouseOutDiv">
                    <div v-if="backChange == 2" class="mould" :style="{background:canvasBack}"></div>
                    <img v-else-if="backChange == 1" class="mould" :src="backImage" alt />
                    <div
                            @mousedown.stop="listPull(index,$event)"
                            @mouseup.stop="listPush(index,$event)"
                            @click.stop="proClick(index)"
                            :style="{width: item.width*600/4724+'px',height:item.height*900/7087+'px','z-index': item.cnt,left: item.left,top: item.top,display: item.showEye?'block':'none',transform: 'scale('+item.zoom+') rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)' }"
                            v-for="(item,index) in list"
                            :key="index"
                            :class="item.show?'specialList':'proList'"
                            :ref="'imgBox'+index"
                    >
                        <img
                                :ref="'imgArea'+index"
                                :style="{width: item.width*600/4724+'px',height: item.height*900/7087+'px'}"
                                :src="item.picture"
                                alt
                        />
                        <div :class="item.show?'disHidd':'disNone'" class="mouse">
                            <!--右下角缩放点-->
                            <div
                                    :ref="'changeSizeAreaRightBottom'+index"
                                    class="changeSizeArea"
                                    :style="{left:item.width*600/4724/2-10+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup="changeSizeOver($event,index,'rightBottom')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'rightBottom')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--右上角缩放点-->
                            <div
                                    :ref="'changeSizeAreaRightTop'+index"
                                    class="changeSizeArea"
                                    :style="{left:item.width*600/4724/2-10+'px',top:-item.height*900/7087-15+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'rightTop')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'rightTop')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--左上角缩放点-->
                            <div
                                    :ref="'changeSizeAreaLeftTop'+index"
                                    class="changeSizeArea"
                                    :style="{left:-item.width*600/4724/2-10+'px',top:-item.height*900/7087-15+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'leftTop')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'leftTop')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--右下角缩放点-->
                            <div
                                    :ref="'changeSizeAreaLeftBottom'+index"
                                    class="changeSizeArea"
                                    :style="{left:-item.width*600/4724/2-10+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'leftBottom')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'leftBottom')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <div class="mouseItem1"></div>
                            <div id="rotateItem">
                                <img
                                        class="rotatebtn"
                                        :style="{padding:'20px '+item.width*600/4724/2+'px 20px ',left:-9-item.width*600/4724/2+'px',top:'-20px '}"
                                        src="../../assets/image/flower/change.png"
                                        @mousedown.stop="rotateStart($event,index)"
                                        @mousemove="rotate($event)"
                                        @mouseup="rotateOver($event,index)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- AI传的数据 -->
                <div class="canBigbox" v-if="AIjson!=''" @mouseenter="mouseInDiv" @mouseleave="mouseOutDiv">
                    <div v-if="backChange == 2" class="mould" :style="{background:canvasBack}"></div>
                    <img v-else-if="backChange == 1" class="mould" :src="backImage" alt />
                    <div
                            @mousedown.stop="listPull(index,$event)"
                            @mouseup.stop="listPush(index,$event)"
                            @click.stop="proClick(index)"
                            :style="{width: item.width*600/4724+'px','z-index': item.cnt,left: item.left,top: item.top,display: item.showEye?'block':'none',transform: 'scale('+item.zoom+') rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)' }"
                            v-for="(item,index) in list"
                            :key="index"
                            :class="item.show?'specialList':'proList'"
                            :ref="'imgBox'+index"
                    >
                        <img
                                :ref="'imgArea'+index"
                                :style="{width: item.width*600/4724+'px'}"
                                :src="item.picture"
                                alt
                        />
                        <div :class="item.show?'disHidd':'disNone'" class="mouse">
                            <!--右下角缩放点-->
                            <div
                                    :ref="'changeSizeAreaRightBottom'+index"
                                    class="changeSizeArea"
                                    :style="{left:item.width*600/4724/2-10+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup="changeSizeOver($event,index,'rightBottom')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'rightBottom')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--右上角缩放点-->
                            <div
                                    :ref="'changeSizeAreaRightTop'+index"
                                    class="changeSizeArea"
                                    :style="{left:item.width*600/4724/2-10+'px',top:-item.height*900/7087-15+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'rightTop')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'rightTop')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--左上角缩放点-->
                            <div
                                    :ref="'changeSizeAreaLeftTop'+index"
                                    class="changeSizeArea"
                                    :style="{left:-item.width*600/4724/2-10+'px',top:-item.height*900/7087-15+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'leftTop')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'leftTop')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <!--右下角缩放点-->
                            <div
                                    :ref="'changeSizeAreaLeftBottom'+index"
                                    class="changeSizeArea"
                                    :style="{left:-item.width*600/4724/2-10+'px'}"
                                    @mousemove="changeSize($event,index)"
                                    @mouseup.stop="changeSizeOver($event,index,'leftBottom')"
                            >
                                <div
                                        @mousedown.stop="changeSizeStart($event,index,'leftBottom')"
                                        class="changeSizeBtn"
                                ></div>
                            </div>
                            <div class="mouseItem1"></div>
                            <div id="rotateItem">
                                <img
                                        class="rotatebtn"
                                        :style="{padding:'20px '+item.width*600/4724/2+'px 20px ',left:-9-item.width*600/4724/2+'px',top:'-20px '}"
                                        src="../../assets/image/flower/change.png"
                                        @mousedown.stop="rotateStart($event,index)"
                                        @mousemove="rotate($event)"
                                        @mouseup="rotateOver($event,index)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
            </div>
            <div class="operateBox">
                <ul class="bBox">
                    <li>
                        <img
                                style="width: 1.25rem;"
                                @click="backStep"
                                src="../../assets/image/flower/back.png"
                                alt
                        />
                        <span class="bOperate">退一步</span>
                    </li>
                    <li>
                        <img
                                style="width: 1rem;"
                                @click="levelClick"
                                src="../../assets/image/flower/top.png"
                                alt
                        />
                        <span class="bOperate">水平翻转</span>
                    </li>
                    <li>
                        <img
                                sty
                                le="width: 1.375rem;"
                                @click="verticalClick"
                                src="../../assets/image/flower/left.png"
                                alt
                        />
                        <span class="bOperate">垂直翻转</span>
                    </li>
                    <li>
                        <img
                                style="width: 1.125rem;"
                                @click.stop="smallClick"
                                src="../../assets/image/flower/small.png"
                                alt
                        />
                        <span class="bOperate">缩放</span>
                        <div @click.stop="noneClick" :style="{display: showSmall}" class="bScroll">
                            <div class="bigScroll">
                                <div :style="{width: smallLeft}" class="white"></div>
                                <input @keyup="inputScale" v-model="zoom" type="text" />
                                <span :style="{left: smallLeft}" @mousedown="pull" @mouseup="push"></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img
                                style="width: 1.25rem;"
                                @click.stop="rotateClick"
                                src="../../assets/image/flower/rotate.png"
                                alt
                        />
                        <span class="bOperate">旋转</span>
                        <input
                                @click.stop="noneClick"
                                v-model="rotateDeg"
                                @keyup="trueRotate"
                                type="text"
                                :style="{display: showRotate}"
                                class="bInput"
                                placeholder="输入旋转角度"
                        />
                    </li>
                    <li>
                        <img style="width: 1.25rem;" @click="copy" src="../../assets/image/flower/copy.png" alt />
                        <span class="bOperate">拷贝</span>
                    </li>
                    <li>
                        <img
                                style="width: 1.375rem;"
                                @click="deleteCeng"
                                src="../../assets/image/flower/cendel.png"
                                alt
                        />
                        <span class="bOperate">删除</span>
                    </li>
                </ul>
                <div class="oBox">
                    <p class="backWrite"></p>
                    <h4>
                        画布尺寸
                        <span>40*60CM 300DPI</span>
                    </h4>
                    <div class="backBox">
                        <div>
                            <span>背景色</span>
                            <img v-if="backChange == 1" :src="backImg" alt />
                            <div class="backBoxItem" v-if="backChange == 2" :style="{background:canvasBack}"></div>
                        </div>
                        <img @click="delBack" src="../../assets/image/flower/cendel.png" alt />
                    </div>
                    <ul class="levelBox" id="levelBox">
                        <li>
                            <div @click="seeAll" class="eyeBox">
                                <img v-if="showAll" class="eye" src="../../assets/image/flower/show.png" alt />
                                <img v-else class="eye" src="../../assets/image/flower/hidden.png" alt />
                            </div>
                            <div @click="downList" class="rightBox">
                                <div class="proBox">
                                    <img
                                            :style="{transform: showDown ? '' : 'rotate(180deg)'}"
                                            class="downNav"
                                            src="../../assets/image/flower/down.png"
                                            alt
                                    />
                                    <span>主花组</span>
                                </div>
                                <img
                                        @click="deleteAll"
                                        class="delImg"
                                        src="../../assets/image/flower/cendel.png"
                                        alt
                                />
                            </div>
                        </li>
                        <li
                                v-if="showDown"
                                @click="listClick(index,$event)"
                                :style="{background: item.show?'#84c2e6':''}"
                                v-for="(item,index) in rightList"
                                :key="index"
                        >
                            <div @click="eyeClick(index,$event)" class="eyeBox">
                                <img v-if="item.showEye" class="eye" src="../../assets/image/flower/show.png" alt />
                                <img v-else class="eye" src="../../assets/image/flower/hidden.png" alt />
                            </div>
                            <div class="rightBox">
                                <div class="proBox">
                                    <img width="100%" class="proImg" :src="item.picture" alt />
                                </div>
                                <div class="imgBox">
                                    <img
                                            @click="copyOne(index,$event)"
                                            class="delImg"
                                            src="../../assets/image/flower/copy.png"
                                            alt
                                    />
                                    <img
                                            @click="deleteOne(index,$event)"
                                            class="delImg"
                                            src="../../assets/image/flower/cendel.png"
                                            alt
                                    />
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
                    <img src="../../assets/image/ai/close.png" alt />
                </p>
                <span>请先选择连晒方式</span>
                <ul class="grabWay">
                    <li>
                        <button @click="wayClick(2)">连晒预览</button>
                    </li>
                    <li>
                        <button @click="wayClick(1)">定位连晒</button>
                    </li>
                </ul>
            </div>
            <div class="picBox" style="height: 600px;width: 1000px" v-if="showPic&&picType==1">
                <h5>{{picName}}</h5>
                <p class="picDel" @click="delLook">
                    <img src="../../assets/image/ai/close.png" alt />
                </p>
                <div class="posBox" v-if="AIjson==''" >
                    <ul
                            :style="{background: lianS,'background-size': '100% 100%'}"
                            v-for="(bigItem,bigIndex) in 3"
                            :key="bigIndex"
                    >
                        <li
                                :style="{width: item.width*600/4724/2+'px',height:item.height*900/7087/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}"
                                v-for="(item,index) in list"
                                :key="index"
                                :class="item.show?'specialList':'proList'"
                        >
                            <img
                                    :style="{width: item.width*600/4724/2+'px',height: item.height*900/7087/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}"
                                    :src="item.picture"
                                    alt
                            />
                        </li>
                    </ul>
                </div>
                <!--  -->
                <div class="posBox" v-if="AIjson!=''">
                    <ul
                            :style="{background: lianS,'background-size': '100% 100%'}"
                            v-for="(bigItem,bigIndex) in 3"
                            :key="bigIndex"
                    >
                        <li
                                :style="{width: item.width*600/4724/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}"
                                v-for="(item,index) in list"
                                :key="index"
                                :class="item.show?'specialList':'proList'"
                        >
                            <img
                                    :style="{width: item.width*600/4724/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}"
                                    :src="item.picture"
                                    alt
                            />
                        </li>
                    </ul>
                </div>
                <!--  -->
            </div>
            <div class="picBox specialPic" v-if="showPic&&picType==2">
                <h5>{{picName}}</h5>
                <p class="picDel" @click="delLook">
                    <img src="../../assets/image/ai/close.png" alt />
                </p>
                <div class="linkBox" v-if="AIjson==''">
                    <ul
                            :style="{background: lianS,'background-size': '100% 100%'}"
                            v-for="(bigItem,bigIndex) in 4"
                            :key="bigIndex"
                    >
                        <li
                                :style="{width: item.width*600/4724/2+'px',height:item.height*900/7087/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}"
                                v-for="(item,index) in list"
                                :key="index"
                                :class="item.show?'specialList':'proList'"
                        >
                            <img
                                    :style="{width: item.width*600/4724/2+'px',height: item.height*900/7087/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}"
                                    :src="item.picture"
                                    alt
                            />
                        </li>
                    </ul>
                </div>
                <!-- AI传的数据 -->
                <div class="linkBox" v-if="AIjson!=''">
                    <ul
                            :style="{background: lianS,'background-size': '100% 100%'}"
                            v-for="(bigItem,bigIndex) in 4"
                            :key="bigIndex"
                    >
                        <li
                                :style="{width: item.width*600/4724/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',display: item.showEye?'block':'none',transform: 'scale('+item.zoom+')'}"
                                v-for="(item,index) in list"
                                :key="index"
                                :class="item.show?'specialList':'proList'"
                        >
                            <img
                                    :style="{width: item.width*600/4724/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}"
                                    :src="item.picture"
                                    alt
                            />
                        </li>
                    </ul>
                </div>
                <!--  -->
            </div>
        </div>
        <div class="bigModel" v-if="showBig">
            <div class="grabBox">
                <h3>提示</h3>
                <p class="del" @click="delBig">
                    <img src="../../assets/image/ai/close.png" alt />
                </p>
                <span class="specialSpan">今日次数已用完，VIP无限使用，是否前往充值VIP</span>
                <ul class="grabWay">
                    <li>
                        <button @click="delBig">取消</button>
                    </li>
                    <li>
                        <button @click="bigSure">确定</button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 支付弹窗 -->
        <div class="model" v-if="modelShow">
            <div class="payBox" v-if="showPay">
                <div class="payTitle">
                    <p>结算清单</p>
                </div>
                <hr style="background: #D8D8D8;width: 100%;" />
                <img @click="payShow" class="payDel" src="../../assets/image/user/carClose.png" alt />
                <ul class="payList">
                    <li v-for="(item,index) in payList" :key="index">
                        <img :src="item.picture_thumbnail" alt />
                        <p>花花币：{{item.price}}</p>
                    </li>
                </ul>
                <div class="payFoot">
                    <div class="payPrice">
            <span>
              总计
              <span>{{payPrice}}个花花币</span>
            </span>
                    </div>
                    <div class="payBtn" @click="toPay">立即结算</div>
                    <span>所有购买的花型只有使用权，没有版权。若出现版权纠纷，此平台不负任何责任。</span>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" v-model="urlChange" :url="urlChange" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
    import Tab from "@/components/Tab";
    import Jump from "@/components/Jump";
    import Loading from "@/components/Loading";
    import Scroll from "@/assets/js/scroll.js";
    export default {
        name: "Threed",
        components: {
            Tab,
            Loading,
            Jump,
        },
        data() {
            return {
                allZoom: 1,
                oldPointX: 0,
                oldPointY: 0,
                oldPointXX: 0,
                oldPointYY: 0,
                isRotate: false,
                inDiv: false, //shj判断鼠标是否在编辑div中
                isScroll: true, //shj判断是否可以素材缩放
                showJump: false,
                err: "",
                urlChange: false,
                tabIndex: 1,
                showLoading: false,
                // 路径
                path: "/Newoperate",
                // 选择样式
                select: [
                    {
                        name: "添加素材",
                        image: require("../../assets/image/flower/icon_source.png"),
                        show: false
                    },
                    {
                        name: "花型构图",
                        image: require("../../assets/image/flower/icon_pattern.png"),
                        show: false
                    },
                    {
                        name: "背景底纹",
                        image: require("../../assets/image/flower/icon_back.png"),
                        show: false
                    },
                    {
                        name: "手动配色",
                        image: require("../../assets/image/flower/icon_colour.png"),
                        show: false
                    }
                ],
                list: [],
                rightList: [],
                firstList: [],
                // 存储每次操作保存的数据
                operateList: [],
                // 背景图
                backImg: require("../../assets/image/flower/backcolor.png"),
                backImage: require("../../assets/image/flower/can.png"),
                backId: "",
                canvasBack: "",
                // 连晒预览
                showLook: false,
                showGrab: false,
                showPic: false,
                picType: 0,
                picName: "",
                // 判断是否点击
                isClick: false,
                // 每日免费次数
                showBig: false,
                // 选择缩放以及旋转
                showSmall: "none",
                showRotate: "none",
                // 缩放
                zoom: "100%",
                smallLeft: "95px",
                // 旋转角度
                rotateDeg: "",
                count: 0,
                rotation: "",
                // 列表显示
                showDown: true,
                // 眼睛显示
                showAll: true,
                topBtn: [
                    {
                        name: "印花",
                        show: true
                    },
                    {
                        name: "绣花",
                        show: false
                    },
                    {
                        name: "我的素材",
                        show: false
                    }
                ],
                classifyList: {
                    type: [],
                    style: [],
                    btn: [
                        {
                            name: "最新",
                            show: true
                        },
                        {
                            name: "热门",
                            show: false
                        }
                    ],
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
                styleName: "",
                showMine: true,
                // 配色信息
                message: {
                    cmyk: [0, 100, 100, 0],
                    hsv: [0, 1, 255],
                    rgb: [255, 0, 0],
                    color: "ff0000",
                    hue: 0,
                    saturation: 1,
                    lightness: 1,
                    threshold: 50
                },
                // 移动动画
                moveLeft: "70px",
                btnLeft: "442px",
                showSpan: false,
                whiteWidth: "20px",
                prevent: [],
                colorList: [],
                btnIndex: 0,
                hotName: "最新",
                // 页数
                pageNumber: "",
                rightNum: 0,
                moreIndex: 0,
                // 返回顶部按钮
                showTop: false,
                clock: null,
                classifyIndex: 1,
                bigImgList: [
                    {
                        id: "1",
                        url: require("../../assets/image/flower/img1.png"),
                        rgb: "#4d75fd"
                    },
                    {
                        id: "2",
                        url: require("../../assets/image/flower/img2.png"),
                        rgb: "#9fe26f"
                    },
                    {
                        id: "3",
                        url: require("../../assets/image/flower/img3.png"),
                        rgb: "#a8a8a8"
                    },
                    {
                        id: "4",
                        url: require("../../assets/image/flower/img4.png"),
                        rgb: "#d9d9d9"
                    },
                    {
                        id: "5",
                        url: require("../../assets/image/flower/img5.png"),
                        rgb: "#51dbe6"
                    },
                    {
                        id: "6",
                        url: require("../../assets/image/flower/img6.png"),
                        rgb: "#fa60ae"
                    },
                    {
                        id: "7",
                        url: require("../../assets/image/flower/img7.png"),
                        rgb: "#000000"
                    },
                    {
                        id: "8",
                        url: require("../../assets/image/flower/img8.png"),
                        rgb: "#fff762"
                    },
                    {
                        id: "9",
                        url: require("../../assets/image/flower/img9.png"),
                        rgb: "#b262e2"
                    },
                    {
                        id: "10",
                        url: require("../../assets/image/flower/img10.png"),
                        rgb: "#fb555c"
                    },
                    {
                        id: "11",
                        url: require("../../assets/image/flower/img11.png"),
                        rgb: "#fb000b"
                    },
                    {
                        id: "12",
                        url: require("../../assets/image/flower/img12.png"),
                        rgb: "#0029c3"
                    }
                ],
                // 切换背景显示
                backChange: 1,
                // 自定义颜色值
                colorValue: "",
                actUrl: require("../../assets/image/flower/Radio.png"),
                url: require("../../assets/image/flower/Checkbox.png"),
                imgColor: "",
                // 需要购买的花型
                modelShow: false,
                showPay: false,
                payList: [],
                payPrice: 0,
                payIds: "",
                // 连晒展示
                lianS: "",
                beforeZIndex: 99999999,
                //是否开始改变素材大小
                isChangeSize: false,
                //改变素材大小时，鼠标样式图片
                changeSizeCursorImg: require("../../assets/image/flower/changeSize.png"),
                //点击改变素材大小位置
                changeSizePosition: "",
                AIjson:''
            };
        },
        methods: {
            // 取色器中颜色变化时画布颜色改变
            colorCheck(event){
                this.colorValue = this.rgbtoColor(event);
            },
            //AI传过来的数据
            aijson() {
                let self = this;
                // console.log(this.AIjson);
                if(localStorage.getItem("AIjson")){
                    this.AIjson = localStorage.getItem("AIjson");
                    localStorage.removeItem("AIjson");
                    this.backImage = JSON.parse(this.AIjson).background;
                    this.backImg = JSON.parse(this.AIjson).background;
                    this.backId = JSON.parse(this.AIjson).backId;
                    this.list = JSON.parse(this.AIjson).elements;
                    for (let i = 0; i < this.list.length; i++) {
                        self.rightList.push(this.list[i]);
                        self.firstList.push(this.list[i]);
                    }
                    self.judge(1);
                }
                this.$forceUpdate();
            },
            // 连晒展示
            lianSChange() {
                if (this.backImg) {
                    this.lianS = `url('${this.backImage}') no-repeat center`; //shj20191031修复连晒问题
                    // console.log(this.lianS)
                } else {
                    this.lianS = this.canvasBack;
                }
            },
            // 刷新
            changeEnglish() {
                this.$router.go(0);
            },
            // 判断
            judge(str) {
                let self = this;

                self.isRotate = false;

                let flag = true;
                if (str) {
                    flag = false;
                }
                this.list.map(function(item, index) {
                    let posx, posy;
                    let order = item.order;
                    let cosWidth =
                        Math.abs(
                            (((item.width / 2) * 600) / 4724) *
                            Math.cos((item.rotateZ / 180.0) * Math.PI)
                        ) +
                        Math.abs(
                            (((item.height / 2) * 900) / 7087) *
                            Math.sin((item.rotateZ / 180.0) * Math.PI)
                        );
                    let cosHeight =
                        Math.abs(
                            (((item.height / 2) * 900) / 7087) *
                            Math.cos((item.rotateZ / 180.0) * Math.PI)
                        ) +
                        Math.abs(
                            (((item.width / 2) * 600) / 4724) *
                            Math.sin((item.rotateZ / 180.0) * Math.PI)
                        );
                    cosWidth *= item.zoom;
                    cosHeight *= item.zoom;
                    if (item.posX - cosWidth < 0 && !item.isCreate[0]) {
                        item.isCreate[0] = true;
                        if (item.elements[3]) {
                            if (item.elements[3].isCreate[7]) {
                                return;
                            }
                            item.elements[3].isCreate[7] = true;
                        }
                        if (item.elements[2]) {
                            if (item.elements[2].isCreate[5]) {
                                return;
                            }
                            item.elements[2].isCreate[5] = true;
                        }
                        posx = item.posX + 600;
                        posy = item.posY;
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[1] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[1] = item;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (item.posX + cosWidth > 600 && !item.isCreate[1]) {
                        item.isCreate[1] = true;
                        if (item.elements[3]) {
                            if (item.elements[3].isCreate[6]) {
                                return;
                            }
                            item.elements[3].isCreate[6] = true;
                        }
                        if (item.elements[2]) {
                            if (item.elements[2].isCreate[4]) {
                                return;
                            }
                            item.elements[2].isCreate[4] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[0] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[0] = item;
                        posx = item.posX - 600;
                        posy = item.posY;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (item.posY + cosHeight > 900 && !item.isCreate[2]) {
                        item.isCreate[2] = true;
                        if (item.elements[1]) {
                            if (item.elements[1].isCreate[7]) {
                                return;
                            }
                            item.elements[1].isCreate[7] = true;
                        }
                        if (item.elements[0]) {
                            if (item.elements[0].isCreate[6]) {
                                return;
                            }
                            item.elements[0].isCreate[6] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[3] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[3] = item;
                        posx = item.posX;
                        posy = item.posY - 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (item.posY - cosHeight < 0 && !item.isCreate[3]) {
                        item.isCreate[3] = true;
                        if (item.elements[1]) {
                            if (item.elements[1].isCreate[5]) {
                                return;
                            }
                            item.elements[1].isCreate[5] = true;
                        }
                        if (item.elements[0]) {
                            if (item.elements[0].isCreate[4]) {
                                return;
                            }
                            item.elements[0].isCreate[4] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[2] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[2] = item;
                        posx = item.posX;
                        posy = item.posY + 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (
                        item.posY - cosHeight < 0 &&
                        item.posX + cosWidth > 600 &&
                        !item.isCreate[4]
                    ) {
                        item.isCreate[4] = true;
                        if (item.elements[1]) {
                            if (item.elements[1].isCreate[3]) {
                                return;
                            }
                            item.elements[1].isCreate[3] = true;
                        }
                        if (item.elements[3]) {
                            if (item.elements[3].isCreate[1]) {
                                return;
                            }
                            item.elements[3].isCreate[1] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[7] = true;
                        iscreate[2] = true;
                        iscreate[0] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[7] = item;
                        posx = item.posX - 600;
                        posy = item.posY + 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (
                        item.posY - cosHeight < 0 &&
                        item.posX - cosWidth < 0 &&
                        !item.isCreate[5]
                    ) {
                        item.isCreate[5] = true;
                        if (item.elements[0]) {
                            if (item.elements[0].isCreate[3]) {
                                return;
                            }
                            item.elements[0].isCreate[3] = true;
                        }
                        if (item.elements[3]) {
                            if (item.elements[3].isCreate[0]) {
                                return;
                            }
                            item.elements[3].isCreate[0] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[6] = true;
                        iscreate[2] = true;
                        iscreate[1] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[6] = item;
                        posx = item.posX + 600;
                        posy = item.posY + 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    if (
                        item.posY + cosHeight > 900 &&
                        item.posX + cosWidth > 600 &&
                        !item.isCreate[6]
                    ) {
                        item.isCreate[6] = true;
                        if (item.elements[1]) {
                            if (item.elements[1].isCreate[2]) {
                                return;
                            }
                            item.elements[1].isCreate[2] = true;
                        }
                        if (item.elements[2]) {
                            if (item.elements[2].isCreate[1]) {
                                return;
                            }
                            item.elements[2].isCreate[1] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[5] = true;
                        iscreate[3] = true;
                        iscreate[0] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[5] = item;
                        posx = item.posX - 600;
                        posy = item.posY - 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    } else if (
                        item.posY + cosHeight > 900 &&
                        item.posX - cosWidth < 0 &&
                        !item.isCreate[7]
                    ) {
                        item.isCreate[7] = true;
                        if (item.elements[0]) {
                            if (item.elements[0].isCreate[2]) {
                                return;
                            }
                            item.elements[0].isCreate[2] = true;
                        }
                        if (item.elements[2]) {
                            if (item.elements[2].isCreate[0]) {
                                return;
                            }
                            item.elements[2].isCreate[0] = true;
                        }
                        let iscreate = [];
                        for (let i = 0; i < 8; i++) {
                            iscreate[i] = false;
                        }
                        iscreate[4] = true;
                        iscreate[3] = true;
                        iscreate[1] = true;
                        let elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        elements[4] = item;
                        posx = item.posX + 600;
                        posy = item.posY - 900;
                        self.list.push({
                            width: self.list[index].width,
                            height: self.list[index].height,
                            top: posy - (item.height * 900) / 7087 / 2 + "px",
                            left: posx - (item.width * 600) / 4724 / 2 + "px",
                            picture: self.list[index].picture,
                            showEye: true,
                            show: flag,
                            zoom: self.list[index].zoom,
                            rotateX: self.list[index].rotateX,
                            rotateY: self.list[index].rotateY,
                            rotateZ: self.list[index].rotateZ,
                            posX: posx,
                            posY: posy,
                            order: order,
                            elements: elements,
                            isCreate: iscreate
                        });
                    }
                    self.$forceUpdate();
                });
            },
            // 连晒预览
            look() {
                this.lianSChange();
                this.$forceUpdate();
                this.showLook = true;
                this.showGrab = true;
                this.showPic = false;
            },
            // 关闭弹窗
            delLook() {
                this.showLook = false;
                this.showGrab = false;
                this.showPic = false;
            },
            wayClick(index) {
                var self = this;
                if (this.list.length) {
                    this.showGrab = false;
                    this.showPic = true;
                    if (index == 1) {
                        this.picType = 1;
                        this.picName = "定位预览";
                    } else if (index == 2) {
                        this.picType = 2;
                        this.picName = "连晒预览";
                    }
                } else {
                    this.delLook();
                    this.showJump = true;
                    this.err = "请先添加素材";
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                }
            },
            // 前往vip页面充值
            bigSure() {
                this.$router.push({
                    path: "/Vip"
                });
            },
            // 关闭
            delBig() {
                this.showBig = false;
            },
            // 保存
            save() {
                let self = this;
                this.showLoading = true;
                this.rightList.map(function(item) {
                    item.imageUrl = item.picture;
                });
                let element = [];
                let filp = [];
                this.rightList.map(function(item, i) {
                    if ((item.rotateX / 180) % 2 == 1 && (item.rotateY / 180) % 2 == 0) {
                        filp[i] = 1;
                    } else if (
                        (item.rotateY / 180) % 2 == 1 &&
                        (item.rotateX / 180) % 2 == 0
                    ) {
                        filp[i] = 2;
                    } else {
                        filp[i] = 0;
                    }
                    let o = {
                        imageUrl: item.picture,
                        flip: filp[i],
                        posX: item.posX,
                        posY: item.posY,
                        id: item.id,
                        order: item.order,
                        width: (item.width * 600) / 4724,
                        height: (item.height * 900) / 7087,
                        zoom: item.zoom,
                        rotation: item.rotateZ
                    };
                    element.push(o);
                });
                let formData = new FormData();
                let json = {};
                json.elements = element;
                if (this.backImg) {
                    if (this.backImg.indexOf("http") < 0) {
                        json.background = "";
                    } else {
                        json.background = this.backImage;
                    }
                    json.backId = this.backId;
                } else {
                    let color = this.colortoRgb(this.canvasBack);
                    if (color) {
                        json.rgb = color.toString();
                    } else {
                        json.background = "";
                    }
                }
                formData.append("cartStatus", 0);
                formData.append("myStatus", 0);
                formData.append("source_file", JSON.stringify(json));
                formData.append("resolution_ratio", 300);
                formData.append("size_height", 60);
                formData.append("size_width", 40);
                formData.append("format", "png");
                formData.append("hierarchy", 0);
                formData.append("type", 1);
                let obj = {
                    url: this.all.baseUrl + "/new/userFlowers/addUserFlowers",
                    formdata: formData
                };
                if (json.elements.length > 0) {
                    this.getData(obj).then(res => {
                        setTimeout(function() {
                            self.showLoading = false;
                        }, 500);
                        if (res.data.status == 0) {
                            this.showJump = true;
                            this.err = "保存成功";
                            setTimeout(function() {
                                self.showJump = false;
                                self.err = "";
                            }, 1500);
                        } else if (res.data.status == 1) {
                            // 如果列表中有商城花型则弹出支付窗口
                            let ids = [];
                            this.payList = res.data.result;
                            for (let i = 0; i < res.data.result.length; i++) {
                                this.payPrice += res.data.result[i].price;
                                ids.push(res.data.result[i].id);
                            }
                            this.payIds = ids.toString();
                            this.modelShow = true;
                            this.showPay = true;
                            this.$forceUpdate();
                        } else if (res.data.status == -95) {
                            this.showJump = true;
                            this.err = res.data.msg;
                            setTimeout(function() {
                                self.showJump = false;
                                self.err = "";
                                localStorage.clear();
                                if(json.background){
                                    localStorage.setItem('backImg',json.background)
                                }else if(json.rgb){
                                    localStorage.setItem('canvasBack',self.canvasBack)
                                }
                                localStorage.setItem('operateList',JSON.stringify(self.list));
                                self.$router.push({
                                    path: "/Login"
                                });
                            }, 1500);
                        } else {
                            this.showJump = true;
                            this.err = res.data.msg;
                            setTimeout(function() {
                                self.showJump = false;
                                self.err = "";
                            }, 1500);
                        }
                    });
                } else {
                    self.showLoading = false;
                    this.showJump = true;
                    this.err = "请先添加素材";
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                }
            },
            // 购买商城中的花型
            toPay() {
                let formdata = new FormData();
                formdata.append("ids", this.payIds);
                let obj = {
                    url:
                    this.all.baseUrl + "/new/materialLibrary/buyMaterialLibrarysFromShop",
                    formdata: formdata
                };
                let self = this;
                this.getData(obj).then(res => {
                    if (res.data.status == 0) {
                        self.save();
                        setTimeout(function() {
                            self.showPay = false;
                            self.modelShow = false;
                            self.$forceUpdate();
                        }, 1500);
                    } else {
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                        }, 1500);
                    }
                });
            },
            // 关闭购买弹窗
            payShow() {
                this.showPay = false;
                this.modelShow = false;
                this.$forceUpdate();
            },
            newSave(str) {
                let self = this;
                let formData = new FormData();
                formData.append("myStatus", 1);
                formData.append("targetId", str);
                let arr = [];
                if (localStorage.getItem("specialType") == 2) {
                    this.rightList.map(function(item) {
                        arr.push(item.id);
                    });
                    formData.append("idListJson", arr);
                }
                // 商城花型
                let obj = {
                    url: this.all.baseUrl + "/app3dFlowerTypeShoppingCartJyg/save",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    if (res.data.status == 0) {
                        this.showJump = true;
                        this.err = "已保存至我的花型";
                        this.urlChange = true;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            // 清空画布
            clearCanvas() {
                // console.log(this.list)
                this.list = [];
                this.rightList = [];
                this.operateList = [];
                this.hiddenLeft(0);
                this.backImg = require("../../assets/image/flower/can.png");
                this.backImage = require("../../assets/image/flower/can.png");
                this.colorValue = "";
                this.canvasBack = "";
                this.backChange = 1;
                localStorage.removeItem("operateList");
                this.backId = "";

                this.firstList = []; //shj20191031,修复清空清空下素材没有清空的问题

                // console.log(this.list);
                // console.log(this.$data)
                this.$forceUpdate();
            },
            // 获取参数并设置初始位置
            getParameter() {
                let self = this;
                if (JSON.parse(localStorage.getItem("operateList"))) {
                    this.list = JSON.parse(localStorage.getItem("operateList"));
                    if(localStorage.getItem("backImg")){
                        this.backImg = localStorage.getItem("backImg");
                        this.backImage = localStorage.getItem("backImg");
                        localStorage.removeItem('backImg');
                    }else if(localStorage.getItem("canvasBack")){
                        this.colorValue = localStorage.getItem("canvasBack");
                        localStorage.removeItem('canvasBack');
                    }
                    localStorage.removeItem('operateList');
                } else {
                    this.list = [];
                }
                let img = new Image();
                if (this.list.length) {
                    this.list.map(function(item) {
                        item.show = false;
                        item.showEye = true;
                        self.rightList.push(item);
                        self.firstList.push(item);
                    });
                    this.list.map(function(item, index) {
                        item.cnt = index;
                        item.show = false;
                        item.showEye = true;
                        item.isCreate = [];
                        item.order = index;
                        for (let i = 0; i < 8; i++) {
                            item.isCreate[i] = false;
                        }
                        item.elements = [];
                        for (let i = 0; i < 8; i++) {
                            item.elements[i] = "";
                        }
                        if (item.pictureThumbnail) {
                            item.picture = item.pictureThumbnail;
                        }
                        if (item.top || item.left) {
                            item.posX = parseFloat(item.left) + (item.width * 600) / 4724 / 2;
                            item.posY = parseFloat(item.top) + (item.height * 900) / 7087 / 2;
                        } else {
                            item.rotateX = 0;
                            item.rotateY = 0;
                            item.rotateZ = 0;
                            item.zoom = 1;
                            switch (index % 6) {
                                case 0:
                                    item.left = "250px";
                                    item.top = "400px";
                                    break;
                                case 1:
                                    item.left = "50px";
                                    item.top = "2px";
                                    break;
                                case 2:
                                    item.left = "300px";
                                    item.top = "100px";
                                    break;
                                case 3:
                                    item.left = "200px";
                                    item.top = "600px";
                                    break;
                                case 4:
                                    item.left = "50px";
                                    item.top = "550px";
                                    break;
                                case 5:
                                    item.left = "500px";
                                    item.top = "300px";
                                    break;
                            }
                            if (item.width <= 100) {
                                item.width = 10 * item.width;
                                item.height = 10 * item.height;
                            }
                            if (item.height <= 100) {
                                item.width = 10 * item.width;
                                item.height = 10 * item.height;
                            }
                            img.src = item.picture;
                            item.posX = parseFloat(item.left) + (item.width * 600) / 4724 / 2;
                            item.posY = parseFloat(item.top) + (item.height * 900) / 7087 / 2;
                        }
                        self.judge(1);
                    });
                }
            },
            // 左侧选择点击
            changeMessage(index) {
                clearInterval(this.clock);
                this.colorList = [];
                this.moveLeft = "70px";
                this.btnLeft = "372px";
                this.select.map(function(item) {
                    item.show = false;
                });
                this.select[index].show = true;
                if (this.leftNav == index) {
                    this.leftCnt++;
                } else {
                    this.leftCnt = 1;
                }
                if (this.leftCnt % 2 == 0) {
                    this.hiddenLeft(0);
                    return;
                } else {
                    this.moveLeft = "0";
                    this.btnLeft = "372px";
                    this.showLeft = true;
                    this.hiddenLeft(1);
                }
                this.showSpan = false;
                this.leftNav = index;
                this.cnt = 1;
                this.mineCnt = 1;
                this.mineList = [];
                this.pageNumber = "";
                this.proList = [];
                if (index == 0) {
                    this.topClick(0);
                    this.topBtn = [
                        {
                            name: "印花",
                            show: true
                        },
                        {
                            name: "绣花",
                            show: false
                        },
                        {
                            name: "我的素材",
                            show: false
                        }
                    ];
                } else if (index == 1) {
                    this.topBtn = [
                        {
                            name: "共享模板",
                            show: true
                        },
                        {
                            name: "定位花型",
                            show: false
                        }
                    ];
                    this.getPattern(0);
                } else if (index == 2) {
                    this.showMore = false;
                    this.showMine = true;
                    this.styleName = "";
                    this.topBtn = [
                        {
                            name: "共享底纹",
                            show: true
                        },
                        {
                            name: "我的底纹",
                            show: false
                        }
                    ];
                    this.topClick(0);
                } else {
                    this.topBtn = [
                        {
                            name: "素材",
                            show: true
                        },
                        {
                            name: "底纹",
                            show: false
                        }
                    ];
                    this.topClick(0);
                    this.btnIndex = 0;
                }
                this.$forceUpdate();
            },
            // 返回顶部
            toTop(e) {
                document.querySelector(".addBox").scrollTop = 0;
                this.showTop = false;
            },
            // 收起
            hiddenLeft(index) {
                let speed;
                if (index == 0) {
                    speed = 10;
                } else {
                    speed = -10;
                }
                let self = this;
                this.clock = setInterval(function() {
                    if (index == 0 && parseInt(self.moveLeft) <= -202) {
                        self.showLeft = false;
                        self.select.map(function(item) {
                            item.show = false;
                        });
                        self.leftNav = -1;
                        self.proList = [];
                        self.mineList = [];
                        clearInterval(self.clock);
                    } else if (index == 1 && parseInt(self.moveLeft) >= 70) {
                        clearInterval(self.clock);
                    } else {
                        self.moveLeft = parseInt(self.moveLeft) - speed + "px";
                        self.btnLeft = parseInt(self.btnLeft) - speed + "px";
                    }
                }, 10);
            },
            // 按钮点击
            topClick(index) {
                this.rightNum = index;
                this.topBtn.map(function(item) {
                    item.show = false;
                });
                this.showTop = false;
                this.topBtn[index].show = true;
                this.proList = [];
                this.colorList = [];
                this.mineCnt = 1;
                this.mineList = [];
                this.cnt = 1;
                this.pageNumber = "";
                if (this.leftNav == 0) {
                    if (index == 2) {
                        this.showHot = false;
                        this.getMine(1);
                    } else {
                        this.showHot = true;
                        this.getClassifyList();
                        this.message.printingOrEmbroider = index;
                        this.getShare(this.message);
                    }
                } else if (this.leftNav == 1) {
                    this.getPattern(index);
                } else if (this.leftNav == 2) {
                    if (index == 0) {
                        this.showMine = true;
                        this.showMore = false;
                        this.getToplist();
                    } else {
                        this.showMine = false;
                        this.showMore = true;
                        this.getMine(3);
                    }
                } else {
                    this.btnIndex = index;
                    this.getColour();
                }
                this.$forceUpdate();
            },
            // 上传素材
            add(e) {
                this.url = [];
                let self = this;
                let files = e.target.files;
                if (files[0].size > 20971520) {
                    this.showJump = true;
                    this.err = "文件大小超过20MB";
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 2000);
                }else{
                    for (let i = 0; i < files.length; i++) {
                        this.url.push(e.target.files[i]);
                    }
                    if (!e || !window.FileReader) return; // 看支持不支持FileReader
                    this.url.map(function(item, index) {
                        if (self.leftNav == 0) {
                            if (
                                self.url[index].name.substring(
                                    self.url[index].name.length - 3,
                                    self.url[index].name.length
                                ) != "png"
                            ) {
                                self.showJump = true;
                                self.err = "只支持上传png格式图片";
                                self.urlChange = false;
                                Scroll.stop();
                                setTimeout(function() {
                                    Scroll.move();
                                    self.showJump = false;
                                    self.err = "";
                                }, 2000);
                                return;
                            }
                        }
                        let reader = new FileReader();
                        reader.readAsDataURL(item); // 这里是最关键的一步，转换就在这里
                        reader.onloadend = function() {
                            // 增加一个
                            self.showLoading = true;
                            let formData = new FormData();
                            formData.append("file", item);
                            let obj = {
                                url: self.all.baseUrl + "/file/upload",
                                formdata: formData
                            };
                            self.getData(obj).then(res => {
                                self.upSource(res.data.result);
                            });
                        };
                    });
                }
            },
            upSource(str) {
                let formData = new FormData();
                let self = this;
                formData.append("picture", str);
                formData.append("type1", this.leftNav + 1);
                let obj = {
                    url: this.all.baseUrl + "/app3dMaterialLibraryMyJyg/save",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    self.showLoading = false;
                    if (res.data.status == 0) {
                        this.showJump = true;
                        Scroll.stop();
                        this.err = "新增成功";
                        this.urlChange = true;
                        this.mineCnt = 1;
                        this.mineList = [];
                        this.getMine(this.leftNav + 1);
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        Scroll.stop();
                        this.urlChange = false;
                        this.err = res.data.msg;
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1000);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    }
                });
            },
            // 添加素材数据
            // 我的素材
            getMine(type) {
                if (this.mineCnt == 1) {
                    this.showLoading = true;
                } else {
                    this.showSpan = true;
                }
                Scroll.stop();
                var self = this;
                var formData = new FormData();
                formData.append("pageSize", 50);
                formData.append("page", this.mineCnt);
                formData.append("type1", type);
                var obj = {
                    url: this.all.baseUrl + "/app3dMaterialLibraryMyJyg/list",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                        self.showSpan = false;
                        Scroll.move();
                    }, 1000);
                    if (res.data.status == 0) {
                        var result = res.data.result;
                        var list = result.list;
                        this.pageNumber = result.pages;
                        this.mineList = this.mineList.concat(list);
                        this.hanleScroll();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1000);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    }
                });
            },
            // 共享素材和商城素材请求数据
            getShare(message) {
                // this.showLoading = true;
                if (this.cnt == 1) {
                    this.showLoading = true;
                } else {
                    this.showSpan = true;
                }
                Scroll.stop();
                var formData = new FormData();
                var self = this;
                formData.append("pageSize", 50);
                formData.append("page", this.cnt);
                // 选择印花或者绣花
                if (message && message.printingOrEmbroider) {
                    formData.append("printingOrEmbroider", message.printingOrEmbroider);
                } else {
                    formData.append("printingOrEmbroider", 0);
                }
                // 选择热门或者最新
                if (message && message.orderBy) {
                    formData.append("orderBy", message.orderBy);
                } else {
                    formData.append("orderBy", 1);
                }
                // 选择大类型
                if (message && message.genre1) {
                    formData.append("genre1", message.genre1);
                } else {
                    formData.append("genre1", 1);
                }
                // 选择小类型
                if (message && message.genre2) {
                    formData.append("genre2", message.genre2);
                }
                // 选择风格
                if (message && message.styleType) {
                    formData.append("styleType", message.styleType);
                }
                // 选择共享素材或者商城素材
                if (message && message.type) {
                    formData.append("type", message.type);
                }
                let obj = {
                    url: this.all.baseUrl + "/app3dMaterialLibraryJyg/list",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                        self.showSpan = false;
                    }, 1000);
                    Scroll.move();
                    if (res.data.status == 0) {
                        var result = res.data.result;
                        this.pageNumber = result.pages;
                        var n = true;
                        var str = "";
                        var arr = [];
                        if (localStorage.getItem("indexArr")) {
                            str = localStorage.getItem("indexArr");
                            arr = str.split(",");
                        }
                        this.proList = this.proList.concat(result.list);
                        this.proList.map(function(item, index) {
                            item.size = (item.size / 1024 / 1024).toFixed(2);
                            item.show = false;
                            if (arr.length) {
                                arr.map(function(arrItem, arrIndex) {
                                    if (arrItem == item.id) {
                                        item.show = true;
                                    }
                                });
                            }
                        });
                        this.hanleScroll();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1000);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    }
                });
            },
            // 获取头部分页的json数据
            getClassifyList() {
                var formData = new FormData();
                var self = this;
                formData.append("id", 4);
                let obj = {
                    url: this.all.baseUrl + "/config/info",
                    formdata: formData
                };
                this.getData(obj).then(res => {
                    if (res.data.status == 0) {
                        let result = res.data.result;
                        if (this.classifyIndex == 1) {
                            this.classifyList.type = JSON.parse(result.json1).pdMenu;
                            this.classifyList.style = JSON.parse(result.json2).pdStyle;
                            this.classifyList.type.map(function(item) {
                                item.active = false;
                                item.show = false;
                                item.list.map(function(listItem) {
                                    listItem.active = false;
                                });
                            });
                            this.classifyList.type[0].active = true;
                            this.classifyList.style.map(function(item) {
                                item.active = false;
                            });
                        }
                        this.classifyIndex++;
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.urlChange = false;
                        this.err = res.data.msg;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1000);
                    } else {
                        this.showJump = true;
                        this.urlChange = false;
                        this.err = res.data.msg;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    }
                });
            },
            // 增加素材
            addList(index) {
                let self = this;
                this.undo();
                let newList = [];
                let img = new Image();
                let pWidth, pHeight;
                if (this.showHot) {
                    newList = this.proList;
                } else {
                    newList = this.mineList;
                }
                img.src = newList[index].pictureThumbnail;
                pWidth = img.width;
                pHeight = img.height;
                if (this.rightNum == 2) {
                    if (pWidth <= 100) {
                        pWidth *= 10;
                        pHeight *= 10;
                    }
                    if (pHeight <= 100) {
                        pWidth *= 10;
                        pHeight *= 10;
                    }
                } else {
                    pWidth *= 1.5;
                    pHeight *= 1.5;
                }
                let obj = {
                    width: pWidth,
                    height: pHeight,
                    top: "400px",
                    left: "250px",
                    picture: newList[index].pictureThumbnail,
                    showEye: true,
                    id: newList[index].id,
                    posX: 250 + (pWidth * 600) / 4724 / 2,
                    posY: 400 + (pHeight * 900) / 7087 / 2,
                    show: false,
                    zoom: 1,
                    isCreate: [false, false, false, false, false, false, false, false],
                    elements: ["", "", "", "", "", "", "", ""],
                    order: self.list.length + 1,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0
                };
                self.list.push(obj);
                self.judge(1);
                self.rightList.push(obj);
                self.firstList.push(obj);
                self.$forceUpdate();
            },
            // 类型点击
            clickType(index) {
                let self = this;
                this.page = [];
                this.proList = [];
                this.cnt = 1;
                this.pageIndex = 1;
                this.classifyList.type.map(function(item) {
                    item.active = false;
                });
                this.classifyList.type[index].active = true;
                this.classifyList.type[index].list.map(function(item) {
                    item.active = false;
                });
                this.message.genre1 = this.classifyList.type[index].id;
                delete this.message.genre2;
                this.getShare(this.message);
            },
            // 点击每个下拉列表里的内容
            updateMessage(index, listIndex) {
                let self = this;
                this.page = [];
                this.proList = [];
                this.cnt = 1;
                this.pageIndex = 1;
                this.classifyList.type.map(function(item) {
                    item.active = false;
                    item.list.map(function(listItem) {
                        listItem.active = false;
                    });
                });
                this.classifyList.type[index].active = true;
                this.classifyList.type[index].list.map(function(item) {
                    item.active = false;
                });
                this.classifyList.type[index].list[listIndex].active = true;
                this.message.genre1 = this.classifyList.type[index].id;
                this.message.genre2 = this.classifyList.type[index].list[listIndex].id;
                this.getShare(this.message);
            },
            // 风格点击
            clickStyle(index) {
                let self = this;
                this.page = [];
                this.proList = [];
                this.cnt = 1;
                this.pageIndex = 1;
                this.classifyList.style.map(function(item, mapIndex) {
                    if (mapIndex != index) {
                        item.active = false;
                    }
                });
                this.classifyList.style[index].active = !this.classifyList.style[index]
                    .active;
                if (this.classifyList.style[index].active == true) {
                    this.message.styleType = this.classifyList.style[index].id;
                } else {
                    this.message.styleType = "";
                }
                this.getShare(this.message);
            },
            // 按钮点击
            clickBtn(index) {
                let self = this;
                this.cnt = 1;
                this.proList = [];
                this.classifyList.btn.map(function(item) {
                    item.show = false;
                });
                this.classifyList.btn[index].show = true;
                if (index == 0) {
                    this.message.orderBy = 1;
                } else if (index == 1) {
                    this.message.orderBy = 2;
                }
                this.hotName = this.classifyList.btn[index].name;
                this.getShare(this.message);
            },
            // 花型构图
            getPattern(index) {
                let formData = new FormData();
                let self = this;
                if (this.cnt == 1) {
                    this.showLoading = true;
                } else {
                    this.showSpan = true;
                }
                formData.append("pageSize", 18);
                formData.append("page", this.cnt);
                formData.append("genre1", index + 1);
                let obj = {
                    formdata: formData,
                    url: this.all.baseUrl + "/flowerTemplate/list"
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                        self.showSpan = false;
                    }, 1000);
                    if (res.data.status == 0) {
                        let result = res.data.result;
                        result.list.map(function(item) {
                            item.show = false;
                        });
                        this.pageNumber = result.pages;
                        this.proList = this.proList.concat(result.list);
                        this.$forceUpdate();
                        this.hanleScroll();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            // 背景图片点击
            backClick(index) {
                let self = this;
                if (this.list.length) {
                    this.undo();
                    this.proList.map(function(item) {
                        item.show = false;
                    });
                    this.proList[index].show = true;
                    this.$forceUpdate();
                    this.getInfo(this.proList[index].id);
                } else {
                    this.showJump = true;
                    this.err = "请先添加素材";
                    this.urlChange = false;
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                }
            },
            getInfo(str) {
                let formData = new FormData();
                let self = this;
                formData.append("id", str);
                let obj = {
                    formdata: formData,
                    url: this.all.baseUrl + "/flowerTemplate/info"
                };
                this.getData(obj).then(res => {
                    if (res.data.status == 0) {
                        let cnt;
                        let result = JSON.parse(res.data.result.templateData);
                        result.elements.map(function(item, i) {
                            cnt = Math.floor(self.firstList.length * Math.random());
                            item.picture = self.firstList[cnt].picture;
                            item.pictureWidth = self.firstList[cnt].width;
                            item.pictureHeight = self.firstList[cnt].height;
                            item.isCreate = [];
                            item.order = i;
                            for (let i = 0; i < 8; i++) {
                                item.isCreate[i] = false;
                            }
                            item.elements = [];
                            for (let i = 0; i < 8; i++) {
                                item.elements[i] = "";
                            }
                            if (item.flip == 0) {
                                item.rotateX = 0;
                                item.rotateY = 0;
                            } else if (item.flip == 1) {
                                item.rotateX = 180;
                                item.rotateY = 0;
                            } else if (item.flip == 2) {
                                item.rotateX = 0;
                                item.rotateY = 180;
                            }
                            if (
                                item.pictureHeight / item.pictureWidth >
                                item.height / item.width
                            ) {
                                item.width = (item.width * 4724) / 600;
                                item.height =
                                    (item.pictureHeight / item.pictureWidth) * item.width;
                            } else {
                                item.height = (item.height * 4724) / 600;
                                item.width =
                                    (item.pictureWidth / item.pictureHeight) * item.height;
                            }
                            item.rotateZ = item.rotation;
                            item.left = item.posX - (item.width / 2 / 4724) * 600 + "px";
                            item.top = item.posY - (item.height / 2 / 7087) * 900 + "px";
                            item.show = false;
                            item.showEye = true;
                        });
                        this.list = result.elements;
                        this.rightList = [];
                        this.list.map(function(item) {
                            self.rightList.push(item);
                        });
                        this.judge(1);
                        this.$forceUpdate();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            // 背景底纹
            getShading(id, index) {
                let formData = new FormData();
                this.classifyList.styleList[index].list = [];
                let self = this;
                if (this.cnt == 1) {
                    this.showLoading = true;
                } else {
                    this.showSpan = true;
                }
                formData.append("pageSize", 18);
                formData.append("page", this.cnt);
                if (id != 0) {
                    formData.append("type1", id);
                }
                let obj = {
                    formdata: formData,
                    url: this.all.baseUrl + "/app3dShadingJyg/list"
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                        self.showSpan = false;
                    }, 1000);
                    if (res.data.status == 0) {
                        let result = res.data.result;
                        this.pageNumber = result.pages;
                        let newList = [];
                        result.list.map(function(item, newIndex) {
                            item.show = false;
                            if (newIndex < 2) {
                                newList.push(item);
                            }
                        });
                        if (this.showMore) {
                            this.mineList = this.mineList.concat(result.list);
                        } else {
                            this.classifyList.styleList[index].list = newList;
                        }
                        this.hanleScroll(index);
                        this.$forceUpdate();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            getToplist() {
                let formData = new FormData();
                let self = this;
                formData.append("id", 15);
                let obj = {
                    url: this.all.baseUrl + "/config/info",
                    formdata: formData
                };
                this.classifyList.styleList = [];
                this.getData(obj).then(res => {
                    if (res.data.status == 0) {
                        let result = res.data.result;
                        let data = JSON.parse(result.json1).background;
                        data.map(function(item, index) {
                            item.show = false;
                            if (index != 0) {
                                self.classifyList.styleList.push(item);
                            }
                        });
                        self.classifyList.styleList.map(function(item, index) {
                            self.getShading(item.id, index);
                        });
                        this.$forceUpdate();
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1000);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1000);
                    }
                });
            },
            // 更多点击
            moreClick(index) {
                this.moreIndex = index;
                this.cnt = 1;
                this.pageNumber = "";
                this.showMore = true;
                this.mineList = [];
                this.styleName = this.classifyList.styleList[index].name;
                this.getShading(this.classifyList.styleList[index].id, index);
            },
            // 改动-9/28
            bottomClick(index, bigList, e) {
                this.backChange = 1;
                this.undo();
                if (this.showMore) {
                    this.mineList.map(function(item) {
                        item.show = false;
                    });
                    this.mineList[index].show = true;
                    this.$forceUpdate();
                    this.backImage = this.mineList[index].pictureThumbnail;
                    this.backImg = this.mineList[index].pictureThumbnail;
                    this.backId = this.mineList[index].id;
                } else {
                    this.classifyList.styleList.map(function(item) {
                        item.list.map(function(child) {
                            child.show = false;
                        });
                    });
                    this.classifyList.styleList[index].list[bigList].show = true;
                    this.$forceUpdate();
                    this.backImage = this.classifyList.styleList[index].list[
                        bigList
                        ].pictureThumbnail;
                    this.backImg = this.classifyList.styleList[index].list[
                        bigList
                        ].pictureThumbnail;
                    this.backId = this.classifyList.styleList[index].list[bigList].id;
                }
            },
            // 返回
            back() {
                this.showMore = false;
                this.styleName = "";
                this.getToplist();
            },
            // 配色
            rgbKey() {
                if (this.message.rgb[0] == "" || this.message.rgb[0] < 0) {
                    this.message.rgb[0] = 0;
                }
                if (this.message.rgb[0] > 255) {
                    this.message.rgb[0] = 255;
                }
                if (this.message.rgb[1] == "" || this.message.rgb[1] < 0) {
                    this.message.rgb[1] = 0;
                }
                if (this.message.rgb[1] > 255) {
                    this.message.rgb[1] = 255;
                }
                if (this.message.rgb[2] == "" || this.message.rgb[2] < 0) {
                    this.message.rgb[2] = 0;
                }
                if (this.message.rgb[2] > 255) {
                    this.message.rgb[2] = 255;
                }
                if (this.message.cmyk[0] == "" || this.message.cmyk[0] < 0) {
                    this.message.cmyk[0] = 0;
                }
                if (this.message.cmyk[0] > 100) {
                    this.message.cmyk[0] = 100;
                }
                if (this.message.cmyk[1] == "" || this.message.cmyk[1] < 0) {
                    this.message.cmyk[1] = 0;
                }
                if (this.message.cmyk[1] > 100) {
                    this.message.cmyk[1] = 100;
                }
                if (this.message.cmyk[2] == "" || this.message.cmyk[2] < 0) {
                    this.message.cmyk[2] = 0;
                }
                if (this.message.cmyk[2] > 100) {
                    this.message.cmyk[2] = 100;
                }
                if (this.message.cmyk[3] == "" || this.message.cmyk[3] < 0) {
                    this.message.cmyk[3] = 0;
                }
                if (this.message.cmyk[3] > 1) {
                    this.message.cmyk[3] = 1;
                }
                if (this.message.hsv[0] == "" || this.message.hsv[0] < 0) {
                    this.message.hsv[0] = 0;
                }
                if (this.message.hsv[0] > 360) {
                    this.message.hsv[0] = 360;
                }
                if (this.message.hsv[1] == "" || this.message.hsv[1] < 0) {
                    this.message.hsv[1] = 0;
                }
                if (this.message.hsv[1] > 1) {
                    this.message.hsv[1] = 1;
                }
                if (this.message.hsv[2] == "" || this.message.hsv[2] < 0) {
                    this.message.hsv[2] = 0;
                }
                if (this.message.hsv[2] > 255) {
                    this.message.hsv[2] = 255;
                }
                this.$forceUpdate();
            },
            // cmyk转化为rgb
            cmyktoRgb() {
                this.message.rgb[0] = parseInt(
                    (255 * (100 - this.message.cmyk[0]) * (1 - this.message.cmyk[3])) / 100
                );
                this.message.rgb[1] = parseInt(
                    (255 * (100 - this.message.cmyk[1]) * (1 - this.message.cmyk[3])) / 100
                );
                this.message.rgb[2] = parseInt(
                    (255 * (100 - this.message.cmyk[2]) * (1 - this.message.cmyk[3])) / 100
                );
                this.rgbtoColor();
                this.rgbtoHsv();
                this.$forceUpdate();
            },
            // hsv转化为rgb
            hsvtoRgb(prevent) {
                let h = this.message.hsv[0];
                let s = this.message.hsv[1];
                let v = this.message.hsv[2];
                let hi = parseInt(h / 60) % 6;
                let f = h / 60 - hi,
                    p = v * (1 - s),
                    q = v * (1 - f * s),
                    t = v * (1 - (1 - f) * s);
                if (hi === 0) {
                    this.message.rgb[0] = parseInt(v);
                    this.message.rgb[1] = parseInt(t);
                    this.message.rgb[2] = parseInt(p);
                } else if (hi == 1) {
                    this.message.rgb[0] = parseInt(q);
                    this.message.rgb[1] = parseInt(v);
                    this.message.rgb[2] = parseInt(p);
                } else if (hi == 2) {
                    this.message.rgb[0] = parseInt(p);
                    this.message.rgb[1] = parseInt(v);
                    this.message.rgb[2] = parseInt(t);
                } else if (hi == 3) {
                    this.message.rgb[0] = parseInt(p);
                    this.message.rgb[1] = parseInt(q);
                    this.message.rgb[2] = parseInt(v);
                } else if (hi == 4) {
                    this.message.rgb[0] = parseInt(t);
                    this.message.rgb[1] = parseInt(p);
                    this.message.rgb[2] = parseInt(v);
                } else if (hi == 5) {
                    this.message.rgb[0] = parseInt(v);
                    this.message.rgb[1] = parseInt(p);
                    this.message.rgb[2] = parseInt(q);
                }
                if (this.message.rgb[1] > 255 || prevent == 1) {
                    this.message.rgb[1] = 0;
                }
                this.rgbtoCmyk();
                this.rgbtoColor();
                this.$forceUpdate();
            },
            enterRgb() {
                this.message.rgb.map(function(item) {
                    if (item == "") {
                        item = 0;
                    }
                    if (item > 255) {
                        item = 255;
                    }
                });
                this.$forceUpdate();
                this.rgbtoHsv();
                this.rgbtoCmyk();
                this.rgbtoColor();
            },
            // 16进制转化为rgb
            colortoRgb(val) {
                if (val) {
                    let newColor = [];
                    let newVal = val + "a";
                    newVal = newVal.substr(1, 6);
                    if (/^[0-9a-fA-F]{6}$/.test(newVal)) {
                        newColor[0] = parseInt(newVal.substr(0, 2), 16);
                        newColor[1] = parseInt(newVal.substr(2, 2), 16);
                        newColor[2] = parseInt(newVal.substr(4, 2), 16);
                    }
                    return newColor;
                } else {
                    let color = this.message.color;
                    if (this.message.color.length > 6) {
                        this.message.color = this.message.color.substring(0, 6);
                    }
                    if (this.message.color.length == 3) {
                        color =
                            color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
                    }
                    if (/^[0-9a-fA-F]{6}$/.test(color)) {
                        this.message.rgb[0] = parseInt(color.substr(0, 2), 16);
                        this.message.rgb[1] = parseInt(color.substr(2, 2), 16);
                        this.message.rgb[2] = parseInt(color.substr(4, 2), 16);
                        this.rgbtoHsv();
                        this.rgbtoCmyk();
                    }
                }
                this.$forceUpdate();
            },
            // rgb转化为cmyk
            rgbtoCmyk() {
                let c, m, y, k;
                c = (255 - this.message.rgb[0]) / 255;
                m = (255 - this.message.rgb[1]) / 255;
                y = (255 - this.message.rgb[2]) / 255;
                k = this.min(c, m, y);
                if (k == 1) {
                    this.message.cmyk[0] = 0;
                    this.message.cmyk[1] = 0;
                    this.message.cmyk[2] = 0;
                } else {
                    this.message.cmyk[0] = parseInt(((c - k) / (1 - k)) * 100);
                    this.message.cmyk[1] = parseInt(((m - k) / (1 - k)) * 100);
                    this.message.cmyk[2] = parseInt(((y - k) / (1 - k)) * 100);
                }
                this.message.cmyk[3] = k;
                this.$forceUpdate();
            },
            // 比较大小
            max(r, g, b) {
                let result;
                result = Math.max(Math.max(r, g), b);
                return result;
            },
            min(r, g, b) {
                let result;
                result = Math.min(Math.min(r, g), b);
                return result;
            },
            // rgb转化为hsv
            // h 0-360 s 0-1 v 0-255
            rgbtoHsv() {
                let max = this.max(
                    this.message.rgb[0],
                    this.message.rgb[1],
                    this.message.rgb[2]
                );
                let min = this.min(
                    this.message.rgb[0],
                    this.message.rgb[1],
                    this.message.rgb[2]
                );
                if (
                    this.message.rgb[0] == this.message.rgb[1] &&
                    this.message.rgb[1] == this.message.rgb[2]
                ) {
                    this.message.hsv[0] = 0;
                } else if (
                    max == this.message.rgb[0] &&
                    this.message.rgb[1] >= this.message.rgb[2]
                ) {
                    this.message.hsv[0] =
                        60 * ((this.message.rgb[1] - this.message.rgb[2]) / (max - min));
                } else if (
                    max == this.message.rgb[0] &&
                    this.message.rgb[1] < this.message.rgb[2]
                ) {
                    this.message.hsv[0] =
                        60 * ((this.message.rgb[1] - this.message.rgb[2]) / (max - min)) +
                        360;
                } else if (this.message.rgb[1] == max) {
                    this.message.hsv[0] =
                        60 * ((this.message.rgb[1] - this.message.rgb[2]) / (max - min)) +
                        120;
                } else if (this.message.rgb[2] == max) {
                    this.message.hsv[0] =
                        60 * ((this.message.rgb[1] - this.message.rgb[2]) / (max - min)) +
                        240;
                }
                this.message.hsv[0] = parseInt(this.message.hsv[0]);
                if (max == 0) {
                    this.message.hsv[1] = 0;
                } else {
                    this.message.hsv[1] = parseInt((max - min) / max);
                }
                this.message.hsv[2] = parseInt(max);
                this.message.hue = (this.message.hsv[0] / 360).toFixed(2);
                this.message.saturation = (this.message.hsv[1] / 1).toFixed(2);
                this.message.lightness = (this.message.hsv[2] / 255).toFixed(2);
                this.$forceUpdate();
            },
            // rgb转化为16进制
            rgbtoColor(val) {
                if(val){
                    var rgb = val.split(',');
                    var r = parseInt(rgb[0].split('(')[1]);
                    var g = parseInt(rgb[1]);
                    var b = parseInt(rgb[2].split(')')[0]);

                    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                    return hex;
                }else{
                    this.message.color = (
                        (this.message.rgb[0] << 16) |
                        (this.message.rgb[1] << 8) |
                        this.message.rgb[2]
                    ).toString(16);
                    // 不足六位补0
                    this.message.color = (Array(6).join("0") + this.message.color).slice(-6);
                    this.$forceUpdate();
                }
            },
            // 色相饱和度明度滚动条
            colourPull(event, type) {
                var prevent;
                var self = this;
                var event = event || window.event;
                var _target = event.target;
                var startx = event.clientX;
                var starty = event.clientY;
                var roundX = startx - event.target.offsetLeft;
                var roundY = starty - event.target.offsetTop;
                var width = document.documentElement.clientWidth;
                var height = window.innerHeight;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                document.onmousemove = function(ev) {
                    var event = ev || window.event;
                    var scrollleft =
                        document.documentElement.scrollLeft || document.body.scrollLeft;
                    if (event.clientX < 0 || event.clientX < 0 || event.clientX > width) {
                        return false;
                    }
                    var endx = event.clientX - roundX;
                    var endy = event.clientY - roundY;
                    if (endy < -14 || endy > 5) {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                    if (endx < 0 || endx > 310) {
                        if (endx < 0) {
                            prevent = 0;
                        } else {
                            prevent = 1;
                        }
                        self.push();
                    } else {
                        prevent = endx / 310;
                        _target.style.left = endx + "px";
                    }
                    if (type == 1) {
                        self.message.hue = prevent;
                        self.message.hsv[0] = parseInt(self.message.hue * 360);
                    } else if (type == 2) {
                        self.message.saturation = prevent;
                        self.message.hsv[1] = self.message.saturation.toFixed(2);
                    } else if (type == 3) {
                        self.message.lightness = prevent;
                        self.message.hsv[2] = parseInt(self.message.lightness * 255);
                    }
                    self.hsvtoRgb(prevent);
                    self.$forceUpdate();
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            colourPush() {
                document.onmousemove = null;
            },
            thresholdPull(event) {
                var prevent;
                var self = this;
                var event = event || window.event;
                var _target = event.target;
                var startx = event.clientX;
                var starty = event.clientY;
                var roundX = startx - event.target.offsetLeft;
                var roundY = starty - event.target.offsetTop;
                var width = document.documentElement.clientWidth;
                var height = window.innerHeight;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                document.onmousemove = function(ev) {
                    var event = ev || window.event;
                    var scrollleft =
                        document.documentElement.scrollLeft || document.body.scrollLeft;
                    if (event.clientX < 0 || event.clientX < 0 || event.clientX > width) {
                        return false;
                    }
                    var endx = event.clientX - roundX;
                    var endy = event.clientY - roundY;
                    if (endy < -14 || endy > 10) {
                        self.getColour();
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                    if (endx < 0 || endx > 310) {
                        if (endx < 0) {
                            prevent = 0.008;
                        } else {
                            prevent = 0.1;
                        }
                        self.thresholdPush();
                    } else {
                        prevent = endx / 310;
                        self.whiteWidth = endx + "px";
                        _target.style.left = endx + "px";
                        if (endx < 20) {
                            prevent = 0.008;
                        } else {
                            prevent = endx / 310 / 10;
                        }
                    }
                    // prevent.toFixed(3)
                    self.message.threshold = (prevent * 5000).toFixed(1);
                    self.$forceUpdate();
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    let self = this;
                    self.getColour();
                };
            },
            thresholdPush() {
                let self = this;
                self.getColour();
                document.onmousemove = null;
            },
            // 颜色点击
            changeColor(index, e) {
                this.colorList.map(function(item) {
                    item.show = false;
                });
                this.imgColor = e.currentTarget.style.backgroundColor;
                this.colorList[index].show = true;
                this.$forceUpdate();
            },
            // 替换按钮点击
            exchange() {
                let formData = new FormData();
                let self = this;
                this.showLoading = true;
                let arr = [];
                if (!this.colorList.length) {
                    this.showLoading = false;
                    this.showJump = true;
                    this.err = "请先选择需要替换的颜色";
                    this.urlChange = false;
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                    return;
                }
                this.rightList.map(function(item) {
                    arr.push(item.picture);
                });
                let str = arr.join(",");
                let i;
                this.colorList.map(function(item, index) {
                    if (item.show) {
                        i = index;
                    }
                });
                if (this.btnIndex == 0) {
                    formData.append("images", str);
                } else if (this.btnIndex == 1) {
                    if (this.backId == "") {
                        this.showJump = true;
                        this.err = "请先选择底纹";
                        this.urlChange = false;
                        this.showLoading = false;
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                        }, 1500);
                        return;
                    } else {
                        formData.append("images", this.backImage);
                    }
                }
                this.undo();
                formData.append("threshhold", this.message.threshold);
                formData.append("colorR", this.colorList[i].r);
                formData.append("colorG", this.colorList[i].g);
                formData.append("colorB", this.colorList[i].b);
                formData.append("AimColorR", this.message.rgb[0]);
                formData.append("AimColorG", this.message.rgb[1]);
                formData.append("AimColorB", this.message.rgb[2]);
                let obj = {
                    formdata: formData,
                    url: this.all.baseUrl + "/color/changeColor"
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                    }, 500);
                    if (res.data.status == 0) {
                        this.getColour();

                        if (this.btnIndex == 0) {
                            this.rightList.map(function(item, i) {
                                item.picture = res.data.result.images[i];
                            });
                            this.list.map(function(item,i){
                                item.elements.map(function(item2,o){
                                    if(item2)
                                    {
                                        item.picture=item2.picture;
                                    }
                                })
                            })
                            this.$forceUpdate();
                            self.judge(1);
                        } else if (this.btnIndex == 1) {
                            this.backImage = res.data.result.images[0];
                            this.$forceUpdate();
                        }
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            getColour() {
                let formData = new FormData();
                let self = this;
                this.showLoading = true;
                let arr = [];
                if (!this.rightList.length && this.btnIndex == 0) {
                    this.showLoading = false;
                    this.showJump = true;
                    this.err = "没有选择素材";
                    this.urlChange = false;
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                    return;
                }
                this.rightList.map(function(item) {
                    arr.push(item.picture);
                });
                let str = arr.join(",");
                if (this.btnIndex == 0) {
                    formData.append("images", str);
                } else if (this.btnIndex == 1) {
                    if (this.backId == "") {
                        this.showLoading = false;
                        this.colorList = [];
                        this.$forceUpdate();
                        this.showJump = true;
                        this.err = "请先添加底纹";
                        this.urlChange = false;
                        this.showLoading = false;
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                        }, 1500);
                        return;
                    } else {
                        formData.append("images", this.backImage);
                    }
                }
                formData.append("threshhold", this.message.threshold);
                let obj = {
                    formdata: formData,
                    url: this.all.baseUrl + "/color/getColors"
                };
                this.getData(obj).then(res => {
                    setTimeout(function() {
                        self.showLoading = false;
                    }, 500);
                    if (res.data.status == 0) {
                        this.colorList = res.data.result.colors;
                        this.colorList.map(function(item) {
                            item.show = false;
                        });
                        this.colorList[0].show = true;
                    } else if (res.data.status == -95) {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: "/Login"
                            });
                        }, 1500);
                    } else {
                        this.showJump = true;
                        this.err = res.data.msg;
                        this.urlChange = false;
                        Scroll.stop();
                        setTimeout(function() {
                            self.showJump = false;
                            self.err = "";
                            Scroll.move();
                        }, 1500);
                    }
                });
            },
            // 画布图片点击
            proClick(index) {
                this.disChange = true;
                this.isClick = true;
                let self = this;
                this.list.map(function(item, i) {
                    if (item.order == self.list[index].order) {
                        self.list[i].show = true;
                    } else {
                        item.show = false;
                    }
                });
                this.$forceUpdate();
            },
            // 画布移动
            listPull(index, event) {
                var self = this;
                self.list.map(function(item) {
                    item.show = false;
                });
                self.list[index].show = true;
                var event = event || window.event;
                var _target = event.target;
                var startx = event.clientX;
                var starty = event.clientY;
                var roundX = startx - event.target.offsetLeft;
                var roundY = starty - event.target.offsetTop;
                var width = document.documentElement.clientWidth;
                var height = window.innerHeight;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                this.undo();
                var left = parseFloat(self.list[index].left);
                var top = parseFloat(self.list[index].top);
                var disX, disY;
                document.onmousemove = function(ev) {
                    var event = ev || window.event;
                    var scrollleft =
                        document.documentElement.scrollLeft || document.body.scrollLeft;
                    var scrolltop =
                        document.documentElement.scrollTop || document.body.scrollTop;
                    if (
                        event.clientX < 0 ||
                        event.clientY < 0 ||
                        event.clientX > width ||
                        event.clientY > height
                    ) {
                        return false;
                    }
                    if (document.body.clientHeight > 850) {
                        disX = (event.clientX - roundX) / 0.8;
                        disY = (event.clientY - roundY) / 0.8;
                    } else {
                        disX = (event.clientX - roundX) / 0.6;
                        disY = (event.clientY - roundY) / 0.6;
                    }
                    var endx = event.clientX - roundX + left;
                    var endy = event.clientY - roundY + top;
                    if (
                        endx < (-self.list[index].width * 600) / 4724 ||
                        endx > 600 ||
                        endy < (-self.list[index].height * 900) / 7087 ||
                        endy > 900
                    ) {
                        self.listPush();
                    } else {
                        self.list.map(function(item, i) {
                            if (item.order == self.list[index].order) {
                                var left = item.posX - (item.width * 600) / 4724 / 2;
                                var top = item.posY - (item.height * 900) / 7087 / 2;
                                item.left = disX + left + "px";
                                item.top = disY + top + "px";
                                item.show = true;
                            }
                        });
                        self.$forceUpdate();
                    }
                };
                self.list[index].cnt = self.beforeZIndex;
                self.beforeZIndex += 1;
            },
            listPush() {
                let self = this;
                let oldPointXX = 0;
                let oldPointYY = 0;
                this.list.map(function(item, index) {
                    oldPointXX = item.posX;
                    oldPointYY = item.posY;
                    item.posX =
                        parseFloat(self.list[index].left) + (item.width * 600) / 4724 / 2;
                    item.posY =
                        parseFloat(self.list[index].top) + (item.height * 900) / 7087 / 2;
                    self.oldPointX += item.posX - oldPointXX;
                    self.oldPointY += item.posY - oldPointYY;
                });

                this.judge();
                document.onmousemove = null;
            },
            // 操作
            //保存退一步数据
            undo() {
                let tempList = [];
                let backImg, backImage;
                if (this.backId) {
                    backImg = this.backImg;
                    backImage = this.backImg;
                } else {
                    backImg = require("../../assets/image/flower/backcolor.png");
                    backImage = require("../../assets/image/flower/can.png");
                }
                for (let i = 0; i < this.rightList.length; i++) {
                    tempList.push({
                        width: this.rightList[i].width,
                        height: this.rightList[i].height,
                        top: this.rightList[i].top,
                        left: this.rightList[i].left,
                        picture: this.rightList[i].picture,
                        showEye: this.rightList[i].showEye,
                        show: this.rightList[i].show,
                        posX: this.rightList[i].posX,
                        posY: this.rightList[i].posY,
                        zoom: this.rightList[i].zoom,
                        isCreate: this.rightList[i].isCreate,
                        elements: this.rightList[i].elements,
                        order: this.rightList[i].order,
                        rotateX: this.rightList[i].rotateX,
                        rotateY: this.rightList[i].rotateY,
                        rotateZ: this.rightList[i].rotateZ,
                        backImg: backImg,
                        backImage: backImage,
                        backId: this.backId
                    });
                }
                this.operateList.push(tempList);
            },
            // 退一步操作
            backStep() {
                let self = this;
                if (this.operateList.length == 0) {
                    this.showJump = true;
                    this.urlChange = false;
                    this.err = "已经是第一步操作了！";
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1500);
                } else {
                    this.rightList = [];
                    this.list = [];
                    this.rightList = this.operateList[this.operateList.length - 1];
                    this.backId = this.operateList[this.operateList.length - 1][0].backId;
                    this.classifyList.styleList.map(function(item) {
                        item.list.map(function(child) {
                            if (child.id == self.backId) {
                                child.show = true;
                            } else {
                                child.show = false;
                            }
                        });
                    });
                    this.mineList.map(function(item) {
                        if (item.id == self.backId) {
                            item.show = true;
                        } else {
                            item.show = false;
                        }
                    });
                    this.proList.map(function(item) {
                        item.show = false;
                    });
                    if (this.backId) {
                        this.backImg = this.operateList[
                        this.operateList.length - 1
                            ][0].backImg;
                        this.backImage = this.operateList[
                        this.operateList.length - 1
                            ][0].backImage;
                    } else {
                        this.backImg = require("../../assets/image/flower/backcolor.png");
                        this.backImage = require("../../assets/image/flower/can.png");
                    }
                    this.operateList.splice(this.operateList.length - 1, 1);
                    for (let i = 0; i < this.rightList.length; i++) {
                        this.list.push(this.rightList[i]);
                    }
                    this.$forceUpdate();
                    this.judge();
                }
            },
            // 水平翻转
            levelClick() {
                let self = this;
                self.count++;
                if (this.isClick) {
                    this.undo();
                    this.list.map(function(item, index) {
                        if (item.show) {
                            item.rotateY += 180;
                            self.$forceUpdate();
                        }
                    });
                    self.judge();
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            // 垂直翻转
            verticalClick() {
                let self = this;
                self.count++;
                if (this.isClick) {
                    this.undo();
                    this.list.map(function(item, index) {
                        if (item.show) {
                            item.rotateX += 180;
                            self.$forceUpdate();
                        }
                    });
                    self.judge();
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            // 缩放点击
            smallClick() {
                let self = this;
                if (this.isClick) {
                    if (this.showSmall == "none") {
                        this.showSmall = "block";
                    } else {
                        this.showSmall = "none";
                    }
                    this.$forceUpdate();
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            inputScale() {
                let newZoom = parseFloat(this.zoom);
                let self = this;
                if (newZoom == "") {
                    newZoom = 0;
                } else if (newZoom <= 0) {
                    this.smallLeft = 0;
                } else if (newZoom >= 200) {
                    this.smallLeft = "190px";
                } else {
                    this.smallLeft = (newZoom / 200) * 190 + "px";
                }
                this.undo();
                this.list.map(function(item) {
                    if (item.show) {
                        item.zoom = newZoom / 100;
                        console.log(item.zoom);
                    }
                });
                self.judge();
            },
            pull(event) {
                var prevent;
                var self = this;
                var event = event || window.event;
                var _target = event.target;
                var startx = event.clientX;
                var starty = event.clientY;
                var roundX = startx - event.target.offsetLeft;
                var roundY = starty - event.target.offsetTop;
                var width = document.documentElement.clientWidth;
                var height = window.innerHeight;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                this.undo();
                document.onmousemove = function(ev) {
                    var event = ev || window.event;
                    var scrollleft =
                        document.documentElement.scrollLeft || document.body.scrollLeft;
                    if (event.clientX < 0 || event.clientX < 0 || event.clientX > width) {
                        return false;
                    }
                    var endx = event.clientX - roundX;
                    var endy = event.clientY - roundY;
                    if (endy < -15 || endy > 15) {
                        self.push();
                    }
                    if (endx < 0 || endx > 190) {
                        self.push();
                    } else {
                        self.smallLeft = endx + "px";
                        _target.style.left = endx + "px";
                        self.zoom = ((endx / 190) * 200).toFixed(2) + "%";
                        let i = 0;
                        self.list.map(function(item) {
                            if (item.show) {
                                item.zoom = (endx / 190) * 2;
                            }
                        });
                        self.judge();
                    }
                };
            },
            push() {
                document.onmousemove = null;
            },
            // 旋转点击
            rotateClick() {
                let self = this;
                if (this.isClick) {
                    if (this.showRotate == "none") {
                        this.showRotate = "block";
                    } else {
                        this.showRotate = "none";
                    }
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            trueRotate() {
                let self = this;
                let rotate;
                if (this.isClick) {
                    this.undo();
                    this.list.map(function(item, index) {
                        if (item.show) {
                            if (self.rotateDeg == "") {
                                rotate = 0;
                            } else {
                                rotate = self.rotateDeg;
                            }
                            if (self.count % 2) {
                                item.rotateZ = -rotate;
                            } else {
                                item.rotateZ = rotate;
                            }
                            self.$forceUpdate();
                        }
                    });
                }
                self.judge();
            },
            // 拷贝
            copy() {
                let self = this;
                let newTop, newLeft;
                if (this.isClick) {
                    this.undo();
                    this.rightList.map(function(item, index) {
                        if (item.show) {
                            newTop = parseFloat(item.top) + 50 + "px";
                            newLeft = parseFloat(item.left) + 50 + "px";
                            let newitem;
                            newitem = {
                                width: item.width,
                                height: item.height,
                                top: newTop,
                                left: newLeft,
                                picture: item.picture,
                                showEye: true,
                                show: false,
                                id: item.id,
                                posX: parseFloat(newLeft) + (item.width * 600) / 4724 / 2,
                                posY: parseFloat(newTop) + (item.height * 900) / 7087 / 2,
                                zoom: item.zoom,
                                isCreate: [
                                    false,
                                    false,
                                    false,
                                    false,
                                    false,
                                    false,
                                    false,
                                    false
                                ],
                                elements: ["", "", "", "", "", "", "", ""],
                                order: self.list.length + 1,
                                rotateX: item.rotateX,
                                rotateY: item.rotateY,
                                rotateZ: item.rotateZ
                            };
                            self.list.push(newitem);
                            self.rightList.push(newitem);
                            self.judge(1);
                            self.$forceUpdate();
                        }
                    });
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            // 右侧拷贝一个
            copyOne(index, event) {
                // 阻止事件冒泡
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                let self = this;
                this.undo();
                let newTop, newLeft;
                newTop = parseFloat(this.rightList[index].top) + 50 + "px";
                newLeft = parseFloat(this.rightList[index].left) + 50 + "px";
                let obj = {
                    width: this.rightList[index].width,
                    height: this.rightList[index].height,
                    top: newTop,
                    left: newLeft,
                    picture: this.rightList[index].picture,
                    showEye: true,
                    id: this.rightList[index].id,
                    show: false,
                    posX:
                    parseFloat(newLeft) + (this.rightList[index].width * 600) / 4724 / 2,
                    posY:
                    parseFloat(newTop) + (this.rightList[index].height * 900) / 7087 / 2,
                    zoom: this.rightList[index].zoom,
                    isCreate: [false, false, false, false, false, false, false, false],
                    elements: ["", "", "", "", "", "", "", ""],
                    order: self.list.length + 1,
                    rotateX: this.rightList[index].rotateX,
                    rotateY: this.rightList[index].rotateY,
                    rotateZ: this.rightList[index].rotateZ
                };
                self.list.push(obj);
                self.judge(1);
                self.rightList.push(obj);
                self.$forceUpdate();
            },
            // 删除
            deleteCeng() {
                let self = this;
                let newList = [];
                let rightNew = [];
                if (this.isClick) {
                    this.undo();
                    this.list.map(function(item, index) {
                        if (item.show) {
                        } else {
                            newList.push(item);
                        }
                    });
                    this.rightList.map(function(item, index) {
                        if (item.show) {
                        } else {
                            rightNew.push(item);
                        }
                    });
                    self.firstList = newList;//shj20191113修改删除单个无效问题
                    self.list = newList;
                    self.rightList = rightNew;
                    self.isClick = false;
                    self.$forceUpdate();
                } else {
                    this.showJump = true;
                    this.err = "请先选择图层";
                    this.urlChange = false;
                    Scroll.stop();
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                        Scroll.move();
                    }, 1000);
                }
            },
            // 删除一个
            deleteOne(index, event) {
                // 阻止事件冒泡
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                this.undo();
                let order = this.rightList[index].order;
                let self = this;
                let newList = [];
                this.rightList.splice(index, 1);
                this.list.map(function(item, i) {
                    if (order == item.order) {
                    } else {
                        newList.push(item);
                    }
                });
                this.firstList = newList;//shj20191113修改删除单个无效问题
                this.list = newList;
                this.isClick = false;
                this.$forceUpdate();
            },
            // 删除所有
            deleteAll(event) {
                // 阻止事件冒泡
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                this.undo();
                this.list = [];
                this.rightList = [];
                this.$forceUpdate();
            },
            // 删除底纹  改动-9/28
            delBack() {
                this.undo();
                this.backImg = require("../../assets/image/flower/backcolor.png");
                this.backImage = require("../../assets/image/flower/can.png");
                this.backId = "";
                if (this.backChange == 2) {
                    this.backChange = 1;
                }
                this.$forceUpdate();
            },
            downList() {
                this.showDown = !this.showDown;
                this.$forceUpdate();
            },
            // 主花组眼睛点击
            seeAll() {
                let self = this;
                this.undo();
                this.showAll = !this.showAll;
                this.list.map(function(item) {
                    item.showEye = self.showAll;
                });
                this.$forceUpdate();
            },
            // 眼睛点击
            eyeClick(index, event) {
                let self = this;
                // 阻止事件冒泡
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
                this.undo();
                self.list.map(function(item) {
                    if (item.order == self.list[index].order) {
                        item.showEye = !item.showEye;
                    }
                });
                self.$forceUpdate();
            },
            // 列表点击
            listClick(index, e) {
                let self = this;
                self.isClick = false;
                this.imgColor = e.currentTarget.style.backgroundColor;
                this.list.map(function(item) {
                    if (item.order == self.rightList[index].order) {
                        item.show = !item.show;
                    }
                    if (item.show) {
                        self.isClick = true;
                    }
                });
                if (this.disChange) {
                    this.disChange = false;
                } else {
                    this.disChange = true;
                }
                this.$forceUpdate();
            },
            // 局部滚动加载
            hanleScroll(index) {
                let self = this;
                if (this.leftNav == 0) {
                    document.querySelector(".addBox").onscroll = function(e) {
                        let multiple = Math.floor(e.target.scrollTop / e.target.offsetHeight);
                        let scTop;
                        if (multiple == 0) {
                            scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight);
                        } else {
                            scTop = Math.abs(
                                e.target.scrollTop - e.target.offsetHeight * multiple
                            );
                        }
                        if (scTop < 50) {
                            self.showTop = true;
                            if (self.cnt < self.pageNumber) {
                                self.cnt++;
                                self.mineCnt++;
                                if (self.rightNum == 2) {
                                    self.getMine(1);
                                } else {
                                    self.getShare(self.message);
                                }
                            }
                        }
                    };
                } else if (this.leftNav == 1) {
                    document.querySelector(".addBox").onscroll = function(e) {
                        let multiple = Math.floor(e.target.scrollTop / e.target.offsetHeight);
                        let scTop;
                        if (multiple == 0) {
                            scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight);
                        } else {
                            scTop = Math.abs(
                                e.target.scrollTop - e.target.offsetHeight * multiple
                            );
                        }
                        if (scTop < 50) {
                            self.showTop = true;
                            if (self.cnt < self.pageNumber) {
                                self.cnt++;
                                self.mineCnt++;
                                self.getPattern(self.rightNum);
                            }
                        }
                    };
                } else if (this.leftNav == 2) {
                    document.querySelector(".addBox").onscroll = function(e) {
                        let multiple = Math.floor(e.target.scrollTop / e.target.offsetHeight);
                        let scTop;
                        if (multiple == 0) {
                            scTop = Math.abs(e.target.scrollTop - e.target.offsetHeight);
                        } else {
                            scTop = Math.abs(
                                e.target.scrollTop - e.target.offsetHeight * multiple
                            );
                        }
                        if (scTop < 50) {
                            self.showTop = true;
                            if (self.cnt < self.pageNumber) {
                                self.cnt++;
                                self.mineCnt++;
                                if (self.rightNum == 1) {
                                    self.getMine(3);
                                } else if (self.showMore) {
                                    self.getShading(self.classifyList.styleList[self.moreIndex].id,index);
                                }
                            }
                        }
                    };
                }
            },
            //关闭操作按钮
            none() {
                if (this.showRotate != "none") {
                    this.showRotate = "none";
                }
                if (this.showSmall != "none") {
                    this.showSmall = "none";
                }
            },
            // 防止事件冒泡
            noneClick() {},
            // 改动-9/28=素色点击
            backSet(id) {
                this.backChange = 2;
                let imgId = id;
                for (let i = 0; i < this.bigImgList.length; i++) {
                    if (this.bigImgList[i].id == imgId) {
                        this.canvasBack = this.bigImgList[i].rgb;
                        this.backImg = "";
                    }
                }
            },
            //--旋转3个事件shj，还未完成start
                // rotate(e) {
                //     // console.log(e)
                //     let self = this;
                //     if (this.isRotate) {
                //         let pointBX = self.oldPointX;
                //         let pointBY = self.oldPointY;
                //         let pointCX = e.x;
                //         let pointCY = e.y;
                //         // console.log(pointBX)
                //         // console.log(pointBY)
                //         // console.log(pointCX)
                //         // console.log(pointCY)
                //         // console.log(e)
                //         this.list.map(function(item, index) {
                //             if (item.show) {
                //                 let parentLeft = e.target.parentNode.parentNode.parentNode.parentNode.offsetLeft;
                //                 let parentTop = e.target.parentNode.parentNode.parentNode.parentNode.offsetTop;
                //                 //中心点=div相对画布+画布相对屏幕
                //                 // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].x)
                //                 // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].y)
                //                 // console.log("===")
                //                 // console.log(e.target.parentNode.parentNode.parentNode.childNodes)
                //                 let pointAX = e.target.parentNode.parentNode.parentNode.childNodes[0].x+item.width*600/4724/2;
                //                 let pointAY = e.target.parentNode.parentNode.parentNode.childNodes[0].y+item.height*900/7087/2;

                //                 // let pointAX = 960;
                //                 // let pointAY = 540;

                //                 var lengthAB = Math.sqrt(Math.pow(pointAX - pointBX, 2) +
                //                         Math.pow(pointAY - pointBY, 2)),
                //                     lengthAC = Math.sqrt(Math.pow(pointAX - pointCX, 2) +
                //                         Math.pow(pointAY - pointCY, 2)),
                //                     lengthBC = Math.sqrt(Math.pow(pointBX - pointCX, 2) +
                //                         Math.pow(pointBY - pointCY, 2));
                //                 var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
                //                     (2 * lengthAB * lengthAC);
                //                 var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);

                //                 console.log(angleA+'------')
                //                 console.log(pointAX)
                //                 console.log(pointBX)
                //                 console.log(pointCX)
                //                 if(pointAX>pointCX&&pointBX<pointAX&&pointCY>pointBY){
                //                     item.rotateZ -= angleA;
                //                 }
                //                 if(pointAX>pointCX&&pointBX<pointAX&&pointCY<pointBY){
                //                     item.rotateZ += angleA;
                //                 }
                //                 if(pointAX>pointCX&&pointBX<pointAX&&pointCY==pointBY&&pointCX>pointBX){
                //                     item.rotateZ -= angleA;
                //                 }
                //                 if(pointAX>pointCX&&pointBX<pointAX&&pointCY==pointBY&&pointCX<pointBX){
                //                     item.rotateZ += angleA;
                //                 }


                //                 if(pointAX<pointCX&&pointBX>pointAX&&pointCY>pointBY){
                //                     item.rotateZ += angleA;
                //                 }
                //                 if(pointAX<pointCX&&pointBX>pointAX&&pointCY<pointBY){
                //                     item.rotateZ -= angleA;
                //                 }
                //                 if(pointAX<pointCX&&pointBX>pointAX&&pointCY==pointBY&&pointCX>pointBX){
                //                     item.rotateZ -= angleA;
                //                 }
                //                 if(pointAX<pointCX&&pointBX>pointAX&&pointCY==pointBY&&pointCX<pointBX){
                //                     item.rotateZ += angleA;
                //                 }

                //                 if(pointAY==pointBY&&pointAX<pointBX&&pointCY>pointBY){
                //                     item.rotateZ -= angleA;
                //                 }
                //                 if(pointAY==pointBY&&pointAX<pointBX&&pointCY<pointBY){
                //                     item.rotateZ += angleA;
                //                 }

                //                 if(pointAY==pointBY&&pointAX>pointBX&&pointCY>pointBY){
                //                     item.rotateZ += angleA;
                //                 }
                //                 if(pointAY==pointBY&&pointAX>pointBX&&pointCY<pointBY){
                //                     item.rotateZ -= angleA;
                //                 }

                //                 // if(pointBX==pointAX&&pointAY<pointBY&&pointCX>pointBX){
                //                 // 	item.rotateZ += angleA;
                //                 // }
                //                 // if(pointBX==pointAX&&pointAY<pointBY&&pointCX<pointBX){
                //                 // 	item.rotateZ -= angleA;
                //                 // }
                //                 // if(pointBX==pointAX&&pointAY>pointBY&&pointCX>pointBX){
                //                 // 	item.rotateZ -= angleA;
                //                 // }
                //                 // if(pointBX==pointAX&&pointAY>pointBY&&pointCX<pointBX){
                //                 // 	item.rotateZ += angleA;
                //                 // }








                //                 // if(item.rotateZ<=-180){
                //                 // 	item.rotateZ = 0;
                //                 // }else if(item.rotateZ>=180){
                //                 // 	item.rotateZ = 0;
                //                 // }

                //                 self.oldPointX = pointCX;
                //                 self.oldPointY = pointCY;
                //                 self.$forceUpdate();
                //             }
                //         });

                //         // self.judge();
                //     }

                //     // let self = this;
                //     // const stage = e.currentTarget.parentElement.previousElementSibling;
                //     // const centerPoint = { x:stage.width/2, y:stage.height/2 };
                //     // var lastRad = 0;
                //     // var rotation = 0;
                //     // lastRad = Math.atan2(e.clientY-centerPoint.y, e.clientX-centerPoint.x);
                //     // console.log(lastRad)
                //     // e.target.onmousemove = function(e){
                //     //     const rad = Math.atan2(e.clientY-centerPoint.y, e.clientX-centerPoint.x);
                //     //     rotation = rotation + rad - lastRad
                //     //     lastRad = rad
                //     //     self.rotation = rotation;
                //     // }
                //     ;
                // },
            rotate(e) {
                let self = this;
                if (this.isRotate) {
                    let pointCX = 0;
                    let pointCY = 0;

                    this.list.map(function(item, index) {
                        if (item.show) {
                            // let pointBX = item.oldPointX;
                            // let pointBY = item.oldPointY;
                            // let pointAX = item.posX;
                            // let pointAY = item.posY;
                            while (item.rotateZ < 0) {
                                item.rotateZ += 360;
                            }
                            if (item.rotateZ > 360) {
                                item.rotateZ = item.rotateZ % 360;
                            }
                            let order = item.order;
                            let rotateNum = 0;
                            let parentLeft =
                                e.target.parentNode.parentNode.parentNode.parentNode.offsetLeft;
                            let parentTop =
                                e.target.parentNode.parentNode.parentNode.parentNode.offsetTop;
                            let pointAX =
                                e.target.parentNode.parentNode.parentNode.childNodes[0].x +
                                (item.width * 600) / 4724 / 2;
                            let pointAY =
                                e.target.parentNode.parentNode.parentNode.childNodes[0].y +
                                (item.height * 900) / 7087 / 2;
                            let pointBX = item.oldPointX;
                            let pointBY = item.oldPointY;
                            // let pointBX = item.oldPointX
                            // let pointBY = item.oldPointY
                            let pointCX = e.clientX;
                            let pointCY = e.clientY;
                            /*if(true){
                                item.rotateZ=Math.round(item.rotateZ)
                                while(item.rotateZ<0){
                                    item.rotateZ+=360;
								}
								if(item.rotateZ>360){
                                    item.rotateZ=item.rotateZ%360;
                                }
                                if(item.rotateX%360==180){
                                    if(item.rotateZ>=180&&item.rotateZ<=360){
                                        pointBX = pointAX+Math.abs((30*900/7087+item.height*900/7087/2)*Math.sin(item.rotateZ));
                                    }else{
                                        pointBX = pointAX-Math.abs((30*900/7087+item.height*900/7087/2)*Math.sin(item.rotateZ));
                                    }
                                    //一四象限正
                                    if(item.rotateZ>=0&&item.rotateZ<=90 || item.rotateZ>=270&&item.rotateZ<=360){
                                        pointBY = pointAY-Math.abs((30*900/7087+item.height*900/7087/2)*Math.cos(item.rotateZ));
                                    }else{
                                        pointBY = pointAY+Math.abs((30*900/7087+item.height*900/7087/2)*Math.cos(item.rotateZ));
                                    }
                                }else{
                                    if(item.rotateZ>=180&&item.rotateZ<=360){
                                        pointBX = pointAX+Math.abs((30*900/7087+item.height*900/7087/2)*Math.sin(item.rotateZ));
                                    }else{
                                        pointBX = pointAX-Math.abs((30*900/7087+item.height*900/7087/2)*Math.sin(item.rotateZ));
                                    }
                                    //一四象限正
                                    if(item.rotateZ>=0&&item.rotateZ<=90 || item.rotateZ>=270&&item.rotateZ<=360){
                                        pointBY = pointAY+Math.abs((30*900/7087+item.height*900/7087/2)*Math.cos(item.rotateZ));
                                    }else{
                                        pointBY = pointAY-Math.abs((30*900/7087+item.height*900/7087/2)*Math.cos(item.rotateZ));
                                    }
								}

                                // pointBX = pointAX+Math.sin(30*900/7087+item.height*900/7087/2);
                                // pointBY = pointAY+(30*900/7087+item.height*900/7087/2)*Math.cos(item.rotateZ);


                            }*/
                            pointCX = pointBX + e.movementX;
                            pointCY = pointBY + e.movementY;
                            var lengthAB = Math.sqrt(
                                Math.pow(pointAX - pointBX, 2) + Math.pow(pointAY - pointBY, 2)
                                ),
                                lengthAC = Math.sqrt(
                                    Math.pow(pointAX - pointCX, 2) + Math.pow(pointAY - pointCY, 2)
                                ),
                                lengthBC = Math.sqrt(
                                    Math.pow(pointBX - pointCX, 2) + Math.pow(pointBY - pointCY, 2)
                                );
                            var cosA =
                                ((pointBX - pointAX) * (pointCX - pointAX) +
                                    (pointBY - pointAY) * (pointCY - pointAY)) /
                                lengthAB /
                                lengthAC;
                            var angleA = (Math.acos(cosA) * 180) / Math.PI;
                            angleA = Math.round(angleA);
                            let speed = (item.width * 600) / 4724 / 160;
                            // angleA= angleA*speed/item.zoom
                            // angleA= angleA/item.zoom
                            if (item.rotateY % 360 == 180) {
                                if (item.rotateX % 360 == 180) {
                                    if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) >
                                        0
                                    ) {
                                        item.rotateZ += angleA;
                                    } else if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) <
                                        0
                                    ) {
                                        item.rotateZ -= angleA;
                                    }
                                } else {
                                    if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) >
                                        0
                                    ) {
                                        item.rotateZ -= angleA;
                                    } else if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) <
                                        0
                                    ) {
                                        item.rotateZ += angleA;
                                    }
                                }
                            } else {
                                if (item.rotateX % 360 == 180) {
                                    if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) >
                                        0
                                    ) {
                                        item.rotateZ -= angleA;
                                    } else if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) <
                                        0
                                    ) {
                                        item.rotateZ += angleA;
                                    }
                                } else {
                                    if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) >
                                        0
                                    ) {
                                        item.rotateZ += angleA;
                                    } else if (
                                        (pointBX - pointAX) * (pointCY - pointAY) -
                                        (pointCX - pointAX) * (pointBY - pointAY) <
                                        0
                                    ) {
                                        item.rotateZ -= angleA;
                                    }
                                }
                            }
                            rotateNum = item.rotateZ;
                            let rotateX = item.rotateX;
                            let rotateY = item.rotateY;
                            item.oldPointX = pointCX;
                            item.oldPointY = pointCY;
                            self.list.map(function(item, index) {
                                if (item.order == order) {
                                    item.rotateZ = rotateNum;
                                    item.rotateX = rotateX;
                                    item.rotateY = rotateY;
                                }
                            });
                            self.$forceUpdate();
                        }
                    });
                    // self.judge();
                }
            },
            rotateStart(e, index) {
                // this.oldPointX = e.x;
                // this.oldPointY = e.y;
                this.list.map(function(item) {
                    item.show = false;
                });
                while (
                    this.list[index].rotateX / 180 >= 1 &&
                    this.list[index].rotateY / 180 >= 1
                    ) {
                    this.list[index].rotateX -= 180;
                    this.list[index].rotateY -= 180;
                    this.list[index].rotateZ += 180;
                }
                this.list[index].show = true;
                this.list[index].oldPointX = e.clientX;
                this.list[index].oldPointY = e.clientY;
                this.isRotate = true;
                e.target.style.padding = "600px";
                e.target.style.left = "-609px";
                e.target.style.top = "-600px";

                if (e.stopPropagation) e.stopPropagation(); //阻止把事件分派到其他节点。
                if (e.preventDefault) e.preventDefault(); //阻止默认事件
                e.cancelBubble = true; //阻止冒泡
                e.returnValue = false; //阻止IE的默认事件
            },
            rotateOver(e, index) {
                this.isRotate = false;
                e.target.style.padding =
                    "20px " + (e.target.width * 600) / 4724 / 2 + "px 20px ";
                e.target.style.left = -9 - (e.target.width * 600) / 4724 / 2 + "px";
                e.target.style.top = "-20px";
            },
            rotateNone() {
                document.onmousemove = null;
            },
            changeSizeStart(e, index, type) {
                let self = this;
                this.list.map(function(item) {
                    item.show = false;
                });
                this.list[index].show = true;
                // this.list[index].oldPointX = e.clientX;
                // this.list[index].oldPointY = e.clientY;
                // let img = this.$refs['imgArea'+index]
                // console.log(img[0].x+'--'+img[0].y)
                // this.list[index].pointAX = img[0].x+this.list[index].width*600/4724*this.list[index].zoom/2;
                // this.list[index].pointAY = img[0].y+this.list[index].height*900/7087*this.list[index].zoom/2;
                // console.log(this.list[index].width*600/4724*this.list[index].zoom/2)
                //
                //修改鼠标样式
                // this.changeSizePosition=type;
                // //e.target.parentNode.style.cursor = "url(\"../../assets/image/flower/changeSize.png\"),auto;";
                // this.isChangeSize= true;
                // let self = this
                if (type == "rightBottom") {
                    e.target.parentNode.style.width = "600px";
                    e.target.parentNode.style.height = "600px";
                    e.target.parentNode.style.left =
                        (this.list[index].width * 600) / 4724 / 2 - 300 + "px";
                    e.target.parentNode.style.top = "-305px";
                } else if (type == "rightTop") {
                    e.target.parentNode.style.width = "600px";
                    e.target.parentNode.style.height = "600px";
                    e.target.parentNode.style.left =
                        (this.list[index].width * 600) / 4724 / 2 - 300 + "px";
                    e.target.parentNode.style.top =
                        (-this.list[index].height * 900) / 7087 - 305 + "px";
                } else if (type == "leftTop") {
                    e.target.parentNode.style.width = "600px";
                    e.target.parentNode.style.height = "600px";
                    e.target.parentNode.style.left =
                        (-this.list[index].width * 600) / 4724 / 2 - 300 + "px";
                    e.target.parentNode.style.top =
                        (-this.list[index].height * 900) / 7087 - 305 + "px";
                    // self.changeSizePosition='rightBottom';
                } else if (type == "leftBottom") {
                    e.target.parentNode.style.width = "600px";
                    e.target.parentNode.style.height = "600px";
                    e.target.parentNode.style.left =
                        (-this.list[index].width * 600) / 4724 / 2 - 300 + "px";
                    e.target.parentNode.style.top = "-305px";
                    // self.changeSizePosition='rightTop';
                }

                this.$forceUpdate();
                // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].x);//图片x
                // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].y);//图片y
                self.list.map(function(item, index) {
                    if (item.show) {
                        // console.log();
                        // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].x + item.width*450/4724/2*item.zoom);
                        // console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].y + item.height*450/4724/2);
                        if (item.zoom == undefined) {
                            item.zoom = 1;
                        }
                        item.centerX =
                            e.target.parentNode.parentNode.parentNode.childNodes[0].x +
                            (item.width * 600) / 4724 / 2;
                        item.centerY =
                            e.target.parentNode.parentNode.parentNode.childNodes[0].y +
                            (item.height * 900) / 7087 / 2;
                        item.oldPointX = e.x;
                        item.oldPointY = e.y;
                        self.allZoom = item.zoom;
                    }
                });
                self.isChangeSize = true;
                if (e.stopPropagation) e.stopPropagation(); //阻止把事件分派到其他节点。
                if (e.preventDefault) e.preventDefault(); //阻止默认事件
                e.cancelBubble = true; //阻止冒泡
                e.returnValue = false; //阻止IE的默认事件
            },
            changeSizeOver(e, index, type) {
                if (type == "rightBottom") {
                    let tar = this.$refs["changeSizeAreaRightBottom" + index][0];
                    tar.style.width = "20px";
                    tar.style.height = "20px";
                    tar.style.left = (this.list[index].width * 600) / 4724 / 2 - 10 + "px";
                    tar.style.top = "-15px";
                } else if (type == "rightTop") {
                    let tar = this.$refs["changeSizeAreaRightTop" + index][0];
                    tar.style.width = "20px";
                    tar.style.height = "20px";
                    tar.style.left = (this.list[index].width * 600) / 4724 / 2 - 10 + "px";
                    tar.style.top = (-this.list[index].height * 900) / 7087 - 15 + "px";
                } else if (type == "leftTop") {
                    let tar = this.$refs["changeSizeAreaLeftTop" + index][0];
                    tar.style.width = "20px";
                    tar.style.height = "20px";
                    tar.style.left = (-this.list[index].width * 600) / 4724 / 2 - 10 + "px";
                    tar.style.top = (-this.list[index].height * 900) / 7087 - 15 + "px";
                } else if (type == "leftBottom") {
                    let tar = this.$refs["changeSizeAreaLeftBottom" + index][0];
                    tar.style.width = "20px";
                    tar.style.height = "20px";
                    tar.style.left = (-this.list[index].width * 600) / 4724 / 2 - 10 + "px";
                    tar.style.top = "-15px";
                }
                this.isChangeSize = false;
                //修改鼠标样式
                this.changeSizePosition = "";
            },
            changeSize(e, flag) {
                // console.log(1)
                let self = this;
                if (self.isChangeSize) {
                    self.list.map(function(item, index) {
                        if (item.show) {
                            let order = item.order;
                            let newPointX = e.x;
                            let newPointY = e.y;

                            let oldLength = Math.sqrt(
                                (item.oldPointX - item.centerX) *
                                (item.oldPointX - item.centerX) +
                                (item.oldPointY - item.centerY) *
                                (item.oldPointY - item.centerY)
                            );
                            let newLength = Math.sqrt(
                                (newPointX - item.centerX) * (newPointX - item.centerX) +
                                (newPointY - item.centerY) * (newPointY - item.centerY)
                            );
                            let newZoom = newLength / oldLength;
                            if(newZoom<=0.5){
                                newZoom = 0.5;
                            }
                            item.zoom = newZoom * self.allZoom;
                            let allZoom = self.allZoom;
                            self.list.map(function(item, index) {
                                if (item.order == order) {
                                    item.zoom = newZoom * allZoom;
                                }
                            });

                            self.$forceUpdate();
                        }
                    });
                }

                // let img = this.$refs['imgArea'+flag]
                // // console.log(img)
                // let self = this;
                // if(this.isChangeSize){
                //     this.list.map(function(item,index){
                //         if(item.show){
                //             // let pointAX = img[0].x+item.width*600/4724/2*item.zoom;
                //             // let pointAY = img[0].y+item.height*900/7087/2*item.zoom;
                //             // let pointAX = e.clientX+item.width*600/4724/2;
                //             // let pointAY = e.clientY+item.height*900/7087/2;
                //             // let pointAX = e.target.parentNode.parentNode.childNodes[0].x+item.width*600/4724/2;
                //             // let pointAY = e.target.parentNode.parentNode.childNodes[0].y+item.height*900/7087/2;
                //             if(item.oldZoom==undefined){
                //                 item.oldZoom = item.zoom
                //             }
                //             console.log(e.target.parentNode.parentNode.parentNode.parentNode)
                //             let pointAX = item.pointAX;
                //             let pointAY = item.pointAY
                //             //原来的对角线一半长度
                //             let oldLength =Math.sqrt((item.width*600/4724/2)*(item.width*600/4724/2)+(item.height*900/7087/2)*(item.height*900/7087/2))
                //             let parentLeft = e.target.parentNode.parentNode.parentNode.parentNode.offsetLeft;
                //             let parentTop = e.target.parentNode.parentNode.parentNode.parentNode.offsetTop;
                //
                //             oldLength = oldLength;
                //             let pointBX = item.oldPointX;
                //             let pointBY = item.oldPointY;
                //             let pointCX = e.clientX;
                //             let pointCY = e.clientY;
                //             console.log(oldLength)
                //             console.log(pointAX+','+pointAY)
                //             console.log(pointCX+','+pointCY)
                //             let lengthAB = Math.sqrt((pointBY-pointAY)*(pointBY-pointAY)+(pointBX-pointAX)*(pointBX-pointAX))
                //             let lengthAC = Math.sqrt((pointCY-pointAY)*(pointCY-pointAY)+(pointCX-pointAX)*(pointCX-pointAX))
                //             console.log(lengthAC)
                //             //比例
                //             let changeNum = lengthAC/oldLength;
                //             item.zoom = changeNum*item.oldZoom;
                //
                //             console.log(item.zoom+'----')
                //             // item.width=item.width+pointCX-pointBX;
                //             // item.height = item.height +pointCY - pointBY;
                //             item.oldPointX = pointCX;
                //             item.oldPointY = pointCY;
                //             self.$forceUpdate();
                //         }
                //     });
                //     // self.judge();
                // };
            },

            handleScroll(e) {
                let self = this;
                if (self.inDiv) {
                    //此处会报错，还需要修改下
                    if (self.isScroll) {
                        self.isScroll = false;
                        setTimeout(() => {
                            if (e.deltaY == 100) {
                                self.list.map(function(item) {
                                    if (item.show) {
                                        item.zoom += 0.1;
                                    }
                                });
                            } else if (e.deltaY == -100) {
                                self.list.map(function(item) {
                                    if (item.show) {
                                        item.zoom -= 0.1;
                                    }
                                });
                            }
                            self.isScroll = true;
                            self.judge();
                        }, 50);
                    }
                }
            },
            mouseInDiv() {
                //此处最好禁用掉外部的滚动
                this.inDiv = true;
            },
            mouseOutDiv() {
                this.inDiv = false;
            }
        },
        watch: {
            colorValue: function(newVal) {
                this.backChange = 2;
                this.canvasBack = newVal;
                this.backImg = "";
            }
        },
        mounted() {
            this.getParameter();
            this.backId = "";
            this.aijson();
            // localStorage.setItem("path", this.path);
            // if (localStorage.getItem("English")) {
            //     this.$router.push({
            //         path: "/Ennewoperate"
            //     });
            // } else {
            //     this.$router.push({
            //         path: "/Newoperate"
            //     });
            // }

            window.addEventListener("mousewheel", this.handleScroll, false); //shj add 监听鼠标滚动事件
        },
        beforeDestroy() {
            clearInterval(this.clock);
        }
    };
</script>
<style scoped>
    /* 支付弹窗 */
    .model {
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100%;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
    }
    .payBox {
        width: 541px;
        height: 563px;
        margin: 0 auto;
        margin-top: calc(50vh - 18.75rem);
        border-radius: 6px;
        position: relative;
        display: flex;
        background: #fff;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
    }
    /* 删除按钮 */
    .payDel {
        width: 30px;
        height: 30px;
        cursor: pointer;
        position: relative;
        right: -296px;
        top: -52px;
    }
    .payTitle {
        margin: 24px 449px 10px 36px;
        font-size: 14px;
        color: #333333;
    }
    .payList {
        width: 100%;
        height: 364px;
        overflow: auto;
    }
    .payList li {
        width: 100%;
        height: 71px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .payList li + li {
        margin-top: 10px;
    }
    .payList li img {
        width: 97px;
        height: 71px;
    }
    .payList li p {
        width: 237px;
        height: 39px;
        background: #f6f5f5;
        border-radius: 4px;
        line-height: 39px;
        font-size: 14px;
        color: #fa2230;
    }
    .payFoot {
        width: 541px;
        height: 136px;
        background: #ffffff;
        box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.09);
        border-radius: 0 0 4px 4px;
        text-align: left;
    }
    .payFoot .payPrice {
        height: 34px;
        text-align: right;
        line-height: 50px;
    }
    .payFoot .payPrice > span {
        font-size: 14px;
        color: #333333;
    }
    .payFoot .payPrice > span > span {
        font-size: 14px;
        color: #fa2230;
        margin-left: 16px;
        margin-right: 39px;
    }
    .payFoot .payBtn {
        width: 253px;
        height: 54px;
        background: #ffe300;
        border-radius: 6px;
        line-height: 54px;
        font-size: 14px;
        color: #333333;
        text-align: center;
        margin: 14px auto;
        cursor: pointer;
    }
    .payFoot span {
        font-size: 12px;
        color: #bfb9b9;
        margin-left: 10px;
    }
    .newoperate {
        height: 100vh;
        background: #fff;
        overflow: hidden;
        min-height: 800px;
    }
    .content {
        position: relative;
    }
    .noData {
        color: #333;
        font-size: 16px;
        line-height: 300px;
    }
    /* 最左侧各个按钮样式 */
    ul.seleBox {
        width: 78px;
        height: calc(100vh - 60px);
        min-height: 700px;
        background: #eee;
        color: #333;
        font-size: 14px;
        position: relative;
        z-index: 77;
        box-sizing: border-box;
        border-right: 1px solid #eee;
    }
    ul.seleBox li {
        width: 81px;
        height: 73px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ul.seleBox li:first-child {
        margin-top: 27px;
    }
    ul.seleBox li > div {
        margin: auto 0;
    }
    ul.seleBox span.line {
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: 2.1875rem;
        background: #133ffc;
        width: 4px;
    }
    ul.seleBox img.seleImg {
        display: block;
        margin: 0 auto;
        width: 26px;
        height: auto;
    }
    ul.fixedList {
        position: absolute;
        z-index: 77;
        width: 70px;
        left: 0;
        bottom: 90px;
        color: #8d8d8d;
        font-size: 14px;
    }
    ul.fixedList span {
        display: block;
        margin-top: 6px;
    }
    ul.fixedList li {
        margin-top: 36px;
    }
    ul.fixedList img {
        width: 100%;
        display: block;
        margin: 0 auto;
        height: auto;
    }
    ul.fixedList .lookimg {
        width: 36px;
    }
    ul.fixedList .saveimg {
        width: 26px;
    }
    ul.fixedList .deleteimg {
        width: 30px;
    }
    /* 清浮动 */
    .clear {
        clear: both;
    }
    .addBox {
        background: #fff;
        width: 372px;
        position: absolute;
        top: 0;
        left: 100px;
        z-index: 55;
        height: calc(100% - 30px);
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        white-space: nowrap;
        padding-left: 20px;
        box-sizing: border-box;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .loadSpan {
        position: fixed;
        z-index: 56;
        width: 372px;
        left: 100px;
        color: #333;
        bottom: 5px;
        font-size: 14px;
    }
    .toTop {
        position: fixed;
        z-index: 56;
        overflow: hidden;
        width: 35px;
        left: 420px;
        border-radius: 50%;
        bottom: 30px;
    }
    .toTop img {
        display: block;
        margin: 0 auto;
        width: 35px;
        height: auto;
    }
    /* 收缩 */
    .hiddenBtn {
        position: fixed;
        z-index: 88;
        top: calc(50vh - 103px);
        left: 472px;
        height: 86px;
        width: 24px;
    }
    .hiddenBtn img {
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
    .topbtnList {
        overflow: hidden;
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 56;
        left: 0;
        padding-top: 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #eaeaea;
    }
    .topbtnList li {
        height: 35px;
        line-height: 35px;
        margin-right: 20px;
        font-size: 14px;
        color: #666666;
        box-sizing: border-box;
        padding: 0 20px;
        cursor: pointer;
        float: left;
    }
    .topbtnList li img {
        display: block;
    }
    .topbtnList li:last-child {
        margin-right: 0;
    }
    .topbtnList li.click {
        border-bottom: 3px solid #f06d29;
    }
    .classifyBox {
        padding-right: 24px;
    }
    .classifyBox .classify {
        cursor: pointer;
        float: left;
        position: relative;
        font-size: 14px;
        color: #333;
        margin-right: 20px;
    }
    .classifyBox .classify > span {
        height: 22px;
    }
    .classify:hover ul.bigList {
        display: block;
    }
    .classifyBox .classify:last-child {
        margin-right: 0;
    }
    .classifyBox .classify img {
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
    }
    .specialSpan {
        display: block;
    }
    .classifyBox .typeList {
        display: flex;
        position: absolute;
        left: 4rem;
    }
    .classifyBox .typeList li {
        margin-right: 5px;
    }
    .classifyBox .typeList li img {
        margin-right: 3px;
    }
    .classifyBox ul.bigList {
        display: none;
        position: absolute;
        z-index: 88;
        background: #fff;
        width: 100px;
        top: 20px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 13px;
        color: #8d8d8d;
        font-size: 12px;
        left: 0;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #f8f8f9;
        box-shadow: 1px 1px 1px #d0d0d0;
    }
    .actPat {
        border: 2px solid #313131 !important;
    }
    .special ul.bigList {
        width: 65px;
    }
    ul.bigList li {
        margin: 0;
        padding: 4px 0;
        position: relative;
    }
    ul.bigList li:hover,
    .hoverSpan {
        color: #f06d29;
    }
    ul.bigList li:hover .childBox {
        display: block;
    }
    ul.bigList:hover + img {
        transform: rotate(180deg);
    }
    .childBox {
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
        text-align: center;
        border-radius: 5px;
        border: 1px solid #f8f8f9;
        box-shadow: 1px 1px 1px #d0d0d0;
    }
    .childBox span {
        margin: 0;
        padding: 4px 0;
        color: #8d8d8d;
        display: block;
    }
    .childBox span:hover,
    .childBox span.hoverSpan {
        color: #f06d29;
    }
    ul.leftList {
        overflow: hidden;
        margin-top: 20px;
    }
    ul.leftList li {
        float: left;
        position: relative;
        display: -webkit-box;
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
    ul.leftList input {
        position: absolute;
        top: 0;
        left: 0;
        width: 103px;
        height: 103px;
        opacity: 0;
    }
    ul.backList input {
        position: absolute;
        top: 0;
        left: 0;
        width: 160px;
        height: 240px;
        opacity: 0;
    }
    .seleLine {
        background: #fff !important;
    }
    ul.leftList li:nth-child(3n) {
        margin-right: 0;
    }
    ul.leftList img {
        display: block;
        margin: 0 auto;
        max-height: 103px;
        max-width: 103px;
    }
    ul.leftList li.fileBox,
    ul.backList li.fileBox {
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
        display: -webkit-box;
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
    ul.leftList li.fileBox img,
    ul.backList li.fileBox img {
        display: block;
        width: 30px;
        height: auto;
        margin: 0 auto;
        margin-bottom: 4px;
    }
    ul.leftList li.fileBox span,
    ul.backList li.fileBox span {
        display: block;
        margin: 0 auto;
        color: rgba(51, 51, 51, 0.6);
        font-size: 12px;
    }
    ul.backList {
        overflow: hidden;
        margin-top: 20px;
    }
    ul.backList li {
        width: 150px;
        height: 240px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        float: left;
        border: 2px solid #d0d0d0;
        position: relative;
        overflow: hidden;
    }
    ul.backList li:nth-child(2n) {
        margin-right: 0;
    }
    ul.backList li img {
        display: block;
        width: 100%;
        height: 100%;
    }
    ul.backList li img.trueImg {
        position: absolute;
        width: 160px;
        height: 240px;
        top: 0;
        left: 0;
    }
    .bigmoreBox ul.backList {
        margin-top: 10px;
    }
    .bigmoreBox ul.backList li {
        margin-bottom: 0;
    }
    .moreBox {
        overflow: hidden;
        font-size: 14px;
        color: #333;
        text-align: left;
        margin-top: 16px;
    }
    .moreBox p {
        float: right;
        color: #888;
        margin-right: 10px;
        cursor: pointer;
    }
    .smallmoreBox .moreBox p {
        float: left;
        color: #333;
    }
    .moreBox p span {
        display: inline-block;
        vertical-align: middle;
    }
    .moreBox p img {
        display: inline-block;
        vertical-align: middle;
        margin-left: 4px;
        width: 7px;
        height: auto;
    }
    .smallmoreBox .moreBox p img {
        transform: rotate(180deg);
        margin-left: 0;
        margin-right: 4px;
    }
    /* 配色 */
    .inputBox {
        margin-top: 20px;
    }
    .colorBackBox {
        display: flex;
        align-items: center;
    }
    .colorBack {
        width: 80px;
        height: 80px;
        position: relative;
        top: -21px;
    }
    .colorBack p {
        float: left;
        font-size: 12px;
        margin-left: 13px;
    }
    .colorBackItem {
        width: 80px;
        height: 40px;
        float: left;
        background: red;
    }
    .rightInput {
        float: left;
        width: auto;
        margin-left: 14px;
        overflow: hidden;
    }
    .rightinputBox {
        overflow: hidden;
        padding: 0;
        margin-bottom: 8px;
    }
    .rightinputBox label {
        float: left;
        overflow: hidden;
        width: 63px;
        color: #333;
        font-size: 16px;
        font-weight: normal;
    }
    .rightinputBox label:nth-child(2) {
        width: 60px;
    }
    .rightinputBox label:last-child {
        margin-right: 0;
        width: 60px;
    }
    .rightinputBox span {
        float: left;
        height: 14px;
        line-height: 14px;
        width: 24px;
        text-align: left;
        font-family: "微软雅黑";
    }
    .rightinputBox input {
        float: left;
        width: 34px;
        height: 14px;
        outline: none;
        border: 1px solid #333;
        box-sizing: border-box;
        text-align: center;
        line-height: 14px;
        font-size: 12px;
    }
    .signBox input.spelial {
        position: absolute;
        width: 52px;
        left: 136px;
    }
    /* 滚动条样式 */
    .pullBox {
        overflow: hidden;
        margin-top: 30px;
    }
    .lineBox {
        position: relative;
        text-align: left;
        color: #333;
        font-size: 14px;
        margin-bottom: 32px;
    }
    .lineBox img {
        margin-top: 9px;
        width: 330px;
        height: 8px;
        display: block;
        flex-shrink: 0;
        margin-right: 20px;
    }
    .lineBox .line {
        width: 330px;
        height: 8px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .lineBox .line span {
        position: absolute;
        top: -6px;
        left: 0;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        border: 2px solid #f06d29;
        box-sizing: border-box;
    }
    .specialLine {
        text-align: left;
        color: #333;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .specialLine .line {
        margin-top: 9px;
        position: relative;
        background: #d8d8d8;
        width: 330px;
        height: 8px;
        border: 1px solid #333;
        box-sizing: border-box;
        border-radius: 4px;
    }
    .specialLine .line div {
        position: absolute;
        left: 0;
        width: 20px;
        height: 6px;
        top: 0;
        background: #f06d29;
        border-radius: 4px 0 0 4px;
    }
    .specialLine .line span {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #f06d29;
        top: -6px;
        left: 20px;
    }
    ul.colorList {
        overflow: hidden;
        margin-top: 20px;
    }
    ul.colorList li {
        float: left;
        width: 16.3px;
        height: 16.1px;
        background: red;
        border: 1px solid #fff;
        margin-right: 7px;
        margin-bottom: 5.8px;
    }
    ul.colorList li.special {
        border: 1px solid #333;
    }
    button {
        border: none;
        outline: none;
        width: 93px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: block;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
    }
    .exchange {
        margin-top: 16px;
        background: #ffe300;
    }
    .exchange:hover{
        background: #ffd000;
    }
    /* 画布样式 */
    .canvas {
        position: absolute;
        width: 620px;
        z-index: 44;
        top: 1.875rem;
        left: calc(50% - 19.548rem);
        margin-bottom: 2.5rem;
        height: 920px;
        zoom: 0.8;
        -moz-transform: scale(0.8, 0.8);
        -moz-transform-origin: top left;
        -o-transform: scale(0.8, 0.8);
        -o-transform-origin: top left;
    }
    @media screen and (max-height: 850px) {
        .canvas {
            zoom: 0.6;
            -moz-transform: scale(0.6, 0.6);
            -moz-transform-origin: top left;
            -o-transform: scale(0.6, 0.6);
            -o-transform-origin: top left;
        }
    }
    .ruleImg {
        width: 100%;
        height: 100%;
        display: block;
    }
    .canBigbox {
        width: 600px;
        height: 900px;
        top: 20px;
        left: 20px;
        position: absolute;
        overflow: hidden;
    }
    .mould {
        width: 100%;
        height: 100%;
        display: block;
    }
    .proList {
        position: absolute;
        border-radius: 0.625rem;
        border: 2px solid transparent;
    }
    .specialList {
        position: absolute;
        border-radius: 0.625rem;
        border: 2px solid #000;
    }
    /* 操作样式 */
    .operateBox {
        height: 110%;
        background: #fff;
        border-left: 1px solid #d0d0d0;
        position: absolute;
        top: -25px;
        right: 0;
    }
    ul.bBox {
        width: 2.5rem;
        float: left;
        padding-top: 3.0625rem;
    }
    ul.bBox li {
        height: 2.5rem;
        margin-bottom: 1.25rem;
        position: relative;
    }
    .bOperate {
        position: absolute;
        color: #8d8d8d;
        z-index: 55;
        font-size: 0.875rem;
        width: 7.5rem;
        height: 2.5rem;
        top: 0;
        line-height: 2.5rem;
        left: -7.5rem;
        background: #fff;
        display: none;
        border-radius: 1.25rem 0 0 1.25rem;
    }
    .bInput {
        position: absolute;
        color: #8d8d8d;
        z-index: 56;
        font-size: 0.875rem;
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
    .bScroll {
        position: absolute;
        left: -210px;
        z-index: 56;
        border-radius: 0.3125rem;
        width: 210px;
        top: -0;
        height: 2.5rem;
    }
    .bScroll .bigScroll {
        width: 100%;
        position: absolute;
        top: 0.9375rem;
        background: #dcdcdc;
        height: 10px;
        border-radius: 5px 0 0 5px;
    }
    .white {
        background: #ffe300;
        height: 10px;
        border-radius: 5px 0 0 5px;
        position: absolute;
        left: 0;
        top: 0;
    }
    .bigScroll input {
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
    .bigScroll span {
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: 10;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
        border-radius: 50%;
        background: #fff;
    }
    ul.bBox li img:hover + .bOperate {
        display: block;
    }
    ul.bBox img {
        display: block;
        margin: 0 auto;
        height: auto;
        padding-top: 0.8rem;
    }
    .oBox {
        width: 18rem;
        padding-bottom: 2.5rem;
        box-sizing: border-box;
        float: left;
        height: 110%;
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
    .oBox h4 {
        width: 18rem;
        font-weight: normal;
        position: sticky;
        top: 3.0625rem;
        right: 0;
        color: #fff;
        background: #2c2e30;
        box-sizing: border-box;
        padding: 0 0.625rem;
        font-size: 0.875rem;
        height: 2.5rem;
        line-height: 2.5rem;
        overflow: hidden;
        text-align: left;
    }
    .oBox h4 span {
        float: right;
    }
    .backBox {
        position: sticky;
        right: 0;
        top: 5.5625rem;
        padding: 0 0.625rem;
        background: #fff;
        width: 17.875rem;
        box-sizing: border-box;
        overflow: hidden;
        height: 2.625rem;
        line-height: 2.625rem;
        border-bottom: 1px solid #d0d0d0;
    }
    .backBox div {
        float: left;
    }
    .backBox div img {
        width: 2.5rem;
        height: 1.5rem;
        float: left;
        margin-top: 0.48rem;
    }
    .backBox span {
        margin-right: 1.25rem;
        float: left;
    }
    .backBox > img {
        float: right;
        margin-top: 0.6rem;
        width: 1.125rem;
        height: auto;
        margin-right: 1.75rem;
    }
    .backBoxItem {
        float: right;
        margin-top: 0.6rem;
        width: 1.125rem;
        height: 1.125rem;
        margin-right: 1.75rem;
    }
    .backWrite {
        width: 17.875rem;
        height: 3.0625rem;
        position: sticky;
        top: 0;
        right: 0;
        background: #fff;
    }
    ul.levelBox li {
        overflow: hidden;
        color: #2c2e30;
        font-size: 0.875rem;
        height: 2.625rem;
        border-bottom: 1px solid #d0d0d0;
    }
    .eyeBox {
        width: 2.625rem;
        height: 2.625rem;
        float: left;
        box-sizing: border-box;
        border-right: 1px solid #d0d0d0;
    }
    .eye {
        display: block;
        margin: 0 auto;
        width: 1.1875rem;
        padding-top: 0.6875rem;
        height: auto;
    }
    .rightBox {
        width: 13.525rem;
        box-sizing: border-box;
        padding: 0 0.625rem;
        height: 2.625rem;
        float: left;
    }
    .proBox {
        float: left;
        cursor: default;
        line-height: 2.625rem;
    }
    .downNav {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.625rem;
        width: 0.75rem;
    }
    .imgBox {
        float: right;
    }
    .proImg {
        width: 2rem;
        float: left;
        margin-top: 0.3125rem;
        height: 2rem;
    }
    .delImg {
        width: 1.125rem;
        display: block;
        float: left;
        margin-left: 1.5625rem;
        margin-top: 0.65rem;
        height: auto;
    }
    .rightBox .delImg {
        float: right;
        height: auto;
    }
    /* 连晒弹窗 */
    .bigModel {
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        overflow-y: scroll;
        width: 100%;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
    }
    .grabBox {
        width: 336px;
        height: 132px;
        background: #ffffff;
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
        0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        border-radius: 4px;
        margin: 0 auto;
        position: relative;
        margin-top: calc(50vh - 90px);
    }
    .grabBox h3 {
        padding-top: 15px;
        font-weight: normal;
        font-size: 14px;
        margin: 0;
    }
    .grabBox .del {
        position: absolute;
        width: 1.891rem;
        height: 1.891rem;
        right: -2.396rem;
        top: 0;
        line-height: 1.891rem;
        text-align: cneter;
        cursor: pointer;
    }
    .del img {
        width: 100%;
        display: block;
    }
    .grabBox span {
        display: block;
        font-size: 14px;
        margin: 15px 0 24px;
    }
    .grabBox span.specialSpan {
        margin: 24px 0 30px;
    }
    .grabBox .grabWay {
        overflow: hidden;
        width: 100%;
    }
    .grabWay li {
        width: 50%;
        float: left;
    }
    .grabWay li > button {
        width: 169px;
        height: 43px;
        outline: none;
        border: none;
        line-height: 43px;
        color: #333;
        background: #ffe300;
        font-size: 0.882rem;
        border-radius: 0;
        display: block;
    }
    .grabBox li:last-child > button {
        background: #fff;
        border: 1px solid #9a9a9a;
    }
    .picBox {
        position: absolute;
        background: #fff;
        top: 50px;
        left: calc(50% - 500px);
        width: 1000px;
        height: 600px;
        margin-bottom: 50px;
        border-radius: 10px;
    }
    .specialPic {
        width: 700px;
        height: 1000px;
        left: calc(50% - 350px);
    }
    .picBox h5 {
        font-size: 30px;
        color: #333;
        font-weight: normal;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .picDel {
        position: absolute;
        width: 25px;
        height: 25px;
        right: -36px;
        top: 15px;
        cursor: pointer;
    }
    .picDel img {
        display: block;
        width: 100%;
    }
    .posBox {
        width: 900px;
        overflow: hidden;
        margin: 0 auto;
    }
    .posBox ul {
        width: 300px;
        float: left;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .posBox ul li {
        position: absolute;
        border-radius: 10px;
        border: 2px solid transparent;
    }
    .linkBox {
        width: 600px;
        margin: 0 auto;
        overflow: hidden;
    }
    .linkBox ul {
        width: 300px;
        float: left;
        height: 450px;
        position: relative;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .linkBox ul li {
        position: absolute;
        border-radius: 10px;
        border: 2px solid transparent;
    }
    /* 改动-素色栏 */
    .bigImgList {
        display: flex;
        justify-content: space-evenly;
        margin: 10px 5px;
    }
    .bigBtn {
        text-align: left;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        margin-left: 10px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px #eee;
    }
    .bigBtn > img {
        width: 100%;
        margin: 0 auto;
    }
    .bigBtn > div {
        left: -40px;
        opacity: 0;
    }
    /* 改动-拖动放大旋转 */
    .mouse {
        position: absolute;
        left: 50%;
    }
    .mouse .mouseItem1 {
        width: 2px;
        height: 40px;
        background: #000;
        position: relative;
    }

    .disNone {
        display: none;
    }
    .disHidd {
        display: hidden;
    }
    .rotatebtn {
        width: 30px;
        height: 30px;
        position: relative;
        top: -59px;
    }
    .cursorClassRightTop {
        cursor: url("../../assets/image/flower/changeSizeRightTop.png"), auto;
    }
    .cursorClassRightBottom {
        cursor: url("../../assets/image/flower/changeSize.png"), auto;
    }
    .cursorClassRotate {
        cursor: url("../../assets/image/flower/rotate.png"), auto;
    }
    .changeSizeBtn {
        width: 20px;
        height: 20px;
        background-color: gray;
    }
    #rotateItem {
        width: 10px;
        height: 10px;
        background: #000;
        border-radius: 50%;
        position: relative;
        left: -4px;
    }
    .changeSizeArea {
        position: absolute;
        transform: rotateY(180deg);
        top: -15px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button,.bigImgList>span{
        cursor: pointer;
    }
    .grabWay>li:first-child>button:hover{
        background: #ffd000;
    }
    .grabWay>li:last-child>button:hover{
        background: #eee;
    }
</style>
