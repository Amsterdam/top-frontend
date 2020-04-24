import parseLocationSearch from "./parseLocationSearch"
import queryParams from "./queryParams"

export const deleteQueryParam = (search: string, params: string[]) => {
  const parsed = parseLocationSearch(search)
  for (const param of params) {
    delete parsed[param]
  }
  return queryParams(parsed)
}
