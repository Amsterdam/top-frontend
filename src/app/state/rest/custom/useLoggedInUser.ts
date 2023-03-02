import { useUsers } from "../index"
import { useMemo } from "react"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"

export const useLoggedInUser = () => {
  const token = useKeycloak()
  const { data } = useUsers()
  return useMemo(() => data?.results.find(_ => (
    _.username.toLowerCase() === token?.tokenParsed?.email.toLowerCase()
  )), [ data, token ])
}
