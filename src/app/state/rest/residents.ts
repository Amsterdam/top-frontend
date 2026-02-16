import { makeGatewayUrl, useErrorHandler } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"
import { Options } from "."

type Brp = {
  type: string
  personen: {
    [name: string]: any
  }[]
}

export const useResidents = (bagId: string, options?: Options) => {
  const handleError = useErrorHandler()
  return useApiRequest<Brp>({
    ...options,
    url: makeGatewayUrl(["addresses", bagId, "residents"]),
    groupName: "residents",
    handleError,
    isProtected: true,
    noForbiddenRedirect: true
  })
}
