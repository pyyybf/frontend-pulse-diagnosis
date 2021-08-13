import {
  getClassificationTreeAPI,
  getAllDiagramAPI,
  getDiagramByClassificationIdAPI,
  getDiagramByIdAPI,
  delClassificationByIdAPI,
  delDiagramByIdIdAPI,
  getAllClassificationAPI,
  createClassificationAPI,
  addDiagramAPI,
  updateDiagramByIdAPI,
  uploadDiagramImgAPI,
  updateClassificationNameByIdAPI,
  updateDiagramNameByIdAPI,
  downloadDiagramAPI,
  uploadDiagramAPI,
} from "@/api/diagram";

const diagram = {
  state: {},
  mutations: {},
  actions: {
    getDiagramClassificationTree({}, data) {
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
    getAllDiagram({}, data) {
      return new Promise((resolve, reject) => {
        getAllDiagramAPI(data).then(response => {
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
    getDiagramByClassificationId({}, data) {
      return new Promise((resolve, reject) => {
        getDiagramByClassificationIdAPI(data).then(response => {
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
    getDiagramById({}, data) {
      return new Promise((resolve, reject) => {
        getDiagramByIdAPI(data).then(response => {
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
    delDiagramClassificationById({}, data) {
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
    delDiagramById({}, data) {
      return new Promise((resolve, reject) => {
        delDiagramByIdIdAPI({id: data}).then(response => {
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
    getAllDiagramClassification({}) {
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
    createDiagramClassification({}, data) {
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
    addDiagram({}, data) {
      return new Promise((resolve, reject) => {
        addDiagramAPI(data).then(response => {
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
    editDiagram({}, data) {
      return new Promise((resolve, reject) => {
        updateDiagramByIdAPI(data.id, data.diagramForm).then(response => {
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
    uploadDiagramImg({}, data) {
      return new Promise((resolve, reject) => {
        uploadDiagramImgAPI(data)
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
    updateDiagramClassificationNameById({}, data) {
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
    updateDiagramNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateDiagramNameByIdAPI(data)
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
    downloadDiagram({}, data) {
      return new Promise((resolve, reject) => {
        downloadDiagramAPI(data).then(response => {
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
    uploadDiagram({}, data) {
      return new Promise((resolve, reject) => {
        uploadDiagramAPI(data)
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
  }
};
export default diagram;
