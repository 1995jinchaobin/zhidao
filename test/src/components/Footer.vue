<template>
    <div>
        <div class="footer">
            <div class="footBox">
                <div class="topBox">
                    <div class="topTitle">
                        <span>上织道云<br/>花型设计从未如此简单</span>
                        <span>精心挑选花型设计资源，来激发你的创造性。</span>
                    </div>
                    <!-- <img class="footerlogo" src="../assets/image/cut/icon_logo.png" alt=""> -->
                    <ul class="topBody">
                        <li @click="btnClick($event,item.name)" v-for="(item,index) in arr" :key="index" @mouseenter="hover(index)" @mouseleave="leave">
                            <div v-if="index == 0&&item.show" style='left:-52px' class="codeBox">
                                <img src="../assets/image/cut/qccode.png" alt="">
                            </div>
                            <div v-if="index==2&&item.show" style="left:103px" class="codeBox">
                                <img src="../assets/image/cut/ercode.png" alt="">
                            </div>
                            <p><img alt="" class="listImg" :src="item.select"></p>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                    <img src="../assets/kf.png" class="topBtn">
                </div>
                <div class="typeList">
                    <ul v-for="(items,index) in typeList" :key="index">
                        <li class="typeTitle" >{{items.name}}</li>
                        <li @click="linkJump(item.link,item.url,item.name)" class="typeItem" v-for="(item,key) in items.list" :key="key">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="msg">
            <span>Copyright ©2019 浙江有柴科技有限公司</span>
            <span>织道云设计平台</span>
            <span>浙ICP备16033954</span>
        </div>
    </div>
