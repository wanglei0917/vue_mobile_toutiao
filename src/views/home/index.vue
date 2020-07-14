<template>
    <div class="home-container">
      <!-- 搜索框 -->
      <van-nav-bar class="page-nav-bar">
        <van-button
          icon="search"
          type="default"
          size="small"
          round
          slot="title"
        >搜索</van-button>
      </van-nav-bar>

      <!-- 标签栏 -->
      <van-tabs
        animated
        swipeable
        border
        class="nav-tab"
        title-active-color="#ee0a24"
        title-inactive-color="#666"
        v-model="active">
        <van-tab v-for="item in channels" :key="item.id" :title="item.name">
          <article-list :channel="item"></article-list>
        </van-tab>
        <template slot="nav-right">
          <div class="placehoder"></div>
          <div class="hamburger-btn"><i class="iconfont icon-gengduo"></i></div>
        </template>
      </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article'
export default {
  name: 'HomePage',
  props: { },
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadUserChannels()
  },
  mounted () {

  },
  methods: {
    // 获取频道列表数据
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
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
.home-container {
  padding: 180px 0 100px 0;
  .page-nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-icon {
    color: #ffffff;
    font-size: 32px;
  }
  .van-button {
    width: 545px;
    background-color: #5baafa;
    border: 0;
    color: #fff;
  }
  .nav-tab {
    position: relative;
    /deep/ .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
    }
    .hamburger-btn {
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      background-color: #fff;
      opacity: 0.9;
      i.iconfont {
      font-size: 32px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
    .placehoder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}

</style>
