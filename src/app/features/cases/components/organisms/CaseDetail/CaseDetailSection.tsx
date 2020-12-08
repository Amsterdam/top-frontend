import React, { FC } from "react"
import styled from "styled-components"

import { Heading, themeColor } from "@amsterdam/asc-ui"

import displayBoolean from "app/features/shared/utils/displayBoolean"

import Label from "app/features/cases/components/atoms/Label/Label"
import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import { KeyValueDetail } from "app/features/types"

import { CenteredAnchor, Grid, Section, SectionRow, SpanColumns } from "./CaseDetailSectionStyles"
import Hr from "../../atoms/Hr/Hr"

type Props = {
  id?: string
  title?: string
  dataSource?: string
  data: KeyValueDetail[]
  footer?: { title: string, link: string }
}

const SourceInfo = styled.p`
  margin-top: 0;
  margin-bottom: 15px;
  color: ${ themeColor("tint", "level5") };
  text-align: right;
`

const HrWide = styled(Hr)`
  margin-left: -16px;
  margin-right: -16px;
`

const CaseDetailSection: FC<Props> = ({ id, dataSource, title, data, footer }) => {
  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

  return (
    <Section id={ id !== undefined ? id : "" }>
      { hasTitle &&
      <Heading forwardedAs="h2">{ title }</Heading>
      }
      <SectionRow>
        { dataSource &&
        <>
          <SourceInfo>Bron: { dataSource }</SourceInfo>
          <HrWide />
        </>
        }
        <Grid>
          { data.map((keyValue, index) => {
            const hasLabel = Array.isArray(keyValue)

            const key = Array.isArray(keyValue) ? keyValue[0] : keyValue
            let value = Array.isArray(keyValue) ? keyValue[1] : keyValue

            if (typeof value === "boolean") {
              value = displayBoolean(value)
            }

            const keyValuePair = <React.Fragment key={ String(key) + index }>
              { hasLabel ?
                <>
                  <Label>{ key }</Label>
                  { (value == null) ? <InvalidDataSpan /> : <span>{ value }</span> }
                </>
                :
                <SpanColumns key={ String(key) + index }>{ value }</SpanColumns>
              }
            </React.Fragment>

            const sourceLabel = (
              <SpanColumns key={ String(value) + index }>
                { (index > 0 && !dataSource) && <HrWide /> }
                <SourceInfo>Bron: { value }</SourceInfo>
              </SpanColumns>
            )

            return key === "Databron" ? sourceLabel : keyValuePair
          }) }
        </Grid>
      </SectionRow>
      { showFooter &&
      <SectionRow>
        <CenteredAnchor href={ footer!.link }>{ footer!.title }</CenteredAnchor>
      </SectionRow>
      }
    </Section>
  )
}

export default CaseDetailSection
