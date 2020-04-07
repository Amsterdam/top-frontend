import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Search } from "@datapunt/asc-assets"
import useOnChangeState from "../../hooks/useOnChangeState"
import InputBase from "../styled/Input"
import useGlobalState from "../../hooks/useGlobalState"
import ClearButton from "./ClearButton"
import { desktop } from "../../responsiveness/mediaQueries"

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

  const [postalCode, onChangePostalCode, setPostalCode] = useOnChangeState(query ? query[0] : "")
  const [streetNumber, onChangeStreetNumber, setStreetNumber] = useOnChangeState(query ? query[1] : "")
  const [suffix, onChangeSuffix, setSuffix] = useOnChangeState(query ? query[2] : "")

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    search(postalCode, streetNumber, suffix)
  }

  const onClickClear = (event: FormEvent) => {
    const emptyString = ""
    setPostalCode(emptyString)
    setStreetNumber(emptyString)
    setSuffix(emptyString)
    clear()
  }

  return (
    <div className="Search">
      <form onSubmit={ onSubmit }>
        <InputWrapPostalCode>
          <Label>postcode</Label>
          <Input
            type="text"
            pattern="\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*"
            title="Geldige postcodes zijn in de 1234AA of 1234 aa"
            required
            autoFocus
            value={ postalCode }
            onChange={ onChangePostalCode }
            />
        </InputWrapPostalCode>
        <InputWrapStreetNumber>
          <Label>huisnr.</Label>
          <Input
            type="number"
            min="1"
            step="1"
            pattern="\d+"
            title="Alleen cijfers zijn geldig"
            required
            value={ streetNumber }
            onChange={ onChangeStreetNumber }
            />
        </InputWrapStreetNumber>
        <InputWrap>
          <Label>hslt.&nbsp;/&nbsp;etage</Label>
          <Input
            type="text"
            value={ suffix }
            onChange={ onChangeSuffix }
            />
        </InputWrap>
        <ButtonWrap>
          <SearchButton variant="secondary" iconSize={ 24 } icon={ <Search /> } />
        </ButtonWrap>
      </form>
      <ClearButtonWrap>
        <ClearButton onClick={ onClickClear } />
      </ClearButtonWrap>
    </div>
  )
}

export default SearchForm
