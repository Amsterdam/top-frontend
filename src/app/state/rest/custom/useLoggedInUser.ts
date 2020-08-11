import { useUsers } from "../index"
import { getUserId } from "../../auth/tokenStore"
import { useMemo } from "react"

export const useLoggedInUser = () => {
  const { data } = useUsers()
  const userId = getUserId()
  return useMemo(() => data?.results.find(_ => _.id === userId), [ data, userId ])
}
