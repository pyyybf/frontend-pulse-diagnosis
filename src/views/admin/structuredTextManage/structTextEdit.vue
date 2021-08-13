<template>
  <div style="padding: 0;margin: 0">
    <el-page-header @back="back" :content="structId>0?'编辑结构化文本':'新增结构化文本'"></el-page-header>
    <el-form class="struct-form"
             :model="structInfo"
             label-position="right"
             label-width="70px">
      <el-form-item label="多级标题">
        <el-select v-model="structInfo.structCatalogId" placeholder="请选择目录" style="width: 100%;">
          <el-option v-for="path in catalogPathList" :label="manageCatalogLabel(path)" :value="path.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="structInfo.name" placeholder="请输入书名"></el-input>
      </el-form-item>
      <el-form-item label="全文">
        <el-input type="textarea"
                  :autosize="{ minRows: 10}"
                  v-model="structInfo.content"
                  placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "structTextEdit",
    data() {
      return {
        structId: -1,
        structInfo: {
          id: -1,
          structCatalogId: null,
          name: '',
          content: ''
        },
        catalogPathList: [],
      }
    },
    mounted() {
      this.structId = Number(this.$route.query.structId);
      if (this.structId > 0) {
        this.getStructById({id: this.structId}).then(res => {
          this.structInfo = res;
        }).catch(err => {

        })
      }
      this.getCatalogPathList().then(res => {
        this.catalogPathList = res;
      }).catch(err => {

      })
    },
    methods: {
      ...mapActions([
        'getStructById',
        'getCatalogPathList',
        'updateStructById',
        'addStruct',
      ]),
      back() {
        this.$router.push({
          path: '/admin/structuredTextManage/structTextList',
        });
      },
      manageCatalogLabel(path) {
        return path.name1 + (path.name2 ? ` / ${path.name2}` : '') + (path.name3 ? ` / ${path.name3}` : '') + (path.name4 ? ` / ${path.name4}` : '')
      },
      handleSubmit() {
        if (this.structId > 0) {
          this.updateStructById(this.structInfo).then(res => {
            this.back()
          })
        } else {
          this.addStruct(this.structInfo).then(res => {
            this.back()
          })
        }
      },
    },
  }
</script>

<style scoped>
  .struct-form {
    margin-top: 2em;
    padding: 0 10em 0 10em;
  }

  .content-box {
    font-family: 新宋体;
    /*font-size: 1em;*/
    white-space: pre-line;
    margin: 1em;
    padding: 0.5em;
    /*border: 1px solid #d9ecff;*/
    text-align: left;
  }

  .content-paragraph {
    text-indent: 2em;
    margin: 0;
  }
</style>
