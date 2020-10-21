<template>
  <div class="window">
    <Studiotap @showEnglish="changeEnglish" :tabIndex="tabIndex"></Studiotap>
    <div class="studio">
      <div @click="qiehuan(0)" :class="type==0?'click':''">规范设计</div>
      <div @click="qiehuan(1)" :class="type==1?'click':''">工作室管理条例</div>
      <div @click="qiehuan(2)" :class="type==2?'click':''">免责说明</div>
      <div @click="qiehuan(3)" :class="type==3?'click':''">设计师说明</div>
    </div>
    <div class="shuru" v-if="type==0">
      <h2 style="maigin:auto">素材花型设计及上传规范</h2>
      <div>
        <span style="font-size:20px">总则</span>
        <br />1.严禁抄袭他人作品
        <br />2.严禁未经授权上传他人作品
      </div>
      <img src="../../assets/image/studio/guanli1.jpg" alt />
      <div>
        1. 关于图片：
        <br />1.1所上传的素材和花型图片应清晰、美观，能够完全辨别图片的内容，无水印、无QQ微信手机号码等联系方式，织道会生成平台统一水印以保护工作室权利；
        <br />1.2所上传图片内容须符合中华人民共和国法律法规，不得违法或含有不良信息的内容，例如涉嫌色情、暴力、反动、泄漏国家机密或有与国家法律法规相抵触等内容的，将审核不通过；
        <br />1.3所上传图片不得含有已注册商标或公司名称，以免侵犯他人商标权、名称权；
        <br />1.4所上传的图片不得包含人民币图案；
        <br />1.5所上传的图片不得包含他人享有知识产权的作品，如禁止含有喜羊羊、光头强等知名卡通形象；
        <br />1.6 所上传图片不可添加任何广告信息；
        <br />所上传素材不得与织道平台现在素材重复，否则将审核不通过。
        <br />2. 关于PSD源文件：
        <br />2.1 所上传花型的PSD源文件与详细花型图片内容需统一，否则将审核不通过;
        <br />2.2所上传花型为分层的PSD格式素材，需保证源文件实际像素下的清晰度，不可将尺寸或分辨率故意拉大；
        <br />2.3所上传花型源文件不得是影响图片下载者使用（如源文件出错、读取复合图层、损坏、缺少数据等），否则需要工作室重新上传有效文件或退还交易金，并进行买家协商赔偿。
      </div>
    </div>
    <div class="shuru" v-if="type==1">
      <h2 style="maigin:auto">工作室管理条例</h2>
      <br />
      <br />
      <br />

      <div>
        <span style="font-size:20px">一.总述</span>
        <br />为维护织道平台的正常经营秩序，保障织道用户的合法权益，实现设计师工作室的规范化运营，特根据国家法律法规规范，以及织道平台相关协议和规则制定本规定。
        <br />
        <br />
        <span style="font-size:20px">二.违规处理条例</span>
        <br />1.工作室将他人的作品冒充自己原创作品或侵害他人著作权的作品用于出售，查实后删除此作品，并做永久关闭工作室处理。经权利人申请，织道平台有权按照相关法律法规规定以该工作室账户内资金进行先行赔偿。
        <br />2.工作室售出的素材和花型如果出现回位问题、清晰度问题、存在不相关内容、分层不标准问题，一经投诉，工作室需要按照要求进行修改，并在24小时内重新上传更改好的图片和PSD源文件至平台，如果修改后的商品还是存在不能有效使用的问题，购买者有权要求退款。
        <br />3.工作室出售的原创素材、花型页面信息（包括预览图、参数描述等地方）和源文件（包括图层名称、外部链接、压缩包内附其它说明类的形式）中不得出现QQ、电话号码、
        E-mail等联系方式，如发现此类作品一律不提供服务或直接删除，超过3次提示不改者，隐藏工作室1个月、同时冻结余额1个月。
        <br />4.工作室将上传到织道平台的原创出售花型私下与花型购买者进行交易，恶意避开织道平台，及文件有问题不配合客服人员工作帮助买家解决的，工作室将支付织道平台2-5倍交易佣金作为赔偿，若该赔偿金额低于50元，则工作室须向织道平台支付50元作为赔偿金，并视情节轻重进行冻结余额或封号等相关处理。
        <br />5.转载织道平台其它工作室发布的原创素材和花型（被转载的工作室仅在织道平台发布）到其他网站上供他人（免费、收费）下载者，一经发现作封号处理。
        <br />6.下载织道平台的共享素材或工作室的原创素材重新上传到织道平台出售，一经发现马上删除文件并进行警告，超过3次提示不改者，隐藏店铺1个月、同时冻结余额1个月。
        <br />7.下载织道用户的原创素材和花型准备用于/用于制盗版出售的，一经发现作封号处理。
        <br />8.因工作室人为因素导致交易失败的，织道平台在接到素材花型购买者投诉并确认事实成立后，除将工作室所得收入返还给购买者以外，工作室还须赔偿织道平台交易佣金部分的损失（赔偿交易金额的30%）。工作室人为因素导致交易失败的，包括但不限于以下情况：
        <br />a. 原创出售花型的格式、回位、清晰度、像素尺寸、颜色模式等与工作室的描述有严重出入的；
        <br />b.原创出售花型的分辨率、像素尺寸虽与页面显示相符，但实际像素明显模糊的；
        <br />c. 原创花型PSD源文件的图层合并或分层严重不精细，导致作品购买者不能使用的； d.预览图需与源文件保持一致（在不影响购买者使用的前提下允许适当的修饰），若有严重出入导致作品购买者不能使用的；
        <br />e.当花型PSD源文件出错，购买者在投诉后仍需要文件时，未能及时将文件发送给买家的；
        <br />f.分层的原创出售花型需保证各个分层图片相对清晰，内含位图的矢量格式文件，应注明主要位图的分辨率和尺寸，因描述不详造成购买者下载后不能正常使用的。
        <br />
        <br />
        <span style="font-size:20px">三.附则</span>
        <br />1.织道平台可根据平台运营情况随时调整本管理规定并以公告的形式向工作室公示；工作室入驻织道即表示接受织道其后不时调整、颁布的管理规则。
        <br />2.工作室应遵守国家法律、行政法规、部门规章等规范性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规则已有规定的，适用于本规则。本规则尚无规定的，织道有权酌情处理
        <br />3.该规定于2019年3月5日制定，于2019年3月20日起生效。
      </div>
    </div>
    <div class="shuru" v-if="type==2">
      <h2 style="maigin:auto">免责声明</h2>
    </div>
    <div class="shuru" v-if="type==3">
      <h2 style="maigin:auto">设计师频道说明</h2><br /><br />
      <div style="text-indent:2em">设计师频道是设计师（工作室）的工作台，包含工作室管理、素材管理、花型管理、交易管理、收支明细等主要功能，聚焦于快捷方便的商品管理。</div>
      <div style="text-indent:2em">个人或企业在织道平台开通工作室是免费的。个人或企业开通工作室后，可以上传原创素材和原创花型，由工作室按照市场价格或者其它标准自行制定价格，素材和花型售出后，织道平台按照交易金额的30%收取佣金。期中，原创素材统一放在用户频道花型设计模块的原创素材中，不能单独交易，用户使用了该元素设计花型并购买后，按照素材本身的价格进行收取交易价的30%作为佣金。例如，某顾客自行设计的花型后，如果里面使用了1个原创素材，价格为10元，那么该顾客购买该花型需要支付10元，期中原创素材的交易额为10元，那么织道平台获取3元佣金，该原创素材的工作室获得7元。原创花型放在工作室店铺中售卖，单独交易，用户购买该原创花型，织道平台按照花型交易价的30%收取佣金。工作室获得的收益可以申请结算，100元起步提现，发起结算申请后，3-7个工作日到绑定银行账户。</div>
    </div>
    
    <Jump v-if="showJump" :title="err"></Jump>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Studiotap from "../../components/Studiotap";
