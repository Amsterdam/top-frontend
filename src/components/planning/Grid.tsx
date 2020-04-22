import styled, {css} from 'styled-components'

export const Grid = styled.div`
  display: -ms-grid;  
  display: grid;     
`

type GridCellProps = {
  row:number
  column:number
}

export const GridCell = styled.div`
  margin: 0 20px 0 0;  
  
  -ms-grid-column-span: 1;
  -ms-grid-row-span: 1;
  
  ${({row, column}:GridCellProps) => css`
      -ms-grid-row: ${row};
      grid-row: ${row};
      
      -ms-grid-column: ${column};
      grid-column: ${column};
  `};  
`

