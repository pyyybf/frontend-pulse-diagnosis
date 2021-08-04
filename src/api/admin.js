import HttpRequest from '@/axios/api.request'

const api = {
  adminPre: '/api/admin',
}

export const getAllUserInfoAPI = (data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/getAllUserInfo`,
    method: 'GET',
    params: {
      ...data
    },
  })
}

export const getAllRoleAPI = () => {
  return HttpRequest.request({
    url: `${api.adminPre}/getAllRole`,
    method: 'GET',
  })
}

export const delUserByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/delUserById/${data}`,
    method: 'DELETE',
  })
}
