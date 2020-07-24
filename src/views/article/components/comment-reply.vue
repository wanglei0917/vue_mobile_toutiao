<template>
    <div class="commnet-reply">
      <!-- 头部导航栏 -->
      <van-nav-bar title="XX条回复">
        <van-icon name="cross" slot="left" @click="$store.commit('setReplyShow', {flag: false})"/>
      </van-nav-bar>

      <!-- 评论 -->
      <comment-item :comment="comment"></comment-item>
      <van-cell>全部回复</van-cell>
      <!-- 回复 -->
      <comment-list
        :list="replyList"
        :source="comment.com_id"
        type="c"
        ></comment-list>

        <!-- 发布回复 -->
        <van-button class="post-warp" round @click="$store.commit('setPostShow', true)">写评论</van-button>

        <van-popup
          :value="isPostShow"
          position="bottom"
          >
          <comment-post :target="comment.com_id"></comment-post>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  props: {

  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      replyList: []
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {
    ...mapState(['comment', 'isPostShow'])
  },
  watch: {

  }
}
</script>

<style scoped lang="less">
.post-warp {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  width: 100%;
  height: 88px;
  justify-content: center;
}
</style>
