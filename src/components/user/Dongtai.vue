<template>
   <div id="dynamic">
      <div class="count">
         <table class="title">
            <tr>
               <td>发布时间</td>
               <td>标题</td>
               <td>金额</td>
               <td>状态</td>
               <td>操作</td>
            </tr>
            <tr class="tabItem">
               <td>2019-9-10 18:25</td>
               <td>需要花型</td>
               <td>2000元</td>
               <td id="3">服务商开始工作</td>
               <td><span @click="state($event)">查看</span><span>删除</span></td>
            </tr>
            <tr class="tabItem">
               <td>2019-9-10 18:25</td>
               <td>需要花型</td>
               <td>2000元</td>
               <td id="1">招标中</td>
               <td><span @click="state($event)">查看</span><span>删除</span></td>
            </tr>
            <tr class="tabItem">
               <td>2019-9-10 18:25</td>
               <td>需要花型</td>
               <td>2000元</td>
               <td id="4">等待支付</td>
               <td><span @click="state($event)">查看</span><span>删除</span></td>
            </tr>
         </table>
         <div style="height: 30px;"></div>
      </div>
      <!-- 验收窗口 -->
      <div id="seeBody1" class="seeBody" v-if="userLv == 1">
         <div style="height: 13rem;"></div>
         <div class="see">
            <div style="height: 5.87rem;">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <div class="downImg">
               <div>下载图片</div>
            </div>
            <div class="btn">
               <div>满意</div>
               <div @click="refuse">不满意</div>
            </div>
            <div style="height: 12.62rem;"></div>
         </div>
      </div>
      <div id="seeBody2" class="seeBody" v-else-if="userLv == 2">
         <div style="height: 13rem;"></div>
         <div class="see">
            <div style="height: 5.87rem;">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <div class="upImg">
               <div>上传图片</div>
            </div>
            <div class="btn">
               <div>提交</div>
               <div>不提交</div>
            </div>
            <div style="height: 12.62rem;"></div>
         </div>
      </div>
      <div v-else-if="userLv == ''"></div>
      <!-- 拒绝验收窗口 -->
      <div id="tickling" class="tickling" style="display: none;">
         <div style="height: 13rem;"></div>
         <div class="seeActive">
            <div style="height: 5.87rem">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <img src="../../assets/image/user/upImg.png" alt="">
            <div class="reason">
               <div>
                  <div>提交原因</div>
                  <div></div>
               </div>
               <textarea id="itemCount" cols="10" rows="9" style="resize:none" ></textarea>
            </div>
            <div class="tickBtn">提交</div>
            <div style="height: 1.62rem;"></div>
         </div>
      </div>
      <!-- 投标 -->
      <div id="candidate" class="candidate" style="display: none">
         <div style="height: 13rem;"></div>
         <div class="candItem">
            <div style="height: 3.87rem" class="quit">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <div class="candTitle">
               <div>投标设计师/企业</div>
               <div></div>
            </div>
            <div class="candCount">
               <div><img src="../../assets/image/user/avator.png"></div>
               <div>****</div>
               <div>已经成功交易10个订单</div>
               <div class="candBtn">选择该服务商</div>
            </div>
            <div style="height: 1rem;"></div>
         </div>
      </div>
      <!-- 确认验收 -->
      <div id="acceptance" style="display: none;">
         <div style="height: 13rem"></div>
         <div class="acceItem">
            <div style="height: 5.87rem">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <h3>完成支付即可下载源文件！</h3>
            <div class="acceBtn" @click.stop="pay">立即支付</div>
            <div><img src="../../assets/image/user/downImg1.png"></div>
            <div style="height: 4.63rem;"></div>
         </div>
      </div>
      <!-- 支付 -->
      <div id="pay" style="display: none">
         <div style="height: 15rem;"></div>
         <div class="payItem">
            <div style="height: 3.87rem" class="quit">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <div class="payCount">
               <div>
                  <img src="../../assets/image/user/scanning.png">
               </div>
               <div>
                  <div>请扫二维码完成支付</div>
                  <img src="../../assets/image/user/upImg.png">
                  <div class="payBtn" @click.stop="payStatus">我已支付</div>
               </div>
               <div style="height: 1.63rem"></div>
            </div>
         </div>
      </div>
      <!-- 支付结果 -->
      <div id="pover" v-if="payCode == 1">
         <div style="height: 15rem;"></div>
         <div class="poverItem">
            <div style="height: 8rem" class="quit">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <h3>您已成功支付2000个织道币！</h3>
            <div style="height: 8rem;"></div>
         </div>
      </div>
      <div id="perr" v-else-if="payCode == 0">
         <div style="height: 15rem"></div>
         <div class="perrItem">
            <div style="height: 8rem;" class="quit">
               <img @click.stop="nonesee($event)" src="../../assets/image/user/close.png">
            </div>
            <div class="perrCount">
               <h4>织道币不足请充值<br/>或更换支付方式</h4>
               <div class="perrBtn">
                  <div>充值</div>
                  <div>更换支付方式</div>
               </div>
            </div>
            <div style="height: 8rem;"></div>
         </div>
      </div>
      <div v-else-if="payCode == -1"></div>
      <Jump v-if="showJump" :title="err"></Jump>
      <Loading v-if="showLoading"></Loading>  
   </div>
