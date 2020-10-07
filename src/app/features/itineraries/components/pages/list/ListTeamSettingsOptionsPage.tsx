import React, { useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"

import { ChevronRight } from "@datapunt/asc-assets"
import { Button } from "@datapunt/asc-ui"

import { useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import Greeting from "app/features/shared/components/atoms/Greeting/Greeting"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"

const ButtonsColumn = styled.div`
  display: flex;
  flex-direction: column;
  
  > :not(:last-child) {
    margin-bottom: 20px; /* TODO Use theme */
  }
`

const ListTeamSettingsOptionsPage: React.FC<RouteComponentProps> = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()

  const shouldRedirect = loggedInUser?.team_settings && loggedInUser?.team_settings.length > 0

  useEffect(() => {
    if (shouldRedirect) {
      navigate(to("/lijst/nieuw/"))
    }
  }, [ shouldRedirect, loggedInUser ])

  return <DefaultLayout>
    { data && data.length > 0 && (
      <>
        <Spacing pb={ 6 }>
          <p>
            <Greeting />{ " " }
            <strong>{ loggedInUser?.first_name }</strong>,
            welke zaken wil je vandaag in je looplijst?
          </p>
        </Spacing>
        <ButtonsColumn>
          { data.map(teamSettings => (
            <Button as="a" href={ to("/lijst/nieuw/:teamSettingsId/", { teamSettingsId: teamSettings.id }) }
                    iconRight={ <ChevronRight /> } key={ teamSettings.id } variant="primaryInverted">
              { teamSettings.name }
            </Button>
          )) }
        </ButtonsColumn>
      </>
    ) }
  </DefaultLayout>
}

export default ListTeamSettingsOptionsPage
