import displayAddress from "app/features/shared/utils/displayAddress"

import {BWVData} from "app/features/types"

const itineraryToClipboardText = (itinerary: BWVData) => {
  const {
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter: suffixLetter,
    postal_code: postalCode,
    stadium,
    case_reason: caseReason
  } = itinerary
  const address = displayAddress(streetName, streetNumber, suffixLetter || undefined, suffix || undefined)
  return `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
}

export default itineraryToClipboardText
