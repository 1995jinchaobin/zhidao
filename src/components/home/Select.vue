<template>
    <div class="select">
        <Tab  :tabIndex="tabIndex"></Tab>
        <div class="back">
            <div class="backLeft">
                <!--<h4>智能快速分色，时间腾给创作</h4>-->
                <h4>以图识图+订单管理系统</h4>
                <img class="online" src="../../assets/image/home/sx.png" alt="">
                <p style="margin-bottom: 5px;">织道以图识图以深度学习和AI神经网络技术为核心，结合不同业务场景，帮助用户在</p>
                <p style="margin-bottom: 5px;">自建花型面料库中实现相同或相似花型搜索，无缝对接在线订单管理系统，在线下单、</p>
                <p style="margin-bottom: 5px;">订单管理、流程管控等帮助企业完成大数据的统一管理，为企业提供，便捷的从管理</p>
                <p>客户，实现订单的全套产品与解决方案</p>
                <!--<p>织道云作为一站式花型设计平台，通过AI智能技术将为您提供无限花型创意通过海量的花型素材以及可视化编辑能力，帮助零基础的用户轻松完成花型设计制作，每人每天节省4小时，让您在同行中脱颖而出，出奇制胜</p>-->
                <div>
                    <div @click="toFs"><h5>预约演示</h5></div>
                    <div class="btn" @click="downLoadPc"><h5>PC客户端下载</h5></div>
                </div>
                <img src="../../assets/image/home/lattice.png">
            </div>
            <img src="../../assets/image/home/backRight.png" alt="">
        </div>
        <div class="header">
            <span class="num">织道云已为 <h4>{{pioneer}}</h4> 位创业者</span>
            <div ref="time" class="flowerNum">
                <span>智能设计</span>
                <div>
                    <NumberGrow v-if="timeShow" :Num="flowerNum"></NumberGrow>
                    <!-- <ul id="flowerNum" >
                        <li v-for="(item,index) in flowerNum" :key="index"><p v-if="item != ','"><span >{{item}}</span></p><p v-else-if="item == ','" class="noneLi">{{item}}</p></li>
                    </ul> -->
                </div>
                <span>个花型</span>
            </div>
            <div class="flowerItem">
                <!-- <p class="boxItem" >
                    <span id="Number" >0123456789</span>
                </p> -->
                <ul>
                    <li v-for="(item,index) in flowerItem" :key="index">
                        <span class="itemIcon"><span></span></span>
                        <h4 class="itemTitle">{{item.name}}</h4>
                        <p class="itemCount">{{item.count}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shopping">
            <div>
                <h4>海量精美模板，满足不同场景使用</h4>
                <ul class="shoppingType">
                    <li v-for="(item,index) in shoppingType" :key="index" @click="toLink(item)">{{item}}</li>
                </ul>
                <div class="shoppingCard">
                    <div class="topCard">
                        <div>
                            <div class="cardItem">
                                <img src="../../assets/image/home/1.png"  style="width: 100%;height: 100%;" alt="">
                                <span>
                                    <p>羽毛</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class=" cardItem">
                                <img src="../../assets/image/home/2.png" style="width: 100%;height: 100%;" alt="">
                                <span>
                                    <p>抽象设计</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="cardItem">
                                <img src="../../assets/image/home/3.png" style="width: 100%;height: 100%;" alt="">
                                <span>
                                    <p>烟火</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="cardItem">
                                <img src="../../assets/image/home/4.png" style="width: 100%;height: 100%;" alt="">
                                <span>
                                    <p>蓝色海洋</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="botCard">
                        <div class="cardLeft">
                            <div style="margin-bottom: 4.414rem;"></div>
                            <h4 data-wow-duration='1s' data-wow-delay="0.5s">公开区花型免费</h4>
                            <span data-wow-duration='1s' data-wow-delay="0.75s">
                                <p>申请加入织道VIP俱乐部，</p>
                                <p>让您在同行中脱颖而出，出奇制胜</p>
                            </span>
                            <div>
                                <span class="cardBtn" @click="toVip">
                                    <p>立即加入</p>
                                    <img src="../../assets/image/home/Combined Shape 2.png" alt="">
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="cardItem">
                                <img style="width: 100%;height: 100%;" src="../../assets/image/home/5.png" alt="">
                                <span>
                                    <p>蝶恋花</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="cardItem">
                                <img style="width: 100%;height: 100%;" src="../../assets/image/home/6.png" alt="">
                                <span>
                                    <p>豹纹</p>
                                    <p>花花币：59.9</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="btnBox" @click="toFlower">
                        <span>全部2，325，082个精美花型</span><img src="../../assets/image/home/Combined Shape 3.png" alt="">
                    </div>
                    <div style="height: 124px;"></div>
                </div>
            </div>
        </div>
        <div id="ai" ref="ai" class="ai">
            <div v-if="aiShow" class="imgBox">
                <div style="margin-bottom: 4.5402rem;"></div>
                <img  class="fadeInLeft relative" src="../../assets/image/home/imagery.png" alt="">
            </div>
            <div v-if="aiShow" class="fadeInRight relative aiCount" >
                <div style="margin-bottom: 10.0893rem;"></div>
                <h4>AI设计-预见未来</h4>
                <p>用户自行选择花型类别后，平台自动生成 花型图样，此外，平台还提供AI分层功能</p>
                <ul>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>数以百万计的免费花型素材</span></li>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>在线自助设计，海量精美素材供您选</span></li>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>成品花型云端存储，一键下载</span></li>
                </ul>
                <div  class="aiBtn" @click="toAi"><span>开始设计</span><img src="../../assets/image/home/Combined Shape 3.png" alt=""></div>
            </div>
        </div>
        <div id="fs" class="fenSe">
            <div ref="fenSe" v-if="fenSeShow" class="fadeInLeft relative">
                <div class="fsCount">
                    <div style="margin-bottom: 10.0893rem;"></div>
                    <h4>智能快速分色</h4>
                    <p>极简在线编辑器，一键快速AI智能分色，支持PSD分层下载</p>
                    <ul>
                        <li><img src="../../assets/image/home/checkmark.png" alt=""><span>一键上传花型即可快速实现分色</span></li>
                        <li><img src="../../assets/image/home/checkmark.png" alt=""><span>闪电速度，节省您的时间</span></li>
                        <li><img src="../../assets/image/home/checkmark.png" alt=""><span>PSD分层极速下载，满足您的生产所需</span></li>
                    </ul>
                    <div class="fsBtn"><span>敬请期待</span></div>
                </div>
                <div v-if="fenSeShow" class="imgBox">
                    <div style="margin-bottom: 4.5402rem;"></div>
                    <img  class="fadeInRight relative" src="../../assets/image/home/imagery2.png" alt="">
                    <div style="margin-top: 7.1256rem;"></div>
                </div>
            </div>
        </div>
        <div ref="threed" id="3d" class="threed">
            <div v-if="threedShow" class="imgBox">
                <div style="margin-bottom: 4.5402rem;"></div>
                <img  class="fadeInLeft relative" src="../../assets/image/home/imagery3.png" alt="">
            </div>
            <div v-if="threedShow"  class="fadeInRight relative threedCount">
                <div style="margin-bottom: 10.0893rem;"></div>
                <h4>3D展示</h4>
                <p>选择花型与面料，一键快速AI智能3D展示</p>
                <ul>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>自主生成对应的3D服装样式</span></li>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>细节查看，充分满足顾客的个性化需求</span></li>
                    <li><img src="../../assets/image/home/checkmark.png" alt=""><span>成品花型云端存储，一键下载</span></li>
                </ul>
                <div class="threedBtn" @click="toThreeD"><span>开始展示</span><img src="../../assets/image/home/Combined Shape 3.png" alt=""></div>
            </div>
        </div>
        <div class="footer">
            <div class="footBg leftBg"></div>
            <div style="height: 60px;"></div>
            <div class="footRely">
                <div style="margin-bottom: 4.414rem;"></div>
                <div class="relyTitle">
                    <h4>被他们信任</h4>
                    <div><span @click="rightPage" id="Fleft"></span><span @click="leftPage" id="Fright"></span></div>
                </div>
                <img src="../../assets/image/home/logo.png" alt="">
            </div>
            <div class="footMsg">
                <div class="msgCount" v-for="(item,index) in assessList" :key="index">
                    <div>
                        <span class="msg">{{item.msg}}</span><br/>
                        <span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span><span class="xing"></span>
                    </div>
                    <div>
                        <span><img :src="item.portrait" alt=""></span>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="msgIcon">
                <span class="iconItem" :data-page="1" @click="pageCheck($event)"></span>
                <span class="iconItem" :data-page="2" @click="pageCheck($event)"></span>
                <span class="iconItem" :data-page="3" @click="pageCheck($event)"></span>
            </div>
            <div style="height: 60px;"></div>
        </div>
        <div class="footBg rightBg"></div>
        <Footer style="z-index: 6;"></Footer>
    </div>
</template>
<script>
import Tab from "../../components/Tab";
// import { WOW } from 'wowjs';
import NumberGrow from '../number';
import Footer from "../../components/Footer";
export default {
    name: 'Select',
    // props: ['cases'],
    components:{
        Tab,
        Footer,
        NumberGrow
    },
    data(){
        return {
            tabIndex: 98,
            pioneerNum:2353351,
            pioneer:'',
            // flowerNum:[8,5,0,8,2,9,9],
            flowerNum:8508299,
            flowerItem:[
                {name: 'AI智能',count:'只需选择喜欢的素材，我们的AI智能技术将为您提供无限花型创意'},
                {name: '专业出品',count:'就像一名专业花型设计师，为您量身打造您想要的花型'},
                {name: '矢量高清',count:'高清矢量源文件可以被无限放大的同时不丢失任何细节，实现完美印刷'},
                {name: '海量素材',count: '业内最全免费花型素材库 + 设计师版权花型，使你的花型独一无二'}
            ],
            shoppingType:['全部','动物','植物','人物','风景','几何','抽象','迷彩','格纹','卡通','文字','其他'],
            assessList:[
                {msg:'织道花型设计是花型小白通向设计的一座桥梁，真的帮了很大的忙，总是忍不住推荐给身边的朋友呢！',portrait:require('../../assets/image/home/avatar.png'),name:'阿航 花型设计小白'},
                {msg:'我常需要制作花型，织道设计提供了极大的帮助，不过在素材丰富度上，要继续加油哦。',portrait:require('../../assets/image/home/avatar2.png'),name:'蚊子 品牌商'},
                {msg:'织道设计，素材原创让使用者不再担心版权问题，编辑方便。力推在线分色',portrait:require('../../assets/image/home/avatar3.png'),name:'施飞 面料商'},
                {msg:'代码和设计合为一体的织道设计，专注花型设计的网站，真的很好用！',portrait:require('../../assets/image/home/avatar4.png'),name:'江郎 辅料商'},
                {msg:'织道花型给我增添了很多客观的额外收入，每天接单到手软。而且还能帮我代管店铺！织道真的是太棒了！',portrait:require('../../assets/image/home/avatar5.png'),name:'小龙  设计师'},
                {msg:'织道的ai设计给我设计了不少花型，省时省力！以后我会推荐给我的朋友！',portrait:require('../../assets/image/home/avatar6.png'),name:'购时尚  品牌商'},
                {msg:'嗯嗯！超级棒，3d试衣能展示我合成的花型上衣效果，可以少走不少弯路！',portrait:require('../../assets/image/home/avatar7.png'),name:'孟非  品牌商'},
                {msg:'设计了不少花型，不用自己销售，直接上架。客户自己会自主下单，就看着money自动进腰包。',portrait:require('../../assets/image/home/avatar9.png'),name:'seei  设计师'},
                {msg:'上织道找灵感，虽然有些花型用不上，但是合成后的样式可以借鉴，帮我公司的设计师制造了不少灵感！',portrait:require('../../assets/image/home/avatar10.png'),name:'韩装布料 面料商'},
                {msg:'看着身边的朋友都在用这个，出于好奇我也下载并注册了，一键生成让我有更多的时间吃零食了。',portrait:require('../../assets/image/home/avatar8.png'),name:'张豪    设计师'},
                {msg:'今天是注册第一天，玩了一遍这个平台，感觉很有用呢！以后经验足了我会多上传花型！赚取生活费！',portrait:require('../../assets/image/home/avatar11.png'),name:'雄宝宝 设计师'},
                {msg:'3d试衣能直接展示出我制作的花型，直接有视觉效果，让我自己先做个筛选,给我节省了很多时间！',portrait:require('../../assets/image/home/avatar12.png'),name:'吕妹妹  设计师'}
            ],
            pageNum:1,
            close: true,
            threedShow: false,
            deviceShow: false,
            sceneShow: false,
            fenSeShow: false,
            productShow: false,
            timeShow: false,
            aiShow: false,
            loading: false,
            timeOut:3000
        }
    },
    methods: {
        handleScroll () { // 实现当滚动到指定位置，触发动画
            // let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 获取窗口滚动条高度
            // this.gdjz('earth', 'earth animated bounceInDown', 50)
            let _this = this;
            let refArray = [
                {ref: 'scene', show: 'sceneShow'},
                {ref: 'time', show: 'timeShow'},
                {ref: 'ai', show: 'aiShow'},
                {ref: 'fenSe', show: 'fenSeShow'},
                {ref: 'product', show: 'productShow'},
                {ref: 'device', show: 'deviceShow'},
                {ref: 'threed', show: 'threedShow'}
            ]
            refArray.forEach((r,i) => {
                _this.gdjz(r.ref, 60, () => {
                    _this[r.show] = true
                })
            })
        },
        gdjz (div, offset, callback) {
            let dom = this.$refs[div] // 等同于document.querySelector('.earth') true
            if(dom){
                var a,b,c,d;
                d = dom.offsetTop // 元素距离相对父级的高度，这里父级指的是body
                a = eval(d + offset);
                b = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //  获取窗口滚动条高度
                c = document.documentElement.clientHeight || document.body.clientHeight // 获取浏览器可视区的高度
                if( b + c > a ) {
                    callback && callback()
                }
            }
        },
        // 修改数量为科学计数
        numUl(value){
            this.pioneer = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,');
        },
        // 点击跳转至指定页面
        toLink(val){
            let id;
            switch (val) {
                case '动物':
                    id = 1;
                    break;
                case '植物':
                    id = 11;
                    break;
                case '人物':
                    id = 2;
                    break;
                case '风景':
                    id = 3;
                    break;
                case '几何':
                    id = 4;
                    break;
                case '抽象':
                    id = 5;
                    break;
                case '迷彩':
                    id = 6;
                    break;
                case '格纹':
                    id = 7;
                    break;
                case '卡通':
                    id = 8;
                case '文字':
                    id = 9;
                    break;
                    break;
                case '其他':
                    id = 10;
                    break;
                default:
                    break;
            }
            this.$router.push({
                name: 'Shopping',
                params:{
                    type:id
                }
            });
        },
        toVip(){
            this.$router.push({
                name:'Vip'
            })
        },
        toFlower(){
            this.$router.push({
                name: 'Shopping'
            })
        },
        toAi(){
            this.$router.push({
                name: 'Ai'
            })
        },
        toThreeD(){
            let type = {
                type: 5
            };
            localStorage.setItem("threedNewjson", JSON.stringify(type));
            this.$router.push({
                name:'Threed'
            })
        },
        toFs(){
            this.$router.push({
                name:'Reservation'
            })
        },
        toMasks(){
            this.$router.push({
                name:'OrderMasks'
            })
        },
        downLoadPc(){
            var aBox = document.createElement('a');
            aBox.target = '_blank';
            aBox.href = 'http://www.youchaikj.com/product.html';
            aBox.click();
        },
        // 点击滑动底部用户留言
        leftPage(){
            if(this.pageNum >= 1&&this.pageNum < 3){
                this.pageNum++;
                this.$forceUpdate();
                this.changeSize(this.pageNum);
            }
        },
        rightPage(){
            if(this.pageNum <= 3&&this.pageNum >= 1){
                if(this.pageNum > 1){
                    this.pageNum--;
                }
                this.$forceUpdate();
                this.changeSize(this.pageNum)
            };
        },
        pageCheck(e){
            
        },
        // 滑动底部用户留言
        changeSize(val){
            let msg = document.getElementsByClassName("msgCount")[0];
            switch (val) {
                case 1:
                    msg.style.cssText = 'margin-left: 0;';
                    this.iconChange(val);
                    break;
                case 2:
                    msg.style.cssText = "margin-left: -105rem;";
                    this.iconChange(val);
                    break;
                case 3:
                    msg.style.cssText = 'margin-left: -208rem';
                    this.iconChange(val);
                default:
                    break;
            }
        },
        // 底部留言标志切换
        iconChange(num){
            let iconList = document.getElementsByClassName("iconItem");
            for(let i = 0;i < iconList.length;i++){
                iconList[i].style.cssText = 'background: #818181;'
                if(i+1 == num){
                    iconList[i].style.cssText = 'background: #000;'
                }
            }
        },
        // 轻纺城用户登录时获取用户信息
        getUserInfo(){
            if(!localStorage.getItem('nickname')){
                if(localStorage.getItem("user")){
                    this.user = JSON.parse(localStorage.getItem("user"));
                    localStorage.removeItem('nickname');
                    localStorage.removeItem('headPhoto');
                    localStorage.setItem('nickname',this.user.nickname);
                    localStorage.setItem('headPhoto',this.user.headPhoto);
                }
            }
        },
        setNum(){
            // let num = 0;
            // let numChange = setInterval(() => {
            //     let number = document.getElementById('Number');
            //     number.style.transform = `translate(-50%, -${num * 10}%)`;
            //     num++;
            //     if(num == 10){
            //         num = 0;
            //     }
            // }, 100)
            // setTimeout(()=>{
            //     // clearInterval(numChange);
            // },this.timeOut);
        },
    },
    mounted(){
        this.getUserInfo();
        this.numUl(this.pioneerNum);
        setInterval(() => {
            let addNum = Math.floor(Math.random()*10);
            this.pioneerNum = this.pioneerNum + addNum;
            this.numUl(this.pioneerNum)
        },10000)
        this.iconChange(1);
        // localStorage.setItem('path',this.path);
        window.addEventListener('scroll', this.handleScroll);
        this.setNum()

    }
}
</script>
<style scoped>
    /* .boxItem{
        position: relative;
        display: inline-block;
        width: 54px;
        height: 82px;
        font-size: 62px;
        text-align: center;
        line-height: 82px;
        border: 1px solid #000;
        writing-mode: vertical-lr;
        text-orientation: upright;
        overflow: hidden;
    }
    .boxItem span{
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translate(-50%,-50%);
        letter-spacing: 10px;
        transition: all 0.5s;
    } */
    .select{
        width: 100%;
        min-width: 1200px;
        position: relative;
        min-height: 100%;
        box-sizing: border-box;
        padding-bottom: 1.25rem;
        overflow: hidden;
    }
    .back{
        width: 100%;
        height: 50.4467rem;
        min-width: 1690px;
        background: #fff url('../../assets/image/home/bg.png') no-repeat top;
        background-size: 100%;
        display: flex;
        margin-bottom: 8.4135rem;
    }
    .backLeft{
        width: 40.9879rem;
        text-align: left;
        margin-top: 8.8921rem;
        margin-left: 120px;
        position: relative;
    }
    .backLeft h4{
        font-size: 50px;
        width: 650px;
        color: #FFFFFF;
        margin-bottom: 1.135rem;
    }
    .backLeft>img.online{
        width: auto;
        height: 74px;
        position: absolute;
        top: -37px;
        left: 543px;
    }
    .backLeft p{
        display: inline-block;
        width: 684px;
        font-size: 1.125rem;
        color: rgba(255,255,255,0.80);
        text-align: left;
        margin-bottom: 6.36894rem;
        z-index:10;
    }
    .backLeft>div{
        display: flex;
    }
    .backLeft>div>div{
        width: 206px;
        height: 62px;
        border-radius: 100px;
        text-align: center;
        line-height: 62px;
    }
    .backLeft>div div>h5{
        font-size: 18px;
    }
    .backLeft>div div:first-child{
        background: #FFE300;
        color: #333333;
        margin-right: 30px;
        z-index:10;

    }
    .backLeft>div div:last-child{
        border: 2px solid #fff;
        color: #fff;
        z-index:10;

    }
    .backLeft>img{
        width: 60.8062rem;
        height: 31.2769rem;
        position: absolute;
        left: 0;
        top: 36.23rem;
    }
    .back>img{
        width: 64.5088rem;
        height: 52.3385rem;
        right: -1.433rem;
        position: relative;
        top: 4rem;
    }
    @media screen and (max-width:1650px){
        .back>img{
            position: relative;
            width: 64.5088rem;
            height: 52.3385rem;
            right: -5rem;
        }
    }
    .header span.num{
        display: block;
        font-size: 16px;
        color: #666666;
    }
    .header span.num>h4{
        display: inline-block;
        font-size: 24px;
        color: #151515;
    }
    .header .flowerNum{
        height: 95px;
        line-height: 95px;
    }
    .header .flowerNum span{
        font-size: 30px;
        color: #333333;
    }
    .header .flowerNum>div{
        display: inline-block;
        margin: 12.5px 23px;
    }
    .header .flowerNum div ul{
        display: flex;
        align-items: center;
    }
    .header .flowerNum div ul li p{
        width: 60px;
        height:70px;
        background: #FFE300;
        border-radius: 8px;
        font-size:30px;
        color: #000000;
        line-height: 70px;
        font-weight: bold;
        overflow: hidden;
    }
    .header .flowerNum div ul li p.noneLi{
        display: inline-block;
        width: 7px;
        height: 36px;
        background: #fff;
        font-size: 30px;
        line-height: 111px;
        color: #000000;
        font-weight: bold;
        position: relative;
        top: 15px;
        overflow: inherit;
    }
    .header .flowerNum div ul li+li{
        margin-left: 5px;
    }
    .flowerItem{
        width: 100%;
        height: 145px;
        margin-top: 80px;
        margin-bottom: 35px;
    }
    .flowerItem ul{
        display: flex;
        justify-content: space-evenly;
    }
    .flowerItem ul li{
        width: 202px;
        text-align: left;
    }
    .flowerItem ul li .itemIcon{
        display: inline-block;
        position: relative;
        width: 25px;
        height: 3px;
        background: #171A1E;
        border-radius: 1.5px;
        margin-bottom: 50px;
    }
    .flowerItem ul li .itemIcon span{
        display: inline-block;
        position: absolute;
        width: 72px;
        margin-top: .5px;
        opacity: 0.3;
        height: 1px;
        background: #171A1E;
        border-radius: 1.5px;
    }
    .flowerItem ul li .itemTitle{
        font-size: 21px;
        color: #171A1E;
        font-weight: bold;
    }
    .flowerItem ul li .itemCount{
        opacity: 0.5;
        font-size: 14px;
        color: #171A1E;
    }
    .shopping{
        width: 100%;
        background: #F8F8F8;
        padding-top: 7.7561rem; 
    }
    .shopping>div{
        width: 1200px;
        margin: 0 auto;
    }
    .shopping h4{
        display: block;
        height: 54px;
        font-size: 46px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
        line-height: 54px;
        margin-bottom: 49px;
    }
    .shopping ul{
        width: 1100px;
        margin: 0 auto 70px;
        height: 42px;
        display: flex;
        justify-content: space-evenly;
    }
    .shopping ul>li{
        width: 75px;
        height: 42px;
        font-size: 12px;
        font-weight: bold;
        color: #333333;
        letter-spacing: 0.7px;
        line-height: 42px;
        background: #F3F3F3;
        border-radius: 100px;
    }
    .shopping ul>li:first-child{
        background: #fFE300;
        border: 1px solid #FFE300;
    }
    .shopping .shoppingCard{
        margin: 0 auto;
    }
    .topCard{
        margin-bottom: 30px;
    }
    .topCard,.botCard{
        height: 400px;
        display: flex;
        justify-content: space-evenly;
    }
    .cardItem{
        width: 262px;
        position: relative;
        display: flex;
    }
    .cardItem span{
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        height: 80px;
        text-align: center;
        background: linear-gradient(#00000000,#00000099);
    }
    .cardItem span p{
        font-size: 20px;
        color: #FFFFFF;
        line-height: 26px;
        letter-spacing: 0.2px;
        margin: 0;
    }
    .botCard .cardLeft{
        width: 555px;
        height: 400px;
        background: #fff;
        transition: all 0.5s;
    }
    .botCard .cardLeft h4{
        font-size: 46px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;
        margin-bottom: 17px;
    }
    .botCard .cardLeft span p{
        opacity: 0.6;
        font-size: 17px;
        color: #000000;
        letter-spacing: 0.2px;
        text-align: center;
        margin: 5px;
    }
    .botCard .cardLeft div:last-child{
        width: 323px;
        height: 198px;
        background: url('../../assets/image/home/logobg.png') no-repeat top;
        background-size: 100%;
        margin: 0 auto;
        display:flex;
        align-items:center; 
    }
    .botCard .cardLeft div:last-child span{
        display: flex;
        width: 140px;
        height: 45px;
        background: linear-gradient(#FF165E,#E81254);
        line-height: 45px;
        border-radius: 100px;
        align-items: center;
        justify-content: space-evenly;
        margin: auto;
    }
    .botCard .cardLeft div:last-child span p{
        display: inline;
        opacity: 1;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.2px;
    }
    .botCard .cardLeft div:last-child span img{
        width: 22px;
        height: 22px;
    }
    .botCard .cardItem span p{
        font-size: 20px;
        color: #FFFFFF;
        line-height: 26px;
        letter-spacing: 0.2px;
        margin: 0;
    }
    .btnBox{
        width: 272px;
        height: 45px;
        border-radius: 100px;
        background: #FFE300;
        margin: 3.9726rem auto 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
    }
    .btnBox img{
        width: 1.3857rem;
        height: 1.3857rem;
        margin-left: 18px;
    }
    .ai,.threed,.fenSe>div{
        width: 1200px;
        height: 819px;
        margin: 0 auto;
        display: flex;
    }
    .imgBox{
        width: 559px;
        height: 620px;
        margin-bottom: 33px;
    }
    .imgBox img{
        width: 100%;
        height: 100%;
    }
    .aiCount,.fsCount,.threedCount{
        margin-left: 100px;
        text-align: left;
    }
    .aiCount>h4,.fsCount>h4,.threedCount>h4{
        font-size: 50px;
        color: #090B27;
        letter-spacing: 0;
    }
    .aiCount>p,.fsCount>p,.threedCount>p{
        width: 570px;
        font-size: 20px;
        color: #666666;
        letter-spacing: 0;
        line-height: 35px;
        margin-bottom: 80px;
    }
    .aiCount ul li,.fsCount ul li,.threedCount ul li{
        display:flex;
        align-items: center;
        height: 19px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        margin: 17px 0;
        font-weight: bold;
    }
    .aiCount ul li img,.fsCount ul li img,.threedCount ul li img{
        width: 18.8px;
        height: 18.8px;
        margin-right: 11.1px;
    }
    .aiBtn,.fsBtn,.threedBtn{
        width: 206px;
        height: 62px;
        border-radius: 100px;
        margin-top: 60px;
        margin-bottom: 134px;
        background: #ffe300;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 0 0 5px #000;
    }
    .fsBtn{
        background: #e0e0e0 !important;
        cursor: default;
    }
    .aiBtn span,.fsBtn span,.threedBtn span{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        margin-right: 8px;
    }
    .aiBtn img,.fsBtn img,.threedBtn img{
        width: 22px;
        height: 22px;
    }
    .fenSe{
        width: 100%;
        background: #F8F8F8;
    }
    .fsCount>p{
        color: #5B5D7E;
    }
    .footer{
        display: flex;
        background: #F5F5F5;
        position: relative;
        height: 52.44rem;
        overflow: hidden;
    }
    .footBg{
        width: 17.9664rem;
        height: 55.9328rem;
        position: absolute;
        overflow: hidden;
    }
    .leftBg{
        bottom: -16rem;
        /* right: 104.2rem; */
        background: url('../../assets/image/home/Combined Shape 4.png') no-repeat right;
        background-size: auto 100%;
        /* background-position:right; */
        z-index: 1;
    }
    .rightBg{
        bottom: 49rem;
        right: 0rem;
        background: url('../../assets/image/home/Combined Shape 5.png') no-repeat left;
        background-size: auto 100%;
    }
    .footRely{
        width: 75.6701rem;
        height: 27.1871rem;
        background: #FFE300;
        border-radius: 10px;
        position: relative;
        top: 4.0987rem;
        left: 21.44rem;
        z-index: 5;
    }
    .footRely>img{
        width: 68.7337rem;
        height: 10.9091rem;
        margin-left: 6.3058rem;
    }
    .footRely .relyTitle{
        height: 86px;
        display: flex;
        justify-content: space-between;
    }
    .footRely .relyTitle h4{
        font-size: 50px;
        color: #333333;
        margin-left: 6.3058rem;
    }
    .footRely .relyTitle div{
        width: 8.8281rem;
        margin-right: 1.892rem;
    }
    .footRely .relyTitle div>span#Fleft{
        display: inline-block;
        width: 3.72rem;
        height: 3.72rem;
        background: url('../../assets/image/home/back.png') no-repeat top;
        background-size: 100%;
        margin-right: 1.3243rem;
    }
    .footRely .relyTitle div>span#Fright{
        display: inline-block;
        width: 3.72rem;
        height: 3.72rem;
        background: url('../../assets/image/home/back.png') no-repeat top;
        transform: rotate(180deg);
        background-size: 100%;
    }
    .footMsg{
        /* width: 94.2818rem; */
        width: 100%;
        min-width: 1200px;
        height: 21.3763rem;
        position: absolute;
        top: 25.5838rem;
        left: 0;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        display: flex;
        z-index: 6;
        overflow:hidden;
        width: 100%;
    }
    .footMsg .msgCount{
        position: relative;
        width: 30.7725rem;
        height: 22.6921rem;
        background: url('../../assets/image/home/message-2.png') no-repeat top;
        background-size: 100%;
        display: flex;
        justify-content: center;
        transition: all 0.5s;
    }
    .footMsg>div+div{
        margin-left: -5rem;
    }
    .footMsg .msgCount div:first-child{
        width: 19.5481rem;
        height: 7.8823rem;
        margin: 3.0898rem 5.6122rem 0;
        text-align: left;
    }
    .footMsg .msgCount div:first-child span.msg{
        font-size: 1.261rem;
        color: #5B5D7E;
        letter-spacing: 0;
        line-height: 2.207rem;
    }
    .footMsg .msgCount div:first-child span.xing{
        display: inline-block;
        width: 1.0089rem;
        height: 1.0089rem;
        background: url('../../assets/image/home/star 2.png') no-repeat top;
        background-size: 100%;
    }
    .footMsg .msgCount div:last-child{
        position: absolute;
        height: 3.7835rem;
        bottom: 3rem;
        display: flex;
        align-items: center;
    }
    .msgCount div:last-child span:first-child{
        display: inline-block;
        width: 3.0835rem;
        height: 3.0835rem;
        border: 4px solid #FFFFFF;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
        border-radius: 50%;
        overflow: hidden;
        margin-right: .63rem;
    }
    .msgCount div:last-child span:first-child img{
        width: 100%;
        height: 100%;
    }
    .msgCount div:last-child span:last-child{
        font-size: 1.135rem;
        color: #090B27;
        font-weight: bold;       
    }
    .msgIcon{
        width: 3.7835rem;
        height: .62rem;
        position: absolute;
        bottom: 2.483rem;
        left: 58.8966rem;
    }
    .msgIcon span{
        display: inline-block;
        width: .62rem;
        height: .62rem;
        border-radius: 50%;
        opacity: 0.25;
        background: #818181;
    }
    .msgIcon span+span{
        margin-left: .756rem;
    }
    .foot{
        position: relative;
        top: -7.5rem;
        height: 20rem;
    }
    /* 修改按钮鼠标悬停样式 */
    .backLeft>div>div,.shoppingType li,.cardBtn,.btnBox,.aiBtn,.threedBtn,#Fleft,#Fright{
        cursor:pointer;
    }
    .backLeft>div>div:first-child:hover,.btnBox:hover,.aiBtn:hover,.threedBtn:hover,.shoppingType>li:first-child:hover{
        background: #ffd000 !important;
    }
    .shoppingType>li:hover{
        background: #eee !important;
    }
    .btn:hover{
        border: 2px solid #ffd000 !important;
        color: #ffd000 !important;
    }
    /* 动画 */
    .relative{
        position: relative;
    }
    .fadeInLeft{
        animation-name: fadeInLeft;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.5,0.3,0.2,0.1);
    }
    .fadeInRight{
        animation-name: fadeInRight;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.5,0.3,0.2,0.1);
    }
    .circle{
        display: inline-block;
        animation-name: scroll;
        animation-duration: 0.2s;
        animation-iteration-count: 5;
    }
    .circleAlert{
        display: inline-block;
        animation-name: scrollAlert;
        animation-duration: 0.2s;
        animation-iteration-count: 5;
    }
    @keyframes fadeInUp {
        0%{top: 30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{top: 15px;}
        95%{opacity: 0.8;}
        99%{top: 1px;}
        100%{top: 0;}
    }
    /* Firefox */
    @-moz-keyframes fadeInUp {
        0%{top: 30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{top: 15px;}
        90%{opacity: 1;}
        99%{top: 1px;}
        100%{top: 0;}
    }
    /* Safari 和 Chrome */
    @-webkit-keyframes fadeInUp {
        0%{top: 30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{top: 15px;}
        90%{opacity: 1;}
        99%{top: 1px;}
        100%{top: 0;}
    }
    /* Opera */
    @-o-keyframes fadeInUp {
        0%{top: 30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{top: 15px;}
        90%{opacity: 1;}
        99%{top: 1px;}
        100%{top: 0;}
    }
    @keyframes fadeInLeft {
        0%{left: -30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{left: -15px;}
        90%{opacity: 1;}
        100%{left: 0}
    }
    @-moz-keyframes fadeInLeft {
        0%{left: -30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{left: -15px;}
        90%{opacity: 1;}
        100%{left: 0}
    }
    @-webkit-keyframes fadeInLeft {
        0%{left: -30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{left: -15px;}
        90%{opacity: 1;}
        100%{left: 0}
    }
    @-o-keyframes fadeInLeft {
        0%{left: -30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{left: -15px;}
        90%{opacity: 1;}
        100%{left: 0}
    }
    @keyframes fadeInRight {
        0%{right: -30px;opacity: 0;}
        25%{opacity: 0.25;}
        50%{right: -15px;}
        90%{opacity: 1;}
        100%{right: 0;}
    }
    @keyframes scroll {
        0%{transform: translateY(50px);}
        100%{transform: translateY(-50px);}
    }
    @keyframes scrollAlert {
        0%{transform: translateY(-50px);}
        100%{transform: translateY(50px);}
    }
</style>