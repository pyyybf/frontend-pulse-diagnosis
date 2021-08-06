<template>
  <div style="padding: 0;margin: 0">
    <el-page-header @back="back" content="练习详情"></el-page-header>
    <br/>
    <el-collapse v-model="activeNames" style="width: 90%;margin-left: 5%">
      <el-collapse-item v-for="(question,index) of questions" :name="question.id">
        <template slot="title">
          {{index+1}}. {{question.question.questionStem}}（{{question.question.type?'多选':'单选'}}，10分）&nbsp;&nbsp;
          <el-tag size="small" effect="plain" :type="question.correct?'success':'danger'">
            <i :class="question.correct?'el-icon-success':'el-icon-error'"></i> {{question.correct?'正确':'错误'}}
          </el-tag>
        </template>
        <el-checkbox-group v-if="question.question.type" v-model="question.userAnswer.split('\\')" disabled>
          <el-checkbox label="A">{{question.question.optionA}}</el-checkbox>
          <br/>
          <el-checkbox label="B">{{question.question.optionB}}</el-checkbox>
          <br/>
          <el-checkbox label="C">{{question.question.optionC}}</el-checkbox>
          <br/>
          <el-checkbox label="D">{{question.question.optionD}}</el-checkbox>
          <br/>
          <el-checkbox label="E">{{question.question.optionE}}</el-checkbox>
          <br/>
        </el-checkbox-group>
        <el-radio-group v-else v-model="question.userAnswer" disabled>
          <el-radio class="option-radio" label="A">{{question.question.optionA}}</el-radio>
          <br/>
          <el-radio class="option-radio" label="B">{{question.question.optionB}}</el-radio>
          <br/>
          <el-radio class="option-radio" label="C">{{question.question.optionC}}</el-radio>
          <br/>
          <el-radio class="option-radio" label="D">{{question.question.optionD}}</el-radio>
          <br/>
          <el-radio class="option-radio" label="E">{{question.question.optionE}}</el-radio>
        </el-radio-group>
        <div :style="{color:question.correct?'black':'red'}">正确答案：{{question.question.answer}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "PracticeDetail",
    data() {
      return {
        practiceId: -1,
        questions: [],
        activeNames: [],
      }
    },
    mounted() {
      this.practiceId = this.$route.query.practiceId;
      this.getPracticeDetail(this.practiceId).then(res => {
        this.questions = res;
        for (var question of this.questions) {
          // question.userAnswer = question.userAnswer.split('\\')
          if (question.correct === 0)
            this.activeNames.push(question.id)
        }
      });
    },
    methods: {
      ...mapActions([
        'getPracticeDetail',
      ]),
      back() {
        this.$router.push({
          path: '/user/question/practiceList',
        });
      },
    },
  }
</script>

<style scoped>
  .option-radio {
    margin-bottom: 8px;
  }
</style>
