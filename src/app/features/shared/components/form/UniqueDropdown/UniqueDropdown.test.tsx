import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import UniqueDropdown from "./UniqueDropdown"

describe("UniqueDropdown", () => {
  it("should throw an error when given name is non array like", () => {
    jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() =>
      render(
        <ScaffoldForm onSubmit={jest.fn()}>
          <UniqueDropdown
            name="foo"
            options={[{ label: "foo" }]}
            optionLabelField="label"
          />
        </ScaffoldForm>
      )
    ).toThrow()

    expect(console.error).toHaveBeenCalled()
  })

  it("should hide options if they are selected in another field", () => {
    const options = [{ label: "foo" }, { label: "bar" }]

    const { getAllByTestId } = render(
      <ScaffoldForm onSubmit={jest.fn()}>
        <UniqueDropdown
          name="foo[0]"
          options={options}
          optionLabelField="label"
          data-testid="unique-dropdown"
        />
        <UniqueDropdown
          name="foo[1]"
          options={options}
          optionLabelField="label"
          data-testid="unique-dropdown"
        />
      </ScaffoldForm>
    )

    const dropdowns = getAllByTestId("unique-dropdown")

    fireEvent.change(dropdowns[0], { target: { value: 0 } })

    const otherOptions = dropdowns[1].querySelectorAll("option")
    expect(otherOptions.length).toEqual(1)
    expect(otherOptions[0].textContent).toEqual("bar")
  })
})
