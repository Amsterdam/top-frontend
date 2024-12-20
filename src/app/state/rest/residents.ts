import { useEffect, useState } from "react"
import { useOboToken } from "./tokenOboService"
import { env } from "app/config/env"
import { makeGatewayUrl } from "./hooks/utils/utils"
import useApiRequest from "./hooks/useApiRequest"

export const useResidents = (bagId: string) => {
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const { fetchOboToken } = useOboToken(env.VITE_OIDC_OBO_SCOPE_BRP)
  const { data, execPost, errors } = useApiRequest<any>({
    lazy: true,
    url: makeGatewayUrl(["addresses", bagId, "residents"]),
    groupName: "residents",
    isProtected: true,
    noForbiddenRedirect: true
  })

  useEffect(() => {
    if (data) return
    setIsBusy(true)
    fetchOboToken()
      .then((obo_access_token) => {
        execPost({ obo_access_token }, { useResponseAsCache: true })
      })
      .finally(() => setIsBusy(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bagId])

  return { data, isBusy, errors }
}
