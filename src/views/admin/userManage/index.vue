<template>
  <div style="text-align: left">
    <el-form :model="userInfoQuery"
             class="demo-form-inline"
             label-position="right"
             label-width="80px">
      <el-row>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="用户名">
            <el-input v-model="userInfoQuery.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="手机">
            <el-input v-model="userInfoQuery.phone" placeholder="请输入手机"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="邮箱">
            <el-input v-model="userInfoQuery.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="角色">
            <el-select v-model="userInfoQuery.roleName" clearable placeholder="请选择角色" style="width:100%">
              <el-option v-for="role of roleList" :label="role" :value="role"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:16}" :md="{span:16}">
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="timeArr"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="['00:00:00', '23:59:59']"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: center">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
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
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="注册时间"
        width="160">
        <template slot-scope="scope">{{parseTime(scope.row.createdTime)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleDelete(scope.row.id)">删除
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
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

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
    name: "UserManage",
    data() {
      return {
        timeArr: [],
        tableData: [],
        userInfoQuery: {
          username: null,
          phone: null,
          email: null,
          roleName: null,
          startTime: null,
          endTime: null,
        },
        listQuery: {
          pageNum: 1,
          pageSize: 5,
        },
        total: 0,
        roleList: [],
        parseTime,
      }
    },
    created() {
      this.getAllRole().then(res => {
        this.roleList = [];
        res.forEach(role => {
          this.roleList.push(role.name);
        })
      }).catch(err => {

      })
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getAllUserInfo',
        'getAllRole',
        'delUserById',
      ]),
      reset() {
        this.userInfoQuery = {
          username: null,
          phone: null,
          email: null,
          roleName: null,
          startTime: null,
          endTime: null,
        }
        this.timeArr = []
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.onSearch();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.onSearch();
      },
      onSearch() {
        this.userInfoQuery.startTime = this.timeArr[0] ? parseTime(this.timeArr[0]) : null
        this.userInfoQuery.endTime = this.timeArr[0] ? parseTime(this.timeArr[1]) : null
        this.getAllUserInfo({
          ...this.userInfoQuery,
          ...this.listQuery,
        }).then(res => {
          this.tableData = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
        }).catch(err => {

        })
      },
      handleDelete(id) {
        this.delUserById(id).then(res => {
          this.onSearch();
        }).catch(err => {

        })
      },
    }
  }
</script>

<style scoped>
</style>
