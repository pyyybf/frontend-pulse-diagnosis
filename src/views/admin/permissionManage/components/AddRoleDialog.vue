<template>
  <el-dialog title="新增角色" :visible.sync="addRoleDialogVisible" :show-close="false" :close-on-click-modal="false"
             width="40%">
    <el-form class="add-role" :model="roleForm" label-position="right" label-width="60px">
      <el-form-item label="角色名">
        <el-input v-model="roleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="场景">
        <el-radio-group v-model="roleForm.scene" @change="permissionList=[]">
          <el-radio :label="0">后台</el-radio>
          <el-radio :label="1">前台</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox-group v-model="permissionList">
          <el-checkbox v-for="(permission,index) of PERMISSIONS_DATA[roleForm.scene]" :label="index">{{permission}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapActions} from 'vuex'

  const PERMISSIONS_DATA = [
    ['文献管理', '古籍管理', '现代文献管理', '结构化文本管理', '术语管理', '脉图管理', '题库管理', '用户管理', '角色权限管理'],
    ['文本阅读', '古籍阅读', '现代文献阅读', '结构文本阅读', '段落分析', '脉图分类', '在线练习'],
  ]

  export default {
    name: "AddRoleDialog",
    props: {
      addRoleDialogVisible: Boolean,
      closeAddRoleDialog: Function,
    },
    data() {
      return {
        roleForm: {
          name: '',
          scene: 0,
          permission: ''
        },
        permissionList: [],
        PERMISSIONS_DATA,
      }
    },
    methods: {
      ...mapActions([
        'addRole',
      ]),
      close(ifSubmit) {
        this.addRoleDialogVisible = false;
        this.closeAddRoleDialog(ifSubmit);
      },
      submit() {
        this.permissionList.sort(function (x, y) {
          return x - y;
        });
        var tmpPermissionArr = [];
        this.permissionList.forEach(idx => {
          tmpPermissionArr.push(PERMISSIONS_DATA[this.roleForm.scene][idx])
        })
        this.roleForm.permission = tmpPermissionArr.join(',');
        this.addRole(this.roleForm).then(res => {
          this.roleForm = {
            name: '',
            scene: 0,
            permission: ''
          };
          this.close(true);
        }).catch(err => {

        })
      },
    }
  }
</script>

<style scoped>
  .add-role {
    padding: 0 10%;
  }
</style>
