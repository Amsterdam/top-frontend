import WizardPage from "./components/pages/WizardPage"
import NotePage from "./components/pages/NotePage"

export default {
  "/visit/:itineraryId/:caseId": WizardPage,
  "/lijst/:itineraryId/notities/:itineraryItemId/nieuw": NotePage,
  "/lijst/:itineraryId/notities/:itineraryItemId/:noteId": NotePage
}

