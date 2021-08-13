import {
  getClassificationTreeAPI,
  getAllModernAPI,
  getModernByClassificationIdAPI,
  getModernByIdAPI,
  updateClassificationNameByIdAPI,
  updateModernNameByIdAPI,
  delClassificationByIdAPI,
  delModernByIdIdAPI,
  getAllClassificationAPI,
  createClassificationAPI,
  addModernAPI,
  updateModernByIdAPI,
  uploadModernPdfAPI,
  downloadModernAPI,
  uploadModernAPI,
} from "@/api/modern";

const modern = {
  state: {},
  mutations: {},
  actions: {
    getModernClassificationTree({}, data) {
      return new Promise((resolve, reject) => {
        getClassificationTreeAPI(data).then(response => {
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
    getAllModern({}, data) {
      return new Promise((resolve, reject) => {
        getAllModernAPI(data).then(response => {
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
    getModernByClassificationId({}, data) {
      return new Promise((resolve, reject) => {
        getModernByClassificationIdAPI(data).then(response => {
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
    getModernById({}, data) {
      return new Promise((resolve, reject) => {
        getModernByIdAPI(data).then(response => {
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
    updateModernClassificationNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateClassificationNameByIdAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject(response.data.message)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateModernNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateModernNameByIdAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject(response.data.message)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delModernClassificationById({}, data) {
      return new Promise((resolve, reject) => {
        delClassificationByIdAPI({id: data}).then(response => {
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
    delModernById({}, data) {
      return new Promise((resolve, reject) => {
        delModernByIdIdAPI({id: data}).then(response => {
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
    getAllModernClassification({}) {
      return new Promise((resolve, reject) => {
        getAllClassificationAPI().then(response => {
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
    createModernClassification({}, data) {
      return new Promise((resolve, reject) => {
        createClassificationAPI({name: data}).then(response => {
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
    addModern({}, data) {
      return new Promise((resolve, reject) => {
        addModernAPI(data).then(response => {
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
    editModern({}, data) {
      return new Promise((resolve, reject) => {
        updateModernByIdAPI(data.id, data.modernForm).then(response => {
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
    uploadModernPdf({}, data) {
      return new Promise((resolve, reject) => {
        uploadModernPdfAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject(response.data.message)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    downloadModern({}, data) {
      return new Promise((resolve, reject) => {
        downloadModernAPI(data).then(response => {
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
    uploadModern({}, data) {
      return new Promise((resolve, reject) => {
        uploadModernAPI(data)
          .then(response => {
            // console.log(response)
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject(response.data.message)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  }
};
export default modern;
