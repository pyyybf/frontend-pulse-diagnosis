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

export const getRoleByPageAPI = (data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/getRoleByPage`,
    method: 'GET',
    params: {
      ...data,
    }
  })
}

export const delUserByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/delUserById/${data}`,
    method: 'DELETE',
  })
}

export const updateUserByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/updateUserById/${id}`,
    method: 'PUT',
    data
  })
}

export const addRoleAPI = (data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/addRole`,
    method: 'POST',
    data
  })
}

export const updateRoleByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.adminPre}/updateRoleById/${id}`,
    method: 'PUT',
    data
  })
}
