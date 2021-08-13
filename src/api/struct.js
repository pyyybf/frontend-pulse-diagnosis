import HttpRequest from '@/axios/api.request'

const api = {
  structPre: '/api/struct',
}

export const getCatalogTreeAPI = () => {
  return HttpRequest.request({
    url: `${api.structPre}/getCatalogTree`,
    method: 'GET',
  })
}

export const getAllStructAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/getAllStruct`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getStructByCatalogIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/getStructByCatalogId`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getStructByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/getStructById/${data.id}`,
    method: 'GET'
  })
}
