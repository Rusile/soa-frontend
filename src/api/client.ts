import axios from 'axios'

const BASE_URL = 'https://itmo.website/api'

export const client = axios.create({
  timeout: 10000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
