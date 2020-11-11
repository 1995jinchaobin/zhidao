<template>
  <div id="app" @click="ThermodynamicDiagram">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      url: "https://www.ayznscm.com",
      apppath:""
    };
  },  
  methods: {
    getpath(path) {
      var jsonpath = [
        ['/maskOrderList','口罩订单列表','MaskOrderList'],
        ['/orderMasks','口罩预定','OrderMasks'],
        ['/picture','以图识图','Knowledge'],
        ['/knowledge/Pc','以图识图/PC端/主页','Knowledge PC'],
        ['/Knowledge/Pc/piclogin','以图识图/PC端/登录页面','Knowledge PC Login'],
        ['/Knowledge/Pc/addpicture','以图识图/PC端/花型管理','Knowledge PC Addpicture'],
        ['/Knowledge/Pc/History','以图识图/PC端/查询历史','Knowledge PC History'],
        ["/maker", "设计师招募 ", "Designer Recruitment"],
        [" /newstudio", "工作室主页", "Studio homepage"],
        [
          "/newstudio/guanli1",
          "工作室主页/规范设计",
          "Studio homepage / standard design"
        ],
        [
          "/newstudio/guanli2",
          "工作室主页/工作室管理条例",
          "Studio homepage /Regulations on management of studios"
        ],
        [
          "/newstudio/guanli3",
          "工作室主页/免责说明",
          "Studio homepage /Exemption instruction"
        ],
        [
          "/newstudio/guanli4",
          "工作室主页/设计师说明",
          "Studio homepage /Designer's note"
        ],
        [
          "/newstudio/huaxing1",
          "工作室主页/上传花型",
          "Studio homepage / upload pattern"
        ],
        [
          "/newstudio/huaxing2",
          "工作室主页/管理花型",
          "Studio homepage / management pattern"
        ],
        [
          "/newstudio/huaxing3",
          "工作室主页/编辑花型",
          "Studio home / edit pattern"
        ],
        [
          "/newstudio/jiaoyi1",
          "工作室主页/交易管理",
          "Studio homepage / transaction management"
        ],
        [
          "/newstudio/sucai1",
          "工作室主页/上传素材",
          "Studio homepage / upload material"
        ],
        [
          "/newstudio/sucai2",
          "工作室主页/管理素材",
          "Studio home / manage materials"
        ],
        [
          "/newstudio/sucai3",
          "工作室主页/编辑素材",
          "Studio home / edit material"
        ],
        [
          "/newstudio/zhangben1",
          "工作室主页/我的钱包",
          "Studio home / my wallet"
        ],
        ["/studioshenqing", "工作室申请", "Studio application"],
        ["/shenhechenggong", "工作室申请成功", "Studio application successful"],
        ["/Uploadfile", "版权上传", "Copyright uploading"],
        ["/Banquan", "版权", "copyright"],
        ["/Homepage", "老版首页", "Old Homepage"],
        [
          "/reservation",
          "织道云分色预约演示",
          "Weaving cloud color separation appointment demonstration"
        ],
        ['/feedback','意见反馈','Feedback'],
        ["/Task", "任务大厅", "Task Hall"],
        ["/Paging", "AI分色", "Intelligent fast color separation"],
        ["/select", "首页", "home page"],
        ["/Select", "首页", "home page"],
        ["/Help", "测试图表", "Test chart"],
        ["/Matching", "AI配色", "AI color matching"],
        ["/Changecolour", "AI配色操作页面", "AI color operation page"],
        ["/Cut", "智能抠图", "Intelligent matting"],
        ["/Release", "供求信息", "Release"],
        ["/ReleaseInfo", "供求详细信息", "ReleaseInfo"],
        ["/Cutout", "智能抠图操作页面", "Smart matting operation page"],
        ["/Flowerdesign", "花型设计", "Pattern design"],
        ["/Operate", "花型设计旧版", "Old version of pattern design"],
        [
          "/Patterns",
          "花型设计旧版添加素材",
          "Adding materials to the old version of pattern design"
        ],
        [
          "/Colour",
          "花型设计旧版花型素材",
          "Pattern design old pattern material"
        ],
        [
          "/Shading",
          "花型设计旧版添加底纹",
          "Pattern design old version add shading"
        ],
        ["/Newoperate", "花型设计操作页面", "Pattern design operation page"],
        ["/Shopping", "花型商城", "Flower shop"],
        ["/Shopselect", "旧版3D模型", "Old 3D model"],
        ["/Shopdetail", "花型商城图片购买", "Flower mall image purchase"],
        ["/Shopthreed", "3D模型旧版操作页面", "Old 3D model operation page"],
        ["/Ai", "AI设计", "AI design"],
        ["/Login", "登录", "Sign in"],
        ["/Register", "注册", "register"],
        ["/Forget", "忘记密码", "Forget password"],
        ["/User", "个人中心", "Personal Center"],
        ["/User/", "个人中心/我的花型", "Personal Center / my pattern"],
        ["/User/freeRelease", "个人中心/免费发布", "FreeRelease"],
        ["/User/supplyInfo", "个人中心/供应信息", "FupplyInfo"],
        ["/User/buyingInfo", "个人中心/求购信息", "BuyingInfo"],
        ["/User/Source", "个人中心/我的素材", "Personal Center / my material"],
        ["/User/sucessPage", "个人中心/提交成功", "SucessPage"],
        ["/User/errorPage", "个人中心/审核失败", "ErrorPage"],
        [
          "/User/copyright",
          "个人中心/我的版权",
          "Personal Center / my copyright"
        ],
        ["/User/invoice", "个人中心/我的发票", "Personal Center / my invoice"],
        ["/User/Car", "个人中心/购物车", "Personal Center / shopping cart"],
        ["/User/Money", "个人中心/我的钱包", "Personal Center / my wallet"],
        [
          "/User/xiugaimima",
          "个人中心/修改密码",
          "Personal Center / change password"
        ],
        [
          "/User/qianbao",
          "个人中心/我的钱包旧版",
          "Personal Center / old version of my wallet"
        ],
        [
          "/User/zizhanghao",
          "个人中心/创建子账号",
          "Personal Center / create sub account"
        ],
        [
          "/User/geren",
          "个人中心/个人信息",
          "Personal Center / personal information"
        ],
        ["/User/dingdan", "个人中心/我的订单", "Personal Center / my order"],
        [
          "/User/ColorSeparation",
          "个人中心/我的分色",
          "Personal Center / my color separation"
        ],
        ["/Vip", "VIP", "VIP"],
        ["/Money", "旧版我的钱包", "Old version of my wallet"],
        ["/Notes", "旧版推广信息", "Old version promotion information"],
        ["/Order", "旧版我的花型", "Old version of my pattern"],
        ["/Car", "旧版我的购物车", "Old version of my shopping cart"],
        ["/Fabric", "旧版创建分类", "Legacy creation categories"],
        ["/Detail", "旧版图片", "Old pictures"],
        ["/Upfabric", "旧版面料", "Old fabrics"],
        ["/New", "新手教程", "Novice tutorial"],
        ["/Threed", "3D展示", "3D display"],
        ["/Content", "3D展示操作页面", "3D display operation page"],
        ["/Copyright", "旧版我的版权", "Old version of my copyright"]
      ];
      let jsonarray;
      for (let i = 0; i < jsonpath.length; i++) {
        if (path == jsonpath[i][0]) {
          jsonarray = jsonpath[i];
        }
      }
      return jsonarray;
    },
    ThermodynamicDiagram() {
      let self = this;
      console.log(this.$route.path)
      let path = this.getpath(this.$route.path);
      // console.log(path);
      let IP = localStorage.getItem("IP");
      console.log(path)
      if (this.$route.path != undefined) {
        let formData = new FormData();
        formData.append("height", document.documentElement.clientHeight);
        formData.append("width", document.documentElement.clientWidth);
        formData.append("router", path[1]);
        formData.append("router_en", path[0]);
        formData.append("left", event.pageX);
        formData.append("top", event.pageY);
        formData.append("ip", IP);
        let obj = {
          url: self.all.baseUrl + "/new/monitor/addMonitorClick",
          formdata: formData
        };
        this.getData(obj).then(res => {});
      } else {
        // console.log(res.data.e_msg);
      }
    },
    Initialization() {
      let time = new Date();
      localStorage.setItem("duration", time);
      let lasturl = document.referrer;
      console.log(lasturl);
      if (lasturl != "") {
        localStorage.setItem("lasturl", lasturl);
      }
    },
    //窗口关闭时间
    beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      let self = this;
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      // debugger;
      //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        //如果是登录状态，关闭窗口前，移除用户
        if (!this.showLoginButton) {
          // $.ajax({
          //   url: "/pictureweb/user/remove",
          //   type: "get",
          //   async: false //或false,是否异步
          // });
          self.UserBehaviorMonitoring(self.apppath, "close");
        }
      }
    }
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://s9.cnzz.com/z_stat.php?id=1277930373&web_id=1277930373&show=pic";
    script.language = "JavaScript";
    document.body.appendChild(script);
    this.Initialization();
    //窗口关闭时间
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
    window.addEventListener("unload", e => this.unloadHandler(e));
    localStorage.setItem("lastpath", "/Select");
  },
  destroyed() {
    window.removeEventListener("beforeunload", e =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", e => this.unloadHandler(e));
  },
  watch: {
    $route(to, from) {
      // if (window._czc) {
      //   console.log(window._czc);
      //   let location = window.location;
      //   let contentUrl = location.pathname + location.hash;
      //   let refererUrl = "/";
      //   contentUrl=contentUrl.replace('/#','');
      //   window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      // }
      this.UserBehaviorMonitoring(to.path);
      this.apppath = to.path;
    }
  },
  created() {
    
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("English")) {
        if (localStorage.getItem("web")) {
          this.$router.push({
            path: "/Enflowerdesign"
          });
          localStorage.removeItem("web");
        } else if (localStorage.getItem("path")) {
          this.$router.push({
            path: localStorage.getItem("path")
          });
        } else {
          this.$router.push({
            path: "/Enselect"
          });
        }
      } else {
        if (localStorage.getItem("web")) {
          this.$router.push({
            path: "/Flowerdesign"
          });
          localStorage.removeItem("web");
        } else if (localStorage.getItem("path")) {
          this.$router.push({
            path: localStorage.getItem("path")
          });
        } else {
          this.$router.push({
            path: "/Select"
          });
        }
      }
    } else {
      if (localStorage.getItem("English")) {
        if (localStorage.getItem("path")) {
          this.$router.push({
            path: localStorage.getItem("path")
          });
        } else {
          this.$router.push({
            path: "/Enlogin"
          });
        }
      } else {
        if (localStorage.getItem("path")) {
          this.$router.push({
            path: localStorage.getItem("path")
          });
        } else {
          this.$router.push({
            path: "/Select"
          });
        }
      }
    }
  }
};
</script>
<style>
@import "./assets/icon/Icon.css";
* {
  padding: 0;
  margin: 0;
}
body {
  /* width: 100vw;
  min-width: 1200px;
  padding-right: calc(100vw - 100%);
  overflow-x: hidden; */
/* 后续添加 适配150% */
  min-width: 1220px;
  
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
/* 后续添加 适配150%*/
  width: 100%;
    min-width: 1220px;
    overflow-x: hidden;
}
</style>