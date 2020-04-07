import displayAddress from "./displayAddress"

describe("displayAddress", () => {
  it("streetName, streetNumber", () => {
    expect(displayAddress("Alfa betastraat", 12)).toBe("Alfa betastraat 12")
  })

  it("streetName, streetNumber, suffix", () => {
    expect(displayAddress("Alfa betastraat", 12, "A")).toBe("Alfa betastraat 12A")
  })

  xit("streetName, streetNumber, etage", () => {
    expect(displayAddress("Alfa betastraat", 12, undefined, 2)).toBe("Alfa betastraat 12-2")
  })

  it("streetName, streetNumber, suffix, etage", () => {
    expect(displayAddress("Alfa betastraat", 12, "C", 3)).toBe("Alfa betastraat 12C-3")
  })
})
