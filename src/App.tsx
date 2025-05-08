/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react"
import { Button } from "@amsterdam/asc-ui"
import { BrowserRouter } from "react-router-dom"
import { useAuth, hasAuthParams } from "react-oidc-context"
import Router from "./app/features/shared/routing/Router"
import ApiProvider from "./app/state/rest/provider/ApiProvider"
import AnonymousProvider from "./app/state/anonymous/AnonymousProvider"
import Anonymous from "./app/state/anonymous/Anonymous"
import NoteWizardProvider from "./app/features/visits/components/organisms/NoteWizard/NoteWizardProvider"
import SearchFormProvider from "./app/features/shared/components/organisms/SearchForm/SearchFormProvider"
import ErrorProvider from "./app/state/error/ErrorProvider"
import { LoadingScreen, FullScreenWrapper } from "./app/features/login/pages/LoadingScreen"

const App = () => {
  const auth = useAuth()
  const [hasTriedSignin, setHasTriedSignin] = useState(false)

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      const currentUrl = new URL(window.location.href)
      const fullPathWithQuery = `${ currentUrl.pathname }${ currentUrl.search }`

      auth.signinRedirect({        
        url_state: fullPathWithQuery 
      })
      setHasTriedSignin(true)
    }
  }, [auth, hasTriedSignin])

  if (auth.isLoading) {
    return <LoadingScreen/>
  }

  if (auth.error) {
    // TODO add a button to retry
    return (
      <FullScreenWrapper>
        Oops... {auth.error.message}
        <Button variant="primary" onClick={ () => location.href = "/" } style={{ marginTop: 24 }}>Probeer opnieuw</Button>
      </FullScreenWrapper>
    )
  }

  if (!auth.isAuthenticated) {
    return <FullScreenWrapper>Sorry, het is niet gelukt om in te loggen.</FullScreenWrapper>
  }
  
  return (
    <BrowserRouter>
      <ErrorProvider>
        <ApiProvider>
          <AnonymousProvider>
            <NoteWizardProvider>
              <SearchFormProvider>
                <Anonymous />
                <Router />
                <div id="modal-root" />
              </SearchFormProvider>
            </NoteWizardProvider>
          </AnonymousProvider>
        </ApiProvider>
      </ErrorProvider>
    </BrowserRouter>
  )
}

export default App
