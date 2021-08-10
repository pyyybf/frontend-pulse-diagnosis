import HttpRequest from '@/axios/api.request'

const api = {
  modernPre: '/api/modern',
}

export const getClassificationTreeAPI = () => {
  return HttpRequest.request({
    url: `${api.modernPre}/getClassificationTree`,
    method: 'GET',
  })
}

export const getAllModernAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/getAllModern`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getModernByClassificationIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/getModernByClassificationId`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getModernByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/getModernById/${data.id}`,
    method: 'GET',
  })
}

export const updateClassificationNameByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/updateClassificationNameById`,
    method: 'PUT',
    params: {...data}
  })
}

export const updateModernNameByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/updateModernNameById`,
    method: 'PUT',
    params: {
      ...data
    }
  })
}

export const delClassificationByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/delClassificationById/${data.id}`,
    method: 'DELETE',
  })
}

export const delModernByIdIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/delModernById/${data.id}`,
    method: 'DELETE',
  })
}

export const getAllClassificationAPI = () => {
  return HttpRequest.request({
    url: `${api.modernPre}/getAllClassification`,
    method: 'GET',
  })
}

export const createClassificationAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/createClassification`,
    method: 'POST',
    params: {
      ...data
    }
  })
}

export const addModernAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/addModern`,
    method: 'POST',
    data
  })
}

export const updateModernByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/updateModernById/${id}`,
    method: 'PUT',
    data
  })
}

export const uploadModernPdfAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/uploadModernPdf`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const downloadModernAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data);
  return HttpRequest.request({
    url: `${api.modernPre}/downloadModern`,
    method: 'POST',
    data: params,
    responseType: 'blob',
  })
}

export const uploadModernAPI = (data) => {
  return HttpRequest.request({
    url: `${api.modernPre}/uploadModern`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
