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

export const getCatalogPathListAPI = () => {
  return HttpRequest.request({
    url: `${api.structPre}/getCatalogPathList`,
    method: 'GET'
  })
}

export const delCatalogByIdAPI = (id) => {
  return HttpRequest.request({
    url: `${api.structPre}/delCatalogById/${id}`,
    method: 'DELETE'
  })
}

export const updateCatalogByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.structPre}/updateCatalogById/${id}`,
    method: 'PUT',
    params: {
      ...data
    }
  })
}

export const delStructByIdAPI = (id) => {
  return HttpRequest.request({
    url: `${api.structPre}/delStructById/${id}`,
    method: 'DELETE'
  })
}

export const updateStructByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/updateStructById`,
    method: 'PUT',
    data
  })
}

export const addStructAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/addStruct`,
    method: 'POST',
    data
  })
}

export const downloadStructAPI = () => {
  return HttpRequest.request({
    url: `${api.structPre}/downloadStruct`,
    method: 'POST',
    responseType: 'blob',
  })
}

export const uploadStructAPI = (data) => {
  return HttpRequest.request({
    url: `${api.structPre}/uploadStruct`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
