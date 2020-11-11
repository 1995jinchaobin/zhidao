<template>
  <div class="shopdetail">
    <!-- 花型商城详情页 -->
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="content">
      <div class="countTitle">
        <h2>{{proMessage.name}}</h2>
        <span v-if="proMessage.shopName">上传者：{{proMessage.shopName}}</span>
      </div>
      <div class="imgBox">
        <div class="bigImage">
          <div v-if="rendering" class="rendBox">
            <img :src="rendUrl" alt />
            <div class="backBox">
              <img src="../../assets/image/shopping/backicon.png" alt />
              <span @click="backClick">返回花型</span>
            </div>
            <div class="pointBox">
              <span @click="directionClick('top')" class="top"></span>
              <div class="infeed">
                <span @click="directionClick('left')" class="left"></span>
                <span @click="directionClick('right')" class="right"></span>
              </div>
              <span @click="directionClick('bottom')" class="bottom"></span>
            </div>
            <div class="lineBox">
              <span class="lineZoom"></span>
              <div class="line">
                <span @mousedown="pull($event)" @mouseup="push($event)">
                  <span class="case">{{ratio}}</span>
                </span>
              </div>
              <span class="lineReduce"></span>
            </div>
          </div>
          <div class="imgjuzhong">
            <img :src="bindImg+'?x-oss-process=image/resize,l_900'" alt />
          </div>
        </div>
        <!-- <div class="smallImage">
          <div @click="changeImg(1)">
            <img :src="proMessage.picture1+'?x-oss-process=image/resize,l_300'" alt />
          </div>
          <div @click="changeImg(2)" v-if="proMessage.picture2">
            <img :src="proMessage.picture2+'?x-oss-process=image/resize,l_300'" alt />
          </div>
          <div @click="changeImg(3)" v-if="proMessage.picture3">
            <img :src="proMessage.picture3+'?x-oss-process=image/resize,l_300'" alt />
          </div>
          <div @click="changeImg(4)" v-if="proMessage.picture4">
            <img :src="proMessage.picture4+'?x-oss-process=image/resize,l_300'" alt />
          </div>
        </div>-->
      </div>
      <div class="rightBox">
        <!-- <div class="priceBox">
          <p>
            <span class="leftSpan">价格</span>
            <span>￥{{proMessage.price}}</span>
          </p>
          <p @click="toBus">
            <span class="leftSpan">工作室</span>
            <span class="special">{{proMessage.shopName}}</span>
          </p>
        </div>
        <div @click="toVip" class="queenBox">
          <img src="../../assets/image/shopping/queen.png" alt />
          <span>点击获取VIP，享更多优惠</span>
        </div>-->
        <div class="parameter">
          <ul>
            <li v-for="(item,index) in arr" :key="index">
              <h5>{{item.name}}</h5>
              <span>{{item.descript}}</span>
            </li>
          </ul>
        </div>
        <p class="buy">
          <span>
            账户剩余:
            <span class="price">
              &nbsp;
              <b>{{money}}</b>
            </span>花花币； 此次下载将扣除
            <span class="price">
              <b>{{flowerprice}}</b>
            </span>花花币
          </span>
        </p>
        <div class="lookBox">
          <ul class="proList">
            <li @click="modelClick(item.id)" v-for="(item,index) in modelList" :key="index">
              <img height="100%" width="100%" :src="item.backgroudImage" alt />
            </li>
          </ul>
          <span class="proMsg">
            点击模特查看渲染效果图
            <u @click="goThreed">进入模特库</u>
          </span>
        </div>
        <div class="btnBox">
          <div @click="buyNow">
            <img src="../../assets/image/shopping/downLoad.png" />
            <b>{{btnText}}</b>
          </div>
          <div @click="addCar">
            <img src="../../assets/image/shopping/cart.png" />
            <b>加入购物车</b>
          </div>
        </div>
      </div>
    </div>
    <div class="model" v-if="showModel">
      <!--支付框-->
      <div class="payBox">
        <div class="payBoxTitle">本次消费</div>
        <div class="payNumTitle">
          花花币:
          <img src="../../assets/image/user/jinbi-2.png" />
          <label>{{flowerprice}}个</label>
        </div>
        <div class="balanceBox">
          <div class="balance">您可用花花币：{{money}}</div>
        </div>
        <div class="bottom">
          <div class="surePayBtn" @click="payOne">确认支付</div>
          <div class="cancelBtn" @click="closepayBox">取消</div>
        </div>
      </div>
      <!--关闭按钮-->
      <img class="closeBtn" @click="closepayBox" src="../../assets/image/banquan/guanbi.png" />
    </div>
    <Jump v-if="showJump" :title="err" :change="imgChange"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
