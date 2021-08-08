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
    url: `${api.diagramPre}/getDiagramById`,
    method: 'GET',
    params: {
      ...data
    }
  })
}
