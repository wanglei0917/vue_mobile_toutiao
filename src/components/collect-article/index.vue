<template>
    <van-icon
      :name="value ? 'star' : 'star-o'"
      :class="{ active: value }"
      @click="onCollect"
    />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
    async onCollect () {
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏成功')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败')
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
.active {
  color: #ff6700;
}
</style>
