import styled from "styled-components"
import StyledLink from "app/features/shared/components/atoms/StyledLink/StyledLink"

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  grid-gap: 12px 16px;
  place-items: baseline start;
`

export const Hr = styled.hr`
  margin: 0;
  border: 0;
  height: 1px;
  background: #B4B4B4;
`

export const HrWide = styled(Hr)`
  margin: 12px -16px;
`

export const StyledAnchor = styled(StyledLink)`
  display: block;
  text-align: center;
`

export const Section = styled.section`
  break-inside: avoid-column;
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
  color: #767676;
  text-align: right;
`

export const TwoColumns = styled.div`
  grid-column: span 2;
  justify-self: stretch;
`
