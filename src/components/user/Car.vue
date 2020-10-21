<template>
    <div class="car">
        <!-- 我的订单 -->
        <!-- <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab> -->
        <!-- <Usertab v-on:setUserIndex="getUserIndex" :arr="arr"></Usertab> -->
        <div class="content">
            <div class="titleBox">
                <div>购物车</div>
                <!--<div :data-show="0" @click="delClick($event)">编辑</div>-->
            </div>
            <div class="flower">
                <ul class="proList" v-if="list.length">
                    <li  v-for="(item,index) in list" :key="index">
                        <div class="main">
                            <div class="leftBox" @click="listClick(index)">
                                <input  class="liNum" style="cursor: pointer" :checked="item.show" :data-id="item.patternsSoldByMallSellers.id" type="checkbox">
                                <span class="backImg"></span>
                            </div>
                            <div v-if="userIndex==1" class="imgBox"><img :src="item.patternsSoldByMallSellers.picture1" alt=""></div>
                            <div v-if="userIndex==0" class="imgBox"><img :src="item.app3dFlowerTypeJygModel.preview" alt=""></div>
                            <div class="descriptBox">
                                <div class="countName" v-if="userIndex==1" for="">
                                    <span class="special">{{item.patternsSoldByMallSellers.shop_name}}</span>
                                </div>
                                <div class="countItem">
                                    <div v-if="userIndex==0" for="">
                                        <span>编号：</span>
                                        <span>{{item.app3dFlowerTypeJygModel.id}}</span>
                                    </div>
                                    <div v-if="userIndex==1" for="">
                                        <span>编号：</span>
                                        <span>{{item.patternsSoldByMallSellers.id}}</span>
                                    </div>
                                    <div v-if="userIndex==0" for="">
                                        <span>分辨率：</span>
                                        <span>{{item.app3dFlowerTypeJygModel.resolution_ratio}}</span>
                                    </div>
                                    <div v-if="userIndex==1" for="">
                                        <span>分辨率：</span>
                                        <span>{{item.patternsSoldByMallSellers.resolution_ratio}}</span>
                                    </div>
                                </div>
                                <div class="countItem">
                                    <div for="">
                                        <span>格式：</span>
                                        <span v-if="userIndex==1">psd</span>
                                        <span v-if="userIndex==0">{{item.app3dFlowerTypeJygModel.format}}</span>
                                    </div>
                                    <div v-if="userIndex==0" for="">
                                        <span>尺寸：</span>
                                        <span>{{item.app3dFlowerTypeJygModel.size_width}}×{{item.app3dFlowerTypeJygModel.size_height}}</span>
                                    </div>
                                    <div v-if="userIndex==1" for="">
                                        <span>尺寸：</span>
                                        <span>{{item.patternsSoldByMallSellers.size_width}}×{{item.patternsSoldByMallSellers.size_height}}</span>
                                    </div>                                
                                    <div for="">
                                        <span>分层：</span>
                                        <span v-if="userIndex==1">是</span>
                                        <span v-if="userIndex==0">否</span>
                                    </div>
                                </div>
                                <div class="price">￥{{item.patternsSoldByMallSellers.price}}</div>
                            </div>
                            <div class="edit" style="left: 115px;">
                                <div @click="getVipPrice(index,'')">付款</div>
                                <div @click="showSureDeleteBox(item.id)">删除</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
                <div v-else class="noData">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <div>空空如也</div>
                </div>
                <div class="selectBox">
                    <div @click="allClick" class="selectBtn">
                        <input id="All" style="cursor: pointer" type="checkBox" :checked="check">
                        <span class="allBack"></span>
                        <span>全选</span>
                        <span class="allPrice">总计：￥{{amount}}</span>
                    </div>
                </div>
                <div style="background: #CDCDCD;width: 100%;height: 1px"></div>
                <div class="endBox">
                    <div style="width: 824px"></div>
                    <button :disabled="checkedNum<=0" @click="toPay()" id="endBtn" :class="{endBtn:true,endBtnHover:btnColor=='#ffe135'}" :style="{background: btnColor}">结算</button>
                    <button :disabled="checkedNum<=0" @click="showSureDeleteAllBox" :class="{delBtn:true,delBtnHover:btnColor=='#ffe135'}" :style="{background: btnColor}">删除</button>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <!-- 弹窗 -->
        <div class="model" v-if="showModel">
            <!--支付框-->
            <div class="payBox">
                <div class="payBoxTitle">本次消费</div>
                <div class="payNumTitle">
                    花花币:
                    <img src="../../assets/image/user/jinbi-2.png"/>
                    <label>{{vipType==2?vipPrice:amountOne}}个</label>
                    <label class="beforePrice" v-if="vipType==2">{{amountOne}}个</label>
                </div>
                <div class="balanceBox">
                    <div v-if="vipType!=2" class="vipPrice">企业VIP价格：{{vipPrice}}</div>
                    <div class="balance">您可用花花币：{{balance}}</div>
                </div>
                <div class="bottom">
                    <div class="surePayBtn" @click="payOne">确认支付</div>
                    <div class="cancelBtn"  @click="closePayBox()" v-if="vipType=='2'">取消</div>
                    <div class="cancelBtn"  @click="closePayBox()" v-if="vipType=='1'">申请企业VIP</div>
                    <div class="cancelBtn"  @click="closePayBox()" v-if="vipType=='0'">申请VIP</div>
                </div>
            </div>
            <!--关闭按钮-->
            <img class="closeBtn" @click="closepayBox" src="../../assets/image/banquan/guanbi.png"/>

        </div>
        <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
        <SelectBox  @sure="delOrder" @cancel="cancel"  v-if="showSeledtInfo==1 || showSeledtInfo==0" :code="showSeledtInfo" :errMsg="errMsg" :succMsg="succMsg" :isSelect="isSelect"></SelectBox>
        <SelectBox  @sure="delOrderAll" @cancel="cancelAll"  v-if="showSeledtAllInfo==1 || showSeledtAllInfo==0" :code="showSeledtAllInfo" :errMsg="errMsg" :succMsg="succMsg" :isSelect="isSelect"></SelectBox>
        <Loading v-if="showLoading"></Loading>
        <PageJump  v-if="showPageJump" :title="err" :urlChange="false"></PageJump>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Usertab from '../../components/Usertab';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
