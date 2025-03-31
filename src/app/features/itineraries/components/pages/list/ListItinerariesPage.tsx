import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Heading, Paragraph } from "@amsterdam/asc-ui"

import { useItineraries } from "app/state/rest"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

const Li = styled.li`
  margin-bottom: 16px;
`

const TeamName = styled.strong`
  display: block;
  font-weight: 500;
`

const ListItinerariesPage: React.FC = () => {
  const { data, isBusy } = useItineraries()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <DefaultLayout>
      {isBusy && <CenteredSpinner explanation="Looplijsten ophalen…" size={60} />}
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
