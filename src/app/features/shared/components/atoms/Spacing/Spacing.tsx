import styled, { css } from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  p?: number
  pt?: number
  pb?: number
  pr?: number
  pl?: number
}

const Spacing = styled.div<Props>`
  ${ (props) => props.p && css`padding: ${ themeSpacing(props.p) }` }
  ${ (props) => props.pt && css`padding-top: ${ themeSpacing(props.pt) }` }
  ${ (props) => props.pb && css`padding-bottom: ${ themeSpacing(props.pb) }` }
  ${ (props) => props.pr && css`padding: ${ themeSpacing(props.pr) }` }
  ${ (props) => props.pl && css`padding: ${ themeSpacing(props.pl) }` }
`

export default Spacing
