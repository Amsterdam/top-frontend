import React, { useCallback, useState } from "react"
import { navigate } from "@reach/router"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  href?: string
  backgroundColor?: "level1" | "level2" | "level3" | "level4" | "level5" | "level6"
  address: string|JSX.Element
  postalCode: string|JSX.Element
  reason?: string|JSX.Element
  fraudProbability?: string|JSX.Element
  badge?: JSX.Element
  buttons?: (onDeleteButtonClick: () => void) => JSX.Element
  notes?: JSX.Element
  isVisited?: boolean
  teamSettings?: Components.Schemas.TeamSettingsModel
}

type WrapProps = Pick<Props, "backgroundColor">
const Wrap = styled.div<WrapProps>`
  background-color: ${ props => themeColor("tint", props.backgroundColor ?? "level1" ) };
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  display: flex;
  flex:1;
  border-top: 1px solid ${ themeColor("tint", "level3") };
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
`

type LeftProps = { opacity?: number }
const Left = styled.div<LeftProps>`
  cursor: pointer;
  flex: 1;
  opacity: ${ props => props.opacity ?? 1 };
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Address = styled.h1`
  font-size: 18px;
  margin: ${ themeSpacing(1) } 0;
`

const PostalCode = styled.p`
  display: inline-block;
  font-weight: 500;
  margin: ${ themeSpacing(1) } 0;
`

const Reason = styled.p`
  margin: ${ themeSpacing(2) } 0;
`

const FraudProbability = styled.p`
  display: inline-block;
  margin: ${ themeSpacing(1) } 0 ${ themeSpacing(1) } ${ themeSpacing(6) };
  font-weight: 500;
  color: ${ themeColor("tint", "level4") };
`

const ItineraryItemCard: React.FC<Props> = ({ href, address, postalCode, isVisited, reason, buttons, badge, fraudProbability, backgroundColor, notes, teamSettings }) => {
  const [ isBeingDeleted, setIsBeingDeleted ] = useState(false)
  const setBeingDeleted = useCallback(() => setIsBeingDeleted(true), [ setIsBeingDeleted ])

  const handleClick = useCallback(() => {
    if (href) {
      return navigate(href)
    }
  }, [href])
  return (
    <Wrap backgroundColor={backgroundColor}>
      <Left onClick={handleClick} opacity={ isVisited || isBeingDeleted ? 0.4 : 1 }>
        <Address>{ address }</Address>
        <PostalCode>{ postalCode }</PostalCode>
        { fraudProbability && teamSettings?.team_type.show_list_fraudprediction && <FraudProbability>{ fraudProbability }</FraudProbability> }
        { reason && <Reason>{ reason }</Reason> }
        { badge }
        { notes }
      </Left>
      <Right>
        { buttons && buttons(setBeingDeleted) }
      </Right>
    </Wrap>
  )
}

export default ItineraryItemCard
