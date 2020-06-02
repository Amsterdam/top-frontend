import { useRestActions } from "globalstate-hooks"
import baseApi from "./utils/api"
import additionalHeaders from "./utils/additionalHeaders"
import afterFailure from "./utils/afterFailure"

const useStadia = () => {
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
