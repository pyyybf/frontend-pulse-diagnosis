<template>
  <div style="text-align: left">
    <el-form :model="termQuery"
             class="demo-form-inline"
             label-position="right"
             label-width="60px">
      <el-form-item label="关键词">
        <el-input v-model="termQuery.keyword" placeholder="浮脉" style="float: left;width: 85%"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="onSearch" style="float: right;width: 14%">查看结果
        </el-button>
      </el-form-item>
    </el-form>
    <div id="container"></div>
    <br/>
    <el-skeleton v-if="loading" :rows="18" animated class="card-list"/>
    <div class="card-list" v-else>
      <el-card
        v-for="struct in structList"
        class="box-card"
        shadow="never"
        :body-style="{padding:0}">
        <div slot="header" class="card-title">
          <div class="card-title-left"></div>
          {{struct.name}}
        </div>
        <div class="card-text">
          <p v-for="paragraph in struct.content.split('\n')"
             v-html="setKeyWord(paragraph)"
             style="text-indent: 2em;margin: 0"></p>
        </div>
      </el-card>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="listQuery.pageSize"
      :page-sizes="[5,10,15]"
      :current-page.sync="listQuery.pageNum"
      :total="total"
      style="text-align: right">
    </el-pagination>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import G6 from '@antv/g6';

  export default {
    name: "Term",
    data() {
      return {
        termQuery: {
          keyword: '',
        },
        termData: {
          nodes: [
            {
              id: 'maixiang',
              label: '浮脉',
            },
            {
              id: 'yinji',
              label: '水被土克',
            },
            {
              id: 'jibing',
              label: '暗产',
            },
            {
              id: 'zhenghou',
              label: '太阳表证',
            },
            {
              id: 'zhifa',
              label: '化热毒',
            },
          ],
          edges: [
            {
              source: 'maixiang',
              target: 'yinji',
            },
            {
              source: 'maixiang',
              target: 'jibing',
            },
            {
              source: 'maixiang',
              target: 'zhenghou',
            },
            {
              source: 'maixiang',
              target: 'zhifa',
            },
            {
              source: 'yinji',
              target: 'jibing',
            },
            {
              source: 'yinji',
              target: 'zhenghou',
            },
            {
              source: 'yinji',
              target: 'zhifa',
            },
            {
              source: 'jibing',
              target: 'zhenghou',
            },
            {
              source: 'jibing',
              target: 'zhifa',
            },
            {
              source: 'zhenghou',
              target: 'zhifa',
            },
          ],
        },
        graph: {},
        structList: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        total: 0,
        loading: false,
        curKeyword: '浮脉',
      }
    },
    mounted() {
      this.initG6();
      this.getAllStruct({
        name: '',
        keyword: this.curKeyword,
        ...this.listQuery,
      }).then(res => {
        this.structList = res.list;
        this.listQuery.pageNum = res.pageNum;
        this.listQuery.pageSize = res.pageSize;
        this.total = res.total;
        this.loading = false;
      }).catch(err => {

      })
    },
    methods: {
      ...mapActions([
        'getTermByKeyword',
        'getAllStruct',
      ]),
      onSearch() {
        this.graph.clear();
        this.curKeyword = this.termQuery.keyword !== '' ? this.termQuery.keyword : '浮脉';
        this.getTermByKeyword(
          {keyword: this.curKeyword}
        ).then(res => {
          var newNodes = [];
          for (let id in res) {
            if (id !== 'id')
              newNodes.push({
                id: id,
                label: res[id],
              })
          }
          this.termData.nodes = newNodes;
          this.graph.data({
            nodes: this.termData.nodes,
            edges: this.termData.edges.map(function (edge, i) {
              edge.id = 'edge' + i;
              return Object.assign({}, edge);
            }),
          });
          this.graph.render()
          this.getAllStruct({
            name: '',
            keyword: this.curKeyword,
            ...this.listQuery,
          }).then(res => {
            this.structList = res.list;
            this.listQuery.pageNum = res.pageNum;
            this.listQuery.pageSize = res.pageSize;
            this.total = res.total;
            this.loading = false;
          }).catch(err => {

          })
        })
      },
      setKeyWord(paragraph) {
        return this.curKeyword !== '' ? paragraph.replace(this.curKeyword, `<span style="background-color: #409EFF">${this.curKeyword}</span>`) : paragraph;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.onSearch();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.onSearch();
      },
      initG6() {
        var that = this;
        const container = document.getElementById('container');
        const width = container.scrollWidth;
        const height = container.scrollHeight || 350;
        this.graph = new G6.Graph({
          container: 'container',
          width,
          height,
          layout: {
            type: 'force',
            preventOverlap: true,
            linkDistance: 150,
            nodeStrength: -200,
            edgeStrength: 0.8,
            collideStrength: 0.8,
          },
          defaultNode: {
            size: 50,
          },
          defaultEdge: {
            style: {
              stroke: '#409EFF',
            },
          },
          modes: {
            default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
          },
        });
        this.graph.data({
          nodes: this.termData.nodes,
          edges: this.termData.edges.map(function (edge, i) {
            edge.id = 'edge' + i;
            return Object.assign({}, edge);
          }),
        });
        this.graph.render();

        this.graph.on('node:dragstart', function (e) {
          that.graph.layout();
          that.refreshDragedNodePosition(e);
        });
        this.graph.on('node:drag', function (e) {
          const forceLayout = that.graph.get('layoutController').layoutMethods[0];
          forceLayout.execute();
          that.refreshDragedNodePosition(e);
        });
        this.graph.on('node:dragend', function (e) {
          e.item.get('model').fx = null;
          e.item.get('model').fy = null;
        });

        if (typeof window !== 'undefined')
          window.onresize = () => {
            if (!that.graph || that.graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            that.graph.changeSize(container.scrollWidth, container.scrollHeight);
          };
      },
      refreshDragedNodePosition(e) {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      },
    }
  }
</script>

<style scoped>
  #container {
    height: 350px;
    border: 1px solid #409EFF;
  }

  .card-list {
    /*margin-top: 10px;*/
    padding: 7px;
    text-align: left;
  }

  .box-card {
    width: 100%;
    margin-bottom: 10px;
    font-family: 新宋体;
    padding: 0;
  }

  .card-title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    background-color: #d9ecff;
  }

  .card-title-left {
    height: 100%;
    width: 0.5em;
    background-color: #409EFF;
    float: left;
    margin-right: 1em;
  }

  .card-text {
    white-space: pre-line;
    margin: 1em;
    padding: 0.5em;
    border: 1px solid #d9ecff;
  }

  .search-text {
    background-color: #F56C6C;
    color: red;
  }
</style>
