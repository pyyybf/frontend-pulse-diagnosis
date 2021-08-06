<template>
  <el-dialog :title="edit?'修改题目':'新增题目'"
             :visible.sync="editQuestionDialogVisible"
             :show-close="false"
             :close-on-click-modal="false"
             width="50%">
    <el-form class="edit-question" :model="questionInfo" label-position="right" label-width="100px">
      <el-form-item label="题型">
        <el-radio-group v-model="questionInfo.type">
          <el-radio :label="0">单选</el-radio>
          <el-radio :label="1">多选</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="考察知识点">
        <el-input v-model="questionInfo.knowledgePoint" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="题干">
        <el-input v-model="questionInfo.questionStem" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项A">
        <el-input v-model="questionInfo.optionA" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项B">
        <el-input v-model="questionInfo.optionB" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项C">
        <el-input v-model="questionInfo.optionC" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项D">
        <el-input v-model="questionInfo.optionD" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="选项E">
        <el-input v-model="questionInfo.optionE" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-checkbox-group v-model="answerList" @change="changeAnswer" :max="questionInfo.type===0?1:5">
          <el-checkbox label="A"></el-checkbox>
          <el-checkbox label="B"></el-checkbox>
          <el-checkbox label="C"></el-checkbox>
          <el-checkbox label="D"></el-checkbox>
          <el-checkbox label="E"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "EditQuestionDialog",
    props: {
      questionInfo: Object,
      editQuestionDialogVisible: Boolean,
      closeEditQuestionDialog: Function,
      edit: Boolean,
    },
    data() {
      return {
        answerList: [],
      }
    },
    watch: {
      'questionInfo.id': {
        handler: function () {
          this.answerList = this.questionInfo.answer.split('\\');
        }
      }
    },
    methods: {
      ...mapActions([
        'addQuestion',
        'editQuestion',
      ]),
      changeAnswer() {
        this.answerList.sort();
        this.questionInfo.answer = this.answerList.join('\\');
      },
      close(ifSubmit) {
        this.answerList = [];
        this.questionInfo = {
          id: -1,
          type: 0,
          knowledgePoint: '',
          questionStem: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          optionE: '',
          answer: '',
        };
        this.editQuestionDialogVisible = false;
        this.closeEditQuestionDialog(ifSubmit);
      },
      submit() {
        if (this.edit) {
          this.editQuestion({
            id: this.questionInfo.id,
            questionForm: {
              type: this.questionInfo.type,
              knowledgePoint: this.questionInfo.knowledgePoint,
              questionStem: this.questionInfo.questionStem,
              optionA: this.questionInfo.optionA,
              optionB: this.questionInfo.optionB,
              optionC: this.questionInfo.optionC,
              optionD: this.questionInfo.optionD,
              optionE: this.questionInfo.optionE,
              answer: this.questionInfo.answer,
            },
          }).then(res => {
            this.close(true);
          }).catch(err => {

          })
        } else {
          this.addQuestion({
            type: this.questionInfo.type,
            knowledgePoint: this.questionInfo.knowledgePoint,
            questionStem: this.questionInfo.questionStem,
            optionA: this.questionInfo.optionA,
            optionB: this.questionInfo.optionB,
            optionC: this.questionInfo.optionC,
            optionD: this.questionInfo.optionD,
            optionE: this.questionInfo.optionE,
            answer: this.questionInfo.answer,
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
  .edit-question {
    padding: 0 10%;
  }
</style>
