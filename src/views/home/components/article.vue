<template>
    <div class="article-container">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-duration="1500"
        :success-text="pullSuccessText">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell
            v-for="(item, i) in list"
            :key="i"
            :title="item.title"
          />
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import { getArticleList } from '@/api/article'

export default {
  name: 'ArticlePage',
  props: {
    channel: {
      type: Object,
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
      time: null,
      error: false,
      isLoading: false,
      pullSuccessText: ''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 展示文章,上拉加载
    async onLoad () {
      try {
        // 获取数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.time || Date.now(),
          with_top: 0
        })
        // 展示数据
        const { results } = data.data
        this.list.push(...results)
        // 切换加载状态
        this.loading = false
        // 判断加载是否完成
        if (results.length) {
          this.time = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0
        })
        this.list.unshift(...data.data.results)
        this.loading = false
        this.isLoading = false
        this.pullSuccessText = `刷新成功,更新了${data.data.results.length}条数据`
      } catch (err) {
        this.pullSuccessText = '刷新失败'
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
.article-container {
  height: 80vh;
  overflow-y: auto;
}
</style>
