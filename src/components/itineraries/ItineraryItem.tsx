import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/page"
import styled from "styled-components"
import { color } from "@datapunt/asc-ui"
import StadiumBadge from "../global/StadiumBadge"
import Notes from "./notes/Notes"
import FraudProbability from "../global/FraudProbability"
import displayAddress from "../../lib/displayAddress"
import FraudProbabilityLabel from "../global/FraudProbabiltyLabel"


type Props = {
  caseItem: BWVData
  fraudPrediction?: FraudPrediction
  notes: Notes
  showAddress?: boolean
}

const SPACING = 12
const Article = styled.article`
  width: 100%;
`
const StyledLink = styled(Link)`
  display: block;
  margin: 0;
  padding: 10px 0;
  text-decoration: none;
  color: ${ color("tint", "level7") };
`
const Div = styled.div`
  margin-right: ${ SPACING }px;
`
const H1 = styled.h1`
  font-size: 18px;
  margin: 6px 0;
`
const P = styled.p`
  margin: 6px 0;
`
const PostalCode = styled(P)`
  font-weight: bold;
`
const StyledFraudProbability = styled(FraudProbability)`
  margin-left: ${ SPACING }px;
  font-weight: bold;
  color: ${ color("tint", "level4") };
`

const StyledFraudLabel = styled(FraudProbabilityLabel)`
  margin-left: ${ SPACING }px;
  font-weight: normal;
  color: ${ color("tint", "level4") };
`

const ItineraryItem: FC<Props> = ({ caseItem, fraudPrediction, notes, showAddress = true }) => {
  const {
    case_id: id,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    stadium,
    case_reason: caseReason
  } = caseItem

  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const linkTo = to(`cases/${ id }`)

  const fraudProbability = fraudPrediction?.fraud_probability
  const showFraudProbability = fraudProbability !== undefined

  return (
    <Article>
      <StyledLink to={ linkTo }>
        <Div>
          { showAddress &&
            <>
              <H1>{ address }</H1>
              <PostalCode>
                { postalCode }
                { showFraudProbability
                  ? <StyledFraudProbability fraudProbability={ fraudProbability! } />
                  : <StyledFraudLabel>% onbekend</StyledFraudLabel>
                }
              </PostalCode>
            </>
          }
          <div>
            <P>{ caseReason }</P>
            <StadiumBadge text={ stadium } />
            <Notes notes={ notes } />
          </div>
        </Div>
      </StyledLink>
    </Article>
  )
}
export default ItineraryItem
