<template>
    <div v-if="userId !== articleId">
      <van-button
        v-if="!value"
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        :loading="isLoading"
        @click="onFollow"
        size="small"
        icon="plus"
      >关注</van-button>
      <van-button
        v-else
        class="follow-btn"
        round
        :loading="isLoading"
        @click="onFollow"
        size="small"
      >已关注</van-button>
    </div>
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'
import { getItem } from '@/utils/storage'
export default {
  name: 'FollowUser',
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
      isLoading: false,
      userId: getItem('USER_ID')
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async onFollow () {
      this.isLoading = true
      try {
        if (this.value) {
          await deleteFollow(this.articleId)
        } else {
          await addFollow(this.articleId)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isLoading = false
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
