<template>
    <div class="cut">
        <Entab :path='path' @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="imgBox">
                <img class="bigImage" src="http://youchaikj.com/pc-img/cut_back.gif" alt="">
            </div>
            <div class="upBox">
                <h4>Intelligent buckle in 3 seconds<span>Free online matting</span></h4>
                <div class="fileBox">
                    <!-- <input accept="image/*" multiple type="file" @change="add"/>
                    <button class="localBtn">Local upload</button> -->
                    <button class="localBtn" style="background-color:gray;">In iteration</button>
                </div>
                <p class="mine">Friendship Tip: After clicking on the deducted picture, download it and save it to my material</p>
                <p>Upload material as far as possible in 10MB, otherwise it will be very stuck.</p>
            </div>
            <div class="clear"></div>
            <div class="cutBox">
                <h6>A few strokes will cut out the material you want</h6>
                <div class="saveBox">
                    <p><span>Use green markers to keep</span><img src="../../assets/image/cut/icon_add.png" alt=""></p>
                    <p><span>To delete, use green markers</span><img src="../../assets/image/cut/icon_delete.png" alt=""></p>
                </div>
                <img class="image" src="http://youchaikj.com/pc-img/cut_bigback.gif" alt="">
            </div>
        </div>
        <div class="bigModel" v-if="showLook">
            <div class="grabBox">
                <h3>Tigs</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>Today's number of times has been exhausted, VIP unlimited use, whether to go to recharge VIP</span>
                <div class="grabWay">
                    <button @click="delLook">Cancel</button>
                    <button @click="wayClick">Determine</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Footer from '../../components/Footer';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: "Encut",
    components: {
        Entab,
        Jump,
        Loading,
        Footer
    },
    data(){
        return {
            showJump: false,
            err: '',
            showLoading: false,
            tabIndex: 1,
            url: '',
            path: '/Encut',
            showLook: false
        }
    },
    methods: {
        // 前往vip页面充值
        wayClick(){
            this.$router.push({
                path: '/Envip'
            });
        },
        // 关闭
        delLook(){
            this.showLook = false;
        },
        add(e){
            let self = this;
             let forms = new FormData();
            forms.append('opName','kt');
            this.getData({
                url: this.all.baseUrl+'/usageRestriction/canUse',
                formdata: forms
            }).then(res=>{
                // _czc.push(["_trackEvent","智能抠图","本地上传","","","add"]);
                if(res.data.status==0){
                    if(res.data.result.res){
                        if(e.target.files.length>1){
                            this.showJump = true;
                            this.err = "Can't upload more than one picture";
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
                                this.err = 'Unsupported image formats';
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
        }
    },
    mounted(){
        localStorage.setItem('path','/Encut');
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
        padding-bottom: 1.25rem;
    }
    .content{
        width: 1016px;
        margin: 0 auto;
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
        padding-top: 9rem;
        width: 424px;
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
        display: block;
        height: auto;
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