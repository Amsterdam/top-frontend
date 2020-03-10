import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import styled from "styled-components"
import Logout from "./Logout"
import LoginAnchor from "./LoginAnchor"
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

  const showErrorMessage = errorMessage !== undefined

  const decodedToken = token !== undefined ? authToken.decode(token) : undefined
  const hasSession = decodedToken !== undefined
  const showSession = hasSession
  const { email = undefined, firstName = undefined } = user || {}
  const showCredentials = email !== undefined && firstName !== undefined
  const exp = decodedToken !== undefined ? decodedToken.exp : 0
  const date = new Date(exp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const time = `${ hours < 10 ? `0${ hours }` : hours }:${ minutes < 10 ? `0${ minutes }` : minutes }`
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
          <LoginAnchor />
        </div>
      }
    </Div>
  )
}

export default Login
