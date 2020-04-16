import React from 'react'
import {mount, ReactWrapper} from 'enzyme'
import { Form } from 'react-final-form'
import {FormField} from "./FormComponents"
import styled from "styled-components"

type Props = {
  handleSubmit: () => void
}

const MyForm:React.FC<Props> = ({ handleSubmit, children }) => (
  <Form
    onSubmit={handleSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        {children}
        <button id='submit' value='submit' />
      </form>
    )}
  />
)

const MyStyledInput = styled.input`
  background-color:blue;
`
const MyStyledTextarea = styled.textarea`
  background-color:blue;
`
const MyStyledSelect = styled.select`
  background-color:blue;
`

describe('FormField', () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    onSubmit.mockReset()
  })

  describe('input element', () => {
    const simpleComponent = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component='input' />
      </MyForm>
    )
    const styledComponent = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component={MyStyledInput} />
      </MyForm>
    )

    // When given a 'simpleComponent/styledComponent'
    describe.each([
      ['simpleComponent', simpleComponent],
      ['styledComponent', styledComponent]
    ])('when given a %s', (name, component) => {
      it('should render a input field', () => {
        expect(component.find('input[name="foo"]').exists()).toBe(true)
      })

      it('should propagate its changes onSubmit', () => {
        simpleComponent
          .find('input[name="foo"]')
          .simulate('change', {target: {value: 'Some value'}})

        simpleComponent.find('form').simulate('submit')

        expect(onSubmit).toHaveBeenCalledWith(
          {"foo": "Some value"},
          expect.anything(),
          expect.anything(),
        )
      })
    })
  })

  describe('select element', () => {
    const simpleComponent:ReactWrapper = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component='select'>
          <option value='bar'>bar</option>
          <option value='foo'>Foo</option>
        </FormField>
      </MyForm>
    )

    const styledComponent:ReactWrapper = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component={MyStyledSelect}>
          <option value='bar'>bar</option>
          <option value='foo'>Foo</option>
        </FormField>
      </MyForm>
    )

    // When given a 'simpleComponent/styledComponent'
    describe.each([
      ['simpleComponent', simpleComponent],
      ['styledComponent', styledComponent]
    ])('when given a %s', (name, component) => {
      it('should render options', () => {
        expect(component.find('option[value="bar"]').exists()).toBe(true)
        expect(component.find('option[value="foo"]').exists()).toBe(true)
      })

      it('should propagate its changes onSubmit', () => {
        component
          .find('select[name="foo"]')
          .simulate('change', {target: {value: 'Some value'}})

        component.find('form').simulate('submit')

        expect(onSubmit).toHaveBeenCalledWith(
          {"foo": "Some value"},
          expect.anything(),
          expect.anything(),
        )
      })
    })
  })

  describe('textarea element', () => {
    const simpleComponent:ReactWrapper = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component='textarea' />
      </MyForm>

    )
    const styledComponent:ReactWrapper = mount(
      <MyForm handleSubmit={onSubmit}>
        <FormField name='foo' component={MyStyledTextarea} />
      </MyForm>
    )

    // When given a 'simpleComponent/styledComponent'
    describe.each([
      ['simpleComponent', simpleComponent],
      ['styledComponent', styledComponent]
    ])('when given a %s', (name, component) => {
      it('should render a textarea field', () => {
        expect(component.find('textarea[name="foo"]').exists()).toBe(true)
      })

      it('should propagate its changes onSubmit', () => {
        component
          .find('textarea[name="foo"]')
          .simulate('change', {target: {value: 'Some value'}})

        component.find('form').simulate('submit')

        expect(onSubmit).toHaveBeenCalledWith(
          {"foo": "Some value"},
          expect.anything(),
          expect.anything(),
        )
      })
    })
  })
})
