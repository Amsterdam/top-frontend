import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import SearchResultAddress from "./SearchResultAddress"
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
    distance
  } = caseItem
  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const linkTo = to(`cases/${ caseId }`)

  return (
    <div className="SearchResultSingle">
      <Link to={ linkTo }>
        <SearchResultAddress address={ address } postalCode={ postalCode } />
        <Wrap key={ caseId }>
          <SearchResultCase reason={ reason } stadium={ stadium } distance={ distance } />
          <SearchResultButtonWrap caseId={ caseId } />
        </Wrap>
      </Link>
    </div>
  )
}
export default SearchResultSingle
