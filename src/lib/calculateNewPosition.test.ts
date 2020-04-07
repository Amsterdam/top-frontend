import calculateNewPosition from "./calculateNewPosition"

it("equal indices", () => {
  const items = [
    { position: 5 },
    { position: 10 }
  ]
  const position = calculateNewPosition(items, 1, 1)
  expect(position).toBe(10)
})

it("first", () => {
  const items = [
    { position: 5 },
    { position: 10 }
  ]
  const position = calculateNewPosition(items, 1, 0)
  expect(position).toBe(2.5)
})

it("last", () => {
  const items = [
    { position: 5 },
    { position: 10 }
  ]
  const position = calculateNewPosition(items, 0, 1)
  expect(position).toBe(20)
})

it("forwards", () => {
  const items = [
    { position: 5 },
    { position: 10 },
    { position: 15 },
    { position: 20 }
  ]
  const position = calculateNewPosition(items, 2, 1)
  expect(position).toBe(7.5)
})

it("backwards", () => {
  const items = [
    { position: 5 },
    { position: 10 },
    { position: 15 },
    { position: 20 }
  ]
  const position = calculateNewPosition(items, 0, 2)
  expect(position).toBe(17.5)
})
