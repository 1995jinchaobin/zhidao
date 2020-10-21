<template>
  <div class="maker">
    <Tab :path="path" :tabIndex="tabIndex"></Tab>
    <img class="back" src="../../assets/image/maker/topBackground.png">
    <div class="topTitle">花型新世界由你创造</div>
    <div class="nextTitle">轻松兼职，单件作品最</div>
    <div class="secondTitle">高收益可达1000+</div>
    <div class="applyBtn" @click="link">申请成为设计师</div>
    <div class="odds">
      <div class="oddsTitle">
        <span>Designer advantage</span>
        <h4>平台设计师优势</h4>
      </div>
      <div class="oddsImg">
        <img src="../../assets/image/maker/item.png" alt="">
        <img src="../../assets/image/maker/item5.png" alt="">
        <img src="../../assets/image/maker/item2.png" alt="">
        <img src="../../assets/image/maker/item3.png" alt="">
        <img src="../../assets/image/maker/item4.png" alt="">
      </div>
    </div>
    <div class="count">
      <div style="height: 1px;"></div>
      <div class="countTitle">
        <span>Design class</span>
        <h4>设计内容</h4>
      </div>
      <div class="countImg">
        <img src="../../assets/image/maker/itemLeft.png" alt=""><img src="../../assets/image/maker/itemRight.png" alt="">
      </div>
    </div>
    <div class="makerZM">
      <div style="height:1px;"></div>
      <div class="makerZMTitle">
        <span>SourceHanSansCN-Medium</span>
        <h4>招募对象</h4>
        <p>不限身份，不限年龄，不限地区，织道只要热爱设计和想挣钱的你</p>
      </div>
      <div class="makerZMImg">
        <div><img src="../../assets/image/maker/1.png" alt=""><span>全职设计师</span></div>
        <div><img src="../../assets/image/maker/2.png" alt=""><span>设计工作室</span></div>
        <div><img src="../../assets/image/maker/3.png" alt=""><span>学生</span></div>
        <div><img src="../../assets/image/maker/4.png" alt=""><span>宝妈家庭主夫</span></div>
        <div><img src="../../assets/image/maker/5.png" alt=""><span>设计老师</span></div>
      </div>
    </div>
    <div class="story">
      <div class="storyTitle">
        <span>Designer Story</span>
        <h4>设计师故事</h4>
      </div>
      <img src="../../assets/image/maker/imgList.png" alt="">
    </div>
    <div class="makerFoot" @click="link">
      <h4>欢迎加入织道设计师，与平台携手共同创收！</h4>
      <div>申请成为设计师</div>
    </div>
    <Jump v-if="showJump" :title="err" :change="imgChange"></Jump>
  </div>
</template>

