import React, { useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"

import { ChevronRight } from "@amsterdam/asc-assets"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"

const ButtonsLayout = styled.div`
  display: grid;
  justify-items: start;
  gap: ${ themeSpacing(6) };
`

const ListTeamSettingsOptionsPage: React.FC<RouteComponentProps> = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()

  const userHasTeamSettings = loggedInUser?.team_settings && loggedInUser?.team_settings.length > 0

  useEffect(() => {
    if (userHasTeamSettings) {
      navigate(to("/lijst/nieuw"))
    }
  }, [ userHasTeamSettings, loggedInUser ])

  const teams = data?.results.sort((a, b) => a.name > b.name ? 1 : -1) || []

  return <DefaultLayout>
    { data && data.results.length > 0 && (
      <>
        <Heading>Genereer looplijst</Heading>
        <Heading forwardedAs="h2">Kies een team</Heading>
        <Spacing pb={ 6 }>
          <p>
            <Greeting />{ " " }
            <strong>{ loggedInUser?.first_name }</strong>,
            welke zaken wil je vandaag in je looplijst?
          </p>
        </Spacing>
        <ButtonsLayout>
          { teams.map(teamSettings => (
            <Button
              as="a"
              href={ to("/lijst/nieuw/:teamSettingsId", { teamSettingsId: teamSettings.id }) }
              iconRight={ <ChevronRight /> }
              key={ teamSettings.id }
              variant="primaryInverted"
            >
              { teamSettings.name }
            </Button>
          )) }
        </ButtonsLayout>
      </>
    ) }
  </DefaultLayout>
}

export default ListTeamSettingsOptionsPage
