import { useLocation } from "@reach/router"
import { queryString, parse } from "./queryString"

export const useQueryString = () => {
  const { pathname, search } = useLocation()
  return queryString(pathname, parse(search))
}
