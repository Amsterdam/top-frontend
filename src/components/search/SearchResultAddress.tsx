import React, { FC } from "react"
import styled from "styled-components"
import FraudProbability from "../global/FraudProbability"
import { color } from "@datapunt/asc-ui"
import FraudProbabilityLabel from "../global/FraudProbabiltyLabel"

type Props = {
  address: string
  postalCode: PostalCode
  fraudProbability?: number
}

const LINE_MARGIN = 10
const H1 = styled.h1`
  font-size: 18px;
  margin: ${ LINE_MARGIN }px 0;
`
const PostalCode = styled.p`
  font-weight: 500;
  margin: ${ LINE_MARGIN }px 0;
`
const MARGIN_LEFT = 36
const StyledFraudProbability = styled(FraudProbability)`
  margin-left: ${ MARGIN_LEFT }px;
  font-weight: 500;
  color: ${ color("tint", "level4") };
`
const StyledFraudLabel = styled(FraudProbabilityLabel)`
  margin-left: ${ MARGIN_LEFT }px;
  font-weight: normal;
  color: ${ color("tint", "level4") };
`

const SearchResultAddress: FC<Props> = ({ address, postalCode, fraudProbability }) => (
  <div>
    <H1>{ address }</H1>
    <PostalCode>
      { postalCode }
      { fraudProbability !== undefined
        ? <StyledFraudProbability fraudProbability={ fraudProbability! } />
        : <StyledFraudLabel>% onbekend</StyledFraudLabel>
      }
    </PostalCode>
  </div>
)
export default SearchResultAddress
