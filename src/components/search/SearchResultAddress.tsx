import React, { FC } from "react"
import styled from "styled-components"
import FraudProbability from "../global/FraudProbability"
import {color} from "@datapunt/asc-ui"
import FraudProbabilityLabel from "../global/FraudProbabiltyLabel"

type Props = {
  address: string
  postalCode: PostalCode
  fraudProbability?: number
}

const H1 = styled.h1`
  font-size: 18px;
  margin: 6px 0;
`
const PostalCode = styled.p`
  font-weight: bold;
  margin: 6px 0;
`

const StyledFraudProbability = styled(FraudProbability)`
  margin-left: 12px;
  font-weight: bold;
  color: ${ color("tint", "level4") };
`
const StyledFraudLabel = styled(FraudProbabilityLabel)`
  margin-left: 12px;
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
