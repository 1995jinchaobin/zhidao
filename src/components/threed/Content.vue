<template>
  <div class="threedcontent">
    <!-- 3D展示详情页 -->
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="kuai">
      <div style="width:1200px;margin:auto;position:relative" class="juzhong1200">
        <div class="zh1">
          <div style="positon:relative">
            <img class="zhimgp" :src="picture" alt />
            <div class="fanhui" @click="back">
              <img
                style="position: relative;top: 3.5px;left: -28px;"
                src="../../assets/image/shopping/backicon.png"
                alt
              />
              返回
            </div>
            <div class="pointBox1">
              <span class="top" @click="directionClick('top')"></span>
              <div class="infeed">
                <span class="left" @click="directionClick('left')"></span>
                <span class="right" @click="directionClick('right')"></span>
              </div>
              <span class="bottom" @click="directionClick('bottom')"></span>
            </div>

            <div class="jianhao" @click="jianhaof">
              <img width="22px" height="4px" src="../../assets/image/3d/jianhao.png" alt />
            </div>
            <div class="jiahao" @click="jiahaof">
              <img width="22px" height="22px" src="../../assets/image/3d/jiahao.png" alt />
            </div>
            <div class="lineBox1">
              <div class="line1">
                <span id="daxiao" @mousedown="pull($event)" @mouseup="push($event)">
                  <span class="case">{{ratio}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="zh2">
          <span class="zhtext">上下偏移量</span>
          <input
            type="number"
            @blur="inputClicky"
            @keyup.enter="inputClicky"
            v-model="rotateY"
			step="0.1"
			min="0"
			max="1"
            class="zhinput"
          />
        </div>
        <div class="zh3">
          <span class="zhtext">左右偏移量</span>
          <input
            type="number"
            @blur="inputClickx"
            @keyup.enter="inputClickx"
            v-model="rotateX"
			step="0.1"
			min="0"
			max="1"
            class="zhinput"
          />
        </div>
        <div class="zh4">
          <div class="header">
            <div
              class="wdmianliao"
              v-if="navIndex==0"
              style="font-weight:bold;cursor:pointer;"
              @click.stop="changeMessage(0)"
            >我的面料</div>
            <div
              class="wdhuaxing"
              style="cursor:pointer;"
              v-if="navIndex==0"
              @click="changeMessage(1)"
            >我的花型</div>
            <div
              class="wdmianliao"
              style="cursor:pointer;"
              v-if="navIndex==1"
              @click.stop="changeMessage(0)"
            >我的面料</div>
            <div
              class="wdhuaxing"
              v-if="navIndex==1"
              style="font-weight:bold;cursor:pointer;"
              @click="changeMessage(1)"
            >我的花型</div>
          </div>

          <!-- <li v-else @click="listClick(index)" v-for="(item,index) in list" :key="index">
            <img width="100%" v-if="navIndex==0" :src="item.preview" alt />
            <img width="100%" v-if="navIndex==1" :src="item.app3dFlowerTypeJygModel.preview" alt />
            <img width="100%" v-if="navIndex==2" :src="item.indentSubsidiaryModels[0].picture1" alt />
            <input name="select" type="radio" class="listSele" />
            <span class="listImg"></span>
          </li>-->
          <!-- <input
            class="file"
            id="uploaderInput"
            accept="image/*"
            multiple
            type="file"
            @change="add"
          />-->
          <div class="zhimg" v-if="navIndex==0" @scroll="listhuadong($event)">
            <div class="zhimg1" style="background: #F4F4F4;">
              <div style="margin-top:39px;color:#666666;font-size: 20px;">+</div>
              <div style="margin-top:24px;color:#666666">上传面料</div>
              <input
                class="file2"
                id="uploaderInput"
                accept="image/*"
                multiple
                type="file"
                @change="add"
              />
            </div>
            <div class="zhimg1" @click="listClick(index)" v-for="(item,index) in list" :key="index">
              <div class="imgjuzhong">
                <img style="cursor:pointer;" :src="item.preview" alt />
              </div>
              <div class="zhimg2">
                <img v-if="num==index" src="../../assets/image/3d/duihao.png" alt />
              </div>
            </div>
          </div>
          <div class="zhimg" v-if="navIndex==1" @scroll="list2huadong($event)">
            <div
              class="zhimg1"
              @click="listClick2(index)"
              v-for="(item,index) in list2"
              :key="index"
            >
              <div class="imgjuzhong" v-if="item.type!=3">
                <img style="cursor:pointer;" :src="item.flowerType.preview" alt />
              </div>
              <div class="imgjuzhong" v-if="item.type==3">
                <img style="cursor:pointer;" :src="item.storeIndentSubsidiary.picture1" alt />
              </div>
              <div class="zhimg2">
                <img v-if="num2==index" src="../../assets/image/3d/duihao.png" alt />
              </div>
            </div>
          </div>
        </div>
        <button class="zhb1" @click="down">
          <img src="../../assets/image/3d/daochu2.png" style="margin-left:7px" alt />
          <span style="margin-left:7px">导出图片</span>
        </button>
        <button class="zhb2" @click="downHD">
          <img src="../../assets/image/3d/huangguan.png" alt />
          <span style="margin-left:7px">获取高清图片</span>
        </button>
        <iframe id="iframe" style="border:0" :src="gaoqingimg" width="0" height="0"></iframe>
      </div>
    </div>
    <!-- <div v-if="false" :class="['content',showLeft==false?'newContent':'']">
      <ul v-if="showLeft" class="seleBox" :style="{height: height}">
        <li
          @click="changeMessage(index)"
          v-for="(item,index) in select"
          :key="index"
          :style="{color: item.show?'#133ffc':'#8d8d8d'}"
        >
          {{item.name}}
          <span v-if="item.show"></span>
        </li>
      </ul>
      <ul v-if="showLeft" class="pageBox">
        <li @click="prev" class="prev">
          <img src="../../assets/image/cut/left.png" alt />
        </li>
        <li :style="{display: navIndex==0?'flex':'none'}" class="upFabric">
          <img src="../../assets/image/3d/cloud.png" alt />
          <span>上传面料</span>
          <input
            class="file"
            id="uploaderInput"
            accept="image/*"
            multiple
            type="file2"
            @change="add"
          />
        </li>
        <li @click="next" class="next">
          <img src="../../assets/image/cut/right.png" alt />
        </li>
      </ul>
      <div v-if="showLeft" class="proBox">
        <ul :class="['classifyBox',showAlllist?'downClassify':'']" v-if="navIndex==0">
          <li @click="downClick" class="downBtn">
            <img src="../../assets/image/3d/top.png" alt />
          </li>
          <li :class="showAll?'selected':''" @click="classifyClick('all')">全部</li>
          <li
            :class="item.show?'selected':''"
            @click="classifyClick(index)"
            v-for="(item,index) in classifyList"
            :key="index"
          >{{item.typeName}}</li>
        </ul>
        <div @click="addClassify" class="specialLi" @mouseleave="hidd()" @mouseover="show()">
          <img src="../../assets/image/3d/add.png" alt />
        </div>
        <div id="addClass" style="display: none;" class="addClass">添加类别</div>
        <ul class="proList">
          <li class="specialPro" v-if="!list.length">
            <img width="100%" src="../../assets/image/user/Emoji.png" alt />
            <span>暂无数据</span>
          </li>
          <li v-else @click="listClick(index)" v-for="(item,index) in list" :key="index">
            <img width="100%" v-if="navIndex==0" :src="item.preview" alt />
            <img width="100%" v-if="navIndex==1" :src="item.app3dFlowerTypeJygModel.preview" alt />
            <img width="100%" v-if="navIndex==2" :src="item.indentSubsidiaryModels[0].picture1" alt />
            <input name="select" type="radio" class="listSele" />
            <span class="listImg"></span>
          </li>
        </ul>
      </div>
      <div class="operateBox">
        <div @click="back" class="backBox">
          <img src="../../assets/image/3d/backicon.png" alt />
          <span>返回</span>
        </div>
        <div class="inputBox">
          <label for>
            <span>上下偏移量：</span>
            <input @blur="inputClicky" @keyup.enter="inputClicky" v-model="rotateY" type="text" />
          </label>
          <label for>
            <span>左右偏移量：</span>
            <input @blur="inputClickx" @keyup.enter="inputClickx" v-model="rotateX" type="text" />
          </label>
        </div>
        <div class="pointBox">
          <span @click="directionClick('top')" class="top"></span>
          <div class="infeed">
            <span @click="directionClick('left')" class="left"></span>
            <span @click="directionClick('right')" class="right"></span>
          </div>
          <span @click="directionClick('bottom')" class="bottom"></span>
        </div>
        <div class="btnBox">
          <div class="btn" @click="down">
            <img src="../../assets/image/3d/download.png" alt />
            <span>导出图片</span>
          </div>
          <div @click="downHD" class="btn pictureBtn">
            <img src="../../assets/image/3d/queen.png" alt />
            <span>获取高清图片</span>
          </div>
          <div @click="creatQR" class="btn QR">
            <span>生成二维码</span>
          </div>
          <div class="qrActive" style="height: 0;">
            <div class="closeBox">
              <img @click="qrShow()" class="close" src="../../assets/image/user/close.png" alt />
            </div>
            <img
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=413241571,1035325901&fm=26&gp=0.jpg"
            />
            <div class="qrBtn">下载二维码</div>
          </div>
        </div>
      </div>
      <div class="imgBox">
        <img :src="picture" alt />
      </div>
      <div class="upBox">
        <span>放大</span>
        <div class="line">
          <span @mousedown="pull($event)" @mouseup="push($event)">
            <span class="case">{{ratio}}</span>
          </span>
        </div>
        <span>缩小</span>
      </div>
    </div>-->
    <!-- 新建弹窗 -->
    <div class="editModel" v-if="showEdit">
      <div class="editBox">
        <div class="closeBox">
          <img @click="closeEdit" class="close" src="../../assets/image/user/close.png" alt />
        </div>
        <h5>创建</h5>
        <div class="editTitle">
          <span>标题</span>
          <input type="text" v-model="addTitle" />
        </div>
        <div class="editBtn">
          <div class="sureBox">
            <button @click="closeEdit" class="cancel">取消</button>
            <button @click="sureEdit">确定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bigModel" v-if="showGrab">
      <div class="grabBox">
        <h3>提示</h3>
        <p class="del" @click="delLook">
          <img src="../../assets/image/login/close.png" alt />
        </p>
        <span>个人VIP开通权限，是否前往充值VIP？</span>
        <div class="grabWay">
          <button @click="wayClick(1)">取消</button>
          <button @click="wayClick(2)">确定</button>
        </div>
      </div>
    </div>
    <div class="vipz" v-if="showJump2">
      <div class="vipz0">
        <div class="vipz1">会员VIP</div>
        <div class="vipz2">开通会员免费下载高清图片</div>
        <img @click="kaiqivip()" src="../../assets/image/3d/juxing.png" alt />
        <div @click="jumpclosef" class="vipzclose">
          <img width="30" height="30" src="../../assets/image/3d/xingzhuang.png" alt />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="model" v-if="vip==1">
      <div class="zhifu">
        <div style="position:relative">
          <div class="boxTitle">会员类别</div>
          <span class="x" @click="vipf(0)">
            <img src="../../assets/image/user/vip-close.png" />
          </span>
          <div class="typeImgArea">
            <div class="vip1" @click="vipxzf(1)" :class="vipxz==1?'vipxz':''">
              <div class="vipa">企业VIP</div>
              <div class="vipb">12个月</div>
              <div
                class="vipc"
                :style="{background:vipxz==1?'#FB6413':'#fff',color:vipxz==1?'#fff':'#FB6413'}"
              >￥3499.00</div>
            </div>
            <div class="vip3" @click="vipxzf(2)" :class="vipxz==2?'vipxz':''">
              <div class="vipa">个人VIP</div>
              <div class="vipb">12个月</div>
              <div
                class="vipc"
                :style="{background:vipxz==2?'#FB6413':'#fff',color:vipxz==2?'#fff':'#FB6413'}"
              >￥1499.00</div>
            </div>
            <div v-if="0" class="vip5" @click="vipxzf(3)" :class="vipxz==3?'vipxz':''">
              <div class="vipa">个人VIP</div>
              <div class="vipb">3个月</div>
              <div
                class="vipc"
                :style="{background:vipxz==3?'#FB6413':'#fff',color:vipxz==3?'#fff':'#FB6413'}"
              >￥599.00</div>
            </div>
            <div v-if="0" class="vip6" @click="vipxzf(4)" :class="vipxz==4?'vipxz':''">
              <div class="vipa">个人VIP</div>
              <div class="vipb">1个月</div>
              <div
                class="vipc"
                :style="{background:vipxz==4?'#FB6413':'#fff',color:vipxz==4?'#fff':'#FB6413'}"
              >￥199.00</div>
              <!--<img class="cx" src="../../assets/image/user/cx.png" alt="">-->
            </div>
          </div>
          <div class="chongzhi">
            <div class="leftTitle">充值方式</div>
            <div class="chongzhi1" :class="payType==5?'payChecked':''" @click="changePayType(5)">
              <img style="margin-top: 8px;" src="../../assets/image/user/weixinzhifu.png" alt />
              <span>微信</span>
            </div>
            <div class="chongzhi2" :class="payType==3?'payChecked':''" @click="changePayType(3)">
              <img style="margin-top: 8px;" src="../../assets/image/user/zhifubao.png" alt />
              <span>支付宝</span>
            </div>
            <div class="chongzhi3" :class="payType==4?'payChecked':''" @click="changePayType(4)">
              <img style="margin-top: 8px;" src="../../assets/image/user/yue.png" alt />
              <span>余额</span>
            </div>
          </div>
          <div class="whitebox" v-if="payType=='3' || payType=='5' || payType==''">
            <div class="whitebox1">请扫二维码完成支付</div>
            <img class="whitebox2" :src="qian" alt />
          </div>
          <!--余额支付-->
          <div v-if="payType=='4'" class="whitebox">
            <div class="balance">可用余额：{{balance}}</div>
          </div>
          <button @click="surePay" class="whitebox3">{{payType=='4'?'确认开通':'已支付'}}</button>
        </div>
      </div>
    </div>
    <!--  -->
    <Jump v-if="showJump" :title="err" :change="change"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
let date = new Date();
export default {
  name: "Content",
  components: {
    Tab,
    Loading,
    Jump
  },
  data() {
    return {
      path: "/Content",
      qian: "",
      vip: 0,
      vipxz: "",
      payType: "",
      balance: "",
      vipType: 0,
      num: -1,
      num2: -1,
      showJump: false,
      showJump2: false,
      err: "",
      height: "",
      tabIndex: 6,
      showLoading: false,
      navIndex: 0,
      url: "",
      id: "",
      str: "",
      showAlllist: false,
      // 操作的图片
      picture: "",
      select: [
        { name: "面料", show: true },
        { name: "设计花型", show: false },
        { name: "商城花型", shohw: false }
      ],
      // 面料编辑弹窗
      showEdit: false,
      classifyList: [],
      list: [],
      list2: [],
      listPage: 1, //面料第几页
      list2Page: 1, //花型第几页
      listlastPage: 1, //面料总共几页
      list2lastPage: 1, //花型总共几页
      list3: [],
      user: {},
      addTitle: "",
      cnt: 1,
      pageNumber: "",
      showAll: true,
      // 图片显示
      flag: 0,
      backImg: "",
      rotateX: "",
      rotateY: "",
      ratio: 1,
      pictureHD: "",
      showGrab: false,
      showBussiness: false,
      // 左边面料的显示与否
      showLeft: true,
      backIndex: "",
      change: "",
      json: {},
      // 如果首页已加载花型则接收来着首页的花型参数
      imageUrl: "",
      orderId: "",
      gaoqingimg: "" //高清图片地址
    };
  },
  methods: {
    listhuadong(event) {
      let self = this;
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      console.log(scrollBottom, this.listPage, this.listlastPage);
      if (scrollBottom < 50 && this.listPage < this.listlastPage) {
        this.listPage++;
        self.showLoading = true;
        let formData = new FormData();
        formData.append("pageSize", 20);
        formData.append("page", this.listPage);
        let obj = {
          url: this.all.baseUrl + "/app3dFlowerMyUpload/list",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.showLoading = false;
          if (res.data.status == 0) {
            for (let i = 0; i < res.data.result.list.length; i++) {
              self.list.push(res.data.result.list[i]);
            }
            self.listlastPage = res.data.result.lastPage;
            self.showLoading = false;
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            // //console.log(res.data);
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1000);
          }
        });
      }
    },
    list2huadong(event) {
      let self = this;
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      if (scrollBottom < 50 && this.list2page < this.list2lastPage) {
        this.list2page++;
        self.showLoading = true;
        let formData = new FormData();
        formData.append("pageSize", 20);
        formData.append("page", self.list2page);
        let obj = {
          url: this.all.baseUrl + "/new/userFlowers/list",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            self.showLoading = false;
            for (let i = 0; i < res.data.result.list.length; i++) {
              self.list2.push(res.data.result.list[i]);
            }
            self.list2lastPage = res.data.result.lastPage;
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            //console.log(res.data);
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1000);
          }
        });
      }
    },
    kaiqivip() {
      this.vip = 1;
      this.showJump2 = false;
    },
    getBalance() {
      let self = this;
      //请求接口
      let formDataBalance = new FormData();
      let obj = {
        url: this.all.baseUrl + "/new/userPurse/getUserPurseByUserId",
        formdata: formDataBalance
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          if (this.imageUrl) {
            self.flag = 1;
          } else {
            self.flag = 0;
          }
          self.isClick = false;

          setTimeout(function() {
            //请求完成
            self.balance = res.data.result.money;
          }, 1500);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          self.err = res.data.msg;
          self.showJump = true;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    changePayType(payType) {
      this.payType = payType;
      let self = this;
      if (self.vipxz == "") {
        self.err = "请先选择vip类型";
        self.showJump = true;
        self.change = "gantan";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          self.change = "";
          Scroll.move();
        }, 1000);
        return;
      }
      //请求接口
      let formData = new FormData();
      formData.append("payType", self.payType);
      formData.append("vipType", self.vipxz);
      let obj = {
        url: this.all.baseUrl + "/new/business/openVip",
        formdata: formData
      };
      //如果是支付宝/微信直接请求接口
      if (self.payType == 3 || self.payType == 5) {
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            self.qian = res.data.result.qrImgSrc;
            self.order_code = res.data.result.order_code;
            // // self.showJump = true;
            // // self.err = "恭喜您成功开通会员";
            // // self.change = "duihao";
            // setTimeout(function() {
            //   // self.showJump = false;
            //   // self.err = "";
            //   // self.change = "";
            //   // localStorage.clear();

            // });
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            self.err = res.data.msg;
            self.showJump = true;
            self.change = "gantan";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.change = "";
              Scroll.move();
            }, 1000);
          }
        });
      } else if (self.payType == 4 && self.balance == "") {
        //请求接口
        this.getBalance();
      }
    },
    vipf(e) {
      this.vip = e;
    },
    vipxzf(e) {
      this.vipxz = e;
      this.changePayType(5);
    },
    surePay() {
      let self = this;
      //如果是支付宝/微信支付
      if (self.payType == 3 || self.payType == 5) {
        let formData = new FormData();
        formData.append("orderCode", self.order_code);
        let obj = {
          url:
            this.all.baseUrl + "/new/userPurse/getUserPurseDetailByOrderCode",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            self.showJump = true;
            self.err = "恭喜您成功开通会员";
            self.change = "duihao";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.change = "";
              self.succMsg = "";
              //关闭支付窗口
              self.vip = -1;
              self.vipType = "";
              self.vipxz = 0;
              self.getuserid();
              //刷新页面
              self.getMessage();
              self.getBalance();
              Scroll.move();
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            self.showJump = true;
            self.err = res.data.msg;
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1500);
          }
        });
      } else if (self.payType == 4) {
        //如果是余额支付
        if (self.vipxz == "") {
          self.err = "请先选择vip类型";
          self.showJump = true;
          self.change = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.change = "";
            Scroll.move();
          }, 1000);
          return;
        }
        let formData = new FormData();
        formData.append("payType", self.payType);
        formData.append("vipType", self.vipxz);
        let obj = {
          url: this.all.baseUrl + "/new/business/openVip",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            self.showJump = true;
            self.err = "恭喜您成功开通会员";
            self.change = "duihao";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.change = "0";
              self.succMsg = "";
              //关闭支付窗口
              self.vip = -1;
              self.vipType = "";
              self.vipxz = 0;
              self.getuserid();
              //刷新页面
              self.getMessage();
              self.getBalance();
              Scroll.move();
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            self.showJump = true;
            self.err = res.data.msg;
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
            }, 1500);
          }
        });
      }
    },
    getuserid() {
      let self = this;
      let formData = new FormData();
      let obj = {
        url: this.all.baseUrl + "/new/users/getUserById",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          console.log(res.data);
          localStorage.removeItem("user");
          locationStorage.setItem("user", res.data.result);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    jumpclosef() {
      this.showJump2 = false;
    },
    inputClicky() {
      let self = this;
      if (this.flag) {
        if (parseFloat(this.rotateY) > 1 || parseFloat(this.rotateY) < 0) {
          this.showJump = true;
          this.err = "偏移量范围在0-1之间";
          this.rotateY = 0;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          let o = {};
          o.rotateY = this.rotateY;
          o.rotateX = this.rotateX;
          o.ratio = this.ratio;
          this.compose(o);
        }
      } else {
        this.showJump = true;
        this.err = "请先选择图片";
        this.change = "gantan";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
        }, 1500);
      }
    },
    inputClickx() {
      let self = this;
      if (this.flag) {
        if (parseFloat(this.rotateX) > 1 || parseFloat(this.rotateX) < 0) {
          this.showJump = true;
          this.err = "偏移量范围在0-1之间";
          this.rotateX = 0;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          let o = {};
          o.rotateX = this.rotateX;
          o.rotateY = this.rotateY;
          o.ratio = this.ratio;
          this.compose(o);
        }
      } else {
        this.showJump = true;
        this.err = "请先选择图片";
        this.change = "gantan";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
        }, 1500);
      }
    },
    changeEnglish() {
      this.$router.go(0);
    },
    pull(event) {
      var prevent;
      var self = this;
      if (self.flag) {
        var event = event || window.event;
        var _target = event.target;
        var startx = event.clientX;
        var starty = event.clientY;
        var roundX = startx - event.target.offsetLeft;
        var roundY = starty - event.target.offsetTop;
        var width = document.documentElement.clientWidth;
        var height = window.innerHeight;
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        document.onmousemove = function(ev) {
          var event = ev || window.event;
          var scrolltop =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (
            event.clientY < 0 ||
            event.clientX < 0 ||
            event.clientY > height
          ) {
            return false;
          }
          var endx = event.clientX - roundX;
          var endy = event.clientY - roundY;
          if (endx < 0 || endx > 280) {
            if (endx < 0) {
              self.ratio = 2;
            } else {
              self.ratio = 0.1;
            }
            self.push();
          } else {
            _target.style.left = endx + "px";
            prevent = 1 - endx / 280;
            console.log(endx, prevent);
            if (prevent <= 0.05) {
              prevent = 0.05;
            }
            console.log(endx, prevent);
            self.ratio = (prevent * 2).toFixed(2);
          }
          if (endx < -13 && endx > 13) {
            document.onmousemove = null;
            document.onmouseup = null;
            var o = {};
            o.ratio = self.ratio;
            o.rotateX = self.rotateX;
            o.rotateY = self.rotateY;
            self.compose(o);
          }
        };
        document.onmouseup = e => {
          document.onmousemove = null;
          document.onmouseup = null;
          let self = this;
          var o = {};
          o.ratio = self.ratio;
          o.rotateX = self.rotateX;
          o.rotateY = self.rotateY;
          self.compose(o);
        };
      } else {
        this.showJump = true;
        Scroll.stop();
        this.err = "请先选择图片";
        this.change = "gantan";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    jiahaof() {
      let self = this;
      if (self.flag) {
        var daxiao = document.getElementById("daxiao");
        if (self.ratio > 1.9) {
          self.ratio = 2;
        } else if (self.ratio < 0.11) {
          self.ratio = 0.2;
        } else {
          self.ratio = self.ratio + 0.1;
        }
        let endx = 140 * (2 - self.ratio);
        daxiao.style.left = endx + "px";
        console.log(daxiao);
        console.log(daxiao.style.left);
        var o = {};
        o.ratio = self.ratio;
        o.rotateX = self.rotateX;
        o.rotateY = self.rotateY;
        self.compose(o);
      } else {
        self.showJump = true;
        Scroll.stop();
        self.err = "请先选择图片";
        self.change = "gantan";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          self.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    jianhaof() {
      let self = this;
      if (self.flag) {
        var daxiao = document.getElementById("daxiao");
        if (self.ratio > 2.0) {
          self.ratio = 1.9;
        } else if (self.ratio < 0.21) {
          self.ratio = 0.1;
        } else {
          self.ratio = self.ratio - 0.1;
        }
        let endx = 140 * (2 - self.ratio);
        daxiao.style.left = endx + "px";        
        var o = {};
        o.ratio = self.ratio;
        o.rotateX = self.rotateX;
        o.rotateY = self.rotateY;
        self.compose(o);
      } else {
        self.showJump = true;
        Scroll.stop();
        self.err = "请先选择图片";
        self.change = "gantan";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          self.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    move(event) {},
    push() {},
    delLook() {
      this.vip = 1;
    },
    wayClick(index) {
      if (index == 1) {
        this.vip = 1;
      } else if (index == 2) {
        this.$router.push({
          path: "/Vip"
        });
      }
    },
    // 展开列表
    downClick() {
      this.showAlllist = !this.showAlllist;
    },
    // 方向键点击
    directionClick(direction) {
      let self = this;
      let o = {};
      if (this.flag) {
        let speed = 0.2;
        if (!this.rotateX) {
          this.rotateX = 0.0;
        }
        if (!this.rotateY) {
          this.rotateY = 0.0;
        }
        this.rotateX = parseFloat(this.rotateX);
        this.rotateY = parseFloat(this.rotateY);
        if (direction == "top") {
          let num = parseFloat(this.rotateY - speed).toFixed(2);
          if (num < 0) {
            // this.rotateY = this.rotateY.toFixed(2);
            // this.showJump = true;
            // this.err = "偏移量范围在0~1之间";
            // Scroll.stop();
            // setTimeout(function() {
            //   self.showJump = false;
            //   self.err = "";
            //   Scroll.move();
            // }, 1500);
            this.rotateY = 0.8;
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
          } else {
            this.rotateY = num;
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
          }
        } else if (direction == "left") {
          let num = parseFloat(this.rotateX - speed).toFixed(2);
          if (num < 0) {
            // this.rotateY = this.rotateX.toFixed(2);
            // this.showJump = true;
            // this.err = "偏移量范围在0~1之间";
            // Scroll.stop();
            // setTimeout(function() {
            //   self.showJump = false;
            //   self.err = "";
            //   Scroll.move();
            // }, 1500);
			this.rotateX = 0.8;
			o.rotateY = this.rotateY;
			o.rotateX = this.rotateX;
			o.ratio = this.ratio;
			this.compose(o);
          } else {
            this.rotateX = num;
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
          }
        } else if (direction == "right") {
          let num = parseFloat(this.rotateX + speed).toFixed(2);
          if (num >= 1) {
            // this.rotateX = this.rotateX.toFixed(2);
            // this.showJump = true;
            // this.err = "偏移量范围在0~1之间";
            // Scroll.stop();
            // setTimeout(function() {
            //   self.showJump = false;
            //   self.err = "";
            //   Scroll.move();
            // }, 1500);
			this.rotateX = 0.2;
			o.rotateY = this.rotateY;
			o.rotateX = this.rotateX;
			o.ratio = this.ratio;
			this.compose(o);
          } else {
            this.rotateX = num;
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
          }
        } else if (direction == "bottom") {
           let num = parseFloat(this.rotateY + speed).toFixed(2);
          if (num > 1) {
          //   this.rotateY = this.rotateY.toFixed(2);
          //   this.showJump = true;
          //   this.err = "偏移量范围在0~1之间";
          //   Scroll.stop();
          //   setTimeout(function() {
          //     self.showJump = false;
          //     self.err = "";
          //     Scroll.move();
          //   }, 1500);
			this.rotateY = 0.2;
			o.rotateY = this.rotateY;
			o.rotateX = this.rotateX;
			o.ratio = this.ratio;
			this.compose(o);
          } else {
            this.rotateY = num;
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            this.compose(o);
          }
        }
      } else {
        this.showJump = true;
        this.err = "请先选择图片";
        this.change = "gantan";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    // 图片点击
    listClick(index) {
      this.flag = 1;
      this.num = index;
      this.num2 = -1;
      if (this.navIndex == 0) {
        this.backImg = this.list[index].preview;
      } else if (this.navIndex == 1) {
        this.backImg = this.list[index].app3dFlowerTypeJygModel.preview;
      } else if (this.navIndex == 2) {
        this.backImg = this.list[index].indentSubsidiaryModels[0].picture1;
      }
      let o = {};
      o.rotateY = this.rotateY;
      o.rotateX = this.rotateX;
      o.ratio = this.ratio;
    this.imageUrl = this.backImg;//shj20191113
    // this.picture=this.backImg;
      this.compose(o);
	  
    },
    // 首页已加载花型时执行
    getCompose() {
      this.flag = 1;
      this.backImg = this.imageUrl;
      let o = {};
      o.rotateY = this.rotateY;
      o.rotateX = this.rotateX;
      o.ratio = this.ratio;
      this.compose(o);
    },
    listClick2(index) {
      this.flag = 1;
      this.num = -1;
      this.num2 = index;
      if (this.list2[index].type != 3) {
        this.backImg = this.list2[index].flowerType.preview;
      } else {
        this.backImg = this.list2[index].storeIndentSubsidiary.picture1;
      }
      let o = {};
      o.rotateY = this.rotateY;
      o.rotateX = this.rotateX;
      o.ratio = this.ratio;
	  this.imageUrl = this.backImg;//shj20191113
      this.compose(o);
    },
    // 图片合成接口
    compose(o) {
      this.showLoading = true;
      let self = this;
      Scroll.stop();
      let formData = new FormData();
      if (o) {
        // 缩放
        if (o.ratio) {
          formData.append("ratio", o.ratio);
        }
        // 左右偏移
        if (o.rotateX) {
          formData.append("rotateX", o.rotateX);
        }
        // 上下偏移
        if (o.rotateY) {
          formData.append("rotateY", o.rotateY);
        }
      }
      if (this.imageUrl) {
        formData.append("imageUrl", this.imageUrl);
      } else {
        formData.append("imageUrl", this.backImg);
      }
      formData.append("templateId", this.json.id);
      let obj;
      if (this.json.type == 2) {
        obj = {
          url: this.all.baseUrl + "/template2d/composeOwn",
          formdata: formData
        };
      } else {
        obj = {
          url: this.all.baseUrl + "/template2d/compose",
          formdata: formData
        };
      }
      this.getData(obj).then(res => {
        localStorage.setItem("imgUrl",  self.imageUrl);
        setTimeout(function() {
          self.showLoading = false;
        }, 500);
        Scroll.move();
        if (res.data.status == 0) {
          this.picture = res.data.result;
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          this.showJump = true;
          Scroll.stop();
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 保存图片到本地
    down() {
      let self = this;
      if (this.backImg) {
        //console.log(this.all.baseUrl + "/file/download?url=" + this.picture);
        // window.location.href =
        //   this.all.baseUrl + "/file/download?url=" + this.picture;
        // let imgname = this.jiequimgname(
        //   this.all.baseUrl + "/file/download?url=" + this.picture
        // );
        // console.log(imgname);
        // this.downloadImage(
        //   this.all.baseUrl + "/file/download?url=" + this.picture,
        //   imgname
        // );
        self.gaoqingimg =
          this.all.baseUrl + "/file/download?url=" + this.picture; //打开子页面加载
      } else if (this.imageUrl) {
        //console.log(this.all.baseUrl + "/file/download?url=" + this.picture);
        // window.location.href =
        //   this.all.baseUrl + "/file/download?url=" + this.picture;
        // let imgname = this.jiequimgname(
        //   this.all.baseUrl + "/file/download?url=" + this.picture
        // );
        // this.downloadImage(
        //   this.all.baseUrl + "/file/download?url=" + this.picture,
        //   imgname
        // );
        self.gaoqingimg =
          this.all.baseUrl + "/file/download?url=" + this.picture; //打开子页面加载
      } else {
        this.showJump = true;
        this.err = "请先合成图片";
        this.change = "gantan";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    // jiequimgname(path) {
    //   let filename;
    //   if (path.indexOf("/") > 0) {
    //     //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
    //     filename = path.substring(path.lastIndexOf("/") + 1, path.length);
    //     return filename;
    //   } else {
    //     filename = path;
    //     return filename;
    //   }
    // },
    // downloadImage(imgsrc, name) {
    //   //下载图片地址和图片名
    //   var image = new Image();
    //   image.src = imgsrc;
    //   // 解决跨域 Canvas 污染问题
    //   image.setAttribute("crossOrigin", "anonymous");
    //   image.onload = function() {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = image.width;
    //     canvas.height = image.height;
    //     var context = canvas.getContext("2d");
    //     context.drawImage(image, 0, 0, image.width, image.height);
    //    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    //   //  var url = URL.createObjectURL(imgsrc);
    //   //   console.log(url);
    //     var a = document.createElement("a"); // 生成一个a元素
    //     var event = new MouseEvent("click"); // 创建一个单击事件
    //     a.download = name || "photo"; // 设置图片名称
    //     a.href = url; // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event); // 触发a的单击事件
    //   };
    //   image.src = imgsrc;
    // },
    downHD() {
      let self = this;
      if (this.backImg || this.imageUrl) {
        if (!this.showBussiness) {
          this.vip = 1;
        } else {
          this.showLoading = true;
          let formData = new FormData();
          if (!this.rotateX) {
            this.rotateX = 0;
          }
          if (!this.rotateY) {
            this.rotateY = 0;
          }
          if (this.backImg) {
            var obj = {
              url:
                this.all.baseUrl +
                "/template2d/composeHD?imageUrl=" +
                this.backImg +
                "&templateId=" +
                this.json.id +
                "&ratio=" +
                this.ratio +
                "&rotateX=" +
                this.rotateX +
                "&rotateY=" +
                this.rotateY,
              formdata: formData
            };
          } else {
            var obj = {
              url:
                this.all.baseUrl +
                "/template2d/composeHD?imageUrl=" +
                this.imageUrl +
                "&templateId=" +
                this.json.id +
                "&ratio=" +
                this.ratio +
                "&rotateX=" +
                this.rotateX +
                "&rotateY=" +
                this.rotateY,
              formdata: formData
            };
          }

          this.getData(obj).then(function(result) {
            if (result.status == 200) {
              self.showLoading = false;
              // window.location.href =
              //   self.all.baseUrl + "/file/download?url=" + result.data.result;
              self.gaoqingimg =
                self.all.baseUrl + "/file/download?url=" + result.data.result; //打开一个看不见的子页面 下载文件
              //window.open(self.all.baseUrl + "/file/download?url=" + result.data.result,'_blank') ;
              // let imgname = self.jiequimgname(
              //   self.all.baseUrl + "/file/download?url=" + result.data.result
              // );
              // console.log(imgname);
              // self.downloadImage(
              //   self.all.baseUrl + "/file/download?url=" + result.data.result,
              //   imgname
              // );
            } else if (result.status == 1) {
              self.vip = 1;
              //56546546
            }
          });
        }
      } else {
        this.showJump = true;
        this.err = "请先合成图片";
        this.change = "gantan";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    // 点击分类
    classifyClick(str) {
      this.str = str;
      if (str == "all") {
        this.showAll = true;
        this.classifyList.map(function(item) {
          item.show = false;
        });
        this.id = "";
      } else {
        this.showAll = false;
        this.classifyList.map(function(item) {
          item.show = false;
        });
        this.classifyList[str].show = true;
        this.id = this.classifyList[str].id;
      }
      this.showLoading = true;
      let self = this;
      let formData = new FormData();
      formData.append("pageSize", 19);
      formData.append("page", 1);
      if (str != "all") {
        formData.append("flowerTyoe", this.classifyList[str].id);
      }
      let obj = {
        url: this.all.baseUrl + "/app3dFlowerMyUpload/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(() => {
          this.showLoading = false;
        }, 500);
        if (res.data.status == 0) {
          let result = res.data.result.list;
          this.pageNumber = res.data.result.pages;
          this.list = result;
          this.listPage = 1;
          this.listlastPage = res.data.result.lastPage;
          console.log(res.data.result);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          this.showJump = true;
          Scroll.stop();
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 设计花型列表
    getDesign() {
      // this.showLoading = true;
      let self = this;
      let formData = new FormData();
      formData.append("pageSize", 20);
      formData.append("page", 1);
      let obj = {
        url: this.all.baseUrl + "/new/userFlowers/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(() => {
          // this.showLoading = false;
        }, 500);
        if (res.data.status == 0) {
          let result = res.data.result.list;
          self.pageNumber = res.data.result.pages;
          self.list2 = res.data.result.list;
          self.list2page = 1;
          self.list2lastPage = res.data.result.lastPage;
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else {
          this.showJump = true;
          Scroll.stop();
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    getHeight() {
      this.height = document.offsetHeight - 74 + "px";
    },
    // 返回
    back() {
      let newJson = {};
      console.log(this.json.type, "type");
      console.log(this.imageUrl, "imageurl");
      if (this.showLeft) {
        let leftIndex = 0,
          classifyIndex = 0;
        if (this.json.leftIndex) {
          leftIndex = this.json.leftIndex;
        }
        if (this.json.classifyIndex) {
          classifyIndex = this.json.classifyIndex;
        }
        if (this.json.type == 1) {
          var imageUrl = this.imageUrl;
        }
        newJson = {
          type: this.json.type,
          classifyIndex: classifyIndex,
          cnt: this.json.cnt,
          leftIndex: leftIndex,
          imageUrl: imageUrl
        };
        localStorage.setItem("threedNewjson", JSON.stringify(newJson));
        this.$router.push({
          path: "/Threed"
        });
      } else {
        let classifyIndex = 0;
        if (this.json.classifyIndex) {
          classifyIndex = this.json.classifyIndex;
        }
        this.json.proList[this.backIndex].backgroudImage = this.picture;
        newJson = {
          picture: this.picture,
          backImg: this.backImg,
          index: this.backIndex,
          id: this.json.id,
          proList: this.json.proList,
          type: 3,
          cnt: this.json.cnt,
          classifyIndex: classifyIndex
        };
        localStorage.setItem("threedNewjson", JSON.stringify(newJson));
        this.$router.push({
          path: "/Threed"
        });
      }
    },
    // 创建分类
    addClassify() {
      this.showEdit = true;
      Scroll.stop();
    },
    // 获取面料
    // getFabric() {
    //   this.showLoading = true;
    //   let self = this;
    //   let formData = new FormData();
    //   formData.append("pageSize", 20);
    //   formData.append("page", 1);
    //   let obj = {
    //     url: this.all.baseUrl + "/app3dFlowerMyUploadType/list",
    //     formdata: formData
    //   };
    //   this.getData(obj).then(res => {
    //     setTimeout(() => {
    //       this.showLoading = false;
    //     }, 500);
    //     if (res.data.status == 0) {
    //       let result = res.data.result;
    //       this.classifyList = result;
    //       this.classifyList.map(function(item) {
    //         item.show = false;
    //       });
    //     } else if (res.data.status == -95) {
    //       this.showJump = true;
    //       this.err = res.data.msg;
    //       setTimeout(function() {
    //         self.showJump = false;
    //         self.err = "";
    //         Scroll.move();
    //         localStorage.clear();
    //         self.$router.push({
    //           path: "/Login"
    //         });
    //       }, 1000);
    //     } else {
    //       this.showJump = true;
    //       this.err = res.data.msg;
    //       Scroll.stop();
    //       setTimeout(function() {
    //         self.showJump = false;
    //         self.err = "";
    //         Scroll.move();
    //       }, 1000);
    //     }
    //   });
    // },
    // 上传面料
    add(e) {
      let self = this;
      let files = e.target.files[0];
      if (files.size > 20971520) {
        this.showJump = true;
        this.err = "文件大小超过20MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        this.url = files;
        if (files.type != "image/jpeg" && files.type != "image/png") {
          this.showJump = true;
          this.err = "不支持的文件格式";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          if (!e || !window.FileReader) return; // 看支持不支持FileReader
          let reader = new FileReader();
          reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
          reader.onloadend = function() {
            // 增加一个
            self.showLoading = true;
            let formData = new FormData();
            formData.append("file", self.url);

            let obj = {
              url: self.all.baseUrl + "/file/upload",
              formdata: formData
            };
            self.getData(obj).then(res => {
              self.upFabric(res.data.result);
              if (self.num != -1) {
                self.num++;
              }
            });
          };
        }
      }
    },
    upFabric(str) {
      let formData = new FormData();
      let self = this;
      formData.append("preview", str);
      if (this.id) {
        formData.append("flowerTyoe", this.id);
      }
      let obj = {
        url: this.all.baseUrl + "/app3dFlowerMyUpload/save",
        formdata: formData
      };
      this.getData(obj).then(res => {
        self.showLoading = false;
        if (res.data.status == 0) {
          this.showJump = true;
          Scroll.stop();
          this.err = "新增成功";
          this.cnt = 1;
          this.classifyClick(this.str);
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
        } else if (res.data.status == 1) {
          this.showJump2 = true;
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 点击确定
    sureEdit() {
      let self = this;
      // 新增一个
      let formData = new FormData();
      formData.append("typeName", this.addTitle);
      let obj = {
        url: this.all.baseUrl + "/app3dFlowerMyUploadType/save",
        formdata: formData
      };
      if (this.addTitle) {
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "新建成功";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              self.showEdit = false;
              this.classifyClick("all");
            }, 1000);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
          } else {
            this.showJump = true;
            Scroll.stop();
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              Scroll.move();
              self.err = "";
            }, 1000);
          }
        });
      } else {
        this.showJump = true;
        this.err = "标题不能为空";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          Scroll.move();
        }, 1000);
      }
    },
    // 上一页
    prev() {
      let self = this;
      if (this.cnt > 1) {
        this.cnt--;
        if (this.navIndex == 0) {
          this.classifyClick(this.str);
        } else if (this.navIndex == 1) {
          this.getDesign();
          this.getShop();
        } else if (this.navIndex == 2) {
        }
      } else {
        this.showJump = true;
        this.err = "已经是第一页了";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      }
    },
    // 下一页
    next() {
      let self = this;
      if (this.cnt < this.pageNumber) {
        this.cnt++;
        if (this.navIndex == 0) {
          this.classifyClick(this.str);
        } else if (this.navIndex == 1) {
          this.getDesign();
          this.getShop();
        } else if (this.navIndex == 2) {
        }
      } else {
        this.showJump = true;
        this.err = "已经是最后一页了";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      }
    },
    // 关闭编辑弹窗
    closeEdit() {
      this.showEdit = false;
      Scroll.move();
    },
    
    changeMessage(index) {
      // this.num=-1;
      // this.num2=-1;
      let self = this;
      this.navIndex = index;
      this.cnt = 1;
      this.list = [];
      this.pageNumber = "";
      this.select.map(function(item) {
        item.show = false;
      });
      this.select[index].show = true;
      if (index == 0) {
        // this.getFabric();
        this.classifyClick("all");
      } else if (index == 1) {
        this.getDesign();
        //this.getShop();
      } else if (index == 2) {
      }
    },
    getMessage() {
      // console.log(1);
      this.user = JSON.parse(localStorage.getItem("user"));
      // 企业会员
      let person = Number(this.user.expirationTime);
      let bussiness = Number(this.user.expirationTimePlus);
      let self = this;
      if (date.getTime() > bussiness) {
        if (date.getTime() > person) {
          this.showBussiness = false;
        } else {
          this.showBussiness = true;
        }
      } else {
        this.showBussiness = true;
      }
      this.json = JSON.parse(localStorage.getItem("threedList"));
      // 如果3d展示首页已加载花型则读取花型参数
      if (localStorage.getItem("imgUrl")) {
        this.imageUrl = localStorage.getItem("imgUrl");
        // localStorage.removeItem("imgUrl");
        localStorage.removeItem("orderId");
        this.getCompose();
      }
      this.picture = this.json.picture;
      if (this.json.type == 3) {
        this.showLeft = false;
        this.backImg = this.json.backImg;
        this.backIndex = this.json.index;
        this.picture = this.json.proList[this.backIndex].backgroudImage;
        this.flag = 1;
      } else {
        this.backImg = this.json.backImg;
        this.backIndex = this.json.index;
      }
    },
    // 显示提示信息
    hidd() {
      let add = document.getElementById("addClass");
      add.style.cssText = "display: none;";
    },
    // 隐藏提示信息
    show() {
      let add = document.getElementById("addClass");
      add.style.cssText = "display: hidden;";
    },
    // 生成二维码
    creatQR() {
      let self = this;
      if (this.backImg) {
        let qr = document.getElementsByClassName("qrActive")[0];
        qr.style.cssText = "height: 58%;border: 1px #000 solid;";
      } else {
        this.showJump = true;
        this.err = "请先合成图片";
        this.change = "gantan";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          this.change = "";
          Scroll.move();
        }, 1500);
      }
    },
    // 隐藏二维码界面
    qrShow() {
      let qr = document.getElementsByClassName("qrActive")[0];
      qr.style.cssText = "height: 0;border: 0px #000 solid;";
    },
    ceshi1(){
      console.log(this.flag,this.backImg,this.picture,this.imageUrl);
    }
  },
  mounted() {
    this.getHeight();
    // 获取面料信息
    // this.getFabric();
    this.classifyClick("all");
    this.getMessage();
    this.getBalance();
    this.ceshi1();
    // localStorage.setItem("path", this.path);
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Encontent"
      });
    } else {
      this.$router.push({
        path: "/Content"
      });
    }
  }
};
</script>
<style scoped>
button{
   cursor:pointer;
}
.fanhui{
  cursor:pointer;
}
.top{
  cursor:pointer;
}
.left{
  cursor:pointer;
}
.bottom{
  cursor:pointer;
}
.right{
  cursor:pointer;
}
.payChecked {
  border: 1px solid #8e8e8e !important;
}
.whitebox2 {
  width: 98px;
  height: 98px;
  margin: 15px auto 0;
  border: none;
}
.whitebox {
  width: 358px;
  height: 142px;
  background: #ffffff;
  margin: 7px auto 0;
  border-radius: 3px;
}
.whitebox1 {
  text-align: center;
}
.whitebox3 {
  background: #fb6413;
  border-radius: 4px;
  width: 140px;
  height: 42px;
  color: white;
  border: 0;
  margin-top: 5px;
  font-size: 14px;
}
.chongzhi {
  text-align: left;
  font-size: 12px;
  color: #242424;
  display: flex;
  margin-top: 21px;
  position: relative;
  left: 73px;
}
.leftTitle {
  height: 32px;
  line-height: 32px;
}
.chongzhi img {
  width: 13px;
  height: 13px;
  margin: 0 32px 0 8px !important;
  vertical-align: middle;
}
.chongzhi1,
.chongzhi2,
.chongzhi3 {
  width: 97px;
  height: 32px;
  line-height: 32px;
  position: relative;
  left: 12px;
  background-color: white;
  border: 1px solid #fff;
}
.chongzhi2 {
  left: 24px;
}
.chongzhi3 {
  left: 36px;
}
.vipa{
  text-align: center;
  height: 36px;
  line-height: 48px;
  width: 176px;
  margin: auto;
  margin-top:2px;
  color: black;
  background-color: #f7f7f7;
  font-weight: normal;
  font-size: 12px;
}
.vipb{
  font-size: 20px;
  height: 36px;
  margin: auto;
  background-color: #f7f7f7;
  color: black;
  width: 176px;
  font-size: 20px;
}
.vipc {
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  font-size: 14px;
  color: #fb6413;
}
.vip1,.vip2,.vip3,.vip4,.vip5,.vip6{
  /*width: 565px;*/
  /*height: 424px;*/
  width: 180px;
  height: 108px;
  background-color: #f7f7f7;
  border-radius: 4px;
  position: relative;
  margin-right: 20px;
  box-shadow: 1px 1px 8px 0 rgba(126,126,129,0.31);
}
.vip1 {
  margin-left: 73px;
}
.typeImgArea{
  display: flex;
  text-align: center;
  justify-content: center;
}
.x {
  position: absolute;
  top: -2px;
  right: 10px;
  font-size: 20px;
}
.x img {
  width: 30px;
  height: 30px;
  position: relative;
  top: -10px;
  left: 50px;
}
.zhifu {
  width: 517px;
  height: 412px;
  background: #ebebef;
  position: fixed;
  top: 30%;
  left: 40%;
  padding-top: 12px;
  border-radius: 3px;
}
.model {
  position: fixed;
  z-index: 10000;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.model .boxTitle {
  text-align: left;
}
.box1 .boxTitle {
  line-height: 38px;
}
.boxTitle {
  font-size: 14px;
  text-align: left;
  vertical-align: middle;
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  color: #242424;
  margin-left: 57px;
  margin-bottom: 16px;
}
input {
  outline: none;
}
.vipz {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
}
.vipz0 {
  width: 316px;
  height: 132px;
  background: #ffffff;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 50%; /*偏移*/
  margin-top: -66px;
  padding-top: 20px;
  border-radius: 4px;
}
.vipz1 {
  height: 20px;

  margin-bottom: 12px;
  font-size: 14px;
  color: #333333;
}
.vipz2 {
  height: 20px;

  margin-bottom: 13px;
  font-size: 14px;
  color: #8b8b8b;
}
.vipzclose {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 323px;
  background-size: 30px 30px;
}
.lineBox1 {
  position: absolute;
  left: 4rem;
  bottom: 5.2rem;
}
.jiahao {
  position: absolute;
  left: 1rem;
  bottom: 4rem;
  /* background: #ffffff; */
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
.jianhao {
  position: absolute;
  left: 29.5rem;
  bottom: 4.2rem;
  /* background: #ffffff; */
  border-radius: 50%;
  width: 28px;
  height: 28px;
  /* background-size: 28px 1px; */
}
.jianhao > img {
  position: relative;
  top: 3px;
}
.line1 {
  width: 300px;
  height: 4px;
  position: relative;
  background: #ffe300;
  border-radius: 4px;
}
.line1 > span {
  position: absolute;
  width: 14px;
  height: 14px;
  top: -0.6rem;
  left: calc(50% - 12px);
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #ffed5c;
  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.line1 > span:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}
.line1 > span:hover .case {
  display: block;
}
.pointBox1 {
  position: absolute;
  right: 1rem;
  bottom: 4rem;
}
.pointBox1 span {
  background: #fff url("../../assets/image/shopping/up.png") no-repeat center;
  width: 33px;
  border-radius: 50%;
  display: block;
  height: 33px;

  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.pointBox1 span:hover {
  background: #ffe300 url("../../assets/image/shopping/up.png") no-repeat center;
}
.infeed {
  display: flex;
}
.pointBox1 span.left {
  transform: rotate(-90deg);
  position: relative;
  /* top: -33px; */
  left: -33px;
}
.pointBox1 span.right {
  transform: rotate(90deg);
}
.threedcontent {
  font-size: 14px;
}
.pointBox1 span.bottom {
  transform: rotate(180deg);
}
.header {
  display: flex;
  margin-bottom: 16px;
}
.wdmianliao {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  margin-right: 42px;
}
.wdhuaxing {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
}
.fanhui {
  position: absolute;
  width: 120px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  top: 35px;
  left: 385px;
}
.zhtext {
  float: left;
  margin-top: 10px;
}
.zhinput {
  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 4px;
  width: 191px;
  height: 38px;
  text-indent: 8px;
}
.kuai {
  max-width: 1650px;
  height: 850px;
  min-width: 1200px;
  background: #ffffff;
  top: 40px;
  margin: auto;
  position: relative;
}
button {
  outline: none;
}
.zh1 {
  width: 527px;
  height: 807px;
  position: absolute;
  left: 0px;
  top: 20px;
}
.zhimgp {
  width: 527px;
  overflow: hidden;
}
.zhimg {
  width: 471px;
  height: 324px;
  display: -webkit-flex;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  background: #ffffff;
  border: 1px solid #979797;
  padding: 42px;
  padding-left: 26px;
}
.zhimg1 {
  width: 92px;
  height: 138px;
  position: relative;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin-left: 16px;
  margin-bottom: 36px;
  overflow: hidden;
}
.imgjuzhong {
  width: 460px;
  height: 138px;
  position: relative;
  left: -184px;
}
.imgjuzhong > img {
  height: 138px;
  min-width: 92px;
  margin: auto;
}
.zhimg2 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #e1e8ee;
  background: #ffffff;
  position: absolute;
  top: 10px;
  left: 10px;
}
.zhimg2 > img {
  width: 14px;
  height: 14px;
  background-size: 14px 14px;
  position: relative;
  left: -1px;
  top: -1px;
}
.zhimg2x {
  width: 10px;
  height: 10px;
  border: 2px solid #ffe300;
}
.zhimg3 {
  top: 0;
  left: 0;
  width: 102.7px;
  max-height: 153.8px;
}
.zh2 {
  width: 300px;
  height: 38px;
  position: absolute;
  top: 50px;
  left: 588px;
}
.zh3 {
  width: 300px;
  height: 38px;
  position: absolute;
  left: 588px;
  top: 106px;
}
.zh4 {
  width: 595px;
  height: 470px;
  position: absolute;
  left: 588px;
  top: 200px;
}
.juzhong1200 > button {
  width: 250px;
  height: 60px;
  font-size: 14px;
  position: absolute;
}
.zhb1 {
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #666666;
  background: #ffffff;
  left: 588px;
  top: 703px;
  font-weight: bold;
  position: absolute;
}

/* .zhb2:hover {
  border: 1px solid #ffe300;
  border-radius: 4px;
  color: #333333;
  background: #ffe300;
  left: 1250px;
  top: 703px;
} */
.zhb1:hover {
  border: 1px solid #ffe300;
  border-radius: 4px;
  color: #333333;
  background: #ffe300;
  left: 588px;
  top: 703px;
  position: absolute;
}
.zhb1:hover + .zhb2 {
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #666666;
  position: absolute;
  left: 879px;
  top: 703px;
  background: #ffffff;
}
/* border: 1px solid #c1c1c1;
  border-radius: 4px;
  color: #666666;
  left: 1250px;
  top: 703px;background: #ffffff; */
.zhb2 {
  border: 1px solid #ffe300;
  border-radius: 4px;
  color: #333333;
  background: #ffe300;
  left: 879px;
  top: 703px;
  font-weight: bold;
  position: absolute;
}
.newContent {
  padding-left: 19.1875rem;
}
/* 编辑弹窗 */
.editModel {
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  right: 0;
  z-index: 9998;
  background: rgba(51, 51, 51, 0.6);
}
.editBox {
  width: 36.75rem;
  height: 14rem;
  position: fixed;
  z-index: 9999;
  top: calc(50vh - 7rem);
  left: 50%;
  margin-left: -18.725rem;
  background: #fff;
  border-radius: 0.3125rem;
  text-align: left;
}
.closeBox {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.625rem;
  height: 1.625rem;
  z-index: 99999;
}
.editBox .close {
  width: 1.625rem;
  height: 1.625rem;
  display: block;
}
.editBox h5 {
  font-size: 1.5rem;
  color: #333;
  padding: 1.1875rem 1.875rem;
  font-weight: normal;
  position: relative;
}
.editBox h5:after {
  content: "";
  width: 36.75rem;
  height: 0.0625rem;
  background: #b4b4b4;
  bottom: 0;
  left: 0;
  position: absolute;
}
.editTitle {
  padding: 1.25rem 0;
  padding-left: 1.875rem;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.25rem;
  color: #2c2e30;
  position: relative;
}
.editTitle:after {
  position: absolute;
  width: 36.75rem;
  height: 0.0625rem;
  background: #b4b4b4;
  bottom: 0;
  left: 0;
  content: "";
}
.editTitle input {
  width: 27.875rem;
  display: block;
  margin-left: 0.875rem;
  height: 2.5rem;
  box-sizing: border-box;
  padding-left: 0.625rem;
  outline: none;
}
.editBtn {
  padding: 0 1.875rem;
  overflow: hidden;
}
.sureBox {
  float: right;
  display: flex;
  justify-content: end;
  align-items: center;
}
.sureBox button {
  margin-top: 0.9375rem;
  display: block;
  margin-left: 1.25rem;
  width: 6.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #ffde18;
  border-radius: 1.25rem;
  color: #000;
  font-size: 1.25rem;
  text-align: center;
  outline: none;
  border: none;
}
.sureBox button.cancel {
  background: #fff;
  border: 1px solid #8d8d8d;
  color: #8d8d8d;
}
.threedcontent {
  min-height: 1050px;
  background: #eee;
}
.content {
  display: flex;
  justify-content: start;
}
ul.seleBox {
  width: 10rem;
  min-width: 61px;
  min-height: calc(100vh - 4.625rem);
  background: #fff;
  color: #8d8d8d;
  font-size: 1.125rem;
  box-sizing: border-box;
  padding-top: 0.625rem;
}
ul.seleBox li {
  height: 2.375rem;
  line-height: 2.375rem;
  position: relative;
  cursor: default;
}
ul.seleBox span {
  position: absolute;
  height: 2.375rem;
  left: 0;
  top: -0.125rem;
  background: #133ffc;
  width: 0.25rem;
}
.proBox {
  margin-top: 1.875rem;
  margin-left: 2.375rem;
  width: 17.5rem;
  min-width: 172px;
  position: relative;
}
ul.classifyBox {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  height: 2rem;
  overflow: hidden;
  flex-shrink: 0;
  padding-bottom: 0.3125rem;
  transition: all 0.5s;
}
ul.downClassify {
  height: auto;
  overflow: auto;
}
ul.classifyBox li {
  margin-top: 0.3125rem;
  width: 3.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
  margin-right: 1.5rem;
  color: #8d8d8d;
  text-align: center;
  flex-shrink: 0;
  overflow: hidden;
  cursor: default;
  padding: 0 0.3125rem;
  box-sizing: border-box;
  font-size: 1rem;
  background: inherit;
  margin-bottom: 0.625rem;
  border: 2px solid #808080;
}
ul.classifyBox li.downBtn {
  position: absolute;
  width: 1.4375rem;
  height: 1.4375rem !important;
  border: none;
  top: 2px;
  right: 0rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  transform: rotate(180deg);
  border: 1px #000 solid;
}
ul.downClassify li.downBtn {
  transform: rotate(0deg);
}
.addClass {
  position: absolute;
  top: -1.5rem;
  left: 10rem;
  border: 1px #000 solid;
  background: rgb(218, 214, 214);
}
.downBtn img {
  display: block;
  width: 100%;
}
ul.classifyBox li.selected {
  background: #ffde18;
}
.specialLi {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.3rem;
  left: 94%;
  border-radius: 50%;
  border: 1px #000 solid;
}
.specialLi img {
  display: block;
  width: 1rem;
  height: 1rem;
}
ul.proList {
  margin-top: 3.5rem;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 6.625rem;
}
ul.proList li {
  width: 7.8125rem;
  height: 11.75rem;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
  background: #fff;
  box-shadow: 2px 2px 2px #d0d0d0;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}
.listSele {
  position: absolute;
  top: 0;
  left: 0;
  width: 7.8125rem;
  height: 11.75rem;
  z-index: 9;
  opacity: 0;
}
.listImg {
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  width: 1.125rem;
  height: 1.125rem;
  z-index: 8;
  border-radius: 50%;
  background: url("../../assets/image/3d/noselect.png") no-repeat center;
  background-size: 100%;
}
.listSele:checked + .listImg {
  background: url("../../assets/image/3d/hasselect.png") no-repeat center;
  background-size: 100%;
}
ul.proList .specialPro {
  width: 100%;
  background: inherit;
  box-shadow: 0 0 0 #eee;
  text-align: center;
  color: #333;
  display: block;
  height: 25rem;
  margin-top: 2.5rem;
}
ul.proList .specialPro img {
  display: block;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
  margin-bottom: 0.625rem;
}
ul.proList .specialPro span {
  display: block;
  width: 100%;
  text-align: center;
}
ul.pageBox {
  position: fixed;
  z-index: 888;
  width: 17.5rem;
  background: #eee;
  display: flex;
  justify-content: space-around;
  bottom: 0rem;
  left: 12.375rem;
  height: 4rem;
}
.prev,
.next {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 2px 2px 2px #d0d0d0;
}
.prev img,
.next img {
  display: block;
  margin: 0 auto;
  width: 0.5rem;
  height: 1rem;
  margin-top: 0.625rem;
}
.upFabric {
  margin-top: 0.25rem;
  width: 6.875rem;
  height: 2rem;
  border-radius: 1.125rem;
  border: 1px solid #585858;
  color: #585858;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  box-sizing: border-box;
  position: relative;
}
.file {
  position: absolute;
  width: 6.875rem;
  height: 2rem;
  top: 0;
  left: 0;
  opacity: 0;
}
.file2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}
.upFabric img {
  display: block;
  width: 1.1875rem;
  margin-right: 0.3125rem;
}
.backBox {
  margin-top: 1.875rem;
  display: flex;
  align-items: center;
  margin-left: 1.25rem;
  font-size: 1rem;
  color: #585858;
  cursor: default;
}
.backBox img {
  display: block;
  width: 0.625rem;
  margin-right: 0.5rem;
}
.inputBox {
  margin-top: 16.25rem;
  margin-left: 5.625rem;
}
.inputBox label {
  display: block;
  font-size: 1.125rem;
  color: #333;
  margin-bottom: 0.875rem;
  display: flex;
  align-items: center;
}
.inputBox input {
  width: 14rem;
  height: 1.875rem;
  margin-left: 0.25rem;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 0.9375rem;
  box-sizing: border-box;
  padding-left: 1.4rem;
}
.pointBox {
  margin-top: 3.875rem;
  margin-left: 9.375rem;
}
.pointBox span {
  background: #fff url("../../assets/image/3d/top.png") no-repeat center;
  background-size: 1.4375rem 0.875rem;
  width: 3.375rem;
  border-radius: 50%;
  display: block;
  height: 3.375rem;
  margin-bottom: 0.875rem;
}
.pointBox span:hover {
  background: #ffde18 url("../../assets/image/3d/whitetop.png") no-repeat center;
  background-size: 1.4375rem 0.875rem;
}
.pointBox span.top,
.pointBox span.bottom {
  margin-left: 4.3125rem;
}
.pointBox span.left {
  transform: rotate(-90deg);
}
.pointBox span.right {
  transform: rotate(90deg);
  margin-left: 5.125rem;
}
.pointBox span.bottom {
  transform: rotate(180deg);
}
.infeed {
  display: flex;
}
.btnBox {
  display: flex;
  margin-top: 4.5625rem;
  margin-left: 5.625rem;
}
.btn {
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  width: 7.75rem;
  height: 2.25rem;
  color: #333;
  font-size: 1.125rem;
  border: 1px solid #333;
  border-radius: 1.125rem;
  margin-right: 1.25rem;
}
.pictureBtn {
  width: 11.25rem;
  background: #ffc46c;
  color: #5f3b01;
  border: 1px solid #ffc46c;
}
.QR {
  position: relative;
  top: 4rem;
  left: -70%;
}
.qrActive {
  width: 28%;
  min-width: 280px;
  overflow: hidden;
  z-index: 999;
  background: #eeeeee;
  position: absolute;
  top: 19rem;
  left: 38rem;
  transition: all 0.5s;
}
.qrActive img {
  margin: 14% auto 5%;
}
.qrActive .qrBtn {
  width: 181px;
  height: 52px;
  margin: 0 auto;
  background: #ffde18;
  border: 3px #000 solid;
  border-radius: 8px;
  text-align: center;
  line-height: 52px;
}
.qrActive .qrBtn:hover {
  cursor: pointer;
}
.btn img {
  display: block;
  width: 1rem;
  margin-right: 0.625rem;
}
.imgBox {
  position: relative;
  margin-left: 4.375rem;
  margin-top: 6.875rem;
  background: #fff;
  height: 49.25rem;
  width: 32.6875rem;
  border-radius: 0.625rem;
  overflow: hidden;
}
.imgBox img {
  display: block;
  width: 100%;
  height: 100%;
}
.upBox {
  margin-left: 13.5625rem;
  font-size: 0.75rem;
  color: #8d8d8d;
  margin-top: 13.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upBox > span {
  margin: 0.5rem;
  display: block;
}
.line {
  width: 4px;
  height: 400px;
  position: relative;
  background: #ff9d4c;
}
.line > span {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 188px;
  left: calc(50% - 12px);
  border-radius: 50%;
  background: #ff9d4c;
}
.line > span:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}
.line > span:hover .case {
  display: block;
}
.case {
  position: absolute;
  width: 4rem;
  top: 0;
  right: -5rem;
  display: none;
  background: #fff;
  height: 1.5rem;
  border-radius: 0.75rem;
  color: #333;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.5rem;
}
.case:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 0.3rem;
  left: -0.2rem;
  border-width: 0 0.625rem 0.625rem;
  border-style: solid;
  transform: rotate(-45deg);
  border-color: transparent transparent transparent #fff;
}
.bigModel {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.grabBox {
  width: 22.5rem;
  height: 11.25rem;
  background: #fff;
  border-radius: 0.625rem;
  margin: 0 auto;
  position: relative;
  margin-top: 25rem;
}
.grabBox h3 {
  padding-top: 0.9375rem;
  font-weight: normal;
  font-size: 1.5rem;
  margin: 0;
}
.grabBox .del {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  right: 0.5rem;
  top: 0.5rem;
  line-height: 1.25rem;
  text-align: cneter;
  cursor: pointer;
}
.del img {
  width: 100%;
  display: block;
}
.grabBox span {
  display: block;
  margin: 0.9375rem 0 1.875rem;
}
.grabBox .grabWay {
  display: flex;
  justify-content: space-around;
}
.grabWay button {
  width: 7.8125rem;
  height: 2.5rem;
  outline: none;
  border: none;
  line-height: 2.5rem;
  color: #fff;
  background: #133ffc;
  font-size: 1.25rem;
  border-radius: 0.625rem;
}
.fanhui:hover{
  background: #eee !important;
}
</style>