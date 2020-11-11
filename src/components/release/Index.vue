<template>
  <div class="releaseInfo">
    <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
    <div class="search">
      <div class="searchContent">
        <div class="searchInput">
          <el-input placeholder="请输入关键字" v-model="input2" prefix-icon="el-icon-search">
            <template slot="append"><div @click="search">搜索</div></template>
          </el-input>
          <div class="fabuInfoBtn" @click="toFreeFabu">免费发布信息</div>
        </div>
      </div>
    </div>
    <div class="changeType">
      <div v-for="item in typeList" :key="item.id" :class="[item.id===params.type?'check':'','changeTypediv']" @click="changeTyoe(item.id)">{{item.name}}</div>
    </div>
    <!-- <div class="write"></div> -->
    <div class="contentAll">
      <div class="content">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="供应信息" name="first"> -->
            <div class="firstContent">
              <Tags @tagsName="tagsName" :tagsAll="tagsAll"></Tags>
              <h1 v-if="list.length ===0">该选项没有数据</h1>
              <div class="listAllContent">
                <div class="listContent" v-for="(item,index) in list" :key="index" @click="toXiangxiInfi(item)">
                  <!-- 头部标题价格 -->
                  <div class="listTop">
                    <h1 class="topL">
                      {{item.title}}
                    </h1>
                    <div class="topR">
                      价格:
                      {{item.price}}
                    </div>
                  </div>
                  <!-- 大致内容 -->
                  <div class="listContentMini">
                    {{item.description}}
                  </div>
                  <!-- 底部信息 -->
                  <div class="foot">
                    <div class="footL">
                      <i class="iconfont icon-weibiaoti-"></i>
                      <span>{{item.area}}</span>
                    </div>
                    <div class="footR">
                      <i class="iconfont icon-shijian"></i>
                      <span>{{item.createTime | time}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- </el-tab-pane>
          <el-tab-pane label="求购信息" name="second">
            <Tags/>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[6, 9, 15, 21]"
      :page-size="params.pageSize"
      layout="prev,  pager, next,sizes, jumper"
      :total="total"
      background
      hide-on-single-page>
    </el-pagination>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Tab from '../../components/Tab'
import Tags from './Tags'
import Loading from '@/components/Loading'
import Scroll from '@/assets/js/scroll.js'
export default {
  name: 'Release',
  components: {
    Tab,
    Tags,
    Loading
  },
  data () {
    return {
      path: '/Release',
      tabIndex: 12,
      input2: '',
      activeName: 'first',
      key:'',
      list:[],
      params: {
        page: 1,
        pageSize: 9,
        type: 0,
        lableId: '',
        searchKey: ''
      },
      typeList: [
        {id: 0, name: '供应信息'},
        {id: 1, name: '求购信息'}
      ],
      total: 0,
      tagsAll: [],
      showLoading: false
    }
  },
  created () {
    this.getTagsList()
    this.getTableList()
  },
  methods: {
    // 获取分类标签
    getTagsList () {
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/lables',
      }
      this.get(obj).then(res => {
        console.log(res)
        if (res.data.status == 0) {
          this.tagsAll = res.data.result
          this.tagsAll.unshift({
            name: '全部',
            id:''
          })
          console.log(this.tagsAll)
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
    // 获取供求数据列表
    getTableList() {
      this.showLoading = true
      Scroll.stop()
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/list',
        ...this.params
      }
      this.get(obj).then(res => {
        setTimeout( ()=> {
          this.showLoading = false
          console.log(self)
          Scroll.move()
        }, 500)
        if (res.data.status == 0) {
          this.list = res.data.result.list
          this.total = res.data.result.total
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
    changeEnglish (e) {
      this.$router.go(0);
    },
    // handleClick (tab, event) {
    //   console.log(tab, event);
    // },
    // 搜索
    search () {
      this.params.searchKey = this.input2
      this.params.page = 1
      this.getTableList()
    },
    // 点击标签分类
    tagsName (id) {
      console.log(id)
      this.params.page = 1
      this.params.lableId = id
      this.getTableList()
    },
    // 点击不同需求信息框
    toXiangxiInfi (value) {
      this.$router.push({
        path: '/ReleaseInfo',
        query: {
          id: value.id,
          type: this.params.type
        }
      })
    },
    // 供求信息切换
    changeTyoe (id) {
      this.params.type = id
      this.params.page = 1
      this.getTableList()
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.params.pageSize = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.getTableList()
    },
    // 免费发布
    toFreeFabu () {
      console.log(123)
      this.$router.push({
        path: '/User',
        query: {
          params: '/User/freeRelease'
        }
      })
    }
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
  min-height: 100vh;
  width: 100%;
  background-color: #F9F9FB;
  /* background:#eee; */
}
.releaseInfo .search{
  width: 100%;
  height: 200px;
  background-color:#fff;
  position: relative;
}
.releaseInfo .searchContent{
  width: 80%;
  margin-top: 45px;
  height: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.searchContent .searchInput{
  display: flex;
  /* width: 980px; */
  width: 100%;
}
.searchInput .el-input{
  /* width: 100%; */
  width: calc(100% - 300px);
}
.searchInput .el-input__inner{
  height: 90px;
  font-size: 20px;
}
.searchInput .el-input-group--prepend .el-input__inner, .el-input-group__append {
  width: 180px;
  font-size: 24px;
  background-color: #FFE300;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
.searchInput .el-input__icon {
  line-height: 93px;
  font-size: 20px;
}
.searchInput .el-input-group {
  box-shadow: 0 2px 30px 0 rgba(28,34,38,0.10)
}
.search .fabuInfoBtn{
  margin-left: 40px;
  width: 220px;
  background-color: #000;
  border: none;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 30px 0 rgba(28,34,38,0.10);
  border-radius: 5px;
  font-size: 20px;
  line-height: 90px;
  font-weight: bold;
}
/* 标签页切换时样式 */
/* .contentAll .el-tabs__item:hover {
  color: #000;
  cursor: pointer;
  font-weight: bold;
}
.contentAll .el-tabs__item.is-active {
  color: #000;
  cursor: pointer;
  font-weight: bold;
}
.contentAll .el-tabs__active-bar{
  background-color: #000;
  height: 3px;
}
.contentAll .el-tabs__item{
  font-size: 20px;
  height: 50px;
} */
.releaseInfo .contentAll{
  width: 80%;
  margin-left: 10%;
}
.contentAll .content{
  min-width: 980px;
}
/* .contentAll .el-tabs__nav-wrap::after {
  background-color: #fff;
} */
/* .releaseInfo .write{
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: absolute;
} */
/* 列表内容 */
.releaseInfo .listAllContent{
  /* margin-top: 30px; */
  /* height: 60vh; */
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.releaseInfo .listAllContent :nth-child(3n-1){
  margin-left: 2%;
  margin-right: 2%;
}
.releaseInfo .listContent{
  box-sizing: border-box;
  margin-top: 10px;
  height: 226px;
  width: 32%;
  padding: 24px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}
.releaseInfo .listContent :hover .topL{
  color: red;
}
.releaseInfo .listTop {
  display: flex;
  justify-content: space-between;
}
.releaseInfo .topR{
  display: flex;
  align-items: center;
  color: #FF6600;
}
.releaseInfo .listContentMini{
  margin-top: 20px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3; 
  text-align: left;
}
.releaseInfo .foot{
  position: absolute;
  bottom: 24px;
  width: 100%;
  left: 0;
  display: flex;
  padding-left: 24px;
  text-align:left;
  z-index: 999;
}
.footL{
  flex:6;
  display: flex;
  align-items: center;
}
.footR{
  flex:3;
  display: flex;
  align-items: center;
}
.listAllContent{
  overflow-x: hidden;
  overflow-y: scroll;
}
.listAllContent::-webkit-scrollbar {
  display: none;
}
.el-pagination {
  margin-top: 20px;
}
.firstContent{
  margin-top: 30px;
}
.changeType{
  background-color: #fff;
  display: flex;
  padding-left:12% ;
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  color: #939393;
}
.changeTypediv{
  margin-right: 20px;
  cursor: pointer;
}
.check{
  color: #000;
  border-bottom: 4px solid #000;
}
</style>