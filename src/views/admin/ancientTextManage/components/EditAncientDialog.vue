<template>
  <el-dialog :title="edit?'修改古籍':'新增古籍'"
             :visible.sync="editAncientDialogVisible"
             :show-close="false"
             :close-on-click-modal="false"
             width="50%">
    <el-form class="edit-ancient" :model="ancientInfo" label-position="right" label-width="100px">
      <el-form-item label="文献名称">
        <el-input v-model="ancientInfo.name" autocomplete="off" placeholder="请输入文献名称"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="ancientInfo.classificationId"
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
        <el-input v-model="ancientInfo.author" autocomplete="off" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="ancientInfo.version" autocomplete="off" placeholder="请输入版本"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :http-request="handleUploadZip"
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
      <el-button type="primary" :loading="loading" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "EditAncientDialog",
    props: {
      ancientInfo: Object,
      editAncientDialogVisible: Boolean,
      closeEditAncientDialog: Function,
      edit: Boolean,
    },
    data() {
      return {
        classificationList: [],
        fileList: [],
        ifChangeZip: false,
        file: null,
        loading: false,
      }
    },
    watch: {
      // 'ancientInfo.classificationId': function (newVal, oldVal) {
      //   console.log(typeof newVal)
      // },
      // 'fileList': function (newVal, oldVal) {
      //   console.log(newVal)
      // },
    },
    mounted() {
      this.getAllAncientClassification().then(res => {
        this.classificationList = res;
      })
    },
    methods: {
      ...mapActions([
        'getAllAncientClassification',
        'createAncientClassification',
        'addAncient',
        'editAncient',
      ]),
      close(ifSubmit) {
        this.classificationId = [];
        this.file = null;
        this.ancientInfo = {
          id: -1,
          name: '',
          classificationId: null,
          author: '',
          version: '',
        };
        this.editAncientDialogVisible = false;
        this.closeEditAncientDialog(ifSubmit);
      },
      submit() {
        if (!this.edit && this.file === null) {
          this.$message.error('请上传文件')
          return
        }
        this.loading = true;
        this.checkClassification().then(() => {
          const _file = this.file;

          // 通过 FormData 对象上传文件
          var formData = new FormData();
          formData.append("ancientZip", _file);
          formData.append("name", this.ancientInfo.name);
          formData.append("classificationId", this.ancientInfo.classificationId);
          formData.append("author", this.ancientInfo.author);
          formData.append("version", this.ancientInfo.version);

          if (this.edit) {
            this.editAncient({
              id: this.ancientInfo.id,
              ancientForm: formData,
            }).then(res => {
              this.loading = false;
              this.close(true);
            }).catch(err => {
              alert()
            })
          } else {
            this.addAncient(formData).then(res => {
              this.loading = false;
              this.close(true);
            }).catch(err => {
              alert()
            })
          }
        })
      },
      checkClassification() {
        return new Promise((resolve, reject) => {
          if (typeof this.ancientInfo.classificationId === "string") {  //是新输入的分类
            this.createAncientClassification(this.ancientInfo.classificationId).then(res => {
              this.ancientInfo.classificationId = res;
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
        this.ifChangeZip = true;
        this.file = file.raw;
      },
      handleExceed(files, fileList) {
        fileList = [files[0]]
        this.handleChange({raw: files[0]}, fileList);
      },
      handleUploadZip(file) {
      },
      handleUpdateOrAdd(info) {
        if (this.edit) {
          this.editAncient({
            id: this.ancientInfo.id,
            ancientForm: {
              name: this.ancientInfo.name,
              classificationId: this.ancientInfo.classificationId,
              author: this.ancientInfo.author,
              version: this.ancientInfo.version,
              cover: info ? info.cover : null,
            },
          }).then(res => {
            this.close(true);
          }).catch(err => {

          })
        } else {
          this.addAncient({
            name: this.ancientInfo.name,
            classificationId: this.ancientInfo.classificationId,
            author: this.ancientInfo.author,
            version: this.ancientInfo.version,
            cover: info.cover,
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
  .edit-ancient {
    padding: 0 10%;
  }
</style>
