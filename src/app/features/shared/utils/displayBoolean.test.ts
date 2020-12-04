import displayBoolean from "./displayBoolean"

describe("displayBoolean", () => {
  it("undefined", () => {
    expect(displayBoolean(undefined)).toBe("Nee")
  })

  it("false", () => {
    expect(displayBoolean(false)).toBe("Nee")
  })

  it("true", () => {
    expect(displayBoolean(true)).toBe("Ja")
  })
})
