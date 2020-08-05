import replaceUrls from "./replaceUrls"

describe("replaceUrls", () => {
  it("no match", () => {
    const str = "Abc"
    expect(replaceUrls(str)).toBe("Abc")
  })

  it("http", () => {
    const str = "http://www.example.com"
    expect(replaceUrls(str)).toBe('<a href="http://www.example.com">http://www.example.com</a>')
  })

  it("in text", () => {
    const str = "Word http://www.example.com\nNext"
    expect(replaceUrls(str)).toBe('Word <a href="http://www.example.com">http://www.example.com</a>\nNext')
  })

  it("multiple", () => {
    const str = "http://www.example.com\nhttps://www.example.com"
    expect(replaceUrls(str)).toBe('<a href="http://www.example.com">http://www.example.com</a>\n<a href="https://www.example.com">https://www.example.com</a>')
  })

  it("one char domains", () => {
    const str = "n.v.t."
    expect(replaceUrls(str)).toBe("n.v.t.")
  })

  it("target _blank", () => {
    const str = "http://www.example.com"
    expect(replaceUrls(str, "_blank")).toBe('<a href="http://www.example.com" target="_blank">http://www.example.com</a>')
  })
})
