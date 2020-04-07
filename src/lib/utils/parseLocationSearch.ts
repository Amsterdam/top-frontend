const parseLocationSearch = (search: string) : Record<string, string>=> {
  const trimmedSearch = search.trim()

  if (trimmedSearch === "") return {}

  const str = trimmedSearch.replace(/^\?/, "")
  const keyValues = str.split("&")
  const entries = keyValues.map(str => str.split("="))
  return Object.fromEntries(entries)
}
export default parseLocationSearch
