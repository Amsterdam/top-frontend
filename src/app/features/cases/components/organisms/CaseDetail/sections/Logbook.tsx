import React, { useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"

import { useCase, useCaseVisits, useObservations, useSuggestNextVisit, useUsers } from "app/state/rest"
import { BWVHotlineBevinding, KeyValueDetail } from "app/features/types"

import formatDate from "app/features/shared/utils/formatDate"
import { formatTime } from "app/features/shared/utils/formatTime"
import highlightText from "app/features/shared/utils/highlightText"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import Hr from "app/features/cases/components/atoms/Hr/Hr"
import Purified from "app/features/shared/components/molecules/Purified/Purified"

import CaseDetailSection from "../CaseDetailSection"
import List from "../List"
import { isNullish, mapLogbookValue } from "../utils"

type Props = {
  caseId: string
}

type LogbookItem = {
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

// Maps a BWVHotlineBevinding to a LogbookItem
const mapBWVToLogbookItem = (
  {
    toez_hdr1_naam,
    toez_hdr2_naam,
    bevinding_datum,
    bevinding_tijd,
    hit,
    opmerking
  }: BWVHotlineBevinding
): LogbookItem => (
  {
    source: "BWV",
    name: [ toez_hdr1_naam, toez_hdr2_naam ].filter(i => i != null).join(", "),
    date: formatDate(bevinding_datum, true)!,
    time: bevinding_tijd,
    hit: hit === "J",
    text: replaceNewLines((opmerking || "").trim(), "<br /><br />"),
    sort: new Date(bevinding_datum)
  }
)

// Maps a visit to a log book item
const mapVisitToLogbookItem = (users: Components.Schemas.User[]) => (
  {
    author,
    start_time,
    suggest_next_visit_description,
    can_next_visit_go_ahead_description,
    description,
    ...rest
  }: Components.Schemas.Visit
): LogbookItem => (
  {
    name: users.find(_ => _.id === author)?.full_name ?? author,
    date: formatDate(start_time, true)!,
    time: formatTime(start_time),
    sort: new Date(start_time),
    suggest_next_visit_description: replaceNewLines((suggest_next_visit_description || "").trim(), "<br />"),
    can_next_visit_go_ahead_description: replaceNewLines((can_next_visit_go_ahead_description || "").trim(), "<br />"),
    description: replaceNewLines((description || "").trim(), "<br />"),
    ...rest
  }
)

// Maps a LogbookItem to a KeyValueDetail[] (accepted by CaseDetailSection `data`)
const mapLogbookItemToDetailComponents = (observationTranslations: Components.Schemas.Observation[], suggestNextVisitsTranslations: Components.Schemas.SuggestNextVisit[]) => (
  {
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
  }: LogbookItem,
  index: number,
  allItems: LogbookItem[]
): KeyValueDetail[] => {
  const highlightedText = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], text || "", { caseSensitive: false })
  const highlightedDescription = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], description || "", { caseSensitive: false })

  const observationTranslationsMap: Record<string, string> = (observationTranslations ?? []).reduce((t: any, c) => {
    t[c.value] = c.verbose
    return t
  }, {})
  const suggestNextVisitsTranslationsMap: Record<string, string> = (suggestNextVisitsTranslations ?? []).reduce((t: any, c) => {
    t[c.value] = c.verbose
    return t
  }, {})

  const translateObservation = (key: string) => observationTranslationsMap[key] ?? key
  const translateSuggestNextVisits = (key: string) => suggestNextVisitsTranslationsMap[key] ?? key

  return [
    !isNullish(source) && [ "Bron", source ],
    [ "Toezichthouder(s)", <strong className="anonymous">{ name }</strong> ],
    [ "Starttijd", `${ time } uur` ],
    [ "Datum", date ],
    !isNullish(hit) && [ "Hit", hit ],
    !isNullish(situation) && [ "Situatie", mapLogbookValue(situation) ],
    !isNullish(observations) && [ "Kenmerken", <List items={ observations.map(translateObservation) } /> ],
    !isNullish(suggest_next_visit) && [ "Volgend bezoek", translateSuggestNextVisits(suggest_next_visit) ],
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

const Logbook: React.FC<Props> = ({ caseId }) => {
  const { data: caseData, isBusy: isCaseBusy } = useCase(caseId)
  const { data: caseVisitsData, isBusy: isVisitsBusy } = useCaseVisits(caseId)
  const { data: suggestNextVisits, isBusy: isSuggestNextVisitBusy } = useSuggestNextVisit()
  const { data: observations, isBusy: isObservationsBusy } = useObservations()
  const { data: users, isBusy: isUsersBusy } = useUsers()

  const isBusy = isCaseBusy || isVisitsBusy || isUsersBusy || isSuggestNextVisitBusy || isObservationsBusy

  const items = useMemo(() => {
    // Safeguard
    if (caseData === undefined || caseVisitsData === undefined || users === undefined) {
      return undefined
    }

    // Map API data to LogbookItems
    const logbookItems: LogbookItem[] = [
      ...caseData?.bwv_hotline_bevinding.map(mapBWVToLogbookItem),
      ...caseVisitsData.map(mapVisitToLogbookItem(users.results))
    ].sort((a, b) => a.sort > b.sort ? -1 : 1)

    // Map to array of KeyValueDetails
    const details = logbookItems
      .map(mapLogbookItemToDetailComponents(observations?.results!, suggestNextVisits?.results!))
      .flat()

    return details.length ? details : [ "Geen notities." ]
  }, [ caseData, caseVisitsData, users, observations, suggestNextVisits ])

  return (
    <CaseDetailSection
      title="Logboek"
      data={ isBusy ? [ <Spinner /> ] : items! }
    />
  )
}

export default Logbook
