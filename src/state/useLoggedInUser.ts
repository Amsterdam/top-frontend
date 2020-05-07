import useGlobalState from "../hooks/useGlobalState"
import { findByProperty } from "../lib/utils/findByProperty"

export const useLoggedInUser = () => {
  const {
    auth: {
      user: authUser
    },
    users: {
      results: users
    }
  } = useGlobalState()

  return findByProperty(users, "email", authUser?.email)
}
