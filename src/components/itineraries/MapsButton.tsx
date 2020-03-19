import React, { FC, MouseEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Location } from "@datapunt/asc-assets"
import displayAddress from "../../lib/displayAddress"
import ResponsiveText from "../global/ResponsiveText"

type Props = {
  $as?: "a" | "button"
  cases: BWVData[]
}

const StyledButton = styled(Button)`
  ${ ({ $as }) => $as !== "a" ?
    "border: solid 1px black;" :
    `
    margin-bottom: 0;
    padding: 0;
    height: auto;
    &:hover {
      background-color: transparent;
    }
    `
  }
`

const MapsButton: FC<Props> = ({ $as = "button", cases }) => {
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
    <StyledButton $as={ $as } onClick={ onClick } variant="blank" iconLeft={ $as !== "a" ? <Location /> : null }>
      <ResponsiveText text={ ["Maps", "Bekijk op Google Maps"] } />
    </StyledButton>
  )
}
export default MapsButton
