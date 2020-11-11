<template>
  <div class="errorPage">
    <div class="content">
      <img src="../../../assets/image/user/errorImage.png" alt="#">
      <h2>审核失败</h2>
      <div class="errInfo">请核对并修改一下信息后,再重新提交</div>
      <div class="errorContent">
        <div class="table">
          <div class="title">您提交的内容有如下错误:</div>
          <div class="errorNote">
            <img src="../../../assets/image/user/errorPagemini.png" alt="#" class="imgMiniError">
            <div>{{errContent}}</div>
          </div>
        </div>
      </div>
      <el-button type="primary" size="mini" class="fanhuiBtn" @click="fanhuiXiugaiBtn">返回修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data () {
    return {
      errContent: '',
      content: {}
    }
  },
  methods: {
    fanhuiXiugaiBtn(){
      console.log(this.content)
      this.$router.push({
        path: '/User/freeRelease',
        query: {
          form: this.content
        }
      })
    }
  },
  created () {
    this.content = this.$route.query.content
    this.errContent = this.$route.query.content.note
    console.log(this.content)
  }
}
</script>

<style>
.content{
  margin-top: 150px;
}
.content h2{
  margin-top: 25px;
}
.errInfo{
  margin-top: 15px;
  color: #C2C2C2;
}
.errorContent{
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.errorContent .table{
  width: 60%;
  padding: 25px;
  background-color: #FAFAFA;
}
.errorContent .title{
  font-size: 18px;
  font-weight: 600;
  text-align: left;
}
.fanhuiBtn{
  margin-top: 35px;
}
.imgMiniError{
  width: 20px;
  height: 20px;
}
.errorNote{
  display: flex;
}
</style>