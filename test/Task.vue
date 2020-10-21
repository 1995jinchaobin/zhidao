<template>
   <div class="task">
      <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
      <div class="search">
         <input type="text" class="searchItem" id="btn">
         <div>搜索</div>
         <div>发布任务</div>
      </div>
      <div class=card>
         <div></div>
         <div>
            <div>到期时间：</div>
            <div>全部</div>
            <div>1天内到期</div>
            <div>3内到期</div>
            <div>4-6天内到期</div>
            <div>7天以上到期</div>
         </div>
         <div style="width: 75%;margin: 0 auto;border:1px #7d7d7d dashed;"></div>
         <div>
            <div>投标状态：</div>
            <div>全部</div>
            <div>1人投标</div>
            <div>3人投标</div>
            <div>4-6人投标</div>
            <div>7人以上投标</div>
         </div>
         <div style="width: 75%;margin: 0 auto;border:1px #7d7d7d dashed;"></div>
         <div>
            <div>赏金托管：</div>
            <div>全部</div>
            <div>已托管</div>
            <div>未托管</div>
         </div>
         <div style="width: 75%;margin: 0 auto;border:1px #7d7d7d dashed;"></div>
         <div>
            <div>商家类型：</div>
            <div>全部</div>
            <div>个人</div>
            <div>企业</div>
         </div>
         <div></div>
      </div>
      <div class="sort">
         <div class="sortTime">
            <div>剩余时间</div>
            <div class="icon">
               <div class="iconTop iconTopB"></div>
               <div class="iconBottom"></div>
            </div>
         </div>
         <div class="sortPrice">
            <div>价格</div>
            <div class="icon">
               <div class="iconTop iconTopB"></div>
               <div class="iconBottom"></div>
            </div>
         </div>
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
         <div></div>
      </div>
      <ul class="pageBox" v-if="pageNumber!=0">
         <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
         <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
         <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
      </ul>
   </div>
</template>

<script>
import Tab from '../../components/Tab'
export default {
   name:'Task',
   components:{
      Tab
   },
   data(){
      return{
         path:'/Task',
         tabIndex:8,
         pargNumber:[1,2,3,4,5,6,7,8]
      }
   },
   methods:{
      changeEnglish(){

      },
      //1
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
   .searchItem+div:hover,.searchItem+div+div:hover{
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
   }
   .sortTime:hover,.sortPrice:hover{
      height: 46px;
      color: #f77729;
      box-shadow: 5px -5px 10px 1px rgba(126, 126, 129, 0.24);
   }
   .icon div{
      margin-bottom: 3px;
   }
   .iconTop{
      border-width: 10px;
      border-style: solid;
      border-color: #fff #fff #c2c2c5 #fff;
   }
   .iconTopB{
      border-color: #fff #fff #fd6413 #fff !important;
   }
   .iconBottom{
      border-width: 10px;
      border-style: solid;
      border-color: #c2c2c5#fff #fff #fff;
   }
   .iconBottomB{
      border-color: #fd6413#fff #fff #fff !important;
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
      background: #f77729;
      color: #fff;
      padding: 4px;
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
</style>