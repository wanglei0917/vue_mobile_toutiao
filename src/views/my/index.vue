<template>
    <div class="my-container">
      <!-- 已登录 -->
      <div class="header login" v-if="user">
        <div class="user">
          <div class="base-info">
            <div class="left">
              <van-image
                round
                class="avar"
                :src="userInfo.photo"
              />
              <span>{{userInfo.name}}</span>
            </div>
            <div class="right">
              <van-button round size="small">编辑资料</van-button>
            </div>
          </div>
          <div class="data-info">
            <div class="data-item">
              <span class="count">{{userInfo.art_count}}</span>
              <span class="text">头条</span>
            </div>
            <div class="data-item">
              <span class="count">{{userInfo.follow_count}}</span>
              <span class="text">关注</span>
            </div>
            <div class="data-item">
              <span class="count">{{userInfo.fans_count}}</span>
              <span class="text">粉丝</span>
            </div>
            <div class="data-item">
              <span class="count">{{userInfo.like_count}}</span>
              <span class="text">获赞</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 未登录 -->
      <div class="header not-login" v-else>
        <div class="go-login" @click="gologin">
          <img
            class="login-img"
            src="~@/assets/mobile.png"
          />
          <span>登录 / 注册</span>
        </div>
      </div>

      <!-- 宫格区域 -->
      <van-grid :column-num="2" clickable class="nav-grid">
        <van-grid-item text="收藏"><i slot="icon" class="iconfont icon-shoucang"></i></van-grid-item>
        <van-grid-item text="历史"><i slot="icon" class="iconfont icon-lishi"></i></van-grid-item>
      </van-grid>

      <!-- 单元格区域 -->
      <van-cell-group class="cell-box">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
      <van-cell title="退出登录" class="unlogin" clickable v-if="user" @click="unlogin"/>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'MyPage',
  props: { },
  components: {

  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  mounted () {

  },
  methods: {
    // 获取用户自己信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail('数据获取失败')
      }
    },
    // 去登陆
    gologin () {
      this.$router.push('/login')
    },
    // 退出登录
    unlogin () {
      this.$dialog.confirm({
        title: '确认退出?'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$toast('已退出')
        })
        .catch(() => {
        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {

  }
}
</script>

<style scoped lang="less">
.my-container {
  .login {
    height: 362px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .user {
      padding: 73px 30px 0;
      box-sizing: border-box;
      .base-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avar {
            width: 134px;
            height: 134px;
            margin-right: 15px;
          }
          span {
            font-size: 32px;
            color: #fff;
          }
        }
      }
      .data-info {
        margin-top: 40px;
        display: flex;
        .data-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 32px;
          }
        }
      }
    }
  }
  .not-login {
    height: 362px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .go-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      .login-img {
        width: 134px;
        height: 134px;
        margin-bottom: 15px;
        border-radius: 50%;
      }
      span {
        font-size: 28px;
        color: #ffffff;
      }
    }
  }
  .nav-grid {
    .van-grid-item__text {
      font-size: 26px;
    }
    i.iconfont {
      font-size: 45px;
    }
    i.icon-shoucang {
      color: tomato;
    }
    i.icon-lishi {
      color: #fe9b1d;
    }
  }
  .unlogin {
    margin-top: 10px;
    text-align: center;
    color: tomato;
    font-size: 32px;
  }
}
</style>
