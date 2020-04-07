import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import ItinerariesMain from "../components/itineraries/ItinerariesMain"
import Navigation from "../components/global/Navigation"
import parseLocationSearch from "../lib/utils/parseLocationSearch"

type Props = {
  id?: string
} & RouteComponentProps

const ItinerariesPage: FC<Props> = ({ id: idString = "" }) => {
  const idNumber = parseInt(idString, 10)
  const id = !Number.isNaN(idNumber) ? idNumber : undefined

  const { generate } = parseLocationSearch(window.location.search)
  const forceGenerate = generate === "1"

  return (
    <>
      <Navigation />
      <ItinerariesMain id={ id } forceGenerate={ forceGenerate } />
    </>
  )
}
export default ItinerariesPage
