<template>
  <div class="knowledge">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      path:'/'
    }
  },
  methods:{
    toPc(){
      if(localStorage.getItem('user')){
        this.$router.push({
          path:'/Ownknowledge/Pc'
        })
      }else{
        this.$router.push({
          path:'/OwnKnowledge/Pc/piclogin'
        })
      }
    },
    // toPhone(){
    //   this.$router.push({
    //     path:'/knowledge/Phone'
    //   })
    // },
    // getType(){
    //   if(window.outerWidth > 800){
    //     this.toPc();
    //   }else{
    //     this.toPhone();
    //   }
    // }
  },
  mounted(){
    this.toPc();
  } 
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
</style>