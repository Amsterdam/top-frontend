import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createInitialize,
  createSetErrorMessage,
  createAdd,
  createUpdate,
  createMove,
  createRemove,
  createSetNote,
  createSetSuggestions,
  createClear } from "./itinerariesReducer"
import { get, post, put, patch, del, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import promiseSerial from "../lib/utils/promiseSerial"
import calculateNewPosition from "../lib/calculateNewPosition"

const useItineraries = () : [ItinerariesState, ItinerariesActions] => {

  const [itinerariesState, dispatch] = useReducer(reducer, initialState as never)

  const initialize = async () => {
    const url = getUrl("itineraries")
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
    const itineraries = result.itineraries
      .map((itineraries: any) => itineraries.items)
      .flat(1) as Itineraries
    dispatch(createInitialize(itineraries))
  }

  const create = async (settings: any, users: string[], dayPart: "day" | "evening", num: number) => {
    const url = getUrl("itineraries")
    dispatch(createStartFetching())
    const body = {
      team_members: users.map(user => ({ user: { id: user } })),
      settings: {
        opening_date: "2019-01-01",
        target_itinerary_length: num,
        projects: settings.opening_reasons.map((item: string) => ({ name: item })),
        primary_stadium: settings.lists.primary_stadium ? { name: settings.lists.primary_stadium } : undefined,
        secondary_stadia: settings.lists.secondary_stadia ? settings.lists.secondary_stadia.map((stadium: Stadium) => ({ name: stadium })) : undefined,
        exclude_stadia: settings.lists.exclude_stadia ? settings.lists.exclude_stadia.map((stadium: Stadium) => ({ name: stadium })) : undefined
      }
    }
    const [response, result] = await post(url, body)
    if (isForbidden(response)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }
    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    const itineraries = result.items as Itineraries
    dispatch(createInitialize(itineraries))
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
    const itineraries = itinerariesState.itineraries.filter(itinerary => itinerary.itinerary !== id)
    dispatch(createInitialize(itineraries))
  }

  const getSuggestions = async (id: Id) => {

    dispatch(createStartFetching())

    console.log(id)
    const url = getUrl(`itineraries/${ id }/suggestions`)
    const [response, result] = await get(url)

    if (isForbidden(response)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }

    if (notOk(response)) {
      const errorMessage = response ? await response.text() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }

    const { cases: suggestions } = result
    console.log(suggestions, result)
    dispatch(createSetSuggestions(suggestions))
  }

  const add = async (id: Id, caseId: CaseId) => {
    const url = getUrl("itinerary-items")
    const [response, result] = await post(url, { itinerary: id, case_id: caseId })
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert(`Toevoegen mislukt (case: ${ caseId })`)
    const itinerary = result as Itinerary
    const itineraries = [itinerary] as Itineraries
    dispatch(createAdd(itineraries))
  }

  const addMany = async (caseIds: CaseIds) => {
    // sequentially add each case to itineraries, so order is maintained
    const funcs = caseIds.map(caseId => async () => add(0, caseId))
    await promiseSerial(funcs)
  }

  const move = (index: Index, newIndex: Index) => {

    const patchPosition = async (id: Id, position: ItineraryPosition) => {
      const url = getUrl(`itineraries/items/${ id }`)
      const [response, result] = await patch(url, { position })
      if (isForbidden(response)) return handleForbiddenResponse()
      if (notOk(response)) return alert("Verplaatsen mislukt")
      const itinerary = result as Itinerary
      dispatch(createUpdate(id, itinerary))
    }

    dispatch(createMove(index, newIndex))

    const { itineraries: items } = itinerariesState
    const position = calculateNewPosition(items, index, newIndex)
    const id = items[index].id
    patchPosition(id, position)
  }

  const remove = async (id: Id) => {
    const url = getUrl(`itineraries/items/${ id }`)
    const [response] = await del(url)
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
    const newText = result ? result.text : ""
    const noteId = result ? result.id : id
    dispatch(createSetNote(itineraryId, noteId!, newText))
    return true
  }

  const clear = () => dispatch(createClear())

  return [itinerariesState, { initialize, create, del: del2, getSuggestions, add, addMany, move, remove, setNote, clear }]
}
export default useItineraries
