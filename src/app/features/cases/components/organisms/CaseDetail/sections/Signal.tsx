import React, { FC } from "react"
import Hr from "app/features/cases/components/atoms/Hr/Hr"

import { useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"
import highlightText from "app/features/shared/utils/highlightText"
import Purified from "app/features/shared/components/molecules/Purified/Purified"
import { KeyValueDetail } from "app/features/types"
import CaseDetailSection from "../CaseDetailSection"

type Props = {
  caseId: string
}

const Signal: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData || !caseData.bwv_hotline_melding.length) {
    return null
  }

  const meldingen = caseData.bwv_hotline_melding.map(melding => {
    const {
      melding_datum: datum,
      melding_anoniem: anoniem,
      melder_naam: naam,
      melder_telnr: telnr,
      situatie_schets: text
    } = melding

    return {
      datum: datum ? formatDate(datum, true)! : undefined,
      anoniem: anoniem === "J",
      naam,
      telnr,
      text: replaceNewLines(replaceUrls((text || "").trim(), "_blank"))
    }
  }).reverse()

  const meldingenData = meldingen.reduce((acc, item, index) => {
    const { datum, anoniem, naam, telnr, text } = item
    const highlightedText = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], text, { caseSensitive: false })

    acc.push([ "Datum melding", datum || "–" ])
    acc.push([ "Anonieme melding", anoniem ])
    acc.push([ "Melder", <span className="anonymous"> { naam }</span> || "–" ])
    acc.push([ "Melder telefoonnummer", telnr ?
      <a className="anonymous" href={ "tel://" + telnr }>{ telnr }</a> : "–" ])
    acc.push(<Purified className="anonymous" text={ highlightedText } />)

    if (index < meldingen.length - 1) {
      acc.push(<Hr />)
    }

    return acc
  }, [] as KeyValueDetail[])

  return (
    <CaseDetailSection
      title="Meldingen / aanleiding"
      dataSource="BWV"
      data={ meldingenData.length ? meldingenData : [ "Geen meldingen." ] }
    />
  )
}

export default Signal