import Loading from '../../components/Loading';
import InfoBox from '../../components/common/InfoBox';
import SelectBox from '../../components/common/SelectBox';
import PageJump from '@/components/common/PageJump';
export default {
    name: 'Car',
    components: {
        Tab,
        Usertab,
        Jump,
        Loading,
        InfoBox,
        SelectBox,
        PageJump
    },
    data(){
        return {
            path: '/User/Car',
            tabIndex: null,
            showJump: false,
            err: '',
            showLoading: false,
            userIndex: 1,
            // 向子组件传值
            arr: [{name: "花型",color: "#2f2f2f",showTangle: false},{name: "商城花型",color: "#8d8d8d",showTangle: true}],
            // 商城花型
            list: [],
            // 分页选择
            i: 1,
            // 支付弹窗
            id: "",
            orderId: '',
            showModel: false,
            showGrab: false,
            showPay: false,
            codeSrc: '',
            // 用来标记是否需要在加载数据
            flag: true,
            // 全选
            check: false,
            // 全选点击次数
            allCnt: 0,
            // 总金额
            amount: 0,
            showBottom: false,
            // 分页器
            page: [],
            cnt: 1,
            pageNumber: 0,
            flag: 0,
            pageIndex: 1,
            isShow:0,
            btnColor:'#C4C3C1 !important',
            code: '',
            errMsg:'',
            succMsg:'',
            succImg: require('../../assets/image/user/dagou-2.png'),
            errImg: require('../../assets/image/user/cuowu-2.png'),
            balance:0,
            index:0,
            showInfo:-1,
            amountOne:0,
            showInfoFlag:false,
            //选中的花型id
            ids:'',
            //提示框是否需要底部确认按钮，0：需要，1不需要
            isSelect:1,
            //是否显示选择框
            showSeledtInfo:-1,
            vipPrice:0,
            vipType:0,
            showPageJump:'',
            checkedNum:0,
            showSeledtAllInfo:-1
        }
    },
    methods: {
        changeEnglish(){
            this.$router.go(0);
        },
        // 初始化分页器
        pageAuto(){
            this.checkedNum = 0 ;
            this.check=false;
            this.btnColor='#C4C3C1 !important';
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
                this.getDiffData();
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
                            this.getDiffData();
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getDiffData();
                            this.pageIndex = 4;
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getDiffData();
                        this.pageIndex = 7;
                    }else{
                        this.cnt = this.page[index].name;
                        this.getDiffData();
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
                            this.getDiffData();
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getDiffData();
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getDiffData();
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
                            this.getDiffData();
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getDiffData();
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getDiffData();
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getDiffData();
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
                    this.getDiffData();
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);this.getDiffData();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getDiffData();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getDiffData();
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
                    this.getDiffData();
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
                        this.getDiffData();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = this.cnt;
                        this.getDiffData();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getDiffData();
                    }
                }else{
                    this.showPageJump = true;
                    this.err = '最后一页了';
                    setTimeout(function(){
                        this.showPageJump = false;
                        this.err = '';
                    },1500);
                }
            }
        },
        // 获取子组件传来的值
        getUserIndex(e){
            this.userIndex = e;
            this.showBottom = false;
            this.i = 1;
            this.amount = 0;
            this.list = [];
            this.check = false;
            if(this.userIndex==0){
                this.getMine();
            }else{
                this.getDiffData();
            }
        },
        // 列表点击
        listClick(index){
            let checkedNum=0
            this.amount = 0;
            let self = this;
            let m = 0;
            let num = 0;
            let btn = document.getElementById("endBtn");
            let liList = document.getElementsByClassName("liNum");
            self.list[index].show = !self.list[index].show;
            for(var i=0;i<self.list.length;i++){
                if(self.list[i].show==true){
                    checkedNum= checkedNum+1;
                }
            }
            self.checkedNum = checkedNum;
            if(checkedNum==self.list.length){
                self.check = true;
            }else{
                self.check = false;
            }
            self.$forceUpdate();
            self.list.map(function(item){
                if(item.show){
                    self.showBottom = true;
                    m = 1;
                    self.amount += parseFloat(item.price);
                }
            });
            for(let i = 0;i < liList.length;i++){
                if(liList[i].checked){
                    num++
                }
                if(num > 0){
                    self.btnColor = '#ffe135';
                }else{
                    self.btnColor = '#C4C3C1';
                }
                if(num == liList.length){
                    self.allCnt = 1;
                    self.check = true;
                }
            }
            self.amount = self.amount.toFixed(2);
        },
        // 获取花型商城数据
        getDiffData(){
            this.showLoading = true;
            let formData = new FormData();
            formData.append('pageSize',4);
            formData.append('page',this.cnt);
            let obj = {
                url: this.all.baseUrl + '/new/shoppingCart/getShoppingCarts',
                formdata: formData
            }
            this.getData(obj).then(res => {
                setTimeout(()=>{
                    this.showLoading = false;
                },500);
                this.flag = true;
                if(res.data.status==0){
                    this.list = [];
                    let list = res.data.result.list;
                    this.pageNumber = res.data.result.pages;
                    this.cnt=1;
                    this.page=[]
                    this.pageAuto();
                    this.amount = 0;
                    if(res.data.result.hasNextPage==false){
                        this.flag = false;
                    }
                    for(let m=0;m<list.length;m++){
                        if(list[m].price==null){
                            list[m].price = 0;
                        }
                        if(list[m].patternsSoldByMallSellers){
                            list[m].price = list[m].patternsSoldByMallSellers.price.toFixed(2); 
                            list[m].show = false;
                            this.list.push(list[m]);
                            this.$forceUpdate();
                        }
                    }
                    this.inputNone();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    setTimeout(function(){
                        this.showJump = false;
                        this.err = '';
                        localStorage.clear();
                        this.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.errMsg = res.data.msg;
                    this.showInfo = 1
                    setTimeout(function(){
                        this.errMsg = ''
                        this.showInfo=-1;
                    },1500);
                }
            });
        },
        // 提示弹窗
        getAlert(str){
            this.showJump = true;
            this.err = str;
            setTimeout(function(){
                this.showJump = false;
                this.err = '';
            },2000);
        },
        // 删除订单
        delOrder(ids){
            let alert = document.getElementById("alert");
            let self = this;
            if(self.userIndex==1){
                let formdata = new FormData();
                formdata.append('ids',self.ids);
                let obj = {
                    url: self.all.baseUrl + '/new/shoppingCart/delShoppingCartByIds',
                    formdata: formdata
                }
                self.getData(obj).then(res=>{
                    if(res.data.status == 0){
                        self.showSeledtInfo=-1;
                        self.showSeledtAllInfo=-1;
                        self.succMsg = '删除成功！';
                        self.showInfo=0;
                        self.getOrderNum();
                        setTimeout(function(){
                            self.succMsg = '';
                            self.showInfo=-1
                            self.cnt=1;
                            //刷新页面
                            self.getDiffData()
                            //将结算按钮变灰
                            self.btnColor = '#C4C3C1';
                            self.check=false;
                        },1000);
                    }else if(res.data.status == -95){
                        self.showSeledtInfo=-1;
                        self.showSeledtAllInfo=-1;
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.showSeledtInfo=-1;
                        self.showSeledtAllInfo=-1;
                        self.errMsg = res.data.msg;
                        self.showInfo=1
                        setTimeout(function(){
                            self.errMsg = '';
                            self.showInfo=-1
                        },1000);
                    }
                })
            }else{
                self.list.map(function(item){
                    if(item.show){
                        formData.append('id',item.id);
                        formData.append('status',-10);
                        formData.append('cartStatus',0);
                        obj.url = self.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/update';
                        obj.formdata = formData;
                        self.getData(obj).then(res => {
                            if(res.data.status == 0){
                                self.getAlert('删除成功');
                                self.list = [];
                                self.i = 1;
                                self.getMine();
                            }else if(res.data.status == -95){
                                self.showJump = true;
                                self.err = res.data.msg;
                                setTimeout(function(){
                                    self.showJump = false;
                                    self.err = '';
                                    localStorage.clear();
                                    self.$router.push({
                                        path: '/Login'
                                    });
                                },1500);
                            }else{
                                self.getAlert(res.data.msg);
                            }
                        });
                    }
                });
            }     
        },
        // 去付款按钮点击
        toPay(){
            let ids = '';
            let money = 0;
            for(let i = 0;i < this.list.length;i++){
                if(this.list[i].show){
                    ids += this.list[i].id+',';
                    money += this.list[i].patternsSoldByMallSellers.price;
                }
            }
            ids = ids.substr(0,ids.length-1);
            // this.showModel=true;
            this.amountOne = money;
            this.amount = money;
            if(ids != ''){
                this.ids = ids;
            }
            this.getVipPrice(0,'all');
        },
            delOrderAll(){
            this.cancelAll();
            this.isSelect=1;
            let ids = '';
            for(let i = 0;i < this.list.length;i++){
                if(this.list[i].show){
                    ids += this.list[i].id+',';
                }
            }
            ids = ids.substr(0,ids.length-1);
            this.ids = ids;
            if(ids){
                this.delOrder(ids);
            }
            // 更新购物车角标数量
            this.getOrderNum();
            // this.showSureDeleteBox(ids)
        },
        // 点击微信或者支付宝按钮
        showBuy(i){
            this.type = i;
            let payType = "";
            let self = this;
            if(i == "微信"){
                payType = 5;
            }else if(i == '支付宝'){
                payType = 3;
            }
            let idArr = [];
            let formData = new FormData();
            let obj = {};
            if(self.userIndex==0){
                self.list.map(function(item){
                    if(item.show){
                        idArr.push(item.id);
                    }
                });
                formData.append('shoppingCart',idArr.join(','));
                formData.append('theAmountActuallyPaid',self.amount);
                formData.append('modeOfPayment',payType);   
                obj = {
                    url: self.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/buy',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        self.codeSrc = res.data.result.src;
                        self.showGrab = false;
                        self.showPay = true;
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.getAlert(res.data.msg);
                    }
                });
            }else if(self.userIndex==1){
                self.list.map(function(item){
                    if(item.show){
                        idArr.push(item.id);
                    }
                });
                formData.append('shoppingCart',idArr.join(','));
                formData.append('theAmountActuallyPaid',self.amount);
                formData.append('modeOfPayment',payType);   
                obj = {
                    url: self.all.baseUrl + '/app3dStoreIndentMainJyg/buy',
                    formdata: formData
                }
                self.getData(obj).then(res => {
                    if(res.data.status == 0){
                        self.orderId = res.data.result.indentModel.id;
                        self.codeSrc = res.data.result.src;
                        self.showGrab = false;
                        self.showPay = true;
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.getAlert(res.data.msg);
                    }
                });
            }
        },
        // 关闭支付
        delBind(){
            this.showModel = false;
            this.showGrab = false;
            this.showPay = false;
            Scroll.move();
        },
        // 点击我已支付
        hasPay(){
            let self = this;
            let formData = new FormData();
            formData.append('id',this.orderId);
            let obj = {}
            obj.formdata = formData;
            if(self.userIndex==1){
                obj.url = self.all.baseUrl + '/app3dStoreIndentMainJyg/info';
                self.getData(obj).then(res => {
                    if(res.data.status==0){
                        if(res.data.result.whetherPayment==1){
                            self.showJump = true;
                            self.err = "支付成功";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                self.i = 1;
                                self.list = [];
                                self.getDiffData();
                            },2000);
                        }else{
                            self.showJump = true;
                            self.err = "您还未支付";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                Scroll.move();
                                self.getDiffData();
                            },2000);
                        }
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.getAlert(res.data.msg);
                    }
                });
            }else if(self.userIndex==0){
                obj.url = self.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/info';
                self.getData(obj).then(res => {
                    if(res.data.status==0){
                        if(res.data.result.whetherPayment==1){
                            self.showJump = true;
                            self.err = "支付成功";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                self.i = 1;
                                self.list = [];
                                self.getMine();
                            },2000);
                        }else{
                            self.showJump = true;
                            self.err = "您还未支付";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                Scroll.move();
                                self.getMine();
                            },2000);
                        }
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.getAlert(res.data.msg);
                    }
                });
            }
        },
        delPay(){
            this.hasPay();
        },
        // 滚动加载数据
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 50;
                if(bottomOfWindow && this.flag){
                    this.flag = false;
                    this.i+=1;
                    if(this.userIndex==0){
                        this.getMine();
                    }else{
                        this.getDiffData();
                    }
                }
            }
        },
        // 获取花型数据
        getMine(){
            let self = this;
            self.showLoading = true;
            let formData = new FormData();
            formData.append('pageSize',6);
            formData.append('page',this.i);
            formData.append('cartStatus',1);
            let obj = {
                url: self.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/list',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                self.flag = true;
                if(res.data.status==0){
                    let list = res.data.result.list;
                    if(res.data.result.hasNextPage==false){
                        self.flag = false;
                    }
                    for(let m=0;m<list.length;m++){
                        if(list[m].price==null){
                            list[m].price = 0;
                        }
                        if(list[m].app3dFlowerTypeJygModel){
                            list[m].price = list[m].price.toFixed(2); 
                            list[m].show = false;
                            self.list.push(list[m]);
                            self.$forceUpdate();
                        }
                    }
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        self.$router.push({
                            path: '/Login'
                        });
                    },2000);
                }else{
                    self.getAlert(res.data.msg);
                }
            });
        },
        // 全选
        allClick(){
            if(this.list.length > 0){
                this.check = !this.check;
                this.amount = 0;
                if(this.check){
                    for(let i = 0;i < this.list.length;i++){
                        this.list[i].show = true;
                        this.amount += this.list[i].patternsSoldByMallSellers.price;
                    }
                    this.btnColor = '#ffe135';
                    this.checkedNum=this.list.length;
                }else{
                    for(let i = 0;i < this.list.length;i++){
                        this.list[i].show = false;
                    }
                    this.btnColor = '#C4C3C1';
                    this.checkedNum=0;
                }
                this.$forceUpdate();
            }
        },
        delClick(e){
            let show = e.target.dataset.show;
            let editList = document.getElementsByClassName("edit");
            if(show == 0){
                for(let i = 0;i < editList.length;i++){
                    editList[i].style.cssText = "left: 115px;"
                }
                e.target.dataset.show = 1;
            }else if(show == 1){
                for(let i = 0;i < editList.length;i++){
                    editList[i].style.cssText = "left: 230px;"
                }
                e.target.dataset.show = 0;
            }
        },
        //支付单个
        payOne(){
            let self = this;
            let alert = document.getElementById("alert");
            let formdata = new FormData();
            formdata.append('ids',self.ids);
            let obj = {
                url: self.all.baseUrl + '/new/shoppingCart/buyFlowersByShoppingCartIds',
                formdata: formdata
            }
            self.getData(obj).then(res => {
                if(res.data.status==0){
                    self.succMsg = '恭喜您成功支付'
                    self.showInfo=0;
                    //隐藏确认支付框
                    self.closepayBox();
                    // 更新购物车角标数量
                    self.getOrderNum();
                    setTimeout(function(){
                        self.succMsg = ''
                        self.showInfo=-1;
                        self.cnt=1;
                        //刷新数据
                        self.getDiffData();
                        //将结算按钮变灰
                        self.btnColor = '#C4C3C1 !important';
                        //将全选去掉勾选
                        self.check = false;
                        //获取个人余额
                        self.getBalance()
                    },1500);
                }else if(res.data.status == -95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },2000);
                }else{
                    self.errMsg = res.data.msg;
                    self.showInfo = 1
                    setTimeout(function(){
                        self.errMsg = ''
                        self.showInfo=-1;
                    },1500);
                }
            });
        },
        alertHidd(id){
            let alert = document.getElementById("alert");
            let self = this;
            if(self.userIndex==1){
                let formdata = new FormData();
                formdata.append('ids',id);
                let obj = {
                    url: self.all.baseUrl + '/new/shoppingCart/buyFlowersByShoppingCartIds',
                    formdata: formdata
                }
                self.getData(obj).then(res => {
                    if(res.data.status==0){
                        self.succMsg = '订单交易成功！'
                        self.showInfo=0;
                        setTimeout(function(){
                            self.succMsg = ''
                            self.showInfo=-1;
                            //刷新数据
                            self.getDiffData();
                            //隐藏确认支付框
                            self.closePayBox();
                        },1500);
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.errMsg = res.data.msg;
                        self.showInfo=1;
                        setTimeout(function(){
                            self.succMsg = ''
                            self.showInfo=-1;
                        },1500);
                    }
                });
            }else if(self.userIndex==0){
                obj.url = self.all.baseUrl + '/app3dFlowerTypeIndentMainJyg/info';
                self.getData(obj).then(res => {
                    if(res.data.status==0){
                        if(res.data.result.whetherPayment==1){
                            self.showJump = true;
                            self.err = "支付成功";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                self.i = 1;
                                self.list = [];
                                self.getMine();
                            },2000);
                        }else{
                            self.showJump = true;
                            self.err = "您还未支付";
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = "";
                                self.showModel = false;
                                Scroll.move();
                                self.getMine();
                            },2000);
                        }
                    }else if(res.data.status == -95){
                        self.showJump = true;
                        self.err = res.data.msg;
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            localStorage.clear();
                            self.$router.push({
                                path: '/Login'
                            });
                        },2000);
                    }else{
                        self.errMsg = res.data.msg;
                        self.showInfo = 1
                        setTimeout(function(){
                            self.errMsg = ''
                            self.showInfo=-1;
                        },1500);
                    }
                });
            }
        },
        alertShow(){
            let alert = document.getElementById("alert");
            this.showInfoFlag=true
            this.i = 1;
            this.list = [];
            this.getDiffData();
        },
        inputNone(){
            if(this.list.length < 1){
                document.getElementById('All').checked = false;
                this.btnColor = '#C4C3C1 !important';
                document.getElementById('All').disabled = "value";
            }else{
                document.getElementById('All').removeAttribute("disabled");
            }
        },
        // 获取用户余额
        getBalance(){
            let self = this;
            //请求接口
            let formDataBalance = new FormData();
            let obj = {
                url: this.all.baseUrl + '/new/userPurse/getUserPurseByUserId',
                formdata: formDataBalance
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    setTimeout(function(){
                        //请求完成
                        self.balance = res.data.result.store_money;
                    },1500);
                    // self.alertShow();
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
                    self.showInfo = 1
                    setTimeout(function(){
                        self.errMsg = ''
                        self.showInfo=-1;
                    },1500);
                }
            });
        },
        //显示确认支付框
        openPayBox(index){
            this.index=index;
            this.ids = this.list[this.index].id
            this.showModel=true;
        },
        //隐藏确认支付框
        closePayBox(){
            if(this.vipType == '2'){
                this.showModel=false;
            } else if(this.vipType == '1'){
                this.$router.push({
                    path: '/Vip'
                });
            } else if(this.vipType == '0'){
                this.$router.push({
                    path: '/Vip'
                });
            }
        },
        closepayBox(){
            this.showModel=false;
        },
        //删除前确认是否要删除
        showSureDeleteBox(id){
            this.ids = id;
            this.errMsg='确认删除该订单吗？'
            this.isSelect = 0;
            this.showSeledtInfo=1;
        },
        showSureDeleteAllBox(){
            this.errMsg='确认删除该订单吗？'
            this.isSelect = 0;
            this.showSeledtAllInfo=1;
        },
        //隐藏删除确认框
        cancel(){
            this.showSeledtInfo=-1;
            this.errMsg=''
            this.isSelect = -1;
        },
        cancelAll(){
            this.showSeledtAllInfo=-1;
            this.errMsg=''
            this.isSelect = -1;
        },
        //查询企业VIP价格
        getVipPrice(index,all){
            let self = this;
            if(all==''){
                self.amountOne = self.list[index].patternsSoldByMallSellers.price;
            }
            //请求接口
            let formData = new FormData();
            formData.append('price',self.amountOne);
            let obj = {
                url: self.all.baseUrl + '/new/common/getVipPrice',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.vipPrice = res.data.result;
                    if(all=='all'){
                        self.showModel=true;
                    }else{
                        //显示确认弹框
                        self.openPayBox(index);
                    }
                }else if(res.data.status==-95){
                    self.errMsg = res.data.msg;
                    self.showInfo = 1
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
                        Scroll.move();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    self.errMsg = res.data.msg;
                    self.showInfo = 1
                    setTimeout(function(){
                        self.errMsg = ''
                        self.showInfo=-1;
                    },1500);
                }
            });
        },
        //查询用户vip类型
        getVipType(){
            let self = this;
            this.showLoading = true;
            Scroll.stop();
            let formData = new FormData();
            let obj = {};
            obj.url = this.all.baseUrl + '/new/users/getUserById';
            obj.formdata = formData;
            self.getData(obj).then(res=>{
                self.showLoading = false;
                Scroll.move();
                let result;
                if(res.data.status==0){
                    self.vipType = res.data.result.vipType;
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
        // 查询用户购物车订单数量
        getOrderNum(){
            let obj = {
                url: this.all.baseUrl + '/new/shoppingCart/getShoppingCount',
                formdata: new FormData()
            }
            this.getData(obj).then(res=>{
                if(res.data.status == 0){
                    localStorage.removeItem('orderNum');
                    localStorage.setItem("orderNum",res.data.result)
                }
            })
        }
    },
    mounted(){
        this.getDiffData();
        this.inputNone();
        this.getBalance();
        this.getVipType();
        this.getOrderNum();
    }
}
</script>
<style scoped>
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
    .grabBox{
        width: 22.5rem;
        height: 11.25rem;
        background: #fff;
        border-radius: .625rem;
        margin: 0 auto;
        position: relative;
        margin-top: 25rem;
    }
    .grabBox h3{
        padding-top: .9375rem;
        font-weight: normal;
        font-size: 1.5rem;
        margin: 0;
    }
    .grabBox .del{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        right: .5rem;
        top: .5rem;
        line-height: 1.25rem;
        text-align: center;
        cursor: pointer;
    }
    .del img{
        width: 100%;
        display: block;
    }
    .grabBox span{
        display: block;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox .grabWay{
        display: flex;
        justify-content: space-around;
    }
    .grabWay button{
        width: 7.8125rem;
        height: 2.5rem;
        outline: none;
        border: none;
        line-height: 2.5rem;
        color: #fff;
        background: #133ffc;
        font-size: 1.25rem;
        border-radius: .625rem;
    }
    /* 支付弹窗 */
    .payBox{
        width: 56.25rem;
        height: 37.5rem;
        margin: 0 auto;
        margin-top: calc(50vh - 18.75rem);
        border-radius: .625rem;
        overflow: hidden;
        position: relative;
        display: flex;
        background: #fff;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding-top: 22px;
    }
    .payDel{
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1.375rem;
        display: block;
        cursor: pointer;
        font-size: 1.5rem;
        margin-left: auto;
        margin-right: .9375rem;
    }
    .payDel img{
        display: block;
        width: 100%;
    }
    .smallBox{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .smallBox>img{
        width: 22.3125rem;
        height: 29.0625rem;
        display: block;
        flex-shrink: 0;
    }
    .smallBox h5,
    .smallBox .codeBox{
        margin: 0 auto;
    }
    .smallBox h5{
        text-align: center;
        font-size: 1.5rem;
        margin-top: 3.125rem;
        font-weight: normal;
        color: #4d4d4d;
    }
    .smallBox .codeBox{
        width: 18.75rem;
        height: 18.75rem;
        background: #fff;
        margin: 1.5625rem auto;
        box-sizing: border-box;
        padding-top: 1rem;
    }
    .codeBox img{
        display: block;
        width: 15.625rem;
        height: 15.625rem;
        margin: 0 auto;
    }
    .hasPay{
        width: 8.75rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        background: #133ffc;
        border-radius: .625rem;
        color: #fff;
        border: none;
        outline: none;
        display: block;
        cursor: pointer;
        margin: 0 auto;
    }
    .car{
        background: #fff;
        min-height: 100vh;
        box-sizing: border-box;
        padding-bottom: 6.25rem;
    }
    .content{
        width: 988px;
        background: #fff;
    }
    .proList{
        display: flex;
        flex-direction: column;
        margin-top: 39px;
    }
    .proList li{
        display: flex;
        width: 911px;
        height: 132px;
        align-items: center;
        margin: 0 auto;
        background: #F6F6F6;;
        border-radius: 15px;
    }
    .proList li+li{
        margin-top: 23px;
    }
    .proList li:hover{
        background: #f5f5f5;
    }
    .leftBox{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .leftBox input{
        position: absolute;
        z-index: 222;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0
    }
    .backImg{
        display: block;
        width: 18px;
        height: 18px;
        margin-left: 18px;
        margin-right: 85px;
        background: url('../../assets/image/user/select.png') no-repeat center center;
        background-size: 100%;
    }
    .leftBox input:checked + .backImg{
        background: url('../../assets/image/user/selectedY.png') no-repeat center center;
        background-size: 100%;
    }
    .main{
        width: 911px;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        display: flex;
        overflow: hidden;
        align-items: center;
        border-radius: 15px;
    }
    .main .countName{
        font-size: 14px;
        text-align: left;
        margin-top: 10px;
        margin-bottom: 15px;
    }
    .main .countItem{
        width: 300px;
        display: flex;
        font-size: 12px;
        color:#aaa;
        justify-content: space-between;
    }
    .main .edit{
        display: flex;
        width: 200px;
        position: relative;
        left: 114px;
        position: relative;
        transition: all 0.5s;
    }
    .main .edit div{
        width: 73px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 4px;
        line-height: 30px;
        text-align: center;
        font-family: SourceHanSansCN-Medium;
        font-size: 14px;
        color: #040404;
        cursor: pointer;
    }
    .main .edit div+div{
        margin-left: 12px;
    }
    .main .edit div:hover{
        border: 1px solid #fff;
        background: #ffe135;
    }
    /* .main label{
        display: flex;
        text-align: left;
        margin-bottom: .75rem;
        font-size: .875rem;
        height: 1rem;
    }
    .main label span:first-child{
        width: 7.8125rem;
        display: block;
    } */
    .main .imgBox{
        display: flex;
        align-items: center;
        width: 70px;
        height: 105px;
        justify-content: center;
        background: #fff;
        font-size: .875rem;
        margin-right: 104px;
    }
    .imgBox img{
        width: 70px;
        height: 105px;
        display: block;
    }
    .descriptBox{
        display: flex;
        flex-direction: column;
        height: 132px;
    }
    span.special{
        color: #000;
    }
    .price{
        display: flex;
        width: 52px;
        height: 20px;
        align-items: center;
        color: #fb581f;
        font-size: 14px;
        margin-top: 18px;
    }
    .empty{
        width: 100%;
        font-size: 1.875rem;
        color: #2c2e30;
        line-height: calc(100vh - 17.5rem);
    }
    .bottomBox{
        height: 60px;
        background: #eee;
        display: flex;
        justify-content: space-between;
    }
    .selectBox{
        display: flex;
        align-items: center;
    }
    .selectBtn{
        display: flex;
        align-items: center;
        position: relative;
        left: 57px;
        font-size: 14px;
        color: #040404;
        margin-bottom: 3px;
    }
    .selectBtn input{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .allBack{
        display: block;
        width: 18px;
        height: 18px;
        margin-right: 32px;
        background: url('../../assets/image/user/select.png') no-repeat center center;
        background-size: 100%;
    }
    .allPrice{
        position: relative;
        left: 635px;
    }
    .selectBtn input:checked + .allBack{
        background: url('../../assets/image/user/selectedY.png') no-repeat center center;
        background-size: 100%;
    }
    .delBtn,.endBtn{
        width: 70px;
        height: 27px;
        outline: none;
        border: none;
        line-height: 27px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        color: #000 !important;
    }
    .delBtn{
        margin-left: 15px;
    }
    .endBtnHover:hover,.delBtnHover:hover,.surePayBtn:hover{
        background-color: #ffd000 !important;
    }
    .cancelBtn:hover{
        background-color: #eee;
    }
    .endBox{
        display: flex;
        justify-content: end;
        align-items: center;
        position:relative;
        top: 8px;
        left: -55px;
        text-align: right;
        width: 100%;
    }
    .titleBox{
      height: 48px;
      border-bottom: 1px solid #cdcdcd;
      display: flex;
      background: #fff;
      justify-content: space-between;
    }
    .titleBox>div:first-child{
        margin-top: 24px;
        font-size: 16px;
        color: #000;
        margin-left: 5%;
    }
    .titleBox>div:last-child{
        display: flex;
        font-size: 14px;
        margin-top: 24px;
        margin-right: 22px;
    }
    .alert{
        width: 332px;
        background: #F6F6F6;
        position: absolute;
        top: 239px;
        left: 213px;
        /*overflow: hidden;*/
        transition: all 0.5s;
        z-index: 99999;
        height: 132px;
        box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20);
        border-radius: 4px;
    }
    .alert div:first-child span{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/image/user/carClose.png') no-repeat center;
        background-size: 100%;
        margin-left: 334px;
        position: relative;
        top: 0px;
    }
    .alert div+div{
        margin: auto 0;
        font-size: 14px;
        display: flex;
        align-items: center;
    }
    .alert div+div img{
        width: 22px;
        height: 22px;
        margin-left: 96px;
        margin-top: 34px;
    }
    .alert:last-child span{
        position: relative;
        top: 19px;
        left: 6px;
    }
    /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 1.625rem;
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
    .noData{
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }
    /*弹窗样式*/
    .model{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100%;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .payBox{
        background-color: #FFFFFF;
        width: 306px;
        height: 175px;
        position: relative;
        margin: 0 auto;
        margin-top: 200px;
        text-align: left;
        padding-top: 15px;
        font-size: 14px;
        border-radius: 4px;
    }
    .closeBtn{
        width: 30px;
        height: 30px;
        position: relative;
        top: -175px;
        left: 172px;
    }
    .payNumTitle{
        font-size: 18px;
        color: #000000;
        letter-spacing: 0.32px;
    }
    .payNumTitle img{
        width: 20px;
        height: 20px;
        position: relative;
        top: 3px;
        margin-right: 8px;
    }
    .payNumTitle label{
        font-size: 18px;
        color: #fb6413;
    }
    .balanceBox{
        text-align: left !important;
        width: 100%;
        display: flex;
        margin-top: 20px;
    }
    .balance{
        margin-left: 10px;
        font-size: 12px;
        color: #666666;
    }
    .payBox .bottom{
        width: 100%;
        height: 52px;
        display: flex;
        margin-top: 3px;
        position: absolute;
        bottom: 0px;
    }
    .payBox .surePayBtn,.payBox .cancelBtn{
        width: 155px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        cursor: pointer;
    }
    .payBox .surePayBtn{
        background: #FFE135;
    }
    .payBox .cancelBtn{
        border-top: 1px solid #979797;
        border-left: 1px solid #979797;
        height: 52px;
        line-height: 52px;
    }
    button{
        cursor: pointer;
    }
    .payBox .payBoxTitle{
        margin-bottom: 21px;
    }
    .beforePrice{
        text-decoration:line-through;
        font-family: PingFangSC-Regular;
        font-size: 14px!important;
        color: #9F9C9B !important;
        position: relative;
        margin-left: 8px;
        top: -2px !important;
    }
    .payBox .vipPrice{
        margin-left: 11px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FB6413;
    }
</style>