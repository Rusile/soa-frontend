import axios from 'axios'

const BASE_URL = 'https://localhost:2712/products-1.0-SNAPSHOT/api'

export const client = axios.create({
  timeout: 10000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
