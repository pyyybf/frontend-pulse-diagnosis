import {
  getTermByKeywordAPI,
  getAllTermAPI,
  addTermAPI,
  updateTermByIdAPI,
  delTermByIdAPI,
  uploadTermAPI,
  downloadTermAPI,
} from "@/api/term";
import {Message} from 'element-ui';

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
            Message.error(response.data.message)
            reject()
          }
        }).catch(err => {
          reject()
        })
      })
    },
    getAllTerm({}, data) {
      return new Promise((resolve, reject) => {
        getAllTermAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            Message.error(response.data.message)
            reject()
          }
        }).catch(err => {
          reject()
        })
      })
    },
    addTerm({}, data) {
      return new Promise((resolve, reject) => {
        addTermAPI(data).then(response => {
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
    editTerm({}, data) {
      return new Promise((resolve, reject) => {
        updateTermByIdAPI(data.id, data.termForm).then(response => {
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
    delTermById({}, data) {
      return new Promise((resolve, reject) => {
        delTermByIdAPI(data).then(response => {
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
    downloadTerm({}, data) {
      return new Promise((resolve, reject) => {
        downloadTermAPI(data).then(response => {
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
    uploadTerm({}, data) {
      return new Promise((resolve, reject) => {
        uploadTermAPI(data).then(response => {
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
  },
}
export default term;
