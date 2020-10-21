<template>
  <div class="threed">
    <!-- 3D展示 -->
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="blackzhezhao" v-if="zhe==1">
      <div class="zhhuaxing">
        <div class="header">
          <div @click="zhf3" style="cursor:pointer;" :class="qiehuan==0?'jiacu':''">我的面料</div>
          <div @click="zhf4" style="cursor:pointer;" :class="qiehuan==1?'jiacu':''">我的花型</div>
        </div>
        <div class="zhimg" v-if="qiehuan==0" @scroll="mianliaohuadong($event)">
          <div class="zhimg1" v-for="(item,index) in mianliao" :key="index" @click="zhimgf1(index)">
            <div class="imgjuzhong">
              <img class="zhimg3"  style="cursor:pointer;" :src="item.preview" alt />
            </div>

            <div class="zhimg2">
              <img  style="cursor:pointer;" v-if="mianliaohuaxing==index" src="../../assets/image/3d/duihao.png" alt />
            </div>
          </div>
        </div>
        <div class="zhimg" v-if="qiehuan==1" @scroll="huaxinghuadong($event)">
          <div class="zhimg1" v-for="(item,index) in huaxing" :key="index" @click="zhimgf1(index)">
            <div class="imgjuzhong">
              <img v-if="item.type!=3" class="zhimg3" :src="item.flowerType.preview" alt />
            </div>
            <div class="imgjuzhong">
              <img
                v-if="item.type==3"
                class="zhimg3"
                :src="item.storeIndentSubsidiary.picture1"
                alt
              />
            </div>
            <div class="zhimg2">
              <img v-if="mianliaohuaxing==index" src="../../assets/image/3d/duihao.png" alt />
            </div>
          </div>
        </div>
        <div class="zhbutton">
          <button class="zhbutton1" @click="zhf5()">确定</button>
          <button class="zhbutton2">本地上传</button>
          <input
            class="zhfile1"
            v-if="zhtype!=2"
            @change="zhf6"
            accept="image/*"
            multiple
            type="file"
          />
          <input
            class="zhfile1"
            v-if="zhtype==2"
            @change="add"
            accept="image/*"
            multiple
            type="file"
          />
        </div>
        <img class="guanbi" src="../../assets/image/studio/close.png" @click="zhf2" />
      </div>
    </div>
    <div class="content">
      <!-- <ul v-if="showLeft" class="seleBox" :style="{height: height}">
                <li @click="changeMessage(index)" v-for="(item,index) in select" :key="index" :style="{color: item.show?'#133ffc':'#8d8d8d'}">{{item.name}}<span v-if="item.show"></span></li>
            </ul>
            <div v-if="!showLeft" class="seleBox" :style="{width: '10rem',height: height,background: '#eee'}">
      </div>-->
      <div class="zh" v-if="zhtype==0">
        <div class="zh1">
          <div class="zh2">
            <div class="zhbox0">类型</div>
            <div
              class="zhbox1"
              @click="seleClick(index)"
              :style="{color: item.show?'#F06D29':'#333333'}"
              v-for="(item,index) in btnArr"
              :key="index"
            >{{item.name}}</div>
            <button class="xuanzehuaxing" @click="zhf1">选择花型</button>
          </div>
        </div>
        <div class="zh1" style="border-bottom: 0.5px dotted rgb(219, 214, 214);">
          <div class="zh2">
            <div class="zhbox0" @click="ceshi()">分类</div>
            <!-- <div class="zhbox20">全部</div> -->
            <div
              class="zhbox2"
              @click="changeMessage(index)"
              @mouseover="hover(index)"
              @mouseleave="hover2()"
              v-for="(item,index) in select"
              :key="index"
              :style="{color:m2==index?'rgb(240, 109, 41)':''}"
            >
              {{item.name}}
              <span class="zhspan2" v-if="m1==index&&xialakuangshow1==1">
                <img src="../../assets/image/top.png" />
              </span>
              <span class="zhspan2" v-if="m1==index&&xialakuangshow1==0">
                <img src="../../assets/image/bottom.png" />
              </span>
              <span class="zhspan1" v-if="m1!=index&&xialakuangshow1==1">
                <img src="../../assets/image/bottom.png" />
              </span>
              <span class="zhspan1" v-if="m1!=index&&xialakuangshow1==0">
                <img src="../../assets/image/bottom.png" />
              </span>
              <div class="whitebox" v-if="m1==index"></div>
              <div
                class="zhbox2bottom"
                v-if="m1==index&&xialakuangshow1==1"
                :style="{left:-60*index-1+'px'}"
              >
                <div
                  @click.stop="changeClassify(index2,index)"
                  :key="index2"
                  v-for="(item,index2) in classify2[m1]"
                >{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zh1" style="font-size:14px" v-if="zhtype==1">
        <div class="zh2">
          <div class="zhbox0">类型</div>
          <div
            class="zhbox1"
            @click="seleClick(index)"
            :style="{color: item.show?'#F06D29':'#333333'}"
            v-for="(item,index) in btnArr"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="zh" v-if="zhtype==2">
        <div class="zh1">
          <div class="zh2">
            <div class="zhbox0">类型</div>
            <div
              class="zhbox1"
              @click.stop="seleClick(index)"
              :style="{color: item.show?'#F06D29':'#333333'}"
              v-for="(item,index) in btnArr"
              :key="index"
            >{{item.name}}</div>
            <button @click="download" class="xiazai">下载</button>
            <button class="xuanzehuaxing" @click="zhf1">选择花型</button>
          </div>
        </div>
        <div class="zh1" style="border-bottom: 0.5px dotted rgb(219, 214, 214);">
          <div class="zh2">
            <div class="zhbox0">分类</div>
            <!-- <div class="zhbox20">全部</div> @click="ceshi()" -->
            <div
              class="zhbox20"
              @click="indexClick(index)"
              v-for="(item,index) in select"
              :style="{color:xiliem1==index?'rgb(240, 109, 41)':''}"
              :key="index"
            >{{item.name}}</div>
            <!-- :style="{color:xiliem1==index?'rgb(240, 109, 41)':''}" -->
          </div>
        </div>
      </div>
      <div class="proBox">
        <!-- <ul class="btnBox">
                    <li @click="seleClick(index)" :style="{color: item.show?'#333':'#888'}" v-for="(item,index) in btnArr" :key="index">{{item.name}}</li>
                </ul>
                <div v-if="!showOnly&&!showSuit" class="topBox">
                    <h4>热门分类：</h4>
                    <ul class="classifyBox">
                        <li @click="changeClassify(index)" :key="index" :class="item.show==true?'special':''" v-for="(item,index) in classify">{{item.title}}</li>
                    </ul>
        </div>-->

        <!-- <div class="topBox" style="justify-content: space-between;" v-if="showSuit">
          <div class="onlyBtn">
            <button @click="ceshi">ceshi</button>
            <div class="downBox" v-if="showSuit">
              <span @click="download">下载</span>
            </div>
            <input id="uploaderInput" accept="image/*" multiple type="file" @change="add" />
            <span>选择花型</span>
          </div>
        </div>-->

        <ul v-if="proList.length" class="proList" id="prolisttongji">
          <li v-for="(item,index) in proList" :key="index" @click="toDetail(index)">
            <img height="100%" width="100%" :src="item.backgroudImage" alt />
          </li>
        </ul>
        <div class="nodata" v-if="!proList.length&&!showOnly">
          <img src="../../assets/image/user/Emoji.png" alt />
          <span>暂无数据</span>
        </div>
        <div class="dingzhi" v-if="!proList.length&&showOnly">
          <div class="modelBox">
            <h4>私人模型</h4>
            <h5>联系方式QQ:3501256100</h5>
            <p>1.用户所需制作的模型，上传图片应为免费可商用或其用户拥有合法可商用权利。因所图片内容及版权引发的一切纠纷、损失，由该图片的上传者承担全部直接或间接（连带）法律责任，织道不承担任何法律责任。</p>
            <p>2.图片及处理后的模型仅供上传者使用，织道承诺不进行对外销售。</p>
            <p>3.用户所提供的图片，因其质量、版权、内容、难易等，织道有权拒绝进行模型制作。</p>
            <p>4.用户需主动联系织道工作人员，提供模型图片，需缴纳6元/个模型的手工费，付费完毕后，工作人员会在规定的时间内，将模型上传至该用户私人模型，并仅供其该上传用户使用。</p>
            <p>5.用户对私人模型拥有永久使用权。若因模型及图片有违反国家法律、行政法规、部门规章等行为，织道有权对图片、模型进行处理。</p>
            <p>
              6.私人模型工作时间：周一至周五，早上9点至下午5点，节假日除外。
              <span>模型制作时间：用户付费后三个工作日内。</span>
            </p>
          </div>
        </div>
        <ul class="pageBox" v-if="pageNumber!=0">
          <li @click="prev"  style="cursor:pointer;">
            <img src="../../assets/image/cut/left.png" alt />
          </li>
          <li  style="cursor:pointer;"
            @click="btnClick(index)"
            :class="index==pageIndex-1?'click':''"
            v-for="(item,index) in page"
            :key="index"
          >{{item.name}}</li>
          <li @click="next"  style="cursor:pointer;">
            <img src="../../assets/image/cut/right.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="model" v-if="showModel">
      <div class="modelBox">
        <h4>私人模型</h4>
        <img @click="modelClose" src="../../assets/image/login/close.png" alt />
        <h5>联系方式QQ:3501256100</h5>
        <p>1.用户所需制作的模型，上传图片应为免费可商用或其用户拥有合法可商用权利。因所图片内容及版权引发的一切纠纷、损失，由该图片的上传者承担全部直接或间接（连带）法律责任，织道不承担任何法律责任。</p>
        <p>2.图片及处理后的模型仅供上传者使用，织道承诺不进行对外销售。</p>
        <p>3.用户所提供的图片，因其质量、版权、内容、难易等，织道有权拒绝进行模型制作。</p>
        <p>4.用户需主动联系织道工作人员，提供模型图片，需缴纳10元/个模型的手工费，付费完毕后，工作人员会在规定的时间内，将模型上传至该用户私人模型，并仅供其该上传用户使用。</p>
        <p>5.用户对私人模型拥有永久使用权。若因模型及图片有违反国家法律、行政法规、部门规章等行为，织道有权对图片、模型进行处理。</p>
        <p>
          6.私人模型工作时间：周一至周五，早上9点至下午5点，节假日除外。
          <span>模型制作时间：用户付费后三个工作日内。</span>
        </p>
      </div>
    </div>
    <!--  v-if="showSuit&&showFlower" -->
    <!-- <div class="model" v-if="showSuit&&showFlower">
      <div class="backFlower">
        <span>选择花型</span>
      </div>
      <img class="flowerImg" src="../../assets/image/cut/flower.png" alt />
      <img @click="closeFlower" class="konwImg" src="../../assets/image/cut/know.png" alt />
    </div> -->
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";
export default {
  name: "Threed",
  components: {
    Tab,
    Loading,
    Jump
  },
  data() {
    return {
      btnArr: [
        { name: "默认服装", show: true },
        { name: "私人模型", show: false },
        { name: "系列展示", show: false }
      ],
      zhe: 0,
      path: "/Threed",
      showJump: false,
      type: this.$route.query.type,
      typeindex: this.$route.query.index,
      err: "",
      height: "",
      tabIndex: 5,
      showLoading: true,
      // 左侧分类
      select: [
        { name: "女装", show: true },
        { name: "男装", show: false },
        { name: "童装", show: false },
        { name: "家纺", show: false },
        { name: "其它", show: false }
      ],
      newSelect: [
        { name: "女装", show: true },
        { name: "男装", show: false },
        { name: "童装", show: false },
        { name: "家纺", show: false },
        { name: "其它", show: false }
      ],
      classIndex: 0,
      classFlag: 0,
      // 商品列表
      proList: [],
      // 右侧分类
      classify: [],
      classify2: [[], [], [], [], []],
      pageNumber: null,
      flag: 0,
      cnt: 1,
      pageIndex: 1,
      page: [],
      id: 0,
      showModel: false,
      showOnly: false,
      showSuit: false,
      url: [],
      showLeft: true,
      suitIndex: 0,
      showFlower: false,
      backImg: "",
      ourMsg: {},
      proNew: true,
      zhtype: 0,
      m1: 1,
      m2: 0,
      qiehuan: 0,
      mianliao: [],
      huaxing: [],
      mianliaolastPage: 1,
      huaxinglastPage: 1,
      mianliaopage: 1,
      huaxingpage: 1,
      mianliaohuaxing: -100, //我的花型面料第几个
      imageUrl: "",
      proList1: "",
      templateid: [],
      orderId: "",
      xialakuangshow1: 0,
      xialakuangshow2: 0,
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      xiliem1: 0
    };
  },
  methods: {
    mianliaohuadong(event) {
      let self = this;
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      if (scrollBottom < 50 && this.mianliaopage < this.mianliaolastPage) {
        this.mianliaopage++;self.showLoading = true;
        let formData = new FormData();
        formData.append("pageSize", 25);
        formData.append("page", this.mianliaopage);
        let obj = {
          url: this.all.baseUrl + "/app3dFlowerMyUpload/list",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.showLoading = false;
          if (res.data.status == 0) {
            for (let i = 0; i < res.data.result.list.length; i++) {
              self.mianliao.push(res.data.result.list[i]);
            }
            self.mianliaolastPage = res.data.result.lastPage;
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
    huaxinghuadong(event) {
      let self = this;
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      if (scrollBottom < 50 && this.huaxingpage < this.huaxinglastPage) {
        this.huaxingpage++;self.showLoading = true;
        let formData = new FormData();
        formData.append("pageSize", 25);
        formData.append("page", self.huaxingpage);
        let obj = {
          url: this.all.baseUrl + "/new/userFlowers/list",
          formdata: formData
        };
        self.getData(obj).then(res => {
          self.showLoading = false;
          if (res.data.status == 0) {
            for (let i = 0; i < res.data.result.list.length; i++) {
              self.huaxing.push(res.data.result.list[i]);
            }
            self.huaxinglastPage = res.data.result.lastPage;
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
    jiazaixilie() {
      let self = this;
      self.backImg = self.imageUrl;
      let str = "";
      let arr = [];
      //console.log(self.proList);
      self.proList.map(function(item, index) {
        // arr.push(item.id);
        self.compose(
          index,
          item.id
        );
      });
      str = arr.join(",");
    },
    jiazai(e) {
      let self = this;
      // //console.log(e);
      for (let i = 0; i < e.length; i++) {
        this.jiazai2(e[i].id, i);
      }
      self.proList = self.proList1;
      //
    },
    jiazai2(e, r) {
      let self = this;
      let formData = new FormData();
      formData.append("templateId", e);
      formData.append("imageUrl", self.imageUrl);
      // //console.log(self.imageUrl);
      let obj = {
        url: this.all.baseUrl + "/template2d/compose",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          self.proList1[r].backgroudImage = res.data.result;
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
    },
    zhimgf1(e) {
      this.mianliaohuaxing = e;
    },
    zhf1() {
      this.zhe = 1;
      //this.mianliaopage=1;
      // this.huaxingpage=1;
      let self = this;
      this.mianliaohuaxing = -100;
      if (self.mianliao == "") {
        self.zhf3();
      }
    },
    zhf2() {
      this.zhe = 0;
    },
    zhf3() {
      let self = this;
      this.mianliaohuaxing = -100;
      this.mianliaopage = 1;
      this.qiehuan = 0;
      let formData = new FormData();
      formData.append("pageSize", 25);
      formData.append("page", 1);
      let obj = {
        url: this.all.baseUrl + "/app3dFlowerMyUpload/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          self.mianliao = res.data.result.list;
          // for(let i=0;i<res.data.result.list.length;i++){
          //   self.mianliao.push(res.data.result.list[i]) ;
          // }
          self.mianliaopage = 1;
          self.mianliaolastPage = res.data.result.lastPage;
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
    },
    zhf4() {
      let self = this;
      this.mianliaohuaxing = -100;
      let formData = new FormData();
      this.huaxingpage = 1;
      this.qiehuan = 1;
      formData.append("pageSize", 25);
      formData.append("page", 1);
      let obj = {
        url: this.all.baseUrl + "/new/userFlowers/list",
        formdata: formData
      };
      self.getData(obj).then(res => {
        if (res.data.status == 0) {
          self.huaxing = res.data.result.list;
          self.huaxingpage = 1;
          self.huaxinglastPage = res.data.result.lastPage;
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
    },
    zhf5(val) {
      if (val) {
        this.imageUrl = localStorage.getItem("imgUrl");
        localStorage.removeItem("imgUrl");
        this.getList();
        this.getProlist();
      } else {
        if (this.mianliaohuaxing != -100) {
          if (this.qiehuan == 0) {
            this.imageUrl = this.mianliao[this.mianliaohuaxing].preview;
            if (this.zhtype != 2) {
              this.getProlist();
            } else if (this.zhtype == 2) {
              this.jiazaixilie();
            }
          } else if (this.qiehuan == 1) {
            if (this.huaxing[this.mianliaohuaxing].type != 3) {
              this.imageUrl = this.huaxing[
                this.mianliaohuaxing
              ].flowerType.preview;
            } else if (this.huaxing[this.mianliaohuaxing].type == 3) {
              this.imageUrl = this.huaxing[
                this.mianliaohuaxing
              ].storeIndentSubsidiary.picture1;
            }
            if (this.zhtype != 2) {
              this.getProlist();
            } else if (this.zhtype == 2) {
              this.jiazaixilie();
            }
          } else {
            this.showJump = true;
            this.err = "您未选中图片";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        }
        this.zhe = 0;
        this.$forceUpdate();
      }
      this.zhe = 0;
    },
    zhf6(e) {
      let self = this;
      let file = e.target.files[0];
      if (file.length > 1) {
        this.showJump = true;
        this.err = "不能上传多个图片";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (file.size > 20971520) {
        this.showJump = true;
        this.err = "文件大小超过20MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        //传图片
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(file); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {};
        let formData = new FormData();
        formData.append("file", file);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          if (res.data.status == 0) {
            //console.log(res.data.result);
            self.imageUrl = res.data.result;
            self.getProlist();
			self.zhf2();//shj20191113上传完图片后关闭弹出框
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
            }, 1000);
          }
        });
        //传图片结束
      }
    },
    ceshi() {},
    hover(e) {
      this.m1 = e;
      // this.classIndex = e;//console.log("genre1",this.classIndex);

      this.xialakuangshow1 = 1;
    },
    hover2() {
      this.xialakuangshow1 = 0;
    },

    // 下载
    download() {
      let self = this;
      if (this.backImg) {
        let arr = [];
        this.showLoading = true;
        this.proList.map(function(item, index) {
          // arr.push(item.backgroudImage);
          arr.push(item.id);
        });
        let str = arr.join(",");
        let formData = new FormData();
        formData.append("templateIds", str);
        formData.append("imageUrl", this.backImg);
        let obj = {
          url: this.all.baseUrl + "/template2d/composeHDs",
          formdata: formData
        };
        this.getData(obj).then(res => {
          setTimeout(function() {
            self.showLoading = false;
          }, 5000);
          if (res.data.status == 0) {
            window.location.href =
              this.all.baseUrl + "/file/multiDown3D?images=" + res.data.result;
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
            }, 1500);
          }
        });
      } else {
        this.showJump = true;
        this.err = "请先选择花型";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      }
    },
    // 套装展示
    add(e) {
      let self = this;
      let file = e.target.files;
      if (file.length > 1) {
        this.showJump = true;
        this.err = "不能上传多个图片";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let files = e.target.files[0];
        this.url = files;
        this.showLoading = true;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          let formData = new FormData();
          formData.append("file", self.url);
          let obj = {
            url: self.all.baseUrl + "/file/upload",
            formdata: formData
          };
          self.getData(obj).then(res => {
            self.backImg = res.data.result;
            let str = "";
            let arr = [];

            self.proList.map(function(item, index) {
              // arr.push(item.id);
              //console.log(index,item.id)
              self.compose(
                index,
                item.id
              );
            });
            str = arr.join(",");
            // index,item.id
            // self.compose(str);
			
          });
        };
      }
      this.zhe = 0;
    },
    // 图片合成接口
    // str
    compose(index, id) {
      //console.log(index, id);
      this.showLoading = true;
      let self = this;
      Scroll.stop();
      let formData = new FormData();
      formData.append("imageUrl", self.backImg);
      formData.append("templateId", id);
      formData.append("ratio", 1);
      // formData.append('templateIds','404');
      let obj = {
        url: self.all.baseUrl + "/template2d/compose",
        formdata: formData
      };
      // let obj = {
      //     url: self.all.baseUrl + '/template2d/multiCompose',
      //     formdata: formData
      // }
      self.getData(obj).then(res => {
        if (index == self.proList.length - 1) {
          setTimeout(function() {
            self.showLoading = false;
          }, 500);
        }
        Scroll.move();
        if (res.data.status == 0) {
          // this.proList.map(function(item,index){
          //     item.backgroudImage = res.data.result[index];
          // });
          this.proList[index].backgroudImage = res.data.result;
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
          Scroll.stop();
          self.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      });
    },
    // 关闭弹窗
    closeFlower() {
      this.showFlower = false;
      localStorage.removeItem("suitIndex");
      Scroll.move();
    },
    indexClick(index) {
      this.xiliem1 = index;
      this.m2 = index;
      this.proList = [];
      this.newSelect.map(function(item) {
        item.show = false;
      });
      this.newSelect[index].show = true;
      this.proNew = false;
      this.suitIndex = index;
      // this.backImg = '';

      this.getSuit();
    },
    getSuit() {
      //console.log('进来')
      let self = this;
      this.showLoading = true;
      let formData = new FormData();
      formData.append("suittype", this.suitIndex);
      let obj = {
        url: this.all.baseUrl + "/template2d/suittype",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
          Scroll.move();
        }, 500);
        let result;
        if (res.data.status == 0) {
          result = res.data.result;
          //console.log(this.proList,'this.proList');
          this.proList = result;
          if (this.proList.length && this.ourMsg.id && this.proNew) {
            this.proList = this.ourMsg.proList;
            //console.log(this.proList,'this.proList');
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
            if (this.backImg) {
              let arr = [];
              let str = "";
              //console.log(this.proList,'this.proList');
              this.proList.map(function(item, index) {
                // arr.push(item.id);
                //console.log(item,index);
                if (item != undefined) {
                  //console.log(item);
                  self.compose(
                    index,
                    item.id
                  );
                }
              });
              str = arr.join(",");
              // self.compose(index,item.id);
              //self.compose(str);
            }
          }
          this.$forceUpdate();
        } else {
          this.showJump = true;
          Scroll.stop();
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1500);
        }
      });
    },
    seleClick(index) {
      this.imageUrl = "";
      this.zhtype = index;
      this.btnArr.map(function(item) {
        item.show = false;
      });
      this.btnArr[index].show = true;
      this.proList = [];
      // this.backImg = '';
      if (index == 0) {
        this.m2 = 0;
        this.showLeft = true;
        this.select.map(function(item) {
          item.show = false;
        });
        this.cnt = 1;
        this.proNew = false;
        this.page = [];
        this.flag = 0;
        this.pageIndex = 1;
        this.pageNumber = 0;
        this.showSuit = false;
        this.showOnly = false;
        this.select[0].show = true;
        this.id = 0;
        //console.log(this.id,'id');
        this.classIndex = 0;
        this.backImg = "";
        this.getList(0);
        this.getProlist();
        //console.log(this.classIndex, this.classIndex, "传参");
      } else if (index == 1) {
        this.showLeft = false;
        this.select.map(function(item) {
          item.show = false;
        });
        this.cnt = 1;
        this.backImg = "";
        this.proNew = false;
        this.page = [];
        this.flag = 0;
        this.pageIndex = 1;
        this.pageNumber = 0;
        //console.log(this.proList);
        this.proList = [];
        this.showSuit = false;
        this.showOnly = true;
        this.getOnlylist();
      } else {
        // this.m2=0;
        this.showLeft = false;
        this.id = 0; //console.log(this.id,'id');
        this.classIndex = 0;
        this.suitClick();
      }
      this.$forceUpdate();
    },
    suitClick() {
      this.select.map(function(item) {
        item.show = false;
      });
      this.cnt = 1;
      this.page = [];
      this.flag = 0;
      this.pageIndex = 1;
      this.pageNumber = 0;
      this.proList = [];
      this.showSuit = true;
      this.showOnly = false;
      if (localStorage.getItem("suitIndex")) {
        this.showFlower = true;
        Scroll.stop();
      }
      this.getSuit();
    },
    changeEnglish() {
      this.$router.go(0);
    },
    // 获取高度
    getHeight() {
      this.height = document.offsetHeight - 74 + "px";
    },
    // 左边分类
    changeMessage(index) {
      this.m2 = index;
      this.classify = [];
      this.page = [];
      this.showOnly = false;
      this.showSuit = false;
      this.cnt = 1;
      this.flag = 0;
      this.pageIndex = 1;
      this.pageNumber = 0;
      this.select.map(function(item) {
        item.show = false;
      });
      switch (index) {
        case 0:
          this.classIndex = 0; //console.log("genre1",this.classIndex);
          this.id = 0; //console.log(this.id,'id');
          break;
        case 1:
          this.classIndex = 1; //console.log("genre1",this.classIndex);
          this.id = 11; //console.log(this.id,'id');
          break;
        case 2:
          this.classIndex = index; //console.log("genre1",this.classIndex);
          this.id = 21; //console.log(this.id,'id');
          break;
        case 3:
          this.classIndex = index; //console.log("genre1",this.classIndex);
          this.id = 19; //console.log(this.id,'id');
          break;
        default:
          this.classIndex = index; //console.log("genre1",this.classIndex);
          this.id = 17; //console.log(this.id,'id');
          break;
      }
      this.select[index].show = true;
      this.classFlag = 0;
      //console.log(this.zhtype,'zhtype');
      if (this.zhtype != 2) {
        this.getList();
        this.getProlist();
      } else if (this.zhtype == 2) {
        this.jiazaixilie;
      }
    },
    // 私人衣橱
    getOnlylist() {
      this.showLoading = true;
      let self = this;
      let formData = new FormData();
      formData.append("pageSize", 10);
      formData.append("page", this.cnt);
      let obj = {
        url: this.all.baseUrl + "/template2dUserOwn/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
          Scroll.move();
        }, 500);
        let result;
        if (res.data.status == 0) {
          result = res.data.result;
          this.pageNumber = result.pages;
          this.pageAuto();
          this.$forceUpdate();
          this.proList = result.list;
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
          }, 1500);
        }
      });
    },
    // 点击定制模型
    modelClick() {
      this.showModel = true;
    },
    // 点击关闭图片
    modelClose() {
      this.showModel = false;
    },
    // 去查看细节
    toDetail(index) {
      // _czc.push(["_trackEvent", "3D展示", "查看细节", "", "", "prolisttongji"]);
      let self = this;
      if (this.showSuit) {
        if (this.backImg == "") {
          this.showJump = true;
          this.err = "请先选择花型";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        } else {
          let classifyIndex = 0;
          this.newSelect.map(function(item, index) {
            if (item.show) {
              classifyIndex = index;
            }
          });
          let json = {
            id: this.proList[index].id,
            index: index,
            picture: this.proList[index].backgroudImage,
            backImg: this.backImg,
            proList: this.proList,
            type: 3,
            classifyIndex: classifyIndex,
            cnt: this.cnt
          };
          localStorage.setItem("threedList", JSON.stringify(json));
          // 如果在首页加载了花型则将花型参数携带到查看细节页面
          if (this.imageUrl) {
            localStorage.setItem("imgUrl", this.imageUrl);
            // localStorage.setItem('orderId',json.id);
          }
          this.$router.push({
            path: "/Content"
          });
        }
      } else if (this.showOnly) {
        let json = {
          id: this.proList[index].id,
          picture: this.proList[index].backgroudImage,
          type: 2,
          cnt: this.cnt
        };
        localStorage.setItem("threedList", JSON.stringify(json));
        this.$router.push({
          path: "/Content"
        });
      } else {
        let leftIndex = 0;
        let classifyIndex = 0;
        this.select.map(function(item, index) {
          if (item.show) {
            leftIndex = index;
          }
        });
        this.classify.map(function(item, index) {
          if (item.show) {
            classifyIndex = index;
          }
        });
        let json = {
          id: this.proList[index].id,
          picture: this.proList[index].backgroudImage,
          type: 1,
          leftIndex: leftIndex,
          classifyIndex: classifyIndex,
          cnt: this.cnt
        };
        // 如果在首页加载了花型则将花型参数携带到查看细节页面
        if (this.imageUrl) {
          localStorage.setItem("imgUrl", this.imageUrl);
          localStorage.setItem("orderId", this.orderId);
        }
        localStorage.setItem("threedList", JSON.stringify(json));
        this.$router.push({
          path: "/Content"
        });
      }
    },
    // 选择热门分类
    changeClassify(index, fuindex) {
      this.m2 = fuindex;
      this.classIndex = fuindex;
      this.page = [];
      this.cnt = 1;
      this.flag = 0;
      this.pageIndex = 1;
      this.classify = this.classify2[this.m1];
      this.classify.map(function(item) {
        item.show = false;
      });
      this.id = this.classify[index].id; //console.log(this.id,'id');
      this.classify[index].show = true;
      this.$forceUpdate();
      this.id = this.classify[index].id; //console.log(this.id,'id');

      this.getProlist();
    },
    // 初始化分页器
    pageAuto() {
      this.$forceUpdate();
      if (!this.page.length) {
        if (this.pageNumber <= 7) {
          for (let i = 0; i < this.pageNumber; i++) {
            this.page.push({ name: i + 1 });
          }
        } else {
          this.page = [
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: "···" },
            { name: this.pageNumber }
          ];
        }
      }
    },
    // 分页器每个点击
    btnClick(index) {
      if (this.pageNumber <= 7) {
        this.flag = 0;
        this.cnt = index + 1;
        if (this.showOnly) {
          this.getOnlylist();
        } else {
          this.getProlist();
        }
        this.pageIndex = index + 1;
      } else {
        // 状态0
        if (this.flag == 0) {
          if (index == 5) {
          } else if (index == 4) {
            this.cnt = this.page[index].name;
            if (this.pageNumber - this.cnt <= 3) {
              this.flag = 2;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              this.pageIndex = 4;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          } else if (index == 6) {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else {
            this.cnt = this.page[index].name;
            this.pageIndex = index + 1;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        } else if (this.flag == 1) {
          if (index == 1 || index == 5) {
            return;
          } else {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              // 点击首页
              this.pageIndex = this.cnt;
              this.flag = 0;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
            } else if (this.pageNumber - this.cnt <= 4) {
              this.pageIndex = 7 - (this.pageNumber - this.cnt);
              this.flag = 2;
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.pageNumber - 4 },
                { name: this.pageNumber - 3 },
                { name: this.pageNumber - 2 },
                { name: this.pageNumber - 1 },
                { name: this.pageNumber }
              ];
            } else {
              this.flag = 1;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          }
        } else if (this.flag == 2) {
          if (index == 1) {
            return;
          } else if (index == 2) {
            this.cnt = this.page[index].name;
            if (this.cnt <= 4) {
              this.flag = 0;
              this.pageIndex = this.cnt;
              this.page = [
                { name: 1 },
                { name: 2 },
                { name: 3 },
                { name: 4 },
                { name: 5 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            } else {
              this.flag = 1;
              this.pageIndex = 4;
              this.page = [
                { name: 1 },
                { name: "···" },
                { name: this.cnt - 1 },
                { name: this.cnt },
                { name: this.cnt + 1 },
                { name: "···" },
                { name: this.pageNumber }
              ];
              if (this.showOnly) {
                this.getOnlylist();
              } else {
                this.getProlist();
              }
            }
          } else if (index == 0) {
            this.cnt = this.page[index].name;
            this.flag = 0;
            this.pageIndex = 1;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else {
            this.cnt = this.page[index].name;
            this.flag = 2;
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        }
      }
    },
    prev() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt == 1) {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        } else {
          this.cnt -= 1;
          this.pageIndex -= 1;
          if (this.showOnly) {
            this.getOnlylist();
          } else {
            this.getProlist();
          }
        }
      } else {
        if (this.cnt != 1) {
          this.cnt--;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = this.cnt;
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            this.pageIndex = 4;
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          }
        } else {
          this.showJump = true;
          this.err = "已经是第一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      }
    },
    // 下一页
    next() {
      let self = this;
      if (this.pageNumber <= 7) {
        this.flag = 0;
        if (this.cnt < this.pageNumber) {
          this.cnt += 1;
          this.pageIndex += 1;
          if (this.showOnly) {
            this.getOnlylist();
          } else {
            this.getProlist();
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      } else {
        if (this.cnt < this.pageNumber) {
          this.cnt++;
          if (this.pageNumber - this.cnt <= 3) {
            this.flag = 2;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.pageNumber - 4 },
              { name: this.pageNumber - 3 },
              { name: this.pageNumber - 2 },
              { name: this.pageNumber - 1 },
              { name: this.pageNumber }
            ];
            this.pageIndex = 7 - (this.pageNumber - this.cnt);
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
          } else if (this.cnt <= 4) {
            this.flag = 0;
            this.page = [
              { name: 1 },
              { name: 2 },
              { name: 3 },
              { name: 4 },
              { name: 5 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = this.cnt;
          } else {
            this.flag = 1;
            this.page = [
              { name: 1 },
              { name: "···" },
              { name: this.cnt - 1 },
              { name: this.cnt },
              { name: this.cnt + 1 },
              { name: "···" },
              { name: this.pageNumber }
            ];
            if (this.showOnly) {
              this.getOnlylist();
            } else {
              this.getProlist();
            }
            this.pageIndex = 4;
          }
        } else {
          this.showJump = true;
          this.err = "已经是最后一页了";
          Scroll.stop();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 1000);
        }
      }
    },
    // 获取商品列表
    getProlist() {
      this.showLoading = true;
      let self = this;
      Scroll.stop();
      let formData = new FormData();
      formData.append("page", this.cnt);
      formData.append("pageSize", 10);
      //console.log("genre1",this.classIndex);
      formData.append("genre1", this.classIndex);
      formData.append("genre2", this.id);
      //console.log(this.id,'id');
      //console.log(this.classIndex, this.classIndex, "传参");
      let obj = {
        url: this.all.baseUrl + "/template2d/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        setTimeout(function() {
          self.showLoading = false;
          Scroll.move();
        }, 500);
        let result;
        if (res.data.status == 0) {
          result = res.data.result;
          this.pageNumber = result.pages;
          this.pageAuto();
          this.$forceUpdate();
          if (this.imageUrl != "") {
            this.proList1 = result.list;
            this.jiazai(result.list);
          } else {
            this.proList = result.list;
          }

          if (this.typeindex) {
            this.toDetail(this.typeindex);
          }
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
          }, 1500);
        }
      });
    },
    // 获取头部列表
    getList(index) {
      this.classify = [];
      let formData = new FormData();
      this.showLoading = true;
      Scroll.stop();
      let self = this;
      formData.append("id", 14);
      let obj = {
        url: this.all.baseUrl + "/config/info",
        formdata: formData
      };
      this.getData(obj).then(res => {
        let result;
        setTimeout(function() {
          self.showLoading = false;
          Scroll.move();
        }, 500);
        if (res.data.status == 0) {
          self.classify2 = [[], [], [], [], []];
          result = JSON.parse(res.data.result.json1);
          console.log(res.data);
          for (let i = 0; i < 5; i++) {
            result.category.map(function(item) {
              if (item.categType == i) {
                self.classify2[i].push(item);
              }
            });
          }
          result.category.map(function(item) {
            if (item.categType == self.classIndex) {
              self.classify.push(item);
            }
          });

          if (!this.classFlag) {
            this.classify.map(function(item) {
              item.show = false;
            });
            this.classify[0].show = true;
            this.classFlag = 1;
          } else {
            this.classify.map(function(item) {
              item.show = false;
            });
            // this.classify[index].show = true;
          }
          if (this.ourMsg.type == 1) {
            this.id = this.classify[this.ourMsg.classifyIndex].id;
            //console.log(this.id,'id');
            this.getProlist();
          }

          // categType 0女 1男 2童 3家纺 4其它
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
          }, 1500);
        }
      });
      //console.log(this.classIndex, this.classIndex, "传参");
    },
    getMessage() {
      let self = this;
      self.ourMsg = JSON.parse(localStorage.getItem("threedNewjson"));
      //console.log(self.ourMsg.type);
      if (
        this.ourMsg.type == 1 ||
        this.ourMsg.type == 2 ||
        this.ourMsg.type == 3
      ) {
        //console.log(self.ourMsg.type);
        if(this.ourMsg.imageUrl!=""){
          this.imageUrl=this.ourMsg.imageUrl;
        }       
        this.cnt = this.ourMsg.cnt;
        this.pageIndex = this.ourMsg.cnt;
        if (this.ourMsg.type == 3) {
          this.backImg = this.ourMsg.backImg;
          console.log(this.ourMsg);
          this.xiliem1 = -1;
          this.seleClick(2);
          this.newSelect.map(function(item, index) {
            item.show = false;
          });
          this.newSelect[this.ourMsg.classifyIndex].show = true;
        } else if (this.ourMsg.type == 1) {
          switch (this.ourMsg.leftIndex) {
            case 0:
              this.classIndex = 0; //console.log("genre1",this.classIndex);
              this.m2 = this.classIndex;
              this.id = 0; //console.log(this.id,'id');
              break;
            case 1:
              this.classIndex = 1; //console.log("genre1",this.classIndex);
              this.id = 11; //console.log(this.id,'id');
              this.m2 = this.classIndex;
              break;
            case 2:
              this.classIndex = this.ourMsg.leftIndex; //console.log("genre1",this.classIndex);
              this.id = 21; //console.log(this.id,'id');
              this.m2 = this.classIndex;
              break;
            case 3:
              this.classIndex = this.ourMsg.leftIndex; //console.log("genre1",this.classIndex);
              this.id = 19; //console.log(this.id,'id');
              this.m2 = this.classIndex;
              break;
            default:
              this.classIndex = this.ourMsg.leftIndex; //console.log("genre1",this.classIndex);
              this.id = 17; //console.log(this.id,'id');
              this.m2 = this.classIndex;
              break;
          }
          this.select.map(function(item) {
            item.show = false;
          });
          this.select[this.ourMsg.leftIndex].show = true;
          this.classFlag = 1;

          if (this.type == 1 || this.type == 2) {
            this.seleClick(this.type);
          } else {
            this.getList(this.ourMsg.classifyIndex);
          }
        }
      } else {
        //console.log(self.ourMsg.type);
        this.getList();
        this.getProlist();
      }
    },
    ceshishuju() {
      //console.log(this.id)
    }
  },
  mounted() {
    if (localStorage.getItem("orderId")) {
      this.zhf5(1);
      localStorage.removeItem("orderId");
    }

    this.getHeight();

    this.getMessage();
    
    localStorage.setItem("path", this.path);
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Enthreed"
      });
    } else {
      this.$router.push({
        path: "/Threed"
      });
    }
  }
};
</script>
<style scoped>
.zhbox0 {
  cursor:pointer;
}
.zhbox1{
  cursor:pointer;
}
.zhbox2{
  cursor:pointer;
}
button{
  cursor:pointer;
}
 #prolisttongji>li{
  cursor:pointer;
}
.xiazai {
  width: 85px;
  height: 35px;
  background: #aeaea9;
  border-radius: 4px;
  color: white;
  border: 0;
  position: absolute;
  top: 17.5px;
  left: 1006px;
}
.jiacu {
  font-weight: bold;
}
.zhfile1 {
  width: 175px;
  height: 36px;
  position: relative;
  opacity: 0;
  left: 82px;
}
.blackzhezhao {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  overflow: hidden;
  z-index: 99;
}
.zhhuaxing {
  position: fixed;
  top: calc(50vh - 220px);
  left: calc(50vw - 331px);
  width: 663px;
  height: 440px;
  background-color: #ffffff;

  z-index: 100;
}
.guanbi {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: 675px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid gray;
  font-size: 25px;
  line-height: 30px;
  background-size: 30px 30px;
}
.header {
  height: 40px;
  text-align: left;
  line-height: 40px;
  position: relative;
  left: 45px;
}
.header > div {
  width: 100px;
  float: left;
  color: #919191;
}
.zhimg {
  width: 625px;
  height: 320px;
  display: -webkit-flex;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 29px;
}
.zhimg1 {
  width: 102.7px;
  height: 153.8px;
  position: relative;
  background: #d8d8d8;
  border: 1px solid #979797;
  margin-left: 16px;
  margin-bottom: 16px;
  overflow: hidden;
}
.imgjuzhong {
  position: relative;
  width: 513.5px;
  left: -205.4px;
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
  min-width: 102.7px;
  height: 153.8px;
  margin: auto;
}

