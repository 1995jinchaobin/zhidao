<template>
    <div class="Jump">
        <!-- 弹窗组件 -->
        <span><img class="jumpImg" :src="urlChange ? url : errurl"><p>{{title}}</p></span>
    </div>
</template>
<script>
export default {
    name: 'Jump',
    props: {
        title: String,
        urlChange: Boolean
    },
    data(){
        return {
            errurl:require('../../assets/image/user/noPrev.png'),
            url:require('../../assets/image/user/noNext.png')
        }
    },
    methods: {

    },
    mounted(){
        // console.log(this.urlChange)
    }
}
</script>
<style scoped>
    .Jump{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        bottom: 0;
        overflow: hidden;
        z-index: 9999999;
    }
    .Jump span{
        width: 21.187rem;
        height: 8.323rem;
        display: flex;
        margin: 0 auto;
        margin-top: calc(50vh - 3rem);
        background: #fff;
        line-height: 8.323rem;
        font-size: 14px;
        align-items: center;
        justify-content: center;
    }
    .Jump span img{
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
</style>