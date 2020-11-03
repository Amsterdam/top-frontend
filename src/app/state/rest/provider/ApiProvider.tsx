import React from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>
export const ApiContext = React.createContext<GroupedContext>({
  itineraries: noopContext,
  case: noopContext,
  users: noopContext,
  settings: noopContext,
  constants: noopContext,
  permits: noopContext,
  teamSettings: noopContext,
  teamSettingsList: noopContext,
  postCodeRanges: noopContext
})

const ApiProvider: React.FC = ({ children }) => {
  const value: GroupedContext = {
    itineraries: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    case: {
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
    teamSettings: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    teamSettingsList: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    postCodeRanges: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    constants: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    permits: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return <ApiContext.Provider value={value}>
    {children}
  </ApiContext.Provider>
}

export default ApiProvider
