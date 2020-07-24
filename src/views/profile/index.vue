<template>
    <div class="user-profile">
      <van-nav-bar
        class="page-nav-bar"
        title="个人资料"
        left-arrow
        @click-left="$router.back()"
        >
      </van-nav-bar>
      <input type="file" hidden ref="file" @change="onPhotoChange">
      <van-cell title="头像" is-link @click="$refs.file.click()">
          <van-image
            class="avarter"
            fit="cob=ver"
            round
            :src="user.photo"
          />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUpdateNameShow = true"
      />
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isUpdateGenderShow = true"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isUpdateBirthdayShow = true"
      />
      <!-- 修改昵称 -->
      <van-popup
        v-if="isUpdateNameShow"
        class="update"
        position="bottom"
        style="height: 100%"
        v-model="isUpdateNameShow"
        >
        <van-nav-bar
          title="修改昵称"
          left-text="取消"
          right-text="完成"
          @click-left="onCancelName"
          @click-right="onComfirmName"
          >
        </van-nav-bar>
        <div class="field-warp">
          <van-field
            v-model="user.name"
            ref="newName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
          />
        </div>
      </van-popup>
      <!-- 修改性别 -->
      <van-popup
        v-if="isUpdateGenderShow"
        class="update"
        position="bottom"
        v-model="isUpdateGenderShow"
        >
        <van-picker
          title="性别"
          show-toolbar
          :default-index="user.gender"
          :columns="columns"
          @confirm="onConfirmGender"
          @cancel="onCancelGender"
        />
      </van-popup>
      <!-- 修改生日 -->
      <van-popup
        v-if="isUpdateBirthdayShow"
        class="update"
        position="bottom"
        v-model="isUpdateBirthdayShow"
        >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmBirthday"
          @cancel="onCancelBirthday"
        />
      </van-popup>
      <!-- 修改头像 -->
      <van-popup
        v-if="isUpdatePhotoShow"
        class="update"
        position="bottom"
        v-model="isUpdatePhotoShow"
        style="height: 100%"
        >
        <div class="photo-warp">
          <img :src="img" class="photo" ref="photo">
          <div class="toolbar">
            <div class="text" @click="isUpdatePhotoShow = false">取消</div>
            <div class="text" @click="onConfirmPhoto">完成</div>
          </div>
        </div>
      </van-popup>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { getUserProfile, updateUserProfile, updateUserPhoto } from '@/api/user'
import moment from 'moment'
export default {
  name: 'UserProfile',
  props: {},
  components: {},
  data () {
    return {
      user: {},
      columns: ['男', '女'],
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      img: '',
      cropper: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {

  },
  updated () {
    if (this.isUpdatePhotoShow) {
      const image = this.$refs.photo
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    }
  },
  methods: {
    // 获取用户信息
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        this.currentDate = new Date(data.data.birthday)
      } catch (error) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    // 修改昵称
    async onComfirmName () {
      try {
        this.$toast.loading({
          message: '更新中...',
          forbidClick: true,
          duration: 0
        })
        await updateUserProfile({
          name: this.$refs.newName.value
        })
        this.$toast.success('更新成功')
        this.isUpdateNameShow = false
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    // 取消修改昵称
    onCancelName () {
      this.loadUserProfile()
      this.isUpdateNameShow = false
    },
    // 修改性别
    async onConfirmGender (val, i) {
      try {
        this.$toast.loading({
          message: '更新中...',
          forbidClick: true,
          duration: 0
        })
        await updateUserProfile({
          gender: i
        })
        this.$toast.success('更新成功')
        this.isUpdateGenderShow = false
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    // 取消修改性别
    onCancelGender () {
      this.loadUserProfile()
      this.isUpdateGenderShow = false
    },
    // 修改生日
    async onConfirmBirthday (val) {
      try {
        await updateUserProfile({
          birthday: moment(val).format('YYYY-MM-DD')
        })
        this.$toast.success('更新成功')
        this.user.birthday = moment(val).format('YYYY-MM-DD')
        this.isUpdateBirthdayShow = false
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    // 取消修改生日
    onCancelBirthday () {
      this.loadUserProfile()
      this.isUpdateBirthdayShow = false
    },
    // 图片改变
    onPhotoChange () {
      const file = this.$refs.file.files[0]
      this.img = URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    },
    // 修改图片完成点击完成按钮
    onConfirmPhoto () {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data } = await updateUserPhoto(formData)
          this.$toast.success('更新成功')
          this.user.photo = data.data.photo
          this.isUpdatePhotoShow = false
        } catch (error) {
          this.$toast.fail('更新失败')
        }
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .avarter {
    width: 60px;
    height: 60px;
  }
  .user-profile {
    .update {
      background-color: #f5f7f9;
      .field-warp {
        padding: 20px;
      }
    }
  }
  .photo-warp {
      background-color: #000;
      height: 100%;
    .photo {
      display: block;
      max-width: 100%;
    }
    .toolbar {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      .text {
        color: #fff;
        padding: 30px;
        font-size: 30px;
      }
    }
  }
</style>
