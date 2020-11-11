<template>
  <div class="releaseTags">
    <div class="tags" v-for="(item, index) in tagsAll" :key="index">
      <div :class="[item.id===tagsId?'yellow':'','tagsContent']" @click.prevent="tagsChange(item.name, item.id)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tags',
  props:{
    tagsAll: Array
  },
  data () {
    return {
      tagsId: ''
    }
  },
  methods: {
    tagsChange (name, id) {
      console.log(name)
      this.tagsId = id
      this.$emit('tagsName', id)
    }
  }
}
</script>

<style>
  .releaseTags{
    display: flex;
    margin-bottom: 30px;
  }
  .tags{
    width: 96px;
    height: 42px;
    /* background-color: red; */
  }
  .tagsContent{
    width: 80%;
    background-color: #F3F3F3;
    height: 100%;
    line-height: 42px;
    border-radius: 20px;
    cursor: pointer;
  }
  .yellow{
    background-color: #FFE300;
  }
</style>