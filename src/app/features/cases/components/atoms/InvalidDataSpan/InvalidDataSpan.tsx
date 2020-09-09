import React, { FC } from "react"
import styled from "styled-components"
import { themeColor } from "@datapunt/asc-ui"

const Span = styled.span`
  color: ${ themeColor("support", "invalid") };
`

const InvalidDataSpan: FC = () => <Span>-</Span>
export default InvalidDataSpan
