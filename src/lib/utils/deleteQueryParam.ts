import parseLocationSearch from "./parseLocationSearch"
import queryParams from "./queryParams"

export const deleteQueryParam = (search:string, param:string) => {
  const parsed = parseLocationSearch(search)
  delete parsed[param]
  return queryParams(parsed)
}
