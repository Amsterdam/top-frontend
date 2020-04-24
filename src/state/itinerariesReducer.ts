import produce from "immer"
import moveInArray from "../lib/utils/moveInArray"

type Action =
  | { type: "START_FETCHING" }
  | { type: "STOP_FETCHING" }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "INITIALIZE", payload: { itineraries: Itineraries } }
  | { type: "CREATE_ITINERARY", payload: { itinerary: Itinerary } }
  | { type: "REMOVE_ITINERARY", payload: { id: Id } }
  | { type: "UPDATE_ITINERARY_TEAM", payload: { id: Id, teamMembers: TeamMembers } }
  | { type: "ADD", payload: { id: Id, itineraryItems: ItineraryItems } }
  | { type: "UPDATE", payload: { id: Id, itinerary: ItineraryItem } }
  | { type: "MOVE", payload: { id: Id, index: Index, newIndex: Index } }
  | { type: "REMOVE", payload: { id: Id } }
  | { type: "SET_NOTE", payload: { id: Id, noteId: Id, text: string, author?: User } }
  | { type: "SET_CHECKED", payload: { id: Id, checked: boolean } }
  | { type: "CLEAR" }

export const createStartFetching = (): Action => ({ type: "START_FETCHING" })
export const createStopFetching = (): Action => ({ type: "STOP_FETCHING" })
export const createSetErrorMessage = (errorMessage: string): Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })

export const createInitialize = (itineraries: Itineraries): Action => ({ type: "INITIALIZE", payload: { itineraries } })
export const createCreateItinerary = (itinerary: Itinerary): Action => ({ type: "CREATE_ITINERARY", payload: { itinerary } })
export const createRemoveItinerary = (id: Id): Action => ({ type: "REMOVE_ITINERARY", payload: { id } })
export const createUpdateTeam = (id: Id, teamMembers: TeamMembers): Action => ({ type: "UPDATE_ITINERARY_TEAM", payload: { id, teamMembers } })

export const createAdd = (id: Id, itineraryItems: ItineraryItems): Action => ({ type: "ADD", payload: { id, itineraryItems } })
export const createUpdate = (id: Id, itinerary: ItineraryItem): Action => ({ type: "UPDATE", payload: { id, itinerary } })
export const createMove = (id: Id, index: Index, newIndex: Index): Action => ({ type: "MOVE", payload: { id, index, newIndex } })
export const createRemove = (id: Id): Action => ({ type: "REMOVE", payload: { id } })
export const createSetNote = (id: Id, noteId: Id, text: string, author?: User): Action => ({ type: "SET_NOTE", payload: { id, noteId, text, author } })
export const createSetChecked = (id: Id, checked: boolean): Action => ({ type: "SET_CHECKED", payload: { id, checked } })

export const createClear = (): Action => ({ type: "CLEAR" })

export const initialState: ItinerariesState = {
  isInitialized: false,
  isFetching: false,
  errorMessage: undefined,
  itineraries: []
}

// @TODO:
// Find a better solution to remove the many findIndex calls
// Current data structure in this reducer is: itineraries > hasMany > itinerary-items > hasMany > notes

const reducer = (state: ItinerariesState, action: Action): ItinerariesState => {
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

    // Itinerary
    case "CREATE_ITINERARY": {
      const { itinerary } = action.payload
      const { itineraries } = state
      const nextItineraries = produce(itineraries, draft => {
        draft.push(itinerary)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "REMOVE_ITINERARY": {
      const { id } = action.payload
      const { itineraries } = state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries.findIndex(itinerary => itinerary.id === id)
        if (index > -1) draft.splice(index, 1)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "UPDATE_ITINERARY_TEAM": {
      const { id, teamMembers } = action.payload
      const { itineraries } = state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries.findIndex(itinerary => itinerary.id === id)
        if (index > -1) draft[index].team_members = teamMembers
      })
      return { ...state, itineraries: nextItineraries }
    }

    // Itinerary items
    case "ADD": {
      const { id, itineraryItems } = action.payload
      const { itineraries } = state
      const index = itineraries.findIndex(itinerary => itinerary.id === id)
      if (index === -1) return state
      const nextItineraries = produce(itineraries, draft => {
        draft[index].items = itineraryItems.concat(draft[index].items)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "UPDATE": {
      const { id, itinerary: { position } } = action.payload
      const { itineraries } = state
      const itinerariesIndex = itineraries.findIndex(itinerary => itinerary.items.map(({ id }) => id).includes(id))
      if (itinerariesIndex === -1) return state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries[itinerariesIndex].items.findIndex(item => item.id === id)
        if (index > -1) draft[itinerariesIndex].items[index].position = position
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "MOVE": {
      const { id, index, newIndex } = action.payload
      const { itineraries } = state
      const itinerariesIndex = itineraries.findIndex(itinerary => itinerary.id === id)
      if (itinerariesIndex === -1) return state
      const nextItineraries = produce(itineraries, draft => {
        draft[itinerariesIndex].items = moveInArray(itineraries[itinerariesIndex].items, index, newIndex)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "REMOVE": {
      const { id } = action.payload
      const { itineraries } = state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries.findIndex(({ items }) => items.find(item => item.id === id) !== undefined)
        if (index > -1) draft[index].items = draft[index].items.filter(item => item.id !== id)
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "SET_NOTE": {
      const { itineraries } = state
      const { id, noteId, text, author } = action.payload
      const itinerariesIndex = itineraries.findIndex(itinerary => itinerary.items.map(({ id }) => id).includes(id))
      if (itinerariesIndex === -1) return state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries[itinerariesIndex].items.findIndex(item => item.id === id)
        if (text !== "" && author !== undefined) {
          const noteIndex = itineraries[itinerariesIndex].items[index].notes.findIndex(note => note.id === noteId)
          if (noteIndex === -1) {
            // add new note
            draft[itinerariesIndex].items[index].notes.push({ id: noteId, itinerary_item: id, text, author })
          } else {
            // update note
            draft[itinerariesIndex].items[index].notes[noteIndex] = { id: noteId, itinerary_item: id, text, author }
          }
        } else {
          // delete note
          draft[itinerariesIndex].items[index].notes = itineraries[itinerariesIndex].items[index].notes.filter(note => note.id !== noteId)
        }
      })
      return { ...state, itineraries: nextItineraries }
    }
    case "SET_CHECKED": {
      const { id, checked } = action.payload
      const { itineraries } = state
      const itinerariesIndex = itineraries.findIndex(itinerary => itinerary.items.map(({ id }) => id).includes(id))
      if (itinerariesIndex === -1) return state
      const nextItineraries = produce(itineraries, draft => {
        const index = itineraries[itinerariesIndex].items.findIndex(item => item.id === id)
        if (index > -1) draft[itinerariesIndex].items[index].checked = checked
      })
      return { ...state, itineraries: nextItineraries }
    }

    case "CLEAR": {
      return initialState
    }

    default:
      return state
  }
}

export default reducer
