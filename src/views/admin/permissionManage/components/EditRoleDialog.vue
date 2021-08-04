<template>
  <el-dialog title="修改角色" :visible.sync="editRoleDialogVisible" :show-close="false" :close-on-click-modal="false"
             width="40%">
    <el-form class="edit-role" :model="roleInfo" label-position="right" label-width="60px">
      <el-form-item label="角色名">
        <el-input v-model="roleInfo.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="场景">
        <el-radio-group v-model="roleInfo.scene" @change="permissionList=[]">
          <el-radio :label="0">后台</el-radio>
          <el-radio :label="1">前台</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-checkbox-group v-model="permissionList">
          <el-checkbox v-for="(permission,index) of PERMISSIONS_DATA[roleInfo.scene]" :label="index">{{permission}}
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
    name: "EditRoleDialog",
    props: {
      roleInfo: Object,
      editRoleDialogVisible: Boolean,
      closeEditRoleDialog: Function,
    },
    data() {
      return {
        permissionList: [],
        PERMISSIONS_DATA,
      }
    },
    watch: {
      'roleInfo.id': {
        handler: function () {
          this.permissionList = []
          if (this.roleInfo.id !== -1) {
            // console.log(this.permissionList)
            for (var permission of this.roleInfo.permission.split(',')) {
              this.permissionList.push(PERMISSIONS_DATA[this.roleInfo.scene].indexOf(permission))
            }
          }
        }
      }
    },
    methods: {
      ...mapActions([
        'editRole',
      ]),
      close(ifSubmit) {
        this.editRoleDialogVisible = false;
        this.closeEditRoleDialog(ifSubmit);
      },
      submit() {
        this.permissionList.sort(function (x, y) {
          return x - y;
        });
        var tmpPermissionArr = [];
        this.permissionList.forEach(idx => {
          tmpPermissionArr.push(PERMISSIONS_DATA[this.roleInfo.scene][idx])
        })
        this.roleInfo.permission = tmpPermissionArr.join(',');
        this.editRole({
          id: this.roleInfo.id,
          name: this.roleInfo.name,
          scene: this.roleInfo.scene,
          permission: this.roleInfo.permission,
        }).then(res => {
          this.close(true);
        }).catch(err => {

        })
      },
    }
  }
</script>

<style scoped>
  .edit-role {
    padding: 0 10%;
  }
</style>
