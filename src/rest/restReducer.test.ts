import {
  createClear,
  createSetDetail,
  createSetIsFetching,
  createSetIsUpdating,
  createSetList,
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
    detail: undefined,
    list: []
  }

  it('should set isFetching', () => {
    const state = restReducer(initialState, createSetIsFetching(true))
    expect(state).toHaveProperty('isFetching', true)
  })

  it('should set isUpdating', () => {
      const state = restReducer<Pet, PetList>(initialState, createSetIsUpdating(true))
      expect(state).toHaveProperty('isUpdating', true)
  })

  it('should set detail', () => {
    const pet:Pet = { age: 10, name: 'Fifi', type: 'dog' }
    const state = restReducer<Pet, PetList>(initialState, createSetDetail(pet))
    expect(state).toHaveProperty('detail', pet)
  })

  it('should set list', () => {
    const petList:PetList = [
      { name: 'Fifi', type: 'dog' },
      { name: 'Milo', type: 'cat' },
    ]
    const state = restReducer<Pet, PetList>(initialState, createSetList(petList))
    expect(state).toHaveProperty('list', petList)
  })

  it('should clear state', () => {
    let state = initialState

    // Alter state:
    state  = restReducer<Pet, PetList>(state, createSetIsFetching(true))
    state  = restReducer<Pet, PetList>(state, createSetIsUpdating(true))

    // Clear state:
    state  = restReducer<Pet, PetList>(initialState, createClear(initialState))

    // Expect state to be equal to initial state:
    expect(state).toEqual(initialState)
  })
})
