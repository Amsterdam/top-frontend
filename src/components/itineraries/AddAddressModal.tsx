import React from 'react'
import styled from 'styled-components'
import DefaultModal, { defaultCloseHandler } from "../global/Modal/DefaultModal"
import {Button} from "@datapunt/asc-ui"
import SearchForm from "../search/SearchForm"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "../search/SearchResults"
import Spinner from "../global/Spinner"

const Div = styled.div`
  padding-bottom: 15px;
`

const AddAddressModal:React.FC = () => {
  const {
    search: {
      isFetching,
      results
    }
  } = useGlobalState()

  const showSpinner = isFetching

  return (
    <DefaultModal
      title='Startadres'
      body={<>
        <Div>
          <b>Bij welk adres wil je beginnen?</b>
        </Div>
        <Div>
          <SearchForm />
          { showSpinner && <Spinner /> }
          <SearchResults results={results} />
        </Div>
      </>}
      footer={<>
        <Button variant='primary'>Startadres toevoegen</Button>
        <Button variant='tertiary' onClick={defaultCloseHandler}>Annuleer</Button>
      </>}
    />
  )
}

export default AddAddressModal
