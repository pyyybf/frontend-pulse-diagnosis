import axios from "axios"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : ''

const HttpRequest = axios.create({
  baseURL: baseUrl,  // api的base_url
  timeout: 30000  // 请求超时时间
});

export default HttpRequest;
