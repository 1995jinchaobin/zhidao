<template>
  <div class="xiugai">
    <div class="header">
      <div class="title">创建子账号</div>
      <div class="tips">(  一个账号只可绑定两个关联账号，您还可绑定账号为：{{2-parseInt(memberNum)}}  )</div>
    </div>
    <div class="secondBind" v-if="showBindBox">
      <div class="title">添加关联者账号</div>
      <div class="inputArea">
        <span class="leftTip">关联者账号</span>
        <input v-model="number" placeholder="请输入要关联的账号" type="text" />
      </div>
      <div class="btnBox">
        <button @click="sure" class="sureBtn">确定</button>
        <button @click="back" class="cancelBtn">返回</button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>用户名</th>
          <th>手机号</th>
          <th>绑定时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-if="memberNum>0">
        <tr v-for="(item, index) in memberList" :key="index">
          <td>
            {{item.user.nickname}}
          </td>
          <td>{{item.phone}}</td>
          <td>{{item.create_time}}</td>
          <td>
            <button v-if="item.status==0" class="cancelRalate" @click="cancelRalate(index)" ><div class="point"> </div><div class="cancelBtn">取消关联</div></button>
            <button v-if="item.status==-10" class="ralate" @click="ralate(index)" ><div class="point"> </div><div class="relateBtn">关联</div></button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="upload" @click="submit()" v-if="memberNum<2">+ 添加关联账号</button>
    <div class="bottomTips" v-if="memberNum==0">(您还没添加关联账号请添加)</div>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
    <Loading v-if="showLoading"></Loading>
    <SelectBox  @sure="sureCancelRalate" @cancel="cancel"  v-if="showSeledtInfo==1 || showSeledtInfo==0" :code="showSeledtInfo" :errMsg="errMsg" :succMsg="succMsg" :isSelect="isSelect"></SelectBox>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
