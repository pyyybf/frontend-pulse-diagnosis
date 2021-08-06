<template>
  <div style="padding: 0;margin: 0">
    <el-page-header @back="back" content="在线测试"></el-page-header>
    <br/>
    <div class="question-list">
      <div class="question-list-item" v-for="(question, index) of questions">
        <el-divider v-if="index!==0"></el-divider>
        <div class="question-list-item-question">
          <el-tag size="small" :effect="question.type?'light':'plain'" type="primary">
            {{question.type?'多选':'单选'}}
          </el-tag>&nbsp;&nbsp;{{index+1}}. {{question.questionStem}}
        </div>
        <br/>
        <div class="question-list-item-option">
          <el-checkbox-group v-if="question.type" v-model="answers[index]">
            <el-checkbox class="option-checkbox" label="A">{{question.optionA}}</el-checkbox>
            <br/>
            <el-checkbox class="option-checkbox" label="B">{{question.optionB}}</el-checkbox>
            <br/>
            <el-checkbox class="option-checkbox" label="C">{{question.optionC}}</el-checkbox>
            <br/>
            <el-checkbox class="option-checkbox" label="D">{{question.optionD}}</el-checkbox>
            <br/>
            <el-checkbox class="option-checkbox" label="E">{{question.optionE}}</el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-else v-model="answers[index][0]">
            <el-radio class="option-radio" label="A">{{question.optionA}}</el-radio>
            <br/>
            <el-radio class="option-radio" label="B">{{question.optionB}}</el-radio>
            <br/>
            <el-radio class="option-radio" label="C">{{question.optionC}}</el-radio>
            <br/>
            <el-radio class="option-radio" label="D">{{question.optionD}}</el-radio>
            <br/>
            <el-radio class="option-radio" label="E">{{question.optionE}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <el-button v-if="questions.length>0" class="submit-btn" type="primary" @click="onSubmit">提交</el-button>
    <el-empty v-else description="很抱歉，没有符合知识点的题目"></el-empty>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  const parseTime = (dateData) => {
    let date = new Date(dateData);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let mm = date.getMinutes();
    mm = mm < 10 ? ('0' + mm) : mm;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    const time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return time
  }

  export default {
    name: "NewPractice",
    data() {
      return {
        questions: [],
        answers: [],
        knowledgePoint: this.$route.query.knowledgePoint,
        startTime: this.$route.query.startTime,
        parseTime,
      }
    },
    computed: {
      ...mapGetters([
        'userId',
      ]),
    },
    created() {
      this.getNewPractice(this.knowledgePoint).then(res => {
        this.questions = res;
        for (var question of this.questions) {
          this.answers.push(question.type ? [] : [''])
        }
      })
    },
    methods: {
      ...mapActions([
        'getNewPractice',
        'addPractice',
      ]),
      back() {
        this.$router.push({
          path: '/user/question/practiceList',
        });
      },
      onSubmit() {
        var answerAll = true;
        var practiceForm = {
          userId: this.userId,
          knowledgePoint: this.$route.query.knowledgePoint,
          startTime: this.startTime,
          endTime: parseTime(new Date()),
          answerList: []
        };
        for (let i = 0; i < this.questions.length; i++) {
          var curAnswerInfo = {
            questionId: this.questions[i].id,
            userAnswer: this.answers[i].sort().join('\\')
          }
          practiceForm.answerList.push(curAnswerInfo);
          answerAll = answerAll && (curAnswerInfo.userAnswer.length > 0);
        }

        this.$confirm(
          `${answerAll ? '题目已经全部完成' : '还有题目未完成'}，确定提交吗?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          console.log(practiceForm)
          // TODO: 提交练习
          this.addPractice(practiceForm).then(res => {
            this.$router.push({
              path: '/user/question/practiceList',
            });
          }).catch(err => {
            this.$message.error('11111');
          });
        }).catch(() => {

        });
      }
    },
  }
</script>

<style scoped>
  .question-list {
    width: 90%;
    margin-left: 5%;
  }

  .question-list-item {
    text-align: left;
    font-size: 14px;
    margin-top: 12px;
  }

  .question-list-item-option {
    margin-left: 56px;
  }

  .option-radio {
    margin-bottom: 8px;
  }

  .submit-btn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
