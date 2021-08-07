import {
  getTermByKeywordAPI,
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
  },
}
export default term;
