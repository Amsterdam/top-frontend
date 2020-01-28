import React, { FC, useState, useEffect } from "react"
import useGlobalState from "../hooks/useGlobalState"
import { Spinner } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"
import ErrorMessage from "../components/global/ErrorMessage"
import { getAuthOIDCUrl } from "../config/domain"
import parseLocationSearch from '../lib/utils/parseLocationSearch'
import { post, notOk } from "../lib/utils/fetch"
import styled from "styled-components"

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginCallbackPage: FC<RouteComponentProps> = () => {

  const {
    authenticateToken
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
    const [response, result] = await post(url, { code })

    if (notOk(response)) {
      const httpStatus = response ? response.status : "Unknown"
      const message = `Er ging iets mis bij het inloggen. HTTP Status: ${ httpStatus }`
      setErrorMessage(message)
    } else {
      const { access } = result
      authenticateToken(access)
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    confirmLogin()
  }, [])

  console.log("showSpinner", showSpinner, loading)

  return (
    <Div>
      { showSpinner &&
        <Spinner/>
      }
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </Div>
  )
}

export default LoginCallbackPage
