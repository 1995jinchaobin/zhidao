<template>
    <div class="addPicture">
        <!--头部-->
        <div class="header">
            <img src="../../assets/image/searchPicturePC/addHeaderBg.png"/>
            <!--顶部个人信息-->
            <div class="userInfo">{{userName}}，您好</div>
            <!-- 查询历史页面 -->
            <div class="headerBtn flowerBth" @click="goToHistory">查询历史</div>
            <div class="bindBtn headerBtn" @click="showBindBox=true">绑定子账号</div>
            <!--花型管理按钮-->
            <div class="headerBtn" @click="goToList">返回识图</div>
            <!--上传按钮-->
            <div class="uploadBtnArea">
                <div class="searchArea">
                    <div class="searchBg" v-if="!isStartUpload">
                        <input v-model="name" class="searchInput" placeholder="请输入图片名"  @keyup.enter="searchList"/>
                        <img class="searchBtn" src="../../assets/image/searchPicturePC/searchBtn.png" @click="searchList"/>
                    </div>
                    <div class="uploadBtn"  v-if="!isStartUpload">上传花型</div>
                    <input class="fileInput" type="file"  ref="file" id="file" placeholder="" @change="chooseFile" accept="image/*" multiple="multiple"/>
                    <OSSUploadNoBtn2 @setSuccessNum="setSuccessNum" @setTotalNum="setTotalNum" type="3" ref="ossBtn" :size="2" @setImgPath="setImgPath" @setIsStartUpload="setIsStartUpload"></OSSUploadNoBtn2>
                </div>
            </div>
            <!--提示-->
            <div class="tips" v-if="!isStartUpload">
                <div class="tipsContent">
                    <div class="tip">您已上传{{uploadTotal}}个花型</div>
                    <div class="loginOut" @click="loginOut">退出登录</div>
                </div>
            </div>
            <!--搜索中-->
            <div class="searchLodingBg" v-if="isStartUpload">
                <div class="searchLoding">
                    正在上传中，请稍后  {{succNum}}/{{totalNum}}
                </div>
                <img class="closeBtn" src="../../assets/image/searchPicturePC/close.png"/>
            </div>
        </div>
        <div class="content">
            <div class="box">
                <div  class="col" ref="col1">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.id"  v-if="(index+1)%4==1" @mouseover="showDetailId=item.id" @mouseleave="showDetailId=-1">
                        <img :src="item.custom_content"  @click="handleView(item)"/>
                        <div class="imgName" :title="item.pic_name">{{item.pic_name}}</div>
                        <div class="deleteArea" v-show="item.id==showDetailId" @click="deleteP(item)">删除</div>
                    </div>
                </div>
                <div  class="col" ref="col1">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.id"  v-if="(index+1)%4==2" @mouseover="showDetailId=item.id" @mouseleave="showDetailId=-1">
                        <img :src="item.custom_content"  @click="handleView(item)"/>
                        <div class="imgName" :title="item.pic_name">{{item.pic_name}}</div>
                        <div class="deleteArea" v-show="item.id==showDetailId" @click="deleteP(item)">删除</div>
                    </div>
                </div>
                <div  class="col" ref="col1">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.id"  v-if="(index+1)%4==3" @mouseover="showDetailId=item.id" @mouseleave="showDetailId=-1">
                        <img :src="item.custom_content"  @click="handleView(item)"/>
                        <div class="imgName" :title="item.pic_name">{{item.pic_name}}</div>
                        <div class="deleteArea" v-show="item.id==showDetailId" @click="deleteP(item)">删除</div>
                    </div>
                </div>
                <div  class="col" ref="col1"  style="margin-right: 0px">
                    <div :class="{item:true,itemLast:(index+1)%4==0}" v-for="(item,index) in mainMenuList" :key="item.id"  v-if="(index+1)%4==0" @mouseover="showDetailId=item.id" @mouseleave="showDetailId=-1">
                        <img :src="item.custom_content"  @click="handleView(item)"/>
                        <div class="imgName" :title="item.pic_name">{{item.pic_name}}</div>
                        <div class="deleteArea" v-show="item.id==showDetailId" @click="deleteP(item)">删除</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageBox">
            <el-pagination
                    background
                    layout="prev, pager, next,sizes, jumper"
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[8, 16, 32, 48]"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @current-change = "currentChange"
                    @size-change = "sizeChange"
            >
            </el-pagination>
        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <div style="display: none" ref="images"><img ref="image" :src="imgSrc" :alt="imgName"></div>
        <el-dialog
                title="绑定子账号"
                :visible.sync="showBindBox" >
            <BindAccount></BindAccount>
        </el-dialog>
    </div>
