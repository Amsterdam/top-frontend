import replaceNewLines from "./replaceNewLines"

it("default", () => {
  const str = "Abc\nword\nlast"
  expect(replaceNewLines(str)).toBe("Abc<br />word<br />last")
})

it("replaceWith", () => {
  const str = "Abc\nword"
  expect(replaceNewLines(str, "<br /><br />")).toBe("Abc<br /><br />word")
})
