import React, { createContext, useCallback, useState } from "react"
import { Severity } from "app/features/types"

type Context = {
  message?: string
  severity?: Severity
  title?: string
  setError: (message?: string, severity?: Severity, title?: string) => void
  clearError: () => void
}

export const ErrorContext = createContext<Context>({
  message: undefined,
  severity: undefined,
  title: undefined,
  setError: () => {},
  clearError: () => {}
})

const ErrorProvider: React.FC = ({ children }) => {
  const [ message, setMessage ] = useState<string | undefined>(undefined)
  const [ severity, setSeverity ] = useState<Severity | undefined>(undefined)
  const [ title, setTitle ] = useState<string | undefined>(undefined)

  const setError = (message?: string, severity?: Severity, title?: string) => {
    setMessage(message)
    setSeverity(severity)
    setTitle(title)
  }

  const clearError = useCallback(() => setError(undefined, undefined, undefined), [])

  return (
    <ErrorContext.Provider value={ { message, severity, title, setError, clearError } }>
      { children }
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
