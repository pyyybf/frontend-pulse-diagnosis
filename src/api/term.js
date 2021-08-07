import HttpRequest from '@/axios/api.request'

const api = {
  termPre: '/api/term',
}

export const getTermByKeywordAPI = (data) => {
  return HttpRequest.request({
    url: `${api.termPre}/getTermByKeyword`,
    method: 'GET',
    params: {
      ...data
    },
  })
}
