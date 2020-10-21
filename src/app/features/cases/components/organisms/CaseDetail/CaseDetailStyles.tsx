import styled from "styled-components"

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
