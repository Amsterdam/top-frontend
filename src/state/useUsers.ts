import { useCallback, useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetError,
  createSetResults,
  createClear
} from "./usersReducer"
import { get, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

const useUsers = () => {
  // @TODO: Remove `as never`
  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = useCallback(async () => {
    dispatch(createStartFetching())

    const [response, result] = await get(getUrl("users"))

    // Handle error responses
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return dispatch(createSetError(result))

    // Set results
    const { results } = result
    dispatch(createSetResults(results))
  }, [dispatch])

  const clear = useCallback(() => {
    dispatch(createClear())
  }, [dispatch])

  return [state, { initialize, clear }] as const
}

export default useUsers
