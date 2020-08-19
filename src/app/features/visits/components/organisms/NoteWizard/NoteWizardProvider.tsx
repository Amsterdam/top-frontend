import React, { createContext } from "react"
import { useNoteWizardProvider } from "./hooks/useNoteWizardProvider"

const noop = () => undefined
export const NoteWizardContext = createContext<ReturnType<typeof useNoteWizardProvider>>({
  state: {},
  setValues: noop,
  getValues: noop,
  pushStep: noop,
  popStep: noop,
  clearSteps: noop,
  getCurrentStep: noop
})

const NoteWizardProvider: React.FC = ({ children }) => {
  const value = useNoteWizardProvider()
  return <NoteWizardContext.Provider value={value}>
    { children }
  </NoteWizardContext.Provider>
}

export default NoteWizardProvider
