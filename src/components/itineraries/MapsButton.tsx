import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Location } from "@datapunt/asc-assets"
import Button from "../styled/Button"
import ResponsiveText from "../global/ResponsiveText"
import displayAddress from "../../lib/displayAddress"

type Props = {
  cases: BWVData[]
}

const MapsButton: FC<Props> = ({ cases }) => {
  const onClick = (event: MouseEvent) => {
    event.preventDefault()
    const path = cases
      .map(caseItem => {
        const {
          street_name: streetName,
          street_number: streetNumber,
          postal_code: postalCode
        } = caseItem
        const address = displayAddress(streetName, streetNumber)
        const city = "Amsterdam"
        return `${ address } ${ postalCode } ${ city }`
      })
      .filter((address, index, arr) => arr.indexOf(address) === index) // filter unique
      .join("/")
    const href = `https://www.google.nl/maps/dir/${ path }`
    window.open(href, "_blank")
  }
  return (
    <Button variant="blank" iconLeft={ <Location /> } onClick={ onClick }>
      <ResponsiveText text={ ["Maps", "Bekijk op Google Maps"] } />
    </Button>
  )
}
export default MapsButton
