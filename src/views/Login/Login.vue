<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>
      <el-tabs v-model="tabSelectKey" class="tab-box" defa>
        <el-tab-pane label="密码登录" :name="1">
          <el-form
            ref="accountLoginForm"
            :model="accountForm"
            :rules="accountFormRules"
            :inline-message="true"
          >
            <el-form-item prop="username">
              <el-input
                v-model="accountForm.username"
                placeholder="请输入用户名"
                autocomplete="on"
                type="text"
                tabindex="1"
                clearable
              >
                <template #prepend>
                  <SvgIcon name="user" />
                </template>
              </el-input>
            </el-form-item>
            <el-tooltip
              v-model="capsTooltip"
              content="大写锁定"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="accountForm.password"
                  placeholder="请输入密码"
                  autocomplete="on"
                  show-password
                  clearable
                  @keyup.enter="onLogin"
                  name="password"
                  tabindex="2"
                  @keyup="checkCapslock"
                  @blur="capsTooltip = false"
                >
                  <template #prepend>
                    <SvgIcon name="password" />
                  </template>
                </el-input>
              </el-form-item>
            </el-tooltip>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-button
        :loading="loading"
        type="primary"
        @click="onLogin"
        style="width: 100%; margin-bottom: 30px; letter-spacing: 10px"
        @keyup.enter="onLogin"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const title = ref('管理系统');
const loading = ref(false);
const tabSelectKey = ref(1);
const accountLoginForm = ref();
const capsTooltip = ref(false);

const accountFormRules = {
  username: [{ required: true, trigger: 'blur', message: '请填写用户名' }],
  password: [{ required: true, trigger: 'change', message: '请填写密码' }],
};
const accountForm = reactive({
  username: 'admin',
  password: '123456',
});

function onLogin() {
  if (!accountLoginForm?.value) return;
  accountLoginForm.value.validate((valid: boolean) => {
    if (valid) {
      userStore.login(accountForm).then(() => {
        router.push('/');
      });
    }
  });
}
function checkCapslock(e: any) {
  const key = e.key;
  capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z';
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
$defaultColor: #a5a5a5;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-box {
    width: 420px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input__wrapper {
        box-shadow: 0 0 0 0px !important;
        height: 100%;
        width: calc(100% - 70px);
        vertical-align: top;
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px !important;
        padding: 0px;
        // padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          // box-shadow: 0px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }

      .el-input-group__prepend {
        box-shadow: 0px 0px 0px 0px !important;
        background: transparent;
        color: $dark_gray;
      }
    }

    :deep(.el-form-item__error) {
      font-size: 14px !important;
      margin-top: 2px !important;
    }
  }

  .tab-box {
    :deep(.el-tabs__header) {
      background: #2d3a4b;
      color: #ffffff;
    }

    :deep(.el-tabs__item) {
      color: $defaultColor;
      font-size: 16px;
    }

    :deep(.is-active) {
      color: $theme-color;
    }
  }

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.el-dialog__footer {
  text-align: center;
}
</style>
