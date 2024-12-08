import React from "react"
import { Alert, Heading, Paragraph } from "@amsterdam/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import { useIsAuthorized } from "app/state/rest"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import { useDecodedToken } from "app/state/auth/oidc/useDecodedToken"

const AuthPage: React.FC = () => {
  const { data } = useIsAuthorized()
  const decodedToken = useDecodedToken()
  const showUnauthorized = data?.isAuthorized === false

  const values = {
    "Voornaam": decodedToken?.given_name ?? "–",
    "Achternaam": decodedToken?.family_name ?? "–",
    "E-mail": decodedToken?.unique_name ?? "–"
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
          De juiste rollen worden dan toegevoegd aan je ADW-account.
        </Paragraph>
      </>
      }
      <Heading forwardedAs="h2">Micrososft Entra-ID account</Heading>
      <DefinitionList values={ values } />
    </DefaultLayout>
  )
}

export default AuthPage
