const getters = {
  token: state => state.user.token ? state.user.token : localStorage.getItem('token'),
  roleScene: state => state.user.roleScene ? state.user.roleScene : localStorage.getItem('roleScene'),
  userInfo: state => state.user.userInfo ? state.user.userInfo : JSON.parse(localStorage.getItem('userInfo')),
  userId: state => state.user.userId > 0 ? state.user.userId : Number(localStorage.getItem('userId')),
  roleName: state => state.user.roleName ? state.user.roleName : localStorage.getItem('roleName'),
  rolePermission: state => (state.user.rolePermission.length && state.user.rolePermission.length > 0) ? state.user.rolePermission : JSON.parse(localStorage.getItem('rolePermission')),

  menuList: state => (state.app.menuList.length && state.app.menuList.length > 0) ? state.app.menuList : JSON.parse(localStorage.getItem('menuList')),
}

export default getters
