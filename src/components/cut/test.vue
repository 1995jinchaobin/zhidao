<template>
	<div>
		<div class="window" @mouseup="canvasup">
			<div style="position: relative;left: 0px;top: 0px;width: 1000px;height: 1000px;">
				<canvas @mousedown="canvasdown" @mousemove.stop="canvasmove" id="canvas_draw" :width="canvasWidth" :height="canvasHeight"></canvas>
			</div>
		</div>
		<button @click="typef(1)">移动</button>
		<button @click="typef(2)">画笔</button>
		<!-- <button @click="doDraw(imageUrl)">绘制</button> -->

		<!-- <button id="clear_all" @click="clear">清空</button> -->
		<button id="" @click="printPiexs">输出数组</button>
		<button id="" @click="scale">缩放</button>
		<input type="text" v-model="scaleSize" />
		<!-- <input type="text" v-model="thickness" /> -->
		<!-- <img :src="imageUrl" width="100" height="100" alt=""> -->
	</div>
</template>
<script>
	// import proxy from './proxy.js'
	//const uuid = require('node-uuid')

	export default {
		data() {
			return {
				imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574081254095&di=b37c03534e531ca8fde8c14aba3a0bf0&imgtype=0&src=http%3A%2F%2Fpic44.nipic.com%2F20140723%2F18505720_094503373000_2.jpg",
				type: 1,
				isMove: false,
				isDraw: false,
				oldMouseX: 0,
				oldMouseY: 0,
				canvasWidth: 0,
				canvasHeight: 0,
				canvasX: 0,
				canvasY: 0,
				piexs: [], //记录鼠标点
				lastPiexs: [], //最后一次记录的鼠标点
				firstPoint: null,
				scaleSize: 1
			};
		},
		methods: {
			doDraw(imageUrl) {
				var canvas = document.getElementById("canvas_draw");
				if (!canvas) {
					return false;
				} else {
					var context = canvas.getContext("2d");
					var img = new Image();
					img.src = imageUrl;
					img.onload = function() {
						if (this.scaleSize == undefined) {
							this.scaleSize = 1;
						}
						canvas.setAttribute("width", img.width * this.scaleSize);
						canvas.setAttribute("height", img.height * this.scaleSize);
						if (img.complete) {
							context.drawImage(
								img,
								0, 0,
								img.width * this.scaleSize,
								img.height * this.scaleSize
							);

						}
					};
					this.canvasWidth = img.width * this.scaleSize;
					this.canvasHeight = img.height * this.scaleSize;
				}
			},
			typef(type) {
				this.type = type;
			},
			canvasdown(e) {
				this.isMove = true;
				this.isDraw = true;
				this.oldMouseX = e.x;
				this.oldMouseY = e.y;
			},
			canvasmove(e) {
				let newMouseX = e.x;
				let newMouseY = e.y;
				if (this.isMove && this.type == 1) {
					let oldLeft = e.currentTarget.parentElement.style.left.substring(0, e.currentTarget.parentElement.style.left.length -
						2);
					let oldTop = e.currentTarget.parentElement.style.top.substring(0, e.currentTarget.parentElement.style.top.length -
						2);
					var newLeft = parseInt(oldLeft) + parseInt(newMouseX) - parseInt(this.oldMouseX) + 'px';
					var newTop = parseInt(oldTop) + parseInt(newMouseY) - parseInt(this.oldMouseY) + 'px';
					e.currentTarget.parentElement.style.left = newLeft;
					e.currentTarget.parentElement.style.top = newTop;

					this.canvasX = this.canvasX + parseInt(newMouseX) - parseInt(this.oldMouseX);
					this.canvasY = this.canvasY + parseInt(newMouseY) - parseInt(this.oldMouseY);

					this.oldMouseX = newMouseX;
					this.oldMouseY = newMouseY;
				} else if (this.isDraw && this.type == 2) {
					let x = e.x;
					let y = e.y;
					let piex = {
						x: (x - this.canvasX)/this.scaleSize,
						y: (y - this.canvasY)/this.scaleSize
					};
					this.piexs.push(piex);
					this.lastPiexs.push(piex);
					//此处画一个点
					var canvas = document.getElementById("canvas_draw");
					var context = canvas.getContext("2d");
					if (this.firstPoint == null) {
						context.moveTo(piex.x*this.scaleSize, piex.y*this.scaleSize);
						this.firstPoint = piex;
					} else {
						context.lineTo(piex.x*this.scaleSize, piex.y*this.scaleSize);
					}
					context.strokeStyle = "red";
					context.lineWidth = 10
					context.stroke();
				}

			},
			canvasup(e) {
				this.isMove = false;
				this.isDraw = false;
				this.firstPoint = null;
				//this.piexs.push(this.lastPiexs);
			},
			printPiexs() {
				console.log(this.piexs)
			},
			scale() {
				this.reDarw();
			},
			reDarw() {
				var canvas = document.getElementById("canvas_draw");
				if (!canvas) {
					return false;
				} else {
					var context = canvas.getContext("2d");
					context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
					var img = new Image();
					img.src = this.imageUrl;
					let self = this;
					img.onload = function() {
						canvas.setAttribute("width", img.width * self.scaleSize);
						canvas.setAttribute("height", img.height * self.scaleSize);
						if (img.complete) {
							context.drawImage(
								img,
								0, 0,
								img.width * self.scaleSize,
								img.height * self.scaleSize
							);
							context.strokeStyle = "red";
							for (var i = 0; i < self.piexs.length; i++) {
								let piex = self.piexs[i];
								if (self.firstPoint == null) {
									context.moveTo(piex.x*self.scaleSize, piex.y*self.scaleSize);
									self.firstPoint = piex;
								} else {
									context.lineTo(piex.x*self.scaleSize, piex.y*self.scaleSize);
								}
							}
							context.stroke();
						}
					};
					this.canvasWidth = img.width * this.scaleSize;
					this.canvasHeight = img.height * this.scaleSize;
				}
			}
		},
		mounted() {
			this.doDraw(this.imageUrl);
		}
	};
</script>
<style scoped>
	.canvas {
		cursor: crosshair;
	}

	#canvas_draw {
		/* border: 1px solid rgb(199, 198, 198); */
		position: relative;
		left: 0;
		top: 0;
	}

	.window {
		width: 500px;
		height: 500px;
		overflow: hidden;
		border: 2px solid red;
	}
</style>
