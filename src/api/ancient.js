import HttpRequest from '@/axios/api.request'

const api = {
  ancientPre: '/api/ancient',
}

export const getClassificationTreeAPI = () => {
  return HttpRequest.request({
    url: `${api.ancientPre}/getClassificationTree`,
    method: 'GET',
  })
}

export const getAllAncientAPI = (data) => {
  return HttpRequest.request({
    url: `${api.ancientPre}/getAllAncient`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getAncientByClassificationIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.ancientPre}/getAncientByClassificationId`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const getAncientByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.ancientPre}/getAncientById/${data.id}`,
    method: 'GET',
  })
}

export const getAncientDetailByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.ancientPre}/getAncientDetailById/${data.id}`,
    method: 'GET',
  })
}
