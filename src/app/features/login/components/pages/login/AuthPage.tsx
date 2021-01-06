import React from "react"
import { Alert, Heading, Paragraph } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import useKeycloak from "app/state/auth/keycloak/useKeycloak"
import { useIsAuthorized } from "app/state/rest/"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"

const AuthPage: React.FC = () => {
  const keycloak = useKeycloak()
  const { data } = useIsAuthorized()
  const showUnauthorized = data?.isAuthorized === false

  const values = {
    Naam: keycloak.tokenParsed?.name ?? "–",
    "E-mail": keycloak.tokenParsed?.email ?? "–",
    Gebruikersnaam: keycloak.tokenParsed?.preferred_username ?? "–",
    Groepen: keycloak.realmAccess?.roles.join(", ") ?? "–"
  }

  return (
    <DefaultLayout>
      { showUnauthorized &&
      <>
        <Spacing pb={ 4 }>
          <Alert level="error">
            <Paragraph>
              Helaas, je hebt geen toegang.
            </Paragraph>
          </Alert>
        </Spacing>
        <Paragraph>
          ‘Toezicht op pad’ is een applicatie voor toezichthouders van de afdeling Wonen.
          Je bent op dit moment niet geautoriseerd om deze applicatie te gebruiken.
        </Paragraph>
        <Paragraph>
          Neem contact op met je teamleider of de afdeling Wonen om na te gaan of je toegang kunt krijgen.
          De juiste Keycloak-groepen worden dan toegevoegd aan je ADW-account.
        </Paragraph>
      </>
      }
      <Heading forwardedAs="h2">Keycloak-account</Heading>
      <DefinitionList values={ values } />
    </DefaultLayout>
  )
}

export default AuthPage
