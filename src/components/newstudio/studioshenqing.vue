<template>
  <div class="user">
    <!-- 个人中心首页 -->
    <Tab :path="path" @showEnglish="changeEnglish"></Tab>
    <div class="box">
      <div class="blackzhezhao" v-if="management">
        <img class="guanbi" src="../../assets/image/studio/close.png" @click="close" />
        <div class="managementtext">         
          <div class="managementbiaoti">工作室管理条例</div>
          <hr class="managementhr" />
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
            <br />
            <b>a. 原创出售花型的格式、回位、清晰度、像素尺寸、颜色模式等与工作室的描述有严重出入的；</b>
            <br />
            <b>b.原创出售花型的分辨率、像素尺寸虽与页面显示相符，但实际像素明显模糊的；</b>
            <br />
            <b>c. 原创花型PSD源文件的图层合并或分层严重不精细，导致作品购买者不能使用的； d.预览图需与源文件保持一致（在不影响购买者使用的前提下允许适当的修饰），若有严重出入导致作品购买者不能使用的；</b>
            <br />
            <b>e.当花型PSD源文件出错，购买者在投诉后仍需要文件时，未能及时将文件发送给买家的；</b>
            <br />
            <b>f.分层的原创出售花型需保证各个分层图片相对清晰，内含位图的矢量格式文件，应注明主要位图的分辨率和尺寸，因描述不详造成购买者下载后不能正常使用的。</b>
            <br />
            <br />
            <span class="h1">三.附则</span>
            <br />1.织道平台可根据平台运营情况随时调整本管理规定并以公告的形式向工作室公示；工作室入驻织道即表示接受织道其后不时调整、颁布的管理规则。
            <br />2.工作室应遵守国家法律、行政法规、部门规章等规范性文件。对任何涉嫌违反国家法律、行政法规、部门规章等规范性文件的行为，本规则已有规定的，适用于本规则。本规则尚无规定的，织道有权酌情处理
            <br />3.该规定于2019年3月5日制定，于2019年3月20日起生效。
          </div>
        </div>
        
      </div>

      <div class="leftbox">
        <div class="bottombox">
          <div style="height:45px"></div>
          <div class="bottomboxh1">
            <div>工作室</div>
            <div>申请流程</div>
          </div>
          <div class="bottomboximg" style="margin-top:32px" v-if="liucheng!=0">
            <!-- <div class="bimg1">
              <img src="../../assets/image/studio/tijiaoziliao2.png" alt />
            </div>-->
            <div class="bimg2">
              <img src="../../assets/image/studio/tijiaoziliao.png" alt />
            </div>
            <div class="bimg3">提交资料</div>
            <div class="bimg4">信息一定要真实哦</div>
          </div>
          <div class="bottomboximg" style="margin-top:32px" v-if="liucheng==5">
            <!-- <div class="bimg1">
              <img src="../../assets/image/studio/tijiaoziliao.png" alt />
            </div>-->
            <div class="bimg2" style="border:2px solid #DDDDDD">
              <img src="../../assets/image/studio/tijiaoziliao2.png" alt />
            </div>
            <div class="bimg3">提交资料</div>
            <div class="bimg4">信息一定要真实哦</div>
          </div>
          <div class="bottomboximg" v-if="liucheng==1">
            <!-- <div class="bimg1">
              <img src="../../assets/image/studio/tijiaoziliaobingzhifu.png" alt />
            </div>-->
            <div class="bimg2" style="border:2px solid #DDDDDD">
              <img src="../../assets/image/studio/gray2.png" alt />
            </div>
            <div class="bimg3">审核</div>
            <div class="bimg4">
              快啦！快啦！
              <br />马上就审核完了！
            </div>
          </div>
          <div class="bottomboximg" v-if="liucheng==2">
            <!-- <div class="bimg1">
              <img src="../../assets/image/studio/gray2.png" alt />
            </div>-->
            <div class="bimg2">
              <img src="../../assets/image/studio/tijiaoziliaobingzhifu.png" alt />
            </div>
            <div class="bimg3">审核</div>
            <div class="bimg4">快啦！快啦！马上就审核完了！</div>
          </div>
          <div class="bottomboximg">
            <!-- <div class="bimg1">
              <img src="../../assets/image/studio/形状.png" alt />
            </div>-->
            <div class="bimg2" style="border:2px solid #DDDDDD">
              <img src="../../assets/image/studio/gray1.png" alt />
            </div>
            <div class="bimg3">完成</div>
            <div class="bimg4">快上传你的作品吧！</div>
          </div>
        </div>
      </div>
      <div class="rightbox" v-if="liucheng==1">
        <div class="xiugai">
          <div class="tishi" style="color:#888888;">
            带
            <span style="color:red">*</span> 号必填
          </div>
          <div class="biaoti">工作室信息</div>
          <hr class="hr" />
          <!-- <button style="position:relative;top:-10px;" @click="changeEnglish()">测试刷新</button> -->
          <div class="kuai">
            <div class="title">
              工作室名称
              <span style="color:red">*</span>
            </div>
            <input oninput="if(value.length>20)value=value.slice(0,20);" v-model="message.studio_name" />
          </div>
          <div class="kuai" style="height:156px">
            <div class="title">
              工作室logo
              <span style="color:red">*</span>
            </div>
            <div class="upload">
              <div class="img-container" style="width:117px">
                <img
                  v-if="src1==''"
                  style="width:30px;height:28px;background-size:30px 28px;position:relative;top:26px;"
                  src="../../assets/image/studio/bz1.png"
                  alt
                />
                <div
                  class="sf2"
                  v-if="src1==''"
                  style="    color: rgb(189, 187, 187);
    position: relative;
    top: 30px;
    font-size: 12px;
    width: 95px;
    margin: auto;"
                >请上传一张高清png或jpg格式图片(5M以内)</div>
                <img
                  v-if="src1!=''"
                  :src="src1"
                  width="117"
                  height="117"
                  style="background-size:162px 78px;"
                  alt
                />
              </div>
              <input type="file" style="display:none" @change="getFile1" ref="file" id="file1" />
              <label class="zhezhao" style="width:117px" for="file1"></label>
            </div>
          </div>
          <div class="kuai" style="height: 201px;">
            <div class="title">
              工作室简介
              <span style="color:red">*</span>
            </div>
            <textarea
              :style="{'width': (lv1==1 ? '390px':'335px'),'height': (lv1==1 ? '122px':'40px'),}"
              maxlength="500"
              @click="lvf1(1)"
              v-model="message.studio_introduction"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
            <span
              style="color: rgb(189, 187, 187);"
              v-if="lv1==1"
            >剩余可输入字数{{500-message.studio_introduction.length}}</span>
          </div>
          <div class="biaoti">设计师信息</div>
          <hr class="hr" />
          <div class="kuai">
            <div class="title">
              真实姓名
              <span style="color:red">*</span>
            </div>
            <input v-model="message.name" />
          </div>
          <div class="kuai">
            <div class="title">邮箱</div>
            <input v-model="message.email" />
          </div>
          <div class="kuai" style="height:140px">
            <div class="title">
              身份证图片
              <span style="color:red">*</span>
            </div>
            <div class="shenfenzheng">
              <div class="shenfenzheng1">
                <img src="../../assets/image/studio/bianzu6.png" alt />
              </div>
              <div class="shenfenzheng2">
                <div class="upload4">
                  <div class="img-container4">
                    <img
                      class="sf1"
                      v-if="src4==''"
                      src="../../assets/image/studio/zhaopian-2.png"
                      alt
                    />
                    <div class="sf2" v-if="src4==''">身份证背面</div>
                    <img v-if="src4!=''" :src="src4" width="172" height="94" alt />
                  </div>
                  <input type="file" @change="getFile4" style="display:none" ref="file" id="file4" />
                  <label class="zhezhao4" for="file4"></label>
                </div>
              </div>
              <div class="shenfenzheng3">
                <div class="upload4">
                  <div class="img-container4">
                    <img
                      class="sf1"
                      v-if="src5==''"
                      src="../../assets/image/studio/zhaopian-2.png"
                      alt
                      
                    />
                    <div class="sf2" v-if="src5==''">身份证正面</div>
                    <img v-if="src5!=''" :src="src5" width="172" height="94" alt />
                  </div>
                  <input type="file" @change="getFile5" style="display:none" ref="file" id="file5" />
                  <label class="zhezhao4" for="file5"></label>
                </div>
              </div>
              <div class="shenfenzheng4">
                <div class="upload4">
                  <div class="img-container4">
                    <img
                      class="sf1"
                      v-if="src6==''"
                      src="../../assets/image/studio/zhaopian-2.png"
                      alt
                    />
                    <div class="sf2" v-if="src6==''">手持正面照</div>
                    <img v-if="src6!=''" :src="src6" @change="getFile6" width="172" height="94" alt />
                  </div>
                  <input type="file" @change="getFile6" style="display:none" ref="file" id="file6" />
                  <label class="zhezhao4" for="file6"></label>
                </div>
              </div>
            </div>
          </div>
          <div class="kuai">
            <div class="title">单位/学校名</div>
            <input v-model="message.company_name" />
          </div>
        </div>
        <div class="leftmessage">
          <div class="kuai">
            <div class="title">
              工作室类型
              <span style="color:red">*</span>
            </div>
            <div class="huayuan" @click="typef(1)" v-if="type==1">
              <div class="heiyuan"></div>
            </div>
            <div class="huayuan" @click="typef(1)" v-if="type==2"></div>
            <!-- <div class="baoradio">
              
              <input
                type="radio"
                id="radio1"
                name="stu"
                class="radio"
                checked="true"
                value="1"
                v-model="type"
              />
              <label for="radio1"></label>
            </div>-->
            <span style="position: relative; top: -20px;left: 43px;">个人</span>
            <!-- <div class="baoradio" style="position: relative; top: -38px;left: 135px;">
              <input type="radio" id="radio2" name="stu" class="radio" value="2" v-model="type" />
              <label for="radio2"></label>
            </div>-->
            <div
              class="huayuan"
              @click="typef(2)"
              v-if="type==1"
              style="position:relative;top:-37px;left:140px;"
            ></div>
            <div
              class="huayuan"
              @click="typef(2)"
              v-if="type==2"
              style="position:relative;top:-37px;left:140px;"
            >
              <div class="heiyuan"></div>
            </div>

            <span style="position: relative; top: -57px;left: 183px;">公司</span>
          </div>
          <div v-if="type==1" class="kuai" style="height:156px">
            <div class="title">
              示例作品
              <span style="color:red">*</span>
            </div>
            <div class="upload2">
              <div class="img-container">
                <img
                  style="width:30px;height:30px;background-size:30px 30px;position:relative;top:26px;"
                  src="../../assets/image/studio/bz2.png"
                  alt
                />
                <div
                  class="sf2"
                  style="position: relative;width:120px;top: 29px;color:#BDBBBB"
                >{{filename2}}</div>
              </div>
              <input type="file" @change="getFile2" style="display:none" ref="file" id="file2" />
              <label class="zhezhao" for="file2"></label>
            </div>
          </div>
          <div v-if="type==2" class="kuai" style="height:156px">
            <div class="title">
              营业执照
              <span style="color:red">*</span>
            </div>
            <div class="upload3">
              <div class="img-container">
                <img
                  v-if="src3==''"
                  style="width:25px;height:21px;background-size:25px 21px;position:relative;top:26px;"
                  src="../../assets/image/studio/bz3.png"
                  alt
                />
                <div
                  v-if="src3==''"
                  class="sf2"
                  style="position: relative;top: 29px;color:#BDBBBB"
                >{{filename3}}</div>
                <img v-if="src3!=''" :src="src3" width="243" height="117" alt />
              </div>

              <input type="file" @change="getFile3" style="display:none" ref="file" id="file2" />
              <label class="zhezhao" for="file2"></label>
            </div>
          </div>
          <div v-if="type==1" class="kuai" style="height: 201px;">
            <div class="title">
              示例作品描述
              <span style="color:red">*</span>
            </div>
            <!-- onpropertychange="if(value.length>100) value=value.substr(0,100)" -->
            <!-- <input @click="lvf2" v-model="message.description_of_sample_works"  style="width:335px"  v-if="lv2==0"> -->
            <textarea
              :style="{'width': (lv2==1 ? '390px':'335px'),'height': (lv2==1 ? '122px':'40px'),}"
              maxlength="500"
              @click="lvf2"
              style="width:390px;height:122px"
              v-model="message.description_of_sample_works"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
            <span
              style="color: rgb(189, 187, 187);"
              v-if="lv2==1"
            >剩余可输入字数{{500-message.description_of_sample_works.length}}</span>
          </div>
          <div v-if="type==2" class="kuai" style="height: 201px;">
            <div class="title">
              企业介绍
              <span style="color:red">*</span>
            </div>

            <textarea
              :style="{'width': (qiye==2 ? '390px':'335px'),'height': (qiye==2 ? '122px':'40px'),}"
              maxlength="500"
              @click="qiyef(2)"
              v-model="message.company_profile"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
            <span
              style="color: rgb(189, 187, 187);"
              v-if="qiye==2"
            >剩余可输入字数{{500-message.company_profile.length}}</span>
          </div>
          <div class="kuai" style="margin-top:42px;">
            <div class="title">
              手机号
              <span style="color:red">*</span>
            </div>
            <input v-model="message.phone" />
          </div>
          <div class="kuai">
            <div class="title">
              身份证号
              <span style="color:red">*</span>
            </div>
            <input style="width:218px" v-model="message.id_number" />
          </div>
          <div class="kuai" style="margin-top:160px">
            <div class="title">个人履历</div>
            <textarea
              :style="{'width': (lvli==2 ? '390px':'335px'),'height': (lvli==2 ? '122px':'40px'),}"
              maxlength="500"
              @click="lvlif(2)"
              v-model="message.curriculum_vitae"
              name
              id
              cols="30"
              rows="10"
            ></textarea>
            <span
              style="color: rgb(189, 187, 187);"
              v-if="lvli==2"
            >剩余可输入字数{{500-message.curriculum_vitae.length}}</span>
          </div>
        </div>
        <div class="dibu">
          <div
            class="huayuan"
            @click="checkf(2)"
            v-if="check!=2"
            style="border:1px solid #ffcd35;position: relative;top: 15px;left: 8px;"
          ></div>
          <div
            class="huayuan"
            @click="checkf(1)"
            v-if="check==2"
            style="border:1px solid #ffcd35;position: relative;top: 15px;left: 8px;"
          >
            <div class="heiyuan" style="background:#ffcd35"></div>
          </div>
          <!-- <div
            class="baoradio"
            style="position: relative;top:16px;left:10px;border:1px solid #ffcd35;width:16px;height:16px  "
          >
            <input @click="checkf(2)" id="radio3" type="radio" class="radio" />
            <label for="radio3"></label>
          </div>-->
          <span
            @click="opentext"
            style="font-size:14px;position: relative;top: -4px;left:41px;cursor:pointer;"
          >同意《织道工作室管理协议》</span>
          <button v-if="xiugai==0" @click="upload0" class="fabu">完成</button>
          <button v-if="xiugai==1" @click="xiugaif0" class="fabu">完成</button>
        </div>
      </div>
      <div class="rightbox" v-if="liucheng==2">
        <img
          v-if="shenhe==2"
          style="margin-top:350px;margin-bottom: 29px;"
          src="../../assets/image/studio/renzheng.png"
          alt
        />
        <div style="font-size: 20px;color: #656564;" v-if="shenhe==2">感谢您耐心等待</div>
        <div style="font-size: 20px;color: #656564;" v-if="shenhe==2">我们将在一个工作日内完成审核</div>
        <div style="font-size: 20px;color: #656564;" v-if="shenhe==2">谢谢！</div>
        <img
          src="../../assets/image/studio/xx2.png"
          class="shibai1"
          style="margin-top:222px"
          v-if="shenhe==3"
        />
        <div class="shibai2" v-if="shenhe==3">审核失败</div>
        <div class="shibai3" v-if="shenhe==3">请核对并修改一下信息后,再重新提交。</div>
        <div class="shibai4" v-if="shenhe==3">
          <div class="shibai5" v-if="shenhe==3">您提交的内容有如下错误</div>
          <div class="shibai6" v-if="shenhe==3">
            <img class="shibai7" src="../../assets/image/studio/xx1.png" />
            <span style="position: relative;top: -1px;">{{message2.examine_info}}</span>
          </div>
        </div>
        <button class="shibai8" v-if="shenhe==3" @click="chongxin">返回修改</button>
      </div>
    </div>

    <Jump v-if="showJump" :title="err" :change="change"></Jump>
  </div>
