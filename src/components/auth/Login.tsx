import React, { FC, useMemo } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import Logout from "../auth/Logout"
import { Button } from "@datapunt/asc-ui"
import { Login as LoginIcon } from "@datapunt/asc-assets"
import { getOIDCProviderUrl } from "../../config/api"
import ErrorMessage from "../global/ErrorMessage"
import authToken from "../../lib/authToken"

const Div = styled.div`
  margin-top: 200px
  text-align: center
`

const Login: FC = () => {

  const {
    auth: {
      isInitialized,
      errorMessage,
      token,
      user
    }
  } = useGlobalState()

  const gripUri = useMemo(getOIDCProviderUrl, [])

  const showErrorMessage = errorMessage !== undefined

  const decodedToken = token !== undefined ? authToken.decode(token) : undefined
  const hasSession = decodedToken !== undefined
  const showSession = hasSession
  const hasUser = user !== undefined
  const { email = undefined, firstName = undefined } = user || {}
  const showCredentials = email !== undefined && firstName !== undefined
  const exp = decodedToken !== undefined ? decodedToken.exp : 0
  const date = new Date(exp)
  const time = `${ date.getHours() }:${ date.getMinutes() }`
  const showButton = isInitialized && !hasSession
  const showLogout = isInitialized && hasSession

  return (
    <Div className="Login">
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
      { showSession &&
        <p>
          { showCredentials &&
            <>Ingelogd als: <strong>{ firstName }</strong> ({ email })<br /></>
          }
          Je sessie verloopt: <strong>{ time }</strong> uur
        </p>
      }
      { showLogout &&
        <Logout />
      }
      { showButton &&
        <div>
          <a href={ gripUri }>Log in met je ADW account</a>
        </div>
      }
    </Div>
  )
}

export default Login
