import React, { FC } from "react"
import styled from "styled-components"

import { Heading, themeColor } from "@amsterdam/asc-ui"

import displayBoolean from "app/features/shared/utils/displayBoolean"

import Label from "app/features/cases/components/atoms/Label/Label"
import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import { KeyValueDetail } from "app/features/types"

import { CenteredAnchor, Section, SectionRow } from "./CaseDetailStyles"
import Hr from "../../atoms/Hr/Hr"

type Props = {
  id?: string
  title?: string
  dataSource?: string
  data: KeyValueDetail[]
  footer?: {title: string, link: string}
}

const Div = styled.div`
  display: flex;
`

const P = styled.p`
  margin: 0 0 8px;
`

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
        { data.map((keyValue, index) => {
          const hasLabel = Array.isArray(keyValue)
          const key = Array.isArray(keyValue) ? keyValue[0] : keyValue
          let value = Array.isArray(keyValue) ? keyValue[1] : keyValue
          if (typeof value === "boolean") {
            value = displayBoolean(value)
          }
          const isString = typeof value === "string"
          const isUndefined = value == null

          const keyValuePair = <div key={ String(key) + index }>
            { hasLabel &&
            <Div>
              <Label>{ key }</Label>
              { isUndefined ?
                <InvalidDataSpan /> :
                <span>{ value }</span>
              }
            </Div>
            }
            { !hasLabel &&
            <>
              { isString && <P>{ value }</P> }
              { !isString && value }
            </>
            }
          </div>

          const sourceLabel = <div key={ "dataSource" + index }>
            { (index > 0 && !dataSource) && <HrWide /> }
            <SourceInfo>Bron: { value }</SourceInfo>
          </div>

          return key === "Databron" ? sourceLabel : keyValuePair
        }) }
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
