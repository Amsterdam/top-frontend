import styled, { css } from "styled-components"

type Props = {
  p?: number
  pt?: number
  pb?: number
  pr?: number
  pl?: number
}

const Spacing = styled.div<Props>`
  ${ (props) => props.p && css`padding: ${ props.p * 4 }px` }
  ${ (props) => props.pt && css`padding-top: ${ props.pt * 4 }px` }
  ${ (props) => props.pb && css`padding-bottom: ${ props.pb * 4 }px` }
  ${ (props) => props.pr && css`padding-right: ${ props.pr * 4 }px` }
  ${ (props) => props.pl && css`padding-left: ${ props.pl * 4 }px` }
`

export default Spacing
