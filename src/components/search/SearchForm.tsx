import React, { FC } from "react"
import styled from "styled-components"
import { Label, Button, breakpoint } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import useGlobalState from "../../hooks/useGlobalState"
import ClearButton from "./ClearButton"
import {Form} from "react-final-form"
import TextField from "../form-components/TextField"
import {isRequired} from "../form-components/validators/isRequired"
import NumberField from "../form-components/NumberField"

const BREAKPOINT = "tabletS"

const StyledLabel = styled(Label)`
  display: block;
  min-height: 22px;
  margin-bottom: 2px;
`

const InputWrap = styled.div`
  display: inline-block;
  width: 60px;
  @media screen and ${ breakpoint("min-width", BREAKPOINT) } {
    width: 90px;
  }
`

const InputWrapPostalCode = styled(InputWrap)`
  width: calc(100% - 174px);
  @media screen and ${ breakpoint("min-width", BREAKPOINT) } {
    width: calc(100% - 234px);
  }
`

const StyledTextField = styled(TextField)` 
  width: calc(100% - 4px);
`
const StyledNumberField = styled(NumberField)`g  
  width: calc(100% - 4px);
`

const InputWrapStreetNumber = styled(InputWrap)`
  input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const ButtonWrap = styled.div`
  vertical-align: top;
  display: inline-block;
  button {
    width: 50px;
  }
`
const SearchButton = styled(Button)`
  display: block;
  margin-top: 24px;
  height: 40px;
`

const ClearButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
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
      clear: clearGlobalSearchState
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
        onSubmit={onSubmit}
        initialValues={{ postalCode, streetNumber, suffix }}
        render={({ values, handleSubmit, form }) => (
          <form onSubmit={ handleSubmit }>
            <InputWrapPostalCode>
              <StyledLabel label="postcode" />
              <StyledTextField
                name='postalCode'
                pattern="\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*"
                title="Geldige postcodes zijn in de 1234AA of 1234 aa"
                autoFocus
                validate={isRequired}
              />
            </InputWrapPostalCode>
            <InputWrapStreetNumber>
              <StyledLabel label="huisnr." />
              <StyledNumberField
                name='streetNumber'
                min="1"
                step="1"
                pattern="\d+"
                title="Alleen cijfers zijn geldig"
                validate={isRequired}
              />
            </InputWrapStreetNumber>
            <InputWrap>
              <StyledLabel label="hslt.&nbsp;/&nbsp;etage" />
              <StyledTextField
                name='suffix'
                type="text"
              />
            </InputWrap>
            <ButtonWrap>
              <SearchButton variant="secondary" iconSize={ 20 } icon={ <Search /> } />
            </ButtonWrap>
            <ClearButtonWrap>
              <ClearButton onClick={() => { form.reset(); clearGlobalSearchState() }} />
            </ClearButtonWrap>
          </form>
        )}
      />
    </div>
  )
}

export default SearchForm