import Jump from "../../components/Jump";
import Loading from "../../components/Loading";
import Scroll from "../../assets/js/scroll.js";

export default {
  name: "Regulations",
  components: {
    Studiotap,
    Loading,
    Jump
  },
  data() {
    return {
      showJump: false,
      tabIndex: 5,
      showLoading: false,
      type: 0
    };
  },
  methods: {
    changeEnglish() {
      this.$router.go(0);
    },
    qiehuan(e) {
      this.type = e;
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.drawPie("canBox");
    // });
    // let createTime = JSON.parse(localStorage.getItem("user")).createTime;
    // if (date.getTime() < createTime + 1 * 60 * 60 * 1000) {
    //   this.all.newTime = true;
    // }
    // if (this.all.newTime) {
    //   this.showModel = false;
    // }
    localStorage.setItem("path", "/StudioManagement");
    if (localStorage.getItem("English")) {
      this.$router.push({
        path: "/Engegulations"
      });
    } else {
      this.$router.push({
        path: "/Regulations"
      });
    }
  }
};
</script>
<style scoped>
.window {
  width: 1920px;
  height: 1500px;
  background-color: rgb(215, 215, 218);
}
.studio {
  width: 244px;
  height: 1359px;
  background-color: #485765;
  color: white;
  font-size: 20px;
  text-align: center;
  position: absolute;
  left: 61px;
  top: 100px;
}
.shuru {
  width: 900px;
  height: 1249px;
  padding: 50px;
  position: absolute;
  left: 360px;
  top: 110px;
  font-size: 12px;
  color: #050500;
  background-color: rgba(255, 255, 255, 0.85);
}
.studio > div {
  margin-top: 30px;
  height: 61px;
  line-height: 61px;
  margin-bottom: 90px;
}
.shuru > div {
  width: 700px;
  height: 30px;
  text-align: left;
  margin-bottom: 41px;
  position: relative;
  margin-left: 100px;
}
.click {
  width: 264px;
  position: relative;
  left: -10px;
  background-color: #0362d7;
}
@media screen and (max-width: 1400px) {
  .shuru {
    width: 900px;
    left: 50px;
  }
  .studio {
    display: none;
  }
}
</style>
