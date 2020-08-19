import WizardPage from "./components/pages/WizardPage"

export default {
  "/visit/:itineraryId/:caseId": WizardPage,
  "/visit/:itineraryId/:caseId/:id": WizardPage
}
