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
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="node.label.length<13">
              <i v-if="!data.children" class="el-icon-document"></i>{{ node.label }}
            </span>
            <el-tooltip v-else class="item" effect="dark" :content="node.label" placement="top">
              <span>
                <i v-if="!data.children" class="el-icon-document"></i>{{ node.label.substring(0,12)+'...' }}
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
      <el-form :model="diagramQuery"
               class="demo-form-inline"
               label-position="right"
               label-width="70px">
        <el-form-item label="关键词">
          <el-input v-model="diagramQuery.keyword" placeholder="请输入关键词" style="float: left;width: 85%"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="onSearch" style="float: right;width: 14%">查找
          </el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button class="diagram-manage-btn" type="primary" plain size="medium" icon="el-icon-plus"
                   @click="showEditDiagramDialog(undefined,false)">新建脉图
        </el-button>
        <el-upload
          class="term-upload diagram-manage-btn"
          action="#"
          :http-request="handleUpload"
          :multiple="false"
          :limit="1"
          :show-file-list="false">
          <el-button type="primary" plain size="medium" icon="el-icon-upload" :loading="importLoading">批量导入</el-button>
        </el-upload>
        <el-button class="diagram-manage-btn" type="primary" plain size="medium" icon="el-icon-download"
                   :loading="exportLoading"
                   @click="handleDownload">批量导出
        </el-button>
      </el-row>
      <el-skeleton v-if="loading" :rows="18" animated class="card-list"/>
      <div class="card-list" v-else>
        <el-card v-for="diagram in diagramList" class="box-card" shadow="never">
          <el-row>
            <el-col :span="12" style="border-right: 1px dashed #EBEEF5">
              <el-image
                style="width: 100%;height:400px"
                :src="diagram.content"
                fit="contain"></el-image>
            </el-col>
            <el-col :span="12" style="text-align: left;height: 400px">
              <el-form :model="diagram"
                       class="demo-form-inline"
                       label-position="right"
                       label-width="100px">
                <el-form-item label="图片名称" class="item">{{diagram.name}}</el-form-item>
                <el-form-item label="分类" class="item">{{diagram.classificationName}}</el-form-item>
                <el-form-item label="出处" class="item">{{diagram.provenance}}</el-form-item>
                <el-form-item label="关键词" class="item">{{diagram.keyword}}</el-form-item>
              </el-form>
              <div class="btn-group">
                <el-button icon="el-icon-edit" type="text" @click="showEditDiagramDialog(diagram,true)">编辑</el-button>
                <el-button icon="el-icon-delete" type="text" @click="delDiagram(diagram.id)"
                           style="color: #F56C6C">删除
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
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
    <EditDiagramDialog :edit="ifEdit" :diagram-info="editDiagramInfo"
                       :edit-diagram-dialog-visible="editDiagramDialogVisible"
                       :close-edit-diagram-dialog="closeEditDiagramDialog"/>
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';
  import EditDiagramDialog from './components/EditDiagramDialog';

  export default {
    name: "DiagramManage",
    data() {
      return {
        classificationTreeData: [],
        diagramQuery: {
          keyword: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        importLoading: false,
        exportLoading: false,
        diagramList: [],
        total: 0,
        diagramForm: {},
        classificationList: [],
        loading: false,
        treeEdit: false,
        editDiagramDialogVisible: false,
        ifEdit: false,
        editDiagramInfo: {
          id: -1,
          name: '',
          classificationId: null,
          classificationName: '',
          provenance: '',
          keyword: '',
          content: '',
        },
      }
    },
    components: {
      EditDiagramDialog,
    },
    created() {
      this.getDiagramClassificationTree().then(res => {
        this.classificationTreeData = res;
      })
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getDiagramClassificationTree',
        'getAllDiagram',
        'getDiagramByClassificationId',
        'getDiagramById',
        'delDiagramClassificationById',
        'delDiagramById',
        'updateDiagramNameById',
        'updateDiagramClassificationNameById',
        'downloadDiagram',
        'uploadDiagram',
      ]),
      editTree(node, data) {
        // console.log('editTree', node, data)
        this.treeEdit = true;
        this.$prompt(`请输入新的${data.id.startsWith('classification') ? '分类名称' : '图片名称'}`, '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: data.label,
        }).then(({value}) => {
          if (!value) {
            this.$message.error('修改失败，新名称不能为空')
            return
          }
          if (data.id.startsWith('classification')) {
            this.updateDiagramClassificationNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getDiagramClassificationTree().then(res => {
                this.classificationTreeData = res;
              })
              this.onSearch();
            }).catch(err => {

            })
          } else {
            this.updateDiagramNameById({
              id: data.sqlId,
              name: value
            }).then(res => {
              this.$message.success('修改成功');
              this.getDiagramClassificationTree().then(res => {
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
      delClassification(node, data) {
        // console.log(node, data)
        if (data.children && data.children.length > 0) {
          this.$message.error('当前分类不为空，无法删除');
          return;
        }
        if (data.id.startsWith('classification')) {
          this.delDiagramClassificationById(data.sqlId).then(res => {
            this.getDiagramClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
            });
          });
        } else {
          this.delDiagramById(data.sqlId).then(res => {
            this.getDiagramClassificationTree().then(resTree => {
              this.classificationTreeData = resTree;
              this.onSearch();
            });
          });
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
      nodeClick(data) {
        if (data.id.startsWith('diagram')) {
          if (!this.treeEdit) {
            this.loading = true;
            var id = Number(data.id.substring(7));
            this.getDiagramById({id: id}).then(res => {
              if (res != null) {
                this.diagramList = [res];
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
            var classificationId = Number(data.id.substring(14));
            this.getDiagramByClassificationId({
              ...this.listQuery,
              classificationId: classificationId,
            }).then(res => {
              if (res !== null) {
                this.diagramList = res.list;
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
        this.getAllDiagram({
          ...this.diagramQuery,
          ...this.listQuery,
        }).then(res => {
          this.diagramList = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
          this.loading = false;
        }).catch(err => {

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
        this.uploadDiagram(formData).then(res => {
          this.importLoading = false;
          this.$message.success('上传成功')
          this.getDiagramClassificationTree().then(res => {
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
        for (var diagram of this.diagramList) {
          ids.push(diagram.id);
        }
        this.downloadDiagram(ids).then(res => {
          var blob = res;
          var fileName = '脉图' + new Date().getTime();
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
      delDiagram(id) {
        this.delDiagramById(id).then(res => {
          this.$message.success('删除成功')
          this.getDiagramClassificationTree().then(resTree => {
            this.classificationTreeData = resTree;
            this.onSearch();
          });
        });
      },
      showEditDiagramDialog(info, ifEdit) {
        this.ifEdit = ifEdit;
        if (info !== undefined) {
          this.editDiagramInfo = {
            id: info.id,
            name: info.name,
            classificationId: info.classificationId,
            provenance: info.provenance,
            keyword: info.keyword,
            content: info.content,
          };
        } else {
          this.editDiagramInfo = {
            id: -1,
            name: '',
            classificationId: null,
            provenance: '',
            keyword: '',
            content: '',
          };
        }
        this.editDiagramDialogVisible = true;
      },
      closeEditDiagramDialog(ifSubmit) {
        this.editDiagramDialogVisible = false;
        this.editDiagramInfo = {
          id: -1,
          name: '',
          classificationId: null,
          provenance: '',
          keyword: '',
          content: '',
        };
        if (ifSubmit) {
          this.getDiagramClassificationTree().then(res => {
            this.classificationTreeData = res;
          })
          this.onSearch();
        }
      },
    },
  }
</script>

<style scoped>
  .diagram-manage-btn {
    float: left;
    margin-left: 7px;
  }

  .btn-group {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0;
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

  .item .el-form-item__label {
    font-weight: bold;
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
