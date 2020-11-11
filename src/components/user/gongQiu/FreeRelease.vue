<template>
  <div class="freeRelease">
    <div class="form">
      <div class="buzoutiao">
        <div class="tep tep1">
          <div class="no no1">1</div>
          <div class="font font1">填写</div>
          <div class="fenge fenge1"></div>
        </div>
        <div class="tep tep2">
          <div class="no">2</div>
          <div class="font">审核</div>
          <div class="fenge"></div>
        </div>
        <div class="tep tep3">
          <div class="no">3</div>
          <div class="font">发布</div>
        </div>
      </div>
      <div class="content">
        <el-form label-position="top" label-width="80px" :rules="formRules" :model="form" ref="form">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="form.title" placeholder="请输入信息标题"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入您的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="area">
            <el-cascader
              placeholder="请输入您的地址"
              filterable
              v-model="form.area"
              :options="arr"
              :props="areaValue"
              clearable
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="类型:" required>
            <el-col :span="11">
              <el-form-item prop="type">
                <el-select
                  style="width: 100%"
                  v-model="form.type"
                  placeholder="请选择供求类型"
                  @change="leixingChange">
                  <el-option
                    label="供应信息"
                    :value="0">
                  </el-option>
                  <el-option
                    label="求购信息"
                    :value="1">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="lableIds">
                <el-select
                  style="width: 100%;"
                  multiple
                  v-model="form.lableIds"
                  placeholder="请选择标签类型"
                  @change="tagsChange">
                  <el-option
                    v-for="item in tagsAll"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="报价:" class="baojia" prop="price">
            <el-input v-model="form.price" placeholder="请输入您的报价"></el-input>
          </el-form-item>
          <el-form-item label="内容简介:" prop="description">
            <el-input v-model="form.description" placeholder="请输入您的内容简介"></el-input>
          </el-form-item>
          <el-form-item label="内容要求:">
            <quill-editor
              :options="editorOption"
              class="quill"
              v-model="form.content">
            </quill-editor>
          </el-form-item>
        </el-form>
      </div>
      <div class="yulanBtn" @click="yulan">
        发布预览
      </div>
      <div class="tijiaoBtn" @click="fabuBtn">
        立即发布
      </div>
    </div>
    <div class="mould">
      <el-dialog
        title="发布预览"
        width="950px"
        :visible.sync="drawer"
        :before-close="handleClose">
          <Mould :content="content"></Mould>
      </el-dialog>
    </div>
    <Loading v-if="showLoading"></Loading>
  </div>
</template>

