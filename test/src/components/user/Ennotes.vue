<template>
    <div class="notes">
        <!-- 推广信息 -->
        <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <span class="line"></span>
        <div class="content">
            <h2>Promotion of information</h2>
            <ul class="navList">
                <li v-for="(item,index) in arr" :key="index">{{item}}</li>
            </ul>
            <ul v-if="list.length" class="proList">
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.userPhone}}</span>
                    <span>{{item.royaltyMoney}}</span>
                    <span>{{item.payMoney}}</span>
                </li>
            </ul>
            <div class="nodataBox" v-if="!list.length">
                <img src="../../assets/image/user/Emoji.png" alt="">
                <span>No promotional data yet</span>
            </div>
        </div>
        <ul class="pageBox" v-if="list.length">
            <li @click="prev" class="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
            <li @click="next" class="next"><img src="../../assets/image/cut/right.png" alt=""></li>
        </ul>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '@/components/Entab';
import Jump from '@/components/Jump';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
export default {
    name: 'Ennotes',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            showJump: false,
            err: '',
            height: '',
            tabIndex: null,
            showLoading: false,
            path: '/Ennotes',
            arr: ['Cell-phone number','Payment amount','Amount payable'],
            list: [],
            cnt: 1,
            pageNumber: ''
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        getList(){
            let formData = new FormData();
            let self = this;
            this.showLoading = true;
            formData.append('page',this.cnt);
            formData.append('pageSize',15);
            let obj = {
                url: this.all.baseUrl + '/userExtensionRoyalty/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    this.pageNumber = res.data.result.pages;
                    this.list = res.data.result.list;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 上一页
        prev(){
            let self = this;
            if(this.cnt>1){
                this.cnt--;
                this.getList();
            }else{
                this.showJump = true;
                this.err = "It's the first page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.cnt<this.pageNumber){
                this.cnt++;
                this.getList();
            }else{
                this.showJump = true;
                this.err = "It's the last page";
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }
        },
    },
    mounted(){
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Ennotes'
            });
        }else{
            this.$router.push({
                path: '/Notes'
            });
        }
        this.getList();
    }
}
</script>
<style scoped>
    .notes{
        min-height: 100vh;
        background: #eee;
        position: relative;
    }
    .line{
        display: block;
        width: 100%;
        height: .125rem;
        background: #d6d7de;
    }
    .content{
        width: 75rem;
        background: #fff;
        padding: 0 2.5625rem;
        box-sizing: border-box;
        margin: 0 auto;
        min-height: calc(100vh - 4.75rem);
    }
    .content h2{
        font-weight: normal;
        font-size: 1.875rem;
        color: #333;
        text-align: left;
        padding-top: 2.625rem;
        margin-bottom: 1.4375rem;
    }
    ul.navList{
        display: flex;
        background: #eee;
        align-items: center;
        color: #333;
        height: 4.375rem;
        justify-content: space-between;
        font-size: 1.25rem;
        padding: 0 1.5rem;
        font-weight: normal;
        border-radius: .3125rem;
        box-sizing: border-box;
    }
    ul.navList li{
        width: 9.375rem;
        overflow: hidden;
    }
    ul.navList li:first-child{
        text-align: left;
    }
    ul.proList{
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        font-size: 1.125rem;
        color: #333;
    }
    ul.proList li{
        height: 3.5rem;
        display: flex;
        border-bottom: 1px solid #eee;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        font-weight: normal;
    }
    ul.proList li span{
        display: block;
        width: 9.375rem;
        text-align: center;
    }
    ul.proList li span:first-child{
        text-align: left;
    }
    .nodataBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: #333;
    }
    .nodataBox img{
        display: block;
        margin-top: 6.25rem;
        margin-bottom: 1.25rem;
    }
    .pageBox{
        position: absolute;
        width: 100%;
        bottom: 1.25rem;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pageBox li{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #fff;
        display: flex;
        margin: 0 1.25rem;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 2px #ddd,
                    -2px -2px 2px #ddd;
    }
    .pageBox li img{
        display: block;
        width: .5rem;
        height: .9375rem;
    }
</style>