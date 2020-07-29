import React from "react"
import styled from "styled-components"
import { useFormState } from "react-final-form"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

import useGlobalState from "../../../../hooks/useGlobalState"
import displayAddress from "../../../../lib/displayAddress"
import { FormValues } from "../types"

type Props = {
  caseID: CaseId
}

const Wrap = styled.div`
  display: flex;

  margin: 0 -${ themeSpacing(4) } ${ themeSpacing(4) } -${ themeSpacing(4) };
  padding: ${ themeSpacing(0) } ${ themeSpacing(4) } ${ themeSpacing(3) } ${ themeSpacing(4) };
  
  border-bottom: 1px solid ${ themeColor("tint", "level5") }
`

const Title = styled.div`
  font-weight: bold;
  flex 1;
`

const Time = styled.div`
  font-weight: bold;
  flex 1;
  text-align: right;
`

const NodeWizardSubtitle: React.FC<Props> = ({ caseID }) => {
  const { itineraries: { itineraries } } = useGlobalState()
  const { values: { start_time } } = useFormState<FormValues>()

  const item = itineraries
    .reduce((acc, item) => [...acc, ...item.items], [] as ItineraryItems)
    .find(_ => _.id.toString() === caseID)

  const address = displayAddress(
    item?.case?.bwv_data?.street_name || "",
    item?.case?.bwv_data?.street_number || "",
    item?.case?.bwv_data?.suffix_letter || undefined,
    item?.case?.bwv_data?.suffix || undefined
  )

  return (
    <Wrap>
      <Title>{ address ?? "..." }</Title>
      <Time>{ start_time }</Time>
    </Wrap>)
}

export default NodeWizardSubtitle
