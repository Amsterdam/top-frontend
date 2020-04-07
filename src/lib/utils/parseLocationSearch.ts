const parseLocationSearch = (search: string) : Record<string, string>=> {
  if (search === "") {
    return {}
  }

  const str = search.replace(/^\?/, "")
  const keyValues = str.split("&")
  const entries = keyValues.map(str => str.split("="))
  return Object.fromEntries(entries)
}
export default parseLocationSearch
