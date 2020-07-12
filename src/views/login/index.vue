<template>
  <div class="login-container">
    <!-- 顶栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录区域 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        clearable
        :rules="usreFormRules.mobile"
        placeholder="请输入手机号"
        maxlength="11" >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        :rules="usreFormRules.code"
        placeholder="请输入验证码"
        maxlength="6"
        > <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
          <template #button>
            <van-count-down
              v-if="isCountDown"
              format="ss s"
              @finish="isCountDown = false"
              :time="1000 * 60" />
            <van-button
              v-else
              round size="small"
              type="default"
              class="send-sms-btn"
              @click="onSendSms"
              native-type="button"
            >发送验证码</van-button>
          </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button block type="info" native-type="submit" class="login-btn">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 登录表单提交的数据
      user: {
        mobile: '',
        code: ''
      },
      // 登录表单的验证规则
      usreFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 倒计时显示与隐藏
      isCountDown: false
    }
  },
  methods: {
    // 提交登录
    async onSubmit () {
      // 轻提示
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登录中...'
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fial('登录失败,请稍后登录')
        }
      }
    },
    // 验证码
    async onSendSms () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败')
      }
      this.isCountDown = true
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDown = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 56px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: 0;
    }
  }
}
</style>
