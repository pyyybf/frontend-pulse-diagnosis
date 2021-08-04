<template>
  <el-row>
    <el-col :span="8" :offset="8" class="register-card">
      <h1 class="register-title">古代脉诊知识资源数据库</h1>
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input ref="username" v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input ref="phone" v-model="registerForm.phone" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input ref="email" v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input ref="password" v-model="registerForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="passwordRepeat">
          <el-input ref="passwordRepeat" v-model="registerForm.passwordRepeat" placeholder="确认密码"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          已经有账号？点击
          <el-button type="text">登录</el-button>
          继续访问
          <br/>
          <el-button class="register-button" type="primary" :loading="loading" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';

  const sha256 = require("js-sha256").sha256;

  export default {
    name: "Register",
    data() {
      const usernameValidator = (rule, value, callback) => {
        if (!value.match(/[0-9a-zA-Z_]{6,12}/)) {
          callback(new Error("请输入6-12位用户名，可以包含字母、数字和下划线"))
        } else {
          callback()
        }
      }
      const phoneValidator = (rule, value, callback) => {
        if (!value.match(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)) {
          console.log('phone correct')
          callback(new Error("请输入正确手机号"))
        } else {
          callback()
        }
      }
      const emailValidator = (rule, value, callback) => {
        if (!value.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/)) {
          callback(new Error("请输入正确邮箱"))
        } else {
          callback()
        }
      }
      const passwordValidator = (rule, value, callback) => {
        if (!value.match(/[0-9a-zA-Z_]{6,12}/)) {
          callback(new Error("请输入6-12位密码，可以包含数字、字母和下划线"))
        } else {
          callback()
        }
      }
      const passwordRepeatValidator = (rule, value, callback) => {
        if (value !== this.registerForm.password) {
          callback(new Error("两次输入密码不同"))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          username: '',
          phone: '',
          email: '',
          password: '',
          passwordRepeat: '',
        },
        registerRules: {
          username: [{required: true, trigger: 'blur', validator: usernameValidator}],
          phone: [{required: true, trigger: 'blur', validator: phoneValidator}],
          email: [{required: true, trigger: 'blur', validator: emailValidator}],
          password: [{required: true, trigger: 'blur', validator: passwordValidator}],
          passwordRepeat: [{required: true, trigger: 'blur', validator: passwordRepeatValidator}],
        },
        loading: false,
      }
    },
    methods: {
      ...mapActions([
        'register',
      ]),
      handleRegister() {
        var that = this;
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.loading = true
            let obj = {
              username: this.registerForm.username,
              phone: this.registerForm.phone,
              email: this.registerForm.email,
              password: sha256(this.registerForm.password),
            };
            that.register(obj)
              .then(res => {
                this.$router.push({path: '/login'})
                this.loading = false
              })
              .catch(err => {
                this.loading = false
              })
          } else {
            this.$message.error({message: '请检查输入信息是否正确'})
            // console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .register-card {
    margin-top: 8vh;
    border-radius: 5px;
    padding: 50px;
    border: 1px solid lightgrey;
  }

  .register-title {
    color: #409EFF;
    padding-bottom: 20px;
  }

  .register-button {
    width: 100%;
  }
</style>
