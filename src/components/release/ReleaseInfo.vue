<template>
  <div class="releaseInfo">
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="releaseInfoTop">
      <div class="contentMould">
        <Mould :content="content"></Mould>
      </div>
      <div class="lianxi">
        <div class="topLianxi">
          联系方式
        </div>
        <div class="contentLianxi">
          <h2>绍兴市有柴纺织品有限公司</h2>
          <h3>13989577937 (浙江 绍兴)</h3>
        </div>
        <div class="bottomLianxi">
          <div>联系时可以这样说:</div>
          <div>您好,我从织道云花型设计上看到</div>
        </div>
        <div class="lianxiBtn">
          联系他
        </div>
      </div>
    </div>
    <div class="qita">
      <div class="qitaTitle" v-if="type==0">
        其他相关供应信息
      </div>
      <div class="qitaTitle" v-if="type==1">
        其他相关求购信息
      </div>
      <div class="qitaTable">
        <div class="listContent1" v-for="(item,index) in list" :key="index" @click="toXiangxiInfi(item)">
          <!-- 头部标题价格 -->
          <div class="listTop1">
            <h1 class="topL1">
              {{item.title}}
            </h1>
            <div class="topR1">
              价格:
              {{item.price}}
            </div>
          </div>
          <!-- 大致内容 -->
          <div class="listContentMini1">
            {{item.description}}
          </div>
          <!-- 底部信息 -->
          <div class="foot1">
            <div class="footL1">
              <i class="iconfont icon-weibiaoti-"></i>
              <span>{{item.area}}</span>
            </div>
            <div class="footR1">
              <i class="iconfont icon-shijian"></i>
              <span>{{item.createTime | time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '../../components/Tab'
import Mould from './Mould'
export default {
  name: 'ReleaseInfo',
  components: {
    Tab,
    Mould
  },
  data () {
    return {
      path: '/ReleaseInfo',
      tabIndex: 13,
      id: '',
      content: {},
      type: 0,
      list: [],
      id: 0
    }
  },
  methods: {
    changeEnglish (e) {
      this.$router.go(0);
    },
    // 获取供求详细数据
    getDataList () {
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/info',
        id: this.id
      }
      this.get(obj).then(res => {
        console.log(res)
        if (res.data.status == 0) {
          // this.$router.push({
          //   path: "/User/sucessPage"
          // })
          console.log(11111)
          this.content = res.data.result
        } else if (res.data.status == -95) {
          this.err = "您的账户已在其它地方登陆";
          localStorage.clear();
          setTimeout(function() {
            self.$router.push({
              path: "/Login"
            })
          }, 1500)
        } else {
          alert(res.data.msg);          
        }
      })
    },
    // 获取供求数据列表
    getTableList() {
      const params = {
        page:1,
        pageSize:3,
        type:this.type
      }
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/list',
        ...params
      }
      this.get(obj).then(res => {
        if (res.data.status == 0) {
          this.list = res.data.result.list
          // this.total = res.data.result.total
        } else if (res.data.status == -95) {     
          this.err = "您的账户已在其它地方登陆";
          localStorage.clear();
          setTimeout(function() {
            self.$router.push({
              path: "/Login"
            });
          }, 1500);
        } else {
          alert(res.data.msg);          
        }
      })
    },
    // 点击不同需求信息框
    toXiangxiInfi (value) {
      this.$router.push({
        path: '/ReleaseInfo',
        query: {
          id: value.id,
          type: this.type
        }
      })
      this.id = value.id
      this.getDataList()
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDataList()
    this.type = this.$route.query.type
    this.getTableList()
  },
  filters: {
    time(msg) {
      const time = new Date().getTime() - msg
      const timeDay = time/(1000 * 60 * 60 * 24)
      if (timeDay<1){
        return '一天内'
      } else {
        return parseInt(timeDay) + '天前'
      }
    }
  }
}
</script>

<style>
  .releaseInfo{
    background-color: #F8F8FA;
    min-width: 1400px;
  }
  .releaseInfo .contentMould{
    margin-left: 120px;
  }
  .releaseInfo .releaseInfoTop{
    display: flex;
    margin-top: 50px;
  }
  .releaseInfo .lianxi{
    width: 263px;
    height: 287px;
    background-color: #fff;
    margin-left: 36px;
    padding: 24px;
    text-align: left;
    position: relative;
  }
  .topLianxi{
    font-size: 18px;
    margin-top: 23px;
    /* margin-left: 24px; */
    margin-bottom: 10px;
  }
  .contentLianxi{
    /* padding: 24px; */
    border-top: 1px solid #ddd;
    padding-top: 27px;
    padding-bottom: 27px;
    border-bottom: 1px solid #ddd;
  }
  .contentLianxi h2{
    margin-bottom: 10px;
  }
  .bottomLianxi{
    padding-top: 20px;
    font-size: 17px;
    color: #bbb;
  }
  .lianxiBtn{
    width: 293px;
    height: 48px;
    color: #fff;
    background-color: #FF8149;
    position: absolute;
    bottom: 10px;
    left: 10px;
    text-align: center;
    line-height: 48px;
    font-size: 18px;
    cursor: pointer;
  }
  .qitaTitle{
    width: 784px;
    height: 34px;
    margin-top: 30px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #3B3A40;
    line-height: 34px;
    text-align: left;
    margin-left: 120px;
    margin-bottom: 30px;
  }
  .qitaTable{
    margin-left: 120px;
    display: flex;
  }
  .qitaTable .listContent1{
    width: 380px;
    height: 226px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 24px;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    margin-right: 30px;
    margin-bottom: 180px;
  }
  .qitaTable .listContent1 :hover .topL1{
    color: red;
  }
  .qitaTable .listTop1 {
    display: flex;
    justify-content: space-between;
  }
  .qitaTable .topR1{
    display: flex;
    align-items: center;
    color: #FF6600;
  }
  .qitaTable .listContentMini1{
    margin-top: 20px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3; 
    text-align: left;
  }
  .qitaTable .foot1{
    position: absolute;
    bottom: 24px;
    width: 100%;
    left: 0;
    display: flex;
    padding-left: 24px;
    text-align:left;
    z-index: 999;
  }
  .qitaTable .footL1{
    flex:6;
    display: flex;
    align-items: center;
  }
  .qitaTable .footR1{
    flex:3;
    display: flex;
    align-items: center;
  }
</style>