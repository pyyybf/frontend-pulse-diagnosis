<template>
  <el-row>
    <el-col :span="8">
      <el-card
        shadow="never"
        :body-style="{padding:0}"
      >
        <div class="tree-title">&nbsp;&nbsp;&nbsp;&nbsp;目录</div>
        <el-tree
          class="tree-body"
          :data="catalogTree"
          :expand-on-click-node="false"
          node-key="id"
          default-expand-all
          @node-click="nodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }" style="width: 100%">
            <span v-if="node.label.length<20" style="text-overflow:ellipsis; overflow:hidden;white-space: nowrap;">
              {{ node.label }}
            </span>
            <el-tooltip v-else effect="dark" :content="node.label" placement="top">
              <span>
                {{ node.label.substring(0,20)+'...' }}
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
                @click="() => delCatalog(node, data)">
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-form :model="structQuery"
               class="demo-form-inline"
               label-position="right"
               label-width="70px">
        <el-row>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="书名">
              <el-input v-model="structQuery.name" placeholder="请输入书名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
            <el-form-item label="全文">
              <el-input v-model="structQuery.keyword" placeholder="请输入关键词"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="text-align: center">
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button class="struct-manage-btn" type="primary" plain size="medium" icon="el-icon-plus"
                   @click="showDetail(-1)">新建结构化文本
        </el-button>
        <el-upload
          class="struct-manage-btn"
          action="#"
          :http-request="handleUpload"
          :multiple="false"
          :show-file-list="false">
          <el-button type="primary" plain size="medium" icon="el-icon-upload" :loading="importLoading">批量导入</el-button>
        </el-upload>
        <el-button class="struct-manage-btn" type="primary" plain size="medium" icon="el-icon-download"
                   :loading="exportLoading"
                   @click="handleDownload">批量导出
        </el-button>
      </el-row>
      <el-skeleton v-if="loading" :rows="18" animated class="card-list"/>
      <div class="card-list" v-else>
        <el-card
          v-for="struct in structList"
          class="box-card"
          shadow="never"
          :body-style="{padding:0}">
          <div slot="header" class="card-title">
            <div class="card-title-left"></div>
            {{struct.name}}
            <el-button class="card-title-btn" type="text" @click="delStruct(struct.id)">删除</el-button>
            <el-button class="card-title-btn" type="text" @click="showDetail(struct.id)">编辑</el-button>
          </div>
          <div class="card-text">
            <p v-for="paragraph in struct.content.split('\n')"
               v-html="setKeyWord(paragraph)"
               style="margin: 0"></p>
          </div>
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
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "structTextList",
    data() {
      return {
        catalogTree: [],
        structQuery: {
          name: '',
          keyword: '',
        },
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        structList: [],
        total: 0,
        loading: false,
        curKeyword: '',
        importLoading: false,
        exportLoading: false,
      }
    },
    created() {
      this.getCatalogTree().then(res => {
        this.catalogTree = res;
      }).catch(err => {

      })
      this.onSearch();
    },
    methods: {
      ...mapActions([
        'getCatalogTree',
        'getAllStruct',
        'getStructByCatalogId',
        'delCatalogById',
        'updateCatalogById',
        'delStructById',
        'downloadStruct',
        'uploadStruct',
      ]),
      nodeClick(data) {
        this.loading = true;
        this.curKeyword = '';
        var structCatalogId = data.sqlId;
        this.getStructByCatalogId({
          ...this.listQuery,
          structCatalogId: structCatalogId,
        }).then(res => {
          if (res !== null) {
            this.structList = res.list;
            this.listQuery.pageNum = res.pageNum;
            this.listQuery.pageSize = res.pageSize;
            this.total = res.total;
          } else {
            this.onSearch();
          }
          this.loading = false;
        })
      },
      reset() {
        this.structQuery = {
          name: '',
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
        this.getAllStruct({
          ...this.structQuery,
          ...this.listQuery,
        }).then(res => {
          this.structList = res.list;
          this.listQuery.pageNum = res.pageNum;
          this.listQuery.pageSize = res.pageSize;
          this.total = res.total;
          this.loading = false;
          this.curKeyword = this.structQuery.keyword;
        }).catch(err => {

        })
      },
      setKeyWord(paragraph) {
        return this.curKeyword !== '' ? paragraph.replace(this.curKeyword, `<span style="background-color: #409EFF">${this.curKeyword}</span>`) : paragraph;
      },
      showDetail(id) {
        this.$router.push({
          path: '/admin/structuredTextManage/structTextEdit',
          query: {
            structId: id,
          }
        });
      },
      editTree(node, data) {
        // console.log('editTree', node, data)
        this.treeEdit = true;
        this.$prompt(`请输入新的目录名`, '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: data.label,
        }).then(({value}) => {
          if (!value) {
            this.$message.error('修改失败，新名称不能为空')
            return
          }
          this.updateCatalogById({
            id: data.sqlId,
            name: value
          }).then(res => {
            this.$message.success('修改成功');
            this.getCatalogTree().then(res => {
              this.catalogTree = res;
            }).catch(err => {

            })
            this.onSearch();
          }).catch(err => {

          })
        }).catch(() => {
          // this.$message.info('未做修改');
        });
      },
      delCatalog(node, data) {
        // console.log(node, data)
        if (data.children && data.children.length > 0) {
          this.$message.error('当前目录不为空，无法删除');
          return;
        }
        this.delCatalogById(data.sqlId).then(res => {
          this.getCatalogTree().then(res => {
            this.catalogTree = res;
          }).catch(err => {

          })
        });
      },
      delStruct(id) {
        this.delStructById(id).then(res => {
          this.onSearch();
        }).catch(err => {

        })
      },
      handleDownload() {
        this.exportLoading = true;
        this.downloadStruct().then(res => {
          // console.log(res)
          var blob = res;
          var fileName = '结构化文本' + new Date().getTime();
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
          alert(err)
          this.exportLoading = false;
        })
      },
      handleUpload(params) {
        this.importLoading = true;
        const _file = params.file;

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("structFile", _file);

        // 发起请求
        this.uploadStruct(formData).then(res => {
          this.getCatalogTree().then(res => {
            this.catalogTree = res;
          }).catch(err => {

          })
          this.onSearch();
          this.importLoading = false;
        }).catch(err => {
          this.importLoading = false;
        })
      },
    },
  }
</script>

<style scoped>
  .card-list {
    /*margin-top: 10px;*/
    padding: 7px;
    text-align: left;
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
    padding: 0;
  }

  .card-title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    background-color: #d9ecff;
  }

  .card-title-left {
    height: 100%;
    width: 0.5em;
    background-color: #409EFF;
    float: left;
    margin-right: 1em;
  }

  .card-text {
    font-family: 新宋体;
    font-size: 0.9em;
    white-space: pre-line;
    margin: 1em;
    padding: 0.5em;
    border: 1px solid #d9ecff;
  }

  a:hover {
    cursor: pointer;
  }

  .struct-manage-btn {
    float: left;
    margin-left: 7px;
  }

  .card-title-btn {
    float: right;
    margin-right: 1em;
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
    /*margin-top: 10px;*/
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

  .el-card__header {
    padding: 0;
  }
</style>
