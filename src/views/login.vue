<template>
  <el-row>
    <el-col :span="8" :offset="8" class="login-card">
      <h1 class="login-title">古代脉诊知识资源数据库</h1>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          还没有账号？点击
          <el-button type="text" @click="goRegister">注册</el-button>
          继续访问
          <br/>
          <el-button class="login-button" type="primary" :loading="loading" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';

  const sha256 = require("js-sha256").sha256;

  export default {
    name: "Login",
    data() {
      const passwordValidator = (rule, value, callback) => {
        if (value.length < 6 || value.length > 12) {
          callback(new Error("请输入6-12位密码"))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', validator: passwordValidator}],
        },
        loading: false,
      }
    },
    methods: {
      ...mapActions([
        'login',
      ]),
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            let obj = {
              username: this.loginForm.username,
              password: sha256(this.loginForm.password)
            };
            this.login(obj)
              .then(res => {
                // this.$router.push({path: this.redirect || `/${res.roleName.toLowerCase()}`, query: this.otherQuery})
                this.$router.push({path: `/${res.roleScene === 1 ? 'user' : 'admin'}`})
                this.loading = false
              })
              .catch(err => {
                this.loading = false
              })
          } else {
            this.$message.error({message: '登录用户名不存在'})
            console.log('error submit!!')
            return false
          }
        })
      },
      goRegister() {
        this.$router.push({path: '/register'})
      },
    }
  }
</script>

<style scoped>
  .login-card {
    margin-top: 8vh;
    border-radius: 5px;
    padding: 50px;
    border: 1px solid lightgrey;
  }

  .login-title {
    color: #409EFF;
    padding-bottom: 20px;
  }

  .login-button {
    width: 100%;
  }
</style>
