import React, { useMemo } from "react"
import { Enlarge } from "@amsterdam/asc-assets"

import { useSearch } from "app/state/rest"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import FraudProbability from "../../../../atoms/FraudProbability/FraudProbability"
import { useCaseModal } from "../../hooks/useCaseModal"

type HandleAddCallback = (caseId: string) => void

type Props = {
  handleAddButtonClick: HandleAddCallback
  postalCode?: string
  streetName?: string
  streetNumber: number
  suffix?: string
}

const mapResults = (handleAdd: HandleAddCallback, getUrl: (string: string) => string) => ({ case_id, street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium, fraud_prediction }: any): React.ComponentProps<typeof ItineraryItemCard> => ({
  href: getUrl(case_id),
  backgroundColor: "level2",
  address: displayAddress(street_name, street_number, suffix_letter, suffix),
  postalCode: postal_code,
  reason: case_reason,
  badge: <StadiumBadge stadium={stadium} />,
  fraudProbability: <FraudProbability fraudProbability={fraud_prediction?.fraud_probability} />,
  buttons: () => <StyledButton icon={<Enlarge />} onClick={() => handleAdd(case_id)} />
})

const StartAddressSearchResults: React.FC<Props> = ({ handleAddButtonClick, postalCode, streetName, streetNumber, suffix }) => {
  const { data, isBusy } = useSearch(streetNumber, postalCode, streetName, suffix)
  const { getUrl } = useCaseModal()

  const items = useMemo(
    () => data?.cases.map(mapResults(handleAddButtonClick, getUrl)),
    [ data, handleAddButtonClick, getUrl ]
  )

  return isBusy || !items
      ? <CenteredSpinner size={60} />
      : items && items.length > 0
          ? <ItineraryItemCardList items={items} />
          : <p>Geen resultaten gevonden</p>
}

export default StartAddressSearchResults
