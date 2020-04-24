import { useReducer, useCallback } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createSetData,
  createSetError,
  createStartUpdating,
  createClear
} from "./planningSettingsReducer"
import { get, post, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"

const usePlanningSettings = (): [PlanningSettingsState, PlanningSettingsActions] => {
  // @TODO: Remove `as never`
  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = useCallback(async () => {
    dispatch(createStartFetching())

    // @TODO: This should be fetched in parallel using Promise.all
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
  }, [dispatch])

  const clear = useCallback(() => {
    dispatch(createClear())
  }, [dispatch])

  const saveSettings = useCallback(async (openingDate: string, projects: Projects, days: SettingsListMap) => {
    const { data } = state
    if (data === undefined) return
    const { settings: prevSettings } = data
    if (prevSettings === undefined) return
    const settings = { ...prevSettings, opening_date: openingDate, projects, days }
    dispatch(createStartUpdating())
    const [response, result, errorMessage] = await post(getUrl("settings/planner"), settings)
    if (notOk(response)) return dispatch(createSetError(errorMessage || "Opslaan mislukt"))
    dispatch(createSetData({ ...data, settings: result }))
  }, [state, dispatch])

  const actionCreators = { initialize, saveSettings, clear }

  return [state, actionCreators]
}

export default usePlanningSettings
