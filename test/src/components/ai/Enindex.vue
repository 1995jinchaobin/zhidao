<template>
    <div class="ai">
        <!-- AI设计 -->
        <Entab :path='path' @showEnglish="changeEnglish" :tabIndex="tabIndex"></Entab>
        <div class="content">
            <div class="smallBox">
                <div class="classify">
                    <h4>Type：</h4>
                    <ul class="classBox">
                        <li @mouseenter="downType(index)" @mouseleave="upType(index)" :class="typeItem.active?'click':''" v-for="(typeItem,index) in classifyList.type" :key="'type-'+index">
                            <span :style="{'z-index': 99-index}" @click="clickType(index)">{{typeItem.english}}</span>
                            <div v-if="typeItem.list.length" :style="{display: typeItem.show?'block':'none','z-index': 98-index}" class="listBox">
                                <span :class="listItem.active?'click':''" v-for="(listItem,listIndex) in typeItem.list" :key="'list'+listIndex">
                                    <span  id="leixingtongji"  @click="updateMessage(index,listIndex)">{{listItem.english}}</span>
                                    <div class="numList">
                                        <p @click="numClick(index,listIndex,numIndex)" :class="numItem.show?'click':''" v-for="(numItem,numIndex) in listItem.numArr" :key="'num'+numIndex">{{numItem.num}}</p>
                                    </div>
                                </span>
                            </div>
                        </li>
                        <li @click="add(0)"><img style="width: 1.6875rem;" src="../../assets/image/ai/add.png" alt=""></li>
                    </ul>
                </div>
                <div class="classify">
                    <h4>Style：</h4>
                    <ul class="classBox">
                        <li :class="item.active?'click':''" v-for="(item,index) in classifyList.style" :key="'style-'+index">
                            <span  id="fenggetongji"  @click="clickStyle(index)" style="z-index: 6;">{{item.english}}</span>
                        </li>
                    </ul>
                </div>
                <div class="classify">
                    <h4>Shade：</h4>
                    <ul class="classBox">
                        <li :class="item.active?'click':''" v-for="(item,index) in classifyList.shading" :key="'style-'+index">
                            <span  id="diwentongji" @click="clickShading(index)" style="z-index: 6;">{{item.english}}</span>
                        </li>
                        <li @click="add(1)"><img style="width: 1.6875rem;" src="../../assets/image/ai/add.png" alt=""></li>
                    </ul>
                </div>
            </div>
            <div v-if="showContent" class="shareBox">
                <ul v-if="list.length" class="proBox">
                    <li :style="{background: item.background?'url('+item.background+') no-repeat center':'#fff','background-size': '300px 450px'}" v-for="(item,index) in list" :key="'product'+index">
                        <div v-for="(childItem,childIndex) in item.elements" :key="'list'+childIndex" :style="{width: childItem.width*300/4724+'px','z-index': childItem.cnt,left: parseFloat(childItem.left)/2+'px',top: parseFloat(childItem.top)/2+'px',transform: 'scale('+childItem.zoom+')'}" class="proList">
                            <img :style="{width: childItem.width*300/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}" :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
                        </div>
                        <div class="operateBox">
                            <div @click="download(index)" class="operate">
                                <img src="../../assets/image/flower/download.png" alt="">
                            </div>
                            <div @click="look(index)" class="operate">
                                <img src="../../assets/image/flower/looks.png" alt="">
                            </div>
                            <div @click="save(index)" class="operate">
                                <img src="../../assets/image/flower/saves.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="conBox" v-if="!showContent">Please select the category first</p>
        </div>
        <div class="bigModel" v-if="showLook">
            <div class="grabBox" v-if="showGrab">
                <h3>Tigs</h3>
                <p class="del" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <span>Enterprise VIP opening authority, whether to recharge VIP?</span>
                <div class="grabWay">
                    <button @click="wayClick(1)">Cancel</button>
                    <button @click="wayClick(2)">Determine</button>
                </div>
            </div>
            <div class="picBox specialPic" v-if="showPic">
                <p class="picDel" @click="delLook">
                    <img src="../../assets/image/login/close.png" alt="">
                </p>
                <div class="linkBox">
                    <ul v-for="(bigItem,bigIndex) in 4" :key="bigIndex">
                        <li :style="{background: list[i].background?'url('+list[i].background+') no-repeat center':'#fff','background-size': '100% 100%'}" class="proList">
                            <div v-for="(item,index) in list[i].elements" :key="index" :style="{width: item.width*600/4724/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',transform: 'scale('+item.zoom+')'}">
                                <img :style="{width: item.width*600/4724/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}" :src="item.picture" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bigModel" v-if="showModel">
            <div class="modelBox">
                <img @click="modelClose" class="modelClose" src="../../assets/image/login/close.png" alt="">
                <ul class="productBox" v-if="proList.length">
                    <li @click="toDetail(index)" v-for="(item,index) in proList" :key="index">
                        <img class="productImg" :src="item.pictureThumbnail" alt="">
                        <input v-if="sourceIndex==1" :checked="item.show" type="checkBox">
                        <input :checked="item.show" v-if="sourceIndex==3" type="checkBox">
                        <span></span>
                    </li>
                </ul>
                <p class="productBox" style="justify-content: center;font-size: 1.2rem;line-height: 40rem;" v-else>No {{title}},Upload</p>
                <div class="oPage">
                    <ul class="pageBox" v-if="pageNumber!=0">
                        <li @click="prev"><img src="../../assets/image/cut/left.png" alt=""></li>
                        <li @click="btnClick(index)" :class="index==pageIndex-1?'click':''" v-for="(item,index) in page" :key="index">{{item.name}}</li>
                        <li @click="next"><img src="../../assets/image/cut/right.png" alt=""></li>
                    </ul>
                    <div class="oBox">
                        <span @click="sureClick" class="sureBtn">Determine</span>
                        <div class="oUp">
                            <span>Upload</span>
                            <input type="file" @change="addSource">
                        </div>
                        <span @click="cancel">Cancel</span>
                    </div>
                </div>
            </div>
        </div>
        <Jump v-if="showJump" :title="err"></Jump>
        <Loading v-if="showLoading"></Loading>
    </div>
