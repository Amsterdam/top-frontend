import React from "react"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import { FraudPredictionDetails } from "./FraudPredictionDetails"
import { useFraudPredictionModal } from "./hooks/useFraudPredictionModal"
import { FraudPrediction } from "app/features/types"

type Props = {
  fraudPrediction: FraudPrediction
  title: string
}

const FraudPredictionDetailsModal: React.FC<Props> = ({ title, fraudPrediction }) => {
  const { shouldShow } = useFraudPredictionModal()

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title={ title }>
      <FraudPredictionDetails fraudPrediction={ fraudPrediction } />
    </DefaultModal>
  )
}

export default FraudPredictionDetailsModal
