import React from "react"
import {Link} from "@reach/router";

import {useOpenIssues} from "app/state/rest"

import to from "app/features/shared/routing/to"

import ResponsiveText from "../ResponsiveText/ResponsiveText";

type Props = {
  itineraryId: string
}

const OpenIssuesNavigationButton:React.FC<Props> = ({ itineraryId }) => {
  const { data } = useOpenIssues()

  const numOpenIssues = data?.cases?.length
    ? `(${data.cases.length})`
    : ""

  return <Link to={to("/lijst/:itineraryId/issuemeldingen/", { itineraryId })}>
    <ResponsiveText text={[`Issues ${ numOpenIssues }`, `Open issuemeldingen ${ numOpenIssues }`]}/>
  </Link>
}

export default OpenIssuesNavigationButton
