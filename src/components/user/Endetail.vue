<template>
    <div class="detail">
        <!-- 我的花型详情页 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="imgBox">
                <div class="backBox">
                    <img src="../../assets/image/shopping/backicon.png" alt="">
                    <span @click="backClick">Back</span>
                </div>
                <div class="bigImage">
                    <img :src="bindImg+'?x-oss-process=image/resize,l_400'" alt="">
                </div>
            </div>
            <div class="product">
                <ul class="proList">
                    <li class="name" v-if="type==1">{{message.name}}</li>
                    <li>Number：{{message.id}}</li>
                    <li v-if="type==0">Format：{{message.format}}</li>
                    <li v-if="type==1">Format：png</li>
                    <li v-if="type==0">Size：{{message.sizeWidth}}cm*{{message.sizeHeight}}cm</li>
                    <li v-if="type==1">Size：{{message.sizeWidth}}px*{{message.sizeHeight}}px</li>
                    <li>Resolving power：{{message.resolutionRatio}}dpi</li>
                    <li v-if="type==0" class="specialBox">
                        <button @click="download" class="btn">Downoad</button>
                        <button @click="del" class="btn">Detele</button>
                    </li>
                    <li v-if="type==1" class="specialBox">
                        <button @click="downpsd" class="btn">Download PSD</button>
                        <button @click="download" class="btn">Downoad</button>
                    </li>
                </ul>
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
    name: 'Endetail',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Endetail',
            showJump: false,
            err: '',
            tabIndex: null,
            showLoading: false,
            bindImg: '',
            message: {},
            type: ''
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 返回
        backClick(){
            this.$router.push({
                path: '/Enflower'
            });
        },
        download(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('id',this.message.id);
            setTimeout(function(){
                self.showLoading = false;
            },5000);
            window.location.href = this.all.baseUrl+'/file/flower?id='+this.message.id;
            // let obj = {
            //     url: this.all.baseUrl + '/app3dFlowerTypeJyg/hd',
            //     formdata: formData
            // }
            // this.getData(obj).then(res=>{
            //     setTimeout(function(){
            //         self.showLoading = false;
            //     },1000);
            //     if(res.data.status==0){
            //         window.location.href=this.all.baseUrl+"/file/download?url="+res.data.result;
            //     }else if(res.data.result==-95){
            //         this.showJump = true;
            //         this.err = 'Your account has landed elsewhere';
            //         setTimeout(function(){
            //             self.showJump = false;
            //             self.err = '';
            //             localStorage.clear();
            //             self.$router.push({
            //                 path: '/Login'
            //             });
            //         },1500);
            //     }else{
            //         this.showJump = true;
            //         this.err = res.data.msg;
            //         setTimeout(function(){
            //             self.showJump = false;
            //             self.err = '';
            //         },1500);
            //     }
            // });
            // window.location.href=this.all.baseUrl+"/file/download?url="+this.bindImg;
        },
        downpsd(){
            window.location.href=this.all.baseUrl+"/file/download?url="+this.message.sourceFile;
        },
        del(){
            let self = this;
            let formData = new FormData();
            let obj = {};
            if(this.type==0){
                formData.append('id',this.message.id);
                formData.append('cartStatus',0);
                formData.append('myStatus',0);
                obj.url = self.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/update';
                obj.formdata = formData;
                self.getData(obj).then(res=>{
                    if(res.data.status==0){
                        self.err = 'Successful deletion';
                        self.showJump = true;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            self.$router.push({
                                path: '/Enflower'
                            });
                        },1500);
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        self.err = '';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = 'Your account has landed elsewhere';
                            localStorage.clear();
                            Scroll.move();
                            self.$router.push({
                                path: '/Login'
                            });
                        });
                    }else{
                        self.showJump = true;
                        self.err = res.data.msg;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            Scroll.move();
                        });
                    }
                });
            }
        },
        getPromessage(){
            this.type = localStorage.getItem('detailType');
            if(this.type==0){
                this.message = JSON.parse(localStorage.getItem('detailList')).app3dFlowerTypeJygModel;
                this.bindImg = JSON.parse(localStorage.getItem('detailList')).app3dFlowerTypeJygModel.preview;
            }else if(this.type==1){
                this.message = JSON.parse(localStorage.getItem('detailList')).indentSubsidiaryModels[0];
                this.bindImg = JSON.parse(localStorage.getItem('detailList')).indentSubsidiaryModels[0].picture1;
            }
        }
    },
    mounted(){
        this.getPromessage();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Endetail'
            });
        }else{
            this.$router.push({
                path: '/Detail'
            });
        }
    }
}
</script>
<style scoped>
    .detail{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: flex-start;
        margin-top: 2.8125rem;
        padding: 0 12.3125rem;
    }
    .imgBox{
        display: flex;
        flex-direction: column;
    }
    .backBox{
        display: flex;
        color: #585858;
        font-size: 1rem;
        align-items: center;
        cursor: default;
    }
    .backBox img{
        width: 0.625rem;
        height: 1rem;
        display: block;
        margin-right: .3125rem;
    }
    .bigImage{
        width: 32.8125rem;
        height: 48.75rem;
        display: block;
        margin-top: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
    }
    .bigImage img{
        display: block;
        max-width: 32.8125rem;
        max-height: 48.75rem;
        width: 100%;
    }
    .product{
        margin-top: 1.25rem;
        display: flex;
        margin-left: 6.25rem;
        justify-content: flex-start;
    }
    .proList{
        text-align: left;
        margin-top: 12.5rem;
        font-size: 1.25rem;
    }
    .proList li{
        margin-bottom: .625rem;
    }
    .proList li.specialBox{
        margin-top: 1.5rem;
    }
    .btn{
        width: 7.5rem;
        height: 2.5rem;
        text-align: center;
        border: none;
        outline: none;
        border-radius: 1.25rem;
        background: #133ffc;
        color: #fff;
        font-size: 1rem;
        margin-right: .5rem;
    }
    .proList li.name{
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>