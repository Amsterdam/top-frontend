import { useRestActions } from "globalstate-hooks"
import baseApi from "./utils/api"
import useAdditionalHeaders from "./utils/useAdditionalHeaders"
import afterFailure from "./utils/afterFailure"

const useStadia = () => {
  const additionalHeaders = useAdditionalHeaders()
  const api = {
    ...baseApi,
    additionalHeaders,
    path: `${ baseApi.path }constants`,
    name: "stadia"
  }
  const [state, { index, clear }] = useRestActions<Stadium>({
    api,
    mapResponse: (result: unknown) => (result as { constants: Stadia }).constants,
    afterFailure
  })
  return [state, { index, clear }] as const
}

export default useStadia