</template>
<script>
import Entab from '../../components/Entab';
import Jump from '../../components/Jump';
import Loading from '../../components/Loading';
import Scroll from '../../assets/js/scroll.js';
let date = new Date();
export default {
    name: 'Enai',
    components: {
        Entab,
        Loading,
        Jump
    },
    data(){
        return {
            tabIndex: 2,
            showJump: false,
            err: '',
            user: {},
            showLoading: false,
            showContent: false,
            // 右侧顶部选项按钮
            classifyList: {
                type: [],
                style: [],
                shading: []
            },
            // 存储请求数据需要传入后台的信息
            message: {
                backType: '',
                data: {
                    list: [],
                    style: '0'
                },
                element: {
                    elements: []
                },
                backArr: []
            },
            // 商品数据
            list: [],
            i: '',
            // 连晒
            showLook: false,
            showGrab: false,
            showPic: false,
            path: '/Enai',
            showModel: false,
            cnt: 1,
            pageNumber: '',
            proList: [],
            flag: 0,
            page: [],
            pageIndex: 1,
            url: [],
            sourceIndex: 1,
            // 判断弹窗index
            index: 0,
            mineFlag: false,
            title: ''
        }
    },
    methods: {
        add(index){
            localStorage.removeItem('cnt');
            if(index!=this.index){
                localStorage.setItem('cnt',1);
            }else{
                localStorage.setItem('cnt',this.pageIndex);
            }
            this.index = index;
            this.cnt = 1*(localStorage.getItem('cnt'));
            this.page = [];
            this.pageIndex = 1*(localStorage.getItem('cnt'));
            this.flag = 0;
            this.proList = [];
            this.pageNumber = '';
            this.showModel = true;
            if(index==0){
                this.sourceIndex = 1;
                this.title = 'Source';
                this.getProlist();
            }else{
                this.sourceIndex = 3;
                this.title = 'Shading';
                this.getProlist();
            }
        },
        cancel(){
            this.proList.map(function(item,index){
                item.show = false;
            });
            if(this.sourceIndex==1){
                localStorage.removeItem('indexArr');
            }else{
                localStorage.removeItem('backArr');
            }
            this.$forceUpdate();
        },
        modelClose(){
            this.showModel = false;
        },
        toDetail(index){
            let self = this;
            let arr = [];
            this.proList[index].show = !this.proList[index].show;
            this.proList.map(function(item,index){
                if(item.show){
                    arr.push(item.id);
                }
            });
            if(this.sourceIndex==1){
                localStorage.setItem('indexArr',arr);
            }else if(this.sourceIndex==3){
                localStorage.setItem('backArr',arr);
            }
            this.$forceUpdate();
        },
        // 点击确定
        sureClick(){
            let self = this;
            if(this.sourceIndex==1){
                self.message.element.elements = [];
                this.proList.map(function(item,index){
                    if(item.show){
                        self.message.element.elements.push({
                            pictureThumbnail: item.picture,
                            id: 0
                        });
                    }
                });
                self.$forceUpdate();
                this.showModel = false;
                this.list = [];
                this.toNew();
            }
            if(this.sourceIndex==3){
                this.classifyList.shading.map(function(item){
                    item.active = false;
                });
                self.message.backType = '';
                self.message.backArr = [];
                this.proList.map(function(item,index){
                    if(item.show){
                        self.message.backArr.push(item.picture);
                    }
                });
                self.$forceUpdate();
                this.showModel = false;
                this.list = [];
                this.toNew();
            }
        },
        // 数量点击
        numClick(index,listIndex,numIndex){
            this.classifyList.type[index].list[listIndex].numArr.map(function(item){
                item.show = false;
            });
            // this.
            this.classifyList.type[index].list[listIndex].numArr[numIndex].show = true;
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list[listIndex].active = true;
            this.list = [];
            this.toNew();
            this.$forceUpdate();
        },  
        // 上传素材
        addSource(e){
            this.url = [];
            let self = this;
            let files = e.target.files;
            for(let i=0;i<files.length;i++){
                this.url.push(e.target.files[i]);
            }
            if (!e || !window.FileReader) return; // 看支持不支持FileReader
            this.url.map(function(item,index){
                if(self.sourceIndex==1){
                    if(self.url[index].name.substring(self.url[index].name.length-3,self.url[index].name.length)!='png'){
                        self.showJump = true;
                        self.err = 'Only upload PNG format pictures';
                        Scroll.stop();
                        setTimeout(function(){
                            Scroll.move();
                            self.showJump = false;
                            self.err = '';
                        },2000);
                        return;
                    }
                }
                let reader = new FileReader();
                reader.readAsDataURL(item); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function(){
                    // 增加一个
                    self.showLoading = true;
                    let formData = new FormData();
                    formData.append('file',item);
                    let obj = {
                        url: self.all.baseUrl + '/file/upload',
                        formdata: formData
                    }
                    self.getData(obj).then(res=>{
                        self.upSource(res.data.result);
                    });
                }
            });
        },
        upSource(str){
            let formData = new FormData();
            let self = this;
            formData.append('picture',str);
            formData.append('type1',this.sourceIndex);
            let obj = {
                url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                self.showLoading = false;
                if(res.data.status == 0){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = 'New Success';
                    this.proList = [];
                    this.cnt = 1;
                    this.pageNumber = 1;
                    this.page = [];
                    this.flag = 0;
                    this.pageIndex = 1;
                    this.getProlist();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    Scroll.stop();
                    this.err = res.data.msg;
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        getProlist(){
            let self = this;
            let formData = new FormData();
            let obj = {}
            this.showLoading = true;
            Scroll.stop();
            formData.append('pageSize',8);
            formData.append('page',this.cnt);
            formData.append('status',0);
            formData.append('type1',this.sourceIndex);
            obj.url = this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list';
            obj.formdata = formData;
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                let result;
                if(res.data.status==0){
                    result = res.data.result;
                    this.proList = result.list;
                    let str = '';
                    let arr = [];
                    if(this.sourceIndex==1&&localStorage.getItem('indexArr')){
                        str = localStorage.getItem('indexArr');
                        arr = str.split(',');
                    }else{
                        str = localStorage.getItem('backArr');
                        arr = str.split(',');
                    }
                    this.proList.map(function(item,index){
                        if(arr.length){
                            arr.map(function(arrItem,arrIndex){
                                if(arrItem==item.id){
                                    item.show = true;
                                }
                            });
                        }else{
                            item.show = false;
                        }
                    });
                    this.pageNumber = result.pages;
                    this.pageAuto();
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = '';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = 'Your account has landed elsewhere';
                        localStorage.clear();
                        Scroll.move();
                        self.$router.push({
                            path: '/Login'
                        });
                    });
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    });
                }
            });
        },
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
        // 上一页
        prev(){
            let self = this;
            if(this.pageNumber<=7){
                this.flag = 0;
                if(this.cnt==1){
                    this.showJump = true;
                    this.err = "It's the first page";
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
                        this.pageIndex = this.cnt;
                        this.getProlist();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getProlist();
                    }
                }else{
                    this.showJump = true;
                    this.err = "It's the first page";
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
                    this.err = "It's the last page";
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
                        this.pageIndex = this.cnt;
                        this.getProlist();
                    }else{
                        this.flag = 1;
                        this.page = [{name: 1},{name: '···'},{name: this.cnt-1},{name: this.cnt},{name: this.cnt+1},{name: '···'},{name: this.pageNumber}];
                        this.pageIndex = 4;
                        this.getProlist();
                    }
                }else{
                    this.showJump = true;
                    this.err = "It's the last page";
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            }
        },
        changeEnglish(){
            this.$router.go(0);
        },
        // 保存
        save(index){
            this.showLoading = true;
            this.list[index].elements.map(function(item){
                item.imageUrl = item.picture;
            });
            let self = this;
            let element = [];
            let filp = [];
            this.list[index].elements.map(function(item,i){
                if(item.rotateX/180%2==1&&item.rotateY/180%2==0){
                    filp[i] = 1;
                }else if(item.rotateY/180%2==1&&item.rotateX/180%2==0){
                    filp[i] = 2;
                }else{
                    filp[i] = 0;
                }
                let o = {
                    imageUrl: item.picture,
                    flip: filp[i],
                    posX: item.posX,
                    posY: item.posY,
                    id: item.id,
                    order: item.order,
                    width: item.width*600/4724,
                    height: item.height*900/7087,
                    zoom: item.zoom,
                    rotation: item.rotateZ
                };
                element.push(o);
            });
            let formData = new FormData();
            let json = {
                elements: element
            }
            if(this.list[index].backId){
                json.background = this.list[index].background;
                json.backId = this.list[index].backId;
            }else{
                if(this.message.backArr.length){
                    json.background = this.list[index].background;
                }else{
                    json.background = '';
                }
            }
            formData.append("cartStatus",0);
            formData.append("myStatus",0);
            formData.append("sourceFile",JSON.stringify(json));
            formData.append("resolutionRatio",300);
            formData.append("sizeHeight",60);
            formData.append("sizeWidth",40);
            formData.append("format","png");
            formData.append("hierarchy",0);
            let obj = {
                url: this.all.baseUrl + '/app3dFlowerTypeJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                },500);
                if(res.data.status==0){
                    this.newSave(res.data.result.id);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        newSave(str){
            let self = this;
            let formData = new FormData();
            formData.append('myStatus',1);
            formData.append('targetId',str);
            let arr = [];
            // 商城花型
            let obj = {
                url: this.all.baseUrl+'/app3dFlowerTypeShoppingCartJyg/save',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    this.showJump = true;
                    this.err = 'Saved to my pattern';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        // 连晒预览
        look(index){
            this.i = index;
            this.showLook = true;
            this.showGrab = false;
            this.showPic = true;
        },
        delLook(){
            this.showLook = false;
            this.showGrab = false;
            this.showPic = false;
        },
        wayClick(index){
            if(index==1){
                this.showLook = false;
                this.showGrab = false;
                this.showPic = false;
            }else if(index==2){
                this.$router.push({
                    path: '/Envip'
                });
            }
        },
        // 鼠标移入移出点击效果
        downType(index){
            this.classifyList.type.map(function(item){
                item.show = false;
            });
            this.classifyList.type[index].show = true;
            this.$set(this.classifyList.type,index,this.classifyList.type[index]);
        },
        upType(index){
            this.classifyList.type.map(function(item){
                item.show = false;
            });
            this.$set(this.classifyList.type,index,this.classifyList.type[index]);
        },
        clickType(index){
            this.list = [];
            let self = this;
            this.classifyList.type[index].active = !this.classifyList.type[index].active;
            if(!this.classifyList.type[index].active){
                this.classifyList.type[index].list.map(function(item){
                    item.active = false;
                    item.numArr.map(function(child){
                        child.show = false;
                    });
                });
            }
            this.toNew();
        },
        // 点击每个下拉列表里的内容
        updateMessage(index,listIndex){
            // _czc.push(["_trackEvent","点击每个下拉列表里的内容","操作","","","leixingtongji"]);
            this.classifyList.type[index].list[listIndex].numArr.map(function(item){
                item.show = false;
            });
            this.classifyList.type[index].active = true;
            this.classifyList.type[index].list[listIndex].active = !this.classifyList.type[index].list[listIndex].active;
            this.list = [];
            this.toNew();
        },
        // 风格点击
        clickStyle(index){
            // _czc.push(["_trackEvent","风格点击","操作","","","fenggetongji"]);
            this.list = [];
            this.classifyList.style.map(function(item,mapIndex){
                if(mapIndex!=index){
                    item.active = false;
                }
            });
            this.classifyList.style[index].active = !this.classifyList.style[index].active;
            if(this.classifyList.style[index].active==true){
                this.message.data.style = this.classifyList.style[index].id;
            }else{
                this.message.data.style = '0';
            }
            this.toNew();
        },
        // 底纹点击
        clickShading(index){
            // _czc.push(["_trackEvent","底纹点击","操作","","","diwentongji"]);
            this.list = [];
            this.classifyList.shading.map(function(item){
                item.active = false;
            });
            this.message.backArr = [];
            this.classifyList.shading[index].active = true;
            this.message.backType = this.classifyList.shading[index].id;
            this.toNew();
        },
        toNew(){
            let self = this;
            let flag = [];
            let childFlag = [];
            self.message.data.list = [];
            this.classifyList.type.map(function(item,i){
                flag[i] = 0;
                if(item.active){
                    item.list.map(function(child,j){
                        if(child.active){
                            flag[i] = 1;
                            childFlag[j] = 0;
                            // if(self.)
                            child.numArr.map(function(son,k){
                                if(son.show){
                                    childFlag[j] = 1;
                                    for(let m=0;m<son.num;m++){
                                        self.message.data.list.push(child.id+item.id*100);
                                    }
                                }
                            });
                            if(!childFlag[j]){
                                self.message.data.list.push(child.id+item.id*100);
                            }
                        }
                    });
                    if(!flag[i]){
                        self.message.data.list.push(item.id*100);
                    }
                }
                self.$forceUpdate();
            });
            if(!this.message.data.list.length&&!this.message.element.elements.length){
                this.showLoading = false;
                this.showJump = true;
                Scroll.stop();
                this.err = '请先选择类别';
                setTimeout(function(){
                    self.showJump = false;
                    self.err = '';
                    Scroll.move();
                },1500);
            }else{
                if(this.getMessage()){
                    this.showLook = true;
                    this.showGrab = true;
                    this.showPic = false;
                }else{
                    this.getList();
                }
            }
        },
        // 滚动加载数据
        loadData(){
            window.onscroll = ()=>{
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 50;
                if(bottomOfWindow && this.mineFlag){
                    this.mineFlag = false;
                    this.getList();
                }
            }
        },
        getList(){
            this.showLoading = true;
            Scroll.stop();
            let self = this;
            let formData = new FormData();
            formData.append('templateNum',10);
            if(this.message.backType){
                formData.append('type1',this.message.backType);
            }
            formData.append('data',JSON.stringify(this.message.data));
            let obj = {
                url: this.all.baseUrl + '/auto/templates',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                setTimeout(function(){
                    self.showLoading = false;
                    Scroll.move();
                },500);
                if(res.status==200&&!res.data.status){
                    this.showContent = true;
                    this.mineFlag = true;
                    let cnt;
                    let resultList = res.data.list;
                    let conList = [];
                    if(self.message.element.elements.length){
                        for(let m=0;m<10;m++){
                            let ran = Math.floor(Math.random()*(self.message.element.elements.length));
                            conList.push({
                                pictureThumbnail: self.message.element.elements[ran].pictureThumbnail,
                                id: self.message.element.elements[ran].id,
                                my: self.message.element.elements[ran].my
                            });
                        }
                        self.message.element.elements = conList;
                        resultList = resultList.concat(self.message.element);
                    }
                    let resultTemp = res.data.templates;
                    let resultShadings;
                    if(res.data.shadings){
                        resultShadings = res.data.shadings;
                    }
                    resultTemp.map(function(item,i){
                        let tempItem = [];
                        let temp = JSON.parse(item.templateData);
                        for(let k=0;k<temp.elements.length;k++){
                            tempItem.push(temp.elements[k]);
                        }
                        let result = {};
                        if(res.data.shadings){
                            result.background = resultShadings[i].pictureThumbnail;
                            result.backId = resultShadings[i].id;
                        }else{
                            result.backId = '';
                            if(self.message.backArr.length){
                                let m = Math.floor(Math.random()*(self.message.backArr.length));
                                result.background = self.message.backArr[m];
                            }else{
                                result.background = '';
                            }
                        }
                        let index=0;
                        result.elements=[];
                        while(tempItem.length!=0){
                            cnt = Math.floor((tempItem.length)*Math.random());
                            let e = tempItem[cnt];
                            e.imageUrl=resultList[index%resultList.length].elements[i].pictureThumbnail;
                            e.id=resultList[index%resultList.length].elements[i].id;
                            e.picture = e.imageUrl;
                            e.pictureWidth=e.width;
                            e.pictureHeight=e.height;
                            e.isCreate = [];
                            e.order=cnt;
                            for(let i=0;i<8;i++){
                                e.isCreate[i] =false;
                            }
                            e.elements=[];
                            for(let i=0;i<8;i++)
                            {
                                e.elements[i]='';
                            }
                            if(e.flip==0){
                                e.rotateX = 0;
                                e.rotateY = 0;
                            }else if(e.flip==1){
                                e.rotateX = 180;
                                e.rotateY = 0;
                            }else if(e.flip==2){
                                e.rotateX = 0;
                                e.rotateY = 180;
                            }
                            e.width = parseFloat(e.width*4724/600);
                            e.height = e.width*e.pictureHeight/e.pictureWidth;
                            // e.height = parseFloat(e.height*7087/900);
                            e.rotateZ = e.rotation;
                            e.left = e.posX - parseFloat(e.width/2/4724*600) + 'px';
                            e.top = e.posY - parseFloat(e.height/2/7087*900) + 'px';
                            e.show = false;
                            e.showEye = true;
                            tempItem.splice(cnt,1);
                            result.elements.push(e);
                            index++;
                        }
                        self.judge(result);
                        self.list.push(result);
                    });
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 判断
        judge(obj){
            let self = this;
            obj.elements.map(function(item,index){
                let posx,posy;
                let order=item.order;
                let cosWidth = Math.abs((item.width/2*600/4724)*Math.cos(item.rotateZ/180.0*Math.PI))+Math.abs((item.height/2*900/7087)*Math.sin(item.rotateZ/180.0*Math.PI));
                let cosHeight = Math.abs((item.height/2*900/7087)*Math.cos(item.rotateZ/180.0*Math.PI))+Math.abs((item.width/2*600/4724)*Math.sin(item.rotateZ/180.0*Math.PI));
                cosWidth*=item.zoom;
                cosHeight*=item.zoom;
                if(item.posX-cosWidth<0&&!item.isCreate[0]){
                    item.isCreate[0]=true;
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[7]){
                            return;
                        }
                        item.elements[3].isCreate[7] = true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[5]){
                            return;
                        }
                        item.elements[2].isCreate[5] = true;
                    }
                    posx = item.posX + 600;
                    posy = item.posY;
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[1]=item;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        flip: item.flip,
                        rotation: item.rotation,
                        id: item.id,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        my: item.my,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate: iscreate
                    });
                }
                if(item.posX+cosWidth>600&&!item.isCreate[1]){
                    item.isCreate[1]=true;
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[6]){
                            return;
                        }
                        item.elements[3].isCreate[6] = true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[4]){
                            return;
                        }
                        item.elements[2].isCreate[4] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[0]=true;
                    let elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[0]=item;
                    posx = item.posX- 600;
                    posy = item.posY; ;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        my: item.my,
                        id: item.id,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY+cosHeight>900&&!item.isCreate[2]){
                    item.isCreate[2]=true;
                    if (item.elements[1]){
                        if(item.elements[1].isCreate[7]){
                            return;
                        }
                        item.elements[1].isCreate[7] = true;
                    }
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[6]){
                            return;
                        }
                        item.elements[0].isCreate[6] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] = false;
                    }
                    iscreate[3] = true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[3] = item;
                    posx = item.posX ;
                    posy = item.posY-900; 
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        my: item.my,
                        id: item.id,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                
                }
                if(item.posY-cosHeight<0&&!item.isCreate[3]){
                    item.isCreate[3]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[5]){
                            return;
                        }
                        item.elements[1].isCreate[5]=true;
                    }
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[4]){
                            return;
                        }
                        item.elements[0].isCreate[4] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[2]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i] = '';
                    }
                    elements[2] = item;
                    posx = item.posX ;
                    posy = item.posY+900 ;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        id: item.id,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        posY: posy,
                        my: item.my,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY-cosHeight<0&&item.posX+cosWidth>600&&!item.isCreate[4]){
                    item.isCreate[4]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[3]){
                            return;
                        }
                        item.elements[1].isCreate[3] = true;
                    }
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[1]){
                            return;
                        }
                        item.elements[3].isCreate[1]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[7]=true;
                    iscreate[2]=true; 
                    iscreate[0]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i] = '';
                    }
                    elements[7] = item;
                    posx = item.posX - 600;
                    posy = item.posY+900;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        id: item.id,
                        my: item.my,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        imageUrl: item.imageUrl,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY-cosHeight<0&&item.posX-cosWidth<0&&!item.isCreate[5]){
                    item.isCreate[5]=true;
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[3]){
                            return;
                        }
                        item.elements[0].isCreate[3] = true;
                    }
                    if(item.elements[3]){
                        if(item.elements[3].isCreate[0]){
                            return;
                        }
                        item.elements[3].isCreate[0]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[6]=true;
                    iscreate[2]=true; 
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[6] = item;
                    posx = item.posX + 600;
                    posy = item.posY+900;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        my: item.my,
                        id: item.id,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                if(item.posY+cosHeight>900&&item.posX+cosWidth>600&&!item.isCreate[6]){
                    item.isCreate[6]=true;
                    if(item.elements[1]){
                        if(item.elements[1].isCreate[2]){
                            return;
                        }
                        item.elements[1].isCreate[2]=true;
                    }
                    if(item.elements[2]){
                        if(item.elements[2].isCreate[1]){
                            return;
                        }
                        item.elements[2].isCreate[1] = true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[5]=true;
                    iscreate[3]=true; 
                    iscreate[0]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[5] = item;
                    posx = item.posX - 600;
                    posy = item.posY-900;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        my: item.my,
                        id: item.id,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        imageUrl: item.imageUrl,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }else if(item.posY+cosHeight>900&&item.posX-cosWidth<0&&!item.isCreate[7]){
                    item.isCreate[7]=true;
                    if(item.elements[0]){
                        if(item.elements[0].isCreate[2]){
                            return;
                        }
                        item.elements[0].isCreate[2] = true;
                    }
                    if (item.elements[2]){
                        if(item.elements[2].isCreate[0]){
                            return;
                        }
                        item.elements[2].isCreate[0]=true;
                    }
                    let iscreate=[];
                    for(let i=0;i<8;i++){
                        iscreate[i] =false;
                    }
                    iscreate[4]=true;
                    iscreate[3]=true; 
                    iscreate[1]=true;
                    let  elements=[];
                    for(let i=0;i<8;i++){
                        item.elements[i]='';
                    }
                    elements[4] = item;
                    posx = item.posX + 600;
                    posy = item.posY-900 ;
                    obj.elements.push({
                        width: obj.elements[index].width,
                        height: obj.elements[index].height,
                        top:(posy- item.height*900/7087/2)+'px',
                        left:(posx- item.width*600/4724/2)+'px',
                        picture: obj.elements[index].picture,
                        showEye: true,
                        show: false,
                        my: item.my,
                        id: item.id,
                        imageUrl: item.imageUrl,
                        flip: item.flip,
                        rotation: item.rotation,
                        zoom: obj.elements[index].zoom,
                        rotateX: obj.elements[index].rotateX,
                        rotateY: obj.elements[index].rotateY,
                        rotateZ: obj.elements[index].rotateZ,
                        posX: posx,
                        posY: posy,
                        order:order,
                        elements:elements,
                        isCreate:iscreate
                    });
                }
                self.$forceUpdate();
            });
        },
        getToplist(){
            let formData = new FormData();
            let self = this;
            formData.append('id',15);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    this.classifyList.shading = JSON.parse(result.json1).background;
                    this.classifyList.shading.map(function(item){
                        item.active = false;
                    });
                    this.classifyList.shading.splice(0,1);
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        // 获取头部分页的json数据
        getClassifyList(){
            let formData = new FormData();
            let self = this;
            formData.append('id',4);
            let obj = {
                url: this.all.baseUrl + '/config/info',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                if(res.data.status==0){
                    let result = res.data.result;
                    this.classifyList.type = JSON.parse(result.json1).pdMenu;
                    this.classifyList.style = JSON.parse(result.json2).pdStyle;
                    this.classifyList.type.map(function(item){
                        item.active = false;
                        item.show = false;
                        item.list.map(function(listItem){
                            listItem.active = false;
                            listItem.numArr = [{show: false,num: 1},{show: false,num: 2},{show: false,num: 3},{show: false,num: 4},{show: false,num: 5}];
                        });
                    });
                    this.classifyList.style.map(function(item){
                        item.active = false;
                    });
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1000);
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1000);
                }
            });
        },
        download(index){
            let self = this;
            this.showLoading = true;
            let json = {
                backId: this.list[index].backId,
                background: this.list[index].background,
                elements: []
            };
            if(!json.backId){
                json.backId = -1;
            }
            if(this.list[index].background){
                json.background = this.list[index].background;
            }else if(this.message.background){
                json.background = this.message.background;
            }else{
                json.background = '';
            }
            this.list[index].elements.map(function(item){
                let o = {
                    flip: item.flip,
                    order: item.order,
                    height: item.height*900/7087,
                    width: item.width*600/4724,
                    posX: item.posX,
                    posY: item.posY,
                    rotation: item.rotation,
                    imageUrl: item.imageUrl,
                    id: item.id,
                    zoom: item.zoom
                }
                json.elements.push(o);
            });
            let formData = new FormData();
            formData.append('data',JSON.stringify(json));
            let obj = {
                url: this.all.baseUrl+'/auto/aiHd',
                formdata: formData
            }
            this.getData(obj).then(res=>{
                this.showLoading = false;
                if(res.data.status==0){
                    window.location.href= this.all.baseUrl+"/file/download?url="+res.data.result;
                }else if(res.data.status==-95){
                    this.showJump = true;
                    this.err = 'Your account has landed elsewhere';
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                        localStorage.clear();
                        self.$router.push({
                            path: '/Login'
                        });
                    },1500); 
                }else{
                    this.showJump = true;
                    this.err = res.data.msg;
                    Scroll.stop();
                    setTimeout(function(){
                        self.showJump = false;
                        self.err = '';
                        Scroll.move();
                    },1500);
                }
            });
        },
        getMessage(){
            this.user = JSON.parse(localStorage.getItem('user'));
            // 判断企业会员或者个人会员
            if(date.getTime()<parseInt(this.user.expirationTimePlus)){
                return false;
            }else{
                return true;
            }
        }
    },
    mounted(){
        localStorage.setItem('path',this.path);
        if(localStorage.getItem('English')){
            this.$router.push({
                path: '/Enai'
            });
        }else{
            this.$router.push({
                path: '/Ai'
            });
        }
        this.getClassifyList();
        localStorage.removeItem('cnt');
        localStorage.removeItem('indexArr');
        localStorage.removeItem('backArr');
        this.getToplist();
        this.loadData();
    }
}
</script>
<style scoped>
    .modelBox{
        position: absolute;
        height: 50rem;
        top: calc(50vh - 25rem);
        left: calc(50% - 42.25rem);
        box-sizing: border-box;
        padding-top: 4.125rem;
        background: #fff;
        width: 84.5rem;
        border-radius: .5rem;
        overflow: hidden;
    }
    @media screen and (max-width: 87.5rem){
        .modelBox{
            overflow: scroll;
            margin: 3.125rem;
        }
    }
    .modelClose{
        position: absolute;
        right: 1.25rem;
        top: 1.5625rem;
        width: 1.25rem;
    }
    .productBox{
        display: flex;
        flex-wrap: wrap;
        width: 79.5rem;
        margin: 0 auto;
        /* border: 1px solid #3b3b3b; */
    }
    .productBox li{
        background: #fff;
        border: 1px solid #3b3b3b;
        overflow: hidden;
        width: 19.875rem;
        height: 19.875rem;
        position: relative;
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .productBox input{
        position: absolute;
        z-index: 9;
        width: 1.125rem;
        height: 1.125rem;
        left: 0;
        top: 0;
        width: 19.875rem;
        height: 19.875rem;
        border: none;
        opacity: 0;
    }
    .productBox span{
        position: absolute;
        z-index: 8;
        width: 1.125rem;
        height: 1.125rem;
        background: url('../../assets/image/ai/select.png') no-repeat center;
        background-size: 100%;
        right: .6875rem;
        top: .6875rem;
    }
    .productBox input:checked + span{
        background: url('../../assets/image/ai/selected.png') no-repeat center;
        background-size: 100%;
    }
    .productImg{
        max-width: 13.75rem;
        max-height: 20.375rem;
        display: block;
    }
    /* 分页器 */
    .oPage{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 1.25rem;
    }
    ul.pageBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ul.pageBox li{
        width: 2.25rem;
        height: 2.25rem;
        font-size: .875rem;
        color: #333;
        border: 1px solid #ddd;
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
    ul.pageBox li img{
        display: block;
        width: .5rem;
        height: 1rem;
    }
    .oBox{
        display: flex;
        align-items: center;
        margin-left: .625rem;
    }
    .oBox span{
        display: block;
        width: 7.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        cursor: default;
        border: 1px solid #133ffc;
        border-radius: 1.25rem;
        font-size: 1rem;
        background: inherit;
        color: #133ffc;
        margin: 0 .625rem;
    }
    .oBox span.sureBtn{
        background: #133ffc;
        color: #fff;
    }
    .oUp{
        display: flex;
        align-items: center;
        position: relative;
    }
    .oUp input{
        position: absolute;
        left: .625rem;
        top: 0;
        width: 7.5rem;
        opacity: 0;
        height: 2.5rem;
    }
    /* 介绍 */
    .ai{
        min-height: 100vh;
        background: #eee;
    }
    .content{
        margin: 4.5625rem 11rem 0;
    }
    .smallBox{
        margin-bottom: .625rem;
        box-sizing: border-box;
    }
    .classify{
        position: relative;
        display: flex;
        justify-content: start;
    }
    .classify h4{
        color: #333;
        font-size: 1.125rem;
        font-weight: normal;
        padding-top: .25rem;
        word-wrap: none;
        white-space: normal;
        width: 4rem;
        text-align: left;
        flex-shrink: 0;
    }
    .classify ul.classBox{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
    }
    ul.classBox li{
        margin-right: 1.25rem;
        position: relative;
        cursor: default;
        margin-bottom: 1.25rem;
    }
    .classify>span{
        font-size: 1rem;
        border: 1px solid #eee;
        padding: .3125rem 1rem;
        color: #333;
    }
    ul.classBox li>span{
        display: block;
        position: relative;
        z-index: 8;
        color: #8d8d8d;
        font-size: 1rem;
        border: 1px solid #8d8d8d;
        padding: .3125rem 1rem;
        border-radius: 1.875rem;
        background: #eee;
    }
    ul.classBox li.click>span{
        background: #133ffc;
        color: #fff;
        border: 1px solid #133ffc;
    }
    ul.classBox li:last-child{
        margin-right: 0;
    }
    ul.classBox .listBox{
        position: absolute;
        padding-top: 1.5rem;
        width: 100%;
        background: #fff;
        border-radius: 0 0 .625rem .625rem;
        top: 50%;
        left: 0;
        z-index: 7;
    }
    .listBox>span{
        display: block;
        font-size: .875rem;
        color: #8d8d8d;
        position: relative;
        padding-bottom: .6875rem;
    }
    .listBox>span:hover{
        color: #333;
    }
    .listBox>span.click{
        color: #133ffc;
        font-weight: bold;
    }
    .numList{
        display: none;
        position: absolute;
        width: 3.125rem;
        right: -3.125rem;
        top: -.5rem;
        border-radius: 0 .4rem .4rem 0;
        padding-top: .6875rem;
        background: #fff;
    }
    .numList p{
        font-size: .875rem;
        color: #8d8d8d;
        padding-bottom: .6875rem;
    }
    .numList p:hover{
        color: #333;
        font-weight: bold;
    }
    .listBox>span:hover .numList{
        display: block;
    }
    .numList p.click{
        color: #133ffc;
        font-weight: bold;
    }
    p.conBox{
        text-align: center;
        line-height: 31.25rem;
        color: #333;
        font-size: 1.875rem;
    }
    ul.proBox{
        box-sizing: border-box;
        overflow: hidden;
        max-width: 1600px;
        margin: 0 auto;
        margin-bottom: 5rem;
    }
    ul.proBox li{
        width: 300px;
        height: 450px;
        overflow: hidden;
        float: left;
        background: #fff;
        border-radius: .3125rem;
        margin-right: .3rem;
        margin-bottom: 1.25rem;
        display: flex;
        justify-content: center;
        flex-shrink: 1;
        position: relative;
        align-items: center;
        box-shadow: .125rem .125rem .125rem #ddd;
    }
    ul.proBox li>div{
        position: absolute;
    }
    ul.proBox li:hover .operateBox{
        display: block;
    }
    .operateBox{
        width: 100%;
        left: 0;
        height: 100%;
        background: rgba(0,0,0,0.4);
        display: none;
        top: 0;
        overflow: hidden;
        z-index: 777;
    }
    .operateBox .operate{
        width: 40px;
        height: 40px;
        margin-top: 20px;
        float: right;
        border-radius: 8px;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-right: 20px;
        border: 1px solid #dadddd;
    }
    .operateBox .operate:nth-child(2){
        background: #133ffc;
        margin-right: 0;
        border: 1px solid #133ffc;
    }
    .operateBox .operate:nth-child(3){
        margin-right: 0;
    }
    .toNew{
        position: fixed;
        color: #fff;
        font-size: 1.25rem;
        background: #133ffc;
        border-radius: 1.25rem;
        width: 7.5rem;
        right: 30rem;
        bottom: 1.25rem;
        height: 2.5rem;
        z-index: 8888;
        border:none;
        outline: none;
    }
    /* 连晒弹窗 */
    .bigModel{
        position: fixed;
        z-index: 9999;
        top: 0;
        height: 100vh;
        width: 100%;
        overflow-y: scroll;
        left: 0;
        background: rgba(0,0,0,0.4);
    }
    .grabBox{
        width: 22.5rem;
        height: 11.25rem;
        background: #fff;
        border-radius: .625rem;
        margin: 0 auto;
        position: relative;
        margin-top: 25rem;
    }
    .grabBox h3{
        padding-top: .9375rem;
        font-weight: normal;
        font-size: 1.5rem;
        margin: 0;
    }
    .grabBox .del{
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        right: .5rem;
        top: .5rem;
        line-height: 1.25rem;
        text-align: cneter;
        cursor: pointer;
    }
    .del img{
        width: 100%;
        display: block;
    }
    .grabBox span{
        display: block;
        margin: .9375rem 0 1.875rem;
    }
    .grabBox .grabWay{
        display: flex;
        justify-content: space-around;
    }
    .grabWay button{
        width: 7.8125rem;
        height: 2.5rem;
        outline: none;
        border: none;
        line-height: 2.5rem;
        color: #fff;
        background: #133ffc;
        font-size: 1.25rem;
        border-radius: .625rem;
    }
    .picBox{
        position: absolute;
        background: #fff;
        top: 50px;
        left: calc(50% - 650px);
        margin-bottom: 50px;
        width: 1300px;
        height: 1000px;
        border-radius: .625rem;
    }
    .specialPic{
        width: 700px;
        height: 1000px;
        left: calc(50% - 350px);
    }
    .picDel{
        position: absolute;
        width: 25px;
        height: 25px;
        right: 15px;
        top: 15px;
    }
    .picDel img{
        display: block;
        width: 100%;
    }
    .linkBox{
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        justify-content: center;
    }
    .linkBox ul{
        width: 300px;
        height: 450px;
        overflow: hidden;
        background-size: 100% 100%;
    }
    .linkBox ul li{
        width: 300px;
        height: 450px;
        position: relative;
    }
    .linkBox ul li>div{
        position: absolute;
    }
</style>