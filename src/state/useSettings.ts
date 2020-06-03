import { useRestRecordActions } from "globalstate-hooks"
import baseApi from "./utils/api"
import additionalHeaders from "./utils/additionalHeaders"
import afterFailure from "./utils/afterFailure"

const useSettings = () => {
  const api = {
    ...baseApi,
    additionalHeaders,
    name: "settings",
    suffix: "planner"
  }
  const [state, { index, update, clear }] = useRestRecordActions<API.PlannerSettings>({
    api,
    afterFailure
  })
  return [state, { index, update, clear }] as const
}

export default useSettings
