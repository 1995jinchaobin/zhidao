<template>
  <div class="knowledgeDatell">
    <el-row class="header">
      <el-col :span="24">
        <label class="inp">
          <div class="textBox" v-if="textShow">
            <span>正在识别中，请稍后</span><img src="../../assets/image/knowledge/close.png" alt="">
          </div>
          <input type="file" accept="image/*" style="display: none;" id="file" @change="chooseFile"/><span v-if="!textShow">本地上传</span>
        </label>
      </el-col>
    </el-row>
    <el-row class="datell">
      <el-col class="btn" :span="5">
        <div @click="previous()" class="iconLeft"></div>
      </el-col>
      <el-col :span="14">
        <div class="imgBox">
          <img ref="img" :src="imgUrl" alt=""/>
        </div>
      </el-col>
      <el-col  class="btn" :span="5">
        <div @click="next()" class="iconRight"></div>      
      </el-col>
    </el-row>
    <el-row class="title">
      <el-col :span="24"><span>相似图片</span></el-col>
    </el-row>
    <ul class="infinite-list listContent" style="overflow:auto">
      <li v-for="(item,index) in imgList" :key="index" @click="imgDetall(item,index)">
        <el-image :ref="`imgList${index}`" :src="item.CustomContent" lazy></el-image>
        <span>{{item.PicName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'knowledgeDatell',
  data(){
    return{
      path:'/knowledge/Phone/Datell',
      imgUrl:'',
      textShow:false,
      actions: {
        getOssSign:'/new/oss/getOssSignOfPicSearch',
        getImageList:'/new/userPicSearch/search'
      },
      page:1,
      imgList:[],
      datellUrl:'',
      mineFlag: false
    }
  },
  methods:{
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
                } else if (file.size/1024/1024>2) {
                    _this.err = '文件大小不能超过2M';
                    _this.errShow = true;
                    setTimeout(function(){
                        _this.errShow = false;
                        _this.err = '';
                    },2000);
                    return;
                } 
                if(_this.imgWidth < 448){
                  _this.err = '图片宽度不能低于448像素';
                  _this.errShow = true;
                  setTimeout(function(){
                      _this.errShow = false;
                      _this.err = '';
                  },2000);
                  return;
                }
                if(_this.imgHeight < 448){
                  _this.err = '图片高度不能低于448像素';
                  _this.errShow = true;
                  setTimeout(function(){
                      _this.errShow = false;
                      _this.err = '';
                  },2000);
                  return;
                }
                _this.fileEnd = file.name.substring(file.name.indexOf('.'),file.name.length)
            }
          });
          this.file = file;
          this.fileSize = file.size/1024/1024;
          this.textShow = true;
          setTimeout(function(){
            _this.textShow = false;
            _this.getOssSign();
          },5000)
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
          },2000);
      });
    },
    getImageList(){
      let _this = this;
      let formData = new FormData();
      formData.append('page',this.page);
      formData.append('pageSize',10);
      if(this.imgUrl){
        formData.append('url',this.imgUrl);
      };
      let obj = {
        url : this.all.baseUrl + this.actions.getImageList,
        formdata: formData
      };
      this.getData(obj).then(res=>{
        if(res.data.status == 0){
          _this.mineFlag = true;
          if(res.data.result){
            for(let i = 0;i < res.data.result.data.length;i++){
              _this.imgList.push(res.data.result.data[i]);
            };
            _this.page++;
          }else{
            _this.err = "暂无图片";
            _this.errShow = true;
            setTimeout(function(){
                _this.errShow = false;
                _this.err = '';
            },2000);
          }
        }else if(res.data.status == -95){
            _this.err = res.data.msg;
            _this.errShow = true;
            setTimeout(function(){
                _this.errShow = false;
                _this.err = '';
                _this.$router.push({
                  path:'/Knowledge/Phone/Login'
                })
            },2000);
        }
      })
    },
    previous(){
      let img = this.$refs.img.src;
      for(let i =0;i < this.imgList.length;i++){
        if(this.imgList[i].CustomContent == img){
          if(i-1 < 0){
            let o = this.imgList.length - 1;
            this.$refs.img.src = this.imgList[o].CustomContent;
          }else {
            this.$refs.img.src = this.imgList[i-1].CustomContent;
          }
        }
      }
    },
    next(){
      let img = this.$refs.img.src;
      for(let i =0;i < this.imgList.length;i++){
        if(this.imgList[i].CustomContent == img){
          if(i+1 == this.imgList.length){
            this.$refs.img.src = this.imgList[0].CustomContent;
          }else{
            this.$refs.img.src = this.imgList[i+1].CustomContent;
          }
        }
      }
    },
    imgDetall(item,index){
      this.imgUrl = this.$refs[`imgList${index}`][0].src;
    },
    loadData() {
      window.onscroll = () => {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let bottomOfWindow = document.documentElement.offsetHeight - scrollTop - window.innerHeight < 50;
        if (bottomOfWindow && this.mineFlag) {
          this.mineFlag = false;
          this.getImageList();
        }
      }
    },
  },
  mounted(){
    document.getElementById('app').style.cssText = "min-width: 100%;";
    document.body.style.cssText = 'min-width: 100%;';
    // localStorage.setItem('path',this.path);
    if(localStorage.getItem('knowledgeDatell')){
      this.imgUrl = localStorage.getItem('knowledgeDatell');
    };
    this.getImageList();
    this.loadData();
  },
  beforeDestroy(){
    document.getElementById('app').style.cssText = "";
    document.body.style.cssText = '';
    window.onscroll = null;
  }
}
</script>