<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Scroll from '../../assets/js/scroll.js';
export default {
  name: 'maker',
  components:{
    Tab,
    Jump
  },
  data(){
    return{
      path: '/Shopping',
      showJump: false,
      tabIndex: 10,
      showLoading: false,
      storyMsg:[
        {type:'全职设计师',title:'#代售管理节省精力#',count:'个人设计师平时在接单的时候不可避免的总会遇到一些难缠的甲方，有时候一些无厘头的需求真的会让人奔溃。 有一次因为设计需要，在网上第一次接触到到了织道平台。恰巧当时候织道在招募设计师，了解到设计师只需要做作品就好不需要做其他事情，当时抱着试一试的心态就申请了加入。后来发现这种模式真的很不错，不仅不需要去跟客户讨价还价和沟通，大大的节省了我很多时间和精力，而且只需要把设计好的作品放上去就可以持续的售卖获得收入，真的要点个赞！',url:''},
        {type:'设计工作室',title:'#用户数量大#',count:'我们做设计工作室的，那种大单子并不是时时都有的，所以平时也会接一下小单子，但如果量不大的话收益又很微薄。 还好有织道平台，选择这个平台的原因是织道每天都有很多的人在使用，我们做设计的效率比较高，通常一天就可以做很多个模版，这样子每个月下来工作室都能获得不错的收入，甚至都不比接一些大单子的收益少，重点是这些都不需要我们去找客户的。',url:''},
        {type:'学生',title:'#发挥创意#',count:'我是一名大三的学生，由于平时课程不是很多，所以空闲的时间会比较多，自己也想着利用这些时间做一些兼职提升一下自己，但是线下的兼职对于时间和地点的要求太高了。 后来在朋友的介绍下加入了织道平台，成为平台的设计师，真的比线下兼职方便很多，不管什么时候，只需要身边有一部电脑就可以制作花型，然后进行上架就可以了。不仅可以提高我自己的专业设计技能，每一个月还有一笔不菲的收入，现在我都不用跟家里要生活费了，看到自己喜欢的东西也可以买得心安理得。',url:''},
        {type:'宝妈家庭主妇',title:'#专业技能得到提升#',count:'我是一个2岁小孩的妈妈，以前宝宝小的时候，每天围绕着宝宝转，日子还挺充实的，不过随着宝宝的长大，自由的时间也多起来了，这时候我想找工作，却发现很多地方都不愿意要我。 后来在 一个偶然的机会加入了织道平台，成为了兼职设计师，平时也不用坐班，只需要在有空的时候做一做花型，然后放上平台就好了，也不需要花时间维护；每个月下来也能赚个几千块的工资，自己平时的花费全搞定了。而且看到自己的花型被别人认可和使用的时候也感到非常的开心。',url:''},
        {type:'设计老师',title:'#边玩边赚钱#',count:'我是一个大学设计专业的老师平时在学校教学生还是挺充实的，但是一到寒暑假，玩了一两个礼拜，就有点无聊了，然后接触到了织道这个平台，现在寒暑假也过的很充实，并且还能赚点钱。',url:''}
      ],
      err: '',
      imgChange:'',
    }
  },
  methods:{
    link() {
      let formData = new FormData();
      let self = this;
      let obj = {
        url: this.all.baseUrl + "/new/studio/getStudioByUserId",
        formdata: formData
      };
      this.getData(obj).then(res => {
        if(res.data.status == 0){
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
        }else if(res.data.status == -95){
          self.showJump = true;
          self.imgChange = 'gantan';
          self.err = res.data.msg;
          Scroll.stop();
          setTimeout(function(){
              self.showJump = false;
              self.err = '';
              self.imgChange = '';
              Scroll.move();
              localStorage.clear();
              self.$router.push({
                  path: '/Login'
              });
          },1000);
        }
      });
    },
  },
  mounted(){

  }
}
</script>

