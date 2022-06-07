import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "styled-components"

import { ChevronRight } from "@amsterdam/asc-assets"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"

import { useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"

const basePath = process.env.REACT_APP_BASEPATH ?? "/"

const Grid = styled.div`
  display: grid;
  justify-items: start;
  gap: ${ themeSpacing(4) };
`

const Illustration = styled.div`
  max-width: 30em;
  flex: auto;
  // https://pixabay.com/vectors/amsterdam-netherlands-houses-street-4167026/
  background: url('${ basePath }images/background-2.png') no-repeat bottom;
  background-size: contain;
`

const ListTeamSettingsOptionsPage: React.FC<RouteComponentProps> = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()
  const teams = data?.results ?? []
  const sortedTeams = [ ...teams ].sort((a, b) => a.name > b.name ? 1 : -1) || []

  return (
    <DefaultLayout>
      { data && data.results.length > 0 && (
        <Illustration>
          <Heading>Genereer looplijst</Heading>
          <Heading forwardedAs="h2">Kies een team</Heading>
          <Spacing pb={ 4 }>
            <p>
              <Greeting />{ " " }
              <strong>{ loggedInUser?.first_name }</strong>,
              welke zaken wil je vandaag in je looplijst?
            </p>
          </Spacing>
          <Grid>
            { sortedTeams.map(teamSettings => (
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
          </Grid>
        </Illustration>
      ) }
    </DefaultLayout>
  )
}

export default ListTeamSettingsOptionsPage
