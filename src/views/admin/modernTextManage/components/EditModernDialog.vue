<template>
  <el-dialog :title="edit?'修改现代文献':'新增现代文献'"
             :visible.sync="editModernDialogVisible"
             :show-close="false"
             :close-on-click-modal="false"
             width="50%">
    <el-form class="edit-modern" :model="modernInfo" label-position="right" label-width="100px">
      <el-form-item label="文献名称">
        <el-input v-model="modernInfo.name" autocomplete="off" placeholder="请输入文献名称"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="modernInfo.classificationId"
          filterable
          allow-create
          default-first-option
          placeholder="请选择分类"
          style="width: 100%">
          <el-option
            v-for="classification in classificationList"
            :key="classification.id"
            :label="classification.name"
            :value="classification.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="modernInfo.author" autocomplete="off" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="modernInfo.publisher" autocomplete="off" placeholder="请输入出版社"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :http-request="handleUploadPdf"
          :multiple="false"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
          style="text-align: left">
          <el-button slot="trigger" size="medium" type="text" icon="el-icon-upload">选取文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "EditModernDialog",
    props: {
      modernInfo: Object,
      editModernDialogVisible: Boolean,
      closeEditModernDialog: Function,
      edit: Boolean,
    },
    data() {
      return {
        classificationList: [],
        fileList: [],
        ifChangePdf: false,
        file: null,
      }
    },
    watch: {
      // 'modernInfo.classificationId': function (newVal, oldVal) {
      //   console.log(typeof newVal)
      // },
      // 'fileList': function (newVal, oldVal) {
      //   console.log(newVal)
      // },
    },
    mounted() {
      this.getAllModernClassification().then(res => {
        this.classificationList = res;
      })
    },
    methods: {
      ...mapActions([
        'getAllModernClassification',
        'createModernClassification',
        'addModern',
        'editModern',
        'uploadModernPdf',
      ]),
      showFileList() {
        console.log(this.fileList)
        // console.log('111111111111')
      },
      close(ifSubmit) {
        this.classificationId = [];
        this.modernInfo = {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          publisher: '',
          content: '',
        };
        this.editModernDialogVisible = false;
        this.closeEditModernDialog(ifSubmit);
      },
      submit() {
        this.checkClassification().then(() => {
          if (this.file) {
            this.handleUploadPdf(this.file).then(res => {
              this.handleUpdateOrAdd(res)
            })
          } else {
            this.handleUpdateOrAdd(null)
          }
        })
      },
      checkClassification() {
        return new Promise((resolve, reject) => {
          if (typeof this.modernInfo.classificationId === "string") {  //是新输入的分类
            this.createModernClassification(this.modernInfo.classificationId).then(res => {
              this.modernInfo.classificationId = res;
              resolve()
            }).catch(err => {
              reject()
            })
          } else {
            resolve()
          }
        });
      },
      handleChange(file, fileList) {
        this.ifChangePdf = true;
        this.file = file.raw;
      },
      handleExceed(files, fileList) {
        fileList = [files[0]]
        this.handleChange({raw: files[0]}, fileList);
      },
      handleUploadPdf(file) {
        return new Promise((resolve, reject) => {
          if (this.ifChangePdf) {
            const _file = file;

            // 通过 FormData 对象上传文件
            var formData = new FormData();
            formData.append("modernPdf", _file);

            // 发起请求
            this.uploadModernPdf(formData).then(res => {
              resolve(res)
            }).catch(err => {
              reject()
            })
          } else {
            resolve(this.modernInfo.content)
          }
        })
      },
      handleUpdateOrAdd(pdfInfo) {
        if (this.edit) {
          this.editModern({
            id: this.modernInfo.id,
            modernForm: {
              name: this.modernInfo.name,
              classificationId: this.modernInfo.classificationId,
              author: this.modernInfo.author,
              publisher: this.modernInfo.publisher,
              content: pdfInfo ? pdfInfo.content : null,
              cover: pdfInfo ? pdfInfo.cover : null,
            },
          }).then(res => {
            this.close(true);
          }).catch(err => {

          })
        } else {
          this.addModern({
            name: this.modernInfo.name,
            classificationId: this.modernInfo.classificationId,
            author: this.modernInfo.author,
            publisher: this.modernInfo.publisher,
            content: pdfInfo.content,
            cover: pdfInfo.cover,
          }).then(res => {
            this.close(true);
          }).catch(err => {

          })
        }
      },
    }
  }
</script>

<style scoped>
  .edit-modern {
    padding: 0 10%;
  }
</style>
