<template>
    <div class="ossArea">
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <ProgressBar v-if="showProgressBar" :hasFinshed="hasFinshed" :fileSize="fileSize" content="图片上传中"></ProgressBar>
    </div>
</template>

<script>
    import InfoBox from "../../components/common/InfoBox";
    import ProgressBar from "../../components/common/ProgressBar2";
    export default {
        name: "OSSUploadNoBtn",
        components:{
            InfoBox,
            ProgressBar
        },
        //1.分色，2.抠图
        props:['type'],
        data(){
            return{
                actions:{
                    getFsOssSign:'/new/oss/getOssSignOfFS',
                    getKtOssSign:'/new/oss/getOssSignOfKT'
                },
                showInfo:-1,
                errMsg:'',
                succMsg:'',
                result:{},
                fileEnd:'',
                file:null,
                showProgressBar:false,
                hasFinshed:false,
                fileSize:0
            }
        },
        methods:{
            chooseFile(files){
                let self = this;
                //var files = self.files;
                if (files.files) {
                    const fileLen = files.files;
                    var file = fileLen[0];
                    if (file) {
                        var types = 'jpg,jpeg,png,JPG,PNG,JPEG'
                        if (types.indexOf(file.name.substring(file.name.indexOf('.')+1,file.name.length))<=-1) {
                            self.errMsg = '请上传图片格式的文件';
                            self.showInfo = 1;
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                            },2000);
                            return;
                        } else if (file.size/1024/1024>500) {
                            self.errMsg = '文件大小不能超过500M';
                            self.showInfo = 1;
                            setTimeout(function(){
                                self.showInfo = -1;
                                self.errMsg = '';
                            },2000);
                            return;
                        }
                        self.fileEnd = file.name.substring(file.name.indexOf('.'),file.name.length)
                    }
                    this.file = file
                    this.fileSize = file.size/1024/1024
                    this.getOssSign()
                }
            },
            getOssSign(){
                let self = this;
                let formData = new FormData();
                let url = self.type==1?self.actions.getFsOssSign:self.actions.getKtOssSign
                let obj = {
                    url: self.all.baseUrl + url,
                    formdata: formData
                }
                self.getData(obj).then(res=>{
                    if(res.data.status==0){
                        self.result = res.data.result;
                        self.startUpload();
                    }else if(res.data.status==-95){
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.errMsg = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showInfo = 1;
                        self.errMsg = res.data.msg;
                        setTimeout(function(){
                            self.showInfo = 0;
                            self.errMsg = '';
                        },2000);
                    }
                });
            },
            startUpload(){
                var request = new FormData()
                // 文件名字，可设置路径
                request.append('key', this.result.dir+ this.result.fileName+this.fileEnd)
                // policy规定了请求的表单域的合法性
                request.append('policy', this.result.policy)
                // Bucket 拥有者的Access Key Id
                request.append('OSSAccessKeyId', this.result.accessid)
                // 让服务端返回200,不然，默认会返回204
                request.append('success_action_status', '200')
                // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
                //request.append('callback', params.callback)
                request.append('Signature', this.result.signature)
                // 需要上传的文件filer
                request.append('Filename', this.result.dir+ this.result.fileName+this.fileEnd)
                request.append('name', this.result.fileName+this.fileEnd)
                request.append('file', this.file, this.result.fileName+this.fileEnd)
                let self = this;
                self.showProgressBar = true;
                //let formData = new FormData();
                let obj = {
                    url: self.result.host,
                    formdata: request
                }
                self.getData(obj).then(res=>{
                    self.showInfo = 0;
                    self.succMsg = '上传成功';
                    self.hasFinshed=true;
                    self.showProgressBar = false;
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg = '';
                        //将路径值传给父组件
                        self.$emit('setImgPath',self.result.host+'/'+self.result.dir+ self.result.fileName+self.fileEnd)
                    },2000);
                });
            },
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