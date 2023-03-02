import { useCallback } from "react"
import axios, { Method } from "axios"

const useRequest = () => useCallback(async (method: Method, url: string, data?: unknown, headers = {}) => await axios.request({
  method,
  url,
  headers,
  data
}), [])

export default useRequest
