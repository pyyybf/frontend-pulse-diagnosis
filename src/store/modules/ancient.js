import {
  getClassificationTreeAPI,
  getAllAncientAPI,
  getAncientByClassificationIdAPI,
  getAncientByIdAPI,
  getAncientDetailByIdAPI,
  updateClassificationNameByIdAPI,
  updateAncientNameByIdAPI,
  delClassificationByIdAPI,
  delAncientByIdIdAPI,
  downloadAncientAPI,
} from "@/api/ancient";
import {Message} from 'element-ui';

const ancient = {
  state: {},
  mutations: {},
  actions: {
    getAncientClassificationTree({}, data) {
      return new Promise((resolve, reject) => {
        getClassificationTreeAPI(data).then(response => {
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
    getAllAncient({}, data) {
      return new Promise((resolve, reject) => {
        getAllAncientAPI(data).then(response => {
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
    getAncientByClassificationId({}, data) {
      return new Promise((resolve, reject) => {
        getAncientByClassificationIdAPI(data).then(response => {
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
    getAncientById({}, data) {
      return new Promise((resolve, reject) => {
        getAncientByIdAPI(data).then(response => {
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
    getAncientDetailById({}, data) {
      return new Promise((resolve, reject) => {
        getAncientDetailByIdAPI(data).then(response => {
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
    updateAncientClassificationNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateClassificationNameByIdAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject()
            }
          })
          .catch(error => {
            reject()
          })
      })
    },
    updateAncientNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateAncientNameByIdAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject()
            }
          })
          .catch(error => {
            reject()
          })
      })
    },
    delAncientClassificationById({}, data) {
      return new Promise((resolve, reject) => {
        delClassificationByIdAPI({id: data}).then(response => {
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
    delAncientById({}, data) {
      return new Promise((resolve, reject) => {
        delAncientByIdIdAPI({id: data}).then(response => {
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
    downloadAncient({}, data) {
      return new Promise((resolve, reject) => {
        downloadAncientAPI(data).then(response => {
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
  }
};
export default ancient;
