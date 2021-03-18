import React, { FC } from "react"

import { useCase, useDaySettings } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const Stadia: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)

  if (!caseData) {
    return null
  }

  const stadiums = caseData.import_stadia?.map(stadium => ({
    description: stadium.sta_oms,
    dateStart: stadium.begindatum ? formatDate(stadium.begindatum, true)! : "–",
    dateEnd: stadium.einddatum ? formatDate(stadium.einddatum, true)! : "–",
    datePeil: stadium.peildatum ? formatDate(stadium.peildatum, true)! : "–",
    num: parseInt(stadium.sta_nr, 10)
  }))

  const stadia = stadiums?.reduce((acc: any, stadium, index) => {
    acc.push([ "Stadium",
      <StadiumBadge
        stadium={ stadium.description }
        stadiaLabels={ (caseData.day_settings_id && daySettings?.team_settings.marked_stadia) || [] }
      />
    ])
    acc.push([ "Startdatum", stadium.dateStart ])
    acc.push([ "Einddatum", stadium.dateEnd ])
    acc.push([ "Peildatum", stadium.datePeil ])

    if (index < stadiums.length - 1) {
      acc.push(<Hr />)
    }
    return acc
  }, [])

  return (
    <CaseDetailSection
      title="Stadia"
      dataSource="BWV"
      data={ stadia }
    />
  )
}

export default Stadia
