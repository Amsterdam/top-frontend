import React, { FC } from "react"
import styled from "styled-components"
import { Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import formatBoolean from "app/features/shared/utils/formatBoolean"
import Label from "app/features/cases/components/atoms/Label/Label"
import InvalidValue from "app/features/cases/components/atoms/Value/InvalidValue"
import { KeyValueDetail } from "app/features/types"

import {
  CenteredAnchor,
  Grid,
  Hr,
  Section,
  SectionRow,
  SpanColumns
} from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  id?: string
  title?: string
  dataSource?: string
  data: KeyValueDetail[]
  footer?: { title: string, link: string }
  experimental?: Boolean
}

const SourceInfo = styled.p`
  margin: 0;
  color: ${ themeColor("tint", "level5") };
  text-align: right;
`

const HrWide = styled(Hr)`
  margin: 12px -16px;
`

const WarningSubTitle = styled(Paragraph)`
  color: ${ themeColor("error") };
  margin-top: -${ themeSpacing(2) };
  margin-bottom: ${ themeSpacing(3) };
`

const CaseDetailSection: FC<Props> = ({ id, dataSource, title, data, footer, experimental }) => {
  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

  return (
    <Section id={ id !== undefined ? id : "" }>
      { hasTitle &&
      <Heading forwardedAs="h2">{ title }</Heading>
      }
      { experimental && <WarningSubTitle className="warning">experimenteel</WarningSubTitle> }
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
              value = formatBoolean(value)
            }

            const keyValuePair = <React.Fragment key={ String(key) + index }>
              { hasLabel ?
                <>
                  <Label>{ key }</Label>
                  { (value == null) ? <InvalidValue /> : <span>{ value }</span> }
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
