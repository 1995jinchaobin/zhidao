<template>
   <div class="task">
      <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
      <!-- 任务大厅 -->
      <div class="search">
         <input type="text" class="searchItem" id="btn">
         <div @click="sou()">搜索</div>
         <div @click="creat()">发布任务</div>
      </div>
      <div class=card>
         <div></div>
         <div>
            <div>到期时间：</div>
            <div v-for="(item,index) in timeList" :key="index" @click="timeChange($event)" :name="item.name">
               {{item.name}}
            </div>
         </div>
         <div style="width: 75%;margin: 0 auto;border:1px #7d7d7d dashed;"></div>
         <div>
            <div>投标状态：</div>
            <div v-for="(item,index) in biaList" :key="index" @click="timeChange($event)" :name="item.name">
               {{item.name}}
            </div>
         </div>
         <div style="width: 75%;margin: 0 auto;border:1px #7d7d7d dashed;"></div>
         <div>
            <div>赏金托管：</div>
            <div v-for="(item,index) in depositList" :key="index" @click="timeChange($event)" :name="item.name">
               {{item.name}}
            </div>
         </div>
         <div></div>
      </div>
      <div class="sort">
         <div class="sortTime" @click="typeChange($event)">
            <div>剩余时间</div>
            <div class="icon">
               <img class="iconTop" :src="sortTime ? top : top1">
               <img class="iconBottom" :src="sortTime ? bottom : bottom1">
            </div>
         </div>
         <div class="sortPrice" @click="priceChange($event)">
            <div>价格</div>
            <div class="icon">
               <img class="iconTop" :src="sortPrice ? top : top1">
               <img class="iconBottom" :src="sortPrice ? bottom : bottom1">
            </div>
         </div>
      </div>
      <div class="demand">
         <div style="margin-bottom: 5px;"></div>
         <div>
            <div class="title">需要花型</div>
            <div class="biao">招标</div>
            <div class="biao">已托管</div>
         </div>
         <div>
            <div class="price">￥2000</div>
            <div>0人已参与</div>
         </div>
         <div class="last">
            <div>需求*******</div>
             <div>还剩*天到期</div>
         </div>
         <div class="newBtn">投标</div>
         <div></div>
      </div>
      <div class="demand">
         <div style="margin-bottom: 5px;"></div>
         <div>
            <div class="title">需要花型</div>
            <div class="biao">招标</div>
         </div>
         <div>
            <div class="price">￥2000</div>
            <div>0人已参与</div>
         </div>
         <div class="last">
            <div>需求*******</div>
         </div>
         <div class="newBtn">投标</div>
         <div></div>
      </div>
      <ul class="pageBox" v-if="pageNumber!=0">
         <li ><img src="../../assets/image/cut/left.png" alt=""></li>
         <li :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
         <li><img src="../../assets/image/cut/right.png" ></li>
      </ul>
      <div class="creatTask" id="creatTask" style="display: none;">
         <div>
            <div class="title">
               <div>我的需求</div>
               <img src="../../assets/image/3d/close.png" @click="showTask()">
            </div>
            <div style="height: 8px;width: 100%;background: #ffde18;"></div>
            <div class="itemTitle">
               <div>标题</div>
               <input type="text" id="itemTitle">
            </div>
            <div class="itemCount">
               <div>我需要</div>
               <textarea id="itemCount" cols="20" rows="10" style="resize:none" ></textarea>
               <img src="../../assets/image/homepage/upload.png">
            </div>
            <div class="itemPrice">
               <div>
                  <div>预算金额&nbsp;&nbsp;</div>
                  <div>￥：<input type="text" id="priceY"></div>
               </div>
               <div>
                  <div>托管金额&nbsp;&nbsp;</div>
                  <div>￥：<input type="text" id="priceT"></div>
               </div>
            </div>
            <div class="itemPhone">
               <div>手机号</div>
               <div><input @blur="isPhone" type="number" id="phone" /><input id="code" :disabled="disChange" type="number" placeholder="请输入验证码" /><div>获取验证码</div><div id="errMsg" style="display: none;" class="errMsg">{{msg}}</div></div>
            </div>
            <div class="itemBtn" @click="pushTask()">确认发布</div>
         </div>
      </div>
      <Jump v-if="showJump" :title="err"></Jump>
      <Loading v-if="showLoading"></Loading>
   </div>
</template>

