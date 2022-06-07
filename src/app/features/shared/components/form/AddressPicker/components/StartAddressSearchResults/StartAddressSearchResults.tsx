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
import { Case } from "app/features/types"

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
    reason,
    current_states,
    fraud_prediction,
    teams
  }: Case
): React.ComponentProps<typeof ItineraryItemCard> => {
  const teamMembersList = teams?.length ? teams[0].map((team: { user: { full_name: string } }) => team.user.full_name).join(", ") : ""
  const lastStadiumLabel = current_states?.length > 0 ? current_states[0].status_name : ""
  return {
    href: getUrl(String(id)),
    backgroundColor: "level2",
    address: displayAddress(street_name, number, suffix_letter, suffix),
    postalCode: postal_code,
    reason: reason,
    badge: <StadiumBadge stadium={ lastStadiumLabel! } />,
    fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
    buttons: teamMembersList ? undefined : (() => <StyledButton icon={ <Enlarge /> }
                                                                onClick={ () => handleAdd(String(id)) } />),
    teamMembersList
  }
}

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
    teamSettings?.zaken_team_name || ""
  )
  const { getUrl } = useCaseModal()

  const items = useMemo(
    () => data?.cases.map(mapResults(handleAddButtonClick, getUrl)),
    [ data, handleAddButtonClick, getUrl ]
  )
  console.log(items)
  return isBusy || !items
    ? <CenteredSpinner explanation="Zaken ophalen…" size={ 60 } />
    : items && items.length > 0
      ? <ItineraryItemCardList items={ items } title="Deze zaken voldoen aan je zoekopdracht:" />
      : <p>Geen zaken gevonden.</p>
}

export default StartAddressSearchResults