<style scoped>
  .maker{
    width: 100%;
    min-width: 1200px;
    background: #f7f7f9;
  }
  .maker>img.back{
    position: relative;
    top: -2px;
    width: 100%;
    margin-bottom: 47px;
  }
  .oddsTitle,.makerZMTitle{
    position: relative;
    display: flex;
    justify-content: center;
    height: 121px;
    margin-bottom: 115px;
  }
  .oddsTitle span,.makerZMTitle span{
    display: block;
    height: 71px;
    font-size: 48px;
    color: #EDEDED;
    letter-spacing: 0;
    text-align: center;
  }
  .oddsTitle h4,.makerZMTitle h4{
    position: absolute;
    top: 8px;
    display: inline-block;
    /* width: 15.8907rem; */
    height: 121px;
    margin: 0 auto;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 60px;
  }
  .oddsImg{
    display: flex;
    align-items: top;
    justify-content: center;
    min-width: 1200px;
  }
  .oddsImg img{
    width: 240px;
  }
  .oddsImg img:nth-child(1),
  .oddsImg img:nth-child(5){
    height: 290px;
  }
  .oddsImg img:nth-child(2),
  .oddsImg img:nth-child(4){
    height: 312px;
  }
  .oddsImg img:nth-child(3){
    height: 338px;
    margin-bottom: 95px;
  }
  .count{
    background: #fff;
  }
  .countTitle{
    position: relative;
    min-width: 1200px;
    height: 60px;
    margin: 0 auto;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .countTitle span{
    font-size: 48px;
    color: #F3F3F3;
    letter-spacing: 0;
    text-align: center;
    line-height: 60px;
  }
  .countTitle h4{
    position: absolute;
    top: 8px;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 60px;
  }
  .countImg img{
    width: 560px;
    height: 451px;
    margin-bottom: 102px;
  }
  .countImg>img:first-child{
    margin-right: 77px;
  }
  .makerZM{
    width: 100%;
    min-width: 1200px;
    height: 24.4036rem;
    min-height: 387px;
    background: #050244;
  }
  .makerZM .makerZMTitle{
    margin-bottom: 43px;
    margin-top: 30px;
  }
  .makerZM .makerZMTitle h4{
    color: #fff;
  }
  .makerZM .makerZMTitle p{
    color: #9b9aa4;
    font-size: 16px;
    display: inline-block;
    position: absolute;
    bottom: 31px;
  }
  .makerZMTitle span{
    color: #090564 !important;
  }
  .makerZMImg{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
  }
  .makerZMImg div{
    height: 123px;
  }
  .makerZMImg div img{
    display: block;
  }
  .makerZMImg div span{
    display: block;
    color: #fff;
    font-size: 14px;
  }
  .storyTitle{
    height: 71px;
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-bottom: 68px;
    margin-top:45px;
  }
  .storyTitle span{
    font-size: 58px;
    color: #EDEDED;
    letter-spacing: 0;
    text-align: center;
  }
  .storyTitle h4{
    position: absolute;
    top: 40px;
    font-family: SourceHanSansCN-Medium;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
  .storyCount{
    width: 100%;
    min-width: 1200px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 88px;
  }
  .storyCount>div+div{
    margin-left: 60px;
  }
  .storyItem{
    width: 295px;
    height: 528px;
    background: #fff;
    position: relative;
  }
  .itemImg{
    width: 6.7472rem;
    height: 6.7472rem;
    border-radius: 50%;
    border: 1px solid #FFAC40;
    margin: 0 auto .756rem;
    overflow: hidden;
    position: relative;
    top: -3.342rem;
  }
  .itemImg+div{
    position: relative;
    top: -3.342rem;
  }
  .itemType{
    display: block;
    width: 5.3599rem;
    height: 1.2611rem;
    margin: 0 auto 6px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
  }
  .itemTitle{
    display: block;
    font-size: 20px;
    color: #666666;
    letter-spacing: 0;
    text-align: left;
    padding-left: 1.4503rem;
  }
  .itemCount{
    display: inline-block;
    width: 15.7015rem;
    font-size: 14px;
    color: #2A2A2A;
    letter-spacing: 0;
    text-align: justify;
    line-height: 1.2611rem;
    margin: 0 23px; 
  }
  .itemCount>span{
    font-style: italic;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: justify;
  }
  .makerFoot{
    width: 100%;
    min-width: 1200px;
    height: 320px;
    background: url('../../assets/image/maker/footer.png') no-repeat center;
  }
  .makerFoot h4{
    display: inline-block;
    font-size: 30px;
    margin: 100px auto 0;
    color: #ffae44;
  }
  .makerFoot div{
    width: 9.5848rem;
    min-width: 152px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
    font-weight: bold;
    background: #f06d29;
    color: #fff;
    border-radius: 4px;
    margin: 35px auto 0;
  }
  .topTitle{
    font-family: SourceHanSansCN-Medium;
    font-size: 2.25rem;
    color: #FFFFFF;
    position: absolute;
    top: 10.31rem;
    left: 22.52rem;
    width: 23.94rem;
    text-align: left;
  }
  .nextTitle{
    position: absolute;
    font-family: SourceHanSansCN-Medium;
    font-size: 1.75rem;
    color: #FFFFFF;
    top: 15.5rem;
    left: 22.52rem;
    width: 18.75rem;
    text-align: left;
  }
  .secondTitle{
    position: absolute;
    font-family: SourceHanSansCN-Medium;
    font-size: 1.75rem;
    color: #FFFFFF;
    top: 18.1rem;
    left: 22.52rem;
    width: 18.75rem;
    text-align: left;
  }
  .applyBtn{
    background: #B25CE7;
    box-shadow: 0 10px 34px 0 rgba(178,92,231,0.54);
    border-radius: 4px;
    position: absolute;
    top: 25.06rem;
    left: 22.52rem;
    width: 14.44rem;
    height: 4.31rem;
    line-height: 4.31rem;
    text-align: center;
    font-family: SourceHanSansCN-Medium;
    font-size: 1.25rem;
    color: #FFFFFF;
    cursor: pointer;
  }
</style>