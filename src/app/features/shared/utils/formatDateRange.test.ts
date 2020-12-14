import formatDateRange from "./formatDateRange"

describe("formatDateRange", () => {
  it("from and to", () => {
    expect(formatDateRange({ date_from: "2021-01-01", date_to: "2021-12-31" })).toBe("1 jan 2021 – 31 dec 2021")
  })

  it("only from", () => {
    expect(formatDateRange({ date_from: "2021-01-01" })).toBe("per 1 jan 2021")
  })

  it("neither", () => {
    expect(formatDateRange({ date_from: null })).toBe(null)
  })
})
