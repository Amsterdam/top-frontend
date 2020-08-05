import React from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>
export const ApiContext = React.createContext<GroupedContext>({
  itineraries: noopContext,
  users: noopContext,
  settings: noopContext,
  constants: noopContext,
})

const ApiProvider: React.FC = ({ children }) => {
  const value: GroupedContext = {
    itineraries: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    users: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    settings: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    constants: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return <ApiContext.Provider value={value}>
    {children}
  </ApiContext.Provider>
}

export default ApiProvider
