import {
  getCatalogTreeAPI,
  getAllStructAPI,
  getStructByCatalogIdAPI,
  getStructByIdAPI,
} from "@/api/struct";
import {Message} from 'element-ui';

const struct = {
  state: {},
  mutations: {},
  actions: {
    getCatalogTree({}, data) {
      return new Promise((resolve, reject) => {
        getCatalogTreeAPI(data).then(response => {
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
    getAllStruct({}, data) {
      return new Promise((resolve, reject) => {
        getAllStructAPI(data).then(response => {
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
    getStructByCatalogId({}, data) {
      return new Promise((resolve, reject) => {
        getStructByCatalogIdAPI(data).then(response => {
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
    getStructById({}, data) {
      return new Promise((resolve, reject) => {
        getStructByIdAPI(data).then(response => {
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
  }
};
export default struct;
