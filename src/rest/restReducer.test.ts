import {
  createClear,
  createSetDetail, createSetError,
  createSetIsFetching,
  createSetIsUpdating,
  createSetList,
  createUpdateDetail,
  restReducer,
  State
} from "./restReducer"

type Pet = {
  name: string
  type: string
  age: number
}

type PetList = Pick<Pet, 'name' | 'type'>[]

describe('restReducer', () => {
  const initialState:State<Pet, PetList> = {
    isFetching: false,
    isUpdating: false,
    error: undefined,
    detail: undefined,
    list: []
  }

  it('should set isFetching', () => {
    const state = restReducer(initialState, createSetIsFetching(true))
    expect(state.isFetching).toEqual(true)
  })

  it('should set isUpdating', () => {
      const state = restReducer<Pet, PetList>(initialState, createSetIsUpdating(true))
      expect(state.isUpdating).toEqual(true)
  })

  it('should set error', () => {
    const error = { status: 403, message: 'Je hebt geen toegang tot het dierenbestand' }
    const state = restReducer<Pet, PetList>(initialState, createSetError(error))
    expect(state.error).toEqual(error)
  })

  it('should set detail', () => {
    const pet:Pet = { age: 10, name: 'Fifi', type: 'dog' }
    const state = restReducer<Pet, PetList>(initialState, createSetDetail(pet))
    expect(state.detail).toEqual(pet)
  })

  it('should update detail', () => {
    let state = initialState
    const pet:Pet = { age: 10, name: 'Fifi', type: 'dog' }

    state = restReducer<Pet, PetList>(state, createSetDetail(pet))
    state = restReducer<Pet, PetList>(state, createUpdateDetail({ age: 11 }))

    expect(state.detail?.age).toEqual(11)
  })

  it('should set list', () => {
    const petList:PetList = [
      { name: 'Fifi', type: 'dog' },
      { name: 'Milo', type: 'cat' },
    ]
    const state = restReducer<Pet, PetList>(initialState, createSetList(petList))
    expect(state.list).toEqual(petList)
  })

  it('should clear state', () => {
    let state = initialState

    // Alter state:
    state  = restReducer<Pet, PetList>(state, createSetIsFetching(true))
    state  = restReducer<Pet, PetList>(state, createSetIsUpdating(true))

    // Clear state:
    state  = restReducer<Pet, PetList>(state, createClear(initialState))

    // Expect state to be equal to initial state:
    expect(state).toEqual(initialState)
  })
})
