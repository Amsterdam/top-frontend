import { useCallback } from "react"
import { useAuth } from "react-oidc-context"
import useRequest from "./useRequest"

type Method = "get" | "post" | "put" | "patch" | "delete"

const useProtectedRequest = () => {
  const auth = useAuth()
  const request = useRequest()

  return useCallback(async (method: Method, url: string, data?: unknown, additionalHeaders = {}) => {
    const token = auth.user?.access_token
    const headers = {
      Authorization: `Bearer ${ token }`,
      ...additionalHeaders
    }
    const response = await request(
      method,
      url,
      data,
      headers
    )
    return response
  }, [auth.user?.access_token, request])
}

export default useProtectedRequest
