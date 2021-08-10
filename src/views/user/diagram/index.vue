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
            <span v-if="node.label.length<17" style="text-overflow:ellipsis; overflow:hidden;white-space: nowrap;">
              <i :class="data.children?'el-icon-folder':'el-icon-document'"></i>
              {{ node.label }}
            </span>
            <el-tooltip v-else effect="dark" :content="node.label" placement="top">
              <span>
                <i :class="data.children?'el-icon-folder':'el-icon-document'"></i>
                {{ node.label.substring(0,16)+'...' }}
              </span>
            </el-tooltip>
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
    name: "Diagram",
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
        diagramList: [],
        total: 0,
        classificationList: [],
        loading: false,
      }
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
      ]),
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
          this.loading = true;
          var id = data.sqlId;
          this.getDiagramById({id: id}).then(res => {
            if (res != null) {
              this.diagramList = [res];
              this.listQuery.pageNum = 1;
              this.listQuery.pageSize = 10;
              this.total = 1;
            }
            this.loading = false;
          })
        } else {
          this.loading = true;
          var classificationId = data.sqlId;
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
    },
  }
</script>

<style scoped>
  .box-card {
    width: 100%;
    margin-bottom: 10px;
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
</style>
