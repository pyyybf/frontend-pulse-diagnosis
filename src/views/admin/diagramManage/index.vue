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
                @click="() => append(data)">
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click="() => remove(node, data)">
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
                   @click="showEditTermDialog(undefined,false)">新建脉图
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
                <el-button icon="el-icon-edit" type="text">编辑</el-button>
                <el-button icon="el-icon-delete" type="text" style="color: #F56C6C">删除</el-button>
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
  </el-row>
</template>

<script>
  import {mapActions} from 'vuex';

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
        classificationList: [
          {
            value: 1,
            label: '脉理',
          },
          {
            value: 2,
            label: '脉象',
          },
          {
            value: 3,
            label: '脉法',
          },
        ],
        loading: false,
        key: '',
      }
    },
    created() {
      this.getClassificationTree().then(res => {
        this.classificationTreeData = res;
      })
      this.onSearch();
    },
    watch: {
      key: function (newVal, oldVal) {
        console.log(newVal)
      },
    },
    methods: {
      ...mapActions([
        'getClassificationTree',
        'getAllDiagram',
        'getDiagramByClassificationId',
        'getDiagramById',
      ]),
      append(data) {
        // const newChild = {id: id++, label: 'testtest', children: []};
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
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
        // console.log(data)
        this.loading = true;
        if (data.id.startsWith('diagram')) {
          var id = Number(data.id.substring(7));
          this.getDiagramById({id: id}).then(res => {
            this.diagramList = [res];
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = 10;
            this.total = 1;
            this.loading = false;
          })
        } else {
          var classificationId = Number(data.id.substring(14));
          this.getDiagramByClassificationId({
            ...this.listQuery,
            classificationId: classificationId,
          }).then(res => {
            this.diagramList = res.list;
            this.listQuery.pageNum = res.pageNum;
            this.listQuery.pageSize = res.pageSize;
            this.total = res.total;
            this.loading = false;
          })
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
      handleUpload() {

      },
      handleDownload() {

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