<script>
import {areaList} from '../../../assets/js/area.js'
import Mould from '../../../components/release/Mould'
import Loading from '@/components/Loading'
import Scroll from '@/assets/js/scroll.js'
export default {
  name: 'FreeRelease',
  components: {
    Mould,
    Loading
  },
  data () {
    return {
      form: {
        title: '',
        tel: '',
        area: '',
        type:'',
        lableIds:[],
        price: '',
        content: '',
        description: '',
      },
      formRules: {
        title: [{ required: true, message: '请输入信息标题', trigger: 'blur' }],
        area: [{ required: true, message: '请输入您的地址', trigger: 'change' }],
        tel: [{ required: true, message: '请输入您的手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的格式', trigger: 'blur' }],
        type: [{ required: true, message: '请选择供求类型', trigger: 'change' }],
        lableIds: [{ required: true, message: '请选择标签类型', trigger: 'change' }],
        price: [{ required: true, message: '请输入您的报价', trigger: 'blur' }],
        description: [{ required: true, message: '请输入您的内容简介', trigger: 'blur' }]
      },
      arr:[],
      areaLable:[],
      areaValue: {
        label: 'value',
      },
      leixingValue:'',
      content: '',
      editorOption:{
        placeholder:'请输入供求信息详细内容',
        modules:{
          toolbar:[
            ['bold'],        // toggled buttons
            // ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
        }
      },
      tagsAll: [],
      drawer: false,
      content: {},
      showLoading: false
    }
  },
  created () {
    this.arr = areaList
    this.getTagsAll()
  },
  mounted () {
    if (this.$route.query.form){
      const form = this.$route.query.form
      this.form.title = form.title
      this.form.tel = form.tel
      this.form.price = form.price
      this.form.content = form.content
      this.form.description = form.description
      this.form.type = form.type
      this.form.lableIds = form.lableIds.split(',').map(i => i * 1)
      this.form.area = form.area.split(',')
    }
  },
  methods: {
    // 获取所有标签列表
    getTagsAll () {
      this.showLoading = true
      Scroll.stop()
      let obj = {
        url: this.all.baseUrl + '/info/publish/supply/demand/lables',
      }
      this.get(obj).then(res => {
        setTimeout( ()=> {
          this.showLoading = false;
          Scroll.move();
        }, 500)
        if (res.data.status == 0) {
          this.tagsAll = res.data.result
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
    // 地址
    handleChange (value) {
    },
    // 关闭预览抽屉
    handleClose () {
      this.drawer = false
    },
    // 打开预览
    yulan () {
      this.$refs.form.validate(value => {
        if(!value) return
        if(this.form.content.trim() === '') {
          return this.$message.error('请输入供求信息详细内容')
        }
        let content = JSON.parse(JSON.stringify(this.form))
        content.createTime = new Date().getTime()
        content.area = content.area.join(',') 
        this.content = content
        this.drawer = true
      })
    },
    // 选择标签
    tagsChange (value) {
    },
    // 发布类型
    leixingChange() {
    },
    // 立即发布
    fabuBtn () {
      this.$refs.form.validate(value => {
        if(!value) return
        if(this.form.content.trim() === '') {
          return this.$message.error('请输入供求信息详细内容')
        }
        this.showLoading = true;
        Scroll.stop();
        let formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('tel', this.form.tel)
        formData.append('area', this.form.area)
        formData.append('type', this.form.type)
        formData.append('lableIds', this.form.lableIds)
        formData.append('price', this.form.price)
        formData.append('content', this.form.content)
        formData.append('description', this.form.description)
        let obj = {
          url: this.all.baseUrl + '/info/publish/supply/demand/save',
          formdata: formData
        }
        this.getData(obj).then(res => {
          setTimeout(()=> {
            this.showLoading = false;
            Scroll.move();
          }, 500);
          if (res.data.status == 0) {
            this.$router.push({
              path: "/User/sucessPage"
            })
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
      })
    }
  }
}
</script>

<style>
.freeRelease{
  width: 100%;
  height: 100%;
  position: relative;
}
.freeRelease .form{
  position: absolute;
  width: 55.1%;
  margin-left: 19.9%;
  margin-top: 7%;
  height: 90%;
}
.freeRelease .buzoutiao{
  width: 100%;
  height: 30px;
  display: flex;
  line-height: 30px;
  justify-content: space-between;
}
.freeRelease .tep{
  display: flex;
  width: calc(50% - 30px);
  align-items: center;
}
.freeRelease .tep3{
  width: 90px;
}
.freeRelease .no{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  color: #ccc;
  font-size: 18px;
  border: 1px solid #ccc;
}
.freeRelease .no1{
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}
.freeRelease .font{
  font-size: 14x;
  color: #ccc;
  font-weight: 700;
  margin-left: 4px;
}
.freeRelease .font1{
  color: #000;
}
.freeRelease .fenge{
  height: 1px;
  background-color: #ccc;
  width: calc(100% - 80px);
  margin-left: 10px;
}
.freeRelease .content{
  margin-top: 30px;
}
.freeRelease .el-form--label-top .el-form-item__label {
  float: left;
  padding: 0;
}
.freeRelease .el-cascader,.el-form-item__label{
  width: 100%;
}
.freeRelease .leixingInput{
  /* position: absolute; */
  left: 0;
  /* top: 40px; */
  width: 48% !important;
}
.freeRelease .leixingInput2{
  /* position: absolute; */
  right: 0;
  /* top: 40px; */
  width: 48% !important;
}
.freeRelease .quill{
  position: absolute;
  margin-top: 40px;
}
.freeRelease .ql-container{
  height: 200px;
}
.freeRelease .quill{
  overflow-y: scroll;
  width: 100%;
}
.freeRelease .quill::-webkit-scrollbar{
	display: none;
}
.freeRelease .yulanBtn{
  position: absolute;
  bottom: 41px;
  width: 100%;
  height: 36px;
  background-color: #409EFF;
  line-height: 36px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #FFF;
  border-radius: 5px;  
}
.freeRelease .tijiaoBtn{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 36px;
  background-color: #FFE300;
  line-height: 36px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
}

</style>