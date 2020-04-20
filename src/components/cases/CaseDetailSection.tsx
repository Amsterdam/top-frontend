import React, { FC } from "react"
import styled from "styled-components"
import Label from "./Label"
import Footer from "./Footer"
import InvalidDataSpan from "../global/InvalidDataSpan"
import displayBoolean from "../../lib/displayBoolean"

type Props = {
  id?: string
  title?: string
  data: KeyValueDetails
  footer?: { title: string, link: string }
}

const Section = styled.section`
  overflow: hidden;
  border: 1px solid #B4B4B4;
  margin-bottom: 15px;
  padding: 12px;
`

const P = styled.p`
  margin-bottom: 8px;
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
                <>
                  <Label>{ key }</Label>
                  { isUndefined ?
                    <InvalidDataSpan /> :
                    <span>{ value }</span>
                  }
                </>
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
