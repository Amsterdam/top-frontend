import React from "react"
import styled from "styled-components"
import { Heading, themeSpacing } from "@amsterdam/asc-ui"

import { permitType } from "app/state/rest"
import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"

import {
  Grid,
  Hr,
  HrWide,
  SourceInfo
} from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"
import { usePermitDetailsModal } from "./hooks/usePermitDetailsModal"

type Props = {
  title: string
  permits?: permitType[]
}

const Details = styled.details`
  margin-top: ${ themeSpacing(4) };
`

const Summary = styled.summary`
  margin-bottom: ${ themeSpacing(4) };
`

const PermitDetailsModal: React.FC<Props> = ({ title, permits }) => {
  const { shouldShow } = usePermitDetailsModal()

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title={ title }>
      <SourceInfo>Bron: Decos JOIN</SourceInfo>
      <HrWide />
      { permits?.map((permit) => {
          const rawData = Object.entries(permit.raw_data).sort()
          return (
            <section>
              <Heading forwardedAs="h3">{ permit.permit_type }</Heading>
              <Grid>
                <Label>Status</Label>
                <Value value={ permit.details.RESULT_VERBOSE } />
                <Label>Geldig per</Label>
                <Value value={ permit.date_from } />
              </Grid>
              { rawData &&
              <Details>
                <Summary>Alle informatie</Summary>
                <Grid>
                  { rawData.map(([ key, value ]) => (
                      <>
                        <Label>{ key }</Label>
                        <Value value={ value } />
                      </>
                    )
                  )
                  }
                </Grid>
              </Details>
              }
              <Hr />
            </section>)
        }
      ) }
    </DefaultModal>)
}

export default PermitDetailsModal