</template>

<script>
    import OSSUploadNoBtn2 from '../../components/common/OSSUploadNoBtnMuti';
    import InfoBox from '../../components/common/InfoBox';
    import BindAccount from '../../components/searchPicturePC/BindAccount';
    import Viewer from 'viewerjs'
    import 'viewerjs/dist/viewer.css'
    export default {
        name: "KnowledgePcAddPicture",
        data(){
            return{
                uploadResult:{},
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                page:1,
                pageSize:8,
                total:0,
                name:'',
                mainMenuList: [],
                dataList1: [],
                dataList2: [],
                dataList3: [],
                dataList4: [],
                isStartUpload:false,
                showDetailId:-1,
                userName:'',
                succNum:0,
                totalNum:0,
                imgName:'',
                imgSrc:'',
                uploadTotal:0,
                //是否显示绑定子账号窗口
                showBindBox:false
            }
        },
        components:{
            OSSUploadNoBtn2,
            InfoBox,
            BindAccount
        },
        methods:{
            setTotalNum(num){
                this.totalNum = num;
            },
            setSuccessNum(num){
                this.succNum = num;
            },
            chooseFile(){
                this.$refs.ossBtn.chooseFile(this.$refs.file)
                this.isStartUpload=true;
            },
            setImgPath(result){
                console.log(result)
                this.isStartUpload=false;
                this.page=1;
                this.getList();
                this.$refs.file.value = '';
            },
            upload(file){
                // console.log('=============')
                // console.log(file)
                let self = this;
                let formData = new FormData();
                formData.append('name',file.fileName);
                formData.append('url',file.path);
                let obj = {}
                obj.formdata = formData;
                obj.url = self.all.baseUrl + '/new/userPicSearch/upload';
                self.getData(obj).then(res => {
                });
            },
            goToHistory(){
                this.$router.push({
                    path: '/Knowledge/Pc/History'
                })
            },
            getList(){
                let self = this;
                let formData = new FormData();
                formData.append('page',self.page);
                formData.append('pageSize',self.pageSize);
                formData.append('name',self.name);
                let obj = {}
                obj.formdata = formData;
                obj.url = self.all.baseUrl + '/new/userPicSearch/list';
                self.getData(obj).then(res => {
                    if(res.data.status==0){
                        self.dataList1=[];
                        self.dataList2=[];
                        self.dataList3=[];
                        self.dataList4=[];
                        self.mainMenuList = res.data.result.list
                        self.total=res.data.result.total;
                        if(self.name==''){
                            self.uploadTotal=res.data.result.total
                        }
                        //self.mountMenu()
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
                var getHeight = (ref) => {
                    return this.$refs[ref].offsetHeight
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
            prevClick(){
                if(this.page==1){
                    self.showInfo = 1;
                    self.errMsg =  '已经是第一页了';
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                    },2000);
                }
                self.dataList1=[];
                self.dataList2=[];
                self.dataList3=[];
                self.dataList4=[];
                this.page-=1;
                this.getList();
            },
            nextClick(){
                if(this.page==this.total){
                    this.showInfo = 1;
                    this.errMsg =  '已经是最后一页了';
                    setTimeout(function(){
                        this.showInfo = -1;
                        this.errMsg = '';
                    },2000);
                }
                this.page+=1;
                this.getList();
            },
            currentChange(page){
                this.page=page;
                this.getList();
            },
            sizeChange(pageSize){
                this.pageSize=pageSize;
                this.getList();
            },
            setIsStartUpload(){
                this.isStartUpload=false;
            },
            loginOut(){
                localStorage.clear();
                localStorage.setItem('userId',0);
                this.$router.push({
                    path: "/Knowledge/Pc/piclogin"
                });
                this.$forceUpdate();
            },
            deleteP(item){
                this.$confirm('确认删除该图片吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let self = this;
                    let formData = new FormData();
                    formData.append('id',item.id);
                    let obj = {}
                    obj.formdata = formData;
                    obj.url = self.all.baseUrl + '/new/userPicSearch/delete';
                    self.getData(obj).then(res => {
                        if(res.data.status==0){
                            self.showInfo = 0;
                            self.succMsg = res.data.msg;
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.succMsg = '';
                                if(self.total%self.pageSize==1){
                                    self.page-=1;
                                }
                                self.getList();
                            },2000);
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
                }).catch(() => {
                });
            },
            goToList(){
                this.$router.push({
                    path: '/Knowledge/Pc/'
                });
            },
            handleView (item) {
                this.imgName=item.pic_name
                this.imgSrc = item.custom_content
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
            },
            searchList(){
                this.page=1;
                this.getList();
            }
        },
        mounted(){
            this.getList();
            if(localStorage.getItem('user') != null){
                this.userName=(localStorage.getItem('nickname')==undefined||localStorage.getItem('nickname')==''||localStorage.getItem('nickname')==null)
                    ?(JSON.parse(localStorage.getItem('user')).loginName==undefined||JSON.parse(localStorage.getItem('user')).loginName==''||JSON.parse(localStorage.getItem('user')).loginName==null)
                        ?JSON.parse(localStorage.getItem('user')).phone:JSON.parse(localStorage.getItem('user')).loginName:localStorage.getItem('nickname');
            }
        }
    }
</script>

<style scoped>
    .addPicture{
        min-width: 1200px;
        width: 100vw;
        background-color: #fff;
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
    .header{
        width: 100%;
        height: auto;
        position: relative;
        text-align: center;
    }
    .header img{
        width: 100%;
    }
    .uploadBtnArea{
        position: absolute;
        top: 12rem;
        width: 100%;
        text-align: center;
    }
    .uploadBtn{
        width: 221px;
        height: 55px;
        background-color: #3f8ff7;
        color: #fff;
        line-height: 55px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        margin: 0 auto;
        cursor: pointer;
    }
    .tips{
        width: 100%;
        position: absolute;
        top: 17.25rem;
        text-align: center;
    }
    .tipsContent{
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .tip{
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #FFFFFF;
        position: relative;
        left: -12px;
    }
    .loginOut{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #1890FF;
        position: relative;
        left: 12px;
        cursor: pointer;
    }
    .fileInput{
        position: absolute;
        width: 221px;
        height: 55px;
        top: 0;
        left: calc(50% + 268px);
        opacity: 0;
        cursor: pointer;
    }
    .content{
        width: 100%;
        margin-top: 57px;
        float: left;
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
        position: relative;
    }
    .itemLast{
        margin-right: 0px!important;
    }
    .pageBox{
        width: 100%;
        margin-top: 42px;
        float: left;
    }
    .searchLodingBg{
        width: 100%;
        height: 163px;
        position: absolute;
        top: 10rem;
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
        height: 18px;
        position: absolute;
        top: 23px;
        left: calc(50% + 444px);
    }
    .deleteArea{
        height: 62px;
        line-height: 62px;
        width: 100%;
        color: #fff;
        opacity: 0.65;
        background: #000000;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        position: absolute;
        bottom: 23px;
        transition: all 0.5s;
        cursor: pointer;
    }
    .searchArea{
        width: 980px;
        height: 100%;
        margin: 0 auto;
        display: flex;
    }
    .searchBg{
        width: 759px;
        height: 100%;
        background: #fff;
        display: flex;
        /*justify-content:center;!*x轴对齐方式*!*/
        align-items:center;     /*y轴对滴方式*/
    }
    .searchInput{
        width: 90%;
        height: 55px;
        border: none;
        outline:none;
        text-indent: 2em;
        font-size: 16px;
    }
    .searchBtn{
        width: 30px !important;
        height: 30px !important;
        cursor: pointer;
    }
    .bindBtn{
        right: 210px;
    }
    .imgName{
        width: 100%;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    }
    .flowerBth{
        right: 306px !important;
    }
</style>