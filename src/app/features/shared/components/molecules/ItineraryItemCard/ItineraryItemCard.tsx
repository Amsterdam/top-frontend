import React, {useCallback} from "react"
import { navigate } from "@reach/router"
import {themeColor, themeSpacing} from "@datapunt/asc-ui"
import styled from "styled-components"

import to from "app/features/shared/routing/to"

type Props = {
  itineraryId: string
  id: string
  backgroundColor?: "level1" | "level2" | "level3" | "level4" | "level5" | "level6"
  address: string|JSX.Element
  postalCode: string|JSX.Element
  reason?: string|JSX.Element
  fraudProbability?: string|JSX.Element
  badge?: JSX.Element
  buttons?: JSX.Element
}

type WrapProps = Pick<Props, "backgroundColor">
const Wrap = styled.div<WrapProps>`
  background-color: ${ props => themeColor("tint", props.backgroundColor ?? "level1" )};   
  padding: ${themeSpacing(3)} ${themeSpacing(1)};
  display: flex;
  flex:1;
  border-top: 1px solid ${themeColor("tint", "level3")};
  border-bottom: 1px solid ${themeColor("tint", "level3")};
`

const Left = styled.div`
  flex: 1;
`

const Right = styled.div`
`

const Address = styled.h1`   
  font-size: 18px;
  margin: ${themeSpacing(1)} 0;
`

const PostalCode = styled.p`
  display: inline-block;
  font-weight: 500;
  margin: ${themeSpacing(1)} 0;
`

const Reason = styled.p`  
  margin: ${themeSpacing(2)} 0;
`

const FraudProbability = styled.p`
  display: inline-block;
  margin: ${themeSpacing(1)} 0 ${themeSpacing(1)} ${themeSpacing(6)};
  font-weight: 500;
  color: ${ themeColor("tint", "level4") };
`

const ItineraryItemCard:React.FC<Props> = ({ itineraryId, id, address, postalCode, reason, buttons, badge, fraudProbability, backgroundColor }) => {
  const handleClick = useCallback(() => navigate(to(`/lijst/:itineraryId/cases/:id`, { itineraryId, id })), [ id, itineraryId ])
  return (
    <Wrap backgroundColor={backgroundColor}>
      <Left onClick={handleClick}>
        <Address>{ address }</Address>
        <PostalCode>{ postalCode }</PostalCode>
        { fraudProbability && <FraudProbability>{ fraudProbability }</FraudProbability> }
        { reason && <Reason>{ reason }</Reason> }
        { badge }
      </Left>
      <Right>
        { buttons }
      </Right>
    </Wrap>
  )
}

export default ItineraryItemCard
