import React from "react"

import { ApiCache, useApiCache } from "../hooks/useApiCache"
import { RequestQueue, useRequestQueue } from "../hooks/useRequestQueue"
import { noopContext } from "./noopContext"

import { ApiGroup } from "../index"

type GroupedContext = Record<ApiGroup, ApiCache & RequestQueue>

export const ApiContext = React.createContext<GroupedContext>({
  auth: noopContext,
  case: noopContext,
  daySettings: noopContext,
  decos: noopContext,
  itineraries: noopContext,
  meldingen: noopContext,
  permits: noopContext,
  postCodeRangesPresets: noopContext,
  settings: noopContext,
  teamSettings: noopContext,
  themes: noopContext,
  users: noopContext
})

const ApiProvider: React.FC = ({ children }) => {
  const value: GroupedContext = {
    auth: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    case: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    daySettings: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    decos: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    itineraries: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    meldingen: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    permits: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    postCodeRangesPresets: {
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
    themes: {
      ...useApiCache(),
      ...useRequestQueue()
    },
    users: {
      ...useApiCache(),
      ...useRequestQueue()
    }
  }

  return <ApiContext.Provider value={ value }>
    { children }
  </ApiContext.Provider>
}

export default ApiProvider
