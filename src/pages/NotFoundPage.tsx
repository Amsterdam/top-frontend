import React from "react"
import { RouteComponentProps } from "@reach/router"
import ErrorMessage from "../components/global/ErrorMessage"
import styled from "styled-components"

type Props = RouteComponentProps

const Div = styled.div`
  margin-top: 200px;
  text-align: center;
`

const NotFoundPage: React.FC<Props> = () => (
  <Div>
    <ErrorMessage text="404 Pagina niet gevonden" />
  </Div>
)

export default NotFoundPage
