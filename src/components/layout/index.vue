<template>
  <el-container>
    <el-header height="60px">
      <el-row>
        <el-col :span="8" style="text-align: left">
          <span style="color: white;font-family: 幼圆;font-size: x-large">古代脉诊知识资源数据库</span>
        </el-col>
        <el-col :span="6" :offset="10" style="text-align: right">
          <span style="color: white">欢迎，{{ roleName }}:</span>
          <el-dropdown>
            <span class="el-dropdown-link" style="color: white">
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
        <el-menu class="el-menu-vertical-demo" router style="height: 100%">
          <el-submenu v-for="subMenu of menuList" v-if="subMenu.children" index="1">
            <template slot="title">
              <span>{{subMenu.title}}</span>
            </template>
            <el-menu-item v-for="menuItem of subMenu.children" :index="menuItem.index"
                          @click.native="addTab(menuItem.title)">{{menuItem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-for="menuItem of menuList" v-if="!menuItem.children" :index="menuItem.index"
                        @click.native="addTab(menuItem.title)">
            <span slot="title">{{menuItem.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-tabs>
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
        editableTabsValue: '1',
        editableTabs: [{
          title: '主页',
          name: '主页',
        }],
        tabIndex: 1,
        editableTabNames: ["主页"],
      }
    },
    mounted() {
      console.log("11111111111111111111111111111", this.menuList)
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
        // console.log('ROUTE PATH', newVal, oldVal);
        this.setSingleMenuItem(newVal);
      }
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
      addTab(targetName) {
        if (this.editableTabNames.indexOf(targetName) !== -1) return
        // let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName,
          name: targetName,
        });
        this.editableTabsValue = targetName;
        this.editableTabNames.push(targetName);
        // console.log('after add', this.editableTabNames)
      },
      removeTab(targetName) {
        var that = this;
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        let activeTitle;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              // console.log(tab)
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
              that.changeTab({
                label: nextTab.title,
              })
              // that.editableTabNames.splice(this.editableTabNames.indexOf(nextTab.title), 1);
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => {
          if (tab.name === targetName) activeTitle = tab.title;
          return tab.name !== targetName
        });
        this.editableTabNames = this.editableTabNames.filter(name => name !== activeTitle)
        // console.log('after remove', this.editableTabNames)
      },
      changeTab(targetTab) {
        // console.log(targetTab)
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
        // var targetMenuItem = this.menuList.filter(menuItem => {
        //   return menuItem.title === targetTab.label
        // })[0]
        // console.log(this.$route.path, targetMenuItem.index)
        if (this.$route.path.startsWith(targetMenuItem.index)) return
        this.$router.push({
          path: `${targetMenuItem.index}/${targetMenuItem.position}`
        })
      }
    },
  }
</script>

<style scoped>
  .sub-container {
    height: calc(100vh - 60px);
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
</style>
