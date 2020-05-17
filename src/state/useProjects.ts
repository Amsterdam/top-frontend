import { useRestActions } from "globalstate-hooks"
import baseApi from "./utils/api"
import additionalHeaders from "./utils/additionalHeaders"
import afterFailure from "./utils/afterFailure"

const useProjects = () => {
  const api = {
    ...baseApi,
    additionalHeaders,
    path: `${ baseApi.path }constants`,
    name: "projects"
  }
  const [state, { index, clear }] = useRestActions<Project>({
    api,
    mapResponse: (result: unknown) => (result as { constants: Projects }).constants,
    afterFailure
  })
  return [state, { index, clear }] as const
}

export default useProjects
