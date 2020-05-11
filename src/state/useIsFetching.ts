import useGlobalState from "../hooks/useGlobalState"

export const useIsFetching = () => {
  const {
    itineraries: {
      isFetching: isFetchingItineraries
    },
    planningSettings: {
      isFetching: isFetchingPlanningSettings
    },
    users: {
      isFetching: isFetchingUsers
    },
    search: {
      isFetching: isFetchingSearch
    }
  } = useGlobalState()

  return isFetchingItineraries || isFetchingPlanningSettings || isFetchingUsers || isFetchingSearch
}
