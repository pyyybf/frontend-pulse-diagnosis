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
      }
    },
    mounted() {
      this.initG6();
    },
    methods: {
      ...mapActions([
        'getTermByKeyword',
      ]),
      onSearch() {
        this.graph.clear();
        this.getTermByKeyword(
          this.termQuery.keyword ? this.termQuery : {keyword: '浮脉'}
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
        })
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
</style>
