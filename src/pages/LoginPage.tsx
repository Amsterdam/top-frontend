import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Login from "../components/auth/Login"

const LoginPage: FC<RouteComponentProps> = () => (
    <>
      <Login />
    </>
  )

export default LoginPage
