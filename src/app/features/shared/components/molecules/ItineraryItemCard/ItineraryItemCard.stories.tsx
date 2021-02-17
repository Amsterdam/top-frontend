import React from "react"
import { Button } from "@amsterdam/asc-ui"
import { Document, TrashBin } from "@amsterdam/asc-assets"

import ItineraryItemCard from "./ItineraryItemCard"
import Badge from "app/features/shared/components/atoms/Badge/Badge"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Shared/Molecules/ItineraryItemCard"
}

export const Example = () =>
  <ItineraryItemCard
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
  />

export const ExampleWithButtons = () =>
  <ItineraryItemCard
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
    buttons={() => <>
      <Spacing pb={2}>
        <Button icon={<Document />} variant="tertiary" />
      </Spacing>
      <Spacing>
        <Button icon={<TrashBin />} variant="tertiary" />
      </Spacing>
    </>}
  />

export const ExampleWithFraudProbability = () =>
  <ItineraryItemCard
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
    fraudProbability="🤖 % onbekend"
  />
