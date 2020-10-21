<template>
    <div class="searchPictureHome" :style="{height:mainMenuList.length>0?'auto':'calc(100vh)'}">
        <!-- <Tab :path="path" :tabindex="TabIndex"></Tab> -->
        <!--头部-->
        <div class="header" id="header" :style="{height:searchNum>0?'auto':'calc(100%)'}">
            <img class="headerImg" v-if="searchNum>0" src="../../assets/image/searchPicturePC/homeBg.png"/>
            <img class="headerImg" v-else style="height: 100%" src="../../assets/image/searchPicturePC/homeBgNoData.png"/>
            <div class="op" :style="{height: searchNum>0?'600px':'100%'}"></div>
            <img class="logo" @click="toSelect" src="../../assets/image/searchPicturePC/logop.png"/>
            <!--顶部个人信息-->
            <div class="userInfo">{{userName}}，您好</div>
            <!--花型管理按钮-->
            <div class="headerBtn" @click="goToManage">花型管理</div>
            <!--标题-->
            <div class="headerTitle" v-if="!isStartUpload">以图识图</div>
            <!--搜索-->
            <div class="searchAreaBg" v-if="!isStartUpload">
                <div class="searchArea">
                    <div class="input" ></div>
                    <div class="uploadBtn">本地上传</div>
                    <input type="file"  class="fileInput" ref="file" id="file" placeholder=""  @change="chooseFile" accept="image/*"/>
                </div>
            </div>
            <OSSUploadNoBtn2 type="4" ref="ossBtn" :size="2" @setImgPath="setImgPath" @setIsStartUpload="setIsStartUpload"></OSSUploadNoBtn2>
            <!--搜索中-->
            <div class="searchLodingBg" v-if="isStartUpload">
                <div class="searchLoding">
                    正在识别中，请稍后
                </div>
                <img class="closeBtn" src="../../assets/image/searchPicturePC/close.png"/>
            </div>
        </div>
        <div class="searchImg" v-if="uploadResult.path!=''&&searchNum>0">
            <img :src="uploadResult.path">
        </div>
        <div class="content" v-if="mainMenuList.length > 0" :style="{marginTop:mainMenuList.length>0?'120px':'0px'}">
            <div class="sameTip">相似图片</div>
            <div class="box">
                <div  class="col" ref="col1" >
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.ProductId" @click.stop="clickCount(item)"  v-if="(index+1)%4==1">
                        <img :src="item.CustomContent" @click="handleView(item)" />
                        <div class="imgName" :title="item.PicName">{{item.PicName}}</div>
                    </div>
                </div>
                <div  class="col" ref="col1">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.ProductId" @click.stop="clickCount(item)"  v-if="(index+1)%4==2">
                        <img :src="item.CustomContent" @click="handleView(item)" />
                        <div class="imgName" :title="item.PicName">{{item.PicName}}</div>
                    </div>
                </div>
                <div  class="col" ref="col1">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.ProductId" @click.stop="clickCount(item)" v-if="(index+1)%4==3">
                        <img :src="item.CustomContent" @click="handleView(item)" />
                        <div class="imgName" :title="item.PicName">{{item.PicName}}</div>
                    </div>
                </div>
                <div  class="col" ref="col1" style="margin-right: 0px">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.ProductId" @click.stop="clickCount(item)" v-if="(index+1)%4==0">
                        <img :src="item.CustomContent" @click="handleView(item)" />
                        <div class="imgName" :title="item.PicName">{{item.PicName}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-if="mainMenuList.length <= 0&&searchNum>0" style="margin-bottom: 60px;">暂无数据</div>
        <div style="display: none" ref="images"><img ref="image" :src="imgSrc" :alt="imgName"></div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <Loading v-if="showLoading"></Loading>
        <a v-if="mainMenuList.length > 0&&searchNum>0" href="#header" class="el-backtop" style="right: 40px; bottom: 40px;"><i class="el-icon-caret-top"></i></a>
    </div>
</template>

<script>
    import Tab from '../../components/Tab';
    import InfoBox from '../../components/common/InfoBox';
    import Loading from '../../components/Loading';
    import OSSUploadNoBtn2 from '../../components/common/OSSUploadNoBtn2';
    import Scroll from '../../assets/js/scroll.js';
    import Viewer from 'viewerjs'
    import 'viewerjs/dist/viewer.css'
    import { isNull } from 'util';
    export default {
        name: "SearchPictureHome",
        components:{
            InfoBox,
            Loading,
            OSSUploadNoBtn2,
            Scroll,
            Tab
        },
        data(){
            return {
                path:'/Knowledge/Pc',
                TabIndex: 98,
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                mainMenuList: [],
                dataList1: [],
                dataList2: [],
                dataList3: [],
                dataList4: [],
                page:1,
                pageSize:8,
                total:0,
                name:'',
                headerBg:require('../../assets/image/searchPicturePC/homeBg.png'),
                showLoading:false,
                userName:'',
                //图片上传结果
                uploadResult:{
                    path:''
                },
                //是否开始上传图片
                isStartUpload:false,
                // 控制滚动加载
                mineFlag: false,
                imgSrc:'',
                file:null,
                imgName:'',
                searchNum:0
            }
        },
        methods:{
            toSelect(){
                this.$router.push({
                    path:'/Select'
                })
            },
            getList(){
                let self = this;
                self.showLoading=true;
                let formData = new FormData();
                formData.append('page',self.page);
                formData.append('pageSize',self.pageSize);
                formData.append('url',self.uploadResult.path);
                let obj = {}
                obj.formdata = formData;
                obj.url = self.all.baseUrl + '/new/userPicSearch/search';
                self.getData(obj).then(res => {
                    self.showLoading=false;
                    self.searchNum+=1;
                    if(res.data.status==0){
                        self.mineFlag = true;
                        if(res.data.result!=null) {
                            // self.mainMenuList = res.data.result.data;
                            for(var i=0;i<res.data.result.data.length;i++){
                                self.mainMenuList.push(res.data.result.data[i])
                            }
                            self.total = res.data.result.pageInfo.DocsFound
                            this.$forceUpdate();
                        }
                        if(self.mainMenuList.length>0){
                            // self.mountMenu();
                        }
                    }else if(res.data.status == -95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Knowledge/Pc/piclogin'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = -1;
                            self.errMsg = '';
                        },2000);
                    }
                });
            },
            mountMenu(arg) {
                var temp = this.mainMenuList
                var index = arg || 0
                var refName = this.selectCol()
                if (temp.length > index) {
                    this[refName].push(this.mainMenuList[index])
                    this.$nextTick(() => {
                        this.mountMenu(index + 1)
                    })
                }
            },
            selectCol() {
                let _this = this;
                var getHeight = (ref) => {
                    return _this.$refs[ref].offsetHeight
                }
                var height1 = getHeight('col1')
                var height2 = getHeight('col2')
                var height3 = getHeight('col3')
                var height4 = getHeight('col4')
                switch (Math.min(height1, height2, height3, height4)) {
                    case height1:
                        return 'dataList1'
                        break
                    case height2:
                        return 'dataList2'
                        break
                    case height3:
                        return 'dataList3'
                    case height4:
                        return 'dataList4'
                        break
                }
            },
            goToManage(){
                this.$router.push({
                    path: '/Knowledge/Pc/addpicture'
                });
            },

            chooseFile(){
                this.isStartUpload=true;
                this.$refs.ossBtn.chooseFile(this.$refs.file)
            },
            setImgPath(result){
                this.isStartUpload=false;
                this.uploadResult = result;
                this.mainMenuList=[];
                this.dataList1=[];
                this.dataList2=[];
                this.dataList3=[];
                this.dataList4=[];
                this.page=1;
                this.getList();
            },
            setIsStartUpload(result){
                this.isStartUpload = result;
            },
            clickCount(item){
                let self = this;
                let formData = new FormData();
                formData.append('search_img_url',self.uploadResult.path);
                formData.append('result_img_url',item.CustomContent);
                formData.append('product_id',item.ProductId);
                let obj = {}
                obj.formdata = formData;
                obj.url = self.all.baseUrl + '/new/userPicSearch/addClick';
                self.getData(obj).then(res => {

                });
            },
            loadData() {
                window.onscroll = () => {
                    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    let bottomOfWindow = document.documentElement.offsetHeight - scrollTop - window.innerHeight < 50;
                    if (bottomOfWindow && this.mineFlag) {
                        this.mineFlag = false;
                        if(this.page+1<=this.total/this.pageSize){
                            this.page+=1;
                            this.getList();
                        }
                    }
                }
            },
            handleView (item) {
                this.imgName=item.PicName
                this.imgSrc = item.CustomContent
                const viewer = new Viewer(this.$refs.images, {
                    url: 'data-original',
                    hidden: () => {
                        viewer.destroy()
                    },
                    title:true,
                    navbar: false,
                    toolbar: false
                })
                // 模拟点击事件
                this.$refs.image.click();
            }
        },
        mounted(){
            // this.getList();
            if(localStorage.getItem('user') != null){
                this.userName=(localStorage.getItem('nickname')==undefined||localStorage.getItem('nickname')==''||localStorage.getItem('nickname')==null)
                    ?(JSON.parse(localStorage.getItem('user')).loginName==undefined||JSON.parse(localStorage.getItem('user')).loginName==''||JSON.parse(localStorage.getItem('user')).loginName==null)
                        ?JSON.parse(localStorage.getItem('user')).phone:JSON.parse(localStorage.getItem('user')).loginName:localStorage.getItem('nickname');
            }else{
                this.$router.push({
                    path:'/Knowledge/Pc/piclogin'
                })
            }
            this.loadData();
            this.searchNum=0;
        },
        computed: {
            isIe() {
                var tmp = window.navigator.userAgent.indexOf("MSIE") >= 1
                    || !!window.ActiveXObject
                    || "ActiveXObject" in window
                return tmp ? "" : "list"
            }
        }
    }
