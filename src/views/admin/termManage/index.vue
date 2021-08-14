<template>
  <div style="text-align: left">
    <el-form :model="termQuery"
             class="demo-form-inline"
             label-position="right"
             label-width="80px">
      <el-row>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="脉象">
            <el-input v-model="termQuery.maixiang" placeholder="请输入脉象"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
          <el-form-item label="关键词">
            <el-input v-model="termQuery.keyword" placeholder="请输入关键词"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align: center">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" plain size="medium" icon="el-icon-plus"
               @click="showEditTermDialog(undefined,false)">新建术语
    </el-button>
    <el-upload
      class="term-upload"
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
        prop="maixiang"
        label="脉象">
      </el-table-column>
      <el-table-column
        prop="yinji"
        label="因机">
      </el-table-column>
      <el-table-column
        prop="jibing"
        label="疾病">
      </el-table-column>
      <el-table-column
        prop="zhenghou"
        label="证候">
      </el-table-column>
      <el-table-column
        prop="zhifa"
        label="治法">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="showEditTermDialog(scope.row,true)">编辑
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
    <EditTermDialog :edit="ifEdit" :term-info="editTermInfo"
                    :edit-term-dialog-visible="editTermDialogVisible"
                    :close-edit-term-dialog="closeEditTermDialog"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import EditTermDialog from './components/EditTermDialog';

  export default {
    name: "TermManage",
    data() {
      return {
        tableData: [],
        termQuery: {
          maixiang: '',
          keyword: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        editTermDialogVisible: false,
        editTermInfo: {
          id: -1,
          maixiang: '',
          yinji: '',
          jibing: '',
          zhenghou: '',
          zhifa: '',
        },
        ifEdit: false,
        multipleSelection: [],
        loading: false,
        importLoading: false,
        exportLoading: false,
      }
    },
    components: {
      EditTermDialog,
    },
    created() {
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getAllTerm',
        'delTermById',
        'downloadTerm',
        'uploadTerm',
      ]),
      reset() {
        this.termQuery = {
          maixiang: '',
          keyword: '',
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
        this.getAllTerm({
          ...this.termQuery,
          ...this.listQuery,
        }).then(res => {
          // console.log(res)
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
        this.delTermById(id).then(res => {
          this.onSearch();
        }).catch(err => {
          this.$message.error('删除失败');
        })
      },
      showEditTermDialog(info, ifEdit) {
        this.ifEdit = ifEdit;
        if (info !== undefined) {
          this.editTermInfo = {
            id: info.id,
            maixiang: info.maixiang,
            yinji: info.yinji,
            jibing: info.jibing,
            zhenghou: info.zhenghou,
            zhifa: info.zhifa,
          };
        } else {
          this.editTermInfo = {
            id: -1,
            maixiang: '',
            yinji: '',
            jibing: '',
            zhenghou: '',
            zhifa: '',
          };
        }
        this.editTermDialogVisible = true;
      },
      closeEditTermDialog(ifSubmit) {
        this.editTermDialogVisible = false;
        this.editTermInfo = {
          id: -1,
          maixiang: '',
          yinji: '',
          jibing: '',
          zhenghou: '',
          zhifa: '',
        };
        if (ifSubmit) {
          this.onSearch();
        }
      },
      handleUpload(params) {
        this.importLoading = true;
        const _file = params.file;
        var data = new FormData();
        data.append("inputFile", this.file)

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("termFile", _file);

        // 发起请求
        this.uploadTerm(formData).then(res => {
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
        this.multipleSelection.forEach(term => {
          ids.push(term.id);
        })
        this.downloadTerm(ids).then(res => {
          var blob = res;
          var fileName = '术语' + new Date().getTime();
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
  .term-upload {
    display: inline;
  }
</style>
