<template>
    <div class="shopselect">
        <!-- 3D展示 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="proBox">
                <p class="backP"><img src="../../assets/image/user/icon_back.png" alt="" @click="back"><span @click="back">返回</span></p>
                <!-- <div class="topBox">
                    <h4>热门分类：</h4>
                    <ul class="classifyBox">
                        <li @click="changeClassify(index)" :key="index" :class="item.show==true?'special':''" v-for="(item,index) in classify">{{item.title}}</li>
                    </ul>
                </div> -->
                <div class="zh1" style="border-bottom: 0.5px dotted rgb(219, 214, 214);">
                    <div class="zh2">
                        <div class="zhbox0" @click="ceshi()">分类</div>
                        <div class="zhbox20">全部</div>
                        <div class="zhbox2" @click="changeMessage(index)" @mouseover="hover(index)" v-for="(item,index) in select" :key="index">
                            {{item.name}}
                            <span class="zhspan2" v-if="m1==index">
                                <img src="../../assets/image/top.png" />
                            </span>
                            <span class="zhspan1" v-if="m1!=index">
                                <img src="../../assets/image/bottom.png" />
                            </span>
                            <div class="whitebox" v-if="m1==index"></div>
                            <div class="zhbox2bottom">
                                <div @click.stop="changeClassify(index2)" :key="index2" v-for="(item,index2) in classify2[m1]">{{item.title}}</div>
                            </div>
                        </div>
                     </div>
                </div>
                <ul v-if="proList.length" class="proList">
                    <li v-for="(item,index) in proList" :key="index" @click="toDetail(index)"><img height="100%" width="100%" :src="item.backgroudImage" alt=""></li>
                </ul>
                <div class="nodata" v-if="!proList.length">
                    <img src="../../assets/image/user/Emoji.png" alt="">
                    <span>暂无数据</span>
                </div>
                <ul class="pageBox" v-if="pageNumber!=0">
                    <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                    <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                    <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                </ul>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Tab from '../../components/Tab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
