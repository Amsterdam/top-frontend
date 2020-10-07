import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

const Label = styled.label`
  display: inline-block;
  width: 180px;
  padding-right: 20px;
  margin-bottom: 8px;
  color: ${ themeColor("tint", "level4") };
  font-weight: 500;
`
export default Label