</template>
<script>
import Tab from "../../components/Tab";
import Jump from "../../components/Jump2";
import Scroll from "../../assets/js/scroll.js";
let date = new Date();
export default {
  name: "newstudio",
  components: {
    Tab,
    Jump
  },
  data() {
    return {
      change: "",
      shenhe: "",
      message2: "",
      qiye: 0,
      lv1: 0,
      lv2: 0,
      xiugai: 0,
      lvli: 1,
      check: 1,
      path: "/studioshenqing",
      liucheng: 1,
      src1: "",
      src2: "",
      src3: "",
      src4: "",
      src5: "",
      src6: "",
      src1h: 0,
      src2h: 0,
      src3h: 0,
      src4h: 0,
      src5h: 0,
      src6h: 0,
      showJump: false,
      showLoading: false,
      err: "",
      type: 1, //1个人用户，2企业用户
      file1: "", //文件格式
      file2: "", //文件格式
      file3: "", //文件格式
      file4: "", //文件格式
      file5: "", //文件格式
      file6: "", //文件格式
      filename2: "请上传psd格式的源文件（500M以内）",
      filename3: "请上传营业执照的照片",
      management: false,
      message: {
        phone: "",
        email: "",
        name: "",
        id_number: "",
        identity_card_front: "", //url格式
        identity_card_verso: "",
        identity_person_card: "",
        company_name: "",
        curriculum_vitae: "",
        studio_introduction: "",
        studio_name: "", //logo
        studio_logo: "", //示例作品

        the_sample_works: "",
        description_of_sample_works: "",
        business_license: "",
        company_profile: ""
      }
    };
  },
  methods: {
    opentext() {
      this.management = true;
    },
    close(){
      this.management = false;
    },
    lvf1() {
      this.lv1 = 1;
    },
    qiyef(e) {
      this.qiye = e;
    },
    lvf2() {
      this.lv2 = 1;
    },
    chongxin() {
      //console.log(this.message2);
      if (
        this.message2.curriculum_vitae == null ||
        this.message2.curriculum_vitae == undefined
      ) {
        this.message2.curriculum_vitae = "";
      }
      if (
        this.message2.company_profile == null ||
        this.message2.company_profile == undefined
      ) {
        this.message2.company_profile = "";
      }
      if (
        this.message2.description_of_sample_works == null ||
        this.message2.description_of_sample_works == undefined
      ) {
        this.message2.description_of_sample_works = "";
      }
      if (this.message2.email == null || this.message2.email == undefined) {
        this.message2.email = "";
      }
      if (
        this.message2.company_name == null ||
        this.message2.company_name == undefined
      ) {
        this.message2.company_name = "";
      }

      this.message = this.message2;
      //console.log(this.message);
      this.tupianfile(this.message);
      this.liucheng = 1;
      this.xiugai = 1;
    },
    tupianfile() {
      this.src1 = this.message.studio_logo;
      this.src4 = this.message.identity_card_front;
      this.src5 = this.message.identity_card_verso;
      this.src6 = this.message.identity_person_card;
      this.src1h = 1;
      this.src4h = 1;
      this.src5h = 1;
      this.src6h = 1;
      if (this.message.personal_studio_yn == 1) {
        //个人工作室
        this.src2 = this.message.the_sample_works;
        this.src2h = 1;
        this.type = 1;
      } else {
        this.src3 = this.message.business_license;
        this.src3h = 1;
        this.type = 2;
      }
    },

    shenhef(e) {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/new/studio/getStudioByUserId",
        formdata: formData
      };
      this.getData(obj).then(res => {
        //console.log(res.data.result);
        if (res.data.result == null) {
          //console.log(0);
        } else if (res.data.result.examine_state == 0) {
          self.shenhe = 2;
          //console.log(1);
        } else if (res.data.result.examine_state == 1) {
          self.shenhe = 3;
          //console.log(2);
          self.message2 = res.data.result;
          if (
            self.message2.company_name == null ||
            self.message2.company_name == "null"
          ) {
            self.message2.company_name = "";
          } else if (
            self.message2.email == null ||
            self.message2.email == "null"
          ) {
            self.message2.email = "";
          } else if (
            self.message2.curriculum_vitae == null ||
            self.message2.curriculum_vitae == "null"
          ) {
            self.message2.curriculum_vitae = "";
          } else if (
            self.message2.identity_card_front == null ||
            self.message2.identity_card_front == "null"
          ) {
            self.message2.identity_card_front = "";
          } else if (
            self.message2.identity_card_verso == null ||
            self.message2.identity_card_verso == "null"
          ) {
            self.message2.identity_card_verso = "";
          } else if (
            self.message2.identity_person_card == null ||
            self.message2.identity_person_card == "null"
          ) {
            self.message2.identity_person_card = "";
          }
        } else {
          self.$router.push({
            name: "huaxing1"
          });
        }
        if (self.shenhe >= 2) {
          self.liucheng = 2;
          //console.log(3);
        }
        //console.log(self.shenhe, self.liucheng);
      });
    },
    checkf(e) {
      this.check = e;
    },
    lvlif(e) {
      this.lvli = e;
    },
    typef(e) {
      this.type = e;
    },
    xuanzhongf(e) {
      this.xuanzhong = e;
    },
    changeEnglish() {
      window.location.reload();
      //无法刷新只能用原生的
      // this.$router.go(0);
    },
    getFile1(e) {
      var files = e.target.files[0];
      //console.log(files);
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file1 = files;
          self.src1 = this.result;
          self.src1h = 0;
        };
      }
    },
    getFile2(e) {
      var files = e.target.files[0];
      //console.log(files);
      let self = this;
      let psd = "psd";
      let filetype = files.name.substring(
        files.name.indexOf(".") + 1,
        files.name.length
      );

      var location = psd.indexOf(filetype);
      if (files.size > 524288000) {
        this.showJump = true;
        this.err = "文件大小超过500MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (location < -0.5) {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file2 = files;
          self.src2 = this.result;
          self.src2h = 0;
          self.filename2 = files.name;
        };
      }
    },
    getFile3(e) {
      var files = e.target.files[0];
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file3 = files;
          self.src3 = this.result;
          self.src3h = 0;
          self.filename3 = files.name;
        };
      }
    },
    getFile4(e) {
      var files = e.target.files[0];
      //console.log(files);
      let self = this;

      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          //console.log(1);
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file4 = files;
          self.src4 = this.result;
          self.src4h = 0;
        };
      }
    },
    getFile5(e) {
      var files = e.target.files[0];
      //console.log(files);
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file5 = files;
          self.src5 = this.result;
          self.src5h = 0;
        };
      }
    },
    getFile6(e) {
      var files = e.target.files[0];
      //console.log(files);
      let self = this;
      if (files.size > 5242880) {
        this.showJump = true;
        this.err = "文件大小超过5MB";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (files.type != "image/jpeg" && files.type != "image/png") {
        this.showJump = true;
        this.err = "不支持的文件格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.file6 = files;
          self.src6 = this.result;
          self.src6h = 0;
        };
      }
    },
    xiugaif0() {
      let self = this;
      self.xiugaif();
    },

    xiugaif() {
      let self = this;
      if (
        self.message.studio_name == "" ||
        self.message.studio_name == "null" ||
        self.message.studio_name == "underfined" ||
        !/[^\s]+/.test(self.message.studio_name)
      ) {
        self.showJump = true;
        self.err = "工作室名称为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.studio_introduction == "" ||
        self.message.studio_introduction == "null" ||
        self.message.studio_introduction == "underfined" ||
        !/[^\s]+/.test(self.message.studio_introduction)
      ) {
        self.showJump = true;
        self.err = "工作室简介为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.type == 1 &&
        this.message.file2 == ""
        // this.message.description_of_sample_works == ""
      ) {
        this.showJump = true;
        this.err = "个人示例作品未上传";
        //console.log(this.message);
        //console.log("1");
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        (self.type == 1 )&&(this.message.description_of_sample_works == "" ||
        self.message.description_of_sample_works == "null" ||
        self.message.description_of_sample_works == "underfined" ||
        !/[^\s]+/.test(self.message.description_of_sample_works))
      ) {
        this.showJump = true;
        this.err = "示例作品描述为空";
        console.log(self.type);
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.type == 2 && this.message.file3 == "") {
        this.showJump = true;
        this.err = "营业执照未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.type == 2 &&
        (this.message.company_profile == "" ||
          self.message.company_profile == "null" ||
          self.message.company_profile == "underfined" ||
          !/[^\s]+/.test(self.message.company_profile))
      ) {
        this.showJump = true;
        this.err = "企业介绍为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.name == "" ||
        self.message.name == "null" ||
        self.message.name == "underfined" ||
        !/[^\s]+/.test(self.message.name)
      ) {
        self.showJump = true;
        self.err = "真实姓名为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.message.phone == "") {
        self.showJump = true;
        self.err = "手机号为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (!/^1[3456789]\d{9}$/.test(this.message.phone)) {
        this.showJump = true;
        this.err = "手机号格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.email != "" &&
        !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(
          this.message.email
        )
      ) {
        self.showJump = true;
        self.err = "邮箱格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.message.id_number == "") {
        self.showJump = true;
        self.err = "身份证号为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          this.message.id_number
        )
      ) {
        this.showJump = true;
        this.err = "身份证号格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.check != 2) {
        this.showJump = true;
        this.err = "未同意工作室管理法";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        //传图片
        let self = this;
        let pictrueCount = 0;
        //console.log(1);
        if ((self.src1h = 0)) {
          let formData = new FormData();
          formData.append("file", self.file1);
          let obj = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj).then(res => {
            //console.log(res.data.result);
            self.message.studio_logo = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }

        if (self.type == 1) {
          if ((self.src2h == 0)) {
            let formData = new FormData();
            formData.append("file", self.file2);
            let obj2 = {
              url: self.all.baseUrl + "/file/uploadOss",
              formdata: formData
            };
            self.getData(obj2).then(res => {
              //console.log(res.data.result);
              self.message.the_sample_works = res.data.result;
              self.RegisterStudio2(++pictrueCount);
            });
          } else {
            self.RegisterStudio2(++pictrueCount);
          }
        }

        if (self.type == 2) {
          if ((self.src3h == 0)) {
            let formData = new FormData();
            formData.append("file", self.file3);
            let obj3 = {
              url: self.all.baseUrl + "/file/uploadOss",
              formdata: formData
            };
            self.getData(obj3).then(res => {
              //console.log(res.data.result);
              self.message.business_license = res.data.result;
              self.RegisterStudio2(++pictrueCount);
            });
          } else {
            self.RegisterStudio2(++pictrueCount);
          }
        }

        if ((self.src4h == 0)) {
          let formData = new FormData();
          formData.append("file", self.file4);
          let obj4 = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj4).then(res => {
            //console.log(res.data.result);
            self.message.identity_card_front = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }
        if ((self.src5h == 0)) {
          let formData = new FormData();
          formData.append("file", self.file5);
          let obj5 = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj5).then(res => {
            //console.log(res.data.result);
            self.message.identity_card_verso = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }
        if ((self.src6h == 0)) {
          let formData = new FormData();
          formData.append("file", self.file6);
          let obj6 = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj6).then(res => {
            //console.log(res.data.result);
            self.message.identity_person_card = res.data.result;
            self.RegisterStudio2(++pictrueCount);
          });
        } else {
          self.RegisterStudio2(++pictrueCount);
        }
      }
    },
    //e1数据e2提示语句e3 1空格正则正则
    pipei(e1, e2, e3) {
      console.log("jinqu");
      let self = this;
      let reg1 = "/[^s]+/"; //空格正则
      let reg2 = "/^1[3456789]d{9}$/"; //手机号正则
      let reg3 =
        "/^[1-9]d{7}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{3}$|^[1-9]d{5}[1-9]d{3}((0d)|(1[0-2]))(([0|1|2]d)|3[0-1])d{3}([0-9]|X)$/"; //身份证正则
      let reg4 =
        "/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,})$/"; //邮箱正则
      if (e3 == 1) {
        if (e1 == "" || e1 == undefined || e1 == null || !reg1.test(e1)) {
          console.log("cuowu");
          self.showJump = true;
          self.err = e2;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 2000);
          return;
        } else {
          return true;
        }
      } else {
        if (e1 == "" || e1 == undefined || e1 == null) {
          self.showJump = true;
          self.err = e2;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 2000);
          return;
        } else {
          return true;
        }
      }
    },
    upload0() {
      let self = this;
      self.upload();
    },
    upload1() {},
    upload() {
      let self = this;
      // self.pipei(self.message.studio_name,"工作室名称为空111",1);
      if (
        self.message.studio_name == "" ||
        self.message.studio_name == "null" ||
        self.message.studio_name == "underfined" ||
        !/[^\s]+/.test(self.message.studio_name)
      ) {
        // self.pipei(self.message.studio_name,"工作室名称为空111",1);
        self.showJump = true;
        self.err = "工作室名称为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.file1 == "") {
        self.showJump = true;
        self.err = "工作室logo未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.studio_introduction == "" ||
        self.message.studio_introduction == "null" ||
        self.message.studio_introduction == "underfined" ||
        !/[^\s]+/.test(self.message.studio_introduction)
      ) {
        self.showJump = true;
        self.err = "工作室简介为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        this.file1.type != "image/jpeg" &&
        this.file1.type != "image/png"
      ) {
        this.showJump = true;
        this.err = "工作室logo文件为不支持的图片格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.type == 1 && this.file2 == "") {
        this.showJump = true;
        this.err = "个人示例作品未上传";
        //console.log(this.message);
        //console.log("1");
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.type == 1 &&
        (this.message.description_of_sample_works == "" ||
          self.message.description_of_sample_works == "null" ||
          self.message.description_of_sample_works == "underfined" ||
          !/[^\s]+/.test(self.message.description_of_sample_works))
      ) {
        this.showJump = true;
        this.err = "示例作品描述为空";
        //console.log(this.message);
        //console.log("1");
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.type == 2 && this.file3 == "") {
        this.showJump = true;
        this.err = "营业执照未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.type == 2 &&
        (this.message.company_profile == "" ||
          self.message.company_profile == "null" ||
          self.message.company_profile == "underfined" ||
          !/[^\s]+/.test(self.message.company_profile))
      ) {
        this.showJump = true;
        this.err = "企业介绍为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.name == "" ||
        self.message.name == "null" ||
        self.message.name == "underfined" ||
        !/[^\s]+/.test(self.message.name)
      ) {
        self.showJump = true;
        self.err = "真实姓名为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.phone == "" ||
        self.message.phone == "null" ||
        self.message.phone == "underfined"
      ) {
        self.showJump = true;
        self.err = "手机号为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (!/^1[3456789]\d{9}$/.test(this.message.phone)) {
        this.showJump = true;
        this.err = "手机号格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        self.message.email != "" &&
        !/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(
          this.message.email
        )
      ) {
        self.showJump = true;
        self.err = "邮箱格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.message.id_number == "") {
        self.showJump = true;
        self.err = "身份证号为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          this.message.id_number
        )
      ) {
        this.showJump = true;
        this.err = "身份证号格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.file4 == "") {
        self.showJump = true;
        self.err = "手持正面照未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.file5 == "") {
        self.showJump = true;
        self.err = "身份证正面未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.file6 == "") {
        self.showJump = true;
        self.err = "身份证背面未上传";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        this.file4.type != "image/jpeg" &&
        this.file4.type != "image/png"
      ) {
        this.showJump = true;
        this.err = "手持正面照文件为不支持的图片格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        this.file5.type != "image/jpeg" &&
        this.file5.type != "image/png"
      ) {
        this.showJump = true;
        this.err = "身份证正面文件为不支持的图片格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (
        this.file6.type != "image/jpeg" &&
        this.file6.type != "image/png"
      ) {
        this.showJump = true;
        this.err = "身份证背面文件为不支持的图片格式";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else if (self.check != 2) {
        this.showJump = true;
        this.err = "未同意工作室管理法";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 2000);
      } else {
        //传图片
        let self = this;
        let pictrueCount = 0;
        //console.log(1);
        let formData = new FormData();
        formData.append("file", self.file1);
        let obj = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj).then(res => {
          //console.log(res.data.result);
          self.message.studio_logo = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        if (self.type == 1) {
          formData.append("file", self.file2);
          let obj2 = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj2).then(res => {
            //console.log(res.data.result);
            self.message.the_sample_works = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        if (self.type == 2) {
          formData.append("file", self.file3);
          let obj3 = {
            url: self.all.baseUrl + "/file/uploadOss",
            formdata: formData
          };
          self.getData(obj3).then(res => {
            //console.log(res.data.result);
            self.message.business_license = res.data.result;
            self.RegisterStudio(++pictrueCount);
          });
        }
        formData.append("file", self.file4);
        let obj4 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj4).then(res => {
          //console.log(res.data.result);
          self.message.identity_card_front = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        formData.append("file", self.file5);
        let obj5 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj5).then(res => {
          //console.log(res.data.result);
          self.message.identity_card_verso = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        formData.append("file", self.file6);
        let obj6 = {
          url: self.all.baseUrl + "/file/uploadOss",
          formdata: formData
        };
        self.getData(obj6).then(res => {
          //console.log(res.data.result);
          self.message.identity_person_card = res.data.result;
          self.RegisterStudio(++pictrueCount);
        });
        //传图片结束
      }
    },
    RegisterStudio(e) {
      if (e == 5) {
        let self = this;
        self.showLoading=true;
        if (this.type == 1) {
          //个人用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("id_number", self.message.id_number);
          formData.append(
            "identity_card_front",
            self.message.identity_card_front
          );
          formData.append(
            "identity_card_verso",
            self.message.identity_card_verso
          );
          formData.append(
            "identity_person_card",
            self.message.identity_person_card
          );
          formData.append("company_name", self.message.company_name);
          formData.append("curriculum_vitae", self.message.curriculum_vitae);
          formData.append("studio_name", self.message.studio_name);
          formData.append("studio_logo", self.message.studio_logo);
          formData.append(
            "studio_introduction",
            self.message.studio_introduction
          );
          //以上是共有要传的部分
          formData.append("personal_studio_yn", 1);
          formData.append("corporate_studio_yn", 0);
          formData.append("the_sample_works", self.message.the_sample_works);
          formData.append(
            "description_of_sample_works",
            self.message.description_of_sample_works
          );
          let obj = {
            url: self.all.baseUrl + "/new/studio/addStudio",
            formdata: formData
          };

          self.getData(obj).then(res => {
            //console.log(res);
            self.showLoading=false;
            if (res.data.status == 0) {
              this.showJump = true;
              this.err = "提交成功";
              this.change = "duihao";
              localStorage.setItem("shenhechenggong", 1);
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                self.change = "";
                window.location.reload();
              }, 2000);
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
              }, 2000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 2000);
            }
          });
        } else {
          //企业用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("id_number", self.message.id_number);
          formData.append(
            "identity_card_front",
            self.message.identity_card_front
          );
          formData.append(
            "identity_card_verso",
            self.message.identity_card_verso
          );
          formData.append(
            "identity_person_card",
            self.message.identity_person_card
          );
          formData.append("company_name", self.message.company_name);
          formData.append("curriculum_vitae", self.message.curriculum_vitae);
          formData.append("studio_name", self.message.studio_name);
          formData.append("studio_logo", self.message.studio_logo);
          formData.append(
            "studio_introduction",
            self.message.studio_introduction
          );
          //以上是共有要传的部分
          formData.append("personal_studio_yn", 0);
          formData.append("corporate_studio_yn", 1);
          formData.append("business_license", self.message.business_license);
          formData.append("company_profile", self.message.company_profile);
          let obj = {
            url: self.all.baseUrl + "/new/studio/addStudio",
            formdata: formData
          };

          self.getData(obj).then(res => {
            //console.log(res);
            self.showLoading=false;
            if (res.data.status == 0) {
              this.showJump = true;
              this.err = "提交成功";
              this.change = "duihao";
              localStorage.setItem("shenhechenggong", 1);
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                self.change = "";
                window.location.reload();
              }, 2000);
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
              }, 2000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 2000);
            }
          });
        }
      }
    },
    RegisterStudio2(e) {
      if (e == 5) {
        let self = this;
        this.showLoading=true;
        if (this.type == 1) {
          //个人用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("id_number", self.message.id_number);
          formData.append(
            "identity_card_front",
            self.message.identity_card_front
          );
          formData.append(
            "identity_card_verso",
            self.message.identity_card_verso
          );
          formData.append(
            "identity_person_card",
            self.message.identity_person_card
          );
          formData.append("company_name", self.message.company_name);
          formData.append("curriculum_vitae", self.message.curriculum_vitae);
          formData.append("studio_name", self.message.studio_name);
          formData.append("studio_logo", self.message.studio_logo);
          formData.append(
            "studio_introduction",
            self.message.studio_introduction
          );
          //以上是共有要传的部分
          formData.append("personal_studio_yn", 1);
          formData.append("corporate_studio_yn", 0);
          formData.append("the_sample_works", self.message.the_sample_works);
          formData.append(
            "description_of_sample_works",
            self.message.description_of_sample_works
          );
          formData.append("id", self.message.id);
          let obj = {
            url: self.all.baseUrl + "/new/studio/updateStudio",
            formdata: formData
          };

          self.getData(obj).then(res => {
            //console.log(res);
            self.showLoading=false;
            if (res.data.status == 0) {
              this.showJump = true;
              this.err = "提交成功";
              this.change = "duihao";
              localStorage.setItem("shenhechenggong", 1);
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                self.change = "";
                window.location.reload();
              }, 2000);
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
              }, 2000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 2000);
            }
          });
        } else {
          //企业用户
          let formData = new FormData();
          formData.append("phone", self.message.phone);
          formData.append("email", self.message.email);
          formData.append("name", self.message.name);
          formData.append("id_number", self.message.id_number);
          formData.append(
            "identity_card_front",
            self.message.identity_card_front
          );
          formData.append(
            "identity_card_verso",
            self.message.identity_card_verso
          );
          formData.append(
            "identity_person_card",
            self.message.identity_person_card
          );
          formData.append("company_name", self.message.company_name);
          formData.append("curriculum_vitae", self.message.curriculum_vitae);
          formData.append("studio_name", self.message.studio_name);
          formData.append("studio_logo", self.message.studio_logo);
          formData.append(
            "studio_introduction",
            self.message.studio_introduction
          );
          //以上是共有要传的部分
          formData.append("personal_studio_yn", 0);
          formData.append("corporate_studio_yn", 1);
          formData.append("business_license", self.message.business_license);
          formData.append("company_profile", self.message.company_profile);
          formData.append("id", self.message.id);
          let obj = {
            url: self.all.baseUrl + "/new/studio/updateStudio",
            formdata: formData
          };

          self.getData(obj).then(res => {
            //console.log(res);
            self.showLoading=false;
            if (res.data.status == 0) {
              this.showJump = true;
              this.err = "提交成功";
              this.change = "duihao";
              localStorage.setItem("shenhechenggong", 1);
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
                self.change = "";
                window.location.reload();
              }, 2000);
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
              }, 2000);
            } else {
              this.showJump = true;
              this.err = res.data.msg;
              setTimeout(function() {
                self.showJump = false;
                self.err = "";
              }, 2000);
            }
          });
        }
      }
    }
  },
  mounted() {
    this.shenhef();
    // this.getinfo();
    // localStorage.setItem("path", this.path);
    // if (localStorage.getItem("English")) {
    //   this.$router.push({
    //     path: "/studioshenqing"
    //   });
    // } else {
    //   this.$router.push({
    //     path: "/studioshenqing"
    //   });
    // }
  }
};
</script>
<style scoped>
label {
  cursor: pointer;
}
button {
  cursor: pointer;
}
.huayuan {
  font-size: 14px;
  width: 16px;
  height: 16px;
  border: 1px solid #3a3939;
  border-radius: 50%;
  position: relative;
}
.huayuan {
  cursor: pointer;
}
.heiyuan {
  position: absolute;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  top: 2px;
  left: 2px;
  background-color: #3a3939;
}
.sf2 {
  color: #666666;
  color: rgb(189, 187, 187);

  font-size: 12px;
  width: 95px;
  margin: auto;
}
.box {
  font-size: 14px;
}
.shibai1 {
  width: 72px;
  height: 72px;
  background-size: 72px 72px;
}
.shibai2 {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 32px;
  margin-top: 24px;
}
.shibai3 {
  font-size: 14px;
  color: #979797;
  line-height: 22px;
  margin-top: 16px;
  margin-bottom: 24px;
}
.shibai4 {
  width: 520px;
  margin-top: 24px;
  padding-top: 24px;
  height: 148px;
  background: #fafafa;
  border-radius: 2px;
  margin: auto;
  padding-left: 40px;
}
.shibai5 {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  margin-top: 24px;
  text-align: left;
  width: 200px;
  height: 24px;
}
.shibai6 {
  width: 520px;
  height: 24px;
  margin-top: 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  text-align: left;
}
.shibai7 {
  width: 14px;
  height: 14px;
  background-size: 14px 14px;
  margin-right: 8px;
}
.shibai8 {
  background: #ffe300;
  border-radius: 4px;
  width: 88px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  margin-top: 32px;
  border: 0;
}
.shibai8:hover{
  background:#ffd000;
}
.tishi {
  position: absolute;
  top: 15px;
  right: 50px;
}
.baoradio {
  border: 1px solid #3a3939;
  width: 16px;
  border-radius: 50%;
  height: 16px;
}
input {  
  text-indent: 8px;
}
textarea { 
  border-radius: 4px;
  font-size: 13px;
  resize: none;
}
input:focus{
  outline-color: #ffe300;
}
textarea{
  outline-color: #ffe300;
}
input[type="radio"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 12px;
  height: 12px;
  margin-right: 6.4px;
  border-radius: 50%;
  /* border: 1px solid #3a3939; */
  text-indent: 2.4px;
  line-height: 1;
  position: relative;
  top: -2px;
  left: 2px;
}
input[type="radio"]:checked + label::before {
  background-color: #3a3939;
  background-clip: content-box;
}
input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
#radio3 + label::before {
  left: 2px;
  width: 12px;
  height: 12px;
  top: -2px;
}
#radio3:checked + label::before {
  background-color: #ffcd35;
  background-clip: content-box;
}
.sf1 {
  margin-top: 27px;
}

