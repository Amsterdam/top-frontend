import React, { createContext, useCallback, useState } from "react"

type Context = {
  error?: string
  setError: (string?: string) => void
  clearError: () => void
}

export const ErrorContext = createContext<Context>({
  error: undefined,
  setError: (string?: string) => {},
  clearError: () => {}
})

const ErrorProvider: React.FC = ({ children }) => {
  const [ error, setError ] = useState<string | undefined>(undefined)
  const clearError = useCallback(() => setError(undefined), [ setError ])

  return (
    <ErrorContext.Provider value={ { error, setError, clearError } }>
      { children }
    </ErrorContext.Provider>
  )
}

export default ErrorProvider
