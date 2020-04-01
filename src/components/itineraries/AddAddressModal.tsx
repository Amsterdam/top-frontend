import React from 'react'
import styled from 'styled-components'
import DefaultModal, { defaultCloseHandler } from "../global/Modal/DefaultModal"
import {Button} from "@datapunt/asc-ui"
import SearchForm from "../search/SearchForm"

const Div = styled.div`
  padding-bottom: 15px;
`

const AddAddressModal:React.FC = () => (
  <DefaultModal
    title='Startadres'
    body={<>
      <Div>
        <b>Bij welk adres wil je beginnen?</b>
      </Div>
      <Div>
        <SearchForm />
      </Div>
    </>}
    footer={<>
      <Button variant='primary'>Startadres toevoegen</Button>
      <Button variant='tertiary' onClick={defaultCloseHandler}>Annuleer</Button>
    </>}
  />
)

export default AddAddressModal
