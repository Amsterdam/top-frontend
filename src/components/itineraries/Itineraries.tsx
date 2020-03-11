import React, { FC, useState } from "react"
import styled from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import DroppableItineraries from "./DroppableItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import Hr from "../styled/Hr"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"
import AddButton from "./AddButton"
import OptionsButton from "../global/OptionsButton"
import formatDate from "../../lib/utils/formatDate"

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
const ButtonWrap = styled.div`
  display: flex
  justify-content: space-between
  margin-bottom: 15px
  button {
    max-width: 48%
    overflow: hidden
  }
`
const ButtonWrapBottom = styled(ButtonWrap)`
  margin-top: 15px
`
const OptionsWrap = styled.div`
  display: flex
  flex-direction: column
  align-items: flex-end
  button {
    margin-bottom: 12px
  }
`

const Itineraries: FC = () => {

  const {
    isInitialized,
    itineraries: {
      isFetching,
      itineraries,
      errorMessage
    },
    itinerariesActions: {
      del
    }
  } = useGlobalState()

  console.log(itineraries)

  const hasError = errorMessage !== undefined

  const showSpinner = !isInitialized || isFetching
  const showError = hasError
  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const show = !showSpinner && !showError && hasItineraries
  const firstItinerary = hasItineraries ? itineraries[0] : undefined
  const itineraryId = firstItinerary !== undefined ? firstItinerary.id : undefined

  const onClick = () => {
    if (itineraryId === undefined) return
    del(itineraryId)
  }

  const title = firstItinerary !== undefined ? `Lijst ${ formatDate(firstItinerary.created_at, true) }` : ""

  const [showDialog, setShowDialog] = useState(false)
  const onClickOptions = () => setShowDialog(!showDialog)

  const Buttons = () => (
    <>
      <MapsButton itineraries={ firstItinerary !== undefined ? firstItinerary.items.map(({ case: { bwv_data } }) => bwv_data) : [] } />
      <AddButton itineraryId={ itineraryId! } />
    </>
  )
  const ButtonsTop = () => (
    <>
      <ButtonWrap>
        <Buttons />
      </ButtonWrap>
      <Hr />
    </>
  )
  const ButtonsBottom = () => (
    <ButtonWrapBottom>
      <Buttons />
    </ButtonWrapBottom>
  )
  const showButtonsBottom = itineraries !== undefined && itineraries.length > 4

  return (
    <div className="Itineraries">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show &&
        <>
          <Wrap>
            <div>
              <H1>{ title }</H1>
              { firstItinerary!.team_members.map(
                ({ id, user: { email, first_name } }) => <p key={ id }>{ `${ first_name } (${ email })` }</p>)
              }
            </div>
            <OptionsWrap>
              <OptionsButton onClick={ onClickOptions } />
              { showDialog &&
                <>
                  <CopyToClipboardButton text={ firstItinerary !== undefined ? firstItinerary.items.map(({ case: { bwv_data } }) => itineraryToClipboardText(bwv_data)).join("\n") : "" } />
                  <RemoveAllButton onClick={ onClick } />
                </>
              }
            </OptionsWrap>
          </Wrap>
          <ButtonsTop />
          <DroppableItineraries itineraries={ firstItinerary!.items } />
          { showButtonsBottom &&
            <ButtonsBottom />
          }
        </>
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Itineraries
