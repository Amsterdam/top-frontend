import moveInArray from "../lib/utils/moveInArray"
import produce from "immer"

type Action =
  | { type: "START_FETCHING" }
  | { type: "STOP_FETCHING" }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "INITIALIZE", payload: { itineraries: Itineraries } }
  | { type: "ADD", payload: { itineraryItems: ItineraryItems } }
  | { type: "UPDATE", payload: { id: Id, itinerary: ItineraryItem } }
  | { type: "UPDATE_TEAM", payload: { id: Id, teamMembers: TeamMembers } }
  | { type: "MOVE", payload: { index: Index, newIndex: Index } }
  | { type: "REMOVE", payload: { id: Id } }
  | { type: "SET_NOTE", payload: { id: Id, noteId: Id, note: string } }
  | { type: "SET_SUGGESTIONS", payload: { suggestions: BWVData[] } }
  | { type: "CLEAR" }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createStopFetching = () : Action => ({ type: "STOP_FETCHING" })
export const createSetErrorMessage = (errorMessage: string) : Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })
export const createInitialize = (itineraries: Itineraries) : Action => ({ type: "INITIALIZE", payload: { itineraries } })
export const createAdd = (itineraryItems: ItineraryItems) : Action => ({ type: "ADD", payload: { itineraryItems } })
export const createUpdate = (id: Id, itinerary: ItineraryItem) : Action => ({ type: "UPDATE", payload: { id, itinerary } })
export const createUpdateTeam = (id: Id, teamMembers: TeamMembers) : Action => ({ type: "UPDATE_TEAM", payload: { id, teamMembers } })
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
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { itineraryItems } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        draft[0].items = draft[0].items.concat(itineraryItems)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "UPDATE": {
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { id, itinerary: { position } } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries[0].items.findIndex(item => item.id === id)
        if (index > -1) itineraries[0].items[index].position = position
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "UPDATE_TEAM": {
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { teamMembers } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        itineraries[0].team_members = teamMembers
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "MOVE": {
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { index, newIndex } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        itineraries[0].items = moveInArray(itineraries[0].items, index, newIndex)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "REMOVE": {
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { id } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        draft[0].items = draft[0].items.filter(item => item.id !== id)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "SET_NOTE": {
      const { itineraries } = state
      if (itineraries[0] === undefined) return state
      const { id, noteId, note } = action.payload
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries[0].items.findIndex(item => item.id === id)
        if (note !== "") {
          itineraries[0].items[index].notes[0] = { id: noteId, itinerary_item: id, text: note }
        } else {
          itineraries[0].items[index].notes = []
        }
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "SET_SUGGESTIONS": {
      const isFetching = false
      const { suggestions } = action.payload
      return { ...state, isFetching, suggestions }
    }
    case "CLEAR": {
      return initialState
    }
    default:
      return state
  }
}

export default reducer
