import React, { FC, useState, FormEvent } from "react"
import useGlobalState from "../../../hooks/useGlobalState"
import IconButton from "../../global/IconButton"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import getItineraryByCaseId from "../../../lib/getItineraryByCaseId"
import TeamMembersDisplay from "../../itineraries/TeamMembersDisplay"

type Props = {
  caseId: CaseId
}

// @TODO: Rename this, so there is no confusion with global Modal
// @TODO: Move to seperate component
const Modal = styled.div`
  position: absolute;
  z-index: 9;
  right: 15px;
  margin-top: -132px;
  background: white;
  width: 240px;
  padding: 12px;
  border: 1px solid black;
`
const ModalButton = styled(Button)`
  display: block;
`
const P = styled.p`
  color: black;
  font-weight: normal;
`

const ItinerarySearchResultButtons: FC<Props> = ({ caseId }) => {
  const {
    hasItinerary: userHasItinerary,
    itineraries: {
      isFetching,
      itineraries
    },
    itinerariesActions: {
      add,
      remove
    },
    searchActions: {
      setTeam
    }
  } = useGlobalState()

  const length = itineraries !== undefined ? itineraries.length : 0
  const hasNoItineraries = length === 0
  const hasSingleItinerary = length === 1
  const hasMultiItineraries = length > 1

  const addToItinerary = (itinerary: Itinerary, caseId: CaseId) => {
    const { id, team_members: teamMembers } = itinerary
    add(id, caseId)
    setTeam(caseId, teamMembers)
  }

  const [showModal, setShowModal] = useState(false)

  const onClickAdd = (event: FormEvent) => {
    event.preventDefault()
    if (hasSingleItinerary) addToItinerary(itineraries[0], caseId)
    if (hasMultiItineraries) setShowModal(true)
  }

  const onClickRemove = (event: FormEvent) => {
    event.preventDefault()
    const itinerary = itineraries !== undefined ? getItineraryByCaseId(itineraries, caseId) : undefined
    if (itinerary === undefined) return
    const itineraryItem = itinerary !== undefined ? itinerary.items.find(({ case: { bwv_data: { case_id } } }) => case_id === caseId) : undefined
    if (itineraryItem === undefined) return
    const { id } = itineraryItem
    remove(id)
    setTeam(caseId)
  }

  const onClickModal = (itinerary: Itinerary) => (event: FormEvent) => {
    event.preventDefault()
    addToItinerary(itinerary, caseId)
    setShowModal(false)
  }

  const onClickModalClose = (event: FormEvent) => {
    event.preventDefault()
    setShowModal(false)
  }

  const isItinerary = userHasItinerary(caseId)
  const showAddButton = isItinerary === false
  const showRemoveButton = !showAddButton
  const disabled = isFetching || hasNoItineraries

  return (
    <div>
      { showAddButton &&
        <IconButton icon="Enlarge" onClick={ onClickAdd } disabled={ disabled } />
      }
      { showRemoveButton &&
        <IconButton icon="TrashBin" onClick={ onClickRemove } disabled={ disabled } />
      }
      { showModal &&
        <Modal>
          <P>Voeg toe aan lijst</P>
          { itineraries.map(itinerary => {
              const { id, team_members: teamMembers } = itinerary
              return <ModalButton key={ id } variant="textButton" onClick={ onClickModal(itinerary) }><TeamMembersDisplay teamMembers={ teamMembers } /></ModalButton>
            })
          }
          <ModalButton variant="textButton" onClick={ onClickModalClose }>sluit</ModalButton>
        </Modal>
      }
    </div>
  )
}
export default ItinerarySearchResultButtons
