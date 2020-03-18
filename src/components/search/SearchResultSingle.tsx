import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import SearchResultHeader from "./SearchResultHeader"
import SearchResultAddress from "./SearchResultAddress"
import SearchResultDistance from "./SearchResultDistance"
import SearchResultCase from "./SearchResultCase"
import SearchResultButtonWrap from "./SearchResultButtonWrap"
import { to } from "../../config/page"
import displayAddress from "../../lib/displayAddress"

type Props = {
  caseItem: BWVData
}

const Wrap = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
`

const SearchResultSingle: FC<Props> = ({ caseItem }) => {

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
    teams
  } = caseItem

  const linkTo = to(`cases/${ caseId }`)
  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const showDistance = distance !== undefined

  return (
    <div className="SearchResultSingle">
      <Link to={ linkTo }>
        <SearchResultHeader>
          <SearchResultAddress address={ address } postalCode={ postalCode } />
          { showDistance &&
            <SearchResultDistance distance={ distance! } />
          }
        </SearchResultHeader>
        <Wrap key={ caseId }>
          <SearchResultCase reason={ reason } stadium={ stadium } teams={ teams } />
          <SearchResultButtonWrap caseId={ caseId } />
        </Wrap>
      </Link>
    </div>
  )
}
export default SearchResultSingle