</template>
<script>
import QRcode from 'qrcodejs2';
export default {
    name: "Footer",
    components: {
        
    },
    data(){
        return {
            arr: [{show: false,name: '微信公众号',select: require('../assets/image/cut/wechat_select.png'),selected: require('../assets/image/cut/wechat_selected.png')},
                {show: false,name: 'PC客户端',select: require('../assets/image/cut/pc_select.png'),selected: require('../assets/image/cut/pc_selected.png')},
                {show: false,name: 'APP下载',select: require('../assets/image/cut/phone_select.png'),selected: require('../assets/image/cut/phone_selected.png')}],
            typeList:[
                {name:'开始设计',list:[{name:'分色神器',link:'/Paging',url:''},{name:'花型设计',link:'/Flowerdesign',url:''},{name:'AI设计',link:'/AI',url:''},{name:'花型商城',link:'/Shopping',url:''}]},
                {name:'更多',list:[{name:'新手指南',link:'/New',url:''},{name:'设计师招募',link:'/maker',url:''},{name:'智能抠图',link:'/Cut',url:''}]},
                {name:'关于织道',list:[{name:'关于我们',link:'',url:'http://www.youchaikj.com/present.html'},{name:'企业文化',link:'',url:'http://www.youchaikj.com/culture.html'},{name:'联系我们',link:'',url:'http://www.youchaikj.com/contact.html'}]}
            ]
        }
    },
    methods: {
        linkJump(link,url,name){
            if(link != ''){
                this.$router.push({
                    path:link
                })
            }else if(url){
                var aBox = document.createElement('a');
                aBox.target = '_blank';
                aBox.href = url;
                aBox.click();
            }else{
                
            }
        },
        hover(index){
            this.arr.map(function(item){
                item.show = false;
            });
            this.arr[index].show = true;
            this.$forceUpdate();
        },
        leave(){
            this.arr.map(function(item){
                item.show = false;
            });
            this.$forceUpdate();
        },
        btnClick(e,text){
            if(text == 'PC客户端'){
                var aBox = document.createElement('a');
                aBox.target = '_blank';
                aBox.href = 'http://www.youchaikj.com/product.html';
                aBox.click();
            }
            if(text == "版权信息"){
                this.$router.push({
                    path: "Banquan"
                });
            }
        }
    },
    mounted(){
        if(localStorage.getItem('English')){
            this.arr = [{show: false,name: 'PC',select: require('../assets/image/cut/pc_select.png'),selected: require('../assets/image/cut/pc_selected.png')},{show: false,name: 'Browser Scan Download APP',select: require('../assets/image/cut/phone_select.png'),selected: require('../assets/image/cut/phone_selected.png')},{show: false,name: 'Wechat Public Number',select: require('../assets/image/cut/wechat_select.png'),selected: require('../assets/image/cut/wechat_selected.png')}];
        }else{
            this.arr = [
                {show: false,name: '微信公众号',select: require('../assets/wx.png'),selected: require('../assets/image/cut/wechat_selected.png')},
                {show: false,name: 'PC客户端',select: require('../assets/pc.png'),selected: require('../assets/image/cut/pc_selected.png')},
                {show: false,name: 'APP下载',select: require('../assets/phone.png'),selected: require('../assets/image/cut/phone_selected.png')}
            ];
        }
    }
}
</script>
<style scoped>
    .footer{
        width: 100%;
        background: #222;
        height: 338px;
        /* margin-top: 7.5rem; */
        display: flex;
        justify-content: space-evenly;
    }
    .topBox{
        margin-top: 48.6px;
    }
    .topBox .topTitle{
        width: 279px;
        text-align: left;
    }
    .topTitle>span:first-child{
        display: inline-block;
        width: 279px;
        height: 72px;
        font-size: 20px;
        color: #FFFFFF;
        text-align: left;
        margin-bottom: 8.4px;
        line-height: 36px;
    }
    .topTitle>span:last-child{
        font-size: 12px;
        color: #52595B;
    }
    .topBox .topBody{
        width: 209px;
        height: 60px;
        display: flex;
        font-size: 12px;
        color: #AFB7BD;
        margin-top: 41px;
        justify-content: space-between;
        align-items: center;
    }
    .topBody{
        position: relative;
    }
    .topTitle{
        font-weight: bold;
    }
    .topBody .codeBox{
        position: absolute;
        top: -173px;
    }
    .topBox .topBtn{
        display: block;
        width: 128px;
        height: 36px;
        margin: 31px 0 36px;
    }
    .typeList{
        display: flex;
        font-size: 12px;
        color: #AFB7BD;
    }
    .typeList ul{
        text-align: left;
        width: 72px;
        margin-top: 50.6px;
    }
    .typeList ul li:first-child{
        font-weight: bold;
    }
    .typeList ul+ul{
        margin-left: 217px;
    }
    .typeList ul li.typeTitle:hover{
        cursor:default;
    }
    .typeList ul li:hover{
        cursor: pointer;
    }
    ul .typeTitle{
        font-size: 14px;
        color: #FFFFFF;
        margin-bottom: 27.4px;
    }
    ul .typeItem{
        margin-bottom: 20px;
    }
    .msg{
        min-width: 1200px;
        height: 126px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .msg span{
        font-size: 16px;
        color: #171A1E;
    }
    .msg span:nth-child(2){
        font-size: 36px;
        color: #333333;
        position: relative;
        left: -30px;
    }
    .footBox{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    /* .footerlogo{
        float: left;
        width: 142px;
        height: 81px;
        margin-top: 45px;
    }
    ul.downList{
        float: right;
        color: #aaa;
        font-size: 14px;
    }
    ul.downList li{
        padding-top: 60px;
        float: left;
        width: 160px;
        position: relative;
    }
    ul.downList li p{
        height: 50px;
        margin-bottom: 10px;
    }
    .listImg{
        display: block;
        margin: 0 auto;
    }
    .codeBox,.qrcodeBox{
        position: absolute;
        width: 160px;
        height: 166px;
        top: -130px;
        left: 0;
    }
    #qrcode{
        width: 160px;
        height: 160px;
        display: block;
    }
    .codeBox img{
        width: 160px;
        height: 166px;
        display: block;
    }
    .clear{
        clear: both;
    } */
    .copyRight{
        width: 100%;
        background: #333;
        height: 62px;
        line-height: 62px;
        color: #aaa;
        font-size: 14px;
        text-align: left;
    }
    .copyRight span{
        display: block;
        width: 1200px;
        margin: 0 auto;
    }
    @media screen and (max-width: 1300px){
        .topBox,.copyRight span{
            width: 75rem;
        }
    }
    .topBtn,.topBody li{
        cursor: pointer;
    }
    .topBody li:first-child>p>img{
        width: 22px;
        height: 17.9px;
    }
    .topBody li:nth-child(2)>p>img{
        width: 17.7px;
        height: 17.7px;
    }
    .topBody li:last-child>p>img{
        width: 16.5px;
        height: 22px;
    }
    .listImg{
        margin-bottom: 3.5px;
    }
</style>