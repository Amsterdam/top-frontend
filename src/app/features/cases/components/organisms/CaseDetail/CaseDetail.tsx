import React, { FC } from "react"

import { useDaySettings } from "app/state/rest"
import { Case } from "app/features/types"

import formatDate from "app/features/shared/utils/formatDate"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"
import Purified from "app/features/shared/components/molecules/Purified/Purified"

import CaseDetailSection from "./CaseDetailSection"
import CaseDetailSectionGeneral from "./CaseDetailSectionGeneral"
import CaseDetailSectionRelatedCases from "./CaseDetailSectionRelatedCases"
import CaseDetailSectionVacationRental from "./CaseDetailSectionVacationRental"
import CaseDetailSectionVacationRentalThisYear from "./CaseDetailSectionVacationRentalThisYear"
import CaseDetailSectionStadia from "./CaseDetailSectionStadia"
import CaseDetailSectionSignal from "./CaseDetailSectionSignal"
import CaseDetailSectionResidents from "./CaseDetailSectionResidents"
import CaseDetailSectionResidence from "./CaseDetailSectionResidence"
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

  // Statements
  const statements = caseItem.statements.map(
    ({ user, date, statement }) =>
      <Purified
        className="anonymous"
        text={ `${ formatDate(date, true) }<br /><strong>${ user }</strong><br />${ replaceNewLines(replaceUrls(statement)) }` }
      />
  )
  const showStatements = statements.length > 0

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
      {
        showStatements &&
        <CaseDetailSection
          title="Mededelingen (kladblok)"
          dataSource="BWV"
          data={ statements } />
      }
      <CaseDetailSectionStadia
        caseId={ caseId }
      />
    </article>
  )
}

export default CaseDetail
