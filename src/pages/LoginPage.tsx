import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Login from "../components/auth/Login"

const LoginPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default LoginPage
