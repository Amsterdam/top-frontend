import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/page"
import styled from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import DroppableItineraries from "./DroppableItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import Hr from "../styled/Hr"
import TamTamLink from "../styled/TamTamLink"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"

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
const P = styled.p`
  margin-bottom: 16px
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
      del,
      getSuggestions
    }
  } = useGlobalState()

  console.log(itineraries)

  const hasError = errorMessage !== undefined

  const showSpinner = !isInitialized || isFetching
  const showError = hasError
  const show = !showSpinner && !showError
  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const firstItinerary = hasItineraries ? itineraries[0] : undefined
  const itineraryId = firstItinerary !== undefined ? firstItinerary.id : undefined

  const onClick = () => {
    if (itineraryId === undefined) return
    del(itineraryId)
  }

  const Buttons = () => (
    <>
      <MapsButton itineraries={ firstItinerary !== undefined ? firstItinerary.items.map(({ case: { bwv_data } }) => bwv_data) : [] } />
      <CopyToClipboardButton text={ firstItinerary !== undefined ? firstItinerary.items.map(({ case: { bwv_data } }) => itineraryToClipboardText(bwv_data)).join("\n") : "" } />
      <RemoveAllButton onClick={ onClick } />
      { itineraryId !== undefined &&
        <Link to={ to(`suggesties/${ itineraryId }`) }>Voeg toe</Link>
      }
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
      { show && (
          hasItineraries ?
            <>
              <ButtonsTop />
              <DroppableItineraries itineraries={ firstItinerary !== undefined ? firstItinerary.items : [] } />
              { showButtonsBottom &&
                <ButtonsBottom />
              }
            </> :
            <>
              <P>Je looplijst is leeg.</P>
              <P><Link to={ to("zoeken") }>Zoek</Link> adressen om aan je looplijst toe te voegen.</P>
              <P>Of <TamTamLink to={ to("parse") }>copy+paste</TamTamLink> je TamTam looplijst</P>
            </>
        )
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Itineraries
