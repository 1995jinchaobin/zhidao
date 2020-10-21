<template>
  <div class="knowledgeLogin">
    <el-row class="header">
      <el-col :span="24" class="logo">
        <img src="../../assets/image/knowledge/logo1.png" alt="">
      </el-col>
      <el-col :span="24">
          <el-input placeholder="请输入账号" v-model="userName">
            <i slot="prefix" class="el-input user"></i>
          </el-input>
      </el-col>
      <el-col :span="24">
          <el-input placeholder="请输入密码" v-model="password" show-password>
            <i slot="prefix" class="el-input password"></i>
          </el-input>
      </el-col>
      <el-col>
        <el-button @click="toSubmit($event)" class="logBtn" type="primary">登录</el-button>
      </el-col>
    </el-row>
    <div v-if="errShow" class="err">{{err}}</div>
  </div>
</template>

<script>
export default {
  name:'KnowledgeLogin',
  data(){
    return{
      path:'/Knowledge/Phone/Login',
      userName:'',
      password:'',
      err:'',
      errShow:false
    }
  },
  methods:{
    // 登陆点击
    toSubmit(event){
        // 阻止页面刷新
        event.preventDefault();
        let _this = this;
        if(this.userName == '' || this.password == ''){
            this.err = "账号和密码不能是空的";
            this.errShow = true;
            setTimeout(function(){
                _this.err = '';
                _this.errShow = false;
            },1000);
        }else{
            this.showLoading = true;
            let formData = new FormData();
            formData.append('phone',this.userName);
            formData.append('password',this.password);
            let obj = {
                url: this.all.baseUrl + '/appuser/login',
                formdata: formData
            }
            this.getData(obj).then(res =>{
                if(res.data.status == 0){
                    // 设置全局变量
                    this.all.token = res.data.result.token;
                    this.all.userMessage = res.data.result.user;
                    localStorage.setItem('token',res.data.result.token);
                    localStorage.setItem('userId',res.data.result.user.id);
                    localStorage.setItem('phone',this.userName);
                    localStorage.setItem('suitIndex',1);
                    localStorage.removeItem('ssoSign');
                    let user = JSON.stringify(res.data.result.user);
                    if(user){
                        localStorage.setItem('user',user);
                        localStorage.setItem('nickname',res.data.result.user.nickname);
                        localStorage.setItem('headPhoto',res.data.result.user.headPhoto);
                        localStorage.setItem("expirationTime",res.data.result.user.expirationTime);
                        localStorage.setItem("expirationTimePlus",res.data.result.user.expirationTimePlus);
                    };
                    _this.$router.push({
                      path: '/Knowledge/Phone'
                    })
                }else{
                    this.err = res.data.msg;
                    this.errShow = true;
                    setTimeout(function(){
                        _this.err = '';
                        _this.errShow = false;
                    },1000);
                }
            });
        }
    },
  },
  mounted(){
    document.getElementById('app').style.cssText = "min-width: 100%;";
    document.body.style.cssText = 'min-width: 100%;';
    // localStorage.setItem('path',this.path);
  },
  beforeDestroy(){
    document.getElementById('app').style.cssText = "";
    document.body.style.cssText = '';
  }
}
</script>

<style scoped>
  .knowledgeLogin{
    width: 100%;
    height: 100vh;
    background: url('../../assets/image/knowledge/bg.png') top;
    background-size: 100%;
  }
  .header{
    width: 100%;
    height: 100vh;
    background: #00000079;
  }
  .logo{
    margin-top: 177px;
    margin-bottom: 25px;
  }
  .logo img{
    height: 40px;
  }
  .title p{
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 30px;
  }
  .el-input{
    width: 248px;
    height: 40px;
    margin-bottom: 42px;
  }
  .el-input i.user,.el-input i.password{
    width: 12px;
    height: 12px;
    display: inline-block;
    background-size: 100%;
    margin: 14px 0 14px 7px;
  }
  .el-input i.user{
    background-image: url('../../assets/image/knowledge/user.png');
  }
  .el-input i.password{
    background-image: url('../../assets/image/knowledge/password.png');
  }
  .logBtn{
    width: 248px;
    height: 40px;
  }
  .err{
    width: 160px;
    height: 30px;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    background: #00000080;
    color: #fff;
    position: absolute;
    bottom: 50px;
    left: calc(50% - 80px);
  }
</style>