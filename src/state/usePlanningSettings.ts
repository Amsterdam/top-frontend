import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createSetData,
  createSetError,
  createClear,
} from "./planningSettingsReducer"
import { get, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

const usePlanningSettings = () : [PlanningSettingsState, PlanningSettingsActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = async () => {
    dispatch(createStartFetching())
    const [responseProjects, resultProjects] = await get(getUrl("constants/projects"))
    const [responseStadia, resultStadia] = await get(getUrl("constants/stadia"))
    if (isForbidden(responseProjects) || isForbidden(responseStadia)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }
    if (notOk(responseProjects) || notOk(responseStadia)) {
      const errorMessage = "Failed to GET"
      dispatch(createSetError(errorMessage))
      return
    }
    dispatch(createSetData({
      projects: resultProjects.constants,
      stadia: resultStadia.constants
    }))
  }

  const clear = () => {
    dispatch(createClear())
  }

  return [state, { initialize, clear }]
}

export default usePlanningSettings
