<template>
  <div class="invoice">
    <div class="title"><span>我的发票</span></div>
    <div class="hrader">
      <div>
        <div class="hraderItem">
          <div class="itemTitle">已开发票金额</div>
          <div class="itemCount">
            <span>{{solvedInvoice}}</span>元
          </div>
        </div>
      </div>
      <div>
        <div class="hraderItem">
          <div class="itemTitle">未开发票金额</div>
          <div class="itemCount">
            <span>{{unSolvedInvoice}}</span>元
          </div>
        </div>
        <div class="hraderBtn" @click="popHidd">申请开票</div>
      </div>
    </div>
    <div class="count">
      <div class="countTitle">
        <div class="firstTitle">发票抬头<input type="text" v-model="searchTitle"></div>
        <div>状态
          <!--<select ref="status">-->
            <!--<option value="all">全部</option>-->
            <!--<option value="volvo">未审核</option>-->
            <!--<option value="saab">已寄出</option>-->
            <!--<option value="opel">已送达</option>-->
          <!--</select>-->
          <select v-model="state" >
            <option v-for="option in options" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div>申请日期<input v-model="startTime" type="date" style="margin-right: 20px">至<input v-model="endTime" type="date"></div>
        <div class="countTitleBtn" @click="getList">搜索</div>
      </div>
      <div class="countTab">
        <table>
          <tr class="tabTitle">
            <td>发票抬头</td>
            <td>发票金额</td>
            <td>状态</td>
            <td>申请时间</td>
            <td>税号</td>
            <td class="noneTd"></td>
          </tr>
          <tr v-if="proList.length >0" v-for="(item,index) in proList" :key="index">
            <td>{{item.title}}</td>
            <td>{{item.price}}</td>
            <td>{{stateList[item.state]}}</td>
            <td>{{item.create_time}}</td>
            <td>{{item.duty_paragraph}}</td>
            <td class="noneTd"></td>
          </tr>
        </table>
        <div v-if="proList.length==0" class="noData">
          <img src="../../assets/image/user/Emoji.png" alt="">
          <div>空空如也</div>
        </div>
      </div>
      <!--分页-->
      <ul class="pageBox" v-if="proList.length>0">
        <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
        <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
        <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
      </ul>
    </div>
    <div class="model" v-if="showBox==true">
      <div class="popUp" id='popUp'>
        <div class="popTitle">
          <div>申请发票</div>
          <!--关闭按钮-->
          <img class="closeBtn" @click="closeBox" src="../../assets/image/banquan/guanbi.png"/>
        </div>
        <!--<div class="hint">申请开票金额请在未开发票金额内</div>-->
        <div class="popItem">
          <div>
            <span>*</span><span>发票金额</span>
          </div>
          <div>
            <input v-model="price" min="100" type="number" placeholder="请填入发票金额"><img :src="err" style="display: none;" id="alert">
          </div>

        </div>
        <div class="popItem">
          <div>
            <span>*</span><span>发票类型</span>
          </div>
          <div class="popType">
            <div>
              <div @click="iconShow(0)" class="popIcon"><div v-if="invoiceType==0"></div></div>
              <div>个人普通发票</div>
            </div>
            <div>
              <div @click="iconShow(1)" class="popIcon"><div v-if="invoiceType==1"></div></div>
              <div>企业普通发票</div>
            </div>
          </div>
        </div>
        <div class="popItem">
          <div>
            <span>*</span><span>发票抬头</span>
          </div>
          <div>
            <input v-model="title" type="text">
          </div>
        </div>
        <div class="popItem">
          <div>
            <span></span><span>纳税人识别号</span>
          </div>
          <div>
            <input v-model="duty_paragraph" type="text">
          </div>
        </div>
        <div class="popItem">
          <div>
            <span>*</span><span>收件地址</span>
          </div>
          <div>
            <input v-model="address" type="text">
          </div>
        </div>
        <div class="popItem">
          <div>
            <span>*</span><span>联系人方式</span>
          </div>
          <div>
            <input v-model="phone" type="text">
          </div>
        </div>
        <div class="popItem hint2">
          <div>发票寄送方式</div>
          <div>快递到付（快递发票由快递公司提供）</div>
        </div>
        <div class="popBtn" @click="applyInvoice">立即申请</div>
      </div>
    </div>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Jump from '../../components/Jump';
