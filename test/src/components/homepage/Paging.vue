<template>
  <div class="fens">
    <Tab :path="path" :tabIndex="tabIndex"></Tab>
    <div class="fsCount">
      <img src="../../assets/image/homepage/fsbg.png" alt="">
    </div>
    <div style="height: 1px;"></div>
  </div>
</template>

<script>
import Tab from '../../components/Tab';
export default {
  name: 'Paging',
    components: {
        Tab
    },
    data(){
      return {
        path:'/Paging',
        tabIndex: 0
      }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>
 .fens{
   width: 100%;
   background: #eee;
 }
 .fens div.fsCount{
   width: 1200px;
   height: 600px;
   margin: 123px auto 180px;
   background:#fff;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .fens div img{
   width: 1045px;
   height: 422px;
 }
</style>