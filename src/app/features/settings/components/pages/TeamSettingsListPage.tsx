import React from "react"
import styled from "styled-components"
import { useThemes } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { ChevronRight } from "@amsterdam/asc-assets"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"
import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import useNavigation from "app/features/shared/routing/useNavigation"

const ButtonsLayout = styled.div`
  display: grid;
  justify-items: start;
  gap: ${ themeSpacing(6) };
`

const TeamSettingsListPage: React.FC = () => {
  const { data } = useThemes()
  const loggedInUser = useLoggedInUser()
  const { navigateTo } = useNavigation()

  const themes = data?.results ?? []

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
            { themes.map(theme => (
              <Button
                onClick={ () => navigateTo("/team-settings/:teamSettingsId", { teamSettingsId: theme.id }) }
                iconRight={ <ChevronRight /> }
                key={ theme.id }
                variant="primaryInverted"
              >
                { theme.name }
              </Button>
            )) }
          </ButtonsLayout>
        </>
      ) }
    </DefaultLayout>
  )
}

export default TeamSettingsListPage
