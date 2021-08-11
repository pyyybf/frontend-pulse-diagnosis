<template>
  <el-row>
    <el-col :span="6">
      <el-card
        shadow="never"
        :body-style="{padding:0}"
      >
        <div class="tree-title">&nbsp;&nbsp;&nbsp;&nbsp;目录</div>
        <el-tree
          class="tree-body"
          :data="classificationTreeData"
          :expand-on-click-node="false"
          node-key="id"
          default-expand-all
          @node-click="nodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }" style="width: 100%">
            <span v-if="node.label.length<13" style="text-overflow:ellipsis; overflow:hidden;white-space: nowrap;">
              <i :class="data.children?'el-icon-folder':'el-icon-document'"></i>
              {{ node.label }}
            </span>
            <el-tooltip v-else effect="dark" :content="node.label" placement="top">
              <span>
                <i :class="data.children?'el-icon-folder':'el-icon-document'"></i>
                {{ node.label.substring(0,12)+'...' }}
              </span>
            </el-tooltip>
            <span>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click="() => editTree(node,data)">
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click="() => delClassification(node, data)">
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-form :model="modernQuery"
               class="demo-form-inline"
               label-position="right"
               label-width="70px">
        <el-row>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="书名">
              <el-input v-model="modernQuery.name" placeholder="请输入书名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="作者">
              <el-input v-model="modernQuery.author" placeholder="请输入作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="出版社">
              <el-input v-model="modernQuery.publisher" placeholder="请输入出版社"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button class="modern-manage-btn" type="primary" plain size="medium" icon="el-icon-plus"
                   @click="showEditModernDialog(undefined,false)">新建现代文献
        </el-button>
        <el-upload
          class="modern-manage-btn"
          action="#"
          :http-request="handleUpload"
          :multiple="false"
          :show-file-list="false">
          <el-button type="primary" plain size="medium" icon="el-icon-upload" :loading="importLoading">批量导入</el-button>
        </el-upload>
        <el-button class="modern-manage-btn" type="primary" plain size="medium" icon="el-icon-download"
                   :loading="exportLoading"
                   @click="handleDownload">批量导出
        </el-button>
      </el-row>
      <el-table
        :data="modernList"
        v-loading="loading"
        border
        style="margin-left:7px;margin-top:10px;width: 100%"
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
          prop="name"
          label="文献名">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="出版社">
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="getDetail(scope.row.content)">查看
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="showEditModernDialog(scope.row,true)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="delModern(scope.row.id)">删除
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
    </el-col>
    <EditModernDialog :edit="ifEdit" :modern-info="editModernInfo"
                      :edit-modern-dialog-visible="editModernDialogVisible"
                      :close-edit-modern-dialog="closeEditModernDialog"/>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';
  import EditModernDialog from "./components/EditModernDialog";

  export default {
    name: "ModernTextManage",
    data() {
      return {
        classificationTreeData: [],
        modernQuery: {
          name: '',
          author: '',
          publisher: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        modernList: [],
        total: 0,
        classificationList: [],
        loading: false,
        treeEdit: false,
        multipleSelection: [],
        importLoading: false,
        exportLoading: false,
        ifEdit: false,
        editModernDialogVisible: false,
        editModernInfo: {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          publisher: '',
          content: '',
        },
      }
    },
    components: {
      EditModernDialog,
    },
    created() {
      this.getModernClassificationTree().then(res => {
        this.classificationTreeData = res;
      })
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getModernClassificationTree',
        'getModernById',
        'getModernByClassificationId',
        'getAllModern',
        'updateModernNameById',
        'updateModernClassificationNameById',
        'delModernClassificationById',
        'delModernById',
        'downloadModern',
        'uploadModern',
      ]),
      reset() {
        this.modernQuery = {
          name: '',
          author: '',
          publisher: '',
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editTree(node, data) {
        // console.log('editTree', node, data)
        this.treeEdit = true;
        this.$prompt(`请输入新的${data.id.startsWith('classification') ? '分类名称' : '文献名称'}`, '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: data.label,
        }).then(({value}) => {
          if (!value) {
            this.$message.error('修改失败，新名称不能为空')
            return
          }
          if (data.id.startsWith('classification')) {
            this.updateModernClassificationNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getModernClassificationTree().then(res => {
                this.classificationTreeData = res;
              })
              this.onSearch();
            }).catch(err => {

            })
          } else {
            this.updateModernNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getModernClassificationTree().then(res => {
                this.classificationTreeData = res;
              })
              this.onSearch();
            }).catch(err => {

            })
          }
        }).catch(() => {
          // this.$message.info('未做修改');
        });
      },
      nodeClick(data) {
        if (data.id.startsWith('modern')) {
          if (!this.treeEdit) {
            this.loading = true;
            var id = data.sqlId;
            this.getModernById({id: id}).then(res => {
              if (res != null) {
                this.modernList = [res];
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = 10;
                this.total = 1;
              }
              this.loading = false;
            })
          }
          this.treeEdit = false;
        } else {
          if (!this.treeEdit) {
            this.loading = true;
            var classificationId = data.sqlId;
            this.getModernByClassificationId({
              ...this.listQuery,
              classificationId: classificationId,
            }).then(res => {
              if (res !== null) {
                this.modernList = res.list;
                this.listQuery.pageNum = res.pageNum;
                this.listQuery.pageSize = res.pageSize;
                this.total = res.total;
              } else {
                this.onSearch();
              }
              this.loading = false;
            })
          }
          this.treeEdit = false;
        }
      },
      onSearch() {
        this.loading = true;
        this.getAllModern({
          ...this.modernQuery,
          ...this.listQuery,
        }).then(res => {
          this.modernList = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
          this.loading = false;
        }).catch(err => {

        })
      },
      delClassification(node, data) {
        // console.log(node, data)
        if (data.children && data.children.length > 0) {
          this.$message.error('当前分类不为空，无法删除');
          return;
        }
        if (data.id.startsWith('classification')) {
          this.delModernClassificationById(data.sqlId).then(res => {
            this.getModernClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
            });
          });
        } else {
          this.delModernById(data.sqlId).then(res => {
            this.getModernClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
              this.onSearch();
            });
          });
        }
      },
      delModern(id) {
        this.delModernById(id).then(res => {
          this.$message.success('删除成功')
          this.getModernClassificationTree().then(resTree => {
            this.classificationTreeData = resTree;
            this.onSearch();
          });
        });
      },
      showEditModernDialog(info, ifEdit) {
        this.ifEdit = ifEdit;
        if (info !== undefined) {
          this.editModernInfo = {
            id: info.id,
            name: info.name,
            classificationId: info.classificationId,
            author: info.author,
            publisher: info.publisher,
            content: info.content,
          };
        } else {
          this.editModernInfo = {
            id: -1,
            name: '',
            classificationId: null,
            author: '',
            publisher: '',
            content: '',
          };
        }
        this.editModernDialogVisible = true;
      },
      closeEditModernDialog(ifSubmit) {
        this.editModernDialogVisible = false;
        this.editModernInfo = {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          publisher: '',
          content: '',
        };
        if (ifSubmit) {
          this.getModernClassificationTree().then(res => {
            this.classificationTreeData = res;
          })
          this.onSearch();
        }
      },
      handleUpload(params) {
        this.importLoading = true;
        const _file = params.file;

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("zipFile", _file);
        // console.log('formData', formData)

        // 发起请求
        this.uploadModern(formData).then(res => {
          this.importLoading = false;
          this.$message.success('上传成功')
          this.getModernClassificationTree().then(res => {
            this.classificationTreeData = res;
          })
          this.onSearch();
        }).catch(err => {
          this.importLoading = false;
        })
      },
      handleDownload() {
        this.exportLoading = true;
        var ids = [];
        for (var modern of this.modernList) {
          ids.push(modern.id);
        }
        this.downloadModern(ids).then(res => {
          var blob = res;
          var fileName = '现代文献' + new Date().getTime();
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
          this.exportLoading = false;
        })
      },
      getDetail(content) {
        var a = document.createElement('a');
        a.href = content;
        a.target = '_blank';
        a.click();
      },
    },
  }
</script>

<style scoped>
  .modern-manage-btn {
    float: left;
    margin-left: 7px;
  }
</style>

<style>
  .tree-title {
    border-left: 7px solid #409EFF;
    height: 40px;
    line-height: 40px;
    text-align: left;
  }

  .tree-body {
    border-top: 1px solid #EBEEF5;
    padding: 5px 0 15px 0;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
  }

  .item .el-form-item__label {
    font-weight: bold;
  }
</style>
