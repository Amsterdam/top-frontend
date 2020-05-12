import { queryStringProp } from "./queryStringProp"
import { queryString } from "./queryString"

describe("queryStringProp", () => {
  let qsp: ReturnType<typeof queryStringProp>

  beforeEach(() => {
    qsp = queryStringProp(queryString("path", { foo: "fooVal" }), "foo")
  })

  it("should be able to get the parameter", () => {
    expect(qsp.get()).toEqual("fooVal")
  })

  it("should be able to check if the parameter exists", () => {
    expect(qsp.exists()).toEqual(true)
  })

  it("should be able to delete the parameter", () => {
    const result = qsp
      .del()
      .getUrl()

    expect(result).toEqual("path")
  })

  it("should be able to set the parameter", () => {
    const result = qsp
      .set("otherVal")
      .getUrl()

    expect(result).toEqual("path?foo=otherVal")
  })
})
