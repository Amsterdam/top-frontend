import useGlobalState from "../hooks/useGlobalState"

export const useIsFetching = () => {
  const {
    itineraries: {
      isFetching: isFetchingItineraries
    },
    settings: {
      isFetching: isFetchingSettings
    },
    users: {
      isFetching: isFetchingUsers
    },
    search: {
      isFetching: isFetchingSearch
    }
  } = useGlobalState()

  return isFetchingItineraries || isFetchingSettings || isFetchingUsers || isFetchingSearch
}
