import React from "react"
import { Button } from "@amsterdam/asc-ui"
import { Document, TrashBin } from "@amsterdam/asc-assets"

import ItineraryItemCard from "./ItineraryItemCard"
import { CaseReason } from "app/features/types"
import Badge from "app/features/shared/components/atoms/Badge/Badge"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"

const metadata = {
  title: "Domain / ItineraryItemCard"
}

export default metadata

const reason = { name: "jyhgj" } as CaseReason

export const Example = () =>
  <ItineraryItemCard
    address="Kolksteeg 2D"
    badge={ <Badge>Onderzoek buitendienst</Badge> }
    postalCode="1012PT"
    reason={ reason }
    />
    
export const WithButtons = () =>
  <ItineraryItemCard
  address="Kolksteeg 2D"
    buttons={ () => <>
      <Spacing pb={ 2 }>
        <Button icon={ <Document /> } variant="tertiary" />
      </Spacing>
      <Spacing>
        <Button icon={ <TrashBin /> } variant="tertiary" />
      </Spacing>
    </> }
    badge={ <Badge>Onderzoek buitendienst</Badge> }
    postalCode="1012PT"
    reason={ reason }
    />
    
    export const WithFraudProbability = () =>
  <ItineraryItemCard
  address="Kolksteeg 2D"
  badge={ <Badge>Onderzoek buitendienst</Badge> }
  fraudProbability="🤖 % onbekend"
  postalCode="1012PT"
  reason={ reason }
  />
