<template>
    <div class="article-container" ref="list">
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
          <article-item v-for="(item, i) in list" :key="i" :article="item">
          </article-item>
        </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticlePage',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      time: null,
      error: false,
      isLoading: false,
      pullSuccessText: '',
      scrollTop: 0
    }
  },
  created () {

  },
  mounted () {
    this.$refs.list.onscroll = debounce(() => {
      this.scrollTop = this.$refs.list.scrollTop
      console.log(this.scrollTop)
    }, 500)
  },
  activated () {
    this.$refs.list.scrollTop = this.scrollTop
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
