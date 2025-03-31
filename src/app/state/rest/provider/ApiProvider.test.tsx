import React from "react"
import { render, screen } from "@testing-library/react"
import ApiProvider from "./ApiProvider"
import { describe, it, expect } from "vitest"

describe("ApiProvider", () => {
  it("should render an ApiContext.Provider with children", () => {
    render(<ApiProvider><span>TEST</span></ApiProvider>)
    expect(screen.getByText("TEST")).toBeTruthy() // Use Vitest's native assertion
  })
})
