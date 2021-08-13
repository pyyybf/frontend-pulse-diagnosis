import {
  getCatalogTreeAPI,
  getAllStructAPI,
  getStructByCatalogIdAPI,
  getStructByIdAPI,
  getCatalogPathListAPI,
  delCatalogByIdAPI,
  updateCatalogByIdAPI,
  delStructByIdAPI,
  updateStructByIdAPI,
  addStructAPI,
  downloadStructAPI,
  uploadStructAPI,
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
    getCatalogPathList({}) {
      return new Promise((resolve, reject) => {
        getCatalogPathListAPI().then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    delCatalogById({}, data) {
      return new Promise((resolve, reject) => {
        delCatalogByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateCatalogById({}, data) {
      return new Promise((resolve, reject) => {
        updateCatalogByIdAPI(data.id, {name: data.name}).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    delStructById({}, data) {
      return new Promise((resolve, reject) => {
        delStructByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateStructById({}, data) {
      return new Promise((resolve, reject) => {
        updateStructByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    addStruct({}, data) {
      return new Promise((resolve, reject) => {
        addStructAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    downloadStruct({}, ) {
      return new Promise((resolve, reject) => {
        downloadStructAPI().then(response => {
          // console.log(response)
          if (response.status === 200) {
            resolve(response.data)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    uploadStruct({}, data) {
      return new Promise((resolve, reject) => {
        uploadStructAPI(data).then(response => {
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
