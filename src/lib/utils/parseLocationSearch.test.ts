import parseLocationSearch from "./parseLocationSearch"

it("empty", () => {
  expect(parseLocationSearch("")).toEqual({})
})

it("whitespace", () => {
  expect(parseLocationSearch(" ")).toEqual({})
})

it("one", () => {
  expect(parseLocationSearch("?key=value")).toEqual({ key: "value" })
})

it("multiple", () => {
  expect(parseLocationSearch("?key=value&two=2")).toEqual({ key: "value", two: "2" })
})
