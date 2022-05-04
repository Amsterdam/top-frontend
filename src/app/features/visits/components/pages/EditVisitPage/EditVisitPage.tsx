import React, { useMemo } from "react"
import { useParams } from "@reach/router"
import { useVisit } from "app/state/rest"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import NoteWizard from "app/features/visits/components/organisms/NoteWizard/NoteWizard"
import NoteWizardModal from "app/features/visits/components/organisms/NoteWizard/NoteWizardModal"
import { mapInitialValues } from "app/features/visits/components/organisms/NoteWizard/utils/mapValues"

const EditVisitPage: React.FC = () => {
  const { itineraryId, caseId, id } = useParams()
  const { data, execPut, isBusy } = useVisit(id)

  const valuesFromApi = useMemo(() => data ? mapInitialValues(data) : undefined, [ data ])

  return (
    <NoteWizardModal itineraryId={ itineraryId }>
      { isBusy ? (
        <CenteredSpinner explanation="Bezoek ophalen…" size={ 60 } />
      ) : (
        <NoteWizard
          onSubmit={ execPut }
          itineraryId={ itineraryId }
          caseId={ caseId }
          visitId={ id }
          valuesFromApi={ valuesFromApi }
        />
      )}
    </NoteWizardModal>
  )
}

export default EditVisitPage
