import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import SearchResultAddress from "./SearchResultAddress"
import SearchResultCase from "./SearchResultCase"
import SearchResultButtonWrap from "./SearchResultButtonWrap"
import { to } from "../../config/page"
import displayAddress from "../../lib/displayAddress"

type Props = {
  cases: BWVData[]
}

const Wrap = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
  border-top: 1px solid black
  padding-top: 12px
`

const SearchResultPlural: FC<Props> = ({ cases }) => {

  const {
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    distance,
    teams
  } = cases[0]
  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)

  return (
    <div className="SearchResultPlural">
      <SearchResultAddress address={ address } postalCode={ postalCode }/>
      { cases.map(caseItem => {
        const {
          case_id: caseId,
          case_reason: reason,
          stadium
        } = caseItem
        const linkTo = to(`cases/${ caseId }`)
        return (
          <Link key={ JSON.stringify(caseItem) } to={ linkTo }>
            <Wrap key={ caseId }>
              <SearchResultCase reason={ reason } stadium={ stadium } distance={ distance } teams={ teams }/>
              <SearchResultButtonWrap caseId={ caseId } />
            </Wrap>
          </Link>
        )
      })}
    </div>
  )
}
export default SearchResultPlural
