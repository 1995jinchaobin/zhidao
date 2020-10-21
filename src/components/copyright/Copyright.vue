<template>
    <div class="copyright">
        <!--头部-->
        <div class="header">
            <div class="apply">申请版权</div>
            <div class="userName">客户姓名</div>
            <div class="date">日期</div>
            <div class="operate">操作</div>
        </div>
        <!--分类-->
        <div class="classification">
            <div class="classificationAll" :style="{color:selectClassificationIndex==0 ? '#000': '#CACACA'}" @click="selectClassification(0)">全部</div>
            <div class="classificationPersonal" :style="{color:selectClassificationIndex==1 ? '#000': '#CACACA'}" @click="selectClassification(1)">个人</div>
            <div class="classificationCompany" :style="{color:selectClassificationIndex==2 ? '#000': '#CACACA'}" @click="selectClassification(2)">公司</div>
        </div>
        <!--版权信息-->
        <div v-if="copyrightList.length>0" class="copyrightInfo" v-bind:key="index" v-for="(item,index) in copyrightList">
            <!--图片-->
            <div class="copyrightImg"></div>
            <!--用户姓名-->
            <div class="copyrightUserName">{{item.userName}}</div>
            <!--日期-->
            <div class="copyrightDate">{{item.date}}</div>
            <!--操作-->
            <div class="copyrightOperate">
                <div class="btn"><input placeholder="输入快递单号"/></div>
                <div class="btn" @click="showDetail(index)">详细信息</div>
                <div class="btn">下载文件</div>
                <div class="statusSelect">
                    <div @click="showHideStatusSelectBox('statusSelectBox'+index)" class="btn statusSelectBoxChecked">{{statusList[item.status]}}<img src="../../assets/image/copyright/selectDown.png"/></div>
                    <ul :ref="'statusSelectBox'+index" class="statusSelectBox"  style="display: none">
                        <li class="statusSelectBoxItem" @click="changeStatus(index,listIndex)" v-for="(listItem,listIndex) in statusList" v-bind:key="listIndex" v-if="listIndex !=item.status">{{listItem}}</li>
                    </ul>
                </div>
            </div>
            <div class="clear"></div>
            <!--个人信息-->
            <div :ref="'selfInfo'+index" class="selfInfo" >
                <div class="leftFlag"></div>
                <div class="title">个人信息</div>
                <img class="closeBox"  @click="closeSelfBox('selfInfo'+index)" src="../../assets/image/copyright/close.png">
                <div class="selfLine">
                    <div class="leftInfo">姓名</div>
                    <div class="leftText">xxxx</div>
                    <div class="rightInfo">手机号</div>
                    <div class="rightText">xxxx</div>
                </div>
                <div class="selfLine">
                    <div class="leftInfo leftInfoNext">收件地址</div>
                    <div class="leftText leftTextNext">xxxx</div>
                </div>
                <div class="bottomLeftInfo">身份证</div>
                <div class="bottomLeftText"></div>
                <div class="bottomRightText"></div>
            </div>
            <!--公司信息-->
            <div :ref="'companyInfo'+index" class="companyInfo">
                <div class="leftFlag"></div>
                <div class="title">公司信息</div>
                <img class="closeBox" @click="closeCompanyBox('companyInfo'+index)" src="../../assets/image/copyright/close.png">
                <div class="selfLine">
                    <div class="leftInfo">营业执照号</div>
                    <div class="leftText">xxxx</div>
                    <div class="rightInfo">手机号</div>
                    <div class="rightText">13476443567</div>
                </div>
                <div class="selfLine">
                    <div class="leftInfo">公司全称</div>
                    <div class="leftText">xxxx</div>
                    <div class="rightInfo">公司地址</div>
                    <div class="rightText">xxxx</div>
                </div>
                <div class="bottomInfo">复印营业执照并盖章</div>
                <div class="bottomText"></div>
            </div>
        </div>
        <div class="clear"></div>
        <!--分页-->
        <div class="pageArea">
            <ul class="pageBox" v-if="pageNumber!=0">
                <li @click="prev" class="prev"><img src="../../assets/image/copyright/prev.png" alt=""></li>
                <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                <li @click="next" class="next"><img src="../../assets/image/copyright/next.png" alt=""></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Scroll from '../../assets/js/scroll.js';
    export default {
        name: "Copyright",
        data () {
            return {
                copyrightList:[
                    {
                        img: '',
                        userName: '李元芳',
                        date: '2019-10-01',
                        status: 0
                    },
                    {
                        img: '',
                        userName: '李元芳',
                        date: '2019-10-01',
                        status: 1
                    }
                ],
                count: true,
                // 页数
                cnt: 1,
                pageIndex: 1,
                flag: 0,
                // 分页数
                pageNumber: 11,
                page: [],
                //选中的类别：默认为全部
                selectClassificationIndex: 0,
                //快递状态列表
                statusList:['审核中','寄件中','快递中']
            }
        },
        methods: {
            //切换类别选项卡
            selectClassification (index) {
                this.selectClassificationIndex = index
                //请求接口
            },
            //显示隐藏快递状态选择框
            showHideStatusSelectBox (index) {
                let displayString = this.$refs[index][0].style.display=='block' ? 'none' :'block'
                this.$refs[index][0].style.display=displayString
            },
            //改变快递状态
            changeStatus (index,listIndex) {
                this.copyrightList[index].status = listIndex
                let indexRef = 'statusSelectBox'+index
                this.$refs[indexRef][0].style.display='none'
            },
            //显示公司信息和个人信息
            showDetail (index) {
                const companyIndex = 'companyInfo' + index
                const selfIndex = 'selfInfo' + index
                this.$refs[companyIndex][0].style.display='block'
                this.$refs[selfIndex][0].style.display='block'
            },
            //关闭公司信息
            closeCompanyBox (index) {
                this.$refs[index][0].style.display='none'
            },
            //关闭个人信息
            closeSelfBox (index) {
                this.$refs[index][0].style.display='none'
            },
            // 初始化分页器
            pageAuto(){
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
            // 上一页
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
                        // this.getShare(this.message);
                    }
                }else{
                    if(this.cnt!=1){
                        this.cnt--;
                        if(this.pageNumber-this.cnt<=3){
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            this.pageIndex = 7-(this.pageNumber-this.cnt);
                            // this.getShare(this.message);
                        }else if(this.cnt<=4){
                            this.flag = 0;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            // this.getShare(this.message);
                            this.pageIndex = this.cnt;
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            // this.getShare(this.message);
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
                        // this.getShare(this.message);
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
                            // this.getShare(this.message);
                        }else if(this.cnt<=4){
                            this.flag = 0;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            // this.getShare(this.message);
                            this.pageIndex = this.cnt;
                        }else{
                            this.flag = 1;
                            this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                            this.pageIndex = 4;
                            // this.getShare(this.message);
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
            // 分页器每个点击
            btnClick(index){
                let self = this;
                if(this.pageNumber<=7){
                    this.flag = 0;
                    this.cnt = index+1;
                    //this.getShare(this.message);
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
                                //this.getShare(this.message);
                            }else{
                                this.flag = 1;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                //this.getShare(this.message);
                                this.pageIndex = 4;
                            }
                        }else if(index==6){
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            //this.getShare(this.message);
                            this.pageIndex = 7;
                        }else{
                            this.cnt = this.page[index].name;
                            //this.getShare(this.message);
                            this.pageIndex = index+1;
                        }
                    }else if(this.flag==1){
                        if(index==1||index==5) {

                        }else{
                            this.cnt = this.page[index].name;
                            if(this.cnt<=4){
                                // 点击首页
                                this.pageIndex = this.cnt;
                                this.flag = 0;
                                //this.getShare(this.message);
                                this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            }else if((this.pageNumber-this.cnt)<=4){
                                this.pageIndex = 7-(this.pageNumber-this.cnt);
                                this.flag = 2;
                                //this.getShare(this.message);
                                this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            }else{
                                this.flag = 1;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                //this.getShare(this.message);
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
                                //this.getShare(this.message);
                            }else{
                                this.flag = 1;
                                this.pageIndex = 4;
                                this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                                //this.getShare(this.message);
                            }
                        }else if(index==0){
                            this.cnt = this.page[index].name;
                            this.flag = 0;
                            this.pageIndex = 1;
                            this.page = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: '···'},{name: this.pageNumber}];
                            //this.getShare(this.message);
                        }else{
                            this.cnt = this.page[index].name;
                            this.flag = 2;
                            this.pageIndex = 7 - (this.pageNumber - this.cnt);
                            this.page = [{name: 1},{name: '···'},{name: this.pageNumber-4},{name: this.pageNumber-3},{name: this.pageNumber-2},{name: this.pageNumber-1},{name: this.pageNumber}];
                            //this.getShare(this.message);
                        }
                    }
                }
            }
        },
        mounted(){
            this.pageAuto()
        }
    }
