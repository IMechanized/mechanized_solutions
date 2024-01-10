import axios from 'axios'
import { localGet } from './localStorage'

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
})

export const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localGet('UserData')?.accessToken}`,
    Accept: 'application/json',
  },
})
