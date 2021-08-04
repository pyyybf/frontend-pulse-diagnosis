<template>
  <div style="text-align: left">
    <el-button type="primary" plain size="medium" icon="el-icon-plus"
               @click="addRoleDialogVisible=true">新增角色
    </el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="scene"
        label="场景"
        width="60">
        <template slot-scope="scope">{{scope.row.scene===0?'后台':'前台'}}</template>
      </el-table-column>
      <el-table-column
        prop="permission"
        label="权限">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="160">
        <template slot-scope="scope">{{parseTime(scope.row.createdTime)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="showEditRoleDialog(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="listQuery.pageSize"
      :page-sizes="[5,10,15]"
      :current-page.sync="listQuery.pageNum"
      :total="total"
      style="text-align: right">
    </el-pagination>
    <AddRoleDialog :add-role-dialog-visible="addRoleDialogVisible" :close-add-role-dialog="closeAddRoleDialog"/>
    <EditRoleDialog :role-info="editRoleInfo"
                    :edit-role-dialog-visible="editRoleDialogVisible"
                    :close-edit-role-dialog="closeEditRoleDialog"/>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import AddRoleDialog from './components/AddRoleDialog';
  import EditRoleDialog from './components/EditRoleDialog';

  const parseTime = (dateData) => {
    let date = new Date(dateData);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let mm = date.getMinutes();
    mm = mm < 10 ? ('0' + mm) : mm;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    const time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return time
  }

  export default {
    name: "PermissionManage",
    components: {
      AddRoleDialog, EditRoleDialog
    },
    data() {
      return {
        tableData: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        parseTime,
        addRoleDialogVisible: false,
        editRoleDialogVisible: false,
        editRoleInfo: {
          id: -1,
          name: '',
          scene: 0,
          permission: '',
        }
      }
    },
    created() {
      this.getRoleList();
    },
    methods: {
      ...mapActions([
        'getRoleByPage',
      ]),
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getRoleList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getRoleList();
      },
      getRoleList() {
        this.getRoleByPage(this.listQuery).then(res => {
          this.tableData = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
        }).catch(err => {

        })
      },
      closeAddRoleDialog(ifSubmit) {
        this.addRoleDialogVisible = false;
        if (ifSubmit) {
          this.getRoleList();
        }
      },
      showEditRoleDialog(info) {
        this.editRoleInfo = {
          id: info.id,
          name: info.name,
          scene: info.scene,
          permission: info.permission,
        };
        this.editRoleDialogVisible = true;
      },
      closeEditRoleDialog(ifSubmit) {
        this.editRoleDialogVisible = false;
        this.editRoleInfo = {
          id: -1,
          name: '',
          scene: 0,
          permission: '',
        };
        if (ifSubmit) {
          this.getRoleList();
        }
      },
    },
  }
</script>

<style scoped>

</style>
