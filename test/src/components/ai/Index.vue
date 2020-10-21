<template>
	<div class="ai" :class="isChange ? 'dialog-open' : ''">
		<!-- AI设计 -->
		<Tab :path='path' @showEnglish="changeEnglish" :tabIndex="tabIndex"></Tab>
		<div class="content">
			<div class="smallBox">
				<div style="height: 1rem;"></div>
				<div class="classify">
					<h4>类型：</h4>
					<ul class="classBox">
						<li @mouseenter.stop="downType(typeItem,$event,index)" @mouseleave.stop="upType(typeItem,$event)" :class="typeItem.active?'click':''"
						 v-for="(typeItem,index) in classifyList.type" class="act" :key="'type-'+index">
							<span class="click" :style="{'z-index': 99-index}" @click="clickType(index)">{{typeItem.name}}</span> <img v-if="typeItem.list.length"
							 src="../../assets/image/bottom.png">
							<!-- <div v-if="typeItem.list.length" :style="{display: typeItem.show?'block':'none','z-index': 98-index}" class="listBox">
                                <span :class="listItem.active?'click':''" v-for="(listItem,listIndex) in typeItem.list" :key="'list'+listIndex">
                                    <span id="leixingtongji" @click="updateMessage(index,listIndex)">{{listItem.name}}</span>
                                    <div class="numList">
                                        <p @click="numClick(index,listIndex,numIndex)" :class="numItem.show?'click':''" v-for="(numItem,numIndex) in listItem.numArr" :key="'num'+numIndex">{{numItem.num}}</p>
                                    </div>
                                </span>
                            </div> -->
						</li>
						<li class="addClass" @click="add(0)">添加</li>
						<div id="listBox" style="display: none;" @mouseenter.stop="downList()" @mouseleave.stop="upList()" :data-act="0"
						 class="listBox">
							<div>
								<span @mouseenter.stop="numCheng($event)" @mouseleave.stop="numOut($event)" :class="listItem.active?'click':''"
								 @click="updateMessage(itemNum,listIndex)" v-for="(listItem,listIndex) in itemType.list" :key="'list'+listIndex">{{listItem.name}}
									<span style="height: 0;" :data-num='0' class="numBox" @mouseenter.stop="listCheng($event)" @mouseleave.stop="listOut($event)">
										<p @click="numClick(listIndex,numIndex)" :class="numItem.show?'click':''" v-for="(numItem,numIndex) in listItem.numArr"
										 :key="'num'+numIndex">{{numItem.num}}</p>
									</span>
								</span>
							</div>
							<!-- <div style="display: none;" class="numList" @mouseenter.stop="listCheng($event)" @mouseleave.stop="listOut($event)" :data-num='0' id="numBox" >
                                <p @click="numClick(numIndex)"  v-for="(numItem,numIndex) in itemNumArr.numArr" :key="'num'+numIndex">{{numItem.num}}</p>
                            </div> -->
						</div>
					</ul>
				</div>
				<hr style="position: absolute;left:10rem;width: 80%;text-align: center;border: .5px dotted  #DBD6D6;" />
				<div class="classify">
					<h4>风格：</h4>
					<ul class="classBox">
						<li :class="item.active?'click':''" v-for="(item,index) in classifyList.style" :key="'style-'+index">
							<span id="fenggetongji" @click="clickStyle(index)" style="z-index: 6;">{{item.name}}</span>
						</li>
					</ul>
				</div>
				<hr style="position: absolute;left:10rem;width: 80%;text-align: center;border: .5px dotted  #DBD6D6;" />
				<div class="classify">
					<h4>底纹：</h4>
					<ul class="classBox">
						<li :class="item.active?'click':''" v-for="(item,index) in classifyList.shading" :key="'style-'+index">
							<span id="diwentongji" @click="clickShading(index)" style="z-index: 6;">{{item.name}}</span>
						</li>
						<li class="addClass" @click="add(1)">添加</li>
					</ul>
				</div>
			</div>
			<div v-if="showContent" class="shareBox">
				<ul v-if="list.length" class="proBox">
					<li @click.stop="look(index)" :style="{background: item.background?'url('+item.background+') no-repeat center':'#fff','background-size': '220px 328px'}"
					 v-for="(item,index) in list" :key="'product'+index">
					 <div v-if="item.elements.length>=18" v-for="(childItem,childIndex) in item.elements" :key="'list0'+childIndex" :style="{width: childItem.width*220/4724+'px','z-index': childItem.cnt,left: parseFloat(childItem.left)/900*328+'px',top: parseFloat(childItem.top)/900*220+'px',transform: 'scale('+childItem.zoom+')'}"
					  class="proList">
					 	<img :style="{width: childItem.width*220/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}"
					 	 :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
					 </div>
						<div v-if="item.elements.length<18" v-for="(childItem,childIndex) in item.elements" :key="'list1'+childIndex" :style="{width: childItem.width*110/4724+'px','z-index': childItem.cnt,left: parseFloat(childItem.left)/600*110+'px',top: parseFloat(childItem.top)/600*110+'px',transform: 'scale('+childItem.zoom+')'}"
						 class="proList">
							<img :style="{width: childItem.width*110/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}"
							 :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
						</div>
						<div v-if="item.elements.length<18" v-for="(childItem,childIndex) in item.elements" :key="'list2'+childIndex" :style="{width: childItem.width*110/4724+'px','z-index': childItem.cnt+1,left: parseFloat(childItem.left)/600*110+110+'px',top: parseFloat(childItem.top)/600*110+'px',transform: 'scale('+childItem.zoom+')'}"
						 class="proList">
							<img :style="{width: childItem.width*110/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}"
							 :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
						</div>
						<div v-if="item.elements.length<18" v-for="(childItem,childIndex) in item.elements" :key="'list3'+childIndex" :style="{width: childItem.width*110/4724+'px','z-index': childItem.cnt+2,left: parseFloat(childItem.left)/600*110+'px',top: parseFloat(childItem.top)/600*110+164+'px',transform: 'scale('+childItem.zoom+')'}"
						 class="proList">
							<img :style="{width: childItem.width*110/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}"
							 :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
						</div>
						<div v-if="item.elements.length<18" v-for="(childItem,childIndex) in item.elements" :key="'list4'+childIndex" :style="{width: childItem.width*110/4724+'px','z-index': childItem.cnt+3,left: parseFloat(childItem.left)/600*110+110+'px',top: parseFloat(childItem.top)/600*110+164+'px',transform: 'scale('+childItem.zoom+')'}"
						 class="proList">
							<img :style="{width: childItem.width*110/4724+'px',transform: 'rotateX('+childItem.rotateX+'deg) rotateY('+childItem.rotateY+'deg) rotateZ('+childItem.rotateZ+'deg)'}"
							 :src="childItem.picture+'?x-oss-process=image/resize,l_450'" alt="">
						</div>
						<div class="operateBox">
                            <span>浙江有柴科技有限公司</span>
                            <div>
								<div @click.stop="bianjif(index)" class="operate">
                                    编辑
                                </div>
                                <div @click.stop="save(index)" class="operate">
                                    <img src="../../assets/image/ai/Base.png" alt="">
																		<!-- <span>收藏</span> -->
                                </div>
                                <div @click.stop="download(index)" class="operate">
                                    <img src="../../assets/image/ai/load.png" alt="">
																		<!-- <span>下载</span> -->
                                </div>
                            </div>
                        </div>
					</li>
				</ul>
				<div v-else class="proNone">
					<div>
						<img src="../../assets/image/user/Emoji.png" alt="">
						<span>空空如也</span>
					</div>
				</div>
			</div>
			<p class="conBox" v-if="!showContent" style="padding-top: 6rem;"><img src="../../assets/image/ai/countNone.png"></p>
		</div>
		<div class="bigModel" v-if="showLook">
			<div class="grabBox" v-if="showGrab">
				<h3>提示</h3>
				<p class="del" @click="delLook">
					<img src="../../assets/image/login/close.png" alt="">
				</p>
				<span>企业VIP开通权限，是否前往充值VIP？</span>
				<div class="grabWay">
					<button @click="wayClick(1)">取消</button>
					<button @click="wayClick(2)">确定</button>
				</div>
			</div>
			<div class="picBox specialPic" v-if="showPic">
				<p class="picDel" @click="delLook">
					<img src="../../assets/image/login/close.png" alt="">
				</p>
				<div class="linkBox">
					<ul v-for="(bigItem,bigIndex) in 4" :key="bigIndex">
						<li :style="{background: list[i].background?'url('+list[i].background+') no-repeat center':'#fff','background-size': '100% 100%'}"
						 class="proList">
							<div v-for="(item,index) in list[i].elements" :key="index" :style="{width: item.width*600/4724/2+'px','z-index': item.cnt,left: parseFloat(item.left)/2+'px',top: parseFloat(item.top)/2+'px',transform: 'scale('+item.zoom+')'}">
								<img :style="{width: item.width*600/4724/2+'px',transform: 'rotateX('+item.rotateX+'deg) rotateY('+item.rotateY+'deg) rotateZ('+item.rotateZ+'deg)'}"
								 :src="item.picture" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="bigModel" v-if="showModel">
			<div class="modelBox">
				<div @click="modelClose" class="modelClose">
					<img src="../../assets/image/ai/close.png" alt="">
				</div>
				<div v-if="proList.length" class="productBoxA">
					<ul class="productBox" :style="{bottom:bot+'rem'}">
						<li @click="toDetail(index)" v-for="(item,index) in proList" :key="index">
							<img class="productImg" :src="item.picture" alt="">
							<input v-if="sourceIndex==1" :checked="item.show" type="checkBox">
							<input :checked="item.show" type="checkBox">
							<span></span>
						</li>
					</ul>
				</div>
				<p class="productBox" style="justify-content: center;font-size: 1.2rem;line-height: 40rem;" v-else>暂无{{title}}，本地上传</p>
				<div class="progress">
					<div @mousedown="prodown($event)" @mouseup="proup($event)" :style="{top:top+'rem'}"></div>
				</div>
				<div class="oPage">
					<div class="oBox">
						<span @click="sureClick" class="sureBtn">确定</span>
						<div class="oUp">
							<span>本地上传</span>
							<input type="file" @change="addSource">
						</div>
					</div>
				</div>
			</div>
		</div>
		<Jump v-if="showJump" :url='urlChange' :title="err"></Jump>
		<Loading v-if="showLoading"></Loading>
	</div>
