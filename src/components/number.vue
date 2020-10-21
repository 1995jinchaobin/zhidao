<template>
  <div class="number-grow-warp">
    <ul class="numList">
      <li :class="item != ',' ? 'boxItem' : 'comma'" v-for="(item,index) in newNum" :key="index">
          <!-- <p v-if="item != ','" class="boxItem" >
              <span :style="{transform: 'translate(-50%,-'+item+'0%)'}">0123456789</span>
          </p>
          <p v-else-if="item == ','" class="comma">{{item}}</p> -->
          <div v-if="item != ','" :style="{transform: 'translate(-0%,-'+item+'1%)'}">
            <span  v-for="(item,index) in nums" :key="index">{{item}}</span>
          </div>
          <div v-else>
            <span  class="comma">{{item}}</span>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Num: {
      type: Number
    }
  },
  data(){
    return{
      newNum:'',
      nums:[0,1,2,3,4,5,6,7,8,9]
    }
  },
  methods: {
    numberGrow () {
      let newNum = '';
      for(let i =0;i < this.Num.toString().length;i++){
          newNum += 0;
      }
      newNum = newNum.replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,');
      this.newNum = newNum.split('');
      setTimeout(() => {
        this.setNum(this.Num);
      },500)
    },
    setNum(value){
      let newValue = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,');
      for(let i = 0;i < this.newNum.length;i++){
        if(!isNaN(this.newNum[i])){
          this.newNum[i] = newValue.substr(i,1);
        }
      }
      this.$forceUpdate()
    }
  },
  mounted () {
    this.numberGrow();
    let _this = this;
    let num = this.Num;
    setInterval(() => {
      let addNum = Math.floor(Math.random()*10);
      num = num + addNum;
      _this.setNum(num);
    },5000)
  }
}
</script>

<style>
  ul.numList{
    display: flex;
    position: relative;
    top: 10px;
  }
  ul.numList li{
    display: flex;
  }
  ul.numList>li+li{
    margin-left: 5px;
  }
  .boxItem{
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 70px;
    background: #FFE300;
    border-radius: 8px;
    font-size: 30px;
    color: #000000;
    overflow: hidden;
  }
  .boxItem div{
    transition: all 0.5s;
  }
  .boxItem div span{
    display: inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    color: #000000;
    font-weight: bold;
  }
  /* .boxItem{
      position: relative;
      display: inline-block;
      text-align: center;
      writing-mode: vertical-lr;
      text-orientation: upright;
      overflow: hidden;
      width: 60px;
      height: 70px;
      background: #FFE300;
      border-radius: 8px;
      font-size: 30px;
      color: #000000;
      line-height: 70px;
      font-weight: bold;
  } */
  /* .boxItem span{
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translate(-50%,-50%);
      letter-spacing: 15px;
      transition: all 0.5s;
  } */
  .comma{
    display: inline-block;
    width: 7px;
    height: 36px;
    background: #fff;
    font-size: 30px;
    line-height: 111px;
    color: #000000;
    font-weight: bold;
    position: relative;
    top: -4px;
    overflow: inherit;
  }
</style>