<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
   name:'Task',
   components:{
      Tab,
      Loading,
      Jump
   },
   data(){
      return{
         path:'/Task',
         tabIndex:9,
         page:[],
         showJump: false,
         showLoading: false,
         pageNumber:1,
         timeList:[{name:'全部'},{name:'1天内到期'},{name:'3天内到期'},{name:'4-6天内到期'},{name:'7天以上到期'}],
         biaList:[{name:'全部'},{name:'1人投标'},{name:'3人投标'},{name:'4-6人投标'},{name:'6人以上投标'}],
         depositList:[{name:'全部'},{name:'已托管'},{name:'未托管'}],
         // 排序箭头
         top:require("../../assets/image/top.png"),
         top1:require("../../assets/image/top1.png"),
         bottom:require('../../assets/image/bottom.png'),
         bottom1:require('../../assets/image/bottom1.png'),
         // 切换排序状态
         sortPrice:true,
         sortTime:true,
         // 控制分页器的显示隐藏
         count: true,
         // 页数
         cnt: 1,
         pageIndex: 1,
         flag: 0,
         msg:'',
         disChange: true
      }
   },
   methods:{
      // 获取搜索信息
      sou(){
         let msg = document.getElementById("btn").value;
         // console.log(msg)
      },
      // 发布任务
      creat(){
         let creatTask = document.getElementById("creatTask");
         creatTask.style.cssText = 'dispaly: hidden;'
      },
      // 初始化分类条件
      getName(){
         let all = document.getElementsByName("全部");
         for(let i = 0;i < all.length;i++){
            all[i].className = "active"
         }
      },
      changeEnglish(){
         this.$router.go(0);
      },
      // 分类查询切换
      timeChange(e){
         var p = e.target.parentElement.children;
         for ( var i =0,pl= p.length;i<pl;i++) {
            p[i].className = 'active';
            if (p[i] !== e.target) {
               p[i].className = '';
            };
         }
      },
      // 时间排序切换
      typeChange(e){
         if(this.sortTime){
            this.sortTime = false;
         }else{
            this.sortTime = true;
         }
      },
      // 价格排序切换
      priceChange(e){
         if(this.sortPrice){
            this.sortPrice = false;
         }else{
            this.sortPrice = true;
         }
      },
      // 初始化分页器
      pageAuto(){
         this.$forceUpdate();
         if(!this.page.length){
            if(this.pageNumber<=7){
               for(let i=0;i<this.pageNumber;i++){
                  this.page.push({name: i+1});
               }
            }else{
               this.page = [{name: 1},{name: 2},{name: 3},{name: 4}
               ,{name: 5},{name: '···'},{name: this.pageNumber}];
            }
         }
        },
      // 分页器每个点击
      btnClick(index){
         if(this.pageNumber<=7){
            this.flag = 0;
            this.cnt = index+1;
            if(this.showOnly){
               this.getOnlylist();
            }else{
               this.getProlist();
            }
            this.pageIndex = index+1;
         }else{
            // 状态0
            if(this.flag==0){
               if(index==5){

               }else if(index==4){
                  this.cnt = this.page[index].name;
                  if(this.pageNumber-this.cnt<=3){
                     this.flag = 2;
                     this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                     this.pageIndex = 7-(this.pageNumber-this.cnt);
                     if(this.showOnly){
                        this.getOnlylist();
                     }else{
                        this.getProlist();
                     }
                  }else{
                     this.flag = 1;
                     this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                     this.pageIndex = 4;
                     if(this.showOnly){
                        this.getOnlylist();
                     }else{
                        this.getProlist();
                     }
                  }
               }else if(index==6){
                  this.cnt = this.page[index].name;
                  this.flag = 2;
                  this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                  this.pageIndex = 7;
                  if(this.showOnly){
                        this.getOnlylist();
                  }else{
                        this.getProlist();
                  }
               }else{
                  this.cnt = this.page[index].name;
                  this.pageIndex = index+1;
                  if(this.showOnly){
                        this.getOnlylist();
                  }else{
                        this.getProlist();
                  }
               }
            }else if(this.flag==1){
               if(index==1||index==5){

               }else{
                  this.cnt = this.page[index].name;
                  if(this.cnt<=4){
                        // 点击首页
                        this.pageIndex = this.cnt;
                        this.flag = 0;
                        if(this.showOnly){
                           this.getOnlylist();
                        }else{
                           this.getProlist();
                        }
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                  }else if((this.pageNumber-this.cnt)<=4){
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.flag = 2;
                        if(this.showOnly){
                           this.getOnlylist();
                        }else{
                           this.getProlist();
                        }
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                  }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                           this.getOnlylist();
                        }else{
                           this.getProlist();
                        }
                  }
               }
            }else if(this.flag==2){
               if(index==1){

               }else if(index==2){
                  this.cnt = this.page[index].name;
                  if(this.cnt<=4){
                        this.flag = 0;
                        this.pageIndex = this.cnt;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                           this.getOnlylist();
                        }else{
                           this.getProlist();
                        }
                  }else{
                        this.flag = 1;
                        this.pageIndex = 4;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        if(this.showOnly){
                           this.getOnlylist();
                        }else{
                           this.getProlist();
                        }
                  }
               }else if(index==0){
                  this.cnt = this.page[index].name;
                  this.flag = 0;
                  this.pageIndex = 1;
                  this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                  if(this.showOnly){
                        this.getOnlylist();
                  }else{
                        this.getProlist();
                  }
               }else{
                  this.cnt = this.page[index].name;
                  this.flag = 2;
                  this.pageIndex = 7 - (this.pageNumber - this.cnt);
                  this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                  if(this.showOnly){
                        this.getOnlylist();
                  }else{
                        this.getProlist();
                  }
               }
            }
         }
      },
      prev(){
         let self = this;
         if(this.pageNumber<=7){
               this.flag = 0;
               if(this.cnt==1){
                  this.showJump = true;
                  this.err = "已经是第一页了";
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1000);
               }else{
                  this.cnt-=1;
                  this.pageIndex-=1;
                  if(this.showOnly){
                     this.getOnlylist();
                  }else{
                     this.getProlist();
                  }
               }
         }else{
               if(this.cnt!=1){
                  this.cnt--;
                  if(this.pageNumber-this.cnt<=3){
                     this.flag = 2;
                     this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                     this.pageIndex = 7-(this.pageNumber-this.cnt);
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                  }else if(this.cnt<=4){
                     this.flag = 0;
                     this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                     this.pageIndex = this.cnt;
                  }else{
                     this.flag = 1;
                     this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                     this.pageIndex = 4;
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                  }
               }else{
                  this.showJump = true;
                  this.err = "已经是第一页了";
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1000);
               }
         }
      },
      // 下一页
      next(){
         let self = this;
         if(this.pageNumber<=7){
               this.flag = 0;
               if(this.cnt<this.pageNumber){
                  this.cnt+=1;
                  this.pageIndex+=1;
                  if(this.showOnly){
                     this.getOnlylist();
                  }else{
                     this.getProlist();
                  }
               }else{
                  this.showJump = true;
                  this.err = "已经是最后一页了";
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1000);
               }
         }else{
               if(this.cnt<this.pageNumber){
                  this.cnt++;
                  if(this.pageNumber-this.cnt<=3){
                     this.flag = 2;
                     this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                     this.pageIndex = 7-(this.pageNumber-this.cnt);
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                  }else if(this.cnt<=4){
                     this.flag = 0;
                     this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                     this.pageIndex = this.cnt;
                  }else{
                     this.flag = 1;
                     this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                     if(this.showOnly){
                           this.getOnlylist();
                     }else{
                           this.getProlist();
                     }
                     this.pageIndex = 4;
                  }
               }else{
                  this.showJump = true;
                  this.err = "已经是最后一页了";
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1000);
               }
         }
      },
      getClassifyList(){
         let formData = new FormData();
         let self = this;
         formData.append('id',4);
         let obj = {
               url: this.all.baseUrl + '/config/info',
               formdata: formData
         }
         this.getData(obj).then(res=>{
               if(res.data.status==0){
                  let result = res.data.result;
                  this.classifyList.type = JSON.parse(result.json1).pdMenu;
                  this.classifyList.style = JSON.parse(result.json2).pdStyle;
                  this.classifyList.type.map(function(item){
                     item.active = false;
                     item.show = false;
                     item.list.map(function(listItem){
                           listItem.active = false;
                           listItem.numArr = [{show: false,num: 1},{show: false,num: 2},{show: false,num: 3},{show: false,num: 4},{show: false,num: 5}];
                     });
                  });
                  this.classifyList.style.map(function(item){
                     item.active = false;
                  });
               }else if(res.data.status==-95){
                  this.showJump = true;
                  this.err = '您的账号已在其它地方登陆';
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
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
      download(index){
         let self = this;
         this.showLoading = true;
         let json = {
               backId: this.list[index].backId,
               background: this.list[index].background,
               elements: []
         };
         if(!json.backId){
               json.backId = -1;
         }
         if(this.list[index].background){
               json.background = this.list[index].background;
         }else if(this.message.background){
               json.background = this.message.background;
         }else{
               json.background = '';
         }
         this.list[index].elements.map(function(item){
               let o = {
                  flip: item.flip,
                  order: item.order,
                  height: item.height*900/7087,
                  width: item.width*600/4724,
                  posX: item.posX,
                  posY: item.posY,
                  rotation: item.rotation,
                  imageUrl: item.imageUrl,
                  id: item.id,
                  zoom: item.zoom
               }
               json.elements.push(o);
         });
         let formData = new FormData();
         formData.append('data',JSON.stringify(json));
         let obj = {
               url: this.all.baseUrl+'/auto/aiHd',
               formdata: formData
         }
         this.getData(obj).then(res=>{
               this.showLoading = false;
               if(res.data.status==0){
                  window.location.href= this.all.baseUrl+"/file/download?url="+res.data.result;
               }else if(res.data.status==-95){
                  this.showJump = true;
                  this.err = '您的账号已在其它地方登陆';
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                     localStorage.clear();
                     self.$router.push({
                           path: '/Login'
                     });
                  },1500); 
               }else{
                  this.showJump = true;
                  this.err = res.data.msg;
                  Scroll.stop();
                  setTimeout(function(){
                     self.showJump = false;
                     self.err = '';
                     Scroll.move();
                  },1500);
               }
         });
      },
      // 关闭发布任务窗口
      showTask(){
         let creatTask = document.getElementById("creatTask");
         document.getElementById("itemTitle").value = '';
         document.getElementById("itemCount").value = '';
         document.getElementById("priceY").value = '';
         document.getElementById("priceT").value = '';
         document.getElementById("phone").value = '';
         document.getElementById("code").value = '';
         let errMsg = document.getElementById("errMsg");
         errMsg.style.cssText = "display: none";
         creatTask.style.cssText = 'display: none';
         this.disChange = true;
      },
      // 验证手机号码
      isPhone(e){
         const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
         let phone = e.target.value;
         let errMsg = document.getElementById("errMsg");
         this.msg = '';
         if( !myreg.test(phone) ){
            this.msg = '手机号码错误';
            errMsg.style.cssText = 'display: hidden;background: red;';
            this.disChange = true;
         }else{
            this.msg = '手机号码正确'
            errMsg.style.cssText = 'display: hidden;background: #27c500;';
            this.disChange = false;
         }
      },
      // 发布任务
      pushTask(){
         let itemTitle = document.getElementById("itemTitle").value;
         let itemCount = document.getElementById("itemCount").value;
         let pirceY = document.getElementById("priceY").value;
         let priceT = document.getElementById("priceT").value;
         let phone = document.getElementById("phone").value;
         let code = document.getElementById("code").value;
         console.log(itemTitle+'--'+itemCount+'--'+priceT+'--'+pirceY+'--'+phone+'--'+code)
      },
   },
   mounted(){
      localStorage.setItem('path',this.path);
      if(localStorage.getItem('English')){
         this.$router.push({
               path: '/Enai'
         });
      }else{
         this.$router.push({
               path: '/Task'
         });
      }
      this.getName()
   }
}
</script>

