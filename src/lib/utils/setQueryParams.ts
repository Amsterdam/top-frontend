import parseLocationSearch from "./parseLocationSearch"
import queryParams from "./queryParams"

type StringMap = {[key:string]:string}
export const setQueryParams = (search:string, keyValues:StringMap) => queryParams({
    ...parseLocationSearch(search),
    ...keyValues
})
