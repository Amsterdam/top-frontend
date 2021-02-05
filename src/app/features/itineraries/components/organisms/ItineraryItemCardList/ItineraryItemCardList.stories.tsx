import React from "react"
import ItineraryItemCardList from "./ItineraryItemCardList"
import Badge from "app/features/shared/components/atoms/Badge/Badge"

const metadata = {
  title: "Shared/Organisms/ItineraryItemCardList"
}

export default metadata

export const Example = () => (
  <ItineraryItemCardList items={ [
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: "hotline"
    }
  ] } />
)
