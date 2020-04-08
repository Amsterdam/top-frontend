import React from 'react'
import {CaseTo} from "../../search/SearchResults"
import {setQueryParam} from "../../../lib/utils/setQueryParam"
import {navigate} from "@reach/router"
import {to} from "../../../config/page"
import {deleteQueryParam} from "../../../lib/utils/deleteQueryParam"
import parseLocationSearch from "../../../lib/utils/parseLocationSearch"
import AddStartAddressModal from "../add-start-address/AddStartAddressModal"
import CaseModal from "../add-start-address/CadeModal"

type Props = {
  onAddStartAddress: (caseId:CaseId) => void
}

const QS_CASE_MODAL = 'modalCaseId'
const QS_ADD_ADDRESS_MODAL = 'addAddressModal'

export const openModalTo = () => to(setQueryParam(window.location.search, QS_ADD_ADDRESS_MODAL, '1'))
export const caseTo:CaseTo = (caseId:CaseId) => setQueryParam(window.location.search, QS_CASE_MODAL, caseId)
const closeAddAddressModal = () => navigate(to(deleteQueryParam(window.location.search, QS_ADD_ADDRESS_MODAL)))
const closeCaseModal = () => navigate(to(deleteQueryParam(window.location.search, QS_CASE_MODAL)))

const Modals:React.FC<Props> = (props) => {
  const parsedQueryString = parseLocationSearch(window.location.search)

  const onAddStartAddress = (caseId:CaseId) => {
    props.onAddStartAddress(caseId)
    closeAddAddressModal()
  }

  return (
    <>
      {parsedQueryString[QS_ADD_ADDRESS_MODAL] && <AddStartAddressModal
        onClose={closeAddAddressModal}
        onAddStartAddress={onAddStartAddress}
        caseTo={caseTo}
      />}
      {parsedQueryString[QS_CASE_MODAL] && <CaseModal
        onClose={closeCaseModal}
        caseId={parsedQueryString[QS_CASE_MODAL]}
      />}
    </>
  )
}

export default Modals
