<template>
    <div class="picture">
        <Tab :path="path" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <!--左侧图片-->
            <div class="leftPicture">
                <img src="../../assets/image/searchPicturePC/leftPicture.png"/>
            </div>
            <!--右侧内容-->
            <div class="rightContent">
                <div class="title">以图识图</div>
                <div class="detail">花型面料产品种类多样，通常在“万”的量级，很难记清楚公司图库内每一个面料情况，织道以图搜图以深度学习和机器视觉技术为核心，结合不同业务场景，
                </div>
                <div class="detail detailNext">帮助用户在自建图库中实现相同或相似图片搜索的以图搜图服务</div>
                <div class="goods">
                    <div class="goodDetail">
                        <img src="../../assets/image/searchPicturePC/Path.png"/>
                        <div class="detailText">上传图片即可识别</div>
                    </div>
                    <div class="goodDetail">
                        <img src="../../assets/image/searchPicturePC/Path.png"/>
                        <div class="detailText">闪电速度，节省您查找时间</div>
                    </div>
                    <div class="goodDetail">
                        <img src="../../assets/image/searchPicturePC/Path.png"/>
                        <div class="detailText">精准识别您上传的图片</div>
                    </div>
                </div>
                <!--按钮-->
                <div class="startBtn" @click="goToPicture">
                    <div>开始识图</div>
                    <img src="../../assets/image/searchPicturePC/btnLogo.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tab from '@/components/Tab';
    export default {
        name: "PictureHome",
        components:{
            Tab
        },
        data(){
            return{
                path:'/picture',
                tabIndex:2
            }
        },
        methods:{
            goToPicture(){
                this.$router.push('/Knowledge')
            }
        }
    }
</script>

<style scoped>
    .picture{
        width: 100vw;
        /*height: 100vh;*/
        min-width: 1200px;
    }
    .content{
        width: 1200px;
        display: flex;
        /*justify-content:center;*/
        align-items:center;
        margin: 0 auto;
    }
    .leftPicture{
        width: 743px;
        height: 565px;
        /*left: 360px;*/
        margin-top: 159px;
        position: relative;
    }
    .leftPicture img{
        width: 100%;
        height: 100%;
    }
    .rightContent{
        marign-top: 159px;
        width: 457px;
        text-align: left;
        position: relative;
    }
    .title{
        font-family: PingFangSC-Medium;
        font-size: 50px;
    }
    .detail{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        margin-top: 25px;
    }
    .detailNext{
        margin-top: 0px;
    }
    .goods{
        margin-top: 54px;
    }
    .goodDetail{
        display: flex;
        margin-bottom: 17.5px;
    }
    .detailText{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
    }
    .goodDetail img{
        width: 19px;
        height: 19px;
        margin-right: 10px;
    }
    .startBtn{
        width: 205.5px;
        height: 62px;
        margin-top: 72.5px;
        border-radius: 100px;
        background-color: #ffe300;
        font-size: 18px;
        color: #333333;
        font-family: PingFangSC-Medium;
        display: flex;
        justify-content:center;
        align-items:center;
        cursor: pointer;
    }
    .startBtn img{
        width: 22px;
        height: 22px;
        margin-left: 8px;
        align-items:center;
    }


</style>