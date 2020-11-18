import React, { createContext, useCallback, useState } from "react"

type Severity = "INFO" | "WARNING" | "ERROR" | "CLEARED"

type Context = {
  message?: string
  severity?: Severity
  setError: (message?: string, severity?: Severity) => void
  clearError: () => void
}

export const ErrorContext = createContext<Context>({
  message: undefined,
  severity: "INFO",
  setError: (message, severity) => {},
  clearError: () => {}
})

const ErrorProvider: React.FC = ({ children }) => {
  const [ message, setMessage ] = useState<string | undefined>(undefined)
  const [ severity, setSeverity ] = useState<Severity | undefined>(undefined)

  const setError = (message?: string, severity?: Severity) => {
    setMessage(message)
    setSeverity(severity)
  }

  const clearError = useCallback(() => setError(undefined, "CLEARED"), [])

  return (
    <ErrorContext.Provider value={ { message, severity, setError, clearError } }>
      { children }
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
