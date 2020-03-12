import React, { FC, useState } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import ItineraryTeamMembers from "./ItineraryTeamMembers"
import { Button } from "@datapunt/asc-ui"
import { Enlarge } from "@datapunt/asc-assets"
import DroppableItinerary from "./DroppableItinerary"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import OptionsButton from "../global/OptionsButton"
import formatDate from "../../lib/utils/formatDate"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"
import itineraryToCases from "../../lib/itineraryToCases"
import ButtonAnchor from "../global/ButtonAnchor"
import { to } from "../../config/page"
import styled from "styled-components"

type Props = {
  itinerary: Itinerary
}

const H1 = styled.h1`
  font-size: 24px
`
const Wrap = styled.div`
  display: flex
  justify-content: space-between
  border-bottom: 1px solid #B4B4B4
  padding-bottom: 12px
  margin-bottom: 24px
`
const OptionsWrap = styled.div`
  display: flex
  flex-direction: column
  align-items: flex-end
  button {
    margin-bottom: 12px
  }
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: space-between
  margin-bottom: 15px
  border-bottom: 1px solid #B4B4B4
  padding-bottom: 15px
  button {
    max-width: 48%
    overflow: hidden
  }
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

  const [isEditing, setIsEditing] = useState(false)
  const unsetIsEditing = () => setIsEditing(false)
  const onClickEdit = () => setIsEditing(!isEditing)

  const onClickRemoveAll = () => del(id)

  return (
    <div>
      <Wrap>
        <div>
          <H1>{ title }</H1>
          <ItineraryTeamMembers itineraryId={ id } teamMembers={ team_members } isEditing={ isEditing } unsetIsEditing={ unsetIsEditing } />
        </div>
        <OptionsWrap>
          <OptionsButton onClick={ onClickOptions } />
          { showDialog &&
            <>
              <CopyToClipboardButton text={ clipboardText } />
              <Button onClick={ onClickEdit }>Wijzig teamleden</Button>
              <RemoveAllButton onClick={ onClickRemoveAll } />
            </>
          }
        </OptionsWrap>
      </Wrap>
      <ButtonWrap>
        <MapsButton cases={ itineraryToCases(itinerary) } />
        <ButtonAnchor to={ to(`suggesties/${ id }`) }><Enlarge /> Voeg adres toe</ButtonAnchor>
      </ButtonWrap>
      <DroppableItinerary itineraryItems={ items } />
    </div>
  )
}
export default Itinerary
