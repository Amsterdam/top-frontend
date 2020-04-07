import React from 'react'
import styled from 'styled-components'

import DefaultModal from "../../global/Modal/DefaultModal"
import Search from "../../search/Search"
import createActionButtons, {OnAddStartAddress} from "./ActionButtons"
import {CaseTo} from "../../search/SearchResults"

const Div = styled.div`
  padding-bottom: 15px;
`

type Props = {
  onAddStartAddress: OnAddStartAddress
  caseTo: CaseTo
  onClose: () => void
}

const AddStartAddressModal: React.FC<Props> = ({ onAddStartAddress, caseTo, onClose }) => (
  <DefaultModal title='Startadres' onClose={onClose}>
    <Div>
      <b>Bij welk adres wil je beginnen?</b>
    </Div>
    <Div>
      <Search
        actionButtonsComponent={createActionButtons(onAddStartAddress)}
        caseTo={caseTo}
      />
    </Div>
  </DefaultModal>
)


export default AddStartAddressModal
