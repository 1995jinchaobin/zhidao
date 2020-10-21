<template>
  <div class="knowledge">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'knowLedgePhone',
  data(){
    return{
      path:'/knowLedge/Phone'
    }
  },
  methods:{

  },
  mounted(){
    document.getElementById('app').style.cssText = "min-width: 100%;";
    document.body.style.cssText = 'min-width: 100%;';
    // localStorage.setItem('path',this.path);
  },
  beforeDestroy(){
    document.getElementById('app').style.cssText = "";
    document.body.style.cssText = '';
  }
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
</style>