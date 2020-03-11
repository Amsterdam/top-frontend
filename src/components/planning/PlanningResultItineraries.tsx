import React, { FC, MouseEvent } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import MapsButton from "../itineraries/MapsButton"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import PlanningResultItinerariesAddForm from "./PlanningResultItinerariesAddForm"

type Props = {
  title?: string
  itineraries: BWVData[]
  isCopied?: boolean
  isEditable?: boolean
}

const Div = styled.div`
  margin: 0 12px
`
const H2Wrap = styled.div`
  margin: 16px 0
`
const H2 = styled.h2`
  font-size: 16px
  margin-right: 24px
  display: inline-block
`
const Table = styled.table`
  width: 100%
  border-collapse: collapse
  margin-bottom: 36px
`
const Tr = styled.tr`
  border-bottom: solid 1px #B4B4B4
`
const Th = styled.th`
  width: 25%
  text-align: left
  padding: 8px 0
`
const ThSmall = styled(Th)`
  width: 12.5%
`
const Td = styled.td`
  padding: 8px 0
  transition: opacity 0.2s ease-out
  opacity: ${ (props: { faded?: boolean }) => props.faded ? 0.2 : 1 }
`
const ErrorMessageWrap = styled.div`
  margin: 12px 0
`

const PlanningResultItineraries: FC<Props> = ({ title, itineraries, isCopied = false, isEditable = true }) => {

  const {
    planningActions: {
      removeItinerary
    }
  } = useGlobalState()

  const hasTitle = title !== undefined
  const length = itineraries.length
  const titleDisplay = hasTitle ? `${ title } (${ length })` : ""
  const showErrorMessage = length === 0

  const onClick = (index: number) => (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const itinerary = itineraries[index]
    removeItinerary(itinerary.case_id)
  }

  const showAddForm = isEditable && itineraries.length > 0
  const caseId = itineraries.length > 0 ? itineraries[0].case_id : ""

  const showDeleteButton = isEditable && itineraries.length > 1

  return (
    <Div className="PlanningResultItineraries">
      <H2Wrap>
        { hasTitle &&
          <H2>{ titleDisplay }</H2>
        }
        <MapsButton $as="a" cases={ itineraries } />
      </H2Wrap>
      <Table>
        <thead>
          <Tr>
            <Th>Straat</Th>
            <ThSmall>Postcode</ThSmall>
            <Th>Openingsreden</Th>
            <Th>Stadium</Th>
            <ThSmall></ThSmall>
            <ThSmall></ThSmall>
          </Tr>
        </thead>
        <tbody>
        { itineraries.map((itinerary, index) => {
            const {
              street_name: streetName,
              street_number: streetNumber,
              suffix,
              suffix_letter: suffixLetter,
              case_id: caseId,
              postal_code: postalCode,
              stadium,
              case_reason: caseReason
            } = itinerary
            const address = displayAddress(streetName, streetNumber, suffixLetter || undefined, suffix || undefined)
            return (
              <Tr key={ caseId }>
                <Td faded={ isCopied }>{ address }</Td>
                <Td faded={ isCopied }>{ postalCode }</Td>
                <Td faded={ isCopied }>{ caseReason }</Td>
                <Td faded={ isCopied }>{ stadium }</Td>
                <Td><a href={ `/cases/${ caseId }` }>bekijk</a></Td>
                <Td>
                  { showDeleteButton &&
                    <a onClick={ onClick(index) } href="">verwijder</a>
                  }
                </Td>
              </Tr>
            )
          })
        }
        </tbody>
      </Table>
      { showErrorMessage &&
        <ErrorMessageWrap>
          <ErrorMessage text="Onvoldoende zaken beschikbaar om deze lijst te genereren" />
        </ErrorMessageWrap>
      }
      {
        showAddForm &&
        <PlanningResultItinerariesAddForm caseId={ caseId } />
      }
    </Div>
  )
}
export default PlanningResultItineraries
