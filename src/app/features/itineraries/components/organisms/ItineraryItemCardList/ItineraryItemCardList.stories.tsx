import React from "react"
import ItineraryItemCardList from "./ItineraryItemCardList"
import Badge from "../../../../shared/components/atoms/Badge/Badge";

export default {
  title: "Shared/Organisms/ItineraryItemCardList"
}

export const Example = () =>
  <ItineraryItemCardList items={[
    { id: "1", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { id: "2", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { id: "3", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { id: "4", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { id: "5", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
    { id: "6", itineraryId: "1", address: "Lorem ipsum", postalCode: "1234PT", fraudProbability: "% onbekend", reason: "hotline", badge: <Badge>Onderzoek buitendienst</Badge> },
  ]} />
