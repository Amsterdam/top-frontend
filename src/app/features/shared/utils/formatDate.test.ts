import formatDate from "./formatDate"

describe("formatDate", () => {
  it("day, month, year", () => {
    expect(formatDate("11-11-2022")).toBe("11 nov 2022")
  })

  it("weekday day, month, year", () => {
    expect(formatDate("11-11-2022", true)).toBe("vr 11 nov 2022")
  })

  it("day, month", () => {
    expect(formatDate("11-11-2022", false, false)).toBe("11 nov")
  })
})