export default {
    name: 'Shopselect',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            path: 'Shopselect',
            showJump: false,
            err: '',
            height: '',
            tabIndex: 7,
            showLoading: false,
            // 左侧分类
            select: [{name: '男装',show: true},{name: '女装',show: false},{name: '童装',show: false},{name: '家纺',show: false},{name: '其它',show: false}],
            classIndex: 1,
            classFlag: 0,
            // 商品列表
            proList: [],
            // 右侧分类
            classify: [],
            pageNumber: null,
            flag: 0,
            cnt: 1,
            pageIndex: 1,
            page: [],
            id: 11,
            // 返回信息
            list: [],
            newList: {},
            backImg: '',
            ourMsg: {},
            proNew: true,
            m1: 1,
            classify2: [[], [], [], [], []]
        }
    },
    methods: {
        // 返回
        back(){
            if(this.tabIndex==2){
                this.$router.push({
                    path: '/Changecolour'
                })
            }else if(this.tabIndex==4){
                this.$router.push({
                    path: '/Shopdetail'
                });
            }
        },
        // 图片合成接口
        compose(index,id){
            this.showLoading = true;
            let self = this;
            let formData = new FormData();
            formData.append('imageUrl',self.backImg);
            formData.append('templateId',id);
            formData.append('ratio',1);
            let obj = {
                url: self.all.baseUrl + '/template2d/compose',
                formdata: formData
            }
            self.getData(obj).then( res => {
                if(index==self.proList.length-1){
                    setTimeout(function(){
                        self.showLoading = false;
                    },500);
                }
                Scroll.move();
                if(res.data.status==0){
                    this.proList[index].backgroudImage = res.data.result;
                }else if(res.data.status==-95){
                    self.showJump = true;
                    self.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = res.data.msg;
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    self.showJump = true;
                    Scroll.stop();
                    self.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        getSuit(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('suittype',this.suitIndex);
            let obj = {
                url: this.all.baseUrl + '/template2d/suittype',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.proList = result;
                    if(this.proList.length&&this.ourMsg.id&&this.proNew){
                        this.proList = this.ourMsg.proList;
                    }
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        changeEnglish(){
            this.$router.go(0);
        },
        // 获取高度
        getHeight(){
            this.height = document.offsetHeight-74 + 'px';
        },
        // 左边分类
        changeMessage(index){
            this.proNew = false;
            this.classify = [];
            this.page = [];
            this.cnt = 1;
            this.flag = 0;
            this.pageIndex = 1;
            this.pageNumber= 0;
            this.select.map(function(item){
                item.show = false;
            });
            switch(index){
                case 0: 
                    this.classIndex = 1;
                    this.id = 11;
                    break;
                case 1:
                    this.classIndex = 0;
                    this.id = 0;
                    break;
                case 2:
                    this.classIndex = index;
                    this.id = 21;
                    break;
                case 3:
                    this.classIndex = index;
                    this.id = 19;
                    break;
                default:
                    this.classIndex = index;
                    this.id = 17;
                    break;
            }
            this.select[index].show = true;
            this.classFlag = 0;
            this.getList();
            this.getProlist();
        },
        // 去查看细节
        toDetail(index){
            let self = this;
            let leftIndex = 0;
            let classifyIndex = 0;
            this.select.map(function(item,index){
                if(item.show){
                    leftIndex = index;
                }
            });
            this.classify.map(function(item,index){
                if(item.show){
                    classifyIndex = index;
                }
            });
            let json = {
                id: this.proList[index].id,
                backImg: this.backImg,
                picture: this.proList[index].backgroudImage,
                proList: this.proList,
                type: 1,
                list: this.list,
                leftIndex: leftIndex,
                newType: this.ourMsg.newType,
                classifyIndex: classifyIndex,
                newList: this.newList,
                cnt: this.cnt
            }
            localStorage.setItem('shopthreeList',JSON.stringify(json));
            this.$router.push({
                path: '/Shopthreed'
            });
        },
        // 选择热门分类
        changeClassify(index) {
            this.page = [];
            this.cnt = 1;
            this.flag = 0;
            this.pageIndex = 1;
            this.classify = this.classify2[this.m1];
            this.classify.map(function(item) {
                item.show = false;
            });
            this.id = this.classify[index].id;
            this.classify[index].show = true;
            this.$forceUpdate();
            this.id = this.classify[index].id;

            this.getProlist();
        },
        // 初始化分页器
        pageAuto(){
            this.proNew = false;
            this.$forceUpdate();
            if(!this.page.length){
                if(this.pageNumber<=7){
                    for(let i=0;i<this.pageNumber;i++){
                        this.page.push({name: i+1});
                    }
                }else{
                    this.page = [{name: 1},{name: 2},{name: 3},{name: 4}
                    ,{name: 5},{name: '···'},{name: this.pageNumber}];
                }
            }
        },
        // 分页器每个点击
        btnClick(index){
            if(this.pageNumber<=7){
                this.flag = 0;
                this.cnt = index+1;
                this.getProlist();
                this.pageIndex = index+1;
            }else{
                // 状态0
                if(this.flag==0){
                    if(index==5){

                    }else if(index==4){
                        this.cnt = this.page[index].name;
                        if(this.pageNumber-this.cnt<=3){
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.getProlist();
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            this.getProlist();
                        }
                    }else if(index==6){
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7;
                        this.getProlist();
                    }else{
                        this.cnt = this.page[index].name;
                        this.pageIndex = index+1;
                        this.getProlist();
                    }
                }else if(this.flag==1){
                    if(index==1||index==5){

                    }else{
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            // 点击首页
                            this.pageIndex = this.cnt;
                            this.flag = 0;
                            this.getProlist();
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        }else if((this.pageNumber-this.cnt)<=4){
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            this.flag = 2;
                            this.getProlist();
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getProlist();
                        }
                    }
                }else if(this.flag==2){
                    if(index==1){

                    }else if(index==2){
                        this.cnt = this.page[index].name;
                        if(this.cnt<=4){
                            this.flag = 0;
                            this.pageIndex = this.cnt;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            this.getProlist();
                        }else{
                            this.flag = 1;
                            this.pageIndex = 4;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.getProlist();
                        }
                    }else if(index==0){
                        this.cnt = this.page[index].name;
                        this.flag = 0;
                        this.pageIndex = 1;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getProlist();
                    }else{
                        this.cnt = this.page[index].name;
                        this.flag = 2;
                        this.pageIndex = 7 - (this.pageNumber - this.cnt);
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.getProlist();
                    }
                }
            }
        },
        prev(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt==1){
                    this.showJump = true;
                    this.err = "已经是第一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }else{
                    this.cnt-=1;
                    this.pageIndex-=1;
                    this.getProlist();
                }
            }else{
                if(this.cnt!=1){
                    this.cnt--;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getProlist();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getProlist();
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getProlist();
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是第一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        // 下一页
        next(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt<this.pageNumber){
                    this.cnt+=1;
                    this.pageIndex+=1;
                    this.getProlist();
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }else{
                if(this.cnt<this.pageNumber){
                    this.cnt++;
                    if(this.pageNumber-this.cnt<=3){
                        this.flag = 2;
                        this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                        this.pageIndex = 7-(this.pageNumber-this.cnt);
                        this.getProlist();
                    }else if(this.cnt<=4){
                        this.flag = 0;
                        this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                        this.getProlist();
                        this.pageIndex = this.cnt;
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.getProlist();
                        this.pageIndex = 4;
                    }
                }else{
                    this.showJump = true;
                    this.err = "已经是最后一页了";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        // 获取商品列表
        getProlist(){
            let self = this;
            this.showLoading = true;
            let formData = new FormData();
            formData.append('page',this.cnt);
            formData.append('pageSize',10);
            formData.append('genre1',this.classIndex);
            formData.append('genre2',this.id);
            let obj = {
                url: this.all.baseUrl + '/template2d/list',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.proList = result.list;
                    if(this.ourMsg.type==2 && this.proNew){
                        this.proList = this.newPro;
                        setTimeout(function(){
                            self.showLoading = false;
                        },500);
                    }else{
                        this.proList.map(function(item,index){
                            self.compose(index,item.id);
                        });
                    }
                    this.pageNumber = result.pages;
                    this.pageAuto();
                    this.$forceUpdate();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        },1500);
                    });
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 获取头部列表
        getList(index) {
            this.classify = [];
            let formData = new FormData();
            this.showLoading = true;
            Scroll.stop();
            let self = this;
            formData.append("id", 14);
            let obj = {
                url: this.all.baseUrl + "/config/info",
                formdata: formData
            };
            this.getData(obj).then(res => {
                let result;
                setTimeout(function() {
                self.showLoading = false;
                Scroll.move();
                }, 500);
                if (res.data.status == 0) {
                self.classify2 = [[], [], [], [], []];
                result = JSON.parse(res.data.result.json1);
                for (let i = 0; i < 5; i++) {
                    result.category.map(function(item) {
                    if (item.categType == i) {
                        self.classify2[i].push(item);
                    }
                    });
                }

                result.category.map(function(item) {
                    if (item.categType == self.classIndex) {
                    self.classify.push(item);
                    }
                });
                if (!this.classFlag) {
                    this.classify.map(function(item) {
                    item.show = false;
                    });
                    this.classify[0].show = true;
                    this.classFlag = 1;
                } else {
                    this.classify.map(function(item) {
                    item.show = false;
                    });
                    // this.classify[index].show = true;
                }
                if (this.ourMsg.type == 1) {
                    this.id = this.classify[this.ourMsg.classifyIndex].id;
                    this.getProlist();
                }

                // categType 0女 1男 2童 3家纺 4其它
                } else if (res.data.status == -95) {
                this.showJump = true;
                Scroll.stop();
                this.err = "您的账号已在其它地方登陆";
                setTimeout(function() {
                    self.showJump = false;
                    self.err = "";
                    Scroll.move();
                    localStorage.clear();
                    self.$router.push(
                    {
                        path: "/Login"
                    },
                    1500
                    );
                });
                } else {
                this.showJump = true;
                Scroll.stop();
                this.err = res.data.msg;
                setTimeout(function() {
                    self.showJump = false;
                    self.err = "";
                    Scroll.move();
                }, 1500);
                }
            });
        },
        getMessage(){
            let self = this;
            let newType = localStorage.getItem('newType');
            this.backImg = localStorage.getItem('backImg');
            if(localStorage.getItem('selectType')&&localStorage.getItem('selectType')==2){
                this.ourMsg = JSON.parse(localStorage.getItem('shopthreeNewjson'));
                this.list = this.ourMsg.list;
                switch(this.ourMsg.leftIndex){
                    case 0: 
                        this.classIndex = 1;
                        this.id = 11;
                        break;
                    case 1:
                        this.classIndex = 0;
                        this.id = 0;
                        break;
                    case 2:
                        this.classIndex = this.ourMsg.leftIndex;
                        this.id = 21;
                        break;
                    case 3:
                        this.classIndex = this.ourMsg.leftIndex;
                        this.id = 19;
                        break;
                    default:
                        this.classIndex = this.ourMsg.leftIndex;
                        this.id = 17;
                        break;
                }
                this.select.map(function(item){
                    item.show = false;
                });
                this.select[this.ourMsg.leftIndex].show = true;
                this.classFlag = 1;
                this.getList(this.ourMsg.classifyIndex);
                this.newPro = this.ourMsg.proList;
                this.cnt = this.ourMsg.cnt;
                this.pageIndex = this.ourMsg.cnt;
                if(newType==1){
                    this.list = this.ourMsg.list;
                }else{
                    this.newList = this.ourMsg.newList;
                }
            }else{
                this.getList();
                this.getProlist();
                if(newType==1){
                    this.list = JSON.parse(localStorage.getItem('matchList'));
                }else{
                    this.newList = JSON.parse(localStorage.getItem('selectList'));
                }
            }
        }
    },
    created(){
        let newType = localStorage.getItem('newType');
        if(newType==1){
            this.tabIndex = 4;
        }else{
            this.tabIndex = 2;
        }
        this.$forceUpdate();
    },
    mounted(){
        this.getHeight();
        this.getMessage();
        // localStorage.setItem('path',this.path);
        // if(localStorage.getItem('English')){
        //     this.$router.push({
        //         path: '/Enshopselect'
        //     });
        // }else{
        //     this.$router.push({
        //         path: '/Shopselect'
        //     });
        // }
    }
}
</script>
<style scoped>
.zh1 {
  
  border-top: 0.5px dotted rgb(219, 214, 214);
  
}
.zh2 {
  width: 1220px;
  height: 60px;
  margin: auto;
  position: relative;
}
.zhbox0 {
  text-align: left;
  width: 80px;
  height: 60px;
  line-height: 70px;
  float: left;
}
.zhbox1 {
  float: left;
  text-align: left;
  width: 80px;
  height: 60px;
  line-height: 70px;
}
.zhbox2 {
  float: left;
  text-align: left;
  width: 60px;
  height: 60px;
  line-height: 70px;
  position: relative;
  text-align: center;
}
.zhbox20 {
  float: left;
  text-align: left;
  width: 60px;
  height: 60px;
  line-height: 70px;
  position: relative;
}
.zhbox2:hover {
  width: 58px;
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #f06d29;
  border-left: 1px solid #f06d29;
  border-right: 1px solid #f06d29;
  border-bottom: 1px solid #ffffff;
  z-index: 10;
}
.whitebox{
      position: absolute;
    top: 50px;
    width: 58px;
    height: 21px;z-index: -1;
    background: #ffffff;

}
.zhbox2bottom {
  position: relative;
  border: 1px solid #f06d29;
  height: 40px;
  line-height: 40px;
  width: 780px;
  left: -60px;
  top: -2px;
  padding-left:20px; 
  z-index: -2;background: #ffffff;
}
.zhbox2bottom > div {
  float: left;
  width: 60px;
}
    /* 返回 */
    .backP{
        display: flex;
        margin-bottom: 1.75rem;
        align-items: center;
        cursor: default;
    }
    .backP img{
        display: block;
        width: .5625rem;
        margin-right: .3125rem;
    }
    /* 没有数据 */
    .nodata{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #333;
        font-size: 1.25rem;
    }
    .nodata img{
        display: block;
        width: 8rem;
        margin-top: 6.25rem;
        margin-bottom: 1.25rem;
    }
    .shopselect{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: start;
    }
    ul.seleBox{
        width: 10rem;
        min-height: calc(100vh - 4.625rem);
        background: #fff;
        color: #8d8d8d;
        font-size: 1.125rem;
        box-sizing: border-box;
        padding-top: .625rem
    }
    ul.seleBox li{
        height: 2.375rem;
        line-height: 2.375rem;
        position: relative;
        cursor: default;
    }
    ul.seleBox span{
        position: absolute;
        height: 2.375rem;
        left: 0;
        top: -0.125rem;
        background: #133ffc;
        width: .25rem;
    }
    .proBox{
        width: 1200px;
        margin: 0 auto;
    }
    .topBox{
        display: flex;
        justify-content: start;
        margin-bottom: 1rem;
    }
    .topBox h4{
        font-size: 1.125rem;
        color: #333;
        font-weight: normal;
        width: 6rem;
        margin-top: .1rem;
        text-align: left;
        flex-shrink: 0;
    }
    ul.classifyBox{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
    }
    ul.classifyBox li{
        color: #8d8d8d;
        margin-right: 1.125rem;
        font-size: 1rem;
        padding: .3125rem 1rem;
        border-radius: 1.875rem;
        background: inherit;
        color: #8d8d8d;
        border: 1px solid #8d8d8d;
        margin-bottom: .625rem;
        cursor: default;
    }
    ul.classifyBox li.special{
        background: #133ffc;
        border: 1px solid #133ffc;
        color: #fff;
    }
    ul.classifyBox li:last-child{
        margin-right: 0;
    }
    ul.proList{
        display: flex;
        flex-wrap: wrap;
    }
    ul.proList li{
        width: 18.4375rem;
        height: 22.5625rem;
        background: #fff;
        margin-bottom: 1.25rem;
        margin-right: 1.25rem;
        box-shadow: 2px 2px 2px #cbccd2;
        border-radius: .5rem;
    }
    /* 分页器 */
    ul.pageBox{
        padding-bottom: 3.125rem;
        display: flex;
        margin-top: 5.5rem;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        box-shadow: .125rem .125rem .125rem #ddd;
        border-radius: 50%;
        margin: 0 .3125rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    ul.pageBox li.click{
        background: #133ffc;
        color: #fff;
    }
    ul.pageBox li.sureList{
        width: 6.25rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: #133ffc;
        color: #fff;
        font-size: .625rem;
        margin-left: 11.25rem;
        text-align: center;
        border-radius: 1.25rem;
    }
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
        margin: .625rem auto;
    }
    /* 我的素材 */
    .notExist{
        width: 11rem;
        height: 11rem;
        border: .0625rem dashed rgba(51, 51, 51, 1);
        position: relative;
    }
    .existImg{
        color: rgba(51, 51, 51, 0.6);
        top: 3.5rem;
        position: absolute;
        width: 100%;
    }
    .notExist img{
        width: 2.375rem;
        height: 2.375rem;
        display: block;
        margin: 0 auto;
        margin-bottom: .3125rem;
    }
    .file{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 99;
    }
</style>