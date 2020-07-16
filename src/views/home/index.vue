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
          <div class="hamburger-btn" @click="isChannelPopupShow = true"><i class="iconfont icon-gengduo"></i></div>
        </template>
      </van-tabs>
      <van-popup
        v-model="isChannelPopupShow"
        round
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '99%' }"
        >
        <channel-edit
          :myChannels = channels
          :active = active
          @addChannel="addChannel"
          @activeChange="activeChange"
          @removeChannel="removeChannel"
          @active-updata="updataActive"
          >

        </channel-edit>
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  props: { },
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      // 首页激活的频道
      active: 0,
      // 频道列表
      channels: [],
      // 控制频道编辑页面
      isChannelPopupShow: false
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
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        if (this.user) {
          // 获取线上数据
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          // 获取本地数据
          if (getItem('CHANNEL_INFO')) {
            // 本地有数据
            this.channels = getItem('CHANNEL_INFO')
          } else {
            // 本地么数据
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    // 添加频道
    addChannel (channel) {
      this.channels.push(channel)
    },
    // 由频道页面跳转过来的切换频道
    activeChange (index) {
      this.active = index
      this.isChannelPopupShow = false
    },
    // 删除频道
    removeChannel (index) {
      this.channels.splice(index, 1)
    },
    updataActive (index) {
      this.active = index - 1
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
