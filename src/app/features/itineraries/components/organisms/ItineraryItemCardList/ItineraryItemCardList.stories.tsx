import React from "react"
import ItineraryItemCardList from "./ItineraryItemCardList"
import Badge from "app/features/shared/components/atoms/Badge/Badge"
import { CaseReason } from "app/features/types"

const metadata = {
  title: "Domain / ItineraryItemCardList"
}

export default metadata

export const Example = () => (
  <ItineraryItemCardList items={ [
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: {name: "hotline"} as CaseReason
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: {name: "hotline"} as CaseReason
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: {name: "hotline"} as CaseReason
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: {name: "hotline"} as CaseReason
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",
      reason: {name: "hotline"} as CaseReason
    },
    {
      address: "Lorem ipsum",
      badge: <Badge>Onderzoek buitendienst</Badge>,
      fraudProbability: "% onbekend",
      postalCode: "1234PT",      
      reason: {name: "hotline"} as CaseReason
    }
  ] } />
)
