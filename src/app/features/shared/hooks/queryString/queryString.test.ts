import { queryString } from "./queryString"

describe("queryString", () => {
  it("should be able to set a parameter", () => {
    const url = queryString("path", { foo: "fooVal" })
      .setParameter("bar", "barVal")
      .getUrl()

    expect(url).toEqual("path?foo=fooVal&bar=barVal")
  })

  it("should be able to check if a parameter exists", () => {
    const result = queryString("path", {})
      .setParameter("bar", "barVal")
      .hasParameter("bar")

    expect(result).toEqual(true)
  })

  it("should be able to get a parameter", () => {
    const result = queryString("path", { foo: "fooVal" })
      .getParameter("foo")

    expect(result).toEqual("fooVal")
  })

  it("should be able to delete a parameter", () => {
    const url = queryString("path", { foo: "fooVal", bar: "barVal" })
      .deleteParameter("foo")
      .getUrl()

    expect(url).toEqual("path?bar=barVal")
  })

  it("should strip the question mark if no parameters are left", () => {
    const url = queryString("path", { foo: "fooVal" })
      .deleteParameter("foo")
      .getUrl()

    expect(url).toEqual("path")
  })
})
