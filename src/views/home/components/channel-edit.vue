<template>
    <div class="channel-edit">
      <!-- 我的频道 -->
      <div class="my-channels">
        <van-cell center>
          <div slot="title" class="title">我的频道</div>
          <van-button
            class="edit-btn"
            slot="default"
            plain type="danger"
            size="mini"
            round
            @click="isEdit = !isEdit"
            >{{isEditShowText}}</van-button>
        </van-cell>
        <van-grid :gutter="10" class="grid">
          <van-grid-item
            class="grid-item"
            v-for="(item, i) in myChannels"
            :key="i"
            @click="handelChannelChange(item, i)"
            >
            <van-icon
              v-show="isEdit && !fixedChannel.includes(item.id)"
              slot="icon"
              name="clear"
              class="icon"></van-icon>
            <span
              :class="{active: active === i}"
              slot="text"
              class="text"
              >{{item.name}}</span>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 频道推荐 -->
      <div class="recommend-channels">
        <van-cell center>
          <div slot="title" class="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="grid">
          <van-grid-item
            class="grid-item"
            @click="addChannels(item)"
            v-for="(item, i) in recommendChannels"
            :key="i"
            >
            <van-icon slot="icon" name="plus"></van-icon>
            <span slot="text" class="text">{{item.name}}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEditPage',
  props: {
    // 获取父组件传递的我的频道数据
    myChannels: {
      type: Array,
      required: true
    },
    // 激活的样式
    active: {
      type: Number,
      required: true
    }
  },
  components: {

  },
  data () {
    return {
      // 关闭按钮的显示状态
      isEdit: false,
      // 所有频道列表
      allChannels: [],
      // 不可删除的频道Id
      fixedChannel: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {

  },
  methods: {
    // 获取所有频道列表
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    // 点击添加频道
    async addChannels (channel) {
      this.$emit('addChannel', channel)
      // 判断是否登录
      if (this.user) {
        try {
          // 登录  将数据保存在线上
          await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败,请稍后重试')
        }
      } else {
        // 未登录,  将数据存储在本地
        setItem('CHANNEL_INFO', this.myChannels)
      }
    },
    // 切换频道或者删除
    async handelChannelChange (channel, index) {
      if (this.isEdit) {
        // 删除
        if (this.fixedChannel.includes(channel.id)) return
        if (index <= this.active) {
          this.$emit('active-updata', this.active)
        }
        this.$emit('removeChannel', index)
        // 数据持久化
        if (this.user) {
          try {
            // 删除线上数据
            await deleteUserChannels(channel.id)
          } catch (err) {
            this.$toast('删除失败,请稍后重试')
          }
        } else {
          // 删除本地数据 -->重新设置即可
          setItem('CHANNEL_INFO', this.myChannels)
        }
      } else {
        // 切换
        this.$emit('activeChange', index)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 编辑按钮显示文本
    isEditShowText () {
      if (this.isEdit) return '完成'
      else return '编辑'
    },
    // 推荐所显示的频道
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.myChannels.find(item1 => {
          return item1.id === item.id
        })
      })
    }
  },
  watch: {

  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 85px;
  .my-channels {
    .title {
      font-size: 32px;
    }
    .edit-btn {
      width: 120px;
    }
    /deep/ .grid {
      .grid-item {
        .van-grid-item__content {
          background-color: #f3f5f7;
          width: 160px;
          height: 80px;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
          width: 0;
          height: 0;
        }
        .icon {
            font-size: 32px;
            right: -60px;
            top: -54px;
            z-index: 3;
          }
        .text {
          font-size: 30px;
        }
        .active {
          color: red;
        }
      }
    }
  }
  .recommend-channels {
    .title {
      font-size: 32px;
    }
    /deep/ .grid {
      .grid-item {
        .van-grid-item__content {
          background-color: #f3f5f7;
          flex-direction: row;
          white-space: nowrap;
          width: 160px;
          height: 80px;
          .van-icon {
            font-size: 32px;
          }
        }
        .text {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
