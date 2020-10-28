import React from "react"
import styled from "styled-components"

import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

import Badge from "../../atoms/Badge/Badge"

type Props = {
  stadium: string
  stadiaLabels?: Components.Schemas.StadiumLabel[]
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const BageMark = styled.div`
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

const StadiumBadge: React.FC<Props> = ({ stadium, stadiaLabels }) => {
  const isIssueMelding = stadium?.toLowerCase() === "issuemelding"
  const isMarked = (stadiaLabels || []).map(label => label.stadium).includes(stadium)
  
  const labels = (stadiaLabels || []).reduce((total: string[], current) => {
    if (current.stadium === stadium && !total.includes(stadium)){
      total.push(current.label as string)
    }
    return total
  }, []).join(", ")

  return (
    <Column>
      <Badge variant={ isIssueMelding ? "secondary" : "primary" }>
        { stadium }
      </Badge>
      {
        isMarked &&
        <BageMark>
          { labels }
        </BageMark>
      }
    </Column>
  )
}

export default StadiumBadge
