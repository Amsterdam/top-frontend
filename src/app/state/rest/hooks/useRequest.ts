import { useCallback } from "react"
import axios, { AxiosError, Method } from "axios"

export type RequestError = AxiosError

const useRequest = () => useCallback(async (method: Method, url: string, data?: unknown, headers = {}) => await axios.request({
  method,
  url,
  headers,
  data
}), [])

export default useRequest
