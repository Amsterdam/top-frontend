import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createInitialize,
  createCreateItinerary,
  createRemoveItinerary,
  createSetErrorMessage,
  createAdd,
  createUpdate,
  createUpdateTeam,
  createMove,
  createRemove,
  createSetNote,
  createClear, createSetChecked
} from "./itinerariesReducer"
import { get, post, put, patch, del, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import calculateNewPosition from "../lib/calculateNewPosition"
import currentDate from "../lib/utils/currentDate"
import { navigateToHome } from "../lib/navigateTo"

const useItineraries = () : [ItinerariesState, ItinerariesActions, ItinerariesSelectors] => {
  // @TODO: Remove `as never`
  const [state, dispatch] = useReducer(reducer, initialState as never)

  // -----------------------------------------
  // Actions:
  // -----------------------------------------

  // @TODO: Split the actions between itineraries and itinerary-items

  const initialize = async () => {
    const url = getUrl("itineraries", { created_at: currentDate() })
    dispatch(createStartFetching())
    const [response, result] = await get(url)
    if (isForbidden(response)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }
    if (notOk(response)) {
      const errorMessage = response ? await response.body() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    const { itineraries } = result
    dispatch(createInitialize(itineraries))
  }

  // @TODO: Add type for settings parameter
  const create = async (settings: any, users: UUIDs, num: number, selfIncluded: boolean) => {
    const url = getUrl("itineraries")
    dispatch(createStartFetching())
    const body = {
      created_at: currentDate(),
      team_members: users.map(user => ({ user: { id: user } })),
      settings: {
        start_case: {
          case_id: settings.startAddressCaseId
        },
        opening_date: settings.opening_date,
        target_length: num,
        projects: settings.projects.map((item: string) => ({ name: item })),
        primary_stadium: settings.lists.primary_stadium ? { name: settings.lists.primary_stadium } : undefined,
        secondary_stadia: settings.lists.secondary_stadia ? settings.lists.secondary_stadia.map((stadium: Stadium) => ({ name: stadium })) : undefined,
        exclude_stadia: settings.lists.exclude_stadia ? settings.lists.exclude_stadia.map((stadium: Stadium) => ({ name: stadium })) : undefined
      }
    }
    const [response, result] = await post(url, body)
    dispatch(createStopFetching())
    if (isForbidden(response)) {
      return handleForbiddenResponse()
    }
    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    if (selfIncluded) {
      dispatch(createCreateItinerary(result))
    } else {
      alert("Looplijst succesvol gegenereerd")
    }
    navigateToHome()
  }

  const updateTeam = async (id: Id, users: UUIDs, remove = false) => {
    const url = getUrl(`itineraries/${ id }/team`)
    const body = { team_members: users.map(id => ({ user: { id } })) }
    const [response, result] = await put(url, body)

    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to PUT"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    if (remove === false) {
      dispatch(createUpdateTeam(id, result.team_members))
    } else {
      dispatch(createRemoveItinerary(id))
      navigateToHome()
    }
  }

  const del2 = async (id: Id) => {
    dispatch(createStartFetching())
    const url = getUrl(`itineraries/${ id }`)
    const [response] = await del(url)

    if (isForbidden(response)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }
    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    const itineraries = state.itineraries.filter(itinerary => itinerary.id !== id)
    dispatch(createInitialize(itineraries))
    navigateToHome()
  }

  const add = async (id: Id, caseId: CaseId) => {
    dispatch(createStartFetching())
    const url = getUrl("itinerary-items")
    const [response, result] = await post(url, { itinerary: id, case_id: caseId })
    dispatch(createStopFetching())
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert(`Toevoegen mislukt (case: ${ caseId })`)
    const itinerary = result as ItineraryItem
    const itineraries = [itinerary]
    dispatch(createAdd(id, itineraries))
  }

  const move = (id: Id, index: Index, newIndex: Index) => {
    const patchPosition = async (id: Id, position: ItineraryPosition) => {
      const url = getUrl(`itinerary-items/${ id }`)
      const [response, result] = await patch(url, { position })
      if (isForbidden(response)) return handleForbiddenResponse()
      if (notOk(response)) return alert("Verplaatsen mislukt")
      const itinerary = result as ItineraryItem
      dispatch(createUpdate(id, itinerary))
    }

    const { itineraries } = state
    const itinerary = itineraries.find(itinerary => itinerary.id === id)
    if (itinerary === undefined) return
    const { items } = itinerary
    const position = calculateNewPosition(items, index, newIndex)
    const itineraryItemId = items[index].id
    dispatch(createMove(id, index, newIndex))
    patchPosition(itineraryItemId, position)
  }

  const remove = async (id: Id) => {
    dispatch(createStartFetching())
    const url = getUrl(`itinerary-items/${ id }`)
    const [response] = await del(url)
    dispatch(createStopFetching())
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert("Verwijderen mislukt")
    dispatch(createRemove(id))
  }

  const setNote = async (itineraryId: Id, text: string, id?: Id) => {
    const url = getUrl(`notes/${ id || "" }`)
    const method = text === "" ? del : id !== undefined ? put : post
    const body = { itinerary_item: itineraryId, text }
    const [response, result] = await method(url, body)
    if (isForbidden(response)) {
      handleForbiddenResponse()
      return false
    }
    if (notOk(response)) {
      alert("Bewaren mislukt")
      return false
    }
    if (result) {
      // create or update
      const { id, text, author } = result
      dispatch(createSetNote(itineraryId, id, text, author))
    } else {
      // delete
      dispatch(createSetNote(itineraryId, id!, text))
    }
    return true
  }

  const clear = () => dispatch(createClear())

  const setChecked = async (itemId: Id, checked:boolean) => {
    const url = getUrl(`itinerary-items/${ itemId }`)
    const [response, ] = await patch(url, { checked })
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert("Afvinken mislukt")
    dispatch(createSetChecked(itemId, checked))
  }


  // -----------------------------------------
  //  Selectors
  // -----------------------------------------

  const getItinerary = (caseId: CaseId) : OItineraryItem =>
    state.itineraries.map(({ items }) => items).flat().find(item => item.case.bwv_data.case_id === caseId)

  const hasItinerary = (caseId: CaseId) => getItinerary(caseId) !== undefined

  const getItineraryNotes = (itineraryItemId: Id, id: Id) : Notes | undefined => {
    const itineraryItem = state.itineraries.map(({ items }) => items).flat().find(({ id }) => id === itineraryItemId)
    return itineraryItem !== undefined ? itineraryItem.notes : undefined
  }

  const getItineraryFromItineraryItem = (id: Id) : OItinerary =>
    state.itineraries.find(({ items }) => items.map(({ id }) => id).includes(id))


  const actionCreators = { initialize, create, updateTeam, del: del2, add, move, remove, setNote, clear, setChecked }
  const selectors = { getItinerary, hasItinerary, getItineraryNotes, getItineraryFromItineraryItem }

  return [
    state,
    actionCreators,
    selectors
  ]
}
export default useItineraries
