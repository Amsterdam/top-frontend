import React, { FC, useState } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import ItineraryTeamMembers from "./ItineraryTeamMembers"
import H1 from "../styled/H1"
import Button from "../styled/Button"
import { Enlarge, Card, ChevronDown } from "@datapunt/asc-assets"
import DroppableItinerary from "./DroppableItinerary"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import formatDate from "../../lib/utils/formatDate"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"
import itineraryToCases from "../../lib/itineraryToCases"
import ButtonAnchor from "../global/ButtonAnchor"
import ButtonMenu from "./ButtonMenu"
import { to } from "../../config/page"
import styled from "styled-components"

type Props = {
  itinerary: Itinerary
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #B4B4B4;
  padding-bottom: 12px;
  margin-bottom: 24px;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #B4B4B4;
  padding-bottom: 12px;
`
const ButtonMenuWrap = styled.div`
  position: relative;
`

const Itinerary: FC<Props> = ({ itinerary }) => {
  const {
    itinerariesActions: {
      del
    }
  } = useGlobalState()

  const { id, created_at, team_members, items } = itinerary

  const title = `Lijst ${ formatDate(created_at, true) }`

  const [showDialog, setShowDialog] = useState(false)
  const onClickOptions = () => {
    setShowDialog(!showDialog)
    unsetIsEditing()
  }

  const clipboardText = itineraryToCases(itinerary)
    .map(caseItem => itineraryToClipboardText(caseItem))
    .join("\n")
  const onClickClipboard = () => setShowDialog(false)

  const [isEditing, setIsEditing] = useState(false)
  const unsetIsEditing = () => setIsEditing(false)
  const onClickEdit = () => {
    setIsEditing(!isEditing)
    setShowDialog(false)
  }

  const onClickRemoveAll = () => {
    del(id)
    setShowDialog(false)
    unsetIsEditing()
  }

  return (
    <div>
      <Wrap>
        <H1>{ title }</H1>
        <Button variant="blank" iconRight={ <ChevronDown /> } onClick={ onClickOptions }>opties</Button>
      </Wrap>
      { showDialog &&
        <ButtonMenuWrap>
          <ButtonMenu>
            <CopyToClipboardButton text={ clipboardText } onClick={ onClickClipboard } />
            <Button variant="blank" iconLeft={ <Card /> } onClick={ onClickEdit }>Wijzig teamleden</Button>
            <RemoveAllButton onClick={ onClickRemoveAll } />
          </ButtonMenu>
        </ButtonMenuWrap>
      }
      <ItineraryTeamMembers itineraryId={ id } teamMembers={ team_members } isEditing={ isEditing } unsetIsEditing={ unsetIsEditing } />
      <ButtonWrap>
        <MapsButton cases={ itineraryToCases(itinerary) } />
        <ButtonAnchor to={ to(`suggesties/${ id }`) } iconLeft={ <Enlarge /> }>Voeg adres toe</ButtonAnchor>
      </ButtonWrap>
      <DroppableItinerary id={ id } itineraryItems={ items } />
    </div>
  )
}
export default Itinerary