.shenfenzheng {
  height: 100px;
  width: 800px;
  position: relative;
  z-index: 10;
}
.shenfenzheng1 {
  width: 172px;
  height: 97px;
}
.shenfenzheng2 {
  width: 172px;
  height: 97px;
  position: absolute;
  top: 0;
  left: 193px;
}
.shenfenzheng3 {
  width: 172px;
  height: 97px;
  position: absolute;
  top: 0;
  left: 386px;
}
.shenfenzheng4 {
  width: 172px;
  height: 97px;
  position: absolute;
  top: 0;
  left: 579px;
}
.dibu {
  width: 200px;
  height: 60px;
  position: absolute;
  left: 400px;
  top: 1070px;
}
.radio {
  width: 20px;
  height: 20px;
}
.leftmessage {
  position: absolute;
  left: 50%;
  top: 58px;
}
.fabu {
  margin-top: 10px;
  width: 184px;
  height: 47px;
  border: 0;
  border-radius: 4px;
  background: #ffe300;
  font-size: 16px;
  color: #262626;
}
.fabu:hover{
  background: #ffd000;
}
.wenzi {
  position: absolute;
  top: 110px;
  left: 0;
  width: 162px;
  text-align: center;
  z-index: 1;
}
.upload {
  position: relative;
  border: 1px solid #979797;
  background-color: #fffbeb;
  border-radius: 4px;
  width: 117px;
  height: 117px;
  /* background-image: url("../../assets/image/studio/编组3.png"); */
  background-size: 117px 117px;
  /* background-size: 365px 185px; */
}
.upload2 {
  position: relative;
  border: 1px solid #979797;
  background-color: #fffbeb;

  border-radius: 4px;
  width: 243px;
  height: 117px;

  /* background-image: url("../../assets/image/studio/编组4.png"); */
  background-size: 243px 117px;
  /* background-size: 365px 185px; */
}
.upload3 {
  position: relative;
  border: 1px solid #979797;
  background-color: #fffbeb;
  border-radius: 4px;
  width: 243px;
  height: 117px;

  /* background-image: url("../../assets/image/studio/编组8.png"); */
  background-size: 243px 117px;
  /* background-size: 365px 185px; */
}
.upload4 {
  width: 170px;
  height: 95px;
  position: relative;
  border: 1px dashed #979797;
  /* background-size: 365px 185px; */
}
.img-container4 {
  width: 170px;
  height: 95px;
  border: 1px dashed #d8d8d8;
  /* background-color: #c7c5c5; */
  text-align: center;
  z-index: 100;
  /* line-height: 367px; */
}
.zhezhao4 {
  width: 170px;
  height: 95px;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0); */
}
.img-container {
  width: 243px;
  height: 117px;
  /* border: 1px solid grey; */
  border-radius: 4px;
  /* background-color: #c7c5c5; */
  text-align: center;
  z-index: 100;
  /* line-height: 367px; */
}
.zhezhao {
  width: 243px;
  height: 117px;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0); */
}
.zhezhao2 {
  width: 162px;
  height: 78px;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0); */
}

