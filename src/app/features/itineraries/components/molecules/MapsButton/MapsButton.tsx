import React, { FC, MouseEvent } from "react"
import { Location } from "@datapunt/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import displayAddress from "app/features/shared/utils/displayAddress"
import ResponsiveText from "app/features/shared/components/molecules/ResponsiveText/ResponsiveText"

import { BWVData } from "app/features/types"

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
    <StyledButton variant="blank" iconLeft={ <Location /> } onClick={ onClick }>
      <ResponsiveText text={ ["Maps", "Bekijk op Google Maps"] } />
    </StyledButton>
  )
}
export default MapsButton
