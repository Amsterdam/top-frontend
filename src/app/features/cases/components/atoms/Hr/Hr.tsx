import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

export default styled.hr`
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
  margin: 12px 0;
`
