import React from "react"
import styled from "styled-components"
import { ChevronRight } from "@amsterdam/asc-assets"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useThemes } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import useNavigation from "app/features/shared/routing/useNavigation"
import { env } from "app/config/env"

const basePath = env.REACT_APP_BASEPATH ?? "/"

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

const ListTeamSettingsOptionsPage: React.FC = () => {
  const { data } = useThemes()
  const loggedInUser = useLoggedInUser()
  const { navigateTo } = useNavigation()

  const themes = data?.results ?? []

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
            { themes.map(theme => (
              <Button
                onClick={ () => navigateTo("/lijst/nieuw/:teamSettingsId", { teamSettingsId: theme.id }) }
                iconRight={ <ChevronRight /> }
                key={ theme.id }
                variant="primaryInverted"
              >
                { theme.name }
              </Button>
            )) }
          </Grid>
        </Illustration>
      ) }
    </DefaultLayout>
  )
}

export default ListTeamSettingsOptionsPage
