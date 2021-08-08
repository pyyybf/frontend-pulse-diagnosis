<template>
  <el-dialog :title="edit?'修改术语':'新增术语'"
             :visible.sync="editTermDialogVisible"
             :show-close="false"
             :close-on-click-modal="false"
             width="50%">
    <el-form class="edit-term" :model="termInfo" label-position="right" label-width="40px">
      <el-form-item label="脉象">
        <el-input v-model="termInfo.maixiang" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="因机">
        <el-input v-model="termInfo.yinji" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="疾病">
        <el-input v-model="termInfo.jibing" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="证候">
        <el-input v-model="termInfo.zhenghou" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="治法">
        <el-input v-model="termInfo.zhifa" autocomplete="off"></el-input>
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
    name: "EditTermDialog",
    props: {
      termInfo: Object,
      editTermDialogVisible: Boolean,
      closeEditTermDialog: Function,
      edit: Boolean,
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'addTerm',
        'editTerm',
      ]),
      close(ifSubmit) {
        this.answerList = [];
        this.termInfo = {
          id: -1,
          maixiang: '',
          yinji: '',
          jibing: '',
          zhenghou: '',
          zhifa: '',
        };
        this.editTermDialogVisible = false;
        this.closeEditTermDialog(ifSubmit);
      },
      submit() {
        if (this.edit) {
          this.editTerm({
            id: this.termInfo.id,
            termForm: {
              maixiang: this.termInfo.maixiang,
              yinji: this.termInfo.yinji,
              jibing: this.termInfo.jibing,
              zhenghou: this.termInfo.zhenghou,
              zhifa: this.termInfo.zhifa,
            },
          }).then(res => {
            this.close(true);
          }).catch(err => {

          })
        } else {
          this.addTerm({
            maixiang: this.termInfo.maixiang,
            yinji: this.termInfo.yinji,
            jibing: this.termInfo.jibing,
            zhenghou: this.termInfo.zhenghou,
            zhifa: this.termInfo.zhifa,
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
  .edit-term {
    padding: 0 10%;
  }
</style>
