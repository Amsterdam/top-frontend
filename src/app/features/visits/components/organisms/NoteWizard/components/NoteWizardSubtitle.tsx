import React from "react"
import styled from "styled-components"
import { useFormState } from "react-final-form"
import { Spinner, themeColor, themeSpacing } from "@datapunt/asc-ui"

import { useCase } from "app/state/rest"

import displayAddress from "app/features/shared/utils/displayAddress"

import { FormValues } from "../types"

type Props = {
  caseID: string
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
  const { data: caseItem } = useCase(caseID)
  const { values: { start_time } } = useFormState<FormValues>()

  const address = displayAddress(
    caseItem?.import_adres.sttnaam || "",
    caseItem?.import_adres?.hsnr || "",
    caseItem?.import_adres?.toev || undefined,
    caseItem?.import_adres?.hsltr || undefined
  )

  return (
    <Wrap>
      <Title>{ address || <Spinner /> }</Title>
      <Time>{ start_time }</Time>
    </Wrap>)
}

export default NodeWizardSubtitle
