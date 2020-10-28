import React, { useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"

import { useCase, useCaseVisits, useUsers } from "app/state/rest"
import { BWVHotlineBevinding, KeyValueDetail } from "app/features/types"

import formatDate from "app/features/shared/utils/formatDate"
import highlightText from "app/features/shared/utils/highlightText"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import Purified from "app/features/shared/components/molecules/Purified/Purified"
import { formatTime } from "app/features/shared/utils/formatTime"

import CaseDetailSection from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"
import Hr from "app/features/cases/components/atoms/Hr/Hr"

import { isNullish, translate } from "./util"
import List from "./List"

type Props = {
  caseId: string
}

type LogBookItem = {
  source?: string
  name: string
  date: string
  time: string
  hit?: boolean
  text?: string
  situation?: string | null
  observations?: string[] | null
  suggest_next_visit?: string | null
  suggest_next_visit_description?: string | null
  can_next_visit_go_ahead?: boolean | null
  can_next_visit_go_ahead_description?: string | null
  description?: string | null
  sort: Date
}

// Maps a BWVHotlineBevinding to a LogBookItem
const mapBWVToLogBookItem = ({
  toez_hdr1_naam,
  toez_hdr2_naam,
  bevinding_datum,
  bevinding_tijd,
  hit,
  opmerking
}: BWVHotlineBevinding): LogBookItem => ({
  source: "BWV",
  name: [toez_hdr1_naam, toez_hdr2_naam].filter(i => i != null).join(", "),
  date: formatDate(bevinding_datum, true)!,
  time: bevinding_tijd,
  hit: hit === "J",
  text: replaceNewLines((opmerking || "").trim(), "<br /><br />"),
  sort: new Date(bevinding_datum)
})

// Maps a Visit to a LogBookItem
const mapVisitToLogbookItem = (users: Components.Schemas.User[]) => ({
  author,
  start_time,
  suggest_next_visit_description,
  can_next_visit_go_ahead_description,
  description,
  ...rest
}: Components.Schemas.Visit): LogBookItem => ({
  name: users.find(_ => _.id === author)?.full_name ?? author,
  date: formatDate(start_time, true)!,
  time: formatTime(start_time),
  sort: new Date(start_time),
  suggest_next_visit_description: replaceNewLines((suggest_next_visit_description || "").trim(), "<br />"),
  can_next_visit_go_ahead_description: replaceNewLines((can_next_visit_go_ahead_description || "").trim(), "<br />"),
  description: replaceNewLines((description || "").trim(), "<br />"),
  ...rest
})

// Maps a LogBookItem to a KeyValueDetail[] (accepted by CaseDetailSection `data`)
const mapLogBookItemToDetailComponents = ({
  source,
  name,
  time,
  date,
  hit,
  text,
  situation,
  observations,
  suggest_next_visit,
  suggest_next_visit_description,
  can_next_visit_go_ahead,
  can_next_visit_go_ahead_description,
  description
}: LogBookItem, index: number, allItems: LogBookItem[]): KeyValueDetail[] => {
  const highlightedText = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], text || "", { caseSensitive: false })
  const highlightedDescription = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], description || "", { caseSensitive: false })

  return [
    !isNullish(source) && [ "Bron", source ],
    [ "Toezichthouder(s)", <strong className="anonymous">{ name }</strong> ],
    [ "Starttijd", `${ time } uur` ],
    [ "Datum", date ],
    !isNullish(hit) && [ "Hit", hit ],
    !isNullish(situation) && [ "Situatie", translate(situation) ],
    !isNullish(observations) && [ "Kenmerken", <List items={ observations.map(translate) } /> ],
    !isNullish(suggest_next_visit) && [ "Volgend bezoek", translate(suggest_next_visit) ],
    !isNullish(suggest_next_visit_description) &&
    <Purified className="anonymous" text={ suggest_next_visit_description } />,
    !isNullish(can_next_visit_go_ahead) && [ "Vervolg actie", can_next_visit_go_ahead ? "Ja, doorlaten" : "Nee, tegenhouden ⚠️" ],
    !isNullish(can_next_visit_go_ahead_description) &&
    <Purified className="anonymous" text={ can_next_visit_go_ahead_description } />,
    !isNullish(text) && <Purified className="anonymous" text={ highlightedText } />,
    !isNullish(description) && [ "Toelichting", <Purified className="anonymous" text={ highlightedDescription } /> ],
    index < allItems.length - 1 && <Hr />
  ].filter(_ => !!_)
}

const CaseLogBook: React.FC<Props> = ({ caseId }) => {
  const { data: caseData, isBusy: isCaseBusy } = useCase(caseId)
  const { data: caseVisitsData, isBusy: isVisitsBusy } = useCaseVisits(caseId)
  const { data: users, isBusy: isUsersBusy } = useUsers()

  const isBusy = isCaseBusy || isVisitsBusy || isUsersBusy

  const items = useMemo(() => {
    // Safeguard.
    if (caseData === undefined || caseVisitsData === undefined || users === undefined) {
      return undefined
    }

    // Map apiData to LogBookItems:
    const logBookItems: LogBookItem[] = [
      ...caseData?.bwv_hotline_bevinding.map(mapBWVToLogBookItem),
      ...caseVisitsData.map(mapVisitToLogbookItem(users.results))
    ].sort((a,b) => a.sort > b.sort ? -1 : 1)

    // Map to CaseDetail-data components:
    return logBookItems
      .map(mapLogBookItemToDetailComponents)
      .flat()
  }, [ caseData, caseVisitsData, users ])

  return <CaseDetailSection
    title="Logboek"
    data={ items ?? [ isBusy ? <Spinner /> : "-"]}
  />
}

export default CaseLogBook
