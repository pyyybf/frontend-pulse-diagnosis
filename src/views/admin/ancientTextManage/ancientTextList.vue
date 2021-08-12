<script src="../../../store/modules/ancient.js"></script>
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
      <el-form :model="ancientQuery"
               class="demo-form-inline"
               label-position="right"
               label-width="70px">
        <el-row>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="书名">
              <el-input v-model="ancientQuery.name" placeholder="请输入书名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="作者">
              <el-input v-model="ancientQuery.author" placeholder="请输入作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="版本">
              <el-input v-model="ancientQuery.version" placeholder="请输入版本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="全文">
              <el-input v-model="ancientQuery.text" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button class="ancient-manage-btn" type="primary" plain size="medium" icon="el-icon-plus"
                   @click="showEditAncientDialog(undefined,false)">新建古籍
        </el-button>
        <el-upload
          class="ancient-manage-btn"
          action="#"
          :http-request="handleUpload"
          :multiple="false"
          :show-file-list="false">
          <el-button type="primary" plain size="medium" icon="el-icon-upload" :loading="importLoading">批量导入</el-button>
        </el-upload>
        <el-button class="ancient-manage-btn" type="primary" plain size="medium" icon="el-icon-download"
                   :loading="exportLoading"
                   @click="handleDownload">批量导出
        </el-button>
      </el-row>
      <el-table
        :data="ancientList"
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
          label="书名">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="read(scope.row.id)">查看
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="showEditAncientDialog(scope.row,true)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="delAncient(scope.row.id)">删除
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
    <EditAncientDialog :edit="ifEdit" :ancient-info="editAncientInfo"
                      :edit-ancient-dialog-visible="editAncientDialogVisible"
                      :close-edit-ancient-dialog="closeEditAncientDialog"/>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';
  import EditAncientDialog from "../ancientTextManage/components/EditAncientDialog";

  export default {
    name: "AncientTextList",
    data() {
      return {
        classificationTreeData: [],
        ancientQuery: {
          name: '',
          author: '',
          version: '',
          text: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        ancientList: [],
        total: 0,
        loading: false,
        multipleSelection: [],
        classificationList: [],
        treeEdit: false,
        importLoading: false,
        exportLoading: false,
        ifEdit: false,
        editAncientDialogVisible: false,
        editAncientInfo: {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          version: '',
        },
      }
    },
    components: {
      EditAncientDialog,
    },
    created() {
      this.getAncientClassificationTree().then(res => {
        this.classificationTreeData = res;
      })
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getAncientClassificationTree',
        'getAncientById',
        'getAncientByClassificationId',
        'getAllAncient',
        'updateAncientNameById',
        'updateAncientClassificationNameById',
        'delAncientClassificationById',
        'delAncientById',
        'downloadAncient',
      ]),
      reset() {
        this.ancientQuery = {
          name: '',
          author: '',
          version: '',
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
        this.getAllAncient({
          ...this.ancientQuery,
          ...this.listQuery,
        }).then(res => {
          this.ancientList = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
          this.loading = false;
        }).catch(err => {

        })
      },
      read(id) {
        this.$router.push({
          path: '/admin/ancientTextManage/ancientTextDetail',
          query: {
            ancientId: id,
          }
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDownload() {
        this.exportLoading = true;
        var ids = [];
        for (var ancient of this.ancientList) {
          ids.push(ancient.id);
        }
        this.downloadAncient(ids).then(res => {
          var blob = res;
          var fileName = '古籍' + new Date().getTime();
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
      handleUpload(params) {
        this.importLoading = true;
        const _file = params.file;

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("zipFile", _file);
        // console.log('formData', formData)

        // 发起请求
        this.uploadAncient(formData).then(res => {
          this.importLoading = false;
          this.$message.success('上传成功')
          this.getAncientClassificationTree().then(res => {
            this.classificationTreeData = res;
          })
          this.onSearch();
        }).catch(err => {
          this.importLoading = false;
        })
      },
      delClassification(node, data) {
        // console.log(node, data)
        if (data.children && data.children.length > 0) {
          this.$message.error('当前分类不为空，无法删除');
          return;
        }
        if (data.id.startsWith('classification')) {
          this.delAncientClassificationById(data.sqlId).then(res => {
            this.getAncientClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
            });
          });
        } else {
          this.delAncientById(data.sqlId).then(res => {
            this.getAncientClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
              this.onSearch();
            });
          });
        }
      },
      delAncient(id) {
        this.delAncientById(id).then(res => {
          this.$message.success('删除成功')
          this.getAncientClassificationTree().then(resTree => {
            this.classificationTreeData = resTree;
            this.onSearch();
          });
        });
      },
      showEditAncientDialog(info, ifEdit) {
        this.ifEdit = ifEdit;
        if (info !== undefined) {
          this.editAncientInfo = {
            id: info.id,
            name: info.name,
            classificationId: info.classificationId,
            author: info.author,
            version: info.version,
          };
        } else {
          this.editAncientInfo = {
            id: -1,
            name: '',
            classificationId: null,
            author: '',
            version: '',
          };
        }
        this.editAncientDialogVisible = true;
      },
      closeEditAncientDialog(ifSubmit) {
        this.editAncientDialogVisible = false;
        this.editAncientInfo = {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          version: '',
        };
        if (ifSubmit) {
          this.getAncientClassificationTree().then(res => {
            this.classificationTreeData = res;
          })
          this.onSearch();
        }
      },
      nodeClick(data) {
        if (data.id.startsWith('ancient')) {
          if (!this.treeEdit) {
            this.loading = true;
            var id = data.sqlId;
            this.getAncientById({id: id}).then(res => {
              if (res != null) {
                this.ancientList = [res];
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
            this.getAncientByClassificationId({
              ...this.listQuery,
              classificationId: classificationId,
            }).then(res => {
              if (res !== null) {
                this.ancientList = res.list;
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
      editTree(node, data) {
        // console.log('editTree', node, data)
        this.treeEdit = true;
        this.$prompt(`请输入新的${data.id.startsWith('classification') ? '分类名称' : '书名'}`, '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: data.label,
        }).then(({value}) => {
          if (!value) {
            this.$message.error('修改失败，新名称不能为空')
            return
          }
          if (data.id.startsWith('classification')) {
            this.updateAncientClassificationNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getAncientClassificationTree().then(res => {
                this.classificationTreeData = res;
              })
              this.onSearch();
            }).catch(err => {

            })
          } else {
            this.updateAncientNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getAncientClassificationTree().then(res => {
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
    },
  }
</script>

<style scoped>
  .box-card {
    width: 100%;
    height: 240px;
    margin-bottom: 10px;
  }

  a:hover {
    cursor: pointer;
  }

  .ancient-manage-btn {
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

  .card-list {
    margin-top: 10px;
    padding: 7px;
    text-align: left;
  }

  .item {
    margin-top: 0;
    margin-bottom: 0;
  }

  .item .el-form-item__label {
    font-weight: bold;
  }
</style>