<style scoped>
   .task{
      background:#eeeeee;
      color: #7d7d7d;
      min-height: 100vh;
   }
   .search{
      display: flex;
      margin-top: 1%;
      margin-left: 18%;
      text-align: center;
      line-height: 42px;
      height: 42px;
   }
   .searchItem{
      width: 742px;
      border: 4px #000 solid;
      font-size: 20px;
      background: #eeeeee;
      color: #b8b8bc;
   }
   .searchItem+div{
      width: 100px;
      border: 4px #000 solid;
      border-left: none;
      background: #ffde18;
      line-height: 37px;
   }
   .searchItem+div+div{
      margin-left: 50px;
      width: 248px;
      background: #000;
      color: #ffde18;
   }
   /* 修改鼠标移入样式 */
   .searchItem+div:hover,.searchItem+div+div:hover,.newBtn,.itemBtn:hover,.creatTask .itemPhone>div+div div:hover,.creatTask .title img:hover{
      cursor: pointer;
   }
   .card,.sort,.demand{
      width: 70%;
      margin: 1% auto;
      background: #fff;
   }
   .card>div{
      width: 60%;
      margin: 1% auto;
      display: flex;
   }
   .card>div>div{
      width: 13%;
      margin-right: 2%;
      text-align: left;
   }
   .active{
      color: #f77729;
   }
   .sort{
      display: flex;
      height: 42px;
      text-align: center;
      line-height: 42px;
   }
   .sortTime,.sortPrice{
      width: 25%;
      display: flex;
      justify-content: space-around;
      transition: all 0.5s;
   }
   .sortTime:hover,.sortPrice:hover{
      height: 46px;
      color: #f77729;
      box-shadow: 5px -5px 10px 1px rgba(126, 126, 129, 0.24);
   }
   .icon img{
      position: relative;
   }
   .icon .iconTop{
      top: -5px;
      left: 22px;
   }
   .icon .iconBottom{
      top: 5px;
      left: 10px;
   }
   .demand{
      color: #c2c2c5;
      font-size: 14px;
      transition: all 0.5s;
   }
   .demand>div{
      display: flex;
      margin-left: 5%;
   }
   .demand>div>div{
      margin-right: 5%;
      margin-top: 2%;
   }
   .demand .biao{
      width: 55px;
      height: 20px;
      background: #f77729;
      color: #fff;
      font-size: 14px;
   }
   .demand .title{
      font-size: 16px;
      color: #000;
   }
   .demand .price{
      font-size: 15px;
      color: #fd6413;
   }
   .demand .last{
      margin-bottom: 1%;
   }
   .demand:hover{
      width: 73%;
      box-shadow: 1px 1px 10px 1px rgba(126, 126, 129, 0.466);
   }
   /* 发布任务 */
   .creatTask{
      position: absolute;
      top: 0;
      width: 100%;
      min-height: 80vh;
      background: #71717487;
      z-index: 999;
   }
   .creatTask>div{
      width: 55.20%;
      min-width: 692px;
      height: 700px;
      margin: 10% auto;
      background: #fff;
   }
   .creatTask .title,.creatTask .itemTitle,.creatTask .itemCount,.creatTask .itemPrice,.creatTask .itemPrice>div,.creatTask .itemPhone,.creatTask .itemPhone>div{
      display:flex;
      margin-left: 8.49%;
   }
   .creatTask .title{
      justify-content: space-between;
      height: 40px;
   }
   .creatTask .title div{
      margin-top: .5%;
   }
   .creatTask .title img{
      width: 20px;
      height: 20px;
      margin-top: 1%;
      margin-right: 1.49%;
   }
   .creatTask .itemTitle{
      margin-top: 3%;
      margin-bottom: 2%;
   }
   .creatTask .itemTitle div,.creatTask .itemCount div{
      width: 8%;
      text-align: left;
   }
   .creatTask .itemCount textarea{
      width: 40%;
   }
   .creatTask .itemCount img{
      margin-left: 3%;
      width: 15%;
      height: 13%;
   }
   .creatTask .itemPrice,.creatTask .itemPhone{
      margin-left: 0;
      margin-top: 3%;
   }
   .creatTask .itemPrice>div>div+div{
      border: 1px #000 solid;
   }
   .creatTask .itemPrice>div>div+div input{
      border: none;
      outline: none;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
   }
   input[type="number"] {
      -moz-appearance: textfield;
   }
   .creatTask .itemPhone div+div{
      margin-left: 2.4%;
   }
   .creatTask .itemPhone>div+div div{
      background: #000;
      width: 110px;
      height: 24px;
      color: #ffde18;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
   }
   .creatTask .itemBtn{
      width: 200px;
      height: 43px;
      background: #ffde18;
      color: #000;
      text-align: center;
      line-height: 43px;
      margin: 8% auto 0;
   }
   /* 提示信息 */
   .creatTask .itemPhone>div+div div.errMsg{
      color: #fff;
   }
   /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 5.5rem;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        box-shadow: .125rem .125rem .125rem #ddd;
        border-radius: 50%;
        margin: 0 .3125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    ul.pageBox li.click{
        background: #133ffc;
        color: #fff;
    }
    ul.pageBox li.sureList{
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        font-size: .625rem;
        margin-left: 11.25rem;
        text-align: center;
        border-radius: 1.25rem;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    .demand .newBtn{
      position: relative;
      display: inline-block;
      top: -6rem;
      left: 38%;
      width: 116px;
      height: 36px;
      background: #f77729;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      color: #fff;
    }
</style>