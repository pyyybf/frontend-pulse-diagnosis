const app = {
  state: {
    menuList: localStorage.getItem('menuList') ? JSON.parse(localStorage.getItem('menuList')) : [],
  },
  mutations: {
    set_menuList: (state, data) => {
      state.menuList = []
      data.forEach(permission => {
        if (permission === '文献管理') {
          state.menuList.push({
            title: '文献管理',
            children: [
              {
                title: '古籍管理',
                index: '/admin/ancientBookManage',
                position: '',
                query: {},
              },
              {
                title: '现代文献管理',
                index: '/admin/modernTextManage',
                position: '',
                query: {},
              },
              {
                title: '结构化文本管理',
                index: '/admin/structuredTextManage',
                position: '',
                query: {},
              },
            ]
          })
        } else if (permission === '用户管理') {
          state.menuList.push({
            title: '用户管理',
            index: '/admin/userManage',
            position: '',
            query: {},
          })
        } else if (permission === '角色权限管理') {
          state.menuList.push({
            title: '角色权限管理',
            index: '/admin/permissionManage',
            position: '',
            query: {},
          })
        } else if (permission === '脉图管理') {
          state.menuList.push({
            title: '脉图管理',
            index: '/admin/diagramManage',
            position: '',
            query: {},
          })
        } else if (permission === '术语管理') {
          state.menuList.push({
            title: '术语管理',
            index: '/admin/termManage',
            position: '',
            query: {},
          })
        } else if (permission === '题库管理') {
          state.menuList.push({
            title: '题库管理',
            index: '/admin/questionManage',
            position: '',
            query: {},
          })
        } else if (permission === '文本阅读') {
          state.menuList.push({
            title: '文本阅读',
            children: [
              {
                title: '古籍阅读',
                index: '/user/ancientBook',
                position: '',
                query: {},
              },
              {
                title: '现代文献阅读',
                index: '/user/modernText',
                position: '',
                query: {},
              },
              {
                title: '结构文本阅读',
                index: '/user/structuredText',
                position: '',
                query: {},
              },
            ]
          })
        } else if (permission === '脉图分类') {
          state.menuList.push({
            title: '脉图分类',
            index: '/user/diagram',
            position: '',
            query: {},
          })
        } else if (permission === '段落分析') {
          state.menuList.push({
            title: '段落分析',
            index: '/user/term',
            position: '',
            query: {},
          })
        } else if (permission === '在线练习') {
          state.menuList.push({
            title: '在线练习',
            index: '/user/question',
            position: '',
            query: {},
          })
        }
      })
      localStorage.setItem('menuList', JSON.stringify(state.menuList));
    },
    set_singleMenuItem: (state, data) => {
      for (let i = 0; i < state.menuList.length; i++) {
        if (state.menuList[i].children) {
          for (let j = 0; j < state.menuList[i].children.length; j++) {
            if (data.path.startsWith(state.menuList[i].children[j].index)) {
              state.menuList[i].children[j].position = data.path.split('/')[3] ? data.path.split('/')[3] : '';
              state.menuList[i].children[j].query = data.query;
            }
          }
        } else if (data.path.startsWith(state.menuList[i].index)) {
          state.menuList[i].position = data.path.split('/')[3] ? data.path.split('/')[3] : '';
          state.menuList[i].query = data.query;
        }
      }
      localStorage.setItem('menuList', JSON.stringify(state.menuList));
    },
  },
  actions: {
    setMenuList({commit}, data) {
      commit('set_menuList', data);
    },
    setSingleMenuItem({commit}, data) {
      commit('set_singleMenuItem', data);
    },
  }
};
export default app;