.xiugai {
  width: 909px;
  height: 1170px;
  padding-top: 20px;
  padding-left: 78px;
  background: #ffffff;
  border: 0;
  position: relative;
}
.select {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 158px;
  height: 38px;
  margin-right: 36px;
}
.select2 {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 240px;
  height: 38px;
}
input {
  border: 1px solid #979797;
  border-radius: 4px;
  border-radius: 4px;
  width: 158px;
  height: 38px;
}
.kuai {
  height: 81px;
  text-align: left;
  width: 400px;
  margin-top: 10px;
}
.title {
  height: 20px;
  width: 160px;
  margin-bottom: 18px;
}
.biaoti {
  font-family: SourceHanSansCN-Medium;
  font-weight: bold;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: left;
  width: 900px;
  height: 30px;
  line-height: 30px;
}
.hr {
  width: 760px;
  position: relative;
  top: -22px;
  left: 116px;
  margin-top: 7px;
  *margin: 0;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
}
.bottomboxh1 {
  height: 57px;
  width: 237px;
  text-align: center;
  font-size: 24px;
  color: #333333;
}
.bottomboximg {
  height: 200px;
  width: 237px;
  text-align: center;
  margin-top: 10px;
  position: relative;
}
.bimg1 {
  width: 30px;
  position: relative;
  left: 21px;
}
.bimg1 > img {
  width: 30px;
}
.bimg2 {
  width: 60px;
  height: 60px;
  margin: auto;
  border: 2px solid #ffe135;
  border-radius: 50%;
  margin-bottom: 8px;
}
.bimg2 > img {
  width: 30px;
  margin: auto;
  position: relative;
  top: 16px;
}
.bimg3 {
  font-size: 16px;
  color: #333333;
  margin-bottom: 8px;
}
.bimg4 {
  font-size: 12px;
  color: #ada9a9;
}
.topbox1 {
  position: relative;
  top: 10px;
}
.topbox2 {
  margin-top: 10px;
}
.topbox4 {
  width: 180px;
  height: 27px;
  border: 0;
  margin-top: 15px;
  background-color: #ffe135;
}
.topbox5 {
  width: 180px;
  height: 27px;
  border: 0;
  margin-top: 10px;
  background-color: #e3e3e3;
}
.box {
  width: 1200px;
  height: 1200px;
  margin: auto;
  margin-top: 50px;
  background-color: #eee;
  position: relative;
}

