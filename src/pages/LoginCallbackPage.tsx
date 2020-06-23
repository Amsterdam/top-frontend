import React, { FC, useState, useEffect, useCallback } from "react"
import { RouteComponentProps } from "@reach/router"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../components/global/ErrorMessage"
import LoginAnchor from "../components/auth/LoginAnchor"
import useGlobalActions from "../hooks/useGlobalActions"
import { getAuthOIDCUrl } from "../config/api"
import parseLocationSearch from "../lib/utils/parseLocationSearch"
import { post, notOk } from "../lib/utils/fetch"
import styled from "styled-components"
import capture from "../sentry/capture"

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`

// @TODO: The logic in this Component should be moved to a seperate Component
const LoginCallbackPage: FC<RouteComponentProps> = () => {
  const {
    authenticate
  } = useGlobalActions()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const showSpinner = loading
  const showErrorMessage = errorMessage !== undefined

  const confirmLogin = useCallback(async () => {
    setErrorMessage(undefined)

    const queryParameters = parseLocationSearch(window.location.search)
    const { code } = queryParameters

    const url = getAuthOIDCUrl()
    const [response, result, errorMessage] = await post(url, { code })
    console.log(response)

    if (notOk(response)) {
      const message = response ?
        `Er ging iets mis bij het inloggen. HTTP Status: ${ response.status ?? "Unknown" }` :
        errorMessage
      setErrorMessage(message)
      if (response?.status === undefined) capture(`Failed to fetch: ${ url }`)
    } else {
      const { access, user: { email, first_name: firstName } } = result
      authenticate(access, { firstName, email })
    }

    setLoading(false)
  }, [authenticate])

  useEffect(() => {
    setLoading(true)
    confirmLogin()
  }, [confirmLogin])

  return (
    <Div>
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showErrorMessage &&
        <>
          <ErrorMessage text={ errorMessage! } />
          <LoginAnchor />
        </>
      }
    </Div>
  )
}

export default LoginCallbackPage
