<template>
  <div class="fens">
    <Tab :path="path" :tabIndex="tabIndex"></Tab>
    <div class="fsCount">
      <div class="leftBox">
        <h1>智能快速分色</h1>
        <p>极简在线编辑器，一键快速AI智能分色，支持多格式分层下载</p>
        <label class="formBox" for="file">
          <input type="file" style="display: none;"  ref="file" id="file" placeholder="" @change="chooseFile"/>
          <OSSUploadNoBtn type="1" ref="ossBtn" @setImgPath="setImgPath"></OSSUploadNoBtn>
          <img src="../../assets/image/homepage/23.inbox.png" alt="">
          <p>点击这里上传</p>
          <span>支持扩展名：.jpg .png .gif .tiff ...</span>
        </label>
        <div class="btn" @click="clickInput">开始分色</div>
      </div>
      <div class="bgBox">
        <img src="../../assets/image/homepage/Image.png" alt="">
      </div>
    </div>
    <div style="height: 1px;"></div>
  </div>
</template>

<script>
import Tab from '../../components/Tab';
import OSSUploadNoBtn from '../../components/common/OSSUploadNoBtn';
export default {
  name: 'Paging',
    components: {
        Tab,
        OSSUploadNoBtn
    },
    data(){
      return {
        path:'/Paging',
        tabIndex: 0,
        title:'您还未选择文件',
        status:'',
        progress: 0,
        imgPath: ''
      }
    },
    methods:{
      clickInput(){
        document.getElementById('file').click();
      },
      setImgPath(imgPath){
          this.imgPath = imgPath;
          localStorage.setItem('fsImgPath',imgPath);
          this.$router.push({
              path: '/Demixing'
          })
      },
      chooseFile(){
        this.$refs.ossBtn.chooseFile(this.$refs.file)
      },
    },
    mounted(){
      localStorage.setItem('path',this.path)
    }
}
</script>

<style scoped>
 .fens{
   width: 100%;
   background: #eee;
 }
 .fens div.fsCount{
   width: 1200px;
   height: 600px;
   margin: 123px auto 140px;
   background:#fff;
   display: flex;
   justify-content: space-between;
 }
 .leftBox{
   text-align: left;
   margin-top: 78px;
   margin-left: 81px;
 }
 .leftBox h1{
  font-size: 55px;
  color: #1C2226;
 }
 .leftBox p{
  font-size: 17px;
  color: #999999;
  margin-top: 15px;
 }
 .formBox{
  display: block;
  width: 528px;
  height: 192px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  text-align: center;
  margin-top: 35px;
  margin-bottom: 50px;
  cursor: pointer;
 }
 .formBox img{
   width: 35.1px;
   height: 35.5px;
   margin: 42.2px auto 26px;
 }
 .formBox p{
  opacity: 0.85;
  font-size: 16px;
  color: #000000;
  margin: 0;
 }
 .formBox span{
  opacity: 0.45;
  font-size: 14px;
  color: #000000;
  margin-top: 4px;
 }
 .progress>div:first-child span{
   display: inline-block;
   width: 390px;
   font-size: 14px;
   color: #000000;
   margin-right: 98.2px;
   opacity: 0.45;
   margin-bottom: 4px;
 }
 .progress>div:first-child img:first-child{
   width: 9.2px;
   height: 10.6px;
   margin-right: 10px;
 }
 .progress>div:first-child img:last-child{
   width: 8.7px;
   height: 8.9px;
 }
 .progress>div:last-child{
  height: 2px;
  background: #000000;
  border-radius: 32px;
  margin-left: 20px;
  transition: width 0.5s;
 }
 .progress>div:last-child>div{
  width: 497px;
  height: 2px;
  opacity: 0.1;
  background: #000000;
  border-radius: 32px;
 }
 .btn{
   width: 518px;
   height: 60px;
   background: #FFE300;
   border-radius: 6px;
   margin-top: 15px;
   font-size: 20px;
   color: #333333;
   text-align: center;
   line-height: 60px;
   font-weight: 600;
   cursor: pointer;
 }
 .btn:hover{
   background: #ffd000;
 }
 .bgBox img{
   width: 400px;
   height: 324px;
   margin-top: 88px;
   margin-right: 78px;
 }
</style>