import {
  getClassificationTreeAPI,
  getAllDiagramAPI,
  getDiagramByClassificationIdAPI,
  getDiagramByIdAPI,
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
  }
};
export default diagram;
