const esc = encodeURIComponent
const queryParams = (params: QueryParams): string => {
  const entries = Object.entries(params)
  const isEmpty = entries.length === 0
  return isEmpty ? "" : `?${ entries.map(([k, v]) => `${ esc(k) }=${ esc(v) }`).join("&") }`
}
export default queryParams
