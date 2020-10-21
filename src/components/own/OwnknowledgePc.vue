<template>
  <div class="knowledge">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      path:'/OwnKnowledge/Pc'
    }
  },
  methods:{
    
  },
  mounted(){
    
  }
}
</script>

<style scoped>
  .knowledge{
    width: 100%;
  }
</style>