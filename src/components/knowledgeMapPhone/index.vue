<template>
  <div class="knowledge">
    <el-row class="header">
      <el-col :span="24">
          <span class="userName">{{userInfo.nickname}}，您好</span>
          <p class="headerTitle">织道，以图识图</p>
          <label class="inp">
            <div class="textBox" v-if="textShow">
              <span>正在识别中，请稍后</span><img src="../../assets/image/knowledge/close.png" alt="">
            </div>
            <input type="file" accept="image/jpg/png" style="display: none;" id="file" @change="chooseFile"/><span v-if="!textShow">本地上传</span>
          </label>
        </el-col>
    </el-row>
    <div v-if="errShow" class="err"><span>{{err}}</span></div>
  </div>
</template>

<script>
export default {
  name: 'KnowledgePhone',
  data(){
    return{
      path: '/knowLedge/Phone',
      userInfo:{},
      imgPath: '',
      count: 1,
      err:'',
      errShow: false,
      file:'',
      fileSize:'',
      imgWidth:'',
      imgHeight: '',
      textShow: false,
      actions:{
          getOssSign:'/new/oss/getOssSignOfPicSearchTemp',
          getuserInfo:'/new/users/getUserById'
      },
      ossImgUrl:'',
      result:''
    }
  },
  methods:{
    getuserInfo(){
      let _this = this;
      let obj = {
        url: this.all.baseUrl + this.actions.getuserInfo,
        formdata: new FormData()
      };
      this.getData(obj).then(res=>{
        if(res.data.status==0){
          _this.userInfo = res.data.result.userInfo;
        }else if(res.data.status == -95){
            _this.err = res.data.msg;
            _this.errShow = true;
            setTimeout(function(){
                _this.errShow = false;
                _this.err = '';
                localStorage.clear();
                _this.$router.push({
                    path: '/Knowledge/Phone/Login'
                });
            });
        }else{
          _this.err = msg;
          _this.errShow = true;
          setTimeout(function(){
              _this.errShow = false;
              _this.err = '';
              localStorage.clear();
              _this.$router.push({
                  path: '/Knowledge/Phone/Login'
              });
          });
        }
      })
    },
    createReader(file, whenReady) {
        var reader = new FileReader;
        reader.onload = function (evt) {
            var image = new Image();
            image.onload = function () {
                var width = this.width;
                var height = this.height;
                if (whenReady) whenReady(width, height);
            };
            image.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    },
    chooseFile(files){
      let _this = this;
      if (files.target.files) {
          const fileLen = files.target.files;
          var file = fileLen[0];
          this.createReader(file, function (w, h) {
            _this.imgWidth = w;
            _this.imgHeight = h;
            if (file) {
                var types = 'jpg,jpeg,png,JPG,PNG,JPEG'
                if (types.indexOf(file.name.substring(file.name.indexOf('.')+1,file.name.length))<=-1) {
                    _this.err = '请上传图片格式的文件';
                    _this.errShow = true;
                    setTimeout(function(){
                      _this.errShow = false;
                      _this.err = '';
                    },2000);
                    return;
                }
                // else if (file.size/1024/1024>2) {
                //     _this.err = '文件大小不能超过2M';
                //     _this.errShow = true;
                //     setTimeout(function(){
                //         _this.errShow = false;
                //         _this.err = '';
                //     },2000);
                //     return;
                // }
                
                // if(_this.imgWidth < 448){
                //   _this.err = '图片宽度不能低于448像素';
                //   _this.errShow = true;
                //   setTimeout(function(){
                //       _this.errShow = false;
                //       _this.err = '';
                //   },2000);
                //   return;
                // }
                // if(_this.imgHeight < 448){
                //   _this.err = '图片高度不能低于448像素';
                //   _this.errShow = true;
                //   setTimeout(function(){
                //       _this.errShow = false;
                //       _this.err = '';
                //   },2000);
                //   return;
                // }
                _this.fileEnd = file.name.substring(file.name.indexOf('.'),file.name.length)
            }
          });
          this.file = file;
          this.fileSize = file.size/1024/1024;
          this.textShow = true;
          setTimeout(function(){
            _this.textShow = false;
            _this.getOssSign();
          },3000)
      }
    },
    getOssSign(){
      let _this = this;
      let formData = new FormData();
      let obj = {
          url: _this.all.baseUrl + _this.actions.getOssSign,
          formdata: formData
      }
      _this.getData(obj).then(res=>{
          if(res.data.status==0){
              _this.result = res.data.result;
              _this.startUpload();
          }else if(res.data.status==-95){
              _this.errShow = true;
              _this.err = res.data.msg;
              setTimeout(function(){
                  _this.errShow = false;
                  _this.err = '';
                  localStorage.clear();
                  _this.$router.push({
                      path: '/Knowledge/Phone/Login'
                  });
              },2000);
          }else{
              _this.errShow = true;
              _this.err = res.data.msg;
              setTimeout(function(){
                  _this.errShow = false;
                  _this.err = '';
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
      let _this = this;
      _this.showProgressBar = true;
      //let formData = new FormData();
      let obj = {
          url: _this.result.host,
          formdata: request
      }
      _this.getData(obj).then(res=>{
          _this.errShow = true;
          _this.err = '上传成功';
          _this.ossImgUrl = _this.result.host+'/'+_this.result.dir+ _this.result.fileName+_this.fileEnd;
          setTimeout(function(){
              _this.errShow = false;
              _this.err = '';
              localStorage.setItem('knowledgeImg',_this.ossImgUrl);
              _this.$router.push({
                path:'/knowLedge/Phone/Result'
              })
          },2000);
      });
    }
  },
  mounted(){
    document.getElementById('app').style.cssText = "min-width: 100%;";
    document.body.style.cssText = 'min-width: 100%;';
    // localStorage.setItem('path',this.path);
    this.getuserInfo();
  },
  beforeDestroy(){
    document.getElementById('app').style.cssText = "";
    document.body.style.cssText = '';
  }
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
  .header{
    width: 100%;
    height: 100vh;
    background: url('../../assets/image/knowledge/bg.png') no-repeat top;
    background-size: 100% 100%;
    text-align: left;
  }
  .userName{
    display: inline-block;
    margin: 13px 0 27px 20px;
    font-size: 12px;
    color: #FFFFFF;
  }
  .headerTitle{
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 20px;
  }
  .inp{
    position: relative;
    display: block;
    width: 285px;
    height: 25px;
    margin: 0 auto;
    background: rgba(32,31,31,0.41);
    border: 1px solid #FFFFFF;
    cursor: pointer;
  }
  .inp>span{
    display: inline-block;
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #FFFFFF;
    width: 64px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-left: 1px solid #fff;
    cursor:none;
  }
  .err{
    width: 100%;
    position: absolute;
    bottom: 50px;
  }
  .err span{
    display: inline-block;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px; 
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    background: #00000080;
    color: #fff;
  }
  .textBox{
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    padding-left: 16px;
    width: 100%;
    height: 100%;
    line-height: 25px;
    background: rgba(32,31,31,0.41);
  }
  .textBox span{
    font-size: 12px;
    color: #FFFFFF;
  }
  .textBox img{
    width: 14px;
    height: 14px;
    position: absolute;
    right: 25px;
    top: 5px;
  }
</style>