<template>
    <div class="detail">
        <!-- 我的花型详情页 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="imgBox">
                <div class="backBox">
                    <img src="../../assets/image/shopping/backicon.png" alt="">
                    <span @click="backClick">返回</span>
                </div>
                <div class="bigImage">
                    <img :src="bindImg+'?x-oss-process=image/resize,l_400'" alt="">
                </div>
            </div>
            <div class="product">
                <ul class="proList">
                    <li class="name" v-if="type==3">{{info.name}}</li>
                    <li>编号：{{info.id}}</li>
                    <li v-if="type!=3">格式：{{info.format}}</li>
                    <li v-if="type==3">格式：png</li>
                    <li v-if="type!=3">尺寸：{{info.size_width}}cm*{{info.size_height}}cm</li>
                    <li v-if="type==3">尺寸：{{info.size_width}}px*{{info.size_height}}px</li>
                    <li>分辨率：{{info.resolution_ratio}}dpi</li>
                    <li v-if="type!=3" class="specialBox">
                        <button @click="download" class="btn">下载原图</button>
                        <button @click="del" class="btn">删除</button>
                    </li>
                    <li v-if="type==3" class="specialBox">
                        <button @click="downpsd" class="btn">下载PSD</button>
                        <!--<button @click="download" class="btn">下载原图</button>-->
                    </li>
                </ul>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Detail',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Detail',
            showJump: false,
            err: '',
            tabIndex: null,
            showLoading: false,
            bindImg: '',
            message: {},
            type: '',
            info: {}
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 返回
        backClick(){
            this.$router.push({
                path: '/User/'
            });
        },
        download(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('id',this.info.id);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeJyg/hd',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },5000);
                if(res.data.status==0){
                    // window.location.href=this.all.baseUrl+"/file/download?url="+res.data.result;
                    setTimeout(function(){
                        self.showLoading = false;
                    },5000);
                    window.location.href = this.all.baseUrl+'/file/flower?id='+this.info.id;
                }else if(res.data.result==-95){
                    this.showJump = true;
                    this.err = '您的账号已在其它地方登陆';
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                    },1500);
                }
            });
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
            //         this.err = '您的账号已在其它地方登陆';
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
        },
        downpsd(){
            window.location.href=this.all.baseUrl+"/file/download?url="+this.info.source_file;
        },
        del(){
            let self = this;
            let formData = new FormData();
            let obj = {};
            if(this.type!=3){
                formData.append('ids',this.message.id);
                obj.url = self.all.baseUrl + '/new/userFlowers/delUserFlowerByIds';
                obj.formdata = formData;
                self.getData(obj).then(res=>{
                    if(res.data.status==0){
                        self.err = '删除成功';
                        self.showJump = true;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            self.$router.push({
                                path: '/User'
                            });
                        },1500);
                    }else if(res.data.status==-95){
                        self.showJump = true;
                        self.err = '';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '您的账号已在其它地方登陆';
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
            this.type = JSON.parse(localStorage.getItem('detailList')).type
            this.message = JSON.parse(localStorage.getItem('detailList'));
            //如果是商城花型
            if(this.type==3){
                this.info = JSON.parse(localStorage.getItem('detailList')).storeIndentSubsidiary;
                this.bindImg = JSON.parse(localStorage.getItem('detailList')).storeIndentSubsidiary.picture1;
            }else{
                this.info = JSON.parse(localStorage.getItem('detailList')).flowerType;
                this.bindImg = JSON.parse(localStorage.getItem('detailList')).flowerType.preview;
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
        justify-content: start;
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
        line-height: 2.5rem;
        text-align: center;
        border: none;
        outline: none;
        border-radius: 1.25rem;
        background: #133ffc;
        color: #fff;
        font-size: 1.25rem;
        margin-right: .5rem;
    }
    .proList li.name{
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>