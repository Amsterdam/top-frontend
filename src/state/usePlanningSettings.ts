import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createSetData,
  createSetError,
  createStartUpdating,
  createClear,
} from "./planningSettingsReducer"
import { get, post, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

const usePlanningSettings = () : [PlanningSettingsState, PlanningSettingsActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = async () => {
    dispatch(createStartFetching())
    const [responseProjects, resultProjects] = await get(getUrl("constants/projects"))
    const [responseStadia, resultStadia] = await get(getUrl("constants/stadia"))
    const [responseSettings, resultSettings] = await get(getUrl("settings/planner"))

    if (isForbidden(responseProjects) || isForbidden(responseStadia) || isForbidden(responseSettings)) {
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
      stadia: resultStadia.constants,
      settings: resultSettings
    }))
  }

  const clear = () => {
    dispatch(createClear())
  }

  const saveSettings = async (openingDate: string, openingReasons: string[]) => {
    const { data } = state
    if (data === undefined) return
    const { settings: prevSettings } = data
    if (prevSettings === undefined) return
    const settings = { ...prevSettings, opening_date: openingDate, opening_reasons: openingReasons }
    dispatch(createStartUpdating())
    const [response] = await post(getUrl("settings/planner"), settings)
    if (notOk(response)) dispatch(createSetError("Opslaan mislukt"))
    dispatch(createSetData({ ...data, settings }))
  }

  return [state, { initialize, saveSettings, clear }]
}

export default usePlanningSettings
