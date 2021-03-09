import React from "react"
import styled from "styled-components"

import { useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import { ChevronRight } from "@amsterdam/asc-assets"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"

import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"

const ButtonsLayout = styled.div`
  display: grid;
  justify-items: start;
  gap: ${ themeSpacing(6) };
`

const TeamSettingsListPage: React.FC = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()

  const teams = data?.results ?? []
  const sortedTeams = [ ...teams ].sort((a, b) => a.name > b.name ? 1 : -1) || []

  return (
    <DefaultLayout>
      { data && data.results.length > 0 && (
        <>
          <Heading>Looplijstinstellingen voor planner</Heading>
          <Heading forwardedAs="h2">Kies een team</Heading>
          <Spacing pb={ 6 }>
            <p>
              <Greeting />{ " " }
              <strong>{ loggedInUser?.first_name }</strong>,
              voor welk team wil je de looplijstinstellingen beheren?
            </p>
          </Spacing>
          <ButtonsLayout>
            { sortedTeams.map(teamSettings => (
              <Button
                as="a"
                href={ to("/team-settings/:teamSettingsId", { teamSettingsId: teamSettings.id }) }
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
  )
}

export default TeamSettingsListPage
