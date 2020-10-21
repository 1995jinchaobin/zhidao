<template>
    <div>
        <div v-show="pageType==1" class="reservation">
            <div class="reservationContent">
                <!--头部图片-->
                <img class="headerImg" src="../../assets/image/home/reservationBg.png">
                <div class="content">
                    <div class="tips">
                        织道云分色预约演示
                    </div>
                    <div class="tipsContent">织道云分色各种花型设计等业务场景，已向数千家企业输出实践方案，我们很乐意与您所在的企业分享智能分色，并提供免费演示方案。咨询热线：0575-89985016/13429536658</div>
                    <div class="form">
                        <div>
                            <div class="formSpan">你的名字 <div> *</div></div>
                            <div class="formTips">希望我们如何称呼您？</div>
                            <div class="input">
                                <input @blur="checkName" v-model="form.name"/>
                                <img class="inputLogo" src="../../assets/image/home/nameImg.png"/>
                            </div>
                            <div class="inline-error" v-show="nameFalse"><img src="../../assets/image/home/errorImg.png"/> 请填写此项</div>
                            <div class="inline-error" v-show="!nameFalse" style="color: #fff">  </div>
                        </div>
                        <div>
                            <div class="formSpan">手机 <div> *</div></div>
                            <div class="formTips">顾问将于 1-2 个工作日内致电您。</div>
                            <div class="input">
                                <input @blur="checkPhone"  v-model="form.phone"/>
                                <img class="inputLogo" src="../../assets/image/home/phoneImg.png"/>
                            </div>
                            <div class="inline-error" v-show="phoneFalse"><img src="../../assets/image/home/errorImg.png"/> {{phoneError}}</div>
                            <div class="inline-error" v-show="!phoneFalse" style="color: #fff">  </div>
                        </div>
                        <div>
                            <div class="formSpan">企业名称 <div> *</div></div>
                            <div class="formTips">提前了解您的业务特征，更好为您准备。</div>
                            <div class="input companyInput">
                                <input @blur="checkCompany"  v-model="form.company"/>
                            </div>
                            <div class="inline-error company" v-show="companyFalse"><img src="../../assets/image/home/errorImg.png"/> 请填写此项</div>
                            <div class="inline-error company" v-show="!companyFalse" style="color: #fff">  </div>
                        </div>
                        <div>
                            <div class="formSpan">咨询问题</div>
                            <div class="formTips">提问示例：价格方案、解决方案、上门演示</div>
                            <div class="inputTextarea">
                                <textarea v-model="form.question"></textarea>
                            </div>
                        </div>
                        <div class="submitArea">
                            <input type="submit" name="commit" value="现在提交" class="submit" @click="submit">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="pageType==2" class="reservationResult">
            <div class="result">
                <img :src="result==1?imgSuccess:imgFail" />
                <div class="resultText" :style="{marginBottom:result==1?'6px':'16px'}">{{result==1?'织道云预约演示':'提交失败'}}</div>
                <div class="resultText">{{result==1?'预约成功':''}}</div>
                <div class="errorTip" v-if="result==2">请核对并修改以下信息后，再重新提交。</div>
                <div class="backBtn" v-if="result==2" @click="back">返回修改</div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>

<script>
    import Scroll from '@/assets/js/scroll.js';
    import Loading from '@/components/Loading';
    import Jump from '../../components/Jump';
    export default {
        path:'/reservation',
        name: "Reservation",
        components:{
            Loading,
            Jump
        },
        data:function(){
            return {
                form:{
                    name:'',
                    phone:'',
                    company:'',
                    question:''
                },
                //名字是否未填
                nameFalse:false,
                phoneFalse:false,
                phoneError:'',
                companyFalse:false,
                showLoading:false,
                //页面类型。1：填表，2：显示结果
                pageType:2,
                //提交结果，1：成功，2：失败
                result:2,
                imgFail:require('../../assets/image/home/fail.png'),
                imgSuccess:require('../../assets/image/home/success.png')
            }
        },
        methods:{
            checkName(){
                if(this.form.name==''){
                    this.nameFalse=true;
                }else{
                    this.nameFalse=false;
                }
            },
            checkPhone(){
                if(this.form.phone==''){
                    this.phoneFalse=true;
                    this.phoneError='请填写此项'
                }else if(!Scroll.isPoneAvailable(this.form.phone)){
                    this.phoneFalse=true;
                    this.phoneError='请填写正确的手机号码'
                }else{
                    this.phoneFalse=false;
                }
            },
            checkCompany(){
                if(this.form.company==''){
                    this.companyFalse=true;
                }else{
                    this.companyFalse=false;
                }
            },
            submit(){
                this.checkName();
                this.checkPhone();
                this.checkCompany();
                if(!this.nameFalse&&!this.phoneError&&!this.companyFalse){
                    let self = this;
                    self.showLoading = true;
                    //请求接口
                    let formData = new FormData();
                    formData.append('name',self.form.name)
                    formData.append('phone',self.form.phone)
                    formData.append('company',self.form.company)
                    formData.append('question',self.form.question)
                    let obj = {
                        url: self.all.baseUrl + '/new/subscribe/addSubscribe',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        self.showLoading = false;
                        if(res.data.status==0){
                            //成功
                            self.pageType=2;
                            self.result=1;
                            setTimeout(function(){
                                self.pageType=1;
                                self.$router.push({
                                    path: '/select'
                                });
                            },5000);
                        } else{
                            self.pageType=2;
                            self.result=2;
                        }
                    });
                }
            },
            back(){
                this.pageType=1;
                this.result=1;
            }
        },
        mounted(){
            this.pageType=1;
            this.result=1;
        }
    }
