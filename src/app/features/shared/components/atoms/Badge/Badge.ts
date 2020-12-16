import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  variant?: "primary" | "secondary"
}

const Badge = styled.span<Props>`
  display: inline-block;
  background-color: ${ (props) => themeColor(props.variant ?? "primary") };
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${ themeColor("tint", "level1") };
  margin-bottom: ${ themeSpacing(2) };
`

export default Badge
