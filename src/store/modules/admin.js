import {
  getAllUserInfoAPI,
  getAllRoleAPI,
  getRoleByPageAPI,
  delUserByIdAPI,
  updateUserByIdAPI,
  addRoleAPI,
  updateRoleByIdAPI,
} from "@/api/admin";

const admin = {
  state: {},
  mutations: {},
  actions: {
    getAllUserInfo({}, data) {
      return new Promise((resolve, reject) => {
        getAllUserInfoAPI(data).then(response => {
          // console.log(response)
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    getAllRole({}) {
      return new Promise((resolve, reject) => {
        getAllRoleAPI().then(response => {
          // console.log(response)
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    getRoleByPage({}, data) {
      return new Promise((resolve, reject) => {
        getRoleByPageAPI(data).then(response => {
          // console.log(response)
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    delUserById({}, data) {
      return new Promise((resolve, reject) => {
        delUserByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    editUser({}, data) {
      return new Promise((resolve, reject) => {
        updateUserByIdAPI(data.id, data.userForm).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    addRole({}, data) {
      return new Promise((resolve, reject) => {
        addRoleAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    editRole({}, data) {
      return new Promise((resolve, reject) => {
        updateRoleByIdAPI(data.id, data.roleForm).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    }
  }
};
export default admin;
