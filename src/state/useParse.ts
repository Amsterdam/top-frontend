import {useReducer, useRef} from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createClear
} from "./parseReducer"
import { get, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import parseAddressLine from "../lib/parseAddressLine"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

type ParseResult = {
  success: boolean
  raw: string
  params?: SearchQueryParams
}
type ParseResults = ParseResult[]
type SearchQueryParams = [PostalCode, StreetNumber, StreetSuffix | undefined]
type OptionalSearchQueryParams = SearchQueryParams | undefined

type FetchResult = { cases: BWVData[] }
type FetchResults = FetchResult[]

const toSearchResult = (data?: { cases: BWVData[] }, error?: string) : SearchResult => {
  const success = data !== undefined
  return { success, data, error }
}

const parseText = (text: string) : ParseResults => {
  return text
    .split(/\r?\n/) // split into lines
    .map(line => line.trim()) // trim lines
    .filter(line => line !== "") // remove empty lines
    .map(line => { // parse lines
      const params = parseAddressLine(line)
      const success = params !== undefined
      const raw = line
      return { success, raw, params }
    })
}

const fetchOne = async (item: SearchQueryParams) : Promise<any> => {
  const params = { postalCode: item[0].toUpperCase(), streetNumber: item[1], suffix: item[2] || "" }
  const url = getUrl("search", params)
  const [response, result] = await get(url) as [Response, any]
  if (isForbidden(response)) return handleForbiddenResponse()
  return result
}

const awaitSearchResult = async (result: ParseResult) : Promise<SearchResult> => {
  if (result.success === false) return toSearchResult(undefined, result.raw)
  try {
    const params = result.params!
    const json = await fetchOne(params)
    return json.cases.length > 0 ?
      toSearchResult(json) :
      toSearchResult(undefined, `postcode: ${ params[0] }, huisnummer: ${ params[1] }, toevoeging: ${ params[2] || "" }`)
  } catch (err) {
    console.error(err)
  }
  return toSearchResult(undefined, "Fetch error")
}

const fetchResults = async (results: ParseResults) : Promise<SearchResults> => {

  const promises = results.map(result => awaitSearchResult(result))

  try {
    return await Promise.all(promises)
  } catch (err) {
    console.error(err)
  }
  return []
}

const useParse = () : [ParseState, ParseActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const parse = async (text: string) => {

    dispatch(createStartFetching(text))

    const parseResults = parseText(text)
    const results = await fetchResults(parseResults)
    dispatch(createSetResults(results))
  }

  const clear = () => {
    dispatch(createClear())
  }

  const actionCreators = { parse, clear }
  const actionCreatorsRef = useRef(actionCreators)

  return [state, actionCreatorsRef.current]
}

export default useParse
