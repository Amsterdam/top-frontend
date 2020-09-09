import React from "react"
import { RouteComponentProps } from "@reach/router"
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import ErrorMessage from "../atoms/ErrorMessage/ErrorMessage"

const NotFoundPage: React.FC<RouteComponentProps> = () => (
  <DefaultLayout>
    <ErrorMessage text="404 Pagina niet gevonden" />
  </DefaultLayout>
)

export default NotFoundPage
