import React, { createContext, useCallback, useState } from "react"

export const AnonymousContext = createContext({
  isAnonymous: false,
  toggleAnonymous: () => {} }
)

const AnonymousProvider: React.FC = ({ children }) => {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleAnonymous = useCallback(() => setIsAnonymous(!isAnonymous), [setIsAnonymous, isAnonymous])
  return (
    <AnonymousContext.Provider value={{ isAnonymous, toggleAnonymous }}>
      { children }
    </AnonymousContext.Provider>
  )
}

export default AnonymousProvider
