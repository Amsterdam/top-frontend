import React from "react"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import { usePermitDetailsModal } from "./hooks/usePermitDetailsModal"

type Props = {
  title: string
}

const PermitDetailsModal: React.FC<Props> = ({ title }) => {
  const { shouldShow } = usePermitDetailsModal()

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title={ title }>
      Permit details go here.
    </DefaultModal>)
}

export default PermitDetailsModal