</template>

<script>
import Tab from '@/components/Tab';
import Jump from '@/components/Jump';
import Usertab from '../../components/Usertab';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
export default {
   name:'Dongtai',
   components:{
      Tab,
      Loading,
      Jump,
      Usertab
   },
   data(){
      return{
         path:'/Dongtai',
         tabIndex:null,
         showJump: false,
         err:'',
         showLoading: false,
         showIndex:'',
         type:'',
         cnt:'',
         proList:[],
         pageNumber:'',
         pagr:[],
         flag:'',
         pageIndex:'',
         count:'',
         arr:null,
         userLv:'',
         payCode: -1
      }
   },
   methods:{
      changeEnglish(){ 
         this.$router.go(0);
      },
      getUserIndex(e){
         this.showIndex = e;
         this.type = '';
         this.cnt = 1;
         this.proList = [];
         this.pageNumber = 1;
         this.page = [];
         this.flag = 0;
         this.pageIndex = 1;
         if(e==2){
               this.count = 9;
         }
         this.getMessage();
      },
      getMessage(){
         this.showLoading = true;
         Scroll.stop();
         let formData = new FormData();
         let self = this;
         formData.append('pageSize',this.count);
         formData.append('page',this.cnt);
         formData.append('status',0);
         formData.append('type1',this.showIndex+1);
         if(this.type){
               formData.append('type2',this.type);
         }
         let obj = {
               url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list',
               formdata: formData
         }
         this.getData(obj).then(res=>{
               setTimeout(function(){
                  self.showLoading = false;
                  Scroll.move();
               },500);
               let result;
               if(res.data.status == 0){
                  result = res.data.result;
                  result.list.map(function(item){
                     item.check = false;
                  });
                  this.proList = result.list;
                  this.pageNumber = result.pages;
                  this.pageAuto();
               }else if(res.data.status==-95){
                  this.showJump = true;
                  Scroll.stop();
                  this.err = res.data.msg;
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '您的账户已在其它地方登陆';
                     Scroll.move();
                     localStorage.clear();
                     self.$router.push({
                           path: '/Login'
                     });
                  },1000);
               }else{
                  this.showJump = true;
                  this.err = res.data.msg;
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1000);
               }
         });
      },
      // 点击查看切换窗口显示隐藏
      state(e){
         if(e.currentTarget.parentElement.previousElementSibling.id){
            let el = e.currentTarget.parentElement.previousElementSibling.id;
            let see = document.getElementsByClassName("seeBody");
            let candidate = document.getElementById("candidate");
            let acceptance = document.getElementById("acceptance");
            if(el == 3){
               this.userLv = 1;
               for(let i = 0;i < see.length;i++){
                  see[i].style.cssText = "display: hidden;"
               }
            }else if(el == 1){
               candidate.style.cssText = "display: hidden;"
            }else if(el == 4){
               acceptance.style.cssText = "display: hidden;"
            }
         }else{
            alert("出错了")
         }
      },
      nonesee(e){
         let see = e.path[3];
         let seeBody1 = document.getElementsByClassName("seeBody")[0];
         let seeBody2 = document.getElementsByClassName("seeBody")[1];
         see.style.cssText = "display: none;"
         if(see == seeBody1 || see == seeBody2){
            this.userLv = '';
         }
         this.payCode = -1;
      },
      refuse(){
         let tickling = document.getElementById("tickling");
         tickling.style.cssText = "display: hidden;"
      },
      pay(){
         let pay = document.getElementById("pay");
         pay.style.cssText = "display: hidden;"
      },
      payStatus(){
         this.payCode = 0;
      },
   }
}
</script>

