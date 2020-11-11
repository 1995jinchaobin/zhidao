<template>
  <div class="mould">
    <div class="all">
      <div class="top">
        <div class="title">
          <div class="title1">{{content.title}}</div>
          <div class="title2">
            <div class="areaTime">
              <div class="area">
                <i class="iconfont icon-weibiaoti-"></i>
                <span>{{content.area}}</span>
              </div>
              <div class="time">
                <i class="iconfont icon-shijian"></i>
                <span>{{content.createTime | time}}</span>
              </div>
            </div>
            <div class="price">{{content.price}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div v-html="content.content">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mould',
  props: {
    content: Object
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
.mould .all{
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 35px;
  width: 901px;
  height: 1041px;
  box-sizing: border-box;
}
.top{
  height: 100px;
  border-bottom: 1px solid #eee;
}
.title1{
  margin-top: 7px;
  height: 37px;
  font-size: 37px;
  text-align: left;
}
.title2{
  display: flex;
  justify-content: space-between;
  height: 66px;
  align-items: center;
}
.areaTime{
  display: flex;
}
.price{
  font-size: 33px;
  color:  #FF6600;
}
.time{
  margin-left: 30px;
}
.all{
  text-align: left;
}
.all ul li {
    list-style-type: disc;
    list-style-position:inside
}
.all ol li{
  list-style-type:decimal; list-style-position:inside;
}  
</style>