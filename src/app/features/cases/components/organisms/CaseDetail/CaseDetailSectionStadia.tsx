import React, { FC } from "react"

import { useCase, useDaySettings } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import Hr from "app/features/cases/components/atoms/Hr/Hr"
import CaseDetailSection from "./CaseDetailSection"

type Props = {
  caseId: string
}

const CaseDetailSectionStadia: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)
  const { data: daySettings } = useDaySettings(caseData?.day_settings_id!)

  const stadiums = caseData?.import_stadia.map(stadium => ({
    description: stadium.sta_oms,
    dateStart: stadium.begindatum ? formatDate(stadium.begindatum, true)! : "-",
    dateEnd: stadium.einddatum ? formatDate(stadium.einddatum, true)! : "-",
    datePeil: stadium.peildatum ? formatDate(stadium.peildatum, true)! : "-",
    num: parseInt(stadium.sta_nr, 10)
  }))

  const stadia = stadiums?.reduce((acc: any, stadium, index) => {
    acc.push([ "Stadium",
      <StadiumBadge
        stadium={ stadium.description }
        stadiaLabels={ (caseData?.day_settings_id && daySettings?.team_settings.marked_stadia) || [] }
      />
    ])
    acc.push([ "Start datum", stadium.dateStart ])
    acc.push([ "Eind datum", stadium.dateEnd ])
    acc.push([ "Peil datum", stadium.datePeil ])

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

export default CaseDetailSectionStadia
