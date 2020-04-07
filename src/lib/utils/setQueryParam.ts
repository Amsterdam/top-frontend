import parseLocationSearch from "./parseLocationSearch"
import queryParams from "./queryParams"

export const setQueryParam = (search:string, param:string, value:string) => queryParams({
    ...parseLocationSearch(search),
    [param]: value
  })
