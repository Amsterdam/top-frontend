import React from 'react'
import styled from 'styled-components'
import DefaultModal from "../../global/Modal/DefaultModal"
import Search from "../../search/Search"

const Div = styled.div`
  padding-bottom: 15px;
`

const AddStartAddressModal: React.FC = () => (
  <DefaultModal title='Startadres'>
    <Div>
      <b>Bij welk adres wil je beginnen?</b>
    </Div>
    <Div>
      <Search />
    </Div>
  </DefaultModal>
)

export default AddStartAddressModal
