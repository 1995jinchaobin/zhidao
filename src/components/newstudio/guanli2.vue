<template>
  <div class="xiugai">
    <div class="biaoti">工作室管理条例</div>
    <hr class="hr">
    <div style="line-height:1.8em">
       <span class="h1">一.总述</span>
        <br style="text-indent:2em" />为维护织道平台的正常经营秩序，保障织道用户的合法权益，实现设计师工作室的规范化运营，特根据国家法律法规规范，以及织道平台相关协议和规则制定本规定。
        <br />
        <br />
        <span class="h1">二.违规处理条例</span>
        <br />1.工作室将他人的作品冒充自己原创作品或侵害他人著作权的作品用于出售，查实后删除此作品，并做永久关闭工作室处理。经权利人申请，织道平台有权按照相关法律法规规定以该工作室账户内资金进行先行赔偿。
        <br />2.工作室售出的素材和花型如果出现回位问题、清晰度问题、存在不相关内容、分层不标准问题，一经投诉，工作室需要按照要求进行修改，并在24小时内重新上传更改好的图片和PSD源文件至平台，如果修改后的商品还是存在不能有效使用的问题，购买者有权要求退款。
        <br />3.工作室出售的原创素材、花型页面信息（包括预览图、参数描述等地方）和源文件（包括图层名称、外部链接、压缩包内附其它说明类的形式）中不得出现QQ、电话号码、
        E-mail等联系方式，如发现此类作品一律不提供服务或直接删除，超过3次提示不改者，隐藏工作室1个月、同时冻结余额1个月。
        <br />4.工作室将上传到织道平台的原创出售花型私下与花型购买者进行交易，恶意避开织道平台，及文件有问题不配合客服人员工作帮助买家解决的，工作室将支付织道平台2-5倍交易佣金作为赔偿，若该赔偿金额低于50元，则工作室须向织道平台支付50元作为赔偿金，并视情节轻重进行冻结余额或封号等相关处理。
        <br />5.转载织道平台其它工作室发布的原创素材和花型（被转载的工作室仅在织道平台发布）到其他网站上供他人（免费、收费）下载者，一经发现作封号处理。
        <br />6.下载织道平台的共享素材或工作室的原创素材重新上传到织道平台出售，一经发现马上删除文件并进行警告，超过3次提示不改者，隐藏店铺1个月、同时冻结余额1个月。
        <br />7.下载织道用户的原创素材和花型准备用于/用于制盗版出售的，一经发现作封号处理。
        <br />8.因工作室人为因素导致交易失败的，织道平台在接到素材花型购买者投诉并确认事实成立后，除将工作室所得收入返还给购买者以外，工作室还须赔偿织道平台交易佣金部分的损失（赔偿交易金额的30%）。工作室人为因素导致交易失败的，包括但不限于以下情况：
        <br /> <b> a. 原创出售花型的格式、回位、清晰度、像素尺寸、颜色模式等与工作室的描述有严重出入的；</b>
        <br /> <b>b.原创出售花型的分辨率、像素尺寸虽与页面显示相符，但实际像素明显模糊的；</b>
        <br /> <b>c. 原创花型PSD源文件的图层合并或分层严重不精细，导致作品购买者不能使用的； d.预览图需与源文件保持一致（在不影响购买者使用的前提下允许适当的修饰），若有严重出入导致作品购买者不能使用的；</b>
        <br /> <b>e.当花型PSD源文件出错，购买者在投诉后仍需要文件时，未能及时将文件发送给买家的；</b>
        <br /> <b>f.分层的原创出售花型需保证各个分层图片相对清晰，内含位图的矢量格式文件，应注明主要位图的分辨率和尺寸，因描述不详造成购买者下载后不能正常使用的。</b>
        <br />
        <br />
        <span class="h1">三.附则</span>
        <br />1.织道平台可根据平台运营情况随时调整本管理规定并以公告的形式向工作室公示；工作室入驻织道即表示接受织道其后不时调整、颁布的管理规则。
        <br />2.工作室应遵守国家法律、行政法规、部门规章等规范性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规则已有规定的，适用于本规则。本规则尚无规定的，织道有权酌情处理
        <br />3.该规定于2019年3月5日制定，于2019年3月20日起生效。
    </div>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Jump from "@/components/Jump";
import Usertab from "../../components/Usertab";
import Loading from "@/components/Loading";
import Scroll from "@/assets/js/scroll.js";
export default {
  name: "guanli2",
  components: {
    Tab,
    Loading,
    Jump,
    Usertab
  },
  data() {
    return {
      path: "/newstudio/guanli2",

    };
  },
  methods: {
    xuanzhongf(e){
      this.$emit('xuanzhongf',e);
    },
  },
  mounted(){
    // localStorage.setItem("path", this.path);
    this.xuanzhongf(8);
  }
};
</script>

<style scoped>
.xiugai {
  width: 900px;
  height: 1130px;
  padding-top: 43px;
  padding-left: 78px;
  padding-right: 78px;
  background: #ffffff;
  border: 0;
  position: relative;
  text-align: left;
  font-size: 14px;
  color: #151515;
}
.h1 {
  color: #333333;
  font-weight: bold;
}
.biaoti {
  font-family: SourceHanSansCN-Medium;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: left;
  width: 900px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.hr {
  width: 760px;
  position: relative;
  top: -15px;
  left: 163px;
  *margin: 0;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
  margin-bottom: 20px;
}
.pageBox {
  /* width: 550px; */
  height: 30px;
  background-color: #f5f5f5;
  margin: auto;
  display: table;
  position: absolute;
  top: 950px;
  left: 330px;
}
.pageBox div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  display: table-cell;
}
.pageBox .click1 {
  background: #333333;
  color: white;
}
ul.pageBox {
  padding-bottom: 3.125rem;
  display: flex;
  margin-top: 1.625rem;
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
  margin: 0 0.7125rem;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
ul.pageBox li.click {
  background: #000;
  color: #fff;
}
ul.pageBox li img {
  display: block;
  width: 0.5rem;
  height: 1rem;
  margin: 0.625rem auto;
}
ul.pageBox li.click {
  background: #000;
  color: #fff;
}
</style>