<template>
    <!-- 版权 -->
    <div style="background-color:#eee;">
        <div class="page1">
            <img class="simg1" src="../../assets/image/banquan/logo.png" alt/>
        </div>
        <div class="page2">
            <div class="kuang">
                <div class="kuai1" @click="pageindexp(1)" v-if="pageindex!=1">版权登记</div>
                <div class="kuai1 xuanzhong" @click="pageindexp(1)" v-if="pageindex==1">版权登记</div>
                <div class="kuai2" @click="pageindexp(2)" v-if="pageindex!=2">维权通道</div>
                <div class="kuai2 xuanzhong" @click="pageindexp(2)" v-if="pageindex==2">维权通道</div>
                <div class="kuai3" @click="pageindexp(3)" v-if="pageindex!=3">免责声明</div>
                <div class="kuai3 xuanzhong" @click="pageindexp(3)" v-if="pageindex==3">免责声明</div>
                <div class="kuai4" @click="zhuye()">返回主页</div>
            </div>
        </div>
        <div class="p1" v-if="pageindex==1">
            <div class="meishu">
                <p class="meishu0">美术作品版权登记</p>
                <div class="meishu1">
                    <div class="yuan1">
                        <div class="yuan orange"></div>
                        <p style="margin-top:5px;width:70px;">上传资料</p>
                    </div>
                    <hr class="hr1 orange"/>
                    <div class="yuan1" style="position:absolute;top:0;left:345px;">
                        <div class="yuan"></div>
                        <p style="margin-top:5px;width:80px;">递交版权局</p>
                    </div>
                    <hr class="hr2" style/>
                    <div class="yuan1" style="position:absolute;top:0;left:695px;">
                        <div class="yuan"></div>
                        <p style="margin-top:5px;width:70px;">获得证书</p>
                    </div>
                    <!--<hr class="hr3" />-->
                </div>

            </div>
            <div class="meishu2">
                <div class="bq">
                    <div @click="fanweif(0)" :class="fanwei==0?'xuanzhong2':''" class="bq1">全国版权</div>
                    <div @click="fanweif(1)" :class="fanwei==1?'xuanzhong2':''" class="bq2">浙江省版权</div>
                </div>
                <div class="meishu3">
                    <div class="meishu31">
                        <!--<input @click="shuyuf(0)" type="radio" name="sex" value="male" checked />-->
                        <img @click="changeIsPersonal(0)" :src="shuyu==0?checkedImgUrl:uncheckImgUrl">个人
                        <p class="pclass1">{{time}}</p>
                    </div>
                    <div class="meishu32">
                        <!--<input @click="shuyuf(1)" type="radio" name="sex" value="female" /> -->
                        <img @click="changeIsPersonal(1)" :src="shuyu==1?checkedImgUrl:uncheckImgUrl">公司
                        <p class="pclass2">费用：{{money}}.00元</p>
                    </div>
                    <p class="pclass3">{{introduction}}</p>
                </div>
            </div>
            <div class="chuangkou">
                <div class="donghua">
                    <div class="page">
                        <div class="kuangy">上传文件</div>
                        <div class="upload">
                            <div class="img-container">
                                <img :src="img_url" width="224" height="104" alt/>
                            </div>
                            <input type="file" style="display:none" @change="getFile($event,0)" ref="file" id="file"/>
                            <label class="zhezhao" for="file">
                                <div :style="{opacity:img_url==''?'1':'0'}" class="zhezhao1">点击上传文件<br/>文件大小控制在5M以内</div>
                            </label>
                        </div>
                        <div class="kuangy" style="margin-top: 65px;">收件信息</div>
                        <div class="kuang kuangLeft">
                            收件地址
                            <input class="input1" type="text" v-model="receipt_address"/>
                        </div>
                        <div class="kuang kuangLeft">
                            收件电话
                            <input class="input1" type="text" v-model="receipt_phone"/>
                        </div>
                        <!-- <div class="kuangy">发票信息</div>
                        <div class="kuang">1.发票信息会根据您提供信息进行提取</div>
                        <div class="kuang">2.您签署完合同并且该合同下的案件全部已经支付后，发票信息会自动生成</div>-->
                    </div>
                    <div class="pageright">
                        <!--公司信息-->
                        <div v-if="shuyu==1" style="width:650px;height:240px;text-align: left">
                            <div class="kuangy">公司信息</div>
                            <div class="message1">
                                营业执照号
                                <input class="input2" type="text" v-model="business_license_num"/>
                            </div>
                            <div class="message2" style="left: 275px;">
                                创作城市
                                <input class="input2" type="text" v-model="create_city"/>
                            </div>
                            <div class="message3">
                                公司全称
                                <input class="input2" type="text" v-model="company_name"/>
                            </div>
                            <div class="kuang">
                                复印营业执照并盖章
                                <input type="file" @change="getFile($event,3)" id="file3"/>
                                <lable class="demo" @mouseover="showPicDemo" @mouseout="hiddenPicDemo">查看示例</lable>
                                <img class="demoImg" v-if="showDemo" src="../../assets/image/copyright/copyrightDemo.png"/>
                            </div>
                        </div>
                        <!--个人信息-->
                        <div v-if="shuyu==0" style="width:650px;height:240px;text-align: left">
                            <div class="kuangy">上传身份证</div>
                            <div class="clear"></div>
                            <div class="message2" style="left: 305px;top: -25px;">
                                身份证号
                                <input class="input2" type="text" v-model="id_card"/>
                            </div>
                            <div class="message3">
                                姓名
                                <input class="input2" type="text" v-model="user_name"/>
                            </div>
                            <div class="upload idCardLeft">
                                <div class="img-container">
                                    <img :src="id_card_front" width="224" height="104" alt/>
                                </div>
                                <input type="file" style="display:none" @change="getFiles($event,1)" ref="file" id="file1"/>
                                <label  class="zhezhao" for="file1">
                                    <div :style="{opacity:id_card_front==''?'1':'0'}" class="zhezhao2">上传身份证正面</div>
                                </label>
                            </div>
                            <div class="upload idCardRight">
                                <div class="img-container">
                                    <img :src="id_card_back" width="224" height="104" alt/>
                                </div>
                                <input type="file" style="display:none" @change="getFile($event,2)" ref="file2"  id="file2"/>
                                <label class="zhezhao" for="file2">
                                    <div :style="{opacity:id_card_back==''?'1':'0'}" class="zhezhao2">上传身份证反面</div>
                                </label>
                            </div>
                        </div>
                        <div style="width:650px;height:250px;">
                            <div class="kuangy">发票</div>
                            <div class="kuang kuangRight">
                                <span style="margin-right:20px">是否需要发票</span>
                                <img @click="changeNeedInvoice(0)" :src="need_invoice==0?checkedImgUrl:uncheckImgUrl">不需要发票
                                <img @click="changeNeedInvoice(1)" :src="need_invoice==1?checkedImgUrl:uncheckImgUrl">增值税发票
                                <img @click="changeNeedInvoice(2)" :src="need_invoice==2?checkedImgUrl:uncheckImgUrl">普通发票
                            </div>
                            <div class="kuang kuangRightBottom">
                                <span style="margin-right: 45px;">抬头类型</span>
                                <img @click="changeTaitou(1)" :src="title_type==1?checkedImgUrl:uncheckImgUrl">企业单位
                                <img @click="changeTaitou(0)" :src="title_type==0?checkedImgUrl:uncheckImgUrl">个人/非企业单位
                            </div>
                            <div class="kuang kuangRightBottom" style="margin-right:46px">
                                发票抬头
                                <input class="input1" type="text" v-model="invoice_title"/>
                            </div>
                            <div class="kuang kuangRightBottom">
                                税号
                                <input style="margin-left:55px" class="input1" type="text" v-model="duty_paragraph"/>
                            </div>
                        </div>
                    </div>
                    <hr style="position: relative;top: -440px;"/>
                    <div class="yingfu">
                        应付总金额：
                        <span style="font-size:22px;color:#FF3E51;">￥{{this.money}}.00</span>
                    </div>
                    <button class="anniu" @click="pay()">支付</button>
                    <div v-if="upload==1" @click="uploadf(0)" style="margin-top: 60px;position: relative;top: -500px;">
                        <img style="z-index:10;width:20px;" src="../../assets/image/banquan/上拉.png" alt/>
                    </div>
                </div>
            </div>
            <!-- <div class="banquan">
              <img class="simg3" src="../../assets/image/banquan/花型定制.png" alt />
              <p style="position:absolute;left:579px;top:106px;">美术版权登记</p>
              <div style="position:absolute;left:599px;top:136px;">
                <input @click="fanweif(0)" type="radio" name="sex" value="male" checked />浙江省范围
                <input @click="fanweif(1)" type="radio" name="sex" value="female" />全国范围
              </div>

              <div v-if='fanwei==0' @click="dengjif(88)" class="text1" :class="dengji==88?'xuanzhong2':''">
                普通（15个工作日）
                <p class="tit">费用：88元</p>
              </div>
              <div v-if='fanwei==0' @click="dengjif(188)" class="text2" :class="dengji==188?'xuanzhong2':''">
                普通（5个工作日）
                <p class="tit">费用：188元</p>
              </div>
              <div v-if='fanwei==1' @click="dengjif(100)" class="text1" :class="dengji==100?'xuanzhong2':''">
                普通（15个工作日）
                <p class="tit">费用：100元</p>
              </div>
              <div v-if='fanwei==1' @click="dengjif(200)" class="text2" :class="dengji==200?'xuanzhong2':''">
                普通（5个工作日）
                <p class="tit">费用：200元</p>
              </div>
              <button class="b1" @click="banli()">立即办理</button>
            </div>
            <div class="banquan2">
              <div class="liucheng1">
                <img class="liuchenga" src="../../assets/image/banquan/上传资料.png" alt />
                <p class="liuchengb">上传资料</p>
                <p class="liuchengc">专家审核,校队</p>
                <p class="liuchengd">确定申报材料</p>
              </div>
              <div class="liucheng2">
                <img class="liuchenga" src="../../assets/image/banquan/递交材料.png" alt />
                <p class="liuchengb">递交版权局</p>
                <p class="liuchengc">递交至国家版权局</p>
                <p class="liuchengd">跟进受理审查过程</p>
              </div>
              <div class="liucheng3">
                <img class="liuchenga" src="../../assets/image/banquan/获得专利.png" alt />
                <p class="liuchengb">上传资料</p>
                <p class="liuchengc">版权局核发作品登记证书</p>
                <p class="liuchengd">免费提供售后服务</p>
              </div>
              <div class="liucheng4">版权登记流程</div>
            </div>-->
            <div class="banquan3" v-if="upload==0">
                <h1>常见问题</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>Q:美术作品是什么？</div>
                <div>A:是指绘画、书法、雕塑等以线条、色彩或者其他方式构成的有审美意义的平面或者立体的造型艺术作品。</div>
                <br/>
                <br/>
                <div>Q:logo等作品版权认证与商标注册的区别？</div>
                <div>A:相比于商标注册，版权认证花的时间短，可以先期把版权权利固定下来，如果有人提前抢注，可以以版权对抗商标权，宣告抢注的商标权利无效。</div>
                <br/>
                <br/>
                <div>Q:版权保护的期限是多久？</div>
                <div>
                    A:版权保护期限，个人自其作品创作完成之日起，至作者死后第50年的12月31日止。法人或其他组织作品自该作品发表之日起，到发表之日后
                    第50年的12月31日止。作品始终没有发表的，自作品创作完成50年内未发表的，著作权法不再保护。
                </div>
            </div>
        </div>
        <!--<div class="p2" v-if="pageindex==2">-->
            <!--<div class="banquan">-->
                <!--<div class="message1" style="margin-bottom:0px;">-->
                    <!--联系人-->
                    <!--<input class="input2" placeholder="如:王女士" type="text"/>-->
                <!--</div>-->
                <!--<div class="message2" style="top:-28px;">-->
                    <!--创作城市-->
                    <!--<input class="input2" type="text" style="width: 95px;"/>-->
                <!--</div>-->
                <!--<div style="text-align: left;-->
    <!--text-indent: 34px;">-->
                    <!--摘要-->
                    <!--<input style="display:none" type="file" @change="uploadfile" ref="z11" id="z11"/>-->
                    <!--<label style="position:relative" for="z11">-->
                        <!--<div class="buttonfile">上传文件</div>-->
                    <!--</label>-->
                    <!--<div v-for="(item,index) in shuju2.file" :key="item.id">-->
                        <!--{{item.name}}-->
                        <!--<button @click="clear(index)">清除</button>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<textarea placeholder="如:版权被山寨怎么办，若描述不清可上传图片" class="zhaiyao" name id cols="30" rows="10">-->
        <!--</textarea>-->
                <!--<div>-->
                    <!--<button class="b2">提交</button>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="banquan2">-->
                <!--<div class="weiquan1">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">提交证据</p>-->
                <!--</div>-->
                <!--<div class="weiquan2">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">公证</p>-->
                <!--</div>-->
                <!--<div class="weiquan3">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">起诉</p>-->
                <!--</div>-->
                <!--<div class="weiquan4">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">立案</p>-->
                <!--</div>-->
                <!--<div class="weiquan5">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">受理</p>-->
                <!--</div>-->
                <!--<div class="weiquan6">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">开庭受理</p>-->
                <!--</div>-->
                <!--<div class="weiquan7">-->
                    <!--<img src="../../assets/image/banquan/tuoyuan.png" alt/>-->
                    <!--<p style="color:#ffa60c">判决</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="p2" v-if="pageindex==2">
            <img src="../../assets/image/banquan/noOpen.png"/>
        </div>
        <div class="p3" v-if="pageindex==3">
            <div>
                <dir style="height: 40px;"></dir>
                <h1>免责声明</h1>
                <span>
                    <p><b>1.</b> 织道不能对用户发布的任何内容（包括但不限于文章、评论、回答）的准确性进行保证。</p>
                    <p><b>2.</b> 用户在织道发表的内容仅表明其个人的立场和观点，并不代表织道的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。织道不承担任何法律及连带责任。</p>
                    <p><b>3.</b> 对于因不可抗力或织道不能控制的原因造成的网络服务中断或其它缺陷，织道不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
                </span>
            </div>
        </div>
        <Footer></Footer>
        <Jump v-if="showJump" :title="err"></Jump>
        <!-- 弹窗 -->
        <div class="model" v-if="showModel">
            <!--支付框-->
            <div class="payBox">
                <div class="payBoxTitle">请选择支付方式</div>
                <div class="payNumTitle">本次消费 <label>{{money}}</label> 元</div>
                <div>
                    <div :class="{payTypeBox:true,zhifubaoType:true, checkedType:payType==3}" @click="changePayType(3)">
                        <img src="../../assets/image/user/zhifubao.png">
                        <div>支付宝</div>
                    </div>
                    <div :class="{payTypeBox:true, checkedType:payType==5}"  @click="changePayType(5)">
                        <img src="../../assets/image/user/weixinzhifu.png">
                        <div>微信</div>
                    </div>
                    <div :class="{payTypeBox:true, checkedType:payType==4}" @click="changePayType(4)">
                        <img src="../../assets/image/user/yue.png">
                        <div>余额</div>
                    </div>
                </div>
                <!--支付宝/微信支付-->
                <div v-if="payType==3 ||payType==5" class="codeArea">
                    <img :src="qrImgSrc">
                    <div>请扫码完成支付</div>
                </div>
                <!--余额支付-->
                <div v-if="payType==4" class="codeArea">
                    <div class="balance">可用余额：{{balance}}</div>
                </div>
                <div class="clear"></div>
                <!--确认支付按钮-->
                <div v-if="payType==4" class="surePay" @click="surePay">确认支付</div>
                <div v-if="payType==3 || payType==5" class="surePay" @click="surePay">我已支付</div>
            </div>
            <!--关闭按钮-->
            <img class="closeBtn" @click="closePayBox" src="../../assets/image/banquan/guanbi.png"/>
            <!--订单交易成功弹窗-->
            <div v-if="showInfo==1" class="infoBox">
                <img src="../../assets/image/user/dagou-2.png"/>
                <div>订单交易成功！</div>
            </div>
            <!--订单交易失败，显示错误信息窗口-->
            <div v-if="showInfo==2" class="infoBox">
                <img src="../../assets/image/user/cuowu-2.png"/>
                <div>{{infoError}}</div>
            </div>
        </div>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
    import Tab from "../../components/Tab";
    import Jump from "../../components/Jump";
    import Loading from "../../components/Loading";
    import Scroll from "../../assets/js/scroll.js";
    import Footer from "../../components/Footer";

    export default {
        name: "Homepage",
        components: {
            Tab,
            Loading,
            Jump,
            Footer
        },
        data() {
            return {
                path: "/Homepage",
                tabIndex: 0,
                pageindex: 1,
                dengji: 0,
                //0全国，1浙江
                fanwei: 0,
                a1: "点击上传文件",
                err: "",
                src: "",
                money: 799,
                //1公司，0个人
                shuyu: 0,
                donghua: false,
                showLoading: false,
                showJump: false,
                uncheckImgUrl: require('../../assets/image/banquan/uncheck.png'),
                checkedImgUrl: require('../../assets/image/banquan/checked.png'),
                upload: 0,
                shuju: {
                    file: "",
                    address: "",
                    phone: ""
                },
                shuju2: {
                    file: [],
                },
                time: '普通（30个工作日）',
                introduction: '(加急件需联系客服，客服电话0575-89985016)',
                //是否需要发票，0不需要发票，1增值税发票，2普通发票
                need_invoice:0,
                //抬头类型，0个人，1企业,2不选
                title_type:2,
                //版权信息
                info:{
                    //0全国版权1浙江版权
                    type1:'',
                    //文件地址
                    img_url:'',
                },
                url:[],
                //文件地址
                img_url:'',
                //身份证正面图片
                id_card_front:'',
                //身份证背面图片
                id_card_back:'',
                //收件地址
                receipt_address:'',
                //收件电话
                receipt_phone:'',
                //身份证号
                id_card:'',
                //姓名
                user_name:'',
                //公司营业执照号
                business_license_num:'',
                //公司名称
                company_name:'',
                //公司营业执照图片
                business_license_file:'',
                //创作城市
                create_city:'',
                //发票抬头
                invoice_title:'',
                //税号
                duty_paragraph:'',
                //支付类型,3支付宝扫码4零钱5微信扫码
                payType:'3',
                showModel:false,
                showGrab:false,
                showPay:false,
                order_id:'',
                order_code:'',
                qrImgSrc:'',
                balance:'',
                //是否显示交易结果信息，0不显示，1显示交易成功，2显示交易失败原因
                showInfo:0,
                infoError:'',
                showDemo:false
            };
        },
        methods: {
            showPicDemo(){
                this.showDemo =true;
            },
            hiddenPicDemo(){
                this.showDemo =false;
            },
            //关闭支付窗口
            closePayBox(){
                this.showModel = false;
            },
            //确认支付
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
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = 0;
                                //关闭支付窗口
                                self.showModel = false;
                                self.upload=-1;
                                self.upload=1
                                self.$router.push({
                                    name: 'copyright',
                                    params:{
                                        xuanzhong:4
                                    }
                                });
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
                            self.showInfo = 2;
                            self.infoError = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = 0;
                                self.infoError = '';
                                Scroll.move();
                            },1500);
                        }
                    });
                } else if(self.payType==4){
                    //如果是余额支付
                    let formData = new FormData();
                    formData.append('id',self.order_id);
                    formData.append('payType',self.payType);
                    let obj = {
                        url: this.all.baseUrl + '/new/copyright/payForCopyright',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.showInfo = 1;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = 0;
                                //关闭支付窗口
                                self.showModel = false;
                                self.upload=-1;
                                self.upload=1
                                self.$router.push({
                                    path: '/User/copyright'
                                });
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
                            self.showInfo = 2;
                            self.infoError = res.data.msg;
                            Scroll.stop();
                            setTimeout(function(){
                                self.showInfo = 0;
                                self.infoError = '';
                                Scroll.move();
                            },1500);
                        }
                    });
                }

            },
            //切换支付方式
            changePayType(payType){
                this.payType = payType;
                let self = this;
                //请求接口
                let formData = new FormData();
                formData.append('id',self.order_id);
                formData.append('payType',self.payType);
                let obj = {
                    url: this.all.baseUrl + '/new/copyright/payForCopyright',
                    formdata: formData
                }
                //如果是支付宝/微信直接请求接口
                if (self.payType==3 || self.payType==5){
                    self.getData(obj).then(res=>{
                        if(res.data.status==0){
                            self.flag = 0;
                            self.isClick = false;
                            setTimeout(function(){
                                self.showJump = false;
                                self.err = '';
                                //请求完成
                                self.order_id = res.data.result.id;
                                self.order_code = res.data.result.order_code;
                                self.qrImgSrc = res.data.result.qrImgSrc;
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
                } else if(self.payType==4){
                    //请求接口
                    this.getBalance();
                }
            },
            //支付
            pay () {
                //验证
                let self = this
                if(this.img_url==''){
                    self.showJump = true;
                    self.err = '请先上传文件';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                    return;
                }
                if(this.receipt_address==''){
                    self.showJump = true;
                    self.err = '请填写收件地址';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                    return;
                }
                if(self.receipt_phone==''){
                    self.showJump = true;
                    self.err = '请填写收件电话';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                    return;
                }else if(!Scroll.isPoneAvailable(self.receipt_phone)){
                    self.showJump = true;
                    self.err = '请填写正确的收件电话';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                    return;
                }
                //
                if (self.need_invoice!=0) {
                    if(this.title_type==2){
                        self.showJump = true;
                        self.err = '请选择发票抬头类型';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(this.invoice_title==''){
                        self.showJump = true;
                        self.err = '请填写发票抬头';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(this.duty_paragraph==''){
                        self.showJump = true;
                        self.err = '请填写税号';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }
                //1.个人
                if(self.shuyu==0){
                    if(self.user_name==''){
                        self.showJump = true;
                        self.err = '请填写姓名';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(self.id_card==''){
                        self.showJump = true;
                        self.err = '请填写身份证号码';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    } else if(!Scroll.isCardNo(self.id_card)){
                        self.showJump = true;
                        self.err = '请填写正确的身份证号码';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }

                    if(self.id_card_front==''){
                        self.showJump = true;
                        self.err = '请上传身份证正面图片';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(self.id_card_back==''){
                        self.showJump = true;
                        self.err = '请上传身份证反面图片';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }else{
                    //2.公司
                    if(self.business_license_num==''){
                        self.showJump = true;
                        self.err = '请填写营业执照号';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(self.company_name==''){
                        self.showJump = true;
                        self.err = '请填写公司全称';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(self.business_license_file==''){
                        self.showJump = true;
                        self.err = '请上传公司营业执照';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(self.create_city==''){
                        self.showJump = true;
                        self.err = '请填写创作城市';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }
                self.payType = 3;
                //请求接口
                let formData = new FormData();
                formData.append('type1',self.fanwei);
                formData.append('img_url',self.img_url);
                formData.append('receipt_address',self.receipt_address);
                formData.append('receipt_phone',self.receipt_phone);
                formData.append('type2',self.shuyu);
                formData.append('id_card',self.id_card);
                formData.append('user_name',self.user_name);
                formData.append('id_card_front',self.id_card_front);
                formData.append('id_card_back',self.id_card_back);
                formData.append('business_license_num',self.business_license_num);
                formData.append('company_name',self.company_name);
                formData.append('business_license_file',self.business_license_file);
                formData.append('create_city',self.create_city);
                formData.append('need_invoice',self.need_invoice);
                formData.append('title_type',self.title_type);
                formData.append('invoice_title',self.invoice_title);
                formData.append('duty_paragraph',self.duty_paragraph);
                formData.append('price',self.money);
                formData.append('payType',self.payType);
                let obj = {
                    url: this.all.baseUrl + '/new/copyright/addCopyright',
                    formdata: formData
                }
                self.getData(obj).then(res=>{
                    if(res.data.status==0){
                        self.flag = 0;
                        self.isClick = false;
                        Scroll.stop();
                        setTimeout(function(){
                            self.showJump = false;
                            self.err = '';
                            self.order_id = res.data.result.id;
                            self.order_code = res.data.result.order_code;
                            self.qrImgSrc = res.data.result.qrImgSrc;
                            Scroll.move();
                        },1500);
                        self.alertShow();
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
            //选择个人/公司切换效果
            changeIsPersonal (index) {
                this.shuyu = index;
            },
            //选择是否需要发票
            changeNeedInvoice (index) {
                this.need_invoice = index;
                this.money = this.need_invoice == 0 ? this.fanwei==1?179:799 : this.fanwei==1?179:823
            },
            //抬头类型
            changeTaitou (index) {
                this.title_type = index;
            },
            getFiles(e,index){
                this.getFile(e,index)
            },
            getFile(e,index) {
                this.url = [];
                let self = this;
                let files = e.target.files[0];
                if (files.size > 1024*1024*5) {
                    this.showJump = true;
                    this.err = "文件大小超过5MB";
                    setTimeout(function() {
                        self.showJump = false;
                        self.err = "";
                    }, 2000);
                }else{
                    if (!e || !window.FileReader) return; // 看支持不支持FileReader
                    if(files.name.substring(files.name.length-3,files.name.length)!='png'){
                        self.showJump = true;
                        self.err = '只支持上传png格式图片';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    if(files.size/1024/1024 > 5 ){
                        self.showJump = true;
                        self.err = '文件大小请控制在5M以内';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                    let reader = new FileReader();
                    reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                    reader.onloadend = function(){
                        // 增加一个
                        self.showLoading = true;
                        let formData = new FormData();
                        formData.append('file',files);
                        let obj = {
                            url: self.all.baseUrl + '/file/upload',
                            formdata: formData
                        }
                        self.getData(obj).then(res=>{
                            // self.addClassify(res.data.result);
                            setTimeout(function () {
                                self.showLoading = false;
                                Scroll.move();
                            }, 500);
                            if (index==0){
                                self.img_url=res.data.result;
                            } else if (index ==1 ) {
                                self.id_card_front = res.data.result;
                            } else if(index==2){
                                self.id_card_back = res.data.result;
                            } else {
                                self.business_license_file = res.data.result;
                            }

                            self.url = [];
                            self.showLoading = false;
                        });
                    }
                }
            },
            uploadfile(e) {
                var files = e.target.files[0];

                if (this.shuju2.file[0]) {
                    this.shuju2.file[1] = files;
                } else {
                    this.shuju2.file[0] = files;
                }


                this.$forceUpdate();
            },
            clear(a) {
                // this.shuju2.file[a]='';

                this.shuju2.file.splice(a, 1);
                this.$forceUpdate();
            },
            zhuye() {
                let self = this;
                self.$router.push({
                    path: "/Select",
                    query: {}
                });
            },
            fanweif(e) {
                this.fanwei = e;
                this.dengji = 0;
                this.money = this.need_invoice == 0 ? this.fanwei==1?179:799 : this.fanwei==1?179:823
                this.time = e == 1 ? '普通（15个工作日）' : '普通（30个工作日）';
                this.introduction = e == 1 ? '（不可加急）' : '(加急件需联系客服，客服电话0575-000000000)';
            },
            uploadf(e) {
                let self = this;
                if (e == 0) {
                    this.donghua = false;
                    setTimeout(function () {
                        self.upload = 0;
                    }, 1000);
                } else {
                    this.upload = e;
                    this.donghua = true;
                }
            },
            shuyuf(e) {
                this.shuyu = e;
            },
            banli() {
                let self = this;
                if (self.dengji != 0) {
                    self.$router.push({
                        path: "/Uploadfile",
                        query: {
                            money: self.dengji,
                            type: self.fanwei
                        }
                    });
                } else {
                    this.showJump = true;
                    this.err = "未选择套餐";
                    setTimeout(function () {
                        self.showJump = false;
                        self.err = "";
                    }, 1500);
                }
            },
            changeEnglish() {
                this.$router.go(0);
            },
            pageindexp(e) {
                let self = this;
                if(e == 2){
                    this.showJump = true;
                    this.err = '维权通道未开通！';
                    Scroll.stop();
                    setTimeout(function(){
                        Scroll.move();
                        self.showJump = false;
                        self.err = '';
                    },2000);
                }else{
                    this.pageindex = e;
                }
            },
            dengjif(e) {
                this.dengji = e;
            },
            alertShow(){
                this.showModel = true
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
            }
        },
        mounted() {
            localStorage.setItem("path", "/Banquan");
            if (localStorage.getItem("English")) {
                this.$router.push({
                    path: "/EnBanquan"
                });
            } else {
                this.$router.push({
                    path: "/Banquan"
                });
            }
            this.getBalance();
        }
    };
</script>
<style scoped>
    .chuangkou {
        width: 1200px;
        margin: auto;
        /*height: 1000px;*/
        position: relative;
        /* animation: myfirst 1s;
        -webkit-animation: myfirst 1s; */
        overflow: hidden;
    }

    .donghua {
        width: 100%;
        margin: auto;
        height: 800px;
        animation: myfirst 1s;
        -webkit-animation: myfirst 1s; /* Safari and Chrome */
        overflow: hidden;
        z-index: -1;
        background-color: #fff;
        padding-left: 25px;
    }

    .donghua2 {
        width: 1300px;
        margin: auto;
        height: 1000px;
        animation: myfirst2 1s;
        -webkit-animation: myfirst2 1s; /* Safari and Chrome */
        overflow: hidden;
        z-index: -1;
    }

    @keyframes myfirst {
        from {
            position: relative;
            top: -1000px;
        }
        to {
            position: relative;
            top: 0px;
        }
    }

    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        from {
            position: relative;
            top: -1000px;
        }
        to {
            position: relative;
            top: 0px;
        }
    }

    @keyframes myfirst2 {
        from {
            position: relative;
            top: 0px;
        }
        to {
            position: relative;
            top: -1000px;
        }
    }

    @-webkit-keyframes myfirst2 /* Safari and Chrome */
    {
        from {
            position: relative;
            top: 0px;
        }
        to {
            position: relative;
            top: -1000px;
        }
    }

    .buttonfile {
        position: absolute;
        top: 0px;
        left: 100px;
        width: 82px;
        height: 20px;
        border-radius: 5px;
        text-align: center;
        text-indent: 0;
        background-color: white;
    }

    .p1 {
        width: 100vw;
        top: -104px;
        position: relative;
    }

    .hr1 {
        width: 264px;
        position: absolute;
        left: 70px;
        top: 20px;
        border-color: #ffbb45;
        color: #ffbb45;
        border: none;
        height: 2px;
    }

    .hr2 {
        position: absolute;
        left: 420px;
        top: 20px;
        width: 264px;
    }

    .hr3 {
        position: absolute;
        left: 770px;
        top: 20px;
        width: 264px;
    }

    .meishu {
        width: 100vw;
        /*height: 350px;*/
        margin: auto;
        /*margin-top: 50px;*/
        background-color: #fff;
        padding-top: 88px;
        padding-bottom: 40px;
    }

    .meishu0 {
        /*width: 300px;*/
        font-size: 20px;
        position: relative;
        left: -445px;
    }

    .meishu1 {
        position: relative;
        top: 20px;
        width: 823px;
        height: 60px;
        color: gray;
        margin: auto;
    }

    .meishu2 {
        position: relative;
        top: 20px;
        width: 1200px;
        height: 284px;
        margin: auto;
        background-color: #fff;
    }

    .meishu3 {
        position: relative;
        top: 20px;
        width: 600px;
        height: 100px;
        margin: auto;
    }

    .meishu31 {
        width: 300px;
        height: 40px;
    }

    .meishu32 {
        width: 300px;
        height: 40px;
        position: relative;
        left: 300px;
        top: -40px;
    }

    .bq {
        width: 1200px;
        height: 62px;
        background-color: #dbdbdb;
        color: black;
        line-height: 62px;
        margin-top: 40px;
    }

    .bq1 {
        width: 600px;
        height: 62px;
    }

    .bq2 {
        width: 600px;
        height: 62px;
        position: relative;
        top: -62px;
        left: 600px;
    }

    .yuan1 {
        width: 70px;
        height: 60px;
    }

    .yuan {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin: auto;
        background-color: gray;
    }

    .orange {
        background-color: #ffbb45;
    }

    .yingfu {

        margin: auto;
        text-align: right;
        margin-top: 60px;
        position: relative;
        top: -500px;
        left: -160px;
        height: 40px;
        line-height: 40px;
    }

    .anniu {
        width: 270px;
        height: 50px;
        border-radius: 10px;
        margin: auto;
        font-size: 20px;
        background-color: black;
        color: #fff;
        margin-top: 20px;
        position: relative;
        top: -500px;
        border: none;
    }

    .zhezhao {
        width: 224px;
        height: 104px;
        position: relative;
        top: -104px;
        background-color: #f5f5f5;
    }

    .zhezhao1 {
        width: 224px;
        height: 67px;
        text-align: center;
        color: gray;
        background-color: #f5f5f5;
        position: relative;
        padding-top: 37px;
    }

    .zhezhao2 {
        width: 224px;
        height: 104px;
        text-align: center;
        line-height: 104px;
        color: gray;
        background-color: #f5f5f5;
    }

    .upload {
        width: 224px;
        border-radius: 10px;
        height: 104px;
        border: none;
        background-color: #f5f5f5;
        position: relative;
        left: 10px;
        top: -25px;

        /* background-size: 365px 185px; */
    }

    .img-container {
        width: 224px;
        height: 104px;
        /*position: relative;*/
        /*left: 10px;*/
        /*top: -25px;*/
        border: none;
    }

    .input1 {
        margin-left: 30px;
        width: 250px;
        height: 26px;
        border-radius: 10px;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        text-indent: 10px;
    }

    .input2 {
        margin-left: 30px;
        width: 154px;
        height: 26px;
        border-radius: 10px;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        text-indent: 10px;
    }

    .page {
        width: 475px;
        /* margin: auto; */
        height: 500px;
        /*margin-top: 100px;*/
        position: relative;
    }

    .pageright {
        width: 650px;
        /* margin: auto; */
        height: 500px;
        position: relative;
        top: -500px;
        left: 600px;
    }

    .kuang {
        width: 990px;
        text-align: left;
        margin-bottom: 20px;

    }

    .kuangy {
        width: 990px;
        text-align: left;
        border-left: 8px solid orange;
        margin-bottom: 50px;
        padding-left: 10px;
    }

    .message1 {
        width: 300px;
        margin-bottom: 40px;
    }

    .message2 {
        position: relative;
        top: -68px;
        left: 350px;
        width: 300px;
    }

    .message3 {
        position: relative;
        top: -50px;
        width: 300px;
    }

    .weiquan1 {
        left: 0px;
    }

    .weiquan2 {
        left: 200px;
    }

    .weiquan3 {
        left: 400px;
    }

    .weiquan4 {
        left: 600px;
    }

    .weiquan5 {
        left: 800px;
    }

    .weiquan6 {
        left: 1000px;
    }

    .weiquan7 {
        left: 1200px;
    }

    .lianxifangshi {
        margin: auto;
        width: 200px;
        height: 30px;
        position: relative;
        top: 30px;
    }

    .lianxifangshi2 {
        width: 200px;
        height: 30px;
    }

    .zhaiyao {
        width: 820px;
        height: 150px;
        position: relative;
        top: 10px;
        margin: auto;
        padding: 5px;
        background-color: #bebebe;
    }

    .banquan2 {
        width: 1350px;
        height: 300px;
        border-top: 1px solid gray;
        margin: auto;
        position: relative;
    }

    .banquan2 > div {
        position: absolute;
        width: 150px;
        height: 200px;
    }

    .banquan3 {
        width: 1000px;
        margin: auto;
        margin-top: 136px;
    }

    .banquan3 > div {
        width: 990px;
        text-align: left;
        border-left: 8px solid orange;

        padding-left: 10px;
    }

    .liucheng1 {
        top: 50px;
        left: 150px;
    }

    .liucheng2 {
        top: 50px;
        left: 600px;
    }

    .liucheng3 {
        top: 50px;
        left: 1050px;
    }

    .liucheng4 {
        top: -25px;
        height: 50px !important;
        width: 250px !important;
        background-color: white;
        text-align: center;
        left: 550px;
        font-size: 25px;
    }

    .kuang {
        width: 1000px;
        margin: auto;
        height: 50px;
        position: relative;
    }

    /* .liuchenga{

    } */
    .liuchengb {
        font-size: 16px;
    }

    .liuchengc {
        color: #9198ab;
    }

    .liuchengd {
        color: #9198ab;
    }

    .page1 {
        width: 100%;
    }

    .simg1 {
        width: 100vw;
    }

    .simg2 {
        width: 50px;
        position: absolute;
        left: 50px;
    }

    .page2 {
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        height: 102px;
        position: relative;
        top: -104px;
    }

    .kuang > div {
        width: 244px;
        height: 102px;
        background-color: rgba(0, 0, 0, 0.5);
        line-height: 100px;
        color: white;
        text-align: center;
        position: relative;
    }

    .kuai2 {
        top: -102px;
        left: 248px;
    }

    .kuai3 {
        top: -204px;
        left: 496px;
    }

    .kuai4 {
        top: -306px;
        left: 744px;
        width: calc(100% - 744px) !important;
        text-indent: 0em !important;
        text-align: center;
    }

    .xuanzhong {
        background-color: yellow !important;
        color: black !important;
    }

    .simg3 {
        position: absolute;
        top: 130px;
        left: 200px;
    }

    .text1 {
        position: absolute;
        left: 600px;
        top: 170px;
        width: 600px;
        height: 55px;
        line-height: 55px;
        background-color: white;
        color: black;
        text-align: left;
        text-indent: 2em;
        font-size: 12px;
    }

    .text2 {
        position: absolute;
        left: 600px;
        top: 240px;
        width: 600px;
        height: 55px;
        line-height: 55px;
        background-color: white;
        color: black;
        text-align: left;
        text-indent: 2em;
        font-size: 12px;
    }

    .banquan {
        width: 900px;
        height: 366px;
        /* background-color: yellow; */
        margin: auto;
        position: relative;
        top: -53px;
    }

    .tit {
        position: relative;
        top: -55px;
        left: 405px;
    }

    .xuanzhong2 {
        background-color: orange;
        color: white;
    }

    .b1 {
        width: 130px;
        height: 50px;
        border-radius: 10px;
        position: absolute;
        left: 1250px;
        top: 218px;
        background-color: black;
        color: yellow;
    }

    .b2 {
        width: 130px;
        height: 50px;
        border-radius: 10px;
        position: relative;
        top: 10px;
        margin: auto;
        background-color: black;
        color: yellow;
    }

    .meishu31:disabled {
        color: #000;
        background-color: red;
    }

    .line {
        width: 1116px;
        height: 2px;
    }

    .pclass1, .pclass2 {
        margin-top: 15px;
    }

    .kuangRight {
        height: auto;
        margin-bottom: 25px;
    }

    .kuangRightBottom {
        height: auto;
        margin-bottom: 20px;
    }

    .kuangLeft {
        height: auto;
        margin-bottom: 33px;
        border-radius: 10px;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        width: 450px;
        padding-left: 20px;
    }

    input:checked {
        top: 6px;
        left: 6px;
        border-radius: 50%;
        background-color: red;
    }

    .idCardLeft {
        float: left;
    }

    .idCardRight {
        float: left;
        margin-left: 85px;
    }

    .meishu3 img {
        margin-right: 8px;
        position: relative;
        top: 4px;
    }
    .kuangRight img ,.kuangRightBottom img{
        width: 14px;
        height: 14px;
        margin-right: 4px;
        position: relative;
        top: 3px;
    }
    .clear{ clear:both; height:0; overflow:hidden;}
</style>
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
    .payBox{
        background-color: #F9F9F9;
        width: 503px;
        height: 343px;
        position: relative;
        margin: 0 auto;
        margin-top: 100px;
        text-align: left;
        padding-top: 13px;
    }
    .payBoxTitle{
        margin-left: 24px;
        font-size: 0.88rem;
    }
    .payNumTitle{
        text-align: center;
        position: relative;
        top: 0px;
    }
    .payNumTitle label{
        font-size: 1.13rem;
        color: #FB6413;
        letter-spacing: 0.32px;
    }
    .payTypeBox{
        width: 106px;
        height: 31px;
        background: #FFFFFF;
        border: 1px solid #BEBCBC;
        box-shadow: none;
        line-height: 31px;
        float: left;
        margin-left: 20px;
        margin-top: 15.2px;
    }
    .zhifubaoType{
        margin-left: 57px;
    }
    .checkedType{
        border: 1px solid #02A9F2;
        box-shadow: 2px 2px 4px 0 rgba(2,169,242,0.28);
    }
    .payTypeBox img{
        height: 19px;
        width: 19px;
        float: left;
        margin-top: 6px;
        margin-left:9px;
    }
    .payTypeBox div{
        float: left;
        margin-left: 20px;
    }
    .codeArea{
        background: #FFFFFF;
        border-radius: 13px;
        width: 364px;
        height: 148px;
        float: left;
        margin-top: 21px;
        margin-left: 57px;
        text-align: center;
    }
    .codeArea img{
        width: 90px;
        height: 90px;
        margin-top: 17px;
    }
    .codeArea div{
        color: #9D9C9C;
        margin-top: 12px;
    }
    .surePay{
        width: 135px;
        height: 29px;
        text-align: center;
        background: #FFE135;
        margin: 0 auto;
        margin-top: 35px;
        line-height: 29px;
    }
    .balance{
        margin: 0 auto;
        margin-top: 62px !important;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #020202;
        letter-spacing: 0.29px;
    }
    .infoBox{
        background: #ffffff;
        width: 442px;
        height: 130px;
        top: 0px;
        position: relative;
        margin: 0 auto;
        top: -230px;
        text-align: left;
        padding-top: 13px;
        z-index: 999;
    }
    .infoBox img{
        width: 43px;
        height: 43px;
        margin-top: 41px;
        margin-left: 104px;
        float: left;
    }
    .infoBox div{
        color: #9D9C9C;
        margin-top: 55px;
        margin-left: 25px;
        float: left;
        color: #020202;
        font-size: 14px;
    }
    .model .closeBtn{
        width: 30px;
        height: 30px;
        position: relative;
        top: -355px;
        left: 272px;
    }
    input,button,select,textarea{outline:none}
    textarea{resize:none}
    .demo{
        color:#FF565A;
        cursor: pointer;
    }
    .demoImg{
        position: fixed;
        z-index: 9999;
        top: calc(50vh - 300px);
        left: calc(50vw - 200px);
        width: 400px;
    }
    .p2{
        padding-bottom: 100px;
    }
    .p3{
        position: relative;
        top: -104px;
        margin-bottom: -104px;
    }
    .p3>div{
        width: 100%;
        height: 600px;
        margin: 0 auto;
        background: #fff;
    }
    .p3>div h1{
        font-size:32px;
        margin: 0 auto 20px;
    }
    .p3>div p{
        font-size: 16px;
        width: 1000px;
        margin: 0 auto;
        text-align: left;
        line-height: 40px;
    }
</style>