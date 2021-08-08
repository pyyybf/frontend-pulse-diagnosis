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

export const getAllTermAPI = (data) => {
  console.log(data)
  return HttpRequest.request({
    url: `${api.termPre}/getAllTerm`,
    method: 'GET',
    params: {
      ...data
    },
  })
}

export const addTermAPI = (data) => {
  return HttpRequest.request({
    url: `${api.termPre}/addTerm`,
    method: 'POST',
    data
  })
}

export const updateTermByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.termPre}/updateTermById/${id}`,
    method: 'PUT',
    data
  })
}

export const delTermByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.termPre}/delTermById/${data}`,
    method: 'DELETE',
  })
}

export const downloadTermAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data);
  return HttpRequest.request({
    url: `${api.termPre}/downloadTerm`,
    method: 'POST',
    data: params,
    responseType: 'blob',
  })
}

export const uploadTermAPI = (data) => {
  return HttpRequest.request({
    url: `${api.termPre}/uploadTerm`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
