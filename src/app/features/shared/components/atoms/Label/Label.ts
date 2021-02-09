import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

const Label = styled.label`
  color: ${ themeColor("tint", "level4") };
  font-weight: 500;
  word-break: break-word;
`

export default Label
