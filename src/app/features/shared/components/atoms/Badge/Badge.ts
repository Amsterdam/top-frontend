import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

export type Props = {
  variant?: "primary" | "secondary" | "tint"
  level?: "level5"
}

const Badge = styled.span<Props>`
  display: inline-block;
  background-color: ${ (props) => (props.variant && props.variant !== "tint") ? themeColor(props.variant ?? "primary") : themeColor("tint", "level5") };
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${ themeColor("tint", "level1") };
`

export default Badge
