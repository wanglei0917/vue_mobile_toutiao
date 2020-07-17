<template>
    <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
          v-for="item in list"
          :key="item.art_id"
          :title="item.title" />
      </van-list>
    </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  name: 'SearchResult',
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
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 15
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })

        const { results } = data.data
        this.list.push(...results)

        this.loading = false

        // 数据是否加载完毕
        if (results.length) {
          this.page += 1
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
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