import InfoBox from '@/components/common/InfoBox';
import SelectBox from '../../components/common/SelectBox';
export default {
  name: "xiugaimima",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab,
    InfoBox,
    SelectBox
  },
  data() {
    return {
      path: "/xiugaimima",
      showSecond: false,
      number:'',
      message: {},
      //是否显示提示框-1不显示，0:显示成功，1：显示警告
      showInfo:-1,
      errMsg:'',
      succMsg:'',
      showLoading:false,
      memberList:[],
      memberNum:0,
      showBindBox:false,
      //被关联者账号id
      bindUserId:'',
      //是否显示选择框
      showSeledtInfo:-1,
      userIndex:-1,
      isSelect:0
    };
  },
  methods: {
    //取消关联
    quxiao(index){
            let formData = new FormData();
      formData.append("id", this.message[index].id);
      let obj = {
        url: this.all.baseUrl + "/appMemberRelation/delete",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          // this.showSecond = false;
          alert("删除成功");
          this.getList();
        } else if (res.data.status == -95) {
          alert(res.data.msg);
        } else {
          this.hasError(res.data.msg);
        }
      });
    },
    //提交关联者账号
    sure(){
      let self = this;
      if (this.number == "") {
          self.errMsg = '请填写关联者账号';
          self.showInfo = 1;
          Scroll.stop();
          setTimeout(function(){
              self.showInfo = -1;
              self.errMsg = '';
              Scroll.move();
          },1000);
          return;
      } else {
          //查询有无该用户
        let formData = new FormData();
        formData.append("phone", self.number);
        let obj = {
          url: this.all.baseUrl + "/new/users/getUserByPhone",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.result != null) {
            //如果存在该用户，则绑定
              self.bindUserId = res.data.result.id;
              self.bind();
          } else if (res.data.status == -95) {
              self.showJump = true;
              self.err = res.data.msg;
              Scroll.stop();
              setTimeout(function(){
                  self.showJump = false;
                  self.err = '';
                  localStorage.clear();
                  self.$router.push({
                      path: '/Login'
                  });
              });
          } else {
              self.errMsg = '没有该账号';
              self.showInfo = 1;
              Scroll.stop();
              setTimeout(function(){
                  self.showInfo = -1;
                  self.errMsg = '';
                  Scroll.move();
              },1000);
          }
        });
      }
    },
    //绑定
    bind(){
        let self = this;
        this.showLoading = true;
        Scroll.stop();
        let formData = new FormData();
        formData.append('bindUserId',self.bindUserId);
        let obj = {};
        obj.url = this.all.baseUrl + '/new/users/vipBindUser';
        obj.formdata = formData;
        self.getData(obj).then(res=>{
            self.showLoading = false;
            Scroll.move();
            let result;
            if(res.data.status==0){
                self.succMsg = res.data.msg;
                self.showInfo = 0;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.succMsg = '';
                    //关闭页面
                    self.showBindBox = false;
                    //刷新数据
                    self.getList();
                    Scroll.move();
                },1000);
            }else if(res.data.status==-95){
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    localStorage.clear();
                    Scroll.move();
                    self.$router.push({
                        path: '/Login'
                    });
                });
            }else{
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    },
    back(){
      this.showBindBox = false;
    },
    submit() {
      this.showBindBox = true;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(e) {
      //shijianchuo是整数，否则要parseInt转换
      let self = this;
      var time = new Date(e);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        self.add0(m) +
        "-" +
        self.add0(d) +
        " " +
        self.add0(h) +
        ":" +
        self.add0(mm) +
        ":" +
        self.add0(s)
      );
    },
    //获取当前绑定账号
    getList() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/new/users/getMemberRelations",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
            console.log('-===')
            self.memberList = res.data.result;
            self.memberNum = self.memberList.length;
            for(var i=0;i<self.memberList.length;i++){
                self.memberList[i].create_time = Scroll.changeDate(self.memberList[i].create_time)
            }
        } else if (res.data.status == -95) {
            self.showJump = true;
            self.err = res.data.msg;
            Scroll.stop();
            setTimeout(function(){
                self.showJump = false;
                self.err = '';
                localStorage.clear();
                self.$router.push({
                    path: '/Login'
                });
            });
        } else {
            self.errMsg = res.data.msg;
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
        }
      });
    },
    //点击取消关联按钮，显示确认框
    cancelRalate(index){
        let self = this;
        self.userIndex = index;
        //显示确认框
        self.showSeledtInfo=1;
        self.errMsg = '确认取消关联该用户吗？'
    },
    //点击确认取消关联
    sureCancelRalate(){
        let formData = new FormData();
        let self = this;
        self.showLoading = true

        let obj = {
            url: this.all.baseUrl + "/new/users/vipUnBindUser",
            formdata: formData
        };
        //如果是未绑定用户
        if(self.memberList[self.userIndex].status==-10){
            obj.url = this.all.baseUrl + "/new/users/vipBindUser"
            formData.append('bindUserId',self.memberList[self.userIndex].user.id);
        }else{
            formData.append('id',self.memberList[self.userIndex].user.id);
        }
        self.getData(obj).then(res => {
            if (res.data.status == 0) {
                self.showLoading=false;
                self.showInfo = 0;
                self.succMsg = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.succMsg = '';
                    //关闭确认框
                    self.cancel();
                    //刷新页面
                    self.getList();
                    Scroll.move();
                },1000);
            } else if (res.data.status == -95) {
                self.showLoading=false;
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    localStorage.clear();
                    self.$router.push({
                        path: '/Login'
                    });
                });
            } else {
                self.showLoading=false;
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.showSeledtInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    },
    //取消关联确认框，点击取消
    cancel(){
      this.showSeledtInfo=-1;
    },
    //点击关联按钮，显示确认框
    ralate(index){
        let self = this;
        self.userIndex = index;
        //显示确认框
        self.showSeledtInfo=1;
        self.errMsg = '确认重新关联该用户吗？'
    },
    //点击确认关联用户
    sureRalate(){
        let formData = new FormData();
        let self = this;
        self.showLoading = true
        formData.append('id',self.memberList[self.userIndex].user.id);
        let obj = {
            url: this.all.baseUrl + "/new/users/vipBindUser",
            formdata: formData
        };
        self.getData(obj).then(res => {
            if (res.data.status == 0) {
                self.showLoading=false;
                self.showInfo = 0;
                self.succMsg = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.succMsg = '';
                    //关闭确认框
                    self.cancel();
                    //刷新页面
                    self.getList();
                    Scroll.move();
                },1000);
            } else if (res.data.status == -95) {
                self.showLoading=false;
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    localStorage.clear();
                    self.$router.push({
                        path: '/Login'
                    });
                });
            } else {
                self.showLoading=false;
                self.errMsg = res.data.msg;
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.showSeledtInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
            }
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
 .point{
  width: 6px;
  height: 6px;
  background: #949393;
  border-radius: 100px;
  position: relative;
  top: 10px;
  left: 10px;
}
.cancelRalate {
  width: 95px;
  height: 24px;
  background: #cdcdcd;
  line-height: 24px;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
  color: #000;
  text-align: center;
}
.cancelRalate .cancelBtn{
  position: relative;
  top: -6px;
  color: #949393;
  margin-left: 8px;
}
.ralate {
  width: 80px;
  height: 24px;
  background: #ffe135;
  line-height: 24px;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
}
.ralate .point{
  background: #000;
  left: 15px !important;
}
.ralate .relateBtn{
  position: relative;
  top: -6px;
  margin-left: 8px;
}
.upload {
  width: 146px;
  height: 32px;
  background: #ffe300;
  line-height: 32px;
  border: 0;
  border-radius: 4px;
  margin-top: 134px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
}
.header {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #CDCDCD;
  font-family: SourceHanSansCN-Medium;
  color: #000000;
  position: relative;
  margin-top: 28px;
  padding-bottom: 1px;
  display: flex;
}
.header .title{
  width: 80px;
  margin-right: 24px;
  font-size: 14px;
  margin-left: 65px;
}
.header .tips{
  width: 450px;
  font-size: 12px;
  color: #D0CECE;
}
tr {
  background: #f6f6f6;
}
.table {
  width: 100%;
  margin: auto;
  margin-top: 13px;
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: #131313;
  border: none;
  border-collapse: collapse
}
.secondBind {
  width: 400px;
  height: 239px;
  background: #F7F7F7;
  position: fixed;
  border-radius: 4px;
  top: calc(50vh - 119px);
  left: calc(50vw - 200px);
}
.secondBind .title {
  padding-top: 15px;
  margin-bottom: 47px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
}
.secondBind .inputArea{
  text-align: left;
}
.secondBind .inputArea .leftTip{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  margin-left: 32px;
}
.secondBind .inputArea input{
  width: 242px;
  height: 46px;
  background: #FFFFFF;
  border: 1px solid #979797;
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #BEBABA;
  text-indent: 32px;
  margin-left: 12px;
}
.btnBox {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 52px;
  display: flex;
}
.btnBox button {
  width: 233px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
}
.btnBox .sureBtn{
  background: #FFE300;
  border: 1px solid #FFE300;
  border-radius: 0 0 0 4px;
  cursor: pointer;
}
.btnBox .sureBtn:hover,.upload:hover{
  background-color:  #ffd000;
}
.btnBox .cancelBtn{
  background: #FFFFFF;
  border: 1px solid #979797;
  border-radius: 0 0 4px 0;
  cursor: pointer;
}
.btnBox .cancelBtn:hover{
  background-color: #eee;
}
.bottomTips{
  font-family: SourceHanSansCN-Medium;
  font-size: 14px;
  color: #949393;
  margin-top: 18px;
}
tbody{
  height: 80px;
  background: #ffffff;
}
tbody tr{
  background: #ffffff;
  font-size: 14px;
  font-weight: bold;
}
tbody tr td{
  text-align: center;
}
</style>