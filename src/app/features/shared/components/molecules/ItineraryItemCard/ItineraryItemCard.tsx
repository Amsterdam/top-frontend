import React, { useCallback, useState } from "react"
import { navigate } from "@reach/router"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"

type Props = {
  address: string | JSX.Element
  backgroundColor?: "level1" | "level2" | "level3" | "level4" | "level5" | "level6"
  badge?: JSX.Element
  buttons?: (onDeleteButtonClick: () => void) => JSX.Element
  daySettings?: Components.Schemas.DaySettings
  fraudProbability?: string | JSX.Element
  href?: string
  isSia?: boolean
  isVisited?: boolean
  notes?: JSX.Element
  postalCode: string | JSX.Element
  reason?: string | JSX.Element
  teamMembersList?: string
  hasPriority?: boolean
  hasWarrant?: boolean
  deleted?: boolean
}

type WrapProps = Pick<Props, "backgroundColor" | "deleted">

const Wrap = styled.article<WrapProps>`
  opacity: ${ ({ deleted }) => deleted ? 0.4 : 1 };
  background-color: ${ props => themeColor("tint", props.backgroundColor ?? "level1") };
  padding: ${ themeSpacing(3) } ${ themeSpacing(2) };
  border-top: 1px solid ${ themeColor("tint", "level3") };
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
`

const WrapLeftRight = styled.div`
  display: flex;
`

type VisibilityProps = { opacity?: number }
const Left = styled.div<VisibilityProps>`
  cursor: pointer;
  flex: 1;
  opacity: ${ props => props.opacity ?? 1 };
`
const Bottom = styled.div<VisibilityProps>`
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

const BadgeRow = styled.div`
  display: flex;
  margin-bottom: ${ themeSpacing(2) };

  > :not(:last-child) {
    margin-right: ${ themeSpacing(2) };
  }
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

const P = styled.p`
  margin-bottom: 0;
`

const ItineraryItemCard: React.FC<Props> = (
  {
    address,
    backgroundColor,
    badge,
    buttons,
    daySettings,
    fraudProbability,
    href,
    isSia,
    isVisited,
    notes,
    postalCode,
    reason,
    teamMembersList,
    hasPriority,
    hasWarrant,
    deleted = false
  }) => {
  const [ isBeingDeleted, setIsBeingDeleted ] = useState(false)
  const setBeingDeleted = useCallback(() => setIsBeingDeleted(true), [ setIsBeingDeleted ])

  const handleClick = useCallback(() => {
    if (href) {
      return navigate(href)
    }
  }, [ href ])

  return (
    <Wrap backgroundColor={ backgroundColor } deleted={ deleted }>
      <WrapLeftRight>
        <Left onClick={ handleClick } opacity={ isVisited || isBeingDeleted ? 0.4 : 1 }>
          <Address>{ address }</Address>
          <PostalCode>{ postalCode }</PostalCode>
          { fraudProbability && daySettings?.team_settings.fraud_prediction_model && (
            <FraudProbability>{ fraudProbability }</FraudProbability>
          )}
          { reason && <Reason>{ reason }</Reason> }
        </Left>
        <Right>
          { buttons && buttons(setBeingDeleted) }
        </Right>
      </WrapLeftRight>
      <Bottom>
        <BadgeRow>
          { badge }
          { isSia && <StadiumBadge stadium="SIA" /> }
          { hasPriority && <StadiumBadge stadium="Prio" variant="secondary" /> }
          { hasWarrant && <StadiumBadge stadium="Machtiging" variant="tint" /> }
        </BadgeRow>
        { notes }
        { teamMembersList && <P>In looplijst van { teamMembersList }.</P> }
      </Bottom>
    </Wrap>
  )
}

export default ItineraryItemCard
