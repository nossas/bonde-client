import axios from 'axios'

const API_URL = process.env.API_URL !== undefined
  ? process.env.API_URL
  : 'http://localhost:3000'

export default axios.create({ baseURL: API_URL })
