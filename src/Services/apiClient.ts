import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:4000/smsys',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, application/x-www-form-urlencoded',

  },
})


api.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
},
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use((response) => {
  return response
},
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - session expired");

      // Redirect to login
      window.location.href = "/Register";
    }

    return Promise.reject(error);
  }

)

export default api
