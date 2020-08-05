import React, {useEffect} from "react"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import Case from "app/features/cases/components/organisms/CaseDetail/CaseDetail"

import {useCase} from "app/state/rest";
import {useCaseModal} from "../../hooks/useCaseModal";
import CenteredSpinner from "../../../../atoms/CenteredSpinner/CenteredSpinner";

const CaseModal: React.FC = () => {
  const { shouldShow, id } = useCaseModal()
  const { data, execGet } = useCase(id as string, { lazy: true })

  useEffect(() => {
    if (id && !data) {
      execGet()
    }
  }, [ execGet, id, data ])

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title='Zaakinformatie'>
      { data ? <Case caseId={id as string} caseItem={data}/> : <CenteredSpinner size={60} /> }
    </DefaultModal>
  )
}


export default CaseModal