</template>
<script>
	import Tab from '../../components/Tab';
	import Jump from '../../components/Jump';
	import Loading from '../../components/Loading';
	import Scroll from '../../assets/js/scroll.js';
	let date = new Date();
	export default {
		name: 'Ai',
		components: {
			Tab,
			Loading,
			Jump
		},
		data() {
			return {
				bianji:'',
				tabIndex: 3,
				showJump: false,
				err: '',
				urlChange: false,
				user: {},
				showLoading: true,
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
						list: ['100'],
						style: '0'
					},
					element: {
						elements: []
					},
					backArr: []
				},
				itemType: [],
				itemNum: '',
				itemNumArr: [],
				// 商品数据
				list: [],
				i: '',
				// 连晒
				showLook: false,
				showGrab: false,
				showPic: false,
				path: '/Ai',
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
				title: '',
				// 添加弹窗滑动
				bot: 0,
				maxBot: 0,
				top: 0,
				// 禁止滑动
				isChange: false
			}
		},
		methods: {
			// 控制文字的显示隐藏---未完成-高勇
			// textShow(){
				
			// },
			add(index) {
				// localStorage.removeItem('cnt');
				// if(index!=this.index){
				//     localStorage.setItem('cnt',1);
				// }else{
				//     localStorage.setItem('cnt',this.pageIndex);
				// }
				this.index = index;
				// this.cnt = 1*(localStorage.getItem('cnt'));
				// this.page = [];
				// this.pageIndex = 1*(localStorage.getItem('cnt'));
				this.flag = 0;
				this.proList = [];
				Scroll.stop();
				// this.pageNumber = '';
				this.showModel = true;
				this.isChange = true;
				if (index == 0) {
					this.sourceIndex = 1;
					this.title = '素材';
					this.getProlist();
				} else {
					this.sourceIndex = 3;
					this.title = '底纹';
					this.getProlist();
				}
				this.$forceUpdate();
			},
			cancel() {
				this.proList.map(function(item) {
					item.show = false;
				});
				if (this.sourceIndex == 1) {
					localStorage.removeItem('indexArr');
				} else {
					localStorage.removeItem('backArr');
				}
				this.$forceUpdate();
			},
			setMaxBox() {
				if (this.proList.length) {
					this.num = 0;
					this.maxBot = Math.ceil(this.proList.length / 5);
					if (this.maxBot > 2) {
						this.maxBot += -2;
						this.maxBot = this.maxBot * 9.698;
					}
					this.$forceUpdate();
				}
			},
			modelClose() {
				this.urlChange = true;
				this.isChange = false;
				Scroll.move();
				this.$forceUpdate();
				this.showModel = false;
			},
			prodown(e) {
				let self = this;
				e.currentTarget.onmousemove = function(el) {
					self.$forceUpdate();
				}
			},
			proup(e) {
				e.currentTarget.onmousemove = function(el) {
					return;
				}
			},
			toDetail(index) {
				let self = this;
				let arr = [];
				this.proList[index].show = !this.proList[index].show;
				this.proList.map(function(item, index) {
					if (item.show) {
						arr.push(item.id);
					}
				});
				if (this.sourceIndex == 1) {
					localStorage.setItem('indexArr', arr);
				} else if (this.sourceIndex == 3) {
					localStorage.setItem('backArr', arr);
				}
				this.$forceUpdate();
			},
			// 点击确定
			sureClick() {
				let self = this;
				if (this.sourceIndex == 1) {
					self.message.element.elements = [];
					this.proList.map(function(item, index) {
						if (item.show) {
							self.message.element.elements.push({
								pictureThumbnail: item.picture,
								id: 0
							});
						}
					});
					self.$forceUpdate();
					this.showModel = false;
					this.isChange = false;
					this.list = [];
					this.toNew();
				}
				if (this.sourceIndex == 3) {
					this.classifyList.shading.map(function(item) {
						item.active = false;
					});
					self.message.backType = '';
					self.message.backArr = [];
					this.proList.map(function(item, index) {
						if (item.show) {
							self.message.backArr.push(item.picture);
						}
					});
					self.$forceUpdate();
					this.showModel = false;
					this.isChange = false;
					this.list = [];
					this.toNew();
				}
			},
			// 数量点击
			numClick(listIndex, numIndex) {
				this.classifyList.type[this.itemNum].list[listIndex].numArr.map(function(item) {
					item.show = false;
				});
				// this.
				this.itemType.list[listIndex].numArr[numIndex].show = true;
				this.itemType[listIndex].active = true;
				this.itemType.list[listIndex].active = true;
				this.list = [];
				this.toNew();
				this.$forceUpdate();
			},
			// 上传素材
			addSource(e) {
				this.url = [];
				let self = this;
				let files = e.target.files;
				if (files[0].size > 20971520) {
						this.showJump = true;
						this.err = "文件大小超过20MB";
						setTimeout(function() {
								self.showJump = false;
								self.err = "";
						}, 2000);
				}else{
					for (let i = 0; i < files.length; i++) {
						this.url.push(e.target.files[i]);
					}
					if (!e || !window.FileReader) return; // 看支持不支持FileReader
					this.url.map(function(item, index) {
						if (self.sourceIndex == 1) {
							if (self.url[index].name.substring(self.url[index].name.length - 3, self.url[index].name.length) != 'png') {
								self.showJump = true;
								self.err = '只支持上传png格式图片';
								Scroll.stop();
								setTimeout(function() {
									Scroll.move();
									self.showJump = false;
									self.err = '';
								}, 2000);
								return;
							}
						}
						let reader = new FileReader();
						reader.readAsDataURL(item); // 这里是最关键的一步，转换就在这里
						reader.onloadend = function() {
							// 增加一个
							self.showLoading = true;
							let formData = new FormData();
							formData.append('file', item);

							let obj = {
								url: self.all.baseUrl + '/file/upload',
								formdata: formData
							}
							self.getData(obj).then(res => {
								self.upSource(res.data.result);
							});
						}
					});
				}
			},
			upSource(str) {
				let formData = new FormData();
				let self = this;
				formData.append('picture', str);
				formData.append('type1', this.sourceIndex);
				let obj = {
					url: this.all.baseUrl + '/app3dMaterialLibraryMyJyg/save',
					formdata: formData
				}
				this.getData(obj).then(res => {
					self.showLoading = false;
					if (res.data.status == 0) {
						this.showJump = true;
						Scroll.stop();
						this.err = '新增成功';
						this.proList = [];
						this.cnt = 1;
						this.pageNumber = 1;
						this.page = [];
						this.flag = 0;
						this.pageIndex = 1;
						this.getProlist();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					} else if (res.data.status == -95) {
						this.showJump = true;
						Scroll.stop();
						this.err = res.data.msg;
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				});
			},
			getProlist() {
				let self = this;
				let formData = new FormData();
				let obj = {}
				this.showLoading = true;
				Scroll.stop();
				formData.append('pageSize', 20);
				formData.append('page', 1);
				formData.append('status', 0);
				formData.append('type1', this.sourceIndex);
				obj.url = this.all.baseUrl + '/app3dMaterialLibraryMyJyg/list';
				obj.formdata = formData;
				this.getData(obj).then(res => {
					setTimeout(function() {
						self.showLoading = false;
						Scroll.move();
					}, 500);
					let result;
					if (res.data.status == 0) {
						result = res.data.result;
						this.proList = result.list;
						let str = '';
						let arr = [];
						this.bot = 0;
						this.setMaxBox();
						if (this.sourceIndex == 1 && localStorage.getItem('indexArr')) {
							str = localStorage.getItem('indexArr');
							if (str) {
								arr = str.split(',');
							}
						} else {
							str = localStorage.getItem('backArr');
							if (str) {
								arr = str.split(',');
							}
						}
						self.proList.map(function(item, index) {
							if (arr.length) {
								arr.map(function(arrItem, arrIndex) {
									if (arrItem == item.id) {
										item.show = true;
									}
								});
							} else {
								item.show = false;
							}
						});
						// this.pageNumber = result.pages;
						// this.pageAuto();
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							localStorage.clear();
							Scroll.move();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				});
			},
			pageAuto() {
				if (!this.page.length) {
					if (this.pageNumber <= 7) {
						for (let i = 0; i < this.pageNumber; i++) {
							this.page.push({
								name: i + 1
							});
						}
					} else {
						this.page = [{
							name: 1
						}, {
							name: 2
						}, {
							name: 3
						}, {
							name: 4
						}, {
							name: 5
						}, {
							name: '···'
						}, {
							name: this.pageNumber
						}];
					}
				}
			},
			// 分页器每个点击
			btnClick(index) {
				if (this.pageNumber <= 7) {
					this.flag = 0;
					this.cnt = index + 1;
					this.getProlist();
					this.pageIndex = index + 1;
				} else {
					// 状态0
					if (this.flag == 0) {
						if (index == 5) {

						} else if (index == 4) {
							this.cnt = this.page[index].name;
							if (this.pageNumber - this.cnt <= 3) {
								this.flag = 2;
								this.page = [{
									name: 1
								}, {
									name: '···'
								}, {
									name: this.pageNumber - 4
								}, {
									name: this.pageNumber - 3
								}, {
									name: this.pageNumber - 2
								}, {
									name: this.pageNumber - 1
								}, {
									name: this.pageNumber
								}];
								this.pageIndex = 7 - (this.pageNumber - this.cnt);
								this.getProlist();
							} else {
								this.flag = 1;
								this.page = [{
									name: 1
								}, {
									name: '···'
								}, {
									name: this.cnt - 1
								}, {
									name: this.cnt
								}, {
									name: this.cnt + 1
								}, {
									name: '···'
								}, {
									name: this.pageNumber
								}];
								this.pageIndex = 4;
								this.getProlist();
							}
						} else if (index == 6) {
							this.cnt = this.page[index].name;
							this.flag = 2;
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber - 4
							}, {
								name: this.pageNumber - 3
							}, {
								name: this.pageNumber - 2
							}, {
								name: this.pageNumber - 1
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = 7;
							this.getProlist();
						} else {
							this.cnt = this.page[index].name;
							this.pageIndex = index + 1;
							this.getProlist();
						}
					} else if (this.flag == 1) {
						if (index == 1 || index == 5) {

						} else {
							this.cnt = this.page[index].name;
							if (this.cnt <= 4) {
								// 点击首页
								this.pageIndex = this.cnt;
								this.flag = 0;
								this.getProlist();
								this.page = [{
									name: 1
								}, {
									name: 2
								}, {
									name: 3
								}, {
									name: 4
								}, {
									name: 5
								}, {
									name: '···'
								}, {
									name: this.pageNumber
								}];
							} else if ((this.pageNumber - this.cnt) <= 4) {
								this.pageIndex = 7 - (this.pageNumber - this.cnt);
								this.flag = 2;
								this.getProlist();
								this.page = [{
									name: 1
								}, {
									name: '···'
								}, {
									name: this.pageNumber - 4
								}, {
									name: this.pageNumber - 3
								}, {
									name: this.pageNumber - 2
								}, {
									name: this.pageNumber - 1
								}, {
									name: this.pageNumber
								}];
							} else {
								this.flag = 1;
								this.page = [{
									name: 1
								}, {
									name: '···'
								}, {
									name: this.cnt - 1
								}, {
									name: this.cnt
								}, {
									name: this.cnt + 1
								}, {
									name: '···'
								}, {
									name: this.pageNumber
								}];
								this.getProlist();
							}
						}
					} else if (this.flag == 2) {
						if (index == 1) {

						} else if (index == 2) {
							this.cnt = this.page[index].name;
							if (this.cnt <= 4) {
								this.flag = 0;
								this.pageIndex = this.cnt;
								this.page = [{
									name: 1
								}, {
									name: 2
								}, {
									name: 3
								}, {
									name: 4
								}, {
									name: 5
								}, {
									name: '···'
								}, {
									name: this.pageNumber
								}];
								this.getProlist();
							} else {
								this.flag = 1;
								this.pageIndex = 4;
								this.page = [{
									name: 1
								}, {
									name: '···'
								}, {
									name: this.cnt - 1
								}, {
									name: this.cnt
								}, {
									name: this.cnt + 1
								}, {
									name: '···'
								}, {
									name: this.pageNumber
								}];
								this.getProlist();
							}
						} else if (index == 0) {
							this.cnt = this.page[index].name;
							this.flag = 0;
							this.pageIndex = 1;
							this.page = [{
								name: 1
							}, {
								name: 2
							}, {
								name: 3
							}, {
								name: 4
							}, {
								name: 5
							}, {
								name: '···'
							}, {
								name: this.pageNumber
							}];
							this.getProlist();
						} else {
							this.cnt = this.page[index].name;
							this.flag = 2;
							this.pageIndex = 7 - (this.pageNumber - this.cnt);
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber - 4
							}, {
								name: this.pageNumber - 3
							}, {
								name: this.pageNumber - 2
							}, {
								name: this.pageNumber - 1
							}, {
								name: this.pageNumber
							}];
							this.getProlist();
						}
					}
				}
			},
			// 上一页
			prev() {
				let self = this;
				if (this.pageNumber <= 7) {
					this.flag = 0;
					if (this.cnt == 1) {
						this.showJump = true;
						this.err = "已经是第一页了";
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					} else {
						this.cnt -= 1;
						this.pageIndex -= 1;
						this.getProlist();
					}
				} else {
					if (this.cnt != 1) {
						this.cnt--;
						if (this.pageNumber - this.cnt <= 3) {
							this.flag = 2;
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber - 4
							}, {
								name: this.pageNumber - 3
							}, {
								name: this.pageNumber - 2
							}, {
								name: this.pageNumber - 1
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = 7 - (this.pageNumber - this.cnt);
							this.getProlist();
						} else if (this.cnt <= 4) {
							this.flag = 0;
							this.page = [{
								name: 1
							}, {
								name: 2
							}, {
								name: 3
							}, {
								name: 4
							}, {
								name: 5
							}, {
								name: '···'
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = this.cnt;
							this.getProlist();
						} else {
							this.flag = 1;
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.cnt - 1
							}, {
								name: this.cnt
							}, {
								name: this.cnt + 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = 4;
							this.getProlist();
						}
					} else {
						this.showJump = true;
						this.err = "已经是第一页了";
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				}
			},
			// 下一页
			next() {
				let self = this;
				if (this.pageNumber <= 7) {
					this.flag = 0;
					if (this.cnt < this.pageNumber) {
						this.cnt += 1;
						this.pageIndex += 1;
						this.getProlist();
					} else {
						this.showJump = true;
						this.err = "已经是最后一页了";
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				} else {
					if (this.cnt < this.pageNumber) {
						this.cnt++;
						if (this.pageNumber - this.cnt <= 3) {
							this.flag = 2;
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber - 4
							}, {
								name: this.pageNumber - 3
							}, {
								name: this.pageNumber - 2
							}, {
								name: this.pageNumber - 1
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = 7 - (this.pageNumber - this.cnt);
							this.getProlist();
						} else if (this.cnt <= 4) {
							this.flag = 0;
							this.page = [{
								name: 1
							}, {
								name: 2
							}, {
								name: 3
							}, {
								name: 4
							}, {
								name: 5
							}, {
								name: '···'
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = this.cnt;
							this.getProlist();
						} else {
							this.flag = 1;
							this.page = [{
								name: 1
							}, {
								name: '···'
							}, {
								name: this.cnt - 1
							}, {
								name: this.cnt
							}, {
								name: this.cnt + 1
							}, {
								name: '···'
							}, {
								name: this.pageNumber
							}];
							this.pageIndex = 4;
							this.getProlist();
						}
					} else {
						this.showJump = true;
						this.err = "已经是最后一页了";
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				}
			},
			changeEnglish() {
				this.$router.go(0);
			},
			// 保存
			save(index) {
				this.showLoading = true;
				this.list[index].elements.map(function(item) {
					item.imageUrl = item.picture;
				});
				let self = this;
				let element = [];
				let filp = [];
				this.list[index].elements.map(function(item, i) {
					if (item.rotateX / 180 % 2 == 1 && item.rotateY / 180 % 2 == 0) {
						filp[i] = 1;
					} else if (item.rotateY / 180 % 2 == 1 && item.rotateX / 180 % 2 == 0) {
						filp[i] = 2;
					} else {
						filp[i] = 0;
					}
					let o = {
						imageUrl: item.picture,
						flip: filp[i],
						posX: item.posX,
						posY: item.posY,
						id: item.id,
						order: item.order,
						width: item.width * 600 / 4724,
						height: item.height * 900 / 7087,
						zoom: item.zoom,
						rotation: item.rotateZ
					};
					element.push(o);
				});
				let formData = new FormData();
				let json = {
					elements: element
				}
				if (this.list[index].backId) {
					json.background = this.list[index].background;
					json.backId = this.list[index].backId;
				} else {
					if (this.message.backArr.length) {
						json.background = this.list[index].background;
					} else {
						json.background = '';
					}
				}
				formData.append("cart_status", 0);
				formData.append("my_status", 0);
				formData.append("source_file", JSON.stringify(json));
				formData.append("resolution_ratio", 300);
				formData.append("size_height", 60);
				formData.append("size_width", 40);
				formData.append("format", "png");
				formData.append("hierarchy", 0);
				formData.append("type", 2);
				let obj = {
					url: this.all.baseUrl + '/new/userFlowers/addUserFlowers',
					formdata: formData
				}
				this.getData(obj).then(res => {
					setTimeout(function() {
						self.showLoading = false;
					}, 500);
					if (res.data.status == 0) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1500);
						// this.newSave(res.data.result.id);
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1500);
					}
				});
			},
			newSave(str) {
				let self = this;
				let formData = new FormData();
				formData.append('myStatus', 1);
				formData.append('targetId', str);
				let arr = [];
				// 商城花型
				let obj = {
					url: this.all.baseUrl + '/app3dFlowerTypeShoppingCartJyg/save',
					formdata: formData
				}
				this.getData(obj).then(res => {
					if (res.data.status == 0) {
						this.showJump = true;
						this.err = '已保存至我的花型';
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1500);
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1500);
					}
				});
			},
			// 连晒预览
			look(index) {
				this.i = index;
				this.showLook = true;
				this.showGrab = false;
				this.showPic = true;
			},
			delLook() {
				this.showLook = false;
				this.showGrab = false;
				this.showPic = false;
			},
			wayClick(index) {
				if (index == 1) {
					this.showLook = false;
					this.showGrab = false;
					this.showPic = false;
				} else if (index == 2) {
					this.$router.push({
						path: '/Vip'
					});
				}
			},
			// 鼠标移入移出点击效果
			downType(val, e, num) {
				if (val.list.length > 0) {
					let listBox = document.getElementById("listBox");
					e.target.style.cssText =
						"z-index:21;border:1px solid #F06D29;border-bottom: 1px solid #fff;background: #fff;color:#F06D29;";
					if (e.target.firstElementChild.nextElementSibling) {
						e.target.firstElementChild.nextElementSibling.src = require('../../assets/image/top.png');
					}
					this.itemType = val;
					this.itemNum = num;
					this.$forceUpdate();
					listBox.style.cssText = 'display: block;';
				}
			},
			upType(val, e) {
				let listBox = document.getElementById("listBox");
				if (listBox.dataset.act == 0) {
					e.target.style.cssText = " ";
					if (e.target.firstElementChild.nextElementSibling) {
						e.target.firstElementChild.nextElementSibling.src = require('../../assets/image/bottom.png');
					}
					listBox.style.cssText = 'display: none;';
				}
			},
			downList() {
				let listBox = document.getElementById("listBox");
				let actList = document.getElementsByClassName("act");
				for (let i = 0; i < actList.length; i++) {
					if (i == this.itemNum) {
						actList[i].style.cssText =
							"z-index:21;border:1px solid #F06D29;border-bottom: 1px solid #fff;background: #fff;color:#F06D29;";
						if (actList[i].firstElementChild.nextElementSibling) {
							actList[i].firstElementChild.nextElementSibling.src = require('../../assets/image/top.png');
						}
					}
				}
				listBox.style.cssText = 'display: block;';
				listBox.dataset.act = 1;
			},
			upList() {
				let listBox = document.getElementById("listBox");
				listBox.dataset.act = 0;
				let actList = document.getElementsByClassName("act");
				for (let i = 0; i < actList.length; i++) {
					actList[i].style.cssText = "";
					if (actList[i].firstElementChild.nextElementSibling) {
						actList[i].firstElementChild.nextElementSibling.src = require('../../assets/image/bottom.png');
					}
				}
				listBox.style.cssText = 'display: none;';
			},
			numCheng(e) {
				let numBox = e.currentTarget.firstElementChild;
				this.$forceUpdate();
				numBox.style.cssText = '';
			},
			numOut(e) {
				let numBox = e.currentTarget.firstElementChild;
				setTimeout(() => {
					if (numBox.dataset.num == 0) {
						numBox.style.cssText = 'height: 0;'
					}
				}, 80);
			},
			listCheng(e) {
				let numBox = e.currentTarget;
				numBox.style.cssText = '';
				numBox.dataset.num = 1;
			},
			listOut(e) {
				let numBox = e.currentTarget;
				numBox.dataset.num = 0;
				numBox.style.cssText = "height: 0;";
			},
			clickType(index) {
				this.list = [];
				let self = this;
				this.classifyList.type[index].active = !this.classifyList.type[index].active;
				if (!this.classifyList.type[index].active) {
					this.classifyList.type[index].list.map(function(item) {
						item.active = false;
						item.numArr.map(function(child) {
							child.show = false;
						});
					});
				}
				this.toNew();
			},
			// 点击每个下拉列表里的内容
			updateMessage(index, listIndex) {
				// _czc.push(["_trackEvent", "点击每个下拉列表里的内容", "操作", "", "", "leixingtongji"]);
				this.classifyList.type[index].list[listIndex].numArr.map(function(item) {
					item.show = false;
				});
				this.classifyList.type[index].active = true;
				this.classifyList.type[index].list[listIndex].active = !this.classifyList.type[index].list[listIndex].active;
				this.list = [];
				this.toNew();
			},
			// 风格点击
			clickStyle(index) {
				// _czc.push(["_trackEvent", "风格点击", "操作", "", "", "fenggetongji"]);
				this.list = [];
				this.classifyList.style.map(function(item, mapIndex) {
					if (mapIndex != index) {
						item.active = false;
					}
				});
				this.classifyList.style[index].active = !this.classifyList.style[index].active;
				if (this.classifyList.style[index].active == true) {
					this.message.data.style = this.classifyList.style[index].id;
				} else {
					this.message.data.style = '0';
				}
				this.toNew();
			},
			// 底纹点击
			clickShading(index) {
				// _czc.push(["_trackEvent", "底纹点击", "操作", "", "", "diwentongji"]);
				this.list = [];
				this.classifyList.shading.map(function(item) {
					item.active = false;
				});
				this.message.backArr = [];
				this.classifyList.shading[index].active = true;
				this.message.backType = this.classifyList.shading[index].id;
				this.toNew();
			},
			toNew() {
				let self = this;
				let flag = [];
				let childFlag = [];
				self.message.data.list = [];
				this.classifyList.type.map(function(item, i) {
					flag[i] = 0;
					if (item.active) {
						item.list.map(function(child, j) {
							if (child.active) {
								flag[i] = 1;
								childFlag[j] = 0;
								// if(self.)
								child.numArr.map(function(son, k) {
									if (son.show) {
										childFlag[j] = 1;
										for (let m = 0; m < son.num; m++) {
											self.message.data.list.push(child.id + item.id * 100);
										}
									}
								});
								if (!childFlag[j]) {
									self.message.data.list.push(child.id + item.id * 100);
								}
							}
						});
						if (!flag[i]) {
							self.message.data.list.push(item.id * 100);
						}
					}
					self.$forceUpdate();
				});
				if (!this.message.data.list.length && !this.message.element.elements.length) {
					this.showLoading = false;
					this.showJump = true;
					Scroll.stop();
					this.err = '请先选择类别';
					window.onscroll = null;
					setTimeout(function() {
						self.showJump = false;
						self.err = '';
						Scroll.move();
					}, 1500);
				} else {
					this.loadData();
					this.getList();
				}
			},
			// 滚动加载数据
			loadData() {
				window.onscroll = () => {
					let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					let bottomOfWindow = document.documentElement.offsetHeight - scrollTop - window.innerHeight < 50;
					if (bottomOfWindow && this.mineFlag) {
						this.mineFlag = false;
						this.getList();
					}
				}
			},
			getList() {
				this.showLoading = true;
				Scroll.stop();
				let self = this;
				let formData = new FormData();
				formData.append('templateNum', 15);
				if (this.message.backType) {
					formData.append('type1', this.message.backType);
				}else{
					if(this.message.backArr.length){
						formData.append('type1', this.sourceIndex);
					}else{
						formData.append('type1',1);
					}
				}
				formData.append('data', JSON.stringify(this.message.data));
				let obj = {
					url: this.all.baseUrl + '/auto/templates',
					formdata: formData
				}
				this.getData(obj).then(res => {
					setTimeout(function() {
						self.showLoading = false;
						Scroll.move();
					}, 500);
					if (res.status == 200 && !res.data.status) {
						this.showContent = true;
						this.mineFlag = true;
						let cnt;
						let resultList = res.data.list;
						let conList = [];
						if (self.message.element.elements.length) {
							for (let m = 0; m < 10; m++) {
								let ran = Math.floor(Math.random() * (self.message.element.elements.length));
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
						if (res.data.shadings) {
							resultShadings = res.data.shadings;
						}
						
						resultTemp.map(function(item, i) {
							let tempItem = [];
							let temp = JSON.parse(item.templateData);
							for (let k = 0; k < temp.elements.length; k++) {
								tempItem.push(temp.elements[k]);
							}
							let result = {};
							if (res.data.shadings) {
								if(self.message.backArr.length){
									let m = Math.floor(Math.random() * (self.message.backArr.length));
									result.background = self.message.backArr[m];
								}else{
									result.background = resultShadings[i].pictureThumbnail;
									result.backId = resultShadings[i].id;
								}
							} else {
								result.backId = '';
								if (self.message.backArr.length) {
									let m = Math.floor(Math.random() * (self.message.backArr.length));
									result.background = self.message.backArr[m];
								} else {
									result.background = '';
								}
							}
							let index = 0;
							result.elements = [];
							
							while (tempItem.length != 0) {
								cnt = Math.floor((tempItem.length) * Math.random());
								let e = tempItem[cnt];
								e.imageUrl = resultList[index % resultList.length].elements[i].pictureThumbnail;
								e.height = e.width*resultList[index % resultList.length].elements[i].height/resultList[index % resultList.length].elements[i].width;
								e.id = resultList[index % resultList.length].elements[i].id;
								e.picture = e.imageUrl;
								e.pictureWidth = e.width;
								e.pictureHeight = e.height;
								e.isCreate = [];
								//e.order = cnt;
								if(i==0)
								{
									// console.log(e.order,'order')
								}
								for (let i = 0; i < 8; i++) {
									e.isCreate[i] = false;
								}
								e.elements = [];
								for (let i = 0; i < 8; i++) {
									e.elements[i] = '';
								}
								if (e.flip == 0) {
									e.rotateX = 0;
									e.rotateY = 0;
								} else if (e.flip == 1) {
									e.rotateX = 180;
									e.rotateY = 0;
								} else if (e.flip == 2) {
									e.rotateX = 0;
									e.rotateY = 180;
								}
								e.width = parseFloat(e.width * 4724 / 600);
								e.height = e.width * e.pictureHeight / e.pictureWidth;
								// e.height = parseFloat(e.height*7087/900);
								e.rotateZ = e.rotation;
								e.left = e.posX - parseFloat(e.width / 2 / 4724 * 600) + 'px';
								e.top = e.posY - parseFloat(e.height / 2 / 7087 * 900) + 'px';
								e.show = false;
								e.showEye = true;
								tempItem.splice(cnt, 1);
								result.elements.push(e);
								index++;
							}

							for(let i=0;i<result.elements.length;i++){
								result.elements[i].order=i;
							}
							self.judge(result);
							self.list.push(result);
						});
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				});
			},
			// 判断
			judge(obj) {
				let self = this;
				obj.elements.map(function(item, index) {
					let posx, posy;
					let order = item.order;
					let cosWidth = Math.abs((item.width / 2 * 600 / 4724) * Math.cos(item.rotateZ / 180.0 * Math.PI)) + Math.abs((
						item.height / 2 * 900 / 7087) * Math.sin(item.rotateZ / 180.0 * Math.PI));
					let cosHeight = Math.abs((item.height / 2 * 900 / 7087) * Math.cos(item.rotateZ / 180.0 * Math.PI)) + Math.abs((
						item.width / 2 * 600 / 4724) * Math.sin(item.rotateZ / 180.0 * Math.PI));
					cosWidth *= item.zoom;
					cosHeight *= item.zoom;
					if (item.posX - cosWidth < 0 && !item.isCreate[0]) {
						item.isCreate[0] = true;
						if (item.elements[3]) {
							if (item.elements[3].isCreate[7]) {
								return;
							}
							item.elements[3].isCreate[7] = true;
						}
						if (item.elements[2]) {
							if (item.elements[2].isCreate[5]) {
								return;
							}
							item.elements[2].isCreate[5] = true;
						}
						posx = item.posX + 600;
						posy = item.posY;
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[1] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[1] = item;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					if (item.posX + cosWidth > 600 && !item.isCreate[1]) {
						item.isCreate[1] = true;
						if (item.elements[3]) {
							if (item.elements[3].isCreate[6]) {
								return;
							}
							item.elements[3].isCreate[6] = true;
						}
						if (item.elements[2]) {
							if (item.elements[2].isCreate[4]) {
								return;
							}
							item.elements[2].isCreate[4] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[0] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[0] = item;
						posx = item.posX - 600;
						posy = item.posY;;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					if (item.posY + cosHeight > 900 && !item.isCreate[2]) {
						item.isCreate[2] = true;
						if (item.elements[1]) {
							if (item.elements[1].isCreate[7]) {
								return;
							}
							item.elements[1].isCreate[7] = true;
						}
						if (item.elements[0]) {
							if (item.elements[0].isCreate[6]) {
								return;
							}
							item.elements[0].isCreate[6] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[3] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[3] = item;
						posx = item.posX;
						posy = item.posY - 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});

					}
					if (item.posY - cosHeight < 0 && !item.isCreate[3]) {
						item.isCreate[3] = true;
						if (item.elements[1]) {
							if (item.elements[1].isCreate[5]) {
								return;
							}
							item.elements[1].isCreate[5] = true;
						}
						if (item.elements[0]) {
							if (item.elements[0].isCreate[4]) {
								return;
							}
							item.elements[0].isCreate[4] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[2] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[2] = item;
						posx = item.posX;
						posy = item.posY + 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					if (item.posY - cosHeight < 0 && item.posX + cosWidth > 600 && !item.isCreate[4]) {
						item.isCreate[4] = true;
						if (item.elements[1]) {
							if (item.elements[1].isCreate[3]) {
								clickShading(1);
								return;
							}
							item.elements[1].isCreate[3] = true;
						}
						if (item.elements[3]) {
							if (item.elements[3].isCreate[1]) {
								return;
							}
							item.elements[3].isCreate[1] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[7] = true;
						iscreate[2] = true;
						iscreate[0] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[7] = item;
						posx = item.posX - 600;
						posy = item.posY + 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					if (item.posY - cosHeight < 0 && item.posX - cosWidth < 0 && !item.isCreate[5]) {
						item.isCreate[5] = true;
						if (item.elements[0]) {
							if (item.elements[0].isCreate[3]) {
								return;
							}
							item.elements[0].isCreate[3] = true;
						}
						if (item.elements[3]) {
							if (item.elements[3].isCreate[0]) {
								return;
							}
							item.elements[3].isCreate[0] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[6] = true;
						iscreate[2] = true;
						iscreate[1] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[6] = item;
						posx = item.posX + 600;
						posy = item.posY + 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					if (item.posY + cosHeight > 900 && item.posX + cosWidth > 600 && !item.isCreate[6]) {
						item.isCreate[6] = true;
						if (item.elements[1]) {
							if (item.elements[1].isCreate[2]) {
								return;
							}
							item.elements[1].isCreate[2] = true;
						}
						if (item.elements[2]) {
							if (item.elements[2].isCreate[1]) {
								return;
							}
							item.elements[2].isCreate[1] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[5] = true;
						iscreate[3] = true;
						iscreate[0] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[5] = item;
						posx = item.posX - 600;
						posy = item.posY - 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					} else if (item.posY + cosHeight > 900 && item.posX - cosWidth < 0 && !item.isCreate[7]) {
						item.isCreate[7] = true;
						if (item.elements[0]) {
							if (item.elements[0].isCreate[2]) {
								return;
							}
							item.elements[0].isCreate[2] = true;
						}
						if (item.elements[2]) {
							if (item.elements[2].isCreate[0]) {
								return;
							}
							item.elements[2].isCreate[0] = true;
						}
						let iscreate = [];
						for (let i = 0; i < 8; i++) {
							iscreate[i] = false;
						}
						iscreate[4] = true;
						iscreate[3] = true;
						iscreate[1] = true;
						let elements = [];
						for (let i = 0; i < 8; i++) {
							item.elements[i] = '';
						}
						elements[4] = item;
						posx = item.posX + 600;
						posy = item.posY - 900;
						obj.elements.push({
							width: obj.elements[index].width,
							height: obj.elements[index].height,
							top: (posy - item.height * 900 / 7087 / 2) + 'px',
							left: (posx - item.width * 600 / 4724 / 2) + 'px',
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
							order: order,
							elements: elements,
							isCreate: iscreate
						});
					}
					self.$forceUpdate();
				});
			},
			getToplist() {
				let formData = new FormData();
				let self = this;
				formData.append('id', 15);
				let obj = {
					url: this.all.baseUrl + '/config/info',
					formdata: formData
				}
				this.getData(obj).then(res => {
					if (res.data.status == 0) {
						let result = res.data.result;
						this.classifyList.shading = JSON.parse(result.json1).background;
						this.classifyList.shading.map(function(item) {
							item.active = false;
							if(item.id==1){//默认选择素色，第一次加载的时候直接设置底纹为素色
								item.active = true;
							}
						});
						this.classifyList.shading.splice(0, 1);
					
						
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				});
			},
			// 获取头部分页的json数据
			getClassifyList() {
				let formData = new FormData();
				let self = this;
				formData.append('id', 4);
				let obj = {
					url: this.all.baseUrl + '/config/info',
					formdata: formData
				}
				this.getData(obj).then(res => {
					if (res.data.status == 0) {
						let result = res.data.result;
						this.classifyList.type = JSON.parse(result.json1).pdMenu;
						this.itemType = JSON.parse(result.json1).pdMenu;
						this.classifyList.style = JSON.parse(result.json2).pdStyle;
						this.classifyList.type.map(function(item) {
							item.active = false;
							item.show = false;
							if (item.name == '花') {
								item.active = true;
							}
							item.list.map(function(listItem) {
								listItem.active = false;
								listItem.numArr = [{
									show: false,
									num: 1
								}, {
									show: false,
									num: 2
								}, {
									show: false,
									num: 3
								}, {
									show: false,
									num: 4
								}, {
									show: false,
									num: 5
								}];
							});
						});
						this.classifyList.style.map(function(item) {
							item.active = false;
						});
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1000);
					}
				});
			},
			bianjif(index){
				let self = this;
				localStorage.setItem("AIjson", JSON.stringify(self.list[index]));
				self.$router.push({
					path: '/Newoperate'
				});	
			},
			download(index) {
				let self = this;
				this.showLoading = true;
				let json = {
					backId: this.list[index].backId,
					background: this.list[index].background,
					elements: []
				};
				if (!json.backId) {
					json.backId = -1;
				}
				if (this.list[index].background) {
					json.background = this.list[index].background;
				} else if (this.message.background) {
					json.background = this.message.background;
				} else {
					json.background = '';
				}
				this.list[index].elements.map(function(item) {
					let o = {
						flip: item.flip,
						order: item.order,
						height: item.height * 900 / 7087,
						width: item.width * 600 / 4724,
						posX: item.posX,
						posY: item.posY,
						rotation: item.rotation,
						imageUrl: item.imageUrl,
						id: item.id,
						zoom: item.zoom
					}
					json.elements.push(o);
				});
				// console.log(json);
				let formData = new FormData();
				formData.append('data', JSON.stringify(json));
				let obj = {
					url: this.all.baseUrl + '/auto/aiHd',
					formdata: formData
				}
				
				this.getData(obj).then(res => {
					this.showLoading = false;
					if (res.data.status == 0) {
						window.location.href = res.data.result + "?response-content-type=application%2Foctet-stream";
					} else if (res.data.status == -95) {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
							localStorage.clear();
							self.$router.push({
								path: '/Login'
							});
						}, 1500);
					} else {
						this.showJump = true;
						this.err = res.data.msg;
						Scroll.stop();
						setTimeout(function() {
							self.showJump = false;
							self.err = '';
							Scroll.move();
						}, 1500);
					}
				});
			},
			getMessage() {
				// if(localStorage.getItem('user')){
				//     this.user = JSON.parse(localStorage.getItem('user'));
				//     // 判断企业会员或者个人会员
				//     if(date.getTime()<parseInt(this.user.expirationTimePlus)){
				//         return false;
				//     }else{
				//         return true;
				//     }
				// }
			}
		},
		mounted() {
			localStorage.setItem('path', this.path);
			if (localStorage.getItem('English')) {
				this.$router.push({
					path: '/Enai'
				});
			} else {
				this.$router.push({
					path: '/Ai'
				});
			}
			this.getClassifyList();
			localStorage.removeItem('cnt');
			localStorage.removeItem('indexArr');
			localStorage.removeItem('backArr');
			this.getToplist();
			this.getList();
			this.loadData();
		
			
		},
		beforeDestroy() {
			window.onscroll = null;
		}
	}
</script>
<style scoped>
	.dialog-open {
		position: fixed;
		width: 100%;
		height: 100vh;
	}
	.modelBox {
		position: absolute;
		width: 1073px;
		height: 712px;
		top: calc(50% - 333px);
		left: calc(50% - 570px);
		box-sizing: border-box;
		padding-top: 2.437rem;
		background: #fff;
	}

	@media screen and (max-width: 87.5rem) {
		.modelBox {
			/* overflow: scroll; */
			margin: 3.125rem;
		}
	}

	.modelClose {
		position: absolute;
		right: -2.75rem;
		top: 0;
		width: 1.891rem;
	}

	.progress {
		display: none;
		position: absolute;
		width: 10px;
		height: 20.43rem;
		top: 2.5rem;
		right: 10px;
		background: #F0EFEF;
	}

	.progress div {
		width: 7px;
		height: 6.387rem;
		background: #D8D8D8;
		border-radius: 7px;
		position: relative;
	}

	.progress div:hover {
		background: #828282;
	}

	.productBoxA {
		width: 1000px;
		height: 550px;
		margin: 0 auto;
		overflow-x: auto;
	}

	.productBox {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		bottom: 1px;
		/* border: 1px solid #3b3b3b; */
	}

	.productBox li {
		background: #fff;
		border: 1px solid #3b3b3b;
		overflow: hidden;
		width: 166px;
		height: 248px;
		margin-right: 37px;
		margin-bottom: 50px;
		position: relative;
		display: flex;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.productBox li:nth-child(5n){
		margin-right: 0;
	}
	.productBox input {
		position: absolute;
		z-index: 9;
		width: 1.125rem;
		height: 1.125rem;
		left: 0;
		top: 0;
		width: 6.476rem;
		height: 9.698rem;
		border: none;
		opacity: 0;
	}

	.productBox span {
		position: absolute;
		z-index: 8;
		width: 12px;
		height: 12px;
		background: url('../../assets/image/ai/select.png') no-repeat center;
		background-size: 100%;
		left: .6875rem;
		top: .6875rem;
	}

	.productBox input:checked+span {
		background: url('../../assets/image/ai/selected.png') no-repeat center;
		background-size: 100%;
	}

	.productImg {
		max-width: 13.75rem;
		max-height: 20.375rem;
		display: block;
	}

	/* 分页器 */
	.oPage {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 1.25rem;
	}

	ul.pageBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	ul.pageBox li {
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

	ul.pageBox li.click {
		background: #133ffc;
		color: #fff;
	}

	ul.pageBox li img {
		display: block;
		width: .5rem;
		height: 1rem;
	}

	.oBox {
		display: flex;
		align-items: center;
		margin-left: .625rem;
	}

	.oBox span {
		display: block;
		width: 11.035rem;
		height: 2.27rem;
		line-height: 2.27rem;
		cursor: default;
		border: 1px solid #F06D29;
		font-size: 1rem;
		background: inherit;
		color: #F06D29;
		margin: 0;
	}

	.oBox span.sureBtn {
		background: #F06D29;
		color: #fff;
	}

	.oUp {
		display: flex;
		align-items: center;
		position: relative;
	}

	.oUp input {
		position: absolute;
		left: .625rem;
		top: 0;
		width: 7.5rem;
		opacity: 0;
		height: 2.5rem;
	}

	/* 介绍 */
	.ai {
		min-height: 100vh;
		background: #eee;
	}

	.content {
		width: 100%;
	}

	.smallBox {
		height: 190px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background: #fff;
		margin: 0 auto;
	}

	.shareBox {
		width: 100%;
		margin: 2.3962rem auto 0;
	}

	.classify {
		width: 1240px;
		position: relative;
		display: flex;
		justify-content: start;
		margin: 0 auto;
	}

	.classify h4 {
		font-size: 16px;
		color: rgba(51, 51, 51, 0.50);
		font-weight: bold;
		flex-shrink: 0;
		line-height: 59px;
	}

	.classify ul.classBox {
		display: flex;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		font-size: 14px;
		height: 59px;
		min-width: 1555px;
	}

	ul.classBox li {
		position: relative;
		cursor: default;
		height: 32px;
		text-align: center;
		line-height: 32px;
		border: 1px solid #fff;
	}

	.classify>span {
		font-size: 14px;
		border: 1px solid #fff;
		padding: 5px 16px;
		color: #333;
	}

	ul.classBox li>span {
		position: relative;
		z-index: 2223;
		color: #8d8d8d;
		font-size: 14px;
		padding: 8px;
		padding-bottom: 0;
	}

	ul.classBox li>img {
		margin-right: 5px;
	}

	ul.classBox li>span:hover,
	ul.classBox li.click>span,
	.listBox>div>span:hover,
	.listBox>div>span.click,
	.listBox>div>span>span p:hover {
		color: #F06D29;
	}

	ul.classBox li.addClass {
		margin-right: 0;
		font-size: 14px;
		margin-left: 15px;
		color: #F06D29
	}
	.addClass:hover,.classBox li span:hover,.listBox>div>span:hover,.numBox p:hover{
		cursor: pointer;
	}
	ul.classBox .listBox {
		position: absolute;
		width: 1200px;
		height: 2.891rem;
		background: #fff;
		line-height: 2.891rem;
		border: 1px solid #F06D29;
		cursor: default;
		top: 77%;
		left: 0;
		text-align: left;
		z-index: 20;
	}

	.listBox>div {
		display: flex;
	}

	.listBox>div>span {
		font-size: 15px;
		color: #666666;
		margin: auto 1rem;
	}

	.listBox>div>span.click {
		font-weight: bold;
	}

	.numBox {
		width: 2rem;
		position: absolute;
		top: 3rem;
		text-align: center;
		background: #fff;
		z-index: 22;
		overflow: hidden;
		transition: height 0.5s;
	}

	.numBox p {
		color: #666666;
	}

	/* .numList{
        position: absolute;
        width: 26.67rem;
        background: #fff;
        display: inline-block;
        line-height: 2.891rem;
        top: 77%;
        text-align: left;
        z-index: 20;
        left:0;
    }
    .numList p{
        font-size: .875rem;
        color: #8d8d8d;
        padding-bottom: .6875rem;
    }
    .numList p:hover{
        color: #333;
        font-weight: bold;
    } */
	.listBox>span:hover .numList {
		display: block;
	}

	.numList p.click {
		color: #133ffc;
		font-weight: bold;
	}

	p.conBox {
		text-align: center;
		line-height: 31.25rem;
		color: #333;
		font-size: 1.875rem;
	}

	ul.proBox {
		box-sizing: border-box;
		overflow: hidden;
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 5rem;
	}

	ul.proBox li {
		width: 220px;
		height: 328px;
		overflow: hidden;
		float: left;
		background: #fff;
		margin-right: 24px;
		margin-bottom: 24px;
		display: flex;
		justify-content: center;
		flex-shrink: 1;
		position: relative;
		align-items: center;
		box-shadow: .125rem .125rem .125rem #ddd;
	}

	ul.proBox li:nth-child(5n+0) {
		margin-right: 0;
	}

	ul.proBox li>div {
		position: absolute;
	}

	.operateBox {
		width: 100%;
		height: 66px;
		top: 263px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.operateBox>div {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.operateBox .operate {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		background: #f2f2f2;
		align-items: center;
		justify-content: center;
		margin-right: 6px;
		font-size: small;
	}

	.operate:hover {
		background: #ffd500;
		cursor: pointer;
	}
	.operate{
		position: relative;
	}
	.operateBox .operate>span{
		position: absolute;
		display: inline;
		top: -18px;
	}
	.operate img {
		width: 16px;
		height: 16px;
	}

	.operateBox>span {
		width: 80px;
		height: 36px;
		font-size: 12px;
		color: #333333;
		text-align: left;
		margin: auto 0;
		margin-left: 13px;
	}

	.toNew {
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
		border: none;
		outline: none;
	}

	/* 连晒弹窗 */
	.bigModel {
		position: fixed;
		z-index: 9999;
		top: 0;
		height: 100vh;
		width: 100%;
		overflow-y: scroll;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
	}

	.grabBox {
		width: 22.5rem;
		height: 11.25rem;
		background: #fff;
		border-radius: .625rem;
		margin: 0 auto;
		position: relative;
		margin-top: 25rem;
	}

	.grabBox h3 {
		padding-top: .9375rem;
		font-weight: normal;
		font-size: 1.5rem;
		margin: 0;
	}

	.grabBox .del {
		position: absolute;
		width: 1.25rem;
		height: 1.25rem;
		right: .5rem;
		top: .5rem;
		line-height: 1.25rem;
		text-align: cneter;
		cursor: pointer;
	}

	.del img {
		width: 100%;
		display: block;
	}

	.grabBox span {
		display: block;
		margin: .9375rem 0 1.875rem;
	}

	.grabBox .grabWay {
		display: flex;
		justify-content: space-around;
	}

	.grabWay button {
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

	.picBox {
		position: absolute;
		background: #fff;
		top: 50px;
		left: calc(50% - 650px);
		margin-bottom: 50px;
		width: 1300px;
		height: 1000px;
		border-radius: .625rem;
	}

	.specialPic {
		width: 700px;
		height: 1000px;
		left: calc(50% - 350px);
	}

	.picDel {
		position: absolute;
		width: 25px;
		height: 25px;
		right: -36px;
		top: 15px;
	}

	.picDel img {
		display: block;
		width: 100%;
	}

	.linkBox {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40px;
		justify-content: center;
	}

	.linkBox ul {
		width: 300px;
		height: 450px;
		overflow: hidden;
		background-size: 100% 100%;
	}

	.linkBox ul li {
		width: 300px;
		height: 450px;
		position: relative;
	}

	.linkBox ul li>div {
		position: absolute;
	}

	.proNone {
		width: 100%;
	}

	.proNone div {
		width: 220px;
		height: 240px;
		margin: 10.87rem auto 0;
	}

	.proNone>div img {
		width: 200px;
		height: 200px;
		display: block;
	}

	.proNone>div span {
		display: block;
	}
</style>
