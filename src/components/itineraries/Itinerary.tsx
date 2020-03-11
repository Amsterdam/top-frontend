import React, { FC, useState } from "react"
import styled from "styled-components"
import DroppableItinerary from "./DroppableItinerary"
import useGlobalState from "../../hooks/useGlobalState"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import AddButton from "./AddButton"
import OptionsButton from "../global/OptionsButton"
import formatDate from "../../lib/utils/formatDate"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"
import itineraryToCases from "../../lib/itineraryToCases"

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
  const onClickOptions = () => setShowDialog(!showDialog)

  const onClick = () => del(id)

  return (
    <div>
      <Wrap>
        <div>
          <H1>{ title }</H1>
          { team_members.map(
            ({ id, user: { full_name } }) => <p key={ id }>{ `${ full_name }` }</p>)
          }
        </div>
        <OptionsWrap>
          <OptionsButton onClick={ onClickOptions } />
          { showDialog &&
            <>
              <CopyToClipboardButton text={ itineraryToCases(itinerary).map(caseItem => itineraryToClipboardText(caseItem)).join("\n") } />
              <RemoveAllButton onClick={ onClick } />
            </>
          }
        </OptionsWrap>
      </Wrap>
      <ButtonWrap>
        <MapsButton cases={ itineraryToCases(itinerary) } />
        <AddButton itineraryId={ id } />
      </ButtonWrap>
      <DroppableItinerary itineraryItems={ items } />
    </div>
  )
}
export default Itinerary
