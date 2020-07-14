<template>
    <div class="layout-container">
      <!-- 底部标签栏 -->
      <van-tabbar v-model="active" router>
        <van-tabbar-item to="/" icon="home-o">
          <span>首页</span>
          <template slot="icon">
            <i class="iconfont icon-shouye"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/video" icon="search">
          <span>视频</span>
          <template slot="icon">
            <i class="iconfont icon-shipin"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/qa" icon="friends-o">
          <span>问答</span>
          <template slot="icon">
            <i class="iconfont icon-wenda"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/my" icon="setting-o">
          <span>我的</span>
          <template slot="icon">
            <i class="iconfont icon-wode"></i>
          </template>
        </van-tabbar-item>
      </van-tabbar>

      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'Layout',
  props: { },
  components: {

  },
  data () {
    return {
      active: 0
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  }
}
</script>

<style scoped lang="less">

</style>
