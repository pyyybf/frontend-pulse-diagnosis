<template>
  <div style="padding: 0;margin: 0">
    <el-page-header @back="back" :content="ancientInfo.name"></el-page-header>
    <el-descriptions style="margin: 30px 0 0 23px">
      <el-descriptions-item label="作者">
        {{ancientInfo.author}}
      </el-descriptions-item>
      <el-descriptions-item label="书籍版本">
        {{ancientInfo.version}}
      </el-descriptions-item>
      <el-descriptions-item label="分类">
        {{ancientInfo.classificationName}}
      </el-descriptions-item>
    </el-descriptions>
    <el-row style="width:90%;margin-left:5%">
      <el-button @click="changeMode" type="primary" round icon="el-icon-refresh" style="float: right">
        {{showText?'图片':'文字'}}
      </el-button>
    </el-row>
    <el-carousel
      indicator-position="none"
      :autoplay="false"
      height="550px"
      style="width:90%;margin-left:5%;margin-top:30px;text-align: center">
      <el-carousel-item v-for="page in pageList" :key="page.id">
        <div class="text-box" v-if="showText">
          <div style="text-align: center">
            <p v-for="textItem in page.textList">
              {{textItem.text}}
            </p>
          </div>
        </div>
        <el-image v-else :src="page.content" fit="container" style="height: 550px"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "AncientTextDetail",
    data() {
      return {
        ancientId: -1,
        ancientInfo: {},
        pageList: [],
        showText: false,
      }
    },
    mounted() {
      this.ancientId = Number(this.$route.query.ancientId);
      this.getAncientById({id: this.ancientId}).then(res => {
        this.ancientInfo = res;
      })
      this.getAncientDetailById({id: this.ancientId}).then(res => {
        this.pageList = res;
      })
    },
    methods: {
      ...mapActions([
        'getAncientById',
        'getAncientDetailById',
      ]),
      back() {
        this.$router.push({
          path: '/user/ancientText/ancientTextList',
        });
      },
      changeMode() {
        this.showText = !this.showText;
      }
    },
  }
</script>

<style>
  .el-descriptions-item__label {
    font-weight: bold;
  }
</style>

<style scoped>
  .text-box {
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: justify;
    width: 100%;
    height: 550px;
    margin: 0 auto;
    line-height: 10px;
  }
</style>
