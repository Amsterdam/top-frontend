import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken"
import { useUsers } from "../index"
import { useMemo } from "react"


export const useLoggedInUser = () => {
  const decodedToken = useDecodedToken()

  const { data } = useUsers()
  return useMemo(() => data?.results.find(_ => (
    _.username.toLowerCase() === decodedToken?.unique_name.toLowerCase()
  )), [data?.results, decodedToken?.unique_name])
}
