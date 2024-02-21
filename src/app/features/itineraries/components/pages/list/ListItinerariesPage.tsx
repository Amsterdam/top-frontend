import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"

import { useItineraries } from "app/state/rest"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"

const Li = styled.li`
  margin-bottom: ${ themeSpacing(4) };
`

const TeamName = styled.strong`
  display: block;
  font-weight: 500;
`

const ListItinerariesPage: React.FC = () => {
  const { data } = useItineraries()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  }, [ data ])

  return (
    <DefaultLayout>
      { data && data.itineraries.length > 0 && (
        <>
          <Spacing pb={ 6 }>
            <Heading>Mijn looplijsten</Heading>
          </Spacing>
          <Paragraph>
            Er zijn vandaag meerdere looplijsten voor je gegenereerd. Kies er één:
          </Paragraph>
          <ol>
            { data.itineraries.map(itinerary => (
              <Li key={ itinerary.id }>
                <TeamName>{ itinerary.settings.day_settings.team_settings.name }</TeamName>
                <Link to={ to("/lijst/:itineraryId", { itineraryId: itinerary.id.toString() }) }>
                  { itinerary.team_members.map(member => member.user.full_name).join(", ") }
                </Link>
              </Li>
            )) }
          </ol>
        </>
      ) }
    </DefaultLayout>
  )
}

export default ListItinerariesPage
