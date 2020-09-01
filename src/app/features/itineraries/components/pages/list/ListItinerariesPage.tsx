import React, { useEffect } from "react"
import { navigate, Link } from "@reach/router"

import { useItineraries } from "app/state/rest"

import to from "app/features/shared/routing/to"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"


const ListItinerariesPage: React.FC = () => {
  const { data } = useItineraries()

  useEffect(() => {
    if (data && data.itineraries.length === 1) {
      navigate(to("/lijst/:itineraryId/", { itineraryId: data.itineraries[0].id.toString() }))
    }
    if (data && data.itineraries.length === 0) {
      navigate(to("/lijst/nieuw/"))
    }
  }, [data])

  return <DefaultLayout>
    { data && data.itineraries.length > 0 && (
      <>
        <h1>Mijn looplijsten</h1>
        <ul>
          { data.itineraries.map(itinerary => (
            <li key={itinerary.id}>
              <Link to={to("/lijst/:itineraryId/", { itineraryId: itinerary.id.toString() })}>
                { itinerary.team_members.map(member => member.user.full_name).join(", ") }
              </Link>
            </li>
          )) }
        </ul>
      </>
    )}
  </DefaultLayout>
}

export default ListItinerariesPage
