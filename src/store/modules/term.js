import {
  getTermByKeywordAPI,
  getAllTermAPI,
  addTermAPI,
  updateTermByIdAPI,
  delTermByIdAPI,
  uploadTermAPI,
  downloadTermAPI,
} from "@/api/term";

const term = {
  state: {},
  mutations: {},
  actions: {
    getTermByKeyword({}, data) {
      return new Promise((resolve, reject) => {
        getTermByKeywordAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllTerm({}, data) {
      return new Promise((resolve, reject) => {
        getAllTermAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    addTerm({}, data) {
      return new Promise((resolve, reject) => {
        addTermAPI(data).then(response => {
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
    editTerm({}, data) {
      return new Promise((resolve, reject) => {
        updateTermByIdAPI(data.id, data.termForm).then(response => {
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
    delTermById({}, data) {
      return new Promise((resolve, reject) => {
        delTermByIdAPI(data).then(response => {
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
    downloadTerm({}, data) {
      return new Promise((resolve, reject) => {
        downloadTermAPI(data).then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject('下载失败')
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    uploadTerm({}, data) {
      return new Promise((resolve, reject) => {
        uploadTermAPI(data).then(response => {
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
  },
}
export default term;
