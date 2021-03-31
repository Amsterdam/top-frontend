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
    current_states,
    case_reason,
    reason
  } = itinerary
  const address = displayAddress(streetName, streetNumber, suffixLetter, suffix)
  const state = current_states && current_states.length > 0 ? current_states[0].status_name : stadium
  const caseReason = reason ? reason.name : case_reason
  return `${ address } ${ postalCode } ${ state } ${ caseReason }`
}

export default itineraryToClipboardText
