<template>
  <div style="text-align: left">
    <el-form :model="practiceQuery"
             class="demo-form-inline"
             label-position="right"
             label-width="100px">
      <el-row>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="考察知识点">
            <el-input v-model="practiceQuery.knowledgePoint" placeholder="请输入考察知识点"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="练习时间">
            <el-date-picker
              v-model="practiceQuery.startTime"
              type="date"
              placeholder="请选择练习时间"
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
    <el-select v-model="knowledgePointValue" size="medium" placeholder="请选择考察知识点">
      <el-option
        v-for="item in knowledgePoints"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" plain size="medium" icon="el-icon-edit" @click="newPractice">开始练习</el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="knowledgePoint"
        label="考察知识点">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="练习开始时间">
        <template slot-scope="scope">{{parseTime(scope.row.startTime)}}</template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="练习结束时间">
        <template slot-scope="scope">{{parseTime(scope.row.endTime)}}</template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="练习得分">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="showDetail(scope.row.id)">查看
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
  import {mapActions} from 'vuex';

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

  const knowledgePoints = ['不限', '主病', '散脉', '数脉', '有因', '浮脉', '涩脉', '滑脉', '牢脉']

  export default {
    name: "Question",
    data() {
      return {
        loading: false,
        tableData: [],
        practiceQuery: {
          knowledgePoint: '',
          startTime: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        parseTime,
        //
        knowledgePoints,
        knowledgePointValue: '',
      }
    },
    created() {
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getKnowledgePointList',
        'getPracticeByUserId',
        'delPracticeById',
      ]),
      reset() {
        this.practiceQuery = {
          knowledgePoint: '',
          startTime: '',
        }
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
        this.loading = true;
        this.practiceQuery.startTime = this.practiceQuery.startTime ? parseTime(this.practiceQuery.startTime) : null;
        this.getPracticeByUserId({
          ...this.practiceQuery,
          ...this.listQuery,
        }).then(res => {
          this.tableData = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
          this.loading = false;
        }).catch(err => {

        })
      },
      handleDelete(id) {
        this.delPracticeById(id).then(res => {
          this.onSearch();
        }).catch(err => {

        })
      },
      showDetail(id) {
        this.$router.push({
          path: '/user/question/practiceDetail',
          query: {
            practiceId: id,
          }
        });
      },
      newPractice() {
        if (this.knowledgePointValue) {
          this.$router.push({
            path: '/user/question/newPractice',
            query: {
              knowledgePoint: this.knowledgePointValue,
              startTime: parseTime(new Date()),
            }
          });
        } else {
          this.$message.warning('请选择考察知识点')
        }
      },
    },
  }
</script>

<style scoped>

</style>
