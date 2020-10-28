import React from "react"
import styled from "styled-components"

import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

import Badge from "../../atoms/Badge/Badge"

type Props = {
  stadium: string
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Sanction = styled.div`
  display: inline-flex;
  align-items: baseline;
  color: ${ themeColor("secondary") };
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;

  &:before {
    content: "";
    width: 10px;
    height: 10px;
    margin: 0 ${ themeSpacing(2) };
    background-color: ${ themeColor("secondary") };
    border-radius: 50%;
  }
`

const StadiumBadge: React.FC<Props> = ({ stadium }) => {
  const isIssueMelding = stadium?.toLowerCase() === "issuemelding"
  const isSanction = [ "gele kaart", "onderzoek buitendienst", "opleggen boete", "voornemen boete" ].includes(stadium?.toLowerCase())

  return (
    <Column>
      <Badge variant={ isIssueMelding ? "secondary" : "primary" }>
        { stadium }
      </Badge>
      {
        isSanction &&
        <Sanction>
          Sanctie
        </Sanction>
      }
    </Column>
  )
}

export default StadiumBadge
