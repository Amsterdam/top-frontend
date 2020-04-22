import styled from 'styled-components'

export type GridArea =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "monday_evening"
  | "tuesday_evening"
  | "wednesday_evening"
  | "thursday_evening"
  | "friday_evening"

export const Grid = styled.div`  
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "monday tuesday wednesday thursday friday" 
                       "saturday sunday . . ." 
                       "monday_evening tuesday_evening wednesday_evening thursday_evening friday_evening"; 
`

type GridCellProps = {
  area:GridArea
}

export const GridCell = styled.div`
  grid-area: ${({area}:GridCellProps) => area};
`

