<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="user.name" left-arrow />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          :src="user.photo"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{ user.art_count }}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{ user.follow_count }}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{ user.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{ user.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="default"
              size="small"
            >编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{ user.certi ? user.certi : '暂无认证' }}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{ user.intro }}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
export default {
  name: 'UserPage',
  components: {},
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserInfo()
  },
  mounted () {},
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfoById(this.userId)
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户信息失败, 请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
