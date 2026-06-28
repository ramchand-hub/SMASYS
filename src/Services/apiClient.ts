import axios from 'axios'

const api = axios.create({
  baseURL:  'http://localhost:4000/smsys',
  headers: {
    'Content-Type': 'application/json',
          'Accept': 'application/json, application/x-www-form-urlencoded',

  },
})

export default api
