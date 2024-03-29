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
  getAllClassificationAPI,
  createClassificationAPI,
  addAncientAPI,
  updateAncientByIdAPI,
  uploadAncientAPI,
} from "@/api/ancient";

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
            reject(response.data.message)
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
            reject(response.data.message)
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
            reject(response.data.message)
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
            reject(response.data.message)
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
            reject(response.data.message)
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
              reject(response.data.message)
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
              reject(response.data.message)
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
            reject(response.data.message)
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
            reject(response.data.message)
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
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    getAllAncientClassification({}) {
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
    createAncientClassification({}, data) {
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
    addAncient({}, data) {
      return new Promise((resolve, reject) => {
        addAncientAPI(data).then(response => {
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
    editAncient({}, data) {
      return new Promise((resolve, reject) => {
        updateAncientByIdAPI(data.id, data.ancientForm).then(response => {
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
    uploadAncient({}, data) {
      return new Promise((resolve, reject) => {
        uploadAncientAPI(data).then(response => {
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
  }
};
export default ancient;
