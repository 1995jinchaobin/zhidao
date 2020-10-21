<template>
    <div class="ossArea">
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <!--<el-dialog title="收货地址" :visible.sync="dialogTableVisible">-->
            <!--<el-col :span="8" v-for="((item, index) in imgUrlList" :key="index" :offset="index > 0 ? 2 : 0">-->
                <!--<el-card :body-style="{ padding: '0px' }">-->
                    <!--<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                    <!--<div style="padding: 14px;">-->
                        <!--<span>好吃的汉堡</span>-->
                        <!--<div class="bottom clearfix">-->
                            <!--<time class="time">{{ currentDate }}</time>-->
                            <!--<el-button type="text" class="button">操作按钮</el-button>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</el-card>-->
            <!--</el-col>-->
        <!--</el-dialog>-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="20%"
                @closed="sure">
            <div style="text-align: left">上传完成，成功上传{{fileList.length}}张图片，</div>
            <div style="text-align: left">失败{{errorImg.length}}张图片，分别是：</div>
            <div style="height: 150px;overflow-y: scroll;margin-top: 10px;">
                <div v-for="(item,index) in errorImg" :key="index" :title="item.name" style="display: flex;height: 35px;align-items:center;width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"><img style="width: 16px;height: 16px;margin-right: 5px;" src="../../assets/image/searchPicturePC/resultClose.png"/>{{item}}</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import InfoBox from "../../components/common/InfoBox";
    import ProgressBar from "../../components/common/ProgressBar2";
    export default {
        name: "OSSUploadNoBtnMuti",
        components:{
            InfoBox
        },
        //1.分色，2.抠图,3.以图识图,4.临时文件
        props:['type','size'],
        data(){
            return{
                actions:{
                    getFsOssSign:'/new/oss/getOssSignOfFS',
                    getKtOssSign:'/new/oss/getOssSignOfKT',
                    getOssSignOfPicSearch:'/new/oss/getOssSignOfPicSearch',
                    getOssSignOfPicSearchTemp:'/new/oss/getOssSignOfPicSearchTemp'
                },
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                result:{},
                fileEnd:'',
                fileList:[],
                showProgressBar:false,
                hasFinshed:false,
                fileSize:0,
                img:{
                    width:0,
                    height:0
                },
                errorImg:[],
                num:0,
                filesList:[],
                dialogVisible:false,
                imgUrlList:[],
                index:0,
                filePass:[]
            }
        },
        methods:{
            chooseFile(files){
                let self = this;
                self.dialogTableVisible = true
                var types = 'jpg,jpeg,png,JPG,PNG,JPEG'
                if(files.files==null){
                    self.errMsg = '请上传选择要上传的文件';
                    self.showInfo = 1;
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        self.$emit('setIsStartUpload',false);
                    },2000);
                    return;
                }else if(files.files.length>1000){
                    self.errMsg = '一次最多上传1000张图片';
                    self.showInfo = 1;
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        self.$emit('setIsStartUpload',false);
                    },2000);
                    return;
                }
                self.$emit('setTotalNum',files.files.length)
                self.filesList = files.files;
                var num=0
                for(var i =0;i<files.files.length;i++){
                    let file = files.files[i]
                    self.createReader(file, function (w, h, src) {
                        self.img.width=w;
                        self.img.height=h;
                        self.imgUrlList.push(src)
                        if(types.indexOf(file.name.substring(file.name.indexOf('.')+1,file.name.length))<=-1||
                            file.size/1024/1024>self.size||
                            parseInt(self.img.width)<448||
                            parseInt(self.img.width)>1024||
                            parseInt(self.img.height)>1024||
                            parseInt(self.img.height)<448 ){
                            self.errorImg.push(file.name)
                            if((self.filePass.length+self.errorImg.length)==files.files.length &&self.filePass!=undefined&&self.filePass.length!=0){
                                let fileDetail = self.filePass[self.index]
                                self.createReader(fileDetail, function (w, h, src) {
                                    self.img.width=w;
                                    self.img.height=h;
                                    self.imgUrlList.push(src)
                                    var fileEnd = fileDetail.name.substring(fileDetail.name.indexOf('.'),fileDetail.name.length)
                                    //self.file = file
                                    var fileSize = fileDetail.size/1024/1024
                                    self.getOssSign(fileDetail,fileEnd,fileSize)
                                    self.index++;
                                });
                            }
                            var d =1
                            if(self.filesList.length == self.errorImg.length){
                                self.dialogVisible=true
                            }
                        }else{
                            self.filePass.push(file)
                            if((self.filePass.length+self.errorImg.length)==files.files.length &&self.filePass!=undefined&&self.filePass.length!=0){
                                let fileDetail = self.filePass[self.index]
                                self.createReader(fileDetail, function (w, h, src) {
                                    self.img.width=w;
                                    self.img.height=h;
                                    self.imgUrlList.push(src)
                                    var fileEnd = fileDetail.name.substring(fileDetail.name.indexOf('.'),fileDetail.name.length)
                                    //self.file = file
                                    var fileSize = fileDetail.size/1024/1024
                                    self.getOssSign(fileDetail,fileEnd,fileSize)
                                    self.index++;
                                });
                            }
                        }
                    });

                }

            },
            createReader (file, whenReady) {
                var reader = new FileReader;
                reader.onload = function (evt) {
                    var image = new Image();
                    image.src = evt.target.result;
                    image.onload = function () {
                        var width = this.width;
                        var height = this.height;
                        if (whenReady) whenReady(width, height,evt.target.result);
                    };
                };
                reader.readAsDataURL(file);
            },
            getOssSign(file,fileEnd,fileSize){
                let self = this;
                let formData = new FormData();
                let url = self.type==1?self.actions.getFsOssSign:self.type==2?self.actions.getKtOssSign:self.type==3?self.actions.getOssSignOfPicSearch:self.actions.getOssSignOfPicSearchTemp
                let obj = {
                    url: self.all.baseUrl + url,
                    formdata: formData
                }
                self.getData(obj).then(res=>{
                    if(res.data.status==0){
                        self.result = res.data.result;
                        self.startUpload(file,res.data.result,fileEnd,fileSize);
                    }else if(res.data.status==-95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
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
                            self.sure();
                        },2000);
                    }
                });
            },
            startUpload(file,result,fileEnd,fileSize){
                var request = new FormData()
                // 文件名字，可设置路径
                request.append('key', result.dir+ result.fileName+fileEnd)
                // policy规定了请求的表单域的合法性
                request.append('policy', result.policy)
                // Bucket 拥有者的Access Key Id
                request.append('OSSAccessKeyId', result.accessid)
                // 让服务端返回200,不然，默认会返回204
                request.append('success_action_status', '200')
                // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
                //request.append('callback', params.callback)
                request.append('Signature', result.signature)
                // 需要上传的文件filer
                request.append('Filename', result.dir+ result.fileName+fileEnd)
                request.append('name', result.fileName+fileEnd)
                request.append('file', file, result.fileName+fileEnd)
                let self = this;
                self.showProgressBar = true;
                //let formData = new FormData();
                let obj = {
                    url: result.host,
                    formdata: request
                }
                self.getData(obj).then(res=>{
                    // self.showInfo = 0;
                    // self.succMsg = '上传成功';
                    self.hasFinshed=true;
                    self.showProgressBar = false;
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg = '';
                        let resultUpload={}
                        resultUpload.name=result.fileName+fileEnd;
                        resultUpload.path=result.host+'/'+result.dir+ result.fileName+fileEnd
                        resultUpload.fileName=file.name;
                        //self.fileList.push(resultUpload)
                        //将路径值传给父组件
                        // self.$emit('setImgPath',resultUpload)
                        // self.$emit('setIsStartUpload',false)
                        self.upload(resultUpload,file)
                    },2000);
                });
            },
            upload(file,fileOld){
                let self = this;
                let formData = new FormData();
                formData.append('name',file.fileName);
                formData.append('url',file.path);
                let obj = {}
                obj.formdata = formData;
                obj.url = self.all.baseUrl + '/new/userPicSearch/upload';
                self.getData(obj).then(res => {
                    self.num++
                    if(res.data.status==0){
                        self.fileList.push(file)
                        self.$emit('setSuccessNum', self.fileList.length+self.errorImg.length);
                        // console.log(self.index)
                        // console.log(self.filePass.length)
                        self.index++;
                        if(self.index-1<self.filePass.length){
                            let file = self.filePass[self.index-1]
                            self.createReader(file, function (w, h, src) {
                                self.img.width=w;
                                self.img.height=h;
                                self.imgUrlList.push(src)
                                var fileEnd = file.name.substring(file.name.indexOf('.'),file.name.length)
                                //self.file = file
                                var fileSize = file.size/1024/1024
                                self.getOssSign(file,fileEnd,fileSize)
                            });
                        }
                    }else if(res.data.status==-95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Knowledge/Pc/piclogin'
                            });
                        },2000);
                    }else{
                        self.errorImg.push(fileOld.name)
                        self.index++;
                        if(self.index-1<self.filePass.length){
                            let file = self.filePass[self.index-1]
                            self.createReader(file, function (w, h, src) {
                                self.img.width=w;
                                self.img.height=h;
                                self.imgUrlList.push(src)
                                var fileEnd = file.name.substring(file.name.indexOf('.'),file.name.length)
                                //self.file = file
                                var fileSize = file.size/1024/1024
                                self.getOssSign(file,fileEnd,fileSize)
                            });
                        }

                    }
                    // console.log(self.filesList.length==self.fileList.length+self.errorImg.length)
                    // console.log(self.filesList.length)
                    // console.log(self.fileList.length+self.errorImg.length)
                    if(self.filesList.length==self.fileList.length+self.errorImg.length){
                        self.dialogVisible=true
                        self.$emit('setIsStartUpload',false)
                    }
                });
            },
            sure(){
                // console.log(this.fileList)
                // console.log(this.errorImg)
                this.dialogVisible=false;
                this.fileList=[];
                this.errorImg=[];
                this.filePass=[];
                this.index=0;
                this.$emit('setIsStartUpload',false)
                this.$emit('setImgPath',this.fileList)
                this.$emit('setSuccessNum', 0)
                this.$emit('setTotalNum', 0)
            }
        }
    }
</script>

<style scoped>
    .ossArea{
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .btn{
        width: 80px;
        height: 30px;
        background-color: #ffe300;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .startUpload{
        margin-left: 10px;
    }
    input{
        width: 80px;
        height: 30px;
        overflow: hidden;
        cursor: pointer;
        opacity: 0;
        margin-left: -80px;
        position: relative;
        z-index: 1;
        cursor: pointer;
    }

</style>