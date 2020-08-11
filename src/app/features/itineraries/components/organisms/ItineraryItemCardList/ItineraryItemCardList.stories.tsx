import React from "react"
import ItineraryItemCardList from "./ItineraryItemCardList"
import Badge from "../../../../shared/components/atoms/Badge/Badge"

export default {
  title: "Shared/Organisms/ItineraryItemCardList"
}

export const Example = () =>
  <ItineraryItemCardList items={[
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> }
  ]} />
