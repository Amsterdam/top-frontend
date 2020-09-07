import React from "react"
import styled from "styled-components"
import { useFormState } from "react-final-form"
import { Spinner, themeColor, themeSpacing } from "@datapunt/asc-ui"

import displayAddress from "app/features/shared/utils/displayAddress"

import { FormValues } from "../types"
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

  const address = itineraryItem && displayAddress(
    itineraryItem?.case.bwv_data.street_name || "",
    itineraryItem?.case.bwv_data.street_number || "",
    itineraryItem?.case.bwv_data.suffix,
    itineraryItem?.case.bwv_data.suffix_letter
  )

  return (
    <Wrap>
      <Title>{ address || <Spinner /> }</Title>
      <Time>{ start_time }</Time>
    </Wrap>)
}

export default NodeWizardSubtitle
