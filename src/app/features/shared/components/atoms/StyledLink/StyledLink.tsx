import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

/**
 * A wrapper for the HTML anchor tag to attach its correct visual design.
 */
const StyledLink = styled.a`
  color: ${ themeColor("primary") };
`

export default StyledLink
