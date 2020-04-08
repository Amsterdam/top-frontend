import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/page"
import styled from "styled-components"
import Signal from "../global/Signal"
import Notes from "./notes/Notes"
import FraudProbability from "../global/FraudProbability"
import displayAddress from "../../lib/displayAddress"


type Props = {
  caseItem: BWVData
  fraudPrediction?: FraudPrediction
  notes: Notes
  showAddress?: boolean
}

const Article = styled.article`
  width: 100%
  a {
    display: block
    margin-bottom: 0
    padding: 10px 0
  }
`
const Div = styled.div`
  margin-right: 12px
`
const H1 = styled.h1`
  font-size: 16px
  line-height: 28px
  color: black
  margin-bottom: 2px
`
const P = styled.p`
  color: black
  font-weight: normal
  margin-bottom: 2px
`
const PostalCode = styled(P)`
  font-weight: bold
`
const StyledFraudProbability = styled(FraudProbability)`
  margin-left: 12px
  font-weight: bold
  color: #B4B4B4
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
      <Link to={ linkTo }>
        <Div>
          { showAddress &&
            <>
              <H1>{ address }</H1>
              <PostalCode>{ postalCode }</PostalCode>
            </>
          }
          <div>
            <P>{ caseReason }{ showFraudProbability && <StyledFraudProbability fraudProbability={ fraudProbability! } /> }</P>
            <Signal text={ stadium } />
            <Notes notes={ notes } />
          </div>
        </Div>
      </Link>
    </Article>
  )
}
export default ItineraryItem
