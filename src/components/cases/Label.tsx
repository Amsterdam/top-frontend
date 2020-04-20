import styled from "styled-components"
import { color } from "@datapunt/asc-ui"

const Label = styled.label`
  display: inline-block;
  min-width: 160px;
  padding-right: 20px;
  color: ${ color("tint", "level4") };
  margin-bottom: 8px;
`
export default Label
