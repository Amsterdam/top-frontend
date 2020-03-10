import moveInArray from "../lib/utils/moveInArray"

type Action =
  | { type: "START_FETCHING" }
  | { type: "STOP_FETCHING" }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "INITIALIZE", payload: { itineraries: Itineraries } }
  | { type: "ADD", payload: { itineraries: Itineraries } }
  | { type: "UPDATE", payload: { id: Id, itinerary: Itinerary } }
  | { type: "MOVE", payload: { index: Index, newIndex: Index } }
  | { type: "REMOVE", payload: { id: Id } }
  | { type: "SET_NOTE", payload: { id: Id, noteId: Id, note: string } }
  | { type: "SET_SUGGESTIONS", payload: { suggestions: BWVData[] } }
  | { type: "CLEAR" }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createStopFetching = () : Action => ({ type: "STOP_FETCHING" })
export const createSetErrorMessage = (errorMessage: string) : Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })
export const createInitialize = (itineraries: Itineraries) : Action => ({ type: "INITIALIZE", payload: { itineraries } })
export const createAdd = (itineraries: Itineraries) : Action => ({ type: "ADD", payload: { itineraries } })
export const createUpdate = (id: Id, itinerary: Itinerary) : Action => ({ type: "UPDATE", payload: { id, itinerary } })
export const createMove = (index: Index, newIndex: Index) : Action => ({ type: "MOVE", payload: { index, newIndex } })
export const createRemove = (id: Id) : Action => ({ type: "REMOVE", payload: { id } })
export const createSetNote = (id: Id, noteId: Id, note: string) : Action => ({ type: "SET_NOTE", payload: { id, noteId, note } })
export const createSetSuggestions = (suggestions: BWVData[]) : Action => ({ type: "SET_SUGGESTIONS", payload: { suggestions } })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: ItinerariesState = {
  isInitialized: false,
  isFetching: false,
  errorMessage: undefined,
  itineraries: [],
  suggestions: []
}

const reducer = (state: ItinerariesState, action: Action) : ItinerariesState => {
  switch (action.type) {
    case "START_FETCHING": {
      return { ...state, isFetching: true, errorMessage: undefined }
    }
    case "STOP_FETCHING": {
      return { ...state, isFetching: false }
    }
    case "SET_ERROR_MESSAGE": {
      const { errorMessage } = action.payload
      return { ...state, isFetching: false, errorMessage }
    }
    case "INITIALIZE": {
      const { itineraries } = action.payload
      return { ...state, isInitialized: true, isFetching: false, itineraries }
    }
    case "ADD": {
      const { itineraries: prevItineraries } = state
      const { itineraries } = action.payload
      return { ...state, itineraries: prevItineraries.concat(itineraries) }
    }
    case "UPDATE": {
      const { itineraries: prevItineraries } = state
      const index = prevItineraries.findIndex(itinerary => itinerary.id === action.payload.id)
      const itineraries = [...prevItineraries]
      itineraries[index] = action.payload.itinerary
      return { ...state, itineraries }
    }
    case "MOVE": {
      const { itineraries: prevItineraries } = state
      const { index, newIndex } = action.payload
      const itineraries = moveInArray(prevItineraries, index, newIndex)
      return { ...state, itineraries }
    }
    case "REMOVE": {
      const { itineraries: prevItineraries } = state
      const { id } = action.payload
      const itineraries = prevItineraries.filter(itinerary => itinerary.id !== id)
      return { ...state, itineraries }
    }
    case "SET_NOTE": {
      const { itineraries: prevItineraries } = state
      const { id, noteId, note } = action.payload
      const index = prevItineraries.findIndex(itinerary => itinerary.id === id)
      const itineraries = [...prevItineraries]
      if (note !== "") {
        itineraries[index].notes[0] = { id: noteId, itinerary_item: id, text: note }
      } else {
        itineraries[index].notes = []
      }
      return { ...state, itineraries }
    }
    case "SET_SUGGESTIONS": {
      const isFetching = false
      const { suggestions } = action.payload
      return { ...state, isFetching, suggestions }
    }
    case "CLEAR": {
      return { ...state, isInitialized: false, itineraries: [] }
    }
    default:
      return state
  }
}

export default reducer
