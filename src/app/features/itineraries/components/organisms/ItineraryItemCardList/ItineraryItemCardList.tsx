import React from "react"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"

type Props = {
  items: Array<React.ComponentProps<typeof ItineraryItemCard>>
}

const ItineraryItemCardList: React.FC<Props> = ({ items }) => (
  <>
    <p>Zaken rondom de adressen in je lijst:</p>
    { items.map((item, i) => <ItineraryItemCard key={ i } { ...item } />) }
  </>
)

export default ItineraryItemCardList