</script>

<style scoped>
    .copyright{
        width: 100%;
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Medium;
    }
    /*头部*/
    .copyright .header{
        width: 100%;
        background-color:black;
        float: left;
        line-height: 2.9rem;
    }
    .copyright .header div{
        color: #fff;
        float: left;
        font-size: 0.88rem;
        font-family: SourceHanSansCN-Medium;
    }
    .copyright .apply{
        padding-left: 26.88rem;
    }
    .copyright .userName{
        padding-left: 11rem;
    }
    .copyright .date{
        padding-left: 16.25rem;
    }
    .copyright .operate{
        padding-left: 23.31rem;
    }
    /*分类*/
    .copyright .classification{
        margin-top: 0.8rem;
        color: #000;
        float: left;
        margin-bottom: 1.6rem;
        width: 100%;
        font-family: SourceHanSansCN-Medium;
        font-size: 0.88rem;
        cursor:pointer;
    }
    .copyright .classificationAll{
        margin-left: 23.38rem;
        float: left;
    }
    .copyright .classificationPersonal,.classificationCompany{
        margin-left: 1.81rem;
        float: left;
    }
    /*版权信息*/
    .copyright .copyrightInfo{
        width: 100%;
        float: left;
        line-height: 8.7rem;
        height: 8.7rem;
        border-bottom: 0.13rem solid #B4B4B4;
        font-family: SourceHanSansCN-Medium;
        font-size: 0.88rem;
        color: #050505;
    }
    .copyright .copyrightInfo div{
        float: left;
        font-family: SourceHanSansCN-Medium;
        font-size: 0.88rem;
    }
    .copyright .copyrightInfo .copyrightImg{
        width: 12.25rem;
        height: 6.44rem;
        margin-left: 22.44rem;
        background-color: gray;
        margin-top: 1.2rem;
    }
    .copyright .copyrightInfo .copyrightUserName{
        margin-left: 7.06rem;
        width: 4.5rem;
        text-align: left;
    }
    .copyright .copyrightInfo .copyrightDate{
        margin-left: 14rem;
        width: 5rem;
        text-align: left;
    }
    .copyright .copyrightInfo .copyrightOperate{
        margin-left: 10.63rem;
    }
    .copyright .copyrightInfo .copyrightOperate .btn{
        padding: 0rem 0.44rem;
        border: 1px solid #080102;
        height: 1.7rem;
        line-height: 1.7rem;
        margin-top: 3.35rem;
        margin-right: 0.88rem;
        -webkit-border-radius: 0.3rem;
        -moz-border-radius: 0.3rem;
        border-radius: 0.3rem;
    }
    .copyright .statusSelect{
        width: 4.44rem;
        margin:0 auto;
    }
    .copyright .statusSelectBoxChecked{
        width: 4.44rem;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
    }
    .copyright .statusSelectBox{
        text-align: left;
        border: 1px solid #080102;
        -webkit-border-radius: 0.3rem;
        -moz-border-radius: 0.3rem;
        border-radius: 0.3rem;
        font-size: 0.75rem;
        padding: 0.63rem 0rem 1.19rem 0.38rem;
        float: left;
        line-height: 1.13rem;
        width: 3.93rem;
        margin-left: 0.06rem;
        z-index: 111;
        background-color: #fff;
    }
    .copyright .statusSelect img{
        width: 1rem;
        height: 0.44rem;
    }
    .copyright .statusSelectBoxItem:hover{
        background-color: #F5F5F5;
        cursor:pointer;
    }
    /* 分页 */
    .copyright .pageArea{
        margin: 5rem auto 0;
    }
    ul.pageBox{
        display: flex;
        margin-top: 1.625rem;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.63rem;
        height: 2.63rem;
        font-size: 1.13rem;
        color: #333;
        border:1px solid #000;
        border-radius: 50%;
        margin: 0 .95rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
    }
    ul.pageBox li.click{
        background-color: black;
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
        font-size: 1.25rem;
        border-radius: 1.25rem;
    }
    ul.pageBox li img{
        display: block;
        width: 1.13rem;
        height: 1.94rem;
        margin: .625rem auto;
    }
    .copyright .prev, .copyright .next{
        background: #fff;
        border: none;
        width: 1.13rem;
        height: 1.94rem;
    }
    .copyright .prev{
        margin-right: 1rem;
    }
    .copyright .next{
        margin-left: 1rem;
    }
    .clear{ clear:both; height:0; overflow:hidden;}
    /*个人信息*/
    .copyright .selfInfo, .copyright .companyInfo{
        width: 32.69rem;
        height: 16.63rem;
        background: #FFFFFF;
        border: 1px solid #080102;
        position: relative;
        display: none;
    }
    .copyright .companyInfo{
        right: 31.13rem;
        float: right !important;
        top: -3.49rem;
    }
    .copyright .selfInfo{
        left: 21.38rem;
        top: -3.49rem;
    }
    .copyright .leftFlag{
        width: 1.38rem;
        height: 1.38rem;
        background-color: #000;
        margin: 2rem 0 0 1.31rem;
    }
    .copyright .title{
        margin: 2.19rem 0 0 0.38rem;
        height: 1.38rem;
        line-height: 1.38rem;
    }
    .copyright .closeBox{
        width: 1.2rem;
        height: 1.1rem;
        float: right;
        margin: 0.75rem 1.13rem 0 0 ;
    }
    .copyright .selfLine{
        width: 100%;
    }
    .copyright .leftInfo{
        margin: 1.63rem 0 0 2.31rem;
        width: 5.88rem;
        float: left;
        height: 1.88rem;
        line-height: 1.88rem;
        text-align: left;
    }
    .copyright .leftText{
        margin-top: 1.63rem;
        width: 9.75rem;
        height: 1.88rem;
        line-height: 1.88rem;
        float: left;
        background: #F5F5F5;
        border-radius: 0.4rem;
    }
    .copyright .leftInfoNext{
        margin-top: 0.81rem !important;
    }
    .copyright .leftTextNext{
        margin-top: 0.81rem !important;
    }
    .copyright .rightInfo{
        margin: 1.63rem 0 0 1.44rem;
        width: 4.94rem;
        float: left;
        height: 1.88rem;
        line-height: 1.88rem;
        text-align: left;
    }
    .copyright .rightText{
        margin-top: 1.63rem;
        width: 6.06rem;
        height: 1.88rem;
        line-height: 1.88rem;
        float: left;
        background: #F5F5F5;
        border-radius: 0.4rem;
        font-color: #666666;
    }
    .copyright .bottomInfo{
        margin: 0.56rem 0 0 2.31rem;
        width: 10.94rem;
        float: left;
        height: 4.75rem;
        line-height: 4.75rem;
        text-align: left;
    }
    .copyright .bottomText{
        margin-top: 0.56rem;
        width: 12.75rem;
        height: 4.75rem;
        line-height: 1.88rem;
        float: left;
        background: #F5F5F5;
        border-radius: 0.4rem;
    }
    .copyright .bottomLeftInfo{
        margin: 0.94rem 0 0 2.31rem;
        width: 10.94rem;
        float: left;
        height: 4.75rem;
        line-height: 4.75rem;
        text-align: left;
    }
    .copyright .selfInfo .leftInfo{
        width: 4.94rem !important;
        margin-left: 1.31rem;
        text-align: center;
    }
    .copyright .selfInfo .rightText{
        width: 9.75rem !important;
    }
    .copyright .selfInfo .bottomLeftInfo{
        width: 4.94rem;
        height: 4.81rem;
        line-height: 4.81rem;
        margin-left: 1.31rem;
        text-align: center;
    }
    .copyright .selfInfo .bottomLeftText{
        width: 9.63rem;
        height: 4.81rem;
        margin-top: 0.94rem;
        line-height: 4.81rem;
        float: left;
        background: #F5F5F5;
        border-radius: 0.4rem;
    }
    .copyright .selfInfo .bottomRightText{
        width: 9.63rem;
        height: 4.81rem;
        margin-top: 0.94rem;
        line-height: 1.88rem;
        float: left;
        background: #F5F5F5;
        border-radius: 0.4rem;
        margin-left: 1.63rem;
    }
    .copyrightOperate input{
        border: none;
        margin-top: 0.36rem;
        width: 6.38rem;

    }
    input ::-webkit-input-placeholder { /* WebKit browsers */
        color: #000;
        font-size: 0.88rem;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #000;
        font-size: 0.88rem;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #000;
        font-size: 0.88rem;
    }



</style>