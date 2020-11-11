<template>
    <div class="upfabric">
        <!-- 我的面料 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="fabricBox">
            <div class="topBox">
                <div @click="backClick" class="backBox">
                    <img src="../../assets/image/user/icon_back.png" alt="">
                    <span>Back</span>
                </div>
                <div class="delBox">
                    <div class="hiddenBox" v-if="showDel">
                        <span @click="cancel">Cancel</span>
                        <span @click="sureClick">Determine</span>
                    </div>
                    <img v-else @click="delClick" src="../../assets/image/user/icon_del.png" alt="">
                </div>
            </div>
            <div class="content">
                <ul class="productBox">
                    <li>
                        <div class="notExist">
                            <div class="existImg">
                                <img src="../../assets/image/user/icon_add.png" alt="">
                                <span>Upload Fabric</span>
                            </div>
                            <input class="file" id="uploaderInput" accept="image/*" multiple type="file" @change="add">
                        </div>
                    </li>
                    <li v-for="(item,index) in list" :key="index">
                        <img class="proImg" :src="item.preview" alt="">
                        <input @click="changeSelect(index)" type="checkbox" :checked="item.check">
                        <span v-if="showDel" class="selectBox"></span>
                    </li>
                    <li class="opacLi" :key="'info'+index" v-for="(item,index) in seize" ></li>
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
    name: 'Enupfabric',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Enupfabric',
            tabIndex: null,
            // 提示弹窗
            showJump: false,
            err: '',
            // 数据加载
            showLoading: false,
            // 类别
            list: [],
            // 用来控制样式
            seize: [],
            // 分页
            cnt: 1,
            flag: false,
            // 删除与取消确定的显示控制
            showDel: false,
            // 图片路径
            url: []
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 返回上一步
        backClick(){
            this.$router.push({
                path: '/Enfabric'
            });
        },
        // 上传面料
        add(e){
            this.url = [];
            let self = this;
            let files = e.target.files;
            for(let i=0;i<files.length;i++){
                this.url.push(e.target.files[i]);
            }
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            this.url.map(function(item,index){
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
                        self.upFabric(res.data.result,index);
                    });
                }
            });
        },
        upFabric(str,index){
            let formData = new FormData();
            let self = this;
            formData.append('preview',str);
            formData.append('flowerTyoe',localStorage.getItem('fabricId'));
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUpload/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                self.showLoading = false;
                if(res.data.status == 0){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'New Success';
                    this.list = [];
                    this.cnt = 1;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        if(index==self.url.length-1){
                            self.getMessage();
                        }
                    },1000);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
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
        changeSelect(index){
            this.list[index].check = !this.list[index].check;
        },
        // 点击确定删除
        sureClick(){
            let self = this;
            let id="";
            this.list.map(function(item){
                if(item.check){
                    if(id!=""){
                        id+=",";
                    }
                    id+=item.id;
                }
            });
            if(id==""){
                this.showJump = true;
                this.err = "You haven't made a choice yet";
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    Scroll.move();
                    self.err = '';
                },1000);
            }else{
                let formData = new FormData();
                formData.append('id',id);
                let obj ={
                    url: this.all.baseUrl + '/app3dFlowerMyUpload/delete',
                    formdata: formData
                }
                this.getData(obj).then(res=>{
                    if(res.data.status==0){
                        this.showJump = true;
                        this.err = 'Successful deletion';
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            Scroll.move();
                            self.err = '';
                            self.cnt = 1;
                            self.list = [];
                            self.getMessage();
                        },1000);
                    }else if(res.data.status==-95){
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = 'Your account has landed elsewhere';
                            Scroll.move();
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },1000);
                    }else{
                        this.showJump = true;
                        Scroll.stop();
                        this.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            Scroll.move();
                            self.err = '';
                        },1000);
                    }
                }); 
            }
            
        },
        auto(){
            if((this.list.length+1)%5==2){
                this.seize = [true,true,true];
            }else if((this.list.length+1)%5==3){
                this.seize=[true,true];
            }else if((this.list.length+1)%5==4){
                this.seize=[true];
            }else{
                this.seize = [];
            }
        },
        getMessage(){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('pageSize',14);
            formData.append('page',this.cnt);
            formData.append('flowerTyoe',localStorage.getItem('fabricId'));
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerMyUpload/list',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                if(res.data.status==0){
                    if(res.data.result.hasNextPage){
                        this.flag = true;
                    }
                    let result = res.data.result.list;
                    for(let i=0;i<result.length;i++){
                        this.list.push(result[i]);
                    }
                    this.list.map(function(item){
                        item.check = false;
                    });
                    this.auto();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 滚动加载数据
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 50;
                if(bottomOfWindow && this.flag){
                    this.flag = false;
                    this.cnt+=1;
                    this.getMessage();
                }
            }
        },
        // 点击删除图片
        delClick(){
            this.showDel = true;
        },
        // 点击取消
        cancel(){
            this.showDel = false;
        }
    },
    mounted(){
        this.getMessage();
        this.loadData();
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enupfabric'
            });
        }else{
            this.$router.push({
                path: '/Upfabric'
            });
        }
    }
}
</script>
<style scoped>
    .upfabric{
        min-height: 100vh;
        background: #eee;
        box-sizing: border-box;
    }
    .fabricBox{
        padding: 0 14.375rem;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1.375rem auto 0;
    }
    .backBox{
        display: flex;
        justify-content: flex-start;
        font-size: 1rem;
        color: #585858;
        cursor: default;
    }
    .backBox img{
        width: .625rem;
        height: 1rem;
        display: block;
        margin-right: .5rem;
        margin-top: .125rem;
    }
    .delBox{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .hiddenBox{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .hiddenBox span{
        margin-left: .625rem;
        display: block;
        cursor: default;
    }
    .delBox img{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
    }
    .noData{
        font-size: 1.75rem;
        margin-top: 18rem;
        color: #8d8d8d;
    }
    .productBox{
        overflow: hidden;
        margin: 0 auto;
        margin-top: 1.25rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 1.25rem;
    }
    .productBox li{
        width: 17.5rem;
        height: 25.9375rem;
        background: #fff;
        border-radius: .3125rem;
        margin-bottom: .9375rem;
        position: relative;
        box-sizing: border-box;
        padding: 1.125rem;
        display: flex;
        align-items: center;
        box-shadow: 1px 1px 1px #ddd;
    }
    .productBox li.opacLi{
        opacity: 0;
    }
    .notExist{
        width: 15.3125rem;
        height: 23.75rem;
        border: .0625rem dashed rgba(51, 51, 51, 1);
        position: relative;
    }
    .file{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 99;
    }
    .existImg{
        color: rgba(51, 51, 51, 0.6);
        font-size: 1.125rem;
        top: 8.75rem;
        position: absolute;
        width: 100%;
        z-index: 98;
    }
    .notExist img{
        width: 2.375rem;
        height: 2.375rem;
        display: block;
        margin: 0 auto;
        margin-bottom: .3125rem;
    }
    .proImg{
        display: block;
        width: 15.3125rem;
        max-height: 23.75rem;
    }
    .productBox input[type='checkbox']{
        position: absolute;
        top: 1.4rem;
        right: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
        z-index: 99;
        opacity: 0;
    }
    .selectBox{
        position: absolute;
        width: 1.25rem; 
        z-index: 98;
        top: 1.4rem;
        right: 1.4rem;
        height: 1.25rem;
        background: url('../../assets/image/user/tgb-20px.png') no-repeat center;
        background-size: 100%;
    }
    .productBox input[type='checkbox']:checked + .selectBox{
        position: absolute;
        width: 1.25rem; 
        z-index: 98;
        top: 1.4rem;
        right: 1.4rem;
        height: 1.25rem;
        background: url('../../assets/image/user/tg-20px.png') no-repeat center;
        background-size: 100%;
    }
</style>