.leftbox {
  width: 234px;
  height: 1200px;
  background-color: #eee;
}
.rightbox {
  width: 960px;
  height: 1170px;
  position: absolute;
  top: 0;
  left: 258px;
  background-color: white;
}
.topbox {
  width: 234px;
  height: 320px;
  background-color: white;
}
.bottombox {
  margin-top: 10px;
  width: 237px;
  height: 1170px;
  background-color: white;
  text-align: center;
}
.bottombox1 {
  margin-top: 50px;
}
.bottombox2 {
  margin-top: 50px;
}
.bottombox3 {
  margin-top: 50px;
}
.bottombox4 {
  margin-top: 50px;
}
.first {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  letter-spacing: 0;
  height: 44px;
  line-height: 44px;
}
.else {
  background: rgba(255, 255, 255, 0.08);
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  height: 44px;
  line-height: 44px;
  display: block;
}
.xuanzhong2 {
  background: rgba(255, 227, 0, 0.08);
  border-left: 4px solid #ffe300;
  box-sizing: border-box;
  text-indent: 76px;
}
.yellow {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 5rem;
  background-color: #ffde18;
}
.user {
  background: #eee;
  min-height: 100vh;
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
.managementtext {
  position: fixed;
  top: calc(50vh - 220px);
  left: calc(50vw - 331px);
  width: 663px;
  height: 440px;
  background-color: #ffffff;
  z-index: 100;
  overflow-y:scroll; 
  overflow-x:hidden; 
}
.managementtext>div{
  text-align: left;
}
.managementbiaoti{
font-family: SourceHanSansCN-Medium;
  font-size: 20px;
  color: #333333;
  letter-spacing: 0;
  text-align: center!important;
  width: 663px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.managementhr{
    width: 663px;
    position: relative;
    top: 0px;
    left: 0px;
  border: 0;
  color: #d8d8d8;
  background-color: #d8d8d8;
  height: 1px;
  margin-bottom: 20px;
}
.h1 {
  color: #333333;
  font-weight: bold;
  text-align: left;
}
.guanbi {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;  
  top: calc(50vh - 220px);
  left: calc(50vw + 341px);
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid gray;
  font-size: 25px;
  line-height: 30px;
  background-size: 30px 30px;
}
</style>