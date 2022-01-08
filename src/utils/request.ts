import axios from "axios"

axios.defaults.baseURL = 'api/data_monitor/'

async function request(method: any, url: string, param: any) {
  let result = await axios({
    method: method,
    url: url,
    data: param
  })
  return result
}

export default request