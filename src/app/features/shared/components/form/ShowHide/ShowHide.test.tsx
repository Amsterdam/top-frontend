import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { Form } from "react-final-form"
import { FormState } from "final-form"
import ShowHide from "./ShowHide"
import { vi, expect } from "vitest"

describe("ShowHide", () => {
  const renderFields = (shouldShow: (obj: FormState<any>) => boolean) => (
    <Form
      onSubmit={vi.fn()}
      render={() => (
        <ShowHide
          shouldShow={shouldShow}
          field={{ type: "TextField", props: { label: "Foo", name: "foo" } }}
        />
      )}
    />
  )

  it("should render component when shouldShow function returns true", () => {
    const { getByLabelText } = render(renderFields(() => true))
    expect(getByLabelText("Foo")).toBeTruthy() // Vitest native assertion
  })

  it("should NOT render component when shouldShow function returns false", () => {
    const { queryByLabelText } = render(renderFields(() => false))
    expect(queryByLabelText("Foo")).toBeNull() // Vitest native assertion for absence
  })

  it("should call the shouldShow method with updated values", () => {
    const shouldShow = vi.fn(() => true)
    const { getByLabelText } = render(renderFields(shouldShow))

    fireEvent.change(getByLabelText("Foo"), { target: { value: "changed" } })

    expect(shouldShow).toHaveBeenCalledWith(
      expect.objectContaining({
        values: { foo: "changed" }
      })
    )
  })
})