</script>

<style scoped>
    .searchPictureHome{
        min-width: 1200px;
        width: 100vw;
        background-color: #fff;
    }
    .header{
        width: 100%;
        height: 600px;
        position: relative;
        text-align: center;
        overflow: hidden;
    }
    .header img{
        width: 1920px;
        height: 600px;
    }
    .userInfo{
        position: absolute;
        top: 21px;
        right: 113px;
        display: flex;
        align-items: right;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #FFFFFF;
    }
    .headerBtn{
        width: 89px;
        height: 29px;
        border: 1px solid #FFFFFF;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        position: absolute;
        top: 58px;
        right: 113px;
        border-radius: 4px;
        text-align: center;
        line-height: 29px;
        cursor: pointer;
    }

    .headerTitle{
        position: absolute;
        top: 17rem;
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #FFFFFF;
    }
    .searchAreaBg{
        width: 100%;
        height: 83px;
        position: absolute;
        top: 23.38rem;
        text-align: center;
    }
    .searchArea{
        width: 978px;
        height: 81px;
        margin: 0 auto;
        background: #FFFFFF;
        border: 1px solid #FFFFFF;
        display: flex;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        cursor: pointer;
    }
    .input{
        width: 759px;
        height: 100%;
    }
    .leftInput{
        width: 100%;
        height: 100%;
        border: none;
        outline:none;
        text-indent: 2em;
        font-size: 18px;
    }
    .fileInput{
        position: absolute;
        width: 979px;
        height: 83px;
        top: 0;
        left: calc(50% - 490px);
        opacity: 0;
    }
    .uploadBtn{
        color: #FFFFFF;
        width: 221px;
        height: 83px;
        background: #3A8BFB;
        margin-top: -1px;
        margin-right: -1px;
        line-height: 83px;
        text-align: center;
        cursor: pointer;
    }
    .content{
        width: 100%;
        margin-top: 120px;
        /*float: left;*/
        min-width: 1200px;
    }
    .box{
        margin: 0 auto;
        width: 1184px;
    }
    .col{
        float: left;
        width: 275px;
        margin-right: 28px;
    }
    img{
        width: 100%;
        height: auto;
    }
    .item{
        margin-bottom: 42px;
        width: 275px;
    }
    .itemLast{
        margin-right: 0px!important;
    }
    .searchLodingBg{
        width: 100%;
        height: 163px;
        position: absolute;
        top: 17rem;
        text-align: center;
    }
    .searchLoding{
        width: 978px;
        height: 163px;
        line-height: 163px;
        margin: 0 auto;
        background: rgba(32,31,31,0.41);
        border: 1px solid #FFFFFF;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #fff;
    }
    .closeBtn{
        width: 18px !important;
        height: 18px !important;
        position: absolute;
        top: 23px;
        left: calc(50% + 444px);
    }
    .searchImg{
        width: 178px !important;
        height: 178px !important;
        position: absolute;
        left: 103px;
        top:487px;
    }
    .searchImg img{
        width: 100%;
        height: 100%;
    }
    .sameTip{
        margin-top: 47px;
        text-align: left;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        text-indent: 102px;
        margin-bottom: 80px;
    }
    .op{
        width: 1920px;
        height: 600px;
        opacity: 0.38;
        background: #000000;
        position: absolute;
        top: 0px;
    }
    .logo{
        left: 103px;
        top: 32px;
        position: absolute;
        width: 85px !important;
        height: auto !important;
        cursor: pointer;
    }
    .el-backtop{
        position: fixed;
        background-color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #409eff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        cursor: pointer;
        z-index: 5;
    }
    .imgName{
        width: 100%;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    }
</style>