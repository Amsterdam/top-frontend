import React, { useEffect } from "react"
import { useFormState } from "react-final-form"

import useIsMounted from "app/features/shared/hooks/useIsMounted/useIsMounted"

import { useNoteWizard } from "../hooks/useNoteWizard"
import { FormValues } from "../types"

type Props = {
  caseID: string
}

/**
 * Saves form values to Context onUnmount
 */
const NoteWizardManager: React.FC<Props> = ({ caseID }) => {
  const { values } = useFormState<FormValues>()
  const { setValues } = useNoteWizard(caseID)
  const isMounted = useIsMounted()

  // onUnmount, setValues to state
  useEffect(() => () => { if (!isMounted.current) { setValues(values) } }, [ setValues, values, isMounted ])

  return null
}

export default NoteWizardManager
