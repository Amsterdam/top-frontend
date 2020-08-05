import React from "react"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"

type Props = {
  items: Array<React.ComponentProps<typeof ItineraryItemCard>>
}

const ItineraryItemCardList:React.FC<Props> = ({ items }) => (<div>
  { items.map((item, i) => <ItineraryItemCard key={i} {...item} />) }
</div>)

export default ItineraryItemCardList
