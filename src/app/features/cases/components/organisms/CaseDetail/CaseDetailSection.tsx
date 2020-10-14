import React, { FC } from "react"
import styled from "styled-components"

import displayBoolean from "app/features/shared/utils/displayBoolean"

import Label from "app/features/cases/components/atoms/Label/Label"
import Footer from "app/features/cases/components/atoms/Footer/Footer"
import InvalidDataSpan from "app/features/cases/components/atoms/InvalidDataSpan/InvalidDataSpan"
import { KeyValueDetail } from "app/features/types"

type Props = {
  id?: string
  title?: string
  data: KeyValueDetail[]
  footer?: {title: string, link: string}
}

const Section = styled.section`
  overflow: hidden;
  border: 1px solid #B4B4B4;
  margin-bottom: 15px;
  padding: 12px;
`
const Div = styled.div`
  display: flex;
`
const P = styled.p`
  margin: 0 0 8px;
`

const CaseDetailSection: FC<Props> = ({ id, title, data, footer }) => {
  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

  return (
    <Section id={ id !== undefined ? id : "" }>
      { hasTitle &&
      <h2>{ title }</h2>
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

        return (
          <div key={ String(key) + index }>
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
        )
      }) }
      { showFooter &&
      <Footer>
        <a href={ footer!.link }>{ footer!.title }</a>
      </Footer>
      }
    </Section>
  )
}

export default CaseDetailSection
