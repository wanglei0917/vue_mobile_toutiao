<template>
    <div class="search-container">
      <!-- 搜索框 -->
      <form action="/" class="search-form">
        <van-search
          v-model="searchText"
          show-action
          clearable
          shape="round"
          background="#3296fa"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="$router.back()"
          @focus="isResultShow = false"
        />
      </form>
      <!-- 搜索结果 -->
      <search-result
        v-if="isResultShow"
        :search-text="searchText"
        >
      </search-result>

      <!-- 联想建议 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @onSearch="onSearch"
        >
      </search-suggestion>

      <!-- 搜索历史 -->
      <search-history
        v-else
        :search-history="searchHistory"
        @delete="searchHistory = []"
        @deleteOne="deleteOnce"
        @searchHistory="onSearch"
        >
      </search-history>

    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  props: {

  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('SEARCH_HISTORY') || []
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
      const i = this.searchHistory.indexOf(val)
      if (i !== -1) {
        this.searchHistory.splice(i, 1)
      }
      this.searchHistory.unshift(val)
    },
    deleteHistory () {
      this.searchHistory = []
    },
    deleteOnce (i) {
      this.searchHistory.splice(i, 1)
    }
  },
  computed: {

  },
  watch: {
    searchHistory (val) {
      setItem('SEARCH_HISTORY', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .search-form {
    /deep/ .van-search__action {
      color: #fff;
      background-color: #3296fa;
    }
  }
}
</style>
