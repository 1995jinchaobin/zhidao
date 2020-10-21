<template>
    <div class="cut">
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <!-- <canvas id="canBox" style="width: 600px;height: 400px;"></canvas> -->
        <div class="content">
            <div class="imgBox">
                <img class="bigImage" src="http://youchaikj.com/pc-img/cut_back.gif" alt="">
            </div>
            <div class="upBox">
                <h4>智能抠图 3秒搞定<span>免费在线抠图</span></h4>
                <div class="fileBox">
                    <!-- <input accept="image/*" multiple type="file" @change="add"/>
                    <button class="localBtn">本地上传</button> -->
                    <button class="localBtn" style="background-color:gray;">上传图片</button>
                    <input type="file"  ref="file" id="file" placeholder="" @change="chooseFile"/>
                    <OSSUploadNoBtn type="2" ref="ossBtn" @setImgPath="setImgPath"></OSSUploadNoBtn>
                </div>
                <p class="mine">友情提示：抠完的图点击下载后保存至我的素材中</p>
                <p>上传的素材尽量在500MB，否则会很卡</p>
            </div>
            <div class="clear"></div>
            <div class="cutBox">
                <h6>几笔就可抠出想要素材</h6>
                <div class="saveBox">
                    <p><span>要保留的用绿色标记</span><img src="../../assets/image/cut/icon_add.png" alt=""></p>
                    <p><span>要删除的用绿色标记</span><img src="../../assets/image/cut/icon_delete.png" alt=""></p>
                </div>
                <img class="image" src="http://youchaikj.com/pc-img/cut_bigback.gif" alt="">
            </div>
        </div>
        <div class="model" v-if="showModel">
        <!-- 新手引导页面 -->
            <span class="bigSpan">帮助中心</span>
            <img class="click" src="../../assets/image/cut/click.png" alt="">
            <img @click="closeModel" class="know" src="../../assets/image/cut/know.png" alt="">
        </div>
        <Footer></Footer>
        <div class="bigModel" v-if="showLook">
            <div class="grabBox">
                <h3>提示</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>今日次数已用完，VIP无限使用，是否前往充值VIP</span>
                <div class="grabWay">
                    <button @click="delLook">取消</button>
                    <button @click="wayClick">确定</button>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
