import React, { useMemo } from "react"
import { Enlarge } from "@amsterdam/asc-assets"
import { useParams } from "@reach/router"

import { useSearch, useTeamSettings } from "app/state/rest"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import ItineraryItemCardList
  from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"
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
  team?: string
}

const mapResults = (handleAdd: HandleAddCallback, getUrl: (string: string) => string) => (
  {
    id,
    address: {
      street_name,
      number,
      suffix_letter,
      suffix,
      postal_code
    },
    case_reason,
    stadium,
    fraud_prediction
  }: any
): React.ComponentProps<typeof ItineraryItemCard> => ({
  href: getUrl(id),
  backgroundColor: "level2",
  address: displayAddress(street_name, number, suffix_letter, suffix),
  postalCode: postal_code,
  reason: case_reason,
  badge: <StadiumBadge stadium={ stadium } />,
  fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
  buttons: () => <StyledButton icon={ <Enlarge /> } onClick={ () => handleAdd(id) } />
})

const StartAddressSearchResults: React.FC<Props> = (
  {
    handleAddButtonClick,
    postalCode,
    streetName,
    streetNumber,
    suffix
  }
) => {
  const { teamSettingsId } = useParams()
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)
  const { data, isBusy } = useSearch(
    streetNumber,
    postalCode,
    streetName,
    suffix,
    teamSettings?.zaken_team_name || "",
    { apiVersion: teamSettings?.use_zaken_backend ? "v2" : "v1" }
  )
  const { getUrl } = useCaseModal()

  const items = useMemo(
    () => data?.cases.map(mapResults(handleAddButtonClick, getUrl)),
    [ data, handleAddButtonClick, getUrl ]
  )

  return isBusy || !items
    ? <CenteredSpinner explanation="Zaken ophalen…" size={ 60 } />
    : items && items.length > 0
      ? <ItineraryItemCardList items={ items } title="Deze zaken voldoen aan je zoekopdracht:" />
      : <p>Geen zaken gevonden.</p>
}

export default StartAddressSearchResults
