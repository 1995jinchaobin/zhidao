<template>
  <div class="register">
    <div class="content">
      <div class="logoBox">
        <div class="navList">
          <img src="../../assets/image/login/preLogo.png" alt="">
        </div>
        <p class="nameBox">让设计<span>变得更简单</span></p>
      </div>
      <div class="formBox">
        <form action="">
          <div class="hBox">
            <h2>注册</h2>
            <p>已有账号？立即<router-link to="/Login">登录</router-link></p>
          </div>
          <label for="">
            <img src="../../assets/image/login/people.png" alt="">
            <input type="text" v-model="mold" v-bind:class="[isShow==false?'':'brandInput']" @click="selectBrand" readonly id="brand" placeholder="选择用户信息">
            <img v-bind:class="[isShow==false?'pull':'special']" @click="selectBrand" src="../../assets/image/login/pull.png" alt="下拉">
            <ul class="brandList" v-show="isShow">
              <li v-for="(item,index) in arr" @click="select(index)" :key="item">{{item}}</li>
            </ul>
          </label>
          <label for="">
            <img src="../../assets/image/login/phone.png" alt="">
            <input maxlength="11" v-model="message.phone" placeholder="输入手机号" type="text">
          </label>
          <label for="">
            <img src="../../assets/image/login/code.png" alt="">
            <input maxlength="4" v-model="message.code" placeholder="请输入验证码" type="text">
            <div class="code" style="cursor: default;" v-if="showCode" @click="codeBtn">{{codeNumber}}</div>
            <div v-else class="code specialCode">{{codeNumber}}</div>
          </label>
          <label for="">
            <img src="../../assets/image/login/password.png" alt="">
            <input v-model="message.pass" placeholder="请输入密码6-16位字符" type="password">
          </label>
          <label for="">
            <img src="../../assets/image/login/password.png" alt="">
            <input v-model="message.surePass" placeholder="请再次输入密码" type="password">
          </label>
          <div class="changeBox">
            <p><span @click="langChange(0)">中</span><span>|</span><span @click="langChange(1)">EN</span></p>
            <router-link :to='{path: "/Forget",query: {number: message.phone}}'>忘记密码</router-link>
          </div>
          <button @click="toSubmit" class="btn">注册</button>
        </form>
        <p class="patnerBox">技术支持<span @click="toYouchai">浙江有柴科技有限公司</span><span @click="toQfc">浙江中国轻纺城网络有限公司</span></p>
      </div>
    </div>
    <div class="model" v-if="tigShow">
      <div class="content">
        <div class="tigBox">
          <img src="../../assets/image/login/error.png" alt="">
          <p>{{tig}}</p>
        </div>
      </div>
    </div>
  </div>     
