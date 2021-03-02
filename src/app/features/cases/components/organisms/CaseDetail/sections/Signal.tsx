import React, { FC } from "react"

import { useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"
import highlightText from "app/features/shared/utils/highlightText"
import StyledLink from "app/features/shared/components/atoms/StyledLink/StyledLink"
import Purified from "app/features/shared/components/molecules/Purified/Purified"
import { KeyValueDetail } from "app/features/types"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

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

    acc.push([ "Datum", datum || "–" ])
    acc.push([ "Anoniem", anoniem ])
    acc.push([ "Melder", <span className="anonymous"> { naam }</span> || "–" ])
    acc.push([ "Telefoonnummer", telnr ?
      <StyledLink className="anonymous" href={ "tel://" + telnr }>{ telnr }</StyledLink> : "–" ])
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
