<template>
  <el-dialog title="修改用户信息" :visible.sync="userFormDialogVisible" width="40%" :show-close="false" :close-on-click-modal="false">
    <el-form class="user-form" :model="userInfo" label-position="right" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userInfo.roleId" clearable placeholder="请选择角色" style="width:100%">
          <el-option v-for="role of roleList" :label="role.name" :value="role.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapActions} from 'vuex';

  const sha256 = require("js-sha256").sha256;

  export default {
    name: "EditUserDialog",
    props: {
      userInfo: Object,
      userFormDialogVisible: Boolean,
      closeEditUserDialog: Function,
    },
    data() {
      return {
        password: '',
        roleList: [],
      }
    },
    created() {
      this.getAllRole().then(res => {
        this.roleList = res;
      })
    },
    methods: {
      ...mapActions([
        'getAllRole',
        'editUser',
      ]),
      close(ifSubmit) {
        this.userFormDialogVisible = false;
        this.closeEditUserDialog(ifSubmit);
      },
      submit() {
        this.editUser({
          id: this.userInfo.id,
          username: this.userInfo.username,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          password: this.password !== '' ? sha256(this.password) : null,
          roleId: this.userInfo.roleId,
        }).then(res => {
          this.close(true)
        }).catch(err => {

        })
      },
    },
  }
</script>

<style scoped>
  .user-form {
    padding: 0 10%;
  }
</style>
