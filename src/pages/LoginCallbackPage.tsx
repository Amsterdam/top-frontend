import React, { FC, useState, useEffect } from "react"
import useGlobalState from "../hooks/useGlobalState"
import { Spinner } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"
import ErrorMessage from "../components/global/ErrorMessage"
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
    const [response, result] = await post(url, { code })

    if (notOk(response)) {
      const httpStatus = response ? response.status : "Unknown"
      const message = `Er ging iets mis bij het inloggen. HTTP Status: ${ httpStatus }`
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
        <ErrorMessage text={ errorMessage! } />
      }
    </Div>
  )
}

export default LoginCallbackPage