</script>

<style scoped>
    .reservation{
        width: 100%;
        background: linear-gradient(top ,#ffffff,#F0EFFF);
        padding-bottom: 30px;
        font-size: 14px;
    }
    .reservationContent{
        width: 700px;
        margin: 0 auto;
        margin-top: 40px;
        background-color: #fff;
    }
    .headerImg{
        width: 100%;
        height: auto;
    }
    .tips{
        font-size: 20px;
        padding: 25px 30px 10px;
    }
    .tipsContent{
        font-size: 14px;
        width: 640px;
        text-align: left;
        margin: 0 30px;
    }
    .form{
        margin: 23px auto 0;
        width: 640px;
        text-align: left;
        font-size: 14px;

    }
    .content{
        box-shadow: 0 3px 5px rgba(0,0,0,0.15);
        width: 700px;
    }
    .formSpan{
        display: flex;
        align-items: center;
        color: rgb(34, 34, 34);
        font-weight: bold;
    }
    .formSpan div{
        color: red;
        display: flex;
        align-items: center;
    }
    .formTips{
        color: #545454;
        line-height: 1.5;
        color: #545454;
        margin-bottom: 6px;
    }
    .input{
        width: 260px;
    }
    .inputTextarea{
        width: 100%;
    }
    .input input{
        width: 260px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        padding-left: 22px;
        height: 32px;
        line-height: 32px;
        vertical-align: top;
        padding: 0 6px;
        padding-left: 25px;
        font-size: 1em;
        font-weight: normal;
        color:#333;
        background:#fff;
        background-color: rgb(255, 255, 255);
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        -webkit-tap-highlight-color: transparent;
    }
    .companyInput input{
        padding-left: 6px !important;
    }
    .inline-error{
        color: #ff2851;
        margin-top: -8px;
        margin-bottom: 4px;
        height: 22px !important;
        line-height: 22px !important;
        display: flex;
        align-items: center;
    }
    .inline-error img{
        margin-right: 5px;
        width: 14px;
    }
    .company,.question{
        margin-top: 10px;
    }
    .inputLogo{
        width: 16px;
        z-index: 1;
        color:#848484;
        position: relative;
        left: 5px;
        font-size: 14px;
        line-height: 14px;
        top: -26px;
    }
    .inputTextarea textarea{
        box-sizing: border-box;
        color: #999;
        opacity: 1;
        overflow: hidden;
        overflow-wrap: break-word;
        height: 75px;
        width: 100%;
        resize: none;
        background-color: rgba(255,255,255,0.65);
        min-height: 32px;
        line-height: 150%;
        padding: 5px 6px;
        font-weight: normal;
        color: #333;
        background:  #fff;
        background-color: rgb(255, 255, 255);
        border: 1px solid #dfdfdf;
        border-color: rgb(223, 223, 223);
        border-radius: 2px;
    }
    .inputTextarea textarea:focus,.input input:focus{
        border-color: #2875e8;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
        box-shadow: inset 0 1px 1px
        rgba(0,0,0,0.05);
    }
    .submit{
        border: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: rgb(28, 180, 202);
        font-size: 1.000em;
        color: rgb(255, 255, 255);
        border-width: 0;
        border-color: rgb(255, 255, 255);
        box-shadow: 0 0 1px rgba(0,0,0,0.2);
        display: inline-block;
        line-height: 2.3;
        height: auto;
        margin-left: 0;
        padding: 0 55px;
        opacity: 0.9;
        -webkit-appearance: button;
        cursor: pointer;
        margin: 33px auto 30px;
        border-radius: 2px;
    }
    .submitArea{
        width: 100%;
        text-align: center;
    }
    .result img{
        margin-top: 222px;
        margin-bottom: 17px;
    }
    .resultText{
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: rgba(0,0,0,0.85);
    }
    .errorTip{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.45);
    }
    .backBtn{
        background: #FFE300;
        border-radius: 4px;
        width: 88px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        line-height: 32px;
        text-align: center;
        margin: 38px auto 0;
        cursor: pointer;
    }








</style>