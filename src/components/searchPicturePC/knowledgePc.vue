<template>
  <div class="knowledge">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      path:'/Knowledge/Pc'
    }
  },
  methods:{

  },
  mounted(){
    // localStorage.setItem('path',this.path);
  }
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
</style>