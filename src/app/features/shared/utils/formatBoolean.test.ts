import formatBoolean from "app/features/shared/utils/formatBoolean"

describe("formatBoolean", () => {
  it("undefined", () => {
    expect(formatBoolean(undefined)).toBe("Onbekend")
  })

  it("false Boolean", () => {
    expect(formatBoolean(false)).toBe("Nee")
  })

  it("false string", () => {
    expect(formatBoolean("False")).toBe("Nee")
  })

  it("true Boolean", () => {
    expect(formatBoolean(true)).toBe("Ja")
  })

  it("true string", () => {
    expect(formatBoolean("True")).toBe("Ja")
  })

  it("unknown", () => {
    expect(formatBoolean("UNKNOWN")).toBe("Onbekend")
  })
})
