import "abortcontroller-polyfill/dist/polyfill-patch-fetch"
import { useState, useEffect } from "react"
import { getUrl } from "../config/api"
import { get, isOk } from "../lib/utils/fetch"

const useFetch = (path: string): [any, boolean, OErrorMessage] => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<ErrorMessage>()
  const [data, setData] = useState()

  useEffect(() => {
    (async () => {
      setIsFetching(true)
      setData(undefined)
      setError(undefined)

      try {
        const url = getUrl(path)
        const [response, result] = await get(url)
        if (isOk(response)) {
          setData(result)
        } else {
          setError(`Error: HTTP ${ response.status }`)
        }
      }
      catch (err) {
        console.error(err)
        setError(err.toString())
      }
      finally {
        setIsFetching(false)
      }
    })()
  }, [path])

  return [data, isFetching, error]
}

export default useFetch
