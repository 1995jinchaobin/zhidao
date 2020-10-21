<template>
  <div class="knowledge">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      path:'/Knowledge'
    }
  },
  methods:{
    toPc(){
      this.$router.push({
        path:'/knowledge/Pc'
      })
    },
    toPhone(){
      this.$router.push({
        path:'/knowledge/Phone'
      })
    },
    getType(){
      if(window.outerWidth > 800){
        this.toPc();
      }else{
        this.toPhone();
      }
    }
  },
  mounted(){
    this.getType();
  } 
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
</style>