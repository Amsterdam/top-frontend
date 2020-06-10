import { useRestActions } from "globalstate-hooks"
import baseApi from "./utils/api"
import afterFailure from "./utils/afterFailure"
import useAdditionalHeaders from "./utils/useAdditionalHeaders"

const useProjects = () => {
  const additionalHeaders = useAdditionalHeaders()
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
