import React, { FC } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

const Span = styled.span`
  color: ${ themeColor("support", "invalid") };
`

const InvalidDataSpan: FC = () => <Span>-</Span>
export default InvalidDataSpan
