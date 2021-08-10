<template>
  <el-dialog :title="edit?'修改脉图':'新增脉图'"
             :visible.sync="editDiagramDialogVisible"
             :show-close="false"
             :close-on-click-modal="false"
             width="50%">
    <el-form class="edit-diagram" :model="diagramInfo" label-position="right" label-width="100px">
      <el-form-item label="图片名称">
        <el-input v-model="diagramInfo.name" autocomplete="off" placeholder="请输入图片名称"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="diagramInfo.classificationId"
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
      <el-form-item label="出处">
        <el-input v-model="diagramInfo.provenance" autocomplete="off" placeholder="请输入出处"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="diagramInfo.keyword" autocomplete="off" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :http-request="handleUploadImg"
          :multiple="false"
          :limit="1"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :show-file-list="false"
          :auto-upload="false"
          style="text-align: left">
          <el-button slot="trigger" size="medium" type="text" icon="el-icon-upload">选取文件</el-button>
          <br/>
          <el-image v-if="diagramInfo.content" :src="diagramInfo.content" fit="contain" style="width:100%;height:400px"></el-image>
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
    name: "EditDiagramDialog",
    props: {
      diagramInfo: Object,
      editDiagramDialogVisible: Boolean,
      closeEditDiagramDialog: Function,
      edit: Boolean,
    },
    data() {
      return {
        classificationList: [],
        fileList: [],
        ifChangeImg: false,
        file: null,
      }
    },
    watch: {
      'diagramInfo.classificationId': function (newVal, oldVal) {
        console.log(typeof newVal)
      },
      'fileList': function (newVal, oldVal) {
        console.log(newVal)
      },
    },
    mounted() {
      this.getAllDiagramClassification().then(res => {
        this.classificationList = res;
      })
    },
    methods: {
      ...mapActions([
        'getAllDiagramClassification',
        'createDiagramClassification',
        'addDiagram',
        'editDiagram',
        'uploadDiagramImg',
      ]),
      close(ifSubmit) {
        this.classificationId = [];
        this.diagramInfo = {
          id: -1,
          name: '',
          classificationId: null,
          provenance: '',
          keyword: '',
          content: '',
        };
        this.editDiagramDialogVisible = false;
        this.closeEditDiagramDialog(ifSubmit);
      },
      submit() {
        this.checkClassification().then(() => {
          this.handleUploadImg(this.file).then(content => {
            if (this.edit) {
              this.editDiagram({
                id: this.diagramInfo.id,
                diagramForm: {
                  name: this.diagramInfo.name,
                  classificationId: this.diagramInfo.classificationId,
                  provenance: this.diagramInfo.provenance,
                  keyword: this.diagramInfo.keyword,
                  content: content
                },
              }).then(res => {
                this.close(true);
              }).catch(err => {

              })
            } else {
              this.addDiagram({
                name: this.diagramInfo.name,
                classificationId: this.diagramInfo.classificationId,
                provenance: this.diagramInfo.provenance,
                keyword: this.diagramInfo.keyword,
                content: content
              }).then(res => {
                this.close(true);
              }).catch(err => {

              })
            }
          })
        })
      },
      checkClassification() {
        return new Promise((resolve, reject) => {
          if (typeof this.diagramInfo.classificationId === "string") {  //是新输入的分类
            this.createDiagramClassification(this.diagramInfo.classificationId).then(res => {
              this.diagramInfo.classificationId = res;
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
        this.ifChangeImg = true;
        var URL = null;
        if (window.createObjectURL != undefined) {
          // basic
          URL = window.createObjectURL(file.raw);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          URL = window.URL.createObjectURL(file.raw);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          URL = window.webkitURL.createObjectURL(file.raw);
        }
        this.diagramInfo.content = URL;
        this.file = file.raw;
      },
      handleExceed(files, fileList) {
        fileList = [files[0]]
        this.handleChange({raw: files[0]}, fileList);
      },
      handleUploadImg(file) {
        return new Promise((resolve, reject) => {
          if (this.ifChangeImg) {
            const _file = file;

            // 通过 FormData 对象上传文件
            var formData = new FormData();
            formData.append("diagramImg", _file);

            // 发起请求
            this.uploadDiagramImg(formData).then(res => {
              resolve(res)
            }).catch(err => {
              reject()
            })
          } else {
            resolve(this.diagramInfo.content)
          }
        })
      },
    }
  }
</script>

<style scoped>
  .edit-diagram {
    padding: 0 10%;
  }
</style>
