import displayBoolean from "./displayBoolean"

describe("displayBoolean", () => {
  it("undefined", () => {
    expect(displayBoolean(undefined)).toBe("Onbekend")
  })

  it("false Boolean", () => {
    expect(displayBoolean(false)).toBe("Nee")
  })

  it("false string", () => {
    expect(displayBoolean("False")).toBe("Nee")
  })

  it("true Boolean", () => {
    expect(displayBoolean(true)).toBe("Ja")
  })

  it("true string", () => {
    expect(displayBoolean("True")).toBe("Ja")
  })

  it("unknown", () => {
    expect(displayBoolean("UNKNOWN")).toBe("Onbekend")
  })
})
