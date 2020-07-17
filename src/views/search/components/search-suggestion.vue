<template>
    <div class="search-suggestion">
      <van-cell
        icon="search"
        v-for="(item, i) in suggestionList"
        :key="i"
        @click="$emit('onSearch', item)">
        <div slot="title" v-html="highLight(item)"></div>
        </van-cell>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestion } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {

  },
  data () {
    return {
      suggestionList: []
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 加载联想结果
    async loadSuggestion (val) {
      try {
        const { data } = await getSuggestion(val)
        this.suggestionList = data.data.options
      } catch (error) {
        this.$toast('获取联想结果失败')
      }
    },
    // 搜索文字高亮
    highLight (text) {
      // 正则方法
      // const newText = `<span style="color: red">${this.searchText}</span>`
      // const reg = new RegExp(this.searchText, 'gi')
      // return text.replace(reg, newText)

      // 字符串转数组方法
      const arr = text.split(this.searchText)
      return arr.join(`<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {

  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSuggestion(val)
      }, 1000),
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">

</style>
