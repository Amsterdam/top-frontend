import React, { useEffect } from "react"
import qs from "qs"
import axios from "axios"
import { useLocation, navigate, RouteComponentProps } from "@reach/router"
import slashSandwich from "slash-sandwich"

import to from "app/features/shared/routing/to"
import { setUser } from "app/state/auth/tokenStore"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"

const OIDCAuthUrl = slashSandwich([
  process.env.REACT_APP_GATEWAY,
  "oidc-authenticate"
])

const CallbackPage: React.FC<RouteComponentProps> = () => {
  const { search } = useLocation()
  const { code } = qs.parse(search, { ignoreQueryPrefix: true })

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .post(OIDCAuthUrl, { code }, { cancelToken: cancelToken.token })
      .then(response => {
        setUser(
          response.data.user.id,
          response.data.access
        )
        return navigate(to("/"))
      })
      .catch(error => console.log("Something went wrong", error))

    // Cancel request onUnmount
    return () => cancelToken.cancel()
  }, [ code ])

  return <CenteredSpinner size={60} />
}

export default CallbackPage
