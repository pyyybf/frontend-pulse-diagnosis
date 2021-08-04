import {
  loginAPI,
  registerAPI,
} from "@/api/user";
import {getToken, setToken, removeToken} from '@/utils/auth';
import {Message} from 'element-ui';

const user = {
  state: {
    token: getToken(),
    roleScene: '',
    userInfo: {},
    userId: -1,
    roleName: '',
    rolePermission: [],
  },
  mutations: {
    set_token: (state, data) => {
      state.token = data
      setToken(data)
    },
    set_roleScene: (state, data) => {
      state.roleScene = data
      localStorage.setItem('roleScene', data)
    },
    set_userInfo: (state, data) => {
      state.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    set_userId: (state, data) => {
      state.userId = data
      localStorage.setItem('userId', data)
    },
    set_roleName: (state, data) => {
      state.roleName = data
      localStorage.setItem('roleName', data)
    },
    set_rolePermission: (state, data) => {
      state.rolePermission = data
      localStorage.setItem('rolePermission', JSON.stringify(data))
    },
  },
  actions: {
    login({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        loginAPI({
          username: data.username.trim(),
          password: data.password
        }).then(response => {
          console.log(response)
          if (response.data.success) {
            commit('set_userInfo', response.data.content)
            commit('set_userId', response.data.content.id)
            commit('set_token', response.data.content.roleScene === 1 ? 'USER' : 'ADMIN')
            commit('set_roleScene', response.data.content.roleScene === 1 ? 'USER' : 'ADMIN')
            commit('set_roleName', response.data.content.roleName)
            commit('set_rolePermission', response.data.content.rolePermission.split(','))
            localStorage.setItem('username', data.username.trim())
            dispatch('setMenuList', response.data.content.rolePermission.split(','))
            Message.success("登录成功")
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    logout({dispatch, commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('set_token', undefined)
          removeToken()
          commit('set_roleScene', undefined)
          commit('set_roleName', '')
          commit('set_rolePermission', [])
          commit('set_userId', -1)
          commit('set_userInfo', {})
          dispatch('setMenuList', [])
          localStorage.removeItem('username')
          localStorage.removeItem('roleScene')
          localStorage.removeItem('rolePermission')
          localStorage.removeItem('roleName')
          localStorage.removeItem('userId')
          localStorage.removeItem('userInfo')
          localStorage.removeItem('menuList')
          Message.success("登出成功")
          resolve()
        } catch (e) {
          Message.error("登出失败")
          reject()
        }
      });
    },
    register({dispatch}, data) {
      return new Promise((resolve, reject) => {
        registerAPI({
          username: data.username.trim(),
          password: data.password,
          phone: data.phone,
          email: data.email,
        }).then(response => {
          console.log('注册结果：', response)
          if (response.data.success) {
            Message.success("注册成功")
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    // resetPwd({}, data) {
    //   return new Promise((resolve, reject) => {
    //     resetPwdAPI({
    //       email: data.email,
    //       newPassword: data.newPassword,
    //       verifyCode: data.verifyCode,
    //     }).then(response => {
    //       if (response.data.success) {
    //         Message.success(response.data.content)
    //         resolve()
    //       } else {
    //         Message.error(response.data.message)
    //         reject()
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   });
    // },
    // getUserInfoById({commit}, data) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfoByIdAPI(data).then(response => {
    //       if (response.data.success) {
    //         // Message.success(response.data.content)
    //         commit('set_userInfo', response.data.content)
    //         resolve()
    //       } else {
    //         Message.error(response.data.message)
    //         reject()
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   });
    // }
  }
};
export default user;
