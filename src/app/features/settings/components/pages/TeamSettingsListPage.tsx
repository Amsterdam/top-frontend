import React from "react"
import styled from "styled-components"

import { useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

import { ChevronRight } from "@datapunt/asc-assets"
import { Button } from "@datapunt/asc-ui"

import Greeting from "app/features/shared/components/atoms/Greeting/Greeting";
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

const TeamSettingsListPage: React.FC = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()

  return <DefaultLayout>
    { data && data.length > 0 && (
      <>
        <Spacing pb={ 6 }>
          <p>
            <Greeting />{ " " }
            <strong>{ loggedInUser?.first_name }</strong>,
            voor welk team wil je het genereren van de looplijsten configureren?
          </p>
        </Spacing>
        <ButtonsColumn>
          { data.map(teamSettings => (
            <Button as="a" href={ to("/team-settings/:teamSettingsId", { teamSettingsId: teamSettings.id }) }
                    iconRight={ <ChevronRight /> } key={ teamSettings.id } variant="primaryInverted">
              { teamSettings.name }
            </Button>
          )) }
        </ButtonsColumn>
      </>
    ) }
  </DefaultLayout>
}

export default TeamSettingsListPage
