import React, { FunctionComponent } from "react"
import InvalidValue from "app/features/cases/components/atoms/Value/InvalidValue"

type Props = {
  valid?: Boolean
  value?: string | number
}

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

  return <>{ value || children }</>
}

export default Value
