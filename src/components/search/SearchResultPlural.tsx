import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import SearchResultWrap from "./SearchResultWrap"
import SearchResultAddress from "./SearchResultAddress"
import SearchResultDistance from "./SearchResultDistance"
import SearchResultCase from "./SearchResultCase"

import { to } from "../../config/page"
import displayAddress from "../../lib/displayAddress"

import {ActionButtonsComponentType} from "./SearchResults"

type Props = {
  cases: SearchResultCases
  actionButtonsComponent?:ActionButtonsComponentType
}

const Wrap = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
  border-top: 1px solid black
  padding-top: 12px
`
const Div = styled.div`
  display: flex
  flex-direction: column
  justify-content: flex-end
`

const SearchResultPlural: FC<Props> = ({ actionButtonsComponent, cases }) => {
  const {
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    distance,
    fraud_prediction: {
      fraud_probability: fraudProbability
    } = {}
  } = cases[0]

  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const showDistance = distance !== undefined

  const ActionButtonsComponent = actionButtonsComponent

  return (
    <div>
      <SearchResultWrap>
        <SearchResultAddress address={ address } postalCode={ postalCode } />
        { showDistance &&
          <SearchResultDistance distance={ distance! } />
        }
      </SearchResultWrap>
      { cases.map(caseItem => {
          const {
            case_id: caseId,
            case_reason: reason,
            stadium,
            teams
          } = caseItem
          const key = caseId
          const linkTo = to(`cases/${ caseId }`)
          return (
            <Link key={ key } to={ linkTo }>
              <Wrap>
                <SearchResultCase reason={ reason } stadium={ stadium } teams={ teams } fraudProbability={ fraudProbability } />
                { ActionButtonsComponent && (
                  <Div>
                    <ActionButtonsComponent caseId={caseId} />
                  </Div>
                ) }
              </Wrap>
            </Link>
          )
        })
      }
    </div>
  )
}
export default SearchResultPlural
