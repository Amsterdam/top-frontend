import authToken from "./authToken"

const token = "eyJ0eXAhOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl10eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc5MDA1NTQ2LCJqdGkiOiJjZTg0OWRhNTU5OTA0NDQ1OGI4MmQzOGJkZTY5ZTkyYSIsInVzZXJfaWQiOiJiNDIwNDZhMi1kMTYyLTRiMDQtYTI4Yi0zZGQ3OTFkYWE2ODgifQ.7Maem5BIBFI1mkN1Q2tMtb7m984UhlxaOXYrAofdQII"

describe("authToken", () => {
  it("get", () => {
    expect(authToken.get()).toBeUndefined()
  })

  it("set", () => {
    expect(authToken.set()).toBe(false)
    expect(authToken.set(token)).toBe(true)
  })

  it("set, get", () => {
    authToken.set(token)
    expect(authToken.get()).toBe(token)
  })

  it("clear", () => {
    expect(authToken.clear()).toBe(true)
    authToken.set(token)
    authToken.clear()
    expect(authToken.get()).toBeUndefined()
  })
})
