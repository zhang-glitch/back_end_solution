<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">{{ $t('msg.login.title') }}</div>
      <language-select></language-select>
      <el-form :model="loginForm" :rules="loginFormRules" ref="formRef">
        <el-form-item class="login-form-item" prop="username">
          <el-icon><Avatar /></el-icon>
          <el-input
            v-model="loginForm.username"
            class=""
            size="large"
            :placeholder="$t('msg.login.usernamePlaceholder')"
          />
        </el-form-item>

        <el-form-item class="login-form-item">
          <el-icon><Lock /></el-icon>
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            :placeholder="$t('msg.login.passwordPlaceholder')"
            show-password
          />
          <!-- <el-icon @click="handleEye" class="eye-hide-view-icon">
            <component :is="!isEye ? Hide : View"></component>
          </el-icon> -->
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="handleLogin"
            class="login-btn"
          >
            {{ $t('msg.login.loginBtn') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// import { Hide, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { setTimeStamp } from '@/utils/auth'
import { validatePassword } from './rules'
import LanguageSelect from '@/components/language-select/index.vue'

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 显影密码
// const isEye = ref(false)
// const handleEye = () => {
//   isEye.value = !isEye.value
// }

const i18n = useI18n()
// 表单校验
const loginFormRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

const store = useStore()
const router = useRouter()
const loading = ref(false)
/**
 * 对于接口设计，最好都返回一个成功 / 失败的标识。让我们更好的在axios难解其中处理message提示，然后返回error promise。

 在代码逻辑中就不需要处理message了。只需要去判断按钮加载的状态即可。
 */
const formRef = ref(null)
const handleLogin = async () => {
  formRef.value.validate(async (flag) => {
    if (flag) {
      loading.value = true
      try {
        await store.dispatch('user/postLogin', loginForm.value)
        // 登录成功后保存登录时间戳
        setTimeStamp()
        router.push('/')
        // // 获取用户信息
        // await store.dispatch('user/getUserInfo')
        // const { permission } = await store.dispatch('user/getUserInfo')
        // // 处理用户权限，筛选出需要添加的权限
        // const filterRoutes = await store.dispatch(
        //   'permission/filterRoutes',
        //   permission.menus
        // )
        // // 利用 addRoute 循环添加
        // filterRoutes.forEach((item) => {
        //   router.addRoute(item)
        // })
      } finally {
        loading.value = false
      }
    } else {
      ElMessage.info('验证失败!')
    }
  })
}
</script>

<script>
export default {
  name: 'hm-login'
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;

  .login-container {
    border-radius: 10px;
    position: relative;
    width: 520px;
    max-width: 100%;
    height: 240px;
    padding: 20px 40px;
    margin: 0 auto;
    overflow: hidden;
    background: #2d3a4b;

    .login-title {
      text-align: center;
      margin-bottom: 40px;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #fff;
    }

    /* 国际化 */
    .language-select {
      position: absolute;
      top: 20px;
      right: 40px;
      font-size: 24px;
      background: #fff;
      padding: 3px;
      border-radius: 2px;
    }

    /* 表单项 */
    .login-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 2px;

      .el-form-item__content {
        position: relative;
      }

      .el-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
        z-index: 9;
        font-size: 16px;
      }

      /* .eye-hide-view-icon {
        left: calc(100% - 26px);
      } */
      .el-input__password {
        left: calc(100% - 38px);
        color: #000;
      }

      .el-input__wrapper {
        background: rgba(0, 0, 0, 0.1);
        padding-left: 32px;
      }

      .el-input__inner {
        color: #fff;
      }
    }

    /* 登录按钮 */
    .login-btn {
      width: 100%;
    }
  }
}
</style>
