<template>
    <van-list
      class="comment-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @subtract-like="item.like_count--"
        @add-like="item.like_count++"
        @like-success="item.is_liking = $event"
      />
    </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validator: (val) => {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onLoad () {
      try {
        // 获取评论
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        // 为数组赋值
        const { results } = data.data
        this.list.push(...results)
        // 改变加载状态
        this.loading = false
        // 将评论总数传递给父组件
        this.$emit('total-count', data.data.total_count)
        // 判断是否还有数据
        if (results.length) {
          // 有, 则将offset设置
          this.offset = data.data.last_id
        } else {
          // 无, 结束加载
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('评论数据获取失败')
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
