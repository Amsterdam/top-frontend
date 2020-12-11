import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  grid-gap: ${ themeSpacing(3) } ${ themeSpacing(4) };
  place-items: baseline start;
`

export const SpanColumns = styled.div`
  grid-column: span 2;
`
