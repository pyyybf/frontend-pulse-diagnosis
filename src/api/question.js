import HttpRequest from '@/axios/api.request'

const api = {
  questionPre: '/api/question',
}

export const getAllQuestionAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/getAllQuestion`,
    method: 'GET',
    params: {
      ...data
    },
  })
}

export const addQuestionAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/addQuestion`,
    method: 'POST',
    data
  })
}

export const updateQuestionByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/updateQuestionById/${id}`,
    method: 'PUT',
    data
  })
}

export const delQuestionByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/delQuestionById/${data}`,
    method: 'DELETE',
  })
}

export const downloadQuestionAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data);
  return HttpRequest.request({
    url: `${api.questionPre}/downloadQuestion`,
    method: 'POST',
    data: params,
    responseType: 'blob',
  })
}

export const uploadQuestionAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/uploadQuestion`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const getPracticeByUserIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/getPracticeByUserId/${localStorage.getItem('userId')}`,
    method: 'GET',
    params: {
      ...data
    }
  })
}

export const delPracticeByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/delPracticeById/${data}`,
    method: 'DELETE',
  })
}

export const getPracticeDetailAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/getPracticeDetail/${data}`,
    method: 'GET',
  })
}

export const getNewPracticeAPI = (data) => {
  return HttpRequest.request({
    url: `${api.questionPre}/getNewPractice`,
    method: 'GET',
    params: {
      knowledgePoint: data,
    }
  })
}

export const addPracticeAPI = (data) => {
  console.log('IN addPracticeAPI, data =', data)
  return HttpRequest.request({
    url: `${api.questionPre}/addPractice`,
    method: 'POST',
    data
  })
}