export default {
  name: "Shopdetail",
  components: {
    Tab,
    Loading,
    Jump
  },
  data() {
    return {
      check: "", //是否同意版权
      imgChange: "",
      path: "/Shopdetail",
      showJump: false,
      err: "",
      tabIndex: 7,
      showLoading: false,
      proMessage: {},
      list: {},
      arr: [],
      message: {},
      // 图片的更换
      bindImg: "",
      showModel: false,
      showGrab: false,
      showPay: false,
      codeSrc: "",
      type: "",
      // 售价
      flowerprice: "",
      // 账户余额
      money: "",
      // 模特数据
      modelList: [],
      modelId: "",
      rotateX: "",
      rotateY: "",
      ratio: 1,
      // 下载按钮文字
      btnText: 0,
      // 渲染效果图显示
      rendering: false,
      rendUrl: "",
      cnt: "",
      // 订单数据
      orderId: Number,
      imgUrl: "",
      o: {}
    };
  },
  methods: {
    // 支付
    payOne() {
      if (this.orderId) {
        let formdata = new FormData();
        let self = this;
        formdata.append("id", this.orderId);
        let obj = {
          url: this.all.baseUrl + "/new/userFlowers/buyOneFlowerDirect",
          formdata: formdata
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "恭喜您成功支付!";
            self.imgChange = "duihao";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              Scroll.move();
              self.$router.push({
                path: "/user/"
              });
            }, 1000);
            //隐藏确认支付框
            self.closepayBox();
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "您的账号已在其它地方登陆";
            self.imgChange = "gantan";
            Scroll.stop();
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
            self.imgChange = "gantan";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.closepayBox();
              Scroll.move();
            }, 1000);
          }
        });
      }
    },
    closepayBox() {
      this.showModel = false;
    },
    xuanzhong(e) {
      this.check = e;
    },
    changeEnglish() {
      this.$router.go(0);
    },
    // 返回
    backClick() {
      this.rendering = false;
      this.$forceUpdate();
    },
    // 去VIP页面
    toVip() {
      this.$router.push({
        path: "/Vip"
      });
    },
    // 去3d预览效果页面
    goThreed() {
      localStorage.setItem("backImg", this.bindImg);
      localStorage.setItem("newType", 1);
      localStorage.setItem("selectType", 1);
      localStorage.setItem("selectList", JSON.stringify(this.list));
      localStorage.setItem("orderId", this.orderId);
      localStorage.setItem("imgUrl", this.imgUrl);
      localStorage.setItem("path", "/Threed");
      // let routeUrl = this.$router.resolve({
      //   path: "/Threed",
      //   query:{
      //     id: this.orderId
      //   }
      // });
      // window.open(routeUrl.href, "/Threed");
      let routeData = this.$router.resolve({
        name: "Threed"
        // query: {id: this.orderId}
      });
      window.open(routeData.href, "_blank");
    },
    // 更换图片
    changeImg(index) {
      switch (index) {
        case 1:
          this.bindImg = this.proMessage.picture1;
          break;
        case 2:
          this.bindImg = this.proMessage.picture2;
          break;
        case 3:
          this.bindImg = this.proMessage.picture3;
          break;
        case 4:
          this.bindImg = this.proMessage.picture4;
          break;
      }
    },
    getMessage() {
      let message = JSON.parse(localStorage.getItem("shopList"));
      this.list = JSON.parse(localStorage.getItem("shopList"));
      this.cnt = localStorage.getItem("cnt");
      if (message.connect == 0) {
        message.connect = "独幅";
      } else if (message.connect == 1) {
        message.connect = "四方连续";
      } else if (message.connect == 2) {
        message.connect = "二方连续";
      } else {
        message.connect = message.connect;
      }
      if (message.picture2 == "null") {
        message.picture2 = null;
      }
      if (message.picture3 == "null") {
        message.picture3 = null;
      }
      if (message.picture4 == "null") {
        message.picture4 = null;
      }
      // message.size = (message.size / 1024 / 1024).toFixed(2);
      this.proMessage = message;
      this.flowerprice = this.proMessage.price;
      this.orderId = this.proMessage.id;
      this.imgUrl = this.proMessage.picture1;
      this.arr = [
        { name: "编号", descript: this.proMessage.id },
        { name: "分辨率", descript: this.proMessage.resolutionRatio + "dpi" },
        { name: "大小", descript: this.proMessage.size + "MB" },
        {
          name: "尺寸",
          descript:
            this.proMessage.sizeWidth +
            "px*" +
            this.proMessage.sizeHeight +
            "px"
        },
        { name: "连接", descript: this.proMessage.connect },
        { name: "格式", descript: "psd" }
      ];
      this.bindImg = this.proMessage.picture1;
    },
    // 获取用户余额
    getMonet() {
      let obj = {
        url: this.all.baseUrl + "/new/userPurse/getUserPurseByUserId",
        formdata: new FormData()
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.money = res.data.result.store_money;
          this.$forceUpdate();
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.imgChange = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
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
    // 获取模特列表
    getModelList() {
      let formdata = new FormData();
      formdata.append("page", 1);
      formdata.append("pageSize", 8);
      let obj = {
        url: this.all.baseUrl + "/template2d/list",
        formdata: formdata
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.modelList = res.data.result.list;
          this.$forceUpdate();
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.imgChange = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
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
    // 点击模特图片
    modelClick(id) {
      let formdata = new FormData();
      let self = this;
      this.modelId = id;
      this.$forceUpdate();
      formdata.append("templateId", id);
      formdata.append("imageUrl", this.bindImg);
      if (this.o.rotateX) {
        formdata.append("rotateX", this.o.rotateX);
      }
      if (this.o.rotateY) {
        formdata.append("rotateY", this.o.rotateY);
      }
      formdata.append("ratio", this.ratio);
      let obj = {
        url: this.all.baseUrl + "/template2d/compose",
        formdata: formdata
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.rendUrl = res.data.result;
          this.rendering = true;
          this.$forceUpdate();
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          self.imgChange = "gantan";
          Scroll.stop();
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
          self.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    directionClick(direction) {
      let self = this;
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
          this.rotateY = this.rotateY.toFixed(2);
          this.showJump = true;
          this.err = "偏移量范围在0~1之间";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1500);
        } else {
          this.rotateY = num;
          this.o.rotateY = this.rotateY;
          this.o.rotateX = this.rotateX;
          this.o.ratio = this.ratio;
          this.compose(this.o);
        }
      } else if (direction == "left") {
        let num = parseFloat(this.rotateX - speed).toFixed(2);
        if (num < 0) {
          this.rotateY = this.rotateX.toFixed(2);
          this.showJump = true;
          this.err = "偏移量范围在0~1之间";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1500);
        } else {
          this.rotateX = num;
          this.o.rotateY = this.rotateY;
          this.o.rotateX = this.rotateX;
          this.o.ratio = this.ratio;
          this.compose(this.o);
        }
      } else if (direction == "right") {
        let num = parseFloat(this.rotateX + speed).toFixed(2);
        if (num > 1) {
          this.rotateX = this.rotateX.toFixed(2);
          this.showJump = true;
          this.err = "偏移量范围在0~1之间";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1500);
        } else {
          this.rotateX = num;
          this.o.rotateY = this.rotateY;
          this.o.rotateX = this.rotateX;
          this.o.ratio = this.ratio;
          this.compose(this.o);
        }
      } else if (direction == "bottom") {
        let num = parseFloat(this.rotateY + speed).toFixed(2);
        if (num > 1) {
          this.rotateY = this.rotateY.toFixed(2);
          this.showJump = true;
          this.err = "偏移量范围在0~1之间";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1500);
        } else {
          this.rotateY = num;
          this.o.rotateY = this.rotateY;
          this.o.rotateX = this.rotateX;
          this.o.ratio = this.ratio;
          this.compose(this.o);
        }
      }
    },
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
      formData.append("imageUrl", this.bindImg);
      formData.append("templateId", this.modelId);
      let obj = {
        url: this.all.baseUrl + "/template2d/compose",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
        }, 500);
        Scroll.move();
        if (res.data.status == 0) {
          this.rendUrl = res.data.result;
          this.$forceUpdate();
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.imgChange = "";
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
    pull(event) {
      var prevent;
      var self = this;
      if (self.bindImg) {
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
          var endy = event.clientY - roundY;
          var endx = event.clientX - roundX;
          if (endy < -20 || endy > 5) {
            self.push();
          }
          if (endx < 0 || endx > 280) {
            if (endx < 0) {
              self.ratio = 2;
            } else {
              self.ratio = 0;
            }
            self.push();
          } else {
            _target.style.left = endx + "px";
            prevent = 1 - endx / 298.6;
            self.ratio = (prevent * 2).toFixed(2);
          }
        };
      }
    },
    move(event) {},
    push() {
      let self = this;
      var o = {};
      o.rotateY = this.rotateY;
      o.rotateX = this.rotateX;
      if (this.ratio <= 0) {
        this.ratio = 0.01;
      }
      o.ratio = this.ratio;
      self.compose(o);
      document.onmousemove = null;
    },
    // 获取会员下载按钮提示文字
    getText() {
      let areaType = JSON.parse(localStorage.getItem("shopList")).areaType;
      let obj = {
        url: this.all.baseUrl + "/new/common/getVipType",
        formdata: new FormData()
      };
      let self = this;
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          if (areaType == 0) {
            self.btnText = "企业VIP95折下载";
            if (res.data.result == 0) {
            } else if (res.data.result == 1 || res.data.result == 2) {
            }
          } else if (areaType == 1) {
            self.btnText = "VIP极速免费下载";
            if (res.data.result == 0 || res.data.result == 1) {
            } else if (res.data.result == 2) {
            }
          }
          self.$forceUpdate();
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.imgChange = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
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
    // 查询用户购物车订单数量
    getOrderNum() {
      let obj = {
        url: this.all.baseUrl + "/new/shoppingCart/getShoppingCount",
        formdata: new FormData()
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          localStorage.removeItem("orderNum");
          localStorage.setItem("orderNum", res.data.result);
        }
      });
    },
    // 加入购物车
    // /shoppingCartJyg/save
    addCar(event) {
      event.preventDefault();
      let formData = new FormData();
      let self = this;
      formData.append("target_id", this.proMessage.id);
      let obj = {
        url: this.all.baseUrl + "/new/shoppingCart/addShoppingCart",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showJump = true;
          this.err = "加入购物车成功";
          this.imgChange = "duihao";
          Scroll.stop();
          this.getOrderNum();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            self.$router.push({
              name: "Shopping",
              params: {
                cnt: self.cnt
              }
            });
          }, 1000);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
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
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 直接下载
    // /app3dStoreIndentMainJyg/placeTheOrderDirectly
    buyNow() {
      this.showModel = true;
    },
    hasPay() {
      let obj = {
        url: this.all.baseUrl + "/appuser/appInfo",
        formdata: new FormData()
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          var self = this;
          if (
            res.data.result.expirationTimePlus !=
              JSON.parse(localStorage.getItem("user")).expirationTimePlus ||
            res.data.result.expirationTime !=
              JSON.parse(localStorage.getItem("user")).expirationTime
          ) {
            this.showJump = true;
            this.err = "充值成功";
            localStorage.setItem("user", res.data.result);
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showModel = false;
              self.showPay = false;
              self.showGrab = false;
              self.setData();
            }, 2000);
          } else {
            this.showJump = true;
            this.err = "您还未支付";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showModel = false;
              self.showPay = false;
              self.showGrab = false;
              Scroll.move();
            }, 2000);
          }
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = res.data.msg;
          this.imgChange = "gantan";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.imgChange = "";
            Scroll.move();
            localStorage.clear();
            self.$router.push({
              path: "/Login"
            });
          }, 1000);
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
    // 选择支付方式
    showBuy(i) {
      let self = this;
      this.type = i;
      let payType = "";
      if (this.check != 1) {
        this.showJump = true;
        this.err = "您没有同意版权声明";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          Scroll.move();
        }, 1000);
      } else {
        if (i == "微信") {
          payType = 5;
        } else if (i == "支付宝") {
          payType = 3;
        }
        let formData = new FormData();
        formData.append("targetId", this.proMessage.id);
        formData.append("modeOfPayment", payType);
        formData.append("theAmountActuallyPaid", this.proMessage.price);
        let obj = {
          url:
            this.all.baseUrl + "/app3dStoreIndentMainJyg/placeTheOrderDirectly",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.codeSrc = res.data.result.src;
            this.showGrab = false;
            this.showPay = true;
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = res.data.msg;
            this.imgChange = "gantan";
            Scroll.stop();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.imgChange = "";
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                path: "/Login"
              });
            }, 1000);
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
      }
    },
    // 关闭弹窗
    delBind() {
      this.showModel = false;
      this.showGrab = false;
      this.showPay = false;
      this.check = 0;
      Scroll.move();
    },
    delPay() {
      this.hasPay();
    },
    setData() {
      // 获取信息
      this.message = JSON.parse(localStorage.getItem("user"));
    },
    toBus() {
      localStorage.setItem("shopType", 1);
      localStorage.setItem("shopList", JSON.stringify(this.proMessage));
      this.$router.push({
        path: "/Shopping"
      });
    }
  },
  mounted() {
    this.getMessage();
    this.getText();
    this.setData();
    this.getMonet();
    this.getModelList();
    // localStorage.setItem("path", this.path);
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Enshopdetail"
      });
    } else {
      this.$router.push({
        path: "/Shopdetail"
      });
    }
  }
};
</script>
<style scoped>
/* 支付弹窗 */
.grabBox {
  width: 22.5rem;
  height: 13.25rem;
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
/* 支付弹窗 */
.payBox {
  width: 34.1146rem;
  height: 35.5019rem;
  margin: 0 auto;
  margin-top: calc(50vh - 18.75rem);
  border-radius: 6px;
  position: relative;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-top: 1.25rem;
}
/* 删除按钮 */
.payDel {
  width: 1.891rem;
  height: 1.891rem;
  cursor: pointer;
  position: relative;
  right: -19rem;
  top: -2.2rem;
}
.smallBox {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.smallBox > img {
  width: 22.3125rem;
  height: 29.0625rem;
  display: block;
  flex-shrink: 0;
}
.smallBox h5,
.smallBox .codeBox {
  margin: 0 auto;
}
.smallBox h5 {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 3.125rem;
  font-weight: normal;
  color: #4d4d4d;
}
.smallBox .codeBox {
  width: 18.75rem;
  height: 18.75rem;
  background: #fff;
  margin: 1.5625rem auto;
  box-sizing: border-box;
  padding-top: 1rem;
}
.codeBox img {
  display: block;
  width: 15.625rem;
  height: 15.625rem;
  margin: 0 auto;
}
.hasPay {
  width: 8.75rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  background: #133ffc;
  border-radius: 0.625rem;
  color: #fff;
  border: none;
  outline: none;
  display: block;
  cursor: pointer;
  margin: 0 auto;
}
.shopdetail {
  min-height: 100vh;
  background: #eee;
  padding-bottom: 6.25rem;
}
.content {
  display: flex;
  position: relative;
  width: 1200px;
  justify-content: flex-start;
  background: #fff;
  margin: 89px auto 0;
}
.imgBox {
  display: flex;
  position: relative;
  flex-direction: column;
}
.backBox {
  width: 120px;
  height: 30px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #bbbbbb;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  color: #333;
  font-size:14px;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
}
.rendBox .backBox > img {
  width: 10px;
  height: 16px;
  display: block;
  margin: 0;
  margin-right: 5px;
}
.bigImage {
  width: 515px;
  height: 773px;
  display: block;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 31px;
  background: #b3b3b3;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  overflow: hidden;
  position: relative;
}
/* .bigImage img {
  display: block;
  max-width: 32.5rem;
  max-height: 40.0625rem;
} */
.imgjuzhong {
  width: 2576px;
  height: 773px;
  position: relative;
  left: -1030px;
}
.imgjuzhong > img {
  margin-left: 0;
  height: 773px;
  min-width: 515px;
  margin: auto;
  display: block;
}
.smallImage {
  display: flex;
}
.smallImage div {
  background: #b3b3b3;
  width: 114px;
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.smallImage div:last-child {
  margin-right: 0;
}
.smallImage img {
  display: block;
  max-width: 114px;
  max-height: 114px;
}
/* 模型预览 */
.rendBox {
  position: absolute;
  width: 515px;
  height: 795px;
  background: #fff;
  z-index: 3;
}
.rendBox img {
  width: 95%;
  height: 95%;
  margin-left: 31px;
}
/* 右侧内容 */
.rightBox {
  margin-top: 36px;
  margin-left: 99px;
  text-align: left;
  z-index: 2;
}
.countTitle {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: -47px;
}
.countTitle h2 {
  font-size: 24px;
  color: #2c2e30;
  margin-bottom: 30px;
  font-weight: normal;
}
.priceBox {
  display: flex;
  flex-direction: column;
}
.priceBox p {
  margin-bottom: 14px;
  font-size: 16px;
  color: #333;
  display: flex;
}
.priceBox span.leftSpan {
  width: 99px;
  display: block;
  flex-shrink: 0;
}
.priceBox span.special {
  color: #133ffc;
  cursor: pointer;
}
.queenBox {
  width: 218px;
  height: 33px;
  background: #ffc56e;
  border-radius: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f3b01;
  font-size: 14px;
  cursor: default;
  margin-bottom: 20px;
}
.queenBox img {
  width: 21px;
  display: block;
  height: 18px;
  margin-right: 5px;
}
.parameter ul {
  width: 548px;
  min-width: 430px;
  display: flex;
  flex-wrap: wrap;
  color: #2c2e30;
  font-size: 18px;
  margin-bottom: 16px;
  box-sizing: border-box;
}
.parameter ul li {
  box-sizing: border-box;
  width: 273px;
  height: 44px;
  display: flex;
  text-align: left;
  /* justify-content: space-around; */
  align-items: center;
}
.parameter ul li span {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #000000;
}
.parameter ul h5 {
  width: 62px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #aaaaaa;
}
.parameter ul li:nth-child(3),
.parameter ul li:nth-child(4) {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

p.buy {
  width: 546px;
  height: 44px;
  background: #fff9eb;
  border: 1px solid #ffe39d;
}
p.buy span {
  display: inline-block;
  color: #666;
  margin-left: 16px;
  font-family: PingFangSC-Regular;
  background: #fff9eb;
  line-height: 44px;
  font-size: 14px;
}
p.buy span.price {
  margin: 0;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #101010;
  letter-spacing: 0;
}
/* 32*32 */
/* 96*96 */
.pointBox {
  position: absolute;
  width: 96px;
  height: 96px;
  right: 22px;
  bottom: 139px;
}
.pointBox span {
  background: #fff url("../../assets/image/shopping/up.png") no-repeat center;
  width: 32px;
  border-radius: 50%;
  display: block;
  height: 32px;
  /* margin-bottom: 14px; */
  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.pointBox span:hover {
  background: #ffe300 url("../../assets/image/shopping/up.png") no-repeat center;
}
.infeed {
  display: flex;
}
.pointBox span.top,
.pointBox span.bottom {
  margin-left: 33px;
}
.pointBox span.left {
  transform: rotate(-90deg);
}
.pointBox span.right {
  transform: rotate(90deg);
  margin-left: 32px;
}
.pointBox span.bottom {
  transform: rotate(180deg);
}
.lineBox {
  position: absolute;
  left: 63px;
  bottom: 103px;
  display: flex;
  align-items: center;
}
.lineZoom,.lineReduce{

  display: inline-block;
}
.lineZoom{
  width: 22px;
  height: 22px;
  background: url('../../assets/image/shopping/zoom.png') no-repeat center;
  background-size: 133%;
  margin-right: 15px;
}
.lineReduce{
  width: 22px;
  height: 22px;
  background: url('../../assets/image/shopping/reduct.png') no-repeat center;
  background-size: 100%;
  margin-left: 15px;
}
.line {
  width: 300px;
  height: 4px;
  position: relative;
  background: #ffed5c;
  border-radius: 4px;
}
.line > span {
  position: absolute;
  width: 16px;
  height: 16px;
  top: -10px;
  left: calc(50% - 12px);
  border-radius: 50%;
  background: #fff;
  border: 4px solid #ffe300;
  box-shadow: 0 5px 15px 0 rgba(27, 27, 78, 0.1);
}
.line > span:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
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
.btnBox {
  margin-bottom: 26px;
  display: flex;
}
.btnBox div {
  display: flex;
  width: 250px;
  height: 60px;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  outline: none;
  margin-right: 20px;
  color: #333333;
  letter-spacing: 0;
  line-height: 60px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
}
.btnBox div img {
  width: 20px;
  height: 20px;
  margin-right: 14px;
}
.btnBox div:first-child {
  background: #ffe300;
  border: 1px solid #ffe300;
}
.btnBox div:first-child img {
  top: 3px;
}
ul.proList {
  display: flex;
  flex-wrap: wrap;
  width: 546px;
  border: 1px solid #e8e8e8;
  border-top: none;
  margin-bottom: 10px;
}
ul.proList li {
  width: 100px;
  height: 150px;
  background: #fff;
  cursor: pointer;
}
ul.proList li:nth-child(1) {
  margin: 22px 0 31px 23px;
}
ul.proList li:nth-child(5) {
  margin: 0 0 31px 15px;
}
ul.proList li:nth-child(2),
ul.proList li:nth-child(3),
ul.proList li:nth-child(4) {
  margin: 22px 15px 31px;
}
ul.proList li:nth-child(6),
ul.proList li:nth-child(7),
ul.proList li:nth-child(8) {
  margin: 0 22px 0 15px;
}
.lookBox .proMsg {
  display: block;
  text-align: right;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.07px;
  margin-bottom: 63px;
}
.lookBox .proMsg > u {
  display: inline-block;
  margin-left: 20px;
  margin-right: 35px;
  font-family: PingFangSC-Regular;
  font-size: 17px;
  color: #ff6600;
  letter-spacing: 0.07px;
  cursor: pointer;
}
.lookBox button {
  display: block;
  border: none;
  outline: none;
  background: inherit;
  font-size: 18px;
  color: rgba(51, 51, 51, 0.8);
  margin-right: 0.375rem;
}
.banquan1 {
  position: absolute;
  top: 4.2rem;
  left: 1.5rem;
}
.banquan2 {
  width: 15rem;
  position: relative;
  left: 3rem;
}
/*弹窗样式*/
.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.payBox {
  background-color: #ffffff;
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
.closeBtn {
  width: 30px;
  height: 30px;
  position: relative;
  top: -175px;
  left: 172px;
}
.payNumTitle {
  font-size: 18px;
  color: #000000;
  letter-spacing: 0.32px;
}
.payNumTitle img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
  margin-right: 8px;
}
.payNumTitle label {
  font-size: 18px;
  color: #fb6413;
}
.balanceBox {
  text-align: left !important;
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.balance {
  margin-left: 10px;
  font-size: 12px;
  color: #666666;
}
.payBox .bottom {
  width: 100%;
  height: 52px;
  display: flex;
  margin-top: 3px;
  position: absolute;
  bottom: 0px;
}
.payBox .surePayBtn,
.payBox .cancelBtn {
  width: 155px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
}
.payBox .surePayBtn {
  background: #ffe135;
}
.payBox .cancelBtn {
  border-top: 1px solid #979797;
  border-left: 1px solid #979797;
  height: 52px;
  line-height: 52px;
}
button {
  cursor: pointer;
}
.payBox .payBoxTitle {
  margin-bottom: 21px;
}
.beforePrice {
  text-decoration: line-through;
  font-family: PingFangSC-Regular;
  font-size: 14px !important;
  color: #9f9c9b !important;
  position: relative;
  margin-left: 8px;
  top: -2px !important;
}
.payBox .vipPrice {
  margin-left: 11px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #fb6413;
}
.btnBox>div,.closeBtn{
  cursor: pointer;
}
.btnBox>div:first-child:hover,.surePayBtn:hover{
  background: #ffd000 !important;
}
.btnBox>div:last-child:hover,.cancelBtn:hover{
  background: #eee !important;
}
</style>