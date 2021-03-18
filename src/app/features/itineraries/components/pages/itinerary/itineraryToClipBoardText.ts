import displayAddress from "app/features/shared/utils/displayAddress"

import { BWVData } from "app/features/types"

const itineraryToClipboardText = (itinerary: BWVData) => {
  const {
    address: {
      street_name: streetName,
      number: streetNumber,
      suffix,
      suffix_letter: suffixLetter,
      postal_code: postalCode
    },
    stadium,
    case_reason: caseReason
  } = itinerary
  const address = displayAddress(streetName, streetNumber, suffixLetter, suffix)
  return `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
}

export default itineraryToClipboardText
