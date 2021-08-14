<template>
  <div style="text-align: left">
    <el-form :model="questionQuery"
             class="demo-form-inline"
             label-position="right"
             label-width="100px">
      <el-row>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="题目">
            <el-input v-model="questionQuery.questionStem" placeholder="请输入题目"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="考察知识点">
            <el-input v-model="questionQuery.knowledgePoint" placeholder="请输入考察知识点"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: center">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="medium" icon="el-icon-plus"
               @click="showEditQuestionDialog(undefined,false)">新增题目
    </el-button>
    <el-upload
      class="question-upload"
      action="#"
      :http-request="handleUpload"
      :multiple="false"
      :show-file-list="false">
      <el-button type="primary" plain size="medium" icon="el-icon-upload" :loading="importLoading">批量导入</el-button>
    </el-upload>
    <el-button type="primary" plain size="medium" icon="el-icon-download" :loading="exportLoading"
               @click="handleDownload">批量导出
    </el-button>
    <br><br>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="knowledgePoint"
        label="考察知识点"
        width="100">
      </el-table-column>
      <el-table-column
        prop="questionStem"
        label="题目">
      </el-table-column>
      <el-table-column
        prop="type"
        label="题型"
        width="50">
        <template slot-scope="scope">{{scope.row.type===0?'单选':'多选'}}</template>
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
                     @click="showEditQuestionDialog(scope.row,true)">编辑
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
    <EditQuestionDialog :edit="ifEdit" :question-info="editQuestionInfo"
                        :edit-question-dialog-visible="editQuestionDialogVisible"
                        :close-edit-question-dialog="closeEditQuestionDialog"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import EditQuestionDialog from "./components/EditQuestionDialog";

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
    name: "QuestionManage",
    data() {
      return {
        tableData: [],
        questionQuery: {
          questionStem: '',
          knowledgePoint: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        parseTime,
        editQuestionDialogVisible: false,
        editQuestionInfo: {
          id: -1,
          type: 0,
          knowledgePoint: '',
          questionStem: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          optionE: '',
          answer: '',
        },
        ifEdit: false,
        multipleSelection: [],
        loading: false,
        importLoading: false,
        exportLoading: false,
      }
    },
    components: {EditQuestionDialog},
    created() {
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getAllQuestion',
        'delQuestionById',
        'downloadQuestion',
        'uploadQuestion',
      ]),
      reset() {
        this.questionQuery = {
          questionStem: '',
          knowledgePoint: '',
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
        this.getAllQuestion({
          ...this.questionQuery,
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(id) {
        this.delQuestionById(id).then(res => {
          this.onSearch();
        }).catch(err => {

        })
      },
      showEditQuestionDialog(info, ifEdit) {
        this.ifEdit = ifEdit;
        if (info !== undefined) {
          this.editQuestionInfo = {
            id: info.id,
            type: info.type,
            knowledgePoint: info.knowledgePoint,
            questionStem: info.questionStem,
            optionA: info.optionA,
            optionB: info.optionB,
            optionC: info.optionC,
            optionD: info.optionD,
            optionE: info.optionE,
            answer: info.answer,
          };
        } else {
          this.editQuestionInfo = {
            id: -1,
            type: 0,
            knowledgePoint: '',
            questionStem: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            optionE: '',
            answer: '',
          };
        }
        this.editQuestionDialogVisible = true;
      },
      closeEditQuestionDialog(ifSubmit) {
        this.editQuestionDialogVisible = false;
        this.editQuestionInfo = {
          id: -1,
          type: 0,
          knowledgePoint: '',
          questionStem: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          optionE: '',
          answer: '',
        };
        if (ifSubmit) {
          this.onSearch();
        }
      },
      handleUpload(params) {
        this.importLoading = true;
        const _file = params.file;

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("questionFile", _file);

        // 发起请求
        this.uploadQuestion(formData).then(res => {
          this.onSearch();
          this.importLoading = false;
        }).catch(err => {
          this.$message.error('上传失败');
          this.importLoading = false;
        })
      },
      handleDownload() {
        this.exportLoading = true;
        var ids = [];
        this.multipleSelection.forEach(question => {
          ids.push(question.id);
        })
        this.downloadQuestion(ids).then(res => {
          var blob = res;
          var fileName = '试题' + new Date().getTime();
          if (window.navigator.msSaveOrOpenBlob) {			// IE浏览器下
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
          this.exportLoading = false;
        }).catch(err => {
          this.$message.error('下载失败');
          this.exportLoading = false;
        })
      },
    }
  }
</script>

<style scoped>
  .question-upload {
    display: inline;
  }
</style>
