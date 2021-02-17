import React from "react"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"

type Props = {
  items: Array<React.ComponentProps<typeof ItineraryItemCard>>
  title?: string
}

const ItineraryItemCardList: React.FC<Props> = ({ items, title }) => (
  <>
    { title && <p>{ title }</p> }
    { items.map((item, i) => <ItineraryItemCard key={ i } { ...item } />) }
  </>
)

export default ItineraryItemCardList