.zhbutton {
  height: 36px;
  position: relative;
  top: 27px;
}
.zhbutton1 {
  position: absolute;
  left: 150px;
  width: 175px;
  height: 36px;
  border: 0;
  background: #ffe300;
}
.zhbutton2 {
  position: absolute;
  left: 325px;
  width: 175px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #c5c4c4;
}
.xuanzehuaxing {
  width: 86px;
  height: 35px;
  background: #ffe300;
  text-align: center;
  line-height: 35px;
  position: absolute;
  top: 17.5px;
  left: 1100px;
  border-radius: 4px;
  border: 0;
}
.zh {
  width: 100%;
  height: 124px;
  font-size: 14px;
  background: #ffffff 100%;
}
.zh1 {
  border-top: 0.5px dotted rgb(219, 214, 214);
}
.zh2 {
  width: 1220px;
  height: 60px;
  margin: auto;
  position: relative;
}
.zhbox0 {
  text-align: left;
  width: 80px;
  height: 60px;
  line-height: 70px;
  float: left;
  color: rgba(51, 51, 51, 0.5);
}
.zhbox1 {
  float: left;
  text-align: left;
  width: 84px;
  height: 60px;
  line-height: 70px;
}
.zhbox2 {
  float: left;
  text-align: left;
  width: 60px;
  height: 32px;
  line-height: 32px;
  position: relative;
  top: 14px;
  text-align: left;
  text-indent: 1px;
}
.zhbox20 {
  float: left;
  text-align: left;
  width: 60px;
  height: 60px;
  line-height: 70px;
  position: relative;
}
.zhbox2:hover {
  width: 58px;
  height: 30px;
  line-height: 30px;
  text-indent: 0px;
  border-top: 1px solid #f06d29;
  border-left: 1px solid #f06d29;
  border-right: 1px solid #f06d29;
  border-bottom: 1px solid #ffffff;
  z-index: 10;
}
.whitebox {
  position: absolute;
  top: 22px;
  width: 58px;
  left: 0px;
  height: 21px;
  z-index: -1;
  background: #ffffff;
}
.zhbox2bottom {
  position: absolute;
  border: 1px solid #f06d29;
  height: 40px;
  line-height: 40px;
  width: 1082px;
  top: 31px;
  padding-left: 20px;
  z-index: -2;
  background: #ffffff;
  color: #333333;
}
.zhbox2bottom > div {
  float: left;
  text-align: left;
  margin-right: 20px;
}
.zhspan1 {
  color: gray;
  font-size: 20px;
}
.zhspan2 {
  color: #f06d29;
  font-size: 20px;
}
.zhbox3 {
  width: 1220px;
  height: 70px;
  margin: auto;
}
.backFlower {
  position: absolute;
  right: 16.5rem;
  width: 6.5rem;
  background: #fff;
  height: 2.5rem;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6.5rem;
}
.backFlower span {
  width: 5.625rem;
  height: 1.75rem;
  display: flex;
  border: 1px solid #133ffc;
  color: #133ffc;
  font-size: 1rem;
  border-radius: 0.875rem;
  justify-content: center;
  align-items: center;
}
.flowerImg {
  position: absolute;
  width: 27.1875rem;
  height: 10rem;
  top: 10rem;
  right: 10rem;
}
.konwImg {
  position: absolute;
  width: 9.125rem;
  height: 5rem;
  left: calc(50% - 4.5625rem);
  top: calc(50vh - 2.5rem);
}
.btnBox {
  display: flex;
  margin-bottom: 1.6875rem;
  margin-left: 31.25rem;
}
.btnBox li {
  color: #888;
  font-size: 1.875rem;
  padding: 0 2.625rem;
  cursor: default;
  position: relative;
}
.btnBox li:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 1.25rem;
  right: 0;
  top: calc(50% - 0.625rem);
  background: #888;
}
.btnBox li:last-child:after {
  display: none;
}
/* 没有数据 */
.nodata {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #333;
  font-size: 1.25rem;
}
.nodata img {
  display: block;
  width: 8rem;
  margin-top: 6.25rem;
  margin-bottom: 1.25rem;
}
.suit {
  height: 2.375rem;
  line-height: 2.375rem;
  position: fixed;
  bottom: 12.625rem;
  width: 10rem;
  left: 0;
  cursor: default;
  color: #8d8d8d;
  font-size: 1.5rem;
}
.suit span {
  position: absolute;
  height: 2.375rem;
  left: 0;
  top: -0.125rem;
  background: #133ffc;
  width: 0.25rem;
}
/* 私人衣橱弹窗 */
.onlyMe {
  height: 2.375rem;
  line-height: 2.375rem;
  position: fixed;
  bottom: 15.625rem;
  width: 10rem;
  left: 0;
  cursor: default;
  color: #8d8d8d;
  font-size: 1.5rem;
}
.onlyMe span {
  position: absolute;
  height: 2.375rem;
  left: 0;
  top: -0.125rem;
  background: #133ffc;
  width: 0.25rem;
}
.onlyBtn {
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 1.6rem;
}
.onlyBtn input {
  position: absolute;
  width: 5.625rem;
  height: 1.75rem;
  z-index: 222;
  right: 9rem;
  opacity: 0;
  top: 0;
}
.onlyBtn span {
  margin-right: 9rem;
  width: 5.625rem;
  height: 1.75rem;
  box-sizing: border-box;
  cursor: default;
  display: flex;
  border: 1px solid #808080;
  color: #808080;
  font-size: 1rem;
  border-radius: 0.4rem;
  justify-content: center;
  align-items: center;
}
/* 下载 */
.downBox span {
  margin-right: 2rem;
  width: 5.625rem;
  height: 1.75rem;
  box-sizing: border-box;
  cursor: default;
  display: flex;
  border: 1px solid #133ffc;
  color: #fff;
  background: #133ffc;
  font-size: 1rem;
  border-radius: 0.4rem;
  justify-content: center;
  align-items: center;
}
.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
.dingzhi {
  width: 860px;
  height: 575px;
  margin: auto;
  font-size: 16px;
  color: #666666;
  padding: 173px;
  padding-top: 101px;
  background: #fff;
}
.modelBox {
  width: 871px;
  height: 507px;

  font-weight: bold;
  background: #fff;
  border-radius: 0.3125rem;
  box-sizing: border-box;
}

