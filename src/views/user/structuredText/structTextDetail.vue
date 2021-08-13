<template>
  <div style="padding: 0;margin: 0">
    <el-page-header @back="back" :content="structInfo.name"></el-page-header>
    <div class="content-box">
      <p v-for="paragraph in structInfo.content?structInfo.content.split('\n'):''"
         class="content-paragraph">{{paragraph}}</p>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "structTextDetail",
    data() {
      return {
        structId: -1,
        structInfo: {},
      }
    },
    mounted() {
      this.structId = Number(this.$route.query.structId);
      this.getStructById({id: this.structId}).then(res => {
        this.structInfo = res;
      })
    },
    methods: {
      ...mapActions([
        'getStructById',
      ]),
      back() {
        this.$router.push({
          path: '/user/structuredText/structTextList',
        });
      },
    },
  }
</script>

<style scoped>
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
