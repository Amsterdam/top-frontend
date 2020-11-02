import React, { useCallback, useMemo, useState } from "react"
import { Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { navigate, RouteComponentProps } from "@reach/router"
import { Card, ChevronDown, Enlarge, TrashBin } from "@amsterdam/asc-assets"
import styled from "styled-components"

import { ItineraryItem } from "app/features/types"
import { useDeleteItinerary, useTeamSettings } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DraggableItineraryItemCardList
  from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/DraggableItineraryItemCardList"
import formatDate from "app/features/shared/utils/formatDate"
import ResponsiveText from "app/features/shared/components/molecules/ResponsiveText/ResponsiveText"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import to from "app/features/shared/routing/to"

import ButtonMenu from "app/features/itineraries/components/molecules/ButtonMenu/ButtonMenu"
import CopyToClipboardButton
  from "app/features/itineraries/components/molecules/CopyToClipboardButton/CopyToClipBoardButton"
import MapsButton from "app/features/itineraries/components/molecules/MapsButton/MapsButton"
import TeamMemberForm from "app/features/itineraries/components/organisms/TeamMemberForm/TeamMemberForm"

import itineraryToClipboardText from "./itineraryToClipBoardText"
import { mapItineraryItem } from "./mapItineraryItem"

const TeamMemberWrap = styled.div`
  padding: ${ themeSpacing(6) } 0;
  border-top: 1px solid ${ themeColor("tint", "level3") };
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
`

type ColumnWrapProps = {border: boolean}
const ColumnWrap = styled.div<ColumnWrapProps>`
  padding: ${ themeSpacing(2) } 0;
  display: flex;
`

const Left = styled.div`
  flex: 1;
`

const Right = styled.div`
`

const ButtonMenuWrap = styled.div`
  position: relative;
`

type Props = {
  itineraryId: string
}

const ItineraryPage: React.FC<RouteComponentProps<Props>> = ({ itineraryId }) => {
  const { data, isBusy } = useItinerary(parseInt(itineraryId!), { keepUsingInvalidCache: true })
  const { data: teamSettings } = useTeamSettings(data?.settings.team_settings.id!)
  const { execDelete } = useDeleteItinerary(itineraryId!, { lazy: true }) // <- NOTE: we need a extra hook here, because /itenaries/:id/ only allows a DELETE, no other methods

  const [ showDialog, setShowDialog ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)

  const onClickOptions = useCallback(() => {
    setShowDialog(!showDialog)
  }, [ showDialog, setShowDialog ])

  const toggleIsEditing = useCallback(() => {
    setIsEditing(!isEditing)
    setShowDialog(false)
  }, [ setIsEditing, isEditing ])

  const deleteItinerary = useCallback(async () => {
    if (window.confirm("Weet je zeker dat je de hele looplijst wilt verwijderen?")) {
      await execDelete()
      await navigate(to("/"))
    }
  }, [ execDelete ])

  const items = data?.items as unknown as ItineraryItem[]

  const cardListItems = useMemo(() => items?.map(mapItineraryItem(itineraryId!, teamSettings!)) ?? [], [ items, itineraryId, teamSettings ])

  const teamMemberUsers = useMemo(() => data?.team_members.map(member => member.user) ?? [], [ data ])
  const teamMemberNames = useMemo(() => teamMemberUsers?.map(user => user.full_name).join(", "), [ teamMemberUsers ])
  const cases = useMemo(() => items?.filter(item => item.visits.length === 0).map(item => item.case.bwv_data) ?? [], [ items ])

  const clipboardText = cases.map(itineraryToClipboardText).join("\n")
  const onClickClipboard = () => setShowDialog(false)

  return (
    <DefaultLayout>
      { (!data || isBusy) && <CenteredSpinner size={ 60 } /> }
      { data && <>
        <ColumnWrap border={ false }>
          <Left>
            <Heading
              forwardedAs="h2">Looplijst { formatDate(data.created_at, true, false) } { data.settings.team_settings.name }</Heading>
          </Left>
          <Right>
            <StyledButton variant="blank" iconRight={ <ChevronDown /> } onClick={ onClickOptions }>Opties</StyledButton>
            { showDialog && (
              <ButtonMenuWrap>
                <ButtonMenu>
                  <CopyToClipboardButton text={ clipboardText } onClick={ onClickClipboard } />
                  <StyledButton variant="blank" iconLeft={ <Card /> } onClick={ toggleIsEditing }>Wijzig
                    teamleden</StyledButton>
                  <StyledButton variant="blank" iconLeft={ <TrashBin /> } onClick={ deleteItinerary }>
                    <ResponsiveText text={ [ "Wis lijst", "Wis gehele looplijst" ] } />
                  </StyledButton>
                </ButtonMenu>
              </ButtonMenuWrap>
            ) }
          </Right>
        </ColumnWrap>
        <TeamMemberWrap>
          { !isEditing
            ? teamMemberNames
            : <TeamMemberForm
              itineraryId={ data.id }
              initialUsers={ teamMemberUsers }
              toggleForm={ toggleIsEditing }
            />
          }
        </TeamMemberWrap>
        <ColumnWrap border={ true }>
          <Left>
            <MapsButton cases={ cases } />
          </Left>
          <Right>
            <StyledButton onClick={ () => navigate(to("/lijst/:itineraryId/suggesties/", { itineraryId })) }
                          variant="blank" iconLeft={ <Enlarge /> }>
              Voeg adres toe
            </StyledButton>
          </Right>
        </ColumnWrap>
        <DraggableItineraryItemCardList items={ cardListItems } itineraryId={ itineraryId! } />
      </> }
    </DefaultLayout>
  )
}

export default ItineraryPage
