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
            <span v-if="node.label.length<16" style="text-overflow:ellipsis; overflow:hidden;white-space: nowrap;">
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
      <el-skeleton v-if="loading" :rows="18" animated class="card-list"/>
      <div class="card-list" v-else>
        <el-card v-for="modern in modernList" class="box-card" shadow="never">
          <a target="_blank" :href="modern.content" style="color: #303133">
            <el-row>
              <el-col :span="6" style="border-right: 1px dashed #EBEEF5">
                <el-image
                  style="width: 100%;height:200px"
                  :src="modern.cover"
                  fit="contain"></el-image>
              </el-col>
              <el-col :span="18" style="text-align: left;height: 400px">
                <el-form :model="modern"
                         class="demo-form-inline"
                         label-position="right"
                         label-width="100px">
                  <el-form-item label="文献名" class="item">{{modern.name}}</el-form-item>
                  <el-form-item label="分类" class="item">{{modern.classificationName}}</el-form-item>
                  <el-form-item label="作者" class="item">{{modern.author}}</el-form-item>
                  <el-form-item label="出版社" class="item">{{modern.publisher}}</el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </a>
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
    name: "ModernText",
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
      }
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
    },
  }
</script>

<style scoped>
  .box-card {
    width: 100%;
    height: 240px;
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

  .item {
    margin-top: 0;
    margin-bottom: 0;
  }

  .item .el-form-item__label {
    font-weight: bold;
  }
</style>
