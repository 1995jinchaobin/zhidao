<template>
  <div class="shopdetail">
    <!-- 花型商城详情页 -->
    <Entab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
    <div class="content">
      <div class="imgBox">
        <div class="backBox">
          <img src="../../assets/image/shopping/backicon.png" alt />
          <span @click="backClick">Back</span>
        </div>
        <div class="bigImage">
          <img :src="bindImg+'?x-oss-process=image/resize,l_600'" alt />
        </div>
        <div class="smallImage">
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
        </div>
      </div>
      <div class="rightBox">
        <h2>{{proMessage.name}}</h2>
        <div class="priceBox">
          <p>
            <span class="leftSpan">Price</span>
            <span>￥{{proMessage.price}}</span>
          </p>
          <p @click="toBus">
            <span class="leftSpan">Office</span>
            <span class="special">{{proMessage.shopName}}</span>
          </p>
        </div>
        <div @click="toVip" class="queenBox">
          <img src="../../assets/image/shopping/queen.png" alt />
          <span>Click to get VIP and enjoy more discounts</span>
        </div>
        <div class="parameter">
          <h4>Patterns parameters</h4>
          <ul>
            <li v-for="(item,index) in arr" :key="index">
              <h5>{{item.name}}</h5>
              <img v-if="index==0" src="../../assets/image/shopping/ps.png" alt />
              <span>{{item.descript}}</span>
            </li>
          </ul>
        </div>
        <p class="buy">
          Authorization mode
          <span>The right to use pattern can be used in production and manufacture after purchase</span>
        </p>
        <div class="btnBox">
          <button @click="addCar">Add to cart</button>
          <button @click="buyNow">Buy at once</button>
        </div>
        <div class="lookBox">
          <button @click="goThreed">3D Preview Effect</button>
          <img src="../../assets/image/shopping/backicon.png" alt />
        </div>
      </div>
    </div>
    <div class="model" v-if="showModel">
      <!-- 立即抢购弹窗 -->
      <div class="grabBox" v-if="showGrab">
        <h3>Tigs</h3>
        <p class="del" @click="delBind">
          <img src="../../assets/image/login/close.png" alt />
        </p>
        <input type="radio" @click="xuanzhong(1)" value class="banquan1" />
        <span
          class="banquan2"
        >All patterns purchased have only the right to use, not the copyright. This platform is not responsible for copyright disputes.</span>
        <span>Choose payment method</span>
        <div class="grabWay">
          <button @click="showBuy('WeChat')">WeChat</button>
          <button @click="showBuy('Alipay')">Alipay</button>
        </div>
      </div>
      <div class="payBox" v-if="showPay">
        <span @click="delPay" class="payDel">
          <img src="../../assets/image/login/close.png" alt />
        </span>
        <div class="smallBox">
          <img src="../../assets/image/shopping/pay.png" alt />
          <div class="code">
            <h5>Please open {{type}} payment</h5>
            <div class="codeBox">
              <img :src="codeSrc" alt />
            </div>
            <button @click="hasPay" class="hasPay">I have paid</button>
          </div>
        </div>
      </div>
    </div>
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
import Entab from "../../components/Entab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
export default {
  name: "Enshopdetail",
  components: {
    Entab,
    Loading,
    Jump
  },
  data() {
    return {
      check: "", //是否同意版权
      path: "/Enshopdetail",
      showJump: false,
      err: "",
      tabIndex: 7,
      showLoading: false,
      proMessage: {},
      arr: [],
      list: {},
      message: {},
      // 图片的更换
      bindImg: "",
      showModel: false,
      showGrab: false,
      showPay: false,
      codeSrc: "",
      type: ""
    };
  },
  methods: {
    xuanzhong(e) {
      this.check = e;
    },
    changeEnglish() {
      this.$router.go(0);
    },
    // 返回
    backClick() {
      this.$router.push({
        path: "/Enshopping"
      });
    },
    // 去VIP页面
    toVip() {
      this.$router.push({
        path: "/Envip"
      });
    },
    // 去3d预览效果页面
    goThreed() {
      localStorage.setItem("backImg", this.bindImg);
      localStorage.setItem("newType", 1);
      localStorage.setItem("selectType", 1);
      localStorage.setItem("selectList", JSON.stringify(this.list));
      this.$router.push({
        path: "/Enshopselect"
      });
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
      if (message.connect == 0) {
        message.connect = "Single";
      } else if (message.connect == 1) {
        message.connect = "Tetragonal continuity";
      } else if (message.connect == 2) {
        message.connect = "Bipartite continuity";
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
      message.size = (message.size / 1024 / 1024).toFixed(2);
      this.proMessage = message;
      this.arr = [
        { name: "Format", descript: "psd" },
        { name: "Size", descript: this.proMessage.size + "MB" },
        {
          name: "Resolving power",
          descript: this.proMessage.resolutionRatio + "dpi"
        },
        { name: "Connect", descript: this.proMessage.connect },
        {
          name: "Size",
          descript:
            this.proMessage.sizeWidth +
            "px*" +
            this.proMessage.sizeHeight +
            "px"
        },
        { name: "Number", descript: this.proMessage.id }
      ];
      this.bindImg = this.proMessage.picture1;
    },
    // 加入购物车
    // /shoppingCartJyg/save
    addCar(event) {
      event.preventDefault();
      let formData = new FormData();
      let self = this;
      formData.append("targetId", this.proMessage.id);
      let obj = {
        url: this.all.baseUrl + "/shoppingCartJyg/save",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showJump = true;
          this.err = "Join the shopping cart successfully";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
            self.$router.push({
              path: "/Enshopping"
            });
          }, 1000);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = "Your account has landed elsewhere";
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
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 直接下单
    // /app3dStoreIndentMainJyg/placeTheOrderDirectly
    buyNow() {
      this.showModel = true;
      this.showGrab = true;
      this.showPay = false;
      Scroll.stop();
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
            this.err = "Successful recharge";
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
            this.err = "You haven't paid yet";
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
          this.err = "Your account has landed elsewhere";
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
          console.log("jinru");
        this.showJump = true;
        this.err = "You did not agree with the copyright notice.";
        Scroll.stop();
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          Scroll.move();
        }, 1000);
      } else {
           console.log("jinru1");
        if (i == "WeChat") {
          payType = 5;
        } else if (i == "Alipay") {
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
            this.err = "Your account has landed elsewhere";
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
      this.check=0;
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
        path: "/Enshopping"
      });
    }
  },
  mounted() {
    this.getMessage();
    this.setData();
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
.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.grabBox {
  width: 22.5rem;
  height: 16.25rem;
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
  width: 56.25rem;
  height: 37.5rem;
  margin: 0 auto;
  margin-top: calc(50vh - 18.75rem);
  border-radius: 0.625rem;
  overflow: hidden;
  position: relative;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-top: 1.25rem;
}
.payDel {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  text-align: center;
  line-height: 1.375rem;
  display: block;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: auto;
  margin-right: 0.9375rem;
}
.payDel img {
  display: block;
  width: 100%;
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
  justify-content: flex-start;
  margin-top: 2.8125rem;
  padding: 0 12.3125rem;
}
.imgBox {
  display: flex;
  flex-direction: column;
}
.backBox {
  display: flex;
  color: #585858;
  font-size: 1rem;
  align-items: center;
  cursor: default;
}
.backBox img {
  width: 0.625rem;
  height: 1rem;
  display: block;
  margin-right: 0.3125rem;
}
.bigImage {
  width: 32.5rem;
  height: 40.0625rem;
  display: block;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  background: #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bigImage img {
  display: block;
  max-width: 32.5rem;
  max-height: 40.0625rem;
}
.smallImage {
  display: flex;
}
.smallImage div {
  background: #b3b3b3;
  width: 7.1875rem;
  height: 7.1875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.25rem;
}
.smallImage div:last-child {
  margin-right: 0;
}
.smallImage img {
  display: block;
  max-width: 7.1875rem;
  max-height: 7.1875rem;
}
/* 右侧内容 */
.rightBox {
  margin-top: 4.25rem;
  margin-left: 6.25rem;
  text-align: left;
}
.rightBox h2 {
  font-size: 1.875rem;
  color: #2c2e30;
  margin-bottom: 1.875rem;
  font-weight: normal;
}
.priceBox {
  display: flex;
  flex-direction: column;
}
.priceBox p {
  margin-bottom: 0.875rem;
  font-size: 1rem;
  color: #333;
  display: flex;
}
.priceBox span.leftSpan {
  width: 6.25rem;
  display: block;
  flex-shrink: 0;
}
.priceBox span.special {
  color: #133ffc;
  cursor: pointer;
}
.queenBox {
  width: 13.75rem;
  height: 2.125rem;
  background: #ffc56e;
  border-radius: 1.0625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f3b01;
  font-size: 0.875rem;
  cursor: default;
  box-sizing: border-box;
  padding: 0 1rem;
  margin-bottom: 1.25rem;
}
.queenBox img {
  width: 1.3125rem;
  display: block;
  height: 1.125rem;
  margin-right: 0.3125rem;
}
.parameter h4 {
  font-size: 1.125rem;
  font-weight: normal;
  color: #2c2e30;
  margin-bottom: 0.625rem;
}
.parameter ul {
  width: 46.5rem;
  height: 9.375rem;
  display: flex;
  flex-wrap: wrap;
  color: #2c2e30;
  font-size: 1.125rem;
  margin-bottom: 2.375rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 2px #e3e3e3;
}
.parameter ul li {
  box-sizing: border-box;
  width: 23.125rem;
  height: 3.125rem;
  display: flex;
  text-align: left;
  align-items: center;
}
.parameter ul li span {
  font-size: 0.875rem;
}
.parameter ul img {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
}
.parameter ul h5 {
  font-weight: normal;
  width: 11rem;
  margin-left: 1.875rem;
}
.parameter ul li:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.parameter ul li:nth-child(1),
.parameter ul li:nth-child(2),
.parameter ul li:nth-child(3),
.parameter ul li:nth-child(4) {
  border-bottom: 1px solid #ddd;
}
p.buy {
  margin-bottom: 3.375rem;
  color: #2c2e30;
  font-size: 0.875rem;
}
p.buy span {
  display: inline-block;
  margin-left: 1rem;
}
.btnBox {
  margin-bottom: 1.625rem;
  display: flex;
}
.btnBox button {
  display: block;
  width: 7.5rem;
  height: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #ff0036;
  border-radius: 1.25rem;
  outline: none;
  background: #fff;
  margin-right: 1.25rem;
  font-size: 1.125rem;
  color: #ff0036;
}
.btnBox button:last-child {
  background: #ff0036;
  color: #fff;
}
.lookBox {
  display: flex;
  align-items: center;
}
.lookBox img {
  display: block;
  transform: rotate(180deg);
  width: 0.5rem;
  height: 1rem;
}
.lookBox button {
  display: block;
  border: none;
  outline: none;
  background: inherit;
  font-size: 1.125rem;
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
</style>