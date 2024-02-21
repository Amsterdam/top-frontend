import React from "react"
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import ErrorMessage from "../atoms/ErrorMessage/ErrorMessage"

const NotFoundPage: React.FC = () => (
  <DefaultLayout>
    <ErrorMessage text="404 Pagina niet gevonden" />
  </DefaultLayout>
)

export default NotFoundPage
