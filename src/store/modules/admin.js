import {
  getAllUserInfoAPI,
  getAllRoleAPI,
  delUserByIdAPI,
} from "@/api/admin";
import {Message} from 'element-ui';

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
            Message.error(response.data.message)
            reject()
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
            Message.error(response.data.message)
            reject()
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
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      });
    }
  }
};
export default admin;