</template>
<script>
export default {
  name: 'Register',
  data(){
    return {
      // 判断选择框的显示隐藏
      isShow: false,
      // 品牌方本地数据
      arr: ['品牌商','设计师','面料商','辅料商','制造商'],
      mold: "",
      // 用来判断验证码按钮的显示
      codeNumber: "获取验证码",
      // 验证码倒计时定时器
      clock: null,
      showCode: true,
      // 弹窗提示
      tigShow: false,
      tig: "",
      showErr: true,
      // 接口上传信息
      message: {
        phone: '',
        pass: '',
        surePass: '',
        code: ''
      }
    }
  },
  methods: {
    toYouchai(){
      window.location.href = 'http://www.youchaikj.com/';
    },
    toQfc(){
      window.location.href = 'https://www.tnc.com.cn/';
    },
    // 点击选择品牌方
    selectBrand(){
      this.isShow = !this.isShow;
    },
    // 点击选择
    select(index){
      this.mold = this.arr[index];
      this.isShow = !this.isShow;
    },
    // 手机号正则
    phoneReg(str){
      let self = this;
      if(!(/^1[3456789]\d{9}$/.test(str))){ 
        this.tigShow = true;
        this.tig = "手机号码有误";
        setTimeout(function(){
          self.tig = "";
          self.tigShow = false;
        },1000);
        return false; 
      } 
    },
    // 点击发送验证码
    codeBtn(e){
      let self = this;
      e.preventDefault();
      if(this.message.phone==""){
        this.tigShow = true;
        this.tig = "手机号码不能为空";
        setTimeout(function(){
          self.tig = "";
          self.tigShow = false;
        },1000);
      }else{
        this.phoneReg(this.message.phone);
        let formData = new FormData();
        formData.append('phone',this.message.phone);
        let obj = {
          url: this.all.baseUrl + '/userverify/send',
          formdata: formData
        }
        this.getData(obj).then(res => {
          if(res.data.status==0){
            this.showCode = false;
            this.codeNumber = 59 + "秒";
            this.clock = setInterval(function(){
              if(parseInt(self.codeNumber)==0){
                clearInterval(self.clock);
                self.showCode = true;
                self.codeNumber = "获取验证码";
              }else{
                self.codeNumber = parseInt(self.codeNumber)-1+"秒";
              }
            },1000);
          }
        });
      }
    },
    // 密码正则
    passReg(str){
      let self = this;
      if(!(/^[A-Za-z0-9]{6,16}$/.test(str))){ 
        this.tigShow = true;
        this.tig = "密码格式有误";
        setTimeout(function(){
          self.tig = "";
          self.tigShow = false;
        },1000);
        return false; 
      }else{
        let formData = new FormData();
        formData.append('phone',this.message.phone);
        formData.append('code',this.message.code);
        formData.append('password',this.message.pass);
        formData.append('identity',this.mold);
        let obj = {
          url: this.all.baseUrl + '/appuser/register',
          formdata: formData
        }
        this.getData(obj).then( res => {
          if(res.data.status==0){
            this.tigShow = true;
            this.tig = "注册成功，返回登录";
            this.showErr = false;
            setTimeout(function(){
              self.tig = "";
              self.tigShow = false;
              this.showErr = true;
              self.$router.push({
                path: '/Login'
              });
            },1000);
          }else{
            this.tigShow = true;
            this.tig = res.data.msg;
            setTimeout(function(){
              self.tigShow = false;
              self.tig = '';
            },1000);
          }
        });
      }
    },
    // 表单确认提交
    toSubmit(e){
      e.preventDefault();
      let self = this;
      if(this.message.phone==""||this.message.code==""||this.message.pass==""||this.message.surePass==""||this.mold==""){
        this.tigShow = true;
        this.tig = '必填项不能为空';
        setTimeout(function(){
          self.tigShow = false;
          self.tig = '';
        },1000);
      }else if(this.message.pass!=this.message.surePass){
        this.tigShow = true;
        this.tig = '两次输入的密码不一致';
        setTimeout(function(){
          self.tigShow = false;
          self.tig = '';
        },1000);
      }else{
        this.passReg(this.message.pass);
      }
    },
    // 切换语言
    langChange(index){
      if(index==0){
        localStorage.removeItem('English');
        this.$router.push({
          path: '/Register',
          query: {
            langage: 0
          }
        });
      }else if(index==1){
        localStorage.setItem('English',true);
        this.$router.push({
          path: '/Enregister',
          query: {
            langage: 1
          }
        });
      }
    }
  },
  mounted(){
    // if(localStorage.getItem('English')){
    //   this.$router.push({
    //     path: '/Enregister',
    //     query: {
    //       langage: 1
    //     }
    //   });
    // }else{
    //   this.$router.push({
    //     path: '/Register',
    //     query: {
    //       langage: 0
    //     }
    //   });
    // }
  },
  // 生命周期清除定时器
  beforeDestroy(){
    if(this.clock){
      clearInterval(this.clock);
    }
  }
}
</script>
<style scoped>
  .register{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url('../../assets/image/login/back.png') no-repeat center;
    background-size: cover;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 100vh;
    box-sizing: border-box;
  }
  .logoBox{
    float: left;
    padding-top: 14.6875rem;
  }
  .navList{
    overflow: hidden;
  }
  .navList img{
    float: left;
    display: block;
    width: 30.5rem;
  }
  .nameBox{
    font-size: 60px;
    color: #fff;
    margin-top: 180px;
    letter-spacing: 4px;
    text-align: left;
    margin-left: 100px;
    position: relative;
  }
  .nameBox:before{
    content: '';
    position: absolute;
    width: 60px;
    height: 48px;
    top: -0;
    left: -100px;
    background: url('../../assets/image/login/left.png') no-repeat center;
    background-size: 100%;
  }
  .nameBox:after{
    content: '';
    position: absolute;
    width: 60px;
    height: 48px;
    bottom: 24px;
    right: -88px;
    background: url('../../assets/image/login/right.png') no-repeat center;
    background-size: 100%;
  }
  .nameBox span{
    display: block;
    margin-left: 86px;
  }
  .formBox{
    float: right;
    overflow: hidden;
  }
  .formBox form{
    display: block;
    width: 400px;
    height: 625px;
    background: #fff;
    margin-right: 108px;
    overflow: hidden;
    margin-top: calc(50vh - 312px);
  }
  /* 下拉图标 */
  .pull{
    position: absolute;
    width: 13px;
    bottom: 19px;
    right: 0;
    transform: rotate(-0);
  }
  .special{
    transform: rotate(180deg);
    position: absolute;
    width: 13px;
    bottom: 19px;
    right: 0;
  }
  /* 标题 */
  .hBox{
    display: flex;
    justify-content: space-between;
    padding: 0 38px;
    padding-top: 40px;
    align-items: center;
  }
  .hBox h2{
    font-size: 24px;
    text-align: left;
    color: #333;
  }
  .hBox p{
    color: #808080;
    font-size: 14px;
  }
  .hBox p a{
    color: #0261d5;
  }
  /* 输入 */
  form label{
    display: flex;
    margin: 0 auto;
    margin-top: 28px;
    width: 330px;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    align-items: center;
    position: relative;
  }
  form label img{
    width: 22px;
    margin-left: 8px;
    display: block;
    margin-right: 20px;
  }
  form label input{
    font-size: 14px;
    outline: none;
    border: none;
    color: #333;
    width: 250px;
    display: block;
    height: 45px;
    background: #fff;
  }
  .changeBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 38px;
    margin-top: 25px;
  }
  .changeBox p{
    font-size: 12px;
    color: #2870dc;
  }
  .changeBox p span{
    margin-right: 4px;
    cursor: default;
  }
  .changeBox a{
    font-size: 12px;
    color: #333;
  }
  /* 登陆样式 */
  form .btn{
    border: none;
    outline: none;
    width: 330px;
    height: 55px;
    background: #2870dc;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 18px;
    display: block;
    color: #fff;
  }
    /* 战略合作伙伴 */
  .formBox .patnerBox{
    color: #fff;
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
  }
  .patnerBox span{
    display: inline-block;
    margin-left: 8px;
    cursor: pointer;
  }
  .patnerBox span:hover{
    color: #bbb;
  }
  /* 用户信息样式 */
  .brandList{
    position: absolute;
    background: #fff;
    z-index: 99;
    border-left: 1px solid #c4c4c4;
    border-right: 1px solid #c4c4c4;
    top: 48px;
    left: -1px;
    right: 0;
    text-align: left;
    width: 330px;
    box-sizing: border-box;
  }
  .brandList li{
    width: 330px;
    border-bottom: 1px solid #c4c4c4;
    color: #333;
    padding: 0 20px;
    font-size: 18px;
    line-height: 50px;
    box-sizing: border-box;
  }
  .brandList li:nth-child(1){
    border-top: 1px solid #c4c4c4;
  }
  /* 验证码样式 */
  .code{
    position: absolute;
    height: 50px;
    color: #5d78ff;
    background: inherit;
    outline: none;
    border: 0;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    top: 0;
    right: 15px;
  }
  .specialCode{
    background: inherit;
  }
  /* 提示弹窗 */
  .model{
    width: 100%;
    left: 0;
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
    background: rgba(0,0,0,0.6);
  }
  .tigBox{
    position: absolute;
    width: 400px;
    height: 50px;
    top: calc(50% - 25px);
    right: 108px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #333;
  }
</style>