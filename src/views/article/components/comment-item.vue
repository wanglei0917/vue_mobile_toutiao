<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :loading="likeBtnLoading"
        :class="{active: comment.is_liking}"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onLikeComment"
      >{{ comment.like_count ? comment.like_count : '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | formateDate }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$store.commit('setReplyShow', {flag: true, comment})"
        >回复 {{ comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteLikeComment, addLikeComment } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      likeBtnLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLikeComment () {
      this.likeBtnLoading = true
      try {
        if (this.comment.is_liking) {
          // 已点赞, 取消点赞
          await deleteLikeComment(this.comment.com_id)
          this.$emit('subtract-like')
        } else {
          // 未点赞, 添加点赞
          await addLikeComment(this.comment.com_id)
          this.$emit('add-like')
        }
        this.$emit('like-success', !this.comment.is_liking)
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.likeBtnLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .active {
    color: sandybrown;
  }
}
</style>
