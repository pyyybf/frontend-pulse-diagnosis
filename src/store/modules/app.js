const app = {
  state: {
    menuList: []
  },
  mutations: {
    set_menuList: (state, data) => {
      // console.log('set_menuList')
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
              },
              {
                title: '现代文献管理',
                index: '/admin/modernTextManage',
                position: '',
              },
              {
                title: '结构化文本管理',
                index: '/admin/structuredTextManage',
                position: '',
              },
            ]
          })
        } else if (permission === '用户管理') {
          state.menuList.push({
            title: '用户管理',
            index: '/admin/userManage',
            position: '',
          })
        } else if (permission === '角色权限管理') {
          state.menuList.push({
            title: '角色权限管理',
            index: '/admin/permissionManage',
            position: '',
          })
        } else if (permission === '脉图管理') {
          state.menuList.push({
            title: '脉图管理',
            index: '/admin/diagramManage',
            position: '',
          })
        } else if (permission === '术语管理') {
          state.menuList.push({
            title: '术语管理',
            index: '/admin/termManage',
            position: '',
          })
        } else if (permission === '题库管理') {
          state.menuList.push({
            title: '题库管理',
            index: '/admin/questionManage',
            position: '',
          })
        }
      })
      localStorage.setItem('menuList', JSON.stringify(state.menuList));
      // console.log(state.menuList)
    },
    set_singleMenuItem: (state, data) => {
      // console.log('set_singleMenuItem data =', data)
      for (let i = 0; i < state.menuList.length; i++) {
        // console.log(state.menuList[i].children)
        if (state.menuList[i].children) {
          // alert('11111111111111')
          for (let j = 0; j < state.menuList[i].children.length; j++) {
            if (data.startsWith(state.menuList[i].children[j].index)) {
              state.menuList[i].children[j].position = data.split('/')[3] ? data.split('/')[3] : '';
            }
          }
        } else if (data.startsWith(state.menuList[i].index)) {
          state.menuList[i].position = data.split('/')[3] ? data.split('/')[3] : '';
        }
      }
      // console.log(state.menuList)
      localStorage.setItem('menuList', JSON.stringify(state.menuList));
    },
  },
  actions: {
    setMenuList({commit}, data) {
      // console.log('setMenuList', data)
      commit('set_menuList', data);
    },
    setSingleMenuItem({commit}, data) {
      commit('set_singleMenuItem', data);
    },
  }
};
export default app;
