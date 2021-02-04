import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`

export const Hr = styled.hr`
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
`

export const HrWide = styled(Hr)`
  margin: 12px -16px;
`

export const CenteredAnchor = styled.a`
  display: block;
  text-align: center;
`

export const Section = styled.section`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

export const SectionRow = styled.div`
  padding: 12px;
  border: 1px solid #B4B4B4;

  &:not(:last-child) {
    border-bottom-width: 0;
  }
`

export const SourceInfo = styled.p`
  margin: 0;
  color: ${ themeColor("tint", "level5") };
  text-align: right;
`

export const SpanColumns = styled.div`
  grid-column: span 2;
  justify-self: stretch;
`
