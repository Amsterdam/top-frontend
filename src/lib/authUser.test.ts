import authUser from "./authUser"

describe("authUser", () => {
  describe("isAuthUser", () => {
    it("is", () => {
      const user = { email: "a@example.com" }
      authUser.set(user)
      expect(authUser.isAuthUser(user)).toBe(true)
    })

    it("is not", () => {
      const user = { email: "a@example.com" }
      authUser.set(user)
      expect(authUser.isAuthUser({ email: "b@example.com" })).toBe(false)
    })
  })
})
