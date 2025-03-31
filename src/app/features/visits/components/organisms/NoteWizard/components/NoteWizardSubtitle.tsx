import React from "react"
import styled from "styled-components"
import { useFormState } from "react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import displayAddress from "app/features/shared/utils/displayAddress"

import { FormValues } from "app/features/visits/components/organisms/NoteWizard/types"
import { ItineraryItem } from "app/features/types"

type Props = {
  itineraryItem?: ItineraryItem
}

const Wrap = styled.div`
  display: flex;
  margin: 0 -16px 0 -16px;
  padding: 0px 16px 12px 16px;
  border-bottom: 1px solid #E6E6E6
`

const Title = styled.div`
  font-weight: 600;
  flex 1;
`

const Time = styled.div`
  font-weight: 600;
  flex 1;
  text-align: right;
`

const NodeWizardSubtitle: React.FC<Props> = ({ itineraryItem }) => {
  const { values: { start_time } } = useFormState<FormValues>()

  const address = itineraryItem
    ? displayAddress(
      itineraryItem.case.data.address.street_name,
      itineraryItem.case.data.address.number,
      itineraryItem.case.data.address.suffix_letter,
      itineraryItem.case.data.address.suffix
    )
    : undefined

  return (
    <Wrap>
      <Title>{ address || <Spinner /> }</Title>
      <Time>{ start_time }</Time>
    </Wrap>)
}

export default NodeWizardSubtitle
