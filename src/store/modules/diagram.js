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
  updateDiagramNameByIdAPI
} from "@/api/diagram";
import {Message} from 'element-ui';

const diagram = {
  state: {},
  mutations: {},
  actions: {
    getClassificationTree({}, data) {
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
    getAllDiagram({}, data) {
      return new Promise((resolve, reject) => {
        getAllDiagramAPI(data).then(response => {
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
    getDiagramByClassificationId({}, data) {
      return new Promise((resolve, reject) => {
        getDiagramByClassificationIdAPI(data).then(response => {
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
    getDiagramById({}, data) {
      return new Promise((resolve, reject) => {
        getDiagramByIdAPI(data).then(response => {
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
    delClassificationById({}, data) {
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
    delDiagramById({}, data) {
      return new Promise((resolve, reject) => {
        delDiagramByIdIdAPI({id: data}).then(response => {
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
    getAllClassification({}) {
      return new Promise((resolve, reject) => {
        getAllClassificationAPI().then(response => {
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
    createClassification({}, data) {
      return new Promise((resolve, reject) => {
        createClassificationAPI({name: data}).then(response => {
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
    addDiagram({}, data) {
      return new Promise((resolve, reject) => {
        addDiagramAPI(data).then(response => {
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
    editDiagram({}, data) {
      return new Promise((resolve, reject) => {
        updateDiagramByIdAPI(data.id, data.diagramForm).then(response => {
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
    uploadDiagramImg({}, data) {
      return new Promise((resolve, reject) => {
        uploadDiagramImgAPI(data)
          .then(response => {
            if (response.data.success) {
              resolve(response.data.content)
            } else {
              reject()
            }
          })
          .catch(error => {
            Message.error("上传失败")
            reject()
          })
      })
    },
    updateClassificationNameById({}, data) {
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
    updateDiagramNameById({}, data) {
      return new Promise((resolve, reject) => {
        updateDiagramNameByIdAPI(data)
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
  }
};
export default diagram;
