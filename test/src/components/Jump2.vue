<template>
  <div class="Jump">
    <!-- 弹窗组件 -->
    <span>
      
      <img v-if="change != 'duihao'" class="jumpImg3" :src="url2" />
      <img v-else-if="change == 'duihao'" class="jumpImg3" :src="url3" />
      <p>{{title}}</p>
    </span>
  </div>
</template>
<script>
export default {
  name: "Jump",
  props: {
    title: String,
    change: String
  },
  data() {
    return {
      errurl: require("../assets/image/user/cuowu.png"),
      url: require("../assets/image/user/dui.png"),
      url2: require("../assets/image/3d/gantan.png"),
      url3: require("../assets/image/3d/duihao.png"),
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.Jump {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  overflow: hidden;
  z-index: 9999999;
}
.Jump span {
  width: 442px;
  height: 130px;
  display: flex;
  margin: 0 auto;
  margin-top: calc(50vh - 3rem);
  background: #F6F6F6;
  line-height: 130px;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.jumpImg1 {
  width: 30px;
  margin-right: 6px;
}
.jumpImg2 {
  width: 22px;
  margin-right: 6px;
}
.jumpImg3 {
  width: 22px;
  margin-right: 57px;
  background-size: 43px 43px;
}
</style>