import React from 'react'
import styled from 'styled-components'

import DefaultModal from "../../global/Modal/DefaultModal"
import Search from "../../search/Search"
import createActionButtons, {OnAddStartAddress} from "./ActionButtons"

const Div = styled.div`
  padding-bottom: 15px;
`

type Props = {
  onAddStartAddress: OnAddStartAddress
}

const AddStartAddressModal: React.FC<Props> = ({ onAddStartAddress }) => (
  <DefaultModal title='Startadres'>
    <Div>
      <b>Bij welk adres wil je beginnen?</b>
    </Div>
    <Div>
      <Search actionButtonsComponent={createActionButtons(onAddStartAddress)} />
    </Div>
  </DefaultModal>
)


export default AddStartAddressModal
