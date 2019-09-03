import axios from 'axios'

const instance = axios.create({
    // baseURL:"https://jsonplaceholder.typicode.com"
    baseURL:"http://localhost:3000"
})

// instance.defaults.headers.common['Authorization'] = 'Token'

export default instance