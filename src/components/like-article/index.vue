<template>
    <van-icon
      :color="value === 1 ? '#ff8344' : '#777'"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{ active: value === 1 }"
      @click="onLike"
    />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onLike () {
      let status = 0
      try {
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          this.$toast.success('点赞成功')
          status = 1
        }
        this.$emit('input', status)
      } catch (error) {
        this.$toast.fail('操作失败, 请稍后重试')
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
