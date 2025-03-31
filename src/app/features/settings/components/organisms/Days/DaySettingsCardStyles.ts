import styled from "styled-components"

export const Section = styled.section`
  background-color: #F5F5F5;
  padding: 16px;
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
    padding-right: 16px;
  }
`

export const Dl = styled.dl`
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

export const Dt = styled.dt`
  margin-bottom: 4px;
  font-weight: 500;
  color: #767676;
`

export const Dd = styled.dd`
  margin: 0;
`

export const Ul = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
`

export const Li = styled.li`
  margin: 0;
  padding: 0 0 4px;
`
