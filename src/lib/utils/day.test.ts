import day from "./day"

describe("day", () => {
  it("Sunday", () => {
    expect(day(new Date("2020-05-10T11:00:00"))).toBe("sunday")
  })

  it("Monday", () => {
    expect(day(new Date("2020-05-11T00:00:00"))).toBe("monday")
  })

  it("Date only", () => {
    expect(day(new Date("2020-05-13"))).toBe("wednesday")
  })
})
