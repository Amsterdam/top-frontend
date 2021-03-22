import React from "react"
import styled from "styled-components"
import { useFormState } from "react-final-form"
import { Spinner, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import displayAddress from "app/features/shared/utils/displayAddress"

import { FormValues } from "app/features/visits/components/organisms/NoteWizard/types"
import { ItineraryItem } from "app/features/types"

type Props = {
  itineraryItem?: ItineraryItem
}

const Wrap = styled.div`
  display: flex;

  margin: 0 -${ themeSpacing(4) } 0 -${ themeSpacing(4) };
  padding: ${ themeSpacing(0) } ${ themeSpacing(4) } ${ themeSpacing(3) } ${ themeSpacing(4) };

  border-bottom: 1px solid ${ themeColor("tint", "level3") }
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
