import React, { FC } from "react"

import { useDaySettings } from "app/state/rest"
import { Case } from "app/features/types"

import CaseDetailSectionGeneral from "./CaseDetailSectionGeneral"
import CaseDetailSectionRelatedCases from "./CaseDetailSectionRelatedCases"
import CaseDetailSectionResidence from "./CaseDetailSectionResidence"
import CaseDetailSectionResidents from "./CaseDetailSectionResidents"
import CaseDetailSectionScratchpad from "./CaseDetailSectionScratchpad"
import CaseDetailSectionSignal from "./CaseDetailSectionSignal"
import CaseDetailSectionStadia from "./CaseDetailSectionStadia"
import CaseDetailSectionVacationRental from "./CaseDetailSectionVacationRental"
import CaseDetailSectionVacationRentalThisYear from "./CaseDetailSectionVacationRentalThisYear"
import CaseLogBook from "../CaseLogbook/CaseLogBook"

import { getAddress, getEigenaar } from "./utils"

type Props = {
  caseId: string
  caseItem: Case
}

const CaseDetail: FC<Props> = ({ caseId, caseItem }) => {
  const { data: daySettings } = useDaySettings(caseItem.day_settings_id!)

  // Header
  const address = getAddress(caseItem.import_adres)
  const eigenaar = getEigenaar(caseItem)
  const fraudPrediction = !caseItem.day_settings_id || (daySettings && daySettings.team_settings.fraud_predict) ? caseItem.fraud_prediction : undefined
  const isSia = (caseItem.is_sia === "J")
  const postalCode = caseItem.import_adres.postcode
  const residentCount = caseItem.bwv_personen.filter(person => person.overlijdensdatum === null).length || 0

  return (
    <article className="CaseDetail">
      <CaseDetailSectionGeneral
        address={ address }
        caseId={ caseId }
        eigenaar={ eigenaar }
        footer={ {
          link: `http://www.google.com/maps/place/${ address }, Amsterdam`,
          title: "Bekijk op Google Maps"
        } }
        fraudPrediction={ fraudPrediction }
        isSia={ isSia }
        residentCount={ residentCount }
        postalCode={ postalCode }
      />
      <CaseDetailSectionRelatedCases
        caseId={ caseId }
      />
      <CaseDetailSectionVacationRental
        caseId={ caseId }
      />
      <CaseDetailSectionResidence
        caseId={ caseId }
      />
      <CaseDetailSectionSignal
        caseId={ caseId }
      />
      <CaseDetailSectionResidents
        caseId={ caseId }
      />
      <CaseDetailSectionVacationRentalThisYear
        caseId={ caseId }
      />
      <CaseLogBook
        caseId={ caseId }
      />
      <CaseDetailSectionScratchpad
        caseId={ caseId }
      />
      <CaseDetailSectionStadia
        caseId={ caseId }
      />
    </article>
  )
}

export default CaseDetail
