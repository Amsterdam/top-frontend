import formatDate from "./formatDate"

describe("formatDate", () => {
  it("default", () => {
    expect(formatDate("11-13-2022")).toBe("13 nov 2022")
  })

  it("with week day", () => {
    expect(formatDate("11-13-2022", true)).toBe("zo 13 nov 2022")
  })

  it("with weekday, without year", () => {
    expect(formatDate("11-13-2022", true, false)).toBe("zo 13 nov")
  })

  it("without weekday, without year", () => {
    expect(formatDate("11-13-2022", false, false)).toBe("13 nov")
  })

  it("date object", () => {
    const date = new Date("November 13, 2022")
    expect(formatDate(date)).toBe("13 nov 2022")
  })

  it("date object with weekday, without year", () => {
    const date = new Date("November 13, 2022")
    expect(formatDate(date, true, false)).toBe("zo 13 nov")
  })

  it("invalid date", () => {
    expect(formatDate("hello")).toBe(undefined)
  })
})
