<template>
    <div class="shopthreed">
        <!-- 花型商城3D展示页 -->
        <Tab :path="path" @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
        <div class="content">
            <div class="operateBox">
                <div @click="back" class="backBox">
                    <img src="../../assets/image/3d/backicon.png" alt="">
                    <span>返回</span>
                </div>
                <div class="inputBox">
                    <label for="">
                        <span>上下偏移量：</span>
                        <input @blur="inputClicky" @keyup.enter="inputClicky" v-model="rotateY" type="text">
                    </label>
                    <label for="">
                        <span>左右偏移量：</span>
                        <input @blur="inputClickx" @keyup.enter="inputClickx" v-model="rotateX" type="text">
                    </label>
                </div>
                <div class="pointBox">
                    <span @click="directionClick('top')" class="top"></span>
                    <div class="infeed">
                        <span @click="directionClick('left')" class="left"></span>
                        <span @click="directionClick('right')" class="right"></span>
                    </div>
                    <span @click="directionClick('bottom')" class="bottom"></span>
                </div>
            </div>
            <div class="imgBox">
                <img :src="picture" alt="">
            </div>
            <div class="upBox">
                <span>放大</span>
                <div class="line">
                    <span @mousedown="pull($event)" @mouseup="push($event)">
                        <span class="case">{{ratio}}</span>
                    </span>
                </div>
                <span>缩小</span>
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
    name: 'Shopthreed',
    components: {
        Tab,
        Loading,
        Jump
    },
    data(){
        return {
            path: '/Shopthreed',
            showJump: false,
            err: '',
            tabIndex: null,
            showLoading: false,
            id: '',
            proList: [],
            // 操作的图片
            picture: '',
            list: [],
            cnt: 1,
            pageNumber: '',
            // 图片显示
            backImg: '',
            rotateX: '',
            rotateY: '',
            ratio: 1,
            selectFlag: 0
        }
    },
    methods: {
        inputClicky(){
            let self = this;
            if(parseFloat(this.rotateY)>1||parseFloat(this.rotateY)<0){
                this.showJump = true;
                this.err = '偏移量范围在0-1之间';
                this.rotateY = 0;
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else{
                let o = {};
                o.rotateY = this.rotateY;
                o.rotateX = this.rotateX;
                o.ratio = this.ratio;
                this.compose(o);
            }
        },
        inputClickx(){
            let self = this;
            if(parseFloat(this.rotateX)>1||parseFloat(this.rotateX)<0){
                this.showJump = true;
                this.err = '偏移量范围在0-1之间';
                this.rotateX = 0;
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                },1500);
            }else{
                let o = {};
                o.rotateY = this.rotateY;
                o.rotateX = this.rotateX;
                o.ratio = this.ratio;
                this.compose(o);
            }
        },
        changeEnglish(){
            this.$router.go(0);
        },
        pull(event){
            var prevent;
            var self = this;
            if(self.backImg){
                var event=event || window.event;
                var _target = event.target;
                var startx = event.clientX;
                var starty = event.clientY;
                var roundX = startx-event.target.offsetLeft;
                var roundY = starty-event.target.offsetTop;
                var width = document.documentElement.clientWidth;
                var height = window.innerHeight;
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue=false;
                };
                document.onmousemove = function(ev){
                    var event=ev || window.event;
                    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
                    if(event.clientY<0||event.clientX<0||event.clientY>height){
                        return false;
                    };
                    var endy = event.clientY-roundY;
                    var endx = event.clientX-roundX;
                    if(endx<-20||endx>5){
                        self.push();
                    }
                    if(endy<0||endy>376){
                        if(endy<0){
                            self.ratio = 2;
                        }else{
                            self.ratio = 0;
                        }
                        self.push();
                    }else{
                        _target.style.top = endy+'px';
                        prevent = 1-(endy)/376;
                        self.ratio = (prevent*2).toFixed(2);
                    }
                }
            }
        },
        move(event){

        },
        push(){
            let self = this;
            var o = {};
            o.rotateY = this.rotateY;
            o.rotateX = this.rotateX;
            o.ratio = this.ratio;
            self.compose(o);
            document.onmousemove = null;
        },
        // 方向键点击
        directionClick(direction){
            let self = this;
            let o = {};
            let speed = 0.2;
            if(!this.rotateX){
                this.rotateX = 0.00;
            }
            if(!this.rotateY){
                this.rotateY = 0.00;
            }
            this.rotateX = parseFloat(this.rotateX);
            this.rotateY = parseFloat(this.rotateY);
            if(direction=='top'){
                let num = parseFloat(this.rotateY - speed).toFixed(2);
                if(num<0){
                    this.rotateY = (this.rotateY).toFixed(2);
                    this.showJump = true;
                    this.err = '偏移量范围在0~1之间';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }else{
                    this.rotateY = num;
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }else if(direction=='left'){
                let num = parseFloat(this.rotateX - speed).toFixed(2);
                if(num<0){
                    this.rotateY = (this.rotateX).toFixed(2);
                    this.showJump = true;
                    this.err = '偏移量范围在0~1之间';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }else{
                    this.rotateX = num;
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }else if(direction=='right'){
                let num = parseFloat(this.rotateX + speed).toFixed(2);
                if(num>1){
                    this.rotateX = (this.rotateX).toFixed(2);
                    this.showJump = true;
                    this.err = '偏移量范围在0~1之间';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }else{
                    this.rotateX = num;
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }else if(direction=='bottom'){
                let num = parseFloat(this.rotateY + speed).toFixed(2);
                if(num>1){
                    this.rotateY = (this.rotateY).toFixed(2);
                    this.showJump = true;
                    this.err = '偏移量范围在0~1之间';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }else{
                    this.rotateY = num;
                    o.rotateY = this.rotateY;
                    o.rotateX = this.rotateX;
                    o.ratio = this.ratio;
                    this.compose(o);
                }
            }
        },
        // 图片点击
        listClick(index){
            this.id = this.proList[index].id
            this.compose();
        },
        // 图片合成接口
        compose(o){
            this.showLoading = true;
            let self = this;
            Scroll.stop();
            let formData = new FormData();
            if(o){
                // 缩放
                if(o.ratio){
                    formData.append('ratio',o.ratio);
                }
                // 左右偏移
                if(o.rotateX){
                    formData.append('rotateX',o.rotateX);
                }
                // 上下偏移
                if(o.rotateY){
                    formData.append('rotateY',o.rotateY);
                }
            }
            formData.append('imageUrl',this.backImg);
            formData.append('templateId',this.id);
            let obj = {
                url: this.all.baseUrl + '/template2d/compose',
                formdata: formData
            }
            this.getData(obj).then( res => {
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                Scroll.move();
                if(res.data.status==0){
                    this.picture = res.data.result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '您的账号已在其它地方登录';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 返回
        back(){
            let self = this;
            localStorage.setItem('selectType',2);
            let json = JSON.parse(localStorage.getItem('shopthreeList'));
            let leftIndex=0,classifyIndex=0;
            if(json.leftIndex){
                leftIndex = json.leftIndex;
            }
            if(json.classifyIndex){
                classifyIndex = json.classifyIndex;
            }
            this.proList.map(function(item){
                if(item.id==self.id){
                    item.backgroudImage = self.picture;
                }
            });
            var newType;
            if(this.tabIndex == 7){
                newType = 1;
            }else{
                newType = 2;
            }
            let newJson = {
                list: json.list,
                backImg: this.backImg,
                proList: this.proList,
                leftIndex: leftIndex,
                classifyIndex: classifyIndex,
                type: 2,
                newList: json.newList,
                newType: newType,
                cnt: json.cnt
            }
            localStorage.setItem('shopthreeNewjson',JSON.stringify(newJson));
            this.$router.push({
                path: '/Shopselect'
            });
        }
    },
    created(){
        let newType = localStorage.getItem('newType');
        if(newType==1){
            this.tabIndex = 7;
        }else{
            this.tabIndex = 3;
        }
        this.$forceUpdate();
    },
    mounted(){
        let json = JSON.parse(localStorage.getItem('shopthreeList'));
        this.backImg = json.backImg;
        this.picture = json.picture;
        this.id = json.id;
        this.proList = json.proList;
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enshopthreed'
            });
        }else{
            this.$router.push({
                path: '/Shopthreed'
            });
        }
    }
}
</script>
<style scoped>
    .shopthreed{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        display: flex;
        justify-content: center;
    }
    .backBox{
        margin-top: 1.875rem;
        display: flex;
        align-items: center;
        margin-left: 1.25rem;
        font-size: 1rem;
        color: #585858;
        cursor: default;
    }
    .backBox img{
        display: block;
        width: .625rem;
        margin-right: .5rem
    }
    .inputBox{
        margin-top: 16.25rem;
        margin-left: 5.625rem;
    }
    .inputBox label{
        display: block;
        font-size: 1.125rem;
        color: #333;
        margin-bottom: .875rem;
        display: flex;
        align-items: center;
    }
    .inputBox input{
        width: 14rem;
        height: 1.875rem;
        margin-left: .25rem;
        background: #fff;
        border: none;
        outline: none;
        border-radius: .9375rem;
        box-sizing: border-box;
        padding-left: 1.4rem;
    }
    .pointBox{
        margin-top: 3.875rem;
        margin-left: 9.375rem;
    }
    .pointBox span{
        background: #fff url('../../assets/image/3d/top.png') no-repeat center;
        background-size: 1.4375rem .875rem;
        width: 3.375rem;
        border-radius: 50%;
        display: block;
        height: 3.375rem;
        margin-bottom: .875rem;
    }
    .pointBox span:hover{
        background: #133ffc url('../../assets/image/3d/whitetop.png') no-repeat center;
        background-size: 1.4375rem .875rem;
    }
    .pointBox span.top,
    .pointBox span.bottom{
        margin-left: 4.3125rem;
    }
    .pointBox span.left{
        transform: rotate(-90deg);
    }
    .pointBox span.right{
        transform: rotate(90deg);
        margin-left: 5.125rem;
    }
    .pointBox span.bottom{
        transform: rotate(180deg);
    }
    .infeed{
        display: flex;
    }
    .imgBox{
        position: relative;
        margin-left: 4.375rem;
        margin-top: 6.875rem;
        background: #fff;
        height: 49.25rem;
        width: 32.6875rem;
        border-radius: .625rem;
        overflow: hidden;
    }
    .imgBox img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .upBox{
        margin-left: 13.5625rem;
        font-size: .75rem;
        color: #8d8d8d;
        margin-top: 13.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .upBox>span{
        margin: .5rem;
        display: block;
    }
    .line{
        width: 4px;
        height: 400px;
        position: relative;
        background: #ff9d4c;
    }
    .line>span{
        position: absolute;
        width: 24px;
        height: 24px;
        top: 188px;
        left: calc(50% - 12px);
        border-radius: 50%;
        background: #ff9d4c;
    }
    .line>span:after{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        top: 2px;
        left: 2px;
    }
    .line>span:hover .case{
        display: block;
    }
    .case{
        position: absolute;
        width: 4rem;
        top: 0;
        right: -5rem;
        display: none;
        background: #fff;
        height: 1.5rem;
        border-radius: .75rem;
        color: #333;
        font-size: .75rem;
        text-align: center;
        line-height: 1.5rem;
    }
    .case:after{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: .3rem;
        left: -.2rem;
        border-width: 0 .625rem .625rem;
        border-style: solid;
        transform: rotate(-45deg);
        border-color: transparent transparent transparent #fff;
    }
</style>