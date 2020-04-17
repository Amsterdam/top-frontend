import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import SearchResultWrap from "./SearchResultWrap"
import SearchResultMenu from "./SearchResultMenu"
import SearchResultAddress from "./SearchResultAddress"
import SearchResultDistance from "./SearchResultDistance"
import SearchResultCase from "./SearchResultCase"
import displayAddress from "../../lib/displayAddress"
import {ActionButtonsComponentType, defaultCaseTo, CaseTo} from "./SearchResults"

type Props = {
  caseItem: SearchResultCase
  actionButtonsComponent?:ActionButtonsComponentType
  caseTo?: CaseTo
}

const StyledLink = styled(Link)`
  text-decoration: none
  width: 100%
  display: block
`

const SearchResultSingle: FC<Props> = ({ caseItem, actionButtonsComponent, caseTo }) => {
  const {
    case_id: caseId,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    case_reason: reason,
    stadium,
    distance,
    teams,
    fraud_prediction: {
      fraud_probability: fraudProbability
    } = {}
  } = caseItem


  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const showDistance = distance !== undefined

  const ActionButtonsComponent = actionButtonsComponent

  return (
    <SearchResultWrap>
      <StyledLink to={ caseTo ? caseTo(caseId) : defaultCaseTo(caseId) }>
        <div>
          <SearchResultAddress address={ address } postalCode={ postalCode } />
          <SearchResultCase reason={ reason } stadium={ stadium } teams={ teams } fraudProbability={ fraudProbability } />
        </div>
      </StyledLink>
      <SearchResultMenu>
        { showDistance &&
          <SearchResultDistance distance={ distance! } />
        }
        {
          ActionButtonsComponent &&
          <ActionButtonsComponent caseId={caseId} />
        }
      </SearchResultMenu>
    </SearchResultWrap>
  )
}
export default SearchResultSingle
