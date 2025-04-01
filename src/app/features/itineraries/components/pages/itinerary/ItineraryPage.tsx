import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Heading } from "@amsterdam/asc-ui"
import { useParams } from "react-router-dom"
import { Card, ChevronDown, Enlarge, TrashBin } from "@amsterdam/asc-assets"
import styled from "styled-components"
import { ItineraryItem } from "app/features/types"
import { useDeleteItinerary, useItineraries } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import useNavigation from "app/features/shared/routing/useNavigation"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DraggableItineraryItemCardList
  from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/DraggableItineraryItemCardList"
import formatDate from "app/features/shared/utils/formatDate"
import ResponsiveText from "app/features/shared/components/molecules/ResponsiveText/ResponsiveText"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"

import ButtonMenu from "app/features/itineraries/components/molecules/ButtonMenu/ButtonMenu"
import CopyToClipboardButton
  from "app/features/itineraries/components/molecules/CopyToClipboardButton/CopyToClipBoardButton"
import MapsButton from "app/features/itineraries/components/molecules/MapsButton/MapsButton"
import TeamMemberForm from "app/features/itineraries/components/organisms/TeamMemberForm/TeamMemberForm"

import itineraryToClipboardText from "./itineraryToClipBoardText"
import { mapItineraryItem } from "./mapItineraryItem"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"
import { createUserWithLabel } from "app/features/itineraries/utils/mapUsersToLabel"


const TeamMemberWrap = styled.div`
  padding-top: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E6E6E6;
`

type ColumnWrapProps = { border: boolean }
const ColumnWrap = styled.div<ColumnWrapProps>`
  padding: 8px 0;
  display: flex;
`

const Left = styled.div`
  flex: 1;
`

const Right = styled.div`
`

const FloatRight = styled.div`
  float: right;
  margin-left: 8px;
  margin-bottom: 8px;
`

const TeamName = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`

const ButtonMenuWrap = styled.div`
  position: relative;
`

type Props = {
  itineraryId: string
}

const ItineraryPage: React.FC = () => {
  const { itineraryId } = useParams<Props>()
  const { data: itineraries } = useItineraries()
  const { navigateTo } = useNavigation()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(itineraries?.itineraries, itineraryId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itineraries, itineraryId])

  const { data: itinerary, isBusy } = useItinerary(parseInt(itineraryId!), { keepUsingInvalidCache: true })
  const { execDelete } = useDeleteItinerary(itineraryId!, { lazy: true }) // <- NOTE: we need a extra hook here,
                                                                          // because /itenaries/:id/ only allows a
                                                                          // DELETE, no other methods

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
      await navigateTo("/lijst")
    }
  }, [execDelete, navigateTo])

  const items = itinerary?.items as unknown as ItineraryItem[]

  const cardListItems = useMemo(() => items?.map(mapItineraryItem(itineraryId!, itinerary?.settings.day_settings!)) ?? [], [ items, itineraryId, itinerary ])

  const teamMemberUsers = useMemo(() => itinerary?.team_members.map(member => createUserWithLabel(member.user)) ?? [], [ itinerary ])
  const teamMemberNames = useMemo(() => teamMemberUsers?.map(user => user.full_name).join(", "), [ teamMemberUsers ])

  const cases = useMemo(() => items?.map(item => item.case.data) ?? [], [ items ])
  const casesWithoutVisits = useMemo(() => items?.filter(item => item.visits.length === 0).map(item => item.case.data) ?? [], [ items ])

  const clipboardText = cases.map(itineraryToClipboardText).join("\n")
  const onClickClipboard = () => setShowDialog(false)

  return (
    <DefaultLayout>
      { (!itinerary || isBusy) && <CenteredSpinner explanation="Looplijst ophalen…" size={ 60 } /> }
      { itinerary && <>
        <div>
          <FloatRight>
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
          </FloatRight>
          <Heading forwardedAs="h2">
            Looplijst { formatDate(itinerary.created_at, true, false) }
          </Heading>
          <TeamMemberWrap>
            <TeamName>{ itinerary?.settings.day_settings.team_settings.name } – { itinerary?.settings.day_settings.name }</TeamName>
            { !isEditing ? teamMemberNames : (
              <TeamMemberForm
                itineraryId={ itinerary.id }
                initialUsers={ teamMemberUsers }
                toggleForm={ toggleIsEditing }
              />
            )}
          </TeamMemberWrap>
        </div>
        <ColumnWrap border={ true }>
          <Left>
            <MapsButton cases={ casesWithoutVisits } />
          </Left>
          <Right>
            <StyledButton
              onClick={ () => navigateTo("/lijst/:itineraryId/suggesties", { itineraryId }) }
              variant="blank"
              iconLeft={ <Enlarge /> }
            >
              Voeg zaak toe
            </StyledButton>
          </Right>
        </ColumnWrap>
        <DraggableItineraryItemCardList items={ cardListItems } itineraryId={ itineraryId! } />
      </> }
    </DefaultLayout>
  )
}

export default ItineraryPage
