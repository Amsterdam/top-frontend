import React, { FC } from "react"
import Case from "../components/cases/Case"
import Navigation from "../components/global/navigation/Navigation"
import { RouteComponentProps } from "@reach/router"

type Props = RouteComponentProps & {
  teamId?: string
  caseId?: string
}

const CasePage: FC<Props> = ({ teamId, caseId }) => (
    <>
      <Navigation />
      <Case caseId={ caseId! } />
    </>
  )

export default CasePage
