<template>
    <div class="search-history">
      <van-cell title="历史记录">
        <span style="margin-right: 10px" v-if="isShow" @click="$emit('delete')">全部删除</span>
        <span v-if="isShow" @click="isShow = false">完成</span>
        <van-icon name="delete" v-if="!isShow" @click="isShow = true"></van-icon>
      </van-cell>

      <van-cell v-for="(item, i) in searchHistory" :key="i" @click="toSearch(item)">
        <span slot="title">{{item}}</span>
        <van-icon name="close" v-show="isShow" @click="$emit('deleteOne', i)"></van-icon>
      </van-cell>
    </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  components: {

  },
  data () {
    return {
      isShow: false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    deleteHistory () {
      this.$emit('delete')
    },
    toSearch (item) {
      if (!this.isShow) {
        this.$emit('searchHistory', item)
      }
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped lang="less">

</style>
