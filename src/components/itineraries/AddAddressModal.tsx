import React from 'react'
import styled from 'styled-components'
import DefaultModal from "../global/Modal/DefaultModal"
import SearchForm from "../search/SearchForm"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "../search/SearchResults"
import Spinner from "../global/Spinner"

const Div = styled.div`
  padding-bottom: 15px;
`

const AddAddressModal: React.FC = () => {
  const {
    search: {
      isFetching,
      results
    }
  } = useGlobalState()

  const showSpinner = isFetching

  return (
    <DefaultModal title='Startadres'>
      {showSpinner
        ? <Spinner/>
        : (<>
          <Div>
            <b>Bij welk adres wil je beginnen?</b>
          </Div>
          <Div>
            <SearchForm/>
            <SearchResults results={results}/>
          </Div>
        </>)}
    </DefaultModal>
  )
}

export default AddAddressModal