<style scoped>
   #dynamic{
      height: 100vh;
      background: #EEEEEE;
   }
   .count{
      width: 87%;
      margin: 3% auto 0;
      background: #fff;
   }
   .title{
      width: 86%;
      margin: 0 auto;
   }

   .tabItem td{
      border: 1px #000 solid;
      padding: 13px 0;
   }
   .tabItem td+td{
      border-left: 0;
   }
   .tabItem td:last-child{
      display: flex;
      justify-content: space-around;
   }
   .tabItem td:last-child span:hover,.tickBtn:hover,.btn div:hover,.see div:first-child img:hover,.seeActive div:first-child img:hover,.quit img:hover,.acceItem div:first-child img:hover,.acceBtn:hover,.payBtn:hover,.candBtn:hover{
      cursor: pointer;
   }
   .tabItem td:last-child span:first-child{
      color: #490090;
   }
   .tabItem td:last-child span:last-child{
      color: #ff3e1e;
   }
   .seeBody,.tickling,.candidate,#acceptance,#pay,#pover,#perr{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100vh;
   }
   .see,.seeActive,.candItem,.acceItem,.poverItem,.perrItem{
      width: 44%;
      margin: 0 auto;
      background: #eeeeee;
      border-radius: 5px;
      box-shadow: 0 0 5px 1px;
   }
   .see div:first-child img,.seeActive div:first-child img,.quit img,.acceItem div:first-child img,.quit img{
      position: relative;
      top: 14%;
      right: -45%;
      width: 20px;
      height: 20px;
   }
   .see .downImg,.see .upImg{
      width: 16rem;
      height: 16rem;
      background: #000;
      background-repeat:no-repeat;
      background-position:center;
      margin: 0 auto 2rem;
   }
   .downImg{
      background-image: url("../../assets/image/user/downImg.png") !important;
   }
   .upImg{
      background-image: url("../../assets/image/user/upImg1.png") !important;
   }
   .upImg div,.downImg div{
      margin: 0 auto 5rem;
      color: #F4EA2A;
      position: relative;
      top: 74%
   }
   .seeActive>img{
      width: 16rem;
      height: 16rem;
   } 
   .see .btn{
      display: flex;
      justify-content: space-evenly;
      position: relative;
      top: 5rem;
   }
   .see .btn div,.tickBtn,.acceBtn{
      width: 6.3rem;
      height: 2.6rem;
      border-radius: 5px;
      border: 2px #000 solid;
      text-align: center;
      line-height: 2.6rem;
   }
   .see .btn div:first-child,.tickBtn,.acceBtn{
      background: #ffea2a;
   }
   .seeActive .tickBtn{
      margin: 1.85rem auto 0;
   }
   .seeActive .reason div{
      position: relative;
      left: -20%;
   }
   .seeActive .reason div div:first-child,.candItem .candTitle div:first-child{
      z-index: 1;
   }
   .seeActive .reason div div:last-child{
      width: 4.06rem;
      height: .625rem;
      background: #ffea2a;
      position: relative;
      top: -8px;
      left: 28%;
   }
   .seeActive .reason textarea{
      width: 69%;
      margin:0 6.625rem 0 8.81rem;
   }
   .candTitle{
      display: flex;
      margin-left: 10%;
   }
   .candTitle div:last-child{
      width: 4.06rem;
      height: .625rem;
      background: #ffea2a;
      position: relative;
      top: 13px;
      left: -3rem;
   }
   .candCount{
      display: flex;
      text-align: center;
      line-height: 5.33rem;
      margin: 2.3rem 1.8rem 1rem 2.2rem;
      justify-content: space-between;
   }
   .candCount div:first-child{
      overflow: hidden;
      width: 5.33rem;
      height: 5.33rem;
      border-radius: 50%;
      display: table-cell;
   }
   .candCount div:first-child img{
      width: 5.33rem;
      height: 5.33rem;
   }
   .candCount div:last-child{
      margin: auto 0;
      width: 8rem;
      height: 2rem;
      line-height: 2rem;
      background: #ffde18;
      border-radius: 5px;
   }
   .acceBtn+div{
      display: inline-block;
      background: #000;
   }
   .acceBtn{
      margin: 1.85rem auto 1.85rem;
   }
   .payItem{
      width: 45.562rem;
      height: 33.125rem;
      border: 1px #000 solid;
      border-radius: 10px;
      background: #fff;
      margin: 0 auto;
   }
   .payCount{
      display: flex;
      justify-content: space-evenly;
   }
   .payCount div:first-child img{
      margin: 8.505rem 5.187rem 10.75rem 5.25rem;
      width: 2.75rem;
      height: 2.75rem;
   }
   .payCount div:nth-child(2) img{
      width: 16.25rem;
      height: 16.25rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
   }
   .payBtn{
      width: 8.125rem;
      height: 2.062rem;
      background: #ffde18;
      border-radius: 10px;
      text-align: center;
      line-height: 2.062rem;
      margin: 0 auto;
   }
   .poverItem,.perrItem{
      background: #fff;
   }
   .perrCount{
      display: flex;
      justify-content: space-evenly;
   }
   .perrCount h4{
      display: inline-block;
      margin-top: 2rem;
   }
   .perrBtn div{
      background: #ffde18;
      border-radius: 10px;
      text-align: center;
      line-height: 3.437rem;
      border: 2px #000 solid;
      margin: 0 auto;
   }
   .perrBtn div:first-child{
      width: 8.625rem;
      height: 3.437rem;
      margin-bottom: 1.875rem;
   }
   .perrItem div:last-child{
      width: 12.375rem;
      height: 3.437rem;
   }
</style>