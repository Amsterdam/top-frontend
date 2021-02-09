import React, { FunctionComponent } from "react"
import styled from "styled-components"

import formatBoolean from "app/features/shared/utils/formatBoolean"
import InvalidValue from "app/features/cases/components/atoms/Value/InvalidValue"

type Props = {
  valid?: Boolean
  value?: any
}

const Text = styled.span`
  word-break: break-word;
`

/**
 * Displays a value if it’s valid, or its children, or an <InvalidValue /> if the value is invalid.
 * @param valid A condition expressing the validity of the value. If omitted, the value is checked for undefined.
 * @param value The value to display.
 * @param children Child components are displayed if no value is provided and validity evaluates to true.
 * @constructor
 * @todo Incorporate <InvalidValue/>
 * @todo Incorporate <InlineSkeleton/>
 */
const Value: FunctionComponent<Props> = ({ valid, value, children }) => {
  if (valid === false || (value === undefined && !children)) {
    return <InvalidValue />
  }

  if (typeof value === "boolean" || [ "True", "False", "UNKNOWN" ].includes(value)) {
    value = formatBoolean(value)
  }

  if (typeof value === "number") {
    value = String(value)
  }

  return value ? <Text>{ value }</Text> : <Text>{ children }</Text>
}

export default Value
