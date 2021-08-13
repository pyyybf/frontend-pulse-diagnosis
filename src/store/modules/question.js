import {
  getAllQuestionAPI,
  delQuestionByIdAPI,
  addQuestionAPI,
  updateQuestionByIdAPI,
  downloadQuestionAPI,
  uploadQuestionAPI,
  getPracticeByUserIdAPI,
  delPracticeByIdAPI,
  getPracticeDetailAPI,
  getNewPracticeAPI,
  addPracticeAPI,
} from "@/api/question";

const question = {
  state: {},
  mutations: {},
  actions: {
    getAllQuestion({}, data) {
      return new Promise((resolve, reject) => {
        getAllQuestionAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(err => {
          reject(error)
        })
      })
    },
    delQuestionById({}, data) {
      return new Promise((resolve, reject) => {
        delQuestionByIdAPI(data).then(response => {
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
    addQuestion({}, data) {
      return new Promise((resolve, reject) => {
        addQuestionAPI(data).then(response => {
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
    editQuestion({}, data) {
      return new Promise((resolve, reject) => {
        updateQuestionByIdAPI(data.id, data.questionForm).then(response => {
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
    downloadQuestion({}, data) {
      return new Promise((resolve, reject) => {
        downloadQuestionAPI(data).then(response => {
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
    uploadQuestion({}, data) {
      return new Promise((resolve, reject) => {
        uploadQuestionAPI(data).then(response => {
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
    getPracticeByUserId({}, data) {
      return new Promise((resolve, reject) => {
        getPracticeByUserIdAPI(data).then(response => {
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
    delPracticeById({}, data) {
      return new Promise((resolve, reject) => {
        delPracticeByIdAPI(data).then(response => {
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
    getPracticeDetail({}, data) {
      return new Promise((resolve, reject) => {
        getPracticeDetailAPI(data).then(response => {
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
    getNewPractice({}, data) {
      return new Promise((resolve, reject) => {
        getNewPracticeAPI(data).then(response => {
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
    addPractice({}, data) {
      return new Promise((resolve, reject) => {
        addPracticeAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};
export default question;
