import isBetweenDates from "./isBetweenDates"

it("false", () => {
  expect(isBetweenDates(new Date("01-01-2019"), new Date("01-02-2019"), new Date("01-03-2019"))).toBe(false)
})

it("true", () => {
  expect(isBetweenDates(new Date("01-01-2019"), new Date("01-03-2019"), new Date("01-02-2019"))).toBe(true)
})