let date = new Date();
import echarts from 'echarts';
import Tab from '../../components/Tab';
import Footer from '../../components/Footer';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import OSSUploadNoBtn from '../../components/common/OSSUploadNoBtn';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: "Cut",
    components: {
        Tab,
        Jump,
        Loading,
        Footer,
        OSSUploadNoBtn
    },
    data(){
        return {
            showJump: false,
            err: '',
            showLoading: false,
            tabIndex: 8,
            url: '',
            path: '/Cut',
            showModel: false,
            showLook: false,
            charts: '',
            opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            opinionData:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            imgPath:''
        }
    },
    methods: {
        // 前往vip页面充值
        wayClick(){
            this.$router.push({
                path: '/Vip'
            });
        },
        // 关闭
        delLook(){
            this.showLook = false;
        },
        add(e){
            let self = this;
            // 判断是否能进行智能抠图
            let forms = new FormData();
            forms.append('opName','kt');
            this.getData({
                url: this.all.baseUrl+'/usageRestriction/canUse',
                formdata: forms
            }).then(res=>{
                //  _czc.push(["_trackEvent","智能抠图","本地上传","","","add"]);
                if(res.data.status==0){
                    if(res.data.result.res){
                        if(e.target.files.length>1){
                            this.showJump = true;
                            this.err = '不能上传多个图片';
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = '';
                            },1500);
                        }else{
                            let files = e.target.files[0];
                            this.url = files;
                            if(files.type=='image/jpeg'||files.type=='image/png'){
                                if (!e || !window.FileReader) return; // 看支持不支持FileReader
                                let reader = new FileReader();
                                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                                reader.onloadend = function(){
                                    let formData = new FormData();
                                    formData.append('file',self.url);
                                    let obj = {
                                        url: self.all.baseUrl + '/file/uploadOss',
                                        formdata: formData
                                    }
                                    self.getData(obj).then(res=>{
                                        window.location.href = 'https://www.zhidaoai.com/aiselect/bsl_kt.html?imgURL='+res.data.result+'&userId='+localStorage.getItem('userId')+'&token='+localStorage.getItem('token')+'&web=1';
                                        localStorage.setItem('web',1);
                                    });
                                }
                            }else{
                                this.showJump = true;
                                this.err = '不支持的图片格式';
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                },1500);
                            }
                        }
                    }else{
                        this.showLook = true;
                    }
                }
            });
        },
        changeEnglish(e){
            this.$router.go(0);
        },
        closeModel(){
            this.showModel = false;
            this.all.newTime = false;
        },
        chooseFile(){
            this.$refs.ossBtn.chooseFile(this.$refs.file)
        },
        setImgPath(imgPath){
            this.imgPath = imgPath;
            localStorage.setItem('ktImgPath',imgPath)
            this.$router.push({
                path: '/cutout'
            })
        }
    },
    mounted(){
        // this.$nextTick(function() {
        //     this.drawPie('canBox')
        // });
        let createTime = JSON.parse(localStorage.getItem('user')).createTime;
        if(date.getTime()<createTime+1*60*60*1000){
            this.all.newTime = true;
        }
        if(this.all.newTime){
            this.showModel = false;
        }
        localStorage.setItem('path','/Cut');
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Encut'
            });
        }else{
            this.$router.push({
                path: '/Cut'
            });
        }
    }
}
</script>
<style scoped>
    .cut{
        min-height: 100vh;
        width: 100%;
        background: #eee;
    }
    .content{
        width: 1016px;
        margin: 0 auto 7.5rem;
        overflow: hidden;
    }
    .clear{
        clear: both;
    }
    .imgBox{
        padding-top: 7.25rem;
        position: relative;
        float: left;
    }
    .bigImage{
        width: 542px;
        height: auto;
        display: block;
    }
    .upBox{
        float: left;
        margin-left: 50px;
        padding-top: 9.75rem;
    }
    .content h4{
        font-size: 48px;
        color: #333;
        text-align: left;
        font-weight: 600;
        line-height: 48px;
    }
    .content h4 span{
        margin-top: 13px;
        display: block;
        font-weight: normal;
    }
    .fileBox{
        margin-top: 43px;
        position: relative;
    }
    .fileBox input{
        position: absolute;
        width: 180px;
        height: 48px;
        top: 0;
        left: calc(50% - 90px);
        opacity: 0;
    }
    .localBtn{
        width: 180px;
        height: 48px;
        line-height: 48px;
        outline: none;
        border: none;
        background: #133ffc;
        color: #f3f8fb;
        font-size: 18px;
        text-align: center;
        display: block;
        margin: 0 auto;
        border-radius: 24px;
    }
    .content p{
        text-align: left;
        font-size: 14px;
        color: #666;
    }
    .content p.mine{
        margin-top: 21px;
    }
    .cutBox{
        margin-top: 7.5625rem;
    }
    .cutBox>img{
        width: 1016px;
        height: auto;
    }
    .cutBox h6{
        font-weight: normal;
        font-size: 24px;
        color: #333;
    }
    .saveBox{
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
        -webkit-justify-content: center;
        justify-content: center;
        -moz-box-pack: center;
        -webkit--moz-box-pack: center;
        box-pack: center;
    }
    .saveBox p{
        overflow: hidden;
        margin: 0 15px;
        margin-top: 10px;
    }
    .saveBox p span{
        display: inline-block;
        vertical-align: middle;
    }
    .saveBox p img{
        display: inline-block;
        vertical-align: middle;
        margin-left: 8px;
    }
    /* 引导页 */
    .model{
        position: fixed;
        z-index: 99999;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.6);
    }
    .click{
        width: 21.875rem;
        position: absolute;
        top: 4rem;
        left: 63rem;
    }
    .know{
        position: absolute;
        width: 9.125rem;
        height: 5rem;
        left: calc(50% - 4.5625rem);
        top: calc(50vh - 2.5rem);
    }
    .bigSpan{
        position: absolute;
        height: 2.5rem;
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
        -webkit-justify-content: center;
        justify-content: center;
        -moz-box-pack: center;
        -webkit--moz-box-pack: center;
        box-pack: center;
        width: 8rem;
        color: rgba(0,0,0,0.6);
        border-radius: 1.25rem;
        top: .85rem;
        left: 76.5rem;
        box-sizing: border-box;
        background: rgba(255,255,255);
        font-size: 1.5rem;
    }
    @media screen and (max-width: 1400px){
        .bigSpan{
            left: 74.5rem;
        }
        .click{
            left: 60.5rem;
        }
    }
    /* 弹窗 */
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
        height: 12rem;
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
        height: auto;
        display: block;
    }
    .grabBox span{
        display: block;
        padding: 0 .625rem;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox .grabWay{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
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