import Loading from '@/components/Loading';
import Scroll from '@/assets/js/scroll.js';
import InfoBox from '@/components/common/InfoBox';
export default {
  name:'invoice',
  components:{
    Jump,
    Loading,
    InfoBox
  },
  data(){
    return{
      showJump: false,
      err: '',
      tabIndex: null,
      showLoading: false,
      // 分页器
      page: [], 
      cnt: 1,
      pageNumber: '',
      flag: 0,
      pageIndex: 1,
      // 错误提示
      none:'',
      err: require("../../assets/image/user/cuowu.png"),
      correct: require("../../assets/image/user/querenzhengque.png"),
      //已开发票金额
      solvedInvoice:0,
      //未开发票金额
      unSolvedInvoice:0,
      //抬头
      searchTitle:'',
      stateList:['未审核','已寄出','已送达'],
      options:[
          {text:'全部',value:''},
          {text:'未审核',value:0},
          {text:'已寄出',value:1},
          {text:'已送达',value:2}
      ],
      //状态0未审核1已寄出2已送达
      state:'',
      //开始时间
      startTime:'',
      //结束时间
      endTime:'',
      proList:[],
      showBox:false,
      //开票金额
      price:100,
      //0个人1企业
      invoiceType:0,
      //抬头
      title:'',
      //税号
      duty_paragraph:'',
      //收件地址
      address:'',
      //联系方式
      phone:'',
      //是否显示提示框-1不显示，0:显示成功，1：显示警告
      showInfo:-1,
      errMsg:'',
      succMsg:'',
        checkedImg:require("../../assets/image/user/flower-checked.png"),
        uncheckImgUrl:require("../../assets/image/user/flower-uncheck.png"),
    }
  },
  methods:{
    exp(e){
      let img = document.getElementById("alert");
      let value = e.target.value;
      if(value <= 200 && value != ''){
        img.src = this.correct;
        img.style.cssText = "display: hidden;"
      }else if(value > 200){
        img.src = this.err;
        img.style.cssText = "display: hidden;"
      }else{
        console.log(1)
        img.style.cssText = "display: none;"
      }
    },
    iconShow(type){
      this.invoiceType = type;
    },
    popShow(){
      let pop = document.getElementById("popUp");
      pop.style.cssText = "height: 0;"
    },
    popHidd(){
      this.showBox = true;
    },
    //查询已/未开发票金额
    getInfo(){
        let self = this;
        //请求接口
        let formDataBalance = new FormData();
        let obj = {
            url: this.all.baseUrl + '/new/invoice/getInvoicePrice',
            formdata: formDataBalance
        }
        self.getData(obj).then(res=>{
            if(res.data.status==0){
                self.solvedInvoice = res.data.result.opened_price;
                self.unSolvedInvoice = res.data.result.unbilled_price;
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
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },500);
            }
        });
    },
    //查询开票记录
    getList(){
        let self = this;
        Scroll.stop();
        let formData = new FormData();
        let obj = {};
        let startTime = self.startTime;
        let endTime = self.endTime;
        if(startTime!='' && endTime!=''&&endTime<startTime){
            self.errMsg = '开始时间不能迟于结束时间';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(startTime!=''){
            startTime = Scroll.changeDateWay(startTime)+' 00:00:00';
        }
        if(endTime!=''){
            endTime = Scroll.changeDateWay(endTime)+' 23:59:59';
        }
        this.showLoading = true;
        formData.append('pageSize',10);
        formData.append('page',self.cnt);
        formData.append('title',self.searchTitle);
        formData.append('state',self.state);
        formData.append('startTime',startTime);
        formData.append('endTime',endTime);
        obj.url = this.all.baseUrl + '/new/invoice/getInvoices';
        obj.formdata = formData;
        self.getData(obj).then(res=>{
            self.showLoading = false;
            Scroll.move();
            let result;
            if(res.data.status==0){
                result = res.data.result;
                self.proList = result.list;
                if(self.proList.length>0){
                    for(var i =0 ; i< self.proList.length;i++){
                        self.proList[i].create_time = Scroll.changeDate(self.proList[i].create_time);
                    }
                }
                self.pageNumber = result.pages;
                self.pageAuto();
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
    // 初始化分页器
    pageAuto(){
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
            this.getList();
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
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.getList();
                        this.pageIndex = 4;
                    }
                }else if(index==6){
                    this.cnt = this.page[index].name;
                    this.flag = 2;
                    this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                    this.getList();
                    this.pageIndex = 7;
                }else{
                    this.cnt = this.page[index].name;
                    this.getList();
                    this.pageIndex = index+1;
                }
            }else if(this.flag==1){
                if(index==1||index==5){

                }else{
                    this.cnt = this.page[index].name;
                    if(this.cnt<=4){
                        // 点击首页
                        this.pageIndex = this.cnt;
                        this.flag = 0;
                        this.getList();
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                    }else if((this.pageNumber-this.cnt)<=4){
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.flag = 2;
                        this.getList();
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.getList();
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
                        this.getList();
                    }else{
                        this.flag = 1;
                        this.pageIndex = 4;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.getList();
                    }
                }else if(index==0){
                    this.cnt = this.page[index].name;
                    this.flag = 0;
                    this.pageIndex = 1;
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                    this.getList();
                }else{
                    this.cnt = this.page[index].name;
                    this.flag = 2;
                    this.pageIndex = 7 - (this.pageNumber - this.cnt);
                    this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                    this.getList();
                }
            }
        }
    },
    // 上一页
    prev(){
        let self = this;
        if(this.pageNumber<=7){
            this.flag = 0;
            if(this.cnt==1){
                this.showPageJump = true;
                this.err = '已经是第一页了!';
                setTimeout(function(){
                    self.showPageJump = false;
                    self.err = '';
                },1500);
            }else{
                this.cnt-=1;
                this.pageIndex-=1;
                this.getList();
            }
        }else{
            if(this.cnt!=1){
                this.cnt--;
                if(this.pageNumber-this.cnt<=3){
                    this.flag = 2;
                    this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                    this.pageIndex = 7-(this.pageNumber-this.cnt);this.getList();
                }else if(this.cnt<=4){
                    this.flag = 0;
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                    this.pageIndex = this.cnt;
                    this.getList();
                }else{
                    this.flag = 1;
                    this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                    this.pageIndex = 4;
                    this.getList();
                }
            }else{
                this.showPageJump = true;
                this.err = '已经是第一页了!';
                setTimeout(function(){
                    self.showPageJump = false;
                    self.err = '';
                },1500);
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
                this.getList();
            }else{
                this.showPageJump = true;
                this.err = '最后一页了';
                setTimeout(function(){
                    self.showPageJump = false;
                    self.err = '';
                },1500);
            }
        }else{
            if(this.cnt<this.pageNumber){
                this.cnt++;
                if(this.pageNumber-this.cnt<=3){
                    this.flag = 2;
                    this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                    this.pageIndex = 7-(this.pageNumber-this.cnt);
                    this.getList();
                }else if(this.cnt<=4){
                    this.flag = 0;
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                    this.pageIndex = this.cnt;
                    this.getList();
                }else{
                    this.flag = 1;
                    this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                    this.pageIndex = 4;
                    this.getList();
                }
            }else{
                this.showPageJump = true;
                this.err = '最后一页了';
                setTimeout(function(){
                    self.showPageJump = false;
                    self.err = '';
                },1500);
            }
        }
    },
    closeBox(){
        this.showBox = false;
    },
    //申请发票按钮
    applyInvoice(){
        let self = this;
        //验证
        if(self.price==''){
            self.errMsg = '请填写开票金额';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(self.price<100){
            self.errMsg = '开票金额必须大于零';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(self.title==''){
            self.errMsg = '请填写发票抬头';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(self.invoiceType==1 && self.duty_paragraph==''){
            self.errMsg = '请填写纳税人识别号';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(self.address==''){
            self.errMsg = '请填写收件地址';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(self.phone==''){
            self.errMsg = '请填写联系方式';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        if(!Scroll.isPoneAvailable(self.phone)){
            self.errMsg = '请填写正确的收件电话';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        this.showLoading = true;
        Scroll.stop();
        let formData = new FormData();
        let obj = {};
        formData.append('price',self.price);
        formData.append('type',self.invoiceType);
        formData.append('title',self.title);
        formData.append('duty_paragraph',self.duty_paragraph);
        formData.append('address',self.address);
        formData.append('phone',self.phone);
        obj.url = this.all.baseUrl + '/new/invoice/addInvoice';
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
                    //关闭该页面
                    self.showBox=false;
                    //重新请求数据
                    self.getList();
                    self.getInfo();
                    self.showInfo = -1;
                    self.errMsg = '';
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
    //搜索
    searchList(){
      //处理时间
        this.startTime
       this.getList();
    }
  },
  mounted(){
      this.getInfo();
      this.getList();
  }
}
</script>

<style scoped>
  .invoice{
    width:984px;
    height: 100vh;
    background: #fff;
  }
  .title{
    height: 48px;
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    background: #fff;
    justify-content: space-between;
  }
  .title span{
    margin-top: 24px;
    font-size: 14px;
    color: #040404;
    width: 56px;
    margin-top: 20px;
    margin-left: 3%;
  }
  .hrader{
    width: 894px;
    height: 78px;
    margin: 50px auto 32px;
    display: flex;
    background: #FFFFFF;
    box-shadow: 2px -2px 27px 0 rgba(126,126,129,0.15);
    border-radius: 6px;
  }
  .hrader>div{
    width: 50%;
    text-align: left;
  }
  .hrader>div+div{
    display: flex;
    border-left: 1px dashed #00000029;
  }
  .hraderItem{
    margin-left: 40px;
    margin-top: 5px;
  }
  .hraderItem .itemTitle{
    width: 101px;
    height: 20px;
    font-size: 14.04px;
    color: #010002;
    margin-bottom: 10px;
  }
  .hraderItem .itemCount{
    font-size: 12.01px;
    color: #010002;
  }
  .hraderItem .itemCount span{
    width: 91px;
    height: 21px;
    font-size: 26.08px;
    color: #FB6413;
    margin-right: 5px;
  }
  .hrader .hraderBtn{
    width: 79.8px;
    height: 22.1px;
    font-size: 14.04px;
    line-height: 22.1px;
    text-align: center;
    color: #010002;
    border: 1px solid #171717;
    border-radius: 5px;
    margin: 22px 110px;
    cursor: pointer;
  }
  .hraderBtn:hover{
    background-color: #eee;
  }
  .countTitle{
    width: 988px;
    height: 33px;
    display: flex;
    background: #EEEEEE;
    line-height: 33px;
    font-size: 14.04px;
    color: #3E3E40;
  }
  .countTitle div{
    margin-left: 21px;
  }
  .countTitle input{
    width: 113px;
    height: 20px;
    background: #FCFCFC;
    border: 1px solid rgba(151,151,151,0.44);
    margin-left: 20px;
    text-indent: 5px;
  }
  input,select{
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .countTitle select{
    width: 113px;
    height: 20px;
    margin: auto 0;
    margin-left: 20px;
  }
  .countTitleBtn{
    width: 52px;
    height: 20px;
    background: #C9C7C7;
    border: 1px solid rgba(151,151,151,0.44);
    margin: auto 0;
    text-align: center;
    line-height: 20px;
    color: #3E3E40;
    margin-left: 17px !important;
    cursor: pointer;
  }
  .countTab{
    width: 988px;
  }
  .countTab Table{
    width: 988px;
    border-collapse:collapse;
    margin: 0 auto;
    font-size: 14.04px;    
  }
  .countTab table tr{
    margin:0;
    padding:0;
    height: 33px;
  }
  .countTab Table tr.tabTitle{
    background: #e2e2e2;
  }
  .noneTd{
    width: 100px;
  }
  .popUp{
    width: 640px;
    height: 531px;
    background: #FAFAFA;
    margin: 0 auto;
    position: absolute;
    top: calc(50vh - 265px);
    left: calc(50% - 320px);
    transition: all 0.5s;
    font-weight: bold;
    font-size: 14px;
  }
  .popTitle{
    width: 640px;
    height: 50px;
    background: #F2F2F2;
    display: flex;
    font-family: SourceHanSansCN-Medium;
    font-size: 14.04px;
    color: #010002;
    letter-spacing: 0;
  }
  .popTitle>div:first-child{
    margin: 15px 41px;
  }
  .popTitle>div:last-child{
    width: 20px;
    height: 20px;
    background: url('../../assets/image/user/guanbi.png') no-repeat center center;
    background-size: 100%;
    position: absolute;
    top: 17px;
    left: 588px;
  }
  .hint{
    font-size: 14.04px;
    color: #AEAEAF;
    margin: 6px 0;
    font-weight: bold;
  }
  .popItem,.hint2{
    display: flex;
    justify-content: center;
    height: auto !important;
    color: #010002;
  }
  .popItem>div{
    width: 150px;
    height: 40px;
    margin: 8px 0;
    margin-right: 20px;
    text-align: right;
  }
  .popItem>div>span:first-child{
    font-size: 24px;
    color: #B74032;
  }
  .popItem>div>span:last-child{
    color: #010002;
  }
  .hint2>div:last-child{
    line-height: 25px;
    font-size: 14.04px;
    color: #979797;
  }
  .popItem>div+div{
    width: 400px;
    text-align: left;
  }
  .popItem>div+div input{
    width: 326px;
    height: 34px;
    background: #FFFFFF;
    border: 1px solid #979797;
    border-radius: 2px;
    font-size: 14px;
    text-indent: 14px;
    font-weight: bold;
  }
  .popType{
    display: flex;
    font-size: 14.04px;
    color: rgba(1,0,2,0.45);
    position: relative;
    top: 9px;
  }
  .popType>div{
    display: flex;
    margin-right: 63px;
  }
  .popIcon{
    width: 14px;
    height: 14px;
    border: 1px solid #979797;
    border-radius: 50%;
    margin-right: 5px;
  }
  .popIcon div{
    width: 10px;
    height: 10px;
    background: #0c0c0c64;
    border-radius: 50%;
    text-align: center;
    margin: 2px;
  }
  .popBtn{
    width: 130px;
    height: 36px;
    background: #FFE135;
    font-size: 14.04px;
    color: #242424;
    line-height: 36px;
    position: relative;
    /*top: 449px;*/
    /*left: 255px;*/
    margin: 31px auto 0 ;
  }
  .popBtn:hover{
    background-color: #ffd000;
  }
  #alert{
    position: relative;
    top: 4px;
    left: 7px;
  }
  .checkBox{
    width: 16px;
    height: 16px;
    background-image: url("../../assets/image/user/flower-uncheck.png");
    background-size: 100%;
    position: absolute;
    top: 7px;
    left: 10px;
    display: none;
  }
  .firstTitle{
    margin-left: 101px !important;
  }
  /* 分页器 */
  ul.pageBox{
    /*padding-bottom: 3.125rem;*/
    display: flex;
    margin-top: 36px;
    justify-content: center;
    align-items: center;
  }
  ul.pageBox li{
    width: 1.875rem;
    height: 1.875rem;
    font-size: .875rem;
    color: #333;
    box-shadow: .125rem .125rem .125rem #ddd;
    border-radius: 50%;
    margin: 0 .7125rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  ul.pageBox li.click{
    background: #000;
    color: #fff;
  }
  ul.pageBox li img{
    display: block;
    width: .5rem;
    height: 1rem;
    margin: .625rem auto;
  }
  table{
    font-size: 14.04px;
    color: #3E3E40;
  }
  /* 弹窗样式 */
  .model{
    position: fixed;
    z-index: 9999;
    top: 0;
    height: 100vh;
    width: 100%;
    left: 0;
    background: rgba(0,0,0,0.4);
  }
  .model .closeBtn{
     width: 30px;
     height: 30px;
     position: relative;
     left: 510px;
   }
  /* 没有数据 */
  .noData{
    /*display: flex;*/
    /*justify-content: center;*/
    align-items: center;
    font-size: 1rem;
    margin-top: 15rem;
  }
  .noData img{
    margin-right: 1.25rem;
  }
  .noData span{
    margin-top: 1.25rem;
  }
</style>