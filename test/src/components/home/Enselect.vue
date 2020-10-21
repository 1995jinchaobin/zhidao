<template>
    <div class="enselect">
        <div class="logoBox">
            <img class="logo" src="../../assets/logo.png" alt="织道">
            <div class="exitBox" @click="exit">
                <span>Log out</span>
            </div>
        </div>
        <div class="selectBox">
            <div class="user">
                <div class="userImage">
                    <img src="../../assets/image/selectone.png" alt="">
                    <input @click="select(0)" :checked="users[0]" name="select" type="radio">
                    <span></span>
                </div>
                <h2>User Channel</h2>
                <ul>
                    <li v-for="item in user" :key="item">{{item}}</li>
                </ul>
            </div>
            <div class="design">
                <div class="userImage">
                    <img src="../../assets/image/selecttwo.png" alt="">
                    <input @click="select(1)" :checked="users[1]" name="select" type="radio">
                    <span></span>
                </div>
                <h2>Designer Channel</h2>
                <ul>
                    <li v-for="item in design" :key="item">{{item}}</li>
                </ul>
            </div>
        </div>
        <div @click="entry" class="enter">Enter</div>
        <div class="model" v-if="tigShow">
            <div class="bigBox">
                <img src="../../assets/image/login/error.png" alt="">
                <p>{{tig}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Enselect',
    data(){
        return {
            user: ["Intelligent matting","Pattern Intelligent Design","3D Display","Original Flower Mall"],
            design: ["Register as a Designer","Open Studios","Publishing elements","Publish original pattern"],
            tigShow: false,
            tig: "",
            users: [true,false],
            index: 0
        }
    },
    methods: {
        // 退出登陆按钮
        exit(){
            localStorage.clear();
            let self = this;
            self.$router.push({
                path: '/Login'
            });
        },
        select(index){
            this.index = index;
        },
        entry(){
            if(this.index==0){
                this.$router.push({
                    path: '/Encut'
                });
            }else{
                // let self = this;
                // this.tigShow = true;
                // this.tig = 'Not open yet';
                // setTimeout(function(){
                //     self.tigShow = false;
                //     self.tig = '';
                // },1000);
                this.$router.push({
				    path: '/EnStudio'
				});
            }
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
    .enselect{
        width: 100%;
        min-height: 100vh;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 1.25rem;
    }
    .logoBox{
        position: absolute;
        top: 0;
        z-index: 99;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .logo{
        float: left;
        width: 6.875rem;
        margin: .625rem 0 0 2.5rem;
    }
    .exitBox{
        float: right;
        text-align: right;
        margin: 1.875rem 3.75rem 0 0;
        font-size: 1.375rem;
        cursor: default;
    }
    /* 两边选择部分 */
    .selectBox{
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .userImage{
        margin: 0 auto;
        margin-top: 7rem;
        width: 31.25rem;
        position: relative;
    }
    .userImage img{
        display: block;
        width: 100%;
    }
    .userImage input{
        position: absolute;
        top: 0;
        z-index: 9;
        width: 105%;
        height: 100%;
        left: 0;
        right: -1.1875rem;
        opacity: 0;
    }
    .userImage span{
        position: absolute;
        z-index: 8;
        border-radius: 50%;
        top: 0;
        right: -1.1875rem;
        width: 1.6875rem;
        height: 1.6875rem;
        background: url('../../assets/image/select.png') no-repeat center;
        background-size: 100%;
    }
    .userImage input:checked + span{
        background: url('../../assets/image/selected.png') no-repeat center;
    }
    .user,.design{
        width: 50%;
    }
    h2{
        padding-top: 3rem;
        font-size: 2.25rem;
        font-weight: normal;
        margin-bottom: 1.3125rem;
    }
    .selectBox li{
        font-size: 1.125rem;
        margin-bottom: .625rem;
    }
    /* 进入样式 */
    .enter{
        display: block;
        margin: 1.6rem auto 0;
        width: 12.5rem;
        height: 3.125rem;
        line-height: 3.125rem;
        color: #fff;
        background: #133ffc;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 1.5625rem;
    }
    .model{
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(187,187,187,0.6);
    }
    .bigBox{
        position: absolute;
        width: 30.25rem;
        height: 3.125rem;
        top: calc(50% - 1.5625rem);
        right: calc(50% - 15.125rem);
        background: #fff;
        border-radius: .3125rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        color: #333;
        z-index: 9999;
    }
    .bigBox img{
        display: block;
        margin-right: .625rem;
    }
</style>