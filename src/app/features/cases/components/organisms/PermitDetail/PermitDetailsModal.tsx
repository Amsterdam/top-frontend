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
      { permits?.map((permit) => (
          <section key={ permit.permit_type }>
            <Heading forwardedAs="h3">{ permit.permit_type }</Heading>
            <Grid>
              <Label>Resultaat</Label>
              <Value value={ permit.details?.RESULT_VERBOSE } />
              <Label>Geldig per</Label>
              <Value value={ permit.date_from } />
            </Grid>
            { permit.raw_data &&
            <Details>
              <Summary>Alle informatie</Summary>
              <Grid>
                { Object.entries(permit.raw_data).sort().map(([ key, value ]) => (
                    <React.Fragment key={ key }>
                      <Label>{ key }</Label>
                      <Value value={ value } />
                    </React.Fragment>
                  )
                )
                }
              </Grid>
            </Details>
            }
            <Hr />
          </section>
        )
      ) }
    </DefaultModal>)
}

export default PermitDetailsModal
