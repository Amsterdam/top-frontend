import {useReducer, useRef} from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createSetError,
  createClear,
  createRemoveItinerary,
  createAddItinerary
} from "./planningReducer"
import { post, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import navigateTo from "../lib/navigateTo"

const usePlanning = () : [PlanningState, PlanningActions] => {

  const localStorageKey = "planningResult"

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = () => {
    try {
      const item = window.localStorage.getItem(localStorageKey)
      if (item == null) return
      const result = JSON.parse(item)
      dispatch(createSetResults(result))
    } catch {}
  }

  const generate = (params: any) => {

    (async () => {

      dispatch(createStartFetching())

      const url = getUrl("generate-weekly-itineraries")
      const [response, result] = await post(url, params)

      // Handle error responses
      if (notOk(response)) {
        const body = await response.text()
        const status = response.statusText
        const errorMessage = `${ status }: ${ body }`
        dispatch(createSetError(errorMessage))
        return isForbidden(response) ? handleForbiddenResponse() : false
      }

      // Set results
      dispatch(createSetResults(result))
      window.localStorage.setItem(localStorageKey, JSON.stringify(result))
      navigateTo("planning/result")
    })()
  }

  const clear = () => {
    window.localStorage.removeItem(localStorageKey)
    dispatch(createClear())
  }

  const getIndicesForCase = (caseId: CaseId) : number[] | undefined => {
    const { results } = state
    if (results === undefined) return undefined
    const indices = results.lists
      .map((list, index0) =>
        list.itineraries.map(
          (itineraries, index1) => {
            const index2 = itineraries.findIndex(itinerary => itinerary.case_id === caseId)
            return [index0, index1, index2]
          }
        )
      )
      .flat()
      .filter(indices => indices[2] !== -1)
      .flat()
    return indices.length > 0 ? indices : undefined
  }

  const removeItinerary = (caseId: CaseId) => {
    const indices = getIndicesForCase(caseId)
    if (indices === undefined) return
    dispatch(createRemoveItinerary(indices as [number, number, number]))
  }

  const addItinerary = (siblingCaseId: CaseId, caseId: CaseId) => {
    const { results } = state
    if (results === undefined) return
    const indices = getIndicesForCase(siblingCaseId)
    if (indices === undefined) return
    const { unplanned_cases: unplannedCases } = results
    const itinerary = unplannedCases.find(itinerary => itinerary.case_id === caseId)
    if (itinerary === undefined) return
    dispatch(createAddItinerary(itinerary, indices as [number, number, number]))
  }

  // We wrap the action-creators in a 'ref' to ensure it never re-triggers a hook:
  // The action-creators themselves should never change.
  const actionCreators = { initialize, generate, clear, removeItinerary, addItinerary }
  const actionCreatorsRef = useRef(actionCreators)

  return [state, actionCreatorsRef.current]
}

export default usePlanning
