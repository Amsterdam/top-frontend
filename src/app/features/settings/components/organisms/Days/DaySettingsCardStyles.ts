import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

export const Section = styled.section`
  background-color: ${ themeColor("tint", "level2") };
  padding: ${ themeSpacing(4) };
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
`

export const Body = styled.div`
  display: flex;
`

export const Column = styled.div`
  flex: 1;

  &:not(:last-child) {
    padding-right: ${ themeSpacing(4) };
  }
`

export const Dl = styled.dl`
  margin: 0;

  &:not(:last-child) {
    margin-bottom: ${ themeSpacing(4) };
  }
`

export const Dt = styled.dt`
  margin-bottom: ${ themeSpacing(1) };
  font-weight: 500;
  color: ${ themeColor("tint", "level5") };
`

export const Dd = styled.dd`
  margin: 0;
`

export const Ul = styled.ul`
  margin: 0;
  padding: 0 0 0 ${ themeSpacing(5) };
`

export const Li = styled.li`
  margin: 0;
  padding: 0 0 ${ themeSpacing(1) };
`
