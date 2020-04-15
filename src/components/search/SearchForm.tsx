import React, { FC } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import InputBase from "../styled/Input"
import useGlobalState from "../../hooks/useGlobalState"
import ClearButton from "./ClearButton"
import { desktop } from "../../responsiveness/mediaQueries"
import {Form} from "react-final-form"
import {FormField} from "../form-components/FormComponents"

const Label = styled.label`
  font-weight: 500
  display: block
  min-height: 22px
  margin-bottom: 2px
`

const InputWrap = styled.div`
  display: inline-block
  width: 60px
  @media ${ desktop } {
    width: 90px
  }
`
const Input = styled(InputBase)`
  height: 44px
  width: calc(100% - 4px)
`

const InputWrapPostalCode = styled(InputWrap)`
  width: calc(100% - 174px);
  @media ${ desktop } {
    width: calc(100% - 234px)
  }
`

const InputWrapStreetNumber = styled(InputWrap)`
  input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none
      margin: 0
    }
  }
`

const ButtonWrap = styled.div`
  vertical-align: top
  display: inline-block
  button {
    width: 50px
  }
`
const SearchButton = styled(Button)`
  display: block
  margin-top: 24px
`

const ClearButtonWrap = styled.div`
  display: flex
  justify-content: flex-start
`

type FormValues = {
  postalCode?: string
  streetNumber?: string
  suffix?: string
}

const SearchForm: FC = () => {
  const {
    search: {
      query
    },
    searchActions: {
      search,
      clear
    }
  } = useGlobalState()

  const onSubmit = async ({ postalCode, streetNumber, suffix }: FormValues) => {
    search(
      postalCode ?? "",
      streetNumber ?? "",
      suffix ?? ""
    )
  }

  const [ postalCode, streetNumber, suffix ] = query ?? []

  return (
    <div className="Search">
      <Form
        keepDirtyOnReinitialize={true}
        onSubmit={onSubmit}
        initialValues={{ postalCode, streetNumber, suffix }}
        render={({ handleSubmit }) => (
          <form onSubmit={ handleSubmit }>
            <InputWrapPostalCode>
              <Label>postcode</Label>
              <FormField
                component={Input}
                name='postalCode'
                type="text"
                pattern="\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*"
                title="Geldige postcodes zijn in de 1234AA of 1234 aa"
                required
                autofocus
              />
            </InputWrapPostalCode>
            <InputWrapStreetNumber>
              <Label>huisnr.</Label>
              <FormField
                component={Input}
                name='streetNumber'
                type="number"
                min="1"
                step="1"
                pattern="\d+"
                title="Alleen cijfers zijn geldig"
                required
              />
            </InputWrapStreetNumber>
            <InputWrap>
              <Label>hslt.&nbsp;/&nbsp;etage</Label>
              <FormField
                component={Input}
                name='suffix'
                type="text"
              />
            </InputWrap>
            <ButtonWrap>
              <SearchButton variant="secondary" iconSize={ 24 } icon={ <Search /> } />
            </ButtonWrap>
            <ClearButtonWrap>
              <ClearButton onClick={ clear } />
            </ClearButtonWrap>
          </form>
        )}
      />
    </div>
  )
}

export default SearchForm
