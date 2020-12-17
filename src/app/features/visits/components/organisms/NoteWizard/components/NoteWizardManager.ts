import React, { useEffect } from "react"
import { useFormState } from "react-final-form"

import { useNoteWizard } from "../hooks/useNoteWizard"
import { FormValues } from "app/features/visits/components/organisms/NoteWizard/types"

type Props = {
  caseID: string
}

/**
 * Saves form values to Context onUnmount
 */
const NoteWizardManager: React.FC<Props> = ({ caseID }) => {
  const { values } = useFormState<FormValues>()
  const { setValues } = useNoteWizard(caseID)

  // Save changes to Provider
  useEffect(() => { if (Object.keys(values).length > 0) { setValues(values) } }, [ setValues, values ])

  return null
}

export default NoteWizardManager