.modelBox img {
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  width: 1.25rem;
}
.modelBox h4 {
  font-size: 20px;
  color: #333;
  font-weight: normal;
  padding-top: 1.1875rem;
  margin-bottom: 50px;
}
.modelBox h5 {
  font-size: 16px;
  color: #333;
  font-weight: normal;
  text-align: left;
  margin-bottom: 15px;
}
.modelBox p {
  color: #333;
  font-size: 16px;
  text-align: left;
  margin-bottom: 15px;
  line-height: 1.8em;
}
.modelBox p span {
  display: block;
}
.threed {
  min-height: 100vh;
  background: #f6f6f6;
}
.content {
  background: #f6f6f6;
  /* display: flex;
  justify-content: start; */
}
ul.seleBox {
  width: 10rem;
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
  width: 1220px;
  margin: auto;
  margin-top: 40px;
}
.topBox {
  display: flex;
  justify-content: start;
  margin-bottom: 1rem;
}
.topBox h4 {
  font-size: 1.125rem;
  color: #333;
  font-weight: normal;
  width: 6rem;
  margin-top: 0.1rem;
  text-align: left;
  flex-shrink: 0;
}
ul.classifyBox {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
}
ul.classifyBox li {
  color: #8d8d8d;
  margin-right: 1.125rem;
  font-size: 0.9rem;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 1.875rem;
  background: #fff;
  color: #8d8d8d;
  border: 1px solid #8d8d8d;
  margin-bottom: 0.625rem;
  cursor: default;
}
ul.classifyBox li.special {
  background: #ffde18;
}
ul.classifyBox li:last-child {
  margin-right: 0;
}
ul.proList {
  display: flex;
  flex-wrap: wrap;
}
ul.proList li {
  width: 220px;
  height: 329px;
  background: #fff;
  margin-bottom: 25px;
  margin-right: 21px;
  /* box-shadow: 2px 2px 2px #cbccd2; */
  /* border-radius: 0.5rem; */
}
/* 分页器 */
ul.pageBox {
  padding-bottom: 3.125rem;
  display: flex;
  margin-top: 5.5rem;
  justify-content: center;
  align-items: center;
}
ul.pageBox li {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.875rem;
  color: #333;
  box-shadow: 0.125rem 0.125rem 0.125rem #ddd;
  border-radius: 50%;
  margin: 0 0.3125rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
ul.pageBox li.click {
  background: black;
  color: #fff;
}
ul.pageBox li.sureList {
  width: 6.25rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #133ffc;
  color: #fff;
  font-size: 0.625rem;
  margin-left: 11.25rem;
  text-align: center;
  border-radius: 1.25rem;
}
ul.pageBox li img {
  display: block;
  width: 0.5rem;
  height: 1rem;
  margin: 0.625rem auto;
}
/* 我的素材 */
.notExist {
  width: 11rem;
  height: 11rem;
  border: 0.0625rem dashed rgba(51, 51, 51, 1);
  position: relative;
}
.existImg {
  color: rgba(51, 51, 51, 0.6);
  top: 3.5rem;
  position: absolute;
  width: 100%;
}
.notExist img {
  width: 2.375rem;
  height: 2.375rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.3125rem;
}
.file {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 99;
}
.xuanzehuaxing:hover{
  background: #ffd000 !important;
}
</style>