<style scoped>
  .header{
    width: 100%;
    height: 72px;
    background: #Fff;
  }
  .inp{
    display: inline-block;
    width: 90%;
    height: 30px;
    background: #Fff;
    position: relative;
    border: 1px solid #979797;
    margin-top: 22px;
  }
  .inp span{
    display: inline-block;
    font-size: 16px;
    color: #FFFFFF;
    position: absolute;
    background: #3A8BFB;
    border-left: 1px solid #979797;
    width: 105px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    right: 0;
  }
  .title{
    font-size: 16px;
    color: #333333;
    margin-top: 47px;
    margin-bottom: 16px;
    font-weight: 700;
    text-align: left;
    padding-left: 21px;
  }
  .listContent {
    padding-left: 21px;
    column-count: 2;
    -webkit-column-count: 2;
    -o-column-count: 2;
    -ms-column-count: 2;
    -moz-column-count: 2;
    column-gap: 1px;
    -webkit-column-gap: 1px;
    -o-column-gap: 1px;
    -ms-column-gap: 1px;
    -moz-column-gap: 1px;

  }
  .listContent li {
    width: 90%;
    margin: 0;
    padding-bottom: 20px;
  }
  .listContent li img{
    width: 100%;
    height: 100%;
  }
  .datell{
    width: 100%;
    height: 422px;
    background: #333;
  }
  .btn{
    position: relative;
    top: calc(50% - 50px)
  }
  .iconLeft,.iconRight{
    width: 36px;
    height: 36px;
    border-radius: 3px;
    margin: 0 auto;
    cursor: pointer;
  }
  .iconLeft{
    background: #464646 url('../../assets/image/knowledge/icon.png') no-repeat center;
    background-size: 10px 20px;
  }
  .iconRight{
    background: #464646 url('../../assets/image/knowledge/icon.png') no-repeat center;
    background-size: 10px 20px;
    transform: rotate(180deg);
  }
  .imgBox{
    width: 187px;
    height: 349px;
    display: flex;
    align-items: center;
    position: relative;
    top: 21px;
    margin: 0 auto;
    overflow: hidden;
  }
  .imgBox img{
    width: 100%;
    height: auto;
  }
</style>