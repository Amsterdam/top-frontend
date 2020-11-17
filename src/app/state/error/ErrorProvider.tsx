import React, { createContext, useCallback, useState } from "react"

type Severity = "MESSAGE" | "WARNING" | "ERROR"

type Context = {
  error?: string
  severity?: Severity
  setError: (string?: string, severity?: Severity) => void
  clearError: () => void
}

export const ErrorContext = createContext<Context>({
  error: undefined,
  severity: undefined,
  setError: (string?: string, severity?: Severity) => {},
  clearError: () => {}
})

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setErrorMessage] = useState<string|undefined>(undefined)
  const [severity, setSeverity] = useState<Severity|undefined>(undefined)
  const setError = (string?: string, severity?: Severity) => {
    setErrorMessage(string)
    setSeverity(sevirity)
  }
  
  const clearError = useCallback(() => setError(undefined), [ setError ])

  return (
    <ErrorContext.Provider value={{ error, severity, setError, clearError }}>
      { children }
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
