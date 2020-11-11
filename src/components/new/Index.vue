<template>
    <!-- 新手教程 -->
    <div class="new">
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <ul class="seleBox" :style="{height: height}">
                <li @click="toChange(index)" v-for="(item,index) in arr" :key="index" :style="{color: item.show?'#FAD100':'#8d8d8d'}">{{item.name}}<span v-if="item.show"></span></li>
            </ul>
            <div class="look">
                <div class="model" @click="toPlay" v-if="showVideo">
                    <img src="../../assets/image/play.png" alt="">
                </div>
                <video v-else controls :src="link" :autoplay="auto"></video>
            </div>
        </div>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
export default {
    name: "New",
    components: {
        Tab
    },
    data(){
        return {
            path: '/New',
            type: this.$route.query.type,
            tabIndex: 8,
            // 遮罩
            showVideo: true,
            // 是否自动播放
            auto: false,
            // 左边导航栏高度
            height: '',
            // 播放的链接
            link: 'https://youchaizhidao.oss-cn-hangzhou.aliyuncs.com/koutu.mp4',
            // 列表
            arr: []
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        jieshou(){
            // console.log(this.type);
            let self=this;
            if(self.type==0){
                self.toChange(this.type);console.log('zzz');
            }
            else if(self.type==1){ self.toChange(self.type);}
            else if(self.type==2){ self.toChange(self.type);}
            else if(self.type==3){ self.toChange(self.type);}
            else{}
        },
        // 左侧切换 该页面不能点击
        toChange(index){
            this.showVideo = false;
            this.link = this.arr[index].src;
            this.auto = true;
            this.arr.map(function(item){
                item.show = false;
            });
            this.arr[index].show = true;
        },
        toPlay(){
            this.showVideo = false;
            this.link = this.arr[0].src;
            this.auto = true;
        },
        // 获取高度
        getHeight(){
            this.height = document.offsetHeight-74 + 'px';
        },
        getMessage(){
            let self = this;
            let formData = new FormData();
            formData.append('id',18);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                let result = JSON.parse(res.data.result.json1).videoList;
                result.map(function(item){
                    item.show = item.isActive;
                    item.src = item.videoUrl
                });                                                                                                                                                                                                                          
                self.arr = result;
                self.jieshou();
                self.$forceUpdate();
            });

        }
    },
    mounted(){
        this.getHeight();
        this.getMessage();
        
        // localStorage.setItem('path',this.path);
        // if(localStorage.getItem('English')){
        //     this.$router.push({
        //         path: '/Ennew'
        //     });
        // }else{
        //     this.$router.push({
        //         path: '/New'
        //     });
        // }
    },
    beforeDestroy(){
        this.auto = false;
    }
}
</script>
<style scoped>
    .new{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: flex-start;
    }
    ul.seleBox{
        width: 10rem;
        min-height: calc(100vh - 4.625rem);
        background: #fff;
        color: #8d8d8d;
        font-size: 1.125rem;
        box-sizing: border-box;
        padding-top: .625rem
    }
    ul.seleBox>li{
        height: 2.375rem;
        line-height: 2.375rem;
        position: relative;
        cursor: pointer;
    }
    ul.seleBox span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #FAD100;
        width: .25rem;
    }
    .look{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-top: 4.375rem;
        margin-left: 6.375rem;
    }
    .look video{
        display: block;
        width: 85rem;
        height: 45.9375rem;
    }
    .model{
        width: 85rem;
        height: 45.9375rem;
        background: #a9a9a9;
        position: relative;
    }
    .model img{
        width: 6rem;
        height: 6rem;
        position: absolute;
        top: calc(50% - 3rem);
        left: calc(50% - 3rem);
    }
</style>