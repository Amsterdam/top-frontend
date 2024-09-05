import React, { useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"

import { useCase, useCaseVisits, useObservations, useSuggestNextVisit, useUsers } from "app/state/rest"
import { KeyValueDetail } from "app/features/types"
import formatDate from "app/features/shared/utils/formatDate"
import { formatTime } from "app/features/shared/utils/formatTime"
import highlightText from "app/features/shared/utils/highlightText"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import Purified from "app/features/shared/components/molecules/Purified/Purified"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"
import List from "../List"
import { isNullish, mapLogbookValue } from "../utils"
import styled from "styled-components"

type Props = {
  caseId: string
}

type LogbookItem = {
  source?: string
  name: string | null
  toezichthouders: string[]
  handhaver: string | null
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

const LogbookDescription = styled.div`
  background: #eee;
  padding: 1em;
  border-radius: 0.5em;
`

// Maps a visit to a log book item
const mapVisitToLogbookItem = (users: Components.Schemas.User[]) => (
  {
    author,
    team_members,
    start_time,
    suggest_next_visit_description,
    can_next_visit_go_ahead_description,
    description,
    ...rest
  }: Components.Schemas.Visit
): LogbookItem => (
  {
    name: users.find(_ => _.id === author)?.full_name ?? author,
    toezichthouders: team_members.slice(0, 2).map((tm: Components.Schemas.VisitTeamMember) => tm.user.full_name),
    handhaver: team_members[2] && team_members[2].user.full_name,
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
    toezichthouders,
    handhaver,
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
    !isNullish(name) && !toezichthouders.length && [ "Auteur", <strong className="anonymous">{ name }</strong> ],
    toezichthouders.length && [
      (toezichthouders.length === 1) ? "Toezichthouder" : "Toezichthouders",
      <strong className="anonymous">{ toezichthouders.join(", ") }</strong>
    ],
    !isNullish(handhaver) && [ "Handhaver", <strong className="anonymous">{ handhaver }</strong> ],
    [ "Starttijd", `${ time } uur` ],
    [ "Datum", date ],
    !isNullish(hit) && [ "Hit", hit ],
    !isNullish(situation) && [ "Situatie", mapLogbookValue(situation) ],
    !isNullish(observations) && [ "Kenmerken", <List items={ observations.map(translateObservation) } /> ],
    !isNullish(suggest_next_visit) && [ "Volgend bezoek", translateSuggestNextVisits(suggest_next_visit) ],
    !isNullish(suggest_next_visit_description) &&
    <Purified className="anonymous" text={ suggest_next_visit_description } />,
    !isNullish(can_next_visit_go_ahead) && [ "Vervolgactie", can_next_visit_go_ahead ? "Ja, doorlaten" : "Nee, tegenhouden ⚠️" ],
    !isNullish(can_next_visit_go_ahead_description) &&
    <Purified className="anonymous" text={ can_next_visit_go_ahead_description } />,
    !isNullish(text) && <Purified className="anonymous" text={ highlightedText } />,
    !isNullish(description) && <LogbookDescription><Purified className="anonymous" text={ highlightedDescription } /></LogbookDescription>,
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
    if (caseData === undefined || caseVisitsData === undefined || users === undefined) {
      return undefined
    }

    // Map API data to LogbookItems
    const logbookItems: LogbookItem[] = [
      ...caseVisitsData.map(mapVisitToLogbookItem(users.results))
    ].sort((a, b) => a.sort > b.sort ? -1 : 1)

    // Map to array of KeyValueDetails
    const details = logbookItems
      .map(mapLogbookItemToDetailComponents(observations?.results!, suggestNextVisits?.results!))
      .flat()

    return details.length ? details : [ "Geen notities" ]
  }, [ caseData, caseVisitsData, users, observations, suggestNextVisits ])

  return (
    <CaseDetailSection
      title="Logboek"
      data={ isBusy ? [ <Spinner /> ] : items ?? [] }
    />
  )
}

export default Logbook
