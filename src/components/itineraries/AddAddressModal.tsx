import React from 'react'
import DefaultModal, { defaultCloseHandler } from "../global/Modal/DefaultModal"
import {Button} from "@datapunt/asc-ui"

const AddAddressModal:React.FC = () => (
  <DefaultModal
    title='Startadres'
    body={<b>Bij welk adres wil je beginnen?</b>}
    footer={<>
      <Button variant='primary'>Startadres toevoegen</Button>
      <Button variant='tertiary' onClick={defaultCloseHandler}>Annuleer</Button>
    </>}
  />
)

export default AddAddressModal
