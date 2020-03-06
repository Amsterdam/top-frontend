import React, { FC } from "react"
import PlanningResultLists from "./PlanningResultLists"
import useGlobalState from "../../hooks/useGlobalState"
import formatDate from "../../lib/utils/formatDate"
import { Spinner } from "@datapunt/asc-ui"
import styled from "styled-components"

const Div = styled.div`
  margin-bottom: 24px
`
const H1 = styled.h1`
  font-size: 24px
`

const PlanningResult: FC = () => {

  const {
    planning: {
      results,
      timestamp
    }
  } = useGlobalState()

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const {
    unplanned_cases: unplannedCases
  } = results || {}

  console.log(results)

  const numPlannedCases = hasResult ? results!.lists.map(list => list.itineraries).flat(2).length : 0
  const numUnplannedCases = unplannedCases ? unplannedCases.length : 0
  const numTotalCases = numPlannedCases + numUnplannedCases
  const showUnplannedCases = numUnplannedCases > 0

  type MorningOrAfternoon = "morning" | "afternoon"
  const listsMonday = results ? results.lists.filter(list => list.name.match(/^Maandag/)) : []
  const listsMondayMorning = listsMonday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsMondayAfternoon = listsMonday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsMondayPrimary: MorningOrAfternoon =
    (listsMondayMorning[0] ? listsMondayMorning[0].itineraries.length : 0) >=
    (listsMondayAfternoon[0] ? listsMondayAfternoon[0].itineraries.length : 0) ?
    "morning" :
    "afternoon"
  const listsMondayToMap = listsMondayPrimary === "morning" ? listsMondayMorning : listsMondayAfternoon
  const listsMondayToIndex = listsMondayPrimary === "morning" ? listsMondayAfternoon : listsMondayMorning
  const listsMondayEvening = listsMonday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsTuesday = results ? results.lists.filter(list => list.name.match(/^Dinsdag/)) : []
  const listsTuesdayMorning = listsTuesday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsTuesdayAfternoon = listsTuesday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsTuesdayPrimary: MorningOrAfternoon =
    (listsTuesdayMorning[0] ? listsTuesdayMorning[0].itineraries.length : 0) >=
    (listsTuesdayAfternoon[0] ? listsTuesdayAfternoon[0].itineraries.length : 0) ?
    "morning" :
    "afternoon"
  const listsTuesdayToMap = listsTuesdayPrimary === "morning" ? listsTuesdayMorning : listsTuesdayAfternoon
  const listsTuesdayToIndex = listsTuesdayPrimary === "morning" ? listsTuesdayAfternoon : listsTuesdayMorning
  const listsTuesdayEvening = listsTuesday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsWednesday = results ? results.lists.filter(list => list.name.match(/^Woensdag/)) : []
  const listsWednesdayMorning = listsWednesday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsWednesdayAfternoon = listsWednesday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsWednesdayPrimary: MorningOrAfternoon =
    (listsWednesdayMorning[0] ? listsWednesdayMorning[0].itineraries.length : 0) >=
    (listsWednesdayAfternoon[0] ? listsWednesdayAfternoon[0].itineraries.length : 0) ?
    "morning" :
    "afternoon"
  const listsWednesdayToMap = listsWednesdayPrimary === "morning" ? listsWednesdayMorning : listsWednesdayAfternoon
  const listsWednesdayToIndex = listsWednesdayPrimary === "morning" ? listsWednesdayAfternoon : listsWednesdayMorning
  const listsWednesdayEvening = listsWednesday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsThursday = results ? results.lists.filter(list => list.name.match(/^Donderdag/)) : []
  const listsThursdayMorning = listsThursday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsThursdayAfternoon = listsThursday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsThursdayPrimary: MorningOrAfternoon =
    (listsThursdayMorning[0] ? listsThursdayMorning[0].itineraries.length : 0) >=
    (listsThursdayAfternoon[0] ? listsThursdayAfternoon[0].itineraries.length : 0) ?
    "morning" :
    "afternoon"
  const listsThursdayToMap = listsThursdayPrimary === "morning" ? listsThursdayMorning : listsThursdayAfternoon
  const listsThursdayToIndex = listsThursdayPrimary === "morning" ? listsThursdayAfternoon : listsThursdayMorning
  const listsThursdayEvening = listsThursday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsFriday = results ? results.lists.filter(list => list.name.match(/^Vrijdag/)) : []
  const listsFridayMorning = listsFriday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsFridayAfternoon = listsFriday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsFridayPrimary: MorningOrAfternoon =
    (listsFridayMorning[0] ? listsFridayMorning[0].itineraries.length : 0) >=
    (listsFridayAfternoon[0] ? listsFridayAfternoon[0].itineraries.length : 0) ?
    "morning" :
    "afternoon"
  const listsFridayToMap = listsFridayPrimary === "morning" ? listsFridayMorning : listsFridayAfternoon
  const listsFridayToIndex = listsFridayPrimary === "morning" ? listsFridayAfternoon : listsFridayMorning
  const listsFridayEvening = listsFriday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsSaturday = results ? results.lists.filter(list => list.name.match(/^Zaterdag/)) : []

  const listsSunday = results ? results.lists.filter(list => list.name.match(/^Zondag/)) : []

  // Day planning
  const listsDay = results ? results.lists.filter(list => list.name.match(/^Dag/)) : []
  const listsDayMorning = listsDay.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsDayAfternoon = listsDay.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsDayEvening = listsDay.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <Spinner size={ 60 } />
      }
      { hasResult &&
        <>
          <H1>Looplijsten</H1>
          <Div>
            <p><label>gegenereerd op: </label>{ timestamp ? `${ formatDate(timestamp, true) } ${ timestamp.getHours() }:${ timestamp.getMinutes() } uur` : "-" }</p>
            <p><label>ingedeeld: </label>{ numPlannedCases }</p>
            <p><label>niet ingedeeld: </label>{ numUnplannedCases }</p>
            <p><label>totaal: </label>{ numTotalCases }</p>
          </Div>
          { listsMondayToMap.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Maandag Dag Team ${ index2 + 1 }`
                const itinerariesIndexed = listsMondayToIndex[index] ? listsMondayToIndex[index].itineraries[index2] : undefined
                const subtitles = itinerariesIndexed !== undefined ? ["Ochtend", "Middag"] : undefined
                const lists = listsMondayPrimary === "morning" ? [itineraries, itinerariesIndexed] : [itinerariesIndexed, itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsMondayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Maandag Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsTuesdayToMap.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Dinsdag Dag Team ${ index2 + 1 }`
                const itinerariesIndexed = listsTuesdayToIndex[index] ? listsTuesdayToIndex[index].itineraries[index2] : undefined
                const subtitles = itinerariesIndexed !== undefined ? ["Ochtend", "Middag"] : undefined
                const lists = listsTuesdayPrimary === "morning" ? [itineraries, itinerariesIndexed] : [itinerariesIndexed, itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsTuesdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Dinsdag Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsWednesdayToMap.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Woensdag Dag Team ${ index2 + 1 }`
                const itinerariesIndexed = listsWednesdayToIndex[index] ? listsWednesdayToIndex[index].itineraries[index2] : undefined
                const subtitles = itinerariesIndexed !== undefined ? ["Ochtend", "Middag"] : undefined
                const lists = listsWednesdayPrimary === "morning" ? [itineraries, itinerariesIndexed] : [itinerariesIndexed, itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsWednesdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Woensdag Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsThursdayToMap.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Donderdag Dag Team ${ index2 + 1 }`
                const itinerariesIndexed = listsThursdayToIndex[index] ? listsThursdayToIndex[index].itineraries[index2] : undefined
                const subtitles = itinerariesIndexed !== undefined ? ["Ochtend", "Middag"] : undefined
                const lists = listsThursdayPrimary === "morning" ? [itineraries, itinerariesIndexed] : [itinerariesIndexed, itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsThursdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Donderdag Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsFridayToMap.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Vrijdag Dag Team ${ index2 + 1 }`
                const itinerariesIndexed = listsFridayToIndex[index] ? listsFridayToIndex[index].itineraries[index2] : undefined
                const subtitles = itinerariesIndexed !== undefined ? ["Ochtend", "Middag"] : undefined
                const lists = listsFridayPrimary === "morning" ? [itineraries, itinerariesIndexed] : [itinerariesIndexed, itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsFridayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Vrijdag Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsSaturday.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Zaterdag Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsSunday.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Zondag Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsDayMorning.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsDayAfternoon[index] ? listsDayAfternoon[index].itineraries[index2] : undefined
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultLists key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsDayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Avond Team ${ index2 + 1 }`
                return <PlanningResultLists key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { showUnplannedCases &&
            <PlanningResultLists title="Niet ingedeeld" lists={ [unplannedCases!] } hasCopyButton={ false } isEditable={ false } />
          }
        </>
      }
    </div>
  )
}
export default PlanningResult
