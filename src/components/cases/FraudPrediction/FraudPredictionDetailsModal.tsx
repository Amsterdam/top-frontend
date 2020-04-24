import React from "react"
import { toMergeQueryString } from "../../../config/page"
import parseLocationSearch from "../../../lib/utils/parseLocationSearch"
import DefaultModal from "../../global/Modal/DefaultModal"
import { FraudPredictionDetails } from "./FraudPredictionDetails"

const QS_FRAUD_PROBABILITY_MODAL = "modalFraudProbability"

export const toFraudPredictionModal = () => toMergeQueryString({ [QS_FRAUD_PROBABILITY_MODAL]: "1" })

type Props = {
  fraudPrediction: FraudPrediction
  title: string
}

const FraudPredictionDetailsModal: React.FC<Props> = ({ title, fraudPrediction }) => {
  const parsedQueryString = parseLocationSearch(window.location.search)

  return <>
    { parsedQueryString[QS_FRAUD_PROBABILITY_MODAL] && (<DefaultModal title={title}>
      <FraudPredictionDetails fraudPrediction={fraudPrediction} />
    </DefaultModal>) }
  </>
}

export default FraudPredictionDetailsModal
