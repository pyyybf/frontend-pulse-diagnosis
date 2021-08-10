import HttpRequest from '@/axios/api.request'

const api = {
  diagramPre: '/api/diagram',
}

export const getClassificationTreeAPI = () => {
  return HttpRequest.request({
    url: `${api.diagramPre}/getClassificationTree`,
    method: 'GET',
  })
}

export const getAllDiagramAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/getAllDiagram`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getDiagramByClassificationIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/getDiagramByClassificationId`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getDiagramByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/getDiagramById/${data.id}`,
    method: 'GET',
  })
}

export const delClassificationByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/delClassificationById/${data.id}`,
    method: 'DELETE',
  })
}

export const delDiagramByIdIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/delDiagramById/${data.id}`,
    method: 'DELETE',
  })
}

export const getAllClassificationAPI = () => {
  return HttpRequest.request({
    url: `${api.diagramPre}/getAllClassification`,
    method: 'GET',
  })
}

export const createClassificationAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/createClassification`,
    method: 'POST',
    params: {
      ...data
    }
  })
}

export const addDiagramAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/addDiagram`,
    method: 'POST',
    data
  })
}

export const updateDiagramByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/updateDiagramById/${id}`,
    method: 'PUT',
    data
  })
}

export const uploadDiagramImgAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/uploadDiagramImg`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const updateClassificationNameByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/updateClassificationNameById`,
    method: 'PUT',
    params: {...data}
  })
}

export const updateDiagramNameByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/updateDiagramNameById`,
    method: 'PUT',
    params: {...data}
  })
}

export const downloadDiagramAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data);
  return HttpRequest.request({
    url: `${api.diagramPre}/downloadDiagram`,
    method: 'POST',
    data: params,
    responseType: 'blob',
  })
}

export const uploadDiagramAPI = (data) => {
  return HttpRequest.request({
    url: `${api.diagramPre}/uploadDiagram`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
