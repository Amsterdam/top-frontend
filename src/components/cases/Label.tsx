import styled from "styled-components"
import { color } from "@datapunt/asc-ui"

const Label = styled.label`
  display: inline-block;
  width: 180px;
  padding-right: 20px;
  margin-bottom: 8px;
  color: ${ color("tint", "level4") };
  font-weight: 500;
`
export default Label
