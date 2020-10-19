import React, { FC } from "react"
import styled from "styled-components"

import { Heading, themeColor } from "@amsterdam/asc-ui"

import displayBoolean from "app/features/shared/utils/displayBoolean"

import Label from "app/features/cases/components/atoms/Label/Label"
import Footer from "app/features/cases/components/atoms/Footer/Footer"
import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import { KeyValueDetail } from "app/features/types"

import { Section, SectionBody } from "./CaseDetailStyles"
import Hr from "../../atoms/Hr/Hr";

type Props = {
  id?: string
  title?: string
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
  color: ${ themeColor("tint", "level5") };
  text-align: right;
`

const CaseDetailSection: FC<Props> = ({ id, title, data, footer }) => {
  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

  return (
    <Section id={ id !== undefined ? id : "" }>
      { hasTitle &&
      <Heading forwardedAs="h2">{ title }</Heading>
      }
      <SectionBody>
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

          const SourceLabel = (index: number) => <>
            { index > 0 && <Hr /> }
            <SourceInfo>Bron: { value }</SourceInfo>
          </>

          return key === "Bron" ? SourceLabel(index) : keyValuePair
        }) }
        { showFooter &&
        <Footer>
          <a href={ footer!.link }>{ footer!.title }</a>
        </Footer>
        }
      </SectionBody>
    </Section>
  )
}

export default CaseDetailSection
