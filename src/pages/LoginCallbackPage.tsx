import React, { FC, useState, useEffect } from "react"
import { RouteComponentProps } from "@reach/router"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../components/global/ErrorMessage"
import LoginAnchor from "../components/auth/LoginAnchor"
import useGlobalState from "../hooks/useGlobalState"
import { getAuthOIDCUrl } from "../config/api"
import parseLocationSearch from '../lib/utils/parseLocationSearch'
import { post, notOk } from "../lib/utils/fetch"
import styled from "styled-components"

const Div = styled.div`
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 100px
`

const LoginCallbackPage: FC<RouteComponentProps> = () => {

  const {
    authenticate
  } = useGlobalState()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const showSpinner = loading
  const showErrorMessage = errorMessage !== undefined

  const confirmLogin = async () => {

    setErrorMessage(undefined)

    const queryParameters = parseLocationSearch(window.location.search)
    const { code } = queryParameters

    const url = getAuthOIDCUrl()
    const [response, result, errorMessage] = await post(url, { code })
    console.log(response)

    if (notOk(response)) {
      const message = response ?
        `Er ging iets mis bij het inloggen. HTTP Status: ${ response.status || "Unknown" }` :
        errorMessage
      setErrorMessage(message)
    } else {
      const { access, user: { email, first_name: firstName } } = result
      authenticate(access, { firstName, email })
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    confirmLogin()
  }, [])

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
