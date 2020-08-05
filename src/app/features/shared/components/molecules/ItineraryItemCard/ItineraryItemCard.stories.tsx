import React from "react"
import { Button } from "@datapunt/asc-ui"
import { Document, TrashBin } from "@datapunt/asc-assets"

import ItineraryItemCard from "./ItineraryItemCard"
import Badge from "../../atoms/Badge/Badge"
import Spacing from "../../atoms/Spacing/Spacing"

export default {
  title: "Shared/Molecules/ItineraryItemCard"
}

export const Example = () =>
  <ItineraryItemCard
    id="1"
    itineraryId="2"
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
  />

export const ExampleWithButtons = () =>
  <ItineraryItemCard
    id="1"
    itineraryId="2"
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
    buttons={<>
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
    id="1"
    itineraryId="2"
    address="Kolksteeg 2D"
    postalCode="1012PT"
    reason="Hotline"
    badge={<Badge>Onderzoek buitendienst</Badge>}
    fraudProbability="🤖 % onbekend"
  />
