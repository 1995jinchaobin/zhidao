<template>
  <div class="supplyInfo">
    <div class="changeStatus">
      <div v-for="item in changeStatus" :key="item.id" @click="changeStatusBtn(item.id, item.type)" :class="[clickId===item.id?'bule':'','tagsDefault']">{{item.name}}</div>
    </div>
    <el-table
      :data="supplyInfoList">
      <el-table-column
        label="发布时间"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | supplyTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="area"
        align="center"
        label="地点">
      </el-table-column>
      <el-table-column
        prop="price"
        align="center"
        label="金额">
      </el-table-column>\
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <label v-if="scope.row.status === 0">待审核</label>
          <el-button v-else-if="scope.row.status === 1" size="mini" @click="xiajiaBtn(scope.row)">完成</el-button>
          <label v-else-if="scope.row.status === 2">已完成</label>
          <label v-else>审核失败|<span class="blueS" @click="lookYuanyin(scope.row)">查看原因</span></label>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
      layout="prev,  pager, next,sizes, jumper"
      :total="total"
      background
      hide-on-single-page>
    </el-pagination>
    <!-- 下架提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>是否下架该({{xiajiaTitle}})的{{xiajiaTypeZ}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="xiajiaSureBtn">确 定</el-button>
      </span>
    </el-dialog>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Scroll from '@/assets/js/scroll.js'
export default {
  name: 'SupplyInfo',
  components: {
    Loading
  },
  data () {
    return {
      changeStatus: [
        {id: 0, name: '全部', type: ''},
        {id: 1, name: '待审核', type:'0'},
        {id: 2, name: '已完成', type: '2'}
      ],
      clickId: 0,
      params: {
        type: '',
        status: '',
        page: 1,
        pageSize:10
      },
      supplyInfoList: [],
      total: 0,
      showLoading:false,
      dialogVisible:false,
      xiajiaTitle: '',
      xiajiaId: 0,
      xiajiaType: 0,
      xiajiaTypeZ: ''
    }
  },
  created () {
    this.params.type = this.$route.query.id
    this.getSupplyInfoList()
  },
  watch: {
    // 监听路由参数变化
    $route() {
      this.params.type = this.$route.query.id
      this.params.page = 1
      this.params.pageSize = 10
      this.params.status = ''
      this.clickId = 0
      this.getSupplyInfoList()
    }
  },
  methods: {
    getSupplyInfoList () {
      this.showLoading = true
      Scroll.stop()
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/pr/list',
        ...this.params
      }
      this.get(obj).then(res => {
        setTimeout( ()=> {
          this.showLoading = false
          console.log(self)
          Scroll.move()
        }, 500)
        if (res.data.status == 0) {
          this.supplyInfoList = res.data.result.list
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
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.params.pageSize = val
      this.getSupplyInfoList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.params.page = val
      this.getSupplyInfoList()
    },
    // 表格状态分类
    changeStatusBtn (id, type) {
      console.log(id)
      console.log(type)
      this.clickId = id
      this.params.status = type
      this.params.page = 1
      this.getSupplyInfoList()
    },
    // 下架供求信息
    xiajiaBtn (value) {
      console.log(value)
      this.xiajiaId = value.id
      this.xiajiaTitle = value.title
      if (value.type === 0) {
        this.xiajiaTypeZ = '供应信息'
      } else {
        this.xiajiaTypeZ = '求购信息'
      }
      this.dialogVisible = true
    },
    // 下架提示关闭回调
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {})
    },
    xiajiaSureBtn(){
      this.showLoading = true
      let self = this
      let formData = new FormData();
      formData.append('id',this.xiajiaId);
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/finish',
        formdata: formData
      }
      this.getData(obj).then(res=>{
        setTimeout(function(){
          self.showLoading = false;
        },500)
        this.dialogVisible = false
        if(res.data.status==0){
          this.$message.success('下架成功')
          this.getSupplyInfoList()
        }else if(res.data.result==-95){
          this.showJump = true;
          this.err = '您的账号已在其它地方登陆';
          setTimeout(function(){
            self.showJump = false;
            self.err = '';
            localStorage.clear();
            self.$router.push({
              path: '/Login'
            });
          },1500);
        }else{
          this.err = res.data.msg;
        }
    });
    },
    // 审核失败查看原因跳转
    lookYuanyin(value){
      console.log(value)
      this.errContent = value.note
      this.$router.push({
        path: '/User/errorPage',
        query: {
          content: value
        }
      })
    }
  },
  filters: {
    supplyTime(msg) {
      const dt = new Date(msg)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return `${y}.${m}.${d}`
    }
  }
}
</script>

<style>
.supplyInfo{
  padding: 30px 20px;
}
.supplyInfo .changeStatus{
  display: flex;
}
.supplyInfo .tagsDefault{
  width: 50px;
  font-size: 16px;
  font-weight: 550;
  color: #C0C0C0;
  margin-right: 5px;
  cursor: pointer;
  padding-bottom: 3px;
}
.supplyInfo .bule{
  color: #47A6FE;
  border-bottom: 2px solid #47A6FE;
}
.el-pagination {
  margin-top: 20px;
}
.blueS{
  color: #1890FF;
  cursor: pointer;
}
</style>