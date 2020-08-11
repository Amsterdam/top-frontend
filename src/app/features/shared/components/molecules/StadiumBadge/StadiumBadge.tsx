import React from "react"

import Badge from "../../atoms/Badge/Badge"

type Props = {
  stadium: string
}

const StadiumBadge: React.FC<Props> = ({ stadium }) => (
  <Badge variant={stadium?.toLowerCase() === "issuemelding" ? "secondary" : "primary"}>
    { stadium }
  </Badge>
)

export default StadiumBadge
