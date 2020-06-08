import React from "react"
import { mount } from "enzyme"
import { ScaffoldForm } from "amsterdam-react-final-form"
import UniqueDropdown from "./UniqueDropdown"

describe("UniqueDropdown", () => {
  it("should throw an error when given name is non array like", () => {
    jest.spyOn(console, "error")
    // @ts-ignore
    console.error.mockImplementation(() => {})

    const component = () => mount(
      <ScaffoldForm onSubmit={jest.fn()}>
        <UniqueDropdown name='foo' options={[{ label: "foo" }]} optionLabelField="label"/>
      </ScaffoldForm>
    )

    expect(component).toThrowError()
    expect(console.error).toHaveBeenCalled()
  })

  it("should hide options if they are selected in another field", () => {
    const options = [
      { label: "foo" },
      { label: "bar" }
    ]

    const component = mount(
      <ScaffoldForm onSubmit={jest.fn()}>
        <UniqueDropdown name='foo[0]' options={options} optionLabelField="label"/>
        <UniqueDropdown name='foo[1]' options={options} optionLabelField="label"/>
      </ScaffoldForm>
    )
    
    component.find("select").at(0).simulate("change", { target: { value: 0 } })
    
    const otherOptions = component.find("select").at(1).find("option")
    expect(otherOptions.length).toEqual(1)
    expect(otherOptions.at(0).text()).toEqual("bar")
  })
})
