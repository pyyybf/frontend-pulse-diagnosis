<template>
  <el-container>
    <el-header height="60px">
      <el-row>
        <el-col :span="8" style="text-align: left">
          <span class="header-title header-text">古代脉诊知识资源数据库</span>
        </el-col>
        <el-col :span="6" :offset="10" style="text-align: right">
          <span class="header-text" style="color: white">欢迎，{{ roleName }}:</span>
          <el-dropdown>
            <span class="el-dropdown-link header-text" style="color: white">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="sub-container">
      <el-aside width="16vw">
        <!-- 这里是个菜单厚 -->
        <el-menu class="el-menu-vertical-demo" @select="changeMenu" router style="height: 100%">
          <el-submenu v-for="subMenu of menuList"
                      v-if="subMenu.children"
                      index="1">
            <template slot="title">
              <span>{{subMenu.title}}</span>
            </template>
            <el-menu-item v-for="menuItem of subMenu.children"
                          :index="menuItem.index"
                          @click.native="addTab(menuItem.title,menuItem.index)">
              {{menuItem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-for="menuItem of menuList"
                        v-if="!menuItem.children"
                        :index="menuItem.index"
                        @click.native="addTab(menuItem.title,menuItem.index)">
            <span slot="title">{{menuItem.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-body">
        <el-tabs v-model="editableTabValue" type="card" closable @tab-remove="removeTab"
                 @tab-click="changeTab">
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "Layout",
    data() {
      return {
        username: localStorage.getItem('username'),
        editableTabValue: '',
        editableTabs: [{
          title: '主页',
          name: `/${localStorage.getItem('roleScene')}/home`,
        }],
        editableTabNames: ["主页"],
        menuItemValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'roleName',
        'rolePermission',
        'roleScene',
        'menuList',
      ]),
    },
    watch: {
      '$route.path': function (newVal, oldVal) {
        this.setSingleMenuItem({
          path: newVal,
          query: this.$route.query
        });
      },
      // editableTabValue: function (newVal, oldVal) {
      //   console.log('editableTabValue change to', newVal)
      // },
      // menuItemValue: function (newVal, oldVal) {
      //   console.log('menuItemValue change to', newVal)
      // }
    },
    methods: {
      ...mapActions([
        'logout',
        'setSingleMenuItem',
      ]),
      handleLogout() {
        this.logout().then(res => {
          this.$router.push({path: '/'});
        })
      },
      addTab(targetName, targetIndex) {
        if (this.editableTabNames.indexOf(targetName) !== -1) return
        this.editableTabs.push({
          title: targetName,
          name: targetIndex,
        });
        this.editableTabValue = targetIndex;
        this.editableTabNames.push(targetName);
      },
      removeTab(targetName) {
        var that = this;
        let tabs = this.editableTabs;
        let activeName = this.editableTabValue;
        let activeTitle;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
              that.changeTab({
                label: nextTab.title,
              })
            }
          });
        }

        this.editableTabValue = activeName;
        this.editableTabs = tabs.filter(tab => {
          if (tab.name === targetName) activeTitle = tab.title;
          return tab.name !== targetName
        });
        this.editableTabNames = this.editableTabNames.filter(name => name !== activeTitle)
      },
      changeTab(targetTab) {
        if (targetTab.label === '主页') {
          if (!this.$route.path.startsWith(`/${this.roleScene.toLowerCase()}/home`)) {
            this.$router.push({
              path: `/${this.roleScene.toLowerCase()}/home`
            })
          }
          return
        }
        var targetMenuItem
        for (var menuItem of this.menuList) {
          if (menuItem.children) {
            for (var child of menuItem.children) {
              if (child.title === targetTab.label) {
                targetMenuItem = child
              }
            }
          } else if (menuItem.title === targetTab.label) {
            targetMenuItem = menuItem
          }
        }
        if (this.$route.path.startsWith(targetMenuItem.index)) return
        this.$router.push({
          path: `${targetMenuItem.index}/${targetMenuItem.position}`,
          query: targetMenuItem.query,
        })
      },
      changeMenu(index, indexPath) {
        this.editableTabValue = index;
      }
    },
  }
</script>

<style scoped>
  .header-title {
    color: white;
    font-family: 幼圆;
    font-size: x-large;
  }

  .header-text:hover {
    cursor: default;
  }

  .sub-container {
    height: calc(100vh - 60px);
  }

  el-header > span {
    background-color: red;
  }

  .main-body {
    overflow-y: scroll;
  }
</style>

<style>
  .el-header, .el-footer {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: left;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 30px;*/
    padding-bottom: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 60px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 60px;
  }

  .el-tabs__nav {
    line-height: 30px;
  }

  .el-collapse-item {
    text-align: left;
  }

  .el-collapse-item__header {
    font-size: 14px;
  }

  .el-collapse-item__content {
    font-size: 14px;
  }
</style>
