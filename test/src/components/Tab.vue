<template>
  <div :class="tabIndex == 98 ? 'navHome' : 'nav'">
    <!-- 当前页面为首页时显示 -->
    <div v-if="tabIndex == 98">
      <div class="leftBox">
        <div class="logoBox">
          <img class="logoImg" @click="toBack" src="../assets/logo.png" alt />
          <img v-if="showQfc" class="qfc" src="../assets/image/qfclogo.png" alt />
        </div>
        <ul class="navHomeBox">
          <li v-for="(item,index) in arr" :key="'list'+index" @click="change(index)">
            {{item.name}}
            <div class="botIcon" :style="{'width': showBack[index] ? '36px' : '0'}"></div>
          </li>
          <li id="act" :data-act="0" @mouseover="botHidd()" @mouseout="botNone()"></li>
        </ul>
        <ul id="bot" style="height: 0">
          <li v-for="(item,index) in arrNow" :key="index" @click="linkTo(item.link,item.name)" @mouseover="actHidd" @mouseout="actNone">{{item.name}}</li>
        </ul>
      </div>
      <div class="rightBox">
        <div class="vipBox">
          <img class="mouse" @click="toVip" src="../assets/vip01.png" alt />
        </div>
        <div v-if="land == 1" class="rightUser">
          <div @click="toCar" class="cartBox mouse">
            <div v-if="orderNum > 0">{{orderNum}}</div>
          </div>
          <div class="avator" @mouseenter="downChange" @mouseleave="topChange">
            <div class="userImg" @click="linkTo('Flower','')">
              <img class="avatorImg" v-if="userHeadPhoto&&userHeadPhoto != 'null'" :src="userHeadPhoto">
              <img class="avatorImg" v-else-if="!userHeadPhoto" src="../assets/image/user/avator.png">
            </div>
            <span @click="linkTo('Flower','')">
              {{userName}},{{Hello}}<br/>
              <span class="vipLv">{{vipLv}} <img src="../assets/bottom.png"></span>
            </span>
            <!-- <div class="userIcon"></div> -->
            <div id="userInfo" class="userInfo" :data-act="0" @mouseenter="userHidd" @mouseleave="userNone" style="height: 0">
              <p><span class="mouse" @click="changeClick()">退出</span></p>
              <div class="userCount" v-if="isVip == 1">
                <img v-if="userHeadPhoto&&userHeadPhoto != 'null'" :src="userHeadPhoto">
                <img v-else-if="!userHeadPhoto" src="../assets/userIcon.png">
                <div>
                  {{userName}}<img src="../assets/VIP.png"><br/>
                  <span>
                    {{expirationTime}}到期 <span class="mouse" @click="vipf(1)">立即续费</span>
                  </span>
                </div>
              </div>
              <div class="userCount" v-else-if="isVip == -1">
                <img :src="userHeadPhoto">
                <div>
                  {{userName}}<br/>
                  <span>
                    您还未开通VIP<span @click="toVip" class="vipOn mouse">立即开通</span>
                  </span>
                </div>
              </div>
              <div class="userItem">
                <div class="mouse" @click="linkTo(item.link,item.name)" v-for="(item,index) in navList" :key="index">
                  <img :src="item.url"><p>{{item.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="land == -1" class="rightUser langOut">
          <img class="avatorImg" src="../assets/userIcon.png" alt />
          <div class="avatorNone">
            <span @click="toLogin">登录</span>/<span @click="toLogin">注册</span>
          </div>
        </div>
        <!-- <div class="down" @mouseleave="upDown" @mouseenter="toDown">
          <img class="downImg" src="../assets/image/cut/more.png" alt />
          <ul @mouseleave="leaveLink" class="downList" v-if="showList">
            <li v-for="(item,index) in navList" :key="index" @click="toLink(index)">{{item}}</li>
          </ul>
          <img class="image" v-if="showList" src="../assets/image/cut/tangle.png" alt />
          <div class="custom" v-if="showService">
            <div>客服热线：{{number}}</div>
          </div>
        </div> -->
      </div>
      <div class="model" v-if="showDebunk">
        <div class="debunkBox">
          <span @click="delDebunk" class="delBox"></span>
          <img class="debunkimg" src="../assets/image/debunk.png" alt />
          <div class="debunk">
            <p>我们珍视您的每一次反馈</p>
            <p>请准确描述您遇到的问题或建议，我们将努力改进</p>
            <form action>
              <label class="round" for>
                <div v-for="(item,index) in debunkArr" :key="index">
                  <input
                    type="radio"
                    class="radioBox"
                    name="select"
                    @click="changeInput(index)"
                    :checked="item.isCheck"
                  />
                  <div class="backImg"></div>
                  <span>{{item.name}}</span>
                </div>
              </label>
              <label for>
                <textarea v-model="textValue" class="advice" placeholder="请留下您宝贵的意见或建议，我们将努力改进"></textarea>
              </label>
              <label for class="upBox">
                <div class="addBox" v-if="!showPicture">
                  <input class="file" accept="image/*" multiple type="file" @change="add" />
                  <img class="addPic" src="../assets/image/user/up.png" alt />
                  <span>上传图片</span>
                </div>
                <div class="picBox" v-if="showPicture">
                  <img class="picture" :src="localUrl" alt />
                  <span @click="del" class="del"></span>
                </div>
              </label>
              <label for>
                <button class="btn" @click="toSubmit">提交</button>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div class="aboutUs" v-if="showAbout">
        <div class="aboutBox">
          <img src="../assets/image/login/close.png" class="aboutDel" @click="aboutDel" />
          <h3>关于我们</h3>
          <p v-for="(item,index) in aboutDescript" :key="index">{{item}}</p>
          <ul>
            <li v-for="(item,index) in aboutArr" :key="index">{{item.name}}{{item.descript}}</li>
          </ul>
        </div>
      </div>
      <div v-if="showPassword" class="passwordModel">
        <div v-if="showFirst" class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>修改密码</h5>
          <label for>
            <span class="passSpan">手机号码:</span>
            <input :value="phone" type="text" readonly />
          </label>
          <label for>
            <span class="passSpan">验证码:</span>
            <input v-model="code" maxlength="4" type="text" placeholder="请输入验证码" />
            <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
            <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
          </label>
          <button @click="passNext" class="passBtn">下一步</button>
        </div>
        <div v-if="showSecond" class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>修改密码</h5>
          <label for>
            <span class="passSpan">输入新密码:</span>
            <input v-model="password" type="password" placeholder="请输入新密码" />
          </label>
          <label for>
            <span class="passSpan">确认密码:</span>
            <input v-model="surePassword" type="password" placeholder="请再次输入密码" />
          </label>
          <button @click="passSuccess" class="passBtn">完成</button>
        </div>
      </div>
      <div v-if="showBind" class="passwordModel">
        <div class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>绑定手机号码</h5>
          <label for>
            <span class="passSpan">手机号码:</span>
            <input placeholder="输入手机号" v-model="myphone" maxlength="11" type="text" />
          </label>
          <label for>
            <span class="passSpan">验证码:</span>
            <input v-model="mycode" maxlength="4" type="text" placeholder="请输入验证码" />
            <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
            <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
          </label>
          <button @click="bindPhone" class="passBtn">完成</button>
        </div>
      </div>
      <Jump v-if="showJump" :title="err"></Jump>
    </div>
    <!-- 当前页面为其他页面时显示 -->
    <div v-else-if="tabIndex != 98">
      <div class="logoBox">
        <img @click="toBack" src="../assets/logo1.png" alt />
      </div>
      <ul class="navBox">
        <li v-for="(item,index) in arr" :key="'list'+index" @click="change(index)" :class="showBack[index]?'hoverLi':''">
          {{item.name}}
          <div class="botIcon" :style="{'width': showBack[index] ? '36px' : '0'}"></div>
        </li>
        <li id="act" :data-act="0" @mouseover="botHidd()" @mouseout="botNone()"></li>
      </ul>
      <ul id="bot" style="height: 0">
        <li v-for="(item,index) in arrNow" :key="index" @click="linkTo(item.link,item.name)" @mouseover="actHidd" @mouseout="actNone">{{item.name}}</li>
      </ul>
      <div class="rightBox">
        <div class="vipBox">
          <img class="mouse" @click="toVip" src="../assets/vip01.png" alt />
        </div>
        <div v-if="land == 1" class="rightUser">
          <div @click="toCar" class="cartBox mouse">
            <div v-if="orderNum > 0">{{orderNum}}</div>
          </div>
          <div class="avator" @mouseenter="downChange" @mouseleave="topChange">
            <div @click="linkTo('Flower','')" class="userImg">
              <img class="avatorImg" v-if="userHeadPhoto&&userHeadPhoto != 'null'" :src="userHeadPhoto">
              <img class="avatorImg" v-else-if="!userHeadPhoto" src="../assets/image/user/avator.png">
            </div>
            <span @click="linkTo('Flower','')">
              {{userName}},{{Hello}}<br/>
              <span class="vipLv">{{vipLv}} <img src="../assets/bottom.png"></span>
            </span>
            <!-- <div class="userIcon"></div> -->
            <div id="userInfo" class="userInfo" :data-act="0" @mouseenter="userHidd" @mouseleave="userNone" style="height: 0">
              <p><span class="mouse" @click="changeClick()">退出</span></p>
              <div class="userCount" v-if="isVip == 1">
                <img v-if="userHeadPhoto&&userHeadPhoto != 'null'" :src="userHeadPhoto">
                <img v-else-if="!userHeadPhoto" src="../assets/image/user/avator.png">
                <div>
                  {{userName}}<img src="../assets/VIP.png"><br/>
                  <span>
                    {{expirationTime}}到期 <span class="mouse" @click="vipf(1)">立即续费</span>
                  </span>
                </div>
              </div>
              <div class="userCount" v-else-if="isVip == -1">
                <img v-if="userHeadPhoto&&userHeadPhoto != 'null'" :src="userHeadPhoto">
                <img v-else-if="!userHeadPhoto" src="../assets/image/user/avator.png">
                <div>
                  {{userName}}<br/>
                  <span>
                    您还未开通VIP<span @click="toVip" class="vipOn mouse">立即开通</span>
                  </span>
                </div>
              </div>
              <div class="userItem">
                <div class="mouse" @click="linkTo(item.link,item.name)" v-for="(item,index) in navList" :key="index">
                  <img :src="item.url"><p>{{item.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="land == -1" class="rightUser langOut">
          <img class="avatorImg" src="../assets/userIcon.png" alt />
          <div class="avatorNone avatorNav">
            <span @click="toLogin">登录</span>/<span @click="toLogin">注册</span>
          </div>
        </div>
        <!-- <div class="down" @mouseleave="upDown" @mouseenter="toDown">
          <img class="downImg" src="../assets/image/cut/more.png" alt />
          <ul @mouseleave="leaveLink" class="downList" v-if="showList">
            <li v-for="(item,index) in navList" :key="index" @click="toLink(index)">{{item}}</li>
          </ul>
          <img class="image" v-if="showList" src="../assets/image/cut/tangle.png" alt />
          <div class="custom" v-if="showService">
            <div>客服热线：{{number}}</div>
          </div>
        </div> -->
      </div>
      <div class="model" v-if="showDebunk">
        <div class="debunkBox">
          <span @click="delDebunk" class="delBox"></span>
          <img class="debunkimg" src="../assets/image/debunk.png" alt />
          <div class="debunk">
            <p>我们珍视您的每一次反馈</p>
            <p>请准确描述您遇到的问题或建议，我们将努力改进</p>
            <form action>
              <label class="round" for>
                <div v-for="(item,index) in debunkArr" :key="index">
                  <input
                    type="radio"
                    class="radioBox"
                    name="select"
                    @click="changeInput(index)"
                    :checked="item.isCheck"
                  />
                  <div class="backImg"></div>
                  <span>{{item.name}}</span>
                </div>
              </label>
              <label for>
                <textarea v-model="textValue" class="advice" placeholder="请留下您宝贵的意见或建议，我们将努力改进"></textarea>
              </label>
              <label for class="upBox">
                <div class="addBox" v-if="!showPicture">
                  <input class="file" accept="image/*" multiple type="file" @change="add" />
                  <img class="addPic" src="../assets/image/user/up.png" alt />
                  <span>上传图片</span>
                </div>
                <div class="picBox" v-if="showPicture">
                  <img class="picture" :src="localUrl" alt />
                  <span @click="del" class="del"></span>
                </div>
              </label>
              <label for>
                <button class="btn" @click="toSubmit">提交</button>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div class="aboutUs" v-if="showAbout">
        <div class="aboutBox">
          <img src="../assets/image/login/close.png" class="aboutDel" @click="aboutDel" />
          <h3>关于我们</h3>
          <p v-for="(item,index) in aboutDescript" :key="index">{{item}}</p>
          <ul>
            <li v-for="(item,index) in aboutArr" :key="index">{{item.name}}{{item.descript}}</li>
          </ul>
        </div>
      </div>
      <div v-if="showPassword" class="passwordModel">
        <div v-if="showFirst" class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>修改密码</h5>
          <label for>
            <span class="passSpan">手机号码:</span>
            <input :value="phone" type="text" readonly />
          </label>
          <label for>
            <span class="passSpan">验证码:</span>
            <input v-model="code" maxlength="4" type="text" placeholder="请输入验证码" />
            <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
            <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
          </label>
          <button @click="passNext" class="passBtn">下一步</button>
        </div>
        <div v-if="showSecond" class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>修改密码</h5>
          <label for>
            <span class="passSpan">输入新密码:</span>
            <input v-model="password" type="password" placeholder="请输入新密码" />
          </label>
          <label for>
            <span class="passSpan">确认密码:</span>
            <input v-model="surePassword" type="password" placeholder="请再次输入密码" />
          </label>
          <button @click="passSuccess" class="passBtn">完成</button>
        </div>
      </div>
      <div v-if="showBind" class="passwordModel">
        <div class="passwordBox">
          <img @click="passClose" class="passClose" src="../assets/image/login/close.png" alt />
          <h5>绑定手机号码</h5>
          <label for>
            <span class="passSpan">手机号码:</span>
            <input placeholder="输入手机号" v-model="myphone" maxlength="11" type="text" />
          </label>
          <label for>
            <span class="passSpan">验证码:</span>
            <input v-model="mycode" maxlength="4" type="text" placeholder="请输入验证码" />
            <span @click="getCode" v-if="showCode" class="codeNumber">{{codeNumber}}</span>
            <span v-if="!showCode" class="codeNumber">{{codeNumber}}</span>
          </label>
          <button @click="bindPhone" class="passBtn">完成</button>
        </div>
      </div>
      <Jump v-if="showJump" :title="err"></Jump>
    </div>
    <div class="model"  v-if="vip==1">
      <div>
        <div class="zhifu">
          <div style="position:relative">
            <div class="boxTitle">会员类别</div>
            <span class="x" @click="closeBox"><img src="../assets/image/user/vip-close.png"/></span>
            <div class="typeImgArea">
              <div class="vip1"  @click="vipxzf(1)" :class="vipxz==1?'vipxz':''">
                <div class="vipa">企业VIP</div>
                <div class="vipb">12个月</div>
                <div class="vipc" :style="{background:vipxz==1?'#FB6413':'#fff',color:vipxz==1?'#fff':'#FB6413'}">￥3499.00</div>
              </div>
              <div class="vip3" @click="vipxzf(2)" :class="vipxz==2?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">12个月</div>
                <div class="vipc" :style="{background:vipxz==2?'#FB6413':'#fff',color:vipxz==2?'#fff':'#FB6413'}">￥1499.00</div>
              </div>
              <div class="vip5" @click="vipxzf(3)" :class="vipxz==3?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">3个月</div>
                <div class="vipc" :style="{background:vipxz==3?'#FB6413':'#fff',color:vipxz==3?'#fff':'#FB6413'}">￥599.00</div>
              </div>
              <div class="vip6" @click="vipxzf(4)" :class="vipxz==4?'vipxz':''">
                <div class="vipa">个人VIP</div>
                <div class="vipb">1个月</div>
                <div class="vipc" :style="{background:vipxz==4?'#FB6413':'#fff',color:vipxz==4?'#fff':'#FB6413'}">￥199.00</div>
                <!--<img class="cx" src="../../assets/image/user/cx.png" alt="">-->
              </div>
            </div>
            <div class="chongzhi">
              <div class="leftTitle">充值方式</div>
              <div :class="{chongzhi1:true,payChecked:payType=='5'}" @click="changePayType(5)">
                <img style="margin-top: 8px;" src="../assets/image/user/weixinzhifu.png" alt="">
                <span>微信</span>
              </div>
              <div :class="{chongzhi2:true,payChecked:payType=='3'}" @click="changePayType(3)">
                <img style="margin-top: 8px;" src="../assets/image/user/zhifubao.png" alt="">
                <span>支付宝</span>
              </div>
              <div :class="{chongzhi3:true,payChecked:payType=='4'}" @click="changePayType(4)">
                <img style="margin-top: 8px;" src="../assets/image/user/yue.png" alt="">
                <span>余额</span>
              </div>
            </div>
            <div class="whitebox" v-if="payType=='3' || payType=='5' || payType==''">
              <div class="whitebox1">请扫二维码完成支付</div>
              <img class="whitebox2" :src="qian" alt="">
            </div>
            <!--余额支付-->
            <div v-if="payType=='4'" class="whitebox">
              <div class="balance">可用余额：{{balance}}</div>
            </div>
            <button @click="surePay" class="whitebox3">{{payType=='4'?'点击续费':'已支付'}}</button>
          </div>
        </div>
      </div>
    </div>
    <InfoBox  v-if="showInfo==1 || showInfo==0" :code="showInfo" :errMsg="errMsg" :succMsg="succMsg"></InfoBox>
  </div>
</template>
<script>
let date = new Date();
import Jump from "../components/Jump";
import Scroll from "../assets/js/scroll.js";
import InfoBox from '@/components/common/InfoBox';
export default {
  name: "Nav",
  components: {
    Jump,
    InfoBox
  },
  props: {
    tabIndex: Number,
    headPicture: {
      type: String,
      default: ""
    },
    path: String
  },
  data() {
    return {
      showJump: false,
      err: "",
      // 导航栏内容
      arr: [
        { name: "AI分色", show: false, link: "/Paging" },
        { name: "花型设计", show: false, link: "/Flowerdesign" },
        { name: "AI配色", show: false, link: "/Matching" },
        { name: "AI设计", show: false, link: "/Ai" },
        { name: "花型商城", show: false, link: "/Shopping" },
        { name: "3D展示", show: false, link: "/Threed" },
      ],
      arrNow:[
        { name:'设计师招募',show:false,link:'maker'},
        { name:'PC客户端',show:false,link:''},
        { name: "智能抠图", show: false, link: "Cut" },
        { name: "新手教程", show: false, link: "New" },
        {name: '版权信息', show: false ,link: 'Banquan'}
      ],
      // ,{name: "个人中心",show: false,link: "/User"}
      // 控制导航栏颜色变化
      showBack: [],
      // 存储用户信息
      user: {},
      // 右侧下拉列表内容
      navList: [
        {name:'个人中心',url:("https://youchai2019.oss-cn-hangzhou.aliyuncs.com/201910/812f834f-8308-4dd3-b21e-b0e3ad44f01b.png"),link:'Flower'},
        {name:'我的工作室',url:require('../assets/studio.png'),link:''},
        {name:'我的钱包',url:('https://youchai2019.oss-cn-hangzhou.aliyuncs.com/201910/c79b766a-3c3a-441b-95a6-8b2056fe088a.png'),link:''},
        {name:'我的花型',url:require('../assets/flower.png'),link:'Flower'}
      ],
      // 修改密码退出登陆等按钮
      showChange: false,
      // 控制个人中心等内容显示
      showList: false,
      // 客服内容
      showService: false,
      phone: localStorage.getItem("phone"),
      // vip图片路径
      vipImg: "",
      showDebunk: false,
      // 关于我们弹窗相关
      showAbout: false,
      aboutDescript: [
        "浙江有柴科技有限公司是一家致力于纺织服装花型智能设计的互联网企业。公司依托云计算、大数据、人工智能等创新技术，通过产业互联网模式对传统产业进行赋能，实现传统行业效率的再度提升。",
        "未来，有柴科技将在专业柔性织物的花型智能设计上不断探索创新，为客户提供更好的服务。",
        "织道，让设计变得更简单，争做花型设计行业的先驱者。"
      ],
      aboutArr: [
        { name: "公司地址：", descript: "绍兴市柯桥区中银国际大厦17楼1703室" },
        { name: "官方网址：", descript: "http://www.youchaikj.com/" },
        { name: "联系我们：", descript: "0570-89985016/13429536658" }
      ],
      number: "0570-89985016",
      // 选择语言
      langName: "EN",
      lang: false,
      showLang: false,
      langList: [
        { name: "中文", show: true },
        { name: "English", show: false }
      ],
      // 反馈
      textValue: "",
      url: "",
      // 选择问题
      debunkArr: [
        { name: "使用建议", isCheck: false },
        { name: "故障错误", isCheck: false },
        { name: "内容缺漏", isCheck: false },
        { name: "其它", isCheck: false }
      ],
      localUrl: "",
      showPicture: false,
      showPassword: false,
      showFirst: false,
      showSecond: false,
      codeNumber: "验证码",
      clock: null,
      showCode: true,
      code: "",
      password: "",
      surePassword: "",
      showQfc: false,
      showBind: false,
      myphone: "",
      mycode: "",
      // vip状态
      isVip: 1,
      vipLv:'',
      // 显示用户购物车内订单数量
      orderNum:0,
      land: -1,
      Hello:'',
      userName:'',
      userHeadPhoto:'',
      expirationTime:'',
      // vip弹窗
      vip: 0,
      vipxz:'',
      fangshi:'',
      qian:'',
      payType:'',
      order_code:'',
      qrImgSrc:'../../assets/image/user/scanning.png',
      balance:'',
      qian:'',
      // 二维码图片
      codeSrc: "",
      codeNumber: "",
      showQfc: false,
      // 提示
      tig: "",
      showTig: false,
      //支付方式，''未选，5微信，3支付宝
      payType:'',
      balance:'',
      // 存储哪种类型的会员
      id: "",
      price: "",
      // 会员信息
      enterprise: [],
      vipArr: [],
      // 个人信息
      message: {},
      showInfo: -1,
      //是否显示提示框-1不显示，0:显示成功，1：显示警告
      showInfo:-1,
      errMsg:'',
      succMsg:'',
    };
  },
  methods: {
    // 登录
    toLogin(){
      this.$router.push({
        name:'Login'
      })
    },
    GetCurrentTime(flag) {
      var currentTime = "";
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = parseInt(myDate.getMonth().toString()) + 1; //month是从0开始计数的，因此要 + 1
          if (month < 10) {
              month = "0" + month.toString();
          }
      var date = myDate.getDate();
      if (date < 10) {
              date = "0" + date.toString();
          }
      var hour = myDate.getHours();
      if (hour < 10) {
              hour = "0" + hour.toString();
          }
      var minute = myDate.getMinutes();
      if (minute < 10) {
              minute = "0" + minute.toString();
          }
      var second = myDate.getSeconds();
      if (second < 10) {
              second = "0" + second.toString();
          }
      if(flag == "0")
          {
              currentTime = year.toString() + month.toString() + date.toString() + hour.toString() + minute.toString() + second.toString(); //返回时间的数字组合
          }
      else if(flag == "1")
          {
              currentTime = year.toString() + "/" + month.toString() + "/" + date.toString() + " " + hour.toString() + ":" + minute.toString() + ":" + second.toString(); //以时间格式返回
          }
      return currentTime;
    },
    // 绑定手机号
    bindPhone(e) {
      let self = this;
      e.preventDefault();
      let formData = new FormData();
      if (this.myphone == "" || this.mycode == "") {
        this.showJump = true;
        this.err = "输入项不能为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (!/^1[3456789]\d{9}$/.test(this.myphone)) {
        this.showJump = true;
        this.err = "手机号格式不正确";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.myphone);
        formData.append("code", this.mycode);
        let obj = {
          url: this.all.baseUrl + "/appuser/phoneBind",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "绑定成功";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showBind = false;
              localStorage.setItem("phone", this.myphone);
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "您的账户已在其它地方登陆";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    // 点击语言
    langChange(index) {
      this.langList.map(function(item) {
        item.show = false;
      });
      this.langList[index].show = true;
      this.lang = false;
      if (index == 0) {
        localStorage.removeItem("English");
        this.langName = "中文";
      } else if (index == 1) {
        localStorage.setItem("English", true);
        this.langName = "EN";
        this.$emit("showEnglish", this.path);
      }
    },
    toUser() {
      this.$router.push({
        path: "/User"
      });
    },
    // 密码关闭
    passClose() {
      this.showBind = false;
      this.showPassword = false;
      this.showFirst = false;
      this.showSecond = false;
      window.clearInterval(this.clock);
      this.showCode = true;
      this.codeNumber = "验证码";
    },
    passNext(e) {
      e.preventDefault();
      let self = this;
      let formData = new FormData();
      if (this.code == "") {
        this.showJump = true;
        this.err = "验证码不能为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.phone);
        formData.append("code", this.code);
        let obj = {
          url: this.all.baseUrl + "/userverify/check",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showFirst = false;
            this.showSecond = true;
            this.showCode = true;
            this.codeNumber = "验证码";
            window.clearInterval(this.clock);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "您的账户已在其它地方登陆";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    // 获取验证码
    getCode() {
      let self = this;
      let formData = new FormData();
      if (this.showQfc) {
        formData.append("phone", this.myphone);
      } else {
        formData.append("phone", this.phone);
      }
      let obj = {
        url: this.all.baseUrl + "/userverify/send",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.showCode = false;
          this.codeNumber = 59 + "秒";
          this.clock = setInterval(function() {
            if (parseInt(self.codeNumber) == 0) {
              clearInterval(self.clock);
              self.showCode = true;
              self.codeNumber = "验证码";
            } else {
              self.codeNumber = parseInt(self.codeNumber) - 1 + "秒";
            }
          }, 1000);
        } else if (res.data.status == -95) {
          this.showJump = true;
          this.err = "您的账户已在其它地方登陆";
          localStorage.clear();
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            self.$router.push({
              path: "/Login"
            });
          }, 1500);
        } else {
          this.showJump = true;
          this.err = res.data.msg;
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
          }, 1500);
        }
      });
    },
    passSuccess(e) {
      let self = this;
      e.preventDefault();
      let formData = new FormData();
      if (this.password == "" || this.surePassword == "") {
        this.showJump = true;
        this.err = "输入项不能为空";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else if (this.password != this.surePassword) {
        this.showJump = true;
        this.err = "两次密码输入不一致";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        formData.append("phone", this.phone);
        formData.append("code", this.code);
        formData.append("password", this.password);
        let obj = {
          url: this.all.baseUrl + "/appuser/resetPassByCode",
          formdata: formData
        };
        this.getData(obj).then(res => {
          if (res.data.status == 0) {
            this.showJump = true;
            this.err = "修改成功";
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.showPassword = false;
              self.showFirst = false;
              self.showSecond = false;
              localStorage.setItem("password", this.password);
            }, 1500);
          } else if (res.data.status == -95) {
            this.showJump = true;
            this.err = "您的账户已在其它地方登陆";
            localStorage.clear();
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
              self.$router.push({
                path: "/Login"
              });
            }, 1500);
          } else {
            this.showJump = true;
            this.err = res.data.msg;
            setTimeout(function() {
              self.showJump = false;
              self.err = "";
            }, 1500);
          }
        });
      }
    },
    // 切换语言
    langClick() {
      // this.lang = !this.lang;
      // this.langList.map(function(item){
      //     item.show = false;
      // });
      // this.langList[index].show = true;
      // this.lang = false;
      if (this.langName == "EN") {
        localStorage.setItem("English", true);
        this.langName = "中文";
        this.$emit("showEnglish", this.path);
      } else if (this.langName == "中文") {
        localStorage.removeItem("English");
        this.langName = "EN";
      }
    },
    // 点击左上角返回首页
    toBack() {
      this.$router.push({
        path: "/Select"
      });
    },
    // 去开通会员或查看会员信息
    toVip() {
      this.$router.push({
        name: "Vip"
      });
    },
    toCar(){
      this.$router.push({
        name:'Car',
        params:{
          xuanzhong: 6
        }
      })
    },
    // 点击右侧nav按钮
    toDown() {
      this.showList = true;
      this.showService = false;
    },
    upDown() {
      this.showList = false;
    },
    leaveLink() {
      this.showService = false;
    },
    // 页面跳转，link---路由地址,name---特定页面，需自行写页面地址,优先使用link参数
    linkTo(link,name){
      if(link){
        this.$router.push({
          name: link
        });
      }else{
        if(name == '设计师招募'){
        }else if(name == 'PC客户端'){
          var aBox = document.createElement('a');
          aBox.target = '_blank';
          aBox.href = 'http://www.youchaikj.com/product.html';
          aBox.click();
        }else if(name == '我的工作室'){
          let formData = new FormData();
          let self = this;
          let obj = {
            url: this.all.baseUrl + "/new/studio/getStudioByUserId",
            formdata: formData
          };
          this.getData(obj).then(res => {
            if (res.data.result == null) {
              //企业工作室
              self.$router.push({
                path: "/studioshenqing",
                query: {}
              });
            } 
            else if(res.data.result.examine_state==0){
              self.$router.push({
                path: "/studioshenqing",
                query: {
                  shenhe:2
                }
              });
            }
            else if(res.data.result.examine_state==1){
              self.$router.push({
                path: "/studioshenqing",
                query: {
                  shenhe:3,
                  message2:res.data.result,
                }
              });
            }
            else {
              self.$router.push({
                name: "huaxing1"
              });
            }
          });
        }else if(name == '我的钱包'){
          this.$router.push({
            name:'Money',
            params:{
              xuanzhong:7
            }
          })
        }
      }
    },
    // 头像移入移出效果
    downChange() {
      let user = document.getElementById("userInfo");
      user.style.cssText = "height: 191px;";
    },
    topChange() {
      let user = document.getElementById("userInfo");
      let act = user.dataset.act;
      if(act == 0){
        user.style.cssText = "height: 0;";
      }
    },
    userHidd(){
      let user = document.getElementById("userInfo");
      if(user){
        user.dataset.act = 1;
        this.downChange();
      }
    },
    userNone(){
      let user = document.getElementById("userInfo");
      if(user){
        user.dataset.act = 0;
        this.topChange();
      }
    },
    // 点击修改密码以及退出登陆
    changeClick() {
        localStorage.clear();
        localStorage.setItem('userId',0);
        // _czc.push(["_deleteCustomVar", "用户来源"]);
        this.$router.push({
          path: "/Login"
        });
      this.$forceUpdate();
    },
    // 点击最右侧导航的标志
    toLink(index) {
      let self = this;
      switch (index) {
        // 切换频道未开放
        case 0:
          this.$router.push({
            path: "/Select"
          });
          break;
        // 反馈页面
        case 1:
          this.showDebunk = true;
          Scroll.stop();
          break;
        case 2:
          this.showService = true;
          break;
        // 关于我们弹窗
        case 3:
          this.showAbout = true;
          break;
      }
    },
    auto() {
      // 改变颜色
      this.showBack = [];
      for (var i = 0; i < this.arr.length; i++) {
        this.showBack.push(false);
      }
      if(this.user){
        this.userName = localStorage.getItem("nickname");
        this.userHeadPhoto = localStorage.getItem("headPhoto");
        let time1 = Scroll.changeDateWay(Number(localStorage.getItem("expirationTime")));
        let time2 = Scroll.changeDateWay(Number(localStorage.getItem("expirationTimePlus")));
        if(localStorage.getItem("expirationTime") < localStorage.getItem("expirationTimePlus")){
          this.expirationTime = time2;
        }else{
          this.expirationTime = time1;
        }
        this.$forceUpdate();
      }
      this.showBack[this.tabIndex] = true;
      let time = this.GetCurrentTime(1).substring(11,13);
      time = parseInt(time);
      if(time > 6&&time < 10){
        this.Hello = '早上好！'
      }else if(time > 10&&time < 14){
        this.Hello = "中午好！"
      }else if(time > 14&&time < 18){
        this.Hello = "下午好！"
      }else if(time > 18&&time < 24){
        this.Hello = "晚上好！"
      }else{
        this.Hello = "晚上好！"
      }
    },
    // 切换
    change(index) {
      if (index == 5) {
        let newJson = {
          type: 5
        };
        localStorage.setItem("threedNewjson", JSON.stringify(newJson));
      }
      this.arr.map(function(item) {
        item.show = false;
      });
      this.arr[index].show = true;
      this.$forceUpdate();
      this.$router.push({
        path: this.arr[index].link
      });
    },
    // 获取信息
    getMessage() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if(this.user){
        if (!this.user.headPhoto) {
          if(!this.user.head_photo){
            this.userHeadPhoto = this.user.head_photo;
          }else{
            this.userHeadPhoto = require('../assets/image/user/avator.png');
          }
        }
      }
      // 判断用户是否登录
      if(this.user){
        this.lang = 1;
        // 判断企业会员或者个人会员
        if (date.getTime() < parseInt(this.user.expirationTimePlus)) {
          this.vipImg = require("../assets/image/cut/vip.png");
          this.vipLv = '企业VIP会员';
          this.isVip = 1;
        } else if (date.getTime() < parseInt(this.user.expirationTime)) {
          this.vipImg = require("../assets/image/cut/vip1.png");
          this.vipLv = '个人VIP会员';
          this.isVip = 1;
        } else {
          this.isVip = -1;
          this.vipLv = '未开通VIP'
          this.vipImg = require("../assets/image/cut/vip2.png");
        }

      }else{
        this.lang = -1;
        this.$forceUpdate();
      }

      // if(this.user.expirationTime){
      //   this.user.expirationTime = Scroll.changeTime(localStorage.getItem("expirationTime"));
      // }else{
      //   this.user.expirationTime = Scroll.changeTime(this.user.expiration_time);
      // }
      // if(this.user.expirationTimePlus){
      //   this.user.expirationTimePlus = Scroll.changeTime(this.user.expirationTimePlus);
      // }else{
      //   this.user.expirationTimePlus = Scroll.changeTime(this.user.expiration_time_plus);
      // }
    },
    // 删除关于我们
    aboutDel() {
      this.showAbout = false;
    },
    // 提交反馈获取后台图片
    toSubmit(event) {
      event.stopPropagation();
      event.preventDefault();
      let self = this;
      // 判断文本框内是否有内容
      if (this.textValue == "") {
        this.showJump = true;
        Scroll.stop();
        this.err = "请描述具体一点";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
          Scroll.move();
        }, 2000);
      } else {
        let formData = new FormData();
        formData.append("file", this.url);
        let obj = {
          url: this.all.baseUrl + "/file/upload",
          formdata: formData
        };
        this.getData(obj).then(res => {
          this.func(res.data.result);
        });
      }
    },
    // 进行真正的反馈
    func(string) {
      let obj = new FormData();
      let temp;
      for (let i = 0; i < this.debunkArr.length; i++) {
        if (this.debunkArr[i].isCheck == true) {
          switch (i) {
            case 0:
              temp = 1;
              break;
            case 1:
              temp = 2;
              break;
            case 2:
              temp = 3;
              break;
            case 3:
              temp = 0;
              break;
          }
        } else {
          temp = 0;
        }
      }
      // 参数 token userId feedbackType反馈类型 content内容 picUrl图片路径 phone电话 name用户昵称 appType 1
      // 反馈类型：0其他，1使用建议，2故障错误，3内容漏缺
      obj.append("appType", 1);
      obj.append("picUrl", string);
      obj.append("content", this.textValue);
      obj.append("feedbackType", temp);
      obj.append("phone", localStorage.getItem("phone"));
      obj.append("name", localStorage.getItem("name"));
      let data = {
        url: this.all.baseUrl + "/feedBack/save",
        formdata: obj
      };
      this.getData(data).then(res => {
        // 反馈成功
        this.showJump = true;
        Scroll.stop();
        let self = this;
        if (res.data.status == 0) {
          this.err = "非常感谢您的反馈！";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        } else {
          this.err = "反馈失败！";
          setTimeout(function() {
            self.showJump = false;
            self.err = "";
            Scroll.move();
          }, 2000);
        }
      });
    },
    // 用来记录单选框checked值
    changeInput(index) {
      for (let i = 0; i < this.debunkArr.length; i++) {
        if (i == index) {
          this.debunkArr[i].isCheck = true;
        } else {
          this.debunkArr[i].isCheck = false;
        }
      }
    },
    delDebunk() {
      this.showDebunk = false;
      Scroll.move();
    },
    // 添加图片
    add(e) {
      let self = this;
      if (e.target.files.length > 1) {
        this.showJump = true;
        this.err = "不能上传多张图片";
        setTimeout(function() {
          self.showJump = false;
          self.err = "";
        }, 1500);
      } else {
        let files = e.target.files[0];
        this.url = files;
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          self.localUrl = this.result;
          self.showPicture = true;
        };
      }
    },
    // 删除图片
    del() {
      this.showPicture = false;
    },
    botHidd(){
      let bot= document.getElementById("bot");
      bot.style.cssText = "height: 220px;";
    },
    botNone(){
      let act = document.getElementById("act").dataset.act;
      let bot = document.getElementById("bot");
      if(act == 0){
        bot.style.cssText = "height: 0px;";
      }
    },
    actHidd(){
      let act = document.getElementById("act");
      act.dataset.act = 1;
      this.botHidd();
    },
    actNone(){
      let act = document.getElementById("act");
      act.dataset.act = 0;
      this.botNone();
    },
    // vip弹窗
    vipf(e){
        let self =this
        self.payType = 5
        self.vipxz = 1
        //请求接口
        let formData = new FormData();
        formData.append('payType',5);
        formData.append('vipType',1);
        let obj = {
            url: this.all.baseUrl + '/new/business/openVip',
            formdata: formData
        }
        self.getData(obj).then(res=>{
            if(res.data.status==0){
                self.qian = res.data.result.qrImgSrc;
                self.order_code = res.data.result.order_code;
                self.vip=e;
            }else if(res.data.status==-95){
                self.showJump = true;
                self.err = res.data.msg;
                Scroll.stop();
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    localStorage.clear();
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
    // 点击微信或者支付宝按钮
    showBuy(i) {
      this.type = i;
      let payType = "";
      if (i == "微信") {
        payType = 5;
      } else if (i == "支付宝") {
        payType = 3;
      }
      let formData = new FormData();
      formData.append("activityId", this.id);
      formData.append("typeOfActivity", 1);
      formData.append("payType", payType);
      formData.append("codeValue", this.codeNumber);
      formData.append("paymentAmount", this.price.toFixed(2));
      let obj = {
        url: this.all.baseUrl + "/appPurchaseTimeJyg/save",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          this.codeSrc = res.data.result.result.src;
          this.showGrab = false;
          this.showPay = true;
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    surePay(){
        let self = this;
        //如果是支付宝/微信支付
        if (self.payType==3||self.payType==5) {
            let formData = new FormData();
            formData.append('orderCode',self.order_code);
            let obj = {
                url: this.all.baseUrl + '/new/userPurse/getUserPurseDetailByOrderCode',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.showInfo = 0;
                    self.succMsg=res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg='';
                        //关闭支付窗口
                        self.vip=-1;
                        self.vipType='';
                        self.vipxz = 0;
                        //重新获取用户信息并修改缓存中的用户信息
                        //刷新页面
                        self.getMessage();
                        self.getBalance();
                        // self.$router.go(0)
                        Scroll.move();
                    },1500);
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
                    self.showInfo = 1;
                    self.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        } else if(self.payType==4){
            //如果是余额支付
            if(self.vipxz == ''){
                self.errMsg = '请先选择vip类型';
                self.showInfo = 1;
                Scroll.stop();
                setTimeout(function(){
                    self.showInfo = -1;
                    self.errMsg = '';
                    Scroll.move();
                },1000);
                return;
            }
            let formData = new FormData();
            formData.append('payType',self.payType);
            formData.append('vipType',self.vipxz);
            let obj = {
                url: this.all.baseUrl + '/new/business/openVip',
                formdata: formData
            }
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.showInfo = 0;
                    self.succMsg=res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.succMsg ='';
                        //关闭支付窗口
                        self.vip=-1;
                        self.vipType='';
                        self.vipxz = 0;
                        //刷新页面
                        self.getMessage();
                        self.getBalance();
                        self.$router.go(0)
                        Scroll.move();
                    },1500);
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
                    },1500);
                }else{
                    self.showInfo = 1;
                    self.errMsg = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showInfo = -1;
                        self.errMsg = '';
                        Scroll.move();
                    },1500);
                }
            });
        }

    },
    // 如果被登陆了
    hasLogin() {
      this.showTig = true;
      this.tig = "您的账号已在其它地方登陆";
      Scroll.stop();
      localStorage.clear();
      var self = this;
      setTimeout(function() {
        self.showTig = false;
        self.tig = "";
        Scroll.move();
        self.$router.push({
          path: "/Login"
        });
      }, 2000);
    },
    // 出错
    hasError(res) {
      this.showTig = true;
      this.tig = res.data.msg;
      var self = this;
      Scroll.stop();
      setTimeout(function() {
        self.showTig = false;
        Scroll.move();
        self.tig = "";
      }, 2000);
    },
    // 点击我已支付
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
            this.showTig = true;
            this.tig = "充值成功";
            localStorage.setItem("user", res.data.result);
            this.getMessage()
            setTimeout(function() {
              self.showTig = false;
              self.tig = "";
              self.showModel = false;
              self.showPay = false;
              self.setData();
            }, 2000);
          } else {
            this.showTig = true;
            this.tig = "您还未支付";
            setTimeout(function() {
              self.showTig = false;
              self.tig = "";
              self.showModel = false;
              self.showPay = false;
              Scroll.move();
            }, 2000);
          }
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 点击右上角×
    delBind() {
      this.showModel = false;
      this.showGrab = false;
      Scroll.move();
    },
    delPay() {
      this.hasPay();
    },
    // 会员套餐接口请求
    getVip() {
      let formData = new FormData();
      let obj = {
        url: this.all.baseUrl + "/app3dTheMemberPriceJyg/list",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if (res.data.status == 0) {
          let output = res.data.result;
          for (var i = 0; i < output.length; i++) {
            output[i].price = output[i].currentPrice;
            output[i].originalCost =
              this.changePrice(output[i].originalCost) + ".00";
            output[i].currentPrice =
              this.changePrice(output[i].currentPrice) + ".00";
            if (output[i].memberType == 2) {
              this.enterprise.push(output[i]);
            } else {
              this.vipArr.push(output[i]);
            }
          }
          this.enterprise = [this.enterprise[1], this.enterprise[0]];
          this.vipArr = [this.vipArr[1], this.vipArr[2], this.vipArr[3], this.vipArr[0]];
          // this.arr.unshift(output[output.length-1])
        } else if (res.data.status == -95) {
          this.hasLogin();
        } else {
          this.hasError(res);
        }
      });
    },
    // 递归实现价格转化
    changePrice(str) {
      let res = str.toString();
      if (res.length <= 3) {
        return res;
      } else {
        return (
          this.changePrice(res.substr(0, res.length - 3)) +
          "," +
          res.substr(res.length - 3, res.length)
        );
      }
    },
    setData() {
      // 获取信息
      if(localStorage.getItem("user")){
        this.message = JSON.parse(localStorage.getItem("user"));
      }
    },
    getUserMessage() {
      let self = this;
      this.showLoading = true;
      Scroll.stop();
      let formData = new FormData();
      let obj = {};
      obj.url = this.all.baseUrl + '/new/users/getUserById';
      obj.formdata = formData;
      this.getData(obj).then(res=>{
          self.showLoading = false;
          Scroll.move();
          let result;
          if(res.data.status==0){
              result = res.data.result;
              localStorage.removeItem('expirationTime');
              localStorage.removeItem('expirationTimePlus');
              localStorage.setItem('expirationTime',result.userInfo.expiration_time);
              localStorage.setItem('expirationTimePlus',result.userInfo.expiration_time_plus);
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
    // 开通vip
    Vipon(type){
      if(type != 0){
        this.vipxz = type;
        this.changePayType(5);
      }
      this.vip = 1;
      // 1 --- 企业会员包年
      // 2 --- 个人会员包年
      // 3 --- 个人会员包季
      // 4 --- 个人会员包月
    },
    vipxzf(e){
      this.vipxz=e;
      this.changePayType(5);
    },
    closeBox(){
        this.vip=-1;
        //this.vipType='';
        this.vipxz = 0;
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
                self.flag = 0;
                self.isClick = false;
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    //请求完成
                    self.balance = res.data.result.money;
                },1500);
                // self.alertShow();
            }else if(res.data.status==-95){
                self.showJump = true;
                self.err = '您的账号已在其它地方登陆';
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
    changePayType(payType){
        this.payType = payType;
        let self = this;
        if(self.vipxz == ''){
            self.errMsg = '请先选择vip类型';
            self.showInfo = 1;
            Scroll.stop();
            setTimeout(function(){
                self.showInfo = -1;
                self.errMsg = '';
                Scroll.move();
            },1000);
            return;
        }
        //请求接口
        let formData = new FormData();
        formData.append('payType',self.payType);
        formData.append('vipType',self.vipxz);
        let obj = {
            url: this.all.baseUrl + '/new/business/openVip',
            formdata: formData
        }
        //如果是支付宝/微信直接请求接口
        if (self.payType==3 || self.payType==5){
            self.getData(obj).then(res=>{
                if(res.data.status==0){
                    self.qian = res.data.result.qrImgSrc;
                    self.order_code = res.data.result.order_code;
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        localStorage.clear();
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
        }  else if(self.payType==4 && self.balance == ''){
            //请求接口
            this.getBalance();
        }
    },
  },
  mounted() {
    this.orderNum = localStorage.getItem('orderNum');
    if (localStorage.getItem("qfc")) {
      this.showQfc = true;
      this.aboutDescript = [
        "本款花型设计产品由浙江中国轻纺城网络有限公司和浙江有柴科技有限公司共同合作研发。",
        "浙江中国轻纺城网络有限公司是一家致力于纺织行业信息化、电子商务研究与产品开发的高科技企业，成立于2000年6月，由中国轻纺城集团股份有限公司、浙江大学等单位共同投资成立，现为上市公司浙江中国轻纺城集团股份有限公司旗下子公司。"
      ];
      this.aboutArr = [
        { name: "公司地址：", descript: "浙江省绍兴市柯桥区中纺大厦3楼" },
        {
          name: "官方网址：",
          descript:
            "全球纺织网https://www.tnc.com.cn/ 网上轻纺城https://www.qfc.cn/"
        },
        { name: "联系我们：", descript: "400-119-0123" },
        { name: "技术支持：", descript: "浙江有柴科技有限公司" }
      ];
      this.number = "400-119-0123";
      this.peopleList = ["绑定手机号", "退出登陆"];
    }
    if (localStorage.getItem("English")) {
      this.langName = "中文";
    } else {
      this.langName = "EN";
    }
    if(localStorage.getItem("user")){
      this.land = 1;
    }else{
      this.land = -1;
    }
    this.auto();
    this.getMessage();
  },
  watch: {
    headPicture(newValue, oldValue) {
      this.user.headPhoto = newValue;
      this.$forceUpdate();
    }
  },
  beforeDestroy() {
    window.clearInterval(this.clock);
  }
};
</script>
<style scoped>
.nav {
  width: 100%;
  height: 70px;
  background: #fff;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
  min-width: 1200px !important;
  box-shadow: 0 2px 30px 0 rgba(28,34,38,0.10);
}
.logoBox {
  float: left;
  height: 60px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-left: 56px;
}
.logoBox:hover{
  cursor: pointer;
}
.logoBox img {
  width: 79px;
  height: 39px;
}
.logoBox img.qfc {
  width: 100px;
  margin-left: 10px;
  padding-top: 5px;
}
ul.navBox {
  float: left;
  height: 70px;
  display: flex;
  align-items: center;
  box-align: center;
  margin-left: 20px;
}
ul.navBox li {
  float: left;
  width: 64px;
  box-sizing: border-box;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  position: relative;
  text-align: center;
  margin-right: 15px;
}
.navBox li:hover{
  color: #FAD100;
  /* font-weight: 600; */
}
ul.navBox li:last-child{
  width: 60px;
  height: 20px;
  background: url('../assets/icon.png') no-repeat center;
  position: relative;
  top: -4px;
}
.botIcon{
  height: 4px;
  background: #ffe135;
  border-radius: 6px;
  margin: 6px auto 3px;
  transition: all 0.5s;
}
ul#bot{
  width: 119px;
  background: #fff;
  position: absolute;
  top: 60px;
  left: 606px;
  overflow: hidden;
  border-radius: 6px;
  transition: all 0.5s;
}
ul#bot li{
  width: 100%;
  height:44px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
}
ul#bot li:hover{
  background: rgba(255,227,0,0.08);
}
.rightBox {
  float: right;
  height: 70px;
  display: flex;
  margin-right: 30px;
  align-items: center;
}
.vipBox {
  float: left;
}
.vipBox img {
  display: block;
  height: 50px;
  margin: 0 14px 0 0;
}
.cartBox{
  width: 36px;
  height: 36px;
  border: 1px solid #B8BCBF;
  border-radius: 50%;
  margin: 0 18px 0 0;
  background: url('../assets/Cart.png') no-repeat center;
}
.cartBox img{
  display: block;
  margin: 7px auto;
}
.cartBox div,.userIcon{
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 8px;
  position: relative;
  top: -4px;
  left: 24px;
  background: red;
  color: #fff;
  border-radius: 50%;
}
.avator {
  float: left;
  position: relative;
  height: 36px;
  box-sizing: border-box;
  margin: 0 18px 0 0;
  cursor: pointer;
}
.avatorImg {
  width: 36px;
  height: 36px;
  background: #eee;
  border-radius: 50%;
}
.avator .userIcon{
  width: 10px;
  height: 10px;
  top: -58px;
  left: 25px;
}
.userInfo{
  width: 337px;
  position: absolute;
  top: 52px;
  left: -130px;
  background: #FCF8F2;
  border-radius: 6px;
  transition: all 0.5s;
  overflow: hidden;
}
.userInfo>div{
  display: flex;
}
.userInfo>p{
  height: 20px;
  font-size: 12px;
  text-align: right;
  line-height: 20px;
  position: relative;
  top: 5px;
  padding-right: 15px;
}
.userCount>p{
  background: #FCF8F2;
}
.userCount{
  height: 82px;
}
.userCount>img{
  width: 54px;
  height: 54px;
  margin: auto;
  display: block;
  border-radius: 50%;
  margin-left: 25px;
  margin-right: 23px;
}
.userCount>div{
  text-align: left;
  margin: auto 0;
  font-size: 16px;
  color: #000;
}
.userCount span{
  font-size: 12px;
}
.userCount span span{
  display: inline-block;
  width: 67px;
  height: 22px;
  background: #333;
  border-radius: 11px;
  text-align: center;
  line-height: 22px;
  color: #DFC598;
}
.userCount .vipOn{
  background: #D1B16E;
  color: #fff;
  margin-left: 6px;
}
.userItem{
  display: flex;
  height: 90px;
  justify-content: space-evenly;
  align-items: center;
  background: #fff;
}
.userItem>div img{
  width: 44px;
  height: 44px;
}
.userItem>div p{
  font-size: 12px;
}
.avator>span{
  position: relative;
  top: -20px;
  left: 16px;
  font-size: 16px;
}
.avator>span>span{
  display:inline-block;
  width: 96px;
  height: 16px;
  border-radius: 8px;
  background: #FFF9C8;
  font-size: 12px;
  color: #FF8300;
  line-height:16px;
}
.avator>span>span img{
  position: relative;
  top: -3px;
  left: 2px;
}
.down {
  float: left;
  height: 60px;
  margin-right: 73px;
  position: relative;
}
.downImg {
  display: block;
  width: 20px;
  padding: 28px 0 0 0;
}
.down .image {
  position: absolute;
  z-index: 4445;
  top: 60px;
  left: -1.5rem;
  width: 6.625rem;
  height: 8.75rem;
}
.downList {
  position: absolute;
  z-index: 4446;
  left: -1.5rem;
  top: 60px;
}
.downList li {
  width: 6.625rem;
  height: 2.1875rem;
  line-height: 2.1875rem;
  font-size: 0.875rem;
  color: rgba(51, 51, 51, 0.8);
  cursor: default;
}
.downList li:hover {
  color: #333;
}
.aboutUs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(187, 187, 187, 0.6);
  z-index: 9999;
}
.aboutBox {
  width: 65.25rem;
  height: 39.875rem;
  position: absolute;
  top: calc(50vh - 19.9375rem);
  left: calc(50% - 32.625rem);
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0 2.9375rem;
  box-sizing: border-box;
}
.aboutDel {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: default;
  font-size: 1.875rem;
  width: 1.625rem;
  height: 1.625rem;
}
.aboutBox h3 {
  padding-top: 1.8125rem;
  font-size: 1.875rem;
  text-align: center;
  color: #333;
  margin-bottom: 2.1875rem;
  font-weight: normal;
}
.aboutBox p {
  text-align: left;
  font-size: 1rem;
  color: #333;
  margin-bottom: 2.1875rem;
}
.aboutBox ul {
  margin-top: 0.25rem;
  text-align: left;
  font-size: 1rem;
  color: #333;
}
.custom {
  position: absolute;
  width: 22.5rem;
  height: 10rem;
  border-radius: 0.625rem;
  background: #fff;
  z-index: 999;
  border: 1px solid #b9b9b9;
  right: 4rem;
  top: 80px;
  color: #2c2e30;
  font-weight: normal;
  font-size: 1.25rem;
  box-sizing: border-box;
  line-height: 10rem;
}
.model {
  position: fixed;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.debunkBox {
  position: absolute;
  display: flex;
  background: #fff;
  width: 62.5rem;
  height: 42.5rem;
  box-sizing: border-box;
  padding-top: 2.5rem;
  left: calc(50% - 31.25rem);
  top: 3.125rem;
  border-radius: 0.625rem;
}
.debunkimg {
  width: 27.0625rem;
  height: 21.5625rem;
  display: block;
  margin-left: 2.0625rem;
  margin-top: 7.5625rem;
}
.debunk {
  margin-left: 3.4375rem;
  text-align: left;
  padding-top: 4.875rem;
  width: 25rem;
}
.debunk p {
  color: #333;
  font-size: 1.125rem;
}
.debunk form {
  display: block;
  margin-top: 0.625rem;
}
form label {
  display: block;
}
label.round {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.round div {
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.875rem;
}
.round input {
  display: block;
  position: absolute;
  left: 0;
  top: calc(50% - 0.5625rem);
  width: 1.125rem;
  height: 1.125rem;
  opacity: 0;
  z-index: 999;
}
.backImg {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  overflow: hidden;
  background: url("../assets/image/login/noselect.png") no-repeat center center;
  background-size: 100%;
  margin-right: 0.3125rem;
}
.round input:checked + .backImg {
  background: url("../assets/image/login/hasselect.png") no-repeat center center;
  background-size: 100%;
}
.advice {
  display: block;
  width: 100%;
  height: 11.0625rem;
  margin-bottom: 0.625rem;
  box-sizing: border-box;
  padding: 0.625rem;
}
label.upBox {
  position: relative;
}
.addBox,
.picBox {
  position: relative;
  width: 4.375rem;
  height: 4.375rem;
  border: 1px solid #cacaca;
  color: #333;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 0.3125rem;
  justify-content: center;
}
.addBox input {
  display: block;
  width: 4.375rem;
  height: 4.375rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 222;
  opacity: 0;
}
.addPic {
  display: block;
  width: 1.5rem;
  margin-bottom: 0.3125rem;
}
label .btn {
  display: block;
  width: 7.375rem;
  height: 2.125rem;
  text-align: center;
  border: none;
  background: #133ffc;
  border-radius: 0.3125rem;
  line-height: 2.125rem;
  color: #fff;
  outline: none;
  margin-top: 1.25rem;
}
.picBox img {
  display: block;
  width: 4.375rem;
  height: 4.375rem;
}
.picBox .del {
  position: absolute;
  width: 0.875rem;
  height: 0.875rem;
  top: 0.25rem;
  right: 0.125rem;
  background: url("../assets/image/login/close.png") no-repeat center;
  background-size: 100%;
}
.delBox {
  position: absolute;
  background: url("../assets/image/login/close.png") no-repeat center;
  background-size: 100%;
  width: 1.5625rem;
  height: 1.5625rem;
  right: 1.25rem;
  top: 1.25rem;
}
.passwordModel {
  position: fixed;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
}
.passClose {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;
}
.passwordBox {
  position: absolute;
  background: #fff;
  z-index: 9999;
  width: 25rem;
  height: 17.5rem;
  left: calc(50% - 12.5rem);
  box-sizing: border-box;
  border-radius: 0.625rem;
  top: calc(50% - 8.725rem);
  padding: 1rem 1rem;
}
.passwordBox h5 {
  font-weight: normal;
  text-align: left;
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.875rem;
}
.passwordBox label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
}
.passSpan {
  font-size: 1rem;
  width: 6.25rem;
  text-align: left;
  color: #333;
  margin-right: 0.3125rem;
}
.passwordBox input {
  border: 1px solid #d8d8d8;
  border-radius: 0.5rem;
  box-sizing: border-box;
  outline: none;
  width: 12.5rem;
  height: 2.5rem;
  padding-left: 0.5rem;
}
.passBtn {
  width: 7.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  border: none;
  outline: none;
  background: #133ffc;
  color: #fff;
  position: absolute;
  left: calc(50% - 3.75rem);
  bottom: 1rem;
}
.codeNumber {
  position: absolute;
  color: #133ffc;
  right: 3rem;
  top: 0;
  font-size: 1rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
.avatorNav{
  color: #000 !important;
}
/* 首页导航栏样式 */
.navHome{
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
  min-width: 1200px;
  background:rgb(0, 0, 0);
  box-shadow: 0 2px 30px 0 rgba(28,34,38,0.10);
}
.navHome .logoBox{
  height: 34px;
}
.navHome>div:first-child{
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.leftBox{
  min-width: 700px;
  margin-left: 56px;
  height: 70px;
}
.navHomeBox{
  float: left;
  height: 60px;
  display: flex;
  align-items: center;
  box-align: center;
  position: relative;
  top: 3px;
}
.navHomeBox li{
  width: 64px;
  height: 100%;
  font-size: 16px;
  color: #AAAAAA;
  letter-spacing: 0;
  text-align: center;
  line-height: 60px;
  margin-right: 15px;
  cursor: pointer;
}
.navHomeBox li:hover{
  color: #fff;
}
.navHomeBox li:last-child{
  width: 30px;
  background: url('../assets/icon2.png') no-repeat center;
  background-size: 100%;
  position: relative;
}
.navHomeBox+ul#bot{
  left: 593px;
}
.leftBox .logoBox{
  margin:0;
  margin-top: 11px;
  margin-right: 30px;
}
.leftBox .logoBox img{
  width: 76px;
  height: 39px;
}
.navHome .rightBox .cartBox{
  background: url('../assets/cart2.png') no-repeat center;
  background-size: 100%;
}
.navHome .rightBox .cartBox div{
  top: -4px;
}
.navHome .rightBox .avator>span{
  font-size: 16px;
  color: #FFFFFF;
}
.navHome .rightBox .userInfo{
  left: -140px;
}
.userImg{
  width: 36px;
  height: 36px;
  display: inline-block;
}
/* 登录态切换 */
.rightUser{
  width: 270px;
  display: flex;
  align-items: center;
}
.langOut div{
  color: #fff;
  font-size: 16px;
}
.langOut span{
  display: inline-block;
  margin-left: 16px;
  font-weight: bold;
}
.langOut span:first-child{
  margin-right: 6px;
}
.langOut span:last-child{
  margin-left: 6px;
}
.avatorNone span:hover,.mouse:hover{
  cursor: pointer;
}
.logoImg{
  cursor: pointer;
}
/* 会员支付 */
.x{
  position: absolute;
  top: -2px;
  right: 10px;
  font-size: 20px;
}
.x img{
  width: 30px;
  height: 30px;
  position: relative;
  top: -5px;
  left: 50px;
}
.whitebox{
  width: 358px;
  height: 142px;
  background: #FFFFFF;
  margin: 7px auto 0;
  border-radius: 3px;
}
.whitebox1{
text-align: center
}
.whitebox3{
  background: #FB6413;
  border-radius: 4px;
  width: 140px;
  height: 42px;
  color: white;
  border: 0;
  margin-top: 5px;
  font-size: 14px;
}
.wxradio{
  width: 15px;
  height: 15px;
  border-radius: 5px;
  border: 1px solid;
  position: absolute;
  left: 3px;
    top: 11px;
  padding: 0px;
}
.zfradio{
    width: 15px;
  height: 15px;
  border-radius: 5px;
  border: 1px solid;
  position: absolute;
  left: 3px;
    top: 11px;
  padding: 0px;
}
.chongzhi{
  text-align: left;
  font-size: 12px;
  color: #242424;
  display: flex;
  margin-top: 21px;
  position: relative;
  left: 73px;
}
.leftTitle{
  height: 32px;
  line-height: 32px;
}
.chongzhi img{
  width: 13px;
  height: 13px;
  margin: 0 32px 0 8px !important;
  vertical-align: middle;
}
.payChecked{
  border: 1px solid #8E8E8E !important;
}
.chongzhi1,.chongzhi2,.chongzhi3{
  width: 97px;
  height: 32px;
  line-height: 32px;
  position: relative;
  left: 12px;
  background-color: white;
  border: 1px solid #fff;
}
.chongzhi2{
  left: 24px;
}
.chongzhi3{
  left: 36px;
}
.cx{
    position: absolute;
    left: 42px;
    top: -15px;
}
.zhifu{
  width: 517px;
  height: 412px;
  background: #EBEBEF;
  position: absolute;
  top: 30%;
  left: 35%;
  padding-top: 12px;
  border-radius: 3px;
  font-weight: bold;
}
.model>div{
  position: relative;
  height: 0;
  padding-top: 30%;
}
@media screen and (max-width:1200px){
    .zhifu{
      left: 30%;
    }
}
.typeImgArea{
  display: flex;
  text-align: center;
}
.vip1,.vip2,.vip3,.vip4,.vip5,.vip6{
  /*width: 565px;*/
  /*height: 424px;*/
  width: 82px;
  height: 108px;
  background-color: #f7f7f7;
  border-radius: 4px;
  position: relative;
  margin-right: 20px;
  box-shadow: 1px 1px 8px 0 rgba(126,126,129,0.31);
}
.vip1{
  margin-left: 73px;
}
.vipxz{
  background: #FB6413;
  color: white;
}
.vipa{
  text-align: center;
  height: 36px;
  line-height: 48px;
  width: 76px;
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
  width: 76px;
  font-size: 20px;
}
.vipc{
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  font-size: 14px;
  color: #FB6413;
}
.balance{
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #020202;
    letter-spacing: 0.29px;
    position: relative;
    top: 60px;
}
.boxTitle{
  font-size: 14px;
  text-align: left ;
  vertical-align: middle;
  font-family: SourceHanSansCN-Medium;
  font-size: 12px;
  color: #242424;
  margin-left: 57px;
  margin-bottom: 16px;
}
div.model {
  position: fixed;
  z-index: 9999;
  top: 0;
  height: 100vh;
  width: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.whitebox2{
  width: 98px;
  height: 98px;
  margin: 15px auto 0;
  border: none;
}
.openVip:hover,.vipOn>div>div:last-child{
  cursor: pointer;
}
</style>