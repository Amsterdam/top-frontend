import parseAddressLine from "./parseAddressLine"

describe("parseAddressLine", () => {
  it("straat 12 1234AA", () => {
    const arr = parseAddressLine("straat 5 1234AA")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(5)
    expect(arr[2]).toBeUndefined()
  })

  it("straat 12 1234AA additional text", () => {
    const arr = parseAddressLine("straat 5 1234AA additional text")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(5)
  })

  it("straat 12 1 1234AA", () => {
    const arr = parseAddressLine("straat 12 1 1234AA")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(12)
    expect(arr[2]).toBe("1")
  })

  it("straat 12  1 1234AA", () => {
    const arr = parseAddressLine("straat 12  1 1234AA")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(12)
    expect(arr[2]).toBe("1")
  })

  it("straat 12-2 1234AA", () => {
    const arr = parseAddressLine("straat 12-2 1234AA")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(12)
    expect(arr[2]).toBe("2")
  })

  it("straat 12 - 2 1234AA", () => {
    const arr = parseAddressLine("straat 12 - 2 1234AA")
    expect(arr[0]).toBe("1234AA")
    expect(arr[1]).toBe(12)
    expect(arr[2]).toBe("2")
  })

  it("Naamstraat 92-1, 1000AA (afspraak om 8:30)", () => {
    const arr = parseAddressLine("Naamstraat 92-1, 1000AA (afspraak om 8:30)")
    expect(arr[0]).toBe("1000AA")
    expect(arr[1]).toBe(92)
    expect(arr[2]).toBe("1")
  })

  it("2e Brededwarsstraat 23 A 2 1011AB", () => {
    const arr = parseAddressLine("2e Brededwarsstraat 23 A 2 1011AB")
    expect(arr[0]).toBe("1011AB")
    expect(arr[1]).toBe(23)
    expect(arr[2]).toBe("A 2")
  })
})
